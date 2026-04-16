var $m = Object.defineProperty;
var Bm = Object.getPrototypeOf;
var zm = Reflect.get;
var pl = (a) => {
  throw TypeError(a);
};
var Fm = (a, e, t) => e in a ? $m(a, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : a[e] = t;
var O = (a, e, t) => Fm(a, typeof e != "symbol" ? e + "" : e, t), Gs = (a, e, t) => e.has(a) || pl("Cannot " + t);
var F = (a, e, t) => (Gs(a, e, "read from private field"), t ? t.call(a) : e.get(a)), we = (a, e, t) => e.has(a) ? pl("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(a) : e.set(a, t), Re = (a, e, t, i) => (Gs(a, e, "write to private field"), i ? i.call(a, t) : e.set(a, t), t), C = (a, e, t) => (Gs(a, e, "access private method"), t);
var Yt = (a, e, t) => zm(Bm(a), t, e);
const Le = {
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
        runningHot: "Hot",
        overheated: "Overheat",
        shutdown: "Danger",
        statusLabel: "Current heat state",
        status: {
          safe: "Safe",
          hot: "Hot",
          overheat: "Overheat",
          danger: "Danger",
          runningHot: "Hot",
          overheated: "Overheat",
          shutdown: "Danger"
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
}, k = Le, T = "mwd", Um = "MechWarrior: Destiny", Tr = `system.${T}`, Hm = T, yn = `systems/${T}`, Jc = `${yn}/style`, Wa = `${yn}/third-party/style`, X = `systems/${T}/templates`, bs = `${yn}/img/icons`, de = `${bs}/skills`, Ce = "MWD | ", jm = 2, Wm = 5, Km = 4, Xc = 8, Mi = {
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
}, wr = {
  autopilot: "autopilot",
  firewall: "firewall",
  knowledge: "knowledge"
}, kt = {
  grit: "grit",
  chaos: "chaos",
  insight: "insight",
  rumor: "rumor",
  legend: "legend",
  credibility: "credibility"
}, vo = {
  physical: [kt.grit, kt.chaos],
  mental: [kt.insight, kt.rumor],
  social: [kt.legend, kt.credibility]
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
  actorAttributes: Mi,
  itemAttributes: wr,
  attributes: { ...Mi, ...wr },
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
    edgePools: kt,
    edgePoolGroups: vo,
    physical: {
      grit: kt.grit,
      chaos: kt.chaos
    },
    mental: {
      insight: kt.insight,
      rumor: kt.rumor
    },
    social: {
      legend: kt.legend,
      credibility: kt.credibility
    },
    chaos: kt.chaos
  },
  area: {
    none: "none",
    shotgun: "shotgun",
    circle: "circle",
    cone: "cone",
    rect: "rect",
    ray: "ray"
  }
}, Gm = Object.freeze({
  physical: "physical",
  mental: "mental",
  social: "social"
});
Object.freeze(Object.values(Gm));
const Ra = {
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
}, qs = {
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
}, ft = {
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
  SYSTEM_DESCRIPTION: Um,
  SYSTEM_SOCKET: Tr,
  SYSTEM_SCOPE: Hm,
  SYSTEM_PATH: yn,
  STYLE_PATH: Jc,
  THIRD_PARTY_STYLE_PATH: Wa,
  TEMPLATES_PATH: X,
  ICONS_PATH: bs,
  ICONS_SKILLS_PATH: de,
  LOG_HEAD: Ce,
  SPECIALIZATION_BONUS: jm,
  TARGET_SUCCESS: Wm,
  TARGET_SUCCESS_EDGE: Km,
  BASE_MONITOR: Xc,
  ACTOR_ATTRIBUTES: Mi,
  ITEM_ATTRIBUTES: wr,
  EDGE_POOL_GROUPS: vo,
  TEMPLATE: A,
  ANARCHY_SYSTEM: ft
};
const ti = class ti {
  static ascending(e = (t) => t) {
    return (t, i) => ti.sortingBy(e(t), e(i));
  }
  static descending(e = (t) => t) {
    return (t, i) => ti.sortingBy(e(i), e(t));
  }
  static sortingBy(e, t) {
    return e > t ? 1 : e < t ? -1 : 0;
  }
  static bySortedArray(e) {
    return (t) => e.indexOf(t);
  }
  static ascendingBySortedArray(e) {
    return ti.ascending(ti.bySortedArray(e));
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
    return e.map(t).filter((i) => i != null).reduce(ti.sum(), 0);
  }
  static divint(e, t) {
    return Math.floor(e / t);
  }
  static divup(e, t) {
    return Math.ceil(e / t);
  }
  static join(e, t = "") {
    return e.reduce(ti.joiner(t));
  }
  static joiner(e = "") {
    return (t, i) => t + e + i;
  }
  static classify(e, t = (i) => i.type) {
    let i = {};
    return ti.classifyInto(i, e, t), i;
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
O(ti, "isString", (e) => typeof e == "string" || e instanceof String);
let oe = ti;
const qm = {
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
    I.hbsAttributes = I.mapObjectToKeyValue(k.attributes).filter((p) => p.value !== "knowledge" && p.value !== "noAttribute"), I.hbsItemTypes = I.mapObjectToKeyValue(k.itemType), I.hbsMonitors = I.mapObjectToKeyValue(k.monitor), I.hbsMonitorLetters = I.mapObjectToKeyValue(k.monitorLetter), I.hbsAssetModuleCategories = I.mapObjectToKeyValue(k.assetModuleCategory), (i = (t = k.item) == null ? void 0 : t.lifeModule) != null && i.type ? I.hbsLifeModuleTypes = I.mapObjectToKeyValue(k.item.lifeModule.type) : (console.warn("MWD | MWD.item.lifeModule.type is missing; life module enums disabled."), I.hbsLifeModuleTypes = []), I.hbsAreas = I.mapObjectToKeyValue(k.area), I.hbsRanges = I.mapObjectToKeyValue(k.range), I.hbsVehicleCategories = I.mapObjectToKeyValue(k.vehicleCategory), I.hbsMwdWeightClasses = I.mapObjectToKeyValue((n = k.mwd) == null ? void 0 : n.weightClass), I.hbsMwdHardpointTypes = I.mapObjectToKeyValue((s = k.mwd) == null ? void 0 : s.hardpointType), I.hbsMwdHardpointSizes = I.mapObjectToKeyValue((r = k.mwd) == null ? void 0 : r.hardpointSize), I.hbsMwdHardpointLocations = I.mapObjectToKeyValue((o = k.mwd) == null ? void 0 : o.hardpointLocation), I.hbsMwdPrimaryModes = I.mapObjectToKeyValue((l = k.mwd) == null ? void 0 : l.primarySlotMode), I.hbsMwdWeaponCategories = I.mapObjectToKeyValue((c = k.mwd) == null ? void 0 : c.weaponCategory), I.hbsMwdWeaponDamageTypes = I.mapObjectToKeyValue((u = k.mwd) == null ? void 0 : u.weaponDamageType), I.hbsPersonalWeaponDamageTypes = I.mapObjectToKeyValue((d = k.mwd) == null ? void 0 : d.personalDamageType), I.hbsPersonalWeaponDamageCategories = I.mapObjectToKeyValue((m = k.mwd) == null ? void 0 : m.personalDamageCategory), I.hbsMwdMeleeLocations = I.mapObjectToKeyValue((f = k.mwd) == null ? void 0 : f.meleeLocation), I.hbsDamageTypes = oe.distinct(
      (I.hbsMwdWeaponDamageTypes ?? []).concat(I.hbsPersonalWeaponDamageTypes ?? []),
      (p) => p.value
    );
    const e = Object.values(Ra).flat();
    I.sortedAttributeKeys = oe.distinct(
      e.concat(Object.keys(k.attributes ?? {}))
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
    return qm;
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
O(I, "ENUMS"), // HBS-friendly arrays of { value, label } (or key/value depending on caller)
O(I, "hbsAttributes"), O(I, "hbsItemTypes"), O(I, "hbsMonitors"), O(I, "hbsMonitorLetters"), O(I, "hbsAssetModuleCategories"), O(I, "hbsLifeModuleTypes"), O(I, "hbsAreas"), O(I, "hbsRanges"), O(I, "hbsVehicleCategories"), // MWD-specific enum groups
O(I, "hbsMwdWeightClasses"), O(I, "hbsMwdHardpointTypes"), O(I, "hbsMwdHardpointSizes"), O(I, "hbsMwdHardpointLocations"), O(I, "hbsMwdPrimaryModes"), O(I, "hbsMwdWeaponCategories"), O(I, "hbsMwdWeaponDamageTypes"), O(I, "hbsPersonalWeaponDamageTypes"), O(I, "hbsPersonalWeaponDamageCategories"), O(I, "hbsDamageTypes"), O(I, "hbsMwdMeleeLocations"), O(I, "sortedAttributeKeys");
let Me = I;
class Vm {
  static monitor(e) {
    return Me.getFromList(Me.getMonitors(), e) ?? "";
  }
  static letter(e) {
    return Me.getFromList(Me.getMonitorLetters(), e) ?? "";
  }
}
class Ym {
  static toLowerCaseNoAccent(e) {
    return e == null ? void 0 : e.normalize("NFD").toLowerCase().replace(/[\u0300-\u036f]/g, "");
  }
  static toUpperCaseNoAccent(e) {
    return e == null ? void 0 : e.normalize("NFD").toUpperCase().replace(/[\u0300-\u036f]/g, "");
  }
}
const Qm = [
  "fas fa-dice",
  "fas fa-dice-one",
  "fas fa-dice-two",
  "fas fa-dice-three",
  "fas fa-dice-four",
  "fas fa-dice-five",
  "fas fa-dice-six"
];
class J {
  static fontAwesome(e) {
    return `<i class="${e}"></i>`;
  }
  static iconSystemPath(e, t) {
    return J.iconPath(`${Jc}/${e}`, t);
  }
  static iconPath(e, t) {
    return `<img class="${t}" src="${e}" />`;
  }
  static iconD6(e) {
    if (e < 0 || e > 6)
      throw `Dice ${e} is out of dice range [1..6] or 0 for multidice`;
    return J.fontAwesome(Qm[e]);
  }
}
globalThis.ANARCHY_ICONS = J;
const Ne = (a, e = {}) => a.replace(/\{(.*?)\}/g, (t, i) => e[i] ?? "");
function Mo(a) {
  return a && typeof a == "object" && !Array.isArray(a) ? Object.values(a).flatMap((e) => Mo(e)) : Array.isArray(a) ? a.map((e) => String(e ?? "").trim()).filter(Boolean) : String(a ?? "").split(",").map((e) => e.trim()).filter(Boolean);
}
function nn(a = []) {
  return Array.from(new Set(a.map((e) => String(e ?? "").trim()).filter(Boolean)));
}
function On(a, e = "standard") {
  return String(a ?? "").trim() || e;
}
function Jm(a, e = {}) {
  a && (a.movedToKeywords ?? (a.movedToKeywords = []), a.movedToKeywords.push(e));
}
function Xm(a, e, t = {}) {
  a && (a.errors ?? (a.errors = []), a.errors.push({ message: e, ...t }));
}
const Co = Object.freeze(["templated"]), Zm = Object.freeze([
  "burstCapable",
  "fullAutoCapable",
  "salvoCapable"
]), ef = Object.freeze([
  "clustered",
  "mineLayer",
  "smoke",
  "incendiary",
  "emp"
]), tf = Object.freeze([
  { value: "burstCapable", label: "Burst Capable" },
  { value: "fullAutoCapable", label: "Full Auto Capable" },
  { value: "salvoCapable", label: "Salvo Capable" }
]), af = Object.freeze([
  { value: "templated", label: "Templated" },
  { value: "clustered", label: "Clustered" },
  { value: "mineLayer", label: "Mine Layer" },
  { value: "smoke", label: "Smoke" },
  { value: "incendiary", label: "Incendiary" },
  { value: "emp", label: "EMP" }
]), Zc = Object.freeze([
  { value: "blast", label: "Blast" },
  { value: "cone", label: "Cone" },
  { value: "line", label: "Line" },
  { value: "cloud", label: "Cloud" },
  { value: "minefield", label: "Minefield" }
]), eu = Object.freeze([
  { value: "targeted", label: "Targeted (start on target)" },
  { value: "origin", label: "Origin (start on attacker)" },
  { value: "placed", label: "Placed (start free)" }
]), nf = Object.freeze(["blast", "cone", "line"]);
new Set(Co);
const sf = /* @__PURE__ */ new Set([
  ...Co,
  ...Zm
]), rf = /* @__PURE__ */ new Set([
  ...Co,
  ...ef
]);
function Eo() {
  return {
    movedToKeywords: [],
    errors: []
  };
}
function Zn(a) {
  return nn(Mo(a));
}
function tu({
  traits: a = [],
  keywords: e = [],
  recognized: t = /* @__PURE__ */ new Set(),
  report: i = null,
  owner: n = "weapon",
  path: s = ""
} = {}) {
  const r = Mo(a), o = Zn(e), l = [], c = [...o];
  for (const u of r) {
    if (t.has(u)) {
      l.push(u);
      continue;
    }
    c.push(u), Jm(i, {
      owner: n,
      from: s || "traits",
      to: s ? s.replace(/traits$/u, "keywords") : "keywords",
      value: u
    });
  }
  return {
    traits: nn(l),
    keywords: nn(c)
  };
}
function iu({
  traits: a = [],
  keywords: e = [],
  report: t = null,
  path: i = "system.traits"
} = {}) {
  return tu({
    traits: a,
    keywords: e,
    recognized: sf,
    report: t,
    owner: "weapon",
    path: i
  });
}
function au({
  traits: a = [],
  keywords: e = [],
  report: t = null,
  path: i = "system.payloads[].traits"
} = {}) {
  return tu({
    traits: a,
    keywords: e,
    recognized: rf,
    report: t,
    owner: "payload",
    path: i
  });
}
function nu(a = {}, e = "standard") {
  const t = a ?? {}, i = On(
    t.resolverKey ?? t.damageModel ?? t.resolver,
    e
  ), n = String(t.damageModel ?? "").trim(), s = t.onHitEffect;
  return {
    resolverKey: i,
    damageModel: n,
    onHitEffect: s === null ? null : String(s ?? "").trim() || null
  };
}
function Vs(a = {}) {
  const e = a ?? {}, t = !!e.enabled, i = e.shots, n = e.accuracyMod, s = e.addHeat, r = e.consumption;
  return {
    enabled: t,
    ...i !== void 0 ? { shots: Math.max(0, Number(i ?? 0) || 0) } : {},
    ...n !== void 0 ? { accuracyMod: Number(n ?? 0) || 0 } : {},
    ...s !== void 0 ? { addHeat: Number(s ?? 0) || 0 } : {},
    ...r !== void 0 ? { consumption: Math.max(0, Number(r ?? 0) || 0) } : {}
  };
}
function of(a = {}) {
  const e = a ?? {};
  return {
    single: Vs(e.single),
    burst: Vs(e.burst),
    fullAuto: Vs(e.fullAuto)
  };
}
function lf(a) {
  const e = String(a ?? "").trim().toLowerCase();
  return e === "circle" ? "blast" : e === "ray" ? "line" : Zc.some((t) => t.value === e) ? e : "";
}
function cf(a) {
  const e = String(a ?? "").trim().toLowerCase();
  return ["target", "targeted"].includes(e) ? "targeted" : eu.some((t) => t.value === e) ? e : "";
}
function uf(a = null) {
  const e = a ?? {}, t = lf(e.shape ?? e.t ?? e.type), i = e.size ?? e.distance ?? e.radius ?? e.length, n = cf(e.placement ?? e.origin ?? e.mode);
  return !t && i === void 0 && !n ? null : {
    shape: t,
    size: Math.max(0, Number(i ?? 0) || 0),
    placement: n || "targeted"
  };
}
function df({
  weapon: a = {},
  payload: e = {},
  effectiveTraits: t = [],
  effectiveResolution: i = null,
  report: n = null
} = {}) {
  var g, y;
  const s = nn((a == null ? void 0 : a.traits) ?? []), r = nn((e == null ? void 0 : e.traits) ?? []), o = t.includes("templated"), l = s.includes("templated"), c = r.includes("templated"), u = (e == null ? void 0 : e.template) ?? null, d = (a == null ? void 0 : a.template) ?? null, m = On((g = e == null ? void 0 : e.resolution) == null ? void 0 : g.resolverKey, ""), f = On((y = a == null ? void 0 : a.resolution) == null ? void 0 : y.resolverKey, ""), p = On(i == null ? void 0 : i.resolverKey, "standard"), h = [];
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
    Xm(n, b, { capability: "templated" });
  return {
    errors: h,
    liveCapabilities: ["templated"],
    template: u,
    resolverKey: p,
    isTemplated: !0
  };
}
const sn = Object.freeze(["none", "minor", "major", "full"]), mf = Object.freeze(["blast", "cone", "line", "rect"]), ff = Object.freeze({
  blast: "circle",
  cone: "cone",
  line: "ray",
  rect: "rect"
}), pf = Object.freeze({
  circle: "blast",
  cone: "cone",
  ray: "line",
  rect: "rect",
  rectangle: "rect"
}), ne = Object.freeze({
  none: "none",
  minor: "minor",
  major: "major",
  full: "full"
}), hf = Object.freeze({
  none: 0,
  minor: 0.25,
  major: 0.5,
  full: 1
}), Et = Object.freeze({
  discrete: "discrete",
  persistent: "persistent"
});
function _(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function gf(a, e = !1) {
  if (typeof a == "boolean") return a;
  const t = String(a ?? "").trim().toLowerCase();
  return ["true", "1", "yes", "y", "on"].includes(t) ? !0 : ["false", "0", "no", "n", "off"].includes(t) ? !1 : e;
}
function su(a) {
  return foundry.utils.deepClone(a);
}
function $e(a, e = ne.none) {
  const t = String(a ?? "").trim().toLowerCase();
  return sn.includes(t) ? t : e;
}
function kr(a) {
  return Number(hf[$e(a)] ?? 0) || 0;
}
function Ii(a) {
  return sn.indexOf($e(a));
}
function vr(a, e = 1) {
  const t = Math.max(0, Ii(a)), i = Math.max(0, t - Math.max(0, Math.trunc(_(e, 1))));
  return sn[i] ?? ne.none;
}
function yf(a, e = 1) {
  const t = Math.max(0, Ii(a)), i = Math.min(sn.length - 1, t + Math.max(0, Math.trunc(_(e, 1))));
  return sn[i] ?? ne.full;
}
function $t(a) {
  return $e(a).toUpperCase();
}
function Po(a = {}) {
  var n, s, r, o, l;
  const e = a ?? {}, t = Math.max(1, Math.trunc(_(
    ((n = e == null ? void 0 : e.escalation) == null ? void 0 : n.intervalTurns) ?? ((s = e == null ? void 0 : e.escalation) == null ? void 0 : s.interval) ?? 1,
    1
  ))), i = Math.max(0, Math.trunc(_(((r = e == null ? void 0 : e.escalation) == null ? void 0 : r.rate) ?? 1, 1)));
  return {
    startExposure: $e(e.startExposure, ne.minor),
    escalation: {
      rate: i,
      intervalTurns: t,
      max: $e((o = e == null ? void 0 : e.escalation) == null ? void 0 : o.max, ne.full)
    },
    onFull: {
      burnDelta: Math.max(0, Math.trunc(_(((l = e == null ? void 0 : e.onFull) == null ? void 0 : l.burnDelta) ?? 0, 0)))
    },
    clearOnExit: gf(e.clearOnExit, !0)
  };
}
function bi(a = {}) {
  const e = a ?? {}, t = String(e.kind ?? Et.discrete).trim().toLowerCase() === Et.persistent ? Et.persistent : Et.discrete;
  return {
    kind: t,
    hazard: t === Et.persistent ? Po(e.hazard ?? e) : null
  };
}
function ru(a = {}) {
  return bi(a).kind === Et.persistent;
}
function Xi(a, e) {
  return Math.max(0, Math.ceil(_(a, 0) * kr(e)));
}
function Ss(a, e = "") {
  const t = String(a ?? "").trim().toLowerCase();
  return mf.includes(t) ? t : e;
}
function ou(a, e = "circle") {
  return ff[Ss(a)] ?? e;
}
function bf(a, e = "") {
  const t = String(a ?? "").trim().toLowerCase();
  return pf[t] ?? e;
}
function Ro(a) {
  let e = _(a, 0);
  for (; e < 0; ) e += 360;
  for (; e >= 360; ) e -= 360;
  return e;
}
function Si() {
  var a, e, t;
  return _(((e = (a = canvas == null ? void 0 : canvas.scene) == null ? void 0 : a.grid) == null ? void 0 : e.distance) ?? ((t = canvas == null ? void 0 : canvas.dimensions) == null ? void 0 : t.distance), 1) || 1;
}
function es() {
  var a, e;
  return _(((a = canvas == null ? void 0 : canvas.grid) == null ? void 0 : a.size) ?? ((e = canvas == null ? void 0 : canvas.dimensions) == null ? void 0 : e.size), 100) || 100;
}
function yt(a = 0) {
  return _(a, 0) * (es() / Si());
}
function Fa(a = 0) {
  return _(a, 0) * (Si() / es());
}
function Mr(a = {}, e = {}) {
  return Math.hypot(_(a.x, 0) - _(e.x, 0), _(a.y, 0) - _(e.y, 0));
}
function bn(a) {
  return _(a, 0) * Math.PI / 180;
}
function Sf({ geometry: a = {}, tokenCenter: e = {} } = {}) {
  const t = _(e.x, 0) - _(a.x, 0), i = _(e.y, 0) - _(a.y, 0), n = bn(a.direction ?? 0), s = Math.cos(n), r = Math.sin(n);
  return Math.max(0, t * s + i * r);
}
function Ys(a = 0, e = 0) {
  if (!(e > 0)) return ne.none;
  const t = Math.max(0, Math.min(1, a / e));
  return t <= 1 / 3 ? ne.full : t <= 2 / 3 ? ne.major : t <= 1 ? ne.minor : ne.none;
}
function hl({ template: a = {}, placement: e = {} } = {}) {
  var l, c;
  const t = Ss((e == null ? void 0 : e.shape) ?? (a == null ? void 0 : a.shape), "");
  if (!t) return null;
  const i = _(
    (e == null ? void 0 : e.distance) ?? (a == null ? void 0 : a.distance) ?? (a == null ? void 0 : a.size),
    0
  );
  if (!(i > 0)) return null;
  const n = t === "cone" ? _((e == null ? void 0 : e.angle) ?? 90, 90) : null, s = t === "line" ? _((e == null ? void 0 : e.width) ?? Si(), Si()) : null, r = t === "rect" ? _((e == null ? void 0 : e.width) ?? (a == null ? void 0 : a.width) ?? (e == null ? void 0 : e.distance) ?? (a == null ? void 0 : a.distance) ?? (a == null ? void 0 : a.size), 0) : null, o = t === "rect" ? _((e == null ? void 0 : e.height) ?? (a == null ? void 0 : a.height) ?? (e == null ? void 0 : e.distance) ?? (a == null ? void 0 : a.distance) ?? (a == null ? void 0 : a.size), 0) : null;
  return t === "rect" && (!(r > 0) || !(o > 0)) ? null : {
    shape: t,
    measuredTemplateType: ou(t),
    x: _((l = e == null ? void 0 : e.anchor) == null ? void 0 : l.x, 0),
    y: _((c = e == null ? void 0 : e.anchor) == null ? void 0 : c.y, 0),
    direction: Ro((e == null ? void 0 : e.direction) ?? 0),
    distance: t === "rect" ? Math.max(r, o) : i,
    angle: n,
    width: s,
    height: t === "rect" ? o : null,
    anchorX: t === "rect" ? _((e == null ? void 0 : e.anchorX) ?? (a == null ? void 0 : a.anchorX) ?? 0, 0) : null,
    anchorY: t === "rect" ? _((e == null ? void 0 : e.anchorY) ?? (a == null ? void 0 : a.anchorY) ?? 0, 0) : null,
    placementMode: String((a == null ? void 0 : a.placement) ?? (e == null ? void 0 : e.placementMode) ?? "").trim() || null
  };
}
function Be(a = null, { template: e = null, placement: t = null } = {}) {
  var u, d, m, f;
  const i = a && typeof a == "object" ? a : {};
  if ((!i || !Object.keys(i).length) && (e || t))
    return hl({ template: e, placement: t });
  const n = String(
    i.measuredTemplateType ?? i.t ?? i.type ?? ""
  ).trim().toLowerCase(), s = Ss(
    i.shape ?? bf(n) ?? "",
    ""
  );
  if (!s)
    return e || t ? hl({ template: e, placement: t }) : null;
  const r = s === "rect" ? _(i.width ?? (t == null ? void 0 : t.width) ?? (e == null ? void 0 : e.width) ?? i.distance ?? i.size, 0) : 0, o = s === "rect" ? _(i.height ?? (t == null ? void 0 : t.height) ?? (e == null ? void 0 : e.height) ?? i.distance ?? i.size, 0) : 0, l = _(
    i.distance ?? i.size ?? i.templateDistance ?? (t == null ? void 0 : t.distance) ?? (e == null ? void 0 : e.distance) ?? (e == null ? void 0 : e.size),
    0
  );
  if (s === "rect") {
    if (!(r > 0) || !(o > 0)) return null;
  } else if (!(l > 0)) return null;
  return {
    shape: s,
    measuredTemplateType: n || ou(s),
    x: _(i.x ?? ((u = i.anchor) == null ? void 0 : u.x) ?? ((d = t == null ? void 0 : t.anchor) == null ? void 0 : d.x), 0),
    y: _(i.y ?? ((m = i.anchor) == null ? void 0 : m.y) ?? ((f = t == null ? void 0 : t.anchor) == null ? void 0 : f.y), 0),
    direction: Ro(i.direction ?? i.rotation ?? (t == null ? void 0 : t.direction) ?? 0),
    distance: s === "rect" ? Math.max(r, o) : l,
    angle: s === "cone" ? _(i.angle ?? (t == null ? void 0 : t.angle) ?? 90, 90) : null,
    width: s === "line" ? _(i.width ?? (t == null ? void 0 : t.width) ?? Si(), Si()) : s === "rect" ? r : null,
    height: s === "rect" ? o : null,
    anchorX: s === "rect" ? _(i.anchorX ?? (t == null ? void 0 : t.anchorX) ?? (e == null ? void 0 : e.anchorX) ?? 0, 0) : null,
    anchorY: s === "rect" ? _(i.anchorY ?? (t == null ? void 0 : t.anchorY) ?? (e == null ? void 0 : e.anchorY) ?? 0, 0) : null,
    placementMode: String(i.placementMode ?? (e == null ? void 0 : e.placement) ?? "").trim() || null
  };
}
function Af(a = null) {
  return a ? typeof (a == null ? void 0 : a.toObject) == "function" ? a.toObject() : typeof (a == null ? void 0 : a.toJSON) == "function" ? a.toJSON() : a && typeof a == "object" ? su(a) : null : null;
}
function Tf(a = []) {
  const e = [];
  for (const t of a) {
    const i = Number(t);
    i > 0 && (e.some((n) => Math.abs(n - i) < 1e-3) || e.push(i));
  }
  return e;
}
function wf(a = null, { placementMode: e = "region", shapeHint: t = "" } = {}) {
  const i = Af(a);
  if (!i || typeof i != "object") return null;
  const n = String(i.type ?? "").trim().toLowerCase(), s = Ss(t, "");
  if (n === "circle")
    return Be({
      shape: s || "blast",
      measuredTemplateType: "circle",
      x: i.x,
      y: i.y,
      distance: Fa(i.radius),
      placementMode: e
    });
  if (n === "ellipse") {
    const r = _(i.radiusX, 0), o = _(i.radiusY, 0);
    return !(r > 0) || Math.abs(r - o) > 1e-3 ? null : Be({
      shape: s || "blast",
      measuredTemplateType: "circle",
      x: _(i.x, 0) + r,
      y: _(i.y, 0) + o,
      distance: Fa(r),
      placementMode: e
    });
  }
  if (n === "cone")
    return Be({
      shape: s || "cone",
      measuredTemplateType: "cone",
      x: i.x,
      y: i.y,
      direction: i.rotation ?? i.direction,
      distance: Fa(i.radius),
      angle: i.angle,
      placementMode: e
    });
  if (n === "line") {
    const r = Array.from((a == null ? void 0 : a.measuredSegments) ?? []), o = Tf(r.map((f) => f == null ? void 0 : f.distance)), l = Math.max(
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
    ) || Si(), d = (a == null ? void 0 : a.origin) ?? i.origin ?? {}, m = r.reduce((f, p) => {
      const h = Number((p == null ? void 0 : p.distance) ?? 0), g = Number((f == null ? void 0 : f.distance) ?? 0);
      return h > g ? p : f;
    }, null);
    return Be({
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
  return n === "rectangle" || n === "rect" ? Be({
    shape: s || "rect",
    measuredTemplateType: "rect",
    x: i.x,
    y: i.y,
    direction: i.rotation ?? i.direction,
    width: Fa(i.width),
    height: Fa(i.height),
    anchorX: i.anchorX,
    anchorY: i.anchorY,
    placementMode: e
  }) : null;
}
function lu(a = null, { placementMode: e = "region", shapeHint: t = "" } = {}) {
  const i = (a == null ? void 0 : a.document) ?? a ?? null, n = Array.from((i == null ? void 0 : i.shapes) ?? []);
  return n.length !== 1 ? null : wf(n[0], { placementMode: e, shapeHint: t });
}
function kf(a = null, e = null) {
  const t = Be(a);
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
function cu(a) {
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
function vf(a) {
  var i, n, s, r;
  const e = _((a == null ? void 0 : a.w) ?? ((i = a == null ? void 0 : a.object) == null ? void 0 : i.w) ?? ((n = a == null ? void 0 : a.document) == null ? void 0 : n.width), 1) * es(), t = _((a == null ? void 0 : a.h) ?? ((s = a == null ? void 0 : a.object) == null ? void 0 : s.h) ?? ((r = a == null ? void 0 : a.document) == null ? void 0 : r.height), 1) * es();
  return Math.max(e, t) / 2;
}
function Mf({ geometry: a, tokenCenter: e, tokenRadius: t }) {
  const i = yt(a.distance);
  return Mr({ x: a.x, y: a.y }, e) <= i + t;
}
function Cf({ geometry: a, tokenCenter: e, tokenRadius: t }) {
  const i = yt(a.distance), n = yt(a.width ?? Si()), s = bn(a.direction), r = e.x - a.x, o = e.y - a.y, l = Math.cos(s), c = Math.sin(s), u = r * l + o * c;
  if (u < -t || u > i + t) return !1;
  const d = Math.max(0, Math.min(i, u)), m = a.x + d * l, f = a.y + d * c;
  return Math.hypot(e.x - m, e.y - f) <= t + n / 2;
}
function Ef({ geometry: a, tokenCenter: e, tokenRadius: t }) {
  const i = yt(a.distance), n = e.x - a.x, s = e.y - a.y, r = Math.hypot(n, s);
  if (r > i + t) return !1;
  if (r === 0) return !0;
  let l = Math.atan2(s, n) * 180 / Math.PI - a.direction;
  for (; l <= -180; ) l += 360;
  for (; l > 180; ) l -= 360;
  const c = _(a.angle, 90) / 2, u = Math.asin(Math.min(1, t / Math.max(r, 1))) * 180 / Math.PI;
  return Math.abs(l) <= c + u;
}
function Pf({ geometry: a, tokenCenter: e, tokenRadius: t }) {
  const i = yt(_(a.width, 0)), n = yt(_(a.height, 0));
  if (!(i > 0) || !(n > 0)) return !1;
  const s = _(a.anchorX, 0), r = _(a.anchorY, 0), o = _(a.x, 0), l = _(a.y, 0), c = o + i * (0.5 - s), u = l + n * (0.5 - r), d = -bn(a.direction ?? 0), m = Math.cos(d), f = Math.sin(d), p = e.x - c, h = e.y - u, g = p * m - h * f, y = p * f + h * m;
  return Math.abs(g) <= i / 2 + t && Math.abs(y) <= n / 2 + t;
}
function As(a = null, e = null) {
  const t = Be(a);
  if (!t || !e) return !1;
  const i = cu(e), n = vf(e);
  return t.shape === "blast" ? Mf({ geometry: t, tokenCenter: i, tokenRadius: n }) : t.shape === "line" ? Cf({ geometry: t, tokenCenter: i, tokenRadius: n }) : t.shape === "cone" ? Ef({ geometry: t, tokenCenter: i, tokenRadius: n }) : t.shape === "rect" ? Pf({ geometry: t, tokenCenter: i, tokenRadius: n }) : !1;
}
function uu({ template: a = {}, placement: e = {}, geometry: t = null, token: i = null } = {}) {
  if (!i) return ne.none;
  const n = Be(t, { template: a, placement: e });
  if (!n || !As(n, i))
    return ne.none;
  const s = cu(i), r = yt(n.distance);
  if (!(r > 0)) return ne.none;
  if (n.shape === "line" || n.shape === "cone") {
    const l = Sf({ geometry: n, tokenCenter: s });
    return Ys(l, r);
  }
  if (n.shape === "rect") {
    const l = {
      x: _(n.x, 0) + yt(_(n.width, 0)) * (0.5 - _(n.anchorX, 0)),
      y: _(n.y, 0) + yt(_(n.height, 0)) * (0.5 - _(n.anchorY, 0))
    }, c = Mr(l, s);
    return Ys(c, r);
  }
  const o = Mr({ x: n.x, y: n.y }, s);
  return Ys(o, r);
}
function xi({ tier: a = ne.none, appliedTier: e = null, evadeUsed: t = !1, evadeLocked: i = !1 } = {}) {
  const n = $e(a, ne.none), s = $e(e ?? n, n);
  return {
    initialTier: n,
    initialLabel: $t(n),
    initialMultiplier: kr(n),
    finalTier: s,
    finalLabel: $t(s),
    finalMultiplier: kr(s),
    evadeUsed: !!t,
    evadeLocked: !!i
  };
}
function No(a = {}, { locked: e = !1, active: t = !1 } = {}) {
  const i = $e((a == null ? void 0 : a.initialTier) ?? (a == null ? void 0 : a.tier), ne.none);
  if (!t || e || i === ne.none)
    return xi({
      tier: i,
      appliedTier: i,
      evadeUsed: !1,
      evadeLocked: !!e
    });
  const n = vr(i, 1);
  return xi({
    tier: i,
    appliedTier: n,
    evadeUsed: i !== n,
    evadeLocked: !!e
  });
}
function du(a = []) {
  return a.map((e) => ({
    x: Math.round(_(e.x, 0)),
    y: Math.round(_(e.y, 0))
  }));
}
function Rf(a = {}) {
  const e = yt(_(a.distance, 0)), t = yt(_(a.width, Si())) / 2, i = bn(a.direction ?? 0), n = Math.cos(i), s = Math.sin(i), r = -s, o = n, l = {
    x: _(a.x, 0) + e * n,
    y: _(a.y, 0) + e * s
  };
  return {
    type: "polygon",
    points: du([
      { x: a.x + r * t, y: a.y + o * t },
      { x: l.x + r * t, y: l.y + o * t },
      { x: l.x - r * t, y: l.y - o * t },
      { x: a.x - r * t, y: a.y - o * t }
    ])
  };
}
function Nf(a = {}) {
  const e = _(a.angle, 90), t = yt(_(a.distance, 0)), i = _(a.direction, 0), n = e / 2, s = [{ x: a.x, y: a.y }];
  for (let r = 0; r <= 8; r += 1) {
    const o = -n + e / 8 * r, l = bn(i + o);
    s.push({
      x: _(a.x, 0) + Math.cos(l) * t,
      y: _(a.y, 0) + Math.sin(l) * t
    });
  }
  return {
    type: "polygon",
    points: du(s)
  };
}
function If(a = {}) {
  return {
    type: "rectangle",
    x: Math.round(_(a.x, 0)),
    y: Math.round(_(a.y, 0)),
    width: Math.round(yt(_(a.width, 0))),
    height: Math.round(yt(_(a.height, 0))),
    rotation: Ro(a.direction ?? 0),
    anchorX: _(a.anchorX, 0),
    anchorY: _(a.anchorY, 0)
  };
}
function Ts(a = null) {
  const e = Be(a);
  if (!e) return [];
  if (e.shape === "blast") {
    const t = yt(_(e.distance, 0));
    return [{
      type: "ellipse",
      x: Math.round(_(e.x, 0) - t),
      y: Math.round(_(e.y, 0) - t),
      radiusX: Math.round(t),
      radiusY: Math.round(t),
      rotation: 0
    }];
  }
  return e.shape === "line" ? [Rf(e)] : e.shape === "cone" ? [Nf(e)] : e.shape === "rect" ? [If(e)] : [];
}
function si(a = null) {
  const e = Be(a);
  return e ? su(e) : null;
}
const mu = Object.freeze({
  penetrating: "Penetrating",
  concussive: "Concussive",
  energy: "Energy",
  thermal: "Thermal",
  electrical: "Electrical"
}), ts = Object.freeze(
  Object.entries(mu).map(([a, e]) => ({ value: a, label: e }))
), Df = Object.freeze({
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
}), Of = Object.freeze(
  ts.map((a) => a.value)
), Cr = Object.freeze({}), ws = Object.freeze({
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
}), _f = Object.freeze(
  Object.values(ws).map((a) => ({
    value: a.key,
    label: a.label,
    rated: a.rated
  }))
), fu = yu(Cr), pu = yu(ws);
function ks(a) {
  return a && typeof a == "object" && !Array.isArray(a) ? Object.values(a).flatMap((e) => ks(e)) : Array.isArray(a) ? a.map((e) => String(e ?? "").trim()).filter(Boolean) : String(a ?? "").split(",").map((e) => e.trim()).filter(Boolean);
}
function qt(a, e = "penetrating") {
  const t = String(a ?? "").trim().toLowerCase();
  return Df[t] ?? e;
}
function hu(a) {
  const e = String(a ?? "").trim();
  return e ? qt(e, "") : "";
}
function gu(a) {
  const e = String(a ?? "").trim().toLowerCase();
  return Of.includes(e);
}
function Vt(a) {
  const e = qt(a, "");
  return mu[e] ?? String(a ?? "").trim();
}
function ri(a) {
  const e = a ?? {}, t = Number(e.ballistic ?? 0) || 0, i = Number(e.melee ?? 0) || 0;
  return {
    penetrating: e.penetrating !== void 0 ? Number(e.penetrating ?? 0) || 0 : Math.max(t, i),
    concussive: e.concussive !== void 0 ? Number(e.concussive ?? 0) || 0 : Number(e.explosive ?? 0) || 0,
    energy: Number(e.energy ?? 0) || 0,
    thermal: Number(e.thermal ?? 0) || 0,
    electrical: Number(e.electrical ?? 0) || 0
  };
}
function _n(a) {
  return ks(a);
}
function La(a) {
  return ks(a);
}
function Lf(a) {
  return Zn(a);
}
function Ln(a = {}, e = "standard") {
  return nu(a, e);
}
function xn(a = {}) {
  return of(a);
}
function xf(a = null) {
  return uf(a);
}
function Na(a = "id") {
  var t, i;
  const e = (i = (t = globalThis.foundry) == null ? void 0 : t.utils) == null ? void 0 : i.randomID;
  return typeof e == "function" ? e() : `${a}-${Math.random().toString(36).slice(2, 10)}`;
}
function yu(a) {
  const e = {};
  return Object.values(a).forEach((t) => {
    [t.key, ...t.aliases ?? []].forEach((i) => {
      e[rn(i)] = t.key;
    });
  }), Object.freeze(e);
}
function rn(a) {
  return String(a ?? "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "");
}
function xa(a) {
  return Array.isArray(a) ? a : a && typeof a == "object" ? Object.values(a) : a == null || a === "" ? [] : [a];
}
function bu(a, e) {
  return xa(a).map((t) => $f(t, e)).filter(Boolean);
}
function $f(a, e) {
  if (typeof a == "string" || typeof a == "number") {
    const i = e[rn(a)];
    return i ? { id: Na("trait"), key: i, rating: 1 } : null;
  }
  if (!a || typeof a != "object") return null;
  const t = e[rn(a.key ?? a.value ?? a.name)];
  return t ? {
    id: String(a.id ?? "").trim() || Na("trait"),
    key: t,
    rating: Math.max(0, Number(a.rating ?? 0) || 0)
  } : null;
}
function Hi(a) {
  return bu(a, fu);
}
function mi(a) {
  return bu(a, pu);
}
function is(a) {
  return {
    close: Number((a == null ? void 0 : a.close) ?? (a == null ? void 0 : a.short) ?? 0) || 0,
    near: Number((a == null ? void 0 : a.near) ?? (a == null ? void 0 : a.medium) ?? 0) || 0,
    far: Number((a == null ? void 0 : a.far) ?? (a == null ? void 0 : a.long) ?? 0) || 0,
    extreme: Number((a == null ? void 0 : a.extreme) ?? 0) || 0
  };
}
function Bf(a = {}, e = {}) {
  const t = is(a), i = is(e);
  return {
    close: t.close + i.close,
    near: t.near + i.near,
    far: t.far + i.far,
    extreme: t.extreme + i.extreme
  };
}
function zf(a, e) {
  var t;
  return ((t = e[a]) == null ? void 0 : t.label) ?? a;
}
function Su(a, e) {
  var n;
  const t = zf(a == null ? void 0 : a.key, e), i = Math.max(0, Number((a == null ? void 0 : a.rating) ?? 0) || 0);
  return (n = e[a == null ? void 0 : a.key]) != null && n.rated && i > 0 ? `${t} ${i}` : t;
}
function Au(a, e) {
  return xa(a).map((t) => {
    const i = t == null ? void 0 : t.key, n = e[i];
    return n != null && n.resolve ? {
      entry: t,
      effect: n.resolve(t),
      label: Su(t, e)
    } : null;
  }).filter(Boolean);
}
function Ff(a, e) {
  const t = { ...a ?? {} };
  return Object.entries(e ?? {}).forEach(([i, n]) => {
    t[i] = (Number(t[i] ?? 0) || 0) + (Number(n ?? 0) || 0);
  }), t;
}
function Uf(a = []) {
  const e = {}, t = /* @__PURE__ */ new Set();
  for (const i of a.filter(Boolean)) {
    i.accuracyMod !== void 0 && (e.accuracyMod = (Number(e.accuracyMod ?? 0) || 0) + (Number(i.accuracyMod ?? 0) || 0)), i.ap !== void 0 && (e.ap = (Number(e.ap ?? 0) || 0) + (Number(i.ap ?? 0) || 0)), i.addHeat !== void 0 && (e.addHeat = (Number(e.addHeat ?? 0) || 0) + (Number(i.addHeat ?? 0) || 0)), i.bonusVsArmorTag && (e.bonusVsArmorTag = Ff(e.bonusVsArmorTag, i.bonusVsArmorTag));
    for (const n of i.flags ?? []) {
      const s = String(n ?? "").trim();
      s && t.add(s);
    }
  }
  return t.size > 0 && (e.flags = Array.from(t)), e;
}
function Hf(a = [], e = []) {
  const t = Array.isArray(a) || typeof a == "string" ? { traits: a, standardTraits: e } : a ?? {}, i = La(t.traits), n = Hi(t.standardTraits), s = Au(n, Cr), r = i.map((o) => {
    var u;
    const l = fu[rn(o)];
    if (!l) return null;
    const c = (u = Cr[l]) == null ? void 0 : u.resolve;
    return typeof c == "function" ? c({ key: l, rating: 1 }) : null;
  });
  return Uf([
    ...s.map((o) => o.effect),
    ...r
  ]);
}
function jf(a) {
  const e = a ?? {}, t = Eo(), i = au({
    traits: e.traits,
    keywords: e.keywords,
    report: t,
    path: "ammo.types[].traits"
  });
  return {
    id: String(e.id ?? "").trim() || Na("ammo"),
    name: String(e.name ?? "").trim() || "Ammo",
    damageType: hu(e.damageType),
    apMod: Number(e.apMod ?? e.ap ?? 0) || 0,
    attackRatingBandMod: is(e.attackRatingBandMod ?? e.attackRatingBand),
    traits: i.traits,
    keywords: i.keywords,
    migration: t
  };
}
function Wf(a) {
  var l;
  const e = a ?? {}, t = Math.max(0, Number(e.max ?? 0) || 0), i = Number(e.current), n = Number.isFinite(i) ? Math.max(0, Math.min(i, t > 0 ? t : i)) : Math.max(0, t), s = xa(e.types).map(jf), r = String(e.activeTypeId ?? "").trim(), o = s.some((c) => c.id === r) ? r : ((l = s[0]) == null ? void 0 : l.id) ?? "";
  return {
    current: n,
    max: t,
    consumePerAttack: Math.max(1, Number(e.consumePerAttack ?? 1) || 1),
    activeTypeId: o,
    types: s
  };
}
function Kf(a, e = "untracked") {
  const t = String(a ?? "").trim();
  return t ? t === "linked" ? "internal" : t === "perAttack" ? e : ["untracked", "internal", "actorResource", "itemRef"].includes(t) ? t : e : e;
}
function Er(a = {}) {
  const e = a ?? {};
  return {
    amount: Math.max(1, Number(e.amount ?? e.consumePerUse ?? e.consumePerAttack ?? 1) || 1),
    sourceId: String(e.sourceId ?? "").trim()
  };
}
function gl(a = {}) {
  const e = a ?? {};
  return {
    damageType: hu(e.damageType),
    ap: Number(e.ap ?? e.apMod ?? 0) || 0,
    attackRatingBand: is(e.attackRatingBand ?? e.attackRatingBandMod)
  };
}
function Pr(a = {}) {
  return nu(a, "standard");
}
function Gf(a) {
  return String(a ?? "").trim().toLowerCase() === "unloaded";
}
function vt(a, { report: e = null, path: t = "system.payloads[]" } = {}) {
  var l;
  const i = a ?? {}, n = String(i.id ?? "").trim() || Na("payload"), s = au({
    traits: i.traits ?? ((l = i.modifies) == null ? void 0 : l.traits),
    keywords: i.keywords,
    report: e,
    path: `${t}.traits`
  }), r = ks(i.compatibleWith ?? i.compatible), o = xf(i.template);
  return Gf(n) ? {
    id: "unloaded",
    label: "Unloaded",
    compatibleWith: [],
    modifies: gl({}),
    traits: [],
    keywords: [],
    template: null,
    areaEffect: bi({ kind: "discrete" }),
    resolution: Pr({ resolverKey: "standard" }),
    consumption: Er({ amount: 1, sourceId: "" })
  } : {
    id: n,
    label: String(i.label ?? i.name ?? "").trim() || "Payload",
    compatibleWith: r,
    modifies: gl(i.modifies ?? i),
    traits: s.traits,
    keywords: s.keywords,
    template: o,
    areaEffect: bi(i.areaEffect ?? {}),
    resolution: Pr(i.resolution ?? i),
    consumption: Er(i.consumption ?? i)
  };
}
function ii(a) {
  var o, l, c, u, d, m;
  const e = a ?? {}, t = Kf(
    e.kind || e.type || ((o = e.link) != null && o.actorPath || e.actorPath ? "actorResource" : "") || ((l = e.link) != null && l.itemId || e.itemId || (c = e.link) != null && c.itemPath || e.itemPath ? "itemRef" : "") || (e.tracking || e.current !== void 0 || e.max !== void 0 ? "internal" : "") || "untracked",
    "untracked"
  ), i = e.tracking ?? e, n = Math.max(0, Number(i.max ?? 0) || 0), s = Number(i.current), r = Number.isFinite(s) ? Math.max(0, Math.min(s, n > 0 ? n : s)) : Math.max(0, n);
  return {
    id: String(e.id ?? "").trim() || Na("source"),
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
function Tu({ report: a = null, path: e = "system.payloads" } = {}) {
  return {
    payloads: [vt({
      id: "unloaded",
      label: "Unloaded",
      resolution: { resolverKey: "standard" },
      consumption: { amount: 1, sourceId: "" }
    }, { report: a, path: `${e}[0]` })],
    selectedPayloadId: "unloaded",
    consumptionSources: [ii({
      id: "untracked",
      label: "Untracked",
      kind: "untracked"
    })]
  };
}
function wu(a) {
  return String(a ?? "").trim().toLowerCase() === "melee";
}
function Rr(a = [], { report: e = null, path: t = "system.payloads" } = {}) {
  const i = xa(a).map((n, s) => vt(n, { report: e, path: `${t}[${s}]` })).filter(Boolean);
  return i.some((n) => n.id === "unloaded") ? i : [
    vt({
      id: "unloaded",
      label: "Unloaded",
      resolution: { resolverKey: "standard" },
      consumption: { amount: 1, sourceId: "" }
    }, { report: e, path: `${t}[0]` }),
    ...i
  ];
}
function vs(a = {}, { report: e = null, path: t = "system.payloads" } = {}) {
  var d;
  const i = Wf(a), n = Math.max(1, Number(i.consumePerAttack ?? 1) || 1), s = i.max > 0, r = s ? "internal-magazine" : "untracked", o = [ii(s ? {
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
  })], l = i.types.length ? i.types.map((m, f) => vt({
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
  }, { report: e, path: `${t}[${f}]` })) : [vt({
    id: "unloaded",
    label: "Unloaded",
    resolution: { resolverKey: "standard" },
    consumption: {
      amount: n,
      sourceId: s ? r : ""
    }
  }, { report: e, path: `${t}[0]` })], c = Rr(l, { report: e, path: t }), u = c.some((m) => m.id === i.activeTypeId) ? i.activeTypeId : ((d = c[0]) == null ? void 0 : d.id) ?? "unloaded";
  return {
    payloads: c,
    selectedPayloadId: u,
    consumptionSources: o
  };
}
function fi(a, { legacyAmmo: e = null, category: t = "", report: i = null, path: n = "system.payloads" } = {}) {
  if (wu(t)) return [];
  const s = xa(a).map((r, o) => vt(r, { report: i, path: `${n}[${o}]` })).filter(Boolean);
  return s.length > 0 ? Rr(s, { report: i, path: n }) : e ? Rr(vs(e, { report: i, path: n }).payloads, { report: i, path: n }) : Tu({ report: i, path: n }).payloads;
}
function Ka(a, { legacyAmmo: e = null } = {}) {
  const t = xa(a).map(ii).filter(Boolean);
  return t.length > 0 ? t : e ? vs(e).consumptionSources : Tu().consumptionSources;
}
function fa(a, e = [], { legacyAmmo: t = null, category: i = "" } = {}) {
  var r;
  if (wu(i)) return "";
  const n = fi(e, { legacyAmmo: t, category: i }), s = String(a ?? "").trim();
  if (n.some((o) => o.id === s)) return s;
  if (t) {
    const o = vs(t).selectedPayloadId;
    if (n.some((l) => l.id === o)) return o;
  }
  return ((r = n[0]) == null ? void 0 : r.id) ?? "unloaded";
}
function yl({ root: a = null, path: e = "", fallback: t = {} } = {}) {
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
function ku({ source: a = null, actor: e = null } = {}) {
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
    const u = yl({
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
    const u = ((c = (l = e == null ? void 0 : e.items) == null ? void 0 : l.get) == null ? void 0 : c.call(l, t.itemId)) ?? null, d = yl({
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
function qf({ source: a = null, actor: e = null } = {}) {
  return ku({ source: a, actor: e });
}
function Nr({
  payloads: a = [],
  selectedPayloadId: e = "",
  consumptionSources: t = [],
  actor: i = null,
  payloadId: n = "",
  category: s = ""
} = {}) {
  const r = fi(a, { category: s }), o = Ka(t), l = fa(n || e, r, { category: s }), c = r.find((f) => f.id === l) ?? r[0] ?? null, u = (c == null ? void 0 : c.consumption) ?? Er(), d = u.sourceId ? o.find((f) => f.id === u.sourceId) ?? null : o.find((f) => f.kind === "untracked") ?? ii({
    id: "untracked",
    label: "Untracked",
    kind: "untracked"
  }), m = ku({ source: d, actor: i });
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
function Vf({
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
  var V, Z, re, be, ce;
  const g = Nr({
    payloads: l != null && l.length ? l : void 0,
    selectedPayloadId: c || p,
    consumptionSources: u,
    actor: m,
    payloadId: d || p,
    category: h
  }), b = ((!l || l.length === 0) && f ? Nr({
    ...vs(f),
    actor: m,
    payloadId: d || p,
    category: h
  }) : null) ?? g, S = b.activePayload, w = iu({
    traits: i,
    keywords: n
  }), v = Array.from(/* @__PURE__ */ new Set([
    ...w.traits,
    ...La(S == null ? void 0 : S.traits)
  ])), P = Zn([
    ...w.keywords,
    ...Zn(S == null ? void 0 : S.keywords)
  ]), E = Ln(r, "standard"), z = (V = S == null ? void 0 : S.resolution) != null && V.resolverKey ? Pr(S.resolution) : E, G = xn(o), Y = Eo(), q = df({
    weapon: {
      traits: w.traits,
      resolution: E
    },
    payload: S,
    effectiveTraits: v,
    effectiveResolution: z,
    report: Y
  }), Q = Hi(s), L = Hf({
    traits: [],
    standardTraits: Q
  }), U = {
    ...b.sourceState
  };
  return delete U.sourceItem, {
    damageType: ((Z = S == null ? void 0 : S.modifies) == null ? void 0 : Z.damageType) || qt(a),
    ap: (Number(e ?? 0) || 0) + (Number(((re = S == null ? void 0 : S.modifies) == null ? void 0 : re.ap) ?? 0) || 0),
    attackRatingBand: Bf(
      t,
      ((be = S == null ? void 0 : S.modifies) == null ? void 0 : be.attackRatingBand) ?? {}
    ),
    effects: L,
    traits: v,
    keywords: P,
    standardTraits: Q,
    payloadLabel: b.payloadLabel,
    payload: S ? foundry.utils.deepClone(S) : null,
    payloadState: {
      payloads: b.payloads.map((se) => foundry.utils.deepClone(se)),
      activePayloadId: b.activePayloadId,
      payloadLabel: b.payloadLabel,
      sourceId: ((ce = b.source) == null ? void 0 : ce.id) ?? "",
      sourceLabel: b.sourceState.label ?? "",
      sourceKind: b.sourceState.kind ?? "untracked",
      isTracked: b.sourceState.isTracked,
      current: b.sourceState.current,
      max: b.sourceState.max,
      consumePerUse: b.sourceState.consumePerUse
    },
    source: b.source ? foundry.utils.deepClone(b.source) : null,
    sourceState: foundry.utils.deepClone(U),
    template: q.template ? foundry.utils.deepClone(q.template) : null,
    areaEffect: bi((S == null ? void 0 : S.areaEffect) ?? {}),
    resolution: foundry.utils.deepClone(z),
    resolverKey: String((z == null ? void 0 : z.resolverKey) ?? "standard").trim() || "standard",
    fireModes: foundry.utils.deepClone(G),
    capabilityReport: {
      ...Y,
      liveCapabilities: q.liveCapabilities,
      isTemplated: q.isTemplated,
      template: q.template ? foundry.utils.deepClone(q.template) : null,
      resolverKey: String((z == null ? void 0 : z.resolverKey) ?? "standard").trim() || "standard"
    },
    ammoLabel: b.payloadLabel,
    ammoType: S ? foundry.utils.deepClone(S) : null,
    ammoState: {
      current: U.current,
      max: U.max,
      consumePerAttack: U.consumePerUse,
      activeTypeId: b.activePayloadId,
      types: b.payloads.map((se) => {
        var Oe;
        return {
          id: se.id,
          name: se.label,
          damageType: ((Oe = se.modifies) == null ? void 0 : Oe.damageType) ?? "",
          traits: se.traits ?? [],
          keywords: se.keywords ?? []
        };
      }),
      isTracked: U.isTracked,
      ammoLabel: b.payloadLabel
    }
  };
}
function vu(a = {}, e = {}) {
  const t = ri(a), i = ri(e);
  return {
    penetrating: t.penetrating + i.penetrating,
    concussive: t.concussive + i.concussive,
    energy: t.energy + i.energy,
    thermal: t.thermal + i.thermal,
    electrical: t.electrical + i.electrical
  };
}
function Qs({ standardTraits: a = [], traits: e = [], traitState: t = {} } = {}) {
  var m, f;
  const i = mi(a), s = La(e).map((p) => {
    const h = pu[rn(p)];
    return h ? { id: Na("trait"), key: h, rating: h === "reinforced" ? 1 : 0 } : null;
  }).filter(Boolean), r = Au(
    [...i, ...s],
    ws
  ), o = r.reduce((p, h) => {
    var g;
    return vu(p, ((g = h.effect) == null ? void 0 : g.mitigationByType) ?? {});
  }, ri({})), l = r.reduce(
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
function Yf({ traits: a = [], standardTraits: e = [] } = {}) {
  return [
    ...La(a),
    ...mi(e).map((i) => Su(i, ws))
  ].filter(Boolean);
}
function Io(a) {
  const e = Math.max(0, Number(a ?? 0) || 0);
  return e <= 0 ? 0 : Math.ceil(e / 4);
}
function Qf({
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
  const n = qt(t, "penetrating"), s = ri(e), r = Io(i), o = Number(s[n] ?? 0) || 0;
  return {
    currentArmorRating: i,
    baseMitigation: r,
    typeMitigationMod: o,
    totalMitigation: r + o,
    isDestroyed: !1
  };
}
function Jf({ damageIncoming: a = 0, armorTags: e = [], effects: t = {} } = {}) {
  const i = new Set(_n(e));
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
class ra {
  static checkSufficient(e, t, i) {
    if (t > i) {
      const n = Ne(k.common.errors.insufficient, {
        resource: e,
        required: t,
        available: i
      });
      throw ui.notifications.error(n), n;
    }
  }
  static checkOutOfRange(e, t, i, n) {
    if (t < i || t > n) {
      const s = Ne(k.common.errors.outOfRange, {
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
      const i = Ne(k.common.errors.expectedType, {
        type: e.type ? k.itemType.singular[e.type] : e.type,
        expectedType: t
      });
      throw ui.notifications.error(i), i;
    }
  }
  static checkActorCanReceiveDamage(e, t, i) {
    if (!t) {
      const n = Ne(k.common.errors.actorCannotReceiveDamage, {
        actor: i.name,
        damageType: gu(e) ? Vt(e) : k.actor.monitors[e] ?? k.mwd.weaponDamageType[e] ?? k.mwd.personalDamageType[e] ?? e
      });
      throw ui.notifications.error(n), n;
    }
  }
  static checkWeaponDefense(e, t) {
    var n;
    const i = e.getDefense();
    if ((((n = e.isPersonalWeapon) == null ? void 0 : n.call(e)) ?? e.type === A.itemType.personalWeapon) && !i) {
      const s = Ne(k.common.errors.noDefenseOnWeapon, { actor: t.name, weapon: e.name });
      throw ui.notifications.error(s), s;
    }
  }
  static checkTargetsCount(e, t, i) {
    if (e > 0 && t.length > e) {
      const n = Ne(k.common.errors.maxTargetsExceedeed, {
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
      const n = Ne(k.common.errors.actorDoesNotHaveDefense, {
        actor: t.name,
        defense: i.labelkey,
        actorType: k.actorType[t.type]
      });
      throw ui.notifications.error(n), n;
    }
  }
}
function Qt(a, e, t, i, n, s = (r) => !0) {
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
function wn(a, e) {
  return {
    code: a,
    labelkey: k.defense[a],
    label: k.defense[a],
    actionCode: e
  };
}
const je = A.actorAttributes, We = A.actorTypes, wt = ft.actions, kn = ft.defenses, Js = [
  Qt(wt.defense, (a) => je.reflexes, (a) => je.intelligence, J.fontAwesome("fas fa-shield-alt"), [We.character, We.npc]),
  Qt(wt.defense, (a) => je.handling, (a) => je.chassis, J.fontAwesome("fas fa-tachometer-alt"), [We.vehicle, We.battlemech]),
  Qt(wt.resistTorture, (a) => je.strength, (a) => je.willpower, J.fontAwesome("fas fa-angry"), [We.character, We.npc]),
  Qt(wt.perception, (a) => je.logic, (a) => je.willpower, J.fontAwesome("fas fa-eye"), [We.character, We.npc]),
  Qt(wt.perception, (a) => je.system, (a) => je.handling, J.fontAwesome("fas fa-video"), [We.vehicle, We.battlemech]),
  Qt(wt.composure, (a) => je.charisma, (a) => je.willpower, J.fontAwesome("fas fa-meh"), [We.character, We.npc]),
  Qt(wt.judgeIntentions, (a) => je.charisma, (a) => je.charisma, J.fontAwesome("fas fa-theater-masks"), [We.character, We.npc]),
  Qt(wt.memory, (a) => je.logic, (a) => je.logic, J.fontAwesome("fas fa-brain"), [We.character, We.npc]),
  Qt(wt.catch, (a) => je.reflexes, (a) => je.reflexes, J.fontAwesome("fas fa-baseball-ball"), [We.character, We.npc]),
  Qt(wt.lift, (a) => je.strength, (a) => je.strength, J.fontAwesome("fas fa-dumbbell"), [We.character, We.npc])
], vn = [
  wn(kn.physicalDefense, wt.defense),
  wn(kn.physicalResistance, wt.resistTorture),
  wn(kn.socialDefense, wt.composure),
  wn(kn.mentalResistance, wt.perception)
];
class xe {
  static init() {
    Handlebars.registerHelper("fixedDefenseCode", (e) => xe.fixedDefenseCode(e));
  }
  static all(e = void 0) {
    return e ? Js.filter(e) : Js;
  }
  static getActorActions(e) {
    return Js.filter((t) => t.actorTypes.includes(e.type) && t.condition(e));
  }
  static fixedDefenseCode(e) {
    return ft.fixedDefenseCode[e] ?? e;
  }
  static getActorDefenses(e) {
    return vn.map((t) => {
      const i = xe.getActorAction(e, t.actionCode);
      return xe._convertToDefense(i, t);
    }).filter((t) => t == null ? void 0 : t.code);
  }
  static getDefenseAttributeAction(e) {
    var t;
    return (t = vn.find((i) => i.code == e)) == null ? void 0 : t.actionCode;
  }
  static getActorAction(e, t) {
    return xe.getActorActions(e).find((i) => i.code == t);
  }
  static getActorDefense(e, t) {
    t = xe.fixedDefenseCode(t);
    const i = vn.find((s) => s.code == t), n = xe.getActorAction(e, i.actionCode);
    return ra.checkActorDefenseAction(n, e, i), xe._convertToDefense(n, i);
  }
  static _convertToDefense(e, t) {
    return e ? foundry.utils.mergeObject(
      t,
      e ?? {},
      { overwrite: !1, inplace: !1 }
    ) : void 0;
  }
  static getDefenses() {
    return vn;
  }
  static prepareShortcut(e, t) {
    const i = xe.getActorActions(e).find((n) => n.code == t);
    if (i)
      return {
        icon: i.icon,
        label: i.labelkey,
        callback: (n) => n.actor.rollAttributeAction(t)
      };
  }
}
class Ir {
  constructor() {
    this.remoteCalls = {}, game.socket.on(Tr, async (e) => this.onSocketMessage(e));
  }
  static async register(e, t) {
    game.system.anarchy.remoteCall._register(e, t);
  }
  async _register(e, t) {
    if (this.remoteCalls[e])
      throw `RemoteCall msg ${e} is already registered`;
    foundry.utils.mergeObject(t, {
      callback: (i) => {
        console.log(Ce + "RemoteCall [", e, "] (", i, ")");
      },
      condition: (i) => !0,
      multiple: !1
      /* true if multiple users should handle the message */
    }, { overwrite: !1 }), this.remoteCalls[e] = t, console.log(Ce + "RemoteCall registered", e);
  }
  static call(e, t) {
    return game.system.anarchy.remoteCall._remoteCall(e, t);
  }
  _remoteCall(e, t) {
    const i = this.remoteCalls[e];
    return !i || i.condition(game.user) || !i.multiple && Wt.isUniqueConnectedGM() ? !1 : (game.socket.emit(Tr, { msg: e, data: t }), !0);
  }
  async onSocketMessage(e) {
    const t = this.remoteCalls[e.msg];
    if (t) {
      const i = t.condition(game.user), n = t.multiple, s = Wt.isUniqueConnectedGM();
      i && (n || s) ? t.callback(e.data) : console.log(Ce + "RemoteCall.onSocketMessage(", e, ") ignored :", i, n, s);
    } else
      console.log(Ce + "RemoteCall: No callback registered for", e);
  }
}
const bl = "Users.blindMessageToGM";
class Wt {
  static init() {
    Ir.register(bl, {
      callback: (e) => Wt.blindMessageToGM(e),
      condition: (e) => e.isGM
    });
  }
  static blindMessageToGM(e) {
    Ir.call(bl, e) || ChatMessage.create({
      user: e.user,
      whisper: ChatMessage.getWhisperRecipients("GM"),
      blind: !0,
      content: Ne(k.chat.blindMessageToGM, {
        user: game.user.name,
        message: e.content
      })
    });
  }
  static getUsers(e = (t) => !0) {
    return (game.version ? game.users : game.users.entities).filter(e);
  }
  static firstConnectedGM() {
    return Wt.getUsers((e) => e.isGM && e.active).sort(oe.ascending((e) => e.id)).at(0) ?? {};
  }
  /**
   * @returns true pour un seul utilisateur: le premier GM connecté par ordre d'id
   */
  static isUniqueConnectedGM(e = game.user) {
    return e.id == Wt.firstConnectedGM().id;
  }
  static firstResponsible(e) {
    if (!(e != null && e.testUserPermission))
      return;
    const t = Wt.getUsers(
      (i) => i.active && e.testUserPermission(i, CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER)
    ).sort(oe.ascending((i) => i.id)).at(0);
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
const ca = k.actor.monitors, di = k.actor.counters, Mu = {
  armor: {
    path: "system.monitors.armor.value",
    monitor: (a) => a.system.monitors.armor,
    iconChecked: J.fontAwesome("fas fa-shield-slash"),
    iconUnchecked: J.fontAwesome("fas fa-shield-alt"),
    iconHit: J.fontAwesome("fas fa-bahai"),
    resource: ca.armor
  },
  fatigue: {
    path: "system.monitors.fatigue.value",
    monitor: (a) => a.system.monitors.fatigue,
    iconChecked: J.fontAwesome("fas fa-grimace"),
    iconUnchecked: J.fontAwesome("far fa-smile"),
    iconHit: J.fontAwesome("fas fa-bahai"),
    resource: ca.fatigue,
    overflow: (a) => A.monitors.physical,
    useArmor: !0
  },
  physical: {
    path: "system.monitors.physical.value",
    monitor: (a) => a.system.monitors.physical,
    iconChecked: J.fontAwesome("fas fa-heartbeat"),
    iconUnchecked: J.fontAwesome("far fa-heart"),
    iconHit: J.fontAwesome("fas fa-bahai"),
    resource: ca.physical,
    useArmor: !0
  },
  structure: {
    path: "system.monitors.structure.value",
    monitor: (a) => a.system.monitors.structure,
    iconChecked: J.fontAwesome("fas fa-car-crash"),
    iconUnchecked: J.fontAwesome("fas fa-car-alt"),
    iconHit: J.fontAwesome("fas fa-bahai"),
    resource: ca.structure
  },
  heat: {
    path: "system.monitors.heat.value",
    monitor: (a) => a.system.monitors.heat,
    iconChecked: J.fontAwesome("fas fa-fire"),
    iconUnchecked: J.fontAwesome("far fa-sun"),
    iconHit: J.fontAwesome("fas fa-temperature-high"),
    resource: ca.heat
  },
  criticals: {
    path: "system.hybrid.criticals.value",
    monitor: (a) => {
      var e;
      return ((e = a.system.hybrid) == null ? void 0 : e.criticals) ?? { value: 0, max: 0 };
    },
    iconChecked: J.fontAwesome("fas fa-bolt"),
    iconUnchecked: J.fontAwesome("far fa-dot-circle"),
    iconHit: J.fontAwesome("fas fa-exclamation-triangle"),
    resource: ca.structure
  },
  anarchy: {
    path: "system.counters.anarchy.value",
    monitor: (a) => ({
      value: a.system.counters.anarchy.value,
      max: 6
    }),
    iconChecked: J.iconPath(`${Wa}/anarchy-point.webp`, "checkbar-img"),
    iconUnchecked: J.iconPath(`${Wa}/anarchy-point-off.webp`, "checkbar-img"),
    resource: di.anarchy
  },
  plot: {
    path: "system.counters.anarchy.value",
    monitor: (a) => {
      const e = a.system.counters.anarchy.value;
      return { value: e, max: e + 1 };
    },
    iconChecked: J.iconPath(`${Wa}/danger-point.webp`, "checkbar-img"),
    iconUnchecked: J.iconPath(`${Wa}/danger-point-off.webp`, "checkbar-img"),
    resource: di.anarchy
  },
  sceneAnarchy: {
    path: "system.counters.edgePools.chaos.value",
    monitor: (a) => {
      const e = a.getEdgePoolValue(A.counters.edgePools.chaos), t = a.getAttributeValue(A.actorAttributes.edge);
      return { value: e, max: t };
    },
    iconChecked: J.iconPath("systems/mwd/icons/default/explosion.svg", "checkbar-img"),
    iconUnchecked: J.iconPath("systems/mwd/icons/default/explosion.svg", "checkbar-img"),
    resource: di.edgePools.chaos
  },
  grit: {
    path: "system.counters.edgePools.grit.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(A.counters.edgePools.grit), max: a.getAttributeValue(A.actorAttributes.edge) }),
    iconChecked: J.iconPath("systems/mwd/icons/default/shield.svg", "checkbar-img"),
    iconUnchecked: J.iconPath("systems/mwd/icons/default/shield.svg", "checkbar-img"),
    resource: di.edgePools.grit
  },
  insight: {
    path: "system.counters.edgePools.insight.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(A.counters.edgePools.insight), max: a.getAttributeValue(A.actorAttributes.edge) }),
    iconChecked: J.iconPath("systems/mwd/icons/default/eye.svg", "checkbar-img"),
    iconUnchecked: J.iconPath("systems/mwd/icons/default/eye.svg", "checkbar-img"),
    resource: di.edgePools.insight
  },
  legend: {
    path: "system.counters.edgePools.legend.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(A.counters.edgePools.legend), max: a.getAttributeValue(A.actorAttributes.edge) }),
    iconChecked: J.iconPath("systems/mwd/icons/default/tower-flag.svg", "checkbar-img"),
    iconUnchecked: J.iconPath("systems/mwd/icons/default/tower-flag.svg", "checkbar-img"),
    resource: di.edgePools.legend
  },
  credibility: {
    path: "system.counters.edgePools.credibility.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(A.counters.edgePools.credibility), max: a.getAttributeValue(A.actorAttributes.edge) }),
    iconChecked: J.iconPath("systems/mwd/icons/misc/hand.svg", "checkbar-img"),
    iconUnchecked: J.iconPath("systems/mwd/icons/misc/hand.svg", "checkbar-img"),
    resource: di.edgePools.credibility
  },
  rumor: {
    path: "system.counters.edgePools.rumor.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(A.counters.edgePools.rumor), max: a.getAttributeValue(A.actorAttributes.edge) }),
    iconChecked: J.iconPath("systems/mwd/icons/default/mystery-man.svg", "checkbar-img"),
    iconUnchecked: J.iconPath("systems/mwd/icons/default/mystery-man.svg", "checkbar-img"),
    resource: di.edgePools.rumor
  }
}, Jt = foundry.utils.mergeObject(Mu, {});
class j {
  static init() {
    Handlebars.registerHelper("iconCheckbar", j.iconCheckbar), Handlebars.registerHelper("iconCheckbarHit", j.iconHit);
  }
  static hackCheckbars(e) {
    if (e) {
      const t = foundry.utils.mergeObject(Mu, {});
      foundry.utils.mergeObject(t, e, { recursive: !0 }), foundry.utils.mergeObject(Jt, t, { overwrite: !0 });
    }
  }
  static iconCheckbar(e, t) {
    return t ? j.iconChecked(e) : j.iconUnchecked(e);
  }
  static iconChecked(e) {
    var t;
    return (t = Jt[e]) == null ? void 0 : t.iconChecked;
  }
  static iconUnchecked(e) {
    var t;
    return (t = Jt[e]) == null ? void 0 : t.iconUnchecked;
  }
  static iconHit(e) {
    var t, i;
    return ((t = Jt[e]) == null ? void 0 : t.iconHit) ?? ((i = Jt[e]) == null ? void 0 : i.iconChecked);
  }
  static useArmor(e) {
    var t;
    return (t = Jt[e]) == null ? void 0 : t.useArmor;
  }
  static max(e, t) {
    var n;
    const i = (n = Jt[t]) == null ? void 0 : n.monitor(e);
    return ((i == null ? void 0 : i.max) ?? 0) + ((i == null ? void 0 : i.maxBonus) ?? 0);
  }
  static value(e, t) {
    var n;
    const i = (n = Jt[t]) == null ? void 0 : n.monitor(e);
    return (i == null ? void 0 : i.value) ?? 0;
  }
  static resistance(e, t, i = void 0) {
    return j.resistanceDetail(e, t, i).value;
  }
  static resistanceDetail(e, t, i = void 0) {
    var l, c;
    const n = (l = Jt[t]) == null ? void 0 : l.monitor(e), s = j._resolveResistance(n == null ? void 0 : n.resistance, i), r = j._resolveResistance(n == null ? void 0 : n.resistanceBonus, i), o = i === void 0 ? 0 : Number(((c = n == null ? void 0 : n.resistanceBonusByType) == null ? void 0 : c[i]) ?? 0);
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
    await j.setCounter(e, t, j.newValue(i, n), s, r);
  }
  static async addCounter(e, t, i, n = void 0) {
    if (i != 0) {
      const s = j.getCounterValue(e, t, n) ?? 0;
      await j.setCounter(e, t, s + i, n);
    }
  }
  static async setCounter(e, t, i, n = void 0, s = void 0) {
    switch (t) {
      case A.monitors.anarchy:
        return await j.setAnarchy(e, i);
      case A.monitors.sceneAnarchy:
        return await j.setSceneAnarchy(e, i);
    }
    return await j.setCheckbar(e, t, i);
  }
  static getCounterValue(e, t, i) {
    switch (t) {
      case A.monitors.anarchy:
        return j.getAnarchy(e, t);
    }
    return j.value(e, t);
  }
  static async setCheckbar(e, t, i) {
    if (i == j.getCounterValue(e, t))
      return;
    const n = Jt[t];
    if (n.path) {
      const s = j.max(e, t);
      if (s <= 0)
        return;
      await j._manageOverflow(n, e, t, i, s), i = Math.min(i, s), ra.checkOutOfRange(n.resource, i, 0, s), await e.setCheckbarValue(n.path, i);
    }
  }
  static async _manageOverflow(e, t, i, n, s) {
    if (n > s) {
      const r = e.overflow ? e.overflow(t) : void 0, o = e.recomputeOverflow ? e.recomputeOverflow(n - s) : n - s;
      r && o > 0 && (j._notifyOverflow(t, i, o, r), await j.addCounter(t, r, o));
    }
  }
  static _notifyOverflow(e, t, i, n) {
    const s = Ne(k.actor.monitors.overflow, {
      actor: e.name,
      monitor: k.actor.monitors[t],
      overflow: i,
      overflowMonitor: k.actor.monitors[n]
    });
    ui.notifications.warn(s);
  }
  static async _manageFatigueOverflow(e, t, i) {
    await j.addCounter(e, A.monitors.physical, t - i);
  }
  static async setAnarchy(e, t) {
    if (e.hasOwnAnarchy()) {
      if (e.hasGMAnarchy()) {
        await game.system.anarchy.gmAnarchy.setAnarchy(t), e.render();
        return;
      }
      await j._setAnarchyMonitor(e, A.monitors.anarchy, t);
    }
  }
  static async setSceneAnarchy(e, t) {
    await j._setAnarchyMonitor(e, A.monitors.sceneAnarchy, t);
  }
  static async _setAnarchyMonitor(e, t, i) {
    const n = j.value(e, t);
    await j.setCheckbar(e, t, i), game.user.isGM || j.notifyAnarchyChange(e, t, n, i);
  }
  static getAnarchy(e, t) {
    return !game.user.isGM && (!e.hasOwnAnarchy() || e.hasGMAnarchy()) || t == di.anarchy && (!e.hasOwnAnarchy() || e.hasGMAnarchy()) ? 0 : j.value(e, t);
  }
  static notifyAnarchyChange(e, t, i, n) {
    Wt.blindMessageToGM({
      from: game.user.id,
      content: Ne(
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
const { loadTemplates: Xf, renderTemplate: Zf } = foundry.applications.handlebars, Sl = {
  highlighted: ["far fa-times-circle", "fas fa-dice-one", "fas fa-dice-two", "fas fa-dice-three", "fas fa-dice-four", "fas fa-dice-five", "fas fa-dice-six"],
  dimmed: ["far fa-times-circle", "far fa-dice-one", "far fa-dice-two", "far fa-dice-three", "far fa-dice-four", "far fa-dice-five", "far fa-dice-six"]
};
class pi {
  static init() {
    Hooks.once("ready", async () => await this.onReady()), Handlebars.registerHelper("dice-cursor-array", (e, t) => pi.array(e ?? 0, t ?? 5)), Handlebars.registerHelper("dice-cursor-fas", (e, t) => pi.fasClass(e, t)), Handlebars.registerHelper("dice-cursor-active", (e, t) => pi.activeClass(e, t)), Handlebars.registerHelper("dice-cursor-color", (e, t) => pi.colorClass(e, t));
  }
  static async onReady() {
    await Xf([
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
    return pi.isActive(e, t) ? "active" : "inactive";
  }
  static fasClass(e, t) {
    const i = pi.isActive(e, t) ? Sl.highlighted : Sl.dimmed;
    return pi.$getFas(i, Math.abs(e));
  }
  static colorClass(e, t) {
    return e == 0 || !t ? e < 0 ? "fixed-dice-malus" : "fixed-dice-bonus" : e < 0 ? "variable-dice-malus" : "variable-dice-bonus";
  }
  static $getFas(e, t) {
    return e[t > 6 ? t % 6 : t];
  }
  static async diceCursor({ value: e, min: t, max: i, editable: n }) {
    return await Zf("systems/mwd/templates/roll/parts/dice-cursor.hbs", {
      value: e,
      min: t,
      max: i,
      editable: n
    });
  }
}
const Mt = {
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
  PROVIDE_DAMAGE_MODE: "anarchy-provideDamageMode"
}, Al = "anarchy-";
globalThis.ANARCHY_HOOKS = Mt;
class Zi {
  constructor() {
    this.hooks = [], Hooks.on("getSceneControlButtons", (e) => {
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
  static instance() {
    return game.system.anarchy.hooks;
  }
  static register(e) {
    Zi.instance()._register(e);
  }
  _register(e) {
    if (console.log(Ce + "HooksManager.register", e), !e.startsWith(Al))
      throw `For safety Anarchy Hooks names must be prefixed by '${Al}'`;
    this.hooks.push(e);
  }
}
const Tl = [
  A.itemType.assetModule,
  A.itemType.mechWeapon,
  A.itemType.personalWeapon,
  "weapon"
];
class fe {
  constructor() {
    this.modifiers = {
      groups: Me.mapObjetToKeyValue(k.modifier.group, "key", "label"),
      roll: fe._buildGroupOptions("roll"),
      attribute: fe._buildGroupOptions("attribute"),
      monitor: fe._buildGroupOptions("monitor"),
      other: fe._buildGroupOptions("other")
    }, Hooks.once("ready", () => this.onReady());
  }
  static _buildGroupOptions(e) {
    switch (e) {
      case "attribute":
        return {
          label: k.modifier.group[e],
          effects: Me.hbsAttributes.map((t) => ({ key: t.value, label: t.labelkey })),
          categories: []
        };
    }
    return {
      label: k.modifier.group[e],
      effects: Me.mapObjetToKeyValue(k.modifier[e].effect, "key", "label"),
      categories: Me.mapObjetToKeyValue(k.modifier[e].category, "key", "label")
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
                return Me.getDamageTypes().map((s) => ({ key: s.value, label: s.labelkey }));
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
        return Me.getAttributes().map((i) => ({ key: i.value, label: i.labelkey }));
      case "skill":
        return game.system.anarchy.skills.getSkills().map((i) => ({ key: i.code, label: i.labelkey }));
      case "attributeAction":
        const t = xe.all().map((i) => ({ key: i.code, label: i.labelkey }));
        return oe.distinct(t.map((i) => i.key)).map((i) => t.find((n) => n.key == i));
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
            return i.subCategory == e.attributeAction || i.subCategory == xe.getDefenseAttributeAction(e.defenseAction);
        }
      return !1;
    };
  }
  static computeRollModifiers(e, t, i) {
    const n = fe.buildRollModifiersFilter(t, i), s = (c) => c.group == "roll" && c.effect == i && n(c), r = fe._activeItems(e).map((c) => fe.itemModifiers(c, s)).reduce((c, u) => c.concat(u), []).sort(oe.descending((c) => c.modifier.value)), o = fe.$sumAssetModuleModifiers(r.filter((c) => Tl.includes(c.item.type)).map((c) => c.modifier.value)), l = oe.sumValues(r.filter((c) => !Tl.includes(c.item.type)).map((c) => c.modifier.value));
    return {
      value: o + l,
      sources: r
    };
  }
  static $sumAssetModuleModifiers(e) {
    const t = e.find((s) => s > 3) ?? 0, i = oe.sumValues(e.filter((s) => s < 0)), n = Math.min(3, oe.sumValues(e.filter((s) => s > 0 && s <= 3)));
    return i + Math.max(n, t);
  }
  static computeModifiers(e, t, i = void 0, n = void 0) {
    const s = fe._createFilter(t, i, n), r = fe._activeItems(e).map((l) => fe.itemModifiers(l, s)).reduce((l, c) => l.concat(c), []);
    return {
      value: oe.sumValues(r, (l) => l.modifier.value),
      sources: r
    };
  }
  static sumMonitorModifiers(e, t, i, n = void 0) {
    return fe.sumModifiers(fe._activeItems(e), "monitor", t, i, n);
  }
  static sumModifiers(e, t, i, n, s = void 0) {
    const r = fe._createFilter(t, i, n, s), o = fe._activeItems(e).map((l) => fe.itemModifiers(l, r)).reduce((l, c) => l.concat(c), []);
    return oe.sumValues(o, (l) => l.modifier.value);
  }
  static _createFilter(e, t, i, n = void 0) {
    return (s) => s.group == e && s.effect == (t ?? s.effect) && s.category == (i ?? s.category) && (n == null ? !0 : s.subCategory == n);
  }
  static countModifiers(e, t, i = void 0, n = void 0) {
    const s = fe._createFilter(t, i, n);
    return fe._activeItems(e).map((o) => fe.itemModifiers(o, s)).reduce((o, l) => o.concat(l), []).count;
  }
  static itemModifiers(e, t) {
    return fe._listItemModifiers(e, t).map((i) => fe._itemModifier(e, i));
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
const { loadTemplates: Xs, renderTemplate: Pw } = foundry.applications.handlebars, ke = {
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
}, wl = 4, ep = [
  // attribute1
  {
    code: "attribute1",
    options: {
      order: 1,
      category: ke.pool,
      hbsTemplateRoll: `${X}/roll/parts/select-attribute.hbs`
    },
    condition: (a) => Object.values(ft.rollType).includes(a.mode),
    isUsed: (a) => !0,
    factory: (a) => {
      var t;
      const e = a.attribute1 ?? ((t = a.skill) == null ? void 0 : t.system.attribute);
      return {
        labelkey: e ? k.attributes[e] : k.attributes.noAttributes,
        value: a.actor.getAttributeValue(e, a.activeItem),
        flags: { editable: a.skill },
        selected: e,
        choices: Me.getAttributes((i) => a.attributes.includes(i))
      };
    }
  },
  // attribute2
  {
    code: "attribute2",
    options: {
      order: 1,
      category: ke.pool,
      hbsTemplateRoll: `${X}/roll/parts/select-attribute.hbs`,
      hbsTemplateChat: `${X}/chat/parts/pool-attribute2.hbs`
    },
    condition: (a) => [ft.rollType.attribute, ft.rollType.attributeAction, ft.rollType.defense].includes(a.mode),
    isUsed: (a) => a.used,
    onChecked: (a, e) => a.used = !!e,
    factory: (a) => {
      const e = a.attribute2;
      return {
        labelkey: e ? k.attributes[e] : k.attributes.noAttributes,
        value: a.actor.getAttributeValue(e, a.activeItem),
        flags: { editable: ft.rollType.attribute == a.mode },
        selected: e,
        choices: Me.getAttributes((t) => a.attributes.includes(t))
      };
    }
  },
  // skill
  {
    code: "skill",
    options: {
      flags: {},
      order: 3,
      category: ke.pool,
      hbsTemplateRoll: `${X}/roll/parts/input-numeric.hbs`
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
      category: ke.pool,
      hbsTemplateRoll: `${X}/roll/parts/check-option.hbs`
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
      category: ke.pool,
      value: 0,
      labelkey: k.common.roll.modifiers.social.credibility,
      hbsTemplateRoll: `${X}/roll/parts/input-numeric.hbs`
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
      category: ke.pool,
      hbsTemplateRoll: `${X}/roll/parts/input-numeric.hbs`,
      min: -4,
      max: 4
    },
    factory: (a) => zi.computeRollModifiers(ke.pool, a)
  },
  // wounds
  {
    code: "wounds",
    options: {
      flags: { optional: !0 },
      order: 10,
      category: ke.pool,
      labelkey: k.common.roll.modifiers.wounds,
      hbsTemplateRoll: `${X}/roll/parts/input-numeric.hbs`
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
      category: ke.pool,
      value: 0,
      labelkey: k.common.roll.modifiers.other,
      hbsTemplateRoll: `${X}/roll/parts/input-numeric.hbs`,
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
      category: ke.glitch,
      value: 0,
      labelkey: k.common.roll.modifiers.glitch,
      hbsTemplateRoll: `${X}/roll/parts/input-numeric.hbs`,
      hbsTemplateChat: `${X}/chat/parts/glitch.hbs`,
      min: 0,
      max: 5
    },
    isUsed: (a) => a.value > 0,
    factory: (a) => {
      const e = a.actor.getWounds(), t = zi.computeRollModifiers(ke.glitch, a);
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
      category: ke.glitch,
      value: 0,
      labelkey: k.common.roll.modifiers.social.rumor,
      hbsTemplateRoll: `${X}/roll/parts/input-numeric.hbs`,
      hbsTemplateChat: `${X}/chat/parts/glitch.hbs`,
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
      category: ke.reroll,
      labelkey: k.common.roll.modifiers.reroll,
      hbsTemplateRoll: `${X}/roll/parts/input-numeric.hbs`,
      min: 0,
      max: wl
    },
    factory: (a) => {
      const e = zi.computeRollModifiers(ke.reroll, a), t = zi.computeRollModifiers(ke.rerollMax, a);
      return foundry.utils.mergeObject(e, {
        max: wl + Math.max(0, t.value ?? 0)
      });
    }
  },
  // reduction from opponent
  {
    code: "reduced",
    options: {
      order: 29,
      category: ke.pool,
      labelkey: k.common.roll.modifiers.reduced,
      hbsTemplateRoll: `${X}/roll/parts/input-numeric.hbs`,
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
      category: ke.rerollForced,
      labelkey: k.common.roll.modifiers.rerollForced,
      hbsTemplateRoll: `${X}/roll/parts/input-numeric.hbs`,
      min: -5,
      max: 0
    },
    factory: (a) => {
      var t;
      const e = zi.computeRollModifiers(ke.successReroll, a);
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
      category: ke.pool,
      value: 0,
      min: 0,
      max: 3,
      labelkey: k.common.roll.modifiers.anarchyDisposition,
      hbsTemplateRoll: `${X}/roll/parts/check-option.hbs`
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
      category: ke.risk,
      value: 0,
      labelkey: k.common.roll.modifiers.anarchyRisk,
      hbsTemplateRoll: `${X}/roll/parts/check-option.hbs`,
      hbsTemplateChat: `${X}/chat/parts/anarchy-risk.hbs`
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
      category: ke.edge,
      labelkey: k.common.roll.modifiers.edge,
      hbsTemplateRoll: `${X}/roll/parts/check-option.hbs`
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
      category: ke.opponentPool,
      labelkey: k.common.roll.modifiers.opponentPool,
      hbsTemplateRoll: `${X}/roll/parts/input-numeric.hbs`,
      min: 0,
      max: 4
    },
    factory: (a) => zi.computeRollModifiers(ke.opponentPool, a),
    condition: (a) => !a.attributeAction
  },
  // force opponent rerolls
  {
    code: "opponentReroll",
    options: {
      flags: { editDice: !0, editable: !0, forceDisplay: !0 },
      order: 100,
      category: ke.opponentReroll,
      value: 0,
      labelkey: k.common.roll.modifiers.opponentReroll,
      hbsTemplateRoll: `${X}/roll/parts/input-numeric.hbs`,
      min: 0,
      max: 4
    },
    factory: (a) => zi.computeRollModifiers(ke.opponentReroll, a),
    condition: (a) => !a.attributeAction
  }
];
class zi {
  constructor() {
    this.registeredParameters = {}, Zi.register(Mt.REGISTER_ROLL_PARAMETERS), Zi.register(Mt.MODIFY_ROLL_PARAMETER), Hooks.on(Mt.MODIFY_ROLL_PARAMETER, (e) => this._validate(e)), Hooks.once(Mt.REGISTER_ROLL_PARAMETERS, (e) => ep.forEach(
      (t) => e(t)
    )), Hooks.once("ready", () => this.onReady());
  }
  async onReady() {
    Hooks.callAll(Mt.REGISTER_ROLL_PARAMETERS, async (t) => {
      Hooks.callAll(Mt.MODIFY_ROLL_PARAMETER, t), t.ignore || await this._register(t);
    });
    const e = oe.distinct([].concat(Object.values(this.registeredParameters).map((t) => t.options.hbsTemplateRoll)).concat(Object.values(this.registeredParameters).map((t) => t.options.hbsTemplateChat)).filter((t) => typeof t == "string" && t.length > 0));
    await Xs(oe.distinct(e)), await Xs([`${X}/roll/parts/parameter-label.hbs`]);
  }
  _validate(e) {
    e.code || (console.error(`${Ce} RollParameter does not have a code`, e), e.ignore = !0);
  }
  async _register(e) {
    if (this.registeredParameters[e.code]) {
      console.error(`${Ce} RollParameter ${e.code} is already registered`, e);
      return;
    }
    e.onChecked || (e.onChecked = (t, i) => t.used = i), e.onValue = (t, i) => t.value = i, this.registeredParameters[e.code] = e;
  }
  async _optionalLoadTemplate(e) {
    e && await Xs([e]);
  }
  build(e) {
    return Object.values(this.registeredParameters).filter((t) => !t.condition || t.condition(e)).map((t) => this._computeParameter(t, e));
  }
  compute(e) {
    const t = e.filter((s) => this.isParameterUsed(s)), i = oe.classify(t, (s) => s.category), n = {};
    return Object.values(i).forEach((s) => n[s[0].category] = oe.sumValues(s, (r) => r.value ?? (r.optional ? 1 : 0))), n;
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
    return fe.computeRollModifiers(n, t, e);
  }
}
const { ApplicationV2: tp, HandlebarsApplicationMixin: ip } = foundry.applications.api, { loadTemplates: ap, renderTemplate: np } = foundry.applications.handlebars;
var gs, Cu;
const Je = class Je extends ip(tp) {
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
    await ap([
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
    const i = foundry.utils.mergeObject(Je.prepareActorRoll(e), {
      mode: ft.rollType.attribute,
      attribute1: t
    });
    await Je.create(i);
  }
  static async rollAttributeAction(e, t) {
    const i = foundry.utils.mergeObject(Je.prepareActorRoll(e), {
      mode: ft.rollType.attributeAction,
      attributeAction: t.code,
      attribute1: t.attributeFunction1(e),
      attribute2: t.attributeFunction2(e)
    });
    await Je.create(i);
  }
  static async rollSkill(e, t, i) {
    const n = foundry.utils.mergeObject(Je.prepareActorRoll(e), {
      mode: ft.rollType.skill,
      skill: t,
      attribute1: (t == null ? void 0 : t.system.attribute) ?? A.actorAttributes.reflexes,
      specialization: i
    });
    await Je.create(n);
  }
  static async rollWeapon(e, t, i, n) {
    const s = foundry.utils.mergeObject(Je.prepareActorRoll(e), {
      mode: ft.rollType.weapon,
      weapon: i,
      skill: t,
      attribute1: (t == null ? void 0 : t.system.attribute) ?? e.getPhysicalAgility(),
      specialization: void 0,
      targeting: n
    });
    await Je.create(s);
  }
  static async rollDefense(e, t, i) {
    const n = foundry.utils.mergeObject(Je.prepareActorRoll(e), {
      mode: ft.rollType.defense,
      attribute1: t.attributeFunction1(e),
      attribute2: t.attributeFunction2(e),
      defenseAction: t.code,
      attackRoll: i.attackRoll,
      tokenId: i.defenderTokenId,
      choiceChatMessageId: i.choiceChatMessageId
    });
    await Je.create(n);
  }
  static async itemAttributeRoll(e, t) {
    const i = foundry.utils.mergeObject(Je.prepareActorRoll(e.actor), {
      mode: ft.rollType.attribute,
      item: e,
      attribute1: t,
      attributes: e.actor.getUsableAttributes(e)
    });
    await Je.create(i);
  }
  static async create(e) {
    var r;
    const t = C(r = Je, gs, Cu).call(r, e), i = await np(`${X}/roll/roll-dialog-title.hbs`, t), n = {
      id: `roll-dialog-${foundry.utils.randomID()}`,
      classes: [game.system.anarchy.styles.selectCssClass(), ...Je.DEFAULT_OPTIONS.classes],
      window: { title: i }
    };
    return new Je({ roll: t }, n).render({ force: !0 });
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
      n.onChecked(n, i.currentTarget.checked), n.category == ke.pool && await this._updateParameterValue(n, n.value), n.code == "edge" && this.html.find(`.parameter[data-parameter-code='${n.code}'] .edge-pool-select`).prop("disabled", !n.used);
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
    return await pi.diceCursor({
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
gs = new WeakSet(), Cu = function(e) {
  const t = game.system.anarchy.rollParameters.build(e).sort(oe.ascending((i) => i.order ?? 200));
  return foundry.utils.mergeObject(e, {
    ENUMS: Me.getEnums((i) => e.attributes.includes(i)),
    ANARCHY: k,
    parameters: t
  });
}, we(Je, gs), O(Je, "PARTS", {
  body: {
    template: `${X}/roll/roll-dialog.hbs`
  }
});
let ai = Je;
const Do = 2, Dr = "skillSpecializationCatalog", sp = [
  { key: "running", label: "Running" },
  { key: "jumping", label: "Jumping" },
  { key: "swimming", label: "Swimming" },
  { key: "climbing", label: "Climbing" },
  { key: "acrobatics", label: "Acrobatics" }
], Eu = /* @__PURE__ */ new Set(), li = [
  // Strength
  { code: "athletics", label: "Athletics", attribute: "strength", icon: `${de}/athletics.svg`, domains: ["physical"], specializations: sp },
  { code: "heavyWeapons", label: "Heavy Weapons", attribute: "strength", icon: `${de}/heavy-weapons.svg`, defense: "physicalDefense", domains: ["physical"] },
  // Reflexes
  { code: "escapeArtist", label: "Escape Artist", attribute: "reflexes", icon: `${de}/escape-artist.svg`, domains: ["physical"] },
  { code: "gunnery", label: "Gunnery", attribute: "reflexes", icon: `${de}/vehicle-weapons.svg`, defense: "physicalDefense", domains: ["physical"] },
  { code: "meleeCombat", label: "Melee Combat", attribute: "reflexes", icon: `${de}/close-combat.svg`, defense: "physicalDefense", domains: ["physical"] },
  { code: "piloting", label: "Piloting", attribute: "reflexes", icon: `${de}/piloting-ground-steering-wheel.svg`, domains: ["physical"] },
  { code: "projectileWeapons", label: "Projectile Weapons", attribute: "reflexes", icon: `${de}/projectile-weapons.svg`, defense: "physicalDefense", domains: ["physical"] },
  { code: "firearms", label: "Firearms", attribute: "reflexes", icon: `${de}/firearms.svg`, defense: "physicalDefense", domains: ["physical"] },
  { code: "stealth", label: "Stealth", attribute: "reflexes", icon: `${de}/stealth.svg`, domains: ["physical"] },
  { code: "zeroGOps", label: "Zero-G Operations", attribute: "reflexes", icon: `${de}/fly.svg`, domains: ["physical"] },
  // Intelligence
  { code: "art", label: "Art", attribute: "intelligence", icon: `${de}/art.svg`, domains: ["mental"] },
  { code: "artillery", label: "Artillery", attribute: "intelligence", icon: `${de}/artillery.svg`, domains: ["mental"] },
  { code: "systemOps", label: "System Operations", attribute: "intelligence", icon: `${de}/electronics.svg`, domains: ["mental"] },
  { code: "computers", label: "Computers", attribute: "intelligence", icon: `${de}/hacking.svg`, domains: ["mental"] },
  { code: "demolitions", label: "Demolitions", attribute: "intelligence", icon: `${de}/demolition.svg`, domains: ["mental"] },
  { code: "medTech", label: "Medtech", attribute: "intelligence", icon: `${de}/biotech.svg`, domains: ["mental"] },
  { code: "science", label: "Science", attribute: "intelligence", icon: `${de}/skills.svg`, domains: ["mental"] },
  { code: "perception", label: "Perception", attribute: "intelligence", icon: `${de}/skills.svg`, domains: ["mental"] },
  { code: "tactics", label: "Tactics", attribute: "intelligence", icon: `${de}/skills.svg`, domains: ["mental"] },
  { code: "technician", label: "Technician", attribute: "intelligence", icon: `${de}/engineering.svg`, domains: ["mental"] },
  { code: "tracking", label: "Tracking", attribute: "intelligence", icon: `${de}/tracking.svg`, domains: ["physical", "mental"] },
  { code: "navigation", label: "Navigation", attribute: "intelligence", icon: `${de}/piloting-other.svg`, domains: ["mental"] },
  // Guts
  { code: "administration", label: "Administration", attribute: "willpower", icon: `${de}/knowledge.svg`, domains: ["social", "mental"] },
  { code: "animalHandling", label: "Animal Handling", attribute: "willpower", icon: `${de}/animals.svg`, domains: ["physical", "mental"] },
  { code: "survival", label: "Survival", attribute: "willpower", icon: `${de}/survival.svg`, domains: ["physical", "mental"] },
  // Charisma
  { code: "acting", label: "Acting", attribute: "charisma", icon: `${de}/con-art.svg`, domains: ["social"] },
  { code: "disguise", label: "Disguise", attribute: "charisma", icon: `${de}/disguise.svg`, domains: ["social", "mental"] },
  { code: "leadership", label: "Leadership", attribute: "charisma", icon: `${de}/psychology.svg`, domains: ["social"] },
  { code: "negotiation", label: "Negotiation", attribute: "charisma", icon: `${de}/negotiation.svg`, domains: ["social"] },
  { code: "etiquette", label: "Etiquette", attribute: "charisma", icon: `${de}/etiquette.svg`, domains: ["social"] },
  { code: "streetwise", label: "Streetwise", attribute: "charisma", icon: `${de}/etiquette2.svg`, domains: ["social"] },
  { code: "intimidation", label: "Intimidation", attribute: "charisma", icon: `${de}/intimidation.svg`, domains: ["social", "mental"] }
].map(rp);
for (const a of li)
  Eu.add(a.code);
function rp(a) {
  return {
    ...a,
    label: a.label ?? a.code,
    icon: a.icon ?? `${yn}/icons/skills/skills.svg`,
    specializations: _o(a.specializations)
  };
}
function Oo(a) {
  return String(a ?? "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function _o(a = []) {
  const e = /* @__PURE__ */ new Set();
  return (Array.isArray(a) ? a : []).map((t) => {
    const i = Oo((t == null ? void 0 : t.key) ?? (t == null ? void 0 : t.label) ?? t);
    return !i || e.has(i) ? null : (e.add(i), {
      key: i,
      label: String((t == null ? void 0 : t.label) ?? (t == null ? void 0 : t.key) ?? t ?? i).trim() || i
    });
  }).filter(Boolean);
}
function op(a = []) {
  const e = new Error(a[0] ?? "Invalid skill specialization data.");
  return e.validationErrors = a, e;
}
function lp() {
  const a = {};
  for (const e of li) {
    const t = (Array.isArray(e.specializations) ? e.specializations : []).map((i) => String((i == null ? void 0 : i.label) ?? "").trim()).filter(Boolean);
    t.length && (a[e.code] = t);
  }
  return a;
}
const cp = Object.freeze(lp());
function up(a, e = [], { strict: t = !1, errors: i = [] } = {}) {
  var s, r;
  if (!Array.isArray(e)) {
    if (t) {
      const o = ((s = Or(a)) == null ? void 0 : s.label) ?? a;
      i.push(`${o}: expected an array of specialization labels.`);
    }
    return [];
  }
  const n = [];
  for (const o of e) {
    const l = String(o ?? "").trim();
    if (!l) {
      if (t) {
        const c = ((r = Or(a)) == null ? void 0 : r.label) ?? a;
        i.push(`${c}: specialization labels cannot be blank.`);
      }
      continue;
    }
    n.push(l);
  }
  return _o(n).map((o) => o.label);
}
function Or(a) {
  return li.find((e) => e.code === a);
}
function Pu(a, { strict: e = !1 } = {}) {
  const t = a && typeof a == "object" && !Array.isArray(a) ? a : {}, i = [], n = {};
  for (const [s, r] of Object.entries(t)) {
    if (!Eu.has(s)) {
      e && i.push(`Unknown skill code "${s}".`);
      continue;
    }
    const o = up(s, r, { strict: e, errors: i });
    o.length && (n[s] = o);
  }
  if (e && i.length) throw op(i);
  return Object.fromEntries(
    li.map((s) => [s.code, n[s.code]]).filter(([, s]) => Array.isArray(s) && s.length)
  );
}
function dp() {
  var a, e, t;
  try {
    if ((t = (e = (a = game == null ? void 0 : game.settings) == null ? void 0 : a.settings) == null ? void 0 : e.has) != null && t.call(e, `${T}.${Dr}`))
      return game.settings.get(T, Dr);
  } catch {
  }
  return Iu();
}
function Ru() {
  const a = Pu(dp(), { strict: !1 });
  return Object.fromEntries(
    Object.entries(a).map(([e, t]) => [
      e,
      _o(t)
    ])
  );
}
function Nu(a = [], { allowedKeys: e = null } = {}) {
  const t = /* @__PURE__ */ new Set();
  return (Array.isArray(a) ? a : []).map((i) => Oo(i)).filter((i) => !i || t.has(i) || e && !e.has(i) ? !1 : (t.add(i), !0));
}
function Bt(a) {
  const e = Or(a);
  if (e)
    return {
      ...e,
      specializations: ea(e.code)
    };
}
function as() {
  const a = Ru();
  return [...li].map((e) => ({
    ...e,
    specializations: [...a[e.code] ?? []]
  })).sort((e, t) => e.label.localeCompare(t.label));
}
function ea(a) {
  return [...Ru()[a] ?? []];
}
function Lo(a, e) {
  const t = Oo(e);
  if (t)
    return ea(a).find((i) => i.key === t);
}
function mp(a, e) {
  var t;
  return ((t = Lo(a, e)) == null ? void 0 : t.label) ?? "";
}
function Iu() {
  return foundry.utils.deepClone(cp);
}
function Ms(a, { strict: e = !1 } = {}) {
  return Pu(a, { strict: e });
}
function ns(a = []) {
  return Nu(a);
}
function fp(a, e = []) {
  const t = new Set(ea(a).map((n) => n.key)), i = new Set(Nu(e, { allowedKeys: t }));
  return ea(a).filter((n) => i.has(n.key)).map((n) => n.key);
}
function _r(a, e) {
  var t, i;
  return ns(
    ((i = (t = a == null ? void 0 : a.skills) == null ? void 0 : t[e]) == null ? void 0 : i.specializations) ?? []
  );
}
function Cs(a, e) {
  return fp(
    e,
    _r(a, e)
  );
}
function Du(a, e) {
  const t = new Set(Cs(a, e));
  return ea(e).filter((i) => t.has(i.key));
}
function pp(a) {
  const e = Math.ceil(a.length / 2);
  return { left: a.slice(0, e), right: a.slice(e) };
}
function hp(a) {
  var e, t;
  a.skills ?? (a.skills = {});
  for (const i of li) {
    const n = (e = a.skills)[t = i.code] ?? (e[t] = {});
    n.rating == null && (n.rating = 0), n.bonus == null && (n.bonus = 0), n.specializations = ns(n.specializations);
  }
}
function Ou(a, { bonusBySkill: e = null } = {}) {
  const t = as(), { left: i, right: n } = pp(t), s = (r) => {
    var y, b, S, w, v, P;
    const o = r.code, l = r.attribute, c = Number(((b = (y = a == null ? void 0 : a.skills) == null ? void 0 : y[o]) == null ? void 0 : b.rating) ?? 0), u = Number(((w = (S = a == null ? void 0 : a.attributes) == null ? void 0 : S[l]) == null ? void 0 : w.value) ?? 0), d = Number(((P = (v = a == null ? void 0 : a.skills) == null ? void 0 : v[o]) == null ? void 0 : P.bonus) ?? 0), m = Number((e == null ? void 0 : e[o]) ?? 0), f = d + m, p = Du(a, o), h = ea(o).filter((E) => !p.some((z) => z.key === E.key)), g = u + c + f;
    return {
      code: o,
      label: r.label,
      icon: r.icon,
      attribute: l,
      attributeLabel: Me != null && Me.localizeAttribute ? Me.localizeAttribute(l) : l,
      rating: c,
      base: u,
      bonus: f,
      total: g,
      rollPayload: JSON.stringify({ intent: "skill", key: o }),
      canAddSpecialization: h.length > 0,
      specializations: p.map((E) => ({
        ...E,
        bonus: Do,
        rollPayload: JSON.stringify({
          intent: "skill",
          key: o,
          specializationKey: E.key,
          specializationLabel: E.label
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
const va = {
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
}, _u = "statusConditionCatalog", gp = Object.freeze([
  { value: "person", label: "Person" },
  { value: "machine", label: "Machine" },
  { value: "all", label: "All Actors" },
  { value: "character", label: "Character" },
  { value: "npc", label: "NPC" },
  { value: "vehicle", label: "Vehicle" },
  { value: "battlemech", label: "BattleMech" }
]), kl = Object.freeze([
  { value: "false", label: "No" },
  { value: "true", label: "Yes" }
]), Lu = Object.freeze([
  A.actorTypes.character,
  A.actorTypes.npc
]), xu = Object.freeze([
  A.actorTypes.vehicle,
  A.actorTypes.battlemech
]), yp = Object.freeze([...Lu, ...xu]), ss = Object.freeze({
  person: Lu,
  machine: xu,
  all: yp,
  character: [A.actorTypes.character],
  npc: [A.actorTypes.npc],
  vehicle: [A.actorTypes.vehicle],
  battlemech: [A.actorTypes.battlemech]
}), $u = "systems/mwd/img/icons/status", bp = Object.freeze([
  // Person conditions: lightly filtered from the existing status/icon pool.
  ae("prone", "Prone", "person", "physical", ["movement", "posture"], "prone.svg", { modifierKey: "prone", order: 10 }),
  ae("blinded", "Blinded", "person", "sensory", ["vision"], "blinded.svg", { modifierKey: "blinded", order: 20 }),
  ae("frightened", "Frightened", "person", "mental", ["morale"], "brain_injury.svg", { modifierKey: "frightened", order: 30 }),
  ae("deafened", "Deafened", "person", "sensory", ["hearing"], "deafened.svg", { order: 40 }),
  ae("hidden", "Hidden", "person", "tactical", ["stealth"], "hidden.svg", { order: 50 }),
  ae("suppressed", "Suppressed", "person", "tactical", ["offense"], "suppressed.svg", { order: 60 }),
  ae("grappled", "Grappled", "person", "physical", ["movement"], "grappled.svg", { order: 70 }),
  ae("stunned", "Stunned", "person", "physical", ["action"], "concussion.svg", { order: 80 }),
  ae("knockedOut", "Knocked Out", "person", "physical", ["unconscious"], "knockout.svg", { order: 90 }),
  ae("onFire", "On Fire", "all", "hazard", ["fire", "heat", "escalating"], "on_fire.svg", { order: 100 }),
  ae("drugged", "Drugged", "person", "chemical", ["impairment"], "drugged.svg", { order: 110 }),
  ae("radiation", "Radiation", "person", "hazard", ["radiation"], "radiation_low.svg", { order: 120 }),
  ae("overloaded", "Overloaded", "all", "reactor", ["heat", "actionRestriction"], "surge.svg", { managed: !0, modifierKey: "overloaded", order: 130 }),
  ae("preparedInterrupt", "Prepared", "person", "tactical", ["reaction", "prepared"], "readied_action.svg", { manual: !1, managed: !0, order: 140 }),
  ae("machineCritical", "Machine Critical", "machine", "damage", ["critical", "system"], "surge.svg", { manual: !1, managed: !0, order: 150 }),
  // Machine stability and movement.
  ae("unstable", "Unstable", "machine", "stability", ["movement", "piloting", "knockdown"], "falling.svg", { order: 1e3 }),
  ae("staggeredMechanical", "Staggered (Mechanical)", "machine", "stability", ["movement", "actionRestriction"], "falling.svg", { order: 1010 }),
  ae("proneMechFall", "Prone (Mech Fall)", "battlemech", "stability", ["movement", "posture", "standUp"], "prone.svg", { order: 1020 }),
  ae("skidding", "Skidding", "machine", "movement", ["forcedMovement", "tracking"], "falling.svg", { order: 1030 }),
  ae("stalled", "Stalled", "machine", "movement", ["movement", "actionRestriction"], "emp.svg", { order: 1040 }),
  ae("limping", "Limping", "machine", "movement", ["movement", "location"], "broken_leg.svg", { order: 1050 }),
  ae("jumpJetFailure", "Jump Jet Failure", "battlemech", "movement", ["jump", "equipment"], "surge.svg", { order: 1060 }),
  // Machine weapons.
  ae("weaponFailure", "Weapon Failure", "machine", "weapon", ["weapon", "mountScoped"], "broken_weapon.svg", { order: 1100 }),
  ae("jammedBallistic", "Jammed (Ballistic)", "machine", "weapon", ["weapon", "ballistic", "clearAction"], "broken_weapon.svg", { order: 1110 }),
  ae("armDestroyed", "Arm Destroyed", "battlemech", "damage", ["location", "weapon", "arm"], "dismembered_arm.svg", { order: 1120 }),
  // Sensors and electronics.
  ae("sensorDegraded", "Sensor Degraded", "machine", "sensor", ["sensor", "perception"], "all-seeing-eye.webp", { order: 1200 }),
  ae("sensorBlind", "Sensor Blind", "machine", "sensor", ["sensor", "targeting", "rangeLimit"], "damaged_eye.svg", { order: 1210 }),
  ae("ecmJamming", "ECM Jamming", "machine", "electronicWarfare", ["ecm", "tracking"], "emp.svg", { order: 1220 }),
  ae("ecmShrouded", "ECM Shrouded", "machine", "electronicWarfare", ["ecm", "defense"], "hidden.svg", { order: 1230 }),
  ae("eccmBoosted", "ECCM Boosted", "machine", "electronicWarfare", ["eccm", "sensor"], "all-seeing-eye.webp", { order: 1240 }),
  ae("sensorLocked", "Sensor Locked", "machine", "sensor", ["sensor", "targeted"], "all-seeing-eye.webp", { order: 1250 }),
  // Reactor and heat.
  ae("reactorInstability", "Reactor Instability", "machine", "reactor", ["heat", "reactor", "escalating"], "surge.svg", { order: 1300 }),
  ae("shutdown", "Shutdown", "machine", "reactor", ["heat", "actionRestriction"], "emp.svg", { order: 1310 }),
  ae("overheating", "Overheating", "machine", "reactor", ["heat", "escalating"], "on_fire_mild.svg", { order: 1320 }),
  ae("reactorBreach", "Reactor Breach", "machine", "reactor", ["reactor", "catastrophic", "countdown"], "radiation_high.svg", { order: 1330 }),
  // Machine damage and battlefield exposure.
  ae("legDestroyed", "Leg Destroyed", "battlemech", "damage", ["location", "movement", "leg"], "dismembered_leg.svg", { order: 1400 }),
  ae("exposed", "Exposed", "machine", "tactical", ["defense", "vulnerable"], "target.svg", { icon: `${$u}/falling.svg`, order: 1410 }),
  ae("entrenchedHullDown", "Entrenched / Hull Down", "machine", "tactical", ["defense", "cover"], "cover.svg", { order: 1420 }),
  ae("obscured", "Obscured (Smoke/Dust)", "machine", "visibility", ["visibility", "cover"], "hidden.svg", { order: 1430 }),
  // Tactical markers.
  ae("evasiveWeave", "Evasive Weave", "machine", "tactical", ["defense", "attackPenalty", "selfInduced"], "falling.svg", { order: 1500 }),
  ae("braced", "Braced", "machine", "tactical", ["defense", "mobilityPenalty"], "cover.svg", { order: 1510 }),
  ae("overextended", "Overextended", "machine", "tactical", ["attack", "defensePenalty"], "surge.svg", { order: 1520 }),
  ae("targetFocused", "Target Focused", "machine", "tactical", ["targeted", "attack"], "all-seeing-eye.webp", { order: 1530 }),
  ae("suppressedMechanical", "Suppressed", "machine", "tactical", ["offense", "suppressed"], "suppressed.svg", { order: 1540 })
]);
function ae(a, e, t, i, n, s, r = {}) {
  return {
    id: a,
    label: e,
    actorGroup: t,
    category: i,
    tags: n,
    icon: r.icon ?? `${$u}/${s}`,
    manual: r.manual ?? !0,
    managed: r.managed ?? !1,
    modifierKey: r.modifierKey ?? "",
    order: r.order ?? 0
  };
}
function Sp() {
  return typeof foundry < "u" && (foundry == null ? void 0 : foundry.utils);
}
function Ap(a) {
  return Sp() && typeof foundry.utils.deepClone == "function" ? foundry.utils.deepClone(a) : JSON.parse(JSON.stringify(a));
}
function vl(a, e = !1) {
  if (typeof a == "boolean") return a;
  const t = String(a ?? "").trim().toLowerCase();
  return t ? ["true", "1", "yes", "y", "on"].includes(t) : e;
}
function Bu() {
  return Ap(bp);
}
function xo(a) {
  const e = String(a ?? "").trim();
  if (!e) return "";
  const t = e.replace(/([a-z0-9])([A-Z])/g, "$1 $2").split(/[^A-Za-z0-9]+/).map((i) => i.trim()).filter(Boolean);
  return t.length ? t.map((i, n) => {
    const s = i.toLowerCase();
    return n === 0 ? s : `${s.charAt(0).toUpperCase()}${s.slice(1)}`;
  }).join("") : "";
}
function $o(a = []) {
  const e = Array.isArray(a) ? a : String(a ?? "").split(","), t = /* @__PURE__ */ new Set(), i = [];
  for (const n of e) {
    const s = xo(n);
    !s || t.has(s) || (t.add(s), i.push(s));
  }
  return i;
}
function Tp(a = []) {
  return $o(a).join(", ");
}
function zu(a, e = "person") {
  const i = String(a ?? "").trim().toLowerCase();
  return i === "battlemech" ? "battlemech" : Object.prototype.hasOwnProperty.call(ss, i) ? i : e;
}
function wp(a) {
  return [...ss[zu(a)] ?? []];
}
function kp(a = {}, { strict: e = !1, index: t = 0 } = {}) {
  const i = [], n = `Row ${t + 1}`, s = String((a == null ? void 0 : a.id) ?? "").trim(), r = String((a == null ? void 0 : a.label) ?? "").trim(), o = String((a == null ? void 0 : a.actorGroup) ?? "person").trim(), l = zu(o, ""), c = xo((a == null ? void 0 : a.category) ?? "general") || "general", u = $o(a == null ? void 0 : a.tags), d = String((a == null ? void 0 : a.icon) ?? "").trim(), m = String((a == null ? void 0 : a.modifierKey) ?? "").trim(), f = Number((a == null ? void 0 : a.order) ?? 0);
  if (s || i.push(`${n}: id cannot be blank.`), r || i.push(`${n}: label cannot be blank.`), (!l || o && !Object.prototype.hasOwnProperty.call(ss, l)) && i.push(`${n}: actorGroup must be one of ${Object.keys(ss).join(", ")}.`), m && !(va != null && va[m]) && i.push(`${n}: modifierKey "${m}" is not a known mechanics-backed status.`), Number.isFinite(f) || i.push(`${n}: order must be numeric.`), e && i.length) {
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
    manual: vl(a == null ? void 0 : a.manual, !0),
    managed: vl(a == null ? void 0 : a.managed, !1),
    modifierKey: m,
    order: Number.isFinite(f) ? Math.trunc(f) : 0
  };
}
function ta(a = [], { strict: e = !1 } = {}) {
  const t = Array.isArray(a) ? a : [], i = [], n = /* @__PURE__ */ new Set(), s = [];
  if (t.forEach((r, o) => {
    try {
      const l = kp(r, { strict: e, index: o });
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
function Es(a = void 0) {
  var i, n;
  if (a !== void 0) return ta(a, { strict: !1 });
  const e = (i = globalThis.game) == null ? void 0 : i.settings, t = (n = e == null ? void 0 : e.get) == null ? void 0 : n.call(e, T, _u);
  return ta(
    Array.isArray(t) ? t : Bu(),
    { strict: !1 }
  );
}
function Ps(a, e = Es()) {
  const t = String(a ?? "").trim();
  return t ? e.find((i) => String(i.id ?? "").trim() === t) ?? null : null;
}
function Fu(a = null) {
  return String(
    typeof a == "string" ? a : (a == null ? void 0 : a.type) ?? ""
  ).trim();
}
function Rs(a, e = null) {
  const t = Fu(e);
  return !t || !a ? !1 : wp(a.actorGroup).includes(t);
}
function vp({ statusId: a = "", actor: e = null, metadata: t = {}, catalogEntry: i = null } = {}) {
  const n = i ?? Ps(a), s = $o((t == null ? void 0 : t.tags) ?? (n == null ? void 0 : n.tags) ?? []);
  return {
    id: String(a || (n == null ? void 0 : n.id) || "").trim(),
    category: xo((t == null ? void 0 : t.category) ?? (n == null ? void 0 : n.category) ?? "general") || "general",
    tags: s,
    actorGroup: String((t == null ? void 0 : t.actorGroup) ?? (n == null ? void 0 : n.actorGroup) ?? "").trim(),
    actorType: Fu(e),
    scope: String((t == null ? void 0 : t.scope) ?? "").trim(),
    location: String((t == null ? void 0 : t.location) ?? "").trim(),
    itemUuid: String((t == null ? void 0 : t.itemUuid) ?? "").trim(),
    targetUuid: String((t == null ? void 0 : t.targetUuid) ?? "").trim(),
    severity: String((t == null ? void 0 : t.severity) ?? "").trim(),
    notes: String((t == null ? void 0 : t.notes) ?? "").trim()
  };
}
function Mp(a = Es()) {
  return ta(a, { strict: !1 }).map((e) => ({
    id: e.id,
    name: e.label,
    label: e.label,
    img: e.icon,
    icon: e.icon
  }));
}
function Ml() {
  if (typeof CONFIG > "u") return [];
  const a = Mp();
  return CONFIG.statusEffects = a, a;
}
const Cp = /* @__PURE__ */ new Set(["overloaded", "preparedInterrupt"]);
function Cl(a) {
  return a ? (a == null ? void 0 : a.document) ?? a : null;
}
function Ep(a, e) {
  var i, n, s;
  if (!a) return null;
  const t = Cl(e) ?? Cl(a == null ? void 0 : a.token);
  return t ? t.isLinked ? t.baseActor ?? ((s = (i = game.actors) == null ? void 0 : i.get) == null ? void 0 : s.call(i, ((n = t == null ? void 0 : t.baseActor) == null ? void 0 : n.id) ?? "")) ?? t.actor ?? a : t.actor ?? a : a;
}
function Bo(a) {
  const e = String(a ?? "").trim();
  if (!e) return "Status";
  const n = (e.includes(".") ? e.split(".").at(-1) : e).replace(/^status/i, "").replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim();
  return n ? n.replace(/\b\w/g, (s) => s.toUpperCase()) : e;
}
function Pp(a) {
  const e = String((a == null ? void 0 : a.name) ?? (a == null ? void 0 : a.label) ?? (a == null ? void 0 : a.id) ?? "Status").trim();
  return e ? Bo(e) : "Status";
}
function Rp(a) {
  const e = typeof (a == null ? void 0 : a.img) == "string" ? a.img.trim() : "";
  if (e) return e;
  const t = a ? Object.getOwnPropertyDescriptor(a, "icon") : null;
  return "value" in (t ?? {}) ? String(t.value ?? "").trim() : "";
}
function Np(a) {
  var e, t;
  return ((t = (e = globalThis.CSS) == null ? void 0 : e.escape) == null ? void 0 : t.call(e, String(a ?? ""))) ?? String(a ?? "").replace(/["\\]/g, "\\$&");
}
function Uu(a) {
  var e;
  return Object.prototype.hasOwnProperty.call(((e = a == null ? void 0 : a.system) == null ? void 0 : e.burn) ?? {}, "overloaded");
}
function Hu(a, e) {
  var n;
  const t = String(e ?? "").trim();
  return !a || !t ? null : Array.from(((n = a.effects) == null ? void 0 : n.contents) ?? a.effects ?? []).find((s) => {
    var r, o, l, c, u, d, m;
    return (o = (r = s == null ? void 0 : s.statuses) == null ? void 0 : r.has) != null && o.call(r, t) || Array.isArray(s == null ? void 0 : s.statuses) && s.statuses.includes(t) || ((c = (l = s == null ? void 0 : s.getFlag) == null ? void 0 : l.call(s, T, "status")) == null ? void 0 : c.id) === t || ((m = (d = (u = s == null ? void 0 : s.flags) == null ? void 0 : u[T]) == null ? void 0 : d.status) == null ? void 0 : m.id) === t ? !0 : String((s == null ? void 0 : s.statusId) ?? (s == null ? void 0 : s.id) ?? "").trim() === t;
  }) ?? null;
}
function ju(a, e) {
  var i, n, s;
  const t = Hu(a, e);
  return ((i = t == null ? void 0 : t.getFlag) == null ? void 0 : i.call(t, T, "status")) ?? ((s = (n = t == null ? void 0 : t.flags) == null ? void 0 : n[T]) == null ? void 0 : s.status) ?? null;
}
function ia(a, e) {
  var t, i, n, s, r, o;
  return e === "overloaded" && Uu(a) ? !!((i = (t = a == null ? void 0 : a.system) == null ? void 0 : t.burn) != null && i.overloaded) || !!((s = (n = a == null ? void 0 : a.statuses) == null ? void 0 : n.has) != null && s.call(n, e)) : ((o = (r = a == null ? void 0 : a.statuses) == null ? void 0 : r.has) == null ? void 0 : o.call(r, e)) ?? !1;
}
function Ip(a, e) {
  const t = ia(e, a.id), i = ju(e, a.id) ?? {};
  return {
    id: a.id,
    label: a.label,
    icon: a.icon,
    active: t,
    managed: !!a.managed || Cp.has(a.id),
    manual: !!a.manual,
    legacy: !1,
    category: a.category,
    tags: [...a.tags ?? []],
    scope: String(i.scope ?? "").trim(),
    notes: String(i.notes ?? "").trim()
  };
}
function Dp(a, e) {
  const t = (CONFIG.statusEffects ?? []).find((n) => String((n == null ? void 0 : n.id) ?? "").trim() === a) ?? null, i = ju(e, a) ?? {};
  return {
    id: a,
    label: t ? Pp(t) : Bo(a),
    icon: t ? Rp(t) : "",
    active: ia(e, a),
    managed: !1,
    manual: !1,
    legacy: !0,
    category: "",
    tags: [],
    scope: String(i.scope ?? "").trim(),
    notes: String(i.notes ?? "").trim()
  };
}
function zo(a) {
  const e = /* @__PURE__ */ new Set(), t = Es(), i = [];
  for (const n of t) {
    const s = String((n == null ? void 0 : n.id) ?? "").trim();
    if (!s || e.has(s)) continue;
    const r = ia(a, s), o = Rs(n, a);
    !r && (!o || !n.manual) || (e.add(s), i.push(Ip(n, a)));
  }
  for (const n of Array.from((a == null ? void 0 : a.statuses) ?? [])) {
    const s = String(n ?? "").trim();
    !s || e.has(s) || (e.add(s), i.push(Dp(s, a)));
  }
  return i.sort((n, s) => n.active !== s.active ? n.active ? -1 : 1 : n.legacy !== s.legacy ? n.legacy ? 1 : -1 : n.label.localeCompare(s.label));
}
function Op(a) {
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
async function _p({ actor: a, effects: e, selectedStatusIds: t }) {
  const i = new Map(t.map((n) => [n.id, n]));
  for (const n of e) {
    const s = i.get(n.id), r = !!(s != null && s.active);
    await Ns({
      actor: a,
      statusId: n.id,
      active: r,
      metadata: (s == null ? void 0 : s.metadata) ?? {}
    });
  }
}
async function El(a, e, t = {}) {
  const i = Ps(e);
  if (!i) return !1;
  const n = Hu(a, e);
  if (!n) return !1;
  const s = vp({
    actor: a,
    statusId: e,
    metadata: t,
    catalogEntry: i
  }), r = { [`flags.${T}.status`]: s };
  return typeof n.update == "function" ? (await n.update(r), !0) : n.id && typeof a.updateEmbeddedDocuments == "function" ? (await a.updateEmbeddedDocuments("ActiveEffect", [{ _id: n.id, ...r }]), !0) : !1;
}
async function Ns({ actor: a, statusId: e, active: t, metadata: i = {} }) {
  if (!a || !e) return !1;
  const n = ia(a, e);
  if (!!t === n)
    return t ? El(a, e, i) : !1;
  const s = Ps(e), r = s ? Rs(s, a) : !1;
  return t && s && !r ? !1 : e === "overloaded" && Uu(a) ? (await a.update({ "system.burn.overloaded": !!t }), !0) : (await a.toggleStatusEffect(e, { active: !!t, overlay: !1 }), t && await El(a, e, i), !0);
}
function Lp(a) {
  var i, n, s, r, o;
  const e = /* @__PURE__ */ new Map(), t = Array.from(((i = a == null ? void 0 : a.querySelectorAll) == null ? void 0 : i.call(a, "[data-status-id]")) ?? []);
  for (const l of t) {
    const c = String(((n = l == null ? void 0 : l.dataset) == null ? void 0 : n.statusId) ?? "").trim();
    if (!c) continue;
    const u = Np(c), d = !!((s = l.querySelector(`input[name="status.${u}.active"]`)) != null && s.checked), m = String(((r = l.querySelector(`input[name="status.${u}.scope"]`)) == null ? void 0 : r.value) ?? "").trim(), f = String(((o = l.querySelector(`input[name="status.${u}.notes"]`)) == null ? void 0 : o.value) ?? "").trim();
    e.set(c, {
      id: c,
      active: d,
      metadata: { scope: m, notes: f }
    });
  }
  return Array.from(e.values());
}
async function Wu({ actor: a, token: e } = {}) {
  var n;
  if (!a || !e) return !1;
  const t = Ep(a, e), i = zo(t);
  return i.length ? foundry.applications.api.DialogV2.wait({
    window: {
      title: `Token Statuses: ${e.name ?? a.name ?? "Token"}`
    },
    position: {
      width: 420
    },
    content: Op(i),
    buttons: [
      {
        action: "apply",
        label: "Apply",
        icon: "fa-solid fa-check",
        default: !0,
        callback: async (s, r) => {
          var o;
          try {
            const l = Lp(r.form);
            return await _p({ actor: t, effects: i, selectedStatusIds: l }), !0;
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
function xp() {
  typeof Hooks > "u" || Hooks.on("renderTokenHUD", (a, e, t = {}) => {
    var d, m, f, p, h;
    const i = (t == null ? void 0 : t._id) ?? (t == null ? void 0 : t.id) ?? "", n = ((m = (d = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : d.get) == null ? void 0 : m.call(d, i)) ?? null, s = (n == null ? void 0 : n.actor) ?? null;
    if (!s) return;
    const r = Es(), o = new Map(r.map((g) => [g.id, g])), c = typeof jQuery < "u" && e instanceof jQuery ? e[0] : e;
    if (!(c instanceof HTMLElement)) return;
    const u = c.querySelectorAll("[data-status-id], [data-statusId], [data-effect-id]");
    for (const g of u) {
      const y = String(
        ((f = g.dataset) == null ? void 0 : f.statusId) ?? ((p = g.dataset) == null ? void 0 : p.statusid) ?? ((h = g.dataset) == null ? void 0 : h.effectId) ?? ""
      ).trim();
      if (!y) continue;
      const b = o.get(y);
      if (!b) continue;
      !ia(s, y) && !Rs(b, s) && (g.hidden = !0, g.style.display = "none");
    }
  });
}
const $p = Object.freeze({
  STR: Mi.strength,
  REF: Mi.reflexes,
  WIL: Mi.willpower,
  INT: Mi.intelligence,
  CHA: Mi.charisma
}), Bp = Object.freeze({
  STR: "Strength",
  REF: "Reflexes",
  WIL: "Willpower",
  INT: "Intelligence",
  CHA: "Charisma"
}), zp = Object.freeze({
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
function Fo(a) {
  const e = String(a ?? "").trim();
  return e ? zp[e] ?? null : null;
}
function Fp(a) {
  const e = Fo(a);
  return e ? {
    intent: "common",
    id: e.id
  } : null;
}
function Up(a) {
  return $p[String(a ?? "").trim().toUpperCase()] ?? null;
}
function Hp(a) {
  return Bp[String(a ?? "").trim().toUpperCase()] ?? String(a ?? "").trim().toUpperCase();
}
function jp(a = []) {
  return (Array.isArray(a) ? a : []).map((e) => String(e ?? "").trim().toUpperCase()).filter(Boolean).join(" + ");
}
const Uo = Object.freeze([
  { value: "positive", label: "Positive" },
  { value: "negative", label: "Negative" },
  { value: "narrative", label: "Narrative" }
]), Ho = Object.freeze([
  { value: "minor", label: "Minor" },
  { value: "major", label: "Major" }
]), Ku = Object.freeze([
  { value: "passive", label: "Passive" },
  { value: "triggered", label: "Triggered" }
]), Gu = Object.freeze([
  { value: "rollMod", label: "Roll Modifier" },
  { value: "burnAdjust", label: "Burn Adjust" },
  { value: "actionCostMod", label: "Action Cost Mod" },
  { value: "initiativeMod", label: "Initiative Mod" },
  { value: "damageMod", label: "Damage Intake Mod" },
  { value: "edgeEvent", label: "Edge Event" }
]), qu = Object.freeze([
  { value: "onBuildRoll", label: "Build Roll" },
  { value: "onBeforeBurnApplied", label: "Before Burn Applied" },
  { value: "onBeforeActionCostFinalized", label: "Before Action Cost Finalized" },
  { value: "onInitiativeResolved", label: "Initiative Resolved" },
  { value: "onDamageResolved", label: "Damage Resolved" },
  { value: "onEndOfActivation", label: "End of Activation" },
  { value: "onEdgeSpend", label: "Edge Spend" },
  { value: "onEdgeGain", label: "Edge Gain" }
]), jo = Object.freeze([
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
]), Vu = Object.freeze([
  { value: "adjustAmount", label: "Adjust Amount" },
  { value: "grantPool", label: "Grant Pool" }
]), Wp = new Set(Uo.map((a) => a.value)), Kp = new Set(Ho.map((a) => a.value)), Gp = new Set(Ku.map((a) => a.value)), qp = new Set(Gu.map((a) => a.value)), Yu = new Set(qu.map((a) => a.value)), Vp = new Set(jo.map((a) => a.value)), Yp = new Set(Vu.map((a) => a.value));
function le(a, e = "") {
  return String(a ?? "").trim() || e;
}
function ye(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function rs(a) {
  return foundry.utils.deepClone(a);
}
function Qu(a = []) {
  return (Array.isArray(a) ? a : typeof a == "string" ? a.split(",") : []).map((t) => String(t ?? "").trim()).filter(Boolean);
}
function Qp(a) {
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
function Zs(a) {
  const e = Math.max(0, Math.trunc(ye(a, 0)));
  return e > 0 ? e : 0;
}
function Di(a = {}) {
  const e = a && typeof a == "object" ? a : {};
  return {
    perActivation: Zs(e.perActivation),
    perRound: Zs(e.perRound),
    perScene: Zs(e.perScene)
  };
}
function Jp(a = {}) {
  const e = a && typeof a == "object" ? a : {}, t = {
    id: le(e.id, foundry.utils.randomID()),
    fact: le(e.fact)
  }, i = jo.find((s) => e[s.value] !== void 0 && e[s.value] !== null), n = (i == null ? void 0 : i.value) ?? (Vp.has(String(e.comparator ?? "").trim()) ? String(e.comparator).trim() : "eq");
  return t.comparator = n, n !== "truthy" && n !== "falsy" && (t.value = Qp(e[n] ?? e.value ?? "")), t;
}
function hi(a = []) {
  return (Array.isArray(a) ? a : []).map(Jp);
}
function Xp(a = {}) {
  const e = a && typeof a == "object" ? a : {}, t = qp.has(String(e.type ?? "").trim()) ? String(e.type).trim() : "rollMod", i = Zp(t), n = Yu.has(String(e.phase ?? "").trim()) ? String(e.phase).trim() : i, s = Yp.has(String(e.operation ?? "").trim()) ? String(e.operation).trim() : "adjustAmount";
  return {
    id: le(e.id, foundry.utils.randomID()),
    type: t,
    phase: n,
    selector: le(e.selector),
    skillKeys: Qu(e.skillKeys),
    label: le(e.label),
    value: ye(e.value, 0),
    min: e.min === void 0 || e.min === null || e.min === "" ? null : ye(e.min, 0),
    max: e.max === void 0 || e.max === null || e.max === "" ? null : ye(e.max, 0),
    pool: le(e.pool),
    operation: s,
    conditions: hi(e.conditions),
    limit: Di(e.limit)
  };
}
function Ju(a = {}) {
  const e = le(a == null ? void 0 : a.selector);
  return e === "intent.skill" || e.startsWith("intent.skill.");
}
function Ui(a = []) {
  return (Array.isArray(a) ? a : []).map(Xp).filter((t) => t.phase && t.type);
}
function Kt(a = {}) {
  const e = a && typeof a == "object" ? rs(a) : {}, t = e.positive === !1 ? "negative" : "positive", i = Wp.has(String(e.category ?? "").trim()) ? String(e.category).trim() : t, n = Kp.has(String(e.tier ?? "").trim()) ? String(e.tier).trim() : "minor", s = Gp.has(String(e.activation ?? "").trim()) ? String(e.activation).trim() : "passive";
  return {
    ...e,
    positive: i === "positive",
    category: i,
    tier: n,
    activation: s,
    tags: Qu(e.tags),
    effects: Ui(e.effects),
    prerequisites: hi(e.prerequisites),
    limits: Di(e.limits)
  };
}
function Xu() {
  return {
    categories: [...Uo],
    tiers: [...Ho],
    activations: [...Ku],
    effectTypes: [...Gu],
    phases: [...qu],
    comparators: [...jo],
    edgeOperations: [...Vu]
  };
}
function $n(a = "") {
  var e;
  return ((e = Uo.find((t) => t.value === a)) == null ? void 0 : e.label) ?? "Positive";
}
function Bn(a = "") {
  var e;
  return ((e = Ho.find((t) => t.value === a)) == null ? void 0 : e.label) ?? "Minor";
}
function Zp(a = "") {
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
function eh(a) {
  return Array.from((a == null ? void 0 : a.items) ?? []).filter((e) => ((e == null ? void 0 : e.canonicalType) ?? (e == null ? void 0 : e.type)) === "quality").map((e) => ({
    item: e,
    system: Kt(e.system ?? {})
  }));
}
function th(a = {}, e = {}) {
  const t = Di(a), i = Di(e);
  return {
    perActivation: i.perActivation || t.perActivation,
    perRound: i.perRound || t.perRound,
    perScene: i.perScene || t.perScene
  };
}
function Zu(a = {}) {
  var n, s, r;
  const e = le(a.combatId ?? ((n = a.combat) == null ? void 0 : n.id)), t = Math.max(0, Math.trunc(ye(a.round ?? ((s = a.combat) == null ? void 0 : s.round), 0))), i = le(a.sceneId ?? ((r = canvas == null ? void 0 : canvas.scene) == null ? void 0 : r.id));
  return {
    activationKey: le(a.activationKey),
    roundKey: e ? `${e}:${t}` : "",
    sceneKey: i
  };
}
function ih(a, e = {}) {
  var s, r, o, l;
  const t = ((s = a == null ? void 0 : a.flags) == null ? void 0 : s[T]) ?? {}, i = ((r = t == null ? void 0 : t.traitUsage) == null ? void 0 : r.scene) ?? {}, n = e.state ?? {};
  return {
    activation: ((o = n == null ? void 0 : n.traitUsage) == null ? void 0 : o.activation) ?? {},
    round: ((l = n == null ? void 0 : n.traitUsage) == null ? void 0 : l.round) ?? {},
    scene: i
  };
}
function ah(a, e, t, i) {
  var n, s, r, o, l;
  switch (t) {
    case "perActivation":
      return Math.max(0, Math.trunc(ye((n = a.activation) == null ? void 0 : n[i], 0)));
    case "perRound":
      return Math.max(0, Math.trunc(ye((r = (s = a.round) == null ? void 0 : s[e.roundKey]) == null ? void 0 : r[i], 0)));
    case "perScene":
      return Math.max(0, Math.trunc(ye((l = (o = a.scene) == null ? void 0 : o[e.sceneKey]) == null ? void 0 : l[i], 0)));
    default:
      return 0;
  }
}
function nh(a, e, t, i) {
  const n = [];
  for (const s of ["perActivation", "perRound", "perScene"]) {
    const r = Math.max(0, Math.trunc(ye(t == null ? void 0 : t[s], 0)));
    if (!r) continue;
    ah(a, e, s, i) >= r && n.push(`${s} limit reached`);
  }
  return n;
}
function sh(a, e, t) {
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
function Pl(a, e) {
  if (!le(a == null ? void 0 : a.fact)) return !0;
  const t = foundry.utils.getProperty(e, a.fact);
  return sh(t, a.comparator, a.value);
}
function rh(a = "", e = {}) {
  const t = le(a);
  return t ? (Array.isArray(e == null ? void 0 : e.selectors) ? e.selectors : []).some(
    (n) => n === t || n.startsWith(`${t}.`)
  ) : !0;
}
function ed(a, e) {
  return `${a.id}:${e.id}`;
}
function oh(a, e) {
  var t;
  return !!((t = a.system) != null && t.inactive) || !!(e != null && e.inactive);
}
function Rl(a = []) {
  return a.map((e) => e.fact).filter(Boolean).join(", ");
}
function ua(a, e, t) {
  const i = ye(a[e], 0);
  let n = i;
  return typeof t.value == "number" && (n += t.value), typeof t.min == "number" && (n = Math.max(t.min, n)), typeof t.max == "number" && (n = Math.min(t.max, n)), a[e] = n, n - i;
}
function Ti(a, e, t, i, n) {
  i && a.push({
    id: `trait:${n}:${e.id}:${t.id}`,
    label: t.label || e.name,
    value: i,
    source: e.name,
    traitItemId: e.id,
    traitEffectId: t.id
  });
}
function lh({ item: a, effect: e, phase: t, packet: i, result: n }) {
  switch (e.type) {
    case "rollMod": {
      const s = ye(e.value, 0);
      return Ti(n.modifiers, a, e, s, t), s;
    }
    case "burnAdjust": {
      if (t === "onEndOfActivation") {
        const r = ua(i, "burnDelta", e);
        return Ti(n.modifiers, a, e, r, t), r;
      }
      const s = ua(i, "amount", e);
      return Ti(n.modifiers, a, e, s, t), s;
    }
    case "actionCostMod": {
      const s = ua(i, "cost", e);
      return Ti(n.modifiers, a, e, s, t), s;
    }
    case "initiativeMod": {
      const s = ua(i, "total", e);
      return Ti(n.modifiers, a, e, s, t), s;
    }
    case "damageMod": {
      const s = ua(i, "amount", e);
      return Ti(n.modifiers, a, e, s, t), s;
    }
    case "edgeEvent": {
      if (t === "onEndOfActivation" && e.operation === "grantPool" && e.pool)
        return i.edgeAdjustments ?? (i.edgeAdjustments = []), i.edgeAdjustments.push({
          poolKey: e.pool,
          amount: ye(e.value, 0),
          label: e.label || a.name,
          source: a.name
        }), Ti(n.modifiers, a, e, ye(e.value, 0), t), ye(e.value, 0);
      const s = ua(i, "amount", e);
      return Ti(n.modifiers, a, e, s, t), s;
    }
    default:
      return 0;
  }
}
function ch(a, e, t) {
  const i = ed(a, e), n = [];
  return t.perActivation > 0 && n.push({ kind: "usage", scope: "perActivation", key: i, delta: 1 }), t.perRound > 0 && n.push({ kind: "usage", scope: "perRound", key: i, delta: 1 }), t.perScene > 0 && n.push({ kind: "usage", scope: "perScene", key: i, delta: 1 }), n;
}
function td(a = "") {
  const e = le(a);
  return e ? [`action.${e}`] : [];
}
function oa(a, e = {}) {
  var o, l, c, u, d;
  const t = e.snapshot ?? null, i = e.state ?? (t == null ? void 0 : t.state) ?? {}, n = Array.isArray(i == null ? void 0 : i.actionLog) ? i.actionLog.map((m) => le(m == null ? void 0 : m.id)).filter(Boolean) : [], s = (i == null ? void 0 : i.actionState) ?? {}, r = [];
  return s != null && s.aim && r.push("state.aim"), s != null && s.preparedInterrupt && r.push("state.preparedInterrupt"), {
    activation: {
      moved: n.includes("move") || !!((o = s == null ? void 0 : s.move) != null && o.moved),
      saSpent: Math.max(0, Math.trunc(ye(i == null ? void 0 : i.saSpentThisActivation, 0))),
      attacksThisActivation: Math.max(0, Math.trunc(ye(i == null ? void 0 : i.attacksThisActivation, 0))),
      burnThisActivation: Math.max(0, Math.trunc(ye(i == null ? void 0 : i.burnThisActivation, 0)))
    },
    actionState: {
      aim: (s == null ? void 0 : s.aim) ?? null,
      move: (s == null ? void 0 : s.move) ?? null,
      preparedInterrupt: (s == null ? void 0 : s.preparedInterrupt) ?? null
    },
    burn: {
      current: Math.max(0, Math.trunc(ye((c = (l = a == null ? void 0 : a.system) == null ? void 0 : l.burn) == null ? void 0 : c.value, 0))),
      overloaded: !!((d = (u = a == null ? void 0 : a.system) == null ? void 0 : u.burn) != null && d.overloaded)
    },
    timing: {
      firstAttackThisActivation: Math.max(0, Math.trunc(ye(i == null ? void 0 : i.attacksThisActivation, 0))) === 0,
      firstExtraSAThisActivation: Math.max(0, Math.trunc(ye(i == null ? void 0 : i.saSpentThisActivation, 0))) <= 3
    },
    selectors: r
  };
}
function Wo({ actor: a, resolved: e, payload: t, runtime: i = {} } = {}) {
  var d, m, f, p, h, g, y, b, S, w, v, P;
  const n = oa(a, i), s = le((e == null ? void 0 : e.intent) ?? (t == null ? void 0 : t.intent), "skill"), r = Array.isArray(e == null ? void 0 : e.domains) ? e.domains : [], o = le(((d = e == null ? void 0 : e.attack) == null ? void 0 : d.rangeBand) ?? (t == null ? void 0 : t.rangeBand)), l = le(((f = (m = t == null ? void 0 : t.edge) == null ? void 0 : m.pre) == null ? void 0 : f.poolKey) ?? ((p = t == null ? void 0 : t.edge) == null ? void 0 : p.poolKey) ?? ""), c = le(
    ((h = e == null ? void 0 : e.data) == null ? void 0 : h.skillKey) ?? ((g = e == null ? void 0 : e.specialization) == null ? void 0 : g.skillKey) ?? (s === "skill" ? t == null ? void 0 : t.key : "")
  ), u = le(
    ((S = (b = (y = e == null ? void 0 : e.breakdown) == null ? void 0 : y.find) == null ? void 0 : b.call(y, (E) => (E == null ? void 0 : E.id) === "skill")) == null ? void 0 : S.label) ?? (e == null ? void 0 : e.title)
  );
  return n.intent = s, n.domains = r, n.rangeBand = o, n.skill = {
    key: c,
    label: u
  }, n.edge = {
    stage: (w = t == null ? void 0 : t.toggles) != null && w.useEdge ? "pre" : "",
    pool: l,
    spent: !!((v = t == null ? void 0 : t.toggles) != null && v.useEdge)
  }, n.selectors.push(`intent.${s}`), r.forEach((E) => n.selectors.push(`domain.${E}`)), o && n.selectors.push(`range.${o}`), s === "skill" && c && n.selectors.push(`skill.${c}`), (P = t == null ? void 0 : t.toggles) != null && P.useEdge && n.selectors.push("edge.pre"), n;
}
function id({ actor: a, packet: e = {}, runtime: t = {} } = {}) {
  const i = oa(a, t);
  return i.action = {
    id: le(e.actionId),
    category: le(e.category),
    resource: le(e.resource),
    cost: ye(e.cost, 0),
    effectiveCost: ye(e.effectiveCost ?? e.cost, 0)
  }, i.selectors.push(...td(e.actionId)), i.action.category && i.selectors.push(`actionCategory.${i.action.category}`), i.action.resource && i.selectors.push(`actionResource.${i.action.resource}`), i;
}
function zn({ actor: a, packet: e = {}, runtime: t = {} } = {}) {
  const i = oa(a, t);
  return i.action = {
    id: le(e.actionId),
    category: le(e.category),
    resource: le(e.resource)
  }, i.burn = {
    ...i.burn,
    amount: ye(e.amount, 0),
    source: le(e.source)
  }, e.source === "extraSA" && e.extraSaIndex === 1 && i.selectors.push("activation.extraSA:first"), e.source && i.selectors.push(`burn.${e.source}`), i.action.id && i.selectors.push(...td(i.action.id)), i.action.category && i.selectors.push(`actionCategory.${i.action.category}`), i.action.category === "reaction" && i.selectors.push(`reaction.${i.action.id}`), i;
}
function ad({ actor: a, packet: e = {}, runtime: t = {} } = {}) {
  const i = oa(a, t);
  return i.intent = "initiative", i.domains = ["combat"], i.initiative = {
    total: ye(e.total, 0)
  }, i.selectors.push("intent.initiative"), i;
}
function nd({ actor: a, packet: e = {}, runtime: t = {} } = {}) {
  const i = oa(a, t);
  return i.damage = {
    amount: ye(e.amount, 0),
    track: le(e.track),
    damageType: le(e.damageType)
  }, i.selectors.push("incoming"), i;
}
function Lr({ actor: a, packet: e = {}, phase: t = "onEdgeGain", runtime: i = {} } = {}) {
  const n = oa(a, i);
  return n.edge = {
    pool: le(e.poolKey),
    amount: ye(e.amount, 0),
    eventKey: le(e.eventKey),
    source: le(e.source)
  }, n.selectors.push(t === "onEdgeSpend" ? "edge.spend" : "edge.gain"), n.edge.eventKey && n.selectors.push(`event.${n.edge.eventKey}`), n;
}
function sd({ actor: a, packet: e = {}, runtime: t = {} } = {}) {
  const i = oa(a, t);
  return i.event = {
    phase: "endOfActivation"
  }, i.selectors.push("endOfActivation"), ye(e.burnDelta, 0) !== 0 && i.selectors.push("burn.adjust"), i;
}
function Lt({ actor: a, phase: e, facts: t = {}, packet: i = {}, options: n = {} } = {}) {
  var u;
  const s = {
    packet: rs(i),
    modifiers: [],
    mutations: [],
    applied: [],
    skipped: []
  };
  if (!a || !Yu.has(String(e ?? "").trim()))
    return s;
  const r = n.runtime ?? {}, o = ih(a, r), l = Zu(r), c = eh(a);
  for (const { item: d, system: m } of c) {
    if (oh(d, m)) {
      s.skipped.push({
        traitItemId: d.id,
        traitEffectId: "",
        label: d.name,
        reason: "Trait is inactive"
      });
      continue;
    }
    const f = m.prerequisites.filter((p) => le(p == null ? void 0 : p.fact)).filter((p) => !Pl(p, t));
    if (f.length) {
      s.skipped.push({
        traitItemId: d.id,
        traitEffectId: "",
        label: d.name,
        reason: `Prerequisites not met: ${Rl(f)}`
      });
      continue;
    }
    for (const p of m.effects.filter((h) => h.phase === e)) {
      if (!rh(p.selector, t)) {
        s.skipped.push({
          traitItemId: d.id,
          traitEffectId: p.id,
          label: p.label || d.name,
          reason: `Selector did not match (${p.selector || "any"})`
        });
        continue;
      }
      if (Ju(p) && p.skillKeys.length) {
        const w = le((u = t == null ? void 0 : t.skill) == null ? void 0 : u.key);
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
      const h = p.conditions.filter((w) => le(w == null ? void 0 : w.fact)).filter((w) => !Pl(w, t));
      if (h.length) {
        s.skipped.push({
          traitItemId: d.id,
          traitEffectId: p.id,
          label: p.label || d.name,
          reason: `Conditions not met: ${Rl(h)}`
        });
        continue;
      }
      const g = th(m.limits, p.limit), y = ed(d, p), b = nh(o, l, g, y);
      if (b.length) {
        s.skipped.push({
          traitItemId: d.id,
          traitEffectId: p.id,
          label: p.label || d.name,
          reason: b.join(", ")
        });
        continue;
      }
      const S = lh({
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
      }), n.consumeUsage && s.mutations.push(...ch(d, p, g));
    }
  }
  return s;
}
async function yi({ actor: a, mutations: e = [], runtime: t = {} } = {}) {
  var o, l, c, u, d, m, f, p, h;
  if (!a || !Array.isArray(e) || !e.length) return;
  const i = e.filter((g) => (g == null ? void 0 : g.kind) === "usage");
  if (!i.length) return;
  const n = rs(((c = (l = (o = a.flags) == null ? void 0 : o[T]) == null ? void 0 : l.traitUsage) == null ? void 0 : c.scene) ?? {}), s = t.state ? rs(t.state) : null, r = Zu(t);
  for (const g of i) {
    const y = le(g.key), b = Math.max(0, Math.trunc(ye(g.delta, 0)));
    if (!(!y || !b))
      switch (g.scope) {
        case "perActivation": {
          if (!s) break;
          s.traitUsage ?? (s.traitUsage = {}), (u = s.traitUsage).activation ?? (u.activation = {}), s.traitUsage.activation[y] = Math.max(0, ye(s.traitUsage.activation[y], 0) + b);
          break;
        }
        case "perRound": {
          if (!s || !r.roundKey) break;
          s.traitUsage ?? (s.traitUsage = {}), (d = s.traitUsage).round ?? (d.round = {}), (m = s.traitUsage.round)[f = r.roundKey] ?? (m[f] = {}), s.traitUsage.round[r.roundKey][y] = Math.max(
            0,
            ye(s.traitUsage.round[r.roundKey][y], 0) + b
          );
          break;
        }
        case "perScene": {
          if (!r.sceneKey) break;
          n[p = r.sceneKey] ?? (n[p] = {}), n[r.sceneKey][y] = Math.max(0, ye(n[r.sceneKey][y], 0) + b);
          break;
        }
      }
  }
  s && ((h = t.combatant) != null && h.id) && await t.combatant.setFlag(T, "personalCombat", s), await a.setFlag(T, "traitUsage", { scene: n });
}
const rd = "personalActionCatalog", _e = Object.freeze({
  standard: "standard",
  complex: "complex",
  free: "free",
  reaction: "reaction",
  recovery: "recovery"
}), xr = Object.freeze([
  { value: _e.standard, label: "Standard" },
  { value: _e.complex, label: "Complex" },
  { value: _e.free, label: "Free" },
  { value: _e.reaction, label: "Reaction" },
  { value: _e.recovery, label: "Burn & Recovery" }
]), od = Object.freeze([
  { value: "", label: "Not Implemented / Placeholder" },
  { value: "combatAction", label: "Generic Action" },
  { value: "combatAttack", label: "Attack Pipeline" },
  { value: "combatEvade", label: "Evade" },
  { value: "combatAssist", label: "Assist" },
  { value: "combatInterrupt", label: "Interrupt" },
  { value: "combatReduceBurn", label: "Reduce Burn" },
  { value: "combatOverloadCheck", label: "Overload Check" }
]), Nl = new Set(xr.map((a) => a.value)), Il = new Set(od.map((a) => a.value)), ld = Object.freeze([
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
].map((a) => Object.freeze(Is(a)))), uh = new Map(ld.map((a) => [a.id, a]));
function Is(a) {
  return JSON.parse(JSON.stringify(a ?? null));
}
function Dl(a, e = !1) {
  if (typeof a == "boolean") return a;
  const t = String(a ?? "").trim().toLowerCase();
  return ["true", "1", "yes", "y", "on"].includes(t) ? !0 : ["false", "0", "no", "n", "off", ""].includes(t) ? !1 : e;
}
function dh(a, e = null) {
  var i;
  const t = String((a == null ? void 0 : a.rollIntent) ?? ((i = a == null ? void 0 : a.roll) == null ? void 0 : i.intent) ?? (e == null ? void 0 : e.intent) ?? "").trim();
  return t ? { intent: t } : null;
}
function mh(a, { strict: e = !1, index: t = 0 } = {}) {
  const i = String((a == null ? void 0 : a.id) ?? "").trim(), n = uh.get(i) ?? {}, s = `Row ${t + 1}`, r = [];
  i || r.push(`${s}: id cannot be blank.`);
  const o = String((a == null ? void 0 : a.category) ?? n.category ?? "").trim();
  Nl.has(o) || r.push(`${s}: category must be one of ${Array.from(Nl).join(", ")}.`);
  const l = String((a == null ? void 0 : a.label) ?? n.label ?? "").trim();
  l || r.push(`${s}: label cannot be blank.`);
  const c = (a == null ? void 0 : a.cost) ?? n.cost ?? 0, u = Number(c);
  (!Number.isFinite(u) || u < 0) && r.push(`${s}: cost must be a non-negative number.`);
  const d = String((a == null ? void 0 : a.handler) ?? n.handler ?? "").trim();
  if (Il.has(d) || r.push(`${s}: handler must be one of ${Array.from(Il).map((p) => p || "(blank)").join(", ")}.`), r.length) {
    if (e) {
      const p = new Error(r[0]);
      throw p.validationErrors = r, p;
    }
    return null;
  }
  const m = {
    ...Is(n),
    id: i,
    label: l,
    category: o,
    cost: Math.trunc(u),
    handler: d,
    description: String((a == null ? void 0 : a.description) ?? n.description ?? "").trim(),
    reason: String((a == null ? void 0 : a.reason) ?? n.reason ?? "").trim(),
    prominent: Dl(a == null ? void 0 : a.prominent, !!n.prominent),
    prominentWhenBurning: Dl(a == null ? void 0 : a.prominentWhenBurning, !!n.prominentWhenBurning)
  };
  m.id === "opportunity" && !m.handler && (m.handler = "combatAttack", m.reason = ""), m.id === "opportunity" && m.handler === "combatAttack" && m.reason === "Opportunity attacks are not yet implemented." && (m.reason = ""), m.id === "assist" && !m.handler && (m.handler = "combatAssist", m.reason = ""), m.id === "assist" && m.handler === "combatAssist" && m.reason === "Reaction assist effects are not yet implemented." && (m.reason = ""), m.id === "interrupt" && !m.handler && (m.handler = "combatInterrupt", m.reason = ""), m.id === "interrupt" && m.handler === "combatInterrupt" && m.reason === "Prepared interrupt resolution is not yet implemented." && (m.reason = "");
  const f = dh(a, n.roll ?? null);
  return f ? m.roll = f : delete m.roll, m.reason || delete m.reason, m.description || delete m.description, m.prominent || delete m.prominent, m.prominentWhenBurning || delete m.prominentWhenBurning, m;
}
function Ko() {
  return Is(ld);
}
function Sn(a, { strict: e = !1 } = {}) {
  if (!Array.isArray(a)) {
    if (e) {
      const s = new Error("Action catalog must be an array.");
      throw s.validationErrors = [s.message], s;
    }
    return Ko();
  }
  const t = [], i = /* @__PURE__ */ new Set(), n = [];
  if (a.forEach((s, r) => {
    try {
      const o = mh(s, { strict: e, index: r });
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
function cd() {
  var a, e;
  try {
    const t = (e = (a = game == null ? void 0 : game.settings) == null ? void 0 : a.get) == null ? void 0 : e.call(a, T, rd);
    return Sn(t, { strict: !1 });
  } catch {
    return Ko();
  }
}
function Fn(a) {
  const e = String(a ?? "").trim();
  return cd().find((t) => t.id === e) ?? null;
}
function fh(a) {
  return cd().filter((e) => e.category === a).map((e) => Object.freeze(Is(e)));
}
const Qi = "hazard";
function ph(a) {
  return a && typeof a == "object" ? a : {};
}
function _i(a) {
  var n, s, r;
  const e = ((n = a == null ? void 0 : a.getFlag) == null ? void 0 : n.call(a, "mwd", Qi)) ?? ((r = (s = a == null ? void 0 : a.flags) == null ? void 0 : s.mwd) == null ? void 0 : r[Qi]) ?? null;
  if (!e || typeof e != "object") return null;
  const t = bi(e.areaEffect ?? { kind: Et.persistent, hazard: e.hazardDef }), i = Be(
    e.templateGeometry,
    {
      template: e.template,
      placement: e.templatePlacement
    }
  ) ?? null;
  return {
    ...foundry.utils.deepClone(ph(e)),
    areaEffect: t,
    hazardDef: Po(e.hazardDef ?? t.hazard ?? {}),
    templateGeometry: i
  };
}
function hh(a) {
  return !!_i(a);
}
async function er(a) {
  var i, n, s;
  const e = ((i = a == null ? void 0 : a.getFlag) == null ? void 0 : i.call(a, "mwd", Qi)) ?? ((s = (n = a == null ? void 0 : a.flags) == null ? void 0 : n.mwd) == null ? void 0 : s[Qi]) ?? null;
  if (!e || typeof e != "object") return null;
  if (e != null && e.templateGeometry) return _i(a);
  const t = _i(a);
  return !(t != null && t.templateGeometry) || !(a != null && a.setFlag) ? t : (await a.setFlag("mwd", Qi, {
    ...foundry.utils.deepClone(e),
    templateGeometry: si(t.templateGeometry)
  }), _i(a));
}
async function gh({ attacker: a = null, attack: e = {}, targetResult: t = null } = {}) {
  var c, u, d, m, f, p, h, g, y, b, S, w;
  const i = (canvas == null ? void 0 : canvas.scene) ?? null;
  if (!i) return null;
  const n = Be(
    e == null ? void 0 : e.templateGeometry,
    {
      template: e == null ? void 0 : e.template,
      placement: e == null ? void 0 : e.templatePlacement
    }
  ), s = bi((e == null ? void 0 : e.areaEffect) ?? ((c = e == null ? void 0 : e.payload) == null ? void 0 : c.areaEffect) ?? {});
  if (s.kind !== Et.persistent || !n) return null;
  const r = Ts(n);
  if (!r.length) return null;
  const o = {
    sourceActorUuid: (a == null ? void 0 : a.uuid) ?? null,
    sourceItemUuid: ((u = e == null ? void 0 : e.weapon) == null ? void 0 : u.uuid) ?? null,
    payloadId: ((d = e == null ? void 0 : e.payloadState) == null ? void 0 : d.activePayloadId) ?? ((m = e == null ? void 0 : e.payload) == null ? void 0 : m.id) ?? "",
    templateGeometry: si(n),
    templatePlacement: foundry.utils.deepClone((e == null ? void 0 : e.templatePlacement) ?? null),
    template: foundry.utils.deepClone((e == null ? void 0 : e.template) ?? null),
    damage: Number(((f = t == null ? void 0 : t.damage) == null ? void 0 : f.effectiveWeaponDamage) ?? ((p = e == null ? void 0 : e.weapon) == null ? void 0 : p.damage) ?? 0) || 0,
    ap: Number((e == null ? void 0 : e.totalAp) ?? ((h = e == null ? void 0 : e.weapon) == null ? void 0 : h.ap) ?? 0) || 0,
    damageType: String(((g = t == null ? void 0 : t.damage) == null ? void 0 : g.damageType) ?? ((y = e == null ? void 0 : e.weapon) == null ? void 0 : y.damageType) ?? "concussive").trim() || "concussive",
    label: `${String(((b = e == null ? void 0 : e.weapon) == null ? void 0 : b.name) ?? "Hazard").trim() || "Hazard"} (${$t(((S = s.hazard) == null ? void 0 : S.startExposure) ?? "minor")})`,
    areaEffect: s,
    hazardDef: s.hazard
  }, [l] = await i.createEmbeddedDocuments("Region", [{
    name: o.label,
    color: ((w = game.user) == null ? void 0 : w.color) ?? "#d86a2c",
    shapes: r,
    flags: {
      mwd: {
        [Qi]: o
      }
    }
  }]);
  return l ?? null;
}
function Ol(a = null) {
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
  return Array.from(t.regions ?? []).filter(hh).filter((c) => {
    var u, d, m;
    if ((d = (u = c == null ? void 0 : c.tokens) == null ? void 0 : u.has) != null && d.call(u, e)) return !0;
    try {
      return ((m = c == null ? void 0 : c.testPoint) == null ? void 0 : m.call(c, n)) ?? !1;
    } catch {
      return !1;
    }
  });
}
function wi(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function yh({ actor: a = null, token: e = null } = {}) {
  var s;
  const t = (e == null ? void 0 : e.document) ?? e ?? null, i = String(((s = t == null ? void 0 : t.texture) == null ? void 0 : s.src) ?? "").trim(), n = String((a == null ? void 0 : a.img) ?? "").trim();
  return i || n || "icons/svg/mystery-man.svg";
}
function bh(a = []) {
  return Array.isArray(a) ? a.map((e) => ({
    key: String((e == null ? void 0 : e.key) ?? "").trim(),
    label: String((e == null ? void 0 : e.label) ?? (e == null ? void 0 : e.key) ?? "").trim(),
    value: wi(e == null ? void 0 : e.value, 0)
  })).filter((e) => e.key) : [];
}
function Go(a = {}) {
  var c, u, d;
  const e = (a == null ? void 0 : a.preview) ?? {}, t = $e(((c = a == null ? void 0 : a.exposure) == null ? void 0 : c.initialTier) ?? (a == null ? void 0 : a.exposureTier) ?? (a == null ? void 0 : a.tier), "none"), i = $e(
    ((u = a == null ? void 0 : a.exposure) == null ? void 0 : u.finalTier) ?? (e.evadeActive ? e.finalTier : t),
    t
  ), n = xi({
    tier: t,
    appliedTier: i,
    evadeUsed: !!(e.evadeActive && t !== i),
    evadeLocked: !!((a == null ? void 0 : a.evadeLocked) ?? ((d = a == null ? void 0 : a.exposure) == null ? void 0 : d.evadeLocked))
  }), s = Math.max(0, wi(a == null ? void 0 : a.baseDamage, 0)), r = Math.max(0, wi(a == null ? void 0 : a.damageBefore, Xi(s, n.initialTier))), o = Math.max(0, wi(a == null ? void 0 : a.damageAfter, Xi(s, n.finalTier))), l = (e == null ? void 0 : e.reactionPreview) ?? {};
  return {
    kind: String((a == null ? void 0 : a.kind) ?? "hazard").trim() || "hazard",
    eventType: String((a == null ? void 0 : a.eventType) ?? "entry").trim() || "entry",
    regionId: String((a == null ? void 0 : a.regionId) ?? "").trim(),
    regionName: String((a == null ? void 0 : a.regionName) ?? (a == null ? void 0 : a.label) ?? "Hazard").trim() || "Hazard",
    actorUuid: String((a == null ? void 0 : a.actorUuid) ?? "").trim() || null,
    tokenUuid: String((a == null ? void 0 : a.tokenUuid) ?? "").trim() || null,
    actorName: String((a == null ? void 0 : a.actorName) ?? "Target").trim() || "Target",
    turnsExposed: Math.max(0, wi(a == null ? void 0 : a.turnsExposed, 0)),
    baseDamage: s,
    ap: Math.max(0, wi(a == null ? void 0 : a.ap, 0)),
    damageType: qt(a == null ? void 0 : a.damageType, "concussive"),
    damageTypeLabel: Vt((a == null ? void 0 : a.damageType) ?? "concussive") || "Damage",
    source: String((a == null ? void 0 : a.source) ?? (a == null ? void 0 : a.regionName) ?? "Hazard").trim() || "Hazard",
    applied: !!(a != null && a.applied),
    applyReason: String((a == null ? void 0 : a.applyReason) ?? "").trim(),
    onFullBurnDelta: Math.max(0, wi(a == null ? void 0 : a.onFullBurnDelta, 0)),
    exposure: n,
    damageBefore: r,
    damageAfter: o,
    nextTier: $e(a == null ? void 0 : a.nextTier, n.finalTier),
    nextLabel: $t((a == null ? void 0 : a.nextTier) ?? n.finalTier),
    preview: {
      evadeActive: !!e.evadeActive,
      edgePoolKey: String(e.edgePoolKey ?? "").trim() || null,
      finalTier: n.finalTier,
      burnDelta: wi(l == null ? void 0 : l.burnDelta, 0),
      canSpendEdge: !!(l != null && l.canSpendEdge),
      edgePools: bh(l == null ? void 0 : l.edgePools)
    }
  };
}
function Sh(a = {}, { actor: e = null, token: t = null } = {}) {
  const i = Go(a), n = i.eventType === "tick" ? "Hazard Tick" : i.eventType === "exit" ? "Hazard Exit" : "Hazard Entry", s = i.exposure.initialLabel === i.exposure.finalLabel ? i.exposure.initialLabel : `${i.exposure.initialLabel} -> ${i.exposure.finalLabel}`, r = i.damageBefore === i.damageAfter ? String(i.damageAfter) : `${i.damageBefore} -> ${i.damageAfter}`;
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
      image: yh({ actor: e, token: t })
    },
    rows: [
      { label: "Exposure", value: s },
      { label: "Damage", value: r },
      { label: "Next Tier", value: i.nextLabel },
      { label: "Turns Exposed", value: String(i.turnsExposed) }
    ],
    reactionHint: i.exposure.evadeLocked ? "Evade is locked for this hazard." : i.preview.evadeActive ? i.preview.edgePoolKey ? "Evade active. Reaction Burn canceled by Edge." : i.preview.burnDelta > 0 ? `Evade active. This reaction adds +${i.preview.burnDelta} Burn.` : "Evade active." : "",
    actions: i.applied ? [] : Ah(i)
  };
}
function Ah(a = {}) {
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
async function ud(a = {}, { actor: e = null, token: t = null } = {}) {
  return foundry.applications.handlebars.renderTemplate(
    "mwd.v2.roll.mwd-hazard-card",
    Sh(a, { actor: e, token: t })
  );
}
const ut = "mwd", dt = "personalCombat", ji = "preparedInterrupt", Th = "systems/mwd/img/icons/status/readied_action.svg", vi = 3, wh = 1, kh = 1;
function Mn(a, e) {
  return !(a != null && a.activation) || !e ? !1 : a.activation.combatId === e.combatId && Number(a.activation.round ?? -1) === Number(e.round ?? -1) && Number(a.activation.turn ?? -1) === Number(e.turn ?? -1) && a.activation.combatantId === e.combatantId;
}
function qo(a = null) {
  return {
    saRemaining: vi,
    faRemaining: wh,
    raRemaining: kh,
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
function Un(a, e = null) {
  return foundry.utils.mergeObject(
    qo(e),
    foundry.utils.deepClone(a ?? {}),
    { inplace: !1, overwrite: !0 }
  );
}
function da(a, e = null) {
  const t = Un(a ?? {}, (a == null ? void 0 : a.activation) ?? e);
  return t.actionLog = Za(t.actionLog), t.hazards = os(t.hazards), t.pendingReaction = Hn(t.pendingReaction), t;
}
function os(a) {
  return !a || typeof a != "object" ? {} : Object.fromEntries(
    Object.entries(a).map(([e, t]) => {
      const i = String(e ?? "").trim();
      return !i || !t || typeof t != "object" ? null : [i, {
        tier: $e(t.tier, ne.none),
        turnsExposed: Math.max(0, Number(t.turnsExposed ?? 0) || 0),
        evadeLocked: !!t.evadeLocked,
        lastProcessedRound: Number(t.lastProcessedRound ?? 0) || 0
      }];
    }).filter(Boolean)
  );
}
function Hn(a) {
  if (!a || typeof a != "object") return null;
  const e = String(a.type ?? "").trim();
  return e ? {
    type: e,
    sourceKind: String(a.sourceKind ?? "").trim() || null,
    sourceId: String(a.sourceId ?? "").trim() || null,
    messageId: String(a.messageId ?? "").trim() || null,
    resultIndex: Number.isInteger(Number(a.resultIndex)) ? Number(a.resultIndex) : null,
    exposureBefore: $e(a.exposureBefore, ne.none),
    exposureAfterPreview: $e(a.exposureAfterPreview, ne.none),
    edgePoolKey: String(a.edgePoolKey ?? "").trim() || null,
    allowCurrentTurn: !!a.allowCurrentTurn
  } : null;
}
function Za(a) {
  return Array.isArray(a) ? a.map((e) => {
    const t = String((e == null ? void 0 : e.label) ?? "").trim();
    return t ? {
      id: String((e == null ? void 0 : e.id) ?? "").trim(),
      label: t,
      costLabel: String((e == null ? void 0 : e.costLabel) ?? "").trim()
    } : null;
  }).filter(Boolean) : [];
}
function vh(a = []) {
  return Za(a).filter((e) => {
    const t = Fn(e == null ? void 0 : e.id);
    return (t == null ? void 0 : t.category) === _e.reaction;
  });
}
function _l(a = null, e = null) {
  const t = qo(e);
  return t.reactionBurnSinceLastActivation = Math.max(0, Number((a == null ? void 0 : a.reactionBurnSinceLastActivation) ?? 0) || 0), t.actionLog = vh(a == null ? void 0 : a.actionLog), t.hazards = os(a == null ? void 0 : a.hazards), t;
}
function Mh(a, e) {
  return a === "free" ? "Free" : a === "burn" ? `+${e} Burn` : `${e} ${String(a).toUpperCase()}`;
}
function Ch(a = {}, e = "", { snapshot: t = null, metadata: i = {} } = {}) {
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
function Ua(a = {}) {
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
function Eh(a = null) {
  if (!a) return "";
  const e = [];
  return a.condition && e.push(`Trigger: ${a.condition}`), a.scope && e.push(`Scope: ${a.scope}`), e.join(" | ");
}
function Ll() {
  return (CONFIG.statusEffects ?? []).find((a) => String((a == null ? void 0 : a.id) ?? "").trim() === ji) ?? {
    id: ji,
    name: "Prepared",
    icon: Th
  };
}
function Ph(a) {
  const e = (CONFIG.statusEffects ?? []).find((i) => String((i == null ? void 0 : i.id) ?? "").trim() === a), t = String((e == null ? void 0 : e.name) ?? (e == null ? void 0 : e.label) ?? a ?? "").trim();
  return Bo(t);
}
function ma(a) {
  const e = Number(a);
  return !Number.isFinite(e) || e === 0 ? "0" : e > 0 ? `+${e}` : String(e);
}
function Rh(a) {
  if (typeof a == "number") return Number.isFinite(a) ? a : 0;
  const e = String(a ?? "").trim().match(/[-+]?\d+(\.\d+)?/);
  return e ? Number(e[0]) : 0;
}
function xl(a) {
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
function Nh(a, e = "") {
  if (!Number.isFinite(a)) return "";
  const t = Math.round(a * 10) / 10, i = Number.isInteger(t) ? String(t) : t.toFixed(1);
  return e ? `${i} ${e}` : i;
}
function $l(a) {
  var t, i;
  const e = (i = (t = game.settings) == null ? void 0 : t.get) == null ? void 0 : i.call(t, "core", "rollMode");
  return typeof ChatMessage.applyRollMode == "function" && ChatMessage.applyRollMode(a, e), a;
}
function tr(a) {
  return !!_i(a);
}
function Ih(a = []) {
  const e = Array.isArray(a) ? a.filter(Boolean) : [];
  if (!e.length) return "";
  const t = e.slice().sort((n, s) => Ii(s == null ? void 0 : s.tier) - Ii(n == null ? void 0 : n.tier))[0] ?? null;
  if (!t) return "";
  const i = `HAZARD ${$t(t.tier)} (${Math.max(0, Number(t.turnsExposed ?? 0) || 0)})`;
  return t.evadeLocked ? `${i} LOCK` : i;
}
const Ta = class Ta {
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
      var S, w;
      return ((w = (S = b == null ? void 0 : b.document) == null ? void 0 : S.parent) == null ? void 0 : w.id) === i;
    })) == null ? void 0 : g.document) ?? null;
    if (c) return c;
    const u = Array.from(((y = canvas == null ? void 0 : canvas.scene) == null ? void 0 : y.tokens) ?? []), d = this._collectActorIds(e, r), m = u.filter((b) => this._tokenDocumentMatchesActor(b, e, d));
    return m.find((b) => {
      var S, w, v;
      return ((S = b == null ? void 0 : b.combatant) == null ? void 0 : S.id) === ((v = (w = game.combat) == null ? void 0 : w.combatant) == null ? void 0 : v.id);
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
    const i = canvas == null ? void 0 : canvas.grid, n = xl(e), s = xl(t);
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
    const s = i[0], r = this._measureTokenDistance(e, s), o = String(((d = (u = canvas == null ? void 0 : canvas.scene) == null ? void 0 : u.grid) == null ? void 0 : d.units) ?? ((f = (m = game.system) == null ? void 0 : m.grid) == null ? void 0 : f.units) ?? "").trim(), l = Nh(r, o), c = String((s == null ? void 0 : s.name) ?? ((p = s == null ? void 0 : s.actor) == null ? void 0 : p.name) ?? "Target").trim() || "Target";
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
      const s = Rh((n == null ? void 0 : n.numericValue) ?? (n == null ? void 0 : n.value) ?? 0);
      return {
        label: String((n == null ? void 0 : n.label) ?? "").trim() || "Modifier",
        numericValue: s,
        value: String((n == null ? void 0 : n.value) ?? ma(s)).trim() || ma(s)
      };
    }), i = t.reduce((n, s) => n + s.numericValue, 0);
    return {
      total: i,
      totalLabel: ma(i),
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
      const g = this._collectActorIds(e, l), y = String((l == null ? void 0 : l.id) ?? "").trim(), b = d.filter((v) => {
        const P = this._getCombatantTokenId(v), E = this._getCombatantTokenDocument(v, i), z = P || String((E == null ? void 0 : E.id) ?? "").trim();
        return o && y ? z === y : g.has(this._getCombatantActorId(v)) ? !0 : this._tokenDocumentMatchesActor(E, e, g);
      }), S = b.find((v) => {
        var P;
        return v.id === ((P = n == null ? void 0 : n.combatant) == null ? void 0 : P.id);
      }) ?? null;
      u = b.find(
        (v) => {
          var P;
          return y && (this._getCombatantTokenId(v) || String(((P = this._getCombatantTokenDocument(v, i)) == null ? void 0 : P.id) ?? "").trim()) === y;
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
    var E, z, G, Y, q;
    const {
      combat: i,
      combatant: n,
      token: s,
      tokenDocument: r
    } = this.getCombat(e, t), o = !!n && ((E = i == null ? void 0 : i.combatant) == null ? void 0 : E.id) === n.id, l = n ? this.getActivationIdentity(i, n) : null, c = n ? n.getFlag(ut, dt) : null, u = n ? o ? Mn(c, l) ? da(c, l) : _l(c, l) : da(c, l) : qo(l);
    u.actionLog = Za(u.actionLog);
    const d = Math.max(0, Number(((G = (z = e == null ? void 0 : e.system) == null ? void 0 : z.burn) == null ? void 0 : G.value) ?? 0)), m = Math.floor(d / 2), f = !!((q = (Y = e == null ? void 0 : e.system) == null ? void 0 : Y.burn) != null && q.overloaded), p = Ua(u), h = this.getActiveStatuses(e), g = h.filter(
      (Q) => !(f && Q.id === "overloaded") && Q.id !== ji
    ), y = this.getModifierSummary(e, m), b = this.getRollImpact(y), S = Math.max(0, Number(u.burnThisActivation ?? 0)), w = n ? o ? "" : "Waiting for this combatant's activation." : "No combatant on the current scene.", v = [];
    f && v.push({ id: "overloaded", label: "Overloaded" }), p && v.push({
      id: "preparedInterrupt",
      label: "Prepared",
      hint: Eh(p)
    });
    const P = Object.entries(u.hazards ?? {});
    if (P.length) {
      const Q = P.map(([, L]) => L).sort((L, U) => Ii(U == null ? void 0 : U.tier) - Ii(L == null ? void 0 : L.tier))[0] ?? null;
      Q && v.push({
        id: "hazard",
        label: `Hazard ${$t(Q.tier)}`,
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
      states: v,
      effects: g,
      statuses: h,
      rollImpact: b,
      summaryText: `SA: ${u.saRemaining} / ${vi}   FA: ${u.faRemaining}   RA: ${u.raRemaining}`,
      activation: {
        burnThisActivation: S,
        burnThisActivationLabel: `+${S}`,
        items: [
          { label: "SA", value: `${u.saRemaining}/${vi}` },
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
    actionCategory: s = _e.reaction,
    logLabel: r = "",
    edgePoolKey: o = "",
    allowCurrentTurn: l = !1
  } = {}) {
    var h, g, y, b, S;
    const c = this.getReactionSpendPreview(e, { token: t, edgePoolKey: o }), u = c.snapshot;
    if (!u.hasCombatant) return { ok: !1, reason: "No combatant on the current scene." };
    if (!l && u.isCurrentTurn) return { ok: !1, reason: "Only outside your activation." };
    const d = da(u.combatant.getFlag(ut, dt), (h = u.state) == null ? void 0 : h.activation), m = {
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
      const w = c.edgePoolKey ? 0 : 2, v = Lt({
        actor: e,
        phase: "onBeforeBurnApplied",
        facts: zn({
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
      m.pendingMutations = (m.pendingMutations ?? []).concat(v.mutations), f = Math.max(0, Number(v.packet.amount ?? w) || 0), c.edgePoolKey ? (await e.spendEdge(c.edgePoolKey, 1, { source: "reactionBurnCancel" }), p = c.edgePoolKey) : f > 0 && (d.reactionBurnSinceLastActivation = Math.max(
        0,
        Number(d.reactionBurnSinceLastActivation ?? 0) + f
      ));
    }
    return this._appendActionLog(d, {
      id: i,
      label: r || n,
      costLabel: c.costLabel
    }), (y = m.pendingMutations) != null && y.length ? await yi({ actor: e, mutations: m.pendingMutations, runtime: m }) : await u.combatant.setFlag(ut, dt, d), f > 0 && await e.update({ "system.burn.value": Math.max(0, Number(((S = (b = e.system) == null ? void 0 : b.burn) == null ? void 0 : S.value) ?? 0) + f) }), {
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
    const s = da(n.combatant.getFlag(ut, dt), (o = n.state) == null ? void 0 : o.activation), r = typeof i == "function" ? i(s, n) ?? s : s;
    return await n.combatant.setFlag(ut, dt, r), { ok: !0, snapshot: this.getSnapshot(e, { token: t }) };
  }
  static async setPendingReaction(e, { token: t = null, pendingReaction: i = null } = {}) {
    return this.updateCombatantState(e, {
      token: t,
      mutate: (n) => (n.pendingReaction = Hn(i), n)
    });
  }
  static async clearPendingReaction(e, { token: t = null } = {}) {
    return this.setPendingReaction(e, { token: t, pendingReaction: null });
  }
  static async setHazardState(e, { token: t = null, regionId: i = "", hazardState: n = null } = {}) {
    const s = String(i ?? "").trim();
    return s ? this.updateCombatantState(e, {
      token: t,
      mutate: (r) => (r.hazards ?? (r.hazards = {}), n ? r.hazards[s] = os({ [s]: n })[s] : delete r.hazards[s], r)
    }) : { ok: !1, reason: "Hazard region id is required." };
  }
  static getModifierSummary(e, t = Math.floor(Number(((n) => (n = ((i) => (i = e == null ? void 0 : e.system) == null ? void 0 : i.burn)()) == null ? void 0 : n.value)() ?? 0) / 2)) {
    var c, u;
    const s = ((u = (c = e == null ? void 0 : e.system) == null ? void 0 : c.derived) == null ? void 0 : u.condition) ?? {}, r = [];
    t > 0 && r.push({
      label: "Burn Penalty",
      numericValue: -t,
      value: ma(-t)
    });
    const o = Number(s.fatiguePenalty ?? 0);
    o && r.push({
      label: "Fatigue",
      numericValue: o,
      value: ma(o)
    });
    const l = Number(s.physicalPenalty ?? 0);
    return l && r.push({
      label: "Physical",
      numericValue: l,
      value: ma(l)
    }), r.length || r.push({
      label: "Current Modifiers",
      numericValue: 0,
      value: "0"
    }), r;
  }
  static getActiveStatuses(e) {
    return Array.from((e == null ? void 0 : e.statuses) ?? []).map((i) => ({
      id: i,
      label: Ph(i)
    })).sort((i, n) => i.label.localeCompare(n.label));
  }
  static buildActionModel(e, t) {
    var o, l, c, u;
    const i = (d) => {
      const m = Fo(d), f = Fp(d);
      return !f || !m ? null : {
        id: d,
        label: m.label,
        handler: "roll",
        roll: JSON.stringify(f),
        disabled: !1,
        reason: ""
      };
    }, n = (d) => {
      const m = fh(d).filter((f) => f.id !== "overloadCheck").filter((f) => !(d === _e.recovery && f.id === "reduceBurn"));
      if (d === _e.standard) {
        const f = Fn("reduceBurn");
        f && !m.some((p) => p.id === "reduceBurn") && m.push(f);
      }
      return m.map((f) => this._buildCatalogAction(e, t, f));
    }, s = (d) => {
      const m = Fn(d);
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
        { label: "SA", value: `${t.state.saRemaining}/${vi}` },
        { label: "Cap", value: `${Math.max(0, Number(((l = t.state) == null ? void 0 : l.saSpentThisActivation) ?? 0))}/${$r(e)}` },
        { label: "FA", value: `${t.state.faRemaining}` },
        { label: "RA", value: `${t.state.raRemaining}` },
        {
          label: "Burn/Turn",
          value: `+${Math.max(0, Number(((c = t.state) == null ? void 0 : c.burnThisActivation) ?? 0))}`,
          action: r
        }
      ],
      activationLog: Za((u = t.state) == null ? void 0 : u.actionLog).map((d, m) => ({
        ...d,
        index: m + 1
      })),
      menus: [
        {
          id: "standard",
          label: "Standard Actions",
          actions: n(_e.standard)
        },
        {
          id: "complex",
          label: "Complex Actions",
          actions: n(_e.complex)
        },
        {
          id: "free",
          label: "Free Actions",
          actions: n(_e.free)
        },
        {
          id: "reaction",
          label: "Reactions",
          actions: n(_e.reaction)
        },
        {
          id: "burn",
          label: "Burn & Recovery",
          actions: n(_e.recovery)
        }
      ].filter((d) => d.actions.length)
    };
  }
  static _buildCatalogAction(e, t, i) {
    const n = t.hasCombatant ? "" : "No current-scene combatant.", s = t.isCurrentTurn ? "" : "Only during your activation.", r = t.overloaded ? "Overloaded actors can only recover Burn." : "", o = Cn(e, t), l = t.state ?? {}, c = i.category;
    let u = "sa", d = Number(i.cost ?? 0) || 0, m = Mh(u, d), f = "";
    if (i.id === "reduceBurn")
      u = "sa", d = 1, m = "1 SA", f = n || s || (o <= 0 ? "Activation SA cap reached." : "") || (t.burn.value <= 0 ? "Burn is already at 0." : "");
    else if (i.id === "overloadCheck")
      u = "check", d = 0, m = "Check", f = n || s || (t.burn.canOverloadCheck ? "" : t.overloaded ? "Already Overloaded." : "Burn below 6.");
    else if (i.id === "interrupt") {
      const p = Ua(l);
      u = Number(l.raRemaining ?? 0) > 0 ? "ra" : "burn", d = u === "ra" ? 1 : 2, m = u === "ra" ? "1 RA" : "+2 Burn", f = n || (t.isCurrentTurn ? "Only outside your activation." : "") || (p ? "" : "Prepare an interrupt first.");
    } else if (i.id === "evade") {
      const p = Hn(l.pendingReaction), h = t.isCurrentTurn && !(p != null && p.allowCurrentTurn) ? "Only outside your activation." : "";
      u = Number(l.raRemaining ?? 0) > 0 ? "ra" : "burn", d = u === "ra" ? 1 : 2, m = u === "ra" ? "1 RA" : "+2 Burn", f = n || h || (p ? "" : "Use an area effect or hazard card to trigger Evade.");
    } else if (c === _e.standard)
      f = n || s || r || (o < d ? "Activation SA cap reached." : "");
    else if (c === _e.complex)
      f = n || s || r || (o < d ? "Activation SA cap reached." : "");
    else if (c === _e.free) {
      const p = Number(l.faRemaining ?? 0) > 0;
      u = p ? "fa" : "sa", d = 1, m = p ? "Free" : "1 SA", f = n || s || !p && r || (!p && o < 1 ? "Activation SA cap reached." : "");
    } else if (c === _e.reaction) {
      const p = Number(l.raRemaining ?? 0) > 0;
      u = p ? "ra" : "burn", d = p ? 1 : 2, m = p ? "1 RA" : "+2 Burn", f = n || (t.isCurrentTurn ? "Only outside your activation." : "");
    } else c === _e.recovery && (f = n || s);
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
    const s = Fn(i);
    return s ? s.handler ? s.category === _e.standard ? this._executeStandardAction(e, { token: t, action: s, metadata: n }) : s.category === _e.free ? this._executeFreeAction(e, { token: t, action: s, metadata: n }) : s.category === _e.reaction ? this._executeReactionAction(e, { token: t, action: s, metadata: n }) : { ok: !1, reason: s.reason || "That action is not implemented yet." } : { ok: !1, reason: s.reason || "That action is not implemented yet." } : { ok: !1, reason: "Unknown combat action." };
  }
  static async _executeStandardAction(e, { token: t = null, action: i, metadata: n = {} } = {}) {
    const s = this.getSnapshot(e, { token: t });
    if (!s.hasCombatant) return { ok: !1, reason: "No combatant on the current scene." };
    if (!s.isCurrentTurn) return { ok: !1, reason: "Only available during your activation." };
    if (s.overloaded) return { ok: !1, reason: "Overloaded actors can only recover Burn." };
    if (Cn(e, s) < Number(i.cost ?? 1))
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
    if (!r && Cn(e, s) < 1)
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
    const r = Hn((d = s.state) == null ? void 0 : d.pendingReaction), o = i.id === "evade" && (r == null ? void 0 : r.allowCurrentTurn);
    if (s.isCurrentTurn && !o) return { ok: !1, reason: "Only outside your activation." };
    if (i.id === "interrupt" && !Ua(s.state))
      return { ok: !1, reason: "Prepare an interrupt first." };
    const l = i.id === "assist" && (n != null && n.targetName) ? `${i.label}: ${n.targetName}` : i.id === "interrupt" && (n != null && n.scope) ? `${i.label}: ${String(n.scope).trim()}` : i.label;
    let c = String((n == null ? void 0 : n.edgePoolKey) ?? "").trim();
    !c && Number(((m = s.state) == null ? void 0 : m.raRemaining) ?? 0) <= 0 && (c = await Ta._promptSpendEdgeForReaction(e) ?? "");
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
    const o = Ch(r.state, i, {
      snapshot: r,
      metadata: n
    });
    return await r.combatant.setFlag(ut, dt, o), { ok: !0, snapshot: this.getSnapshot(e, { token: t }) };
  }
  static async clearAim(e, { token: t = null } = {}) {
    var s;
    const i = this.getSnapshot(e, { token: t });
    if (!(i != null && i.combatant)) return { ok: !1, reason: "No combatant on the current scene." };
    const n = da(i.combatant.getFlag(ut, dt), (s = i.state) == null ? void 0 : s.activation);
    return n.actionState ?? (n.actionState = {}), n.actionState.aim ? (n.actionState.aim = null, await i.combatant.setFlag(ut, dt, n), { ok: !0, snapshot: this.getSnapshot(e, { token: t }) }) : { ok: !0, snapshot: i };
  }
  static getPreparedInterrupt(e = null) {
    const t = (e == null ? void 0 : e.state) ?? e ?? {};
    return Ua(t);
  }
  static async clearPreparedInterrupt(e, { token: t = null } = {}) {
    var s;
    const i = this.getSnapshot(e, { token: t });
    if (!(i != null && i.combatant)) return { ok: !1, reason: "No combatant on the current scene." };
    const n = da(i.combatant.getFlag(ut, dt), (s = i.state) == null ? void 0 : s.activation);
    return n.actionState ?? (n.actionState = {}), n.actionState.preparedInterrupt ? (n.actionState.preparedInterrupt = null, await i.combatant.setFlag(ut, dt, n), { ok: !0, snapshot: this.getSnapshot(e, { token: t }) }) : { ok: !0, snapshot: i };
  }
  static async _syncPreparedIndicatorForCombatant(e) {
    var u, d, m;
    if (!game.user.isGM || !e) return;
    const t = this._getCombatantSceneId(e) || ((u = canvas == null ? void 0 : canvas.scene) == null ? void 0 : u.id), i = this._getCombatantTokenDocument(e, t), n = (i == null ? void 0 : i.actor) ?? (e == null ? void 0 : e.actor) ?? null;
    if (!i || !n) return;
    const s = e.getFlag(ut, dt), r = !!Ua(s), o = Ll(), l = String((o == null ? void 0 : o.id) ?? ji).trim() || ji;
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
    const s = Ll(), r = String((s == null ? void 0 : s.id) ?? ji).trim() || ji;
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
    const r = Za(e == null ? void 0 : e.actionLog);
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
    const i = this.getActivationIdentity(e, t), n = t.getFlag(ut, dt);
    Mn(n, i) || await t.setFlag(ut, dt, _l(n, i));
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
    var S, w, v, P, E, z, G;
    const c = this.getSnapshot(e, { token: t });
    if (!c.hasCombatant)
      return { ok: !1, reason: "No combatant on the current scene." };
    if (!c.isCurrentTurn)
      return { ok: !1, reason: "Only available during your activation." };
    const u = {
      combat: c.combat,
      combatant: c.combatant,
      state: Un(c.state, this.getActivationIdentity(c.combat, c.combatant)),
      sceneId: ((S = canvas == null ? void 0 : canvas.scene) == null ? void 0 : S.id) ?? "",
      snapshot: c
    };
    let d = Math.max(0, Number(n ?? 0) || 0);
    const m = Lt({
      actor: e,
      phase: "onBeforeActionCostFinalized",
      facts: id({
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
    const h = u.state, g = i === "sa" ? $r(e) : 0, y = Math.max(0, Number(((v = c.state) == null ? void 0 : v.saSpentThisActivation) ?? 0) || 0);
    if (i === "sa" && y + d > g)
      return { ok: !1, reason: "Activation SA cap reached." };
    h[f] = Math.max(0, p - d), i === "sa" && (h.saSpentThisActivation = y + d, s === "attack" && (h.attacksThisActivation = Number(h.attacksThisActivation ?? 0) + 1)), this._appendActionLog(h, {
      id: s,
      label: r,
      costLabel: o || this._formatCostLabel(i, d)
    });
    let b = 0;
    if (i === "sa") {
      const Y = Math.max(0, y - vi), q = Math.max(0, h.saSpentThisActivation - vi), Q = Math.max(0, Number(((P = c.state) == null ? void 0 : P.attacksThisActivation) ?? 0) || 0), L = Math.max(0, Number(h.attacksThisActivation ?? 0) || 0);
      for (let U = Y + 1; U <= q; U += 1) {
        const V = Lt({
          actor: e,
          phase: "onBeforeBurnApplied",
          facts: zn({
            actor: e,
            packet: {
              actionId: s,
              category: l,
              resource: i,
              amount: 1,
              source: "extraSA",
              extraSaIndex: U
            },
            runtime: u
          }),
          packet: {
            actionId: s,
            category: l,
            resource: i,
            amount: 1,
            source: "extraSA",
            extraSaIndex: U
          },
          options: { runtime: u, consumeUsage: !0 }
        });
        u.pendingMutations = (u.pendingMutations ?? []).concat(V.mutations), b += Math.max(0, Number(V.packet.amount ?? 0) || 0);
      }
      for (let U = Q + 1; U <= L; U += 1) {
        if (U <= 1) continue;
        const V = Lt({
          actor: e,
          phase: "onBeforeBurnApplied",
          facts: zn({
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
            attackIndex: U
          },
          options: { runtime: u, consumeUsage: !0 }
        });
        u.pendingMutations = (u.pendingMutations ?? []).concat(V.mutations), b += Math.max(0, Number(V.packet.amount ?? 0) || 0);
      }
      h.burnThisActivation = Math.max(0, Number(h.burnThisActivation ?? 0) + b);
    }
    return (E = u.pendingMutations) != null && E.length ? await yi({
      actor: e,
      mutations: u.pendingMutations,
      runtime: {
        ...u,
        state: h
      }
    }) : await c.combatant.setFlag(ut, dt, h), b > 0 && await e.update({ "system.burn.value": Math.max(0, Number(((G = (z = e.system) == null ? void 0 : z.burn) == null ? void 0 : G.value) ?? 0) + b) }), { ok: !0, snapshot: this.getSnapshot(e, { token: c.token }) };
  }
  static async reduceBurn(e, { token: t = null } = {}) {
    var o, l, c, u;
    const i = this.getSnapshot(e, { token: t });
    if (!i.hasCombatant) return { ok: !1, reason: "No combatant on the current scene." };
    if (!i.isCurrentTurn) return { ok: !1, reason: "Only available during your activation." };
    if (Cn(e, i) <= 0) return { ok: !1, reason: "Activation SA cap reached." };
    if (i.burn.value <= 0) return { ok: !1, reason: "Burn is already at 0." };
    const n = await this.spendResource(e, {
      token: i.token,
      resource: "sa",
      cost: 1,
      actionId: "reduceBurn",
      actionLabel: "Reduce Burn",
      actionCostLabel: "1 SA",
      actionCategory: _e.standard
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
    const s = i.getFlag(ut, dt), r = Mn(s, this.getActivationIdentity(e, i)) ? Un(s, this.getActivationIdentity(e, i)) : Un(s), l = {
      burnDelta: Number(r.saSpentThisActivation ?? 0) <= vi && Number(r.burnThisActivation ?? 0) <= 0 && Number(r.reactionBurnSinceLastActivation ?? 0) <= 0 ? -2 : 0,
      edgeAdjustments: []
    }, c = {
      combat: e,
      combatant: i,
      state: r,
      sceneId: ((p = e.scene) == null ? void 0 : p.id) ?? ((h = canvas == null ? void 0 : canvas.scene) == null ? void 0 : h.id) ?? ""
    }, u = Lt({
      actor: n,
      phase: "onEndOfActivation",
      facts: sd({ actor: n, packet: l, runtime: c }),
      packet: l,
      options: { runtime: c, consumeUsage: !0 }
    });
    await yi({ actor: n, mutations: u.mutations, runtime: c });
    const d = Number(u.packet.burnDelta ?? l.burnDelta) || 0;
    if (d) {
      const w = Math.max(0, Number(((y = (g = n.system) == null ? void 0 : g.burn) == null ? void 0 : y.value) ?? 0) + d), v = { "system.burn.value": w };
      w === 0 && ((S = (b = n.system) == null ? void 0 : b.burn) != null && S.overloaded) && (v["system.burn.overloaded"] = !1), await n.update(v);
    }
    for (const w of u.packet.edgeAdjustments ?? []) {
      const v = Number((w == null ? void 0 : w.amount) ?? 0) || 0;
      !v || !(w != null && w.poolKey) || (v > 0 ? await n.gainEdge(w.poolKey, v, { skipTraitHooks: !0, source: "endOfActivationTrait" }) : await n.spendEdge(w.poolKey, Math.abs(v), { skipTraitHooks: !0, source: "endOfActivationTrait" }));
    }
  }
  static async _onUpdateCombat(e, t) {
    if (Object.prototype.hasOwnProperty.call(t ?? {}, "turn") || Object.prototype.hasOwnProperty.call(t ?? {}, "round")) {
      const n = this._lastActivationByCombat.get(e == null ? void 0 : e.id) ?? null, s = typeof n == "string" ? n : (n == null ? void 0 : n.combatantId) ?? null, r = this.getActivationIdentity(e, e == null ? void 0 : e.combatant), o = n && typeof n == "object" ? !Mn(n, r) : s && s !== r.combatantId;
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
    if (foundry.utils.hasProperty(t, `flags.${ut}.${dt}`)) {
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
    tr(e) && (await er(e), await this._syncAllSceneHazards((e == null ? void 0 : e.parent) ?? (canvas == null ? void 0 : canvas.scene) ?? null));
  }
  static async _onUpdateRegion(e) {
    tr(e) && (await er(e), await this._syncAllSceneHazards((e == null ? void 0 : e.parent) ?? (canvas == null ? void 0 : canvas.scene) ?? null));
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
        tr(t) && await er(t);
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
    os(n.hazards);
    const s = Ol(t), r = new Map(
      s.map((h) => {
        const g = _i(h);
        return g ? [String(h.id ?? "").trim(), { region: h, flag: g }] : null;
      }).filter(Boolean)
    ), o = [], l = [];
    await this.updateCombatantState(i, {
      token: t,
      mutate: (h) => {
        var g, y, b, S, w;
        h.hazards ?? (h.hazards = {});
        for (const [v, { flag: P }] of r.entries()) {
          if (h.hazards[v]) continue;
          const E = {
            tier: $e((g = P == null ? void 0 : P.hazardDef) == null ? void 0 : g.startExposure, ne.minor),
            turnsExposed: 0,
            evadeLocked: !1,
            lastProcessedRound: 0
          };
          h.hazards[v] = E, o.push({ regionId: v, flag: P, hazardState: E });
        }
        for (const [v, P] of Object.entries(h.hazards ?? {})) {
          if (r.has(v)) continue;
          const E = _i((S = (b = (y = canvas == null ? void 0 : canvas.scene) == null ? void 0 : y.regions) == null ? void 0 : b.get) == null ? void 0 : S.call(b, v)) ?? null;
          ((w = E == null ? void 0 : E.hazardDef) == null ? void 0 : w.clearOnExit) !== !1 && (delete h.hazards[v], l.push({ regionId: v, hazardState: P, flag: E }));
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
      await ChatMessage.create($l({
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
      Ol(i).map((d) => {
        const m = _i(d);
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
    if (!(s > 0 && (i + 1) % n === 0)) return $e(e == null ? void 0 : e.tier, ne.none);
    let o = $e(e == null ? void 0 : e.tier, ne.none);
    for (let m = 0; m < s; m += 1)
      if (o = yf(o, 1), Ii(o) >= Ii(((u = t == null ? void 0 : t.escalation) == null ? void 0 : u.max) ?? ne.full)) {
        o = $e((d = t == null ? void 0 : t.escalation) == null ? void 0 : d.max, ne.full);
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
    const c = $e(s == null ? void 0 : s.tier, ne.none), u = $e(o, c), d = l && c !== ne.none && !(s != null && s.evadeLocked) ? this.getReactionSpendPreview(e, { token: t }) : null, m = {
      kind: "hazard",
      eventType: r,
      regionId: String((i == null ? void 0 : i.id) ?? "").trim(),
      regionName: String((n == null ? void 0 : n.label) ?? (i == null ? void 0 : i.name) ?? "Hazard").trim() || "Hazard",
      actorUuid: e.uuid,
      tokenUuid: (t == null ? void 0 : t.uuid) ?? ((h = t == null ? void 0 : t.document) == null ? void 0 : h.uuid) ?? null,
      actorName: e.name ?? "Target",
      turnsExposed: Math.max(0, Number((s == null ? void 0 : s.turnsExposed) ?? 0) || 0),
      baseDamage: Math.max(0, Number((n == null ? void 0 : n.damage) ?? 0) || 0),
      damageBefore: Xi(Number((n == null ? void 0 : n.damage) ?? 0) || 0, c),
      damageAfter: Xi(
        Number((n == null ? void 0 : n.damage) ?? 0) || 0,
        l && !(s != null && s.evadeLocked) ? vr(c, 1) : c
      ),
      damageType: String((n == null ? void 0 : n.damageType) ?? "concussive").trim() || "concussive",
      ap: Math.max(0, Number((n == null ? void 0 : n.ap) ?? 0) || 0),
      onFullBurnDelta: Math.max(0, Number(((y = (g = n == null ? void 0 : n.hazardDef) == null ? void 0 : g.onFull) == null ? void 0 : y.burnDelta) ?? 0) || 0),
      source: String((n == null ? void 0 : n.label) ?? (i == null ? void 0 : i.name) ?? "Hazard").trim() || "Hazard",
      nextTier: u,
      exposure: {
        initialTier: c,
        finalTier: c,
        initialLabel: $t(c),
        finalLabel: $t(c),
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
    }, f = await ud(m, { actor: e, token: t }), p = await ChatMessage.create($l({
      speaker: ChatMessage.getSpeaker({ actor: e, token: t }),
      content: f,
      flags: {
        mwd: {
          hazardCard: m
        }
      }
    }));
    return p && d && c !== ne.none && !(s != null && s.evadeLocked) && await this.setPendingReaction(e, {
      token: t,
      pendingReaction: {
        type: "evade",
        sourceKind: "hazard",
        sourceId: String((i == null ? void 0 : i.id) ?? "").trim() || null,
        messageId: p.id,
        exposureBefore: c,
        exposureAfterPreview: vr(c, 1),
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
    const n = (i == null ? void 0 : i.actor) ?? null, s = n ? this.getSnapshot(n, { token: i }) : null, r = Object.values((s == null ? void 0 : s.hazards) ?? {}), o = Ih(r);
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
O(Ta, "_targetRefreshTimeout", null), O(Ta, "_pendingTokenPositions", /* @__PURE__ */ new Map()), O(Ta, "_lastActivationByCombat", /* @__PURE__ */ new Map());
let B = Ta;
function $r(a) {
  var i, n, s, r, o, l;
  const e = Math.max(0, Number(((s = (n = (i = a == null ? void 0 : a.system) == null ? void 0 : i.attributes) == null ? void 0 : n.reflexes) == null ? void 0 : s.value) ?? 0) || 0), t = Math.max(0, Number(((l = (o = (r = a == null ? void 0 : a.system) == null ? void 0 : r.attributes) == null ? void 0 : o.willpower) == null ? void 0 : l.value) ?? 0) || 0);
  return vi + Math.floor((e + t) / 2);
}
function Cn(a, e) {
  var t;
  return Math.max(0, $r(a) - Math.max(0, Number(((t = e == null ? void 0 : e.state) == null ? void 0 : t.saSpentThisActivation) ?? 0) || 0));
}
const Br = Object.freeze([
  Object.freeze({ key: "close", label: "Close", min: 0, max: 5, baseDn: 2 }),
  Object.freeze({ key: "near", label: "Near", min: 6, max: 26, baseDn: 3 }),
  Object.freeze({ key: "far", label: "Far", min: 27, max: 62, baseDn: 4 }),
  Object.freeze({ key: "extreme", label: "Extreme", min: 63, max: 120, baseDn: 5 })
]), Dh = new Map(Br.map((a) => [a.key, a]));
function En(a, e) {
  const t = Number(a);
  return !Number.isFinite(t) || t <= 0 ? e : Math.max(0, Math.trunc(t));
}
function Ds(a = "") {
  return Dh.get(String(a ?? "").trim().toLowerCase()) ?? null;
}
function ls(a = "") {
  if (String(a ?? "").trim().toLowerCase() === "outofrange") return "Out of Range";
  const e = Ds(a);
  return e ? `${e.label} ${e.min}-${e.max} m` : String(a ?? "").trim() || "Range";
}
function Os(a = "") {
  if (String(a ?? "").trim().toLowerCase() === "outofrange") return "Out of Range";
  const e = Ds(a);
  return e ? e.label : String(a ?? "").trim() || "Range";
}
function Oh(a = "", e = 1) {
  if (String(a ?? "").trim().toLowerCase() === "outofrange") return 6;
  const t = Ds(a);
  return Number.isFinite(Number(t == null ? void 0 : t.baseDn)) ? Number(t.baseDn) : e;
}
function Vo(a = {}) {
  return {
    max: String((a == null ? void 0 : a.max) ?? "").trim().toLowerCase() || "extreme",
    close: En((a == null ? void 0 : a.close) ?? (a == null ? void 0 : a.short), 5),
    near: En((a == null ? void 0 : a.near) ?? (a == null ? void 0 : a.medium), 26),
    far: En((a == null ? void 0 : a.far) ?? (a == null ? void 0 : a.long), 62),
    extreme: En(a == null ? void 0 : a.extreme, 120)
  };
}
function _h(a, e = {}, t = "close") {
  var u;
  const i = Number(a);
  if (!Number.isFinite(i) || i < 0)
    return String(t ?? "close").trim().toLowerCase() || "close";
  const n = Vo(e), s = ((u = Ds(n.max)) == null ? void 0 : u.key) ?? "extreme", r = Br.findIndex((d) => d.key === s), o = Number((n == null ? void 0 : n[s]) ?? NaN);
  if (Number.isFinite(o) && i > o)
    return "outOfRange";
  let l = "extreme";
  i <= n.close ? l = "close" : i <= n.near ? l = "near" : i <= n.far && (l = "far");
  const c = Br.findIndex((d) => d.key === l);
  return r >= 0 && c > r ? s : l;
}
const Ma = "lifeModuleCatalog", _s = Object.freeze([
  { moduleType: "faction", label: "Faction" },
  { moduleType: "childhood", label: "Childhood" },
  { moduleType: "higherEducation", label: "Higher Education" },
  { moduleType: "realLife", label: "Real Life" }
]), Lh = Object.freeze(
  Object.fromEntries(_s.map((a) => [a.moduleType, a.label]))
), xh = new Set(_s.map((a) => a.moduleType)), $h = /* @__PURE__ */ new Set(["skill", "edgePool"]), Yo = Object.freeze({
  grit: "Grit",
  chaos: "Chaos",
  insight: "Insight",
  rumor: "Rumor",
  legend: "Legend",
  credibility: "Credibility"
}), dd = Object.freeze(Object.keys(Yo)), Bh = Object.freeze({
  skill: "Skill",
  edgePool: "Edge Pool"
}), zh = Object.freeze(Kh()), Fh = Object.freeze(Gh()), Uh = /* @__PURE__ */ new Set(["artillery", "gunnery", "piloting", "heavyWeapons"]), Hh = /* @__PURE__ */ new Set([
  "artillery",
  "gunnery",
  "heavyWeapons",
  "meleeCombat",
  "piloting",
  "projectileWeapons",
  "firearms"
]), jh = Object.freeze(
  li.map((a) => a.code).filter((a) => !Hh.has(a))
), Wh = Object.freeze(la([
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
        ...jh.map((a) => ({ type: "skill", value: a })),
        ...dd.map((a) => ({ type: "edgePool", value: a }))
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
    skillChoices: li.map((a) => a.code).filter((a) => !Uh.has(a)),
    excludesAny: [
      "higher-education-military-enlistment",
      "higher-education-military-academy",
      "higher-education-family-training",
      "higher-education-officer-candidate-school"
    ]
  }
], { strict: !1 }));
function Kh() {
  const a = /* @__PURE__ */ new Map();
  for (const e of li) {
    const t = String(e.code ?? "").trim(), i = String(e.label ?? "").trim();
    t && (a.set(t.toLowerCase(), t), i && a.set(i.toLowerCase(), t));
  }
  return a;
}
function Gh() {
  const a = /* @__PURE__ */ new Map();
  for (const [e, t] of Object.entries(Yo))
    a.set(e.toLowerCase(), e), a.set(t.toLowerCase(), e), a.set(`${t.toLowerCase()} pool`, e);
  return a;
}
function qh(a = []) {
  const e = Array.isArray(a) ? a.filter(Boolean) : [String(a ?? "").trim()].filter(Boolean), t = new Error(e[0] ?? "Invalid life module data.");
  return t.validationErrors = e, t;
}
function md(a) {
  return Array.isArray(a) ? a : typeof a == "string" ? a.split(",").map((e) => e.trim()).filter(Boolean) : [];
}
function An(a) {
  return String(a ?? "").trim().toLowerCase().replace(/['\u2019]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function Ls(a) {
  const e = String(a ?? "").trim();
  return xh.has(e) ? e : "";
}
function xs(a) {
  const e = String(a ?? "").trim();
  return e ? zh.get(e.toLowerCase()) ?? "" : "";
}
function Vh(a) {
  const e = String(a ?? "").trim();
  return e ? Fh.get(e.toLowerCase()) ?? "" : "";
}
function Yh(a, { strict: e = !1, errors: t = [], prefix: i = "Entry" } = {}) {
  const n = /* @__PURE__ */ new Set(), s = [];
  for (const r of md(a)) {
    const o = xs(r);
    if (!o) {
      e && t.push(`${i}: unknown skill "${r}".`);
      continue;
    }
    n.has(o) || (n.add(o), s.push(o));
  }
  return s;
}
function Bl(a) {
  const e = /* @__PURE__ */ new Set();
  return md(a).map(An).filter((t) => !t || e.has(t) ? !1 : (e.add(t), !0));
}
function zl(a = [], e = /* @__PURE__ */ new Map()) {
  return a.map((t) => {
    var i;
    return ((i = e.get(t)) == null ? void 0 : i.label) ?? t;
  });
}
function Ia(a = {}) {
  return `${a.type}:${a.value}`;
}
function Qh(a) {
  var e;
  return ((e = Bt(a)) == null ? void 0 : e.label) ?? a;
}
function fd(a) {
  return Yo[a] ?? a;
}
function Jh(a) {
  return Bh[a] ?? a;
}
function Xh(a = {}, { includeTypePrefix: e = !1 } = {}) {
  const t = String((a == null ? void 0 : a.type) ?? "").trim(), i = String((a == null ? void 0 : a.value) ?? "").trim();
  if (!t || !i) return "";
  const n = t === "skill" ? Qh(i) : `${fd(i)} Pool`;
  return e ? `${Jh(t)}: ${n}` : n;
}
function on(a = {}, { includeBonusText: e = !1, includeTypePrefix: t = !1 } = {}) {
  const i = Xh(a, { includeTypePrefix: t });
  return i ? e ? a.type === "skill" ? `+1 ${i} rolls` : `+1 ${i}` : i : "";
}
function Zh(a) {
  const e = String(a ?? "").trim(), t = e.indexOf(":");
  return t < 0 ? null : {
    type: e.slice(0, t).trim(),
    value: e.slice(t + 1).trim()
  };
}
function eg(a, { strict: e = !1, errors: t = [], prefix: i = "Entry", grantLabel: n = "Bonus" } = {}) {
  const s = typeof a == "string" ? Zh(a) : a, r = String((s == null ? void 0 : s.type) ?? "").trim(), o = String((s == null ? void 0 : s.value) ?? "").trim();
  if (!$h.has(r))
    return e && t.push(`${i} ${n}: unknown bonus type "${r || a}".`), null;
  const l = r === "skill" ? xs(o) : Vh(o);
  return l ? {
    type: r,
    value: l
  } : (e && t.push(`${i} ${n}: unknown ${r === "skill" ? "skill" : "edge pool"} "${o}".`), null);
}
function zr(a, { strict: e = !1, errors: t = [], prefix: i = "Entry", grantLabel: n = "Bonus" } = {}) {
  const s = /* @__PURE__ */ new Set(), r = [], o = Array.isArray(a) ? a : [];
  for (const l of o) {
    const c = eg(l, { strict: e, errors: t, prefix: i, grantLabel: n });
    if (!c) continue;
    const u = Ia(c);
    s.has(u) || (s.add(u), r.push(c));
  }
  return r;
}
function pd(a, { strict: e = !1, errors: t = [], prefix: i = "Entry" } = {}) {
  const n = Yh(a, { strict: e, errors: t, prefix: i });
  return n.length ? [{
    id: "skill",
    label: "",
    choices: n.map((s) => ({ type: "skill", value: s }))
  }] : [];
}
function tg(a, { strict: e = !1, errors: t = [], prefix: i = "Entry" } = {}) {
  const n = String(a ?? "").trim();
  return n ? n.split(";").map((r) => r.trim()).filter(Boolean).map((r, o) => {
    const l = `Bonus ${o + 1}`, c = zr(
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
function hd(a, e = "grant") {
  return An(a) || e;
}
function ig(a, e, { strict: t = !1, errors: i = [], prefix: n = "Entry" } = {}) {
  const s = `grant-${e + 1}`, r = `Bonus ${e + 1}`;
  if (typeof a == "string") {
    const u = zr(
      a.split("|").map((d) => d.trim()).filter(Boolean),
      { strict: t, errors: i, prefix: n, grantLabel: r }
    );
    return u.length ? { id: s, label: "", choices: u } : null;
  }
  const o = hd(a == null ? void 0 : a.id, s), l = String((a == null ? void 0 : a.label) ?? "").trim(), c = zr(a == null ? void 0 : a.choices, { strict: t, errors: i, prefix: n, grantLabel: r });
  return c.length ? { id: o, label: l, choices: c } : (t && i.push(`${n} ${r}: define at least one bonus choice.`), null);
}
function ag(a, { strict: e = !1, errors: t = [], prefix: i = "Entry" } = {}) {
  if (Array.isArray(a)) {
    if (a.every((s) => typeof s == "string" && !String(s).includes(":")))
      return pd(a, { strict: e, errors: t, prefix: i });
    const n = /* @__PURE__ */ new Set();
    return a.map((s, r) => ig(s, r, { strict: e, errors: t, prefix: i })).filter((s) => s ? n.has(s.id) ? (e && t.push(`${i}: duplicate bonus id "${s.id}".`), !1) : (n.add(s.id), !0) : !1);
  }
  return typeof a == "string" ? tg(a, { strict: e, errors: t, prefix: i }) : [];
}
function ng(a = []) {
  return (Array.isArray(a) ? a : []).map((e) => (Array.isArray(e == null ? void 0 : e.choices) ? e.choices : []).map((i) => `${i.type}:${i.value}`).join("|")).filter(Boolean).join("; ");
}
function Qo() {
  return foundry.utils.deepClone(Wh);
}
function Da(a) {
  return Lh[a] ?? (String(a ?? "").trim() || "Life Module");
}
function gd() {
  return _s.map((a) => ({
    value: a.moduleType,
    label: a.label
  }));
}
function la(a = [], { strict: e = !1 } = {}) {
  const t = Array.isArray(a) ? a : [], i = [], n = /* @__PURE__ */ new Set(), s = t.map((o, l) => {
    const c = `Entry ${l + 1}`, u = String((o == null ? void 0 : o.label) ?? "").trim(), d = An((o == null ? void 0 : o.id) ?? u), m = Ls(o == null ? void 0 : o.moduleType), f = (o == null ? void 0 : o.grants) != null ? ag(o.grants, { strict: e, errors: i, prefix: c }) : pd(o == null ? void 0 : o.skillChoices, { strict: e, errors: i, prefix: c }), p = Bl(o == null ? void 0 : o.requiresAny), h = Bl(o == null ? void 0 : o.excludesAny);
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
  if (e && i.length) throw qh(i);
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
function yd(a = []) {
  const e = new Map(Qo().map((s) => [s.id, s])), t = la(a, { strict: !1 }), i = [...t], n = new Set(t.map((s) => s.id));
  for (const [s, r] of e.entries())
    n.has(s) || i.push(foundry.utils.deepClone(r));
  return i;
}
async function sg() {
  var a, e, t;
  try {
    if (!((t = (e = (a = game == null ? void 0 : game.settings) == null ? void 0 : a.settings) == null ? void 0 : e.has) != null && t.call(e, `${T}.${Ma}`))) return;
    const i = game.settings.get(T, Ma), n = yd(i);
    JSON.stringify(i) !== JSON.stringify(n) && await game.settings.set(T, Ma, n);
  } catch {
  }
}
function rg() {
  var a, e, t;
  try {
    if ((t = (e = (a = game == null ? void 0 : game.settings) == null ? void 0 : a.settings) == null ? void 0 : e.has) != null && t.call(e, `${T}.${Ma}`))
      return yd(game.settings.get(T, Ma));
  } catch {
  }
  return Qo();
}
function $s() {
  return la(rg(), { strict: !1 });
}
function Oi(a) {
  const e = An(a);
  return e ? $s().find((t) => t.id === e) ?? null : null;
}
function Jo(a) {
  const e = Ls(a);
  return $s().filter((t) => t.moduleType === e);
}
function bd(a) {
  return !a || typeof a != "object" || Array.isArray(a) ? {} : Object.fromEntries(
    Object.entries(a).map(([e, t]) => [hd(e, ""), String(t ?? "").trim()]).filter(([e]) => !!e)
  );
}
function Sd(a, e = "", { legacySelectedSkill: t = "" } = {}) {
  const i = new Set((Array.isArray(a == null ? void 0 : a.choices) ? a.choices : []).map(Ia)), n = String(e ?? "").trim();
  if (i.has(n)) return n;
  if (t) {
    const s = xs(t), r = s ? `skill:${s}` : "";
    if (r && i.has(r)) return r;
  }
  return i.size === 1 ? Array.from(i)[0] : "";
}
function Ad(a, e = {}, { legacySelectedSkill: t = "" } = {}) {
  const i = Array.isArray(a == null ? void 0 : a.grants) ? a.grants : [], n = bd(e);
  return Object.fromEntries(
    i.map((s) => [
      s.id,
      Sd(s, n[s.id], { legacySelectedSkill: t })
    ])
  );
}
function Bs(a, e = {}, { legacySelectedSkill: t = "" } = {}) {
  const i = Array.isArray(a == null ? void 0 : a.grants) ? a.grants : [], n = Ad(a, e, { legacySelectedSkill: t });
  return i.map((s, r) => {
    const o = Sd(s, n[s.id], { legacySelectedSkill: t }), l = (Array.isArray(s.choices) ? s.choices : []).find((c) => Ia(c) === o) ?? null;
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
function og(a, e = {}, { legacySelectedSkill: t = "" } = {}) {
  var i;
  return ((i = Bs(a, e, { legacySelectedSkill: t }).map((n) => n.choice).find((n) => (n == null ? void 0 : n.type) === "skill")) == null ? void 0 : i.value) ?? "";
}
function ln(a = {}) {
  const e = foundry.utils.deepClone(a ?? {}), t = An(e.catalogId), i = t ? Oi(t) : null, n = Ls(e.moduleType || (i == null ? void 0 : i.moduleType)), s = i ? Ad(i, e.selectedGrants, { legacySelectedSkill: e.selectedSkill }) : bd(e.selectedGrants);
  return e.moduleType = n, e.catalogId = t, e.selectedGrants = s, e.selectedSkill = i ? og(i, s, { legacySelectedSkill: e.selectedSkill }) : xs(e.selectedSkill), e;
}
function Td(a, e = {}, { legacySelectedSkill: t = "" } = {}) {
  return Bs(a, e, { legacySelectedSkill: t }).map((i) => {
    var l, c;
    const n = Array.isArray((c = (l = a == null ? void 0 : a.grants) == null ? void 0 : l[i.index]) == null ? void 0 : c.choices) ? a.grants[i.index].choices : [], s = new Set(n.map((u) => u.type)).size > 1, r = n.map((u) => ({
      value: Ia(u),
      label: on(u, { includeTypePrefix: s }),
      selected: Ia(u) === i.selectedKey
    })), o = r.length === 1 ? {
      value: r[0].value,
      label: r[0].label,
      displayLabel: on(n[0], { includeBonusText: !0 })
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
function lg(a, e) {
  return a.isDuplicate ? `Duplicate ${Da(a.moduleType)} slot item.` : a.catalog ? a.unresolvedGrantCount > 0 ? "Choose valid bonus options." : a.excludedBy.length ? `Blocked by ${zl(a.excludedBy, e).join(", ")}.` : a.requiresAny.length && !a.matchedRequirementIds.length ? `Requires ${zl(a.requiresAny, e).join(" or ")}.` : "" : "Catalog entry is missing or unlinked.";
}
function cg(a, e = [], t = {}) {
  var n, s, r;
  if (!a || !Array.isArray(e) || !e.length) return [];
  const i = Math.max(0, Number(((r = (s = (n = a.system) == null ? void 0 : n.attributes) == null ? void 0 : s.edge) == null ? void 0 : r.value) ?? 0));
  return e.filter((o) => (o == null ? void 0 : o.type) === "edgePool").map((o) => {
    var p, h, g, y;
    const l = String(o.value ?? "").trim(), c = fd(l), u = Math.max(0, Number(((y = (g = (h = (p = a.system) == null ? void 0 : p.counters) == null ? void 0 : h.edgePools) == null ? void 0 : g[l]) == null ? void 0 : y.rating) ?? 0)), d = Math.max(0, Number((t == null ? void 0 : t[l]) ?? 0)), m = Math.max(0, u + d - i);
    return m ? `${c} Pool bonus loses ${m} ${m === 1 ? "point" : "points"} to the Edge cap.` : "";
  }).filter(Boolean);
}
function Li(a) {
  var m;
  const e = $s(), t = new Map(e.map((f) => [f.id, f])), i = Array.from((a == null ? void 0 : a.items) ?? []).filter((f) => f.type === A.itemType.lifeModule), n = /* @__PURE__ */ new Map();
  for (const f of i) {
    const p = Ls((m = f.system) == null ? void 0 : m.moduleType);
    !p || n.has(p) || n.set(p, f.id);
  }
  const s = i.map((f) => {
    var v;
    const p = ln(f.system ?? {}), h = t.get(p.catalogId) ?? null, g = p.moduleType || (h == null ? void 0 : h.moduleType) || "", y = h ? Bs(h, p.selectedGrants, { legacySelectedSkill: p.selectedSkill }) : [], b = y.map((P) => P.choice).filter(Boolean), S = ((v = b.find((P) => P.type === "skill")) == null ? void 0 : v.value) ?? "", w = S ? Bt(S) : null;
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
      selectedChoiceLabels: b.map((P) => on(P, { includeBonusText: !0 })),
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
  const l = Object.fromEntries(li.map((f) => [f.code, 0])), c = Object.fromEntries(dd.map((f) => [f, 0])), u = /* @__PURE__ */ new Map();
  for (const f of s) {
    const p = f.isActive ? f.selectedChoices : [], h = p.filter((y) => y.type === "skill"), g = p.filter((y) => y.type === "edgePool");
    f.bonus = h.length;
    for (const y of h)
      l[y.value] = Number(l[y.value] ?? 0) + 1;
    for (const y of g)
      c[y.value] = Number(c[y.value] ?? 0) + 1;
    f.inactiveReason = f.isActive ? "" : lg(f, t), u.set(f.itemId, f);
  }
  for (const f of s)
    f.warningLabels = f.isActive ? cg(a, f.selectedChoices, c) : [];
  const d = _s.map((f) => {
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
function ug(a = {}) {
  var t, i, n;
  const e = String((a == null ? void 0 : a.intent) ?? "").trim();
  return e === "skill" ? String(((t = a == null ? void 0 : a.data) == null ? void 0 : t.skillKey) ?? "").trim() : e === "attack" ? String(((n = (i = a == null ? void 0 : a.attack) == null ? void 0 : i.skill) == null ? void 0 : n.code) ?? "").trim() : "";
}
function dg({ actor: a, resolved: e } = {}) {
  const t = ug(e);
  return !a || !t ? [] : Li(a).states.flatMap(
    (i) => i.isActive ? i.selectedChoices.filter((n) => n.type === "skill" && n.value === t).map((n) => ({
      id: `life-module:${i.itemId}:${Ia(n)}`,
      label: i.label,
      value: 1,
      source: "Life Module",
      tooltip: `${i.label}: +1 to ${on(n)} rolls`
    })) : []
  );
}
const mg = {
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
}, fg = {
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
}, zs = {
  Actor: mg,
  Item: fg
}, Fl = Object.freeze({
  Actor: /* @__PURE__ */ new Set(["prototypeToken"]),
  Item: /* @__PURE__ */ new Set()
});
function cn(a) {
  return !!a && typeof a == "object" && !Array.isArray(a);
}
function Oa(a) {
  return typeof structuredClone == "function" ? structuredClone(a) : JSON.parse(JSON.stringify(a));
}
function un(a = {}, e = {}) {
  const t = Oa(a);
  for (const [i, n] of Object.entries(e ?? {})) {
    if (cn(n) && cn(t[i])) {
      t[i] = un(t[i], n);
      continue;
    }
    t[i] = Oa(n);
  }
  return t;
}
function wd(a = "", e = zs) {
  const t = e == null ? void 0 : e[a];
  return cn(t) ? t : {};
}
function kd(a = zs, e = "", t = "", i = /* @__PURE__ */ new Set()) {
  var c;
  const n = String(t ?? "").trim();
  if (!n || i.has(n)) return {};
  const s = wd(e, a), r = (c = s == null ? void 0 : s.templates) == null ? void 0 : c[n];
  if (!cn(r)) return {};
  i.add(n);
  let o = {};
  for (const u of Array.from(r.templates ?? []))
    o = un(
      o,
      kd(a, e, u, i)
    );
  const l = Oa(r);
  return delete l.templates, un(o, l);
}
function pg(a = zs, e = "", t = "") {
  const i = String(t ?? "").trim();
  if (!i) return {};
  const n = wd(e, a), s = n == null ? void 0 : n[i];
  if (!cn(s)) return {};
  let r = {};
  for (const l of Array.from(s.templates ?? []))
    r = un(
      r,
      kd(a, e, l)
    );
  const o = Oa(s);
  return delete o.templates, un(r, o);
}
function hg(a = "", e = "", t = zs) {
  const i = pg(t, a, e), n = Fl[a] ?? Fl.Item, s = { system: {} };
  for (const [r, o] of Object.entries(i))
    n.has(r) ? s[r] = Oa(o) : s.system[r] = Oa(o);
  return s;
}
async function vd(a = "", e = "") {
  return hg(a, e);
}
const Md = Object.freeze({
  weapon: A.itemType.personalWeapon,
  shadowamp: A.itemType.assetModule
}), gg = Object.freeze({
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
function Cd(a) {
  return Md[a] ?? a;
}
function yg(a) {
  return gg[Cd(a)];
}
function bg(a) {
  return Object.prototype.hasOwnProperty.call(Md, a);
}
const aa = Object.freeze(["close", "near", "far", "extreme"]), Ul = Object.freeze({
  none: { targets: 1, adjust: [0] },
  shotgun: { targets: 2, adjust: [0, -2] },
  circle: { targets: void 0 },
  cone: { targets: void 0 },
  rect: { targets: void 0 },
  ray: { targets: void 0 }
});
function Ha() {
  return foundry.data.operators.ForcedDeletion;
}
function Sg(a, e) {
  const t = String(e ?? "").split(".").map((n) => n.trim()).filter(Boolean);
  if (!a || typeof a != "object" || t.length < 2) return a;
  let i = a;
  for (let n = 0; n < t.length - 1; n += 1) {
    const s = t[n], r = i == null ? void 0 : i[s];
    (!r || typeof r != "object" || Array.isArray(r)) && (i[s] = {}), i = i[s];
  }
  return a;
}
function Ag(a, e) {
  const t = String(e ?? "").trim();
  if (!a || typeof a != "object" || !t) return !1;
  if (t.startsWith("areaEffect.hazard.")) {
    (!a.areaEffect || typeof a.areaEffect != "object" || Array.isArray(a.areaEffect)) && (a.areaEffect = {});
    const i = String(a.areaEffect.kind ?? "").trim().toLowerCase();
    if (i && i !== "persistent")
      return !1;
    a.areaEffect.kind = "persistent";
  }
  return Sg(a, t), !0;
}
function ja(a) {
  return La(a);
}
function Hl(a = {}) {
  const e = iu({
    traits: a.traits,
    keywords: a.keywords,
    report: Eo(),
    path: "system.traits"
  });
  return {
    traits: e.traits,
    keywords: e.keywords
  };
}
function Ed(a) {
  return a === "long" ? "extreme" : a === "short" ? "close" : a === "medium" ? "near" : aa.includes(a) ? a : "near";
}
function pa(a) {
  const e = Vo(a);
  return e.max = Ed(e.max ?? (a == null ? void 0 : a.max) ?? "extreme"), e;
}
function ir(a) {
  return {
    close: Number((a == null ? void 0 : a.close) ?? (a == null ? void 0 : a.short) ?? 0) || 0,
    near: Number((a == null ? void 0 : a.near) ?? (a == null ? void 0 : a.medium) ?? 0) || 0,
    far: Number((a == null ? void 0 : a.far) ?? (a == null ? void 0 : a.long) ?? 0) || 0,
    extreme: Number((a == null ? void 0 : a.extreme) ?? 0) || 0
  };
}
function jl(a, e = 1) {
  const t = Number(a);
  return Number.isFinite(t) ? Math.max(0, Math.trunc(t)) : Math.max(0, Math.trunc(Number(e) || 0));
}
function Wl(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? Math.max(0, Math.trunc(t)) : Math.max(0, Math.trunc(Number(e) || 0));
}
function Kl(a) {
  return String(a ?? "").trim();
}
function Gl(a) {
  return (Array.isArray(a) ? a : typeof a == "string" ? a.split(",") : []).map((t) => String(t ?? "").trim()).filter(Boolean);
}
function Tg(a) {
  const e = aa.indexOf(a);
  return e >= 0 ? e : aa.indexOf("near");
}
function wg(a = pa({})) {
  const e = ["near", "close", "far", "extreme"], t = Tg(a.max);
  return e.find((i) => aa.indexOf(i) <= t) ?? "close";
}
function kg(a) {
  const e = Ed(a == null ? void 0 : a.max), t = aa.indexOf(e);
  return aa.map((i, n) => ({
    key: i,
    allowed: t >= 0 ? n <= t : n === 0,
    value: (a == null ? void 0 : a[i]) ?? void 0,
    labelkey: ls(i)
  }));
}
function vg(a, e, t, i) {
  let n = Number(e);
  if (t)
    if (i !== void 0)
      n += Math.ceil(Number(i) / 2);
    else
      return console.warn("Weapon not attached to an actor"), Le.item.personalWeapon.weaponWithoutActor;
  return n;
}
function Mg(a, e, t) {
  let i = "";
  return t && Le.attributes[t] && (i += Le.attributes[t].substring(0, 3).toUpperCase() + "/2 + "), i += String(e), i;
}
function Cg(a, e) {
  return j.useArmor(a) ? e ? "noArmor" : "withArmor" : "";
}
function ql(a) {
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
function ar(a = {}) {
  const e = ln(a), t = Oi(e.catalogId);
  return {
    system: e,
    ...t ? { name: t.label } : {}
  };
}
function Eg(a) {
  const e = String(a ?? "").trim();
  return !!(!e || e.startsWith("icons/svg/") || e === "icons/mystery-man.svg");
}
var fn, Gt, Fr, Pd, jn;
const mt = class mt extends Item {
  static init() {
    F(this, fn) || (Re(this, fn, !0), Hooks.on("createItem", (e, t, i) => {
      var n, s;
      Promise.resolve((n = e.onCreateItem) == null ? void 0 : n.call(e, t, i)).catch((r) => {
        console.error(`${Ce}Item create hook failed`, r);
      }), C(s = mt, Gt, Fr).call(s, e);
    }), Hooks.on("updateItem", (e) => {
      var t;
      C(t = mt, Gt, Fr).call(t, e);
    }), Hooks.on("deleteItem", (e) => {
      var t;
      C(t = mt, Gt, Pd).call(t, e);
    }), Hooks.on("createActiveEffect", (e) => {
      var t;
      C(t = mt, Gt, jn).call(t, e);
    }), Hooks.on("updateActiveEffect", (e) => {
      var t;
      C(t = mt, Gt, jn).call(t, e);
    }), Hooks.on("deleteActiveEffect", (e) => {
      var t;
      C(t = mt, Gt, jn).call(t, e);
    }));
  }
  static canonicalType(e) {
    return Cd(e);
  }
  static defaultIconForType(e) {
    return yg(e);
  }
  get canonicalType() {
    return this.constructor.canonicalType(this.type);
  }
  async onCreateItem(e, t) {
  }
  async _preCreate(e, t, i) {
    super._preCreate && await super._preCreate(e, t, i);
    const n = (e == null ? void 0 : e.type) ?? this.type, s = this.constructor.canonicalType(n), r = {}, o = await vd("Item", s);
    if (o.system && Object.keys(o.system).length && (r.system = foundry.utils.mergeObject(
      foundry.utils.deepClone(o.system),
      foundry.utils.deepClone((e == null ? void 0 : e.system) ?? this.system ?? {}),
      { inplace: !1, recursive: !0, overwrite: !0 }
    )), n !== s && bg(n) && (r.type = s), Eg((e == null ? void 0 : e.img) ?? this.img)) {
      const l = this.constructor.defaultIconForType(s);
      l && (r.img = l);
    }
    if (s === A.itemType.lifeModule && (!(e != null && e.name) || e.name === "DOCUMENT.Item") && (r.name = "MWD.itemType.singular.lifeModule"), s === A.itemType.lifeModule) {
      const l = ar(r.system ?? (e == null ? void 0 : e.system) ?? this.system ?? {});
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
      const u = n.ammo, d = Hl(n);
      e.system.standardTraits = [], e.system.payloads = fi(n.payloads, { legacyAmmo: u, category: n.category }), e.system.consumptionSources = Ka(n.consumptionSources, { legacyAmmo: u }), e.system.selectedPayloadId = fa(
        n.selectedPayloadId,
        e.system.payloads,
        { legacyAmmo: u, category: n.category }
      ), e.system.traits = d.traits, e.system.keywords = d.keywords, e.system.resolution = Ln(n.resolution, "standard"), e.system.fireModes = xn(n.fireModes), e.system.attackRatingBand = ir(n.attackRatingBand), e.system.range = pa(n.range), e.system.damageType = qt(n.damageType), e.system.ammo = Ha();
    }
    if (n && this.isArmor() && (e.system ?? (e.system = {}), e.system.mitigationByType = ri(n.mitigationByType ?? n.mitigation), e.system.tags = _n(n.tags), e.system.traits = ja(n.traits), e.system.standardTraits = mi(n.standardTraits), e.system.traitState = Qs({
      standardTraits: e.system.standardTraits,
      traits: e.system.traits,
      traitState: n.traitState
    }).traitState), n && this.isLifeModule()) {
      const u = ar(n);
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
      e.system ?? (e.system = {}), e.system.quantity = jl(n.quantity, 1), e.system.rating = Wl(n.rating, 0), e.system.category = Kl(n.category), e.system.tags = Gl(n.tags);
      return;
    }
    if (!this.isSkill()) return;
    const s = (l = e == null ? void 0 : e.system) == null ? void 0 : l.code;
    if (s === void 0) return;
    const r = this.system.code;
    if (s === r) return;
    const o = ql(s);
    o && ((c = o == null ? void 0 : o.system) == null || delete c.code, foundry.utils.mergeObject(e, o, { inplace: !0 }));
  }
  prepareBaseData() {
    super.prepareBaseData();
    const e = this.canonicalType;
    e === A.itemType.personalWeapon ? this._preparePersonalWeaponBaseData() : e === A.itemType.armor ? this._prepareArmorBaseData() : e === A.itemType.lifeModule ? this._prepareLifeModuleBaseData() : e === A.itemType.quality ? this._prepareQualityBaseData() : [A.itemType.gear, A.itemType.consumable].includes(e) && this._prepareGearBaseData();
  }
  _preparePersonalWeaponBaseData() {
    const e = this.system ?? {}, t = e.ammo;
    e.equipped = !!e.equipped, e.isPrimary = !!e.isPrimary, e.category = String(e.category ?? e.weaponCategory ?? "ranged").trim() || "ranged", e.skill = String(e.skill ?? "firearms").trim() || "firearms", e.ap = Number(e.ap ?? e.armorPiercing ?? 0) || 0, e.damage = Number(e.damage ?? 0) || 0, e.damageType = qt(e.damageType), e.attackRatingBand = ir(e.attackRatingBand), e.range = pa(e.range);
    const i = Hl(e);
    e.standardTraits = [], e.traits = i.traits, e.keywords = i.keywords, e.resolution = Ln(e.resolution, "standard"), e.fireModes = xn(e.fireModes), e.payloads = fi(e.payloads, { legacyAmmo: t, category: e.category }), e.consumptionSources = Ka(e.consumptionSources, { legacyAmmo: t }), e.selectedPayloadId = fa(e.selectedPayloadId, e.payloads, { legacyAmmo: t, category: e.category }), delete e.ammo, e.notes = String(e.notes ?? "").trim();
  }
  _prepareArmorBaseData() {
    const e = this.system ?? {};
    e.equipped = !!e.equipped, e.isPrimary = !!e.isPrimary, e.rating = Math.max(0, Number(e.rating ?? 0)), e.defenseBonus = Number(e.defenseBonus ?? 0) || 0, e.mitigationByType = ri(e.mitigationByType ?? e.mitigation), delete e.mitigation, e.durability ?? (e.durability = {}), e.durability.max = Math.max(0, Number(e.durability.max ?? e.rating ?? 0)), e.durability.current = Math.min(
      e.durability.max,
      Math.max(0, Number(e.durability.current ?? e.durability.max ?? e.rating ?? 0))
    ), e.standardTraits = mi(e.standardTraits), e.tags = _n(e.tags), e.traits = ja(e.traits), e.traitState = Qs({
      standardTraits: e.standardTraits,
      traits: e.traits,
      traitState: e.traitState
    }).traitState, e.notes = String(e.notes ?? "").trim();
  }
  _prepareLifeModuleBaseData() {
    const e = ar(this.system ?? {});
    foundry.utils.mergeObject(this.system, e.system, { inplace: !0, overwrite: !0 });
  }
  _prepareQualityBaseData() {
    const e = Kt(this.system ?? {});
    foundry.utils.mergeObject(this.system, e, { inplace: !0, overwrite: !0 });
  }
  _prepareGearBaseData() {
    const e = this.system ?? {};
    e.quantity = jl(e.quantity, 1), e.rating = Wl(e.rating, 0), e.category = Kl(e.category), e.tags = Gl(e.tags);
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
      const i = (s = (n = t.flags) == null ? void 0 : n[T]) == null ? void 0 : s[mt.EQUIPPED_EFFECT_FLAG];
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
      const y = (h = (p = (f = g.flags) == null ? void 0 : f[T]) == null ? void 0 : p[mt.EQUIPPED_EFFECT_FLAG]) == null ? void 0 : h.sourceEffectId;
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
        [mt.EQUIPPED_EFFECT_FLAG]: {
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
    this.parent && await ai.itemAttributeRoll(this, e);
  }
  async switchMonitorCheck(e, t, i, n = void 0) {
    await j.switchMonitorCheck(this.parent, e, t, i, n, this);
  }
  async setCounter(e, t) {
    await j.setCounter(this, e, t);
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
    oe.reindexIds(t), await this.update({ "system.modifiers": t });
  }
  async _mutateQualitySystem(e = (t) => t) {
    const t = e(foundry.utils.deepClone(Kt(this.system ?? {})));
    await this.update({ system: Kt(t) });
  }
  async createQualityPrerequisite(e = {}) {
    await this._mutateQualitySystem((t) => (t.prerequisites = hi(t.prerequisites).concat([{
      id: e.id ?? foundry.utils.randomID(),
      fact: e.fact ?? "",
      comparator: e.comparator ?? "eq",
      value: e.value ?? ""
    }]), t));
  }
  async deleteQualityPrerequisite(e) {
    await this._mutateQualitySystem((t) => (t.prerequisites = hi(t.prerequisites).filter((i) => i.id !== e), t));
  }
  async updateQualityPrerequisite(e, t, i) {
    await this._mutateQualitySystem((n) => (n.prerequisites = hi(n.prerequisites).map((s) => (s.id !== e || (t === "fact" && (s.fact = i), t === "comparator" && (s.comparator = i), t === "value" && (s.value = i)), s)), n));
  }
  async createQualityEffect(e = {}) {
    await this._mutateQualitySystem((t) => (t.effects = Ui(t.effects).concat([{
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
      conditions: hi(e.conditions ?? []),
      limit: Di(e.limit ?? {})
    }]), t));
  }
  async deleteQualityEffect(e) {
    await this._mutateQualitySystem((t) => (t.effects = Ui(t.effects).filter((i) => i.id !== e), t));
  }
  async updateQualityEffect(e, t, i) {
    await this._mutateQualitySystem((n) => (n.effects = Ui(n.effects).map((s) => (s.id !== e || (t === "type" && (s.type = i), t === "phase" && (s.phase = i), t === "selector" && (s.selector = i), t === "skillKeys" && (s.skillKeys = Array.isArray(i) ? i : []), t === "label" && (s.label = i), t === "value" && (s.value = Number(i ?? 0) || 0), t === "min" && (s.min = i === "" ? null : Number(i ?? 0)), t === "max" && (s.max = i === "" ? null : Number(i ?? 0)), t === "pool" && (s.pool = i), t === "operation" && (s.operation = i), t === "limit.perActivation" && (s.limit = Di({ ...s.limit ?? {}, perActivation: i })), t === "limit.perRound" && (s.limit = Di({ ...s.limit ?? {}, perRound: i })), t === "limit.perScene" && (s.limit = Di({ ...s.limit ?? {}, perScene: i }))), s)), n));
  }
  async createQualityEffectCondition(e, t = {}) {
    await this._mutateQualitySystem((i) => (i.effects = Ui(i.effects).map((n) => (n.id !== e || (n.conditions = hi(n.conditions).concat([{
      id: t.id ?? foundry.utils.randomID(),
      fact: t.fact ?? "",
      comparator: t.comparator ?? "eq",
      value: t.value ?? ""
    }])), n)), i));
  }
  async deleteQualityEffectCondition(e, t) {
    await this._mutateQualitySystem((i) => (i.effects = Ui(i.effects).map((n) => (n.id !== e || (n.conditions = hi(n.conditions).filter((s) => s.id !== t)), n)), i));
  }
  async updateQualityEffectCondition(e, t, i, n) {
    await this._mutateQualitySystem((s) => (s.effects = Ui(s.effects).map((r) => (r.id !== e || (r.conditions = hi(r.conditions).map((o) => (o.id !== t || (i === "fact" && (o.fact = n), i === "comparator" && (o.comparator = n), i === "value" && (o.value = n)), o))), r)), s));
  }
  async _mutateWeaponStandardTraits(e = (t) => t) {
    var i;
    const t = e(foundry.utils.deepClone(Hi((i = this.system) == null ? void 0 : i.standardTraits)));
    await this.update({ "system.standardTraits": Hi(t) });
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
    const t = e(foundry.utils.deepClone(mi((i = this.system) == null ? void 0 : i.standardTraits)));
    await this.update({ "system.standardTraits": mi(t) });
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
      fi((n = this.system) == null ? void 0 : n.payloads, {
        legacyAmmo: (s = this.system) == null ? void 0 : s.ammo,
        category: ((r = this.system) == null ? void 0 : r.category) ?? ((o = this.system) == null ? void 0 : o.weaponCategory)
      })
    )).map(vt), i = fa((l = this.system) == null ? void 0 : l.selectedPayloadId, t, {
      category: ((c = this.system) == null ? void 0 : c.category) ?? ((u = this.system) == null ? void 0 : u.weaponCategory)
    });
    await this.update({
      "system.payloads": t,
      "system.selectedPayloadId": i,
      "system.ammo": Ha()
    });
  }
  async _mutateConsumptionSources(e = (t) => t) {
    var i, n;
    const t = e(foundry.utils.deepClone(
      Ka((i = this.system) == null ? void 0 : i.consumptionSources, { legacyAmmo: (n = this.system) == null ? void 0 : n.ammo })
    )).map(ii);
    await this.update({
      "system.consumptionSources": t,
      "system.ammo": Ha()
    });
  }
  async updatePayloadField(e, t, i) {
    String(e ?? "").trim() !== "unloaded" && await this._mutatePayloads((n) => n.map((s) => s.id !== e ? s : (Ag(s, t) && foundry.utils.setProperty(s, t, i), vt(s))));
  }
  async createPayload(e = {}) {
    await this._mutatePayloads((t) => t.concat([vt({
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
    const t = ((s = this.system) == null ? void 0 : s.category) ?? ((r = this.system) == null ? void 0 : r.weaponCategory), i = fi((o = this.system) == null ? void 0 : o.payloads, {
      legacyAmmo: (l = this.system) == null ? void 0 : l.ammo,
      category: t
    }).filter((u) => u.id !== e), n = ((c = i[0]) == null ? void 0 : c.id) ?? "unloaded";
    await this.update({
      "system.payloads": i.length ? i : fi([], { category: t }),
      "system.selectedPayloadId": i.some((u) => {
        var d;
        return u.id === ((d = this.system) == null ? void 0 : d.selectedPayloadId);
      }) ? this.system.selectedPayloadId : i.length ? n : "",
      "system.ammo": Ha()
    });
  }
  async createPayloadStandardTrait(e, t = {}) {
    String(e ?? "").trim() !== "unloaded" && await this._mutatePayloads((i) => i.map((n) => n.id !== e ? n : (n.modifies ?? (n.modifies = {}), n.modifies.standardTraits = Hi(n.modifies.standardTraits).concat([{
      id: t.id ?? foundry.utils.randomID(),
      key: t.key ?? "armorPiercing",
      rating: Math.max(0, Number(t.rating ?? 0) || 0)
    }]), vt(n))));
  }
  async deletePayloadStandardTrait(e, t) {
    String(e ?? "").trim() !== "unloaded" && await this._mutatePayloads((i) => i.map((n) => n.id !== e ? n : (n.modifies ?? (n.modifies = {}), n.modifies.standardTraits = Hi(n.modifies.standardTraits).filter((s) => s.id !== t), vt(n))));
  }
  async updatePayloadStandardTrait(e, t, i, n) {
    String(e ?? "").trim() !== "unloaded" && await this._mutatePayloads((s) => s.map((r) => r.id !== e ? r : (r.modifies ?? (r.modifies = {}), r.modifies.standardTraits = Hi(r.modifies.standardTraits).map((o) => (o.id !== t || (i === "key" && (o.key = n), i === "rating" && (o.rating = Math.max(0, Number(n ?? 0) || 0))), o)), vt(r))));
  }
  async createConsumptionSource(e = {}) {
    await this._mutateConsumptionSources((t) => t.concat([ii({
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
      return ((n = i == null ? void 0 : i.consumption) == null ? void 0 : n.sourceId) !== e ? i : (i.consumption.sourceId = "", vt(i));
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
      return ii(s);
    }));
  }
  getPayloadState({ payloadId: e = "", ammoTypeId: t = "" } = {}) {
    var i, n, s, r, o;
    return Nr({
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
      return r.id !== i.source.id ? r : (r.tracking ?? (r.tracking = {}), r.tracking.max = Math.max(0, Number(((o = r.tracking) == null ? void 0 : o.max) ?? i.max) || i.max), r.tracking.current = i.max, ii(r));
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
    const t = fa(
      e,
      fi((i = this.system) == null ? void 0 : i.payloads, {
        legacyAmmo: (n = this.system) == null ? void 0 : n.ammo,
        category: ((s = this.system) == null ? void 0 : s.category) ?? ((r = this.system) == null ? void 0 : r.weaponCategory)
      }),
      {
        category: ((o = this.system) == null ? void 0 : o.category) ?? ((l = this.system) == null ? void 0 : l.weaponCategory)
      }
    );
    await this.update({
      "system.selectedPayloadId": t,
      "system.ammo": Ha()
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
      return l.id !== ((c = i.source) == null ? void 0 : c.id) ? l : (l.tracking ?? (l.tracking = {}), l.tracking.current = Math.max(0, s - n), ii(l));
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
    const i = this.system ?? {}, n = pa(i.range), s = String(i.skill ?? "").trim(), r = Bt(s), o = Number(i.damage ?? 0) || 0, l = String(i.category ?? i.weaponCategory ?? "ranged").trim() || "ranged", c = Vf({
      damageType: i.damageType,
      ap: Number(i.ap ?? i.armorPiercing ?? 0) || 0,
      attackRatingBand: ir(i.attackRatingBand),
      traits: ja(i.traits),
      keywords: Lf(i.keywords),
      standardTraits: [],
      resolution: Ln(i.resolution, "standard"),
      fireModes: xn(i.fireModes),
      payloads: fi(i.payloads, { legacyAmmo: i.ammo, category: l }),
      selectedPayloadId: fa(i.selectedPayloadId, i.payloads, { legacyAmmo: i.ammo, category: l }),
      consumptionSources: Ka(i.consumptionSources, { legacyAmmo: i.ammo }),
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
    ), r = Math.min(i, s), o = ri((t == null ? void 0 : t.mitigationByType) ?? (t == null ? void 0 : t.mitigation)), l = Qs({
      standardTraits: mi(t == null ? void 0 : t.standardTraits),
      traits: ja(t == null ? void 0 : t.traits),
      traitState: t == null ? void 0 : t.traitState
    }), c = _n(t == null ? void 0 : t.tags), u = Io(r);
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
      mitigationByType: vu(o, l.mitigationByType),
      tags: c,
      isDestroyed: s <= 0,
      durability: {
        current: s,
        max: n
      },
      traitState: l.traitState,
      standardTraits: mi(t.standardTraits),
      traits: Yf({
        traits: ja(t.traits),
        standardTraits: mi(t.standardTraits)
      }),
      notes: String(t.notes ?? "").trim()
    };
  }
  getDefaultRangeBand(e = pa(((t) => (t = this.system) == null ? void 0 : t.range)())) {
    return wg(e);
  }
  isWeaponSkill(e) {
    return ((e == null ? void 0 : e.canonicalType) ?? (e == null ? void 0 : e.type)) === A.itemType.skill && e.system.code === this.system.skill;
  }
  getWeaponSkill() {
    var i;
    const e = (i = this.actor) == null ? void 0 : i.items.find((n) => this.isWeaponSkill(n));
    if (e) return e;
    const t = game.items.find((n) => this.isWeaponSkill(n));
    return t || ql(this.system.skill);
  }
  getDefense() {
    if (!this.isPersonalWeapon())
      return this.system.defense ? xe.fixedDefenseCode(this.system.defense) : void 0;
    if (this.system.defense)
      return xe.fixedDefenseCode(this.system.defense);
    const e = Bt(String(this.system.skill ?? "").trim());
    return e != null && e.defense ? xe.fixedDefenseCode(e.defense) : void 0;
  }
  getDamage() {
    if (!this.parent) return;
    const e = this._getMonitor(), t = this.system.damageAttribute ? this.parent.getAttributeValue(this.system.damageAttribute) ?? 0 : 0, i = this.isPersonalWeapon() ? this.getCombatProfile() : null;
    return {
      value: vg(
        e,
        this.system.damage,
        this.system.damageAttribute,
        t
      ),
      monitor: e,
      damageType: (i == null ? void 0 : i.damageType) ?? this.system.damageType,
      damageTypeLabel: (i == null ? void 0 : i.damageTypeLabel) ?? this.getDamageTypeLabel(),
      noArmor: this.system.noArmor ?? this.system.armorAvoidance,
      armorMode: Cg(e, this.system.noArmor ?? this.system.armorAvoidance)
    };
  }
  getDamageCode() {
    return Mg(
      this._getMonitor(),
      this.system.damage,
      this.system.damageAttribute
    );
  }
  getDamageTypeLabel() {
    var t;
    if (this.isPersonalWeapon())
      return Vt(((t = this.getCombatProfile()) == null ? void 0 : t.damageType) ?? this.system.damageType);
    const e = Le.mwd.weaponDamageType[this.system.damageType] ?? Le.mwd.personalDamageType[this.system.damageType];
    return e || this.system.damageType;
  }
  getRanges() {
    return kg(pa(this.system.range)).filter((e) => e.allowed).map((e) => ({ value: e.value, labelkey: e.labelkey }));
  }
  validateTargets(e) {
    var r;
    const t = (r = this.getDamage()) == null ? void 0 : r.monitor, i = Wt.getTargetTokens(game.user), n = i.filter((o) => {
      var l;
      return (l = o.actor) == null ? void 0 : l.canReceiveDamage(t);
    }), s = i.filter((o) => {
      var l;
      return !((l = o.actor) != null && l.canReceiveDamage(t));
    }).map((o) => o.name);
    if (s.length > 0) {
      const o = Ne(Le.common.errors.ignoredTargets, {
        targets: s.reduce(oe.joiner(", "))
      });
      ui.notifications.info(o);
    }
    if (n.length === 0) {
      const o = Ne(Le.common.errors.noTargetSelected, {
        weapon: this.name ?? Le.itemType.singular.weapon
      });
      ui.notifications.info(o);
    } else
      this.checkWeaponTargetsCount(n);
    return n;
  }
  checkWeaponTargetsCount(e) {
    const t = this.system.area, i = Ul[t] ?? {};
    ra.checkTargetsCount(i.targets ?? 0, e, t);
  }
  getAreaModifier(e) {
    const t = this.getArea(), i = Ul[t] ?? {};
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
fn = new WeakMap(), Gt = new WeakSet(), Fr = async function(e) {
  if (typeof (e == null ? void 0 : e.syncEquippedActorEffects) == "function")
    try {
      await e.syncEquippedActorEffects();
    } catch (t) {
      console.error(`${Ce}Failed to sync equipped item effects`, { item: e, error: t });
    }
}, Pd = async function(e) {
  if (typeof (e == null ? void 0 : e.removeSyncedActorEffects) == "function")
    try {
      await e.removeSyncedActorEffects({ actor: e.actor ?? e.parent ?? null });
    } catch (t) {
      console.error(`${Ce}Failed to remove synced item effects`, { item: e, error: t });
    }
}, jn = async function(e) {
  const t = e == null ? void 0 : e.parent;
  if (typeof (t == null ? void 0 : t.syncEquippedActorEffects) == "function")
    try {
      await t.syncEquippedActorEffects();
    } catch (i) {
      console.error(`${Ce}Failed to sync parent item effects`, { effect: e, error: i });
    }
}, we(mt, Gt), we(mt, fn, !1), O(mt, "RANGE_ORDER", aa), O(mt, "EQUIPPED_EFFECT_FLAG", "equippedItemSync"), O(mt, "DEFAULT_UNARMED", Object.freeze({
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
let _a = mt;
const Vl = {
  none: { targets: 1, adjust: [0] },
  shotgun: { targets: 2, adjust: [0, -2] },
  circle: { targets: void 0 },
  cone: { targets: void 0 },
  rect: { targets: void 0 },
  ray: { targets: void 0 }
}, Pg = {
  code: "weapon-range",
  options: {
    flags: { editable: !0 },
    order: 20,
    category: ke.pool,
    labelkey: Le.common.roll.modifiers.weaponRange,
    hbsTemplateRoll: `${X}/roll/parts/select-option.hbs`,
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
}, Rg = {
  code: "weapon-area",
  options: {
    used: !0,
    order: 20,
    category: ke.pool,
    labelkey: Le.common.roll.modifiers.weaponArea,
    hbsTemplateRoll: `${X}/roll/parts/input-numeric.hbs`,
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
}, Ae = class Ae extends _a {
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
    Hooks.once(Mt.REGISTER_ROLL_PARAMETERS, (e) => {
      e(Rg), e(Pg);
    });
  }
  prepareBaseData() {
    if (super.prepareBaseData(), (this.canonicalType ?? this.type) !== A.itemType.personalWeapon) return;
    const e = this.system ?? {};
    e.equipped = !!e.equipped, e.isPrimary = !!e.isPrimary, e.category = String(e.category ?? e.weaponCategory ?? "ranged").trim() || "ranged", e.skill = String(e.skill ?? "firearms").trim() || "firearms", e.ap = Number(e.ap ?? e.armorPiercing ?? 0) || 0, e.damage = Number(e.damage ?? 0) || 0, e.damageType = qt(e.damageType), e.attackRatingBand = Ae.normalizeAttackRatingBand(e.attackRatingBand), e.range = Ae.normalizePersonalRangeData(e.range), e.traits = Ae.normalizeTraits(e.traits), e.notes = String(e.notes ?? "").trim();
  }
  static maxIndex(e) {
    const t = Ae.RANGE_ORDER.indexOf(e);
    return t >= 0 ? t : Ae.RANGE_ORDER.indexOf("near");
  }
  /**
    * Compute UI-friendly range band data:
    * - cap: normalized max band
    * - bands: [{key, allowed, value}]
    * - optimalKey: highest value among allowed (tie -> closest)
    */
  static getRangeBands(e) {
    const t = e ?? {}, i = Ae.normalizeRangeKey(t.max ?? "near"), n = Ae.maxIndex(i), s = Ae.RANGE_ORDER.map((l, c) => ({
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
    return La(e);
  }
  static normalizePersonalRangeData(e) {
    const t = Vo(e);
    return t.max = Ae.normalizeRangeKey(t.max ?? (e == null ? void 0 : e.max) ?? "extreme"), t;
  }
  static normalizeRangeData(e) {
    return {
      max: Ae.normalizeRangeKey((e == null ? void 0 : e.max) ?? "near"),
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
    const t = this.system ?? {}, i = this.canonicalType ?? this.type, n = i === A.itemType.personalWeapon ? Ae.normalizePersonalRangeData(t.range) : Ae.normalizeRangeData(t.range), s = String(t.skill ?? "").trim(), r = Bt(s), o = Number(t.damage ?? 0) || 0, l = Number(t.ap ?? t.armorPiercing ?? 0) || 0, c = String(t.category ?? t.weaponCategory ?? "ranged").trim() || "ranged", u = Ae.normalizeTraits(t.traits);
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
      attackRatingBand: Ae.normalizeAttackRatingBand(t.attackRatingBand),
      range: n,
      defaultRangeBand: this.getDefaultRangeBand(n),
      traits: u,
      effects: {},
      notes: String(t.notes ?? t.description ?? "").trim()
    };
  }
  getDefaultRangeBand(e = Ae.normalizeRangeData(((t) => (t = this.system) == null ? void 0 : t.range)())) {
    const i = ["near", "close", "far", "extreme"], n = Ae.maxIndex(e.max);
    return i.find((s) => Ae.RANGE_ORDER.indexOf(s) <= n) ?? "close";
  }
  getWeaponSkill() {
    var i;
    const e = (i = this.actor) == null ? void 0 : i.items.find(
      (n) => n.type === A.itemType.skill && n.system.code === this.system.skill
    );
    if (e) return e;
    const t = Bt(String(this.system.skill ?? "").trim());
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
      return this.system.defense ? xe.fixedDefenseCode(this.system.defense) : void 0;
    if (this.system.defense)
      return xe.fixedDefenseCode(this.system.defense);
    const e = Bt(String(this.system.skill ?? "").trim());
    return e != null && e.defense ? xe.fixedDefenseCode(e.defense) : void 0;
  }
  getDamage() {
    if (!this.parent)
      return;
    const e = this._getMonitor(), t = this.system.damageAttribute ? this.parent.getAttributeValue(this.system.damageAttribute) ?? 0 : 0;
    return {
      value: Ae.damageValue(
        e,
        this.system.damage,
        this.system.damageAttribute,
        t
      ),
      monitor: e,
      damageType: this.system.damageType,
      damageTypeLabel: this.getDamageTypeLabel(),
      noArmor: this.system.noArmor ?? this.system.armorAvoidance,
      armorMode: Ae.armorMode(e, this.system.noArmor ?? this.system.armorAvoidance)
    };
  }
  static damageValue(e, t, i, n) {
    if (t = Number(t), i)
      if (n !== void 0)
        t = t + Math.ceil(Number(n) / 2);
      else
        return console.warn("Weapon not attached to an actor"), Le.item.personalWeapon.weaponWithoutActor;
    return t;
  }
  getDamageCode() {
    return Ae.damageCode(
      this._getMonitor(),
      this.system.damage,
      this.system.damageAttribute
    );
  }
  static damageCode(e, t, i) {
    let n = "";
    return i && Le.attributes[i] && (n += Le.attributes[i].substring(0, 3).toUpperCase() + "/2 + "), n += String(t), n;
  }
  static armorMode(e, t) {
    return j.useArmor(e) ? t ? "noArmor" : "withArmor" : "";
  }
  getDamageTypeLabel() {
    if ((this.canonicalType ?? this.type) === A.itemType.personalWeapon)
      return Vt(this.system.damageType);
    const e = Le.mwd.weaponDamageType[this.system.damageType] ?? Le.mwd.personalDamageType[this.system.damageType];
    return e || this.system.damageType;
  }
  getRanges() {
    const e = (this.canonicalType ?? this.type) === A.itemType.personalWeapon, t = e ? Ae.normalizePersonalRangeData(this.system.range) : Ae.normalizeRangeData(this.system.range);
    return Ae.getRangeList(t, {
      personalScale: e
    }).filter((i) => i.allowed).map((i) => ({ value: i.value, labelkey: i.labelkey }));
  }
  _getRange(e) {
    return { value: this.system.range[e], labelkey: Me.getFromList(Me.getEnums().ranges, e) };
  }
  static getRangeList(e, { personalScale: t = !1 } = {}) {
    const i = Ae.normalizeRangeKey(e == null ? void 0 : e.max), n = Ae.RANGE_ORDER.indexOf(i);
    return Ae.RANGE_ORDER.map((s, r) => ({
      key: s,
      allowed: n >= 0 ? r <= n : r === 0,
      value: (e == null ? void 0 : e[s]) ?? (s === "extreme" && (e == null ? void 0 : e.long) !== void 0 ? e.long : void 0),
      labelkey: t ? ls(s) : Me.getFromList(Me.getEnums().ranges, s)
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
    const t = (r = this.getDamage()) == null ? void 0 : r.monitor, i = Wt.getTargetTokens(game.user), n = i.filter((o) => {
      var l;
      return (l = o.actor) == null ? void 0 : l.canReceiveDamage(t);
    }), s = i.filter((o) => {
      var l;
      return !((l = o.actor) != null && l.canReceiveDamage(t));
    }).map((o) => o.name);
    if (s.length > 0) {
      const o = Ne(Le.common.errors.ignoredTargets, {
        targets: s.reduce(oe.joiner(", "))
      });
      ui.notifications.info(o);
    }
    if (n.length == 0) {
      const o = Ne(Le.common.errors.noTargetSelected, {
        weapon: this.name ?? Le.itemType.singular.weapon
      });
      ui.notifications.info(o);
    } else
      this.checkWeaponTargetsCount(n);
    return n;
  }
  checkWeaponTargetsCount(e) {
    const t = this.system.area, i = Vl[t] ?? {};
    ra.checkTargetsCount(i.targets ?? 0, e, t);
  }
  getAreaModifier(e) {
    const t = this.getArea(), i = Vl[t] ?? {};
    return i.targets && i.adjust && e <= i.targets ? i.adjust[e - 1] ?? 0 : 0;
  }
  getArea() {
    return this.system.area == "" ? A.area.none : this.system.area ?? A.area.none;
  }
  _getMonitor() {
    return (this.canonicalType ?? this.type) === A.itemType.personalWeapon ? A.monitors.physical : this.system.monitor || A.monitors.physical;
  }
};
O(Ae, "RANGE_ORDER", ["close", "near", "far", "extreme"]), O(Ae, "DEFAULT_UNARMED", _a.DEFAULT_UNARMED);
let xt = Ae;
function Ng(a) {
  const e = [];
  for (let [t, i] of Object.entries(a ?? {}))
    i !== void 0 && (t = t.replace(/[A-Z]+(?![a-z])|[A-Z]/g, (n, s) => (s ? "-" : "") + n.toLowerCase()), e.push(`data-${t}="${Handlebars.escapeExpression(i)}"`));
  return new Handlebars.SafeString(e.join(" "));
}
function Ig({ hash: a }) {
  return a;
}
function Dg() {
  var a, e;
  return ((e = (a = foundry == null ? void 0 : foundry.applications) == null ? void 0 : a.handlebars) == null ? void 0 : e.Handlebars) ?? Handlebars;
}
class Xo {
  constructor() {
    this.registerHelpers(), Hooks.once("init", () => {
      this.registerHelpers(), console.log(`${Ce}Handlebars helpers registered (init)`);
    }), console.log(`${Ce}Handlebars helpers registered (ctor)`);
  }
  registerHelpers() {
    const e = Dg(), t = {
      // Foundry utils
      getProperty: foundry.utils.getProperty,
      // DND5E-inspired utilities
      "mwd-dataset": Ng,
      "mwd-object": Ig,
      // Simple comparisons
      eq: (i, n) => i === n,
      ne: (i, n) => i !== n,
      // Strings/arrays
      concat: (...i) => oe.join(i.slice(0, -1)),
      join: (i, n = " ") => Array.isArray(i) ? i.join(n) : "",
      includes: (i, n) => i == null ? void 0 : i.includes(n),
      length: (i) => (i == null ? void 0 : i.length) || 0,
      substring: (i, n, s) => i == null ? void 0 : i.substring(n, s),
      toUpperCase: Ym.toUpperCaseNoAccent,
      // Math
      modulo: (i, n) => i % n,
      divint: oe.divint,
      divup: oe.divup,
      sum: (i, n) => i + n,
      diff: (i, n) => i - n,
      times: (i, n) => i * n,
      min: (i, n) => Math.min(i, n),
      max: (i, n) => Math.max(i, n),
      // Utility blocks
      for: Xo.hbsForLoop,
      // fixes “Missing helper: for”
      range: (i, n) => Array.from({ length: n - i + 1 }, (s, r) => i + r),
      ifGte: (i, n, s) => i >= n ? s.fn(this) : s.inverse(this),
      // Damage / weapons (legacy-compatible)
      weaponDamageLetter: Vm.letter,
      weaponDamageCode: xt.damageCode,
      weaponDamageValue: xt.damageValue,
      weaponArmorMode: xt.armorMode,
      weaponRangeList: xt.getRangeList,
      // Icons
      iconFA: J.fontAwesome,
      iconSrc: J.iconSystemPath,
      iconPath: J.iconPath,
      iconD6: J.iconD6,
      // Enums
      localizeAttribute: Me.localizeAttribute
    };
    e.registerHelper(t), e !== Handlebars && Handlebars.registerHelper(t);
  }
  static hbsForLoop(e, t, i) {
    let n = "";
    for (let s = e; s < t; ++s) n += i.fn(s);
    return n;
  }
}
const Yl = "sheetTheme", Ur = "mwd-theme-default", Og = "mwd-theme-sra", _g = [
  { name: "Default (CSB)", cssClass: Ur },
  { name: "SRA", cssClass: Og }
];
class Lg {
  constructor() {
    this.availableStyles = {}, Zi.register(Mt.REGISTER_STYLES), Hooks.once(Mt.REGISTER_STYLES, (e) => _g.forEach((t) => e(t.cssClass, t.name))), Hooks.once("ready", () => this.onReady());
  }
  async onReady() {
    Hooks.callAll(Mt.REGISTER_STYLES, (e, t) => this.availableStyles[e] = t), console.log(Ce + "Loaded styles", this.availableStyles), game.settings.register(T, Yl, {
      scope: "world",
      name: "Sheet Theme",
      hint: "Select the visual theme used by MWD sheets.",
      config: !0,
      default: Ur,
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
    const e = game.settings.get(T, Yl);
    return this.availableStyles[e] ? e : Ur;
  }
}
const xg = /* @__PURE__ */ new Set([A.actorTypes.vehicle, A.actorTypes.battlemech]), $g = Object.freeze({
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
function Bg(a) {
  const e = Math.trunc(Number(a ?? 0));
  return Number.isFinite(e) ? Math.min(18, Math.max(3, e)) : 10;
}
function Rd(a = null) {
  return String((a == null ? void 0 : a.type) ?? a ?? "").trim();
}
function zg(a = null) {
  var t, i;
  const e = ((i = (t = a == null ? void 0 : a.system) == null ? void 0 : t.mwd) == null ? void 0 : i.locations) ?? {};
  return Object.entries(e).filter(([, n]) => (n == null ? void 0 : n.enabled) !== !1).map(([n]) => n);
}
function ve(a, e = [], t = "core") {
  const i = new Set(zg(a));
  return e.find((n) => i.has(n)) ?? e[0] ?? t;
}
function Fg(a = "") {
  return a === "head" ? "head" : a.includes("Arm") ? "arms" : a.includes("Leg") ? "legs" : ["front", "side", "rear", "rotor"].includes(a) ? "motive" : a === "turret" ? "weapon" : a.includes("torso") ? "torso" : "core";
}
function Ug(a, e) {
  return e <= 4 ? { locationKey: ve(a, ["core", "torsoFront"]), family: "critical" } : e === 5 ? { locationKey: ve(a, ["leftLeg", "rightLeg"]), family: "legs" } : e === 6 ? { locationKey: ve(a, ["rightLeg", "leftLeg"]), family: "legs" } : e === 7 ? { locationKey: ve(a, ["leftArm", "rightArm"]), family: "arms" } : e === 8 ? { locationKey: ve(a, ["rightArm", "leftArm"]), family: "arms" } : e <= 10 ? { locationKey: ve(a, ["torsoFront", "core"]), family: "torso" } : e === 11 ? { locationKey: ve(a, ["core", "torsoFront"]), family: "core" } : e <= 13 ? { locationKey: ve(a, ["torsoRear", "core"]), family: "torso" } : e === 14 ? { locationKey: ve(a, ["leftArm", "rightArm"]), family: "arms" } : e === 15 ? { locationKey: ve(a, ["rightArm", "leftArm"]), family: "arms" } : e === 16 ? { locationKey: ve(a, ["leftArm", "rightArm"]), family: "arms" } : e === 17 ? { locationKey: ve(a, ["leftLeg", "rightLeg"]), family: "legs" } : { locationKey: ve(a, ["head", "torsoFront", "core"]), family: "head" };
}
function Hg(a, e) {
  return e <= 4 ? { locationKey: ve(a, ["core", "front"]), family: "critical" } : e === 5 ? { locationKey: ve(a, ["front", "core"]), family: "motive" } : e <= 7 ? { locationKey: ve(a, ["side", "front"]), family: "motive" } : e === 8 ? { locationKey: ve(a, ["rear", "side"]), family: "motive" } : e === 9 ? { locationKey: ve(a, ["front", "core"]), family: "motive" } : e === 10 ? { locationKey: ve(a, ["core", "front"]), family: "core" } : e === 11 ? { locationKey: ve(a, ["turret", "core"]), family: "weapon" } : e === 12 ? { locationKey: ve(a, ["side", "front"]), family: "motive" } : e === 13 ? { locationKey: ve(a, ["rear", "side"]), family: "motive" } : e === 14 ? { locationKey: ve(a, ["front", "side"]), family: "motive" } : e === 15 ? { locationKey: ve(a, ["core", "rear"]), family: "core" } : e === 16 ? { locationKey: ve(a, ["turret", "core"]), family: "weapon" } : e === 17 ? { locationKey: ve(a, ["side", "front", "rotor"]), family: "motive" } : { locationKey: ve(a, ["core", "front"]), family: "core" };
}
function cs(a = "") {
  return $g[a] ?? (String(a ?? "").trim() || "Location");
}
function Fs(a = null) {
  return xg.has(Rd(a));
}
function Nd() {
  if (typeof Roll == "function")
    try {
      const a = new Roll("3d6"), e = a.evaluate({ async: !1 });
      return Number((e == null ? void 0 : e.total) ?? a.total ?? 10) || 10;
    } catch {
    }
  return Array.from({ length: 3 }, () => 1 + Math.floor(Math.random() * 6)).reduce((a, e) => a + e, 0);
}
function Id({
  actor: a = null,
  rollTotal: e = Nd(),
  armorBefore: t = 0,
  structureBefore: i = 0
} = {}) {
  const n = Rd(a), s = Bg(e), r = Math.max(0, Number(t ?? 0) || 0) <= 0, o = n === A.actorTypes.battlemech ? Ug(a, s) : Hg(a, s), l = s <= 4, c = r && s >= 16, u = l || c, d = !u && s >= 16, m = s === 18 && n === A.actorTypes.battlemech ? ve(a, ["torsoFront", "core"]) : o.locationKey, f = o.family || Fg(o.locationKey);
  return {
    rollTotal: s,
    actorType: n,
    locationKey: o.locationKey,
    locationLabel: cs(o.locationKey),
    locationFamily: f,
    isForcedCritical: l,
    isStructureCritical: c,
    isAutomaticCritical: u,
    chaosCriticalOption: d,
    chaosTargetLocationKey: m,
    chaosTargetLocationLabel: cs(m),
    descriptiveOnly: !u,
    pureStructureHit: r,
    armorBefore: Math.max(0, Number(t ?? 0) || 0),
    structureBefore: Math.max(0, Number(i ?? 0) || 0)
  };
}
const Hr = Object.freeze({
  none: Object.freeze({
    key: "none",
    label: "No Field Remedy",
    actionId: "machineCritNoFieldRemedy",
    actionLabel: "No Field Remedy",
    resource: "sa",
    cost: 0,
    category: "none",
    remediable: !1
  }),
  emergencyRepair: Object.freeze({
    key: "emergencyRepair",
    label: "Emergency Repair",
    actionId: "machineCritEmergencyRepair",
    actionLabel: "Emergency Repair",
    resource: "sa",
    cost: 2,
    category: "complex",
    remediable: !0
  }),
  systemReset: Object.freeze({
    key: "systemReset",
    label: "System Reset",
    actionId: "machineCritSystemReset",
    actionLabel: "System Reset",
    resource: "sa",
    cost: 1,
    category: "simple",
    remediable: !0
  }),
  coolantDump: Object.freeze({
    key: "coolantDump",
    label: "Coolant Dump",
    actionId: "machineCritCoolantDump",
    actionLabel: "Coolant Dump",
    resource: "sa",
    cost: 1,
    category: "simple",
    remediable: !0
  }),
  feedReset: Object.freeze({
    key: "feedReset",
    label: "Reload / Feed Reset",
    actionId: "machineCritFeedReset",
    actionLabel: "Reload / Feed Reset",
    resource: "sa",
    cost: 1,
    category: "simple",
    remediable: !0
  }),
  pilotRecovery: Object.freeze({
    key: "pilotRecovery",
    label: "Pilot Recovery",
    actionId: "machineCritPilotRecovery",
    actionLabel: "Pilot Recovery",
    resource: "sa",
    cost: 2,
    category: "complex",
    remediable: !0
  })
});
function Zo(a = "") {
  const e = String(a ?? "").trim();
  return Hr[e] ?? Hr.emergencyRepair;
}
function jg(a = "") {
  return Object.prototype.hasOwnProperty.call(Hr, String(a ?? "").trim());
}
const Dd = "machineCritical", Od = "machineCriticalTableGeneralUuid", Wg = "machineCriticalTableBattlemechUuid", Kg = "machineCriticalTableVehicleUuid", _d = "machineCriticalTableBattlemechHeadUuid", Ld = "machineCriticalTableBattlemechTorsoUuid", xd = "machineCriticalTableBattlemechArmsUuid", $d = "machineCriticalTableBattlemechLegsUuid", Bd = "machineCriticalTableVehicleBodyUuid", zd = "machineCriticalTableVehicleTurretUuid", Fd = "machineCriticalTableVehicleMobilityUuid", it = Object.freeze({
  general: "Compendium.mwd.critical-hit-tables.RollTable.MWDGeneralCrit01",
  battlemech: "Compendium.mwd.critical-hit-tables.RollTable.MWDMechTorsoCrit01",
  vehicle: "Compendium.mwd.critical-hit-tables.RollTable.MWDVehicleBodyCrit1",
  mechHead: "Compendium.mwd.critical-hit-tables.RollTable.MWDMechHeadCrit01",
  mechTorso: "Compendium.mwd.critical-hit-tables.RollTable.MWDMechTorsoCrit01",
  mechArms: "Compendium.mwd.critical-hit-tables.RollTable.MWDMechArmsCrit01",
  mechLegs: "Compendium.mwd.critical-hit-tables.RollTable.MWDMechLegsCrit01",
  vehicleBody: "Compendium.mwd.critical-hit-tables.RollTable.MWDVehicleBodyCrit1",
  vehicleTurret: "Compendium.mwd.critical-hit-tables.RollTable.MWDVehicleTurretCrit",
  vehicleMobility: "Compendium.mwd.critical-hit-tables.RollTable.MWDVehicleMobility"
}), Gg = /* @__PURE__ */ new Set(["physical", "fatigue", ""]), jr = Object.freeze({
  2: Object.freeze({ key: "catastrophicCascade", remedyKey: "none", gates: [], mods: [], resourceEffects: {}, pilotDamage: {}, escalationKey: "cascade" }),
  3: Object.freeze({ key: "hardLock", remedyKey: "emergencyRepair", gates: [], mods: [], resourceEffects: {}, pilotDamage: {}, escalationKey: "lockout" }),
  4: Object.freeze({ key: "powerSurge", remedyKey: "coolantDump", gates: [], mods: [], resourceEffects: {}, pilotDamage: {}, escalationKey: "surge" }),
  5: Object.freeze({ key: "feedFlowDisruption", remedyKey: "feedReset", gates: [], mods: [], resourceEffects: {}, pilotDamage: {}, escalationKey: "feed" }),
  6: Object.freeze({ key: "controlFault", remedyKey: "systemReset", gates: [], mods: [], resourceEffects: {}, pilotDamage: {}, escalationKey: "control" }),
  7: Object.freeze({ key: "systemDesync", remedyKey: "systemReset", gates: [], mods: [], resourceEffects: {}, pilotDamage: {}, escalationKey: "desync" }),
  8: Object.freeze({ key: "structuralShock", remedyKey: "emergencyRepair", gates: [], mods: [], resourceEffects: {}, pilotDamage: {}, escalationKey: "shock" }),
  9: Object.freeze({ key: "overload", remedyKey: "coolantDump", gates: [], mods: [], resourceEffects: {}, pilotDamage: {}, escalationKey: "overload" }),
  10: Object.freeze({ key: "degradationSpike", remedyKey: "emergencyRepair", gates: [], mods: [], resourceEffects: {}, pilotDamage: {}, escalationKey: "degradation" }),
  11: Object.freeze({ key: "partialOutage", remedyKey: "emergencyRepair", gates: [], mods: [], resourceEffects: {}, pilotDamage: {}, escalationKey: "outage" }),
  12: Object.freeze({ key: "criticalBreach", remedyKey: "none", gates: [], mods: [], resourceEffects: {}, pilotDamage: {}, escalationKey: "conditionAdvance" })
}), Ql = Object.freeze({
  battlemech: Object.freeze({
    head: Object.freeze({
      2: x("cockpitShock", "Cockpit Shock", "none", ["sensor"], ["sensorBlind"], {}, { track: "physical", amount: 3 }, "cascade"),
      3: x("targetingProcessorLock", "Targeting Processor Lock", "systemReset", ["attack"], [], {}, { track: "physical", amount: 2 }, "lockout"),
      4: x("neuralFeedback", "Neural Feedback", "systemReset", [], [], {}, { track: "fatigue", amount: 2 }, "surge"),
      5: x("opticsCoolantFog", "Optics Coolant Fog / View Obstruction", "systemReset", ["attack"], ["rangeLimitClose"], {}, {}, "feed"),
      6: x("commandInputDelay", "Command Input Delay", "systemReset", [], [], { nextActivationSaPenalty: 1 }, { track: "fatigue", amount: 2 }, "control"),
      7: x("fireControlDesyncHead", "Fire-Control Desync", "systemReset", ["attack"], ["noCqBonus"], {}, {}, "desync"),
      8: x("cockpitImpact", "Cockpit Impact", "pilotRecovery", ["piloting"], ["stabilityCheck"], {}, { track: "physical", amount: 2 }, "shock"),
      9: x("sensorOverload", "Sensor Overload", "systemReset", ["sensor"], ["sensorLockPenalty"], {}, { track: "fatigue", amount: 2 }, "overload"),
      10: x("opticsFracture", "Optics Fracture", "emergencyRepair", ["attack"], ["visibilitySevere"], {}, {}, "degradation"),
      11: x("commsSensorSuiteOut", "Communications / Sensor Suite Out", "systemReset", ["sensor"], [], {}, {}, "outage"),
      12: x("headCriticalBreach", "Head condition +1", "none", [], [], {}, { track: "physical", amount: 2 }, "conditionAdvance")
    }),
    torso: Object.freeze({
      2: x("reactorGyroCascade", "Reactor / Gyro Cascade", "none", ["piloting"], ["stabilityCheck"], {}, { track: "fatigue", amount: 3 }, "cascade"),
      3: x("gyroLock", "Gyro Lock", "emergencyRepair", ["move", "jump"], ["pilotingPenalty"], {}, {}, "lockout"),
      4: x("reactorUnstable", "Reactor Unstable", "coolantDump", ["energyWeapon"], [], { heatPerEnergyAttack: 1 }, { track: "fatigue", amount: 2 }, "heat"),
      5: x("coolantPowerRoutingFault", "Coolant / Power Routing Fault", "emergencyRepair", ["weaponGroup"], [], {}, {}, "feed"),
      6: x("coreResponseDelay", "Core Response Delay", "systemReset", [], [], { nextActivationSaPenalty: 1 }, { track: "fatigue", amount: 2 }, "control"),
      7: x("targetingMovementSyncFault", "Targeting / Movement Sync Fault", "systemReset", ["attack", "move"], ["noMovementFireAdvantage"], {}, {}, "desync"),
      8: x("internalShock", "Internal Shock", "emergencyRepair", ["piloting"], ["stabilityCheck"], {}, { track: "physical", amount: 2, condition: "failedFallImpact" }, "shock"),
      9: x("heatSinkSaturation", "Heat Sink Saturation", "coolantDump", ["attack"], [], { heatPerAttack: 1 }, {}, "heat"),
      10: x("gyroDrift", "Gyro Drift", "emergencyRepair", ["move"], ["highMobilityBlocked"], {}, {}, "degradation"),
      11: x("powerBusOutage", "Power Bus Outage", "emergencyRepair", ["subsystem"], [], {}, {}, "outage"),
      12: x("torsoCriticalBreach", "Torso condition +1", "none", [], [], {}, {}, "conditionAdvance")
    }),
    arms: Object.freeze({
      2: x("weaponMountCascade", "Weapon Mount Cascade", "emergencyRepair", ["attack"], [], {}, {}, "cascade"),
      3: x("actuatorLockArm", "Actuator Lock", "emergencyRepair", ["attack"], [], {}, {}, "lockout"),
      4: x("weaponFeedback", "Weapon Feedback", "emergencyRepair", ["attack"], [], { nextArmAttackHeat: 1 }, {}, "surge"),
      5: x("ammoFeedFaultArm", "Ammo / Feed Fault", "feedReset", ["attack"], [], {}, {}, "feed"),
      6: x("fineActuationError", "Fine Actuation Error", "emergencyRepair", ["attack"], ["aimBlocked"], {}, {}, "control"),
      7: x("targetingMisalignmentArm", "Targeting Misalignment", "systemReset", ["attack"], ["noCqBonus"], {}, {}, "desync"),
      8: x("recoilShock", "Recoil Shock", "emergencyRepair", ["attack"], ["nextArmAttackBlocked"], {}, {}, "shock"),
      9: x("servoStrainArm", "Servo Strain", "emergencyRepair", ["attack"], [], { heatOrStrainOnUse: 1 }, {}, "overload"),
      10: x("stabilizerDamageArm", "Stabilizer Damage", "emergencyRepair", ["attack"], ["armAttackSeverelyLimited"], {}, {}, "degradation"),
      11: x("localPowerLossArm", "Local Power Loss", "emergencyRepair", ["subsystem"], [], {}, {}, "outage"),
      12: x("armsCriticalBreach", "Arms condition +1", "none", [], [], {}, {}, "conditionAdvance")
    }),
    legs: Object.freeze({
      2: x("mobilityCascadeLegs", "Mobility Cascade", "emergencyRepair", ["move"], ["stabilityCheck"], {}, { track: "physical", amount: 2, condition: "resultingFallImpact" }, "cascade"),
      3: x("legActuatorLock", "Leg Actuator Lock", "emergencyRepair", ["move", "jump"], [], {}, {}, "lockout"),
      4: x("myomerSurge", "Myomer Surge", "coolantDump", ["move"], [], { heatOrStrainOnMove: 1 }, {}, "surge"),
      5: x("jumpJetMobilityFeedFault", "Jump Jet / Mobility Feed Fault", "emergencyRepair", ["move", "jump"], [], {}, {}, "feed"),
      6: x("gaitFault", "Gait Fault", "emergencyRepair", ["move"], ["repositionPenalty"], {}, {}, "control"),
      7: x("balanceTimingFault", "Balance Timing Fault", "systemReset", ["move"], ["noMobilityCqBonus"], {}, {}, "desync"),
      8: x("forcedStabilityTest", "Forced Stability Test", "emergencyRepair", ["move", "piloting"], ["stabilityCheck"], {}, { track: "physical", amount: 2, condition: "resultingFallImpact" }, "shock"),
      9: x("mobilityOverstress", "Mobility Overstress", "emergencyRepair", ["move"], [], { repeatedMoveCost: 1 }, {}, "overload"),
      10: x("legStabilizerDamage", "Leg Stabilizer Damage", "emergencyRepair", ["move"], ["advancedManeuverBlocked"], {}, {}, "degradation"),
      11: x("partialMobilityOutageLegs", "Partial Mobility Outage", "emergencyRepair", ["move"], [], {}, {}, "outage"),
      12: x("legsCriticalBreach", "Legs condition +1", "none", [], [], {}, {}, "conditionAdvance")
    })
  }),
  vehicle: Object.freeze({
    body: Object.freeze({
      2: x("internalSystemsCascade", "Internal Systems Cascade", "none", [], [], {}, { track: "physical", amount: 2, condition: "openToppedOrCatastrophic" }, "cascade"),
      3: x("coreSystemsLock", "Core Systems Lock", "systemReset", ["subsystem"], [], {}, {}, "lockout"),
      4: x("enginePowerSurge", "Engine / Power Surge", "coolantDump", [], [], {}, { track: "fatigue", amount: 2, condition: "crewApplicable" }, "surge"),
      5: x("fuelFeedDisruption", "Fuel / Feed Disruption", "emergencyRepair", ["subsystem"], [], {}, {}, "feed"),
      6: x("controlFaultBody", "Control Fault", "systemReset", ["move"], [], {}, {}, "control"),
      7: x("systemsDesyncBody", "Systems Desync", "systemReset", ["attack", "move"], [], {}, {}, "desync"),
      8: x("structuralShockBody", "Structural Shock", "emergencyRepair", ["piloting"], ["controlTest"], {}, { track: "physical", amount: 2, condition: "crashImpact" }, "shock"),
      9: x("overloadBody", "Overload", "coolantDump", [], [], {}, {}, "overload"),
      10: x("hullStressSpike", "Hull Stress Spike", "emergencyRepair", [], [], {}, {}, "degradation"),
      11: x("partialOutageBody", "Partial Outage", "emergencyRepair", ["subsystem"], [], {}, {}, "outage"),
      12: x("bodyCriticalBreach", "Body condition +1", "none", [], [], {}, {}, "conditionAdvance")
    }),
    turret: Object.freeze({
      2: x("turretWeaponCascade", "Turret Weapon Cascade", "emergencyRepair", ["attack"], [], {}, {}, "cascade"),
      3: x("traverseLock", "Traverse Lock", "emergencyRepair", ["attack"], [], {}, {}, "lockout"),
      4: x("fireControlSurgeTurret", "Fire-Control Surge", "systemReset", ["attack"], [], { heatOrStrainOnTurretAttack: 1 }, {}, "surge"),
      5: x("ammoFeedFaultTurret", "Ammo / Feed Fault", "feedReset", ["attack"], [], {}, {}, "feed"),
      6: x("controlFaultTurret", "Control Fault", "systemReset", ["attack"], [], { extraAttackCost: 1 }, {}, "control"),
      7: x("trackingDesyncTurret", "Tracking Desync", "systemReset", ["attack"], ["noCqBonus"], {}, {}, "desync"),
      8: x("mountShockTurret", "Mount Shock", "emergencyRepair", ["attack"], ["nextTurretAttackBlocked"], {}, {}, "shock"),
      9: x("overloadTurret", "Overload", "emergencyRepair", ["attack"], [], { turretAttackStress: 1 }, {}, "overload"),
      10: x("stabilizerDamageTurret", "Stabilizer Damage", "emergencyRepair", ["attack"], ["limitedArcFire"], {}, {}, "degradation"),
      11: x("turretSubsystemOutage", "Turret Subsystem Outage", "emergencyRepair", ["subsystem"], [], {}, {}, "outage"),
      12: x("turretCriticalBreach", "Turret condition +1", "none", [], [], {}, {}, "conditionAdvance")
    }),
    mobility: Object.freeze({
      2: x("mobilityCascadeVehicle", "Mobility Cascade", "emergencyRepair", ["move"], ["skidStallCrashRisk"], {}, {}, "cascade"),
      3: x("driveLock", "Drive / Track / Wheel Lock", "emergencyRepair", ["move"], [], {}, {}, "lockout"),
      4: x("powertrainSurge", "Powertrain Surge", "coolantDump", ["move"], [], { heatOrStrainOnMove: 1 }, {}, "surge"),
      5: x("transmissionRotorFeedFault", "Transmission / Rotor Feed Fault", "emergencyRepair", ["move"], [], {}, {}, "feed"),
      6: x("steeringFault", "Steering Fault", "emergencyRepair", ["move"], [], {}, {}, "control"),
      7: x("handlingDesync", "Handling Desync", "systemReset", ["move"], ["noMobilityCqBonus"], {}, {}, "desync"),
      8: x("chassisShock", "Chassis Shock", "emergencyRepair", ["move", "piloting"], ["controlTest"], {}, {}, "shock"),
      9: x("overloadMobility", "Overload", "emergencyRepair", ["move"], [], { repeatedMoveCost: 1 }, {}, "overload"),
      10: x("suspensionLiftDamage", "Suspension / Lift Damage", "emergencyRepair", ["move"], ["majorHandlingImpairment"], {}, {}, "degradation"),
      11: x("partialMobilityOutageVehicle", "Partial Mobility Outage", "emergencyRepair", ["move"], [], {}, {}, "outage"),
      12: x("mobilityCriticalBreach", "Mobility condition +1", "none", [], [], {}, {}, "conditionAdvance")
    })
  })
});
function Ud() {
  return typeof foundry < "u" && (foundry == null ? void 0 : foundry.utils);
}
function Us(a) {
  return Ud() && typeof foundry.utils.deepClone == "function" ? foundry.utils.deepClone(a) : JSON.parse(JSON.stringify(a ?? null));
}
function x(a, e, t, i = [], n = [], s = {}, r = {}, o = "") {
  return Object.freeze({
    label: e,
    signal: Object.freeze({
      key: a,
      remedyKey: t,
      gates: i,
      mods: n,
      resourceEffects: s,
      pilotDamage: r,
      escalationKey: o
    })
  });
}
function qg() {
  return Ud() && typeof foundry.utils.randomID == "function" ? foundry.utils.randomID() : Math.random().toString(36).slice(2, 18).padEnd(16, "0").slice(0, 16);
}
function Vg() {
  try {
    return (/* @__PURE__ */ new Date()).toISOString();
  } catch {
    return "";
  }
}
function Jl(a) {
  return Array.isArray(a) ? a : typeof a == "string" ? a.split(",").map((e) => e.trim()).filter(Boolean) : [];
}
function Xl(a) {
  return a && typeof a == "object" && !Array.isArray(a) ? a : {};
}
function Yg(a = {}) {
  var e, t, i, n, s, r, o, l;
  return ((t = (e = a == null ? void 0 : a.flags) == null ? void 0 : e.mwd) == null ? void 0 : t.crit) ?? ((s = (n = (i = a == null ? void 0 : a.document) == null ? void 0 : i.flags) == null ? void 0 : n.mwd) == null ? void 0 : s.crit) ?? ((l = (o = (r = a == null ? void 0 : a.data) == null ? void 0 : r.flags) == null ? void 0 : o.mwd) == null ? void 0 : l.crit) ?? a;
}
function Qg(a, e, t) {
  if (!t) return null;
  const i = new Error(a);
  throw i.validationErrors = e.length ? e : [a], i;
}
function Zl(a = 7) {
  const e = Math.min(12, Math.max(2, Math.trunc(Number(a ?? 7)) || 7));
  return Us(jr[e] ?? jr[7]);
}
function na(a = {}, { strict: e = !1 } = {}) {
  const t = Yg(a), i = [], n = String((t == null ? void 0 : t.key) ?? "").trim(), s = String((t == null ? void 0 : t.remedyKey) ?? "emergencyRepair").trim() || "emergencyRepair", r = Jl(t == null ? void 0 : t.gates).map((p) => String(p ?? "").trim()).filter(Boolean), o = Jl(t == null ? void 0 : t.mods).map((p) => String(p ?? "").trim()).filter(Boolean), l = Xl(t == null ? void 0 : t.resourceEffects), c = Xl(t == null ? void 0 : t.pilotDamage), u = String((t == null ? void 0 : t.escalationKey) ?? "").trim();
  n || i.push("Critical signal key cannot be blank."), jg(s) || i.push(`Unknown machine critical remedy "${s}".`);
  for (const [p, h] of Object.entries(l))
    Number.isFinite(Number(h)) || i.push(`Resource effect "${p}" must be numeric.`);
  const d = String((c == null ? void 0 : c.track) ?? "").trim(), m = Number((c == null ? void 0 : c.amount) ?? 0), f = String((c == null ? void 0 : c.condition) ?? "").trim();
  return Gg.has(d) || i.push(`Pilot damage track "${d}" is invalid.`), (!Number.isFinite(m) || m < 0) && i.push("Pilot damage amount must be non-negative."), i.length ? (Qg(i[0], i, e), null) : {
    key: n,
    remedyKey: s,
    gates: r,
    mods: o,
    resourceEffects: Object.fromEntries(
      Object.entries(l).map(([p, h]) => [String(p), Number(h)])
    ),
    pilotDamage: d || m || f ? {
      track: d || "fatigue",
      amount: Math.trunc(m),
      ...f ? { condition: f } : {}
    } : {},
    escalationKey: u
  };
}
function Hd(a, e = {}) {
  var i, n;
  return (Array.isArray((n = (i = a == null ? void 0 : a.system) == null ? void 0 : i.mwd) == null ? void 0 : n.crits) ? a.system.mwd.crits : []).filter((s) => s && s.active !== !1).filter((s) => !e.key || s.key === e.key).filter((s) => !e.locationKey || s.locationKey === e.locationKey).filter((s) => !e.locationFamily || s.locationFamily === e.locationFamily).filter((s) => !e.gate || Array.isArray(s.gates) && s.gates.includes(e.gate)).filter((s) => !e.mod || Array.isArray(s.mods) && s.mods.includes(e.mod));
}
function ec(a, e) {
  var s, r;
  const t = ((r = (s = a == null ? void 0 : a.system) == null ? void 0 : s.monitors) == null ? void 0 : r[e]) ?? {}, i = Math.max(0, Number(t.max ?? 0) || 0), n = Math.min(i, Math.max(0, Number(t.value ?? 0) || 0));
  return {
    max: i,
    value: n,
    remaining: Math.max(0, i - n)
  };
}
function Jg(a) {
  return (a == null ? void 0 : a.type) === A.actorTypes.vehicle || (a == null ? void 0 : a.type) === A.actorTypes.battlemech;
}
function Xg(a, e, t, i) {
  return {
    ...e != null && e.hitLocation && typeof e.hitLocation == "object" ? e.hitLocation : Id({
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
function jd(a = {}, e = !1) {
  return e && a.chaosTargetLocationKey ? {
    locationKey: a.chaosTargetLocationKey,
    locationFamily: a.locationFamily === "head" ? "torso" : a.locationFamily,
    locationLabel: a.chaosTargetLocationLabel ?? cs(a.chaosTargetLocationKey)
  } : {
    locationKey: a.locationKey,
    locationFamily: a.locationFamily,
    locationLabel: a.locationLabel ?? cs(a.locationKey)
  };
}
function Zg(a = {}, e = !1) {
  return !!(a.isAutomaticCritical || a.chaosCriticalOption && e);
}
function ey({
  actor: a = null,
  payload: e = {},
  hitLocation: t = null,
  chaosCriticalSelected: i = !1
} = {}) {
  if (!Jg(a)) return { ok: !1, reason: "Machine damage requires a vehicle or BattleMech actor." };
  const n = Math.max(0, Math.ceil(Number((e == null ? void 0 : e.damage) ?? (e == null ? void 0 : e.amount) ?? 0) || 0)), s = ec(a, A.monitors.armor), r = ec(a, A.monitors.structure), o = t ? { ...t, armorBefore: s.remaining, structureBefore: r.remaining, pureStructureHit: s.remaining <= 0 } : Xg(a, e, s.remaining, r.remaining), l = Math.min(n, a.type === A.actorTypes.vehicle && s.max <= 0 ? 0 : s.remaining), c = Math.min(r.remaining, Math.max(0, n - l)), u = Math.min(s.max, s.value + l), d = Math.min(r.max, r.value + c), m = Zg(o, i), f = jd(o, i), p = c > 0 || m;
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
function Xt(a, e = "") {
  var t, i;
  try {
    return ((i = (t = game == null ? void 0 : game.settings) == null ? void 0 : t.get) == null ? void 0 : i.call(t, T, a)) || e;
  } catch {
    return e;
  }
}
function ty(a = null) {
  return Xt(Od, it.general);
}
async function Wd(a = null, e = "") {
  const t = String(e || ty(a)).trim();
  if (!t || typeof fromUuid != "function") return null;
  try {
    return await fromUuid(t);
  } catch (i) {
    return console.warn("MWD | Unable to resolve machine critical table", t, i), null;
  }
}
function Kd(a = null, e = {}) {
  const t = String((e == null ? void 0 : e.locationFamily) ?? (e == null ? void 0 : e.locationKey) ?? "").trim();
  return (a == null ? void 0 : a.type) === A.actorTypes.battlemech ? t === "head" ? "head" : t === "arms" || t === "arm" || /arm/i.test(String((e == null ? void 0 : e.locationKey) ?? "")) ? "arms" : t === "legs" || t === "leg" || /leg/i.test(String((e == null ? void 0 : e.locationKey) ?? "")) ? "legs" : "torso" : t === "turret" || t === "weapon" || /turret|weapon/i.test(String((e == null ? void 0 : e.locationKey) ?? "")) ? "turret" : t === "mobility" || t === "motive" || /mobility|motive|drive|wheel|track/i.test(String((e == null ? void 0 : e.locationKey) ?? "")) ? "mobility" : "body";
}
function iy(a = null, e = {}) {
  const t = Kd(a, e);
  return (a == null ? void 0 : a.type) === A.actorTypes.battlemech ? t === "head" ? Xt(_d, it.mechHead) : t === "arms" ? Xt(xd, it.mechArms) : t === "legs" ? Xt($d, it.mechLegs) : Xt(Ld, it.mechTorso) || Xt(Wg, it.battlemech) : t === "turret" ? Xt(zd, it.vehicleTurret) : t === "mobility" ? Xt(Fd, it.vehicleMobility) : Xt(Bd, it.vehicleBody) || Xt(Kg, it.vehicle);
}
function ay(a = null, e = {}, t = 7) {
  var r, o, l, c;
  const i = (a == null ? void 0 : a.type) === A.actorTypes.vehicle ? "vehicle" : "battlemech", n = Kd(a, e), s = Math.min(12, Math.max(2, Math.trunc(Number(t ?? 7)) || 7));
  return Us(((o = (r = Ql[i]) == null ? void 0 : r[n]) == null ? void 0 : o[s]) ?? ((c = (l = Ql[i]) == null ? void 0 : l[n]) == null ? void 0 : c[7]));
}
function Pn(a = {}, e = {}) {
  const t = Number((a == null ? void 0 : a.rollTotal) ?? 0);
  if (Number.isFinite(t) && t >= 2 && t <= 12) return Math.trunc(t);
  const i = String((e == null ? void 0 : e.key) ?? "").trim();
  for (const [n, s] of Object.entries(jr))
    if (s.key === i) return Number(n);
  return i === "cascade" || (e == null ? void 0 : e.escalationKey) === "cascade" ? 2 : (e == null ? void 0 : e.escalationKey) === "conditionAdvance" ? 12 : 7;
}
function nr(a = {}, e = 0) {
  return e === 2 || (a == null ? void 0 : a.key) === "catastrophicCascade" || (a == null ? void 0 : a.key) === "cascade" || (a == null ? void 0 : a.escalationKey) === "cascade";
}
function ny(a, e) {
  var i;
  return Array.from((a == null ? void 0 : a.results) ?? ((i = a == null ? void 0 : a.results) == null ? void 0 : i.contents) ?? []).find((n) => {
    const s = Array.isArray(n == null ? void 0 : n.range) ? n.range : [], r = Number(s[0] ?? 0), o = Number(s[1] ?? s[0] ?? 0);
    return e >= r && e <= o;
  }) ?? null;
}
async function tc({ actor: a = null, hitLocation: e = {}, rollTotal: t = 7, tableUuid: i = "" } = {}) {
  const n = ay(a, e, t), s = String(i || iy(a, e)).trim();
  if (!n) return { error: "No location critical table is defined for this hit location." };
  if (!s || typeof fromUuid != "function")
    return {
      signal: na(n.signal, { strict: !0 }),
      label: n.label,
      tableUuid: s,
      resultId: "",
      rollTotal: t
    };
  const r = await Wd(a, s);
  if (!r) return { error: `Machine location critical table could not be resolved: ${s}` };
  const o = ny(r, t);
  if (!o) return { error: `Machine location critical table has no result for ${t}: ${s}` };
  const l = na(o, { strict: !0 });
  return {
    signal: l,
    label: String((o == null ? void 0 : o.text) ?? (o == null ? void 0 : o.name) ?? l.key).trim() || l.key,
    tableUuid: r.uuid ?? s,
    resultId: o.id ?? o._id ?? "",
    rollTotal: t
  };
}
async function ic({ actor: a = null, drawFn: e = null, tableUuid: t = "", recursiveCascade: i = !1 } = {}) {
  var l;
  if (typeof e == "function") {
    const c = await e({ actor: a, recursiveCascade: i }), u = na((c == null ? void 0 : c.signal) ?? c, { strict: !0 });
    return {
      signal: u,
      label: String((c == null ? void 0 : c.label) ?? u.key).trim() || u.key,
      tableUuid: String((c == null ? void 0 : c.tableUuid) ?? t ?? "").trim(),
      resultId: String((c == null ? void 0 : c.resultId) ?? "").trim(),
      rollTotal: Number((c == null ? void 0 : c.rollTotal) ?? 0) || null
    };
  }
  const n = await Wd(a, t);
  if (!(n != null && n.draw)) return { error: "Machine critical table is not configured." };
  const s = await n.draw({ displayChat: !1 }), r = Array.from((s == null ? void 0 : s.results) ?? [])[0] ?? null;
  if (!r) return { error: "Machine critical table returned no result." };
  const o = na(r, { strict: !0 });
  return {
    signal: o,
    label: String((r == null ? void 0 : r.text) ?? (r == null ? void 0 : r.name) ?? o.key).trim() || o.key,
    tableUuid: n.uuid ?? t,
    resultId: r.id ?? r._id ?? "",
    rollTotal: Number(((l = s == null ? void 0 : s.roll) == null ? void 0 : l.total) ?? 0) || null
  };
}
function sr({ actor: a, drawn: e, hitLocation: t, source: i = {}, cascade: n = !1 } = {}) {
  var l, c, u, d, m, f, p;
  const s = na((e == null ? void 0 : e.signal) ?? e, { strict: !0 }), r = Zo(s.remedyKey), o = jd(t, !1);
  return {
    id: qg(),
    key: s.key,
    label: String((e == null ? void 0 : e.label) ?? s.key).trim() || s.key,
    tableUuid: String((e == null ? void 0 : e.tableUuid) ?? "").trim(),
    resultId: String((e == null ? void 0 : e.resultId) ?? "").trim(),
    generalKey: String(((l = e == null ? void 0 : e.general) == null ? void 0 : l.key) ?? "").trim(),
    generalLabel: String(((c = e == null ? void 0 : e.general) == null ? void 0 : c.label) ?? "").trim(),
    generalRollTotal: Number(((u = e == null ? void 0 : e.general) == null ? void 0 : u.rollTotal) ?? (e == null ? void 0 : e.rollTotal) ?? 0) || null,
    generalTableUuid: String(((d = e == null ? void 0 : e.general) == null ? void 0 : d.tableUuid) ?? "").trim(),
    generalResultId: String(((m = e == null ? void 0 : e.general) == null ? void 0 : m.resultId) ?? "").trim(),
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
    createdRound: Number(((p = (f = globalThis.game) == null ? void 0 : f.combat) == null ? void 0 : p.round) ?? 0) || 0,
    createdAt: Vg(),
    source: Us(i ?? {}),
    actorType: (a == null ? void 0 : a.type) ?? ""
  };
}
async function sy({
  actor: a = null,
  hitLocation: e = {},
  source: t = {},
  drawFn: i = null,
  tableUuid: n = ""
} = {}) {
  try {
    const s = await ic({ actor: a, drawFn: i, tableUuid: n, recursiveCascade: !1 });
    if (s != null && s.error) return { ok: !1, reason: s.error, crits: [] };
    const r = na(s.signal, { strict: !0 }), o = Pn(s, r), l = await tc({ actor: a, hitLocation: e, rollTotal: o });
    if (l != null && l.error) return { ok: !1, reason: l.error, crits: [] };
    const c = {
      ...l,
      general: {
        key: r.key,
        label: String((s == null ? void 0 : s.label) ?? r.key).trim() || r.key,
        rollTotal: o,
        tableUuid: String((s == null ? void 0 : s.tableUuid) ?? "").trim(),
        resultId: String((s == null ? void 0 : s.resultId) ?? "").trim()
      }
    };
    if (!nr(r, o))
      return { ok: !0, crits: [sr({ actor: a, drawn: c, hitLocation: e, source: t })], cascade: !1 };
    const u = await ic({ actor: a, drawFn: i, tableUuid: n, recursiveCascade: !0 }), d = u != null && u.error ? Zl(12) : na(u.signal, { strict: !0 }), m = nr(d, Pn(u, d)) ? 12 : Pn(u, d), f = m === 12 && nr(d, Pn(u, d)) ? Zl(12) : d, p = await tc({ actor: a, hitLocation: e, rollTotal: m });
    if (p != null && p.error) return { ok: !1, reason: p.error, crits: [] };
    const h = {
      ...p,
      general: {
        key: f.key,
        label: String((u == null ? void 0 : u.label) ?? f.key).trim() || f.key,
        rollTotal: m,
        tableUuid: String((u == null ? void 0 : u.tableUuid) ?? "").trim(),
        resultId: String((u == null ? void 0 : u.resultId) ?? "").trim()
      }
    };
    return {
      ok: !0,
      cascade: !0,
      crits: [
        sr({ actor: a, drawn: c, hitLocation: e, source: t, cascade: !0 }),
        sr({ actor: a, drawn: h, hitLocation: e, source: t })
      ]
    };
  } catch (s) {
    return { ok: !1, reason: (s == null ? void 0 : s.message) ?? "Unable to draw machine critical.", crits: [] };
  }
}
function ry(a, e) {
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
async function oy(a, e) {
  if (!(!(a != null && a.toggleStatusEffect) || !e))
    try {
      await Ns({
        actor: a,
        statusId: Dd,
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
async function ly({
  actor: a = null,
  token: e = null,
  payload: t = {},
  options: i = {}
} = {}) {
  var c, u;
  const n = ey({
    actor: a,
    payload: t,
    chaosCriticalSelected: !!(t != null && t.chaosCriticalSelected)
  });
  if (!n.ok) return n;
  const s = !!i.dryRun;
  let r = { ok: !0, crits: [] };
  !s && n.critical.selected && (r = await sy({
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
  const o = Array.isArray((u = (c = a == null ? void 0 : a.system) == null ? void 0 : c.mwd) == null ? void 0 : u.crits) ? Us(a.system.mwd.crits) : [], l = r.ok && r.crits.length ? o.concat(r.crits) : o;
  if (!s) {
    const d = {
      "system.monitors.armor.value": n.machine.armorDamageAfter,
      "system.monitors.structure.value": n.machine.structureDamageAfter,
      ...ry(a, n)
    };
    r.ok && r.crits.length && (d["system.mwd.crits"] = l), await a.update(d), await oy(a, l.some((m) => (m == null ? void 0 : m.active) !== !1));
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
function ac(a) {
  const e = Number(a ?? 0);
  return Number.isFinite(e) ? Math.trunc(e) : 0;
}
function Ga(a) {
  return a === A.monitors.physical ? "Physical" : a === A.monitors.fatigue ? "Fatigue" : String(a ?? "").trim() || "Track";
}
function cy({
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
function en(a) {
  return a ? (a == null ? void 0 : a.document) ?? a : null;
}
function rr(a, e) {
  var i, n, s;
  if (!a) return null;
  const t = en(e) ?? en(a == null ? void 0 : a.token);
  return t ? t.isLinked ? t.baseActor ?? ((s = (i = game.actors) == null ? void 0 : i.get) == null ? void 0 : s.call(i, ((n = t == null ? void 0 : t.baseActor) == null ? void 0 : n.id) ?? "")) ?? t.actor ?? a : t.actor ?? a : a;
}
function Rn(a, e) {
  var t, i, n;
  return Math.max(0, Number(((n = (i = (t = a == null ? void 0 : a.system) == null ? void 0 : t.monitors) == null ? void 0 : i[e]) == null ? void 0 : n.value) ?? 0) || 0);
}
function nc(a) {
  var e, t;
  return Math.max(0, Number(((t = (e = a == null ? void 0 : a.system) == null ? void 0 : e.burn) == null ? void 0 : t.value) ?? 0) || 0);
}
function uy(a) {
  return (a == null ? void 0 : a.type) === A.actorTypes.character || (a == null ? void 0 : a.type) === A.actorTypes.npc;
}
function dy(a) {
  return (a == null ? void 0 : a.type) === A.actorTypes.vehicle || (a == null ? void 0 : a.type) === A.actorTypes.battlemech;
}
function my(a) {
  return [
    A.actorTypes.character,
    A.actorTypes.npc,
    A.actorTypes.vehicle,
    A.actorTypes.battlemech
  ].includes(a == null ? void 0 : a.type);
}
function fy(a, e) {
  const t = String(a ?? "").trim();
  return t === "status" ? my(e) : t === "machineAttackDamage" ? dy(e) : uy(e);
}
function py(a, e) {
  var t;
  return ((t = zo(e).find((i) => i.id === a)) == null ? void 0 : t.label) ?? a;
}
function hy(a) {
  var i, n, s, r;
  const e = foundry.utils.escapeHTML, t = [];
  if (a.mode === "machineAttackDamage") {
    const o = a.appliedDelta >= 0 ? "Applied" : "Recovered";
    t.push(`<div><b>${o}:</b> ${Number(a.damageIncoming ?? a.requestedDelta ?? 0)} machine damage</div>`), (i = a.hitLocation) != null && i.locationLabel && t.push(`<div><b>Location:</b> ${e(a.hitLocation.locationLabel)} (${Number(a.hitLocation.rollTotal ?? 0)})</div>`), a.machine && (t.push(`<div><b>Armor:</b> ${Number(a.machine.armorBefore ?? 0)} -> ${Number(a.machine.armorAfter ?? 0)}</div>`), t.push(`<div><b>Structure:</b> ${Number(a.machine.structureBefore ?? 0)} -> ${Number(a.machine.structureAfter ?? 0)}</div>`)), (s = (n = a.critical) == null ? void 0 : n.records) != null && s.length ? t.push(`<div><b>Critical:</b> ${e(a.critical.records.map((l) => l.label).join(", "))}</div>`) : (r = a.critical) != null && r.reason && t.push(`<div><b>Critical:</b> ${e(a.critical.reason)}</div>`);
  }
  if (a.mode === "attackDamage" || a.mode === "trackDelta") {
    const o = a.appliedDelta >= 0 ? "Applied" : "Recovered", l = Math.abs(Number(a.appliedDelta ?? 0)), c = l === 1 ? "point" : "points", u = a.usedArmor ? ` via armor-aware ${e(Vt(a.damageType))}` : "";
    t.push(`<div><b>${o}:</b> ${l} ${c} to ${e(Ga(a.track))}${u}</div>`), a.usedArmor && a.mitigation && (t.push(
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
function gy(a) {
  var t, i;
  const e = (i = (t = game.settings) == null ? void 0 : t.get) == null ? void 0 : i.call(t, "core", "rollMode");
  return typeof ChatMessage.applyRollMode == "function" && ChatMessage.applyRollMode(a, e), a;
}
class Pt {
  static supportsActor(e, { mode: t = "" } = {}) {
    return fy(t, e);
  }
  static getActorOptions({ mode: e = "" } = {}) {
    return Array.from(game.actors ?? []).filter((t) => this.supportsActor(t, { mode: e })).sort((t, i) => String(t.name ?? "").localeCompare(String(i.name ?? ""))).map((t) => ({
      id: t.id,
      name: t.name || "Character"
    }));
  }
  static getStatusOptions(e = null) {
    return zo(e).map((t) => ({
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
      const r = en(t[0]), o = rr((r == null ? void 0 : r.actor) ?? null, r);
      return this._resolveSceneTargetResult(o, r, { mode: e });
    }
    const i = Array.from(((s = game.user) == null ? void 0 : s.targets) ?? []);
    if (i.length > 1)
      return { actor: null, token: null, reason: "Target only one token." };
    if (i.length === 1) {
      const r = en(i[0]), o = rr((r == null ? void 0 : r.actor) ?? null, r);
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
    const r = en(t);
    if (r) {
      const u = rr((r == null ? void 0 : r.actor) ?? e, r), d = this._resolveSceneTargetResult(u, r, { mode: s });
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
      const u = hy(l), d = gy({
        speaker: ChatMessage.getSpeaker({ actor: r.actor, token: r.token }),
        content: u
      });
      await ChatMessage.create(d);
    }
    return n.dryRun || (c = B.renderOpenCharacterSheets) == null || c.call(B, r.actor.id), l;
  }
  static async _applyTrackDelta(e, t, i = {}) {
    const n = (t == null ? void 0 : t.track) === A.monitors.fatigue ? A.monitors.fatigue : A.monitors.physical, s = ac((t == null ? void 0 : t.delta) ?? (t == null ? void 0 : t.amount) ?? 0);
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
    const o = Rn(e, n);
    i.dryRun || await j.addCounter(e, n, s);
    const l = i.dryRun ? Math.max(0, o + s) : Rn(e, n);
    return {
      mode: "trackDelta",
      track: n,
      requestedDelta: s,
      appliedDelta: l - o,
      usedArmor: !1,
      beforeLabel: `${Ga(n)} ${o}`,
      afterLabel: `${Ga(n)} ${l}`,
      source: String((t == null ? void 0 : t.source) ?? "").trim(),
      notes: String((t == null ? void 0 : t.notes) ?? "").trim()
    };
  }
  static async _applyBurnDelta(e, t) {
    var l, c;
    const i = ac((t == null ? void 0 : t.delta) ?? (t == null ? void 0 : t.amount) ?? 0), n = nc(e), s = Math.max(0, n + i), r = { "system.burn.value": s };
    s === 0 && ((c = (l = e.system) == null ? void 0 : l.burn) != null && c.overloaded) && (r["system.burn.overloaded"] = !1), await e.update(r);
    const o = nc(e);
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
    const n = ia(e, i), s = !!(t != null && t.active);
    await Ns({
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
    const r = ia(e, i);
    return {
      mode: "status",
      statusId: i,
      statusLabel: py(i, e),
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
    return ly({ actor: e, token: t, payload: i, options: n });
  }
  static async _applyPersonalArmorAwareDamage(e, t, i = {}) {
    var z, G, Y, q, Q, L, U, V, Z;
    const n = !!i.dryRun, s = (t == null ? void 0 : t.track) === A.monitors.fatigue ? A.monitors.fatigue : A.monitors.physical, r = Math.max(0, Number((t == null ? void 0 : t.damage) ?? 0) || 0), o = Math.max(0, Number((t == null ? void 0 : t.netHits) ?? 0) || 0), l = (t == null ? void 0 : t.effects) ?? {}, c = ((z = e.getPersonalCombatLoadout) == null ? void 0 : z.call(e, { refresh: !0 })) ?? null, u = (c == null ? void 0 : c.activeArmor) ?? null, d = Math.max(0, Number((u == null ? void 0 : u.currentArmorRating) ?? ((G = u == null ? void 0 : u.durability) == null ? void 0 : G.current) ?? 0) || 0), m = qt(t == null ? void 0 : t.damageType, "concussive"), f = Rn(e, s);
    let p = r + o;
    const h = d > 0 ? Jf({
      damageIncoming: p,
      armorTags: (u == null ? void 0 : u.tags) ?? [],
      effects: l
    }) : { damageIncoming: p, applied: [] };
    p = h.damageIncoming;
    const g = Qf({
      currentArmorRating: d,
      mitigationByType: (u == null ? void 0 : u.mitigationByType) ?? {},
      damageType: m
    }), y = Math.max(
      0,
      (Number((t == null ? void 0 : t.ap) ?? 0) || 0) + (Number((l == null ? void 0 : l.ap) ?? 0) || 0)
    ), b = g.isDestroyed ? 0 : Math.max(0, g.baseMitigation + g.typeMitigationMod - y);
    let S = Math.max(0, Math.ceil(p - b));
    const w = {
      snapshot: ((Y = B.getSnapshot) == null ? void 0 : Y.call(B, e)) ?? null
    }, v = Lt({
      actor: e,
      phase: "onDamageResolved",
      facts: nd({
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
    n || await yi({ actor: e, mutations: v.mutations, runtime: w }), S = Math.max(0, Number(v.packet.amount ?? S) || 0), !n && S > 0 && await j.addCounter(e, s, S);
    const P = cy({
      incomingDamage: r + o,
      armorBefore: ((q = u == null ? void 0 : u.durability) == null ? void 0 : q.current) ?? 0,
      reinforcedBefore: ((L = (Q = u == null ? void 0 : u.traitState) == null ? void 0 : Q.reinforced) == null ? void 0 : L.current) ?? 0,
      reinforcedMax: ((V = (U = u == null ? void 0 : u.traitState) == null ? void 0 : U.reinforced) == null ? void 0 : V.max) ?? 0,
      hasArmorItem: !!((Z = u == null ? void 0 : u.item) != null && Z.id)
    });
    !n && Object.keys(P.update).length > 0 && await u.item.update(P.update);
    const E = n ? Math.max(0, f + S) : Rn(e, s);
    return {
      mode: (t == null ? void 0 : t.mode) ?? "attackDamage",
      track: s,
      requestedDelta: r + o,
      appliedDelta: E - f,
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
      beforeLabel: `${Ga(s)} ${f}`,
      afterLabel: `${Ga(s)} ${E}`,
      source: String((t == null ? void 0 : t.source) ?? "").trim(),
      notes: String((t == null ? void 0 : t.notes) ?? "").trim()
    };
  }
}
O(Pt, "MODE_OPTIONS", Object.freeze([
  { value: A.monitors.physical, label: "Physical" },
  { value: A.monitors.fatigue, label: "Fatigue" },
  { value: "burn", label: "Burn" },
  { value: "status", label: "Status" }
]));
const sc = ts, Wr = "damage-mode", yy = `${T}.${Wr}`, Nn = {}, or = {};
class he {
  static init() {
    Zi.register(Mt.PROVIDE_DAMAGE_MODE), Hooks.on("updateSetting", async (e, t, i, n) => he.onUpdateSetting(e, t, i, n)), Hooks.on(Mt.PROVIDE_DAMAGE_MODE, (e) => {
      e("resistanceArmorMonitor", k.settings.damageMode.values.resistanceArmorMonitor, he.sufferDamageResistanceArmorMonitor), e("armorResistanceMonitor", k.settings.damageMode.values.armorResistanceMonitor, he.sufferDamageArmorResistanceMonitor), e("armorGivesResistance", k.settings.damageMode.values.armorGivesResistance, he.sufferDamageArmorAsResistance_Earthdawn), e("armorGiveResistanceHitsAvoid", k.settings.damageMode.values.armorGiveResistanceHitsAvoid, he.sufferDamageArmorAsResistance_Cyberpunk);
    }), Hooks.once("ready", () => he.onReady());
  }
  static onReady() {
    he._registerDamageModeSetting(), he._selectDamageMode();
  }
  static _registerDamageModeSetting() {
    Hooks.callAll(Mt.PROVIDE_DAMAGE_MODE, (e, t, i) => {
      Nn[e] = t, or[e] = i;
    }), game.settings.register(T, Wr, {
      scope: "world",
      name: k.settings.damageMode.name,
      hint: k.settings.damageMode.hint,
      config: !0,
      default: Object.keys(Nn)[0],
      choices: Nn,
      type: String
    });
  }
  static async onUpdateSetting(e, t, i, n) {
    e.key == yy && he._selectDamageMode();
  }
  static _selectDamageMode() {
    let e = game.settings.get(T, Wr);
    or[e] || (e = Object.keys(Nn)[0]), he.damageModeCode = e, he.damageModeMethod = or[e];
  }
  static async sufferDamage(e, t, i, n, s, r, o) {
    const { monitor: l, damageType: c } = he._resolveDamageContext(e, t, o);
    if (ra.checkActorCanReceiveDamage(c ?? l, l, e), he._shouldUsePersonalDamageV2(e, l, o)) {
      await he.sufferPersonalDamageV2(e, l, c, i, n, s, r, o);
      return;
    }
    await (he.damageModeMethod ?? he.sufferDamageResistanceArmorMonitor)(e, l, c, i, n, s, r), await e.applyArmorDamage(l, c, fe.sumModifiers([o], "other", "damageArmor"));
  }
  static _shouldUsePersonalDamageV2(e, t, i) {
    var n, s;
    return !((n = e == null ? void 0 : e.isCharacterLike) != null && n.call(e)) || ![A.monitors.physical, A.monitors.fatigue].includes(t) ? !1 : !!((s = i == null ? void 0 : i.isPersonalWeapon) != null && s.call(i) || (i == null ? void 0 : i.canonicalType) === A.itemType.personalWeapon || (i == null ? void 0 : i.type) === A.itemType.personalWeapon);
  }
  static async sufferPersonalDamageV2(e, t, i, n, s, r, o, l) {
    var d;
    const c = ((d = l == null ? void 0 : l.getCombatProfile) == null ? void 0 : d.call(l)) ?? l ?? null, u = await Pt.apply({
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
    u != null && u.ok && he._notifyPersonalArmorMitigation(e, {
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
    const i = t.armorMitigation ?? {}, n = he._localizeDamageType(t.damageType), s = i.isDestroyed ? "Armor destroyed" : `Base ${Number(i.baseMitigation ?? 0)} + Type ${Number(i.typeMitigationMod ?? 0)} - AP ${Number(t.effectiveAp ?? 0)}`, r = Number(t.adjustedIncoming ?? t.baseIncoming ?? 0), o = Number(t.finalDamage ?? 0), l = (((u = t.tagEffectResult) == null ? void 0 : u.applied) ?? []).map((d) => `${d.tag} +${Math.round((Number(d.bonus ?? 0) || 0) * 100)}%`).join(", "), c = l ? ` [${l}]` : "";
    ui.notifications.info(
      `${e.name} mitigated ${n}: ${s}${c}. Incoming ${r}, final ${o}.`
    );
  }
  static async sufferDamageResistanceArmorMonitor(e, t, i, n, s, r, o) {
    const l = j.resistanceDetail(e, t, i), c = l.value;
    let u = 0;
    if (r) {
      const d = Math.min(c, n), m = Math.min(c - d, s);
      u = n - d, j.useArmor(t) && (u -= await he.damageToArmor(e, i, u)), u += s - m;
    } else
      u = n + s - c, j.useArmor(t) && (u -= await he.damageToArmor(e, i, u));
    u > 0 && await j.addCounter(e, t, u), he._notifyResistanceUsage(e, t, i, l);
  }
  static async sufferDamageArmorResistanceMonitor(e, t, i, n, s, r, o) {
    let l = 0;
    j.useArmor(t) ? r ? (n -= await he.damageToArmor(e, i, n), l = s + n) : (l = s + n, l -= await he.damageToArmor(e, i, l)) : l = n + s;
    const c = j.resistanceDetail(e, t, i);
    return l -= c.value, l > 0 && await j.addCounter(e, t, l), he._notifyResistanceUsage(e, t, i, c), l;
  }
  static async sufferDamageArmorAsResistance_Cyberpunk(e, t, i, n, s, r, o) {
    let l = n + s;
    if (j.useArmor(t) && l > 0) {
      const u = r ? s : 0, d = Math.max(0, he._computeArmorResistance(e) - u);
      d > 0 && (await j.addCounter(e, "armor", 1), l -= d);
    }
    const c = j.resistanceDetail(e, t, i);
    return l -= c.value, l > 0 && await j.addCounter(e, t, l), he._notifyResistanceUsage(e, t, i, c), Math.max(l, 0);
  }
  static async sufferDamageArmorAsResistance_Earthdawn(e, t, i, n, s, r, o) {
    let l = n + s;
    if (j.useArmor(t) && !r && l > 0) {
      const u = he._computeArmorResistance(e);
      u > 0 && (await j.addCounter(e, "armor", 1), l -= u);
    }
    l -= he._computeStrengthResistance(e, t);
    const c = j.resistanceDetail(e, t, i);
    return l -= c.value, l > 0 && await j.addCounter(e, t, l), he._notifyResistanceUsage(e, t, i, c), l;
  }
  static async damageToArmor(e, t, i) {
    if (i > 0) {
      const n = j.max(e, A.monitors.armor), s = j.getCounterValue(e, A.monitors.armor), r = Math.min(n - s, i), o = j.resistance(e, A.monitors.armor, t), l = Math.max(0, r - o);
      return l > 0 && await j.addCounter(e, A.monitors.armor, l), r;
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
    const s = k.actor.monitors[t] ?? t, r = he._localizeDamageType(i) ?? s, o = n.usedType ? "type" : "default", l = ((u = k.actor.monitors.resistanceSources) == null ? void 0 : u[o]) ?? o, c = Ne(k.actor.monitors.resistanceApplied, {
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
      return gu(e) ? Vt(e) : k.mwd.weaponDamageType[e] ?? k.mwd.personalDamageType[e] ?? k.actor.monitors[e] ?? e;
  }
  static _computeArmorResistance(e) {
    const t = j.max(e, "armor"), i = j.getCounterValue(e, "armor"), n = Math.max(0, t - i);
    return Math.max(0, Math.ceil(n / 3));
  }
  static _computeStrengthResistance(e, t) {
    const i = e.getAttributeValue(A.actorAttributes.strength);
    return Math.max(0, Math.floor(i / 4));
  }
}
class Ct extends Actor {
  static init() {
    Hooks.on("updateActor", (e, t, i, n) => {
      var s;
      return (s = Wt.firstResponsible(e)) == null ? void 0 : s.onUpdateActor(t, i);
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
      initiative: fe.sumModifiers(this.items, "other", "initiative")
    }, this.system.monitors) {
      const e = Me.getDamageTypes();
      Object.entries(this.system.monitors).forEach((t) => {
        t[1].resistance = Ct.normalizeResistance(t[1].resistance), t[1].maxBonus = fe.sumMonitorModifiers(this.items, t[0], "max"), t[1].resistanceBonus = fe.sumMonitorModifiers(this.items, t[0], "resistance"), t[1].resistanceBonusByType = Object.fromEntries(
          e.map((i) => [i.value, fe.sumMonitorModifiers(this.items, t[0], "resistanceByType", i.value)]).filter(([, i]) => i)
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
    return Ra[this.type] ?? [];
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
    return t == 0 ? 0 : Xc + oe.divup(t, 2);
  }
  getAttributeActions() {
    return xe.getActorActions(this);
  }
  getUsableAttributes(e = void 0) {
    const t = (e ? [e] : this.items).map((n) => n.getAttributes()).reduce((n, s) => n.concat(s), []), i = oe.distinct(this.getAttributes().concat(t));
    return i.sort(oe.ascendingBySortedArray(Me.sortedAttributeKeys)), i;
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
      i += fe.sumModifiers(this.items, "attribute", e);
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
        await he.damageToArmor(this, t, i);
    }
  }
  async rollAttribute(e) {
    await ai.rollAttribute(this, e);
  }
  async rollAttributeAction(e) {
    const t = xe.getActorAction(this, e);
    await ai.rollAttributeAction(this, t);
  }
  async rollSkill(e, t) {
    await ai.rollSkill(this, e, t);
  }
  async rollWeapon(e) {
    var s, r, o;
    ra.checkWeaponDefense(e, this);
    const t = (s = e.validateTargets(this)) == null ? void 0 : s.map((l) => l.id), i = {
      attackerTokenId: (o = (r = game.scenes.current) == null ? void 0 : r.tokens.find((l) => {
        var c;
        return ((c = l.actor) == null ? void 0 : c.id) == this.id;
      })) == null ? void 0 : o.id,
      targetedTokenIds: t
    }, n = this.items.find((l) => e.isWeaponSkill(l));
    await ai.rollWeapon(this, n, e, i);
  }
  async rollDefense(e) {
    const t = e.attack.defense, i = xe.getActorDefense(this, t);
    await ai.rollDefense(this, i, e);
  }
  async switchMonitorCheck(e, t, i, n = void 0) {
    await j.switchMonitorCheck(this, e, t, i, n);
  }
  async addCounter(e, t, i = void 0) {
    await j.addCounter(this, e, t, i);
  }
  async setCounter(e, t, i = void 0) {
    await j.setCounter(this, e, t, i);
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
    const e = fe.sumModifiers(this.items, "other", "sceneAnarchy");
    e > 0 && await j.setCounter(this, A.monitors.sceneAnarchy, e);
  }
  async onLeaveCombat() {
    await j.setCounter(this, A.monitors.sceneAnarchy, 0);
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
    t != 0 && await j.addCounter(this, e, -t);
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
    const i = Ct._prepareFavorite(e, t);
    return !!this.system.favorites.find((n) => Ct._isSameFavorite(i, n));
  }
  static _prepareFavorite(e, t) {
    return { type: e, id: t };
  }
  static _isSameFavorite(e, t) {
    return e.id == t.id && e.type == t.type;
  }
  async switchFavorite(e, t, i) {
    const n = Ct._prepareFavorite(t, i), s = this.system.favorites.filter((r) => !Ct._isSameFavorite(n, r));
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
    const i = Ct._prepareFavorite(e, t);
    if (e == "attributeAction") {
      const s = xe.prepareShortcut(this, t);
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
const { ApplicationV2: by, HandlebarsApplicationMixin: Sy } = foundry.applications.api, { renderTemplate: rc } = foundry.applications.handlebars, Ay = `${X}/chat/celebrity-roll.hbs`, wa = class wa extends Sy(by) {
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
        fe.computeModifiers(e.items, "other", "celebrity")
      ),
      other: {
        label: k.common.roll.modifiers.other,
        value: 0
      },
      ANARCHY: k
    }, i = await rc(`${X}/dialog/roll-celebrite-title.hbs`, t), n = {
      id: `roll-celebrity-${foundry.utils.randomID()}`,
      classes: [game.system.anarchy.styles.selectCssClass(), ...wa.DEFAULT_OPTIONS.classes],
      window: { title: i }
    };
    return new wa({ roll: t }, n).render({ force: !0 });
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
      await wa.doRoll(this.roll), await this.close();
    }), i.find('[data-action="cancel"]').on("click", async () => {
      await this.close();
    });
  }
  static async doRoll(e) {
    const t = [
      e.celebrity,
      e.modifiers,
      e.other
    ], i = oe.sumValues(t, (o) => o.value), n = {
      actor: e.actor,
      parameters: t,
      pool: i,
      options: {
        classes: [game.system.anarchy.styles.selectCssClass()]
      },
      ANARCHY: k
    }, s = new Roll(`${i}d6cs>=5`);
    await s.evaluate();
    const r = await rc(Ay, n);
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
O(wa, "PARTS", {
  body: {
    template: `${X}/dialog/roll-celebrite.hbs`
  }
});
let Kr = wa;
const { renderTemplate: Ty } = foundry.applications.handlebars, wy = `${X}/chat/actor-say-word.hbs`;
class oc extends Ct {
  static get initiative() {
    return Ct.initiative + " + max(@attributes.reflexes.value, @attributes.intelligence.value)";
  }
  hasOwnAnarchy() {
    return this.hasPlayerOwner;
  }
  prepareDerivedData() {
    !this.system.monitors.fatigue && this.system.monitors.stun && (this.system.monitors.fatigue = foundry.utils.duplicate(this.system.monitors.stun)), this.system.monitors.physical.max = this._getMonitorMax(A.actorAttributes.strength), this.system.monitors.fatigue.max = this._getMonitorMax(A.actorAttributes.willpower), super.prepareDerivedData(), this.system.ignoreWounds = fe.sumModifiers(this.items, "other", "ignoreWounds");
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
    return Ra[this.type] ?? Ra[A.actorTypes.character];
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
      content: await Ty(
        wy,
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
    oe.reindexIds(i), await this.update({ [`system.${e}`]: i });
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
      ra.checkSufficient(k.actor.counters.anarchy, e, i + t);
      const n = Math.min(t, e), s = e - n;
      n > 0 && j.addCounter(this, A.monitors.sceneAnarchy, -n), this.hasPlayerOwner ? (await game.system.anarchy.gmAnarchy.actorGivesAnarchyToGM(this, e), j.addCounter(this, A.monitors.anarchy, -s)) : s > 0 && super.spendAnarchy(s);
    }
  }
  canUseEdge() {
    return !0;
  }
  getWounds() {
    const e = oe.divint(this.system.monitors.fatigue.value, 3) + oe.divint(this.system.monitors.physical.value, 3);
    return Math.max(0, e - this.system.ignoreWounds);
  }
  async rollCelebrity() {
    await Kr.create(this);
  }
}
function ky(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function vy(a = {}) {
  return !a || typeof a != "object" || Array.isArray(a) ? {} : Object.fromEntries(
    Object.entries(a).map(([e, t]) => [String(e ?? "").trim(), ky(t, 0)]).filter(([e, t]) => e && t !== 0)
  );
}
function lc(a = {}) {
  return {
    default: 0,
    byType: vy(a == null ? void 0 : a.byType)
  };
}
function My() {
  return foundry.data.operators.ForcedDeletion;
}
class Gd extends Ct {
  prepareDerivedData() {
    this._prepareMwdAttributes(), this._prepareMwdMonitors(), this._prepareMwdItems(), super.prepareDerivedData();
  }
  static get defaultIcon() {
    return `${bs}/default/Default_Vehicle.svg`;
  }
  static get initiative() {
    return Ct.initiative + " + max(@attributes.system.value, @attributes.handling.value)";
  }
  computePhysicalState() {
    return {
      max: this.system.monitors.structure.max,
      value: this.system.monitors.structure.max - this.system.monitors.structure.value
    };
  }
  getAttributes() {
    return Ra[this.type] ?? Ra[A.actorTypes.vehicle];
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
      "system.handling": My(),
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
    var r, o, l, c, u, d, m, f, p, h;
    const e = this.system.mwd = this.system.mwd ?? {}, t = this.system.monitors = this.system.monitors ?? {}, i = this.type === A.actorTypes.battlemech ? 15 : 12, n = Math.max(0, Number(((r = t.armor) == null ? void 0 : r.max) ?? i));
    t.armor = foundry.utils.mergeObject(
      { value: 0, max: n, resistance: Ct.normalizeResistance((o = t.armor) == null ? void 0 : o.resistance) },
      t.armor ?? {},
      { inplace: !1, recursive: !0 }
    ), t.armor.resistance = lc(t.armor.resistance);
    const s = {
      value: ((l = t.structure) == null ? void 0 : l.value) ?? 0,
      max: ((c = t.structure) == null ? void 0 : c.max) ?? (this.type === A.actorTypes.battlemech ? 18 : 15),
      resistance: Ct.normalizeResistance((u = t.structure) == null ? void 0 : u.resistance)
    };
    if (t.structure = foundry.utils.mergeObject(
      foundry.utils.duplicate(s),
      t.structure ?? {},
      { inplace: !1, recursive: !0 }
    ), t.structure.resistance = lc(t.structure.resistance), e.monitors = e.monitors ?? {}, e.monitors.structure = foundry.utils.mergeObject(
      foundry.utils.duplicate(s),
      e.monitors.structure ?? {},
      { inplace: !1, recursive: !0 }
    ), this.type === A.actorTypes.battlemech) {
      const g = {
        value: ((d = t.heat) == null ? void 0 : d.value) ?? ((m = e.heat) == null ? void 0 : m.current) ?? 0,
        max: ((f = t.heat) == null ? void 0 : f.max) ?? ((p = e.heat) == null ? void 0 : p.hardMax) ?? 4,
        resistance: Ct.normalizeResistance((h = t.heat) == null ? void 0 : h.resistance)
      };
      t.heat = foundry.utils.mergeObject(
        foundry.utils.duplicate(g),
        t.heat ?? {},
        { inplace: !1, recursive: !0 }
      ), e.monitors.heat = foundry.utils.mergeObject(
        foundry.utils.duplicate(g),
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
const cc = {
  light: 4,
  medium: 5,
  heavy: 6,
  assault: 7
}, Cy = { mode: "normal", allowedWeaponIds: [], typeRestriction: "" }, Ey = {
  baseProfile: { name: "Unarmed", damage: "", notes: "" },
  maxWeapons: 0,
  allowedLocations: []
};
class Py {
  constructor(e) {
    this.actor = e, this.mwd = e.system.mwd ?? {};
  }
  compute() {
    const e = this.mwd.weightClass ?? "medium", t = cc[e] ?? cc.medium, i = this._normalizeHardpoints(), n = this._normalizeWeaponGroups(), s = n.find((y) => y.isPrimary), r = n.filter((y) => y.isPrimary), o = this._primarySlot(), l = [], c = [];
    r.length > 1 && l.push(k.mwd.loadout.errors.multiplePrimary);
    const u = s ? t - 1 : t, d = n.length + (s ? 1 : 0);
    n.length > u && l.push(Ne(k.mwd.loadout.errors.mountPointsExceeded, {
      used: d,
      total: t
    }));
    const m = this._getWeapons((y) => (y.system.weaponCategory ?? "ranged") !== "melee"), f = new Map(m.map((y) => [y.id, y])), p = /* @__PURE__ */ new Set(), h = i.map((y) => ({ ...y, occupiedBy: null, occupiedByName: void 0 }));
    for (const y of n)
      for (const b of y.weaponIds ?? []) {
        const S = f.get(b);
        if (!S) {
          c.push(Ne(k.mwd.loadout.warnings.weaponMissing, { weapon: b }));
          continue;
        }
        const w = S.system.hardpointType ?? "energy", v = S.system.hardpointSize ?? "small";
        if (p.has(b)) {
          l.push(Ne(k.mwd.loadout.errors.weaponAlreadyGrouped, { weapon: S.name }));
          continue;
        }
        if (p.add(b), y.isPrimary && this._validatePrimaryWeapon(S, w, v, o, l), (S.system.weaponCategory ?? "ranged") === "melee")
          continue;
        const P = h.find((E) => !E.occupiedBy && E.type === w && E.size === v);
        P ? (P.occupiedBy = y.id, P.occupiedByName = y.name) : l.push(Ne(k.mwd.loadout.errors.hardpointUnavailable, {
          weapon: S.name,
          type: k.mwd.hardpointType[w] ?? w,
          size: k.mwd.hardpointSize[v] ?? v
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
      name: e.name || Ne(k.common.newName, { type: k.itemType.singular.weapon }),
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
    const e = foundry.utils.mergeObject(foundry.utils.duplicate(Cy), this.mwd.primarySlot ?? {});
    return e.allowedWeaponIds = this._asArray(e.allowedWeaponIds), e;
  }
  _computeMeleeState(e) {
    var o, l, c;
    const t = foundry.utils.mergeObject(foundry.utils.duplicate(Ey), this.mwd.melee ?? {}), i = this._getWeapons((u) => (u.system.weaponCategory ?? "ranged") === "melee"), n = [], s = Number(t.maxWeapons ?? 0);
    i.length > s && e.push(Ne(k.mwd.loadout.errors.meleeLimitExceeded, {
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
      r.length > 0 && u.system.mountLocation && !r.includes(u.system.mountLocation) && e.push(Ne(k.mwd.loadout.errors.meleeLocationRestricted, {
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
    n.mode === "converted" ? (((r = n.allowedWeaponIds) == null ? void 0 : r.length) > 0 && !n.allowedWeaponIds.includes(e.id) && s.push(Ne(k.mwd.loadout.errors.primaryNotAllowedWeapon, { weapon: e.name })), n.typeRestriction && t !== n.typeRestriction && s.push(Ne(k.mwd.loadout.errors.primaryTypeRestriction, {
      weapon: e.name,
      type: k.mwd.hardpointType[n.typeRestriction] ?? n.typeRestriction
    }))) : i !== "large" && s.push(Ne(k.mwd.loadout.errors.primaryNeedsLarge, { weapon: e.name }));
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
const uc = Object.freeze({
  safe: "Safe",
  hot: "Hot",
  overheat: "Overheat",
  danger: "Danger",
  runningHot: "Hot",
  overheated: "Overheat",
  shutdown: "Danger"
});
function qa(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function us(a = {}, e = 0) {
  const t = Math.max(0, qa(e, 0)), i = Math.max(0, qa(a.hot ?? a.runningHot, 2)), n = Math.max(0, qa(a.overheat ?? a.overheated, 3)), s = Math.max(0, qa(a.danger ?? a.shutdown, t || 4));
  return {
    hot: i,
    overheat: n,
    danger: s,
    runningHot: i,
    overheated: n,
    shutdown: s
  };
}
function Gr(a = 0, e = {}, t = 0) {
  const i = Math.max(0, qa(a, 0)), n = us(e, t);
  return i >= n.danger ? "danger" : i >= n.overheat ? "overheat" : i >= n.hot ? "hot" : "safe";
}
function qr(a = "safe") {
  return uc[String(a ?? "").trim()] ?? uc.safe;
}
class Ry extends Gd {
  static get defaultIcon() {
    return `${bs}/vehicles/apc.svg`;
  }
  prepareDerivedData() {
    var e;
    super.prepareDerivedData(), this.system.mwd = this.system.mwd ?? {}, this.system.mwd.chassis = this.system.mwd.chassis ?? "", this.system.mwd.tonnage = this.system.mwd.tonnage ?? 0, this.system.mwd.loadout = new Py(this).compute(), this.system.mwd.weaponGroupDetails = this._prepareConfiguredWeaponGroups(), this.system.mwd.heat = this._prepareHeatTrack(), this.system.mwd.primaryGroupName = ((e = this.system.mwd.weaponGroupDetails.find((t) => t.isPrimary)) == null ? void 0 : e.name) ?? "", this.system.skills = this._prepareSkillMap(), this.system.weaponGroups = this._prepareWeaponGroups(), this.system.meleeProfiles = this._prepareMeleeProfiles(), this.system.quickActions = {
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
    s.current = t.value ?? s.current, s.max = t.max ?? s.max, s.thresholds = us(
      foundry.utils.mergeObject(n.thresholds, i.thresholds ?? {}, { inplace: !1 }),
      s.max
    );
    const r = this._resolveHeatStatus(s.current, s.thresholds, s.max);
    return this.system.mwd.heatStatus = {
      code: r,
      label: k.actor.battlemech.heat.status[r] ?? qr(r)
    }, s;
  }
  _resolveHeatStatus(e, t, i) {
    return Gr(e, t, i);
  }
  _prepareConfiguredWeaponGroups() {
    var i;
    const e = ((i = this.system.mwd) == null ? void 0 : i.weaponGroups) ?? [], t = new Map(this.items.map((n) => [n.id, n]));
    return e.map((n, s) => {
      const r = Array.isArray(n.weaponIds) ? n.weaponIds : n.weaponIds ? [n.weaponIds] : [], o = r.map((c) => t.get(c)).filter((c) => (c == null ? void 0 : c.type) === A.itemType.mechWeapon), l = r.filter((c) => !t.has(c));
      return {
        id: n.id ?? `group-${s + 1}`,
        index: s,
        name: n.name || Ne(k.common.newName, { type: k.itemType.singular.weapon }),
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
    const i = Bt(e);
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
    const i = ((s = e == null ? void 0 : e.system) == null ? void 0 : s.attribute) ?? this.getPhysicalAgility(), n = foundry.utils.mergeObject(ai.prepareActorRoll(this), {
      mode: ft.rollType.skill,
      skill: e,
      attribute1: i,
      specialization: void 0
    });
    t.quickAction && (n.quickAction = t.quickAction), await ai.create(n);
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
const Wn = "activeModifiers", el = [
  { value: "", label: "All Attributes" },
  { value: "reflexes", label: "Reflexes" },
  { value: "strength", label: "Strength" },
  { value: "willpower", label: "Willpower" },
  { value: "charisma", label: "Charisma" },
  { value: "intelligence", label: "Intelligence" },
  { value: "edge", label: "Edge" }
], tl = [
  { value: "", label: "All Intents" },
  { value: "skill", label: "Skill" },
  { value: "attack", label: "Attack" },
  { value: "defense", label: "Defense" },
  { value: "common", label: "Common" },
  { value: "attribute", label: "Attribute" },
  { value: "edge", label: "Edge" },
  { value: "initiative", label: "Initiative" }
];
function dc(a) {
  const e = String(a ?? "").trim();
  return e === "" ? null : e;
}
function Ny(a) {
  return String((a == null ? void 0 : a.intent) ?? "").trim() || null;
}
function Iy(a) {
  var e, t, i;
  return ((e = a == null ? void 0 : a.data) == null ? void 0 : e.attrKey) ?? // skill rolls
  ((i = (t = a == null ? void 0 : a.attack) == null ? void 0 : t.skill) == null ? void 0 : i.attribute) ?? // attack rolls
  null;
}
function mc(a, e) {
  return a ? e ? a === e : !1 : !0;
}
function qd(a) {
  return {
    id: String((a == null ? void 0 : a.id) ?? ""),
    label: String((a == null ? void 0 : a.label) ?? "").trim(),
    value: Math.trunc(Number((a == null ? void 0 : a.value) ?? 0)) || 0,
    enabled: (a == null ? void 0 : a.enabled) !== !1,
    attributeFilter: dc(a == null ? void 0 : a.attributeFilter),
    intentFilter: dc(a == null ? void 0 : a.intentFilter),
    source: (a == null ? void 0 : a.source) === "preset" ? "preset" : "adhoc"
  };
}
class Dy {
  constructor() {
    O(this, "id", "mwd.sceneModifiers");
  }
  collect({ resolved: e } = {}) {
    var r;
    const t = (r = canvas == null ? void 0 : canvas.scene) == null ? void 0 : r.getFlag("mwd", Wn);
    if (!Array.isArray(t) || !t.length) return [];
    const i = Ny(e), n = Iy(e), s = [];
    for (const o of t) {
      const l = qd(o);
      l.enabled && mc(l.intentFilter, i) && mc(l.attributeFilter, n) && s.push({
        id: l.id || `scene:${l.label}`,
        label: l.label,
        value: l.value,
        source: "Scene"
      });
    }
    return s;
  }
}
const Oy = `systems/${T}/templates/settings/collection-editor.hbs`, Vd = /* @__PURE__ */ new Map(), lr = /* @__PURE__ */ new Map();
function It(a = []) {
  const e = Array.isArray(a) ? a.filter(Boolean) : [String(a ?? "").trim()].filter(Boolean), t = new Error(e[0] ?? "Invalid settings data.");
  return t.validationErrors = e, t;
}
function $a(a) {
  Ly(a), Vd.set(a.id, a), game.settings.register(T, a.settingKey, {
    scope: "world",
    config: !1,
    type: a.settingType ?? Object,
    default: a.defaultData()
  }), game.settings.registerMenu(T, a.menuKey, {
    name: a.menu.name,
    label: a.menu.label,
    hint: a.menu.hint,
    icon: a.menu.icon,
    type: xy(a.id),
    restricted: a.menu.restricted ?? !0
  });
}
function _y(a) {
  return Vd.get(a) ?? null;
}
function Ly(a) {
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
function xy(a) {
  if (lr.has(a))
    return lr.get(a);
  class e extends Yd {
  }
  return O(e, "definitionId", a), lr.set(a, e), e;
}
var te, Qd, Vr, Kn, Gn, ha, Yr, Va, Jd, Xd, gt;
class Yd extends FormApplication {
  constructor(t = {}, i = {}) {
    super(t, i);
    we(this, te);
    const n = C(this, te, Gn).call(this);
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
      template: Oy,
      width: 880,
      height: 760,
      resizable: !0,
      submitOnChange: !1,
      closeOnSubmit: !1
    }, { inplace: !1 });
  }
  get definition() {
    const t = _y(this.constructor.definitionId);
    if (!t)
      throw new Error(`Missing settings collection definition: ${this.constructor.definitionId}`);
    return t;
  }
  get title() {
    var t;
    return this.definition.title ?? ((t = this.definition.menu) == null ? void 0 : t.name) ?? "Settings Editor";
  }
  getData(t = {}) {
    const i = C(this, te, Xd).call(this), n = this.editorState.rows.map((s, r, o) => ({
      index: r,
      fields: i.map((l) => C(this, te, Jd).call(this, l, s, r)),
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
        o && C(this, te, Qd).call(this, o, s, r);
      });
    });
  }
  async _onSubmit(t, { updateData: i = null, preventClose: n = !0, preventRender: s = !0 } = {}) {
    return super._onSubmit(t, { updateData: i, preventClose: n, preventRender: s });
  }
  async _updateObject(t, i) {
    var n;
    C(this, te, gt).call(this, []);
    try {
      const s = this.editorState.tab === "bulk" ? this.definition.parseBulk(C(this, te, Va).call(this)) : this.definition.rowsToValue(C(this, te, Yr).call(this));
      await game.settings.set(T, this.definition.settingKey, s);
      const r = C(this, te, Gn).call(this);
      C(this, te, Kn).call(this, r), await this.close();
    } catch (s) {
      C(this, te, gt).call(this, In(s)), this.editorState.errors.length && ((n = ui.notifications) == null || n.error(this.editorState.errors[0])), this.render(!1);
    }
  }
}
te = new WeakSet(), Qd = async function(t, i, n) {
  var s, r, o, l, c, u, d, m;
  switch (i.preventDefault(), i.stopPropagation(), t) {
    case "switchRows":
      C(this, te, Va).call(this), this.editorState.tab = "rows", C(this, te, gt).call(this, []), this.render(!1);
      return;
    case "switchBulk":
      C(this, te, ha).call(this);
      try {
        const f = this.definition.rowsToValue(this.editorState.rows);
        this.editorState.bulkText = this.definition.serializeBulk(f), this.editorState.tab = "bulk", C(this, te, gt).call(this, []);
      } catch (f) {
        C(this, te, gt).call(this, In(f)), this.editorState.errors.length && ((s = ui.notifications) == null || s.warn(this.editorState.errors[0]));
      }
      this.render(!1);
      return;
    case "addRow":
      C(this, te, ha).call(this), this.editorState.rows.push(((o = (r = this.definition).createEmptyRow) == null ? void 0 : o.call(r)) ?? {}), C(this, te, gt).call(this, []), this.render(!1);
      return;
    case "removeRow":
      C(this, te, ha).call(this), this.editorState.rows.splice(Number(((l = n == null ? void 0 : n.dataset) == null ? void 0 : l.index) ?? -1), 1), C(this, te, gt).call(this, []), this.render(!1);
      return;
    case "moveRowUp":
      C(this, te, ha).call(this), C(this, te, Vr).call(this, Number(((c = n == null ? void 0 : n.dataset) == null ? void 0 : c.index) ?? -1), -1), C(this, te, gt).call(this, []), this.render(!1);
      return;
    case "moveRowDown":
      C(this, te, ha).call(this), C(this, te, Vr).call(this, Number(((u = n == null ? void 0 : n.dataset) == null ? void 0 : u.index) ?? -1), 1), C(this, te, gt).call(this, []), this.render(!1);
      return;
    case "loadBulk":
      try {
        const f = this.definition.parseBulk(C(this, te, Va).call(this));
        this.editorState.rows = this.definition.toRows(f), this.editorState.bulkText = this.definition.serializeBulk(f), this.editorState.tab = "rows", C(this, te, gt).call(this, []);
      } catch (f) {
        C(this, te, gt).call(this, In(f)), this.editorState.errors.length && ((d = ui.notifications) == null || d.warn(this.editorState.errors[0]));
      }
      this.render(!1);
      return;
    case "formatBulk":
      try {
        const f = this.definition.parseBulk(C(this, te, Va).call(this));
        this.editorState.bulkText = this.definition.serializeBulk(f), C(this, te, gt).call(this, []);
      } catch (f) {
        C(this, te, gt).call(this, In(f)), this.editorState.errors.length && ((m = ui.notifications) == null || m.warn(this.editorState.errors[0]));
      }
      this.render(!1);
      return;
    case "resetSetting":
      C(this, te, Kn).call(this, C(this, te, Gn).call(this)), this.render(!1);
      return;
    case "restoreDefaults":
      C(this, te, Kn).call(this, this.definition.defaultData()), this.render(!1);
      return;
    case "cancel":
      await this.close();
      return;
    default:
      return;
  }
}, Vr = function(t, i) {
  if (!Number.isInteger(t)) return;
  const n = t + i;
  if (t < 0 || n < 0 || n >= this.editorState.rows.length) return;
  const s = [...this.editorState.rows], [r] = s.splice(t, 1);
  s.splice(n, 0, r), this.editorState.rows = s;
}, Kn = function(t) {
  this.editorState.rows = this.definition.toRows(t), this.editorState.bulkText = this.definition.serializeBulk(t), this.editorState.tab = "rows", C(this, te, gt).call(this, []);
}, Gn = function() {
  const t = game.settings.get(T, this.definition.settingKey);
  return foundry.utils.deepClone(t ?? this.definition.defaultData());
}, ha = function() {
  this.editorState.rows = C(this, te, Yr).call(this);
}, Yr = function() {
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
}, Va = function() {
  var n;
  const t = this.form, i = (n = t == null ? void 0 : t.querySelector) == null ? void 0 : n.call(t, 'textarea[name="bulkText"]');
  return i instanceof HTMLTextAreaElement && (this.editorState.bulkText = i.value), this.editorState.bulkText ?? "";
}, Jd = function(t, i, n) {
  const s = t.type ?? "text", r = String((i == null ? void 0 : i[t.key]) ?? t.default ?? ""), o = s === "select" ? $y(t).map((l) => ({
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
}, Xd = function() {
  return this.definition.rowSchema.map((t) => ({
    ...t,
    type: t.type ?? "text"
  }));
}, gt = function(t = []) {
  this.editorState.errors = Array.isArray(t) ? t.filter(Boolean) : [];
}, O(Yd, "definitionId", "");
function $y(a) {
  const e = typeof a.options == "function" ? a.options() : a.options;
  return Array.isArray(e) ? e : [];
}
function In(a) {
  const e = Array.isArray(a == null ? void 0 : a.validationErrors) ? a.validationErrors.filter(Boolean) : [String((a == null ? void 0 : a.message) ?? "Unable to save settings.").trim()].filter(Boolean);
  return e.length ? e : ["Unable to save settings."];
}
const Qr = "sceneModifierTemplates", By = "sceneModifierTemplateEditor", zy = Object.freeze([]);
function $i(a) {
  const e = String(a ?? "").trim();
  return e === "" ? "" : e;
}
function Zd(a = []) {
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
      attributeFilter: $i(n == null ? void 0 : n.attributeFilter),
      intentFilter: $i(n == null ? void 0 : n.intentFilter)
    });
  }), t.length) throw It(t);
  return e;
}
function Fy(a = []) {
  return (Array.isArray(a) ? a : []).map((e) => ({
    label: String((e == null ? void 0 : e.label) ?? ""),
    value: String((e == null ? void 0 : e.value) ?? "0"),
    attributeFilter: $i(e == null ? void 0 : e.attributeFilter),
    intentFilter: $i(e == null ? void 0 : e.intentFilter)
  }));
}
function Uy(a = "") {
  const e = String(a ?? "").trim();
  if (!e) return [];
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    throw It([
      `Bulk JSON must be valid JSON: ${i.message}`
    ]);
  }
  if (!Array.isArray(t))
    throw It(["Bulk JSON must be an array."]);
  return Zd(t.map((i) => ({
    label: String((i == null ? void 0 : i.label) ?? ""),
    value: String((i == null ? void 0 : i.value) ?? "0"),
    attributeFilter: $i(i == null ? void 0 : i.attributeFilter),
    intentFilter: $i(i == null ? void 0 : i.intentFilter)
  })));
}
function Hy(a = []) {
  return JSON.stringify(
    (Array.isArray(a) ? a : []).map((e) => ({
      label: String((e == null ? void 0 : e.label) ?? ""),
      value: Number((e == null ? void 0 : e.value) ?? 0),
      attributeFilter: $i(e == null ? void 0 : e.attributeFilter),
      intentFilter: $i(e == null ? void 0 : e.intentFilter)
    })),
    null,
    2
  );
}
const jy = {
  id: "scene-modifier-templates",
  menuKey: By,
  settingKey: Qr,
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
      options: el
    },
    {
      key: "intentFilter",
      label: "Intent Filter",
      type: "select",
      options: tl
    }
  ],
  menu: {
    name: "Scene Modifier Templates",
    label: "Configure",
    hint: "Edit the preset scene modifier templates available in the GM Gadget.",
    icon: "fas fa-cloud",
    restricted: !0
  },
  defaultData: () => foundry.utils.deepClone(zy),
  createEmptyRow: () => ({
    label: "",
    value: "0",
    attributeFilter: "",
    intentFilter: ""
  }),
  toRows: Fy,
  rowsToValue: Zd,
  parseBulk: Uy,
  serializeBulk: Hy
};
function Wy() {
  $a(jy);
}
const { ApplicationV2: Ky, HandlebarsApplicationMixin: Gy } = foundry.applications.api, qy = "mwd-gmgadget", em = "gmDnPresets", qn = "gmNextDn", Ya = "gmDnAnnounceToChat", Vy = Object.freeze([
  { label: "Standard", dn: 1 },
  { label: "Challenging", dn: 2 },
  { label: "Hard", dn: 3 },
  { label: "Extreme", dn: 4 }
]), Yy = "systems/mwd/templates/v2/mwd-gmgadget.hbs", Qa = Object.freeze({
  actorId: "",
  mode: "physical",
  delta: 1,
  useArmor: !1,
  damageType: "concussive",
  statusId: "",
  statusActive: !0,
  source: "",
  notes: ""
}), Qy = Object.freeze({
  label: "Hazard Zone",
  startExposure: ne.minor,
  escalationRate: 1,
  escalationIntervalTurns: 1,
  escalationMax: ne.full,
  onFullBurnDelta: 0,
  clearOnExit: !0,
  damage: 6,
  ap: 0,
  damageType: "thermal",
  color: "#d86a2c"
});
function Jy(a = "") {
  return String(a ?? "").split(",").map((e) => e.trim()).filter(Boolean).map((e) => {
    const [t, i] = e.split(":").map((r) => (r ?? "").trim()), n = t || "DN", s = Number.isFinite(Number(i)) ? Number(i) : Number(t);
    return {
      label: n,
      dn: Number.isFinite(s) ? Math.max(0, Math.trunc(s)) : null
    };
  }).filter((e) => Number.isFinite(e.dn));
}
function Xy(a = []) {
  const e = new Error(a[0] ?? "Invalid GM DN presets.");
  return e.validationErrors = Array.isArray(a) ? a.filter(Boolean) : [], e;
}
function Zy() {
  return foundry.utils.deepClone(Vy);
}
function Tn(a, { strict: e = !1 } = {}) {
  const t = typeof a == "string" ? Jy(a) : Array.isArray(a) ? a : [], i = [], n = [], s = /* @__PURE__ */ new Set();
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
  }), e && n.length) throw Xy(n);
  return i;
}
function cr(a = {}) {
  return foundry.utils.mergeObject(
    foundry.utils.deepClone(Qa),
    a ?? {},
    { inplace: !1, overwrite: !0 }
  );
}
function ur(a = {}) {
  return foundry.utils.mergeObject(
    foundry.utils.deepClone(Qy),
    a ?? {},
    { inplace: !1, overwrite: !0 }
  );
}
function tm(a = null) {
  const e = (a == null ? void 0 : a.document) ?? a ?? null, t = Array.from((e == null ? void 0 : e.shapes) ?? []);
  if (t.length !== 1) return t.length > 1 ? "multiple" : "";
  const i = t[0], n = typeof (i == null ? void 0 : i.toObject) == "function" ? i.toObject() : i && typeof i == "object" ? i : null;
  return String((n == null ? void 0 : n.type) ?? "").trim().toLowerCase();
}
function fc(a = null) {
  return !!tm(a);
}
function pc() {
  var i, n;
  const a = Array.from(((i = canvas == null ? void 0 : canvas.regions) == null ? void 0 : i.controlled) ?? []).map((s) => (s == null ? void 0 : s.document) ?? s ?? null).find(fc);
  if (a) return a;
  const e = ((n = canvas == null ? void 0 : canvas.regions) == null ? void 0 : n.hover) ?? null, t = (e == null ? void 0 : e.document) ?? e ?? null;
  return fc(t) ? t : null;
}
function eb(a = null) {
  var o, l;
  const e = (a == null ? void 0 : a.document) ?? a ?? null;
  if (!e)
    return {
      label: "No region selected",
      reason: "Select a Region created in Measured Template Mode on the current scene to turn it into a hazard.",
      supported: !1
    };
  const t = tm(e), i = lu(e);
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
function tb(a) {
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
function ib(a) {
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
function ab(a) {
  return Pt.getStatusOptions(a);
}
function nb(a = "mwd") {
  game.settings.register(a, qn, {
    scope: "client",
    config: !1,
    type: Number,
    default: 1
  }), game.settings.register(a, Ya, {
    scope: "client",
    config: !0,
    name: "Announce GM DN changes to chat",
    hint: "If enabled, posts a small chat notice when you change the current DN preset.",
    type: Boolean,
    default: !1
  });
}
const Xe = class Xe extends Gy(Ky) {
  constructor({ systemId: e = "mwd", ...t } = {}) {
    super(t), this.systemId = e, this.activeTab = "difficulty", this.harmState = cr(), this.hazardState = ur();
  }
  async render(e = {}) {
    var t;
    return (t = game.user) != null && t.isGM ? super.render(e) : this;
  }
  async _prepareContext(e) {
    var y, b, S, w;
    const t = await super._prepareContext(e), i = Tn(
      game.settings.get(this.systemId, em),
      { strict: !1 }
    ), n = Number(game.settings.get(this.systemId, qn) ?? 1), s = !!game.settings.get(this.systemId, Ya), r = cr(this.harmState), o = Pt.getActorOptions({ mode: r.mode }), l = Pt.getSceneTarget({ mode: r.mode }), c = this.harmState.actorId ? ((b = (y = game.actors) == null ? void 0 : y.get) == null ? void 0 : b.call(y, this.harmState.actorId)) ?? null : null, u = Pt.resolveTarget({
      actor: c,
      actorId: this.harmState.actorId,
      preferSceneTarget: !0,
      mode: r.mode
    }), d = ab(u.actor ?? c ?? null);
    d.length && !d.some((v) => v.value === r.statusId) && (r.statusId = d[0].value, this.harmState.statusId = r.statusId);
    const m = hc(
      game.settings.get(this.systemId, Qr)
    ), f = gc(
      (S = canvas == null ? void 0 : canvas.scene) == null ? void 0 : S.getFlag("mwd", Wn)
    ), p = pc(), h = eb(p), g = ur(this.hazardState);
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
        attributeFilterOptions: el,
        intentFilterOptions: tl
      },
      harm: {
        state: r,
        actorOptions: o,
        modes: Pt.MODE_OPTIONS,
        damageTypes: sc,
        statusOptions: d,
        sceneTarget: tb(l),
        effectiveTarget: ib(u),
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
          { value: ne.minor, label: "Minor" },
          { value: ne.major, label: "Major" },
          { value: ne.full, label: "Full" }
        ],
        damageTypes: sc,
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
    return this.harmState = cr({
      actorId: i('[name="harm-actorId"]', this.harmState.actorId),
      mode: i('[name="harm-mode"]', this.harmState.mode),
      delta: Number(i('[name="harm-delta"]', this.harmState.delta)),
      useArmor: n('[name="harm-useArmor"]', this.harmState.useArmor),
      damageType: i('[name="harm-damageType"]', this.harmState.damageType),
      statusId: i('[name="harm-statusId"]', this.harmState.statusId),
      statusActive: i('[name="harm-statusActive"]', this.harmState.statusActive ? "add" : "remove") !== "remove",
      source: i('[name="harm-source"]', this.harmState.source),
      notes: i('[name="harm-notes"]', this.harmState.notes)
    }), Number.isFinite(Number(this.harmState.delta)) || (this.harmState.delta = Qa.delta), this.harmState;
  }
  async _onSetDn(e, t) {
    var s, r, o;
    if (e.preventDefault(), e.stopPropagation(), !((s = game.user) != null && s.isGM)) return;
    const i = Math.max(0, Math.trunc(Number(((r = t == null ? void 0 : t.dataset) == null ? void 0 : r.dn) ?? NaN)));
    if (!Number.isFinite(i)) return;
    if (await game.settings.set(this.systemId, qn, i), !!game.settings.get(this.systemId, Ya)) {
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
      return await game.settings.set(this.systemId, qn, 1), this.render({ parts: ["body"] });
  }
  async _onToggleAnnounce(e, t) {
    var n;
    if (e.preventDefault(), e.stopPropagation(), !((n = game.user) != null && n.isGM)) return;
    const i = !game.settings.get(this.systemId, Ya);
    return await game.settings.set(this.systemId, Ya, i), this.render({ parts: ["body"] });
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
    const s = await Pt.apply({
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
    return this.hazardState = ur({
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
    const i = this._captureHazardStateFromDom(t), n = pc(), s = lu(n);
    if (!(canvas != null && canvas.scene) || !s) {
      (m = ui.notifications) == null || m.warn("Select a supported Region in Measured Template Mode before creating a hazard.");
      return;
    }
    const r = Po({
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
    }), o = Ts(s);
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
          [Qi]: {
            sourceActorUuid: null,
            sourceItemUuid: null,
            payloadId: "gm-hazard",
            templateGeometry: si(s),
            damage: Math.max(0, Number(i.damage ?? 0) || 0),
            ap: Math.max(0, Number(i.ap ?? 0) || 0),
            damageType: String(i.damageType ?? "thermal").trim() || "thermal",
            label: `${String(i.label ?? "Hazard Zone").trim() || "Hazard Zone"} (${$t(r.startExposure)})`,
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
      delta: yc(e == null ? void 0 : e.delta, Qa.delta),
      source: t,
      notes: i
    } : n === "physical" || n === "fatigue" ? {
      mode: "trackDelta",
      track: n,
      delta: yc(e == null ? void 0 : e.delta, Qa.delta),
      useArmor: !!(e != null && e.useArmor),
      damageType: (e == null ? void 0 : e.damageType) ?? Qa.damageType,
      source: t,
      notes: i
    } : null;
  }
  // ---- Scene modifier actions ----
  async _onAddSceneModifierFromPreset(e, t) {
    var l, c, u, d;
    if ((l = e == null ? void 0 : e.preventDefault) == null || l.call(e), (c = e == null ? void 0 : e.stopPropagation) == null || c.call(e), !((u = game.user) != null && u.isGM)) return;
    const i = ((d = t == null ? void 0 : t.closest) == null ? void 0 : d.call(t, ".mwd-gmgadget__root")) ?? this._getRootElement(), n = i instanceof HTMLElement ? i.querySelector('select[name="scene-preset-index"]') : null, s = n instanceof HTMLSelectElement ? Number(n.value) : NaN, r = hc(
      game.settings.get(this.systemId, Qr)
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
    const i = gc(t.getFlag("mwd", Wn)), n = await e(i);
    return await t.setFlag("mwd", Wn, n), this.render({ parts: ["body"] });
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
O(Xe, "DEFAULT_OPTIONS", {
  id: qy,
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
    switchTab: Xe.prototype._onSwitchTab,
    setDn: Xe.prototype._onSetDn,
    clearDn: Xe.prototype._onClearDn,
    toggleAnnounce: Xe.prototype._onToggleAnnounce,
    harmInputChange: Xe.prototype._onHarmInputChange,
    refreshHarmTarget: Xe.prototype._onRefreshHarmTarget,
    applyHarm: Xe.prototype._onApplyHarm,
    hazardInputChange: Xe.prototype._onHazardInputChange,
    refreshHazardTemplate: Xe.prototype._onRefreshHazardTemplate,
    createHazard: Xe.prototype._onCreateHazard,
    addSceneModifierFromPreset: Xe.prototype._onAddSceneModifierFromPreset,
    addSceneModifierAdhoc: Xe.prototype._onAddSceneModifierAdhoc,
    toggleSceneModifier: Xe.prototype._onToggleSceneModifier,
    removeSceneModifier: Xe.prototype._onRemoveSceneModifier,
    clearSceneModifiers: Xe.prototype._onClearSceneModifiers
  }
}), O(Xe, "PARTS", {
  body: { template: Yy }
});
let Jr = Xe;
function hc(a) {
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
function gc(a) {
  return Array.isArray(a) ? a.map((e) => {
    var s, r;
    const t = qd(e), i = ((s = el.find((o) => o.value === (t.attributeFilter ?? ""))) == null ? void 0 : s.label) ?? null, n = ((r = tl.find((o) => o.value === (t.intentFilter ?? ""))) == null ? void 0 : r.label) ?? null;
    return {
      ...t,
      attributeFilterLabel: t.attributeFilter ? i : null,
      intentFilterLabel: t.intentFilter ? n : null,
      signedValue: t.value >= 0 ? `+${t.value}` : String(t.value),
      isPositive: t.value > 0
    };
  }) : [];
}
function yc(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? Math.trunc(t) : e;
}
let dr = null;
function sb({ systemId: a = "mwd" } = {}) {
  return dr || (dr = new Jr({ systemId: a })), dr;
}
const rb = "gmDnPresetEditor";
function ob(a = []) {
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
  }), t.length) throw It(t);
  return Tn(e, { strict: !0 });
}
function lb(a = []) {
  return Tn(a, { strict: !1 }).map((e) => ({
    label: e.label,
    dn: String(e.dn)
  }));
}
function cb(a = "") {
  const e = String(a ?? "").trim();
  if (!e) return [];
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    throw It([
      `Bulk JSON must be valid JSON: ${i.message}`
    ]);
  }
  return Tn(t, { strict: !0 });
}
function ub(a = []) {
  return JSON.stringify(
    Tn(a, { strict: !1 }),
    null,
    2
  );
}
const db = {
  id: "gm-dn-presets",
  menuKey: rb,
  settingKey: em,
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
  defaultData: Zy,
  createEmptyRow: () => ({
    label: "",
    dn: "1"
  }),
  toRows: lb,
  rowsToValue: ob,
  parseBulk: cb,
  serializeBulk: ub
};
function mb() {
  $a(db);
}
const fb = "lifeModuleCatalogEditor";
function pb(a = []) {
  return la((Array.isArray(a) ? a : []).map((e) => ({
    id: String((e == null ? void 0 : e.id) ?? ""),
    moduleType: String((e == null ? void 0 : e.moduleType) ?? ""),
    label: String((e == null ? void 0 : e.label) ?? ""),
    grants: String((e == null ? void 0 : e.grants) ?? ""),
    requiresAny: String((e == null ? void 0 : e.requiresAny) ?? ""),
    excludesAny: String((e == null ? void 0 : e.excludesAny) ?? "")
  })), { strict: !0 });
}
function hb(a = []) {
  return la(a, { strict: !1 }).map((e) => ({
    id: e.id,
    moduleType: e.moduleType,
    label: e.label,
    grants: ng(e.grants),
    requiresAny: e.requiresAny.join(", "),
    excludesAny: e.excludesAny.join(", ")
  }));
}
function gb(a = "") {
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
  return la(t, { strict: !0 });
}
function yb(a = []) {
  return JSON.stringify(
    la(a, { strict: !1 }),
    null,
    2
  );
}
const bb = {
  id: "life-module-catalog",
  menuKey: fb,
  settingKey: Ma,
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
      options: gd
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
  defaultData: Qo,
  createEmptyRow: () => ({
    id: "",
    moduleType: "childhood",
    label: "",
    grants: "",
    requiresAny: "",
    excludesAny: ""
  }),
  toRows: hb,
  rowsToValue: pb,
  parseBulk: gb,
  serializeBulk: yb
};
function Sb() {
  $a(bb);
}
const Ab = "personalActionCatalogEditor", bc = Object.freeze([
  { value: "false", label: "No" },
  { value: "true", label: "Yes" }
]);
function Tb(a = []) {
  try {
    return Sn((Array.isArray(a) ? a : []).map((e) => ({
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
    throw It(
      Array.isArray(e.validationErrors) ? e.validationErrors : [e.message]
    );
  }
}
function wb(a = []) {
  return Sn(a, { strict: !1 }).map((e) => {
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
function kb(a = "") {
  const e = String(a ?? "").trim();
  if (!e) return [];
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    throw It([
      `Bulk JSON must be valid JSON: ${i.message}`
    ]);
  }
  try {
    return Sn(t, { strict: !0 });
  } catch (i) {
    throw It(
      Array.isArray(i.validationErrors) ? i.validationErrors : [i.message]
    );
  }
}
function vb(a = []) {
  return JSON.stringify(
    Sn(a, { strict: !1 }),
    null,
    2
  );
}
const Mb = {
  id: "personal-action-catalog",
  menuKey: Ab,
  settingKey: rd,
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
      options: () => xr
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
      options: () => od
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
      options: () => bc
    },
    {
      key: "prominentWhenBurning",
      label: "Burn Highlight",
      type: "select",
      options: () => bc
    }
  ],
  menu: {
    name: "Personal Action Catalog",
    label: "Configure",
    hint: "Edit the personal combat action menus and first-pass action handlers.",
    icon: "fas fa-list-check",
    restricted: !0
  },
  defaultData: Ko,
  createEmptyRow: () => {
    var a;
    return {
      id: "",
      label: "",
      category: ((a = xr[0]) == null ? void 0 : a.value) ?? "standard",
      cost: "1",
      handler: "combatAction",
      reason: "",
      rollIntent: "",
      prominent: "false",
      prominentWhenBurning: "false"
    };
  },
  toRows: wb,
  rowsToValue: Tb,
  parseBulk: kb,
  serializeBulk: vb
};
function Cb() {
  $a(Mb);
}
const Eb = "skillSpecializationEditor";
function Xr() {
  return as().map((a) => ({
    value: a.code,
    label: a.label
  }));
}
function Pb(a = []) {
  const e = new Set(Xr().map((n) => n.value)), t = {}, i = [];
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
  }), i.length) throw It(i);
  return Ms(t, { strict: !0 });
}
function Rb(a = {}) {
  const e = Ms(a, { strict: !1 });
  return Object.entries(e).flatMap(
    ([t, i]) => i.map((n) => ({ skillCode: t, label: n }))
  );
}
function Nb(a = "") {
  const e = String(a ?? "").trim();
  if (!e) return {};
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    throw It([
      `Bulk JSON must be valid JSON: ${i.message}`
    ]);
  }
  return Ms(t, { strict: !0 });
}
function Ib(a = {}) {
  return JSON.stringify(
    Ms(a, { strict: !1 }),
    null,
    2
  );
}
const Db = {
  id: "skill-specializations",
  menuKey: Eb,
  settingKey: Dr,
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
      options: Xr
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
  defaultData: Iu,
  createEmptyRow: () => {
    var a;
    return {
      skillCode: ((a = Xr()[0]) == null ? void 0 : a.value) ?? "",
      label: ""
    };
  },
  toRows: Rb,
  rowsToValue: Pb,
  parseBulk: Nb,
  serializeBulk: Ib
};
function Ob() {
  $a(Db);
}
const _b = "statusConditionCatalogEditor";
function Lb(a = []) {
  try {
    return ta((Array.isArray(a) ? a : []).map((e) => ({
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
    throw It(
      Array.isArray(e.validationErrors) ? e.validationErrors : [e.message]
    );
  }
}
function xb(a = []) {
  return ta(a, { strict: !1 }).map((e) => ({
    id: String(e.id ?? ""),
    label: String(e.label ?? ""),
    actorGroup: String(e.actorGroup ?? "person"),
    category: String(e.category ?? ""),
    tags: Tp(e.tags ?? []),
    icon: String(e.icon ?? ""),
    manual: e.manual ? "true" : "false",
    managed: e.managed ? "true" : "false",
    modifierKey: String(e.modifierKey ?? ""),
    order: String(e.order ?? "0")
  }));
}
function $b(a = "") {
  const e = String(a ?? "").trim();
  if (!e) return [];
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    throw It([
      `Bulk JSON must be valid JSON: ${i.message}`
    ]);
  }
  try {
    return ta(t, { strict: !0 });
  } catch (i) {
    throw It(
      Array.isArray(i.validationErrors) ? i.validationErrors : [i.message]
    );
  }
}
function Bb(a = []) {
  return JSON.stringify(
    ta(a, { strict: !1 }),
    null,
    2
  );
}
const zb = {
  id: "status-condition-catalog",
  menuKey: _b,
  settingKey: _u,
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
    { key: "actorGroup", label: "Actor Group", type: "select", options: () => gp },
    { key: "category", label: "Category", type: "text", placeholder: "stability" },
    { key: "tags", label: "Tags", type: "text", placeholder: "movement, piloting" },
    { key: "icon", label: "Icon", type: "text", placeholder: "systems/mwd/img/icons/status/falling.svg" },
    { key: "manual", label: "Manual", type: "select", options: () => kl },
    { key: "managed", label: "Managed", type: "select", options: () => kl },
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
  defaultData: Bu,
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
  toRows: xb,
  rowsToValue: Lb,
  parseBulk: $b,
  serializeBulk: Bb
};
function Fb() {
  $a(zb);
}
class Ub {
  static register() {
    mb(), Sb(), Cb(), Ob(), Wy(), Fb(), game.settings.register(T, "useDestinyMechanics", {
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
    }), game.settings.register(T, Od, {
      name: "Machine Critical Table: General",
      hint: "2d6 RollTable UUID that chooses the general type of machine critical problem.",
      scope: "world",
      config: !0,
      type: String,
      default: it.general
    }), game.settings.register(T, _d, {
      name: "Machine Critical Table: BattleMech Head",
      hint: "Location interpretation table for BattleMech head criticals.",
      scope: "world",
      config: !0,
      type: String,
      default: it.mechHead
    }), game.settings.register(T, Ld, {
      name: "Machine Critical Table: BattleMech Torso",
      hint: "Location interpretation table for BattleMech torso, core, and forced critical hits.",
      scope: "world",
      config: !0,
      type: String,
      default: it.mechTorso
    }), game.settings.register(T, xd, {
      name: "Machine Critical Table: BattleMech Arms",
      hint: "Location interpretation table for BattleMech arm criticals.",
      scope: "world",
      config: !0,
      type: String,
      default: it.mechArms
    }), game.settings.register(T, $d, {
      name: "Machine Critical Table: BattleMech Legs",
      hint: "Location interpretation table for BattleMech leg criticals.",
      scope: "world",
      config: !0,
      type: String,
      default: it.mechLegs
    }), game.settings.register(T, Bd, {
      name: "Machine Critical Table: Vehicle Body",
      hint: "Location interpretation table for vehicle body criticals.",
      scope: "world",
      config: !0,
      type: String,
      default: it.vehicleBody
    }), game.settings.register(T, zd, {
      name: "Machine Critical Table: Vehicle Turret",
      hint: "Location interpretation table for vehicle turret and weapon criticals.",
      scope: "world",
      config: !0,
      type: String,
      default: it.vehicleTurret
    }), game.settings.register(T, Fd, {
      name: "Machine Critical Table: Vehicle Mobility",
      hint: "Location interpretation table for vehicle mobility criticals.",
      scope: "world",
      config: !0,
      type: String,
      default: it.vehicleMobility
    });
  }
  static getSystemProperty(e, t) {
    return game.settings.get(T, e) ?? t;
  }
}
class Hb extends Error {
  constructor(e, { severity: t = "error" } = {}) {
    super(e), this.name = "UserFacingRollError", this.userFacing = !0, this.severity = t === "warn" ? "warn" : "error";
  }
}
function Wi(a, e = {}) {
  return new Hb(a, e);
}
function Ji(a, e = "Unable to execute roll.") {
  var i, n;
  const t = a != null && a.userFacing && (a == null ? void 0 : a.severity) === "warn" ? "warn" : "error";
  (n = (i = ui.notifications) == null ? void 0 : i[t]) == null || n.call(i, (a == null ? void 0 : a.message) ?? e);
}
const ds = Symbol("SKIP_FIELD");
function im(a) {
  return a instanceof HTMLInputElement || a instanceof HTMLSelectElement || a instanceof HTMLTextAreaElement;
}
function jb({
  elementKind: a = "input",
  inputType: e = "",
  dtype: t = "",
  value: i = "",
  checked: n = !1
} = {}) {
  const s = String(a ?? "").trim().toLowerCase(), r = String(e ?? "").trim().toLowerCase(), o = String(t ?? "").trim().toLowerCase();
  if (!["input", "select", "textarea"].includes(s))
    return ds;
  if (s === "input") {
    if (r === "radio")
      return n ? i : ds;
    if (r === "checkbox")
      return !!n;
  }
  if (o === "number" || s === "input" && r === "number") {
    const l = Number(i);
    return Number.isFinite(l) ? l : 0;
  }
  return o === "boolean" ? i === !0 || i === "true" : i;
}
function Wb(a) {
  var e;
  return im(a) ? jb({
    elementKind: a instanceof HTMLSelectElement ? "select" : a instanceof HTMLTextAreaElement ? "textarea" : "input",
    inputType: a instanceof HTMLInputElement ? a.type : "",
    dtype: String(((e = a.dataset) == null ? void 0 : e.dtype) ?? ""),
    value: a.value,
    checked: a instanceof HTMLInputElement ? a.checked : !1
  }) : ds;
}
function Kb({
  root: a,
  document: e,
  selector: t = "input[name], select[name], textarea[name]",
  clampByPath: i = null,
  skipNames: n = []
} = {}) {
  if (!(a instanceof HTMLElement)) return {};
  const s = new Set(Array.isArray(n) ? n : [n]), r = {};
  for (const o of a.querySelectorAll(t)) {
    if (!im(o) || o.closest("prose-mirror") || o.disabled) continue;
    const l = String(o.getAttribute("name") ?? o.name ?? "").trim();
    if (!l || s.has(l)) continue;
    let c = Wb(o);
    c === ds || (typeof i == "function" && (c = i(l, c)), (e ? foundry.utils.getProperty(e, l) : void 0) === c) || (r[l] = c);
  }
  return r;
}
const { HandlebarsApplicationMixin: Gb } = foundry.applications.api, { HTMLField: qb } = foundry.data.fields;
function Vb(a) {
  const e = new qb({ required: !1, blank: !0, initial: "" });
  return e.name = a, e;
}
var Ht, pn, Ci, Ki, Bi, Zr, eo;
const Ke = class Ke extends Gb(foundry.applications.sheets.ActorSheetV2) {
  constructor() {
    super(...arguments);
    we(this, Bi);
    we(this, Ht, !1);
    /** Track active CSB tab per group across rerenders */
    we(this, pn, /* @__PURE__ */ new Map());
    // group -> tabId
    we(this, Ci, /* @__PURE__ */ new Map());
    // group -> sectionId|null
    we(this, Ki, null);
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
          Re(this, Ht, !F(this, Ht)), this.render({ force: !0 });
        });
        return;
      }
      Re(this, Ht, !F(this, Ht)), this.render({ force: !0 });
    }
  }
  /** Get the root HTMLElement for this application */
  _getRootElement() {
    var t;
    return this.element instanceof HTMLElement ? this.element : (t = this.element) == null ? void 0 : t[0];
  }
  _getPrimaryScroller() {
    const t = this._getRootElement();
    return t ? t.querySelector(".mwd-scroll-area") ?? t.querySelector(".csb-tab-panels") ?? t.querySelector(".window-content") : null;
  }
  _captureScrollPosition() {
    const t = this._getPrimaryScroller();
    if (!(t instanceof HTMLElement)) {
      Re(this, Ki, null);
      return;
    }
    Re(this, Ki, {
      top: t.scrollTop,
      left: t.scrollLeft
    });
  }
  _restoreScrollPosition() {
    const t = F(this, Ki);
    if (!t) return;
    const i = () => {
      const n = this._getPrimaryScroller();
      n instanceof HTMLElement && (n.scrollTop = t.top, n.scrollLeft = t.left);
    };
    i(), requestAnimationFrame(i), Re(this, Ki, null);
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
    F(this, pn).set(o, s), C(this, Bi, Zr).call(this, r, s);
  }
  _onClickAccordion(t, i) {
    var u, d, m;
    const n = ((u = i == null ? void 0 : i.closest) == null ? void 0 : u.call(i, ".csb-accordion__trigger[data-section]")) ?? ((m = (d = t == null ? void 0 : t.target) == null ? void 0 : d.closest) == null ? void 0 : m.call(d, ".csb-accordion__trigger[data-section]"));
    if (!n) return;
    const s = n.dataset.section, r = n.closest(".csb-accordion");
    if (!r || !s) return;
    const o = r.dataset.group || "default", c = (F(this, Ci).has(o) ? F(this, Ci).get(o) : r.dataset.default || null) === s ? null : s;
    F(this, Ci).set(o, c), C(this, Bi, eo).call(this, r, c);
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
      return console.error("MWD | Failed to execute roll action", b), Ji(b, "Unable to execute that roll."), null;
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
        const c = l.dataset.group || "default", u = F(this, pn).get(c), d = l.dataset.default || ((r = l.querySelector(".csb-tab-link[data-tab]")) == null ? void 0 : r.dataset.tab), m = u || d;
        m && C(this, Bi, Zr).call(this, l, m);
      }
      for (const l of n.querySelectorAll(".csb-accordion")) {
        const c = l.dataset.group || "default", u = F(this, Ci).has(c) ? F(this, Ci).get(c) : l.dataset.default || null;
        C(this, Bi, eo).call(this, l, u);
      }
      n.querySelectorAll(".csb-tabs").length && !n.querySelector(".csb-tab-panel.is-active") && console.warn(`${Ce} CSB tabs present but no active tab applied. Check element root resolution and CSS .is-active selectors.`, {
        sheet: (o = this.constructor) == null ? void 0 : o.name
      });
      for (const l of n.querySelectorAll('prose-mirror[name="system.biography.history"]'))
        l.addEventListener("change", (c) => {
          c.preventDefault(), this._updateRichTextHistory(l);
        });
      this._restoreScrollPosition();
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
    const i = Kb({
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
    console.log(`${Ce}BaseActorSheetV2._prepareContext:start`, {
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
    return s.options.owner = s.owner, s.options.limited = s.limited, s.options.editable = s.editable, s.options.editing = s.editing, s.options.viewMode = !s.editing, s.skillsDisplay = Ou(((m = this.actor) == null ? void 0 : m.system) ?? {}), s.bio = {
      ...s.bio ?? {},
      fields: {
        history: Vb("system.biography.history")
      }
    }, s.items ?? (s.items = {}), (f = this.actor) != null && f.items && typeof (oe == null ? void 0 : oe.classifyInto) == "function" && (oe.classifyInto(s.items, this.actor.items), s.items.weapon = [
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
    }, console.log(`${Ce}BaseActorSheetV2._prepareContext:done`, {
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
    var p, h, g, y, b, S;
    if (t.preventDefault(), (p = t.stopPropagation) == null || p.call(t), !this.isEditable) return;
    const n = ((h = i == null ? void 0 : i.closest) == null ? void 0 : h.call(i, "[data-action='monitorSet']")) ?? ((y = (g = t == null ? void 0 : t.target) == null ? void 0 : g.closest) == null ? void 0 : y.call(g, "[data-action='monitorSet']")) ?? i, s = String(((b = n == null ? void 0 : n.dataset) == null ? void 0 : b.monitor) ?? "").trim(), r = Number((S = n == null ? void 0 : n.dataset) == null ? void 0 : S.value);
    if (!s || !Number.isFinite(r)) return;
    this._captureScrollPosition();
    const o = s === "burn" ? "system.burn.value" : `system.monitors.${s}.value`, l = Number(foundry.utils.getProperty(this.actor, o) ?? 0), c = s === "armor" ? r : l === r ? 0 : r, u = this.getPersistentActor() ?? this.actor;
    if (typeof (u == null ? void 0 : u.setMonitorValue) == "function")
      return u.setMonitorValue(s, c, { source: "sheet" });
    const d = `system.monitors.${s}`, m = Number(foundry.utils.getProperty(u, `${d}.max`)) || 0, f = Math.min(Math.max(0, c), Math.max(0, m));
    return u.update({ [`${d}.value`]: f });
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
Ht = new WeakMap(), pn = new WeakMap(), Ci = new WeakMap(), Ki = new WeakMap(), Bi = new WeakSet(), /**
 * Apply active-state classes within a single .csb-tabs root.
 * Idempotent: safe to call every render.
 */
Zr = function(t, i) {
  t.querySelectorAll(".csb-tab-link").forEach((n) => {
    n.classList.toggle("is-active", n.dataset.tab === i);
  }), t.querySelectorAll(".csb-tab-panel").forEach((n) => {
    n.classList.toggle("is-active", n.dataset.tab === i);
  });
}, eo = function(t, i) {
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
O(Ke, "MIN_WIDTH", 800), O(Ke, "MAX_WIDTH", 950), O(Ke, "MIN_HEIGHT", 600), O(Ke, "MAX_HEIGHT", 1400), /** @override */
O(Ke, "DEFAULT_OPTIONS", foundry.utils.mergeObject(Yt(Ke, Ke, "DEFAULT_OPTIONS"), {
  classes: ["sheet", "actor", T, "appv2", "mwd-sheet", "mwd-character-sheet"],
  position: { width: 760, height: 760 },
  window: { resizable: !0, minimizable: !0 },
  actions: {
    toggleViewMode: Ke.prototype._onToggleViewMode,
    tab: Ke.prototype._onClickTab,
    accordion: Ke.prototype._onClickAccordion,
    roll: Ke.prototype._onRollAction,
    monitorSet: Ke.prototype._onMonitorSet,
    editImage: Ke.prototype._onEditImage,
    createOwnedItem: Ke.prototype._onCreateOwnedItem,
    editOwnedItem: Ke.prototype._onEditOwnedItem,
    deleteOwnedItem: Ke.prototype._onDeleteOwnedItem,
    toggleOwnedItemEquipped: Ke.prototype._onToggleOwnedItemEquipped,
    setOwnedItemPrimary: Ke.prototype._onSetOwnedItemPrimary
  }
}, { inplace: !1 }));
let dn = Ke;
function Yb(a = {}) {
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
function Qb(a) {
  return Array.isArray(a) ? a : typeof a == "string" ? a.split(/\s+/).filter(Boolean) : [];
}
function Vn(a) {
  if (!a || typeof a != "object") return a;
  const e = {
    ...a,
    template: a.template ?? Yb(a),
    classes: Qb(a.classes),
    children: Array.isArray(a.children) ? a.children.map(Vn) : []
  };
  return a.type === "tabs" && (e.tabs = Array.isArray(a.tabs) ? a.tabs.map((t) => ({
    ...t,
    children: Array.isArray(t.children) ? t.children.map(Vn) : []
  })) : []), a.type === "accordion" && (e.sections = Array.isArray(a.sections) ? a.sections.map((t) => ({
    ...t,
    children: Array.isArray(t.children) ? t.children.map(Vn) : []
  })) : []), e;
}
function Sc(a = {}) {
  return {
    ...a,
    root: Vn(a.root ?? { type: "stack", children: [] })
  };
}
var Ei, ys, am;
class sa {
  static async get(e) {
    if (F(this, Ei).has(e)) {
      const n = await F(this, Ei).get(e);
      if (Number((n == null ? void 0 : n.version) ?? 0) > 0) return n;
      F(this, Ei).delete(e);
    }
    const t = C(this, ys, am).call(this, e);
    F(this, Ei).set(e, t);
    const i = await t;
    return Number((i == null ? void 0 : i.version) ?? 0) <= 0 && F(this, Ei).delete(e), i;
  }
}
Ei = new WeakMap(), ys = new WeakSet(), am = async function(e) {
  const t = `systems/${T}/templates/v2/layouts/${e}.layout.json`;
  try {
    const i = await fetch(t);
    if (!i.ok) throw new Error(`HTTP ${i.status} for ${t}`);
    return Sc(await i.json());
  } catch (i) {
    return console.error(`${Ce}LayoutRegistry.get FAILED`, { layoutId: e, url: t, error: i }), Sc({
      id: e,
      version: 0,
      root: { type: "stack", children: [] }
    });
  }
}, we(sa, ys), we(sa, Ei, /* @__PURE__ */ new Map());
function mn(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function il(a, e, t) {
  return Math.min(t, Math.max(e, a));
}
function Ac(a = "") {
  return String(a ?? "").replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim().replace(/\b\w/g, (e) => e.toUpperCase());
}
function Jb(a = 0) {
  const e = il(mn(a, 0), 0, 100);
  return e >= 91 ? "green" : e >= 71 ? "yellow" : e >= 51 ? "orange" : e >= 31 ? "red" : "dark-red";
}
function Tc(a, e = {}) {
  const t = Math.max(0, mn(e == null ? void 0 : e.max, 0)), i = il(mn(e == null ? void 0 : e.value, 0), 0, t), n = Math.max(0, t - i), s = t > 0 ? n / t * 100 : 0;
  return {
    label: a,
    value: String(n),
    tone: Jb(s),
    remaining: n,
    max: t,
    percent: s,
    title: `${n}/${t}`
  };
}
function Xb({ armor: a = {}, structure: e = {} } = {}) {
  const t = [
    Tc("A", a),
    Tc("S", e)
  ];
  return {
    parts: t,
    title: `Armor ${t[0].title}; Structure ${t[1].title}`
  };
}
function to({
  id: a = "",
  label: e = "",
  kind: t = "wound",
  monitor: i = {},
  editable: n = !1
} = {}) {
  const s = Math.max(0, mn(i == null ? void 0 : i.max, 0)), r = il(mn(i == null ? void 0 : i.value, 0), 0, s), o = Math.max(0, s - r);
  return {
    id: a,
    label: e,
    kind: t,
    editable: !!n,
    value: o,
    max: s,
    segments: Array.from({ length: s }, (l, c) => {
      const u = c + 1;
      return {
        value: Math.max(0, s - u),
        filled: u <= o
      };
    })
  };
}
function Zb(a = {}) {
  const e = String((a == null ? void 0 : a.label) ?? Ac((a == null ? void 0 : a.key) ?? "Critical")).trim() || "Critical", t = String((a == null ? void 0 : a.locationLabel) ?? Ac((a == null ? void 0 : a.locationKey) ?? "")).trim();
  return t ? `${e} (${t})` : e;
}
function nm(a = []) {
  const e = Array.isArray(a) ? a.filter((i) => i && i.active !== !1) : [], t = e.length;
  return {
    value: t === 0 ? "CLEAR" : t === 1 ? "1 CRIT" : `${t} CRITS`,
    title: e.map(Zb).join("; "),
    count: t
  };
}
function Hs(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function eS(a = {}) {
  var i, n, s, r;
  const e = Array.isArray((i = a == null ? void 0 : a.attack) == null ? void 0 : i.targets) ? a.attack.targets : [], t = bi(((n = a == null ? void 0 : a.attack) == null ? void 0 : n.areaEffect) ?? ((r = (s = a == null ? void 0 : a.attack) == null ? void 0 : s.payload) == null ? void 0 : r.areaEffect) ?? {});
  if (!e.length && t.kind !== Et.persistent)
    throw new Error("Attack requires at least one target.");
  return e;
}
async function sm(a = {}) {
  if (!(a != null && a.actorUuid)) return null;
  try {
    return await fromUuid(a.actorUuid);
  } catch (e) {
    return console.warn("MWD | Unable to resolve attack target actor for CQ", a, e), null;
  }
}
function tS(a = {}, e = null, t = "") {
  var i, n, s, r, o;
  return Math.max(0, Hs(
    ((i = a == null ? void 0 : a.attributes) == null ? void 0 : i[t]) ?? ((n = e == null ? void 0 : e.getAttributeValue) == null ? void 0 : n.call(e, t)) ?? ((o = (r = (s = e == null ? void 0 : e.system) == null ? void 0 : s.attributes) == null ? void 0 : r[t]) == null ? void 0 : o.value),
    0
  ));
}
function iS(a = {}, e = null, t = "") {
  var i, n, s, r, o, l;
  return Math.max(0, Hs(
    ((n = (i = a == null ? void 0 : a.skills) == null ? void 0 : i[t]) == null ? void 0 : n.rating) ?? ((s = e == null ? void 0 : e.getSkillRating) == null ? void 0 : s.call(e, t)) ?? ((l = (o = (r = e == null ? void 0 : e.system) == null ? void 0 : r.skills) == null ? void 0 : o[t]) == null ? void 0 : l.rating),
    0
  ));
}
function wc(a = []) {
  return a.reduce((e, t) => e + Hs(t == null ? void 0 : t.value, 0), 0);
}
async function aS({ attacker: a = null, ctx: e = {}, target: t = {} } = {}) {
  var z, G, Y, q, Q, L, U, V, Z, re, be, ce, se, Oe, Fe, Ue, Ve, at, nt, st, rt, et;
  const i = await sm(t), n = Math.max(0, Number(((q = (G = (z = e == null ? void 0 : e.attack) == null ? void 0 : z.weapon) == null ? void 0 : G.attackRatingBand) == null ? void 0 : q[(Y = e == null ? void 0 : e.attack) == null ? void 0 : Y.rangeBand]) ?? 0) || 0), s = Fs(i), r = s ? A.actorAttributes.handling : "reflexes", o = tS(t, i, r), l = o + o, c = String(((L = (Q = e == null ? void 0 : e.attack) == null ? void 0 : Q.skill) == null ? void 0 : L.code) ?? ((V = (U = e == null ? void 0 : e.attack) == null ? void 0 : U.weapon) == null ? void 0 : V.skill) ?? "").trim(), u = String(((re = (Z = e == null ? void 0 : e.attack) == null ? void 0 : Z.skill) == null ? void 0 : re.label) ?? c ?? "Attack Skill").trim() || "Attack Skill", d = c ? Math.max(0, Hs(((be = a == null ? void 0 : a.getSkillRating) == null ? void 0 : be.call(a, c)) ?? ((Oe = (se = (ce = a == null ? void 0 : a.system) == null ? void 0 : ce.skills) == null ? void 0 : se[c]) == null ? void 0 : Oe.rating), 0)) : 0, m = s ? "piloting" : "tactics", f = s ? "Piloting" : "Tactics", p = iS(t, i, m), h = d - p, g = Math.abs(h), y = Math.max(0, Number(((Fe = t == null ? void 0 : t.activeArmor) == null ? void 0 : Fe.defenseBonus) ?? 0) || 0), b = String(((Ue = e == null ? void 0 : e.attack) == null ? void 0 : Ue.rangeBand) ?? "").trim() || "range", w = [{
    id: "weapon.attackRating",
    label: `Weapon AR (${((at = (Ve = e == null ? void 0 : e.attack) == null ? void 0 : Ve.weapon) == null ? void 0 : at.type) === "personalWeapon" || (st = (nt = e == null ? void 0 : e.attack) == null ? void 0 : nt.weapon) != null && st.isSynthetic ? Os(b) : b})`,
    value: n
  }], v = [{
    id: s ? "target.handlingDefense" : "target.reflexesDefense",
    label: s ? "Target Handling + Handling" : "Target REF + REF",
    value: l
  }];
  h > 0 ? w.push({
    id: "skill.attackVsTactics",
    label: `${u} over Tactics`,
    value: g
  }) : h < 0 && v.push({
    id: "target.tacticsAdvantage",
    label: `${f} over ${u}`,
    value: g
  }), (et = (rt = e == null ? void 0 : e.attack) == null ? void 0 : rt.aim) != null && et.eligible && w.push({
    id: "state.aim",
    label: `Aim (${u})`,
    value: d
  }), v.push({
    id: "target.armorDefense",
    label: "Armor Defense",
    value: y
  });
  const P = wc(w), E = wc(v);
  return {
    ar: {
      parts: w,
      total: P
    },
    dr: {
      parts: v,
      total: E
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
    value: P - E
  };
}
function nS(a = {}, e = {}) {
  var p, h, g, y, b, S, w, v;
  const t = (a == null ? void 0 : a.attack) ?? {}, i = String(((h = (p = t == null ? void 0 : t.payload) == null ? void 0 : p.modifies) == null ? void 0 : h.damageType) ?? "").trim(), n = Math.max(0, Number(((g = t == null ? void 0 : t.weapon) == null ? void 0 : g.damage) ?? 0) || 0), s = !!(a != null && a.targetIsMachine), r = i || ((y = t == null ? void 0 : t.weapon) == null ? void 0 : y.damageType), o = s ? String(r ?? "kinetic").trim() || "kinetic" : qt(r, "concussive"), l = Math.max(0, Number((t == null ? void 0 : t.totalAp) ?? ((b = t == null ? void 0 : t.weapon) == null ? void 0 : b.ap) ?? 0) || 0), c = e.outcome === "graze" ? n / 2 : e.outcome === "hit" ? n : 0, u = c + Number(e.netHits ?? 0), d = No((t == null ? void 0 : t.currentExposure) ?? xi({
    tier: ((S = t == null ? void 0 : t.currentExposure) == null ? void 0 : S.initialTier) ?? ((w = t == null ? void 0 : t.currentExposure) == null ? void 0 : w.tier) ?? "none"
  }), {
    active: !!(t != null && t.evadeActive),
    locked: !!(t != null && t.evadeLocked)
  }), m = bi((t == null ? void 0 : t.areaEffect) ?? ((v = t == null ? void 0 : t.payload) == null ? void 0 : v.areaEffect) ?? {}), f = m.kind === Et.persistent ? u : Xi(u, d.finalTier);
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
function sS(a = {}) {
  return String((a == null ? void 0 : a.tokenUuid) ?? (a == null ? void 0 : a.actorUuid) ?? (a == null ? void 0 : a.tokenId) ?? (a == null ? void 0 : a.actorId) ?? (a == null ? void 0 : a.name) ?? foundry.utils.randomID()).trim();
}
function kc(a, e) {
  var s, r;
  const t = ((r = (s = a == null ? void 0 : a.system) == null ? void 0 : s.monitors) == null ? void 0 : r[e]) ?? {}, i = Math.max(0, Number(t.max ?? 0) || 0), n = Math.min(i, Math.max(0, Number(t.value ?? 0) || 0));
  return Math.max(0, i - n);
}
function rS({ attacker: a, ctx: e, damage: t, targetActor: i = null, hitLocation: n = null } = {}) {
  var s, r, o, l, c, u, d, m, f, p, h;
  return Fs(i) ? {
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
    notes: (h = t == null ? void 0 : t.exposure) != null && h.initialTier ? `Exposure ${$t(t.exposure.initialTier)}${t.exposure.evadeUsed ? ` -> ${$t(t.exposure.finalTier)}` : ""}` : ""
  };
}
function ba(a, e = {}, t = {}, { queued: i = !1, applied: n = !1, skipped: s = !1, reason: r = "" } = {}) {
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
async function oS({ attacker: a, ctx: e, target: t, outcome: i, damage: n } = {}) {
  var d;
  if ((i == null ? void 0 : i.outcome) === "miss")
    return ba(null, t, n, { skipped: !0, reason: "Missed target." });
  if (((d = n == null ? void 0 : n.areaEffect) == null ? void 0 : d.kind) === Et.persistent)
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
    return console.warn("MWD | Unable to resolve target for queued attack damage", t, m), ba(null, t, n, { reason: "Unable to resolve attack target." });
  }
  const l = Fs(r) ? Id({
    actor: r,
    rollTotal: Nd(),
    armorBefore: kc(r, A.monitors.armor),
    structureBefore: kc(r, A.monitors.structure)
  }) : null, c = rS({ attacker: a, ctx: e, damage: n, targetActor: r, hitLocation: l }), u = await Pt.apply({
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
    const m = ba(u, t, n, { queued: !0, applied: !1 });
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
  return ba(u, t, n, { reason: "Unable to preview attack damage." });
}
async function lS({ attacker: a, ctx: e, outcomeModel: t, target: i, previewState: n = {} } = {}) {
  var b, S;
  const s = await aS({ attacker: a, ctx: e, target: i }), r = await sm(i), o = Number((t == null ? void 0 : t.margin) ?? 0), l = Number(s.value ?? 0), c = o;
  let u = l > 0 ? o >= 1 ? "hit" : o === 0 ? "graze" : "miss" : l < 0 ? o >= 2 ? "hit" : o === 1 ? "graze" : "miss" : o >= 1 ? "hit" : "miss";
  String(((b = e == null ? void 0 : e.attack) == null ? void 0 : b.rangeBand) ?? "").trim().toLowerCase() === "outofrange" && u === "hit" && (u = "graze");
  const d = u === "hit" ? Math.max(0, c) : 0, m = (e == null ? void 0 : e.attack) ?? {}, f = sS(i), p = (n == null ? void 0 : n[f]) ?? {}, h = (i == null ? void 0 : i.exposure) ?? xi({ tier: "none" }), g = nS({
    ...e,
    targetIsMachine: Fs(r),
    attack: {
      ...m,
      currentExposure: h,
      areaEffect: (m == null ? void 0 : m.areaEffect) ?? ((S = m == null ? void 0 : m.payload) == null ? void 0 : S.areaEffect) ?? null,
      evadeActive: !!(p != null && p.evadeActive),
      evadeLocked: !!(h != null && h.evadeLocked)
    }
  }, { outcome: u, netHits: d }), y = await oS({
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
function cS(a = []) {
  const e = { hits: 0, grazes: 0, misses: 0 };
  for (const t of a)
    (t == null ? void 0 : t.outcome) === "hit" ? e.hits += 1 : (t == null ? void 0 : t.outcome) === "graze" ? e.grazes += 1 : e.misses += 1;
  return {
    ...e,
    overallOutcome: e.hits > 0 ? "hit" : e.grazes > 0 ? "graze" : "miss"
  };
}
async function rm({ attacker: a, ctx: e, outcomeModel: t, previewState: i = {}, existingAttackResult: n = null } = {}) {
  var c, u, d, m, f, p;
  const s = eS(e), r = [];
  for (const h of s)
    r.push(await lS({ attacker: a, ctx: e, outcomeModel: t, target: h, previewState: i }));
  const o = bi(((c = e == null ? void 0 : e.attack) == null ? void 0 : c.areaEffect) ?? ((d = (u = e == null ? void 0 : e.attack) == null ? void 0 : u.payload) == null ? void 0 : d.areaEffect) ?? {});
  let l = String((n == null ? void 0 : n.persistentRegionUuid) ?? "").trim() || null;
  if (o.kind === Et.persistent && !l) {
    const h = await gh({
      attacker: a,
      attack: (e == null ? void 0 : e.attack) ?? {},
      targetResult: r[0] ?? null
    });
    l = (h == null ? void 0 : h.uuid) ?? null;
  }
  return {
    targetCount: s.length,
    results: r,
    summary: cS(r),
    areaEffect: o,
    templateGeometry: si(Be(
      (m = e == null ? void 0 : e.attack) == null ? void 0 : m.templateGeometry,
      {
        template: (f = e == null ? void 0 : e.attack) == null ? void 0 : f.template,
        placement: (p = e == null ? void 0 : e.attack) == null ? void 0 : p.templatePlacement
      }
    )),
    persistentRegionUuid: l
  };
}
function ze(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? Math.trunc(t) : e;
}
function mr(a, e = 0, t = Number.POSITIVE_INFINITY) {
  const i = ze(a, e);
  return Math.max(e, Math.min(t, i));
}
function om(a, e = 1) {
  var i;
  const t = ze((i = a == null ? void 0 : a.difficulty) == null ? void 0 : i.dn, ze(e, 1));
  return Math.max(0, t);
}
function uS(a, e) {
  return Math.max(0, ze(a, 0) - ze(e, 0));
}
function dS({ convert: a, remainder: e, rate: t = 4 } = {}) {
  const i = Math.max(0, ze(e, 0)), n = Math.max(1, ze(t, 4)), s = Math.max(0, ze(a, 0)), r = Math.floor(s / n) * n;
  return Math.min(i, r);
}
function al(a, { rate: e = 4, maxPerRoll: t = Number.POSITIVE_INFINITY } = {}) {
  const i = Math.max(1, ze(e, 4)), n = Math.floor(Math.max(0, ze(a, 0)) / i), s = Number.isFinite(t) ? Math.max(0, ze(t, 0)) : Number.POSITIVE_INFINITY;
  return { amount: Math.min(n, s), rate: i };
}
function nl(a) {
  var i;
  const e = ((i = a == null ? void 0 : a.edge) == null ? void 0 : i.earn) ?? {};
  return {
    enabled: !!(e != null && e.enabled),
    rate: Math.max(1, ze(e == null ? void 0 : e.rate, 4)),
    maxPerRoll: (e == null ? void 0 : e.maxPerRoll) ?? Number.POSITIVE_INFINITY
  };
}
function ms(a) {
  var t;
  const e = (t = a == null ? void 0 : a.edge) == null ? void 0 : t.pool;
  return e ? String(e) : null;
}
function mS(a) {
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
function lm(a, e) {
  if (ze(a, 0) !== 0) return !1;
  const { dice: t, ones: i } = mS(e);
  return t <= 0 ? !1 : i >= Math.ceil(t / 2);
}
function fS(a, e, t = 4) {
  return !!(a && ze(e, 0) >= ze(t, 4));
}
function vc(a, e) {
  const t = ze(e == null ? void 0 : e.successes, 0), i = om(a, 1), n = t >= i, s = t - i, r = fS(n, s, 4), o = lm(t, e == null ? void 0 : e.raw), l = nl(a), c = l.maxPerRoll ?? 1, u = l.enabled && s >= l.rate ? (() => {
    const { amount: m, rate: f } = al(s, { rate: l.rate, maxPerRoll: c }), p = ms(a);
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
function pS(a, e, t) {
  var m, f;
  const i = ze(e == null ? void 0 : e.successes, 0), n = ze(t == null ? void 0 : t.successes, 0), s = !!((m = a == null ? void 0 : a.opposed) != null && m.net), r = String(((f = a == null ? void 0 : a.opposed) == null ? void 0 : f.dnTies) ?? "stalemate");
  let o = null, l = !1;
  s ? (o = i - n, o > 0 ? l = !0 : o < 0 ? l = !1 : r === "attackerWins" ? l = !0 : l = !1) : i > n ? l = !0 : i < n ? l = !1 : r === "attackerWins" ? l = !0 : l = !1;
  const c = nl(a), u = c.maxPerRoll ?? 1, d = c.enabled && s && typeof o == "number" && o >= c.rate ? (() => {
    const { amount: p, rate: h } = al(o, { rate: c.rate, maxPerRoll: u }), g = ms(a);
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
function hS(a, e) {
  var h, g, y;
  const t = ze(e == null ? void 0 : e.successes, 0), i = om(a, 1), n = t >= i, s = lm(t, e == null ? void 0 : e.raw), r = uS(t, i), o = ((h = a == null ? void 0 : a.net) == null ? void 0 : h.convert) ?? ((g = a == null ? void 0 : a.allocation) == null ? void 0 : g.convert) ?? 0, l = nl(a), c = l.rate, u = dS({ convert: o, remainder: r, rate: c }), d = r - u, m = l.enabled && u >= c ? (() => {
    const { amount: b } = al(u, { rate: c, maxPerRoll: l.maxPerRoll }), S = ms(a);
    return b > 0 ? { amount: b, pool: S, reason: "convert4", details: { converted: u, rate: c } } : null;
  })() : null, f = s ? { amount: 1, pool: ms(a), reason: "critFail", details: { onesRule: "halfOrMoreOnes" } } : null, p = [];
  return m && p.push(m), f && p.push(f), p.length === 0 || (p.length === 1 ? p[0] : (p.reduce((b, S) => b + (Number(S == null ? void 0 : S.amount) || 0), 0), (y = p[0]) == null || y.pool)), {
    rollType: "net",
    passed: n,
    successes: t,
    difficulty: { dn: i },
    criticalFailure: s,
    tier: s ? "criticalFailure" : n ? "success" : "failure",
    net: {
      remainder: r,
      convertRequested: ze(o, 0),
      converted: u,
      value: d,
      // the actual net effect magnitude you apply (+net dice, etc.)
      rate: c,
      canConvert: r >= c
    },
    edgeEarned: m
  };
}
function gS(a, e) {
  var o, l, c, u;
  const t = ze(e == null ? void 0 : e.successes, 0), i = mr((o = a == null ? void 0 : a.extended) == null ? void 0 : o.target, 1, 1e4), n = mr((l = a == null ? void 0 : a.extended) == null ? void 0 : l.accumulated, 0, 1e4), s = mr(n + t, 0, 1e4), r = s >= i;
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
function cm(a, e, t = null) {
  var n;
  switch (String((a == null ? void 0 : a.rollType) ?? "simple")) {
    case "simple":
      return vc(a, e);
    case "opposed":
      return pS(a, e, t);
    case "net":
      return hS(a, e);
    case "extended":
      return gS(a, e);
    default: {
      const s = {
        ...a,
        difficulty: { dn: Number(((n = a == null ? void 0 : a.difficulty) == null ? void 0 : n.dn) ?? 1) || 1 }
      };
      return vc(s, e);
    }
  }
}
function yS(a, e) {
  var c, u, d, m, f, p, h, g, y;
  const t = a ?? {}, i = Array.isArray((c = t == null ? void 0 : t.modifiers) == null ? void 0 : c.applied) ? t.modifiers.applied : [], n = Number(((u = t == null ? void 0 : t.modifiers) == null ? void 0 : u.total) ?? 0);
  if (i.length) {
    const b = Array.isArray(t == null ? void 0 : t.breakdownRows) ? t.breakdownRows.find((S) => S.id === "mods.total") : null;
    e.metaRows.push({
      text: `Mods: ${i.map((S) => `${S.label} ${Mc(S.value)}`).join(", ")} (Total ${Mc(n)})`,
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
function Mc(a) {
  const e = Number(a ?? 0);
  return e >= 0 ? `+${e}` : `${e}`;
}
function bS(a, e) {
  var g, y, b, S, w, v, P, E, z, G, Y, q, Q, L, U, V, Z, re, be, ce, se, Oe, Fe, Ue, Ve, at, nt, st, rt, et, Ye, pt, bt, St;
  const t = a ?? {}, i = (t == null ? void 0 : t.attackResult) ?? null;
  if (!i) return;
  const n = Array.isArray(i == null ? void 0 : i.results) ? i.results : [], s = (i == null ? void 0 : i.summary) ?? AS(n), r = n.some((N) => {
    var H;
    return !!((H = N == null ? void 0 : N.queuedMutation) != null && H.applied);
  }), o = n.filter(
    (N) => (N == null ? void 0 : N.queuedMutation) && !N.queuedMutation.applied
  ), l = !!((y = (g = t == null ? void 0 : t.attack) == null ? void 0 : g.capabilityReport) != null && y.isTemplated), c = Array.isArray((b = t == null ? void 0 : t.modifiers) == null ? void 0 : b.applied) ? t.modifiers.applied : [], u = Number(((S = t == null ? void 0 : t.modifiers) == null ? void 0 : S.total) ?? 0);
  if (c.length) {
    const N = Array.isArray(t == null ? void 0 : t.breakdownRows) ? t.breakdownRows.find((H) => H.id === "mods.total") : null;
    e.metaRows.push({
      text: `Mods: ${c.map((H) => `${H.label} ${Sa(H.value)}`).join(", ")} (Total ${Sa(u)})`,
      title: (N == null ? void 0 : N.tooltip) ?? ""
    });
  }
  const d = (t == null ? void 0 : t.edge) ?? null, m = Array.isArray((w = t == null ? void 0 : t.roll) == null ? void 0 : w.failureDiceRefs) ? t.roll.failureDiceRefs : [], f = !!((v = d == null ? void 0 : d.availableActions) != null && v.canPostRerollFailures) && !r, p = Array.isArray((P = d == null ? void 0 : d.allowed) == null ? void 0 : P.postPools) ? d.allowed.postPools : [];
  if (d != null && d.domain && (e.edge = {
    domain: d.domain,
    earned: ((E = t == null ? void 0 : t.outcomeModel) == null ? void 0 : E.edgeEarned) ?? null,
    preSpent: Number(((z = d == null ? void 0 : d.pre) == null ? void 0 : z.spent) ?? 0),
    postSpent: Number(((G = d == null ? void 0 : d.post) == null ? void 0 : G.spent) ?? 0),
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
    for (const N of e.edge.postPools)
      e.actions.push({
        action: "edgePostReroll",
        label: `Spend ${N}`,
        dataset: { "pool-key": N },
        cssClass: "mwd-edge-post"
      });
  }
  const h = String((s == null ? void 0 : s.overallOutcome) ?? "").trim();
  if (e.outcomeText = n.length > 1 ? `ATTACK ${s.hits} HIT / ${s.grazes} GRAZE / ${s.misses} MISS` : h === "hit" ? "HIT!" : h === "graze" ? "GRAZE!" : "MISS!", e.metaRows.push({
    text: `Targets: ${n.length || 0}`,
    title: ""
  }), l && (e.targetRows = n.map((N, H) => {
    var He, tt, ct, Rt, ee, Te, ot, lt;
    const ge = ((He = t == null ? void 0 : t.areaEffectPreviewState) == null ? void 0 : He[N == null ? void 0 : N.previewKey]) ?? {}, ie = ((tt = N == null ? void 0 : N.damage) == null ? void 0 : tt.exposure) ?? (N == null ? void 0 : N.exposure) ?? null, Ie = String((ie == null ? void 0 : ie.initialLabel) ?? "NONE").trim() || "NONE", At = String((ie == null ? void 0 : ie.finalLabel) ?? Ie).trim() || Ie, M = Number(((ct = N == null ? void 0 : N.damage) == null ? void 0 : ct.incoming) ?? 0), R = Number(((Rt = N == null ? void 0 : N.damage) == null ? void 0 : Rt.scaledIncoming) ?? M), K = (N == null ? void 0 : N.queuedMutation) ?? null, Se = !!(K != null && K.applied || (ee = N == null ? void 0 : N.damageResult) != null && ee.applied), ue = (ge == null ? void 0 : ge.reactionPreview) ?? null, Pe = [];
    if (!Se && Ie !== "NONE" && ((Te = N == null ? void 0 : N.damageResult) != null && Te.ok) && !((ot = N == null ? void 0 : N.damageResult) != null && ot.skipped) && Pe.push({
      action: "toggleEvade",
      label: N != null && N.evadeActive ? "Clear Evade" : "Use Reaction",
      dataset: { "preview-key": N.previewKey },
      cssClass: `mwd-target-row__action ${N != null && N.evadeActive ? "is-active" : ""}`
    }), N != null && N.evadeActive && (ue != null && ue.canSpendEdge) && Array.isArray(ue.edgePools))
      for (const Qe of ue.edgePools)
        Pe.push({
          action: "toggleEvadeEdge",
          label: (ge == null ? void 0 : ge.edgePoolKey) === Qe.key ? `Edge: ${Qe.key}` : `Use ${Qe.key}`,
          dataset: {
            "preview-key": N.previewKey,
            "pool-key": Qe.key
          },
          cssClass: `mwd-target-row__action ${(ge == null ? void 0 : ge.edgePoolKey) === Qe.key ? "is-active" : ""}`
        });
    return K && !Se && Pe.push({
      action: "applyAttackDamage",
      label: "Apply Damage",
      dataset: { "result-index": String(H) },
      cssClass: "mwd-target-row__action mwd-apply-attack-damage"
    }), {
      targetName: ((lt = N == null ? void 0 : N.target) == null ? void 0 : lt.name) ?? "Target",
      applied: Se,
      outcomeLabel: String((N == null ? void 0 : N.outcome) ?? "miss").toUpperCase(),
      exposureLabel: Ie === At ? Ie : `${Ie} -> ${At}`,
      damageLabel: M === R ? String(R) : `${M} -> ${R}`,
      reactionHint: N != null && N.evadeActive ? ge != null && ge.edgePoolKey ? "Evade active. Reaction Burn canceled by Edge." : (ue == null ? void 0 : ue.burnDelta) > 0 ? `Evade active. This reaction adds +${ue.burnDelta} Burn.` : "Evade active." : "",
      rowActions: Pe
    };
  })), n.length > 1 && o.length > 1 && e.actions.push({
    action: "applyAllAttackDamage",
    label: `Apply All Damage (${o.length})`,
    cssClass: "mwd-apply-all-attack-damage"
  }), !l)
    for (const N of n) {
      const H = Number(((Q = (q = N == null ? void 0 : N.cq) == null ? void 0 : q.ar) == null ? void 0 : Q.total) ?? 0), ge = Number(((U = (L = N == null ? void 0 : N.cq) == null ? void 0 : L.dr) == null ? void 0 : U.total) ?? 0);
      e.metaRows.push({
        text: `${((V = N == null ? void 0 : N.target) == null ? void 0 : V.name) ?? "Target"}: ${String((N == null ? void 0 : N.outcome) ?? "miss").toUpperCase()} | CQ ${Sa(((Z = N == null ? void 0 : N.cq) == null ? void 0 : Z.value) ?? 0)} (AR ${H} - DR ${ge}) | Net ${Number((N == null ? void 0 : N.netHits) ?? 0)}`,
        title: SS(N == null ? void 0 : N.cq)
      });
    }
  if (!l)
    for (const [N, H] of n.entries()) {
      const ge = (H == null ? void 0 : H.damage) ?? null;
      ge && (H == null ? void 0 : H.outcome) !== "miss" && e.footerRows.push({
        text: `${((re = H == null ? void 0 : H.target) == null ? void 0 : re.name) ?? "Target"}: ${ge.damageTypeLabel} ${Sa(ge.effectiveWeaponDamage)} weapon${ge.netHits ? ` + ${ge.netHits} net` : ""}`,
        title: ""
      });
      const ie = (H == null ? void 0 : H.damageResult) ?? null;
      if (ie != null && ie.ok && !(ie != null && ie.skipped)) {
        const Ie = (H == null ? void 0 : H.queuedMutation) ?? (ie == null ? void 0 : ie.queuedMutation) ?? null, At = !!(Ie != null && Ie.applied || ie != null && ie.applied);
        if (ie.mode === "machineAttackDamage") {
          const M = ie.machine ?? {}, R = ie.hitLocation ?? {};
          e.footerRows.push({
            text: `${((be = H == null ? void 0 : H.target) == null ? void 0 : be.name) ?? "Target"}: Location ${R.locationLabel ?? "Location"}${R.rollTotal ? ` (${R.rollTotal})` : ""} | Armor ${Number(M.armorBefore ?? 0)} -> ${Number(M.armorAfter ?? 0)} | Structure ${Number(M.structureBefore ?? 0)} -> ${Number(M.structureAfter ?? 0)}`,
            title: ""
          }), (ce = ie.critical) != null && ce.automatic ? e.footerRows.push({
            text: `${((se = H == null ? void 0 : H.target) == null ? void 0 : se.name) ?? "Target"}: Automatic critical pending`,
            title: ""
          }) : (Oe = ie.critical) != null && Oe.optional ? e.footerRows.push({
            text: `${((Fe = H == null ? void 0 : H.target) == null ? void 0 : Fe.name) ?? "Target"}: Chaos Edge can convert this location hit to a critical`,
            title: ""
          }) : e.footerRows.push({
            text: `${((Ue = H == null ? void 0 : H.target) == null ? void 0 : Ue.name) ?? "Target"}: Location hit is descriptive only`,
            title: ""
          });
          for (const K of ((Ve = ie.critical) == null ? void 0 : Ve.records) ?? [])
            e.footerRows.push({
              text: `${((at = H == null ? void 0 : H.target) == null ? void 0 : at.name) ?? "Target"}: Critical - ${K.label}${K.locationLabel ? ` (${K.locationLabel})` : ""}`,
              title: ""
            }), K.active !== !1 && K.remedyKey !== "none" && e.actions.push({
              action: "machineCritRemedy",
              label: `Remedy: ${K.label}`,
              dataset: {
                "machine-actor-uuid": ((nt = H == null ? void 0 : H.target) == null ? void 0 : nt.actorUuid) ?? "",
                "crit-id": K.id,
                "remedy-key": K.remedyKey,
                "gm-override": "true"
              },
              cssClass: "mwd-machine-crit-remedy"
            });
        }
        Ie && !At && ((st = ie == null ? void 0 : ie.critical) != null && st.optional) && e.actions.push({
          action: "toggleMachineChaosCrit",
          label: (rt = Ie.payload) != null && rt.chaosCriticalSelected ? `Clear Chaos Critical: ${ie.actorName ?? ((et = H == null ? void 0 : H.target) == null ? void 0 : et.name) ?? "Target"}` : `Spend Chaos Edge: ${ie.actorName ?? ((Ye = H == null ? void 0 : H.target) == null ? void 0 : Ye.name) ?? "Target"}`,
          dataset: { "result-index": String(N) },
          cssClass: `mwd-toggle-machine-chaos ${(pt = Ie.payload) != null && pt.chaosCriticalSelected ? "is-active" : ""}`
        }), Ie && !At && e.actions.push({
          action: "applyAttackDamage",
          label: `Apply Damage: ${ie.actorName ?? ((bt = H == null ? void 0 : H.target) == null ? void 0 : bt.name) ?? "Target"}`,
          dataset: { "result-index": String(N) },
          cssClass: "mwd-apply-attack-damage"
        });
      } else ie != null && ie.reason && e.footerRows.push({
        text: `${((St = H == null ? void 0 : H.target) == null ? void 0 : St.name) ?? "Target"}: ${ie.reason}`,
        title: ""
      });
    }
}
function SS(a = {}) {
  var i, n;
  const e = Array.isArray((i = a == null ? void 0 : a.ar) == null ? void 0 : i.parts) ? a.ar.parts : [], t = Array.isArray((n = a == null ? void 0 : a.dr) == null ? void 0 : n.parts) ? a.dr.parts : [];
  return [
    ...e.map((s) => `AR - ${s.label}: ${Sa(s.value)}`),
    ...t.map((s) => `DR - ${s.label}: ${Sa(s.value)}`)
  ].join(`
`);
}
function AS(a = []) {
  const e = { hits: 0, grazes: 0, misses: 0 };
  for (const t of a)
    (t == null ? void 0 : t.outcome) === "hit" ? e.hits += 1 : (t == null ? void 0 : t.outcome) === "graze" ? e.grazes += 1 : e.misses += 1;
  return {
    ...e,
    overallOutcome: e.hits > 0 ? "hit" : e.grazes > 0 ? "graze" : "miss"
  };
}
function Sa(a) {
  const e = Number(a ?? 0);
  return e >= 0 ? `+${e}` : `${e}`;
}
function TS(a, e) {
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
function wS(a, e) {
  var l, c, u, d;
  const t = a ?? {}, i = (t == null ? void 0 : t.outcomeModel) ?? {}, n = Number(((l = i == null ? void 0 : i.attacker) == null ? void 0 : l.successes) ?? (i == null ? void 0 : i.attackerHits) ?? NaN), s = Number(((c = i == null ? void 0 : i.defender) == null ? void 0 : c.successes) ?? (i == null ? void 0 : i.defenderHits) ?? NaN), r = Number((i == null ? void 0 : i.netHits) ?? (i == null ? void 0 : i.net) ?? NaN);
  Number.isFinite(n) && Number.isFinite(s) && e.metaRows.push({ text: `Opposed: Att ${n} vs Def ${s} • Net ${Number.isFinite(r) ? r : n - s}` }), (u = t == null ? void 0 : t.incoming) != null && u.label && (e.incoming = { label: t.incoming.label, value: t.incoming.value ?? "" }, e.footerRows.push({ text: `Incoming: ${e.incoming.label} ${e.incoming.value}` }));
  const o = ((d = i == null ? void 0 : i.edgeEarned) == null ? void 0 : d.amount) > 0 ? i.edgeEarned : null;
  o && e.footerRows.push({ text: `Edge Earned: +${o.amount}${o.pool ? ` (${o.pool})` : ""}` });
}
function kS(a, e) {
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
const vS = {
  skill: yS,
  attack: bS,
  net: TS,
  opposed: wS,
  extended: kS
  // defense: enhanceDefense,
  // edge: enhanceEdge,
};
async function Ba({ resolved: a } = {}) {
  const e = a ?? {}, t = MS(e), i = vS[t.intent];
  return typeof i == "function" && i(e, t), await foundry.applications.handlebars.renderTemplate(
    "mwd.v2.roll.mwd-roll-card",
    t
  );
}
function MS(a) {
  var f, p, h, g, y, b, S, w, v, P, E, z, G, Y, q, Q, L;
  const e = a ?? {}, t = Number(((f = e == null ? void 0 : e.roll) == null ? void 0 : f.target) ?? 5), i = Number(((p = e == null ? void 0 : e.dn) == null ? void 0 : p.total) ?? ((g = (h = e == null ? void 0 : e.ctxSnapshot) == null ? void 0 : h.dn) == null ? void 0 : g.total) ?? ((b = (y = e == null ? void 0 : e.ctxSnapshot) == null ? void 0 : y.difficulty) == null ? void 0 : b.dn) ?? 0), n = Number(((S = e == null ? void 0 : e.roll) == null ? void 0 : S.pool) ?? 0), s = Number(((w = e == null ? void 0 : e.outcome) == null ? void 0 : w.hits) ?? 0), r = (e == null ? void 0 : e.outcomeModel) ?? {}, o = typeof r.passed == "boolean" ? r.passed : s >= i, l = Number.isFinite(Number(r.margin)) ? Number(r.margin) : s - i, c = r.tier ?? null, u = Array.isArray(e == null ? void 0 : e.breakdownRows) ? e.breakdownRows.map((U) => `${U.label}: ${U.value}`).join(`
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
  if ((v = e == null ? void 0 : e.specialization) != null && v.label && d.metaRows.push({
    text: `Specialization: ${e.specialization.label} (+${Number(e.specialization.value ?? 0)})`,
    title: ""
  }), (P = m == null ? void 0 : m.weapon) != null && P.name) {
    const U = ((E = m == null ? void 0 : m.weapon) == null ? void 0 : E.type) === "personalWeapon" || (z = m == null ? void 0 : m.weapon) != null && z.isSynthetic ? Os((m == null ? void 0 : m.rangeBand) ?? "") : String((m == null ? void 0 : m.rangeBand) ?? "").trim(), V = String(((G = m == null ? void 0 : m.weapon) == null ? void 0 : G.damageTypeLabel) ?? ((Y = m == null ? void 0 : m.weapon) == null ? void 0 : Y.damageType) ?? "").trim(), Z = String(((q = m == null ? void 0 : m.payload) == null ? void 0 : q.label) ?? ((Q = m == null ? void 0 : m.weapon) == null ? void 0 : Q.payloadLabel) ?? "").trim();
    d.metaRows.push({
      text: `Weapon: ${m.weapon.name}${U ? ` • Range: ${U}` : ""}${V ? ` • Type: ${V}` : ""}${Z ? ` • Payload: ${Z}` : ""}`,
      title: ""
    }), (L = m == null ? void 0 : m.sourceState) != null && L.isTracked && d.footerRows.push({
      text: `Source: ${Number(m.sourceState.current ?? 0)}/${Number(m.sourceState.max ?? 0)}`,
      title: ""
    });
  }
  return d;
}
async function Cc(a = "") {
  const e = String(a ?? "").trim();
  if (!e || typeof fromUuid != "function") return null;
  try {
    return await fromUuid(e);
  } catch {
    return null;
  }
}
async function um({
  machineActor: a = null,
  operatorActorUuid: e = ""
} = {}) {
  var r, o, l, c, u, d, m, f, p, h, g, y, b;
  const t = await Cc(e);
  if (t)
    return { actor: t, uuid: t.uuid ?? e, source: "explicit", reason: "" };
  const i = String(
    ((o = (r = a == null ? void 0 : a.system) == null ? void 0 : r.pilot) == null ? void 0 : o.uuid) ?? ((u = (c = (l = a == null ? void 0 : a.system) == null ? void 0 : l.mwd) == null ? void 0 : c.pilot) == null ? void 0 : u.uuid) ?? ((f = (m = (d = a == null ? void 0 : a.system) == null ? void 0 : d.mwd) == null ? void 0 : m.crew) == null ? void 0 : f.operatorActorUuid) ?? ((g = (h = (p = a == null ? void 0 : a.system) == null ? void 0 : p.mwd) == null ? void 0 : h.crew) == null ? void 0 : g.pilotActorUuid) ?? ""
  ).trim(), n = await Cc(i);
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
async function CS(a = "") {
  const e = String(a ?? "").trim();
  if (!e || typeof fromUuid != "function") return null;
  try {
    return await fromUuid(e);
  } catch {
    return null;
  }
}
function ES(a) {
  var e, t;
  return Array.isArray((t = (e = a == null ? void 0 : a.system) == null ? void 0 : e.mwd) == null ? void 0 : t.crits) ? a.system.mwd.crits.filter((i) => (i == null ? void 0 : i.active) !== !1) : [];
}
async function PS(a) {
  if (!(ES(a).length || !(a != null && a.toggleStatusEffect)))
    try {
      await Ns({
        actor: a,
        statusId: Dd,
        active: !1
      });
    } catch (e) {
      console.warn("MWD | Unable to clear machine critical status", e);
    }
}
async function dm(a = {}, e = {}) {
  var d, m, f, p, h;
  if (String((a == null ? void 0 : a.intent) ?? "") !== "machine_crit_remedy")
    return { ok: !1, reason: "Unsupported machine intent." };
  const t = await CS(a.machineActorUuid);
  if (!t) return { ok: !1, reason: "Machine actor could not be resolved." };
  const i = String(a.critId ?? "").trim(), n = Array.isArray((m = (d = t.system) == null ? void 0 : d.mwd) == null ? void 0 : m.crits) ? t.system.mwd.crits.slice() : [], s = n.findIndex((g) => String((g == null ? void 0 : g.id) ?? "") === i && (g == null ? void 0 : g.active) !== !1);
  if (s < 0) return { ok: !1, reason: "That critical effect is no longer active." };
  const r = n[s], o = Zo(a.remedyKey || r.remedyKey), l = !!(e.gmOverride ?? ((p = (f = globalThis.game) == null ? void 0 : f.user) == null ? void 0 : p.isGM)), c = await um({
    machineActor: t,
    operatorActorUuid: a.operatorActorUuid
  });
  if (!c.actor && !l)
    return { ok: !1, reason: c.reason || "No linked operator or pilot actor." };
  let u = { ok: !0, skipped: !0 };
  return c.actor && !l && (u = await (e.spendResource ?? B.spendResource.bind(B))(c.actor, {
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
  }, await t.update({ "system.mwd.crits": n }), await PS(t), {
    ok: !0,
    machineActor: t,
    operatorActor: c.actor,
    crit: n[s],
    remedy: o,
    spend: u
  });
}
function RS() {
  Hooks.on("renderChatMessageHTML", (a, e) => {
    e.addEventListener("click", (t) => {
      const i = t.target.closest("[data-mwd-action]");
      if (!i) return;
      const n = String(i.dataset.mwdAction || "").trim();
      n && (n === "edgePostReroll" && QS(t, a), n === "toggleEvade" && FS(t, a), n === "toggleEvadeEdge" && US(t, a), n === "toggleHazardEvade" && GS(t, a), n === "toggleHazardEvadeEdge" && qS(t, a), n === "applyHazardTick" && VS(t, a), n === "toggleMachineChaosCrit" && WS(t, a), n === "machineCritRemedy" && KS(t), n === "applyAttackDamage" && BS(t, a), n === "applyAllAttackDamage" && HS(t, a));
    });
  });
}
function NS(a = {}) {
  var t;
  return (Array.isArray((t = a == null ? void 0 : a.attackResult) == null ? void 0 : t.results) ? a.attackResult.results : []).some((i) => {
    var n;
    return !!((n = i == null ? void 0 : i.queuedMutation) != null && n.applied);
  });
}
function IS(a) {
  return a === A.monitors.physical ? "Physical" : a === A.monitors.fatigue ? "Fatigue" : String(a ?? "").trim() || "Track";
}
function DS(a) {
  const e = String(a ?? "").trim().toLowerCase();
  return e === "penetrating" ? "is-penetrating" : e === "energy" ? "is-energy" : e === "thermal" ? "is-thermal" : e === "electrical" ? "is-electrical" : "is-concussive";
}
function OS(a) {
  const e = Math.max(0, Number(a ?? 0) || 0);
  return e <= 0 ? { key: "is-none", label: "No Penetration" } : e <= 2 ? { key: "is-light", label: "Light Damage" } : e <= 4 ? { key: "is-medium", label: "Moderate Damage" } : e <= 7 ? { key: "is-heavy", label: "Heavy Damage" } : { key: "is-critical", label: "Critical Damage" };
}
function _S({ actor: a = null, token: e = null } = {}) {
  var s;
  const t = (e == null ? void 0 : e.document) ?? e ?? null, i = String(((s = t == null ? void 0 : t.texture) == null ? void 0 : s.src) ?? "").trim(), n = String((a == null ? void 0 : a.img) ?? "").trim();
  return i || n || "icons/svg/mystery-man.svg";
}
function LS(a) {
  var t, i;
  const e = (i = (t = game.settings) == null ? void 0 : t.get) == null ? void 0 : i.call(t, "core", "rollMode");
  return typeof ChatMessage.applyRollMode == "function" && ChatMessage.applyRollMode(a, e), a;
}
function xS({ summary: a = {}, actor: e = null, token: t = null } = {}) {
  const i = String((a == null ? void 0 : a.damageType) ?? "").trim(), n = Vt(i || "concussive") || "Damage", s = IS(a == null ? void 0 : a.track), r = Math.max(0, Number((a == null ? void 0 : a.finalDamage) ?? (a == null ? void 0 : a.appliedDelta) ?? 0) || 0), o = OS(r), l = r === 1 ? "1 point" : `${r} points`, c = String((a == null ? void 0 : a.actorName) ?? (e == null ? void 0 : e.name) ?? "Target").trim() || "Target", u = [];
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
    classes: ["mwd-damage-card", DS(i), o.key].join(" "),
    header: {
      left: "Damage Applied",
      right: s
    },
    target: {
      name: c,
      image: _S({ actor: e, token: t })
    },
    damageTypeLabel: n,
    severityLabel: o.label,
    impactValue: r,
    impactText: r > 0 ? `${n} damage applied to ${s}.` : `${n} damage did not penetrate.`,
    rows: u
  };
}
async function sl({ summary: a = {}, actor: e = null, token: t = null } = {}) {
  const i = await foundry.applications.handlebars.renderTemplate(
    "mwd.v2.roll.mwd-damage-application-card",
    xS({ summary: a, actor: e, token: t })
  ), n = LS({
    speaker: ChatMessage.getSpeaker({ actor: e, token: t }),
    content: i
  });
  return ChatMessage.create(n);
}
function $S(a = {}) {
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
async function mm(a = {}, e = null) {
  var s, r, o;
  const t = $S(a), i = Number(((s = a == null ? void 0 : a.outcome) == null ? void 0 : s.hits) ?? 0) || 0, n = ((r = a == null ? void 0 : a.outcomeModel) == null ? void 0 : r.edgeEarned) ?? null;
  return a.outcomeModel = cm(t, { successes: i, raw: (o = a == null ? void 0 : a.roll) == null ? void 0 : o.json }, null), a.outcomeModel.edgeEarned = n, t.intent === "attack" && e && t.attack && (a.attackResult = await rm({
    attacker: e,
    ctx: t,
    outcomeModel: a.outcomeModel,
    previewState: a.areaEffectPreviewState ?? {},
    existingAttackResult: a.attackResult ?? null
  })), a;
}
async function BS(a, e) {
  var o, l, c, u, d, m, f;
  a.preventDefault();
  const t = a.target.closest("[data-mwd-action='applyAttackDamage']"), i = Number((o = t == null ? void 0 : t.dataset) == null ? void 0 : o.resultIndex);
  if (!Number.isInteger(i) || i < 0) return;
  const n = foundry.utils.deepClone((c = (l = e == null ? void 0 : e.flags) == null ? void 0 : l.mwd) == null ? void 0 : c.resolved);
  if (!n) return;
  const s = await fm(n, i);
  if (!s.ok) {
    (d = (u = ui.notifications) == null ? void 0 : u.warn) == null || d.call(u, s.reason ?? "Unable to apply attack damage.");
    return;
  }
  if (s.skipped) {
    (f = (m = ui.notifications) == null ? void 0 : m.info) == null || f.call(m, s.reason ?? "That attack damage has already been applied.");
    return;
  }
  const r = await Ba({ resolved: n });
  await e.update({
    content: r,
    "flags.mwd.resolved": n
  }), await sl({
    summary: s.summary,
    actor: s.targetActor,
    token: s.targetToken
  });
}
async function rl(a = {}) {
  var i, n;
  const e = (i = a == null ? void 0 : a.target) != null && i.actorUuid ? await fromUuid(a.target.actorUuid) : null, t = (n = a == null ? void 0 : a.target) != null && n.tokenUuid ? await fromUuid(a.target.tokenUuid) : null;
  return js({
    actor: e,
    token: t,
    edgePoolKey: (a == null ? void 0 : a.evadeEdgePoolKey) ?? ""
  });
}
function zS(a = "") {
  var e, t;
  return ((t = (e = game.messages) == null ? void 0 : e.get) == null ? void 0 : t.call(e, String(a ?? "").trim())) ?? null;
}
async function js({ actor: a = null, token: e = null, actorUuid: t = "", tokenUuid: i = "", edgePoolKey: n = "" } = {}) {
  const s = a ?? (t ? await fromUuid(t) : null), r = e ?? (i ? await fromUuid(i) : null);
  return s ? {
    ...B.getReactionSpendPreview(s, { token: r, edgePoolKey: n }) ?? {},
    actor: s,
    token: r
  } : null;
}
async function ol(a, e) {
  var s, r;
  const t = foundry.utils.deepClone((r = (s = a == null ? void 0 : a.flags) == null ? void 0 : s.mwd) == null ? void 0 : r.resolved);
  if (!t) return;
  await e(t);
  const i = await fromUuid(t.actorUuid);
  if (!i) return;
  await mm(t, i);
  const n = await Ba({ resolved: t });
  return await a.update({
    content: n,
    "flags.mwd.resolved": t
  }), t;
}
async function ll(a, e, { active: t = !1, edgePoolKey: i = "" } = {}) {
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
async function FS(a, e) {
  var r, o;
  a.preventDefault();
  const t = a.target.closest("[data-mwd-action='toggleEvade']"), i = String(((r = t == null ? void 0 : t.dataset) == null ? void 0 : r.previewKey) ?? "").trim();
  if (!i) return;
  const n = await ol(e, async (l) => {
    var f;
    if (l.areaEffectPreviewState ?? (l.areaEffectPreviewState = {}), !!(l.areaEffectPreviewState[i] ?? {}).evadeActive) {
      delete l.areaEffectPreviewState[i];
      return;
    }
    l.areaEffectPreviewState[i] = {
      evadeActive: !0,
      edgePoolKey: null
    };
    const d = (Array.isArray((f = l == null ? void 0 : l.attackResult) == null ? void 0 : f.results) ? l.attackResult.results : []).find((p) => (p == null ? void 0 : p.previewKey) === i) ?? null, m = d ? await rl({ ...d, evadeEdgePoolKey: null }) : null;
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
  n && s && await ll(e, s, {
    active: !!(s != null && s.evadeActive),
    edgePoolKey: String((s == null ? void 0 : s.evadeEdgePoolKey) ?? "").trim()
  });
}
async function US(a, e) {
  var o, l, c;
  a.preventDefault();
  const t = a.target.closest("[data-mwd-action='toggleEvadeEdge']"), i = String(((o = t == null ? void 0 : t.dataset) == null ? void 0 : o.previewKey) ?? "").trim(), n = String(((l = t == null ? void 0 : t.dataset) == null ? void 0 : l.poolKey) ?? "").trim();
  if (!i) return;
  const s = await ol(e, async (u) => {
    var h;
    u.areaEffectPreviewState ?? (u.areaEffectPreviewState = {});
    const d = u.areaEffectPreviewState[i] ?? {}, m = d.edgePoolKey === n ? null : n;
    u.areaEffectPreviewState[i] = {
      ...d,
      evadeActive: !0,
      edgePoolKey: m
    };
    const f = (Array.isArray((h = u == null ? void 0 : u.attackResult) == null ? void 0 : h.results) ? u.attackResult.results : []).find((g) => (g == null ? void 0 : g.previewKey) === i) ?? null, p = f ? await rl({ ...f, evadeEdgePoolKey: m }) : null;
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
  s && r && await ll(e, r, {
    active: !!(r != null && r.evadeActive),
    edgePoolKey: String((r == null ? void 0 : r.evadeEdgePoolKey) ?? "").trim()
  });
}
async function HS(a, e) {
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
    const S = await fm(t, b);
    S.ok && S.applied ? (s += 1, o.push(S)) : S.ok || r.push(S.reason ?? `Target ${b + 1} failed.`);
  }
  if (s <= 0) {
    (h = (p = ui.notifications) == null ? void 0 : p.warn) == null || h.call(p, r[0] ?? "Unable to apply queued attack damage.");
    return;
  }
  const l = await Ba({ resolved: t });
  await e.update({
    content: l,
    "flags.mwd.resolved": t
  });
  for (const b of o)
    await sl({
      summary: b.summary,
      actor: b.targetActor,
      token: b.targetToken
    });
  r.length && ((y = (g = ui.notifications) == null ? void 0 : g.warn) == null || y.call(g, `Applied ${s} queued damage result${s === 1 ? "" : "s"}; ${r.length} failed.`));
}
async function fm(a, e) {
  var l, c, u, d, m, f, p, h, g;
  const t = ((c = (l = a == null ? void 0 : a.attackResult) == null ? void 0 : l.results) == null ? void 0 : c[e]) ?? null, i = (t == null ? void 0 : t.queuedMutation) ?? null;
  if (!i)
    return { ok: !1, reason: "No queued attack damage to apply." };
  if (i.applied)
    return { ok: !0, skipped: !0, reason: "That attack damage has already been applied." };
  let n = null, s = null, r = null;
  try {
    if (s = (u = i.target) != null && u.actorUuid ? await fromUuid(i.target.actorUuid) : null, r = (d = i.target) != null && d.tokenUuid ? await fromUuid(i.target.tokenUuid) : null, t != null && t.evadeActive && s) {
      const y = await B.commitReactionSpend(s, {
        token: r,
        actionId: "evade",
        actionLabel: "Evade",
        actionCategory: "reaction",
        logLabel: `Evade: ${((m = i.target) == null ? void 0 : m.name) ?? ((f = t == null ? void 0 : t.target) == null ? void 0 : f.name) ?? "Target"}`,
        edgePoolKey: String((t == null ? void 0 : t.evadeEdgePoolKey) ?? "").trim()
      });
      if (!(y != null && y.ok))
        return { ok: !1, reason: (y == null ? void 0 : y.reason) ?? "Unable to spend the Evade reaction." };
      await B.clearPendingReaction(s, { token: r });
    }
    if (((p = i.payload) == null ? void 0 : p.mode) === "machineAttackDamage" && ((h = i.payload) != null && h.chaosCriticalSelected)) {
      const y = await jS({
        machineActor: s,
        operatorActorUuid: (g = i.payload) == null ? void 0 : g.operatorActorUuid
      });
      if (!y.ok) return y;
    }
    n = await Pt.apply({
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
  const o = ba(
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
async function jS({ machineActor: a = null, operatorActorUuid: e = "" } = {}) {
  var s, r, o, l, c, u, d, m;
  const t = await um({ machineActor: a, operatorActorUuid: e });
  if (!t.actor)
    return (s = game.user) != null && s.isGM ? { ok: !0, gmOverride: !0 } : { ok: !1, reason: t.reason || "No linked operator or pilot actor for Chaos Edge." };
  const i = A.counters.edgePools.chaos, n = Number(((o = (r = t.actor).getRemainingEdge) == null ? void 0 : o.call(r, i)) ?? ((c = (l = t.actor).getEdgePoolValue) == null ? void 0 : c.call(l, i)) ?? 0);
  return n <= 0 && !((u = game.user) != null && u.isGM) ? { ok: !1, reason: `${t.actor.name ?? "Operator"} has no Chaos Edge remaining.` } : (n > 0 && await ((m = (d = t.actor).spendEdge) == null ? void 0 : m.call(d, i, 1, { source: "machineChaosCritical" })), { ok: !0, operatorActor: t.actor });
}
async function WS(a, e) {
  var m, f, p, h, g, y;
  a.preventDefault();
  const t = a.target.closest("[data-mwd-action='toggleMachineChaosCrit']"), i = Number(((m = t == null ? void 0 : t.dataset) == null ? void 0 : m.resultIndex) ?? -1), n = foundry.utils.deepClone(e.getFlag("mwd", "resolved")), s = ((p = (f = n == null ? void 0 : n.attackResult) == null ? void 0 : f.results) == null ? void 0 : p[i]) ?? null, r = (s == null ? void 0 : s.queuedMutation) ?? null;
  if (!r || r.applied || ((h = r.payload) == null ? void 0 : h.mode) !== "machineAttackDamage") return;
  r.payload.chaosCriticalSelected = !r.payload.chaosCriticalSelected;
  const o = (g = r.target) != null && g.actorUuid ? await fromUuid(r.target.actorUuid) : null, l = (y = r.target) != null && y.tokenUuid ? await fromUuid(r.target.tokenUuid) : null, c = await Pt.apply({
    actor: o,
    token: l,
    payload: r.payload,
    options: {
      actorId: (o == null ? void 0 : o.id) ?? "",
      dryRun: !0,
      logToChat: !1
    }
  }), u = ba(
    c,
    (s == null ? void 0 : s.target) ?? r.target ?? {},
    (s == null ? void 0 : s.damage) ?? {},
    { queued: !0, applied: !1 }
  );
  r.preview = u, s.queuedMutation = r, s.damageResult = u;
  const d = await Ba({ resolved: n });
  await e.update({
    content: d,
    "flags.mwd.resolved": n
  });
}
async function KS(a, e) {
  var s, r, o, l, c, u, d, m, f, p, h;
  a.preventDefault();
  const t = a.target.closest("[data-mwd-action='machineCritRemedy']"), i = {
    intent: "machine_crit_remedy",
    machineActorUuid: ((s = t == null ? void 0 : t.dataset) == null ? void 0 : s.machineActorUuid) ?? "",
    critId: ((r = t == null ? void 0 : t.dataset) == null ? void 0 : r.critId) ?? "",
    remedyKey: ((o = t == null ? void 0 : t.dataset) == null ? void 0 : o.remedyKey) ?? "",
    operatorActorUuid: ((l = t == null ? void 0 : t.dataset) == null ? void 0 : l.operatorActorUuid) ?? ""
  }, n = await dm(i, {
    gmOverride: !!((c = game.user) != null && c.isGM && ((u = t == null ? void 0 : t.dataset) == null ? void 0 : u.gmOverride) === "true")
  });
  if (!n.ok) {
    (m = (d = ui.notifications) == null ? void 0 : d.warn) == null || m.call(d, n.reason ?? "Unable to resolve machine critical remedy.");
    return;
  }
  (h = (f = ui.notifications) == null ? void 0 : f.info) == null || h.call(f, `Resolved ${((p = n.crit) == null ? void 0 : p.label) ?? "machine critical"}.`);
}
async function pm(a, e) {
  const t = e != null && e.actorUuid ? await fromUuid(e.actorUuid) : null, i = e != null && e.tokenUuid ? await fromUuid(e.tokenUuid) : null, n = await ud(e, { actor: t, token: i });
  return await a.update({
    content: n,
    "flags.mwd.hazardCard": e
  }), e;
}
async function cl(a, e) {
  var i, n;
  const t = Go(foundry.utils.deepClone(((n = (i = a == null ? void 0 : a.flags) == null ? void 0 : i.mwd) == null ? void 0 : n.hazardCard) ?? {}));
  return t != null && t.actorUuid ? (await e(t), await pm(a, t), t) : null;
}
async function ul(a, e, { active: t = !1, edgePoolKey: i = "" } = {}) {
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
async function GS(a, e) {
  var i, n;
  a.preventDefault();
  const t = await cl(e, async (s) => {
    var l, c, u;
    const r = !((l = s == null ? void 0 : s.preview) != null && l.evadeActive), o = No(xi({
      tier: ((c = s == null ? void 0 : s.exposure) == null ? void 0 : c.initialTier) ?? "none"
    }), {
      active: r,
      locked: !!((u = s == null ? void 0 : s.exposure) != null && u.evadeLocked)
    });
    if (s.preview ?? (s.preview = {}), s.preview.evadeActive = r, s.preview.edgePoolKey = null, s.preview.finalTier = o.finalTier, s.damageAfter = Xi(s.baseDamage ?? 0, o.finalTier), r) {
      const d = await js({
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
  t && await ul(e, t, {
    active: !!((i = t == null ? void 0 : t.preview) != null && i.evadeActive),
    edgePoolKey: String(((n = t == null ? void 0 : t.preview) == null ? void 0 : n.edgePoolKey) ?? "").trim()
  });
}
async function qS(a, e) {
  var s, r, o;
  a.preventDefault();
  const t = a.target.closest("[data-mwd-action='toggleHazardEvadeEdge']"), i = String(((s = t == null ? void 0 : t.dataset) == null ? void 0 : s.poolKey) ?? "").trim(), n = await cl(e, async (l) => {
    l.preview ?? (l.preview = {}), l.preview.evadeActive = !0, l.preview.edgePoolKey = l.preview.edgePoolKey === i ? null : i;
    const c = await js({
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
  n && await ul(e, n, {
    active: !!((r = n == null ? void 0 : n.preview) != null && r.evadeActive),
    edgePoolKey: String(((o = n == null ? void 0 : n.preview) == null ? void 0 : o.edgePoolKey) ?? "").trim()
  });
}
async function VS(a, e) {
  var u, d, m, f, p, h, g, y, b, S, w, v, P, E, z, G, Y, q, Q, L, U;
  a.preventDefault();
  const t = Go(foundry.utils.deepClone(((d = (u = e == null ? void 0 : e.flags) == null ? void 0 : u.mwd) == null ? void 0 : d.hazardCard) ?? {}));
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
    const V = await B.commitReactionSpend(i, {
      token: n,
      actionId: "evade",
      actionLabel: "Evade",
      actionCategory: "reaction",
      logLabel: `Evade: ${t.regionName}`,
      edgePoolKey: String(((y = t.preview) == null ? void 0 : y.edgePoolKey) ?? "").trim(),
      allowCurrentTurn: !0
    });
    if (!(V != null && V.ok)) {
      (S = (b = ui.notifications) == null ? void 0 : b.warn) == null || S.call(b, (V == null ? void 0 : V.reason) ?? "Unable to spend the Evade reaction.");
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
  }, r = await Pt.apply({
    actor: i,
    token: n,
    payload: s,
    options: {
      actorId: i.id,
      logToChat: !1
    }
  });
  if (!(r != null && r.ok)) {
    (P = (v = ui.notifications) == null ? void 0 : v.warn) == null || P.call(v, (r == null ? void 0 : r.reason) ?? "Unable to apply hazard damage.");
    return;
  }
  const o = B.getSnapshot(i, { token: n }), l = ((E = o == null ? void 0 : o.hazards) == null ? void 0 : E[t.regionId]) ?? {}, c = $e(t.nextTier, t.exposure.finalTier);
  await B.setHazardState(i, {
    token: n,
    regionId: t.regionId,
    hazardState: {
      ...l,
      tier: c,
      turnsExposed: Math.max(Number((l == null ? void 0 : l.turnsExposed) ?? 0), Number(t.turnsExposed ?? 0)) + 1,
      lastProcessedRound: Number(((z = o == null ? void 0 : o.combat) == null ? void 0 : z.round) ?? 0) || 0,
      evadeLocked: !!(l != null && l.evadeLocked) || !!(((G = t.exposure) == null ? void 0 : G.initialTier) === "full" && ((Y = t.preview) == null ? void 0 : Y.finalTier) === "major" && ((q = t.preview) != null && q.evadeActive))
    }
  }), c === "full" && Number((t == null ? void 0 : t.onFullBurnDelta) ?? 0) > 0 && await i.update({
    "system.burn.value": Math.max(0, Number(((L = (Q = i.system) == null ? void 0 : Q.burn) == null ? void 0 : L.value) ?? 0) + Number(t.onFullBurnDelta ?? 0))
  }), await B.clearPendingReaction(i, { token: n }), t.applied = !0, t.applyReason = "Applied", await pm(e, t), await sl({
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
      notes: `Hazard exposure ${t.exposure.initialLabel}${(U = t.preview) != null && U.evadeActive ? ` -> ${String(t.preview.finalTier ?? "").toUpperCase()}` : ""}`
    },
    actor: i,
    token: n
  });
}
async function YS(a, { token: e = null } = {}) {
  var s, r;
  const t = B.getSnapshot(a, { token: e }), i = (t == null ? void 0 : t.pendingReaction) ?? null;
  if (!(i != null && i.messageId))
    return { ok: !1, reason: "Use an area effect or hazard card to trigger Evade." };
  const n = zS(i.messageId);
  if (!n)
    return await B.clearPendingReaction(a, { token: e }), { ok: !1, reason: "The pending Evade card is no longer available." };
  if (i.sourceKind === "attack") {
    const o = String(i.sourceId ?? "").trim();
    if (!o) return { ok: !1, reason: "Pending Evade target is missing." };
    const l = await ol(n, async (u) => {
      var f;
      u.areaEffectPreviewState ?? (u.areaEffectPreviewState = {}), u.areaEffectPreviewState[o] = {
        ...u.areaEffectPreviewState[o] ?? {},
        evadeActive: !0,
        edgePoolKey: i.edgePoolKey ?? null
      };
      const d = (Array.isArray((f = u == null ? void 0 : u.attackResult) == null ? void 0 : f.results) ? u.attackResult.results : []).find((p) => (p == null ? void 0 : p.previewKey) === o) ?? null, m = d ? await rl({ ...d, evadeEdgePoolKey: i.edgePoolKey ?? "" }) : null;
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
    return c && await ll(n, c, {
      active: !0,
      edgePoolKey: String((c == null ? void 0 : c.evadeEdgePoolKey) ?? i.edgePoolKey ?? "").trim()
    }), { ok: !0 };
  }
  if (i.sourceKind === "hazard") {
    const o = await cl(n, async (l) => {
      var d, m;
      const c = No(xi({
        tier: ((d = l == null ? void 0 : l.exposure) == null ? void 0 : d.initialTier) ?? "none"
      }), {
        active: !0,
        locked: !!((m = l == null ? void 0 : l.exposure) != null && m.evadeLocked)
      });
      l.preview ?? (l.preview = {}), l.preview.evadeActive = !0, l.preview.edgePoolKey = l.preview.edgePoolKey ?? i.edgePoolKey ?? null, l.preview.finalTier = c.finalTier, l.damageAfter = Xi(l.baseDamage ?? 0, c.finalTier);
      const u = await js({
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
    return o && await ul(n, o, {
      active: !0,
      edgePoolKey: String(((r = o == null ? void 0 : o.preview) == null ? void 0 : r.edgePoolKey) ?? i.edgePoolKey ?? "").trim()
    }), { ok: !0 };
  }
  return { ok: !1, reason: "That Evade source is not supported." };
}
async function QS(a, e) {
  var p, h, g, y, b, S, w, v, P, E, z, G, Y, q, Q, L, U, V, Z;
  a.preventDefault();
  const t = a.target.closest("[data-mwd-action='edgePostReroll']"), i = String(((p = t == null ? void 0 : t.dataset) == null ? void 0 : p.poolKey) ?? "").trim();
  if (!i) return;
  const n = foundry.utils.deepClone((g = (h = e == null ? void 0 : e.flags) == null ? void 0 : h.mwd) == null ? void 0 : g.resolved);
  if (!n) return;
  if (NS(n)) {
    (b = (y = ui.notifications) == null ? void 0 : y.warn) == null || b.call(y, "Post-roll Edge is disabled after attack damage has been applied.");
    return;
  }
  if (Number(((w = (S = n == null ? void 0 : n.edge) == null ? void 0 : S.post) == null ? void 0 : w.spent) ?? 0) === 1) return;
  if (!(Array.isArray((P = (v = n == null ? void 0 : n.edge) == null ? void 0 : v.allowed) == null ? void 0 : P.postPools) ? n.edge.allowed.postPools : []).includes(i)) {
    (z = (E = ui.notifications) == null ? void 0 : E.warn) == null || z.call(E, `Post-spend pool not allowed: ${i}`);
    return;
  }
  const r = Array.isArray((G = n == null ? void 0 : n.roll) == null ? void 0 : G.failureDiceRefs) ? n.roll.failureDiceRefs : [];
  if (r.length <= 0) {
    (q = (Y = ui.notifications) == null ? void 0 : Y.info) == null || q.call(Y, "No failures to reroll.");
    return;
  }
  const o = await fromUuid(n.actorUuid);
  if (!o) {
    (L = (Q = ui.notifications) == null ? void 0 : Q.warn) == null || L.call(Q, "Actor not found for this roll.");
    return;
  }
  await ((U = o.spendEdge) == null ? void 0 : U.call(o, i, 1));
  const l = Number(((V = n == null ? void 0 : n.roll) == null ? void 0 : V.target) ?? 5), u = (Z = (await new Roll(`${r.length}d6cs>=${l}`).evaluate()).dice) == null ? void 0 : Z[0], d = Array.isArray(u == null ? void 0 : u.results) ? u.results : [], m = d.filter((re) => re.success).length;
  n.outcome = n.outcome ?? {}, n.outcome.hits = Number(n.outcome.hits ?? 0) + m, n.edge = n.edge ?? {}, n.edge.post = { poolKey: i, spent: 1 }, n.edge.availableActions = {
    ...n.edge.availableActions ?? {},
    canSpendPost: !1,
    canPostRerollFailures: !1
  }, n.roll = n.roll ?? {}, n.roll.diceGroups = Array.isArray(n.roll.diceGroups) ? n.roll.diceGroups : [], n.roll.diceGroups.push({
    id: "post",
    label: "Post Reroll",
    faces: 6,
    termIndex: null,
    dice: d.map((re, be) => {
      const ce = Number(re.result), se = !!re.success;
      return {
        ref: `post:${be}`,
        face: ce,
        isSuccess: se,
        isFailure: !se,
        tooltip: se ? `Post die ${be + 1}: ${ce} (Success vs TN ${l})` : `Post die ${be + 1}: ${ce} (Failure vs TN ${l})`
      };
    })
  }), await mm(n, o);
  const f = await Ba({ resolved: n });
  await e.update({
    content: f,
    "flags.mwd.resolved": n,
    "flags.mwd.payload.edge.post": { poolKey: i, spent: 1 }
  });
}
const dl = `${T}.ownedWeaponAttack`;
let Ec = !1;
function JS(a, e = null) {
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
function XS(a, e = null) {
  return e ?? (a == null ? void 0 : a.token) ?? B.getCurrentSceneTokenDocument(a) ?? null;
}
function hm(a) {
  const e = String((a == null ? void 0 : a.uuid) ?? "").trim();
  return e ? {
    type: dl,
    uuid: e,
    name: String((a == null ? void 0 : a.name) ?? "Weapon").trim() || "Weapon",
    img: (a == null ? void 0 : a.img) ?? "icons/svg/sword.svg"
  } : null;
}
async function Ws({ weapon: a, event: e = null, token: t = null } = {}) {
  var i, n, s, r, o;
  try {
    if (!((i = a == null ? void 0 : a.isPersonalWeapon) != null && i.call(a)))
      throw new Error("Attack requires an owned personal weapon.");
    const l = a.actor ?? null;
    if (!l)
      throw new Error("Attack requires an owned personal weapon.");
    const c = XS(l, t), { payload: u, hasAim: d } = JS(a, c), m = ((n = game.mwd) == null ? void 0 : n.roll) ?? ((r = (s = game.system) == null ? void 0 : s.mwd) == null ? void 0 : r.roll);
    if (!(m != null && m.execute))
      throw new Error("MWD roll system not initialized.");
    const f = await m.execute({ actor: l, payload: u, event: e });
    if (f) {
      d && await B.clearAim(l, { token: c });
      const p = B.getSnapshot(l, { token: c });
      if (p != null && p.hasCombatant) {
        const h = await B.spendResource(l, {
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
    return console.error("MWD | Failed to launch weapon attack", l), Ji(l, "Unable to attack with that weapon."), null;
  }
}
async function ZS(a, { event: e = null } = {}) {
  var n, s;
  const t = String(a ?? "").trim();
  if (!t)
    return (n = ui.notifications) == null || n.warn("That weapon shortcut is missing its item reference."), null;
  const i = await fromUuid(t);
  return i ? Ws({ weapon: i, event: e }) : ((s = ui.notifications) == null || s.warn("That weapon shortcut could not find its source item."), null);
}
function eA(a) {
  return `(async () => {
  const attacks = game.mwd?.attacks;
  if (!attacks?.attackWeaponByUuid) {
    return ui.notifications?.error("MWD attack shortcuts are not available right now.");
  }
  await attacks.attackWeaponByUuid(${JSON.stringify(String(a ?? "").trim())});
})();`;
}
async function tA(a, e) {
  var r, o, l, c;
  const t = String((a == null ? void 0 : a.uuid) ?? "").trim();
  if (!t) return;
  const i = String((a == null ? void 0 : a.name) ?? "Weapon Attack").trim() || "Weapon Attack", n = eA(t);
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
function gm(a, e, t) {
  return (e == null ? void 0 : e.type) !== dl ? !0 : (tA(e, t), !1);
}
function ym() {
  Ec || (Ec = !0, Hooks.on("hotbarDrop", gm));
}
const Pc = {
  HOTBAR_ATTACK_TYPE: dl,
  getOwnedWeaponAttackDragData: hm,
  launchOwnedWeaponAttack: Ws,
  attackWeaponByUuid: ZS,
  handleWeaponAttackHotbarDrop: gm,
  registerWeaponAttackHotbarHook: ym
};
function Ee(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function iA(a) {
  return String(a ?? "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
function Yn(a, e = 180) {
  const t = iA(a);
  return t ? t.length <= e ? t : `${t.slice(0, Math.max(0, e - 3)).trim()}...` : "";
}
function gi(a = []) {
  return a.map((e) => String(e ?? "").trim()).filter(Boolean);
}
function Ja(a = []) {
  return a.filter((e) => e && e.value !== void 0 && e.value !== null && String(e.value).trim() !== "").map((e) => ({
    label: String(e.label ?? "").trim(),
    value: String(e.value ?? "").trim(),
    emphasis: e.emphasis ?? ""
  }));
}
function Qn(a = []) {
  return gi(a).map((e) => ({ label: e }));
}
function Jn(a = []) {
  return a.filter((e) => e && e.value !== void 0 && e.value !== null && String(e.value).trim() !== "").map((e) => ({
    label: String(e.label ?? "").trim(),
    value: String(e.value ?? "").trim()
  }));
}
const aA = {
  penetrating: "Penetrating",
  concussive: "Concussive",
  energy: "Energy",
  thermal: "Thermal",
  electrical: "Electrical"
}, nA = {
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
}, sA = {
  ammo: "Ammunition",
  explosive: "Explosive",
  medical: "Medical",
  repair: "Repair",
  fuel: "Fuel / Power Cell",
  utility: "Utility"
};
function Rc(a) {
  const e = Number(a ?? 0) || 0;
  return e > 0 ? `+${e}` : `${e}`;
}
function Nc({
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
  var p, h, g, y, b, S, w;
  const c = Math.max(0, Math.trunc(Ee(((p = a == null ? void 0 : a.system) == null ? void 0 : p.quantity) ?? 1, 1))), u = Math.max(0, Math.trunc(Ee(((h = a == null ? void 0 : a.system) == null ? void 0 : h.rating) ?? 0, 0))), d = gi(((g = a == null ? void 0 : a.system) == null ? void 0 : g.tags) ?? []), m = String(((y = a == null ? void 0 : a.system) == null ? void 0 : y.category) ?? "").trim(), f = n[m] ?? m;
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
    summaryStats: Ja([
      { label: "Qty", value: c, emphasis: "strong" },
      { label: s, value: u }
    ]),
    detailTags: Qn([
      r,
      ...d,
      (b = a == null ? void 0 : a.system) != null && b.inactive ? "Inactive" : ""
    ]),
    detailRows: Jn([
      { label: "Quantity", value: c },
      { label: s, value: u },
      { label: "Source", value: ((S = a == null ? void 0 : a.system) == null ? void 0 : S.sourceReference) ?? "" },
      { label: "Category", value: f },
      { label: "Tags", value: d.join(", ") }
    ]),
    detailText: Yn((w = a == null ? void 0 : a.system) == null ? void 0 : w.description),
    quantity: c,
    canAdjustQuantity: o
  };
}
function rA({ defenseBonus: a = 0, mitigationByType: e = {} } = {}) {
  const t = [], i = Number(a ?? 0) || 0;
  i !== 0 && t.push(`Defense ${Rc(i)}`);
  for (const [n, s] of Object.entries(aA)) {
    const r = Number((e == null ? void 0 : e[n]) ?? 0) || 0;
    r !== 0 && t.push(`${s} ${Rc(r)}`);
  }
  return t.join(" | ");
}
function oA(a = {}, e = ["close", "near", "far", "extreme"]) {
  return e.map((t) => {
    const i = Ee(a == null ? void 0 : a[t], 0);
    return `${t.charAt(0).toUpperCase() + t.slice(1)} ${i}`;
  }).join(" | ");
}
function lA(a = {}) {
  return ["close", "near", "far", "extreme"].map((e) => `${e.charAt(0).toUpperCase()}${Ee(a == null ? void 0 : a[e], 0)}`).join(" ");
}
function cA(a = "") {
  const e = String(a ?? "").trim().toLowerCase();
  return e ? e.charAt(0).toUpperCase() + e.slice(1) : "";
}
function Tt(a) {
  return String(a ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
async function Ic({ title: a, label: e, options: t = [], confirmLabel: i = "Select" } = {}) {
  const n = Array.isArray(t) ? t.filter((r) => r == null ? void 0 : r.value) : [];
  if (!n.length) return "";
  if (n.length === 1) return String(n[0].value ?? "").trim();
  const s = `<form class="mwd-quick-select"><div class="mwd-field"><label>${Tt(e)}</label><select name="selection">${n.map((r) => `<option value="${Tt(r.value)}">${Tt(r.label ?? r.value)}</option>`).join("")}</select></div></form>`;
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
var _t, Pi, Gi, jt, Ca, Ri, D, bm, Sm, ao, Xn, Am, Tm, De, zt, ki, wm, no, km, vm, Mm, Cm, Em, Pm, Rm, Ft, ga;
const me = class me extends dn {
  constructor() {
    super(...arguments);
    we(this, D);
    we(this, _t, null);
    we(this, Pi, null);
    we(this, Gi, null);
    we(this, jt, /* @__PURE__ */ new Set());
    we(this, Ca, null);
    we(this, Ri, null);
  }
  /** @override */
  async _prepareContext(t) {
    var Q, L, U, V, Z, re, be, ce, se, Oe, Fe, Ue, Ve, at, nt, st, rt, et, Ye, pt, bt, St, N, H, ge, ie, Ie, At;
    const i = await super._prepareContext(t), n = ((Q = this.getSheetTokenDocument) == null ? void 0 : Q.call(this)) ?? null;
    i._mwdThemeClass = game.system.mwd.styles.selectCssClass(), i.layout = await sa.get("character");
    const s = ((U = (L = this.actor).getEdgeCap) == null ? void 0 : U.call(L)) ?? Number(((re = (Z = (V = this.actor.system) == null ? void 0 : V.attributes) == null ? void 0 : Z.edge) == null ? void 0 : re.value) ?? 0), r = !!this.isEditable, o = { physical: "Physical", mental: "Mental", social: "Social" }, l = {
      grit: "Grit",
      insight: "Insight",
      legend: "Legend",
      chaos: "Chaos",
      rumor: "Rumor",
      credibility: "Credibility"
    }, c = this.actor.getEdgePoolSummary ? this.actor.getEdgePoolSummary({ groups: vo }) : { groups: [] };
    i.edgeConsole = {
      cap: s,
      editable: r,
      capPips: Array.from({ length: Math.max(0, s) }, (M, R) => R + 1),
      groups: (c.groups ?? []).map((M) => ({
        id: M.id,
        label: o[M.id] ?? M.id,
        pools: (M.pools ?? []).map((R) => {
          const K = Number(R.effectiveValue ?? 0), Se = Number(R.effectiveMax ?? 0), ue = Array.from({ length: Math.max(0, Se) }, (He, tt) => {
            const ct = tt + 1;
            return { n: ct, filled: ct <= K };
          }), Pe = String(R.key ?? "").split(".").pop();
          return {
            key: R.key,
            label: l[Pe] ?? Pe ?? R.key,
            value: K,
            max: Se,
            rating: Number(R.rating ?? 0),
            ratingBonus: Number(R.ratingBonus ?? 0),
            effectiveRating: Number(R.effectiveRating ?? R.rating ?? 0),
            isCapped: Number(R.effectiveRating ?? R.rating ?? 0) > Number(R.cap ?? s),
            pips: ue,
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
    for (const M of i.edgeConsole.groups ?? [])
      for (const R of M.pools ?? []) {
        const K = String(R.key ?? "").split(".").pop();
        K && d.set(K, R), R.domain = M.id;
      }
    i.edgeConsole.poolsOrdered = u.map((M) => d.get(M)).filter(Boolean);
    const m = this.actor.system ?? {}, f = m.monitors ?? {}, p = [
      { id: "physical", label: "Physical", kind: "wound", status: { label: "Penalty", path: "derived.penalty" } },
      { id: "fatigue", label: "Fatigue", kind: "fatigue", status: { label: "Penalty", path: "derived.penalty" } },
      { id: "armor", label: "Armor", kind: "armor-personal", status: { label: "Resist", path: "derived.resistance" } }
    ], h = (M, R, K = 0) => {
      const Se = foundry.utils.getProperty(M, R), ue = Number(Se);
      return Number.isFinite(ue) ? ue : K;
    };
    i.conditionMonitors = p.map((M) => {
      const R = (f == null ? void 0 : f[M.id]) ?? {}, K = Math.max(0, h(R, "max", 0)), Se = Math.min(Math.max(0, h(R, "value", 0)), K);
      return {
        id: M.id,
        label: M.label,
        kind: M.kind,
        editable: !!this.isEditable,
        value: Se,
        max: K,
        segments: Array.from({ length: K }, (ue, Pe) => {
          const He = Pe + 1;
          return { value: He, filled: He <= Se };
        }),
        status: M.status ? { label: M.status.label, value: h(R, M.status.path, 0) } : null
      };
    });
    const g = Number(((ce = (be = this.actor.system) == null ? void 0 : be.burn) == null ? void 0 : ce.value) ?? 0), y = 10, b = 6, S = Math.min(g, y);
    i.burnOverflow = Math.max(0, g - y), i.burnPenalty = Math.floor(g / 2), i.burnPips = Array.from({ length: y }, (M, R) => {
      const K = R + 1;
      return {
        pipValue: K,
        filled: K <= S,
        threshold: K === b
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
      overloaded: !!((Oe = (se = this.actor.system) == null ? void 0 : se.burn) != null && Oe.overloaded)
    };
    const w = B.getSnapshot(this.actor, { token: n });
    i.combatDashboard = {
      targeting: w.targeting,
      rollImpact: w.rollImpact,
      states: w.states,
      effects: w.effects,
      activation: w.activation,
      inactiveReason: w.inactiveReason
    };
    const v = B.buildActionModel(this.actor, w), P = new Set((v.menus ?? []).map((M) => M.id));
    F(this, _t) && !P.has(F(this, _t)) && Re(this, _t, null), i.combatActions = {
      ...v,
      menus: (v.menus ?? []).map((M) => ({
        ...M,
        isOpen: M.id === F(this, _t)
      }))
    };
    const E = ((Ue = (Fe = this.actor).getPersonalCombatLoadout) == null ? void 0 : Ue.call(Fe)) ?? null;
    i.personalInventory = {
      warnings: [...(E == null ? void 0 : E.warnings) ?? []],
      weapons: ((E == null ? void 0 : E.weapons) ?? []).map((M) => {
        var Te, ot, lt, Qe, W, pe, ci;
        const R = C(this, D, ga).call(this, "weapons", M.id), K = String((M == null ? void 0 : M.category) ?? "").trim().toLowerCase() !== "melee", Se = !!((Te = M == null ? void 0 : M.sourceState) != null && Te.isTracked), ue = String((M == null ? void 0 : M.payloadLabel) ?? "").trim() || "Unloaded", Pe = K && Se ? `${Ee((ot = M == null ? void 0 : M.sourceState) == null ? void 0 : ot.current, 0)}/${Ee((lt = M == null ? void 0 : M.sourceState) == null ? void 0 : lt.max, 0)}` : "", He = K ? Se ? `${ue} ${Pe}` : ue : "", tt = K ? Se ? `Payload ${Pe}` : `Payload ${ue}` : "", ct = oA(M.attackRatingBand), Rt = lA(M.attackRatingBand), ee = Jn([
          { label: "Skill", value: ((Qe = M.skillDef) == null ? void 0 : Qe.label) ?? M.skill ?? "" },
          { label: "Category", value: M.category ?? "" },
          { label: "Damage Type", value: M.damageTypeLabel ?? M.damageType ?? "" },
          { label: "Max Range", value: cA(((W = M.range) == null ? void 0 : W.max) ?? M.defaultRangeBand ?? "") },
          { label: "CQ Bands", value: ct },
          { label: "Payload", value: He },
          { label: "Traits", value: gi(M.traits ?? []).join(", ") }
        ]);
        return {
          id: M.id,
          accordionId: R,
          isExpanded: F(this, jt).has(R),
          name: M.name,
          img: M.img,
          subtitle: ((pe = M.skillDef) == null ? void 0 : pe.label) ?? M.category ?? "",
          summaryStats: Ja([
            { label: "DV", value: Ee(M.damage, 0), emphasis: "strong" },
            { label: "AP", value: Ee(M.ap, 0) },
            { label: "Type", value: M.damageTypeLabel ?? M.damageType ?? "" },
            { label: "CQ", value: Rt }
          ]),
          detailTags: Qn([
            M.equipped ? "Equipped" : "",
            M.isPrimary ? "Primary" : "",
            tt,
            ...gi(M.traits ?? [])
          ]),
          detailRows: ee,
          detailText: Yn(M.notes),
          equipped: !!M.equipped,
          isPrimary: !!M.isPrimary,
          attackUuid: M.uuid ?? "",
          attackRoll: JSON.stringify({
            intent: "attack",
            weaponId: M.id,
            payloadId: ((ci = M == null ? void 0 : M.payloadState) == null ? void 0 : ci.activePayloadId) ?? "",
            edge: { pool: "physical.grit", allowed: ["pre", "post"] },
            tags: ["combat", "attack"]
          })
        };
      }),
      armor: ((E == null ? void 0 : E.armor) ?? []).map((M) => {
        var He, tt, ct, Rt, ee, Te, ot, lt, Qe, W, pe, ci, Dt, Ai;
        const R = ((He = E == null ? void 0 : E.activeArmor) == null ? void 0 : He.id) === M.id ? E.activeArmor : null, K = C(this, D, ga).call(this, "armor", M.id), Se = Ee(((ct = (tt = R == null ? void 0 : R.traitState) == null ? void 0 : tt.reinforced) == null ? void 0 : ct.max) ?? ((ee = (Rt = M == null ? void 0 : M.traitState) == null ? void 0 : Rt.reinforced) == null ? void 0 : ee.max), 0), ue = Se > 0 ? `${Ee(((ot = (Te = R == null ? void 0 : R.traitState) == null ? void 0 : Te.reinforced) == null ? void 0 : ot.current) ?? ((Qe = (lt = M == null ? void 0 : M.traitState) == null ? void 0 : lt.reinforced) == null ? void 0 : Qe.current), 0)}/${Se}` : "", Pe = rA({
          defenseBonus: M.defenseBonus,
          mitigationByType: (R == null ? void 0 : R.mitigationByType) ?? (R == null ? void 0 : R.typedMitigation) ?? M.mitigationByType ?? {}
        });
        return {
          id: M.id,
          accordionId: K,
          isExpanded: F(this, jt).has(K),
          name: M.name,
          img: M.img,
          subtitle: (W = M.tags) != null && W.length ? M.tags.join(", ") : "Armor",
          summaryStats: Ja([
            { label: "Rating", value: Ee((R == null ? void 0 : R.ratingCurrent) ?? M.rating, 0), emphasis: "strong" },
            { label: "Res", value: Ee((R == null ? void 0 : R.baseMitigation) ?? (R == null ? void 0 : R.baseResistance), 0) },
            { label: "Def", value: Ee(M.defenseBonus, 0) },
            { label: "Dur", value: `${Ee(((pe = R == null ? void 0 : R.durability) == null ? void 0 : pe.current) ?? ((ci = M.durability) == null ? void 0 : ci.current), 0)}/${Ee(((Dt = R == null ? void 0 : R.durability) == null ? void 0 : Dt.max) ?? ((Ai = M.durability) == null ? void 0 : Ai.max), 0)}` }
          ]),
          detailTags: Qn([
            M.equipped ? "Equipped" : "",
            M.isPrimary ? "Primary" : "",
            ue ? `Reinforced ${ue}` : "",
            ...gi(M.traits ?? [])
          ]),
          detailRows: Jn([
            { label: "Modifiers", value: Pe },
            { label: "Traits", value: gi(M.traits ?? []).join(", ") },
            { label: "Tags", value: gi(M.tags ?? []).join(", ") }
          ]),
          detailText: Yn(M.notes),
          equipped: !!M.equipped,
          isPrimary: !!M.isPrimary
        };
      }),
      gear: (((Ve = i.items) == null ? void 0 : Ve.gear) ?? []).map((M) => {
        const R = C(this, D, ga).call(this, "gear", M.id);
        return Nc({
          item: M,
          accordionId: R,
          itemType: "gear",
          defaultSubtitle: "Gear",
          categoryLabels: nA,
          ratingLabel: "Rating",
          isEditable: this.isEditable,
          isExpanded: F(this, jt).has(R)
        });
      }),
      // Consumables deliberately share the same quantity-tracked record model as
      // gear so stock editing and linked-source authoring stay transferable.
      consumables: (((at = i.items) == null ? void 0 : at.consumable) ?? []).map((M) => {
        const R = C(this, D, ga).call(this, "consumables", M.id);
        return Nc({
          item: M,
          accordionId: R,
          itemType: "consumable",
          defaultSubtitle: "Consumable",
          categoryLabels: sA,
          ratingLabel: "Potency",
          typeLabel: "Consumable",
          isEditable: this.isEditable,
          isExpanded: F(this, jt).has(R)
        });
      })
    }, i.bio = {
      fields: ((nt = i.bio) == null ? void 0 : nt.fields) ?? {},
      faction: ((st = m.biography) == null ? void 0 : st.faction) ?? "",
      age: ((rt = m.biography) == null ? void 0 : rt.age) ?? "",
      rank: ((et = m.biography) == null ? void 0 : et.rank) ?? "",
      height: ((Ye = m.biography) == null ? void 0 : Ye.height) ?? "",
      weight: ((pt = m.biography) == null ? void 0 : pt.weight) ?? "",
      xpTotal: ((St = (bt = m.counters) == null ? void 0 : bt.xp) == null ? void 0 : St.total) ?? 0,
      xpSpent: ((H = (N = m.counters) == null ? void 0 : N.xp) == null ? void 0 : H.value) ?? 0,
      experienceLevel: ((ge = m.biography) == null ? void 0 : ge.experienceLevel) ?? "green",
      enrichedHistory: await foundry.applications.ux.TextEditor.implementation.enrichHTML(
        ((ie = m.biography) == null ? void 0 : ie.history) ?? "",
        { async: !0, secrets: this.actor.isOwner, relativeTo: this.actor }
      )
    };
    const z = Li(this.actor);
    i.skillsDisplay = Ou(((Ie = this.actor) == null ? void 0 : Ie.system) ?? {}, {
      bonusBySkill: z.bonusBySkill
    }), i.lifeModules = z.slotStates.map((M) => {
      const R = M.state;
      return {
        moduleType: M.moduleType,
        label: M.label,
        hasCatalogEntries: M.availableEntries.length > 0,
        emptyState: M.availableEntries.length > 0 ? `Add ${M.label}` : `No ${M.label} catalog entries configured`,
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
    const G = ["positive", "negative", "narrative"], Y = ["major", "minor"], q = [...((At = i.items) == null ? void 0 : At.quality) ?? []].sort((M, R) => {
      const K = Kt(M.system ?? {}), Se = Kt(R.system ?? {}), ue = G.indexOf(K.category) - G.indexOf(Se.category);
      if (ue !== 0) return ue;
      const Pe = Y.indexOf(K.tier) - Y.indexOf(Se.tier);
      return Pe !== 0 ? Pe : String(M.name ?? "").localeCompare(String(R.name ?? ""));
    });
    return i.qualityGroups = G.map((M) => ({
      id: M,
      label: $n(M),
      records: q.filter((R) => Kt(R.system ?? {}).category === M).map((R) => {
        var ue, Pe, He, tt;
        const K = Kt(R.system ?? {}), Se = C(this, D, ga).call(this, "quality", R.id);
        return {
          id: R.id,
          accordionId: Se,
          isExpanded: F(this, jt).has(Se),
          name: R.name,
          img: R.img,
          subtitle: `${Bn(K.tier)} ${$n(K.category)}`,
          summaryStats: Ja([
            { label: "Tier", value: Bn(K.tier), emphasis: "strong" },
            { label: "Activation", value: K.activation || "passive" },
            { label: "Effects", value: String(((ue = K.effects) == null ? void 0 : ue.length) ?? 0) }
          ]),
          detailTags: Qn([
            K.inactive ? "Inactive" : "",
            ...K.tags ?? []
          ]),
          detailRows: Jn([
            { label: "Category", value: $n(K.category) },
            { label: "Tier", value: Bn(K.tier) },
            { label: "Activation", value: K.activation || "passive" },
            { label: "Prerequisites", value: String(((Pe = K.prerequisites) == null ? void 0 : Pe.length) ?? 0) },
            { label: "Effects", value: String(((He = K.effects) == null ? void 0 : He.length) ?? 0) },
            { label: "Tags", value: gi(K.tags ?? []).join(", ") }
          ]),
          detailText: Yn((tt = R.system) == null ? void 0 : tt.description)
        };
      })
    })), i.assignedMech = this._buildAssignedMech(), i;
  }
  _buildAssignedMech() {
    var s;
    const t = this.actor.uuid, i = { light: "Light", medium: "Medium", heavy: "Heavy", assault: "Assault" }, n = (((s = game.actors) == null ? void 0 : s.contents) ?? []).filter(
      (r) => {
        var o, l;
        return (r.type === "battlemech" || r.type === "vehicle") && String(((l = (o = r.system) == null ? void 0 : o.pilot) == null ? void 0 : l.uuid) ?? "").trim() === t;
      }
    ).map((r) => {
      var L, U, V, Z, re, be, ce, se, Oe, Fe, Ue, Ve, at, nt, st;
      const o = r.type === "battlemech", l = ((U = (L = r.system) == null ? void 0 : L.monitors) == null ? void 0 : U.structure) ?? {}, c = ((Z = (V = r.system) == null ? void 0 : V.monitors) == null ? void 0 : Z.armor) ?? {}, u = ((be = (re = r.system) == null ? void 0 : re.mwd) == null ? void 0 : be.heat) ?? {}, d = ((se = (ce = r.system) == null ? void 0 : ce.mwd) == null ? void 0 : se.heatStatus) ?? {}, m = ((Fe = (Oe = r.system) == null ? void 0 : Oe.mwd) == null ? void 0 : Fe.crits) ?? [], f = ((Ue = r.system) == null ? void 0 : Ue.quickActions) ?? {}, p = (rt, et, Ye, pt) => {
        var N;
        const bt = Math.max(0, Ee(pt.value, 0)), St = Math.max(0, Ee(pt.max, 0));
        return {
          id: rt,
          label: et,
          kind: Ye,
          value: bt,
          max: St,
          resistance: Ee((N = pt.resistance) == null ? void 0 : N.default, 0),
          segments: Array.from({ length: St }, (H, ge) => {
            const ie = ge + 1;
            return { value: ie, filled: ie <= bt };
          })
        };
      }, h = Math.max(0, Ee(u.current, 0)), g = Math.max(0, Ee(u.max, 0)), y = u.thresholds ?? {}, b = o ? {
        current: h,
        max: g,
        status: d.label ?? d.code ?? "safe",
        segments: Array.from({ length: g }, (rt, et) => {
          const Ye = et + 1;
          return {
            value: Ye,
            filled: Ye <= h,
            breakpoint: gi([
              Ye === Ee(y.runningHot, 0) ? "runningHot" : "",
              Ye === Ee(y.overheated, 0) ? "overheated" : "",
              Ye === Ee(y.shutdown, 0) ? "shutdown" : ""
            ]).join(" ")
          };
        })
      } : null, S = nm(m), w = o ? [p("structure", "Structure", "wound", l), p("armor", "Armor", "armor", c)] : [p("structure", "Structure", "wound", l)], v = Array.isArray((Ve = r.system) == null ? void 0 : Ve.weaponGroups) && r.system.weaponGroups.length > 0, P = Array.isArray((at = r.system) == null ? void 0 : at.meleeProfiles) && r.system.meleeProfiles.length > 0, E = f.primaryWeaponGroup ?? null, z = o ? [
        { label: "Primary", hint: (E == null ? void 0 : E.name) ?? "Primary weapon group", handler: "mechAttack", disabled: !E, dataset: { attackKind: "primary", mechId: r.id } },
        { label: "Ranged", hint: "Prompt for a weapon group", handler: "mechAttack", disabled: !v, dataset: { attackKind: "ranged", mechId: r.id } },
        { label: "Melee", hint: "Prompt for a melee profile", handler: "mechAttack", disabled: !P, dataset: { attackKind: "melee", mechId: r.id } },
        { label: "Dodge", hint: "Piloting response", handler: "mechRoll", disabled: !1, dataset: { rollKind: "dodge", mechId: r.id } },
        { label: "Piloting", hint: "Vehicle handling test", handler: "mechRoll", disabled: !1, dataset: { rollKind: "piloting", mechId: r.id } },
        { label: "Sensors", hint: "Perception or technician", handler: "mechRoll", disabled: !f.hasSensorSweep, dataset: { rollKind: "sensor", mechId: r.id } },
        { label: "Repair", hint: "Technician quick check", handler: "mechRoll", disabled: !1, dataset: { rollKind: "repair", mechId: r.id } }
      ] : [], G = Math.max(0, Ee(c.max, 0)), Y = Math.max(0, G - Ee(c.value, 0)), q = Math.max(0, Ee(l.max, 0)), Q = Math.max(0, q - Ee(l.value, 0));
      return {
        id: r.id,
        uuid: r.uuid,
        name: r.name,
        typeLabel: o ? "BattleMech" : "Vehicle",
        isMech: o,
        weightLabel: i[(st = (nt = r.system) == null ? void 0 : nt.mwd) == null ? void 0 : st.weightClass] ?? "",
        summaryStats: Ja([
          ...o ? [{ label: "Armor", value: `${Y} / ${G}` }] : [],
          { label: "Structure", value: `${Q} / ${q}` },
          { label: "Heat", value: o ? `${h} / ${g}` : null },
          { label: "Status", value: S.count > 0 ? S.value : "OK" }
        ]),
        conditionMonitors: w,
        heat: b,
        critCount: m.length,
        quickActions: z
      };
    });
    return { mechs: n, hasMech: n.length > 0 };
  }
  async _onOpenAssignedMech(t, i) {
    var r;
    const n = (r = i == null ? void 0 : i.dataset) == null ? void 0 : r.mechId, s = n ? game.actors.get(n) : null;
    s && s.sheet.render(!0, { focus: !0 });
  }
  async _onMechAttack(t, i) {
    var o, l, c, u, d, m;
    (o = t == null ? void 0 : t.preventDefault) == null || o.call(t), (l = t == null ? void 0 : t.stopPropagation) == null || l.call(t);
    const n = (c = i == null ? void 0 : i.dataset) == null ? void 0 : c.mechId, s = n ? game.actors.get(n) : null;
    if (!s) return;
    const r = String(((u = i == null ? void 0 : i.dataset) == null ? void 0 : u.attackKind) ?? "").trim();
    try {
      r === "melee" ? await ((d = s.rollMeleeAttack) == null ? void 0 : d.call(s)) : await ((m = s.rollRangedAttack) == null ? void 0 : m.call(s));
    } catch (f) {
      Ji(f, "Unable to launch BattleMech attack.");
    }
  }
  async _onMechRoll(t, i) {
    var o, l, c, u, d, m, f, p;
    (o = t == null ? void 0 : t.preventDefault) == null || o.call(t), (l = t == null ? void 0 : t.stopPropagation) == null || l.call(t);
    const n = (c = i == null ? void 0 : i.dataset) == null ? void 0 : c.mechId, s = n ? game.actors.get(n) : null;
    if (!s) return;
    const r = String(((u = i == null ? void 0 : i.dataset) == null ? void 0 : u.rollKind) ?? "").trim();
    try {
      r === "dodge" ? await ((d = s.rollDodge) == null ? void 0 : d.call(s)) : r === "piloting" ? await ((m = s.rollPilotingCheck) == null ? void 0 : m.call(s)) : r === "sensor" ? await ((f = s.rollSensorSweep) == null ? void 0 : f.call(s)) : r === "repair" && await ((p = s.rollEmergencyRepair) == null ? void 0 : p.call(s));
    } catch (h) {
      Ji(h, "Unable to launch BattleMech check.");
    }
  }
  _onRender(t, i) {
    super._onRender(t, i), C(this, D, Sm).call(this), C(this, D, Tm).call(this), C(this, D, wm).call(this), C(this, D, bm).call(this);
  }
  async close(t = {}) {
    return C(this, D, ao).call(this), C(this, D, no).call(this), F(this, Ri) !== null && (Hooks.off("updateActor", F(this, Ri)), Re(this, Ri, null)), super.close(t);
  }
  requestCombatDashboardRefresh() {
    C(this, D, De).call(this, { force: !0 });
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
    n && (Re(this, _t, F(this, _t) === n ? null : n), C(this, D, De).call(this, !1));
  }
  async _onToggleStatuses(t, i) {
    var r, o, l, c, u, d, m, f;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), C(this, D, Ft).call(this, i, t, "Statuses are not available right now.") || !this.isEditable) return;
    const n = this.getPersistentActor() ?? this.actor, s = ((l = this.getSheetTokenDocument) == null ? void 0 : l.call(this)) ?? ((u = B.getSnapshot(n, { token: ((c = this.getSheetTokenDocument) == null ? void 0 : c.call(this)) ?? null })) == null ? void 0 : u.tokenDocument) ?? ((m = B.getSnapshot(this.actor, { token: ((d = this.getSheetTokenDocument) == null ? void 0 : d.call(this)) ?? null })) == null ? void 0 : m.tokenDocument) ?? null;
    if (!s) {
      (f = ui.notifications) == null || f.warn("Statuses require a token for this actor on the current scene.");
      return;
    }
    return Wu({
      actor: n,
      token: s
    });
  }
  async _onCombatSpend(t, i) {
    var c, u, d, m, f, p, h, g, y, b;
    if ((c = t == null ? void 0 : t.preventDefault) == null || c.call(t), (u = t == null ? void 0 : t.stopPropagation) == null || u.call(t), C(this, D, Ft).call(this, i, t, "That combat action is not available right now.") || !this.isEditable) return;
    const n = String(((d = i == null ? void 0 : i.dataset) == null ? void 0 : d.resource) ?? "").trim(), s = Math.max(0, Number(((m = i == null ? void 0 : i.dataset) == null ? void 0 : m.cost) ?? 0)), r = String(((f = i == null ? void 0 : i.dataset) == null ? void 0 : f.combatAction) ?? "").trim(), o = String(((p = i == null ? void 0 : i.dataset) == null ? void 0 : p.combatLabel) ?? "").trim(), l = String(((h = i == null ? void 0 : i.dataset) == null ? void 0 : h.combatCostLabel) ?? "").trim();
    if (!(!n || !s || !r))
      try {
        const S = this.getPersistentActor() ?? this.actor, w = await B.spendResource(S, {
          token: ((g = this.getSheetTokenDocument) == null ? void 0 : g.call(this)) ?? B.getCurrentSceneTokenDocument(S) ?? B.getCurrentSceneTokenDocument(this.actor),
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
        C(this, D, zt).call(this, { rerender: !1 }), C(this, D, De).call(this, { force: !0 });
      } catch (S) {
        console.error("MWD | Failed to spend combat action", S), (b = ui.notifications) == null || b.error("Unable to spend action.");
      }
  }
  async _onCombatAction(t, i) {
    var s, r, o, l, c, u;
    if ((s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (r = t == null ? void 0 : t.stopPropagation) == null || r.call(t), C(this, D, Ft).call(this, i, t, "That combat action is not available right now.") || !this.isEditable) return;
    const n = String(((o = i == null ? void 0 : i.dataset) == null ? void 0 : o.combatAction) ?? "").trim();
    if (n)
      try {
        const d = this.getPersistentActor() ?? this.actor, m = await C(this, D, km).call(this, n);
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
        C(this, D, zt).call(this, { rerender: !1 }), C(this, D, De).call(this, { force: !0 });
      } catch (d) {
        console.error("MWD | Failed to perform combat action", d), (u = ui.notifications) == null || u.error("Unable to perform action.");
      }
  }
  async _onCombatReduceBurn(t, i) {
    var n, s, r, o, l;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (s = t == null ? void 0 : t.stopPropagation) == null || s.call(t), !C(this, D, Ft).call(this, i, t, "Burn recovery is not available right now.") && this.isEditable)
      try {
        const c = this.getPersistentActor() ?? this.actor, u = await B.reduceBurn(c, {
          token: ((r = this.getSheetTokenDocument) == null ? void 0 : r.call(this)) ?? B.getCurrentSceneTokenDocument(c) ?? B.getCurrentSceneTokenDocument(this.actor)
        });
        if (!(u != null && u.ok)) {
          (o = ui.notifications) == null || o.warn((u == null ? void 0 : u.reason) ?? "Unable to reduce Burn.");
          return;
        }
        C(this, D, zt).call(this, { rerender: !1 }), C(this, D, De).call(this, { force: !0 });
      } catch (c) {
        console.error("MWD | Failed to reduce Burn", c), (l = ui.notifications) == null || l.error("Unable to reduce Burn.");
      }
  }
  async _onCombatAssist(t, i) {
    var n, s, r, o, l, c, u;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (s = t == null ? void 0 : t.stopPropagation) == null || s.call(t), !C(this, D, Ft).call(this, i, t, "Assist is not available right now.") && this.isEditable)
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
        const p = await C(this, D, Em).call(this, f);
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
        await C(this, D, Pm).call(this, {
          actor: d,
          token: m,
          target: p,
          costLabel: h.costLabel
        }), C(this, D, zt).call(this, { rerender: !1 }), C(this, D, De).call(this, { force: !0 });
      } catch (d) {
        console.error("MWD | Failed to assist", d), (u = ui.notifications) == null || u.error("Unable to assist.");
      }
  }
  async _onCombatEvade(t, i) {
    var n, s, r, o, l;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (s = t == null ? void 0 : t.stopPropagation) == null || s.call(t), !C(this, D, Ft).call(this, i, t, "Evade is not available right now.") && this.isEditable)
      try {
        const c = this.getPersistentActor() ?? this.actor, u = ((r = this.getSheetTokenDocument) == null ? void 0 : r.call(this)) ?? B.getCurrentSceneTokenDocument(c) ?? B.getCurrentSceneTokenDocument(this.actor), d = await YS(c, { token: u });
        if (!(d != null && d.ok)) {
          (o = ui.notifications) == null || o.warn((d == null ? void 0 : d.reason) ?? "Unable to activate Evade.");
          return;
        }
        C(this, D, zt).call(this, { rerender: !1 }), C(this, D, De).call(this, { force: !0 });
      } catch (c) {
        console.error("MWD | Failed to activate Evade", c), (l = ui.notifications) == null || l.error("Unable to activate Evade.");
      }
  }
  async _onCombatInterrupt(t, i) {
    var n, s, r, o, l, c, u, d;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (s = t == null ? void 0 : t.stopPropagation) == null || s.call(t), !C(this, D, Ft).call(this, i, t, "Interrupt is not available right now.") && this.isEditable)
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
        if (!await C(this, D, vm).call(this, h)) return;
        const y = await B.executeAction(m, {
          token: f,
          actionId: "interrupt",
          metadata: h
        });
        if (!(y != null && y.ok)) {
          (u = ui.notifications) == null || u.warn((y == null ? void 0 : y.reason) ?? "Unable to interrupt.");
          return;
        }
        await B.clearPreparedInterrupt(m, { token: f }), await C(this, D, Rm).call(this, {
          actor: m,
          token: f,
          preparedInterrupt: h,
          costLabel: y.costLabel
        }), C(this, D, zt).call(this, { rerender: !1 }), C(this, D, De).call(this, { force: !0 });
      } catch (m) {
        console.error("MWD | Failed to interrupt", m), (d = ui.notifications) == null || d.error("Unable to interrupt.");
      }
  }
  async _onCombatOverloadCheck(t, i) {
    var r, o, l, c, u, d, m, f, p, h, g;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), C(this, D, Ft).call(this, i, t, "Overload check is not available right now.") || !this.isEditable) return;
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
      if (C(this, D, zt).call(this, { rerender: !1 }), !b) {
        C(this, D, De).call(this, !1);
        return;
      }
      C(this, D, De).call(this, { force: !0 });
    } catch (y) {
      console.error("MWD | Failed to launch overload check", y), (g = ui.notifications) == null || g.error("Unable to launch overload check.");
    }
  }
  async _onCombatAttack(t, i) {
    var m, f, p, h, g, y, b, S, w, v, P, E, z, G, Y, q, Q, L, U, V, Z, re, be;
    if ((m = t == null ? void 0 : t.preventDefault) == null || m.call(t), (f = t == null ? void 0 : t.stopPropagation) == null || f.call(t), C(this, D, Ft).call(this, i, t, "Attack is not available right now.") || !this.isEditable) return;
    const n = this.getPersistentActor() ?? this.actor, s = ((p = this.getSheetTokenDocument) == null ? void 0 : p.call(this)) ?? B.getCurrentSceneTokenDocument(n) ?? B.getCurrentSceneTokenDocument(this.actor), r = String(((h = i == null ? void 0 : i.dataset) == null ? void 0 : h.combatAction) ?? "attack").trim() || "attack", o = String(((g = i == null ? void 0 : i.dataset) == null ? void 0 : g.combatLabel) ?? (r === "opportunity" ? "Opportunity" : "Attack")).trim() || "Attack", l = r === "opportunity", c = B.getSnapshot(n, { token: s }), u = !!((b = (y = c.state) == null ? void 0 : y.actionState) != null && b.aim);
    if (!c.hasCombatant) {
      (S = ui.notifications) == null || S.warn("No combatant on the current scene.");
      return;
    }
    if (l && c.isCurrentTurn) {
      (w = ui.notifications) == null || w.warn("Only outside your activation.");
      return;
    }
    if (!l && !c.isCurrentTurn) {
      (v = ui.notifications) == null || v.warn("Only available during your activation.");
      return;
    }
    if (!l && c.overloaded) {
      (P = ui.notifications) == null || P.warn("Overloaded actors can only recover Burn.");
      return;
    }
    if (!l) {
      const ce = 3 + Math.floor((Math.max(0, Number(((G = (z = (E = n.system) == null ? void 0 : E.attributes) == null ? void 0 : z.reflexes) == null ? void 0 : G.value) ?? 0)) + Math.max(0, Number(((Q = (q = (Y = n.system) == null ? void 0 : Y.attributes) == null ? void 0 : q.willpower) == null ? void 0 : Q.value) ?? 0))) / 2);
      if (Math.max(0, ce - Math.max(0, Number(((L = c.state) == null ? void 0 : L.saSpentThisActivation) ?? 0))) < 2) {
        (U = ui.notifications) == null || U.warn("Activation SA cap reached.");
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
      const ce = await ((re = (Z = (V = game.mwd) == null ? void 0 : V.roll) == null ? void 0 : Z.execute) == null ? void 0 : re.call(Z, { actor: n, payload: d, event: t }));
      if (C(this, D, zt).call(this, { rerender: !1 }), !ce) {
        C(this, D, De).call(this, !1);
        return;
      }
      u && await B.clearAim(n, { token: s });
      const se = l ? await B.executeAction(n, {
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
      se != null && se.ok || (be = ui.notifications) == null || be.warn((se == null ? void 0 : se.reason) ?? `Unable to spend ${o} action.`), C(this, D, De).call(this, { force: !0 });
    } catch (ce) {
      console.error(`MWD | Failed to launch ${o}`, ce), Ji(ce, `Unable to launch ${o}.`);
    }
  }
  async _onAddSkillSpecialization(t, i) {
    var d, m, f, p;
    if ((d = t == null ? void 0 : t.preventDefault) == null || d.call(t), (m = t == null ? void 0 : t.stopPropagation) == null || m.call(t), !this.isEditable || !this.editing) return;
    const n = String(((f = i == null ? void 0 : i.dataset) == null ? void 0 : f.skillKey) ?? "").trim();
    if (!n) return;
    const s = this.getPersistentActor() ?? this.actor, r = _r(s.system ?? {}, n), o = Cs(s.system ?? {}, n), l = ea(n).filter((h) => !o.includes(h.key));
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
    const u = ns(
      r.concat([c])
    );
    await s.update({
      [`system.skills.${n}.specializations`]: u
    }), C(this, D, De).call(this, { force: !0 });
  }
  async _onRemoveSkillSpecialization(t, i) {
    var l, c, u, d;
    if ((l = t == null ? void 0 : t.preventDefault) == null || l.call(t), (c = t == null ? void 0 : t.stopPropagation) == null || c.call(t), !this.isEditable || !this.editing) return;
    const n = String(((u = i == null ? void 0 : i.dataset) == null ? void 0 : u.skillKey) ?? "").trim(), s = String(((d = i == null ? void 0 : i.dataset) == null ? void 0 : d.specializationKey) ?? "").trim();
    if (!n || !s) return;
    const r = this.getPersistentActor() ?? this.actor, o = ns(
      _r(r.system ?? {}, n).filter((m) => m !== s)
    );
    await r.update({
      [`system.skills.${n}.specializations`]: o
    }), C(this, D, De).call(this, { force: !0 });
  }
  async _onCreateLifeModuleItem(t, i) {
    var d, m, f, p, h;
    if ((d = t == null ? void 0 : t.preventDefault) == null || d.call(t), (m = t == null ? void 0 : t.stopPropagation) == null || m.call(t), !this.isEditable) return;
    const n = String(((f = i == null ? void 0 : i.dataset) == null ? void 0 : f.moduleType) ?? "").trim();
    if (!n) return;
    const s = this.getPersistentActor() ?? this.actor, r = Jo(n);
    if (!r.length) {
      (p = ui.notifications) == null || p.warn(`No ${Da(n)} life modules are configured in game settings.`);
      return;
    }
    const o = await Ic({
      title: `Choose ${Da(n)} Life Module`,
      label: "Life Module",
      confirmLabel: "Create",
      options: r.map((g) => ({
        value: g.id,
        label: g.label
      }))
    });
    if (!o) return;
    const l = Oi(o);
    if (!l) {
      (h = ui.notifications) == null || h.warn("That life module catalog entry no longer exists.");
      return;
    }
    const c = Td(l, {}), u = {};
    for (const g of c.filter((y) => y.hasMultipleChoices)) {
      const y = await Ic({
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
      system: ln({
        moduleType: n,
        catalogId: l.id,
        selectedGrants: u
      })
    }]), C(this, D, De).call(this, { force: !0 });
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
    }]), C(this, D, De).call(this, { force: !0 });
  }
  async _onEditOwnedItem(t, i) {
    var s, r, o;
    (s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (r = t == null ? void 0 : t.stopPropagation) == null || r.call(t);
    const n = C(this, D, ki).call(this, i, t);
    (o = n == null ? void 0 : n.sheet) == null || o.render(!0);
  }
  async _onDeleteOwnedItem(t, i) {
    var r, o;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const n = C(this, D, ki).call(this, i, t);
    if (!n) return;
    await (this.getPersistentActor() ?? this.actor).deleteEmbeddedDocuments("Item", [n.id]), C(this, D, De).call(this, { force: !0 });
  }
  async _onToggleInventoryAccordion(t, i) {
    var s, r, o, l, c, u, d, m, f, p;
    (s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (r = t == null ? void 0 : t.stopPropagation) == null || r.call(t);
    const n = String(
      ((o = i == null ? void 0 : i.dataset) == null ? void 0 : o.accordionId) ?? ((u = (c = (l = i == null ? void 0 : i.closest) == null ? void 0 : l.call(i, "[data-accordion-id]")) == null ? void 0 : c.dataset) == null ? void 0 : u.accordionId) ?? ((p = (f = (m = (d = t == null ? void 0 : t.target) == null ? void 0 : d.closest) == null ? void 0 : m.call(d, "[data-accordion-id]")) == null ? void 0 : f.dataset) == null ? void 0 : p.accordionId) ?? ""
    ).trim();
    n && (F(this, jt).has(n) ? F(this, jt).delete(n) : F(this, jt).add(n), C(this, D, De).call(this, !1));
  }
  async _onToggleOwnedItemEquipped(t, i) {
    var r, o, l, c;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const n = C(this, D, ki).call(this, i, t);
    if (!n) return;
    const s = this.getPersistentActor() ?? this.actor;
    await ((c = s.setOwnedItemEquipped) == null ? void 0 : c.call(s, n.id, !((l = n.system) != null && l.equipped))), C(this, D, De).call(this, { force: !0 });
  }
  async _onSetOwnedItemPrimary(t, i) {
    var r, o, l, c;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const n = C(this, D, ki).call(this, i, t);
    if (!n) return;
    const s = this.getPersistentActor() ?? this.actor;
    await ((c = s.setOwnedItemPrimary) == null ? void 0 : c.call(s, n.id, !((l = n.system) != null && l.isPrimary))), C(this, D, De).call(this, { force: !0 });
  }
  async _onAdjustGearQuantity(t, i) {
    var c, u, d, m, f, p, h, g, y, b, S;
    if ((c = t == null ? void 0 : t.preventDefault) == null || c.call(t), (u = t == null ? void 0 : t.stopPropagation) == null || u.call(t), !this.isEditable) return;
    const n = C(this, D, ki).call(this, i, t);
    if (!n || !["gear", "consumable"].includes(String(n.canonicalType ?? n.type ?? "").trim())) return;
    const s = Math.trunc(Number(
      ((d = i == null ? void 0 : i.dataset) == null ? void 0 : d.delta) ?? ((p = (f = (m = i == null ? void 0 : i.closest) == null ? void 0 : m.call(i, "[data-delta]")) == null ? void 0 : f.dataset) == null ? void 0 : p.delta) ?? ((b = (y = (g = (h = t == null ? void 0 : t.target) == null ? void 0 : h.closest) == null ? void 0 : g.call(h, "[data-delta]")) == null ? void 0 : y.dataset) == null ? void 0 : b.delta) ?? 0
    ) || 0);
    if (!s) return;
    const o = (this.getPersistentActor() ?? this.actor).items.get(n.id) ?? n, l = Math.max(0, Math.trunc(Number(((S = o.system) == null ? void 0 : S.quantity) ?? 1) || 0) + s);
    await o.update({ "system.quantity": l }), C(this, D, De).call(this, { force: !0 });
  }
  async _onAttackWeapon(t, i) {
    var l, c, u, d;
    if ((l = t == null ? void 0 : t.preventDefault) == null || l.call(t), (c = t == null ? void 0 : t.stopPropagation) == null || c.call(t), C(this, D, Ft).call(this, i, t, "Equip that weapon before attacking.")) return;
    const n = C(this, D, ki).call(this, i, t);
    if (!((u = n == null ? void 0 : n.isPersonalWeapon) != null && u.call(n))) return;
    const s = this.getPersistentActor() ?? this.actor, r = ((d = this.getSheetTokenDocument) == null ? void 0 : d.call(this)) ?? B.getCurrentSceneTokenDocument(s) ?? B.getCurrentSceneTokenDocument(this.actor);
    await Ws({ weapon: n, event: t, token: r }) && C(this, D, De).call(this, { force: !0 });
  }
};
_t = new WeakMap(), Pi = new WeakMap(), Gi = new WeakMap(), jt = new WeakMap(), Ca = new WeakMap(), Ri = new WeakMap(), D = new WeakSet(), bm = function() {
  if (F(this, Ri) !== null) return;
  const t = this.actor.uuid;
  Re(this, Ri, Hooks.on("updateActor", (i) => {
    var n, s;
    i.type !== "battlemech" && i.type !== "vehicle" || String(((s = (n = i.system) == null ? void 0 : n.pilot) == null ? void 0 : s.uuid) ?? "").trim() === t && this.render();
  }));
}, Sm = function() {
  C(this, D, ao).call(this), F(this, _t) && (Re(this, Pi, (t) => {
    var s;
    const i = this._getRootElement();
    if (!i) return;
    const n = t.target;
    if (n instanceof Node && !((s = n.closest) != null && s.call(n, ".mwd-combat-menu"))) {
      if (!i.contains(n)) {
        C(this, D, zt).call(this);
        return;
      }
      C(this, D, zt).call(this);
    }
  }), document.addEventListener("click", F(this, Pi)));
}, ao = function() {
  F(this, Pi) && (document.removeEventListener("click", F(this, Pi)), Re(this, Pi, null));
}, Xn = function() {
  const t = this._getRootElement();
  return t ? t.querySelector(".mwd-scroll-area") ?? t.querySelector(".csb-tab-panels") : null;
}, Am = function() {
  const t = C(this, D, Xn).call(this);
  if (!(t instanceof HTMLElement)) {
    Re(this, Gi, null);
    return;
  }
  Re(this, Gi, {
    top: t.scrollTop,
    left: t.scrollLeft
  });
}, Tm = function() {
  const t = F(this, Gi);
  if (!t) return;
  const i = C(this, D, Xn).call(this);
  i instanceof HTMLElement && (i.scrollTop = t.top, i.scrollLeft = t.left, requestAnimationFrame(() => {
    const n = C(this, D, Xn).call(this);
    n instanceof HTMLElement && (n.scrollTop = t.top, n.scrollLeft = t.left);
  }), Re(this, Gi, null));
}, De = function(t = !1) {
  C(this, D, Am).call(this), this.render(t);
}, zt = function({ rerender: t = !0 } = {}) {
  F(this, _t) && (Re(this, _t, null), t && C(this, D, De).call(this, !1));
}, ki = function(t, i) {
  var s, r, o, l, c, u, d, m;
  const n = String(
    ((s = t == null ? void 0 : t.dataset) == null ? void 0 : s.itemId) ?? ((l = (o = (r = t == null ? void 0 : t.closest) == null ? void 0 : r.call(t, "[data-item-id]")) == null ? void 0 : o.dataset) == null ? void 0 : l.itemId) ?? ((m = (d = (u = (c = i == null ? void 0 : i.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, "[data-item-id]")) == null ? void 0 : d.dataset) == null ? void 0 : m.itemId) ?? ""
  ).trim();
  return n ? this.actor.items.get(n) ?? null : null;
}, wm = function() {
  var n;
  const t = (n = this._getRootElement) == null ? void 0 : n.call(this);
  if (!t) return;
  C(this, D, no).call(this);
  const i = new AbortController();
  Re(this, Ca, i), t.addEventListener("dragstart", (s) => {
    var c, u, d;
    const r = (u = (c = s.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, "[data-weapon-attack-uuid]");
    if (!r || !t.contains(r)) return;
    const o = C(this, D, ki).call(this, r, s), l = o ? hm(o) : null;
    if (!l) {
      s.preventDefault();
      return;
    }
    s.stopPropagation(), (d = s.dataTransfer) == null || d.setData("text/plain", JSON.stringify(l)), s.dataTransfer && (s.dataTransfer.effectAllowed = "copy");
  }, { signal: i.signal });
}, no = function() {
  var t;
  (t = F(this, Ca)) == null || t.abort(), Re(this, Ca, null);
}, km = async function(t) {
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
}, vm = async function(t = {}) {
  const i = String((t == null ? void 0 : t.condition) ?? "").trim(), n = String((t == null ? void 0 : t.scope) ?? "").trim(), s = `
    <div class="mwd-quick-select">
      <p><strong>Trigger:</strong> ${Tt(i || "Unspecified trigger")}</p>
      <p><strong>Scope:</strong> ${Tt(n || "Unspecified response")}</p>
    </div>`;
  return !!await Dialog.confirm({
    title: "Resolve Interrupt",
    content: s,
    yes: () => !0,
    no: () => !1
  });
}, Mm = function(t) {
  return t != null && t.combatants ? typeof t.combatants.values == "function" ? Array.from(t.combatants.values()) : Array.from(t.combatants ?? []) : [];
}, Cm = function(t) {
  var n;
  const i = String(((n = t == null ? void 0 : t.combatant) == null ? void 0 : n.id) ?? "").trim();
  return C(this, D, Mm).call(this, t == null ? void 0 : t.combat).filter((s) => s && String(s.id ?? "").trim() !== i).map((s) => {
    var c;
    const r = ((c = s.token) == null ? void 0 : c.document) ?? s.token ?? null, o = s.actor ?? (r == null ? void 0 : r.actor) ?? null, l = String(s.name ?? (r == null ? void 0 : r.name) ?? (o == null ? void 0 : o.name) ?? "Combatant").trim() || "Combatant";
    return {
      combatantId: String(s.id ?? "").trim(),
      actorUuid: (o == null ? void 0 : o.uuid) ?? null,
      tokenUuid: (r == null ? void 0 : r.uuid) ?? null,
      name: l
    };
  }).filter((s) => s.combatantId && s.name).sort((s, r) => s.name.localeCompare(r.name));
}, Em = async function(t) {
  var r;
  const i = C(this, D, Cm).call(this, t);
  if (!i.length)
    return (r = ui.notifications) == null || r.warn("No other combatants are available to assist."), null;
  const n = `
    <form class="mwd-quick-select">
      <div class="mwd-field">
        <label>Assist</label>
        <select name="combatant">
          ${i.map((o) => `<option value="${Tt(o.combatantId)}">${Tt(o.name)}</option>`).join("")}
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
}, Pm = async function({ actor: t, token: i = null, target: n = null, costLabel: s = "" } = {}) {
  const r = String((t == null ? void 0 : t.name) ?? "Ally").trim() || "Ally", o = String((n == null ? void 0 : n.name) ?? "an ally").trim() || "an ally", l = String(s ?? "").trim(), c = `
    <div class="mwd-chat-card mwd-chat-card--assist">
      <h3>Assist</h3>
      <p><strong>${Tt(r)}</strong> assists <strong>${Tt(o)}</strong>.</p>
      ${l ? `<p><small>Cost: ${Tt(l)}</small></p>` : ""}
    </div>`;
  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor: t, token: (i == null ? void 0 : i.object) ?? i }),
    content: c
  });
}, Rm = async function({ actor: t, token: i = null, preparedInterrupt: n = null, costLabel: s = "" } = {}) {
  const r = String((t == null ? void 0 : t.name) ?? "Combatant").trim() || "Combatant", o = String((n == null ? void 0 : n.condition) ?? "").trim(), l = String((n == null ? void 0 : n.scope) ?? "").trim(), c = String(s ?? "").trim(), u = `
    <div class="mwd-chat-card mwd-chat-card--interrupt">
      <h3>Interrupt</h3>
      <p><strong>${Tt(r)}</strong> resolves a prepared interrupt.</p>
      ${o ? `<p><strong>Trigger:</strong> ${Tt(o)}</p>` : ""}
      ${l ? `<p><strong>Scope:</strong> ${Tt(l)}</p>` : ""}
      ${c ? `<p><small>Cost: ${Tt(c)}</small></p>` : ""}
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
}, ga = function(t, i) {
  return `${String(t ?? "").trim()}:${String(i ?? "").trim()}`;
}, O(me, "PARTS", {
  sheet: {
    get template() {
      return `${X}/v2/actor/character-sheet.hbs`;
    }
  }
}), O(me, "DEFAULT_OPTIONS", foundry.utils.mergeObject(Yt(me, me, "DEFAULT_OPTIONS"), {
  classes: ["character-sheet", T, "actor-sheet-v2", "mwd-character-sheet", "mwd-sheet"],
  window: { minWidth: 450, minHeight: 740, resizable: !0 },
  position: { width: 980, height: 900 },
  actions: {
    ...Yt(me, me, "DEFAULT_OPTIONS").actions,
    edgeSet: me.prototype._onEdgeSet,
    toggleCombatMenu: me.prototype._onToggleCombatMenu,
    toggleStatuses: me.prototype._onToggleStatuses,
    combatAction: me.prototype._onCombatAction,
    combatSpend: me.prototype._onCombatSpend,
    combatAssist: me.prototype._onCombatAssist,
    combatEvade: me.prototype._onCombatEvade,
    combatInterrupt: me.prototype._onCombatInterrupt,
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
    attackWeapon: me.prototype._onAttackWeapon,
    openAssignedMech: me.prototype._onOpenAssignedMech,
    mechAttack: me.prototype._onMechAttack,
    mechRoll: me.prototype._onMechRoll
  }
}, { inplace: !1 }));
let io = me;
function uA(a, e, t = "") {
  const i = foundry.utils.getProperty(a, e);
  return i === void 0 ? t : i;
}
function ml(a, e, t = {}) {
  const {
    document: i = null,
    type: n = "text",
    value: s = uA(i, a, n === "number" ? 0 : ""),
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
function Dc(a, e, t, i = {}) {
  return ml(e, t, { ...i, document: a, type: "text" });
}
function ya(a, e, t, i = {}) {
  return ml(e, t, { ...i, document: a, type: "number" });
}
function dA(a, e, t, i = {}) {
  return ml(e, t, { ...i, document: a, type: "textarea" });
}
function mA(a, e = []) {
  return e.map(
    (t) => ya(
      a,
      `system.attributes.${t.key}.value`,
      t.label
    )
  );
}
function Dn(a, {
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
class Nm extends dn {
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      classes: ["npc-sheet", T, "actor-sheet-v2"],
      position: { width: 920, height: 860 }
    }, { inplace: !1 });
  }
  async _prepareContext(e) {
    const t = await super._prepareContext(e), i = this.actor;
    return t.layout = await sa.get("npc"), t.actorSheet = {
      profileFields: [
        Dc(i, "system.role", "Role / Archetype")
      ],
      attributeFields: mA(i, [
        { key: "strength", label: "Strength" },
        { key: "reflexes", label: "Reflexes" },
        { key: "intelligence", label: "Intelligence" },
        { key: "willpower", label: "Willpower" },
        { key: "charisma", label: "Charisma" },
        { key: "edge", label: "Edge" }
      ]),
      monitorFields: [
        ya(i, "system.monitors.physical.value", "Physical"),
        ya(i, "system.monitors.physical.max", "Physical Max"),
        ya(i, "system.monitors.fatigue.value", "Fatigue"),
        ya(i, "system.monitors.fatigue.max", "Fatigue Max"),
        ya(i, "system.monitors.armor.value", "Armor"),
        Dc(i, "system.monitors.armor.effect", "Armor Effect")
      ],
      itemCollections: {
        traits: Dn(i, {
          types: ["quality"],
          describe: (n) => {
            var s;
            return ((s = n.system) == null ? void 0 : s.category) ?? "";
          }
        }),
        weapons: Dn(i, {
          types: ["personalWeapon"],
          supportsEquip: !0,
          supportsPrimary: !0,
          describe: (n) => {
            var s, r;
            return `${((s = n.system) == null ? void 0 : s.category) ?? "ranged"} | DV ${Number(((r = n.system) == null ? void 0 : r.damage) ?? 0)}`;
          }
        }),
        assetModules: Dn(i, {
          types: ["assetModule"],
          describe: (n) => {
            var s;
            return `Level ${Number(((s = n.system) == null ? void 0 : s.level) ?? 1)}`;
          }
        }),
        inventory: Dn(i, {
          // Consumables share the same quantity-driven row contract as gear on
          // lightweight actor sheets, so we present them in one inventory list.
          types: ["gear", "consumable"],
          describe: (n) => {
            var s, r;
            return `Qty ${Number(((s = n.system) == null ? void 0 : s.quantity) ?? 1)} | Rating ${Number(((r = n.system) == null ? void 0 : r.rating) ?? 0)}`;
          }
        })
      },
      notesField: dA(i, "system.biography", "Notes", { rows: 12 })
    }, t;
  }
}
O(Nm, "PARTS", {
  sheet: {
    template: `${X}/v2/actor/npc-sheet.hbs`,
    scrollable: [".sheet-body"]
  }
});
const { ApplicationV2: fA, HandlebarsApplicationMixin: pA } = foundry.applications.api, tn = class tn extends pA(fA) {
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      id: "select-actor",
      classes: ["select-actor", "anarchy-dialog"],
      position: { width: 300, height: "auto" },
      window: {
        resizable: !0
      }
    }, { inplace: !1 });
  }
  static async selectActor(e, t, i = async (s) => {
  }, n = async () => {
  }) {
    var o, l, c, u;
    const s = {
      id: `select-actor-${foundry.utils.randomID()}`,
      classes: [((u = (c = (l = (o = game.system) == null ? void 0 : o.mwd) == null ? void 0 : l.styles) == null ? void 0 : c.selectCssClass) == null ? void 0 : u.call(c)) ?? "", ...tn.DEFAULT_OPTIONS.classes].filter(Boolean),
      window: { title: e }
    };
    return new tn({ actors: t, onActorSelected: i, onCancel: n }, s).render({ force: !0 });
  }
  constructor(e = {}, t = {}) {
    super(e, t), this.actors = e.actors, this.onActorSelected = e.onActorSelected, this.onCancel = e.onCancel, this._actorSelected = !1;
  }
  async _prepareContext() {
    return { actors: this.actors };
  }
  async activateListeners(e) {
    const t = e instanceof HTMLElement ? e : e[0];
    await super.activateListeners(t);
    const i = $(t);
    i.find(".click-select-actor").click((n) => this.onSelectActor(n)), i.find('[data-action="cancel"]').on("click", async () => await this.close());
  }
  async onSelectActor(e) {
    const t = $(e.currentTarget).attr("data-actor-id"), i = this.actors.find((n) => n.id == t);
    i && (this._actorSelected = !0, await this.onActorSelected(i), await this.close());
  }
  async close(e) {
    return !this._actorSelected && this.onCancel && await this.onCancel(), super.close(e);
  }
};
O(tn, "PARTS", {
  body: {
    template: `${X}/dialog/select-actor.hbs`
  }
});
let so = tn;
function Ot(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function Im(a = []) {
  return a.map((e) => String(e ?? "").trim()).filter(Boolean);
}
function hA(a) {
  return String(a ?? "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
function gA(a, e = 180) {
  const t = hA(a);
  return t ? t.length <= e ? t : `${t.slice(0, Math.max(0, e - 3)).trim()}...` : "";
}
function Aa(a = "") {
  return String(a ?? "").replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim().replace(/\b\w/g, (e) => e.toUpperCase());
}
function fr(a = []) {
  return a.map((e) => {
    const t = e ?? {};
    return {
      ...t,
      label: String(t.label ?? "").trim(),
      value: String(t.value ?? "").trim(),
      emphasis: t.emphasis ?? "",
      title: String(t.title ?? "").trim(),
      tone: String(t.tone ?? "").trim(),
      parts: Array.isArray(t.parts) ? t.parts.filter((i) => i && i.value !== void 0 && i.value !== null && String(i.value).trim() !== "").map((i) => ({
        label: String(i.label ?? "").trim(),
        value: String(i.value ?? "").trim(),
        tone: String(i.tone ?? "").trim(),
        title: String(i.title ?? "").trim()
      })) : []
    };
  }).filter((e) => e.value !== "" || e.parts.length).map((e) => ({
    ...e,
    hasParts: e.parts.length > 0
  }));
}
function yA(a = []) {
  return Im(a).map((e) => ({ label: e }));
}
function Oc(a = []) {
  return a.filter((e) => e && e.value !== void 0 && e.value !== null && String(e.value).trim() !== "").map((e) => ({
    label: String(e.label ?? "").trim(),
    value: String(e.value ?? "").trim()
  }));
}
function bA(a = {}) {
  return ["close", "near", "far", "extreme", "max"].filter((i) => (a == null ? void 0 : a[i]) !== void 0 && (a == null ? void 0 : a[i]) !== null && String(a[i]).trim() !== "").map((i) => {
    const n = a[i];
    return i === "max" ? `Max ${Aa(n)}` : `${Aa(i)} ${Ot(n, 0)}`;
  }).join(" | ");
}
const SA = Object.freeze({
  handling: "Handling",
  system: "System",
  chassis: "Chassis",
  condition: "Condition"
}), _c = Object.freeze({
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
var qi, hn, ro;
const Ge = class Ge extends dn {
  constructor() {
    super(...arguments);
    we(this, hn);
    we(this, qi, /* @__PURE__ */ new Set());
  }
  async _prepareContext(t) {
    var n, s, r, o;
    const i = await super._prepareContext(t);
    return i._mwdThemeClass = ((o = (r = (s = (n = game.system) == null ? void 0 : n.mwd) == null ? void 0 : s.styles) == null ? void 0 : r.selectCssClass) == null ? void 0 : o.call(r)) ?? "", i.layout = await sa.get(this.constructor.LAYOUT_ID ?? Ge.LAYOUT_ID), i.vehicleSheet = {
      summaryStats: this._buildSummaryStats(),
      alerts: this._buildAlerts(),
      statusAction: {
        label: "Statuses",
        disabled: !this._resolveStatusToken(this.getPersistentActor() ?? this.actor),
        reason: "Statuses require a token for this actor on the current scene."
      },
      activeCrits: this._buildActiveCrits(),
      attributes: this._buildAttributeCards(),
      sections: this._buildVehicleSections(),
      pilotPanel: await this._buildPilotPanel()
    }, i.conditionMonitors = this._buildConditionMonitors(), i;
  }
  async _buildPilotPanel() {
    var s, r, o;
    const t = ((s = this.getPersistentActor) == null ? void 0 : s.call(this)) ?? this.actor, i = String(((o = (r = t.system) == null ? void 0 : r.pilot) == null ? void 0 : o.uuid) ?? "").trim();
    let n = null;
    if (i)
      try {
        n = await fromUuid(i);
      } catch {
      }
    return {
      uuid: i,
      linked: !!n,
      name: (n == null ? void 0 : n.name) ?? null,
      id: (n == null ? void 0 : n.id) ?? null,
      canEdit: !!this.isEditable
    };
  }
  async _onAssignPilot(t, i) {
    var r, o;
    if (!this.isEditable) return;
    const n = (((r = game.actors) == null ? void 0 : r.contents) ?? []).filter((l) => l.type === "character");
    if (!n.length) {
      (o = ui.notifications) == null || o.warn("No character actors found in this world.");
      return;
    }
    const s = this.getPersistentActor() ?? this.actor;
    await so.selectActor(
      "Assign Pilot",
      n,
      async (l) => s.update({ "system.pilot.uuid": l.uuid })
    );
  }
  async _onRemovePilot(t, i) {
    if (!this.isEditable) return;
    await (this.getPersistentActor() ?? this.actor).update({ "system.pilot.uuid": "" });
  }
  async _onOpenPilot(t, i) {
    var o, l, c;
    const n = ((o = this.getPersistentActor) == null ? void 0 : o.call(this)) ?? this.actor, s = String(((c = (l = n.system) == null ? void 0 : l.pilot) == null ? void 0 : c.uuid) ?? "").trim();
    if (!s) return;
    const r = await fromUuid(s).catch(() => null);
    r && r.sheet.render(!0, { focus: !0 });
  }
  async _onDrop(t) {
    var n, s;
    if (!this.isEditable) return (n = super._onDrop) == null ? void 0 : n.call(this, t);
    let i;
    try {
      i = TextEditor.getDragEventData(t);
    } catch {
    }
    if ((i == null ? void 0 : i.type) === "Actor") {
      const r = await fromUuid(i.uuid).catch(() => null);
      if ((r == null ? void 0 : r.type) === "character") {
        await (this.getPersistentActor() ?? this.actor).update({ "system.pilot.uuid": r.uuid });
        return;
      }
    }
    return (s = super._onDrop) == null ? void 0 : s.call(this, t);
  }
  _buildSummaryStats() {
    var n, s, r, o, l, c, u;
    const t = ((n = this.actor.system) == null ? void 0 : n.attributes) ?? {}, i = ((r = (s = this.actor.system) == null ? void 0 : s.monitors) == null ? void 0 : r.structure) ?? {};
    return fr([
      { label: "Handling", value: Ot((o = t.handling) == null ? void 0 : o.value, 0), emphasis: "strong" },
      { label: "System", value: Ot((l = t.system) == null ? void 0 : l.value, 0) },
      { label: "Chassis", value: Ot((c = t.chassis) == null ? void 0 : c.value, 0) },
      { label: "Condition", value: Ot((u = t.condition) == null ? void 0 : u.value, 0) },
      { label: "Structure", value: `${Ot(i.value, 0)} / ${Ot(i.max, 0)}` }
    ]);
  }
  _buildAlerts() {
    return [];
  }
  _buildAttributeCards() {
    var i;
    const t = ((i = this.actor.system) == null ? void 0 : i.attributes) ?? {};
    return Object.entries(SA).map(([n, s]) => {
      var r;
      return {
        key: n,
        label: s,
        value: Ot((r = t == null ? void 0 : t[n]) == null ? void 0 : r.value, 0),
        path: `system.attributes.${n}.value`
      };
    });
  }
  _buildConditionMonitors() {
    var i, n, s, r, o;
    const t = ((n = (i = this.actor.system) == null ? void 0 : i.monitors) == null ? void 0 : n.structure) ?? ((o = (r = (s = this.actor.system) == null ? void 0 : s.mwd) == null ? void 0 : r.monitors) == null ? void 0 : o.structure) ?? {};
    return [
      to({ id: "structure", label: "Structure", kind: "structure", monitor: t, editable: this.isEditable })
    ];
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
    const n = (t == null ? void 0 : t.system) ?? {}, s = (t == null ? void 0 : t.canonicalType) ?? (t == null ? void 0 : t.type) ?? "", r = typeof (t == null ? void 0 : t.getCombatProfile) == "function" ? t.getCombatProfile() : null, o = `${String(i ?? "").trim()}:${String((t == null ? void 0 : t.id) ?? "").trim()}`, l = _c[s] ?? Aa(s || "item"), c = n.notes ?? n.description ?? ((f = n.references) == null ? void 0 : f.description) ?? "", u = n.quantity, d = fr(r ? [
      { label: "DV", value: Ot(r.damage, 0), emphasis: "strong" },
      { label: "AP", value: Ot(r.ap, 0) },
      { label: "Type", value: r.damageTypeLabel ?? r.damageType ?? "" }
    ] : [
      { label: "Type", value: l },
      ...u !== void 0 ? [{ label: "Qty", value: Ot(u, 0) }] : []
    ]), m = Oc(r ? [
      { label: "Skill", value: ((p = r.skillDef) == null ? void 0 : p.label) ?? r.skill ?? "" },
      { label: "Category", value: r.category ?? n.weaponCategory ?? n.category ?? "" },
      { label: "Range", value: bA(r.range) }
    ] : [
      { label: "Category", value: n.category ?? l },
      { label: "Quantity", value: u !== void 0 ? Ot(u, 0) : "" }
    ]);
    return {
      id: (t == null ? void 0 : t.id) ?? "",
      accordionId: o,
      isExpanded: F(this, qi).has(o),
      name: (t == null ? void 0 : t.name) ?? l,
      img: (t == null ? void 0 : t.img) ?? "icons/svg/item-bag.svg",
      subtitle: ((h = r == null ? void 0 : r.skillDef) == null ? void 0 : h.label) ?? n.category ?? l,
      summaryStats: d,
      detailTags: yA([
        n.equipped ? "Equipped" : "",
        n.isPrimary ? "Primary" : "",
        n.weaponCategory ?? n.category ?? ""
      ]),
      detailRows: m,
      detailText: gA(c),
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
    const s = this.getPersistentActor() ?? this.actor, r = _c[n] ?? Aa(n), o = s.items.filter((d) => d.type === n).length;
    await s.createEmbeddedDocuments("Item", [{
      name: `${r} ${o + 1}`,
      type: n
    }]), this.render({ force: !0 });
  }
  async _onEditOwnedItem(t, i) {
    var s, r, o;
    (s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (r = t == null ? void 0 : t.stopPropagation) == null || r.call(t);
    const n = C(this, hn, ro).call(this, i, t);
    (o = n == null ? void 0 : n.sheet) == null || o.render(!0);
  }
  async _onDeleteOwnedItem(t, i) {
    var r, o;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const n = C(this, hn, ro).call(this, i, t);
    if (!n) return;
    await (this.getPersistentActor() ?? this.actor).deleteEmbeddedDocuments("Item", [n.id]), this.render({ force: !0 });
  }
  async _onToggleInventoryAccordion(t, i) {
    var s, r, o, l, c, u, d, m, f, p;
    (s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (r = t == null ? void 0 : t.stopPropagation) == null || r.call(t);
    const n = String(
      ((o = i == null ? void 0 : i.dataset) == null ? void 0 : o.accordionId) ?? ((u = (c = (l = i == null ? void 0 : i.closest) == null ? void 0 : l.call(i, "[data-accordion-id]")) == null ? void 0 : c.dataset) == null ? void 0 : u.accordionId) ?? ((p = (f = (m = (d = t == null ? void 0 : t.target) == null ? void 0 : d.closest) == null ? void 0 : m.call(d, "[data-accordion-id]")) == null ? void 0 : f.dataset) == null ? void 0 : p.accordionId) ?? ""
    ).trim();
    n && (F(this, qi).has(n) ? F(this, qi).delete(n) : F(this, qi).add(n), this.render({ force: !1 }));
  }
  _buildActiveCrits() {
    var i;
    const t = ((i = this.getPersistentActor) == null ? void 0 : i.call(this)) ?? this.actor;
    return Hd(t).map((n) => {
      const s = Zo(n.remedyKey);
      return {
        id: n.id,
        label: n.label ?? Aa(n.key),
        locationLabel: n.locationLabel ?? Aa(n.locationKey),
        detail: Im([
          Array.isArray(n.gates) && n.gates.length ? `Gates: ${n.gates.join(", ")}` : "",
          Array.isArray(n.mods) && n.mods.length ? `Mods: ${n.mods.join(", ")}` : "",
          n.escalationKey ? `Escalates: ${n.escalationKey}` : ""
        ]).join(" | "),
        remedyLabel: s.label,
        remedyKey: s.key,
        remediable: s.remediable !== !1,
        machineActorUuid: (t == null ? void 0 : t.uuid) ?? ""
      };
    });
  }
  async _onToggleStatuses(t, i) {
    var r, o, l, c, u, d;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), ((l = i == null ? void 0 : i.dataset) == null ? void 0 : l.actionDisabled) === "true")
      return (u = ui.notifications) == null || u.warn(((c = i == null ? void 0 : i.dataset) == null ? void 0 : c.actionReason) || "Statuses are not available right now."), !1;
    const n = this.getPersistentActor() ?? this.actor, s = this._resolveStatusToken(n);
    return s ? Wu({
      actor: n,
      token: s
    }) : ((d = ui.notifications) == null || d.warn("Statuses require a token for this actor on the current scene."), !1);
  }
  async _onMachineWeaponAttack(t, i) {
    var u, d, m, f, p, h, g, y, b, S, w, v;
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
      const P = ((w = B.getSnapshot) == null ? void 0 : w.call(B, n, { token: l })) ?? null;
      if (P != null && P.hasCombatant) {
        const E = await B.spendResource(n, {
          token: l,
          resource: "sa",
          cost: 2,
          actionId: "attack",
          actionLabel: "Attack",
          actionCostLabel: "2 SA",
          actionCategory: "complex"
        });
        E != null && E.ok || (v = ui.notifications) == null || v.warn((E == null ? void 0 : E.reason) ?? "Unable to record attack action.");
      }
    }
    return !!c;
  }
  async _onMachineCritRemedy(t, i) {
    var r, o, l, c, u, d, m;
    (r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t);
    const n = this.getPersistentActor() ?? this.actor, s = await dm({
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
qi = new WeakMap(), hn = new WeakSet(), ro = function(t, i) {
  var s, r, o, l, c, u, d, m;
  const n = String(
    ((s = t == null ? void 0 : t.dataset) == null ? void 0 : s.itemId) ?? ((l = (o = (r = t == null ? void 0 : t.closest) == null ? void 0 : r.call(t, "[data-item-id]")) == null ? void 0 : o.dataset) == null ? void 0 : l.itemId) ?? ((m = (d = (u = (c = i == null ? void 0 : i.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, "[data-item-id]")) == null ? void 0 : d.dataset) == null ? void 0 : m.itemId) ?? ""
  ).trim();
  return n ? this.actor.items.get(n) ?? null : null;
}, O(Ge, "LAYOUT_ID", "vehicle"), O(Ge, "PARTS", {
  sheet: {
    get template() {
      return `${X}/v2/actor/vehicle-sheet.hbs`;
    }
  }
}), O(Ge, "DEFAULT_OPTIONS", foundry.utils.mergeObject(Yt(Ge, Ge, "DEFAULT_OPTIONS"), {
  classes: ["vehicle-sheet", T, "actor-sheet-v2", "mwd-vehicle-sheet", "mwd-sheet"],
  window: { minWidth: 520, minHeight: 720, resizable: !0 },
  position: { width: 940, height: 900 },
  actions: {
    ...Yt(Ge, Ge, "DEFAULT_OPTIONS").actions,
    createOwnedItem: Ge.prototype._onCreateOwnedItem,
    editOwnedItem: Ge.prototype._onEditOwnedItem,
    deleteOwnedItem: Ge.prototype._onDeleteOwnedItem,
    toggleInventoryAccordion: Ge.prototype._onToggleInventoryAccordion,
    machineWeaponAttack: Ge.prototype._onMachineWeaponAttack,
    toggleStatuses: Ge.prototype._onToggleStatuses,
    machineCritRemedy: Ge.prototype._onMachineCritRemedy,
    assignPilot: Ge.prototype._onAssignPilot,
    removePilot: Ge.prototype._onRemovePilot,
    openPilot: Ge.prototype._onOpenPilot
  }
}, { inplace: !1 }));
let fs = Ge;
function ht(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function Dm(a = []) {
  return a.map((e) => String(e ?? "").trim()).filter(Boolean);
}
function ei(a = "") {
  return String(a ?? "").replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim().replace(/\b\w/g, (e) => e.toUpperCase());
}
function pr(a = []) {
  return a.map((e) => {
    const t = e ?? {};
    return {
      ...t,
      label: String(t.label ?? "").trim(),
      value: String(t.value ?? "").trim(),
      emphasis: t.emphasis ?? "",
      title: String(t.title ?? "").trim(),
      tone: String(t.tone ?? "").trim(),
      parts: Array.isArray(t.parts) ? t.parts.filter((i) => i && i.value !== void 0 && i.value !== null && String(i.value).trim() !== "").map((i) => ({
        label: String(i.label ?? "").trim(),
        value: String(i.value ?? "").trim(),
        tone: String(i.tone ?? "").trim(),
        title: String(i.title ?? "").trim()
      })) : []
    };
  }).filter((e) => e.value !== "" || e.parts.length).map((e) => ({
    ...e,
    hasParts: e.parts.length > 0
  }));
}
function Lc(a = []) {
  return Dm(a).map((e) => ({ label: e }));
}
function xc(a = []) {
  return a.filter((e) => e && e.value !== void 0 && e.value !== null && String(e.value).trim() !== "").map((e) => ({
    label: String(e.label ?? "").trim(),
    value: String(e.value ?? "").trim()
  }));
}
function Fi(a = "") {
  var t, i;
  const e = ((i = (t = k == null ? void 0 : k.actor) == null ? void 0 : t.vehicle) == null ? void 0 : i.quickActions) ?? {};
  return String((e == null ? void 0 : e[a]) ?? ei(a)).trim() || ei(a);
}
var gn, lo;
const Ut = class Ut extends fs {
  constructor() {
    super(...arguments);
    we(this, gn);
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
    const t = ht((r = (s = this.actor.system) == null ? void 0 : s.mwd) == null ? void 0 : r.tonnage, 0), i = ((l = (o = this.actor.system) == null ? void 0 : o.mwd) == null ? void 0 : l.weightClass) ?? "medium", n = { light: "Light", medium: "Medium", heavy: "Heavy", assault: "Assault" };
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
        displayValue: n[i] ?? ei(i),
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
    var n, s, r, o;
    const t = ((s = (n = this.actor.system) == null ? void 0 : n.monitors) == null ? void 0 : s.structure) ?? {}, i = ((o = (r = this.actor.system) == null ? void 0 : r.monitors) == null ? void 0 : o.armor) ?? {};
    return [
      to({ id: "structure", label: "Structure", kind: "structure", monitor: t, editable: this.isEditable }),
      to({ id: "armor", label: "Armor", kind: "armor", monitor: i, editable: this.isEditable })
    ];
  }
  _buildSummaryStats() {
    var f, p, h, g, y, b, S, w, v, P, E, z, G, Y;
    const t = ((p = (f = this.actor.system) == null ? void 0 : f.monitors) == null ? void 0 : p.armor) ?? {}, i = ((g = (h = this.actor.system) == null ? void 0 : h.monitors) == null ? void 0 : g.structure) ?? {}, n = ((b = (y = this.actor.system) == null ? void 0 : y.monitors) == null ? void 0 : b.heat) ?? {}, s = ((w = (S = this.actor.system) == null ? void 0 : S.mwd) == null ? void 0 : w.heat) ?? {}, r = Math.max(0, ht(n.value ?? s.current, 0)), o = Math.max(0, ht(n.max ?? s.max ?? s.hardMax, 0)), l = us(s.thresholds ?? {}, o), c = qr(Gr(r, l, o)), u = c.toUpperCase(), d = Xb({ armor: t, structure: i }), m = nm(((P = (v = this.actor.system) == null ? void 0 : v.mwd) == null ? void 0 : P.crits) ?? []);
    return pr([
      { label: "Weight", value: ei(((z = (E = this.actor.system) == null ? void 0 : E.mwd) == null ? void 0 : z.weightClass) ?? "medium"), emphasis: "strong" },
      { label: "Tonnage", value: ht((Y = (G = this.actor.system) == null ? void 0 : G.mwd) == null ? void 0 : Y.tonnage, 0) },
      { label: "Integrity", parts: d.parts, title: d.title },
      { label: "Heat", value: `${r} / ${o} ${u}`, title: c },
      { label: "Status", value: m.value, title: m.title, tone: m.count > 0 ? "red" : "" }
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
    var l, c, u, d;
    const t = ((c = (l = this.actor.system) == null ? void 0 : l.monitors) == null ? void 0 : c.heat) ?? {}, i = ((d = (u = this.actor.system) == null ? void 0 : u.mwd) == null ? void 0 : d.heat) ?? {}, n = Math.max(0, ht(t.value ?? i.current, 0)), s = Math.max(0, ht(t.max ?? i.max ?? i.hardMax, 0)), r = us(i.thresholds ?? {}, s), o = Gr(n, r, s);
    return {
      label: "Heat",
      current: n,
      max: s,
      editable: !!this.isEditable,
      status: qr(o),
      thresholds: {
        runningHot: ht(r.runningHot, 0),
        overheated: ht(r.overheated, 0),
        shutdown: ht(r.shutdown, 0),
        hot: ht(r.hot, 0),
        overheat: ht(r.overheat, 0),
        danger: ht(r.danger, 0)
      },
      segments: Array.from({ length: s }, (m, f) => {
        const p = f + 1;
        return {
          value: p,
          filled: p <= n,
          breakpoint: Dm([
            p === ht(r.runningHot, 0) ? "runningHot" : "",
            p === ht(r.overheated, 0) ? "overheated" : "",
            p === ht(r.shutdown, 0) ? "shutdown" : ""
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
        label: Fi("primaryWeapons"),
        hint: (i == null ? void 0 : i.name) ?? "Primary weapon group",
        handler: "mechAttack",
        disabled: !i,
        dataset: { attackKind: "primary" }
      },
      {
        label: Fi("rangedAttack"),
        hint: "Prompt for a weapon group",
        handler: "mechAttack",
        disabled: !n,
        dataset: { attackKind: "ranged" }
      },
      {
        label: Fi("meleeAttack"),
        hint: "Prompt for a melee profile",
        handler: "mechAttack",
        disabled: !s,
        dataset: { attackKind: "melee" }
      },
      {
        label: Fi("dodgeCheck"),
        hint: "Piloting response",
        handler: "mechRoll",
        disabled: !1,
        dataset: { rollKind: "dodge" }
      },
      {
        label: Fi("pilotingCheck"),
        hint: "Vehicle handling test",
        handler: "mechRoll",
        disabled: !1,
        dataset: { rollKind: "piloting" }
      },
      {
        label: Fi("sensorSweep"),
        hint: "Perception or technician",
        handler: "mechRoll",
        disabled: !t.hasSensorSweep,
        dataset: { rollKind: "sensor" }
      },
      {
        label: Fi("emergencyRepair"),
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
      summaryStats: pr([
        { label: "Weapons", value: Array.isArray(s.weapons) ? s.weapons.length : 0, emphasis: "strong" },
        { label: "Missing", value: Array.isArray(s.missingWeaponIds) ? s.missingWeaponIds.length : 0 }
      ]),
      detailTags: Lc([
        s.isPrimary ? "Primary" : "",
        ...Array.isArray(s.weapons) ? s.weapons.map((r) => {
          var o;
          return ((o = r.system) == null ? void 0 : o.weaponCategory) ?? "";
        }) : []
      ]),
      detailRows: xc([
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
    const t = ((o = (r = this.actor.system) == null ? void 0 : r.mwd) == null ? void 0 : o.loadout) ?? {}, i = ((l = k == null ? void 0 : k.mwd) == null ? void 0 : l.hardpointType) ?? {}, n = ((c = k == null ? void 0 : k.mwd) == null ? void 0 : c.hardpointSize) ?? {}, s = ((u = k == null ? void 0 : k.mwd) == null ? void 0 : u.hardpointLocation) ?? {};
    return Array.from(t.hardpoints ?? []).map((d) => ({
      id: d.id,
      name: `${i[d.type] ?? ei(d.type)} ${n[d.size] ?? ei(d.size)}`,
      subtitle: s[d.location] ?? ei(d.location),
      summaryStats: pr([
        { label: "Type", value: i[d.type] ?? ei(d.type), emphasis: "strong" },
        { label: "Size", value: n[d.size] ?? ei(d.size) }
      ]),
      detailTags: Lc([
        d.occupiedByName ? `Occupied by ${d.occupiedByName}` : "Open"
      ]),
      detailRows: xc([
        { label: "Location", value: s[d.location] ?? ei(d.location) },
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
        await C(this, gn, lo).call(this, n, r);
      else if (s === "primary") {
        const h = (((d = n.system) == null ? void 0 : d.weaponGroups) ?? []).find((g) => g == null ? void 0 : g.isPrimary) ?? null;
        h != null && h.id ? await C(this, gn, lo).call(this, n, h.id) : await ((m = n.rollRangedAttack) == null ? void 0 : m.call(n));
      } else s === "melee" ? await ((f = n.rollMeleeAttack) == null ? void 0 : f.call(n)) : await ((p = n.rollRangedAttack) == null ? void 0 : p.call(n));
    } catch (h) {
      console.error("MWD | Failed to launch BattleMech attack", h), Ji(h, "Unable to launch that BattleMech attack.");
    }
  }
  async _onMechRoll(t, i) {
    var r, o, l, c, u, d, m;
    (r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t);
    const n = this.getPersistentActor() ?? this.actor, s = String(((l = i == null ? void 0 : i.dataset) == null ? void 0 : l.rollKind) ?? "").trim();
    try {
      s === "dodge" ? await ((c = n.rollDodge) == null ? void 0 : c.call(n)) : s === "piloting" ? await ((u = n.rollPilotingCheck) == null ? void 0 : u.call(n)) : s === "sensor" ? await ((d = n.rollSensorSweep) == null ? void 0 : d.call(n)) : s === "repair" && await ((m = n.rollEmergencyRepair) == null ? void 0 : m.call(n));
    } catch (f) {
      console.error("MWD | Failed to launch BattleMech check", f), Ji(f, "Unable to launch that BattleMech check.");
    }
  }
};
gn = new WeakSet(), lo = async function(t, i) {
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
    const b = ((g = B.getSnapshot) == null ? void 0 : g.call(B, t, { token: o })) ?? null;
    if (b != null && b.hasCombatant) {
      const S = await B.spendResource(t, {
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
}, O(Ut, "LAYOUT_ID", "battlemech"), O(Ut, "PARTS", {
  sheet: {
    get template() {
      return `${X}/v2/actor/battlemech-sheet.hbs`;
    }
  }
}), O(Ut, "DEFAULT_OPTIONS", foundry.utils.mergeObject(Yt(Ut, Ut, "DEFAULT_OPTIONS"), {
  classes: ["battlemech-sheet", T, "actor-sheet-v2", "mwd-battlemech-sheet", "mwd-sheet"],
  position: { width: 980, height: 940 },
  actions: {
    ...Yt(Ut, Ut, "DEFAULT_OPTIONS").actions,
    mechAttack: Ut.prototype._onMechAttack,
    mechRoll: Ut.prototype._onMechRoll
  }
}, { inplace: !1 }));
let oo = Ut;
function AA() {
  console.log(`${Ce}Registering Actor sheets (V2)`);
  const { Actors: a } = foundry.documents.collections;
  a.registerSheet(T, io, {
    types: ["character"],
    makeDefault: !0,
    label: "Character (V2)"
  }), a.registerSheet(T, Nm, {
    types: ["npc"],
    makeDefault: !0,
    label: "NPC (V2)"
  }), a.registerSheet(T, fs, {
    types: ["vehicle"],
    makeDefault: !0,
    label: "Vehicle (V2)"
  }), a.registerSheet(T, oo, {
    types: ["battlemech"],
    makeDefault: !0,
    label: "BattleMech (V2)"
  });
}
const { HandlebarsApplicationMixin: TA } = foundry.applications.api, { HTMLField: $c, StringField: wA } = foundry.data.fields, hr = /* @__PURE__ */ new Set(["system.notes", "system.description"]), kA = /* @__PURE__ */ new Set(["name"]), vA = Object.freeze({
  [A.itemType.personalWeapon]: `${X}/v2/item/personal-weapon-root.hbs`,
  [A.itemType.mechWeapon]: `${X}/v2/item/mech-weapon-root.hbs`,
  [A.itemType.armor]: `${X}/v2/item/armor-root.hbs`
});
function gr(a, e) {
  const t = new a({ required: !1, blank: !0, initial: "" });
  return t.name = e, t;
}
function MA(a = {}) {
  return {
    ...a,
    sourceReference: a.sourceReference ?? gr(wA, "system.sourceReference"),
    notes: a.notes ?? gr($c, "system.notes"),
    description: a.description ?? gr($c, "system.description")
  };
}
function CA(a = {}) {
  return Object.fromEntries(
    Object.entries(a ?? {}).filter(([, e]) => e !== void 0)
  );
}
var Vi, Ni, Yi, Ea, ni, Xa, co;
const Ze = class Ze extends TA(foundry.applications.sheets.ItemSheetV2) {
  constructor() {
    super(...arguments);
    we(this, ni);
    we(this, Vi, /* @__PURE__ */ new Map());
    we(this, Ni, /* @__PURE__ */ new Map());
    we(this, Yi, null);
    we(this, Ea, /* @__PURE__ */ new Map());
    /** @override */
    O(this, "tabGroups", {
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
        editImage: Ze._onEditImage,
        tab: Ze.prototype._onClickTab,
        accordion: Ze.prototype._onClickAccordion,
        checkbarElement: Ze._onClickCheckbar,
        modifierAdd: Ze._onModifierAdd,
        modifierDelete: Ze._onModifierDelete,
        modifierValueChange: Ze._onModifierValueChange,
        modifierConditionChange: Ze._onModifierConditionChange,
        modifierSelectionChange: Ze._onModifierSelectionChange,
        effectCreate: Ze._onEffectCreate,
        effectEdit: Ze._onEffectEdit,
        effectDelete: Ze._onEffectDelete,
        effectToggleDisabled: Ze._onEffectToggleDisabled
      },
      form: {
        submitOnChange: !1,
        closeOnSubmit: !1,
        handler: Ze.prototype._onSubmitForm
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
      return vA[n] ?? `${X}/v2/item/${n}.hbs`;
    }
    return ((i = super._getPartTemplate) == null ? void 0 : i.call(this, t)) ?? "";
  }
  /**
   * Override title to show localized item type and name.
   * @override
   */
  get title() {
    const t = this._getCanonicalItemType();
    return `${Le.itemType.singular[t] ?? t}: ${this.item.name}`;
  }
  /**
   * Prepare context data for rendering.
   * @param {object} options - Rendering options
   * @returns {Promise<object>} The context object
   * @override
   */
  async _prepareContext(t) {
    var E, z, G, Y, q, Q, L, U, V;
    const i = await super._prepareContext(t), n = ((z = (E = game.system.mwd.modifiers) == null ? void 0 : E.getEnums) == null ? void 0 : z.call(E)) ?? {}, s = foundry.utils.deepClone((i == null ? void 0 : i.options) ?? {}), r = MA((i == null ? void 0 : i.fields) ?? ((Y = (G = this.item.system) == null ? void 0 : G.schema) == null ? void 0 : Y.fields) ?? {}), o = ((Q = (q = this.item.actor) == null ? void 0 : q.getAttributes) == null ? void 0 : Q.call(q, this.item)) ?? [], l = this._getCanonicalItemType(), c = !this.item.actor, u = !!this.item.actor, d = Le.itemType.singular[l] ?? l, m = this._getEffectEntries(), f = m.filter((Z) => Z.syncedCount > 0).length, p = this.constructor.LAYOUT_ID, h = this.item.actor ? (Z) => o.includes(Z) : (Z) => !0, g = l === A.itemType.skill, b = ["mwd", "item-sheet", this.isEditable ? "editable" : "locked"], S = b.join(" ");
    s.classes = b, s.cssClass = S;
    const w = async (Z, { secrets: re = this.item.isOwner } = {}) => foundry.applications.ux.TextEditor.implementation.enrichHTML(Z ?? "", {
      async: !0,
      secrets: re,
      relativeTo: this.item
    }), v = foundry.utils.expandObject({
      "system.notes": await w(this.item.system.notes ?? ""),
      "system.description": await w(this.item.system.description ?? "")
    }), P = {
      ...i,
      item: this.item,
      data: this.item,
      system: this.item.system,
      // AppV2 prose editors need both raw field definitions and pre-enriched
      // HTML. Keeping both here avoids template-specific enrichment branches.
      fields: r,
      enriched: v,
      enrichedDescription: ((L = v == null ? void 0 : v.system) == null ? void 0 : L.description) ?? "",
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
        ...Me.getEnums(h, g),
        ...n
      },
      MWD: Le,
      itemSheet: {
        canonicalType: l,
        typeLabel: d,
        isArmorSheet: l === A.itemType.armor,
        isStandalone: c,
        canUseActorControls: u,
        supportsEffectSync: !!((V = (U = this.item).supportsEquippedEffectSync) != null && V.call(U)),
        effectEntries: m,
        effectCount: m.length,
        syncedEffectCount: f,
        summaryChips: this._getSummaryChips(),
        stateChips: this._getStateChips(m)
      },
      cssClass: S,
      tabs: this._getTabs()
    };
    return p && (P.layout = await sa.get(p)), P;
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
    o && (F(this, Vi).set(r, o), C(this, ni, Xa).call(this, this._getRootElement(), r, o));
  }
  _onClickAccordion(t, i) {
    var u, d, m;
    const n = ((u = i == null ? void 0 : i.closest) == null ? void 0 : u.call(i, ".csb-accordion__trigger[data-section]")) ?? ((m = (d = t == null ? void 0 : t.target) == null ? void 0 : d.closest) == null ? void 0 : m.call(d, ".csb-accordion__trigger[data-section]"));
    if (!n) return;
    const s = n.dataset.section, r = n.closest(".csb-accordion");
    if (!r || !s) return;
    const o = r.dataset.group || "default", c = (F(this, Ni).has(o) ? F(this, Ni).get(o) : r.dataset.default || null) === s ? null : s;
    F(this, Ni).set(o, c), C(this, ni, co).call(this, r, c);
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
          b && (F(this, Vi).set(d, b), C(this, ni, Xa).call(this, n, d, b));
        });
      const f = F(this, Vi).get(d), p = u.dataset.default || ((l = m[0]) == null ? void 0 : l.dataset.tab), h = f || p;
      h && C(this, ni, Xa).call(this, n, d, h);
    }
    for (const u of n.querySelectorAll(".csb-tabs")) {
      const d = u.dataset.group || "default", m = Array.from(u.querySelectorAll(".csb-tab-link[data-tab]"));
      if (!m.length) continue;
      const f = F(this, Vi).get(d), p = u.dataset.default || ((c = m[0]) == null ? void 0 : c.dataset.tab), h = f || p;
      h && C(this, ni, Xa).call(this, n, d, h);
    }
    for (const u of n.querySelectorAll(".csb-accordion")) {
      const d = u.dataset.group || "default", m = F(this, Ni).has(d) ? F(this, Ni).get(d) : u.dataset.default || null;
      C(this, ni, co).call(this, u, m);
    }
    for (const u of n.querySelectorAll("prose-mirror[name]")) {
      const d = u.getAttribute("name") ?? "";
      hr.has(d) && u.addEventListener("change", (m) => {
        m.preventDefault(), m.stopPropagation(), this._updateRichTextField(u);
      });
    }
    if (this.isEditable)
      for (const u of n.querySelectorAll("input[name], select[name], textarea[name]")) {
        if (u.closest("prose-mirror") || u.hasAttribute("data-action") || !(u instanceof HTMLElement)) continue;
        const d = String(u.getAttribute("name") ?? "").trim();
        u instanceof HTMLInputElement && !kA.has(d) && !["checkbox", "radio"].includes(u.type) ? u.addEventListener("input", (m) => {
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
    if (!this.isEditable || !hr.has(i)) return;
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
    const n = String(((o = t == null ? void 0 : t.getAttribute) == null ? void 0 : o.call(t, "name")) ?? "").trim() || foundry.utils.randomID(), s = F(this, Ea).get(n);
    s && clearTimeout(s);
    const r = setTimeout(() => {
      F(this, Ea).delete(n), this._syncNamedField(t, i);
    }, 180);
    F(this, Ea).set(n, r);
  }
  _getNamedFieldUpdate(t) {
    var s, r;
    if (!(t instanceof HTMLElement)) return null;
    const i = String(((s = t.getAttribute) == null ? void 0 : s.call(t, "name")) ?? "").trim();
    if (!i || hr.has(i)) return null;
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
    const n = this._getNamedFieldUpdate(t), s = CA({
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
      Re(this, Yi, null);
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
    Re(this, Yi, i.length ? i : null);
  }
  _restoreScrollPositions() {
    const t = F(this, Yi);
    if (!(t != null && t.length)) return;
    const i = () => {
      const n = this._getRootElement();
      if (n)
        for (const s of t) {
          const r = n.querySelectorAll(s.selector).item(s.index);
          r instanceof HTMLElement && (r.scrollTop = s.top, r.scrollLeft = s.left);
        }
    };
    i(), requestAnimationFrame(i), Re(this, Yi, null);
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
Vi = new WeakMap(), Ni = new WeakMap(), Yi = new WeakMap(), Ea = new WeakMap(), ni = new WeakSet(), Xa = function(t, i, n) {
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
}, co = function(t, i) {
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
}, O(Ze, "LAYOUT_ID", null), /** @override */
O(Ze, "PARTS", {
  sheet: {
    template: "",
    // Set dynamically in _getPartTemplate
    scrollable: [".sheet-body"]
  }
}), O(Ze, "TABS", {
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
let oi = Ze;
class uo extends oi {
}
O(uo, "LAYOUT_ID", "contact"), O(uo, "PARTS", {
  sheet: {
    template: `${X}/v2/item/contact.hbs`,
    scrollable: [".sheet-body"]
  }
});
const EA = Object.freeze([
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
]), PA = Object.freeze([
  { value: "ammo", label: "Ammunition" },
  { value: "explosive", label: "Explosive" },
  { value: "medical", label: "Medical" },
  { value: "repair", label: "Repair" },
  { value: "fuel", label: "Fuel / Power Cell" },
  { value: "utility", label: "Utility" }
]);
function RA(a) {
  return a === "consumable" ? PA : EA;
}
class mo extends oi {
  async _prepareContext(e) {
    var r;
    const t = await super._prepareContext(e), i = this._getCanonicalItemType(), n = this.item.system ?? {}, s = RA(i);
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
    }, t.layout = await sa.get(i === "consumable" ? "consumable" : "gear"), t;
  }
}
// One sheet class intentionally backs both gear and consumables so quantity,
// rating, and reference editing never drift into parallel implementations.
O(mo, "LAYOUT_ID", null), O(mo, "PARTS", {
  sheet: {
    template: `${X}/v2/item/gear.hbs`,
    scrollable: [".sheet-body"]
  }
});
class fo extends oi {
  async _prepareContext(e) {
    var r, o;
    const t = await super._prepareContext(e), i = Kt(this.item.system ?? {}), n = Xu(), s = Array.isArray((r = t.ENUMS) == null ? void 0 : r.skills) ? t.ENUMS.skills.map((l) => ({
      value: String((l == null ? void 0 : l.value) ?? "").trim(),
      label: String((l == null ? void 0 : l.label) ?? (l == null ? void 0 : l.value) ?? "").trim()
    })).filter((l) => l.value) : [];
    return t.system = {
      ...i,
      effects: (Array.isArray(i.effects) ? i.effects : []).map((l) => ({
        ...l,
        showSkillPicker: Ju(l) || Array.isArray(l.skillKeys) && l.skillKeys.length > 0,
        isEdgeEvent: l.type === "edgeEvent"
      }))
    }, t.traitEditor = {
      ...n,
      skills: s
    }, t.itemSheet = {
      ...t.itemSheet ?? {},
      sheetClass: "mwd-item-sheet--quality",
      summaryChips: [
        { label: "Category", value: $n(i.category) },
        { label: "Tier", value: Bn(i.tier) },
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
O(fo, "LAYOUT_ID", "quality"), O(fo, "PARTS", {
  sheet: {
    template: `${X}/v2/item/quality.hbs`,
    scrollable: [".sheet-body"]
  }
});
class po extends oi {
}
O(po, "LAYOUT_ID", "asset-module"), O(po, "PARTS", {
  sheet: {
    template: `${X}/v2/item/assetModule.hbs`,
    scrollable: [".sheet-body"]
  }
});
class ho extends oi {
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
    const e = ln(this.item.system ?? {}), t = Oi(e.catalogId), n = Bs(t, e.selectedGrants, { legacySelectedSkill: e.selectedSkill }).map((r) => r.choice).filter(Boolean).map((r) => on(r, { includeBonusText: !0 })).join(", "), s = this.item.actor ? Li(this.item.actor).stateByItemId.get(this.item.id) ?? null : null;
    return [
      { label: "Slot", value: Da(e.moduleType) },
      { label: "Module", value: (t == null ? void 0 : t.label) ?? "Unlinked" },
      { label: "Bonuses", value: n || "Pending choice" },
      s ? { label: "Status", value: s.isActive ? "Active" : "Inactive" } : null
    ].filter(Boolean);
  }
  async _prepareContext(e) {
    const t = await super._prepareContext(e), i = ln(this.item.system ?? {}), n = i.moduleType, s = Oi(i.catalogId), r = n ? Jo(n) : [], o = Td(s, i.selectedGrants, { legacySelectedSkill: i.selectedSkill }), l = this.item.actor ? Li(this.item.actor).stateByItemId.get(this.item.id) ?? null : null;
    return t.lifeModuleEditor = {
      moduleType: n,
      moduleTypeLabel: Da(n),
      moduleTypes: gd().map((c) => ({
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
        return ((u = Oi(c)) == null ? void 0 : u.label) ?? c;
      }),
      excludesAnyLabels: ((s == null ? void 0 : s.excludesAny) ?? []).map((c) => {
        var u;
        return ((u = Oi(c)) == null ? void 0 : u.label) ?? c;
      }),
      actorState: l,
      warningLabels: [...(l == null ? void 0 : l.warningLabels) ?? []],
      isOwned: !!this.item.actor,
      statusLabel: l ? l.isActive ? "Active" : "Inactive" : s ? "Configured" : "Unlinked",
      statusReason: (l == null ? void 0 : l.inactiveReason) ?? ""
    }, t;
  }
}
O(ho, "LAYOUT_ID", "life-module"), O(ho, "PARTS", {
  sheet: {
    template: `${X}/v2/item/lifeModule.hbs`,
    scrollable: [".sheet-body"]
  }
});
class go extends oi {
}
O(go, "LAYOUT_ID", "skill"), O(go, "PARTS", {
  sheet: {
    template: `${X}/v2/item/skill.hbs`,
    scrollable: [".sheet-body"]
  }
});
const NA = Object.freeze([
  "firearms",
  "projectileWeapons",
  "heavyWeapons",
  "meleeCombat"
]), IA = Object.freeze([
  { value: "energy", label: "Energy" },
  { value: "kinetic", label: "Kinetic" },
  { value: "ballistic", label: "Ballistic" },
  { value: "explosive", label: "Explosive" },
  { value: "plasma", label: "Plasma" },
  { value: "electrical", label: "Electrical" },
  { value: "melee", label: "Melee" },
  { value: "none", label: "None" }
]), Bc = Object.freeze([
  { value: "quantity", label: "Quantity" },
  { value: "durability.current", label: "Durability" },
  { value: "", label: "Custom Path" }
]), DA = "consumable";
function OA(a) {
  return String((a == null ? void 0 : a.canonicalType) ?? (a == null ? void 0 : a.type) ?? "item").trim().replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (t) => t.toUpperCase());
}
function Om(a) {
  return String((a == null ? void 0 : a.canonicalType) ?? (a == null ? void 0 : a.type) ?? "").trim() === DA;
}
function _A(a, e = "") {
  var i;
  const t = String(e ?? "").trim();
  return Array.from(((i = a == null ? void 0 : a.actor) == null ? void 0 : i.items) ?? []).filter((n) => {
    const s = String((n == null ? void 0 : n.id) ?? "").trim();
    return !s || s === (a == null ? void 0 : a.id) ? !1 : s === t || Om(n);
  }).sort((n, s) => String((n == null ? void 0 : n.name) ?? "").localeCompare(String((s == null ? void 0 : s.name) ?? ""))).map((n) => ({
    value: n.id,
    label: `${n.name || "Unnamed Item"} (${OA(n)})`
  }));
}
function yo(a, e, t) {
  const i = String(e ?? "").trim();
  return !i || a.some((n) => n.value === i) ? a : a.concat({ value: i, label: t(i) });
}
function LA(a, e) {
  var d, m, f, p, h, g, y;
  const t = ii(e), i = _A(a, (d = t.link) == null ? void 0 : d.itemId), n = qf({
    source: t,
    actor: (a == null ? void 0 : a.actor) ?? null
  }), s = ((h = (f = (m = a == null ? void 0 : a.actor) == null ? void 0 : m.items) == null ? void 0 : f.get) == null ? void 0 : h.call(f, ((p = t.link) == null ? void 0 : p.itemId) ?? "")) ?? null, r = yo(
    [...Bc],
    (g = t.link) == null ? void 0 : g.itemPath,
    (b) => `Custom (${b})`
  ), o = new Set(Bc.map((b) => String(b.value ?? "").trim())), l = String(((y = t.link) == null ? void 0 : y.itemPath) ?? "").trim(), c = !!(a != null && a.actor);
  let u = "";
  return t.kind === "itemRef" && (c ? i.length ? s ? Om(s) ? l ? u = n.isTracked ? `Linked to ${s.name} | Available ${Number(n.current ?? 0)}` : `Linked to ${s.name} | Path not resolving to a tracked value yet.` : u = `Linked to ${s.name}. Pick which field should be consumed.` : u = `Linked to ${s.name} | Legacy non-consumable source. Repoint this to a Consumable item when convenient.` : u = "Pick an owned Consumable item to consume from." : u = "Add an owned Consumable item to the actor, then link this weapon to it." : u = "Embed this weapon in an actor to link it to owned inventory."), {
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
class Ks extends oi {
  /** @override */
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      actions: {
        ...super.DEFAULT_OPTIONS.actions,
        weaponSkillChange: Ks._onWeaponSkillChange
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
      defenses: xe.getDefenses()
    };
    const n = Array.isArray((l = t.ENUMS) == null ? void 0 : l.skills) ? t.ENUMS.skills : [], s = (c = this.item.system) == null ? void 0 : c.skill, r = (u = this.item.system) == null ? void 0 : u.damageType, o = i === "personalWeapon" ? yo(
      n.filter((h) => NA.includes(h.value)),
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
      damageTypes: yo(
        i === "personalWeapon" ? [...ts] : [...IA],
        r,
        (h) => i === "personalWeapon" ? Vt(h) : h
      ),
      ranges: xt.RANGE_ORDER.map((h) => ({
        value: h,
        label: i === "personalWeapon" ? ls(h) : h.charAt(0).toUpperCase() + h.slice(1)
      })),
      rangeBandLabels: Object.fromEntries(xt.RANGE_ORDER.map((h) => [
        h,
        i === "personalWeapon" ? ls(h) : h.charAt(0).toUpperCase() + h.slice(1)
      ])),
      weaponCapabilityOptions: tf,
      payloadCapabilityOptions: af,
      ammoDamageTypes: [{ value: "", label: "Use Weapon Default" }, ...ts],
      payloadTemplateShapes: Zc,
      payloadTemplatePlacements: eu,
      areaEffectKinds: [
        { value: Et.discrete, label: "Discrete" },
        { value: Et.persistent, label: "Persistent Hazard" }
      ],
      exposureTiers: [
        { value: ne.minor, label: "Minor" },
        { value: ne.major, label: "Major" },
        { value: ne.full, label: "Full" }
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
      consumptionSources: Array.isArray((f = this.item.system) == null ? void 0 : f.consumptionSources) ? this.item.system.consumptionSources.map((h) => LA(this.item, h)) : []
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
const ka = class ka extends Ks {
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
        attackWeapon: ka._onAttackWeapon,
        reloadWeaponPayload: ka._onReloadWeaponPayload
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
    (i = e == null ? void 0 : e.preventDefault) == null || i.call(e), (n = e == null ? void 0 : e.stopPropagation) == null || n.call(e), !(!(this.item.actor ?? null) || !((r = (s = this.item).isPersonalWeapon) != null && r.call(s))) && await Ws({ weapon: this.item, event: e });
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
O(ka, "LAYOUT_ID", "personal-weapon"), O(ka, "PARTS", {
  sheet: {
    template: `${X}/v2/item/personal-weapon-root.hbs`,
    scrollable: [".sheet-body"]
  }
});
let bo = ka;
class So extends Ks {
}
O(So, "LAYOUT_ID", "mech-weapon"), O(So, "PARTS", {
  sheet: {
    template: `${X}/v2/item/mech-weapon-root.hbs`,
    scrollable: [".sheet-body"]
  }
});
const xA = {
  penetrating: "Penetrating",
  concussive: "Concussive",
  energy: "Energy",
  thermal: "Thermal",
  electrical: "Electrical"
};
function zc(a) {
  const e = Number(a ?? 0) || 0;
  return e > 0 ? `+${e}` : `${e}`;
}
function $A({ defenseBonus: a = 0, mitigationByType: e = {} } = {}) {
  const t = [], i = Number(a ?? 0) || 0;
  i !== 0 && t.push(`Defense ${zc(i)}`);
  const n = ri(e);
  for (const [s, r] of Object.entries(xA)) {
    const o = Number((n == null ? void 0 : n[s]) ?? 0) || 0;
    o !== 0 && t.push(`${r} ${zc(o)}`);
  }
  return t.join(" | ");
}
class Ao extends oi {
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
    var l, c, u, d, m, f, p, h, g, y, b, S, w, v, P, E;
    const t = await super._prepareContext(e), i = this.item, n = i.actor ?? null, s = ((l = n == null ? void 0 : n.getPersonalCombatLoadout) == null ? void 0 : l.call(n)) ?? null, r = ((c = s == null ? void 0 : s.activeArmor) == null ? void 0 : c.id) ?? null, o = ((u = s == null ? void 0 : s.activeArmor) == null ? void 0 : u.id) === i.id ? s.activeArmor : (d = i.getArmorProfile) == null ? void 0 : d.call(i, { actor: n });
    return t.armorState = o, t.isActiveArmor = r === i.id, t.effectiveDurabilityCurrent = Number(
      ((m = o == null ? void 0 : o.durability) == null ? void 0 : m.current) ?? ((p = (f = i.system) == null ? void 0 : f.durability) == null ? void 0 : p.current) ?? ((g = (h = i.system) == null ? void 0 : h.durability) == null ? void 0 : g.max) ?? ((y = i.system) == null ? void 0 : y.rating) ?? 0
    ), t.effectiveArmorRating = Number(
      (o == null ? void 0 : o.currentArmorRating) ?? (o == null ? void 0 : o.ratingCurrent) ?? Math.min(
        Number(((b = i.system) == null ? void 0 : b.rating) ?? 0),
        Number(((w = (S = i.system) == null ? void 0 : S.durability) == null ? void 0 : w.current) ?? ((P = (v = i.system) == null ? void 0 : v.durability) == null ? void 0 : P.max) ?? ((E = i.system) == null ? void 0 : E.rating) ?? 0)
      )
    ), t.effectiveArmorResist = Number(
      (o == null ? void 0 : o.baseMitigation) ?? (o == null ? void 0 : o.baseResistance) ?? 0
    ), t.armorModifierSummary = this._getArmorModifierSummary(o), t.itemSheet = { ...t.itemSheet ?? {} }, t.itemSheet.summaryChips = this._getSummaryChips(o), t.armorEditor = {
      standardTraits: [..._f]
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
    return $A({
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
O(Ao, "LAYOUT_ID", "armor"), O(Ao, "PARTS", {
  sheet: {
    template: `${X}/v2/item/armor-root.hbs`,
    scrollable: [".sheet-body"]
  }
});
function BA() {
  console.log(`${Ce}Registering Item sheets (V2)`);
  const { Items: a } = foundry.documents.collections;
  a.registerSheet(T, uo, { types: ["contact"], makeDefault: !0, label: "Contact (V2)" }), a.registerSheet(T, mo, { types: ["gear", "consumable"], makeDefault: !0, label: "Gear / Consumable (V2)" }), a.registerSheet(T, fo, { types: ["quality"], makeDefault: !0, label: "Quality (V2)" }), a.registerSheet(T, po, { types: ["assetModule"], makeDefault: !0, label: "Asset Module (V2)" }), a.registerSheet(T, ho, { types: ["lifeModule"], makeDefault: !0, label: "Life Module (V2)" }), a.registerSheet(T, go, { types: ["skill"], makeDefault: !0, label: "Skill (V2)" }), a.registerSheet(T, bo, { types: ["personalWeapon", "weapon"], makeDefault: !0, label: "Personal Weapon (V2)" }), a.registerSheet(T, So, { types: ["mechWeapon"], makeDefault: !0, label: "Mech Weapon (V2)" }), a.registerSheet(T, Ao, { types: ["armor"], makeDefault: !0, label: "Armor (V2)" });
}
const Fc = [
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
  `systems/${T}/templates/v2/ui/vehicle/summary-bar.hbs`,
  `systems/${T}/templates/v2/ui/vehicle/attributes-grid.hbs`,
  `systems/${T}/templates/v2/ui/vehicle/active-crits.hbs`,
  `systems/${T}/templates/v2/ui/vehicle/record-section.hbs`,
  `systems/${T}/templates/v2/ui/battlemech/chassis-fields.hbs`,
  `systems/${T}/templates/v2/ui/battlemech/heat-track.hbs`,
  `systems/${T}/templates/v2/ui/battlemech/quick-actions.hbs`,
  `systems/${T}/templates/v2/ui/battlemech/weapon-groups.hbs`,
  `systems/${T}/templates/v2/ui/battlemech/hardpoints.hbs`,
  `systems/${T}/templates/v2/ui/vehicle/pilot-panel.hbs`,
  `systems/${T}/templates/v2/ui/character/assigned-mech.hbs`,
  // Sheet wrapper
  `systems/${T}/templates/v2/actor/_sheet-root.hbs`,
  `systems/${T}/templates/v2/actor/npc-sheet.hbs`,
  `systems/${T}/templates/v2/actor/vehicle-sheet.hbs`,
  `systems/${T}/templates/v2/actor/battlemech-sheet.hbs`,
  // Placeholders
  `systems/${T}/templates/v2/ui/placeholders/assigned-systems.hbs`,
  `systems/${T}/templates/v2/ui/placeholders/inventory-gear.hbs`,
  `systems/${T}/templates/v2/ui/placeholders/inventory-consumables.hbs`,
  `systems/${T}/templates/v2/ui/placeholders/inventory-armor.hbs`,
  `systems/${T}/templates/v2/ui/placeholders/inventory-weapons.hbs`,
  `systems/${T}/templates/v2/ui/placeholders/bio-description.hbs`,
  `systems/${T}/templates/v2/ui/placeholders/bio-traits.hbs`,
  `systems/${T}/templates/v2/ui/placeholders/bio-life-modules.hbs`,
  `systems/${T}/templates/v2/ui/actor/field-grid.hbs`,
  `systems/${T}/templates/v2/ui/actor/owned-item-list.hbs`,
  `systems/${T}/templates/v2/ui/actor/action-buttons.hbs`,
  `systems/${T}/templates/v2/ui/actor/notes-editor.hbs`,
  `systems/${T}/templates/v2/ui/actor/hardpoint-list.hbs`,
  `systems/${T}/templates/v2/ui/actor/weapon-group-list.hbs`,
  // V2 item partials
  `systems/${T}/templates/v2/item/_item-sheet-root.hbs`,
  `systems/${T}/templates/v2/item/contact.hbs`,
  `systems/${T}/templates/v2/item/gear.hbs`,
  `systems/${T}/templates/v2/item/consumable.hbs`,
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
  `systems/${T}/templates/v2/item/parts/consumable-main.hbs`,
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
  `systems/${T}/templates/v2/actor/character-sheet.hbs`,
  `systems/${T}/templates/v2/actor/vehicle-sheet.hbs`,
  `systems/${T}/templates/v2/actor/battlemech-sheet.hbs`
];
function zA(a) {
  const e = String(a).replaceAll("\\", "/"), t = `systems/${T}/templates/`, i = e.indexOf(t);
  return `mwd.${(i >= 0 ? e.slice(i + t.length) : e).replace(/\.hbs$/i, "").split("/").filter(Boolean).map((o) => o.replace(/^_+/, "")).join(".")}`;
}
function FA() {
  var a, e;
  return ((e = (a = foundry == null ? void 0 : foundry.applications) == null ? void 0 : a.handlebars) == null ? void 0 : e.Handlebars) ?? Handlebars;
}
async function UA() {
  var e, t;
  const a = FA();
  try {
    const i = {};
    for (const s of Fc)
      i[zA(s)] = s, i[s] = s;
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
    console.log(`${Ce}preloadTemplatesV2 OK`, { loaded: Fc.length });
  } catch (i) {
    throw console.error(`${Ce}preloadTemplatesV2 FAILED`, i), i;
  }
}
function Uc(a) {
  const e = Math.max(0, Number(a) || 0);
  return -Math.floor(e / 3);
}
function HA(a) {
  const e = Math.max(0, Number(a) || 0);
  return e === 0 ? 0 : Math.ceil(e / 4);
}
function jA(a = {}) {
  const e = a.physical ?? {}, t = a.fatigue ?? {}, i = a.armor ?? {}, n = Number(e.value) || 0, s = Number(t.value) || 0, r = Math.max(Number(i.value) || 0, Number(i.max) || 0);
  return {
    physical: { penalty: Uc(n) },
    fatigue: { penalty: Uc(s) },
    armor: { resistance: HA(r) }
  };
}
const yr = {
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
function WA(a, e, t, i) {
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
function KA(a = {}) {
  return Object.entries(ri(a)).filter(([, e]) => Number(e) > 0).map(([e, t]) => `${e} +${t}`).join(", ");
}
class GA extends Actor {
  /** @override */
  async _preCreate(e, t, i) {
    super._preCreate && await super._preCreate(e, t, i);
    const n = await vd("Actor", (e == null ? void 0 : e.type) ?? this.type), s = {};
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
      if (hp(i), i.speed = Math.max(0, Math.trunc(Number(i.speed ?? 12) || 12)), (e = i.skills) != null && e.skills && typeof i.skills.skills == "object") {
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
    const e = this.getEdgeCap(), t = this.type === "character" ? Li(this).bonusByEdgePool ?? {} : {};
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
    r.length === 1 ? (c = r[0], l = c) : r.length > 1 ? (e.push("Multiple equipped primary weapons found; attack selection requires a chooser."), u = !0) : n.length === 1 ? l = n[0] : n.length > 1 ? u = !0 : l = xt.buildDefaultUnarmedProfile(this);
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
    ), n = Math.max(0, Number((e == null ? void 0 : e.rating) ?? 0)), s = Math.min(n, i), r = ri(e == null ? void 0 : e.mitigationByType), o = Io(s);
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
    const n = this.getEdgePoolRaw(e), s = Math.max(0, Number((n == null ? void 0 : n.rating) ?? 0)), r = Math.max(0, Number((n == null ? void 0 : n.value) ?? 0)), o = Math.max(0, Number(((p = Li(this).bonusByEdgePool) == null ? void 0 : p[e]) ?? 0)), l = s + o, c = Math.min(l, t), u = Math.min(r, c);
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
    const i = this.getEdgeCap(), n = Math.max(0, Number(t ?? 0)), s = Math.max(0, Number(((c = Li(this).bonusByEdgePool) == null ? void 0 : c[e]) ?? 0)), r = Math.min(n + s, i), o = Math.max(0, Number(((u = this.getEdgePoolRaw(e)) == null ? void 0 : u.value) ?? 0)), l = Math.min(o, r);
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
      }, c = Lt({
        actor: this,
        phase: "onEdgeSpend",
        facts: Lr({ actor: this, packet: l, phase: "onEdgeSpend", runtime: o }),
        packet: l,
        options: { runtime: o, consumeUsage: !0 }
      });
      await yi({ actor: this, mutations: c.mutations, runtime: o }), s = Math.max(0, Number(c.packet.amount ?? n) || 0);
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
      }, l = Lt({
        actor: this,
        phase: "onEdgeGain",
        facts: Lr({ actor: this, packet: o, phase: "onEdgeGain", runtime: r }),
        packet: o,
        options: { runtime: r, consumeUsage: !0 }
      });
      await yi({ actor: this, mutations: l.mutations, runtime: r }), s = Number(l.packet.amount ?? n) || 0;
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
    if (e === "heat" && this.type === "battlemech") {
      const y = Number(foundry.utils.getProperty(this, "system.monitors.heat.max")), b = Number(foundry.utils.getProperty(this, "system.mwd.heat.max")), S = Number(foundry.utils.getProperty(this, "system.mwd.heat.hardMax")), w = Math.max(
        0,
        Number.isFinite(y) && y > 0 ? y : Number.isFinite(b) && b > 0 ? b : Number.isFinite(S) ? S : 0
      ), v = Math.min(Math.max(0, Number(t) || 0), w);
      return this.update({
        "system.monitors.heat.value": v,
        "system.monitors.heat.max": w,
        "system.mwd.heat.current": v,
        "system.mwd.heat.max": w
      });
    }
    if (e === "armor" && this.isCharacterLike()) {
      const y = this.getPersonalCombatLoadout({ refresh: !0 }), b = ((d = y == null ? void 0 : y.activeArmor) == null ? void 0 : d.armorId) ?? ((m = y == null ? void 0 : y.activeArmor) == null ? void 0 : m.id) ?? null, S = b ? this.items.get(b) : null;
      if (!(S != null && S.id)) return null;
      const w = Math.max(0, Number(((f = S.system) == null ? void 0 : f.rating) ?? 0) || 0), v = Math.max(0, Number(((h = (p = S.system) == null ? void 0 : p.durability) == null ? void 0 : h.max) ?? 0) || 0), P = v > 0 ? v : w, E = Math.min(Math.max(0, Number(t) || 0), P);
      return this.updateEmbeddedDocuments("Item", [{
        _id: S.id,
        "system.durability.max": P,
        "system.durability.current": E
      }]);
    }
    const n = `system.monitors.${e}`, s = Number(foundry.utils.getProperty(this, `${n}.max`)) || 0, r = Math.max(0, s), o = Math.min(Math.max(0, Number(t) || 0), r), l = { [`${n}.value`]: o }, c = this.type, u = (g = qs == null ? void 0 : qs[c]) == null ? void 0 : g[e];
    if (u != null && u.derived)
      for (const [y, b] of Object.entries(u.derived)) {
        const S = yr == null ? void 0 : yr[b.fn];
        if (typeof S != "function") continue;
        const w = WA(this, e, b.source, o);
        l[`${n}.derived.${y}`] = S(w);
      }
    return this.update(l);
  }
  _prepareMonitors() {
    var o, l, c, u, d, m, f, p;
    const e = this.system.monitors ?? {}, t = jA(e);
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
    }, t.resistanceBonusByType = i != null && i.isDestroyed ? {} : (i == null ? void 0 : i.mitigationByType) ?? (i == null ? void 0 : i.typedMitigation) ?? {}, t.derived ?? (t.derived = {}), t.derived.resistance = Number((i == null ? void 0 : i.baseMitigation) ?? (i == null ? void 0 : i.baseResistance) ?? 0), t.effect = i != null && i.isDestroyed ? "Destroyed" : i ? KA(i.mitigationByType ?? i.typedMitigation) : "", (u = this.system).derived ?? (u.derived = {}), this.system.derived.personalCombat = {
      defaultWeaponId: ((d = e.defaultWeapon) == null ? void 0 : d.id) ?? null,
      activeArmorId: (i == null ? void 0 : i.id) ?? null,
      warnings: [...e.warnings ?? []]
    };
  }
}
async function qA({ actor: a, payload: e } = {}) {
  var g, y, b, S, w, v;
  if (!a) throw new Error("resolveSkill requires actor");
  const t = String((e == null ? void 0 : e.key) ?? "").trim(), i = Bt(t);
  if (!i) throw new Error(`Unknown skill: ${t}`);
  const n = a.system ?? {}, s = String((e == null ? void 0 : e.attrKey) ?? i.attribute ?? "").trim();
  if (!s) throw new Error(`Skill ${t} missing attribute key`);
  const r = Number(((y = (g = n == null ? void 0 : n.attributes) == null ? void 0 : g[s]) == null ? void 0 : y.value) ?? 0), o = Number(((S = (b = n == null ? void 0 : n.skills) == null ? void 0 : b[t]) == null ? void 0 : S.rating) ?? 0), l = Number(((v = (w = n == null ? void 0 : n.skills) == null ? void 0 : w[t]) == null ? void 0 : v.bonus) ?? 0), c = new Set(Cs(n, t)), u = Lo(t, e == null ? void 0 : e.specializationKey), d = u && c.has(u.key) ? u : null, m = d ? Do : 0, f = Array.isArray(e == null ? void 0 : e.domains) ? e.domains : i.domains ?? [], p = Number.isFinite(Number(e == null ? void 0 : e.diceTarget)) ? Number(e.diceTarget) : Number.isFinite(Number(e == null ? void 0 : e.target)) ? Number(e.target) : 5, h = Number.isFinite(Number(e == null ? void 0 : e.dn)) ? Number(e.dn) : 1;
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
const VA = /* @__PURE__ */ new Set([
  "grit",
  "chaos",
  "insight",
  "rumor",
  "legend",
  "credibility"
]), YA = {
  grit: "physical",
  chaos: "physical",
  insight: "mental",
  rumor: "mental",
  legend: "social",
  credibility: "social"
};
async function QA({ actor: a, payload: e } = {}) {
  if (!a) throw new Error("resolveEdge requires actor");
  const t = String((e == null ? void 0 : e.pool) ?? "").trim();
  if (!VA.has(t)) throw new Error(`Invalid edge pool: ${t}`);
  const i = a.getEdgePool(t), n = Math.max(0, Number((i == null ? void 0 : i.effectiveValue) ?? 0));
  return {
    intent: "edge",
    title: `Edge — ${t}`,
    subtitle: a.name ?? "Actor",
    domains: [YA[t] ?? "unknown"],
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
async function JA({ actor: a, payload: e, event: t } = {}) {
  return {
    title: "Attribute",
    intent: "attribute",
    domainTags: ["general"],
    pool: { attribute: 0, skill: 0, bonus: 0 },
    breakdown: [],
    mods: []
  };
}
async function XA({ actor: a, payload: e } = {}) {
  if (!a) throw new Error("resolveCommon requires actor");
  const t = String((e == null ? void 0 : e.id) ?? "").trim();
  if (!t) throw new Error("Common rolls require payload.id");
  const i = Fo(t);
  if (!i) throw new Error(`Unknown common check: ${t}`);
  const n = Array.isArray(i.formula) ? i.formula : [];
  if (n.length !== 2)
    throw new Error(`Common check ${t} must define exactly two attributes.`);
  const s = n.map((c) => {
    var d, m, f;
    const u = Up(c);
    if (!u) throw new Error(`Common check ${t} uses unsupported attribute code: ${c}`);
    return {
      code: String(c).trim().toUpperCase(),
      key: u,
      label: Hp(c),
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
    formula: jp(n),
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
const ZA = 90;
var Qc;
const eT = Number(((Qc = CONST == null ? void 0 : CONST.REGION_VISIBILITY) == null ? void 0 : Qc.ALWAYS) ?? 2) || 2;
function ps() {
  var a, e;
  return Number(((a = canvas.grid) == null ? void 0 : a.size) ?? ((e = canvas.dimensions) == null ? void 0 : e.size) ?? 100) || 100;
}
function tT(a = {}) {
  return Math.max(0, Number((a == null ? void 0 : a.size) ?? 0) || 0);
}
function za(a) {
  var t, i, n, s;
  return ((i = (t = canvas.tokens) == null ? void 0 : t.controlled) == null ? void 0 : i.find((r) => {
    var o;
    return ((o = r.actor) == null ? void 0 : o.id) === (a == null ? void 0 : a.id);
  })) ?? null ?? ((s = (n = a == null ? void 0 : a.getActiveTokens) == null ? void 0 : n.call(a, !0, !0)) == null ? void 0 : s[0]) ?? null;
}
function Hc(a) {
  var e, t;
  return Number(
    ((e = a == null ? void 0 : a.document) == null ? void 0 : e.disposition) ?? (a == null ? void 0 : a.disposition) ?? ((t = CONST == null ? void 0 : CONST.TOKEN_DISPOSITIONS) == null ? void 0 : t.NEUTRAL) ?? 0
  );
}
function hs(a) {
  var r, o, l, c, u;
  const e = (a == null ? void 0 : a.center) ?? ((r = a == null ? void 0 : a.object) == null ? void 0 : r.center);
  if (e) return { x: Number(e.x ?? 0), y: Number(e.y ?? 0) };
  const t = Number((a == null ? void 0 : a.x) ?? ((o = a == null ? void 0 : a.document) == null ? void 0 : o.x) ?? 0), i = Number((a == null ? void 0 : a.y) ?? ((l = a == null ? void 0 : a.document) == null ? void 0 : l.y) ?? 0), n = Number((a == null ? void 0 : a.w) ?? (a == null ? void 0 : a.width) ?? ((c = a == null ? void 0 : a.document) == null ? void 0 : c.width) ?? 1) * ps(), s = Number((a == null ? void 0 : a.h) ?? (a == null ? void 0 : a.height) ?? ((u = a == null ? void 0 : a.document) == null ? void 0 : u.height) ?? 1) * ps();
  return { x: t + n / 2, y: i + s / 2 };
}
function iT(a) {
  var i, n, s, r;
  const e = Number((a == null ? void 0 : a.w) ?? ((i = a == null ? void 0 : a.object) == null ? void 0 : i.w) ?? 0) || Number(((n = a == null ? void 0 : a.document) == null ? void 0 : n.width) ?? 1) * ps(), t = Number((a == null ? void 0 : a.h) ?? ((s = a == null ? void 0 : a.object) == null ? void 0 : s.h) ?? 0) || Number(((r = a == null ? void 0 : a.document) == null ? void 0 : r.height) ?? 1) * ps();
  return Math.max(e, t) / 2;
}
function aT() {
  var t;
  const a = ((t = canvas == null ? void 0 : canvas.stage) == null ? void 0 : t.pivot) ?? null, e = (canvas == null ? void 0 : canvas.dimensions) ?? {};
  return {
    x: Number((a == null ? void 0 : a.x) ?? e.width / 2 ?? 0) || 0,
    y: Number((a == null ? void 0 : a.y) ?? e.height / 2 ?? 0) || 0
  };
}
function nT() {
  var a;
  return Array.from(((a = game.user) == null ? void 0 : a.targets) ?? []).find((e) => e == null ? void 0 : e.actor) ?? null;
}
function sT(a, e) {
  return {
    x: (Number((a == null ? void 0 : a.x) ?? 0) + Number((e == null ? void 0 : e.x) ?? 0)) / 2,
    y: (Number((a == null ? void 0 : a.y) ?? 0) + Number((e == null ? void 0 : e.y) ?? 0)) / 2
  };
}
function rT({ template: a = {}, actor: e = null } = {}) {
  const t = String((a == null ? void 0 : a.placement) ?? "").trim().toLowerCase(), i = za(e), n = nT(), s = i ? hs(i) : null, r = n ? hs(n) : null;
  return t === "origin" && s ? s : t === "targeted" && r ? r : t === "placed" && s && r ? sT(s, r) : aT();
}
function oT({ attack: a = {}, actor: e = null } = {}) {
  const t = (a == null ? void 0 : a.template) ?? null, i = String((t == null ? void 0 : t.shape) ?? "").trim().toLowerCase();
  if (!i) return null;
  const n = rT({ template: t, actor: e });
  return Be({
    shape: i,
    x: n.x,
    y: n.y,
    direction: 0,
    distance: tT(t),
    angle: i === "cone" ? ZA : null,
    width: i === "line" ? 1 : null,
    placementMode: (t == null ? void 0 : t.placement) ?? null
  });
}
function lT() {
  var e, t;
  const a = new PIXI.Container();
  return a.eventMode = "none", a.sortableChildren = !0, (t = (e = canvas.stage) == null ? void 0 : e.addChild) == null || t.call(e, a), a;
}
function cT(a) {
  var e;
  a != null && a.parent && a.parent.removeChild(a), (e = a == null ? void 0 : a.destroy) == null || e.call(a, { children: !0 });
}
function uT() {
  const a = lT(), e = new PIXI.Container();
  e.eventMode = "none", e.zIndex = 5;
  const t = new PIXI.Container();
  return t.eventMode = "none", t.zIndex = 10, a.addChild(e), a.addChild(t), { root: a, templateLayer: e, markerLayer: t };
}
function dT(a) {
  cT((a == null ? void 0 : a.root) ?? a);
}
function mT() {
  var t;
  const a = String(((t = game.user) == null ? void 0 : t.color) ?? "#ff6400").replace("#", "").trim(), e = Number.parseInt(a, 16);
  return Number.isFinite(e) ? e : 16737280;
}
function _m(a) {
  var e;
  (e = a == null ? void 0 : a.removeChildren) == null || e.call(a).forEach((t) => {
    var i;
    return (i = t.destroy) == null ? void 0 : i.call(t, { children: !0 });
  });
}
function To(a) {
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
function fT(a, e) {
  const t = Number((e == null ? void 0 : e.x) ?? 0) - Number((a == null ? void 0 : a.x) ?? 0), i = Number((e == null ? void 0 : e.y) ?? 0) - Number((a == null ? void 0 : a.y) ?? 0);
  return t === 0 && i === 0 ? 0 : Math.atan2(i, t) * 180 / Math.PI;
}
function br(a = 0) {
  var i, n, s, r, o;
  const e = Number(((i = canvas.grid) == null ? void 0 : i.size) ?? ((n = canvas.dimensions) == null ? void 0 : n.size) ?? 100) || 100, t = Number(((r = (s = canvas.scene) == null ? void 0 : s.grid) == null ? void 0 : r.distance) ?? ((o = canvas.dimensions) == null ? void 0 : o.distance) ?? 1) || 1;
  return Number(a ?? 0) * (e / t);
}
function pT({ geometry: a = null, pointer: e = null, attack: t = {}, actor: i = null } = {}) {
  var l;
  const n = Be(a);
  if (!n) return null;
  const s = si(n) ?? null;
  if (!s || !e) return s;
  const o = String(((l = t == null ? void 0 : t.template) == null ? void 0 : l.placement) ?? s.placementMode ?? "").trim().toLowerCase() !== "origin";
  if (o && (s.x = e.x, s.y = e.y), ["line", "cone", "rect"].includes(String(s.shape ?? "").trim().toLowerCase())) {
    const c = za(i), u = c ? hs(c) : null, d = o ? u ?? { x: Number(n.x ?? 0), y: Number(n.y ?? 0) } : { x: Number(s.x ?? 0), y: Number(s.y ?? 0) };
    s.direction = fT(d, e);
  }
  return Be(s);
}
function hT(a, e = null) {
  if (!a) return;
  _m(a);
  const t = Be(e);
  if (!t) return;
  const i = mT(), n = new PIXI.Graphics();
  switch (n.lineStyle(3, i, 0.95), n.beginFill(i, 0.18), String(t.shape ?? "").trim().toLowerCase()) {
    case "blast": {
      n.drawCircle(
        Number(t.x ?? 0),
        Number(t.y ?? 0),
        br(t.distance ?? 0)
      );
      break;
    }
    case "rect": {
      const s = br(t.width ?? 0), r = br(t.height ?? 0);
      n.position.set(Number(t.x ?? 0), Number(t.y ?? 0)), n.rotation = Number(t.direction ?? 0) * Math.PI / 180, n.drawRect(
        -(Number(t.anchorX ?? 0) || 0) * s,
        -(Number(t.anchorY ?? 0) || 0) * r,
        s,
        r
      );
      break;
    }
    default: {
      const [s] = Ts(t);
      (s == null ? void 0 : s.type) === "polygon" && Array.isArray(s.points) && s.points.length >= 3 && n.drawPolygon(s.points.flatMap((r) => [Number((r == null ? void 0 : r.x) ?? 0), Number((r == null ? void 0 : r.y) ?? 0)]));
      break;
    }
  }
  n.endFill(), a.addChild(n);
}
function gT(a = ne.none) {
  return a === ne.full ? 14042437 : a === ne.major ? 15174447 : a === ne.minor ? 15782993 : 10134706;
}
function yT(a, e = []) {
  if (a) {
    _m(a);
    for (const t of e) {
      const i = hs(t.token), n = Math.max(20, iT(t.token) + 12), s = gT(t.exposureTier), r = new PIXI.Graphics();
      r.lineStyle(4, s, 0.95), r.beginFill(s, 0.14), r.drawCircle(i.x, i.y, n), r.endFill(), r.zIndex = 10;
      const o = new PIXI.Text($t(t.exposureTier), {
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
function Lm(a, e = {}) {
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
    exposure: xi({
      tier: ((h = e == null ? void 0 : e.exposure) == null ? void 0 : h.initialTier) ?? ((g = e == null ? void 0 : e.exposure) == null ? void 0 : g.tier) ?? (e == null ? void 0 : e.exposureTier) ?? ne.none,
      appliedTier: ((y = e == null ? void 0 : e.exposure) == null ? void 0 : y.finalTier) ?? ((b = e == null ? void 0 : e.exposure) == null ? void 0 : b.appliedTier) ?? (e == null ? void 0 : e.exposureTier) ?? ne.none,
      evadeUsed: !!((S = e == null ? void 0 : e.exposure) != null && S.evadeUsed),
      evadeLocked: !!((w = e == null ? void 0 : e.exposure) != null && w.evadeLocked)
    }),
    areaEffect: e != null && e.areaEffect ? foundry.utils.deepClone(e.areaEffect) : null
  };
}
function bT({ attack: a = {}, geometry: e = null, attacker: t = null } = {}) {
  var o;
  const i = (a == null ? void 0 : a.template) ?? null, n = Be(e);
  if (!i || !n) return [];
  const s = za(t), r = (s == null ? void 0 : s.id) ?? null;
  return (((o = canvas.tokens) == null ? void 0 : o.placeables) ?? []).filter((l) => l == null ? void 0 : l.actor).filter((l) => l.id !== r || (i == null ? void 0 : i.placement) === "origin").filter((l) => As(n, l)).map((l) => {
    const c = uu({ geometry: n, token: l });
    return Lm(l, {
      exposureTier: c,
      areaEffect: {
        templateShape: (i == null ? void 0 : i.shape) ?? "",
        templatePlacement: (i == null ? void 0 : i.placement) ?? "",
        templateGeometry: si(n)
      }
    });
  }).filter(Boolean);
}
function ST({ attack: a = {}, geometry: e = null, attacker: t = null } = {}) {
  var o;
  const i = (a == null ? void 0 : a.template) ?? null, n = za(t), s = (n == null ? void 0 : n.id) ?? null, r = Be(e);
  return !i || !r ? [] : (((o = canvas.tokens) == null ? void 0 : o.placeables) ?? []).filter((l) => l == null ? void 0 : l.actor).filter((l) => l.id !== s || (i == null ? void 0 : i.placement) === "origin").filter((l) => As(r, l)).map((l) => ({
    token: l,
    exposureTier: uu({ geometry: r, token: l })
  }));
}
function AT({ geometry: a = null, attack: e = {}, attacker: t = null } = {}) {
  var m, f, p, h;
  const i = (e == null ? void 0 : e.template) ?? null, n = Be(a);
  if (!i || !n) return [];
  const s = za(t), r = (s == null ? void 0 : s.id) ?? null, o = Number(((m = CONST == null ? void 0 : CONST.TOKEN_DISPOSITIONS) == null ? void 0 : m.HOSTILE) ?? -1), l = Number(((f = CONST == null ? void 0 : CONST.TOKEN_DISPOSITIONS) == null ? void 0 : f.FRIENDLY) ?? 1), c = Number(((p = CONST == null ? void 0 : CONST.TOKEN_DISPOSITIONS) == null ? void 0 : p.NEUTRAL) ?? 0), u = Hc(s), d = (g) => {
    const y = Hc(g);
    return s ? u === l ? y === o : u === o ? y === l : u === c ? y === o : y !== u : !0;
  };
  return (((h = canvas.tokens) == null ? void 0 : h.placeables) ?? []).filter((g) => g == null ? void 0 : g.actor).filter((g) => g.id !== r || (i == null ? void 0 : i.placement) === "origin").filter((g) => As(n, g)).filter(d).map((g) => String(g.id ?? "").trim()).filter(Boolean);
}
function TT(a = {}) {
  var i;
  const e = String(((i = a == null ? void 0 : a.template) == null ? void 0 : i.shape) ?? "template").trim().toLowerCase();
  return `${e ? `${e.slice(0, 1).toUpperCase()}${e.slice(1)}` : "Template"} placement: left-click to place, right-click or Esc to cancel, Enter or Space to confirm.`;
}
async function wT({ attack: a = {} } = {}) {
  var t, i;
  const e = TT(a);
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
      const p = Number((f == null ? void 0 : f.button) ?? 0), h = To(f);
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
      To(f) && l(f);
    };
    window.addEventListener("pointerdown", u, !0), window.addEventListener("keydown", d, !0), window.addEventListener("contextmenu", m, !0);
  });
}
async function kT({ actor: a = null, attack: e = {}, templateGeometry: t = null } = {}) {
  var o, l, c, u, d, m;
  if (!(canvas != null && canvas.scene) || ru((e == null ? void 0 : e.areaEffect) ?? ((o = e == null ? void 0 : e.payload) == null ? void 0 : o.areaEffect) ?? {})) return null;
  const i = Be(t, {
    template: e == null ? void 0 : e.template,
    placement: e == null ? void 0 : e.templatePlacement
  });
  if (!i) return null;
  const n = Ts(i);
  if (!n.length) return null;
  const s = `${String(((l = e == null ? void 0 : e.weapon) == null ? void 0 : l.name) ?? (e == null ? void 0 : e.name) ?? "Template").trim() || "Template"} Template`, [r] = await canvas.scene.createEmbeddedDocuments("Region", [{
    name: s,
    color: String(((c = game.user) == null ? void 0 : c.color) ?? "#ff6400").trim() || "#ff6400",
    visibility: eT,
    locked: !1,
    shapes: n,
    flags: {
      mwd: {
        templateIndicator: {
          sourceActorUuid: (a == null ? void 0 : a.uuid) ?? null,
          sourceItemUuid: ((u = e == null ? void 0 : e.weapon) == null ? void 0 : u.uuid) ?? null,
          payloadId: ((d = e == null ? void 0 : e.payloadState) == null ? void 0 : d.activePayloadId) ?? ((m = e == null ? void 0 : e.payload) == null ? void 0 : m.id) ?? "",
          label: s,
          templateGeometry: si(i),
          templatePlacement: foundry.utils.deepClone((e == null ? void 0 : e.templatePlacement) ?? null),
          template: foundry.utils.deepClone((e == null ? void 0 : e.template) ?? null)
        }
      }
    }
  }]);
  return r ?? null;
}
async function vT({ actor: a, attack: e } = {}) {
  if (!(canvas != null && canvas.scene))
    throw Wi("Templated attacks require an active scene canvas.", { severity: "warn" });
  const t = (e == null ? void 0 : e.template) ?? null;
  if (!(t != null && t.shape) || !(Number(t == null ? void 0 : t.size) > 0))
    throw Wi("Templated attack is missing valid template configuration.", { severity: "warn" });
  if (!nf.includes(t.shape))
    throw Wi(`Template shape "${t.shape}" is normalized but not supported in v1.`, { severity: "warn" });
  const i = za(a);
  if (t.placement === "origin" && !i)
    throw Wi("Origin-placed templated attacks require the attacker to have a token on the current scene.", { severity: "warn" });
  const n = oT({ attack: e, actor: a });
  if (!n)
    throw Wi("Unable to initialize template placement for this attack.", { severity: "warn" });
  const s = uT();
  let r = si(n), o = "";
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
    hT(s.templateLayer, r), yT(s.markerLayer, ST({ attack: e, geometry: r, attacker: a }));
  }, u = (d) => {
    const m = To(d);
    if (!m) return;
    const f = pT({
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
    if (o = l(r), c(), window.addEventListener("pointermove", u), !await wT({
      attack: {
        ...e,
        actor: a
      }
    })) return null;
    const m = si(r);
    if (!m) return null;
    const f = kf(m, t), p = bT({
      attack: e,
      geometry: m,
      attacker: a
    });
    return {
      templateGeometry: si(m),
      placement: (f == null ? void 0 : f.placement) ?? null,
      autoTargetTokenIds: AT({
        geometry: m,
        attack: e,
        attacker: a
      }),
      targetSnapshots: p
    };
  } finally {
    window.removeEventListener("pointermove", u), dT(s);
  }
}
function MT(a = {}) {
  var e;
  return Array.isArray(a == null ? void 0 : a.targetSnapshots) ? a.targetSnapshots : Array.from(((e = game.user) == null ? void 0 : e.targets) ?? []).map(Lm).filter(Boolean);
}
function CT(a, e = {}) {
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
function ET(a = {}) {
  var t, i, n, s, r;
  const e = String((a == null ? void 0 : a.tokenId) ?? "").trim();
  return e ? ((i = (t = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : t.get) == null ? void 0 : i.call(t, e)) ?? ((r = (s = (n = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : n.placeables) == null ? void 0 : s.find) == null ? void 0 : r.call(s, (o) => (o == null ? void 0 : o.id) === e)) ?? null : null;
}
function PT(a, e) {
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
function RT({ actor: a, payload: e, weapon: t, targets: i = [] } = {}) {
  const n = String((e == null ? void 0 : e.rangeBand) ?? "").trim().toLowerCase();
  if (!(((t == null ? void 0 : t.type) === "personalWeapon" || (t == null ? void 0 : t.isSynthetic)) && i.length === 1))
    return n || String((t == null ? void 0 : t.defaultRangeBand) ?? "close").trim() || "close";
  const r = CT(a, e), o = ET(i[0]), l = PT(r, o), c = _h(l, (t == null ? void 0 : t.range) ?? {}, (t == null ? void 0 : t.defaultRangeBand) ?? "close");
  return c === "outOfRange" ? c : n || ((t == null ? void 0 : t.type) !== "personalWeapon" && !(t != null && t.isSynthetic) || i.length !== 1 ? String((t == null ? void 0 : t.defaultRangeBand) ?? "close").trim() || "close" : c);
}
function NT(a) {
  return (a == null ? void 0 : a.type) === A.actorTypes.vehicle || (a == null ? void 0 : a.type) === A.actorTypes.battlemech;
}
function xm(a) {
  return ["mechWeapon", "vehicleWeapon"].includes((a == null ? void 0 : a.canonicalType) ?? (a == null ? void 0 : a.type));
}
function IT(a = {}, e = {}) {
  return {
    close: Number(a.close ?? 0) + Number(e.close ?? 0),
    near: Number(a.near ?? 0) + Number(e.near ?? 0),
    far: Number(a.far ?? 0) + Number(e.far ?? 0),
    extreme: Number(a.extreme ?? 0) + Number(e.extreme ?? 0)
  };
}
function DT(a, e) {
  var m, f, p, h;
  const t = String((e == null ? void 0 : e.weaponGroupId) ?? ((m = e == null ? void 0 : e.machineWeaponGroup) == null ? void 0 : m.id) ?? "").trim();
  if (!t) return null;
  const i = Array.from(((f = a.system) == null ? void 0 : f.weaponGroups) ?? ((h = (p = a.system) == null ? void 0 : p.mwd) == null ? void 0 : h.weaponGroupDetails) ?? []).find((g) => String((g == null ? void 0 : g.id) ?? "").trim() === t) ?? null, n = Array.isArray(i == null ? void 0 : i.weaponIds) ? i.weaponIds : Array.isArray(i == null ? void 0 : i.weapons) ? i.weapons.map((g) => g == null ? void 0 : g.id).filter(Boolean) : [], s = n.map((g) => {
    var y, b;
    return (b = (y = a.items) == null ? void 0 : y.get) == null ? void 0 : b.call(y, g);
  }).filter((g) => g && xm(g));
  if (!i || !s.length) return null;
  const r = s.map((g) => {
    var y;
    return ((y = g.getCombatProfile) == null ? void 0 : y.call(g)) ?? null;
  }).filter(Boolean), o = r[0] ?? {}, l = r.reduce((g, y) => IT(g, y.attackRatingBand), {}), c = r.reduce((g, y) => g + (Number(y.damage ?? 0) || 0), 0), u = Math.max(0, ...r.map((g) => Number(g.ap ?? 0) || 0)), d = String(o.skill ?? "gunnery").trim() || "gunnery";
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
    skillDef: Bt(d),
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
function OT(a, e) {
  var i, n, s, r, o, l, c, u, d, m;
  if (((i = e == null ? void 0 : e.syntheticWeapon) == null ? void 0 : i.id) === "unarmed") {
    const f = xt.buildDefaultUnarmedProfile(a);
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
  if (NT(a)) {
    const f = DT(a, e);
    if (f) return f;
    const p = ((r = (s = a.items) == null ? void 0 : s.get) == null ? void 0 : r.call(s, (e == null ? void 0 : e.weaponId) ?? "")) ?? null;
    if (!p || !xm(p))
      throw new Error("Machine attack requires an owned vehicle or BattleMech weapon.");
    return ((o = p.getCombatProfile) == null ? void 0 : o.call(p)) ?? null;
  }
  const t = ((c = (l = a.items) == null ? void 0 : l.get) == null ? void 0 : c.call(l, (e == null ? void 0 : e.weaponId) ?? "")) ?? null;
  if (!t || !(((u = t.isPersonalWeapon) == null ? void 0 : u.call(t)) ?? t.type === "personalWeapon") || !((d = t.system) != null && d.equipped))
    throw new Error("Attack requires an equipped personal weapon.");
  return ((m = t.getCombatProfile) == null ? void 0 : m.call(t, { payloadId: e == null ? void 0 : e.payloadId })) ?? null;
}
async function _T({ actor: a, payload: e } = {}) {
  var P, E, z, G, Y, q, Q, L, U, V, Z, re, be, ce, se, Oe, Fe, Ue;
  if (!a) throw new Error("resolveAttack requires actor");
  const t = OT(a, e);
  if (!t) throw new Error("Unable to resolve weapon profile.");
  if (Array.isArray((P = t == null ? void 0 : t.capabilityReport) == null ? void 0 : P.errors) && t.capabilityReport.errors.length > 0)
    throw Wi(
      ((E = t.capabilityReport.errors[0]) == null ? void 0 : E.message) ?? "Weapon capability data is invalid for this attack.",
      { severity: "warn" }
    );
  const i = Bt(t.skill) ?? {
    code: t.skill,
    label: t.skill || "Attack",
    attribute: "reflexes",
    domains: ["physical"]
  }, n = String(i.attribute ?? "reflexes").trim() || "reflexes", s = ((z = a.getAttributeValue) == null ? void 0 : z.call(a, n)) ?? Number(((q = (Y = (G = a.system) == null ? void 0 : G.attributes) == null ? void 0 : Y[n]) == null ? void 0 : q.value) ?? 0), r = ((Q = a.getSkillRating) == null ? void 0 : Q.call(a, t.skill)) ?? Number(((V = (U = (L = a.system) == null ? void 0 : L.skills) == null ? void 0 : U[t.skill]) == null ? void 0 : V.rating) ?? 0), o = Number(((be = (re = (Z = a.system) == null ? void 0 : Z.skills) == null ? void 0 : re[t.skill]) == null ? void 0 : be.bonus) ?? 0), l = new Set(Cs(a.system ?? {}, t.skill)), c = Lo(t.skill, e == null ? void 0 : e.specializationKey), u = c && l.has(c.key) ? c : null, d = u ? Do : 0, m = Number(((ce = t == null ? void 0 : t.effects) == null ? void 0 : ce.accuracyMod) ?? 0) || 0, f = o + m, p = MT(e), h = RT({ actor: a, payload: e, weapon: t, targets: p }), g = (t == null ? void 0 : t.type) === "personalWeapon" || t != null && t.isSynthetic ? Os(h) : h, y = Number(((se = t == null ? void 0 : t.attackRatingBand) == null ? void 0 : se[h]) ?? 0) || 0, b = !!((Oe = t == null ? void 0 : t.capabilityReport) != null && Oe.isTemplated), S = (Fe = e == null ? void 0 : e.aim) != null && Fe.active ? {
    active: !0,
    eligible: !b && p.length === 1,
    ineligibleReason: b ? "Aim cannot apply to template attacks." : p.length !== 1 ? "Aim cannot apply to multi-target attacks." : "",
    skillCode: t.skill,
    skillLabel: i.label ?? t.skill ?? "Attack Skill"
  } : null;
  if (!b && p.length === 0)
    throw Wi("Target at least one token to attack.", { severity: "warn" });
  const w = Number(t.ap ?? 0) + Number(((Ue = t == null ? void 0 : t.effects) == null ? void 0 : Ue.ap) ?? 0), v = Number.isFinite(Number(e == null ? void 0 : e.dn)) ? Number(e.dn) : (t == null ? void 0 : t.type) === "personalWeapon" || t != null && t.isSynthetic ? Oh(h, 1) : 1;
  return {
    intent: "attack",
    rollType: "simple",
    title: `${t.name} Attack`,
    subtitle: a.name ?? "Actor",
    domains: Array.isArray(i.domains) && i.domains.length ? i.domains : ["physical"],
    domainTags: ["combat", "attack"],
    diceTarget: Number.isFinite(Number(e == null ? void 0 : e.diceTarget)) ? Number(e.diceTarget) : 5,
    difficulty: { dn: v },
    dn: {
      parts: [{
        id: "difficulty.current",
        label: (t == null ? void 0 : t.type) === "personalWeapon" || t != null && t.isSynthetic ? `Base DN (${g})` : "DN",
        value: v,
        tags: ["manual"]
      }],
      total: v
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
async function LT({ actor: a, payload: e, event: t } = {}) {
  return {
    title: "Defense",
    intent: "defense",
    domainTags: ["combat"],
    pool: { attribute: 0, skill: 0, bonus: 0 },
    breakdown: [],
    mods: []
  };
}
async function xT({ actor: a, payload: e, event: t } = {}) {
  return {
    title: "Resistance",
    intent: "resistance",
    domainTags: ["combat"],
    pool: { attribute: 0, skill: 0, bonus: 0 },
    breakdown: [],
    mods: []
  };
}
async function $T({ actor: a } = {}) {
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
async function BT({ actor: a }) {
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
const zT = {
  skill: qA,
  edge: QA,
  attribute: JA,
  common: XA,
  attack: _T,
  defense: LT,
  resistance: xT,
  initiative: $T,
  overload: BT
};
async function Sr({ actor: a, payload: e, event: t } = {}) {
  if (!a) throw new Error("resolveIntent requires actor");
  const i = String((e == null ? void 0 : e.intent) ?? "").trim();
  if (!i) throw new Error("resolveIntent requires payload.intent");
  const n = zT[i];
  if (!n) throw new Error(`Unsupported roll intent: ${i}`);
  const s = await n({ actor: a, payload: e, event: t });
  return FT(s, { intent: i });
}
function FT(a, { intent: e } = {}) {
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
var Pa;
class UT {
  constructor() {
    we(this, Pa, /* @__PURE__ */ new Map());
  }
  register(e) {
    if (!(e != null && e.id) || typeof e.collect != "function")
      throw new Error("Invalid ModifierProvider: missing id or collect()");
    F(this, Pa).has(e.id) || F(this, Pa).set(e.id, e);
  }
  async collectAll(e) {
    const t = [];
    for (const i of F(this, Pa).values()) {
      const n = await i.collect(e);
      if (console.log("MWD | provider", i.id, "returned", n), !!(n != null && n.length))
        for (const s of n)
          s && typeof s.label == "string" && typeof s.value == "number" && typeof s.source == "string" ? t.push(s) : console.warn("MWD | DROPPED MOD (bad shape)", i.id, s);
    }
    return t;
  }
}
Pa = new WeakMap();
const Zt = new UT();
function HT(a) {
  if (a == null || a === "" || a === "—" || a === "–") return 0;
  const e = Number(a);
  return Number.isFinite(e) ? e : null;
}
function jT(a) {
  const e = HT(a == null ? void 0 : a.value);
  return e === null ? null : { ...a, value: e };
}
async function jc({
  actor: a,
  rollType: e,
  skillId: t,
  domains: i,
  // NEW (optional)
  payload: n,
  resolved: s,
  context: r
} = {}) {
  const o = { actor: a, rollType: e, skillId: t, domains: i, payload: n, resolved: s, context: r }, l = await Zt.collectAll(o);
  console.log("MWD|condition collect called", o.rollType);
  let c = [];
  for (const d of l ?? []) {
    const m = jT(d);
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
function WT({
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
  var G, Y, q, Q;
  if (!a) throw new Error("buildResolved requires actor");
  if (!(e != null && e.intent)) throw new Error("buildResolved requires payload.intent");
  if (!i) throw new Error("buildResolved requires roll");
  const m = foundry.utils.randomID(), f = (G = i.dice) == null ? void 0 : G[0], h = (Array.isArray(f == null ? void 0 : f.results) ? f.results : []).map((L, U) => {
    const V = `pool:${U}`, Z = Number(L.result), re = !!L.success;
    return {
      ref: V,
      face: Z,
      isSuccess: re,
      isFailure: !re,
      tooltip: re ? `Die ${U + 1}: ${Z} (Success vs TN ${Number(n ?? 5)})` : `Die ${U + 1}: ${Z} (Failure vs TN ${Number(n ?? 5)})`
    };
  }), g = h.filter((L) => L.isFailure).map((L) => L.ref), y = [{
    id: "pool",
    label: "Pool",
    faces: 6,
    termIndex: 0,
    // informational only
    dice: h
  }], b = (Array.isArray(r) ? r : []).map((L, U) => {
    const V = Number(L.value ?? 0), Z = `mod:${GT(L.label ?? "mod")}:${U}`;
    return {
      id: L.id ?? Z,
      label: L.label ?? "Modifier",
      value: V,
      domain: L.domain ?? null,
      source: L.source ?? null,
      tooltip: L.tooltip ?? `${L.label ?? "Modifier"} ${Wc(V)}`
    };
  }), S = b.map((L) => L.id), v = (Array.isArray(t == null ? void 0 : t.breakdown) ? t.breakdown : []).map((L) => ({
    id: `pool.${L.id ?? foundry.utils.randomID()}`,
    label: L.label ?? L.id ?? "Row",
    value: Number(L.value ?? 0),
    tooltip: `Contribution from ${L.label ?? L.id}: ${Number(L.value ?? 0)}`
  }));
  v.push({
    id: "mods.total",
    label: "Mods",
    value: Number(o ?? 0),
    modIds: S,
    tooltip: b.length ? b.map((L) => `${L.label}: ${Wc(L.value)}`).join(`
`) : "No roll-time modifiers."
  }), v.push({
    id: "pool.final",
    label: "Final Pool",
    value: Number(s ?? 0),
    tooltip: `Final dice pool rolled: ${Number(s ?? 0)}d6`
  });
  const P = Number.isFinite(Number(l)) ? Number(l) : h.filter((L) => L.isSuccess).length, E = Number.isFinite(Number(c)) ? Number(c) : h.filter((L) => L.face === 1).length, z = KT(u, { payload: e });
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
        pool: ((q = t == null ? void 0 : t.edge) == null ? void 0 : q.pool) ?? null,
        earn: ((Q = t == null ? void 0 : t.edge) == null ? void 0 : Q.earn) ?? null
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
      ones: E
    },
    // New: engine-interpreted outcome (margin/net/converted/edgeEarned/etc
    outcomeModel: d,
    // Breakdown + modifiers
    breakdownRows: v,
    modifiers: {
      applied: b,
      total: Number(o ?? 0)
    },
    areaEffectPreviewState: foundry.utils.deepClone((e == null ? void 0 : e.areaEffectPreviewState) ?? {}),
    // Edge snapshot / affordances
    edge: z
  };
}
function KT(a, { payload: e } = {}) {
  var p, h, g, y, b, S, w, v, P, E, z, G, Y, q;
  const t = !!((p = e == null ? void 0 : e.edge) != null && p.enabled), i = (a == null ? void 0 : a.domain) ?? null, n = (a == null ? void 0 : a.pools) ?? null, s = ((h = a == null ? void 0 : a.pre) == null ? void 0 : h.poolKey) ?? ((y = (g = e == null ? void 0 : e.edge) == null ? void 0 : g.pre) == null ? void 0 : y.poolKey) ?? (t ? ((b = e == null ? void 0 : e.edge) == null ? void 0 : b.poolKey) ?? null : null), r = Number(((S = a == null ? void 0 : a.pre) == null ? void 0 : S.spent) ?? ((v = (w = e == null ? void 0 : e.edge) == null ? void 0 : w.pre) == null ? void 0 : v.spent) ?? (t ? 1 : 0)) ? 1 : 0, o = ((P = a == null ? void 0 : a.post) == null ? void 0 : P.poolKey) ?? ((z = (E = e == null ? void 0 : e.edge) == null ? void 0 : E.post) == null ? void 0 : z.poolKey) ?? null, l = Number(((G = a == null ? void 0 : a.post) == null ? void 0 : G.spent) ?? ((q = (Y = e == null ? void 0 : e.edge) == null ? void 0 : Y.post) == null ? void 0 : q.spent) ?? 0) ? 1 : 0, c = (n == null ? void 0 : n.a) ?? null, u = (n == null ? void 0 : n.b) ?? null, d = [c, u].filter(Boolean);
  let m = [c, u].filter(Boolean);
  r && s && (m = m.filter((Q) => Q !== s));
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
function Wc(a) {
  const e = Number(a ?? 0);
  return e >= 0 ? `+${e}` : `${e}`;
}
function GT(a) {
  return String(a).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
const { ApplicationV2: qT, HandlebarsApplicationMixin: VT } = foundry.applications.api;
function YT(a, e = -3, t = 3) {
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
function Kc(a) {
  return (Array.isArray(a) ? a : []).map((t) => ({
    id: (t == null ? void 0 : t.id) ?? foundry.utils.randomID(),
    label: typeof (t == null ? void 0 : t.label) == "string" ? t.label : "Manual",
    value: Number((t == null ? void 0 : t.value) ?? 0)
  }));
}
function Ar(a, e) {
  const t = a == null ? void 0 : a.toggles;
  return t && typeof t == "object" && e in t ? !!t[e] : !!(a != null && a[e]);
}
function QT(a, e) {
  a.useEdge = !!e.useEdge, a.takeRisks = !!e.takeRisks, a.opponentRoll = !!e.opponentRoll, a.toggles = a.toggles && typeof a.toggles == "object" ? a.toggles : {}, a.toggles.useEdge = !!e.useEdge, a.toggles.takeRisks = !!e.takeRisks, a.toggles.opponentRoll = !!e.opponentRoll;
}
function Gc(a, e, t) {
  const i = String(t ?? "").trim(), n = i ? mp(e, i) : "";
  if (i && n) {
    a.specializationKey = i, a.specializationLabel = n;
    return;
  }
  delete a.specializationKey, delete a.specializationLabel;
}
function JT(a) {
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
var Nt;
const qe = class qe extends VT(qT) {
  constructor({ actor: t, baseContext: i, initialState: n = null, options: s = {} }) {
    var c, u;
    super(s);
    we(this, Nt, null);
    /** @type {{ baseContext: any, state: any }} */
    O(this, "_mwd", { baseContext: null, state: null });
    this.actor = t, this._mwd.baseContext = i ?? {};
    const r = foundry.utils.deepClone(this._mwd.baseContext.payload ?? {}), o = Kc(r.manualModifiers);
    this._mwd.state = foundry.utils.mergeObject(
      {
        payload: r,
        manual: o,
        toggles: {
          useEdge: Ar(r, "useEdge"),
          takeRisks: Ar(r, "takeRisks"),
          opponentRoll: Ar(r, "opponentRoll")
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
      Re(this, Nt, t), this.render(!0);
    });
  }
  async close(t = {}) {
    if (F(this, Nt)) {
      const i = F(this, Nt);
      Re(this, Nt, null), i(null);
    }
    return super.close(t);
  }
  /* --------------------------- */
  /* Prepare Context             */
  /* --------------------------- */
  async _prepareContext(t) {
    var G, Y, q, Q, L, U, V, Z, re, be, ce, se, Oe, Fe, Ue, Ve, at, nt, st, rt, et, Ye, pt, bt, St, N, H, ge, ie, Ie, At, M, R, K, Se, ue, Pe, He, tt, ct, Rt;
    const i = this._mwd.baseContext ?? {}, n = this._mwd.state ?? {}, s = Number.isFinite(Number((G = n == null ? void 0 : n.payload) == null ? void 0 : G.dn)) ? Number(n.payload.dn) : Number.isFinite(Number((q = (Y = i == null ? void 0 : i.resolved) == null ? void 0 : Y.dn) == null ? void 0 : q.total)) ? Number(i.resolved.dn.total) : Number.isFinite(Number(i == null ? void 0 : i.dn)) ? Number(i.dn) : Number.isFinite(Number((L = (Q = i == null ? void 0 : i.resolved) == null ? void 0 : Q.difficulty) == null ? void 0 : L.dn)) ? Number(i.resolved.difficulty.dn) : 1, r = (i == null ? void 0 : i.intent) ?? "skill";
    let o, l;
    const c = Array.isArray(n.manual) ? n.manual.reduce((ee, Te) => ee + Number((Te == null ? void 0 : Te.value) || 0), 0) : 0;
    if (r === "edge") {
      const ee = (i == null ? void 0 : i.resolved) ?? {}, Te = Array.isArray(ee.breakdown) ? ee.breakdown : [], ot = (Qe) => {
        var W;
        return Number(((W = Te.find((pe) => pe.id === Qe)) == null ? void 0 : W.value) ?? 0);
      }, lt = Number(((U = ee == null ? void 0 : ee.pool) == null ? void 0 : U.attribute) ?? 0);
      o = {
        pool: lt,
        rating: ot("rating"),
        cap: ot("cap"),
        modifiers: Number(((V = i == null ? void 0 : i.dice) == null ? void 0 : V.modifiers) ?? 0)
      }, l = Math.max(0, lt + o.modifiers + c);
    } else {
      o = {
        attribute: Number(((Z = i == null ? void 0 : i.dice) == null ? void 0 : Z.attribute) ?? 0),
        skill: Number(((re = i == null ? void 0 : i.dice) == null ? void 0 : re.skill) ?? 0),
        bonus: Number(((be = i == null ? void 0 : i.dice) == null ? void 0 : be.bonus) ?? 0),
        specialization: Number(((ce = i == null ? void 0 : i.dice) == null ? void 0 : ce.specialization) ?? 0),
        modifiers: Number(((se = i == null ? void 0 : i.dice) == null ? void 0 : se.modifiers) ?? 0)
      };
      const ee = o.modifiers + c, Te = o.attribute + o.skill + o.bonus + o.specialization;
      l = Math.max(0, Te + ee);
    }
    const u = Array.isArray((Oe = i == null ? void 0 : i.resolved) == null ? void 0 : Oe.domains) ? i.resolved.domains : [], d = u.includes("physical") ? "physical" : u.includes("mental") ? "mental" : u.includes("social") ? "social" : null, f = (d === "physical" ? ["grit", "chaos"] : d === "mental" ? ["insight", "rumor"] : d === "social" ? ["legend", "credibility"] : []).map((ee) => {
      var Te, ot, lt, Qe;
      return {
        key: ee,
        label: ee.charAt(0).toUpperCase() + ee.slice(1),
        available: Number(((lt = (ot = (Te = this.actor) == null ? void 0 : Te.getEdgePool) == null ? void 0 : ot.call(Te, ee)) == null ? void 0 : lt.effectiveValue) ?? 0),
        selected: ee === (((Qe = n.edge) == null ? void 0 : Qe.prePoolKey) ?? null)
      };
    }), p = f.find((ee) => ee.selected), h = (p == null ? void 0 : p.label) ?? null, g = ((Fe = i == null ? void 0 : i.resolved) == null ? void 0 : Fe.attack) ?? null, y = String(
      ((Ue = g == null ? void 0 : g.skill) == null ? void 0 : Ue.code) ?? ((at = (Ve = i == null ? void 0 : i.resolved) == null ? void 0 : Ve.specialization) == null ? void 0 : at.skillKey) ?? ((st = (nt = i == null ? void 0 : i.resolved) == null ? void 0 : nt.data) == null ? void 0 : st.skillKey) ?? ((rt = i == null ? void 0 : i.payload) == null ? void 0 : rt.key) ?? ""
    ).trim(), b = y ? Du(((et = this.actor) == null ? void 0 : et.system) ?? {}, y) : [], S = String(((Ye = n == null ? void 0 : n.payload) == null ? void 0 : Ye.specializationKey) ?? "").trim(), w = b.find((ee) => ee.key === S) ?? null;
    if (r !== "edge") {
      o.specialization = w ? Number(((bt = (pt = i == null ? void 0 : i.resolved) == null ? void 0 : pt.specialization) == null ? void 0 : bt.value) ?? 2) : 0;
      const ee = o.modifiers + c, Te = o.attribute + o.skill + o.bonus + o.specialization;
      l = Math.max(0, Te + ee);
    }
    const v = Array.isArray((St = g == null ? void 0 : g.payloadState) == null ? void 0 : St.payloads) ? g.payloadState.payloads : [], P = String(((N = g == null ? void 0 : g.weapon) == null ? void 0 : N.category) ?? "").trim().toLowerCase() !== "melee" && v.length > 0, E = String(((H = n == null ? void 0 : n.payload) == null ? void 0 : H.payloadId) ?? ((ge = g == null ? void 0 : g.payloadState) == null ? void 0 : ge.activePayloadId) ?? "").trim(), z = v.find((ee) => ee.id === E) ?? null;
    return {
      header: {
        left: ((ie = i == null ? void 0 : i.header) == null ? void 0 : ie.left) ?? "Roll",
        right: ((Ie = i == null ? void 0 : i.header) == null ? void 0 : Ie.right) ?? ((At = this.actor) == null ? void 0 : At.name) ?? ""
      },
      formula: String((i == null ? void 0 : i.formula) ?? ((M = i == null ? void 0 : i.resolved) == null ? void 0 : M.formula) ?? "").trim(),
      dice: o,
      modifiers: Array.isArray(i.modifiers) ? i.modifiers : [],
      manual: (n.manual ?? []).map((ee) => ({
        ...ee,
        steps: YT(Number(ee.value ?? 0), -3, 3)
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
        selectedLabel: (w == null ? void 0 : w.label) ?? ""
      } : null,
      attack: g ? {
        weaponName: ((R = g == null ? void 0 : g.weapon) == null ? void 0 : R.name) ?? "Weapon",
        rangeBand: ((K = g == null ? void 0 : g.weapon) == null ? void 0 : K.type) === "personalWeapon" || (Se = g == null ? void 0 : g.weapon) != null && Se.isSynthetic ? Os((g == null ? void 0 : g.rangeBand) ?? "") : (g == null ? void 0 : g.rangeBand) ?? "",
        damageType: ((ue = z == null ? void 0 : z.modifies) == null ? void 0 : ue.damageType) || ((Pe = g == null ? void 0 : g.weapon) == null ? void 0 : Pe.damageTypeLabel) || ((He = g == null ? void 0 : g.weapon) == null ? void 0 : He.damageType) || "",
        usesPayloads: P,
        source: (g == null ? void 0 : g.sourceState) ?? null,
        payloads: v.map((ee) => {
          var Te;
          return {
            id: ee.id,
            name: ee.label,
            damageType: (Te = ee.modifies) == null ? void 0 : Te.damageType,
            selected: ee.id === E
          };
        }),
        selectedPayloadId: E,
        selectedPayloadLabel: (z == null ? void 0 : z.label) ?? ((tt = g == null ? void 0 : g.payload) == null ? void 0 : tt.label) ?? ((ct = g == null ? void 0 : g.weapon) == null ? void 0 : ct.payloadLabel) ?? "",
        selectedSourceLabel: ((Rt = g == null ? void 0 : g.sourceState) == null ? void 0 : Rt.label) ?? ""
      } : null
    };
  }
  /* --------------------------- */
  /* Actions                     */
  /* --------------------------- */
  async _onCancel(t) {
    if (t == null || t.preventDefault(), F(this, Nt)) {
      const i = F(this, Nt);
      Re(this, Nt, null), i(null);
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
    }), QT(i.payload, i.toggles ?? {}), Gc(
      i.payload,
      ((n = i.payload) == null ? void 0 : n.intent) === "attack" ? ((s = i.payload) == null ? void 0 : s.skillKey) ?? ((c = (l = (o = (r = this._mwd.baseContext) == null ? void 0 : r.resolved) == null ? void 0 : o.attack) == null ? void 0 : l.skill) == null ? void 0 : c.code) : ((u = i.payload) == null ? void 0 : u.key) ?? ((f = (m = (d = this._mwd.baseContext) == null ? void 0 : d.resolved) == null ? void 0 : m.data) == null ? void 0 : f.skillKey),
      (p = i.payload) == null ? void 0 : p.specializationKey
    ), F(this, Nt)) {
      const y = F(this, Nt);
      Re(this, Nt, null), y({ payload: i.payload });
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
      return Gc(this._mwd.state.payload, n, s), this.render(!1);
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
    }, u = s ?? JT(n), d = {
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
    l.manualModifiers = Kc(l.manualModifiers);
    const p = await new qe({
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
Nt = new WeakMap(), O(qe, "DEFAULT_OPTIONS", foundry.utils.mergeObject(
  Yt(qe, qe, "DEFAULT_OPTIONS"),
  {
    id: "mwd-roll-dialog",
    classes: [
      ...Yt(qe, qe, "DEFAULT_OPTIONS").classes ?? [],
      "mwd",
      "mwd-roll-dialog"
    ],
    window: { title: "Roll", resizable: !1 },
    position: { width: 520, height: "auto" },
    actions: {
      submit: qe.prototype._onSubmit,
      cancel: qe.prototype._onCancel,
      addManual: qe.prototype._onAddManual,
      removeManual: qe.prototype._onRemoveManual,
      setManualValue: qe.prototype._onSetManualValue,
      setManualStepper: qe.prototype._onSetManualStepper,
      setEdgePrePool: qe.prototype._onSetEdgePrePool,
      toggleCheckbox: qe.prototype._onToggleCheckbox,
      setDn: qe.prototype._onSetDn,
      setPayload: qe.prototype._onSetPayload,
      setSpecialization: qe.prototype._onSetSpecialization
    }
  },
  { inplace: !1 }
)), O(qe, "PARTS", {
  body: { template: "systems/mwd/templates/v2/roll/mwd-roll-dialog.hbs" }
});
let wo = qe;
const { ApplicationV2: XT, HandlebarsApplicationMixin: ZT } = foundry.applications.api, an = class an extends ZT(XT) {
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
      classes: [game.system.anarchy.styles.selectCssClass(), ...an.DEFAULT_OPTIONS.classes],
      window: { title: e }
    };
    return new an({ items: t }, i).wait();
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
O(an, "PARTS", {
  body: {
    template: `${X}/dialog/select-item.hbs`
  }
});
let ko = an;
const qc = { execute: rw }, ew = {
  physical: ["grit", "chaos"],
  mental: ["insight", "rumor"],
  social: ["legend", "credibility"]
};
function tw(a, e) {
  var s;
  const t = ew[e] ?? [];
  let i = null, n = -1;
  for (const r of t) {
    const o = (s = a.getEdgePool) == null ? void 0 : s.call(a, r), l = Number((o == null ? void 0 : o.rating) ?? 0), c = Number((o == null ? void 0 : o.value) ?? 0), u = Math.max(0, l - c);
    u > n && (n = u, i = r);
  }
  return i ?? t[0] ?? null;
}
function iw(a) {
  const t = (Array.isArray(a == null ? void 0 : a.manualModifiers) ? a.manualModifiers : []).map((n) => ({
    id: n.id ?? foundry.utils.randomID(),
    label: (n.label ?? "Manual").trim() || "Manual",
    value: Number(n.value ?? 0),
    source: "Manual"
  })).filter((n) => Number.isFinite(n.value) && n.value !== 0), i = t.reduce((n, s) => n + s.value, 0);
  return { mods: t, total: i };
}
function Vc(a = {}) {
  const e = a.toggles ?? {}, t = String((a == null ? void 0 : a.payloadId) ?? (a == null ? void 0 : a.ammoTypeId) ?? "").trim();
  return {
    ...a,
    ...t ? { payloadId: t } : {},
    toggles: {
      useEdge: !!e.useEdge,
      takeRisks: !!e.takeRisks,
      opponentRoll: !!e.opponentRoll
    },
    manualModifiers: nw(a.manualModifiers)
  };
}
async function aw({ actor: a, payload: e } = {}) {
  var s, r, o, l, c, u, d, m, f, p, h, g;
  if ((e == null ? void 0 : e.intent) !== "attack") return e;
  const t = foundry.utils.deepClone(e ?? {}), i = ((s = a.getPersonalCombatLoadout) == null ? void 0 : s.call(a, { refresh: !0 })) ?? null, n = (y) => {
    var S, w, v, P, E;
    const b = ((w = (S = a.items) == null ? void 0 : S.get) == null ? void 0 : w.call(S, y)) ?? null;
    return !b || !(((v = b.isPersonalWeapon) == null ? void 0 : v.call(b)) ?? b.type === A.itemType.personalWeapon) || !((P = b.system) != null && P.equipped) ? null : ((E = b.getCombatProfile) == null ? void 0 : E.call(b, { payloadId: t == null ? void 0 : t.payloadId })) ?? null;
  };
  if (t.weaponId) {
    const y = n(t.weaponId);
    if (!y)
      throw new Error("Attack requires an owned equipped personal weapon.");
    return t.payloadId = t.payloadId ?? ((r = y == null ? void 0 : y.payloadState) == null ? void 0 : r.activePayloadId) ?? "", t;
  }
  if (t.mode === "auto") {
    if (i != null && i.weaponChoiceRequired) {
      const y = await ko.selectItem(
        "Choose Weapon",
        i.equippedWeapons ?? []
      );
      return y ? (t.weaponId = y.id, t.payloadId = t.payloadId ?? ((o = y == null ? void 0 : y.payloadState) == null ? void 0 : o.activePayloadId) ?? "", delete t.mode, t) : null;
    }
    if ((l = i == null ? void 0 : i.defaultWeapon) != null && l.isSynthetic || ((c = i == null ? void 0 : i.defaultWeapon) == null ? void 0 : c.id) === "unarmed")
      return t.syntheticWeapon = foundry.utils.deepClone(i.defaultWeapon ?? xt.buildDefaultUnarmedProfile(a)), t.weaponId = t.syntheticWeapon.id, t.payloadId = t.payloadId ?? ((d = (u = t.syntheticWeapon) == null ? void 0 : u.payloadState) == null ? void 0 : d.activePayloadId) ?? "", delete t.mode, t;
    if ((m = i == null ? void 0 : i.defaultWeapon) != null && m.id)
      return t.weaponId = i.defaultWeapon.id, t.payloadId = t.payloadId ?? ((p = (f = i.defaultWeapon) == null ? void 0 : f.payloadState) == null ? void 0 : p.activePayloadId) ?? "", delete t.mode, t;
  }
  if (t.fallback === "unarmed")
    return t.syntheticWeapon = foundry.utils.deepClone(xt.buildDefaultUnarmedProfile(a)), t.weaponId = t.syntheticWeapon.id, t.payloadId = t.payloadId ?? ((g = (h = t.syntheticWeapon) == null ? void 0 : h.payloadState) == null ? void 0 : g.activePayloadId) ?? "", delete t.mode, t;
  throw new Error("Attack could not resolve a usable weapon.");
}
function nw(a) {
  return Array.isArray(a) ? a.map((e) => ({
    id: (e == null ? void 0 : e.id) ?? foundry.utils.randomID(),
    label: typeof (e == null ? void 0 : e.label) == "string" ? e.label : "Manual",
    value: Number((e == null ? void 0 : e.value) ?? 0)
  })) : [];
}
async function sw(a = []) {
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
async function rw({ actor: a, payload: e, event: t } = {}) {
  var q, Q, L, U, V, Z, re, be, ce, se, Oe, Fe, Ue, Ve, at, nt, st, rt, et, Ye, pt, bt, St, N, H, ge, ie, Ie, At, M, R, K, Se, ue, Pe, He, tt, ct, Rt, ee, Te, ot, lt, Qe;
  if (a != null && a.actor && (a = a.actor), (q = a == null ? void 0 : a.document) != null && q.actor && (a = a.document.actor), !a) throw new Error("MWD.roll.execute requires actor");
  if (!(e != null && e.intent)) throw new Error("MWD.roll.execute requires payload.intent");
  if (e = Vc(e), e = await aw({ actor: a, payload: e }), !e) return null;
  let i = await Sr({ actor: a, payload: e, event: t });
  if (e.intent === "attack" && ((L = (Q = i == null ? void 0 : i.attack) == null ? void 0 : Q.capabilityReport) != null && L.isTemplated)) {
    const W = await vT({
      actor: a,
      attack: i.attack
    });
    if (!W) return null;
    try {
      await kT({
        actor: a,
        attack: i.attack,
        templateGeometry: W.templateGeometry ?? null
      });
    } catch (pe) {
      console.warn("MWD | Unable to create visual template indicator", pe);
    }
    if (await sw(W.autoTargetTokenIds ?? []), !ru(((U = i == null ? void 0 : i.attack) == null ? void 0 : U.areaEffect) ?? ((Z = (V = i == null ? void 0 : i.attack) == null ? void 0 : V.payload) == null ? void 0 : Z.areaEffect) ?? {}) && (!Array.isArray(W.targetSnapshots) || W.targetSnapshots.length === 0))
      return (re = ui.notifications) == null || re.warn("Template placement did not affect any targets."), null;
    e.targetSnapshots = Array.isArray(W.targetSnapshots) ? W.targetSnapshots : [], e.templateGeometry = W.templateGeometry ?? null, e.templatePlacement = W.placement, i = await Sr({ actor: a, payload: e, event: t });
  } else e.intent === "attack" && (delete e.targetSnapshots, delete e.templatePlacement, delete e.templateGeometry);
  let n = await jc({
    actor: a,
    rollType: e.intent,
    skillId: e.key,
    domains: i.domains,
    payload: e,
    resolved: i,
    context: { event: t }
  });
  const s = await wo.prompt({
    actor: a,
    basePayload: e,
    resolved: i,
    diceParts: {
      attribute: ((be = i == null ? void 0 : i.pool) == null ? void 0 : be.attribute) ?? 0,
      skill: ((ce = i == null ? void 0 : i.pool) == null ? void 0 : ce.skill) ?? 0,
      bonus: ((se = i == null ? void 0 : i.pool) == null ? void 0 : se.bonus) ?? 0,
      specialization: ((Oe = i == null ? void 0 : i.pool) == null ? void 0 : Oe.specialization) ?? 0
    },
    mods: n.mods,
    modTotal: n.total,
    options: {
      allowEdge: e.intent !== "initiative"
    }
  });
  if (!s) return null;
  if (e = Vc(s), i = await Sr({ actor: a, payload: e, event: t }), e.intent === "attack" && !((Ue = (Fe = i == null ? void 0 : i.attack) == null ? void 0 : Fe.capabilityReport) != null && Ue.isTemplated) && (delete e.targetSnapshots, delete e.templatePlacement, delete e.templateGeometry), e.intent === "attack" && e.weaponId) {
    const W = ((at = (Ve = a.items) == null ? void 0 : Ve.get) == null ? void 0 : at.call(Ve, e.weaponId)) ?? null;
    if ((nt = W == null ? void 0 : W.isPersonalWeapon) != null && nt.call(W)) {
      const pe = String(e.payloadId ?? "").trim(), ci = String(((st = W.system) == null ? void 0 : st.selectedPayloadId) ?? "").trim();
      if (pe && pe !== ci && await ((rt = W.setActivePayload) == null ? void 0 : rt.call(W, pe)), !((et = W.canConsumePayload) != null && et.call(W, { payloadId: pe }))) {
        const Dt = (Ye = W.getPayloadState) == null ? void 0 : Ye.call(W, { payloadId: pe }), Ai = Dt != null && Dt.payloadLabel ? ` (${Dt.payloadLabel})` : "";
        return (pt = ui.notifications) == null || pt.warn(`Not enough payload${Ai} for ${W.name}.`), null;
      }
    }
  }
  n = await jc({
    actor: a,
    rollType: e.intent,
    skillId: e.key,
    domains: i.domains,
    payload: e,
    resolved: i,
    context: { event: t }
  });
  const { mods: r, total: o } = n, { mods: l, total: c } = iw(e);
  let u = [...r, ...l], d = Number(o ?? 0) + Number(c ?? 0);
  const m = Number(((bt = i == null ? void 0 : i.pool) == null ? void 0 : bt.attribute) ?? 0) + Number(((St = i == null ? void 0 : i.pool) == null ? void 0 : St.skill) ?? 0) + Number(((N = i == null ? void 0 : i.pool) == null ? void 0 : N.bonus) ?? 0) + Number(((H = i == null ? void 0 : i.pool) == null ? void 0 : H.specialization) ?? 0), f = Math.max(0, m + Number(d ?? 0)), p = e.intent !== "initiative", h = p ? ow({ actor: a, ctx: i, payload: e }) : null, g = (ge = h == null ? void 0 : h.pre) != null && ge.spent ? 4 : Number(i.diceTarget ?? i.target ?? 5), y = {
    snapshot: ((At = (Ie = (ie = game.mwd) == null ? void 0 : ie.personalCombat) == null ? void 0 : Ie.getSnapshot) == null ? void 0 : At.call(Ie, a)) ?? null
  }, b = Lt({
    actor: a,
    phase: "onBuildRoll",
    facts: Wo({ actor: a, resolved: i, payload: e, runtime: y }),
    packet: {},
    options: { runtime: y, consumeUsage: !0 }
  });
  await yi({ actor: a, mutations: b.mutations, runtime: y }), p && ((M = h == null ? void 0 : h.pre) != null && M.spent) && ((R = h == null ? void 0 : h.pre) != null && R.poolKey) && await ((K = a.spendEdge) == null ? void 0 : K.call(a, h.pre.poolKey, 1));
  let S, w = 0, v = 0;
  if (i.rollType === "sum" && ((Se = i.sum) != null && Se.formula))
    S = await new Roll(i.sum.formula, i.sum.data ?? {}).evaluate(), w = Number(S.total ?? 0) + Number(d ?? 0);
  else {
    S = await new Roll(`${f}d6cs>=${g}`).evaluate();
    const W = (ue = S.dice) == null ? void 0 : ue[0];
    w = Array.isArray(W == null ? void 0 : W.results) ? W.results.filter((pe) => pe.success).length : 0, v = Array.isArray(W == null ? void 0 : W.results) ? W.results.filter((pe) => pe.result === 1).length : 0;
  }
  if (i.intent === "initiative" && (S == null ? void 0 : S.total) != null) {
    const W = { total: Number(S.total ?? 0) + Number(d ?? 0) }, pe = Lt({
      actor: a,
      phase: "onInitiativeResolved",
      facts: ad({ actor: a, packet: W, runtime: y }),
      packet: W,
      options: { runtime: y, consumeUsage: !0 }
    });
    if (await yi({ actor: a, mutations: pe.mutations, runtime: y }), pe.modifiers.length) {
      const ci = pe.modifiers.reduce((Dt, Ai) => Dt + Number(Ai.value ?? 0), 0);
      u = u.concat(pe.modifiers), d += ci, w = Number(pe.packet.total ?? 0), await Yc({ actor: a, total: pe.packet.total ?? S.total }), i.breakdown = (i.breakdown ?? []).concat(pe.modifiers.map((Dt, Ai) => ({
        id: `traitInitiative${Ai + 1}`,
        label: Dt.label,
        value: Number(Dt.value ?? 0)
      })));
    } else
      w = Number(W.total ?? 0), await Yc({ actor: a, total: W.total });
  }
  const P = cm(
    i,
    { successes: w, raw: (Pe = S == null ? void 0 : S.toJSON) == null ? void 0 : Pe.call(S) },
    null
    // opposed rolls can pass defender result later
  ), E = P == null ? void 0 : P.edgeEarned;
  if ((E == null ? void 0 : E.amount) > 0) {
    const W = (He = i == null ? void 0 : i.domains) != null && He.includes("physical") ? "physical" : (tt = i == null ? void 0 : i.domains) != null && tt.includes("mental") ? "mental" : (ct = i == null ? void 0 : i.domains) != null && ct.includes("social") ? "social" : null, pe = tw(a, W);
    await ((Rt = a.gainEdge) == null ? void 0 : Rt.call(a, pe, E.amount)), P.edgeEarned.pool = pe;
  }
  i.intent === "overload" && await uw({ actor: a, passed: P.passed });
  let z = null;
  i.intent === "attack" && (z = await rm({
    attacker: a,
    ctx: i,
    outcomeModel: P
  }));
  const G = WT({
    actor: a,
    payload: e,
    ctx: i,
    roll: S,
    target: g,
    pool: f,
    mods: u,
    modTotal: d,
    hits: w,
    ones: v,
    edge: h,
    outcomeModel: P
  });
  z && (G.attackResult = z);
  const Y = await Ba({ resolved: G });
  if (e.intent === "attack" && e.weaponId) {
    const W = ((Te = (ee = a.items) == null ? void 0 : ee.get) == null ? void 0 : Te.call(ee, e.weaponId)) ?? null;
    (ot = W == null ? void 0 : W.isPersonalWeapon) != null && ot.call(W) && (await ((lt = W.consumePayload) == null ? void 0 : lt.call(W, { payloadId: e.payloadId })) || (Qe = ui.notifications) == null || Qe.warn(`Payload could not be consumed for ${W.name}.`));
  }
  return ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor: a }),
    content: Y,
    flags: {
      mwd: {
        payload: e,
        resolved: G
      }
    }
  });
}
function ow({ actor: a, ctx: e, payload: t }) {
  var p, h, g, y, b, S, w;
  const i = lw(e == null ? void 0 : e.domains), n = cw[i] ?? null, s = (n == null ? void 0 : n.a) ?? null, r = (n == null ? void 0 : n.b) ?? null, o = [s, r].filter(Boolean), l = !!((p = t == null ? void 0 : t.toggles) != null && p.useEdge) || !!(t != null && t.useEdge);
  let c = String(((g = (h = t == null ? void 0 : t.edge) == null ? void 0 : h.pre) == null ? void 0 : g.poolKey) ?? "").trim() || null;
  c && !o.includes(c) && (c = null);
  const u = l && c ? 1 : 0;
  let d = [...o];
  u && c && (d = d.filter((v) => v !== c));
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
function lw(a) {
  return Array.isArray(a) ? a.includes("physical") ? "physical" : a.includes("mental") ? "mental" : a.includes("social") ? "social" : null : null;
}
const cw = {
  physical: { a: "grit", b: "chaos" },
  mental: { a: "insight", b: "rumor" },
  social: { a: "legend", b: "credibility" }
};
async function Yc({ actor: a, total: e }) {
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
async function uw({ actor: a, passed: e }) {
  e || await a.update({ "system.burn.overloaded": !0 });
}
const dw = /* @__PURE__ */ new Set(["physical", "mental", "social"]);
function mw(a) {
  if (a == null || a === "" || a === "—" || a === "–") return 0;
  const e = Number(a);
  return Number.isFinite(e) ? e : null;
}
function fw(a) {
  if (!a) return;
  const e = String(a).trim().toLowerCase();
  return dw.has(e) ? e : void 0;
}
class pw {
  constructor() {
    O(this, "id", "mwd.itemModifiers");
    O(this, "label", "Item Modifiers");
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
          const c = mw(l.value);
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
            domain: fw(l.domain)
          });
        }
    }
    return i;
  }
}
class hw {
  constructor() {
    O(this, "id", "mwd.statusEffects");
    O(this, "label", "Status Effects");
  }
  collect({ actor: e } = {}) {
    var n;
    const t = e == null ? void 0 : e.statuses;
    if (!e || !t) return [];
    const i = [];
    for (const s of t) {
      const r = Ps(s), o = r ? Rs(r, e) ? r.modifierKey : "" : s, l = va == null ? void 0 : va[o];
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
class gw {
  constructor() {
    O(this, "id", "mwd.baseRollModifiers");
    O(this, "label", "Roll (Base)");
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
class yw {
  constructor() {
    O(this, "id", "mwd.condition");
    O(this, "label", "Condition");
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
const bw = {
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
class Sw {
  constructor() {
    O(this, "id", "mwd.lifeModules");
    O(this, "label", "Life Modules");
  }
  collect({ actor: e, resolved: t } = {}) {
    return dg({ actor: e, resolved: t });
  }
}
class Aw {
  constructor() {
    O(this, "id", "mwd.traits");
    O(this, "label", "Traits");
  }
  collect({ actor: e, resolved: t, payload: i } = {}) {
    var s, r, o;
    if (!e) return [];
    const n = {
      snapshot: ((o = (r = (s = game.mwd) == null ? void 0 : s.personalCombat) == null ? void 0 : r.getSnapshot) == null ? void 0 : o.call(r, e)) ?? null
    };
    return Lt({
      actor: e,
      phase: "onBuildRoll",
      facts: Wo({ actor: e, resolved: t, payload: i, runtime: n }),
      packet: {},
      options: { runtime: n, consumeUsage: !1 }
    }).modifiers;
  }
}
const Tw = Object.freeze({
  attackCQPenalty: { value: -1, intents: ["attack"], label: "Attack CQ Penalty" },
  sensorPenalty: { value: -1, skills: ["perception", "technician"], label: "Sensor Penalty" },
  pilotingPenalty: { value: -1, skills: ["piloting"], label: "Piloting Penalty" }
});
class ww {
  constructor() {
    O(this, "id", "mwd.machineCriticals");
    O(this, "label", "Machine Criticals");
  }
  collect({ actor: e, resolved: t, payload: i } = {}) {
    var l, c, u;
    const n = Hd(e);
    if (!n.length) return [];
    const s = String((t == null ? void 0 : t.intent) ?? (i == null ? void 0 : i.intent) ?? "").trim(), r = String(((c = (l = t == null ? void 0 : t.attack) == null ? void 0 : l.skill) == null ? void 0 : c.code) ?? ((u = t == null ? void 0 : t.skill) == null ? void 0 : u.code) ?? (i == null ? void 0 : i.key) ?? "").trim(), o = [];
    for (const d of n)
      for (const m of d.mods ?? []) {
        const f = Tw[m];
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
function kw() {
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
function vw() {
  return {
    get(a) {
      return Bt(a);
    },
    getSkills({ withKnowledge: a = !1 } = {}) {
      return as();
    },
    list() {
      return as();
    }
  };
}
function Mw() {
  return {
    get(a) {
      return Oi(a);
    },
    list() {
      return $s();
    },
    listByType(a) {
      return Jo(a);
    },
    getTypeLabel(a) {
      return Da(a);
    },
    evaluate(a) {
      return Li(a);
    }
  };
}
function Cw() {
  return {
    normalizeQualitySystem(a) {
      return Kt(a);
    },
    getEditorConfig() {
      return Xu();
    },
    evaluatePhase(a) {
      return Lt(a);
    },
    applyMutations(a) {
      return yi(a);
    },
    buildRollFacts(a) {
      return Wo(a);
    },
    buildActionCostFacts(a) {
      return id(a);
    },
    buildBurnFacts(a) {
      return zn(a);
    },
    buildInitiativeFacts(a) {
      return ad(a);
    },
    buildDamageFacts(a) {
      return nd(a);
    },
    buildEdgeFacts(a) {
      return Lr(a);
    },
    buildEndOfActivationFacts(a) {
      return sd(a);
    }
  };
}
class fl {
  static start() {
    const e = new fl();
    Hooks.once("init", () => e.onInit()), Hooks.once("ready", () => e.onReady());
  }
  async onInit() {
    console.log(Ce + "AnarchySystem.onInit"), game.system.mwd = this, game.system.anarchy = this, game.mwd ?? (game.mwd = {}), kw(), RS(), nb("mwd"), game.mwd.roll = qc, game.mwd.attacks = Pc, game.mwd.personalCombat = B, game.mwd.harm = Pt, this.roll = qc, this.attacks = Pc, this.personalCombat = B, this.harm = Pt, this.skills = vw(), this.lifeModules = Mw(), this.traits = Cw(), this.remoteCall = new Ir(), game.system.mwd.skills = this.skills, game.system.mwd.lifeModules = this.lifeModules, game.system.mwd.traits = this.traits, game.mwd.skills = this.skills, game.mwd.lifeModules = this.lifeModules, game.mwd.traits = this.traits, Me.init(), this.modifiers = new fe(), Zt.register(new pw()), Zt.register(new hw()), Zt.register(new gw()), Zt.register(new yw()), Zt.register(bw), Zt.register(new Sw()), Zt.register(new Aw()), Zt.register(new ww()), Zt.register(new Dy()), Handlebars.registerHelper("mwdClassList", (e) => Array.isArray(e) ? e.join(" ") : typeof e == "string" ? e : ""), this.actorClasses = {
      character: oc,
      npc: oc,
      vehicle: Gd,
      battlemech: Ry
    }, this.hooks = new Zi(), this.styles = new Lg(), this.handlebarsManager = new Xo(), B.init(), Ub.register(), Hooks.on("updateSetting", (e) => {
      (e == null ? void 0 : e.key) === `${T}.statusConditionCatalog` && Ml();
    }), console.log(Ce + "AnarchySystem.onInit | loading system"), CONFIG.ANARCHY = Le, CONFIG.Combat.initiative = { formula: "2d6" }, Ml(), CONFIG.Actor.documentClass = GA, CONFIG.Item.documentClass = _a, _a.init(), ym(), xp(), AA(), BA(), await UA(), console.log(Ce + "AnarchySystem.onInit | done");
  }
  async onReady() {
    if (console.log(Ce + "AnarchySystem.onReady"), await B.onReady(), !game.user.isGM) return;
    await sg();
    const e = game.settings.get(T, "enableGMGadget");
    if (!e) {
      console.log(`${Ce}GMManager render skipped (enableGMGadget=false)`);
      return;
    }
    game.mwd = game.mwd ?? {}, game.mwd.gmGadget = () => sb({ systemId: T }).render({ force: !0 }), e && game.mwd.gmGadget();
  }
}
fl.start();
//# sourceMappingURL=index.mjs.map
