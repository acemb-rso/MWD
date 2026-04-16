var gf = Object.defineProperty;
var yf = Object.getPrototypeOf;
var bf = Reflect.get;
var Ol = (a) => {
  throw TypeError(a);
};
var Sf = (a, e, t) => e in a ? gf(a, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : a[e] = t;
var O = (a, e, t) => Sf(a, typeof e != "symbol" ? e + "" : e, t), ss = (a, e, t) => e.has(a) || Ol("Cannot " + t);
var H = (a, e, t) => (ss(a, e, "read from private field"), t ? t.call(a) : e.get(a)), we = (a, e, t) => e.has(a) ? Ol("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(a) : e.set(a, t), Ee = (a, e, t, i) => (ss(a, e, "write to private field"), i ? i.call(a, t) : e.set(a, t), t), C = (a, e, t) => (ss(a, e, "access private method"), t);
var Xt = (a, e, t) => bf(yf(a), t, e);
const $e = {
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
    reliability: "Reliability",
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
}, v = $e, T = "mwd", Af = "MechWarrior: Destiny", xs = `system.${T}`, Tf = T, En = `systems/${T}`, Au = `${En}/style`, Xa = `${En}/third-party/style`, ee = `systems/${T}/templates`, Ir = `${En}/img/icons`, me = `${Ir}/skills`, Me = "MWD | ", wf = 2, kf = 5, vf = 4, Tu = 8, Pi = {
  reflexes: "reflexes",
  strength: "strength",
  willpower: "willpower",
  intelligence: "intelligence",
  charisma: "charisma",
  edge: "edge",
  handling: "handling",
  system: "system",
  chassis: "chassis",
  reliability: "reliability",
  condition: "condition"
}, $s = {
  autopilot: "autopilot",
  firewall: "firewall",
  knowledge: "knowledge"
}, Et = {
  grit: "grit",
  chaos: "chaos",
  insight: "insight",
  rumor: "rumor",
  legend: "legend",
  credibility: "credibility"
}, Fo = {
  physical: [Et.grit, Et.chaos],
  mental: [Et.insight, Et.rumor],
  social: [Et.legend, Et.credibility]
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
  actorAttributes: Pi,
  itemAttributes: $s,
  attributes: { ...Pi, ...$s },
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
    edgePools: Et,
    edgePoolGroups: Fo,
    physical: {
      grit: Et.grit,
      chaos: Et.chaos
    },
    mental: {
      insight: Et.insight,
      rumor: Et.rumor
    },
    social: {
      legend: Et.legend,
      credibility: Et.credibility
    },
    chaos: Et.chaos
  },
  area: {
    none: "none",
    shotgun: "shotgun",
    circle: "circle",
    cone: "cone",
    rect: "rect",
    ray: "ray"
  }
}, Mf = Object.freeze({
  physical: "physical",
  mental: "mental",
  social: "social"
});
Object.freeze(Object.values(Mf));
const _a = {
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
    A.actorAttributes.reliability
  ],
  [A.actorTypes.battlemech]: [
    A.actorAttributes.handling,
    A.actorAttributes.system,
    A.actorAttributes.chassis,
    A.actorAttributes.reliability
  ]
}, os = {
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
}, gt = {
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
  SYSTEM_DESCRIPTION: Af,
  SYSTEM_SOCKET: xs,
  SYSTEM_SCOPE: Tf,
  SYSTEM_PATH: En,
  STYLE_PATH: Au,
  THIRD_PARTY_STYLE_PATH: Xa,
  TEMPLATES_PATH: ee,
  ICONS_PATH: Ir,
  ICONS_SKILLS_PATH: me,
  LOG_HEAD: Me,
  SPECIALIZATION_BONUS: wf,
  TARGET_SUCCESS: kf,
  TARGET_SUCCESS_EDGE: vf,
  BASE_MONITOR: Tu,
  ACTOR_ATTRIBUTES: Pi,
  ITEM_ATTRIBUTES: $s,
  EDGE_POOL_GROUPS: Fo,
  TEMPLATE: A,
  ANARCHY_SYSTEM: gt
};
const ai = class ai {
  static ascending(e = (t) => t) {
    return (t, i) => ai.sortingBy(e(t), e(i));
  }
  static descending(e = (t) => t) {
    return (t, i) => ai.sortingBy(e(i), e(t));
  }
  static sortingBy(e, t) {
    return e > t ? 1 : e < t ? -1 : 0;
  }
  static bySortedArray(e) {
    return (t) => e.indexOf(t);
  }
  static ascendingBySortedArray(e) {
    return ai.ascending(ai.bySortedArray(e));
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
    return e.map(t).filter((i) => i != null).reduce(ai.sum(), 0);
  }
  static divint(e, t) {
    return Math.floor(e / t);
  }
  static divup(e, t) {
    return Math.ceil(e / t);
  }
  static join(e, t = "") {
    return e.reduce(ai.joiner(t));
  }
  static joiner(e = "") {
    return (t, i) => t + e + i;
  }
  static classify(e, t = (i) => i.type) {
    let i = {};
    return ai.classifyInto(i, e, t), i;
  }
  static classifyFirst(e, t) {
    let i = {};
    for (const n of e) {
      const r = t(n);
      i[r] || (i[r] = n);
    }
    return i;
  }
  static classifyInto(e, t, i = (n) => n.type) {
    for (const n of t) {
      const r = i(n);
      let s = e[r];
      s || (s = [], e[r] = s), s.push(n);
    }
  }
  static showControlWhen(e, t) {
    t ? e.show() : e.hide();
  }
  static minmax(e, t, i) {
    return Math.max(t, Math.min(e, i));
  }
};
O(ai, "isString", (e) => typeof e == "string" || e instanceof String);
let ue = ai;
const Cf = {
  keyword: "keywords",
  disposition: "dispositions",
  cue: "cues"
}, I = class I {
  /**
   * Initialize enum caches.
   * Call once during system init/setup after config/constants are available.
   */
  static init() {
    var t, i, n, r, s, o, l, c, u, d, m, f;
    I.hbsAttributes = I.mapObjectToKeyValue(v.attributes).filter((p) => p.value !== "knowledge" && p.value !== "noAttribute"), I.hbsItemTypes = I.mapObjectToKeyValue(v.itemType), I.hbsMonitors = I.mapObjectToKeyValue(v.monitor), I.hbsMonitorLetters = I.mapObjectToKeyValue(v.monitorLetter), I.hbsAssetModuleCategories = I.mapObjectToKeyValue(v.assetModuleCategory), (i = (t = v.item) == null ? void 0 : t.lifeModule) != null && i.type ? I.hbsLifeModuleTypes = I.mapObjectToKeyValue(v.item.lifeModule.type) : (console.warn("MWD | MWD.item.lifeModule.type is missing; life module enums disabled."), I.hbsLifeModuleTypes = []), I.hbsAreas = I.mapObjectToKeyValue(v.area), I.hbsRanges = I.mapObjectToKeyValue(v.range), I.hbsVehicleCategories = I.mapObjectToKeyValue(v.vehicleCategory), I.hbsMwdWeightClasses = I.mapObjectToKeyValue((n = v.mwd) == null ? void 0 : n.weightClass), I.hbsMwdHardpointTypes = I.mapObjectToKeyValue((r = v.mwd) == null ? void 0 : r.hardpointType), I.hbsMwdHardpointSizes = I.mapObjectToKeyValue((s = v.mwd) == null ? void 0 : s.hardpointSize), I.hbsMwdHardpointLocations = I.mapObjectToKeyValue((o = v.mwd) == null ? void 0 : o.hardpointLocation), I.hbsMwdPrimaryModes = I.mapObjectToKeyValue((l = v.mwd) == null ? void 0 : l.primarySlotMode), I.hbsMwdWeaponCategories = I.mapObjectToKeyValue((c = v.mwd) == null ? void 0 : c.weaponCategory), I.hbsMwdWeaponDamageTypes = I.mapObjectToKeyValue((u = v.mwd) == null ? void 0 : u.weaponDamageType), I.hbsPersonalWeaponDamageTypes = I.mapObjectToKeyValue((d = v.mwd) == null ? void 0 : d.personalDamageType), I.hbsPersonalWeaponDamageCategories = I.mapObjectToKeyValue((m = v.mwd) == null ? void 0 : m.personalDamageCategory), I.hbsMwdMeleeLocations = I.mapObjectToKeyValue((f = v.mwd) == null ? void 0 : f.meleeLocation), I.hbsDamageTypes = ue.distinct(
      (I.hbsMwdWeaponDamageTypes ?? []).concat(I.hbsPersonalWeaponDamageTypes ?? []),
      (p) => p.value
    );
    const e = Object.values(_a).flat();
    I.sortedAttributeKeys = ue.distinct(
      e.concat(Object.keys(v.attributes ?? {}))
    ), I.registerHandleBarHelpers(), I.ENUMS = I.getEnums();
  }
  static registerHandleBarHelpers() {
    typeof Handlebars > "u" || Handlebars.registerHelper("sortedAttributes", (e) => {
      if (!e || typeof e != "object") return [];
      const t = Object.keys(e), i = I.sortedAttributeKeys ?? [], n = new Map(i.map((r, s) => [r, s]));
      return t.sort((r, s) => {
        const o = n.has(r) ? n.get(r) : 9999, l = n.has(s) ? n.get(s) : 9999;
        return o !== l ? o - l : String(r).localeCompare(String(s));
      }), t.map((r) => {
        const s = e[r];
        return s && typeof s == "object" ? { key: r, ...s } : { key: r, value: s };
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
    return Cf;
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
    var n, r, s, o, l;
    const t = ((r = (n = game == null ? void 0 : game.system) == null ? void 0 : n.mwd) == null ? void 0 : r.skills) ?? ((o = (s = game == null ? void 0 : game.system) == null ? void 0 : s.anarchy) == null ? void 0 : o.skills);
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
      const r = e[n];
      let s;
      return r && typeof r == "object" ? s = r.label ?? r.name ?? r.value ?? String(n) : r != null ? s = String(r) : s = String(n), {
        [t]: n,
        [i]: s
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
let ve = I;
class Ef {
  static monitor(e) {
    return ve.getFromList(ve.getMonitors(), e) ?? "";
  }
  static letter(e) {
    return ve.getFromList(ve.getMonitorLetters(), e) ?? "";
  }
}
class Pf {
  static toLowerCaseNoAccent(e) {
    return e == null ? void 0 : e.normalize("NFD").toLowerCase().replace(/[\u0300-\u036f]/g, "");
  }
  static toUpperCaseNoAccent(e) {
    return e == null ? void 0 : e.normalize("NFD").toUpperCase().replace(/[\u0300-\u036f]/g, "");
  }
}
const Rf = [
  "fas fa-dice",
  "fas fa-dice-one",
  "fas fa-dice-two",
  "fas fa-dice-three",
  "fas fa-dice-four",
  "fas fa-dice-five",
  "fas fa-dice-six"
];
class Z {
  static fontAwesome(e) {
    return `<i class="${e}"></i>`;
  }
  static iconSystemPath(e, t) {
    return Z.iconPath(`${Au}/${e}`, t);
  }
  static iconPath(e, t) {
    return `<img class="${t}" src="${e}" />`;
  }
  static iconD6(e) {
    if (e < 0 || e > 6)
      throw `Dice ${e} is out of dice range [1..6] or 0 for multidice`;
    return Z.fontAwesome(Rf[e]);
  }
}
globalThis.ANARCHY_ICONS = Z;
const Re = (a, e = {}) => a.replace(/\{(.*?)\}/g, (t, i) => e[i] ?? "");
function Uo(a) {
  return a && typeof a == "object" && !Array.isArray(a) ? Object.values(a).flatMap((e) => Uo(e)) : Array.isArray(a) ? a.map((e) => String(e ?? "").trim()).filter(Boolean) : String(a ?? "").split(",").map((e) => e.trim()).filter(Boolean);
}
function fn(a = []) {
  return Array.from(new Set(a.map((e) => String(e ?? "").trim()).filter(Boolean)));
}
function qn(a, e = "standard") {
  return String(a ?? "").trim() || e;
}
function Nf(a, e = {}) {
  a && (a.movedToKeywords ?? (a.movedToKeywords = []), a.movedToKeywords.push(e));
}
function If(a, e, t = {}) {
  a && (a.errors ?? (a.errors = []), a.errors.push({ message: e, ...t }));
}
const jo = Object.freeze(["templated"]), Df = Object.freeze([
  "burstCapable",
  "fullAutoCapable",
  "salvoCapable"
]), Of = Object.freeze([
  "clustered",
  "mineLayer",
  "smoke",
  "incendiary",
  "emp"
]), Lf = Object.freeze([
  { value: "burstCapable", label: "Burst Capable" },
  { value: "fullAutoCapable", label: "Full Auto Capable" },
  { value: "salvoCapable", label: "Salvo Capable" }
]), _f = Object.freeze([
  { value: "templated", label: "Templated" },
  { value: "clustered", label: "Clustered" },
  { value: "mineLayer", label: "Mine Layer" },
  { value: "smoke", label: "Smoke" },
  { value: "incendiary", label: "Incendiary" },
  { value: "emp", label: "EMP" }
]), wu = Object.freeze([
  { value: "blast", label: "Blast" },
  { value: "cone", label: "Cone" },
  { value: "line", label: "Line" },
  { value: "cloud", label: "Cloud" },
  { value: "minefield", label: "Minefield" }
]), ku = Object.freeze([
  { value: "targeted", label: "Targeted (start on target)" },
  { value: "origin", label: "Origin (start on attacker)" },
  { value: "placed", label: "Placed (start free)" }
]), xf = Object.freeze(["blast", "cone", "line"]);
new Set(jo);
const $f = /* @__PURE__ */ new Set([
  ...jo,
  ...Df
]), Bf = /* @__PURE__ */ new Set([
  ...jo,
  ...Of
]);
function Ho() {
  return {
    movedToKeywords: [],
    errors: []
  };
}
function fr(a) {
  return fn(Uo(a));
}
function vu({
  traits: a = [],
  keywords: e = [],
  recognized: t = /* @__PURE__ */ new Set(),
  report: i = null,
  owner: n = "weapon",
  path: r = ""
} = {}) {
  const s = Uo(a), o = fr(e), l = [], c = [...o];
  for (const u of s) {
    if (t.has(u)) {
      l.push(u);
      continue;
    }
    c.push(u), Nf(i, {
      owner: n,
      from: r || "traits",
      to: r ? r.replace(/traits$/u, "keywords") : "keywords",
      value: u
    });
  }
  return {
    traits: fn(l),
    keywords: fn(c)
  };
}
function Mu({
  traits: a = [],
  keywords: e = [],
  report: t = null,
  path: i = "system.traits"
} = {}) {
  return vu({
    traits: a,
    keywords: e,
    recognized: $f,
    report: t,
    owner: "weapon",
    path: i
  });
}
function Cu({
  traits: a = [],
  keywords: e = [],
  report: t = null,
  path: i = "system.payloads[].traits"
} = {}) {
  return vu({
    traits: a,
    keywords: e,
    recognized: Bf,
    report: t,
    owner: "payload",
    path: i
  });
}
function Eu(a = {}, e = "standard") {
  const t = a ?? {}, i = qn(
    t.resolverKey ?? t.damageModel ?? t.resolver,
    e
  ), n = String(t.damageModel ?? "").trim(), r = t.onHitEffect;
  return {
    resolverKey: i,
    damageModel: n,
    onHitEffect: r === null ? null : String(r ?? "").trim() || null
  };
}
function ls(a = {}) {
  const e = a ?? {}, t = !!e.enabled, i = e.shots, n = e.accuracyMod, r = e.addHeat, s = e.consumption;
  return {
    enabled: t,
    ...i !== void 0 ? { shots: Math.max(0, Number(i ?? 0) || 0) } : {},
    ...n !== void 0 ? { accuracyMod: Number(n ?? 0) || 0 } : {},
    ...r !== void 0 ? { addHeat: Number(r ?? 0) || 0 } : {},
    ...s !== void 0 ? { consumption: Math.max(0, Number(s ?? 0) || 0) } : {}
  };
}
function zf(a = {}) {
  const e = a ?? {};
  return {
    single: ls(e.single),
    burst: ls(e.burst),
    fullAuto: ls(e.fullAuto)
  };
}
function Ff(a) {
  const e = String(a ?? "").trim().toLowerCase();
  return e === "circle" ? "blast" : e === "ray" ? "line" : wu.some((t) => t.value === e) ? e : "";
}
function Uf(a) {
  const e = String(a ?? "").trim().toLowerCase();
  return ["target", "targeted"].includes(e) ? "targeted" : ku.some((t) => t.value === e) ? e : "";
}
function jf(a = null) {
  const e = a ?? {}, t = Ff(e.shape ?? e.t ?? e.type), i = e.size ?? e.distance ?? e.radius ?? e.length, n = Uf(e.placement ?? e.origin ?? e.mode);
  return !t && i === void 0 && !n ? null : {
    shape: t,
    size: Math.max(0, Number(i ?? 0) || 0),
    placement: n || "targeted"
  };
}
function Hf({
  weapon: a = {},
  payload: e = {},
  effectiveTraits: t = [],
  effectiveResolution: i = null,
  report: n = null
} = {}) {
  var g, y;
  const r = fn((a == null ? void 0 : a.traits) ?? []), s = fn((e == null ? void 0 : e.traits) ?? []), o = t.includes("templated"), l = r.includes("templated"), c = s.includes("templated"), u = (e == null ? void 0 : e.template) ?? null, d = (a == null ? void 0 : a.template) ?? null, m = qn((g = e == null ? void 0 : e.resolution) == null ? void 0 : g.resolverKey, ""), f = qn((y = a == null ? void 0 : a.resolution) == null ? void 0 : y.resolverKey, ""), p = qn(i == null ? void 0 : i.resolverKey, "standard"), h = [];
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
    If(n, b, { capability: "templated" });
  return {
    errors: h,
    liveCapabilities: ["templated"],
    template: u,
    resolverKey: p,
    isTemplated: !0
  };
}
const pn = Object.freeze(["none", "minor", "major", "full"]), Kf = Object.freeze(["blast", "cone", "line", "rect"]), Wf = Object.freeze({
  blast: "circle",
  cone: "cone",
  line: "ray",
  rect: "rect"
}), Gf = Object.freeze({
  circle: "blast",
  cone: "cone",
  ray: "line",
  rect: "rect",
  rectangle: "rect"
}), le = Object.freeze({
  none: "none",
  minor: "minor",
  major: "major",
  full: "full"
}), qf = Object.freeze({
  none: 0,
  minor: 0.25,
  major: 0.5,
  full: 1
}), It = Object.freeze({
  discrete: "discrete",
  persistent: "persistent"
});
function L(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function Vf(a, e = !1) {
  if (typeof a == "boolean") return a;
  const t = String(a ?? "").trim().toLowerCase();
  return ["true", "1", "yes", "y", "on"].includes(t) ? !0 : ["false", "0", "no", "n", "off"].includes(t) ? !1 : e;
}
function Pu(a) {
  return foundry.utils.deepClone(a);
}
function je(a, e = le.none) {
  const t = String(a ?? "").trim().toLowerCase();
  return pn.includes(t) ? t : e;
}
function Bs(a) {
  return Number(qf[je(a)] ?? 0) || 0;
}
function Li(a) {
  return pn.indexOf(je(a));
}
function zs(a, e = 1) {
  const t = Math.max(0, Li(a)), i = Math.max(0, t - Math.max(0, Math.trunc(L(e, 1))));
  return pn[i] ?? le.none;
}
function Yf(a, e = 1) {
  const t = Math.max(0, Li(a)), i = Math.min(pn.length - 1, t + Math.max(0, Math.trunc(L(e, 1))));
  return pn[i] ?? le.full;
}
function Ft(a) {
  return je(a).toUpperCase();
}
function Ko(a = {}) {
  var n, r, s, o, l;
  const e = a ?? {}, t = Math.max(1, Math.trunc(L(
    ((n = e == null ? void 0 : e.escalation) == null ? void 0 : n.intervalTurns) ?? ((r = e == null ? void 0 : e.escalation) == null ? void 0 : r.interval) ?? 1,
    1
  ))), i = Math.max(0, Math.trunc(L(((s = e == null ? void 0 : e.escalation) == null ? void 0 : s.rate) ?? 1, 1)));
  return {
    startExposure: je(e.startExposure, le.minor),
    escalation: {
      rate: i,
      intervalTurns: t,
      max: je((o = e == null ? void 0 : e.escalation) == null ? void 0 : o.max, le.full)
    },
    onFull: {
      burnDelta: Math.max(0, Math.trunc(L(((l = e == null ? void 0 : e.onFull) == null ? void 0 : l.burnDelta) ?? 0, 0)))
    },
    clearOnExit: Vf(e.clearOnExit, !0)
  };
}
function Ti(a = {}) {
  const e = a ?? {}, t = String(e.kind ?? It.discrete).trim().toLowerCase() === It.persistent ? It.persistent : It.discrete;
  return {
    kind: t,
    hazard: t === It.persistent ? Ko(e.hazard ?? e) : null
  };
}
function Ru(a = {}) {
  return Ti(a).kind === It.persistent;
}
function aa(a, e) {
  return Math.max(0, Math.ceil(L(a, 0) * Bs(e)));
}
function Dr(a, e = "") {
  const t = String(a ?? "").trim().toLowerCase();
  return Kf.includes(t) ? t : e;
}
function Nu(a, e = "circle") {
  return Wf[Dr(a)] ?? e;
}
function Qf(a, e = "") {
  const t = String(a ?? "").trim().toLowerCase();
  return Gf[t] ?? e;
}
function Wo(a) {
  let e = L(a, 0);
  for (; e < 0; ) e += 360;
  for (; e >= 360; ) e -= 360;
  return e;
}
function wi() {
  var a, e, t;
  return L(((e = (a = canvas == null ? void 0 : canvas.scene) == null ? void 0 : a.grid) == null ? void 0 : e.distance) ?? ((t = canvas == null ? void 0 : canvas.dimensions) == null ? void 0 : t.distance), 1) || 1;
}
function pr() {
  var a, e;
  return L(((a = canvas == null ? void 0 : canvas.grid) == null ? void 0 : a.size) ?? ((e = canvas == null ? void 0 : canvas.dimensions) == null ? void 0 : e.size), 100) || 100;
}
function wt(a = 0) {
  return L(a, 0) * (pr() / wi());
}
function Va(a = 0) {
  return L(a, 0) * (wi() / pr());
}
function Fs(a = {}, e = {}) {
  return Math.hypot(L(a.x, 0) - L(e.x, 0), L(a.y, 0) - L(e.y, 0));
}
function Pn(a) {
  return L(a, 0) * Math.PI / 180;
}
function Jf({ geometry: a = {}, tokenCenter: e = {} } = {}) {
  const t = L(e.x, 0) - L(a.x, 0), i = L(e.y, 0) - L(a.y, 0), n = Pn(a.direction ?? 0), r = Math.cos(n), s = Math.sin(n);
  return Math.max(0, t * r + i * s);
}
function cs(a = 0, e = 0) {
  if (!(e > 0)) return le.none;
  const t = Math.max(0, Math.min(1, a / e));
  return t <= 1 / 3 ? le.full : t <= 2 / 3 ? le.major : t <= 1 ? le.minor : le.none;
}
function Ll({ template: a = {}, placement: e = {} } = {}) {
  var l, c;
  const t = Dr((e == null ? void 0 : e.shape) ?? (a == null ? void 0 : a.shape), "");
  if (!t) return null;
  const i = L(
    (e == null ? void 0 : e.distance) ?? (a == null ? void 0 : a.distance) ?? (a == null ? void 0 : a.size),
    0
  );
  if (!(i > 0)) return null;
  const n = t === "cone" ? L((e == null ? void 0 : e.angle) ?? 90, 90) : null, r = t === "line" ? L((e == null ? void 0 : e.width) ?? wi(), wi()) : null, s = t === "rect" ? L((e == null ? void 0 : e.width) ?? (a == null ? void 0 : a.width) ?? (e == null ? void 0 : e.distance) ?? (a == null ? void 0 : a.distance) ?? (a == null ? void 0 : a.size), 0) : null, o = t === "rect" ? L((e == null ? void 0 : e.height) ?? (a == null ? void 0 : a.height) ?? (e == null ? void 0 : e.distance) ?? (a == null ? void 0 : a.distance) ?? (a == null ? void 0 : a.size), 0) : null;
  return t === "rect" && (!(s > 0) || !(o > 0)) ? null : {
    shape: t,
    measuredTemplateType: Nu(t),
    x: L((l = e == null ? void 0 : e.anchor) == null ? void 0 : l.x, 0),
    y: L((c = e == null ? void 0 : e.anchor) == null ? void 0 : c.y, 0),
    direction: Wo((e == null ? void 0 : e.direction) ?? 0),
    distance: t === "rect" ? Math.max(s, o) : i,
    angle: n,
    width: r,
    height: t === "rect" ? o : null,
    anchorX: t === "rect" ? L((e == null ? void 0 : e.anchorX) ?? (a == null ? void 0 : a.anchorX) ?? 0, 0) : null,
    anchorY: t === "rect" ? L((e == null ? void 0 : e.anchorY) ?? (a == null ? void 0 : a.anchorY) ?? 0, 0) : null,
    placementMode: String((a == null ? void 0 : a.placement) ?? (e == null ? void 0 : e.placementMode) ?? "").trim() || null
  };
}
function He(a = null, { template: e = null, placement: t = null } = {}) {
  var u, d, m, f;
  const i = a && typeof a == "object" ? a : {};
  if ((!i || !Object.keys(i).length) && (e || t))
    return Ll({ template: e, placement: t });
  const n = String(
    i.measuredTemplateType ?? i.t ?? i.type ?? ""
  ).trim().toLowerCase(), r = Dr(
    i.shape ?? Qf(n) ?? "",
    ""
  );
  if (!r)
    return e || t ? Ll({ template: e, placement: t }) : null;
  const s = r === "rect" ? L(i.width ?? (t == null ? void 0 : t.width) ?? (e == null ? void 0 : e.width) ?? i.distance ?? i.size, 0) : 0, o = r === "rect" ? L(i.height ?? (t == null ? void 0 : t.height) ?? (e == null ? void 0 : e.height) ?? i.distance ?? i.size, 0) : 0, l = L(
    i.distance ?? i.size ?? i.templateDistance ?? (t == null ? void 0 : t.distance) ?? (e == null ? void 0 : e.distance) ?? (e == null ? void 0 : e.size),
    0
  );
  if (r === "rect") {
    if (!(s > 0) || !(o > 0)) return null;
  } else if (!(l > 0)) return null;
  return {
    shape: r,
    measuredTemplateType: n || Nu(r),
    x: L(i.x ?? ((u = i.anchor) == null ? void 0 : u.x) ?? ((d = t == null ? void 0 : t.anchor) == null ? void 0 : d.x), 0),
    y: L(i.y ?? ((m = i.anchor) == null ? void 0 : m.y) ?? ((f = t == null ? void 0 : t.anchor) == null ? void 0 : f.y), 0),
    direction: Wo(i.direction ?? i.rotation ?? (t == null ? void 0 : t.direction) ?? 0),
    distance: r === "rect" ? Math.max(s, o) : l,
    angle: r === "cone" ? L(i.angle ?? (t == null ? void 0 : t.angle) ?? 90, 90) : null,
    width: r === "line" ? L(i.width ?? (t == null ? void 0 : t.width) ?? wi(), wi()) : r === "rect" ? s : null,
    height: r === "rect" ? o : null,
    anchorX: r === "rect" ? L(i.anchorX ?? (t == null ? void 0 : t.anchorX) ?? (e == null ? void 0 : e.anchorX) ?? 0, 0) : null,
    anchorY: r === "rect" ? L(i.anchorY ?? (t == null ? void 0 : t.anchorY) ?? (e == null ? void 0 : e.anchorY) ?? 0, 0) : null,
    placementMode: String(i.placementMode ?? (e == null ? void 0 : e.placement) ?? "").trim() || null
  };
}
function Xf(a = null) {
  return a ? typeof (a == null ? void 0 : a.toObject) == "function" ? a.toObject() : typeof (a == null ? void 0 : a.toJSON) == "function" ? a.toJSON() : a && typeof a == "object" ? Pu(a) : null : null;
}
function Zf(a = []) {
  const e = [];
  for (const t of a) {
    const i = Number(t);
    i > 0 && (e.some((n) => Math.abs(n - i) < 1e-3) || e.push(i));
  }
  return e;
}
function ep(a = null, { placementMode: e = "region", shapeHint: t = "" } = {}) {
  const i = Xf(a);
  if (!i || typeof i != "object") return null;
  const n = String(i.type ?? "").trim().toLowerCase(), r = Dr(t, "");
  if (n === "circle")
    return He({
      shape: r || "blast",
      measuredTemplateType: "circle",
      x: i.x,
      y: i.y,
      distance: Va(i.radius),
      placementMode: e
    });
  if (n === "ellipse") {
    const s = L(i.radiusX, 0), o = L(i.radiusY, 0);
    return !(s > 0) || Math.abs(s - o) > 1e-3 ? null : He({
      shape: r || "blast",
      measuredTemplateType: "circle",
      x: L(i.x, 0) + s,
      y: L(i.y, 0) + o,
      distance: Va(s),
      placementMode: e
    });
  }
  if (n === "cone")
    return He({
      shape: r || "cone",
      measuredTemplateType: "cone",
      x: i.x,
      y: i.y,
      direction: i.rotation ?? i.direction,
      distance: Va(i.radius),
      angle: i.angle,
      placementMode: e
    });
  if (n === "line") {
    const s = Array.from((a == null ? void 0 : a.measuredSegments) ?? []), o = Zf(s.map((f) => f == null ? void 0 : f.distance)), l = Math.max(
      L(i.distance, 0),
      L(i.length, 0),
      L(i.radius, 0),
      ...o,
      0
    ), c = o.filter((f) => Math.abs(f - l) >= 1e-3), u = Math.max(
      0,
      L(i.width, 0),
      L(i.thickness, 0),
      c.length ? Math.min(...c) : 0
    ) || wi(), d = (a == null ? void 0 : a.origin) ?? i.origin ?? {}, m = s.reduce((f, p) => {
      const h = Number((p == null ? void 0 : p.distance) ?? 0), g = Number((f == null ? void 0 : f.distance) ?? 0);
      return h > g ? p : f;
    }, null);
    return He({
      shape: r || "line",
      measuredTemplateType: "ray",
      x: d.x ?? i.x,
      y: d.y ?? i.y,
      direction: (m == null ? void 0 : m.angle) ?? i.rotation ?? i.direction,
      distance: l,
      width: u,
      placementMode: e
    });
  }
  return n === "rectangle" || n === "rect" ? He({
    shape: r || "rect",
    measuredTemplateType: "rect",
    x: i.x,
    y: i.y,
    direction: i.rotation ?? i.direction,
    width: Va(i.width),
    height: Va(i.height),
    anchorX: i.anchorX,
    anchorY: i.anchorY,
    placementMode: e
  }) : null;
}
function Iu(a = null, { placementMode: e = "region", shapeHint: t = "" } = {}) {
  const i = (a == null ? void 0 : a.document) ?? a ?? null, n = Array.from((i == null ? void 0 : i.shapes) ?? []);
  return n.length !== 1 ? null : ep(n[0], { placementMode: e, shapeHint: t });
}
function tp(a = null, e = null) {
  const t = He(a);
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
function Du(a) {
  var o, l, c, u, d, m, f, p, h;
  const e = (a == null ? void 0 : a.center) ?? ((o = a == null ? void 0 : a.object) == null ? void 0 : o.center) ?? null;
  if (e)
    return {
      x: L(e.x, 0),
      y: L(e.y, 0)
    };
  const t = L((a == null ? void 0 : a.x) ?? ((l = a == null ? void 0 : a.document) == null ? void 0 : l.x), 0), i = L((a == null ? void 0 : a.y) ?? ((c = a == null ? void 0 : a.document) == null ? void 0 : c.y), 0), n = L((a == null ? void 0 : a.w) ?? ((u = a == null ? void 0 : a.object) == null ? void 0 : u.w) ?? ((d = a == null ? void 0 : a.document) == null ? void 0 : d.width), 1), r = L((a == null ? void 0 : a.h) ?? ((m = a == null ? void 0 : a.object) == null ? void 0 : m.h) ?? ((f = a == null ? void 0 : a.document) == null ? void 0 : f.height), 1), s = L(((p = canvas == null ? void 0 : canvas.grid) == null ? void 0 : p.size) ?? ((h = canvas == null ? void 0 : canvas.dimensions) == null ? void 0 : h.size), 100);
  return {
    x: t + n * s / 2,
    y: i + r * s / 2
  };
}
function ip(a) {
  var i, n, r, s;
  const e = L((a == null ? void 0 : a.w) ?? ((i = a == null ? void 0 : a.object) == null ? void 0 : i.w) ?? ((n = a == null ? void 0 : a.document) == null ? void 0 : n.width), 1) * pr(), t = L((a == null ? void 0 : a.h) ?? ((r = a == null ? void 0 : a.object) == null ? void 0 : r.h) ?? ((s = a == null ? void 0 : a.document) == null ? void 0 : s.height), 1) * pr();
  return Math.max(e, t) / 2;
}
function ap({ geometry: a, tokenCenter: e, tokenRadius: t }) {
  const i = wt(a.distance);
  return Fs({ x: a.x, y: a.y }, e) <= i + t;
}
function np({ geometry: a, tokenCenter: e, tokenRadius: t }) {
  const i = wt(a.distance), n = wt(a.width ?? wi()), r = Pn(a.direction), s = e.x - a.x, o = e.y - a.y, l = Math.cos(r), c = Math.sin(r), u = s * l + o * c;
  if (u < -t || u > i + t) return !1;
  const d = Math.max(0, Math.min(i, u)), m = a.x + d * l, f = a.y + d * c;
  return Math.hypot(e.x - m, e.y - f) <= t + n / 2;
}
function rp({ geometry: a, tokenCenter: e, tokenRadius: t }) {
  const i = wt(a.distance), n = e.x - a.x, r = e.y - a.y, s = Math.hypot(n, r);
  if (s > i + t) return !1;
  if (s === 0) return !0;
  let l = Math.atan2(r, n) * 180 / Math.PI - a.direction;
  for (; l <= -180; ) l += 360;
  for (; l > 180; ) l -= 360;
  const c = L(a.angle, 90) / 2, u = Math.asin(Math.min(1, t / Math.max(s, 1))) * 180 / Math.PI;
  return Math.abs(l) <= c + u;
}
function sp({ geometry: a, tokenCenter: e, tokenRadius: t }) {
  const i = wt(L(a.width, 0)), n = wt(L(a.height, 0));
  if (!(i > 0) || !(n > 0)) return !1;
  const r = L(a.anchorX, 0), s = L(a.anchorY, 0), o = L(a.x, 0), l = L(a.y, 0), c = o + i * (0.5 - r), u = l + n * (0.5 - s), d = -Pn(a.direction ?? 0), m = Math.cos(d), f = Math.sin(d), p = e.x - c, h = e.y - u, g = p * m - h * f, y = p * f + h * m;
  return Math.abs(g) <= i / 2 + t && Math.abs(y) <= n / 2 + t;
}
function Or(a = null, e = null) {
  const t = He(a);
  if (!t || !e) return !1;
  const i = Du(e), n = ip(e);
  return t.shape === "blast" ? ap({ geometry: t, tokenCenter: i, tokenRadius: n }) : t.shape === "line" ? np({ geometry: t, tokenCenter: i, tokenRadius: n }) : t.shape === "cone" ? rp({ geometry: t, tokenCenter: i, tokenRadius: n }) : t.shape === "rect" ? sp({ geometry: t, tokenCenter: i, tokenRadius: n }) : !1;
}
function Ou({ template: a = {}, placement: e = {}, geometry: t = null, token: i = null } = {}) {
  if (!i) return le.none;
  const n = He(t, { template: a, placement: e });
  if (!n || !Or(n, i))
    return le.none;
  const r = Du(i), s = wt(n.distance);
  if (!(s > 0)) return le.none;
  if (n.shape === "line" || n.shape === "cone") {
    const l = Jf({ geometry: n, tokenCenter: r });
    return cs(l, s);
  }
  if (n.shape === "rect") {
    const l = {
      x: L(n.x, 0) + wt(L(n.width, 0)) * (0.5 - L(n.anchorX, 0)),
      y: L(n.y, 0) + wt(L(n.height, 0)) * (0.5 - L(n.anchorY, 0))
    }, c = Fs(l, r);
    return cs(c, s);
  }
  const o = Fs({ x: n.x, y: n.y }, r);
  return cs(o, s);
}
function zi({ tier: a = le.none, appliedTier: e = null, evadeUsed: t = !1, evadeLocked: i = !1 } = {}) {
  const n = je(a, le.none), r = je(e ?? n, n);
  return {
    initialTier: n,
    initialLabel: Ft(n),
    initialMultiplier: Bs(n),
    finalTier: r,
    finalLabel: Ft(r),
    finalMultiplier: Bs(r),
    evadeUsed: !!t,
    evadeLocked: !!i
  };
}
function Go(a = {}, { locked: e = !1, active: t = !1 } = {}) {
  const i = je((a == null ? void 0 : a.initialTier) ?? (a == null ? void 0 : a.tier), le.none);
  if (!t || e || i === le.none)
    return zi({
      tier: i,
      appliedTier: i,
      evadeUsed: !1,
      evadeLocked: !!e
    });
  const n = zs(i, 1);
  return zi({
    tier: i,
    appliedTier: n,
    evadeUsed: i !== n,
    evadeLocked: !!e
  });
}
function Lu(a = []) {
  return a.map((e) => ({
    x: Math.round(L(e.x, 0)),
    y: Math.round(L(e.y, 0))
  }));
}
function op(a = {}) {
  const e = wt(L(a.distance, 0)), t = wt(L(a.width, wi())) / 2, i = Pn(a.direction ?? 0), n = Math.cos(i), r = Math.sin(i), s = -r, o = n, l = {
    x: L(a.x, 0) + e * n,
    y: L(a.y, 0) + e * r
  };
  return {
    type: "polygon",
    points: Lu([
      { x: a.x + s * t, y: a.y + o * t },
      { x: l.x + s * t, y: l.y + o * t },
      { x: l.x - s * t, y: l.y - o * t },
      { x: a.x - s * t, y: a.y - o * t }
    ])
  };
}
function lp(a = {}) {
  const e = L(a.angle, 90), t = wt(L(a.distance, 0)), i = L(a.direction, 0), n = e / 2, r = [{ x: a.x, y: a.y }];
  for (let s = 0; s <= 8; s += 1) {
    const o = -n + e / 8 * s, l = Pn(i + o);
    r.push({
      x: L(a.x, 0) + Math.cos(l) * t,
      y: L(a.y, 0) + Math.sin(l) * t
    });
  }
  return {
    type: "polygon",
    points: Lu(r)
  };
}
function cp(a = {}) {
  return {
    type: "rectangle",
    x: Math.round(L(a.x, 0)),
    y: Math.round(L(a.y, 0)),
    width: Math.round(wt(L(a.width, 0))),
    height: Math.round(wt(L(a.height, 0))),
    rotation: Wo(a.direction ?? 0),
    anchorX: L(a.anchorX, 0),
    anchorY: L(a.anchorY, 0)
  };
}
function Lr(a = null) {
  const e = He(a);
  if (!e) return [];
  if (e.shape === "blast") {
    const t = wt(L(e.distance, 0));
    return [{
      type: "ellipse",
      x: Math.round(L(e.x, 0) - t),
      y: Math.round(L(e.y, 0) - t),
      radiusX: Math.round(t),
      radiusY: Math.round(t),
      rotation: 0
    }];
  }
  return e.shape === "line" ? [op(e)] : e.shape === "cone" ? [lp(e)] : e.shape === "rect" ? [cp(e)] : [];
}
function oi(a = null) {
  const e = He(a);
  return e ? Pu(e) : null;
}
const _u = Object.freeze({
  penetrating: "Penetrating",
  concussive: "Concussive",
  energy: "Energy",
  thermal: "Thermal",
  electrical: "Electrical"
}), hr = Object.freeze(
  Object.entries(_u).map(([a, e]) => ({ value: a, label: e }))
), up = Object.freeze({
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
}), dp = Object.freeze(
  hr.map((a) => a.value)
), Us = Object.freeze({}), _r = Object.freeze({
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
}), mp = Object.freeze(
  Object.values(_r).map((a) => ({
    value: a.key,
    label: a.label,
    rated: a.rated
  }))
), xu = Fu(Us), $u = Fu(_r);
function xr(a) {
  return a && typeof a == "object" && !Array.isArray(a) ? Object.values(a).flatMap((e) => xr(e)) : Array.isArray(a) ? a.map((e) => String(e ?? "").trim()).filter(Boolean) : String(a ?? "").split(",").map((e) => e.trim()).filter(Boolean);
}
function Yt(a, e = "penetrating") {
  const t = String(a ?? "").trim().toLowerCase();
  return up[t] ?? e;
}
function Bu(a) {
  const e = String(a ?? "").trim();
  return e ? Yt(e, "") : "";
}
function zu(a) {
  const e = String(a ?? "").trim().toLowerCase();
  return dp.includes(e);
}
function Qt(a) {
  const e = Yt(a, "");
  return _u[e] ?? String(a ?? "").trim();
}
function li(a) {
  const e = a ?? {}, t = Number(e.ballistic ?? 0) || 0, i = Number(e.melee ?? 0) || 0;
  return {
    penetrating: e.penetrating !== void 0 ? Number(e.penetrating ?? 0) || 0 : Math.max(t, i),
    concussive: e.concussive !== void 0 ? Number(e.concussive ?? 0) || 0 : Number(e.explosive ?? 0) || 0,
    energy: Number(e.energy ?? 0) || 0,
    thermal: Number(e.thermal ?? 0) || 0,
    electrical: Number(e.electrical ?? 0) || 0
  };
}
function Vn(a) {
  return xr(a);
}
function Ua(a) {
  return xr(a);
}
function fp(a) {
  return fr(a);
}
function Yn(a = {}, e = "standard") {
  return Eu(a, e);
}
function Qn(a = {}) {
  return zf(a);
}
function pp(a = null) {
  return jf(a);
}
function xa(a = "id") {
  var t, i;
  const e = (i = (t = globalThis.foundry) == null ? void 0 : t.utils) == null ? void 0 : i.randomID;
  return typeof e == "function" ? e() : `${a}-${Math.random().toString(36).slice(2, 10)}`;
}
function Fu(a) {
  const e = {};
  return Object.values(a).forEach((t) => {
    [t.key, ...t.aliases ?? []].forEach((i) => {
      e[hn(i)] = t.key;
    });
  }), Object.freeze(e);
}
function hn(a) {
  return String(a ?? "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "");
}
function ja(a) {
  return Array.isArray(a) ? a : a && typeof a == "object" ? Object.values(a) : a == null || a === "" ? [] : [a];
}
function Uu(a, e) {
  return ja(a).map((t) => hp(t, e)).filter(Boolean);
}
function hp(a, e) {
  if (typeof a == "string" || typeof a == "number") {
    const i = e[hn(a)];
    return i ? { id: xa("trait"), key: i, rating: 1 } : null;
  }
  if (!a || typeof a != "object") return null;
  const t = e[hn(a.key ?? a.value ?? a.name)];
  return t ? {
    id: String(a.id ?? "").trim() || xa("trait"),
    key: t,
    rating: Math.max(0, Number(a.rating ?? 0) || 0)
  } : null;
}
function Wi(a) {
  return Uu(a, xu);
}
function hi(a) {
  return Uu(a, $u);
}
function gr(a) {
  return {
    close: Number((a == null ? void 0 : a.close) ?? (a == null ? void 0 : a.short) ?? 0) || 0,
    near: Number((a == null ? void 0 : a.near) ?? (a == null ? void 0 : a.medium) ?? 0) || 0,
    far: Number((a == null ? void 0 : a.far) ?? (a == null ? void 0 : a.long) ?? 0) || 0,
    extreme: Number((a == null ? void 0 : a.extreme) ?? 0) || 0
  };
}
function gp(a = {}, e = {}) {
  const t = gr(a), i = gr(e);
  return {
    close: t.close + i.close,
    near: t.near + i.near,
    far: t.far + i.far,
    extreme: t.extreme + i.extreme
  };
}
function yp(a, e) {
  var t;
  return ((t = e[a]) == null ? void 0 : t.label) ?? a;
}
function ju(a, e) {
  var n;
  const t = yp(a == null ? void 0 : a.key, e), i = Math.max(0, Number((a == null ? void 0 : a.rating) ?? 0) || 0);
  return (n = e[a == null ? void 0 : a.key]) != null && n.rated && i > 0 ? `${t} ${i}` : t;
}
function Hu(a, e) {
  return ja(a).map((t) => {
    const i = t == null ? void 0 : t.key, n = e[i];
    return n != null && n.resolve ? {
      entry: t,
      effect: n.resolve(t),
      label: ju(t, e)
    } : null;
  }).filter(Boolean);
}
function bp(a, e) {
  const t = { ...a ?? {} };
  return Object.entries(e ?? {}).forEach(([i, n]) => {
    t[i] = (Number(t[i] ?? 0) || 0) + (Number(n ?? 0) || 0);
  }), t;
}
function Sp(a = []) {
  const e = {}, t = /* @__PURE__ */ new Set();
  for (const i of a.filter(Boolean)) {
    i.accuracyMod !== void 0 && (e.accuracyMod = (Number(e.accuracyMod ?? 0) || 0) + (Number(i.accuracyMod ?? 0) || 0)), i.ap !== void 0 && (e.ap = (Number(e.ap ?? 0) || 0) + (Number(i.ap ?? 0) || 0)), i.addHeat !== void 0 && (e.addHeat = (Number(e.addHeat ?? 0) || 0) + (Number(i.addHeat ?? 0) || 0)), i.bonusVsArmorTag && (e.bonusVsArmorTag = bp(e.bonusVsArmorTag, i.bonusVsArmorTag));
    for (const n of i.flags ?? []) {
      const r = String(n ?? "").trim();
      r && t.add(r);
    }
  }
  return t.size > 0 && (e.flags = Array.from(t)), e;
}
function Ap(a = [], e = []) {
  const t = Array.isArray(a) || typeof a == "string" ? { traits: a, standardTraits: e } : a ?? {}, i = Ua(t.traits), n = Wi(t.standardTraits), r = Hu(n, Us), s = i.map((o) => {
    var u;
    const l = xu[hn(o)];
    if (!l) return null;
    const c = (u = Us[l]) == null ? void 0 : u.resolve;
    return typeof c == "function" ? c({ key: l, rating: 1 }) : null;
  });
  return Sp([
    ...r.map((o) => o.effect),
    ...s
  ]);
}
function Tp(a) {
  const e = a ?? {}, t = Ho(), i = Cu({
    traits: e.traits,
    keywords: e.keywords,
    report: t,
    path: "ammo.types[].traits"
  });
  return {
    id: String(e.id ?? "").trim() || xa("ammo"),
    name: String(e.name ?? "").trim() || "Ammo",
    damageType: Bu(e.damageType),
    apMod: Number(e.apMod ?? e.ap ?? 0) || 0,
    attackRatingBandMod: gr(e.attackRatingBandMod ?? e.attackRatingBand),
    traits: i.traits,
    keywords: i.keywords,
    migration: t
  };
}
function wp(a) {
  var l;
  const e = a ?? {}, t = Math.max(0, Number(e.max ?? 0) || 0), i = Number(e.current), n = Number.isFinite(i) ? Math.max(0, Math.min(i, t > 0 ? t : i)) : Math.max(0, t), r = ja(e.types).map(Tp), s = String(e.activeTypeId ?? "").trim(), o = r.some((c) => c.id === s) ? s : ((l = r[0]) == null ? void 0 : l.id) ?? "";
  return {
    current: n,
    max: t,
    consumePerAttack: Math.max(1, Number(e.consumePerAttack ?? 1) || 1),
    activeTypeId: o,
    types: r
  };
}
function kp(a, e = "untracked") {
  const t = String(a ?? "").trim();
  return t ? t === "linked" ? "internal" : t === "perAttack" ? e : ["untracked", "internal", "actorResource", "itemRef"].includes(t) ? t : e : e;
}
function js(a = {}) {
  const e = a ?? {};
  return {
    amount: Math.max(1, Number(e.amount ?? e.consumePerUse ?? e.consumePerAttack ?? 1) || 1),
    sourceId: String(e.sourceId ?? "").trim()
  };
}
function _l(a = {}) {
  const e = a ?? {};
  return {
    damageType: Bu(e.damageType),
    ap: Number(e.ap ?? e.apMod ?? 0) || 0,
    attackRatingBand: gr(e.attackRatingBand ?? e.attackRatingBandMod)
  };
}
function Hs(a = {}) {
  return Eu(a, "standard");
}
function vp(a) {
  return String(a ?? "").trim().toLowerCase() === "unloaded";
}
function Pt(a, { report: e = null, path: t = "system.payloads[]" } = {}) {
  var l;
  const i = a ?? {}, n = String(i.id ?? "").trim() || xa("payload"), r = Cu({
    traits: i.traits ?? ((l = i.modifies) == null ? void 0 : l.traits),
    keywords: i.keywords,
    report: e,
    path: `${t}.traits`
  }), s = xr(i.compatibleWith ?? i.compatible), o = pp(i.template);
  return vp(n) ? {
    id: "unloaded",
    label: "Unloaded",
    compatibleWith: [],
    modifies: _l({}),
    traits: [],
    keywords: [],
    template: null,
    areaEffect: Ti({ kind: "discrete" }),
    resolution: Hs({ resolverKey: "standard" }),
    consumption: js({ amount: 1, sourceId: "" })
  } : {
    id: n,
    label: String(i.label ?? i.name ?? "").trim() || "Payload",
    compatibleWith: s,
    modifies: _l(i.modifies ?? i),
    traits: r.traits,
    keywords: r.keywords,
    template: o,
    areaEffect: Ti(i.areaEffect ?? {}),
    resolution: Hs(i.resolution ?? i),
    consumption: js(i.consumption ?? i)
  };
}
function ni(a) {
  var o, l, c, u, d, m;
  const e = a ?? {}, t = kp(
    e.kind || e.type || ((o = e.link) != null && o.actorPath || e.actorPath ? "actorResource" : "") || ((l = e.link) != null && l.itemId || e.itemId || (c = e.link) != null && c.itemPath || e.itemPath ? "itemRef" : "") || (e.tracking || e.current !== void 0 || e.max !== void 0 ? "internal" : "") || "untracked",
    "untracked"
  ), i = e.tracking ?? e, n = Math.max(0, Number(i.max ?? 0) || 0), r = Number(i.current), s = Number.isFinite(r) ? Math.max(0, Math.min(r, n > 0 ? n : r)) : Math.max(0, n);
  return {
    id: String(e.id ?? "").trim() || xa("source"),
    label: String(e.label ?? e.name ?? "").trim() || "Source",
    kind: t,
    tracking: {
      current: s,
      max: n
    },
    link: {
      actorPath: String(((u = e.link) == null ? void 0 : u.actorPath) ?? e.actorPath ?? "").trim(),
      itemId: String(((d = e.link) == null ? void 0 : d.itemId) ?? e.itemId ?? "").trim(),
      itemPath: String(((m = e.link) == null ? void 0 : m.itemPath) ?? e.itemPath ?? "").trim()
    }
  };
}
function Ku({ report: a = null, path: e = "system.payloads" } = {}) {
  return {
    payloads: [Pt({
      id: "unloaded",
      label: "Unloaded",
      resolution: { resolverKey: "standard" },
      consumption: { amount: 1, sourceId: "" }
    }, { report: a, path: `${e}[0]` })],
    selectedPayloadId: "unloaded",
    consumptionSources: [ni({
      id: "untracked",
      label: "Untracked",
      kind: "untracked"
    })]
  };
}
function Wu(a) {
  return String(a ?? "").trim().toLowerCase() === "melee";
}
function Ks(a = [], { report: e = null, path: t = "system.payloads" } = {}) {
  const i = ja(a).map((n, r) => Pt(n, { report: e, path: `${t}[${r}]` })).filter(Boolean);
  return i.some((n) => n.id === "unloaded") ? i : [
    Pt({
      id: "unloaded",
      label: "Unloaded",
      resolution: { resolverKey: "standard" },
      consumption: { amount: 1, sourceId: "" }
    }, { report: e, path: `${t}[0]` }),
    ...i
  ];
}
function $r(a = {}, { report: e = null, path: t = "system.payloads" } = {}) {
  var d;
  const i = wp(a), n = Math.max(1, Number(i.consumePerAttack ?? 1) || 1), r = i.max > 0, s = r ? "internal-magazine" : "untracked", o = [ni(r ? {
    id: s,
    label: "Internal Source",
    kind: "internal",
    tracking: {
      current: i.current,
      max: i.max
    }
  } : {
    id: s,
    label: "Untracked",
    kind: "untracked",
    tracking: {}
  })], l = i.types.length ? i.types.map((m, f) => Pt({
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
      sourceId: r ? s : ""
    }
  }, { report: e, path: `${t}[${f}]` })) : [Pt({
    id: "unloaded",
    label: "Unloaded",
    resolution: { resolverKey: "standard" },
    consumption: {
      amount: n,
      sourceId: r ? s : ""
    }
  }, { report: e, path: `${t}[0]` })], c = Ks(l, { report: e, path: t }), u = c.some((m) => m.id === i.activeTypeId) ? i.activeTypeId : ((d = c[0]) == null ? void 0 : d.id) ?? "unloaded";
  return {
    payloads: c,
    selectedPayloadId: u,
    consumptionSources: o
  };
}
function gi(a, { legacyAmmo: e = null, category: t = "", report: i = null, path: n = "system.payloads" } = {}) {
  if (Wu(t)) return [];
  const r = ja(a).map((s, o) => Pt(s, { report: i, path: `${n}[${o}]` })).filter(Boolean);
  return r.length > 0 ? Ks(r, { report: i, path: n }) : e ? Ks($r(e, { report: i, path: n }).payloads, { report: i, path: n }) : Ku({ report: i, path: n }).payloads;
}
function Za(a, { legacyAmmo: e = null } = {}) {
  const t = ja(a).map(ni).filter(Boolean);
  return t.length > 0 ? t : e ? $r(e).consumptionSources : Ku().consumptionSources;
}
function Aa(a, e = [], { legacyAmmo: t = null, category: i = "" } = {}) {
  var s;
  if (Wu(i)) return "";
  const n = gi(e, { legacyAmmo: t, category: i }), r = String(a ?? "").trim();
  if (n.some((o) => o.id === r)) return r;
  if (t) {
    const o = $r(t).selectedPayloadId;
    if (n.some((l) => l.id === o)) return o;
  }
  return ((s = n[0]) == null ? void 0 : s.id) ?? "unloaded";
}
function xl({ root: a = null, path: e = "", fallback: t = {} } = {}) {
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
  const r = Math.max(0, Number(n ?? t.current ?? 0) || 0), s = Math.max(r, Math.max(0, Number(t.max ?? 0) || 0));
  return {
    current: s > 0 ? Math.min(r, s) : r,
    max: s,
    currentPath: i
  };
}
function Gu({ source: a = null, actor: e = null } = {}) {
  var i, n, r, s, o, l, c;
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
    itemPath: String(((r = a.link) == null ? void 0 : r.itemPath) ?? "").trim()
  };
  if (a.kind === "internal") {
    const u = Math.max(0, Number(((s = a.tracking) == null ? void 0 : s.current) ?? 0) || 0), d = Math.max(0, Number(((o = a.tracking) == null ? void 0 : o.max) ?? 0) || 0);
    return {
      ...t,
      isTracked: d > 0 || u > 0,
      current: u,
      max: d,
      currentPath: ""
    };
  }
  if (a.kind === "actorResource") {
    const u = xl({
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
    const u = ((c = (l = e == null ? void 0 : e.items) == null ? void 0 : l.get) == null ? void 0 : c.call(l, t.itemId)) ?? null, d = xl({
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
function Mp({ source: a = null, actor: e = null } = {}) {
  return Gu({ source: a, actor: e });
}
function Ws({
  payloads: a = [],
  selectedPayloadId: e = "",
  consumptionSources: t = [],
  actor: i = null,
  payloadId: n = "",
  category: r = ""
} = {}) {
  const s = gi(a, { category: r }), o = Za(t), l = Aa(n || e, s, { category: r }), c = s.find((f) => f.id === l) ?? s[0] ?? null, u = (c == null ? void 0 : c.consumption) ?? js(), d = u.sourceId ? o.find((f) => f.id === u.sourceId) ?? null : o.find((f) => f.kind === "untracked") ?? ni({
    id: "untracked",
    label: "Untracked",
    kind: "untracked"
  }), m = Gu({ source: d, actor: i });
  return {
    payloads: s,
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
function Cp({
  damageType: a = "penetrating",
  ap: e = 0,
  attackRatingBand: t = {},
  traits: i = [],
  keywords: n = [],
  standardTraits: r = [],
  resolution: s = {},
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
  var V, Y, te, he, ce;
  const g = Ws({
    payloads: l != null && l.length ? l : void 0,
    selectedPayloadId: c || p,
    consumptionSources: u,
    actor: m,
    payloadId: d || p,
    category: h
  }), b = ((!l || l.length === 0) && f ? Ws({
    ...$r(f),
    actor: m,
    payloadId: d || p,
    category: h
  }) : null) ?? g, S = b.activePayload, w = Mu({
    traits: i,
    keywords: n
  }), k = Array.from(/* @__PURE__ */ new Set([
    ...w.traits,
    ...Ua(S == null ? void 0 : S.traits)
  ])), P = fr([
    ...w.keywords,
    ...fr(S == null ? void 0 : S.keywords)
  ]), E = Yn(s, "standard"), x = (V = S == null ? void 0 : S.resolution) != null && V.resolverKey ? Hs(S.resolution) : E, K = Qn(o), q = Ho(), j = Hf({
    weapon: {
      traits: w.traits,
      resolution: E
    },
    payload: S,
    effectiveTraits: k,
    effectiveResolution: x,
    report: q
  }), W = Wi(r), _ = Ap({
    traits: [],
    standardTraits: W
  }), F = {
    ...b.sourceState
  };
  return delete F.sourceItem, {
    damageType: ((Y = S == null ? void 0 : S.modifies) == null ? void 0 : Y.damageType) || Yt(a),
    ap: (Number(e ?? 0) || 0) + (Number(((te = S == null ? void 0 : S.modifies) == null ? void 0 : te.ap) ?? 0) || 0),
    attackRatingBand: gp(
      t,
      ((he = S == null ? void 0 : S.modifies) == null ? void 0 : he.attackRatingBand) ?? {}
    ),
    effects: _,
    traits: k,
    keywords: P,
    standardTraits: W,
    payloadLabel: b.payloadLabel,
    payload: S ? foundry.utils.deepClone(S) : null,
    payloadState: {
      payloads: b.payloads.map((X) => foundry.utils.deepClone(X)),
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
    sourceState: foundry.utils.deepClone(F),
    template: j.template ? foundry.utils.deepClone(j.template) : null,
    areaEffect: Ti((S == null ? void 0 : S.areaEffect) ?? {}),
    resolution: foundry.utils.deepClone(x),
    resolverKey: String((x == null ? void 0 : x.resolverKey) ?? "standard").trim() || "standard",
    fireModes: foundry.utils.deepClone(K),
    capabilityReport: {
      ...q,
      liveCapabilities: j.liveCapabilities,
      isTemplated: j.isTemplated,
      template: j.template ? foundry.utils.deepClone(j.template) : null,
      resolverKey: String((x == null ? void 0 : x.resolverKey) ?? "standard").trim() || "standard"
    },
    ammoLabel: b.payloadLabel,
    ammoType: S ? foundry.utils.deepClone(S) : null,
    ammoState: {
      current: F.current,
      max: F.max,
      consumePerAttack: F.consumePerUse,
      activeTypeId: b.activePayloadId,
      types: b.payloads.map((X) => {
        var Ne;
        return {
          id: X.id,
          name: X.label,
          damageType: ((Ne = X.modifies) == null ? void 0 : Ne.damageType) ?? "",
          traits: X.traits ?? [],
          keywords: X.keywords ?? []
        };
      }),
      isTracked: F.isTracked,
      ammoLabel: b.payloadLabel
    }
  };
}
function qu(a = {}, e = {}) {
  const t = li(a), i = li(e);
  return {
    penetrating: t.penetrating + i.penetrating,
    concussive: t.concussive + i.concussive,
    energy: t.energy + i.energy,
    thermal: t.thermal + i.thermal,
    electrical: t.electrical + i.electrical
  };
}
function us({ standardTraits: a = [], traits: e = [], traitState: t = {} } = {}) {
  var m, f;
  const i = hi(a), r = Ua(e).map((p) => {
    const h = $u[hn(p)];
    return h ? { id: xa("trait"), key: h, rating: h === "reinforced" ? 1 : 0 } : null;
  }).filter(Boolean), s = Hu(
    [...i, ...r],
    _r
  ), o = s.reduce((p, h) => {
    var g;
    return qu(p, ((g = h.effect) == null ? void 0 : g.mitigationByType) ?? {});
  }, li({})), l = s.reduce(
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
    labels: s.map((p) => p.label),
    standardTraits: i
  };
}
function Ep({ traits: a = [], standardTraits: e = [] } = {}) {
  return [
    ...Ua(a),
    ...hi(e).map((i) => ju(i, _r))
  ].filter(Boolean);
}
function qo(a) {
  const e = Math.max(0, Number(a ?? 0) || 0);
  return e <= 0 ? 0 : Math.ceil(e / 4);
}
function Pp({
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
  const n = Yt(t, "penetrating"), r = li(e), s = qo(i), o = Number(r[n] ?? 0) || 0;
  return {
    currentArmorRating: i,
    baseMitigation: s,
    typeMitigationMod: o,
    totalMitigation: s + o,
    isDestroyed: !1
  };
}
function Rp({ damageIncoming: a = 0, armorTags: e = [], effects: t = {} } = {}) {
  const i = new Set(Vn(e));
  let n = Number(a ?? 0) || 0;
  const r = [];
  return Object.entries((t == null ? void 0 : t.bonusVsArmorTag) ?? {}).forEach(([s, o]) => {
    if (!i.has(s)) return;
    const l = Number(o ?? 0) || 0;
    l && (n *= 1 + l, r.push({ tag: s, bonus: l }));
  }), {
    damageIncoming: n,
    applied: r
  };
}
class da {
  static checkSufficient(e, t, i) {
    if (t > i) {
      const n = Re(v.common.errors.insufficient, {
        resource: e,
        required: t,
        available: i
      });
      throw ui.notifications.error(n), n;
    }
  }
  static checkOutOfRange(e, t, i, n) {
    if (t < i || t > n) {
      const r = Re(v.common.errors.outOfRange, {
        resource: e,
        value: t,
        min: i,
        max: n
      });
      throw ui.notifications.error(r), r;
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
      const i = Re(v.common.errors.expectedType, {
        type: e.type ? v.itemType.singular[e.type] : e.type,
        expectedType: t
      });
      throw ui.notifications.error(i), i;
    }
  }
  static checkActorCanReceiveDamage(e, t, i) {
    if (!t) {
      const n = Re(v.common.errors.actorCannotReceiveDamage, {
        actor: i.name,
        damageType: zu(e) ? Qt(e) : v.actor.monitors[e] ?? v.mwd.weaponDamageType[e] ?? v.mwd.personalDamageType[e] ?? e
      });
      throw ui.notifications.error(n), n;
    }
  }
  static checkWeaponDefense(e, t) {
    var n;
    const i = e.getDefense();
    if ((((n = e.isPersonalWeapon) == null ? void 0 : n.call(e)) ?? e.type === A.itemType.personalWeapon) && !i) {
      const r = Re(v.common.errors.noDefenseOnWeapon, { actor: t.name, weapon: e.name });
      throw ui.notifications.error(r), r;
    }
  }
  static checkTargetsCount(e, t, i) {
    if (e > 0 && t.length > e) {
      const n = Re(v.common.errors.maxTargetsExceedeed, {
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
      const n = Re(v.common.errors.actorDoesNotHaveDefense, {
        actor: t.name,
        defense: i.labelkey,
        actorType: v.actorType[t.type]
      });
      throw ui.notifications.error(n), n;
    }
  }
}
function fi(a, e, t, i, n, r = (s) => !0) {
  return {
    code: a,
    labelkey: v.attributeAction[a],
    label: v.attributeAction[a],
    attributeFunction1: e ?? ((s) => {
    }),
    attributeFunction2: t ?? ((s) => {
    }),
    icon: i,
    actorTypes: n,
    condition: r
  };
}
function xn(a, e) {
  return {
    code: a,
    labelkey: v.defense[a],
    label: v.defense[a],
    actionCode: e
  };
}
const nt = A.actorAttributes, rt = A.actorTypes, _t = gt.actions, $n = gt.defenses, ds = [
  fi(_t.defense, (a) => nt.reflexes, (a) => nt.intelligence, Z.fontAwesome("fas fa-shield-alt"), [rt.character, rt.npc]),
  fi(_t.resistTorture, (a) => nt.strength, (a) => nt.willpower, Z.fontAwesome("fas fa-angry"), [rt.character, rt.npc]),
  fi(_t.perception, (a) => nt.logic, (a) => nt.willpower, Z.fontAwesome("fas fa-eye"), [rt.character, rt.npc]),
  fi(_t.perception, (a) => nt.system, (a) => nt.handling, Z.fontAwesome("fas fa-video"), [rt.vehicle, rt.battlemech]),
  fi(_t.composure, (a) => nt.charisma, (a) => nt.willpower, Z.fontAwesome("fas fa-meh"), [rt.character, rt.npc]),
  fi(_t.judgeIntentions, (a) => nt.charisma, (a) => nt.charisma, Z.fontAwesome("fas fa-theater-masks"), [rt.character, rt.npc]),
  fi(_t.memory, (a) => nt.logic, (a) => nt.logic, Z.fontAwesome("fas fa-brain"), [rt.character, rt.npc]),
  fi(_t.catch, (a) => nt.reflexes, (a) => nt.reflexes, Z.fontAwesome("fas fa-baseball-ball"), [rt.character, rt.npc]),
  fi(_t.lift, (a) => nt.strength, (a) => nt.strength, Z.fontAwesome("fas fa-dumbbell"), [rt.character, rt.npc])
], Bn = [
  xn($n.physicalDefense, _t.defense),
  xn($n.physicalResistance, _t.resistTorture),
  xn($n.socialDefense, _t.composure),
  xn($n.mentalResistance, _t.perception)
];
class Fe {
  static init() {
    Handlebars.registerHelper("fixedDefenseCode", (e) => Fe.fixedDefenseCode(e));
  }
  static all(e = void 0) {
    return e ? ds.filter(e) : ds;
  }
  static getActorActions(e) {
    return ds.filter((t) => t.actorTypes.includes(e.type) && t.condition(e));
  }
  static fixedDefenseCode(e) {
    return gt.fixedDefenseCode[e] ?? e;
  }
  static getActorDefenses(e) {
    return Bn.map((t) => {
      const i = Fe.getActorAction(e, t.actionCode);
      return Fe._convertToDefense(i, t);
    }).filter((t) => t == null ? void 0 : t.code);
  }
  static getDefenseAttributeAction(e) {
    var t;
    return (t = Bn.find((i) => i.code == e)) == null ? void 0 : t.actionCode;
  }
  static getActorAction(e, t) {
    return Fe.getActorActions(e).find((i) => i.code == t);
  }
  static getActorDefense(e, t) {
    t = Fe.fixedDefenseCode(t);
    const i = Bn.find((r) => r.code == t), n = Fe.getActorAction(e, i.actionCode);
    return da.checkActorDefenseAction(n, e, i), Fe._convertToDefense(n, i);
  }
  static _convertToDefense(e, t) {
    return e ? foundry.utils.mergeObject(
      t,
      e ?? {},
      { overwrite: !1, inplace: !1 }
    ) : void 0;
  }
  static getDefenses() {
    return Bn;
  }
  static prepareShortcut(e, t) {
    const i = Fe.getActorActions(e).find((n) => n.code == t);
    if (i)
      return {
        icon: i.icon,
        label: i.labelkey,
        callback: (n) => n.actor.rollAttributeAction(t)
      };
  }
}
class Gs {
  constructor() {
    this.remoteCalls = {}, game.socket.on(xs, async (e) => this.onSocketMessage(e));
  }
  static async register(e, t) {
    game.system.anarchy.remoteCall._register(e, t);
  }
  async _register(e, t) {
    if (this.remoteCalls[e])
      throw `RemoteCall msg ${e} is already registered`;
    foundry.utils.mergeObject(t, {
      callback: (i) => {
        console.log(Me + "RemoteCall [", e, "] (", i, ")");
      },
      condition: (i) => !0,
      multiple: !1
      /* true if multiple users should handle the message */
    }, { overwrite: !1 }), this.remoteCalls[e] = t, console.log(Me + "RemoteCall registered", e);
  }
  static call(e, t) {
    return game.system.anarchy.remoteCall._remoteCall(e, t);
  }
  _remoteCall(e, t) {
    const i = this.remoteCalls[e];
    return !i || i.condition(game.user) || !i.multiple && Gt.isUniqueConnectedGM() ? !1 : (game.socket.emit(xs, { msg: e, data: t }), !0);
  }
  async onSocketMessage(e) {
    const t = this.remoteCalls[e.msg];
    if (t) {
      const i = t.condition(game.user), n = t.multiple, r = Gt.isUniqueConnectedGM();
      i && (n || r) ? t.callback(e.data) : console.log(Me + "RemoteCall.onSocketMessage(", e, ") ignored :", i, n, r);
    } else
      console.log(Me + "RemoteCall: No callback registered for", e);
  }
}
const $l = "Users.blindMessageToGM";
class Gt {
  static init() {
    Gs.register($l, {
      callback: (e) => Gt.blindMessageToGM(e),
      condition: (e) => e.isGM
    });
  }
  static blindMessageToGM(e) {
    Gs.call($l, e) || ChatMessage.create({
      user: e.user,
      whisper: ChatMessage.getWhisperRecipients("GM"),
      blind: !0,
      content: Re(v.chat.blindMessageToGM, {
        user: game.user.name,
        message: e.content
      })
    });
  }
  static getUsers(e = (t) => !0) {
    return (game.version ? game.users : game.users.entities).filter(e);
  }
  static firstConnectedGM() {
    return Gt.getUsers((e) => e.isGM && e.active).sort(ue.ascending((e) => e.id)).at(0) ?? {};
  }
  /**
   * @returns true pour un seul utilisateur: le premier GM connecté par ordre d'id
   */
  static isUniqueConnectedGM(e = game.user) {
    return e.id == Gt.firstConnectedGM().id;
  }
  static firstResponsible(e) {
    if (!(e != null && e.testUserPermission))
      return;
    const t = Gt.getUsers(
      (i) => i.active && e.testUserPermission(i, CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER)
    ).sort(ue.ascending((i) => i.id)).at(0);
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
const ha = v.actor.monitors, pi = v.actor.counters, Vu = {
  armor: {
    path: "system.monitors.armor.value",
    monitor: (a) => a.system.monitors.armor,
    iconChecked: Z.fontAwesome("fas fa-shield-slash"),
    iconUnchecked: Z.fontAwesome("fas fa-shield-alt"),
    iconHit: Z.fontAwesome("fas fa-bahai"),
    resource: ha.armor
  },
  fatigue: {
    path: "system.monitors.fatigue.value",
    monitor: (a) => a.system.monitors.fatigue,
    iconChecked: Z.fontAwesome("fas fa-grimace"),
    iconUnchecked: Z.fontAwesome("far fa-smile"),
    iconHit: Z.fontAwesome("fas fa-bahai"),
    resource: ha.fatigue,
    overflow: (a) => A.monitors.physical,
    useArmor: !0
  },
  physical: {
    path: "system.monitors.physical.value",
    monitor: (a) => a.system.monitors.physical,
    iconChecked: Z.fontAwesome("fas fa-heartbeat"),
    iconUnchecked: Z.fontAwesome("far fa-heart"),
    iconHit: Z.fontAwesome("fas fa-bahai"),
    resource: ha.physical,
    useArmor: !0
  },
  structure: {
    path: "system.monitors.structure.value",
    monitor: (a) => a.system.monitors.structure,
    iconChecked: Z.fontAwesome("fas fa-car-crash"),
    iconUnchecked: Z.fontAwesome("fas fa-car-alt"),
    iconHit: Z.fontAwesome("fas fa-bahai"),
    resource: ha.structure
  },
  heat: {
    path: "system.monitors.heat.value",
    monitor: (a) => a.system.monitors.heat,
    iconChecked: Z.fontAwesome("fas fa-fire"),
    iconUnchecked: Z.fontAwesome("far fa-sun"),
    iconHit: Z.fontAwesome("fas fa-temperature-high"),
    resource: ha.heat
  },
  criticals: {
    path: "system.hybrid.criticals.value",
    monitor: (a) => {
      var e;
      return ((e = a.system.hybrid) == null ? void 0 : e.criticals) ?? { value: 0, max: 0 };
    },
    iconChecked: Z.fontAwesome("fas fa-bolt"),
    iconUnchecked: Z.fontAwesome("far fa-dot-circle"),
    iconHit: Z.fontAwesome("fas fa-exclamation-triangle"),
    resource: ha.structure
  },
  anarchy: {
    path: "system.counters.anarchy.value",
    monitor: (a) => ({
      value: a.system.counters.anarchy.value,
      max: 6
    }),
    iconChecked: Z.iconPath(`${Xa}/anarchy-point.webp`, "checkbar-img"),
    iconUnchecked: Z.iconPath(`${Xa}/anarchy-point-off.webp`, "checkbar-img"),
    resource: pi.anarchy
  },
  plot: {
    path: "system.counters.anarchy.value",
    monitor: (a) => {
      const e = a.system.counters.anarchy.value;
      return { value: e, max: e + 1 };
    },
    iconChecked: Z.iconPath(`${Xa}/danger-point.webp`, "checkbar-img"),
    iconUnchecked: Z.iconPath(`${Xa}/danger-point-off.webp`, "checkbar-img"),
    resource: pi.anarchy
  },
  sceneAnarchy: {
    path: "system.counters.edgePools.chaos.value",
    monitor: (a) => {
      const e = a.getEdgePoolValue(A.counters.edgePools.chaos), t = a.getAttributeValue(A.actorAttributes.edge);
      return { value: e, max: t };
    },
    iconChecked: Z.iconPath("systems/mwd/icons/default/explosion.svg", "checkbar-img"),
    iconUnchecked: Z.iconPath("systems/mwd/icons/default/explosion.svg", "checkbar-img"),
    resource: pi.edgePools.chaos
  },
  grit: {
    path: "system.counters.edgePools.grit.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(A.counters.edgePools.grit), max: a.getAttributeValue(A.actorAttributes.edge) }),
    iconChecked: Z.iconPath("systems/mwd/icons/default/shield.svg", "checkbar-img"),
    iconUnchecked: Z.iconPath("systems/mwd/icons/default/shield.svg", "checkbar-img"),
    resource: pi.edgePools.grit
  },
  insight: {
    path: "system.counters.edgePools.insight.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(A.counters.edgePools.insight), max: a.getAttributeValue(A.actorAttributes.edge) }),
    iconChecked: Z.iconPath("systems/mwd/icons/default/eye.svg", "checkbar-img"),
    iconUnchecked: Z.iconPath("systems/mwd/icons/default/eye.svg", "checkbar-img"),
    resource: pi.edgePools.insight
  },
  legend: {
    path: "system.counters.edgePools.legend.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(A.counters.edgePools.legend), max: a.getAttributeValue(A.actorAttributes.edge) }),
    iconChecked: Z.iconPath("systems/mwd/icons/default/tower-flag.svg", "checkbar-img"),
    iconUnchecked: Z.iconPath("systems/mwd/icons/default/tower-flag.svg", "checkbar-img"),
    resource: pi.edgePools.legend
  },
  credibility: {
    path: "system.counters.edgePools.credibility.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(A.counters.edgePools.credibility), max: a.getAttributeValue(A.actorAttributes.edge) }),
    iconChecked: Z.iconPath("systems/mwd/icons/misc/hand.svg", "checkbar-img"),
    iconUnchecked: Z.iconPath("systems/mwd/icons/misc/hand.svg", "checkbar-img"),
    resource: pi.edgePools.credibility
  },
  rumor: {
    path: "system.counters.edgePools.rumor.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(A.counters.edgePools.rumor), max: a.getAttributeValue(A.actorAttributes.edge) }),
    iconChecked: Z.iconPath("systems/mwd/icons/default/mystery-man.svg", "checkbar-img"),
    iconUnchecked: Z.iconPath("systems/mwd/icons/default/mystery-man.svg", "checkbar-img"),
    resource: pi.edgePools.rumor
  }
}, Zt = foundry.utils.mergeObject(Vu, {});
class G {
  static init() {
    Handlebars.registerHelper("iconCheckbar", G.iconCheckbar), Handlebars.registerHelper("iconCheckbarHit", G.iconHit);
  }
  static hackCheckbars(e) {
    if (e) {
      const t = foundry.utils.mergeObject(Vu, {});
      foundry.utils.mergeObject(t, e, { recursive: !0 }), foundry.utils.mergeObject(Zt, t, { overwrite: !0 });
    }
  }
  static iconCheckbar(e, t) {
    return t ? G.iconChecked(e) : G.iconUnchecked(e);
  }
  static iconChecked(e) {
    var t;
    return (t = Zt[e]) == null ? void 0 : t.iconChecked;
  }
  static iconUnchecked(e) {
    var t;
    return (t = Zt[e]) == null ? void 0 : t.iconUnchecked;
  }
  static iconHit(e) {
    var t, i;
    return ((t = Zt[e]) == null ? void 0 : t.iconHit) ?? ((i = Zt[e]) == null ? void 0 : i.iconChecked);
  }
  static useArmor(e) {
    var t;
    return (t = Zt[e]) == null ? void 0 : t.useArmor;
  }
  static max(e, t) {
    var n;
    const i = (n = Zt[t]) == null ? void 0 : n.monitor(e);
    return ((i == null ? void 0 : i.max) ?? 0) + ((i == null ? void 0 : i.maxBonus) ?? 0);
  }
  static value(e, t) {
    var n;
    const i = (n = Zt[t]) == null ? void 0 : n.monitor(e);
    return (i == null ? void 0 : i.value) ?? 0;
  }
  static resistance(e, t, i = void 0) {
    return G.resistanceDetail(e, t, i).value;
  }
  static resistanceDetail(e, t, i = void 0) {
    var l, c;
    const n = (l = Zt[t]) == null ? void 0 : l.monitor(e), r = G._resolveResistance(n == null ? void 0 : n.resistance, i), s = G._resolveResistance(n == null ? void 0 : n.resistanceBonus, i), o = i === void 0 ? 0 : Number(((c = n == null ? void 0 : n.resistanceBonusByType) == null ? void 0 : c[i]) ?? 0);
    return {
      value: r.value + s.value + o,
      damageType: i,
      source: r.source,
      bonusSource: s.source,
      bonusByType: o,
      usedType: r.source === "type" || s.source === "type" || o !== 0
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
  static async switchMonitorCheck(e, t, i, n, r = void 0, s = void 0) {
    await G.setCounter(e, t, G.newValue(i, n), r, s);
  }
  static async addCounter(e, t, i, n = void 0) {
    if (i != 0) {
      const r = G.getCounterValue(e, t, n) ?? 0;
      await G.setCounter(e, t, r + i, n);
    }
  }
  static async setCounter(e, t, i, n = void 0, r = void 0) {
    switch (t) {
      case A.monitors.anarchy:
        return await G.setAnarchy(e, i);
      case A.monitors.sceneAnarchy:
        return await G.setSceneAnarchy(e, i);
    }
    return await G.setCheckbar(e, t, i);
  }
  static getCounterValue(e, t, i) {
    switch (t) {
      case A.monitors.anarchy:
        return G.getAnarchy(e, t);
    }
    return G.value(e, t);
  }
  static async setCheckbar(e, t, i) {
    if (i == G.getCounterValue(e, t))
      return;
    const n = Zt[t];
    if (n.path) {
      const r = G.max(e, t);
      if (r <= 0)
        return;
      await G._manageOverflow(n, e, t, i, r), i = Math.min(i, r), da.checkOutOfRange(n.resource, i, 0, r), await e.setCheckbarValue(n.path, i);
    }
  }
  static async _manageOverflow(e, t, i, n, r) {
    if (n > r) {
      const s = e.overflow ? e.overflow(t) : void 0, o = e.recomputeOverflow ? e.recomputeOverflow(n - r) : n - r;
      s && o > 0 && (G._notifyOverflow(t, i, o, s), await G.addCounter(t, s, o));
    }
  }
  static _notifyOverflow(e, t, i, n) {
    const r = Re(v.actor.monitors.overflow, {
      actor: e.name,
      monitor: v.actor.monitors[t],
      overflow: i,
      overflowMonitor: v.actor.monitors[n]
    });
    ui.notifications.warn(r);
  }
  static async _manageFatigueOverflow(e, t, i) {
    await G.addCounter(e, A.monitors.physical, t - i);
  }
  static async setAnarchy(e, t) {
    if (e.hasOwnAnarchy()) {
      if (e.hasGMAnarchy()) {
        await game.system.anarchy.gmAnarchy.setAnarchy(t), e.render();
        return;
      }
      await G._setAnarchyMonitor(e, A.monitors.anarchy, t);
    }
  }
  static async setSceneAnarchy(e, t) {
    await G._setAnarchyMonitor(e, A.monitors.sceneAnarchy, t);
  }
  static async _setAnarchyMonitor(e, t, i) {
    const n = G.value(e, t);
    await G.setCheckbar(e, t, i), game.user.isGM || G.notifyAnarchyChange(e, t, n, i);
  }
  static getAnarchy(e, t) {
    return !game.user.isGM && (!e.hasOwnAnarchy() || e.hasGMAnarchy()) || t == pi.anarchy && (!e.hasOwnAnarchy() || e.hasGMAnarchy()) ? 0 : G.value(e, t);
  }
  static notifyAnarchyChange(e, t, i, n) {
    Gt.blindMessageToGM({
      from: game.user.id,
      content: Re(
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
const { loadTemplates: Np, renderTemplate: Ip } = foundry.applications.handlebars, Bl = {
  highlighted: ["far fa-times-circle", "fas fa-dice-one", "fas fa-dice-two", "fas fa-dice-three", "fas fa-dice-four", "fas fa-dice-five", "fas fa-dice-six"],
  dimmed: ["far fa-times-circle", "far fa-dice-one", "far fa-dice-two", "far fa-dice-three", "far fa-dice-four", "far fa-dice-five", "far fa-dice-six"]
};
class yi {
  static init() {
    Hooks.once("ready", async () => await this.onReady()), Handlebars.registerHelper("dice-cursor-array", (e, t) => yi.array(e ?? 0, t ?? 5)), Handlebars.registerHelper("dice-cursor-fas", (e, t) => yi.fasClass(e, t)), Handlebars.registerHelper("dice-cursor-active", (e, t) => yi.activeClass(e, t)), Handlebars.registerHelper("dice-cursor-color", (e, t) => yi.colorClass(e, t));
  }
  static async onReady() {
    await Np([
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
    return yi.isActive(e, t) ? "active" : "inactive";
  }
  static fasClass(e, t) {
    const i = yi.isActive(e, t) ? Bl.highlighted : Bl.dimmed;
    return yi.$getFas(i, Math.abs(e));
  }
  static colorClass(e, t) {
    return e == 0 || !t ? e < 0 ? "fixed-dice-malus" : "fixed-dice-bonus" : e < 0 ? "variable-dice-malus" : "variable-dice-bonus";
  }
  static $getFas(e, t) {
    return e[t > 6 ? t % 6 : t];
  }
  static async diceCursor({ value: e, min: t, max: i, editable: n }) {
    return await Ip("systems/mwd/templates/roll/parts/dice-cursor.hbs", {
      value: e,
      min: t,
      max: i,
      editable: n
    });
  }
}
const Rt = {
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
}, zl = "anarchy-";
globalThis.ANARCHY_HOOKS = Rt;
class na {
  constructor() {
    this.hooks = [], Hooks.on("getSceneControlButtons", (e) => {
      var i;
      if (!((i = game.user) != null && i.isGM)) return;
      const t = Array.isArray(e) ? e.find((n) => n.name === "notes") : e == null ? void 0 : e.notes;
      if (!t) {
        const n = Array.isArray(e) ? e.map((r) => r.name) : Object.keys(e ?? {});
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
          var n, r;
          return (r = (n = game.mwd) == null ? void 0 : n.gmGadget) == null ? void 0 : r.call(n);
        }
      });
    });
  }
  static instance() {
    return game.system.anarchy.hooks;
  }
  static register(e) {
    na.instance()._register(e);
  }
  _register(e) {
    if (console.log(Me + "HooksManager.register", e), !e.startsWith(zl))
      throw `For safety Anarchy Hooks names must be prefixed by '${zl}'`;
    this.hooks.push(e);
  }
}
const Fl = [
  A.itemType.assetModule,
  A.itemType.mechWeapon,
  A.itemType.personalWeapon,
  "weapon"
];
class pe {
  constructor() {
    this.modifiers = {
      groups: ve.mapObjetToKeyValue(v.modifier.group, "key", "label"),
      roll: pe._buildGroupOptions("roll"),
      attribute: pe._buildGroupOptions("attribute"),
      monitor: pe._buildGroupOptions("monitor"),
      other: pe._buildGroupOptions("other")
    }, Hooks.once("ready", () => this.onReady());
  }
  static _buildGroupOptions(e) {
    switch (e) {
      case "attribute":
        return {
          label: v.modifier.group[e],
          effects: ve.hbsAttributes.map((t) => ({ key: t.value, label: t.labelkey })),
          categories: []
        };
    }
    return {
      label: v.modifier.group[e],
      effects: ve.mapObjetToKeyValue(v.modifier[e].effect, "key", "label"),
      categories: ve.mapObjetToKeyValue(v.modifier[e].category, "key", "label")
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
                return ve.getDamageTypes().map((r) => ({ key: r.value, label: r.labelkey }));
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
        return ve.getAttributes().map((i) => ({ key: i.value, label: i.labelkey }));
      case "skill":
        return game.system.anarchy.skills.getSkills().map((i) => ({ key: i.code, label: i.labelkey }));
      case "attributeAction":
        const t = Fe.all().map((i) => ({ key: i.code, label: i.labelkey }));
        return ue.distinct(t.map((i) => i.key)).map((i) => t.find((n) => n.key == i));
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
            return i.subCategory == e.attributeAction || i.subCategory == Fe.getDefenseAttributeAction(e.defenseAction);
        }
      return !1;
    };
  }
  static computeRollModifiers(e, t, i) {
    const n = pe.buildRollModifiersFilter(t, i), r = (c) => c.group == "roll" && c.effect == i && n(c), s = pe._activeItems(e).map((c) => pe.itemModifiers(c, r)).reduce((c, u) => c.concat(u), []).sort(ue.descending((c) => c.modifier.value)), o = pe.$sumAssetModuleModifiers(s.filter((c) => Fl.includes(c.item.type)).map((c) => c.modifier.value)), l = ue.sumValues(s.filter((c) => !Fl.includes(c.item.type)).map((c) => c.modifier.value));
    return {
      value: o + l,
      sources: s
    };
  }
  static $sumAssetModuleModifiers(e) {
    const t = e.find((r) => r > 3) ?? 0, i = ue.sumValues(e.filter((r) => r < 0)), n = Math.min(3, ue.sumValues(e.filter((r) => r > 0 && r <= 3)));
    return i + Math.max(n, t);
  }
  static computeModifiers(e, t, i = void 0, n = void 0) {
    const r = pe._createFilter(t, i, n), s = pe._activeItems(e).map((l) => pe.itemModifiers(l, r)).reduce((l, c) => l.concat(c), []);
    return {
      value: ue.sumValues(s, (l) => l.modifier.value),
      sources: s
    };
  }
  static sumMonitorModifiers(e, t, i, n = void 0) {
    return pe.sumModifiers(pe._activeItems(e), "monitor", t, i, n);
  }
  static sumModifiers(e, t, i, n, r = void 0) {
    const s = pe._createFilter(t, i, n, r), o = pe._activeItems(e).map((l) => pe.itemModifiers(l, s)).reduce((l, c) => l.concat(c), []);
    return ue.sumValues(o, (l) => l.modifier.value);
  }
  static _createFilter(e, t, i, n = void 0) {
    return (r) => r.group == e && r.effect == (t ?? r.effect) && r.category == (i ?? r.category) && (n == null ? !0 : r.subCategory == n);
  }
  static countModifiers(e, t, i = void 0, n = void 0) {
    const r = pe._createFilter(t, i, n);
    return pe._activeItems(e).map((o) => pe.itemModifiers(o, r)).reduce((o, l) => o.concat(l), []).count;
  }
  static itemModifiers(e, t) {
    return pe._listItemModifiers(e, t).map((i) => pe._itemModifier(e, i));
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
const { loadTemplates: ms, renderTemplate: q0 } = foundry.applications.handlebars, ke = {
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
}, Ul = 4, Dp = [
  // attribute1
  {
    code: "attribute1",
    options: {
      order: 1,
      category: ke.pool,
      hbsTemplateRoll: `${ee}/roll/parts/select-attribute.hbs`
    },
    condition: (a) => Object.values(gt.rollType).includes(a.mode),
    isUsed: (a) => !0,
    factory: (a) => {
      var t;
      const e = a.attribute1 ?? ((t = a.skill) == null ? void 0 : t.system.attribute);
      return {
        labelkey: e ? v.attributes[e] : v.attributes.noAttributes,
        value: a.actor.getAttributeValue(e, a.activeItem),
        flags: { editable: a.skill },
        selected: e,
        choices: ve.getAttributes((i) => a.attributes.includes(i))
      };
    }
  },
  // attribute2
  {
    code: "attribute2",
    options: {
      order: 1,
      category: ke.pool,
      hbsTemplateRoll: `${ee}/roll/parts/select-attribute.hbs`,
      hbsTemplateChat: `${ee}/chat/parts/pool-attribute2.hbs`
    },
    condition: (a) => [gt.rollType.attribute, gt.rollType.attributeAction, gt.rollType.defense].includes(a.mode),
    isUsed: (a) => a.used,
    onChecked: (a, e) => a.used = !!e,
    factory: (a) => {
      const e = a.attribute2;
      return {
        labelkey: e ? v.attributes[e] : v.attributes.noAttributes,
        value: a.actor.getAttributeValue(e, a.activeItem),
        flags: { editable: gt.rollType.attribute == a.mode },
        selected: e,
        choices: ve.getAttributes((t) => a.attributes.includes(t))
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
      hbsTemplateRoll: `${ee}/roll/parts/input-numeric.hbs`
    },
    condition: (a) => ["skill", "weapon"].includes(a.mode),
    factory: (a) => {
      var t, i, n, r;
      const e = (t = a.actor) != null && t.getSkillRating ? a.actor.getSkillRating(a.skill) : ((n = (i = a.skill) == null ? void 0 : i.system) == null ? void 0 : n.value) ?? 0;
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
      category: ke.pool,
      hbsTemplateRoll: `${ee}/roll/parts/check-option.hbs`
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
      labelkey: v.common.roll.modifiers.social.credibility,
      hbsTemplateRoll: `${ee}/roll/parts/input-numeric.hbs`
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
      category: ke.pool,
      hbsTemplateRoll: `${ee}/roll/parts/input-numeric.hbs`,
      min: -4,
      max: 4
    },
    factory: (a) => Hi.computeRollModifiers(ke.pool, a)
  },
  // wounds
  {
    code: "wounds",
    options: {
      flags: { optional: !0 },
      order: 10,
      category: ke.pool,
      labelkey: v.common.roll.modifiers.wounds,
      hbsTemplateRoll: `${ee}/roll/parts/input-numeric.hbs`
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
      labelkey: v.common.roll.modifiers.other,
      hbsTemplateRoll: `${ee}/roll/parts/input-numeric.hbs`,
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
      labelkey: v.common.roll.modifiers.glitch,
      hbsTemplateRoll: `${ee}/roll/parts/input-numeric.hbs`,
      hbsTemplateChat: `${ee}/chat/parts/glitch.hbs`,
      min: 0,
      max: 5
    },
    isUsed: (a) => a.value > 0,
    factory: (a) => {
      const e = a.actor.getWounds(), t = Hi.computeRollModifiers(ke.glitch, a);
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
      labelkey: v.common.roll.modifiers.social.rumor,
      hbsTemplateRoll: `${ee}/roll/parts/input-numeric.hbs`,
      hbsTemplateChat: `${ee}/chat/parts/glitch.hbs`,
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
      labelkey: v.common.roll.modifiers.reroll,
      hbsTemplateRoll: `${ee}/roll/parts/input-numeric.hbs`,
      min: 0,
      max: Ul
    },
    factory: (a) => {
      const e = Hi.computeRollModifiers(ke.reroll, a), t = Hi.computeRollModifiers(ke.rerollMax, a);
      return foundry.utils.mergeObject(e, {
        max: Ul + Math.max(0, t.value ?? 0)
      });
    }
  },
  // reduction from opponent
  {
    code: "reduced",
    options: {
      order: 29,
      category: ke.pool,
      labelkey: v.common.roll.modifiers.reduced,
      hbsTemplateRoll: `${ee}/roll/parts/input-numeric.hbs`,
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
      labelkey: v.common.roll.modifiers.rerollForced,
      hbsTemplateRoll: `${ee}/roll/parts/input-numeric.hbs`,
      min: -5,
      max: 0
    },
    factory: (a) => {
      var t;
      const e = Hi.computeRollModifiers(ke.successReroll, a);
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
      labelkey: v.common.roll.modifiers.anarchyDisposition,
      hbsTemplateRoll: `${ee}/roll/parts/check-option.hbs`
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
      labelkey: v.common.roll.modifiers.anarchyRisk,
      hbsTemplateRoll: `${ee}/roll/parts/check-option.hbs`,
      hbsTemplateChat: `${ee}/chat/parts/anarchy-risk.hbs`
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
      labelkey: v.common.roll.modifiers.edge,
      hbsTemplateRoll: `${ee}/roll/parts/check-option.hbs`
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
      ].map((r) => {
        const s = a.actor.getEdgePoolValue(r);
        return {
          code: r,
          label: v.actor.counters.edgePools[r] ?? r,
          value: s
        };
      }), i = ((n = t.find((r) => r.value > 0)) == null ? void 0 : n.code) ?? A.counters.edgePools.grit;
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
      labelkey: v.common.roll.modifiers.opponentPool,
      hbsTemplateRoll: `${ee}/roll/parts/input-numeric.hbs`,
      min: 0,
      max: 4
    },
    factory: (a) => Hi.computeRollModifiers(ke.opponentPool, a),
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
      labelkey: v.common.roll.modifiers.opponentReroll,
      hbsTemplateRoll: `${ee}/roll/parts/input-numeric.hbs`,
      min: 0,
      max: 4
    },
    factory: (a) => Hi.computeRollModifiers(ke.opponentReroll, a),
    condition: (a) => !a.attributeAction
  }
];
class Hi {
  constructor() {
    this.registeredParameters = {}, na.register(Rt.REGISTER_ROLL_PARAMETERS), na.register(Rt.MODIFY_ROLL_PARAMETER), Hooks.on(Rt.MODIFY_ROLL_PARAMETER, (e) => this._validate(e)), Hooks.once(Rt.REGISTER_ROLL_PARAMETERS, (e) => Dp.forEach(
      (t) => e(t)
    )), Hooks.once("ready", () => this.onReady());
  }
  async onReady() {
    Hooks.callAll(Rt.REGISTER_ROLL_PARAMETERS, async (t) => {
      Hooks.callAll(Rt.MODIFY_ROLL_PARAMETER, t), t.ignore || await this._register(t);
    });
    const e = ue.distinct([].concat(Object.values(this.registeredParameters).map((t) => t.options.hbsTemplateRoll)).concat(Object.values(this.registeredParameters).map((t) => t.options.hbsTemplateChat)).filter((t) => typeof t == "string" && t.length > 0));
    await ms(ue.distinct(e)), await ms([`${ee}/roll/parts/parameter-label.hbs`]);
  }
  _validate(e) {
    e.code || (console.error(`${Me} RollParameter does not have a code`, e), e.ignore = !0);
  }
  async _register(e) {
    if (this.registeredParameters[e.code]) {
      console.error(`${Me} RollParameter ${e.code} is already registered`, e);
      return;
    }
    e.onChecked || (e.onChecked = (t, i) => t.used = i), e.onValue = (t, i) => t.value = i, this.registeredParameters[e.code] = e;
  }
  async _optionalLoadTemplate(e) {
    e && await ms([e]);
  }
  build(e) {
    return Object.values(this.registeredParameters).filter((t) => !t.condition || t.condition(e)).map((t) => this._computeParameter(t, e));
  }
  compute(e) {
    const t = e.filter((r) => this.isParameterUsed(r)), i = ue.classify(t, (r) => r.category), n = {};
    return Object.values(i).forEach((r) => n[r[0].category] = ue.sumValues(r, (s) => s.value ?? (s.optional ? 1 : 0))), n;
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
      var s;
      return !((s = r.isWeapon) != null && s.call(r)) || t.weapon && r.id == t.weapon.id;
    }, n = t.actor.items.filter(i);
    return pe.computeRollModifiers(n, t, e);
  }
}
const { ApplicationV2: Op, HandlebarsApplicationMixin: Lp } = foundry.applications.api, { loadTemplates: _p, renderTemplate: xp } = foundry.applications.handlebars;
var Rr, Yu;
const Ze = class Ze extends Lp(Op) {
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
    await _p([
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
    const i = foundry.utils.mergeObject(Ze.prepareActorRoll(e), {
      mode: gt.rollType.attribute,
      attribute1: t
    });
    await Ze.create(i);
  }
  static async rollAttributeAction(e, t) {
    const i = foundry.utils.mergeObject(Ze.prepareActorRoll(e), {
      mode: gt.rollType.attributeAction,
      attributeAction: t.code,
      attribute1: t.attributeFunction1(e),
      attribute2: t.attributeFunction2(e)
    });
    await Ze.create(i);
  }
  static async rollSkill(e, t, i) {
    const n = foundry.utils.mergeObject(Ze.prepareActorRoll(e), {
      mode: gt.rollType.skill,
      skill: t,
      attribute1: (t == null ? void 0 : t.system.attribute) ?? A.actorAttributes.reflexes,
      specialization: i
    });
    await Ze.create(n);
  }
  static async rollWeapon(e, t, i, n) {
    const r = foundry.utils.mergeObject(Ze.prepareActorRoll(e), {
      mode: gt.rollType.weapon,
      weapon: i,
      skill: t,
      attribute1: (t == null ? void 0 : t.system.attribute) ?? e.getPhysicalAgility(),
      specialization: void 0,
      targeting: n
    });
    await Ze.create(r);
  }
  static async rollDefense(e, t, i) {
    const n = foundry.utils.mergeObject(Ze.prepareActorRoll(e), {
      mode: gt.rollType.defense,
      attribute1: t.attributeFunction1(e),
      attribute2: t.attributeFunction2(e),
      defenseAction: t.code,
      attackRoll: i.attackRoll,
      tokenId: i.defenderTokenId,
      choiceChatMessageId: i.choiceChatMessageId
    });
    await Ze.create(n);
  }
  static async itemAttributeRoll(e, t) {
    const i = foundry.utils.mergeObject(Ze.prepareActorRoll(e.actor), {
      mode: gt.rollType.attribute,
      item: e,
      attribute1: t,
      attributes: e.actor.getUsableAttributes(e)
    });
    await Ze.create(i);
  }
  static async create(e) {
    var s;
    const t = C(s = Ze, Rr, Yu).call(s, e), i = await xp(`${ee}/roll/roll-dialog-title.hbs`, t), n = {
      id: `roll-dialog-${foundry.utils.randomID()}`,
      classes: [game.system.anarchy.styles.selectCssClass(), ...Ze.DEFAULT_OPTIONS.classes],
      window: { title: i }
    };
    return new Ze({ roll: t }, n).render({ force: !0 });
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
      const n = this._getRollParameter(i), r = this._getEventItem(i, this.roll.actor), s = i.currentTarget.value, o = this.roll.actor.getAttributeValue(s, r);
      this.roll[n.code] = s, await this._setParameterSelectedOption(n, s, o);
    }), this.html.find(".check-optional").click(async (i) => {
      const n = this._getRollParameter(i);
      n.onChecked(n, i.currentTarget.checked), n.category == ke.pool && await this._updateParameterValue(n, n.value), n.code == "edge" && this.html.find(`.parameter[data-parameter-code='${n.code}'] .edge-pool-select`).prop("disabled", !n.used);
    }), this.activateDiceParameterClick(), this.html.find("input.parameter-value:not(:disabled)").on("input", async (i) => {
      const n = this._getRollParameter(i), r = Number.parseInt(i.currentTarget.value) ?? 0;
      await this._updateParameterValue(n, r);
    }), this.html.find(".select-option-parameter").change(async (i) => {
      const n = this._getRollParameter(i), r = i.currentTarget.value, s = Number.parseInt(r);
      await this._setParameterSelectedOption(n, r, s);
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
        const n = Number.parseInt(this.html.find(e.currentTarget).attr("data-dice")) ?? 0, r = t.value != n || n == 0 ? n : n > 0 ? n - 1 : n + 1;
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
    return await yi.diceCursor({
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
Rr = new WeakSet(), Yu = function(e) {
  const t = game.system.anarchy.rollParameters.build(e).sort(ue.ascending((i) => i.order ?? 200));
  return foundry.utils.mergeObject(e, {
    ENUMS: ve.getEnums((i) => e.attributes.includes(i)),
    ANARCHY: v,
    parameters: t
  });
}, we(Ze, Rr), O(Ze, "PARTS", {
  body: {
    template: `${ee}/roll/roll-dialog.hbs`
  }
});
let ri = Ze;
const Vo = 2, qs = "skillSpecializationCatalog", $p = [
  { key: "running", label: "Running" },
  { key: "jumping", label: "Jumping" },
  { key: "swimming", label: "Swimming" },
  { key: "climbing", label: "Climbing" },
  { key: "acrobatics", label: "Acrobatics" }
], Qu = /* @__PURE__ */ new Set(), di = [
  // Strength
  { code: "athletics", label: "Athletics", attribute: "strength", icon: `${me}/athletics.svg`, domains: ["physical"], specializations: $p },
  { code: "heavyWeapons", label: "Heavy Weapons", attribute: "strength", icon: `${me}/heavy-weapons.svg`, defense: "physicalDefense", domains: ["physical"] },
  // Reflexes
  { code: "escapeArtist", label: "Escape Artist", attribute: "reflexes", icon: `${me}/escape-artist.svg`, domains: ["physical"] },
  { code: "gunnery", label: "Gunnery", attribute: "reflexes", icon: `${me}/vehicle-weapons.svg`, defense: "physicalDefense", domains: ["physical"] },
  { code: "meleeCombat", label: "Melee Combat", attribute: "reflexes", icon: `${me}/close-combat.svg`, defense: "physicalDefense", domains: ["physical"] },
  { code: "piloting", label: "Piloting", attribute: "reflexes", icon: `${me}/piloting-ground-steering-wheel.svg`, domains: ["physical"] },
  { code: "projectileWeapons", label: "Projectile Weapons", attribute: "reflexes", icon: `${me}/projectile-weapons.svg`, defense: "physicalDefense", domains: ["physical"] },
  { code: "firearms", label: "Firearms", attribute: "reflexes", icon: `${me}/firearms.svg`, defense: "physicalDefense", domains: ["physical"] },
  { code: "stealth", label: "Stealth", attribute: "reflexes", icon: `${me}/stealth.svg`, domains: ["physical"] },
  { code: "zeroGOps", label: "Zero-G Operations", attribute: "reflexes", icon: `${me}/fly.svg`, domains: ["physical"] },
  // Intelligence
  { code: "art", label: "Art", attribute: "intelligence", icon: `${me}/art.svg`, domains: ["mental"] },
  { code: "artillery", label: "Artillery", attribute: "intelligence", icon: `${me}/artillery.svg`, domains: ["mental"] },
  { code: "systemOps", label: "System Operations", attribute: "intelligence", icon: `${me}/electronics.svg`, domains: ["mental"] },
  { code: "computers", label: "Computers", attribute: "intelligence", icon: `${me}/hacking.svg`, domains: ["mental"] },
  { code: "demolitions", label: "Demolitions", attribute: "intelligence", icon: `${me}/demolition.svg`, domains: ["mental"] },
  { code: "medTech", label: "Medtech", attribute: "intelligence", icon: `${me}/biotech.svg`, domains: ["mental"] },
  { code: "science", label: "Science", attribute: "intelligence", icon: `${me}/skills.svg`, domains: ["mental"] },
  { code: "perception", label: "Perception", attribute: "intelligence", icon: `${me}/skills.svg`, domains: ["mental"] },
  { code: "tactics", label: "Tactics", attribute: "intelligence", icon: `${me}/skills.svg`, domains: ["mental"] },
  { code: "technician", label: "Technician", attribute: "intelligence", icon: `${me}/engineering.svg`, domains: ["mental"] },
  { code: "tracking", label: "Tracking", attribute: "intelligence", icon: `${me}/tracking.svg`, domains: ["physical", "mental"] },
  { code: "navigation", label: "Navigation", attribute: "intelligence", icon: `${me}/piloting-other.svg`, domains: ["mental"] },
  // Guts
  { code: "administration", label: "Administration", attribute: "willpower", icon: `${me}/knowledge.svg`, domains: ["social", "mental"] },
  { code: "animalHandling", label: "Animal Handling", attribute: "willpower", icon: `${me}/animals.svg`, domains: ["physical", "mental"] },
  { code: "survival", label: "Survival", attribute: "willpower", icon: `${me}/survival.svg`, domains: ["physical", "mental"] },
  // Charisma
  { code: "acting", label: "Acting", attribute: "charisma", icon: `${me}/con-art.svg`, domains: ["social"] },
  { code: "disguise", label: "Disguise", attribute: "charisma", icon: `${me}/disguise.svg`, domains: ["social", "mental"] },
  { code: "leadership", label: "Leadership", attribute: "charisma", icon: `${me}/psychology.svg`, domains: ["social"] },
  { code: "negotiation", label: "Negotiation", attribute: "charisma", icon: `${me}/negotiation.svg`, domains: ["social"] },
  { code: "etiquette", label: "Etiquette", attribute: "charisma", icon: `${me}/etiquette.svg`, domains: ["social"] },
  { code: "streetwise", label: "Streetwise", attribute: "charisma", icon: `${me}/etiquette2.svg`, domains: ["social"] },
  { code: "intimidation", label: "Intimidation", attribute: "charisma", icon: `${me}/intimidation.svg`, domains: ["social", "mental"] }
].map(Bp);
for (const a of di)
  Qu.add(a.code);
function Bp(a) {
  return {
    ...a,
    label: a.label ?? a.code,
    icon: a.icon ?? `${En}/icons/skills/skills.svg`,
    specializations: Qo(a.specializations)
  };
}
function Yo(a) {
  return String(a ?? "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function Qo(a = []) {
  const e = /* @__PURE__ */ new Set();
  return (Array.isArray(a) ? a : []).map((t) => {
    const i = Yo((t == null ? void 0 : t.key) ?? (t == null ? void 0 : t.label) ?? t);
    return !i || e.has(i) ? null : (e.add(i), {
      key: i,
      label: String((t == null ? void 0 : t.label) ?? (t == null ? void 0 : t.key) ?? t ?? i).trim() || i
    });
  }).filter(Boolean);
}
function zp(a = []) {
  const e = new Error(a[0] ?? "Invalid skill specialization data.");
  return e.validationErrors = a, e;
}
function Fp() {
  const a = {};
  for (const e of di) {
    const t = (Array.isArray(e.specializations) ? e.specializations : []).map((i) => String((i == null ? void 0 : i.label) ?? "").trim()).filter(Boolean);
    t.length && (a[e.code] = t);
  }
  return a;
}
const Up = Object.freeze(Fp());
function jp(a, e = [], { strict: t = !1, errors: i = [] } = {}) {
  var r, s;
  if (!Array.isArray(e)) {
    if (t) {
      const o = ((r = Vs(a)) == null ? void 0 : r.label) ?? a;
      i.push(`${o}: expected an array of specialization labels.`);
    }
    return [];
  }
  const n = [];
  for (const o of e) {
    const l = String(o ?? "").trim();
    if (!l) {
      if (t) {
        const c = ((s = Vs(a)) == null ? void 0 : s.label) ?? a;
        i.push(`${c}: specialization labels cannot be blank.`);
      }
      continue;
    }
    n.push(l);
  }
  return Qo(n).map((o) => o.label);
}
function Vs(a) {
  return di.find((e) => e.code === a);
}
function Ju(a, { strict: e = !1 } = {}) {
  const t = a && typeof a == "object" && !Array.isArray(a) ? a : {}, i = [], n = {};
  for (const [r, s] of Object.entries(t)) {
    if (!Qu.has(r)) {
      e && i.push(`Unknown skill code "${r}".`);
      continue;
    }
    const o = jp(r, s, { strict: e, errors: i });
    o.length && (n[r] = o);
  }
  if (e && i.length) throw zp(i);
  return Object.fromEntries(
    di.map((r) => [r.code, n[r.code]]).filter(([, r]) => Array.isArray(r) && r.length)
  );
}
function Hp() {
  var a, e, t;
  try {
    if ((t = (e = (a = game == null ? void 0 : game.settings) == null ? void 0 : a.settings) == null ? void 0 : e.has) != null && t.call(e, `${T}.${qs}`))
      return game.settings.get(T, qs);
  } catch {
  }
  return ed();
}
function Xu() {
  const a = Ju(Hp(), { strict: !1 });
  return Object.fromEntries(
    Object.entries(a).map(([e, t]) => [
      e,
      Qo(t)
    ])
  );
}
function Zu(a = [], { allowedKeys: e = null } = {}) {
  const t = /* @__PURE__ */ new Set();
  return (Array.isArray(a) ? a : []).map((i) => Yo(i)).filter((i) => !i || t.has(i) || e && !e.has(i) ? !1 : (t.add(i), !0));
}
function Dt(a) {
  const e = Vs(a);
  if (e)
    return {
      ...e,
      specializations: ra(e.code)
    };
}
function yr() {
  const a = Xu();
  return [...di].map((e) => ({
    ...e,
    specializations: [...a[e.code] ?? []]
  })).sort((e, t) => e.label.localeCompare(t.label));
}
function ra(a) {
  return [...Xu()[a] ?? []];
}
function Jo(a, e) {
  const t = Yo(e);
  if (t)
    return ra(a).find((i) => i.key === t);
}
function Kp(a, e) {
  var t;
  return ((t = Jo(a, e)) == null ? void 0 : t.label) ?? "";
}
function ed() {
  return foundry.utils.deepClone(Up);
}
function Br(a, { strict: e = !1 } = {}) {
  return Ju(a, { strict: e });
}
function br(a = []) {
  return Zu(a);
}
function Wp(a, e = []) {
  const t = new Set(ra(a).map((n) => n.key)), i = new Set(Zu(e, { allowedKeys: t }));
  return ra(a).filter((n) => i.has(n.key)).map((n) => n.key);
}
function Ys(a, e) {
  var t, i;
  return br(
    ((i = (t = a == null ? void 0 : a.skills) == null ? void 0 : t[e]) == null ? void 0 : i.specializations) ?? []
  );
}
function zr(a, e) {
  return Wp(
    e,
    Ys(a, e)
  );
}
function td(a, e) {
  const t = new Set(zr(a, e));
  return ra(e).filter((i) => t.has(i.key));
}
function Gp(a) {
  const e = Math.ceil(a.length / 2);
  return { left: a.slice(0, e), right: a.slice(e) };
}
function qp(a) {
  var e, t;
  a.skills ?? (a.skills = {});
  for (const i of di) {
    const n = (e = a.skills)[t = i.code] ?? (e[t] = {});
    n.rating == null && (n.rating = 0), n.bonus == null && (n.bonus = 0), n.specializations = br(n.specializations);
  }
}
function id(a, { bonusBySkill: e = null } = {}) {
  const t = yr(), { left: i, right: n } = Gp(t), r = (s) => {
    var y, b, S, w, k, P;
    const o = s.code, l = s.attribute, c = Number(((b = (y = a == null ? void 0 : a.skills) == null ? void 0 : y[o]) == null ? void 0 : b.rating) ?? 0), u = Number(((w = (S = a == null ? void 0 : a.attributes) == null ? void 0 : S[l]) == null ? void 0 : w.value) ?? 0), d = Number(((P = (k = a == null ? void 0 : a.skills) == null ? void 0 : k[o]) == null ? void 0 : P.bonus) ?? 0), m = Number((e == null ? void 0 : e[o]) ?? 0), f = d + m, p = td(a, o), h = ra(o).filter((E) => !p.some((x) => x.key === E.key)), g = u + c + f;
    return {
      code: o,
      label: s.label,
      icon: s.icon,
      attribute: l,
      attributeLabel: ve != null && ve.localizeAttribute ? ve.localizeAttribute(l) : l,
      rating: c,
      base: u,
      bonus: f,
      total: g,
      rollPayload: JSON.stringify({ intent: "skill", key: o }),
      canAddSpecialization: h.length > 0,
      specializations: p.map((E) => ({
        ...E,
        bonus: Vo,
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
    left: i.map(r),
    right: n.map(r)
  };
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
}, ad = "statusConditionCatalog", Vp = Object.freeze([
  { value: "person", label: "Person" },
  { value: "machine", label: "Machine" },
  { value: "all", label: "All Actors" },
  { value: "character", label: "Character" },
  { value: "npc", label: "NPC" },
  { value: "vehicle", label: "Vehicle" },
  { value: "battlemech", label: "BattleMech" }
]), jl = Object.freeze([
  { value: "false", label: "No" },
  { value: "true", label: "Yes" }
]), nd = Object.freeze([
  A.actorTypes.character,
  A.actorTypes.npc
]), rd = Object.freeze([
  A.actorTypes.vehicle,
  A.actorTypes.battlemech
]), Yp = Object.freeze([...nd, ...rd]), Sr = Object.freeze({
  person: nd,
  machine: rd,
  all: Yp,
  character: [A.actorTypes.character],
  npc: [A.actorTypes.npc],
  vehicle: [A.actorTypes.vehicle],
  battlemech: [A.actorTypes.battlemech]
}), sd = "systems/mwd/img/icons/status", Qp = Object.freeze([
  // Person conditions: lightly filtered from the existing status/icon pool.
  oe("prone", "Prone", "person", "physical", ["movement", "posture"], "prone.svg", { modifierKey: "prone", order: 10 }),
  oe("blinded", "Blinded", "person", "sensory", ["vision"], "blinded.svg", { modifierKey: "blinded", order: 20 }),
  oe("frightened", "Frightened", "person", "mental", ["morale"], "brain_injury.svg", { modifierKey: "frightened", order: 30 }),
  oe("deafened", "Deafened", "person", "sensory", ["hearing"], "deafened.svg", { order: 40 }),
  oe("hidden", "Hidden", "person", "tactical", ["stealth"], "hidden.svg", { order: 50 }),
  oe("suppressed", "Suppressed", "person", "tactical", ["offense"], "suppressed.svg", { order: 60 }),
  oe("grappled", "Grappled", "person", "physical", ["movement"], "grappled.svg", { order: 70 }),
  oe("stunned", "Stunned", "person", "physical", ["action"], "concussion.svg", { order: 80 }),
  oe("knockedOut", "Knocked Out", "person", "physical", ["unconscious"], "knockout.svg", { order: 90 }),
  oe("onFire", "On Fire", "all", "hazard", ["fire", "heat", "escalating"], "on_fire.svg", { order: 100 }),
  oe("drugged", "Drugged", "person", "chemical", ["impairment"], "drugged.svg", { order: 110 }),
  oe("radiation", "Radiation", "person", "hazard", ["radiation"], "radiation_low.svg", { order: 120 }),
  oe("overloaded", "Overloaded", "all", "reactor", ["heat", "actionRestriction"], "surge.svg", { managed: !0, modifierKey: "overloaded", order: 130 }),
  oe("preparedInterrupt", "Prepared", "person", "tactical", ["reaction", "prepared"], "readied_action.svg", { manual: !1, managed: !0, order: 140 }),
  oe("machineCritical", "Machine Critical", "machine", "damage", ["critical", "system"], "surge.svg", { manual: !1, managed: !0, order: 150 }),
  // Machine stability and movement.
  oe("unstable", "Unstable", "machine", "stability", ["movement", "piloting", "knockdown"], "falling.svg", { order: 1e3 }),
  oe("staggeredMechanical", "Staggered (Mechanical)", "machine", "stability", ["movement", "actionRestriction"], "falling.svg", { order: 1010 }),
  oe("proneMechFall", "Prone (Mech Fall)", "battlemech", "stability", ["movement", "posture", "standUp"], "prone.svg", { order: 1020 }),
  oe("skidding", "Skidding", "machine", "movement", ["forcedMovement", "tracking"], "falling.svg", { order: 1030 }),
  oe("stalled", "Stalled", "machine", "movement", ["movement", "actionRestriction"], "emp.svg", { order: 1040 }),
  oe("limping", "Limping", "machine", "movement", ["movement", "location"], "broken_leg.svg", { order: 1050 }),
  oe("jumpJetFailure", "Jump Jet Failure", "battlemech", "movement", ["jump", "equipment"], "surge.svg", { order: 1060 }),
  // Machine weapons.
  oe("weaponFailure", "Weapon Failure", "machine", "weapon", ["weapon", "mountScoped"], "broken_weapon.svg", { order: 1100 }),
  oe("jammedBallistic", "Jammed (Ballistic)", "machine", "weapon", ["weapon", "ballistic", "clearAction"], "broken_weapon.svg", { order: 1110 }),
  oe("armDestroyed", "Arm Destroyed", "battlemech", "damage", ["location", "weapon", "arm"], "dismembered_arm.svg", { order: 1120 }),
  // Sensors and electronics.
  oe("sensorDegraded", "Sensor Degraded", "machine", "sensor", ["sensor", "perception"], "all-seeing-eye.webp", { order: 1200 }),
  oe("sensorBlind", "Sensor Blind", "machine", "sensor", ["sensor", "targeting", "rangeLimit"], "damaged_eye.svg", { order: 1210 }),
  oe("ecmJamming", "ECM Jamming", "machine", "electronicWarfare", ["ecm", "tracking"], "emp.svg", { order: 1220 }),
  oe("ecmShrouded", "ECM Shrouded", "machine", "electronicWarfare", ["ecm", "defense"], "hidden.svg", { order: 1230 }),
  oe("eccmBoosted", "ECCM Boosted", "machine", "electronicWarfare", ["eccm", "sensor"], "all-seeing-eye.webp", { order: 1240 }),
  oe("sensorLocked", "Sensor Locked", "machine", "sensor", ["sensor", "targeted"], "all-seeing-eye.webp", { order: 1250 }),
  // Reactor and heat.
  oe("reactorInstability", "Reactor Instability", "machine", "reactor", ["heat", "reactor", "escalating"], "surge.svg", { order: 1300 }),
  oe("shutdown", "Shutdown", "machine", "reactor", ["heat", "actionRestriction"], "emp.svg", { order: 1310 }),
  oe("overheating", "Overheating", "machine", "reactor", ["heat", "escalating"], "on_fire_mild.svg", { order: 1320 }),
  oe("reactorBreach", "Reactor Breach", "machine", "reactor", ["reactor", "catastrophic", "countdown"], "radiation_high.svg", { order: 1330 }),
  // Machine damage and battlefield exposure.
  oe("legDestroyed", "Leg Destroyed", "battlemech", "damage", ["location", "movement", "leg"], "dismembered_leg.svg", { order: 1400 }),
  oe("exposed", "Exposed", "machine", "tactical", ["defense", "vulnerable"], "target.svg", { icon: `${sd}/falling.svg`, order: 1410 }),
  oe("entrenchedHullDown", "Entrenched / Hull Down", "machine", "tactical", ["defense", "cover"], "cover.svg", { order: 1420 }),
  oe("obscured", "Obscured (Smoke/Dust)", "machine", "visibility", ["visibility", "cover"], "hidden.svg", { order: 1430 }),
  // Tactical markers.
  oe("evasiveWeave", "Evasive Weave", "machine", "tactical", ["defense", "attackPenalty", "selfInduced"], "falling.svg", { order: 1500 }),
  oe("braced", "Braced", "machine", "tactical", ["defense", "mobilityPenalty"], "cover.svg", { order: 1510 }),
  oe("overextended", "Overextended", "machine", "tactical", ["attack", "defensePenalty"], "surge.svg", { order: 1520 }),
  oe("targetFocused", "Target Focused", "machine", "tactical", ["targeted", "attack"], "all-seeing-eye.webp", { order: 1530 }),
  oe("suppressedMechanical", "Suppressed", "machine", "tactical", ["offense", "suppressed"], "suppressed.svg", { order: 1540 })
]);
function oe(a, e, t, i, n, r, s = {}) {
  return {
    id: a,
    label: e,
    actorGroup: t,
    category: i,
    tags: n,
    icon: s.icon ?? `${sd}/${r}`,
    manual: s.manual ?? !0,
    managed: s.managed ?? !1,
    modifierKey: s.modifierKey ?? "",
    order: s.order ?? 0
  };
}
function Jp() {
  return typeof foundry < "u" && (foundry == null ? void 0 : foundry.utils);
}
function Xp(a) {
  return Jp() && typeof foundry.utils.deepClone == "function" ? foundry.utils.deepClone(a) : JSON.parse(JSON.stringify(a));
}
function Hl(a, e = !1) {
  if (typeof a == "boolean") return a;
  const t = String(a ?? "").trim().toLowerCase();
  return t ? ["true", "1", "yes", "y", "on"].includes(t) : e;
}
function od() {
  return Xp(Qp);
}
function Xo(a) {
  const e = String(a ?? "").trim();
  if (!e) return "";
  const t = e.replace(/([a-z0-9])([A-Z])/g, "$1 $2").split(/[^A-Za-z0-9]+/).map((i) => i.trim()).filter(Boolean);
  return t.length ? t.map((i, n) => {
    const r = i.toLowerCase();
    return n === 0 ? r : `${r.charAt(0).toUpperCase()}${r.slice(1)}`;
  }).join("") : "";
}
function Zo(a = []) {
  const e = Array.isArray(a) ? a : String(a ?? "").split(","), t = /* @__PURE__ */ new Set(), i = [];
  for (const n of e) {
    const r = Xo(n);
    !r || t.has(r) || (t.add(r), i.push(r));
  }
  return i;
}
function Zp(a = []) {
  return Zo(a).join(", ");
}
function ld(a, e = "person") {
  const i = String(a ?? "").trim().toLowerCase();
  return i === "battlemech" ? "battlemech" : Object.prototype.hasOwnProperty.call(Sr, i) ? i : e;
}
function eh(a) {
  return [...Sr[ld(a)] ?? []];
}
function th(a = {}, { strict: e = !1, index: t = 0 } = {}) {
  const i = [], n = `Row ${t + 1}`, r = String((a == null ? void 0 : a.id) ?? "").trim(), s = String((a == null ? void 0 : a.label) ?? "").trim(), o = String((a == null ? void 0 : a.actorGroup) ?? "person").trim(), l = ld(o, ""), c = Xo((a == null ? void 0 : a.category) ?? "general") || "general", u = Zo(a == null ? void 0 : a.tags), d = String((a == null ? void 0 : a.icon) ?? "").trim(), m = String((a == null ? void 0 : a.modifierKey) ?? "").trim(), f = Number((a == null ? void 0 : a.order) ?? 0);
  if (r || i.push(`${n}: id cannot be blank.`), s || i.push(`${n}: label cannot be blank.`), (!l || o && !Object.prototype.hasOwnProperty.call(Sr, l)) && i.push(`${n}: actorGroup must be one of ${Object.keys(Sr).join(", ")}.`), m && !(Ra != null && Ra[m]) && i.push(`${n}: modifierKey "${m}" is not a known mechanics-backed status.`), Number.isFinite(f) || i.push(`${n}: order must be numeric.`), e && i.length) {
    const p = new Error(i[0]);
    throw p.validationErrors = i, p;
  }
  return {
    id: r,
    label: s || r || "Status",
    actorGroup: l || "person",
    category: c,
    tags: u,
    icon: d,
    manual: Hl(a == null ? void 0 : a.manual, !0),
    managed: Hl(a == null ? void 0 : a.managed, !1),
    modifierKey: m,
    order: Number.isFinite(f) ? Math.trunc(f) : 0
  };
}
function sa(a = [], { strict: e = !1 } = {}) {
  const t = Array.isArray(a) ? a : [], i = [], n = /* @__PURE__ */ new Set(), r = [];
  if (t.forEach((s, o) => {
    try {
      const l = th(s, { strict: e, index: o });
      if (!l.id) return;
      const c = l.id.toLowerCase();
      if (n.has(c)) {
        e && i.push(`Row ${o + 1}: duplicate id "${l.id}".`);
        return;
      }
      n.add(c), r.push(l);
    } catch (l) {
      e && i.push(...Array.isArray(l.validationErrors) ? l.validationErrors : [l.message]);
    }
  }), e && i.length) {
    const s = new Error(i[0]);
    throw s.validationErrors = i, s;
  }
  return r.sort((s, o) => s.order !== o.order ? s.order - o.order : s.label.localeCompare(o.label));
}
function Fr(a = void 0) {
  var i, n;
  if (a !== void 0) return sa(a, { strict: !1 });
  const e = (i = globalThis.game) == null ? void 0 : i.settings, t = (n = e == null ? void 0 : e.get) == null ? void 0 : n.call(e, T, ad);
  return sa(
    Array.isArray(t) ? t : od(),
    { strict: !1 }
  );
}
function Ur(a, e = Fr()) {
  const t = String(a ?? "").trim();
  return t ? e.find((i) => String(i.id ?? "").trim() === t) ?? null : null;
}
function cd(a = null) {
  return String(
    typeof a == "string" ? a : (a == null ? void 0 : a.type) ?? ""
  ).trim();
}
function jr(a, e = null) {
  const t = cd(e);
  return !t || !a ? !1 : eh(a.actorGroup).includes(t);
}
function ih({ statusId: a = "", actor: e = null, metadata: t = {}, catalogEntry: i = null } = {}) {
  const n = i ?? Ur(a), r = Zo((t == null ? void 0 : t.tags) ?? (n == null ? void 0 : n.tags) ?? []);
  return {
    id: String(a || (n == null ? void 0 : n.id) || "").trim(),
    category: Xo((t == null ? void 0 : t.category) ?? (n == null ? void 0 : n.category) ?? "general") || "general",
    tags: r,
    actorGroup: String((t == null ? void 0 : t.actorGroup) ?? (n == null ? void 0 : n.actorGroup) ?? "").trim(),
    actorType: cd(e),
    scope: String((t == null ? void 0 : t.scope) ?? "").trim(),
    location: String((t == null ? void 0 : t.location) ?? "").trim(),
    itemUuid: String((t == null ? void 0 : t.itemUuid) ?? "").trim(),
    targetUuid: String((t == null ? void 0 : t.targetUuid) ?? "").trim(),
    severity: String((t == null ? void 0 : t.severity) ?? "").trim(),
    notes: String((t == null ? void 0 : t.notes) ?? "").trim()
  };
}
function ah(a = Fr()) {
  return sa(a, { strict: !1 }).map((e) => ({
    id: e.id,
    name: e.label,
    label: e.label,
    img: e.icon,
    icon: e.icon
  }));
}
function Kl() {
  if (typeof CONFIG > "u") return [];
  const a = ah();
  return CONFIG.statusEffects = a, a;
}
const nh = /* @__PURE__ */ new Set(["overloaded", "preparedInterrupt"]);
function Wl(a) {
  return a ? (a == null ? void 0 : a.document) ?? a : null;
}
function rh(a, e) {
  var i, n, r;
  if (!a) return null;
  const t = Wl(e) ?? Wl(a == null ? void 0 : a.token);
  return t ? t.isLinked ? t.baseActor ?? ((r = (i = game.actors) == null ? void 0 : i.get) == null ? void 0 : r.call(i, ((n = t == null ? void 0 : t.baseActor) == null ? void 0 : n.id) ?? "")) ?? t.actor ?? a : t.actor ?? a : a;
}
function el(a) {
  const e = String(a ?? "").trim();
  if (!e) return "Status";
  const n = (e.includes(".") ? e.split(".").at(-1) : e).replace(/^status/i, "").replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim();
  return n ? n.replace(/\b\w/g, (r) => r.toUpperCase()) : e;
}
function sh(a) {
  const e = String((a == null ? void 0 : a.name) ?? (a == null ? void 0 : a.label) ?? (a == null ? void 0 : a.id) ?? "Status").trim();
  return e ? el(e) : "Status";
}
function oh(a) {
  const e = typeof (a == null ? void 0 : a.img) == "string" ? a.img.trim() : "";
  if (e) return e;
  const t = a ? Object.getOwnPropertyDescriptor(a, "icon") : null;
  return "value" in (t ?? {}) ? String(t.value ?? "").trim() : "";
}
function lh(a) {
  var e, t;
  return ((t = (e = globalThis.CSS) == null ? void 0 : e.escape) == null ? void 0 : t.call(e, String(a ?? ""))) ?? String(a ?? "").replace(/["\\]/g, "\\$&");
}
function ud(a) {
  var e;
  return Object.prototype.hasOwnProperty.call(((e = a == null ? void 0 : a.system) == null ? void 0 : e.burn) ?? {}, "overloaded");
}
function dd(a, e) {
  var n;
  const t = String(e ?? "").trim();
  return !a || !t ? null : Array.from(((n = a.effects) == null ? void 0 : n.contents) ?? a.effects ?? []).find((r) => {
    var s, o, l, c, u, d, m;
    return (o = (s = r == null ? void 0 : r.statuses) == null ? void 0 : s.has) != null && o.call(s, t) || Array.isArray(r == null ? void 0 : r.statuses) && r.statuses.includes(t) || ((c = (l = r == null ? void 0 : r.getFlag) == null ? void 0 : l.call(r, T, "status")) == null ? void 0 : c.id) === t || ((m = (d = (u = r == null ? void 0 : r.flags) == null ? void 0 : u[T]) == null ? void 0 : d.status) == null ? void 0 : m.id) === t ? !0 : String((r == null ? void 0 : r.statusId) ?? (r == null ? void 0 : r.id) ?? "").trim() === t;
  }) ?? null;
}
function md(a, e) {
  var i, n, r;
  const t = dd(a, e);
  return ((i = t == null ? void 0 : t.getFlag) == null ? void 0 : i.call(t, T, "status")) ?? ((r = (n = t == null ? void 0 : t.flags) == null ? void 0 : n[T]) == null ? void 0 : r.status) ?? null;
}
function oa(a, e) {
  var t, i, n, r, s, o;
  return e === "overloaded" && ud(a) ? !!((i = (t = a == null ? void 0 : a.system) == null ? void 0 : t.burn) != null && i.overloaded) || !!((r = (n = a == null ? void 0 : a.statuses) == null ? void 0 : n.has) != null && r.call(n, e)) : ((o = (s = a == null ? void 0 : a.statuses) == null ? void 0 : s.has) == null ? void 0 : o.call(s, e)) ?? !1;
}
function ch(a, e) {
  const t = oa(e, a.id), i = md(e, a.id) ?? {};
  return {
    id: a.id,
    label: a.label,
    icon: a.icon,
    active: t,
    managed: !!a.managed || nh.has(a.id),
    manual: !!a.manual,
    legacy: !1,
    category: a.category,
    tags: [...a.tags ?? []],
    scope: String(i.scope ?? "").trim(),
    notes: String(i.notes ?? "").trim()
  };
}
function uh(a, e) {
  const t = (CONFIG.statusEffects ?? []).find((n) => String((n == null ? void 0 : n.id) ?? "").trim() === a) ?? null, i = md(e, a) ?? {};
  return {
    id: a,
    label: t ? sh(t) : el(a),
    icon: t ? oh(t) : "",
    active: oa(e, a),
    managed: !1,
    manual: !1,
    legacy: !0,
    category: "",
    tags: [],
    scope: String(i.scope ?? "").trim(),
    notes: String(i.notes ?? "").trim()
  };
}
function tl(a) {
  const e = /* @__PURE__ */ new Set(), t = Fr(), i = [];
  for (const n of t) {
    const r = String((n == null ? void 0 : n.id) ?? "").trim();
    if (!r || e.has(r)) continue;
    const s = oa(a, r), o = jr(n, a);
    !s && (!o || !n.manual) || (e.add(r), i.push(ch(n, a)));
  }
  for (const n of Array.from((a == null ? void 0 : a.statuses) ?? [])) {
    const r = String(n ?? "").trim();
    !r || e.has(r) || (e.add(r), i.push(uh(r, a)));
  }
  return i.sort((n, r) => n.active !== r.active ? n.active ? -1 : 1 : n.legacy !== r.legacy ? n.legacy ? 1 : -1 : n.label.localeCompare(r.label));
}
function dh(a) {
  if (!a.length)
    return "<p>No token statuses are configured.</p>";
  const e = foundry.utils.escapeHTML;
  return `
    <div class="mwd-token-status-dialog">
      <p style="margin-top: 0;">Toggle the statuses shown on this token.</p>
      <div style="display: grid; gap: 0.2rem; max-height: 20rem; overflow-y: auto; padding-right: 0.25rem;">
        ${a.map((i) => {
    const n = i.active ? "checked" : "", r = i.icon ? `<img src="${e(i.icon)}" alt="" width="20" height="20" style="flex: 0 0 20px; border: 0;" />` : "", s = i.managed ? '<small style="opacity: 0.7;">Managed by system state</small>' : "", o = i.legacy ? '<small style="opacity: 0.7;">Legacy / uncataloged</small>' : "";
    return `
      <div class="mwd-token-status-dialog__row" data-status-id="${e(i.id)}" style="display: grid; gap: 0.2rem; padding: 0.35rem 0; border-bottom: 1px solid rgba(255,255,255,0.08);">
        <label style="display: flex; align-items: center; gap: 0.5rem;">
          <input type="checkbox" name="status.${e(i.id)}.active" value="1" ${n} />
          ${r}
          <span style="flex: 1 1 auto;">${e(i.label)}</span>
          ${s}
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
async function mh({ actor: a, effects: e, selectedStatusIds: t }) {
  const i = new Map(t.map((n) => [n.id, n]));
  for (const n of e) {
    const r = i.get(n.id), s = !!(r != null && r.active);
    await Hr({
      actor: a,
      statusId: n.id,
      active: s,
      metadata: (r == null ? void 0 : r.metadata) ?? {}
    });
  }
}
async function Gl(a, e, t = {}) {
  const i = Ur(e);
  if (!i) return !1;
  const n = dd(a, e);
  if (!n) return !1;
  const r = ih({
    actor: a,
    statusId: e,
    metadata: t,
    catalogEntry: i
  }), s = { [`flags.${T}.status`]: r };
  return typeof n.update == "function" ? (await n.update(s), !0) : n.id && typeof a.updateEmbeddedDocuments == "function" ? (await a.updateEmbeddedDocuments("ActiveEffect", [{ _id: n.id, ...s }]), !0) : !1;
}
async function Hr({ actor: a, statusId: e, active: t, metadata: i = {} }) {
  if (!a || !e) return !1;
  const n = oa(a, e);
  if (!!t === n)
    return t ? Gl(a, e, i) : !1;
  const r = Ur(e), s = r ? jr(r, a) : !1;
  return t && r && !s ? !1 : e === "overloaded" && ud(a) ? (await a.update({ "system.burn.overloaded": !!t }), !0) : (await a.toggleStatusEffect(e, { active: !!t, overlay: !1 }), t && await Gl(a, e, i), !0);
}
function fh(a) {
  var i, n, r, s, o;
  const e = /* @__PURE__ */ new Map(), t = Array.from(((i = a == null ? void 0 : a.querySelectorAll) == null ? void 0 : i.call(a, "[data-status-id]")) ?? []);
  for (const l of t) {
    const c = String(((n = l == null ? void 0 : l.dataset) == null ? void 0 : n.statusId) ?? "").trim();
    if (!c) continue;
    const u = lh(c), d = !!((r = l.querySelector(`input[name="status.${u}.active"]`)) != null && r.checked), m = String(((s = l.querySelector(`input[name="status.${u}.scope"]`)) == null ? void 0 : s.value) ?? "").trim(), f = String(((o = l.querySelector(`input[name="status.${u}.notes"]`)) == null ? void 0 : o.value) ?? "").trim();
    e.set(c, {
      id: c,
      active: d,
      metadata: { scope: m, notes: f }
    });
  }
  return Array.from(e.values());
}
async function fd({ actor: a, token: e } = {}) {
  var n;
  if (!a || !e) return !1;
  const t = rh(a, e), i = tl(t);
  return i.length ? foundry.applications.api.DialogV2.wait({
    window: {
      title: `Token Statuses: ${e.name ?? a.name ?? "Token"}`
    },
    position: {
      width: 420
    },
    content: dh(i),
    buttons: [
      {
        action: "apply",
        label: "Apply",
        icon: "fa-solid fa-check",
        default: !0,
        callback: async (r, s) => {
          var o;
          try {
            const l = fh(s.form);
            return await mh({ actor: t, effects: i, selectedStatusIds: l }), !0;
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
function ph() {
  typeof Hooks > "u" || Hooks.on("renderTokenHUD", (a, e, t = {}) => {
    var d, m, f, p, h;
    const i = (t == null ? void 0 : t._id) ?? (t == null ? void 0 : t.id) ?? "", n = ((m = (d = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : d.get) == null ? void 0 : m.call(d, i)) ?? null, r = (n == null ? void 0 : n.actor) ?? null;
    if (!r) return;
    const s = Fr(), o = new Map(s.map((g) => [g.id, g])), c = typeof jQuery < "u" && e instanceof jQuery ? e[0] : e;
    if (!(c instanceof HTMLElement)) return;
    const u = c.querySelectorAll("[data-status-id], [data-statusId], [data-effect-id]");
    for (const g of u) {
      const y = String(
        ((f = g.dataset) == null ? void 0 : f.statusId) ?? ((p = g.dataset) == null ? void 0 : p.statusid) ?? ((h = g.dataset) == null ? void 0 : h.effectId) ?? ""
      ).trim();
      if (!y) continue;
      const b = o.get(y);
      if (!b) continue;
      !oa(r, y) && !jr(b, r) && (g.hidden = !0, g.style.display = "none");
    }
  });
}
const hh = Object.freeze({
  STR: Pi.strength,
  REF: Pi.reflexes,
  WIL: Pi.willpower,
  INT: Pi.intelligence,
  CHA: Pi.charisma
}), gh = Object.freeze({
  STR: "Strength",
  REF: "Reflexes",
  WIL: "Willpower",
  INT: "Intelligence",
  CHA: "Charisma"
}), yh = Object.freeze({
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
function il(a) {
  const e = String(a ?? "").trim();
  return e ? yh[e] ?? null : null;
}
function bh(a) {
  const e = il(a);
  return e ? {
    intent: "common",
    id: e.id
  } : null;
}
function Sh(a) {
  return hh[String(a ?? "").trim().toUpperCase()] ?? null;
}
function Ah(a) {
  return gh[String(a ?? "").trim().toUpperCase()] ?? String(a ?? "").trim().toUpperCase();
}
function Th(a = []) {
  return (Array.isArray(a) ? a : []).map((e) => String(e ?? "").trim().toUpperCase()).filter(Boolean).join(" + ");
}
const al = Object.freeze([
  { value: "positive", label: "Positive" },
  { value: "negative", label: "Negative" },
  { value: "narrative", label: "Narrative" }
]), nl = Object.freeze([
  { value: "minor", label: "Minor" },
  { value: "major", label: "Major" }
]), pd = Object.freeze([
  { value: "passive", label: "Passive" },
  { value: "triggered", label: "Triggered" }
]), hd = Object.freeze([
  { value: "rollMod", label: "Roll Modifier" },
  { value: "burnAdjust", label: "Burn Adjust" },
  { value: "actionCostMod", label: "Action Cost Mod" },
  { value: "initiativeMod", label: "Initiative Mod" },
  { value: "damageMod", label: "Damage Intake Mod" },
  { value: "edgeEvent", label: "Edge Event" }
]), gd = Object.freeze([
  { value: "onBuildRoll", label: "Build Roll" },
  { value: "onBeforeBurnApplied", label: "Before Burn Applied" },
  { value: "onBeforeActionCostFinalized", label: "Before Action Cost Finalized" },
  { value: "onInitiativeResolved", label: "Initiative Resolved" },
  { value: "onDamageResolved", label: "Damage Resolved" },
  { value: "onEndOfActivation", label: "End of Activation" },
  { value: "onEdgeSpend", label: "Edge Spend" },
  { value: "onEdgeGain", label: "Edge Gain" }
]), rl = Object.freeze([
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
]), yd = Object.freeze([
  { value: "adjustAmount", label: "Adjust Amount" },
  { value: "grantPool", label: "Grant Pool" }
]), wh = new Set(al.map((a) => a.value)), kh = new Set(nl.map((a) => a.value)), vh = new Set(pd.map((a) => a.value)), Mh = new Set(hd.map((a) => a.value)), bd = new Set(gd.map((a) => a.value)), Ch = new Set(rl.map((a) => a.value)), Eh = new Set(yd.map((a) => a.value));
function de(a, e = "") {
  return String(a ?? "").trim() || e;
}
function Se(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function Ar(a) {
  return foundry.utils.deepClone(a);
}
function Sd(a = []) {
  return (Array.isArray(a) ? a : typeof a == "string" ? a.split(",") : []).map((t) => String(t ?? "").trim()).filter(Boolean);
}
function Ph(a) {
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
function fs(a) {
  const e = Math.max(0, Math.trunc(Se(a, 0)));
  return e > 0 ? e : 0;
}
function _i(a = {}) {
  const e = a && typeof a == "object" ? a : {};
  return {
    perActivation: fs(e.perActivation),
    perRound: fs(e.perRound),
    perScene: fs(e.perScene)
  };
}
function Rh(a = {}) {
  const e = a && typeof a == "object" ? a : {}, t = {
    id: de(e.id, foundry.utils.randomID()),
    fact: de(e.fact)
  }, i = rl.find((r) => e[r.value] !== void 0 && e[r.value] !== null), n = (i == null ? void 0 : i.value) ?? (Ch.has(String(e.comparator ?? "").trim()) ? String(e.comparator).trim() : "eq");
  return t.comparator = n, n !== "truthy" && n !== "falsy" && (t.value = Ph(e[n] ?? e.value ?? "")), t;
}
function bi(a = []) {
  return (Array.isArray(a) ? a : []).map(Rh);
}
function Nh(a = {}) {
  const e = a && typeof a == "object" ? a : {}, t = Mh.has(String(e.type ?? "").trim()) ? String(e.type).trim() : "rollMod", i = Ih(t), n = bd.has(String(e.phase ?? "").trim()) ? String(e.phase).trim() : i, r = Eh.has(String(e.operation ?? "").trim()) ? String(e.operation).trim() : "adjustAmount";
  return {
    id: de(e.id, foundry.utils.randomID()),
    type: t,
    phase: n,
    selector: de(e.selector),
    skillKeys: Sd(e.skillKeys),
    label: de(e.label),
    value: Se(e.value, 0),
    min: e.min === void 0 || e.min === null || e.min === "" ? null : Se(e.min, 0),
    max: e.max === void 0 || e.max === null || e.max === "" ? null : Se(e.max, 0),
    pool: de(e.pool),
    operation: r,
    conditions: bi(e.conditions),
    limit: _i(e.limit)
  };
}
function Ad(a = {}) {
  const e = de(a == null ? void 0 : a.selector);
  return e === "intent.skill" || e.startsWith("intent.skill.");
}
function Ki(a = []) {
  return (Array.isArray(a) ? a : []).map(Nh).filter((t) => t.phase && t.type);
}
function qt(a = {}) {
  const e = a && typeof a == "object" ? Ar(a) : {}, t = e.positive === !1 ? "negative" : "positive", i = wh.has(String(e.category ?? "").trim()) ? String(e.category).trim() : t, n = kh.has(String(e.tier ?? "").trim()) ? String(e.tier).trim() : "minor", r = vh.has(String(e.activation ?? "").trim()) ? String(e.activation).trim() : "passive";
  return {
    ...e,
    positive: i === "positive",
    category: i,
    tier: n,
    activation: r,
    tags: Sd(e.tags),
    effects: Ki(e.effects),
    prerequisites: bi(e.prerequisites),
    limits: _i(e.limits)
  };
}
function Td() {
  return {
    categories: [...al],
    tiers: [...nl],
    activations: [...pd],
    effectTypes: [...hd],
    phases: [...gd],
    comparators: [...rl],
    edgeOperations: [...yd]
  };
}
function Jn(a = "") {
  var e;
  return ((e = al.find((t) => t.value === a)) == null ? void 0 : e.label) ?? "Positive";
}
function Xn(a = "") {
  var e;
  return ((e = nl.find((t) => t.value === a)) == null ? void 0 : e.label) ?? "Minor";
}
function Ih(a = "") {
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
function Dh(a) {
  return Array.from((a == null ? void 0 : a.items) ?? []).filter((e) => ((e == null ? void 0 : e.canonicalType) ?? (e == null ? void 0 : e.type)) === "quality").map((e) => ({
    item: e,
    system: qt(e.system ?? {})
  }));
}
function Oh(a = {}, e = {}) {
  const t = _i(a), i = _i(e);
  return {
    perActivation: i.perActivation || t.perActivation,
    perRound: i.perRound || t.perRound,
    perScene: i.perScene || t.perScene
  };
}
function wd(a = {}) {
  var n, r, s;
  const e = de(a.combatId ?? ((n = a.combat) == null ? void 0 : n.id)), t = Math.max(0, Math.trunc(Se(a.round ?? ((r = a.combat) == null ? void 0 : r.round), 0))), i = de(a.sceneId ?? ((s = canvas == null ? void 0 : canvas.scene) == null ? void 0 : s.id));
  return {
    activationKey: de(a.activationKey),
    roundKey: e ? `${e}:${t}` : "",
    sceneKey: i
  };
}
function Lh(a, e = {}) {
  var r, s, o, l;
  const t = ((r = a == null ? void 0 : a.flags) == null ? void 0 : r[T]) ?? {}, i = ((s = t == null ? void 0 : t.traitUsage) == null ? void 0 : s.scene) ?? {}, n = e.state ?? {};
  return {
    activation: ((o = n == null ? void 0 : n.traitUsage) == null ? void 0 : o.activation) ?? {},
    round: ((l = n == null ? void 0 : n.traitUsage) == null ? void 0 : l.round) ?? {},
    scene: i
  };
}
function _h(a, e, t, i) {
  var n, r, s, o, l;
  switch (t) {
    case "perActivation":
      return Math.max(0, Math.trunc(Se((n = a.activation) == null ? void 0 : n[i], 0)));
    case "perRound":
      return Math.max(0, Math.trunc(Se((s = (r = a.round) == null ? void 0 : r[e.roundKey]) == null ? void 0 : s[i], 0)));
    case "perScene":
      return Math.max(0, Math.trunc(Se((l = (o = a.scene) == null ? void 0 : o[e.sceneKey]) == null ? void 0 : l[i], 0)));
    default:
      return 0;
  }
}
function xh(a, e, t, i) {
  const n = [];
  for (const r of ["perActivation", "perRound", "perScene"]) {
    const s = Math.max(0, Math.trunc(Se(t == null ? void 0 : t[r], 0)));
    if (!s) continue;
    _h(a, e, r, i) >= s && n.push(`${r} limit reached`);
  }
  return n;
}
function $h(a, e, t) {
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
function ql(a, e) {
  if (!de(a == null ? void 0 : a.fact)) return !0;
  const t = foundry.utils.getProperty(e, a.fact);
  return $h(t, a.comparator, a.value);
}
function Bh(a = "", e = {}) {
  const t = de(a);
  return t ? (Array.isArray(e == null ? void 0 : e.selectors) ? e.selectors : []).some(
    (n) => n === t || n.startsWith(`${t}.`)
  ) : !0;
}
function kd(a, e) {
  return `${a.id}:${e.id}`;
}
function zh(a, e) {
  var t;
  return !!((t = a.system) != null && t.inactive) || !!(e != null && e.inactive);
}
function Vl(a = []) {
  return a.map((e) => e.fact).filter(Boolean).join(", ");
}
function ga(a, e, t) {
  const i = Se(a[e], 0);
  let n = i;
  return typeof t.value == "number" && (n += t.value), typeof t.min == "number" && (n = Math.max(t.min, n)), typeof t.max == "number" && (n = Math.min(t.max, n)), a[e] = n, n - i;
}
function vi(a, e, t, i, n) {
  i && a.push({
    id: `trait:${n}:${e.id}:${t.id}`,
    label: t.label || e.name,
    value: i,
    source: e.name,
    traitItemId: e.id,
    traitEffectId: t.id
  });
}
function Fh({ item: a, effect: e, phase: t, packet: i, result: n }) {
  switch (e.type) {
    case "rollMod": {
      const r = Se(e.value, 0);
      return vi(n.modifiers, a, e, r, t), r;
    }
    case "burnAdjust": {
      if (t === "onEndOfActivation") {
        const s = ga(i, "burnDelta", e);
        return vi(n.modifiers, a, e, s, t), s;
      }
      const r = ga(i, "amount", e);
      return vi(n.modifiers, a, e, r, t), r;
    }
    case "actionCostMod": {
      const r = ga(i, "cost", e);
      return vi(n.modifiers, a, e, r, t), r;
    }
    case "initiativeMod": {
      const r = ga(i, "total", e);
      return vi(n.modifiers, a, e, r, t), r;
    }
    case "damageMod": {
      const r = ga(i, "amount", e);
      return vi(n.modifiers, a, e, r, t), r;
    }
    case "edgeEvent": {
      if (t === "onEndOfActivation" && e.operation === "grantPool" && e.pool)
        return i.edgeAdjustments ?? (i.edgeAdjustments = []), i.edgeAdjustments.push({
          poolKey: e.pool,
          amount: Se(e.value, 0),
          label: e.label || a.name,
          source: a.name
        }), vi(n.modifiers, a, e, Se(e.value, 0), t), Se(e.value, 0);
      const r = ga(i, "amount", e);
      return vi(n.modifiers, a, e, r, t), r;
    }
    default:
      return 0;
  }
}
function Uh(a, e, t) {
  const i = kd(a, e), n = [];
  return t.perActivation > 0 && n.push({ kind: "usage", scope: "perActivation", key: i, delta: 1 }), t.perRound > 0 && n.push({ kind: "usage", scope: "perRound", key: i, delta: 1 }), t.perScene > 0 && n.push({ kind: "usage", scope: "perScene", key: i, delta: 1 }), n;
}
function vd(a = "") {
  const e = de(a);
  return e ? [`action.${e}`] : [];
}
function ma(a, e = {}) {
  var o, l, c, u, d;
  const t = e.snapshot ?? null, i = e.state ?? (t == null ? void 0 : t.state) ?? {}, n = Array.isArray(i == null ? void 0 : i.actionLog) ? i.actionLog.map((m) => de(m == null ? void 0 : m.id)).filter(Boolean) : [], r = (i == null ? void 0 : i.actionState) ?? {}, s = [];
  return r != null && r.aim && s.push("state.aim"), r != null && r.preparedInterrupt && s.push("state.preparedInterrupt"), {
    activation: {
      moved: n.includes("move") || !!((o = r == null ? void 0 : r.move) != null && o.moved),
      saSpent: Math.max(0, Math.trunc(Se(i == null ? void 0 : i.saSpentThisActivation, 0))),
      attacksThisActivation: Math.max(0, Math.trunc(Se(i == null ? void 0 : i.attacksThisActivation, 0))),
      burnThisActivation: Math.max(0, Math.trunc(Se(i == null ? void 0 : i.burnThisActivation, 0)))
    },
    actionState: {
      aim: (r == null ? void 0 : r.aim) ?? null,
      move: (r == null ? void 0 : r.move) ?? null,
      preparedInterrupt: (r == null ? void 0 : r.preparedInterrupt) ?? null
    },
    burn: {
      current: Math.max(0, Math.trunc(Se((c = (l = a == null ? void 0 : a.system) == null ? void 0 : l.burn) == null ? void 0 : c.value, 0))),
      overloaded: !!((d = (u = a == null ? void 0 : a.system) == null ? void 0 : u.burn) != null && d.overloaded)
    },
    timing: {
      firstAttackThisActivation: Math.max(0, Math.trunc(Se(i == null ? void 0 : i.attacksThisActivation, 0))) === 0,
      firstExtraSAThisActivation: Math.max(0, Math.trunc(Se(i == null ? void 0 : i.saSpentThisActivation, 0))) <= 3
    },
    selectors: s
  };
}
function sl({ actor: a, resolved: e, payload: t, runtime: i = {} } = {}) {
  var d, m, f, p, h, g, y, b, S, w, k, P;
  const n = ma(a, i), r = de((e == null ? void 0 : e.intent) ?? (t == null ? void 0 : t.intent), "skill"), s = Array.isArray(e == null ? void 0 : e.domains) ? e.domains : [], o = de(((d = e == null ? void 0 : e.attack) == null ? void 0 : d.rangeBand) ?? (t == null ? void 0 : t.rangeBand)), l = de(((f = (m = t == null ? void 0 : t.edge) == null ? void 0 : m.pre) == null ? void 0 : f.poolKey) ?? ((p = t == null ? void 0 : t.edge) == null ? void 0 : p.poolKey) ?? ""), c = de(
    ((h = e == null ? void 0 : e.data) == null ? void 0 : h.skillKey) ?? ((g = e == null ? void 0 : e.specialization) == null ? void 0 : g.skillKey) ?? (r === "skill" ? t == null ? void 0 : t.key : "")
  ), u = de(
    ((S = (b = (y = e == null ? void 0 : e.breakdown) == null ? void 0 : y.find) == null ? void 0 : b.call(y, (E) => (E == null ? void 0 : E.id) === "skill")) == null ? void 0 : S.label) ?? (e == null ? void 0 : e.title)
  );
  return n.intent = r, n.domains = s, n.rangeBand = o, n.skill = {
    key: c,
    label: u
  }, n.edge = {
    stage: (w = t == null ? void 0 : t.toggles) != null && w.useEdge ? "pre" : "",
    pool: l,
    spent: !!((k = t == null ? void 0 : t.toggles) != null && k.useEdge)
  }, n.selectors.push(`intent.${r}`), s.forEach((E) => n.selectors.push(`domain.${E}`)), o && n.selectors.push(`range.${o}`), r === "skill" && c && n.selectors.push(`skill.${c}`), (P = t == null ? void 0 : t.toggles) != null && P.useEdge && n.selectors.push("edge.pre"), n;
}
function Md({ actor: a, packet: e = {}, runtime: t = {} } = {}) {
  const i = ma(a, t);
  return i.action = {
    id: de(e.actionId),
    category: de(e.category),
    resource: de(e.resource),
    cost: Se(e.cost, 0),
    effectiveCost: Se(e.effectiveCost ?? e.cost, 0)
  }, i.selectors.push(...vd(e.actionId)), i.action.category && i.selectors.push(`actionCategory.${i.action.category}`), i.action.resource && i.selectors.push(`actionResource.${i.action.resource}`), i;
}
function Zn({ actor: a, packet: e = {}, runtime: t = {} } = {}) {
  const i = ma(a, t);
  return i.action = {
    id: de(e.actionId),
    category: de(e.category),
    resource: de(e.resource)
  }, i.burn = {
    ...i.burn,
    amount: Se(e.amount, 0),
    source: de(e.source)
  }, e.source === "extraSA" && e.extraSaIndex === 1 && i.selectors.push("activation.extraSA:first"), e.source && i.selectors.push(`burn.${e.source}`), i.action.id && i.selectors.push(...vd(i.action.id)), i.action.category && i.selectors.push(`actionCategory.${i.action.category}`), i.action.category === "reaction" && i.selectors.push(`reaction.${i.action.id}`), i;
}
function Cd({ actor: a, packet: e = {}, runtime: t = {} } = {}) {
  const i = ma(a, t);
  return i.intent = "initiative", i.domains = ["combat"], i.initiative = {
    total: Se(e.total, 0)
  }, i.selectors.push("intent.initiative"), i;
}
function Ed({ actor: a, packet: e = {}, runtime: t = {} } = {}) {
  const i = ma(a, t);
  return i.damage = {
    amount: Se(e.amount, 0),
    track: de(e.track),
    damageType: de(e.damageType)
  }, i.selectors.push("incoming"), i;
}
function Qs({ actor: a, packet: e = {}, phase: t = "onEdgeGain", runtime: i = {} } = {}) {
  const n = ma(a, i);
  return n.edge = {
    pool: de(e.poolKey),
    amount: Se(e.amount, 0),
    eventKey: de(e.eventKey),
    source: de(e.source)
  }, n.selectors.push(t === "onEdgeSpend" ? "edge.spend" : "edge.gain"), n.edge.eventKey && n.selectors.push(`event.${n.edge.eventKey}`), n;
}
function Pd({ actor: a, packet: e = {}, runtime: t = {} } = {}) {
  const i = ma(a, t);
  return i.event = {
    phase: "endOfActivation"
  }, i.selectors.push("endOfActivation"), Se(e.burnDelta, 0) !== 0 && i.selectors.push("burn.adjust"), i;
}
function Bt({ actor: a, phase: e, facts: t = {}, packet: i = {}, options: n = {} } = {}) {
  var u;
  const r = {
    packet: Ar(i),
    modifiers: [],
    mutations: [],
    applied: [],
    skipped: []
  };
  if (!a || !bd.has(String(e ?? "").trim()))
    return r;
  const s = n.runtime ?? {}, o = Lh(a, s), l = wd(s), c = Dh(a);
  for (const { item: d, system: m } of c) {
    if (zh(d, m)) {
      r.skipped.push({
        traitItemId: d.id,
        traitEffectId: "",
        label: d.name,
        reason: "Trait is inactive"
      });
      continue;
    }
    const f = m.prerequisites.filter((p) => de(p == null ? void 0 : p.fact)).filter((p) => !ql(p, t));
    if (f.length) {
      r.skipped.push({
        traitItemId: d.id,
        traitEffectId: "",
        label: d.name,
        reason: `Prerequisites not met: ${Vl(f)}`
      });
      continue;
    }
    for (const p of m.effects.filter((h) => h.phase === e)) {
      if (!Bh(p.selector, t)) {
        r.skipped.push({
          traitItemId: d.id,
          traitEffectId: p.id,
          label: p.label || d.name,
          reason: `Selector did not match (${p.selector || "any"})`
        });
        continue;
      }
      if (Ad(p) && p.skillKeys.length) {
        const w = de((u = t == null ? void 0 : t.skill) == null ? void 0 : u.key);
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
      const h = p.conditions.filter((w) => de(w == null ? void 0 : w.fact)).filter((w) => !ql(w, t));
      if (h.length) {
        r.skipped.push({
          traitItemId: d.id,
          traitEffectId: p.id,
          label: p.label || d.name,
          reason: `Conditions not met: ${Vl(h)}`
        });
        continue;
      }
      const g = Oh(m.limits, p.limit), y = kd(d, p), b = xh(o, l, g, y);
      if (b.length) {
        r.skipped.push({
          traitItemId: d.id,
          traitEffectId: p.id,
          label: p.label || d.name,
          reason: b.join(", ")
        });
        continue;
      }
      const S = Fh({
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
        value: S,
        phase: e,
        source: d.name
      }), n.consumeUsage && r.mutations.push(...Uh(d, p, g));
    }
  }
  return r;
}
async function Ai({ actor: a, mutations: e = [], runtime: t = {} } = {}) {
  var o, l, c, u, d, m, f, p, h;
  if (!a || !Array.isArray(e) || !e.length) return;
  const i = e.filter((g) => (g == null ? void 0 : g.kind) === "usage");
  if (!i.length) return;
  const n = Ar(((c = (l = (o = a.flags) == null ? void 0 : o[T]) == null ? void 0 : l.traitUsage) == null ? void 0 : c.scene) ?? {}), r = t.state ? Ar(t.state) : null, s = wd(t);
  for (const g of i) {
    const y = de(g.key), b = Math.max(0, Math.trunc(Se(g.delta, 0)));
    if (!(!y || !b))
      switch (g.scope) {
        case "perActivation": {
          if (!r) break;
          r.traitUsage ?? (r.traitUsage = {}), (u = r.traitUsage).activation ?? (u.activation = {}), r.traitUsage.activation[y] = Math.max(0, Se(r.traitUsage.activation[y], 0) + b);
          break;
        }
        case "perRound": {
          if (!r || !s.roundKey) break;
          r.traitUsage ?? (r.traitUsage = {}), (d = r.traitUsage).round ?? (d.round = {}), (m = r.traitUsage.round)[f = s.roundKey] ?? (m[f] = {}), r.traitUsage.round[s.roundKey][y] = Math.max(
            0,
            Se(r.traitUsage.round[s.roundKey][y], 0) + b
          );
          break;
        }
        case "perScene": {
          if (!s.sceneKey) break;
          n[p = s.sceneKey] ?? (n[p] = {}), n[s.sceneKey][y] = Math.max(0, Se(n[s.sceneKey][y], 0) + b);
          break;
        }
      }
  }
  r && ((h = t.combatant) != null && h.id) && await t.combatant.setFlag(T, "personalCombat", r), await a.setFlag(T, "traitUsage", { scene: n });
}
const Rd = "personalActionCatalog", xe = Object.freeze({
  standard: "standard",
  complex: "complex",
  free: "free",
  reaction: "reaction",
  recovery: "recovery"
}), Js = Object.freeze([
  { value: xe.standard, label: "Standard" },
  { value: xe.complex, label: "Complex" },
  { value: xe.free, label: "Free" },
  { value: xe.reaction, label: "Reaction" },
  { value: xe.recovery, label: "Burn & Recovery" }
]), Nd = Object.freeze([
  { value: "", label: "Not Implemented / Placeholder" },
  { value: "combatAction", label: "Generic Action" },
  { value: "combatAttack", label: "Attack Pipeline" },
  { value: "combatEvade", label: "Evade" },
  { value: "combatAssist", label: "Assist" },
  { value: "combatInterrupt", label: "Interrupt" },
  { value: "combatReduceBurn", label: "Reduce Burn" },
  { value: "combatOverloadCheck", label: "Overload Check" }
]), Yl = new Set(Js.map((a) => a.value)), Ql = new Set(Nd.map((a) => a.value)), Id = Object.freeze([
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
].map((a) => Object.freeze(Kr(a)))), jh = new Map(Id.map((a) => [a.id, a]));
function Kr(a) {
  return JSON.parse(JSON.stringify(a ?? null));
}
function Jl(a, e = !1) {
  if (typeof a == "boolean") return a;
  const t = String(a ?? "").trim().toLowerCase();
  return ["true", "1", "yes", "y", "on"].includes(t) ? !0 : ["false", "0", "no", "n", "off", ""].includes(t) ? !1 : e;
}
function Hh(a, e = null) {
  var i;
  const t = String((a == null ? void 0 : a.rollIntent) ?? ((i = a == null ? void 0 : a.roll) == null ? void 0 : i.intent) ?? (e == null ? void 0 : e.intent) ?? "").trim();
  return t ? { intent: t } : null;
}
function Kh(a, { strict: e = !1, index: t = 0 } = {}) {
  const i = String((a == null ? void 0 : a.id) ?? "").trim(), n = jh.get(i) ?? {}, r = `Row ${t + 1}`, s = [];
  i || s.push(`${r}: id cannot be blank.`);
  const o = String((a == null ? void 0 : a.category) ?? n.category ?? "").trim();
  Yl.has(o) || s.push(`${r}: category must be one of ${Array.from(Yl).join(", ")}.`);
  const l = String((a == null ? void 0 : a.label) ?? n.label ?? "").trim();
  l || s.push(`${r}: label cannot be blank.`);
  const c = (a == null ? void 0 : a.cost) ?? n.cost ?? 0, u = Number(c);
  (!Number.isFinite(u) || u < 0) && s.push(`${r}: cost must be a non-negative number.`);
  const d = String((a == null ? void 0 : a.handler) ?? n.handler ?? "").trim();
  if (Ql.has(d) || s.push(`${r}: handler must be one of ${Array.from(Ql).map((p) => p || "(blank)").join(", ")}.`), s.length) {
    if (e) {
      const p = new Error(s[0]);
      throw p.validationErrors = s, p;
    }
    return null;
  }
  const m = {
    ...Kr(n),
    id: i,
    label: l,
    category: o,
    cost: Math.trunc(u),
    handler: d,
    description: String((a == null ? void 0 : a.description) ?? n.description ?? "").trim(),
    reason: String((a == null ? void 0 : a.reason) ?? n.reason ?? "").trim(),
    prominent: Jl(a == null ? void 0 : a.prominent, !!n.prominent),
    prominentWhenBurning: Jl(a == null ? void 0 : a.prominentWhenBurning, !!n.prominentWhenBurning)
  };
  m.id === "opportunity" && !m.handler && (m.handler = "combatAttack", m.reason = ""), m.id === "opportunity" && m.handler === "combatAttack" && m.reason === "Opportunity attacks are not yet implemented." && (m.reason = ""), m.id === "assist" && !m.handler && (m.handler = "combatAssist", m.reason = ""), m.id === "assist" && m.handler === "combatAssist" && m.reason === "Reaction assist effects are not yet implemented." && (m.reason = ""), m.id === "interrupt" && !m.handler && (m.handler = "combatInterrupt", m.reason = ""), m.id === "interrupt" && m.handler === "combatInterrupt" && m.reason === "Prepared interrupt resolution is not yet implemented." && (m.reason = "");
  const f = Hh(a, n.roll ?? null);
  return f ? m.roll = f : delete m.roll, m.reason || delete m.reason, m.description || delete m.description, m.prominent || delete m.prominent, m.prominentWhenBurning || delete m.prominentWhenBurning, m;
}
function ol() {
  return Kr(Id);
}
function Rn(a, { strict: e = !1 } = {}) {
  if (!Array.isArray(a)) {
    if (e) {
      const r = new Error("Action catalog must be an array.");
      throw r.validationErrors = [r.message], r;
    }
    return ol();
  }
  const t = [], i = /* @__PURE__ */ new Set(), n = [];
  if (a.forEach((r, s) => {
    try {
      const o = Kh(r, { strict: e, index: s });
      if (!o) return;
      const l = o.id.toLowerCase();
      if (i.has(l)) {
        const c = `Row ${s + 1}: duplicate action id "${o.id}".`;
        e && n.push(c);
        return;
      }
      i.add(l), t.push(o);
    } catch (o) {
      e && n.push(...Array.isArray(o.validationErrors) ? o.validationErrors : [o.message]);
    }
  }), n.length) {
    const r = new Error(n[0]);
    throw r.validationErrors = n, r;
  }
  return t;
}
function Dd() {
  var a, e;
  try {
    const t = (e = (a = game == null ? void 0 : game.settings) == null ? void 0 : a.get) == null ? void 0 : e.call(a, T, Rd);
    return Rn(t, { strict: !1 });
  } catch {
    return ol();
  }
}
function er(a) {
  const e = String(a ?? "").trim();
  return Dd().find((t) => t.id === e) ?? null;
}
function Wh(a) {
  return Dd().filter((e) => e.category === a).map((e) => Object.freeze(Kr(e)));
}
const ta = "hazard";
function Gh(a) {
  return a && typeof a == "object" ? a : {};
}
function $i(a) {
  var n, r, s;
  const e = ((n = a == null ? void 0 : a.getFlag) == null ? void 0 : n.call(a, "mwd", ta)) ?? ((s = (r = a == null ? void 0 : a.flags) == null ? void 0 : r.mwd) == null ? void 0 : s[ta]) ?? null;
  if (!e || typeof e != "object") return null;
  const t = Ti(e.areaEffect ?? { kind: It.persistent, hazard: e.hazardDef }), i = He(
    e.templateGeometry,
    {
      template: e.template,
      placement: e.templatePlacement
    }
  ) ?? null;
  return {
    ...foundry.utils.deepClone(Gh(e)),
    areaEffect: t,
    hazardDef: Ko(e.hazardDef ?? t.hazard ?? {}),
    templateGeometry: i
  };
}
function qh(a) {
  return !!$i(a);
}
async function ps(a) {
  var i, n, r;
  const e = ((i = a == null ? void 0 : a.getFlag) == null ? void 0 : i.call(a, "mwd", ta)) ?? ((r = (n = a == null ? void 0 : a.flags) == null ? void 0 : n.mwd) == null ? void 0 : r[ta]) ?? null;
  if (!e || typeof e != "object") return null;
  if (e != null && e.templateGeometry) return $i(a);
  const t = $i(a);
  return !(t != null && t.templateGeometry) || !(a != null && a.setFlag) ? t : (await a.setFlag("mwd", ta, {
    ...foundry.utils.deepClone(e),
    templateGeometry: oi(t.templateGeometry)
  }), $i(a));
}
async function Vh({ attacker: a = null, attack: e = {}, targetResult: t = null } = {}) {
  var c, u, d, m, f, p, h, g, y, b, S, w;
  const i = (canvas == null ? void 0 : canvas.scene) ?? null;
  if (!i) return null;
  const n = He(
    e == null ? void 0 : e.templateGeometry,
    {
      template: e == null ? void 0 : e.template,
      placement: e == null ? void 0 : e.templatePlacement
    }
  ), r = Ti((e == null ? void 0 : e.areaEffect) ?? ((c = e == null ? void 0 : e.payload) == null ? void 0 : c.areaEffect) ?? {});
  if (r.kind !== It.persistent || !n) return null;
  const s = Lr(n);
  if (!s.length) return null;
  const o = {
    sourceActorUuid: (a == null ? void 0 : a.uuid) ?? null,
    sourceItemUuid: ((u = e == null ? void 0 : e.weapon) == null ? void 0 : u.uuid) ?? null,
    payloadId: ((d = e == null ? void 0 : e.payloadState) == null ? void 0 : d.activePayloadId) ?? ((m = e == null ? void 0 : e.payload) == null ? void 0 : m.id) ?? "",
    templateGeometry: oi(n),
    templatePlacement: foundry.utils.deepClone((e == null ? void 0 : e.templatePlacement) ?? null),
    template: foundry.utils.deepClone((e == null ? void 0 : e.template) ?? null),
    damage: Number(((f = t == null ? void 0 : t.damage) == null ? void 0 : f.effectiveWeaponDamage) ?? ((p = e == null ? void 0 : e.weapon) == null ? void 0 : p.damage) ?? 0) || 0,
    ap: Number((e == null ? void 0 : e.totalAp) ?? ((h = e == null ? void 0 : e.weapon) == null ? void 0 : h.ap) ?? 0) || 0,
    damageType: String(((g = t == null ? void 0 : t.damage) == null ? void 0 : g.damageType) ?? ((y = e == null ? void 0 : e.weapon) == null ? void 0 : y.damageType) ?? "concussive").trim() || "concussive",
    label: `${String(((b = e == null ? void 0 : e.weapon) == null ? void 0 : b.name) ?? "Hazard").trim() || "Hazard"} (${Ft(((S = r.hazard) == null ? void 0 : S.startExposure) ?? "minor")})`,
    areaEffect: r,
    hazardDef: r.hazard
  }, [l] = await i.createEmbeddedDocuments("Region", [{
    name: o.label,
    color: ((w = game.user) == null ? void 0 : w.color) ?? "#d86a2c",
    shapes: s,
    flags: {
      mwd: {
        [ta]: o
      }
    }
  }]);
  return l ?? null;
}
function Xl(a = null) {
  var r, s, o, l;
  const e = (a == null ? void 0 : a.document) ?? a ?? null;
  if (!e) return [];
  const t = (e == null ? void 0 : e.parent) ?? (canvas == null ? void 0 : canvas.scene) ?? null;
  if (!t) return [];
  const i = ((r = e == null ? void 0 : e.object) == null ? void 0 : r.center) ?? (e == null ? void 0 : e.center) ?? {
    x: Number((e == null ? void 0 : e.x) ?? 0) + (Number((e == null ? void 0 : e.width) ?? 1) || 1) * (Number(((s = canvas == null ? void 0 : canvas.grid) == null ? void 0 : s.size) ?? 100) || 100) / 2,
    y: Number((e == null ? void 0 : e.y) ?? 0) + (Number((e == null ? void 0 : e.height) ?? 1) || 1) * (Number(((o = canvas == null ? void 0 : canvas.grid) == null ? void 0 : o.size) ?? 100) || 100) / 2
  }, n = {
    x: Number((i == null ? void 0 : i.x) ?? 0) || 0,
    y: Number((i == null ? void 0 : i.y) ?? 0) || 0,
    elevation: Number((e == null ? void 0 : e.elevation) ?? ((l = e == null ? void 0 : e.object) == null ? void 0 : l.elevation) ?? 0) || 0
  };
  return Array.from(t.regions ?? []).filter(qh).filter((c) => {
    var u, d, m;
    if ((d = (u = c == null ? void 0 : c.tokens) == null ? void 0 : u.has) != null && d.call(u, e)) return !0;
    try {
      return ((m = c == null ? void 0 : c.testPoint) == null ? void 0 : m.call(c, n)) ?? !1;
    } catch {
      return !1;
    }
  });
}
function Mi(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function Yh({ actor: a = null, token: e = null } = {}) {
  var r;
  const t = (e == null ? void 0 : e.document) ?? e ?? null, i = String(((r = t == null ? void 0 : t.texture) == null ? void 0 : r.src) ?? "").trim(), n = String((a == null ? void 0 : a.img) ?? "").trim();
  return i || n || "icons/svg/mystery-man.svg";
}
function Qh(a = []) {
  return Array.isArray(a) ? a.map((e) => ({
    key: String((e == null ? void 0 : e.key) ?? "").trim(),
    label: String((e == null ? void 0 : e.label) ?? (e == null ? void 0 : e.key) ?? "").trim(),
    value: Mi(e == null ? void 0 : e.value, 0)
  })).filter((e) => e.key) : [];
}
function ll(a = {}) {
  var c, u, d;
  const e = (a == null ? void 0 : a.preview) ?? {}, t = je(((c = a == null ? void 0 : a.exposure) == null ? void 0 : c.initialTier) ?? (a == null ? void 0 : a.exposureTier) ?? (a == null ? void 0 : a.tier), "none"), i = je(
    ((u = a == null ? void 0 : a.exposure) == null ? void 0 : u.finalTier) ?? (e.evadeActive ? e.finalTier : t),
    t
  ), n = zi({
    tier: t,
    appliedTier: i,
    evadeUsed: !!(e.evadeActive && t !== i),
    evadeLocked: !!((a == null ? void 0 : a.evadeLocked) ?? ((d = a == null ? void 0 : a.exposure) == null ? void 0 : d.evadeLocked))
  }), r = Math.max(0, Mi(a == null ? void 0 : a.baseDamage, 0)), s = Math.max(0, Mi(a == null ? void 0 : a.damageBefore, aa(r, n.initialTier))), o = Math.max(0, Mi(a == null ? void 0 : a.damageAfter, aa(r, n.finalTier))), l = (e == null ? void 0 : e.reactionPreview) ?? {};
  return {
    kind: String((a == null ? void 0 : a.kind) ?? "hazard").trim() || "hazard",
    eventType: String((a == null ? void 0 : a.eventType) ?? "entry").trim() || "entry",
    regionId: String((a == null ? void 0 : a.regionId) ?? "").trim(),
    regionName: String((a == null ? void 0 : a.regionName) ?? (a == null ? void 0 : a.label) ?? "Hazard").trim() || "Hazard",
    actorUuid: String((a == null ? void 0 : a.actorUuid) ?? "").trim() || null,
    tokenUuid: String((a == null ? void 0 : a.tokenUuid) ?? "").trim() || null,
    actorName: String((a == null ? void 0 : a.actorName) ?? "Target").trim() || "Target",
    turnsExposed: Math.max(0, Mi(a == null ? void 0 : a.turnsExposed, 0)),
    baseDamage: r,
    ap: Math.max(0, Mi(a == null ? void 0 : a.ap, 0)),
    damageType: Yt(a == null ? void 0 : a.damageType, "concussive"),
    damageTypeLabel: Qt((a == null ? void 0 : a.damageType) ?? "concussive") || "Damage",
    source: String((a == null ? void 0 : a.source) ?? (a == null ? void 0 : a.regionName) ?? "Hazard").trim() || "Hazard",
    applied: !!(a != null && a.applied),
    applyReason: String((a == null ? void 0 : a.applyReason) ?? "").trim(),
    onFullBurnDelta: Math.max(0, Mi(a == null ? void 0 : a.onFullBurnDelta, 0)),
    exposure: n,
    damageBefore: s,
    damageAfter: o,
    nextTier: je(a == null ? void 0 : a.nextTier, n.finalTier),
    nextLabel: Ft((a == null ? void 0 : a.nextTier) ?? n.finalTier),
    preview: {
      evadeActive: !!e.evadeActive,
      edgePoolKey: String(e.edgePoolKey ?? "").trim() || null,
      finalTier: n.finalTier,
      burnDelta: Mi(l == null ? void 0 : l.burnDelta, 0),
      canSpendEdge: !!(l != null && l.canSpendEdge),
      edgePools: Qh(l == null ? void 0 : l.edgePools)
    }
  };
}
function Jh(a = {}, { actor: e = null, token: t = null } = {}) {
  const i = ll(a), n = i.eventType === "tick" ? "Hazard Tick" : i.eventType === "exit" ? "Hazard Exit" : "Hazard Entry", r = i.exposure.initialLabel === i.exposure.finalLabel ? i.exposure.initialLabel : `${i.exposure.initialLabel} -> ${i.exposure.finalLabel}`, s = i.damageBefore === i.damageAfter ? String(i.damageAfter) : `${i.damageBefore} -> ${i.damageAfter}`;
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
      image: Yh({ actor: e, token: t })
    },
    rows: [
      { label: "Exposure", value: r },
      { label: "Damage", value: s },
      { label: "Next Tier", value: i.nextLabel },
      { label: "Turns Exposed", value: String(i.turnsExposed) }
    ],
    reactionHint: i.exposure.evadeLocked ? "Evade is locked for this hazard." : i.preview.evadeActive ? i.preview.edgePoolKey ? "Evade active. Reaction Burn canceled by Edge." : i.preview.burnDelta > 0 ? `Evade active. This reaction adds +${i.preview.burnDelta} Burn.` : "Evade active." : "",
    actions: i.applied ? [] : Xh(i)
  };
}
function Xh(a = {}) {
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
async function Od(a = {}, { actor: e = null, token: t = null } = {}) {
  return foundry.applications.handlebars.renderTemplate(
    "mwd.v2.roll.mwd-hazard-card",
    Jh(a, { actor: e, token: t })
  );
}
const ft = "mwd", pt = "personalCombat", Gi = "preparedInterrupt", Zh = "systems/mwd/img/icons/status/readied_action.svg", Ei = 3, eg = 1, tg = 1;
function zn(a, e) {
  return !(a != null && a.activation) || !e ? !1 : a.activation.combatId === e.combatId && Number(a.activation.round ?? -1) === Number(e.round ?? -1) && Number(a.activation.turn ?? -1) === Number(e.turn ?? -1) && a.activation.combatantId === e.combatantId;
}
function cl(a = null) {
  return {
    saRemaining: Ei,
    faRemaining: eg,
    raRemaining: tg,
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
function tr(a, e = null) {
  return foundry.utils.mergeObject(
    cl(e),
    foundry.utils.deepClone(a ?? {}),
    { inplace: !1, overwrite: !0 }
  );
}
function ya(a, e = null) {
  const t = tr(a ?? {}, (a == null ? void 0 : a.activation) ?? e);
  return t.actionLog = cn(t.actionLog), t.hazards = Tr(t.hazards), t.pendingReaction = ir(t.pendingReaction), t;
}
function Tr(a) {
  return !a || typeof a != "object" ? {} : Object.fromEntries(
    Object.entries(a).map(([e, t]) => {
      const i = String(e ?? "").trim();
      return !i || !t || typeof t != "object" ? null : [i, {
        tier: je(t.tier, le.none),
        turnsExposed: Math.max(0, Number(t.turnsExposed ?? 0) || 0),
        evadeLocked: !!t.evadeLocked,
        lastProcessedRound: Number(t.lastProcessedRound ?? 0) || 0
      }];
    }).filter(Boolean)
  );
}
function ir(a) {
  if (!a || typeof a != "object") return null;
  const e = String(a.type ?? "").trim();
  return e ? {
    type: e,
    sourceKind: String(a.sourceKind ?? "").trim() || null,
    sourceId: String(a.sourceId ?? "").trim() || null,
    messageId: String(a.messageId ?? "").trim() || null,
    resultIndex: Number.isInteger(Number(a.resultIndex)) ? Number(a.resultIndex) : null,
    exposureBefore: je(a.exposureBefore, le.none),
    exposureAfterPreview: je(a.exposureAfterPreview, le.none),
    edgePoolKey: String(a.edgePoolKey ?? "").trim() || null,
    allowCurrentTurn: !!a.allowCurrentTurn
  } : null;
}
function cn(a) {
  return Array.isArray(a) ? a.map((e) => {
    const t = String((e == null ? void 0 : e.label) ?? "").trim();
    return t ? {
      id: String((e == null ? void 0 : e.id) ?? "").trim(),
      label: t,
      costLabel: String((e == null ? void 0 : e.costLabel) ?? "").trim()
    } : null;
  }).filter(Boolean) : [];
}
function ig(a = []) {
  return cn(a).filter((e) => {
    const t = er(e == null ? void 0 : e.id);
    return (t == null ? void 0 : t.category) === xe.reaction;
  });
}
function Zl(a = null, e = null) {
  const t = cl(e);
  return t.reactionBurnSinceLastActivation = Math.max(0, Number((a == null ? void 0 : a.reactionBurnSinceLastActivation) ?? 0) || 0), t.actionLog = ig(a == null ? void 0 : a.actionLog), t.hazards = Tr(a == null ? void 0 : a.hazards), t;
}
function ag(a, e) {
  return a === "free" ? "Free" : a === "burn" ? `+${e} Burn` : `${e} ${String(a).toUpperCase()}`;
}
function ng(a = {}, e = "", { snapshot: t = null, metadata: i = {} } = {}) {
  var s, o, l, c;
  const n = foundry.utils.deepClone(a ?? {});
  n.actionState ?? (n.actionState = {});
  const r = {
    actionId: e,
    round: Number(((s = t == null ? void 0 : t.combat) == null ? void 0 : s.round) ?? 0),
    turn: Number(((o = t == null ? void 0 : t.combat) == null ? void 0 : o.turn) ?? 0),
    combatantId: ((l = t == null ? void 0 : t.combatant) == null ? void 0 : l.id) ?? null
  };
  return e === "aim" && (n.actionState.aim = {
    ...r,
    target: ((c = t == null ? void 0 : t.targeting) == null ? void 0 : c.target) ?? null
  }), e === "move" && (n.actionState.move = {
    ...r,
    moved: !0
  }), e === "prepare" && (n.actionState.preparedInterrupt = {
    ...r,
    condition: String((i == null ? void 0 : i.condition) ?? "").trim(),
    scope: String((i == null ? void 0 : i.scope) ?? "").trim()
  }), n;
}
function Ya(a = {}) {
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
function rg(a = null) {
  if (!a) return "";
  const e = [];
  return a.condition && e.push(`Trigger: ${a.condition}`), a.scope && e.push(`Scope: ${a.scope}`), e.join(" | ");
}
function ec() {
  return (CONFIG.statusEffects ?? []).find((a) => String((a == null ? void 0 : a.id) ?? "").trim() === Gi) ?? {
    id: Gi,
    name: "Prepared",
    icon: Zh
  };
}
function sg(a) {
  const e = (CONFIG.statusEffects ?? []).find((i) => String((i == null ? void 0 : i.id) ?? "").trim() === a), t = String((e == null ? void 0 : e.name) ?? (e == null ? void 0 : e.label) ?? a ?? "").trim();
  return el(t);
}
function ba(a) {
  const e = Number(a);
  return !Number.isFinite(e) || e === 0 ? "0" : e > 0 ? `+${e}` : String(e);
}
function og(a) {
  if (typeof a == "number") return Number.isFinite(a) ? a : 0;
  const e = String(a ?? "").trim().match(/[-+]?\d+(\.\d+)?/);
  return e ? Number(e[0]) : 0;
}
function tc(a) {
  var o;
  const e = (a == null ? void 0 : a.document) ?? a ?? null, t = (a == null ? void 0 : a.object) ?? (e == null ? void 0 : e.object) ?? a ?? null, i = String((e == null ? void 0 : e.id) ?? "").trim(), n = z._pendingTokenPositions.get(i) ?? null, r = Number((n == null ? void 0 : n.x) ?? (e == null ? void 0 : e.x)), s = Number((n == null ? void 0 : n.y) ?? (e == null ? void 0 : e.y));
  if (t && Number.isFinite(r) && Number.isFinite(s)) {
    if (typeof t.getCenterPoint == "function")
      return t.getCenterPoint({ x: r, y: s });
    if (typeof t.getCenter == "function")
      return t.getCenter(r, s);
  }
  return (t == null ? void 0 : t.center) ?? ((o = e == null ? void 0 : e.object) == null ? void 0 : o.center) ?? null;
}
function lg(a, e = "") {
  if (!Number.isFinite(a)) return "";
  const t = Math.round(a * 10) / 10, i = Number.isInteger(t) ? String(t) : t.toFixed(1);
  return e ? `${i} ${e}` : i;
}
function ic(a) {
  var t, i;
  const e = (i = (t = game.settings) == null ? void 0 : t.get) == null ? void 0 : i.call(t, "core", "rollMode");
  return typeof ChatMessage.applyRollMode == "function" && ChatMessage.applyRollMode(a, e), a;
}
function hs(a) {
  return !!$i(a);
}
function cg(a = []) {
  const e = Array.isArray(a) ? a.filter(Boolean) : [];
  if (!e.length) return "";
  const t = e.slice().sort((n, r) => Li(r == null ? void 0 : r.tier) - Li(n == null ? void 0 : n.tier))[0] ?? null;
  if (!t) return "";
  const i = `HAZARD ${Ft(t.tier)} (${Math.max(0, Number(t.turnsExposed ?? 0) || 0)})`;
  return t.evadeLocked ? `${i} LOCK` : i;
}
const Ca = class Ca {
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
    var i, n, r, s;
    const t = this._asTokenDocument(e);
    return ((i = t == null ? void 0 : t.parent) == null ? void 0 : i.id) ?? ((n = t == null ? void 0 : t.scene) == null ? void 0 : n.id) ?? ((s = (r = t == null ? void 0 : t.object) == null ? void 0 : r.scene) == null ? void 0 : s.id) ?? null;
  }
  static _getSceneTokenDocumentById(e, t = ((i) => (i = canvas == null ? void 0 : canvas.scene) == null ? void 0 : i.id)()) {
    var s, o, l, c, u;
    const n = String(e ?? "").trim();
    if (!n || !t) return null;
    const r = ((s = canvas == null ? void 0 : canvas.scene) == null ? void 0 : s.id) === t ? canvas.scene : (l = (o = game.scenes) == null ? void 0 : o.get) == null ? void 0 : l.call(o, t);
    return ((u = (c = r == null ? void 0 : r.tokens) == null ? void 0 : c.get) == null ? void 0 : u.call(c, n)) ?? null;
  }
  static _getCombatantTokenDocument(e, t = ((i) => (i = canvas == null ? void 0 : canvas.scene) == null ? void 0 : i.id)()) {
    const n = this._asTokenDocument(e == null ? void 0 : e.token);
    return n && typeof n == "object" ? n : this._getSceneTokenDocumentById(this._getCombatantTokenId(e), t);
  }
  static _getCombatantTokenId(e) {
    var t, i, n, r, s;
    return String(
      (e == null ? void 0 : e.tokenId) ?? ((t = e == null ? void 0 : e.token) == null ? void 0 : t.id) ?? ((i = e == null ? void 0 : e.token) == null ? void 0 : i._id) ?? ((r = (n = e == null ? void 0 : e.token) == null ? void 0 : n.document) == null ? void 0 : r.id) ?? ((s = e == null ? void 0 : e._source) == null ? void 0 : s.tokenId) ?? ""
    ).trim();
  }
  static _getCombatantActorId(e) {
    var i, n, r, s;
    const t = this._asTokenDocument(e == null ? void 0 : e.token);
    return String(
      (e == null ? void 0 : e.actorId) ?? ((i = e == null ? void 0 : e.actor) == null ? void 0 : i.id) ?? ((n = e == null ? void 0 : e._source) == null ? void 0 : n.actorId) ?? (t == null ? void 0 : t.actorId) ?? ((r = t == null ? void 0 : t.actor) == null ? void 0 : r.id) ?? ((s = t == null ? void 0 : t.baseActor) == null ? void 0 : s.id) ?? ""
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
    var i, n, r, s, o;
    const t = this._asTokenDocument(e == null ? void 0 : e.token);
    return String(
      (e == null ? void 0 : e.sceneId) ?? ((i = e == null ? void 0 : e._source) == null ? void 0 : i.sceneId) ?? ((n = t == null ? void 0 : t.parent) == null ? void 0 : n.id) ?? ((r = t == null ? void 0 : t.scene) == null ? void 0 : r.id) ?? ((o = (s = t == null ? void 0 : t.object) == null ? void 0 : s.scene) == null ? void 0 : o.id) ?? ""
    ).trim();
  }
  static _findCombatantForToken(e, t = null, i = ((n) => (n = canvas == null ? void 0 : canvas.scene) == null ? void 0 : n.id)()) {
    var l, c, u;
    const r = this._asTokenDocument(t), s = String((r == null ? void 0 : r.id) ?? "").trim();
    if (!e || !s) return null;
    if (((c = (l = r == null ? void 0 : r.combatant) == null ? void 0 : l.combat) == null ? void 0 : c.id) === e.id) return r.combatant;
    let o = null;
    if (typeof e.getCombatantsByToken == "function")
      try {
        o = ((u = e.getCombatantsByToken(s)) == null ? void 0 : u[0]) ?? null;
      } catch {
        o = null;
      }
    else if (typeof e.getCombatantByToken == "function")
      try {
        o = e.getCombatantByToken(s) ?? null;
      } catch {
        o = null;
      }
    return o || (this._getCombatants(e).find((d) => {
      const m = this._getCombatantTokenDocument(d, i), f = this._getCombatantTokenId(d) || String((m == null ? void 0 : m.id) ?? "").trim(), p = this._getCombatantSceneId(d) || i;
      return f === s && (!i || !p || p === i);
    }) ?? null);
  }
  static _collectActorIds(e, t = null) {
    var s, o;
    const i = /* @__PURE__ */ new Set(), n = (l) => {
      const c = String(l ?? "").trim();
      c && i.add(c);
    };
    n(e == null ? void 0 : e.id), n(e == null ? void 0 : e._id);
    const r = this._asTokenDocument(t) ?? this._asTokenDocument(e == null ? void 0 : e.token);
    return n((s = r == null ? void 0 : r.actor) == null ? void 0 : s.id), n((o = r == null ? void 0 : r.baseActor) == null ? void 0 : o.id), n(r == null ? void 0 : r.actorId), i;
  }
  static _tokenDocumentMatchesActor(e, t, i = null) {
    var s, o;
    const n = this._asTokenDocument(e);
    if (!n || !t) return !1;
    const r = i ?? this._collectActorIds(t, n);
    return [
      (s = n == null ? void 0 : n.actor) == null ? void 0 : s.id,
      (o = n == null ? void 0 : n.baseActor) == null ? void 0 : o.id,
      n == null ? void 0 : n.actorId
    ].some((l) => r.has(String(l ?? "").trim()));
  }
  static getPreferredTokenDocument(e) {
    var n, r;
    if (!e) return null;
    const t = this._asTokenDocument(e == null ? void 0 : e.token);
    return t || (((r = (((n = e.getActiveTokens) == null ? void 0 : n.call(e, !0, !0)) ?? [])[0]) == null ? void 0 : r.document) ?? null);
  }
  static getPreferredToken(e) {
    const t = this.getPreferredTokenDocument(e);
    return t ? t.object ?? this._getSceneTokenById(t.id) : null;
  }
  static getCurrentSceneTokenDocument(e, t = null) {
    var p, h, g, y;
    const i = (p = canvas == null ? void 0 : canvas.scene) == null ? void 0 : p.id, n = this._asTokenDocument(t);
    if (this._getTokenSceneId(n) === i) return n;
    const r = String((n == null ? void 0 : n.id) ?? (t == null ? void 0 : t.id) ?? "").trim();
    if (r) {
      const b = this._getSceneTokenDocumentById(r, i);
      if (b) return b;
    }
    const s = this.getPreferredTokenDocument(e);
    if (this._getTokenSceneId(s) === i) return s;
    const o = String((s == null ? void 0 : s.id) ?? "").trim();
    if (o) {
      const b = this._getSceneTokenDocumentById(o, i);
      if (b) return b;
    }
    const c = ((g = (((h = e == null ? void 0 : e.getActiveTokens) == null ? void 0 : h.call(e, !0, !0)) ?? []).find((b) => {
      var S, w;
      return ((w = (S = b == null ? void 0 : b.document) == null ? void 0 : S.parent) == null ? void 0 : w.id) === i;
    })) == null ? void 0 : g.document) ?? null;
    if (c) return c;
    const u = Array.from(((y = canvas == null ? void 0 : canvas.scene) == null ? void 0 : y.tokens) ?? []), d = this._collectActorIds(e, s), m = u.filter((b) => this._tokenDocumentMatchesActor(b, e, d));
    return m.find((b) => {
      var S, w, k;
      return ((S = b == null ? void 0 : b.combatant) == null ? void 0 : S.id) === ((k = (w = game.combat) == null ? void 0 : w.combatant) == null ? void 0 : k.id);
    }) ?? null ?? m[0] ?? null;
  }
  static getCurrentSceneToken(e, t = null) {
    const i = this.getCurrentSceneTokenDocument(e, t);
    return i ? i.object ?? this._getSceneTokenById(i.id) : null;
  }
  static _getSceneTokenById(e) {
    var t, i, n, r;
    return e ? ((i = (t = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : t.get) == null ? void 0 : i.call(t, e)) ?? ((r = (n = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : n.placeables) == null ? void 0 : r.find((s) => s.id === e)) ?? null : null;
  }
  static _measureTokenDistance(e, t) {
    var o, l;
    const i = canvas == null ? void 0 : canvas.grid, n = tc(e), r = tc(t);
    if (!i || !n || !r) return null;
    if (typeof i.measurePath == "function")
      try {
        const c = i.measurePath([n, r], { gridSpaces: !0 }), u = Number(
          (c == null ? void 0 : c.distance) ?? (c == null ? void 0 : c.cost) ?? (c == null ? void 0 : c.totalDistance) ?? (c == null ? void 0 : c.totalCost) ?? NaN
        );
        if (Number.isFinite(u)) return u;
      } catch {
      }
    const s = ((l = (o = foundry == null ? void 0 : foundry.canvas) == null ? void 0 : o.geometry) == null ? void 0 : l.Ray) ?? globalThis.Ray;
    if (typeof i.measureDistances == "function" && typeof s == "function")
      try {
        const c = i.measureDistances([{ ray: new s(n, r) }], { gridSpaces: !0 }), u = Number(Array.isArray(c) ? c[0] : NaN);
        if (Number.isFinite(u)) return u;
      } catch {
        return null;
      }
    return null;
  }
  static getUserTargetTokens(e = game.user) {
    var n;
    const i = (Array.isArray((n = e == null ? void 0 : e.targets) == null ? void 0 : n.ids) ? e.targets.ids : []).map((r) => this._getSceneTokenById(r)).filter(Boolean);
    return i.length ? i : Array.from((e == null ? void 0 : e.targets) ?? []).map((r) => (r == null ? void 0 : r.object) ?? r).filter(Boolean);
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
    const r = i[0], s = this._measureTokenDistance(e, r), o = String(((d = (u = canvas == null ? void 0 : canvas.scene) == null ? void 0 : u.grid) == null ? void 0 : d.units) ?? ((f = (m = game.system) == null ? void 0 : m.grid) == null ? void 0 : f.units) ?? "").trim(), l = lg(s, o), c = String((r == null ? void 0 : r.name) ?? ((p = r == null ? void 0 : r.actor) == null ? void 0 : p.name) ?? "Target").trim() || "Target";
    return {
      count: n,
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
        distance: Number.isFinite(s) ? s : null,
        distanceLabel: l
      }
    };
  }
  static getRollImpact(e = []) {
    const t = (Array.isArray(e) ? e : []).map((n) => {
      const r = og((n == null ? void 0 : n.numericValue) ?? (n == null ? void 0 : n.value) ?? 0);
      return {
        label: String((n == null ? void 0 : n.label) ?? "").trim() || "Modifier",
        numericValue: r,
        value: String((n == null ? void 0 : n.value) ?? ba(r)).trim() || ba(r)
      };
    }), i = t.reduce((n, r) => n + r.numericValue, 0);
    return {
      total: i,
      totalLabel: ba(i),
      entries: t
    };
  }
  static getCombat(e, t = null) {
    var h;
    const i = (h = canvas == null ? void 0 : canvas.scene) == null ? void 0 : h.id, n = game.combat, r = this._getCombatSceneId(n), o = !!this._asTokenDocument(t), l = this.getCurrentSceneTokenDocument(e, t), c = (l == null ? void 0 : l.object) ?? this._getSceneTokenById((l == null ? void 0 : l.id) ?? null);
    if (!n || r && i && r !== i)
      return {
        combat: null,
        combatant: null,
        token: c,
        tokenDocument: l
      };
    let u = this._findCombatantForToken(n, l, i);
    const d = this._getCombatants(n);
    if (!u) {
      const g = this._collectActorIds(e, l), y = String((l == null ? void 0 : l.id) ?? "").trim(), b = d.filter((k) => {
        const P = this._getCombatantTokenId(k), E = this._getCombatantTokenDocument(k, i), x = P || String((E == null ? void 0 : E.id) ?? "").trim();
        return o && y ? x === y : g.has(this._getCombatantActorId(k)) ? !0 : this._tokenDocumentMatchesActor(E, e, g);
      }), S = b.find((k) => {
        var P;
        return k.id === ((P = n == null ? void 0 : n.combatant) == null ? void 0 : P.id);
      }) ?? null;
      u = b.find(
        (k) => {
          var P;
          return y && (this._getCombatantTokenId(k) || String(((P = this._getCombatantTokenDocument(k, i)) == null ? void 0 : P.id) ?? "").trim()) === y;
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
    var E, x, K, q, j;
    const {
      combat: i,
      combatant: n,
      token: r,
      tokenDocument: s
    } = this.getCombat(e, t), o = !!n && ((E = i == null ? void 0 : i.combatant) == null ? void 0 : E.id) === n.id, l = n ? this.getActivationIdentity(i, n) : null, c = n ? n.getFlag(ft, pt) : null, u = n ? o ? zn(c, l) ? ya(c, l) : Zl(c, l) : ya(c, l) : cl(l);
    u.actionLog = cn(u.actionLog);
    const d = Math.max(0, Number(((K = (x = e == null ? void 0 : e.system) == null ? void 0 : x.burn) == null ? void 0 : K.value) ?? 0)), m = Math.floor(d / 2), f = !!((j = (q = e == null ? void 0 : e.system) == null ? void 0 : q.burn) != null && j.overloaded), p = Ya(u), h = this.getActiveStatuses(e), g = h.filter(
      (W) => !(f && W.id === "overloaded") && W.id !== Gi
    ), y = this.getModifierSummary(e, m), b = this.getRollImpact(y), S = Math.max(0, Number(u.burnThisActivation ?? 0)), w = n ? o ? "" : "Waiting for this combatant's activation." : "No combatant on the current scene.", k = [];
    f && k.push({ id: "overloaded", label: "Overloaded" }), p && k.push({
      id: "preparedInterrupt",
      label: "Prepared",
      hint: rg(p)
    });
    const P = Object.entries(u.hazards ?? {});
    if (P.length) {
      const W = P.map(([, _]) => _).sort((_, F) => Li(F == null ? void 0 : F.tier) - Li(_ == null ? void 0 : _.tier))[0] ?? null;
      W && k.push({
        id: "hazard",
        label: `Hazard ${Ft(W.tier)}`,
        hint: `${P.length} active hazard${P.length === 1 ? "" : "s"}`
      });
    }
    return {
      token: r,
      tokenDocument: s,
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
      targeting: this.getTargetingSnapshot(r),
      states: k,
      effects: g,
      statuses: h,
      rollImpact: b,
      summaryText: `SA: ${u.saRemaining} / ${Ei}   FA: ${u.faRemaining}   RA: ${u.raRemaining}`,
      activation: {
        burnThisActivation: S,
        burnThisActivationLabel: `+${S}`,
        items: [
          { label: "SA", value: `${u.saRemaining}/${Ei}` },
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
    const n = this.getSnapshot(e, { token: t }), r = Number(((u = n.state) == null ? void 0 : u.raRemaining) ?? 0) > 0, s = this.getAvailableReactionEdgePools(e), o = String(i ?? "").trim(), l = !r && s.some((d) => d.key === o);
    return {
      snapshot: n,
      usesReaction: r,
      burnDelta: r || l ? 0 : 2,
      canSpendEdge: !r && s.length > 0,
      edgePools: s,
      edgePoolKey: l ? o : null,
      costLabel: r ? "1 RA" : l ? `1 Edge (${o})` : "+2 Burn"
    };
  }
  static async commitReactionSpend(e, {
    token: t = null,
    actionId: i = "",
    actionLabel: n = "",
    actionCategory: r = xe.reaction,
    logLabel: s = "",
    edgePoolKey: o = "",
    allowCurrentTurn: l = !1
  } = {}) {
    var h, g, y, b, S;
    const c = this.getReactionSpendPreview(e, { token: t, edgePoolKey: o }), u = c.snapshot;
    if (!u.hasCombatant) return { ok: !1, reason: "No combatant on the current scene." };
    if (!l && u.isCurrentTurn) return { ok: !1, reason: "Only outside your activation." };
    const d = ya(u.combatant.getFlag(ft, pt), (h = u.state) == null ? void 0 : h.activation), m = {
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
      const w = c.edgePoolKey ? 0 : 2, k = Bt({
        actor: e,
        phase: "onBeforeBurnApplied",
        facts: Zn({
          actor: e,
          packet: {
            actionId: i,
            category: r,
            resource: "reaction",
            amount: w,
            source: "reaction"
          },
          runtime: m
        }),
        packet: {
          actionId: i,
          category: r,
          resource: "reaction",
          amount: w,
          source: "reaction"
        },
        options: { runtime: m, consumeUsage: !0 }
      });
      m.pendingMutations = (m.pendingMutations ?? []).concat(k.mutations), f = Math.max(0, Number(k.packet.amount ?? w) || 0), c.edgePoolKey ? (await e.spendEdge(c.edgePoolKey, 1, { source: "reactionBurnCancel" }), p = c.edgePoolKey) : f > 0 && (d.reactionBurnSinceLastActivation = Math.max(
        0,
        Number(d.reactionBurnSinceLastActivation ?? 0) + f
      ));
    }
    return this._appendActionLog(d, {
      id: i,
      label: s || n,
      costLabel: c.costLabel
    }), (y = m.pendingMutations) != null && y.length ? await Ai({ actor: e, mutations: m.pendingMutations, runtime: m }) : await u.combatant.setFlag(ft, pt, d), f > 0 && await e.update({ "system.burn.value": Math.max(0, Number(((S = (b = e.system) == null ? void 0 : b.burn) == null ? void 0 : S.value) ?? 0) + f) }), {
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
    const r = ya(n.combatant.getFlag(ft, pt), (o = n.state) == null ? void 0 : o.activation), s = typeof i == "function" ? i(r, n) ?? r : r;
    return await n.combatant.setFlag(ft, pt, s), { ok: !0, snapshot: this.getSnapshot(e, { token: t }) };
  }
  static async setPendingReaction(e, { token: t = null, pendingReaction: i = null } = {}) {
    return this.updateCombatantState(e, {
      token: t,
      mutate: (n) => (n.pendingReaction = ir(i), n)
    });
  }
  static async clearPendingReaction(e, { token: t = null } = {}) {
    return this.setPendingReaction(e, { token: t, pendingReaction: null });
  }
  static async setHazardState(e, { token: t = null, regionId: i = "", hazardState: n = null } = {}) {
    const r = String(i ?? "").trim();
    return r ? this.updateCombatantState(e, {
      token: t,
      mutate: (s) => (s.hazards ?? (s.hazards = {}), n ? s.hazards[r] = Tr({ [r]: n })[r] : delete s.hazards[r], s)
    }) : { ok: !1, reason: "Hazard region id is required." };
  }
  static getModifierSummary(e, t = Math.floor(Number(((n) => (n = ((i) => (i = e == null ? void 0 : e.system) == null ? void 0 : i.burn)()) == null ? void 0 : n.value)() ?? 0) / 2)) {
    var c, u;
    const r = ((u = (c = e == null ? void 0 : e.system) == null ? void 0 : c.derived) == null ? void 0 : u.condition) ?? {}, s = [];
    t > 0 && s.push({
      label: "Burn Penalty",
      numericValue: -t,
      value: ba(-t)
    });
    const o = Number(r.fatiguePenalty ?? 0);
    o && s.push({
      label: "Fatigue",
      numericValue: o,
      value: ba(o)
    });
    const l = Number(r.physicalPenalty ?? 0);
    return l && s.push({
      label: "Physical",
      numericValue: l,
      value: ba(l)
    }), s.length || s.push({
      label: "Current Modifiers",
      numericValue: 0,
      value: "0"
    }), s;
  }
  static getActiveStatuses(e) {
    return Array.from((e == null ? void 0 : e.statuses) ?? []).map((i) => ({
      id: i,
      label: sg(i)
    })).sort((i, n) => i.label.localeCompare(n.label));
  }
  static buildActionModel(e, t) {
    var o, l, c, u;
    const i = (d) => {
      const m = il(d), f = bh(d);
      return !f || !m ? null : {
        id: d,
        label: m.label,
        handler: "roll",
        roll: JSON.stringify(f),
        disabled: !1,
        reason: ""
      };
    }, n = (d) => {
      const m = Wh(d).filter((f) => f.id !== "overloadCheck").filter((f) => !(d === xe.recovery && f.id === "reduceBurn"));
      if (d === xe.standard) {
        const f = er("reduceBurn");
        f && !m.some((p) => p.id === "reduceBurn") && m.push(f);
      }
      return m.map((f) => this._buildCatalogAction(e, t, f));
    }, r = (d) => {
      const m = er(d);
      if (!m) return null;
      const f = this._buildCatalogAction(e, t, m);
      return f.disabled ? null : f;
    }, s = (o = t.burn) != null && o.canOverloadCheck ? r("overloadCheck") : null;
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
        { label: "SA", value: `${t.state.saRemaining}/${Ei}` },
        { label: "Cap", value: `${Math.max(0, Number(((l = t.state) == null ? void 0 : l.saSpentThisActivation) ?? 0))}/${Xs(e)}` },
        { label: "FA", value: `${t.state.faRemaining}` },
        { label: "RA", value: `${t.state.raRemaining}` },
        {
          label: "Burn/Turn",
          value: `+${Math.max(0, Number(((c = t.state) == null ? void 0 : c.burnThisActivation) ?? 0))}`,
          action: s
        }
      ],
      activationLog: cn((u = t.state) == null ? void 0 : u.actionLog).map((d, m) => ({
        ...d,
        index: m + 1
      })),
      menus: [
        {
          id: "standard",
          label: "Standard Actions",
          actions: n(xe.standard)
        },
        {
          id: "complex",
          label: "Complex Actions",
          actions: n(xe.complex)
        },
        {
          id: "free",
          label: "Free Actions",
          actions: n(xe.free)
        },
        {
          id: "reaction",
          label: "Reactions",
          actions: n(xe.reaction)
        },
        {
          id: "burn",
          label: "Burn & Recovery",
          actions: n(xe.recovery)
        }
      ].filter((d) => d.actions.length)
    };
  }
  static _buildCatalogAction(e, t, i) {
    const n = t.hasCombatant ? "" : "No current-scene combatant.", r = t.isCurrentTurn ? "" : "Only during your activation.", s = t.overloaded ? "Overloaded actors can only recover Burn." : "", o = Fn(e, t), l = t.state ?? {}, c = i.category;
    let u = "sa", d = Number(i.cost ?? 0) || 0, m = ag(u, d), f = "";
    if (i.id === "reduceBurn")
      u = "sa", d = 1, m = "1 SA", f = n || r || (o <= 0 ? "Activation SA cap reached." : "") || (t.burn.value <= 0 ? "Burn is already at 0." : "");
    else if (i.id === "overloadCheck")
      u = "check", d = 0, m = "Check", f = n || r || (t.burn.canOverloadCheck ? "" : t.overloaded ? "Already Overloaded." : "Burn below 6.");
    else if (i.id === "interrupt") {
      const p = Ya(l);
      u = Number(l.raRemaining ?? 0) > 0 ? "ra" : "burn", d = u === "ra" ? 1 : 2, m = u === "ra" ? "1 RA" : "+2 Burn", f = n || (t.isCurrentTurn ? "Only outside your activation." : "") || (p ? "" : "Prepare an interrupt first.");
    } else if (i.id === "evade") {
      const p = ir(l.pendingReaction), h = t.isCurrentTurn && !(p != null && p.allowCurrentTurn) ? "Only outside your activation." : "";
      u = Number(l.raRemaining ?? 0) > 0 ? "ra" : "burn", d = u === "ra" ? 1 : 2, m = u === "ra" ? "1 RA" : "+2 Burn", f = n || h || (p ? "" : "Use an area effect or hazard card to trigger Evade.");
    } else if (c === xe.standard)
      f = n || r || s || (o < d ? "Activation SA cap reached." : "");
    else if (c === xe.complex)
      f = n || r || s || (o < d ? "Activation SA cap reached." : "");
    else if (c === xe.free) {
      const p = Number(l.faRemaining ?? 0) > 0;
      u = p ? "fa" : "sa", d = 1, m = p ? "Free" : "1 SA", f = n || r || !p && s || (!p && o < 1 ? "Activation SA cap reached." : "");
    } else if (c === xe.reaction) {
      const p = Number(l.raRemaining ?? 0) > 0;
      u = p ? "ra" : "burn", d = p ? 1 : 2, m = p ? "1 RA" : "+2 Burn", f = n || (t.isCurrentTurn ? "Only outside your activation." : "");
    } else c === xe.recovery && (f = n || r);
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
    const r = er(i);
    return r ? r.handler ? r.category === xe.standard ? this._executeStandardAction(e, { token: t, action: r, metadata: n }) : r.category === xe.free ? this._executeFreeAction(e, { token: t, action: r, metadata: n }) : r.category === xe.reaction ? this._executeReactionAction(e, { token: t, action: r, metadata: n }) : { ok: !1, reason: r.reason || "That action is not implemented yet." } : { ok: !1, reason: r.reason || "That action is not implemented yet." } : { ok: !1, reason: "Unknown combat action." };
  }
  static async _executeStandardAction(e, { token: t = null, action: i, metadata: n = {} } = {}) {
    const r = this.getSnapshot(e, { token: t });
    if (!r.hasCombatant) return { ok: !1, reason: "No combatant on the current scene." };
    if (!r.isCurrentTurn) return { ok: !1, reason: "Only available during your activation." };
    if (r.overloaded) return { ok: !1, reason: "Overloaded actors can only recover Burn." };
    if (Fn(e, r) < Number(i.cost ?? 1))
      return { ok: !1, reason: "Activation SA cap reached." };
    const s = await this.spendResource(e, {
      token: t,
      resource: "sa",
      cost: Number(i.cost ?? 1) || 1,
      actionId: i.id,
      actionLabel: i.label,
      actionCostLabel: `${Number(i.cost ?? 1) || 1} SA`,
      actionCategory: i.category
    });
    return s != null && s.ok ? (await this._applyActionState(e, {
      token: t,
      actionId: i.id,
      metadata: n,
      snapshot: s.snapshot
    }), { ok: !0, snapshot: this.getSnapshot(e, { token: t }) }) : s;
  }
  static async _executeFreeAction(e, { token: t = null, action: i, metadata: n = {} } = {}) {
    var l;
    const r = this.getSnapshot(e, { token: t });
    if (!r.hasCombatant) return { ok: !1, reason: "No combatant on the current scene." };
    if (!r.isCurrentTurn) return { ok: !1, reason: "Only available during your activation." };
    const s = Number(((l = r.state) == null ? void 0 : l.faRemaining) ?? 0) > 0;
    if (!s && r.overloaded)
      return { ok: !1, reason: "Overloaded actors can only recover Burn." };
    if (!s && Fn(e, r) < 1)
      return { ok: !1, reason: "Activation SA cap reached." };
    const o = await this.spendResource(e, {
      token: t,
      resource: s ? "fa" : "sa",
      cost: 1,
      actionId: i.id,
      actionLabel: i.label,
      actionCostLabel: s ? "Free" : "1 SA",
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
    let r;
    i.length === 1 ? r = `<input type="hidden" name="poolKey" value="${i[0].key}">
        <p>from <strong>${n(i[0].key)}</strong> (${i[0].effectiveValue} available)</p>` : r = i.map((u, d) => `
        <label style="display:block">
          <input type="radio" name="poolKey" value="${u.key}" ${d === 0 ? "checked" : ""}>
          ${n(u.key)} &mdash; ${u.effectiveValue} available
        </label>
      `).join("");
    const s = `<p>This reaction costs <strong>+2 Burn</strong>. Spend 1 Edge to ignore it?</p><form>${r}</form>`;
    return Dialog.confirm({
      title: "Reaction: Spend Edge?",
      content: s,
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
    const r = this.getSnapshot(e, { token: t });
    if (!r.hasCombatant) return { ok: !1, reason: "No combatant on the current scene." };
    const s = ir((d = r.state) == null ? void 0 : d.pendingReaction), o = i.id === "evade" && (s == null ? void 0 : s.allowCurrentTurn);
    if (r.isCurrentTurn && !o) return { ok: !1, reason: "Only outside your activation." };
    if (i.id === "interrupt" && !Ya(r.state))
      return { ok: !1, reason: "Prepare an interrupt first." };
    const l = i.id === "assist" && (n != null && n.targetName) ? `${i.label}: ${n.targetName}` : i.id === "interrupt" && (n != null && n.scope) ? `${i.label}: ${String(n.scope).trim()}` : i.label;
    let c = String((n == null ? void 0 : n.edgePoolKey) ?? "").trim();
    !c && Number(((m = r.state) == null ? void 0 : m.raRemaining) ?? 0) <= 0 && (c = await Ca._promptSpendEdgeForReaction(e) ?? "");
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
  static async _applyActionState(e, { token: t = null, actionId: i = "", metadata: n = {}, snapshot: r = null } = {}) {
    const s = r ?? this.getSnapshot(e, { token: t });
    if (!(s != null && s.combatant)) return { ok: !1, reason: "No combatant on the current scene." };
    const o = ng(s.state, i, {
      snapshot: s,
      metadata: n
    });
    return await s.combatant.setFlag(ft, pt, o), { ok: !0, snapshot: this.getSnapshot(e, { token: t }) };
  }
  static async clearAim(e, { token: t = null } = {}) {
    var r;
    const i = this.getSnapshot(e, { token: t });
    if (!(i != null && i.combatant)) return { ok: !1, reason: "No combatant on the current scene." };
    const n = ya(i.combatant.getFlag(ft, pt), (r = i.state) == null ? void 0 : r.activation);
    return n.actionState ?? (n.actionState = {}), n.actionState.aim ? (n.actionState.aim = null, await i.combatant.setFlag(ft, pt, n), { ok: !0, snapshot: this.getSnapshot(e, { token: t }) }) : { ok: !0, snapshot: i };
  }
  static getPreparedInterrupt(e = null) {
    const t = (e == null ? void 0 : e.state) ?? e ?? {};
    return Ya(t);
  }
  static async clearPreparedInterrupt(e, { token: t = null } = {}) {
    var r;
    const i = this.getSnapshot(e, { token: t });
    if (!(i != null && i.combatant)) return { ok: !1, reason: "No combatant on the current scene." };
    const n = ya(i.combatant.getFlag(ft, pt), (r = i.state) == null ? void 0 : r.activation);
    return n.actionState ?? (n.actionState = {}), n.actionState.preparedInterrupt ? (n.actionState.preparedInterrupt = null, await i.combatant.setFlag(ft, pt, n), { ok: !0, snapshot: this.getSnapshot(e, { token: t }) }) : { ok: !0, snapshot: i };
  }
  static async _syncPreparedIndicatorForCombatant(e) {
    var u, d, m;
    if (!game.user.isGM || !e) return;
    const t = this._getCombatantSceneId(e) || ((u = canvas == null ? void 0 : canvas.scene) == null ? void 0 : u.id), i = this._getCombatantTokenDocument(e, t), n = (i == null ? void 0 : i.actor) ?? (e == null ? void 0 : e.actor) ?? null;
    if (!i || !n) return;
    const r = e.getFlag(ft, pt), s = !!Ya(r), o = ec(), l = String((o == null ? void 0 : o.id) ?? Gi).trim() || Gi;
    (((m = (d = n == null ? void 0 : n.statuses) == null ? void 0 : d.has) == null ? void 0 : m.call(d, l)) ?? !1) !== s && await n.toggleStatusEffect(l, { active: s, overlay: !1 });
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
    const r = ec(), s = String((r == null ? void 0 : r.id) ?? Gi).trim() || Gi;
    (((c = (l = n == null ? void 0 : n.statuses) == null ? void 0 : l.has) == null ? void 0 : c.call(l, s)) ?? !1) && await n.toggleStatusEffect(s, { active: !1, overlay: !1 });
  }
  static _buildSpendAction(e, t, i = "") {
    var l;
    const n = Number(((l = e.state) == null ? void 0 : l[`${t.resource}Remaining`]) ?? 0), r = t.resource === "sa" ? "" : n < t.cost ? `No ${String(t.resource).toUpperCase()} remaining.` : "", s = i || r, o = this._formatCostLabel(t.resource, t.cost);
    return {
      id: t.id,
      label: t.label,
      costLabel: o,
      handler: "combatSpend",
      resource: t.resource,
      cost: t.cost,
      disabled: !!s,
      reason: s,
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
    const r = String(i ?? "").trim();
    if (!r) return;
    const s = cn(e == null ? void 0 : e.actionLog);
    s.push({
      id: String(t ?? "").trim(),
      label: r,
      costLabel: String(n ?? "").trim()
    }), e.actionLog = s;
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
    var r, s;
    if (!game.user.isGM) return;
    const e = game.combat, t = e == null ? void 0 : e.combatant;
    if (!e || !t || ((r = e.scene) == null ? void 0 : r.id) !== ((s = canvas == null ? void 0 : canvas.scene) == null ? void 0 : s.id)) return;
    const i = this.getActivationIdentity(e, t), n = t.getFlag(ft, pt);
    zn(n, i) || await t.setFlag(ft, pt, Zl(n, i));
  }
  static async spendResource(e, {
    token: t = null,
    resource: i = "sa",
    cost: n = 1,
    actionId: r = "",
    actionLabel: s = "",
    actionCostLabel: o = "",
    actionCategory: l = ""
  } = {}) {
    var S, w, k, P, E, x, K;
    const c = this.getSnapshot(e, { token: t });
    if (!c.hasCombatant)
      return { ok: !1, reason: "No combatant on the current scene." };
    if (!c.isCurrentTurn)
      return { ok: !1, reason: "Only available during your activation." };
    const u = {
      combat: c.combat,
      combatant: c.combatant,
      state: tr(c.state, this.getActivationIdentity(c.combat, c.combatant)),
      sceneId: ((S = canvas == null ? void 0 : canvas.scene) == null ? void 0 : S.id) ?? "",
      snapshot: c
    };
    let d = Math.max(0, Number(n ?? 0) || 0);
    const m = Bt({
      actor: e,
      phase: "onBeforeActionCostFinalized",
      facts: Md({
        actor: e,
        packet: { actionId: r, category: l, resource: i, cost: d, effectiveCost: d },
        runtime: u
      }),
      packet: { actionId: r, category: l, resource: i, cost: d, effectiveCost: d },
      options: { runtime: u, consumeUsage: !0 }
    });
    d = Math.max(0, Number(m.packet.cost ?? d) || 0), u.pendingMutations = (u.pendingMutations ?? []).concat(m.mutations);
    const f = `${i}Remaining`, p = Number(((w = c.state) == null ? void 0 : w[f]) ?? 0);
    if (i !== "sa" && p < d)
      return { ok: !1, reason: `No ${String(i).toUpperCase()} remaining.` };
    const h = u.state, g = i === "sa" ? Xs(e) : 0, y = Math.max(0, Number(((k = c.state) == null ? void 0 : k.saSpentThisActivation) ?? 0) || 0);
    if (i === "sa" && y + d > g)
      return { ok: !1, reason: "Activation SA cap reached." };
    h[f] = Math.max(0, p - d), i === "sa" && (h.saSpentThisActivation = y + d, r === "attack" && (h.attacksThisActivation = Number(h.attacksThisActivation ?? 0) + 1)), this._appendActionLog(h, {
      id: r,
      label: s,
      costLabel: o || this._formatCostLabel(i, d)
    });
    let b = 0;
    if (i === "sa") {
      const q = Math.max(0, y - Ei), j = Math.max(0, h.saSpentThisActivation - Ei), W = Math.max(0, Number(((P = c.state) == null ? void 0 : P.attacksThisActivation) ?? 0) || 0), _ = Math.max(0, Number(h.attacksThisActivation ?? 0) || 0);
      for (let F = q + 1; F <= j; F += 1) {
        const V = Bt({
          actor: e,
          phase: "onBeforeBurnApplied",
          facts: Zn({
            actor: e,
            packet: {
              actionId: r,
              category: l,
              resource: i,
              amount: 1,
              source: "extraSA",
              extraSaIndex: F
            },
            runtime: u
          }),
          packet: {
            actionId: r,
            category: l,
            resource: i,
            amount: 1,
            source: "extraSA",
            extraSaIndex: F
          },
          options: { runtime: u, consumeUsage: !0 }
        });
        u.pendingMutations = (u.pendingMutations ?? []).concat(V.mutations), b += Math.max(0, Number(V.packet.amount ?? 0) || 0);
      }
      for (let F = W + 1; F <= _; F += 1) {
        if (F <= 1) continue;
        const V = Bt({
          actor: e,
          phase: "onBeforeBurnApplied",
          facts: Zn({
            actor: e,
            packet: {
              actionId: r,
              category: l,
              resource: i,
              amount: 1,
              source: "attack"
            },
            runtime: u
          }),
          packet: {
            actionId: r,
            category: l,
            resource: i,
            amount: 1,
            source: "attack",
            attackIndex: F
          },
          options: { runtime: u, consumeUsage: !0 }
        });
        u.pendingMutations = (u.pendingMutations ?? []).concat(V.mutations), b += Math.max(0, Number(V.packet.amount ?? 0) || 0);
      }
      h.burnThisActivation = Math.max(0, Number(h.burnThisActivation ?? 0) + b);
    }
    return (E = u.pendingMutations) != null && E.length ? await Ai({
      actor: e,
      mutations: u.pendingMutations,
      runtime: {
        ...u,
        state: h
      }
    }) : await c.combatant.setFlag(ft, pt, h), b > 0 && await e.update({ "system.burn.value": Math.max(0, Number(((K = (x = e.system) == null ? void 0 : x.burn) == null ? void 0 : K.value) ?? 0) + b) }), { ok: !0, snapshot: this.getSnapshot(e, { token: c.token }) };
  }
  static async reduceBurn(e, { token: t = null } = {}) {
    var o, l, c, u;
    const i = this.getSnapshot(e, { token: t });
    if (!i.hasCombatant) return { ok: !1, reason: "No combatant on the current scene." };
    if (!i.isCurrentTurn) return { ok: !1, reason: "Only available during your activation." };
    if (Fn(e, i) <= 0) return { ok: !1, reason: "Activation SA cap reached." };
    if (i.burn.value <= 0) return { ok: !1, reason: "Burn is already at 0." };
    const n = await this.spendResource(e, {
      token: i.token,
      resource: "sa",
      cost: 1,
      actionId: "reduceBurn",
      actionLabel: "Reduce Burn",
      actionCostLabel: "1 SA",
      actionCategory: xe.standard
    });
    if (!n.ok) return n;
    const r = Math.max(0, Number(((l = (o = e.system) == null ? void 0 : o.burn) == null ? void 0 : l.value) ?? 0) - 1), s = { "system.burn.value": r };
    return r === 0 && ((u = (c = e.system) == null ? void 0 : c.burn) != null && u.overloaded) && (s["system.burn.overloaded"] = !1), await e.update(s), { ok: !0, snapshot: this.getSnapshot(e, { token: i.token }) };
  }
  static async finalizeActivation(e, t) {
    var m, f, p, h, g, y, b, S;
    if (!game.user.isGM || !t || !e) return;
    const i = ((f = (m = e.combatants) == null ? void 0 : m.get) == null ? void 0 : f.call(m, t)) ?? null, n = (i == null ? void 0 : i.actor) ?? null;
    if (!i || !n) return;
    const r = i.getFlag(ft, pt), s = zn(r, this.getActivationIdentity(e, i)) ? tr(r, this.getActivationIdentity(e, i)) : tr(r), l = {
      burnDelta: Number(s.saSpentThisActivation ?? 0) <= Ei && Number(s.burnThisActivation ?? 0) <= 0 && Number(s.reactionBurnSinceLastActivation ?? 0) <= 0 ? -2 : 0,
      edgeAdjustments: []
    }, c = {
      combat: e,
      combatant: i,
      state: s,
      sceneId: ((p = e.scene) == null ? void 0 : p.id) ?? ((h = canvas == null ? void 0 : canvas.scene) == null ? void 0 : h.id) ?? ""
    }, u = Bt({
      actor: n,
      phase: "onEndOfActivation",
      facts: Pd({ actor: n, packet: l, runtime: c }),
      packet: l,
      options: { runtime: c, consumeUsage: !0 }
    });
    await Ai({ actor: n, mutations: u.mutations, runtime: c });
    const d = Number(u.packet.burnDelta ?? l.burnDelta) || 0;
    if (d) {
      const w = Math.max(0, Number(((y = (g = n.system) == null ? void 0 : g.burn) == null ? void 0 : y.value) ?? 0) + d), k = { "system.burn.value": w };
      w === 0 && ((S = (b = n.system) == null ? void 0 : b.burn) != null && S.overloaded) && (k["system.burn.overloaded"] = !1), await n.update(k);
    }
    for (const w of u.packet.edgeAdjustments ?? []) {
      const k = Number((w == null ? void 0 : w.amount) ?? 0) || 0;
      !k || !(w != null && w.poolKey) || (k > 0 ? await n.gainEdge(w.poolKey, k, { skipTraitHooks: !0, source: "endOfActivationTrait" }) : await n.spendEdge(w.poolKey, Math.abs(k), { skipTraitHooks: !0, source: "endOfActivationTrait" }));
    }
  }
  static async _onUpdateCombat(e, t) {
    if (Object.prototype.hasOwnProperty.call(t ?? {}, "turn") || Object.prototype.hasOwnProperty.call(t ?? {}, "round")) {
      const n = this._lastActivationByCombat.get(e == null ? void 0 : e.id) ?? null, r = typeof n == "string" ? n : (n == null ? void 0 : n.combatantId) ?? null, s = this.getActivationIdentity(e, e == null ? void 0 : e.combatant), o = n && typeof n == "object" ? !zn(n, s) : r && r !== s.combatantId;
      r && o && await this.finalizeActivation(e, r), await this.ensureCurrentCombatantState(), await this._processCurrentCombatantHazards(e), e != null && e.id && this._lastActivationByCombat.set(e.id, s);
    }
    this.renderOpenCharacterSheets();
  }
  static async _onCreateCombatant(e) {
    var n, r, s;
    const t = e == null ? void 0 : e.combat;
    ((n = t == null ? void 0 : t.combatant) == null ? void 0 : n.id) === (e == null ? void 0 : e.id) && await this.ensureCurrentCombatantState(), await this._syncPreparedIndicatorForCombatant(e);
    const i = this._getCombatantTokenDocument(e, ((r = t == null ? void 0 : t.scene) == null ? void 0 : r.id) ?? ((s = canvas == null ? void 0 : canvas.scene) == null ? void 0 : s.id));
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
    if (foundry.utils.hasProperty(t, `flags.${ft}.${pt}`)) {
      this._syncPreparedIndicatorForCombatant(e);
      const r = this._getCombatantTokenDocument(e, this._getCombatantSceneId(e) || ((i = canvas == null ? void 0 : canvas.scene) == null ? void 0 : i.id));
      r && this._queueHazardOverlayRefresh(r), this.renderOpenCharacterSheets((n = e == null ? void 0 : e.actor) == null ? void 0 : n.id);
    }
  }
  static _onTargetToken(e, t, i) {
    var n;
    (e == null ? void 0 : e.id) === ((n = game.user) == null ? void 0 : n.id) && this.queueCharacterSheetRefresh();
  }
  static _onUpdateToken(e, t) {
    var r, s;
    if (!["x", "y", "elevation"].some(
      (o) => Object.prototype.hasOwnProperty.call(t ?? {}, o)
    ) || ((r = e == null ? void 0 : e.parent) == null ? void 0 : r.id) !== ((s = canvas == null ? void 0 : canvas.scene) == null ? void 0 : s.id)) return;
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
    var t, i, n, r, s, o;
    for (const l of e) {
      if (!l) continue;
      const c = [
        l == null ? void 0 : l.document,
        l == null ? void 0 : l.token,
        l == null ? void 0 : l.tokenDocument,
        (t = l == null ? void 0 : l.object) == null ? void 0 : t.document,
        (i = l == null ? void 0 : l.data) == null ? void 0 : i.token,
        (n = l == null ? void 0 : l.data) == null ? void 0 : n.tokenDocument,
        (r = l == null ? void 0 : l.eventData) == null ? void 0 : r.token,
        (s = l == null ? void 0 : l.eventData) == null ? void 0 : s.tokenDocument
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
    hs(e) && (await ps(e), await this._syncAllSceneHazards((e == null ? void 0 : e.parent) ?? (canvas == null ? void 0 : canvas.scene) ?? null));
  }
  static async _onUpdateRegion(e) {
    hs(e) && (await ps(e), await this._syncAllSceneHazards((e == null ? void 0 : e.parent) ?? (canvas == null ? void 0 : canvas.scene) ?? null));
  }
  static async _onDeleteRegion(e) {
    var r, s, o;
    const t = String((e == null ? void 0 : e.id) ?? "").trim();
    if (!t) return;
    const i = (e == null ? void 0 : e.parent) ?? (canvas == null ? void 0 : canvas.scene) ?? null, n = game.combat;
    for (const l of this._getCombatants(n)) {
      const c = this._getCombatantTokenDocument(l, (i == null ? void 0 : i.id) ?? ((r = canvas == null ? void 0 : canvas.scene) == null ? void 0 : r.id)), u = (c == null ? void 0 : c.actor) ?? (l == null ? void 0 : l.actor) ?? null;
      if (!u || !c) continue;
      const d = this.getSnapshot(u, { token: c });
      (s = d == null ? void 0 : d.hazards) != null && s[t] && (await this.setHazardState(u, { token: c, regionId: t, hazardState: null }), ((o = d == null ? void 0 : d.pendingReaction) == null ? void 0 : o.sourceKind) === "hazard" && d.pendingReaction.sourceId === t && await this.clearPendingReaction(u, { token: c }), this._queueHazardOverlayRefresh(c));
    }
  }
  static async _syncAllSceneHazards(e = (canvas == null ? void 0 : canvas.scene) ?? null) {
    if (e) {
      for (const t of Array.from(e.regions ?? []))
        hs(t) && await ps(t);
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
    Tr(n.hazards);
    const r = Xl(t), s = new Map(
      r.map((h) => {
        const g = $i(h);
        return g ? [String(h.id ?? "").trim(), { region: h, flag: g }] : null;
      }).filter(Boolean)
    ), o = [], l = [];
    await this.updateCombatantState(i, {
      token: t,
      mutate: (h) => {
        var g, y, b, S, w;
        h.hazards ?? (h.hazards = {});
        for (const [k, { flag: P }] of s.entries()) {
          if (h.hazards[k]) continue;
          const E = {
            tier: je((g = P == null ? void 0 : P.hazardDef) == null ? void 0 : g.startExposure, le.minor),
            turnsExposed: 0,
            evadeLocked: !1,
            lastProcessedRound: 0
          };
          h.hazards[k] = E, o.push({ regionId: k, flag: P, hazardState: E });
        }
        for (const [k, P] of Object.entries(h.hazards ?? {})) {
          if (s.has(k)) continue;
          const E = $i((S = (b = (y = canvas == null ? void 0 : canvas.scene) == null ? void 0 : y.regions) == null ? void 0 : b.get) == null ? void 0 : S.call(b, k)) ?? null;
          ((w = E == null ? void 0 : E.hazardDef) == null ? void 0 : w.clearOnExit) !== !1 && (delete h.hazards[k], l.push({ regionId: k, hazardState: P, flag: E }));
        }
        return h;
      }
    });
    for (const h of o) {
      const g = ((c = s.get(h.regionId)) == null ? void 0 : c.region) ?? ((m = (d = (u = canvas == null ? void 0 : canvas.scene) == null ? void 0 : u.regions) == null ? void 0 : d.get) == null ? void 0 : m.call(d, h.regionId)) ?? null;
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
      await ChatMessage.create(ic({
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
    const r = this.getSnapshot(n, { token: i }), s = Number((e == null ? void 0 : e.round) ?? 0) || 0, o = new Map(
      Xl(i).map((d) => {
        const m = $i(d);
        return m ? [String(d.id ?? "").trim(), { region: d, flag: m }] : null;
      }).filter(Boolean)
    );
    for (const [d, m] of Object.entries(r.hazards ?? {})) {
      if ((Number((m == null ? void 0 : m.lastProcessedRound) ?? 0) || 0) >= s) continue;
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
          lastProcessedRound: s
        }
      });
    }
    this._queueHazardOverlayRefresh(i);
  }
  static _getHazardNextTier(e = {}, t = {}) {
    var l, c, u, d;
    const i = Math.max(0, Number((e == null ? void 0 : e.turnsExposed) ?? 0) || 0), n = Math.max(1, Number(((l = t == null ? void 0 : t.escalation) == null ? void 0 : l.intervalTurns) ?? 1) || 1), r = Math.max(0, Number(((c = t == null ? void 0 : t.escalation) == null ? void 0 : c.rate) ?? 1) || 0);
    if (!(r > 0 && (i + 1) % n === 0)) return je(e == null ? void 0 : e.tier, le.none);
    let o = je(e == null ? void 0 : e.tier, le.none);
    for (let m = 0; m < r; m += 1)
      if (o = Yf(o, 1), Li(o) >= Li(((u = t == null ? void 0 : t.escalation) == null ? void 0 : u.max) ?? le.full)) {
        o = je((d = t == null ? void 0 : t.escalation) == null ? void 0 : d.max, le.full);
        break;
      }
    return o;
  }
  static async _createHazardEventChatCard({
    actor: e = null,
    token: t = null,
    region: i = null,
    hazardFlag: n = {},
    hazardState: r = {},
    eventType: s = "entry",
    nextTier: o = null,
    allowEvade: l = !1
  } = {}) {
    var h, g, y;
    if (!e) return null;
    const c = je(r == null ? void 0 : r.tier, le.none), u = je(o, c), d = l && c !== le.none && !(r != null && r.evadeLocked) ? this.getReactionSpendPreview(e, { token: t }) : null, m = {
      kind: "hazard",
      eventType: s,
      regionId: String((i == null ? void 0 : i.id) ?? "").trim(),
      regionName: String((n == null ? void 0 : n.label) ?? (i == null ? void 0 : i.name) ?? "Hazard").trim() || "Hazard",
      actorUuid: e.uuid,
      tokenUuid: (t == null ? void 0 : t.uuid) ?? ((h = t == null ? void 0 : t.document) == null ? void 0 : h.uuid) ?? null,
      actorName: e.name ?? "Target",
      turnsExposed: Math.max(0, Number((r == null ? void 0 : r.turnsExposed) ?? 0) || 0),
      baseDamage: Math.max(0, Number((n == null ? void 0 : n.damage) ?? 0) || 0),
      damageBefore: aa(Number((n == null ? void 0 : n.damage) ?? 0) || 0, c),
      damageAfter: aa(
        Number((n == null ? void 0 : n.damage) ?? 0) || 0,
        l && !(r != null && r.evadeLocked) ? zs(c, 1) : c
      ),
      damageType: String((n == null ? void 0 : n.damageType) ?? "concussive").trim() || "concussive",
      ap: Math.max(0, Number((n == null ? void 0 : n.ap) ?? 0) || 0),
      onFullBurnDelta: Math.max(0, Number(((y = (g = n == null ? void 0 : n.hazardDef) == null ? void 0 : g.onFull) == null ? void 0 : y.burnDelta) ?? 0) || 0),
      source: String((n == null ? void 0 : n.label) ?? (i == null ? void 0 : i.name) ?? "Hazard").trim() || "Hazard",
      nextTier: u,
      exposure: {
        initialTier: c,
        finalTier: c,
        initialLabel: Ft(c),
        finalLabel: Ft(c),
        evadeLocked: !!(r != null && r.evadeLocked)
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
    }, f = await Od(m, { actor: e, token: t }), p = await ChatMessage.create(ic({
      speaker: ChatMessage.getSpeaker({ actor: e, token: t }),
      content: f,
      flags: {
        mwd: {
          hazardCard: m
        }
      }
    }));
    return p && d && c !== le.none && !(r != null && r.evadeLocked) && await this.setPendingReaction(e, {
      token: t,
      pendingReaction: {
        type: "evade",
        sourceKind: "hazard",
        sourceId: String((i == null ? void 0 : i.id) ?? "").trim() || null,
        messageId: p.id,
        exposureBefore: c,
        exposureAfterPreview: zs(c, 1),
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
    const n = (i == null ? void 0 : i.actor) ?? null, r = n ? this.getSnapshot(n, { token: i }) : null, s = Object.values((r == null ? void 0 : r.hazards) ?? {}), o = cg(s);
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
    const e = /* @__PURE__ */ new Set(), t = (r) => {
      var s;
      for (const o of Object.values((r == null ? void 0 : r.apps) ?? {}))
        ((s = o == null ? void 0 : o.actor) == null ? void 0 : s.type) === "character" && e.add(o);
    };
    for (const r of Array.from(game.actors ?? []))
      t(r);
    for (const r of Array.from(((i = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : i.placeables) ?? []))
      t(r == null ? void 0 : r.actor);
    for (const r of Object.values(ui.windows ?? {}))
      ((n = r == null ? void 0 : r.actor) == null ? void 0 : n.type) === "character" && e.add(r);
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
O(Ca, "_targetRefreshTimeout", null), O(Ca, "_pendingTokenPositions", /* @__PURE__ */ new Map()), O(Ca, "_lastActivationByCombat", /* @__PURE__ */ new Map());
let z = Ca;
function Xs(a) {
  var i, n, r, s, o, l;
  const e = Math.max(0, Number(((r = (n = (i = a == null ? void 0 : a.system) == null ? void 0 : i.attributes) == null ? void 0 : n.reflexes) == null ? void 0 : r.value) ?? 0) || 0), t = Math.max(0, Number(((l = (o = (s = a == null ? void 0 : a.system) == null ? void 0 : s.attributes) == null ? void 0 : o.willpower) == null ? void 0 : l.value) ?? 0) || 0);
  return Ei + Math.floor((e + t) / 2);
}
function Fn(a, e) {
  var t;
  return Math.max(0, Xs(a) - Math.max(0, Number(((t = e == null ? void 0 : e.state) == null ? void 0 : t.saSpentThisActivation) ?? 0) || 0));
}
const Zs = Object.freeze([
  Object.freeze({ key: "close", label: "Close", min: 0, max: 5, baseDn: 2 }),
  Object.freeze({ key: "near", label: "Near", min: 6, max: 26, baseDn: 3 }),
  Object.freeze({ key: "far", label: "Far", min: 27, max: 62, baseDn: 4 }),
  Object.freeze({ key: "extreme", label: "Extreme", min: 63, max: 120, baseDn: 5 })
]), ug = new Map(Zs.map((a) => [a.key, a]));
function Un(a, e) {
  const t = Number(a);
  return !Number.isFinite(t) || t <= 0 ? e : Math.max(0, Math.trunc(t));
}
function Wr(a = "") {
  return ug.get(String(a ?? "").trim().toLowerCase()) ?? null;
}
function wr(a = "") {
  if (String(a ?? "").trim().toLowerCase() === "outofrange") return "Out of Range";
  const e = Wr(a);
  return e ? `${e.label} ${e.min}-${e.max} m` : String(a ?? "").trim() || "Range";
}
function Gr(a = "") {
  if (String(a ?? "").trim().toLowerCase() === "outofrange") return "Out of Range";
  const e = Wr(a);
  return e ? e.label : String(a ?? "").trim() || "Range";
}
function dg(a = "", e = 1) {
  if (String(a ?? "").trim().toLowerCase() === "outofrange") return 6;
  const t = Wr(a);
  return Number.isFinite(Number(t == null ? void 0 : t.baseDn)) ? Number(t.baseDn) : e;
}
function ul(a = {}) {
  return {
    max: String((a == null ? void 0 : a.max) ?? "").trim().toLowerCase() || "extreme",
    close: Un((a == null ? void 0 : a.close) ?? (a == null ? void 0 : a.short), 5),
    near: Un((a == null ? void 0 : a.near) ?? (a == null ? void 0 : a.medium), 26),
    far: Un((a == null ? void 0 : a.far) ?? (a == null ? void 0 : a.long), 62),
    extreme: Un(a == null ? void 0 : a.extreme, 120)
  };
}
function mg(a, e = {}, t = "close") {
  var u;
  const i = Number(a);
  if (!Number.isFinite(i) || i < 0)
    return String(t ?? "close").trim().toLowerCase() || "close";
  const n = ul(e), r = ((u = Wr(n.max)) == null ? void 0 : u.key) ?? "extreme", s = Zs.findIndex((d) => d.key === r), o = Number((n == null ? void 0 : n[r]) ?? NaN);
  if (Number.isFinite(o) && i > o)
    return "outOfRange";
  let l = "extreme";
  i <= n.close ? l = "close" : i <= n.near ? l = "near" : i <= n.far && (l = "far");
  const c = Zs.findIndex((d) => d.key === l);
  return s >= 0 && c > s ? r : l;
}
const Na = "lifeModuleCatalog", qr = Object.freeze([
  { moduleType: "faction", label: "Faction" },
  { moduleType: "childhood", label: "Childhood" },
  { moduleType: "higherEducation", label: "Higher Education" },
  { moduleType: "realLife", label: "Real Life" }
]), fg = Object.freeze(
  Object.fromEntries(qr.map((a) => [a.moduleType, a.label]))
), pg = new Set(qr.map((a) => a.moduleType)), hg = /* @__PURE__ */ new Set(["skill", "edgePool"]), dl = Object.freeze({
  grit: "Grit",
  chaos: "Chaos",
  insight: "Insight",
  rumor: "Rumor",
  legend: "Legend",
  credibility: "Credibility"
}), Ld = Object.freeze(Object.keys(dl)), gg = Object.freeze({
  skill: "Skill",
  edgePool: "Edge Pool"
}), yg = Object.freeze(kg()), bg = Object.freeze(vg()), Sg = /* @__PURE__ */ new Set(["artillery", "gunnery", "piloting", "heavyWeapons"]), Ag = /* @__PURE__ */ new Set([
  "artillery",
  "gunnery",
  "heavyWeapons",
  "meleeCombat",
  "piloting",
  "projectileWeapons",
  "firearms"
]), Tg = Object.freeze(
  di.map((a) => a.code).filter((a) => !Ag.has(a))
), wg = Object.freeze(fa([
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
        ...Tg.map((a) => ({ type: "skill", value: a })),
        ...Ld.map((a) => ({ type: "edgePool", value: a }))
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
    skillChoices: di.map((a) => a.code).filter((a) => !Sg.has(a)),
    excludesAny: [
      "higher-education-military-enlistment",
      "higher-education-military-academy",
      "higher-education-family-training",
      "higher-education-officer-candidate-school"
    ]
  }
], { strict: !1 }));
function kg() {
  const a = /* @__PURE__ */ new Map();
  for (const e of di) {
    const t = String(e.code ?? "").trim(), i = String(e.label ?? "").trim();
    t && (a.set(t.toLowerCase(), t), i && a.set(i.toLowerCase(), t));
  }
  return a;
}
function vg() {
  const a = /* @__PURE__ */ new Map();
  for (const [e, t] of Object.entries(dl))
    a.set(e.toLowerCase(), e), a.set(t.toLowerCase(), e), a.set(`${t.toLowerCase()} pool`, e);
  return a;
}
function Mg(a = []) {
  const e = Array.isArray(a) ? a.filter(Boolean) : [String(a ?? "").trim()].filter(Boolean), t = new Error(e[0] ?? "Invalid life module data.");
  return t.validationErrors = e, t;
}
function _d(a) {
  return Array.isArray(a) ? a : typeof a == "string" ? a.split(",").map((e) => e.trim()).filter(Boolean) : [];
}
function Nn(a) {
  return String(a ?? "").trim().toLowerCase().replace(/['\u2019]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function Vr(a) {
  const e = String(a ?? "").trim();
  return pg.has(e) ? e : "";
}
function Yr(a) {
  const e = String(a ?? "").trim();
  return e ? yg.get(e.toLowerCase()) ?? "" : "";
}
function Cg(a) {
  const e = String(a ?? "").trim();
  return e ? bg.get(e.toLowerCase()) ?? "" : "";
}
function Eg(a, { strict: e = !1, errors: t = [], prefix: i = "Entry" } = {}) {
  const n = /* @__PURE__ */ new Set(), r = [];
  for (const s of _d(a)) {
    const o = Yr(s);
    if (!o) {
      e && t.push(`${i}: unknown skill "${s}".`);
      continue;
    }
    n.has(o) || (n.add(o), r.push(o));
  }
  return r;
}
function ac(a) {
  const e = /* @__PURE__ */ new Set();
  return _d(a).map(Nn).filter((t) => !t || e.has(t) ? !1 : (e.add(t), !0));
}
function nc(a = [], e = /* @__PURE__ */ new Map()) {
  return a.map((t) => {
    var i;
    return ((i = e.get(t)) == null ? void 0 : i.label) ?? t;
  });
}
function $a(a = {}) {
  return `${a.type}:${a.value}`;
}
function Pg(a) {
  var e;
  return ((e = Dt(a)) == null ? void 0 : e.label) ?? a;
}
function xd(a) {
  return dl[a] ?? a;
}
function Rg(a) {
  return gg[a] ?? a;
}
function Ng(a = {}, { includeTypePrefix: e = !1 } = {}) {
  const t = String((a == null ? void 0 : a.type) ?? "").trim(), i = String((a == null ? void 0 : a.value) ?? "").trim();
  if (!t || !i) return "";
  const n = t === "skill" ? Pg(i) : `${xd(i)} Pool`;
  return e ? `${Rg(t)}: ${n}` : n;
}
function gn(a = {}, { includeBonusText: e = !1, includeTypePrefix: t = !1 } = {}) {
  const i = Ng(a, { includeTypePrefix: t });
  return i ? e ? a.type === "skill" ? `+1 ${i} rolls` : `+1 ${i}` : i : "";
}
function Ig(a) {
  const e = String(a ?? "").trim(), t = e.indexOf(":");
  return t < 0 ? null : {
    type: e.slice(0, t).trim(),
    value: e.slice(t + 1).trim()
  };
}
function Dg(a, { strict: e = !1, errors: t = [], prefix: i = "Entry", grantLabel: n = "Bonus" } = {}) {
  const r = typeof a == "string" ? Ig(a) : a, s = String((r == null ? void 0 : r.type) ?? "").trim(), o = String((r == null ? void 0 : r.value) ?? "").trim();
  if (!hg.has(s))
    return e && t.push(`${i} ${n}: unknown bonus type "${s || a}".`), null;
  const l = s === "skill" ? Yr(o) : Cg(o);
  return l ? {
    type: s,
    value: l
  } : (e && t.push(`${i} ${n}: unknown ${s === "skill" ? "skill" : "edge pool"} "${o}".`), null);
}
function eo(a, { strict: e = !1, errors: t = [], prefix: i = "Entry", grantLabel: n = "Bonus" } = {}) {
  const r = /* @__PURE__ */ new Set(), s = [], o = Array.isArray(a) ? a : [];
  for (const l of o) {
    const c = Dg(l, { strict: e, errors: t, prefix: i, grantLabel: n });
    if (!c) continue;
    const u = $a(c);
    r.has(u) || (r.add(u), s.push(c));
  }
  return s;
}
function $d(a, { strict: e = !1, errors: t = [], prefix: i = "Entry" } = {}) {
  const n = Eg(a, { strict: e, errors: t, prefix: i });
  return n.length ? [{
    id: "skill",
    label: "",
    choices: n.map((r) => ({ type: "skill", value: r }))
  }] : [];
}
function Og(a, { strict: e = !1, errors: t = [], prefix: i = "Entry" } = {}) {
  const n = String(a ?? "").trim();
  return n ? n.split(";").map((s) => s.trim()).filter(Boolean).map((s, o) => {
    const l = `Bonus ${o + 1}`, c = eo(
      s.split("|").map((u) => u.trim()).filter(Boolean),
      { strict: e, errors: t, prefix: i, grantLabel: l }
    );
    return {
      id: `grant-${o + 1}`,
      label: "",
      choices: c
    };
  }).filter((s) => s.choices.length) : [];
}
function Bd(a, e = "grant") {
  return Nn(a) || e;
}
function Lg(a, e, { strict: t = !1, errors: i = [], prefix: n = "Entry" } = {}) {
  const r = `grant-${e + 1}`, s = `Bonus ${e + 1}`;
  if (typeof a == "string") {
    const u = eo(
      a.split("|").map((d) => d.trim()).filter(Boolean),
      { strict: t, errors: i, prefix: n, grantLabel: s }
    );
    return u.length ? { id: r, label: "", choices: u } : null;
  }
  const o = Bd(a == null ? void 0 : a.id, r), l = String((a == null ? void 0 : a.label) ?? "").trim(), c = eo(a == null ? void 0 : a.choices, { strict: t, errors: i, prefix: n, grantLabel: s });
  return c.length ? { id: o, label: l, choices: c } : (t && i.push(`${n} ${s}: define at least one bonus choice.`), null);
}
function _g(a, { strict: e = !1, errors: t = [], prefix: i = "Entry" } = {}) {
  if (Array.isArray(a)) {
    if (a.every((r) => typeof r == "string" && !String(r).includes(":")))
      return $d(a, { strict: e, errors: t, prefix: i });
    const n = /* @__PURE__ */ new Set();
    return a.map((r, s) => Lg(r, s, { strict: e, errors: t, prefix: i })).filter((r) => r ? n.has(r.id) ? (e && t.push(`${i}: duplicate bonus id "${r.id}".`), !1) : (n.add(r.id), !0) : !1);
  }
  return typeof a == "string" ? Og(a, { strict: e, errors: t, prefix: i }) : [];
}
function xg(a = []) {
  return (Array.isArray(a) ? a : []).map((e) => (Array.isArray(e == null ? void 0 : e.choices) ? e.choices : []).map((i) => `${i.type}:${i.value}`).join("|")).filter(Boolean).join("; ");
}
function ml() {
  return foundry.utils.deepClone(wg);
}
function Ba(a) {
  return fg[a] ?? (String(a ?? "").trim() || "Life Module");
}
function zd() {
  return qr.map((a) => ({
    value: a.moduleType,
    label: a.label
  }));
}
function fa(a = [], { strict: e = !1 } = {}) {
  const t = Array.isArray(a) ? a : [], i = [], n = /* @__PURE__ */ new Set(), r = t.map((o, l) => {
    const c = `Entry ${l + 1}`, u = String((o == null ? void 0 : o.label) ?? "").trim(), d = Nn((o == null ? void 0 : o.id) ?? u), m = Vr(o == null ? void 0 : o.moduleType), f = (o == null ? void 0 : o.grants) != null ? _g(o.grants, { strict: e, errors: i, prefix: c }) : $d(o == null ? void 0 : o.skillChoices, { strict: e, errors: i, prefix: c }), p = ac(o == null ? void 0 : o.requiresAny), h = ac(o == null ? void 0 : o.excludesAny);
    return !d && e && i.push(`${c}: id cannot be blank.`), !u && e && i.push(`${c}: label cannot be blank.`), !m && e && i.push(`${c}: choose a valid module type.`), !f.length && e && i.push(`${c}: choose at least one bonus.`), d && n.has(d) && e && i.push(`${c}: duplicate id "${d}".`), d && n.add(d), {
      id: d,
      label: u,
      moduleType: m,
      grants: f,
      requiresAny: p,
      excludesAny: h
    };
  }), s = new Map(r.map((o) => [o.id, o]));
  for (const o of r) {
    for (const l of o.requiresAny)
      l === o.id && e && i.push(`${o.label || o.id}: cannot require itself.`), !s.has(l) && e && i.push(`${o.label || o.id}: unknown requirement "${l}".`);
    for (const l of o.excludesAny)
      l === o.id && e && i.push(`${o.label || o.id}: cannot exclude itself.`), !s.has(l) && e && i.push(`${o.label || o.id}: unknown exclusion "${l}".`);
  }
  if (e && i.length) throw Mg(i);
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
function Fd(a = []) {
  const e = new Map(ml().map((r) => [r.id, r])), t = fa(a, { strict: !1 }), i = [...t], n = new Set(t.map((r) => r.id));
  for (const [r, s] of e.entries())
    n.has(r) || i.push(foundry.utils.deepClone(s));
  return i;
}
async function $g() {
  var a, e, t;
  try {
    if (!((t = (e = (a = game == null ? void 0 : game.settings) == null ? void 0 : a.settings) == null ? void 0 : e.has) != null && t.call(e, `${T}.${Na}`))) return;
    const i = game.settings.get(T, Na), n = Fd(i);
    JSON.stringify(i) !== JSON.stringify(n) && await game.settings.set(T, Na, n);
  } catch {
  }
}
function Bg() {
  var a, e, t;
  try {
    if ((t = (e = (a = game == null ? void 0 : game.settings) == null ? void 0 : a.settings) == null ? void 0 : e.has) != null && t.call(e, `${T}.${Na}`))
      return Fd(game.settings.get(T, Na));
  } catch {
  }
  return ml();
}
function Qr() {
  return fa(Bg(), { strict: !1 });
}
function xi(a) {
  const e = Nn(a);
  return e ? Qr().find((t) => t.id === e) ?? null : null;
}
function fl(a) {
  const e = Vr(a);
  return Qr().filter((t) => t.moduleType === e);
}
function Ud(a) {
  return !a || typeof a != "object" || Array.isArray(a) ? {} : Object.fromEntries(
    Object.entries(a).map(([e, t]) => [Bd(e, ""), String(t ?? "").trim()]).filter(([e]) => !!e)
  );
}
function jd(a, e = "", { legacySelectedSkill: t = "" } = {}) {
  const i = new Set((Array.isArray(a == null ? void 0 : a.choices) ? a.choices : []).map($a)), n = String(e ?? "").trim();
  if (i.has(n)) return n;
  if (t) {
    const r = Yr(t), s = r ? `skill:${r}` : "";
    if (s && i.has(s)) return s;
  }
  return i.size === 1 ? Array.from(i)[0] : "";
}
function Hd(a, e = {}, { legacySelectedSkill: t = "" } = {}) {
  const i = Array.isArray(a == null ? void 0 : a.grants) ? a.grants : [], n = Ud(e);
  return Object.fromEntries(
    i.map((r) => [
      r.id,
      jd(r, n[r.id], { legacySelectedSkill: t })
    ])
  );
}
function Jr(a, e = {}, { legacySelectedSkill: t = "" } = {}) {
  const i = Array.isArray(a == null ? void 0 : a.grants) ? a.grants : [], n = Hd(a, e, { legacySelectedSkill: t });
  return i.map((r, s) => {
    const o = jd(r, n[r.id], { legacySelectedSkill: t }), l = (Array.isArray(r.choices) ? r.choices : []).find((c) => $a(c) === o) ?? null;
    return {
      id: r.id,
      index: s,
      label: String((r == null ? void 0 : r.label) ?? "").trim() || (i.length > 1 ? `Bonus ${s + 1}` : "Granted Bonus"),
      selectedKey: o,
      choice: l,
      isResolved: !!l,
      requiresSelection: (Array.isArray(r == null ? void 0 : r.choices) ? r.choices : []).length > 1
    };
  });
}
function zg(a, e = {}, { legacySelectedSkill: t = "" } = {}) {
  var i;
  return ((i = Jr(a, e, { legacySelectedSkill: t }).map((n) => n.choice).find((n) => (n == null ? void 0 : n.type) === "skill")) == null ? void 0 : i.value) ?? "";
}
function yn(a = {}) {
  const e = foundry.utils.deepClone(a ?? {}), t = Nn(e.catalogId), i = t ? xi(t) : null, n = Vr(e.moduleType || (i == null ? void 0 : i.moduleType)), r = i ? Hd(i, e.selectedGrants, { legacySelectedSkill: e.selectedSkill }) : Ud(e.selectedGrants);
  return e.moduleType = n, e.catalogId = t, e.selectedGrants = r, e.selectedSkill = i ? zg(i, r, { legacySelectedSkill: e.selectedSkill }) : Yr(e.selectedSkill), e;
}
function Kd(a, e = {}, { legacySelectedSkill: t = "" } = {}) {
  return Jr(a, e, { legacySelectedSkill: t }).map((i) => {
    var l, c;
    const n = Array.isArray((c = (l = a == null ? void 0 : a.grants) == null ? void 0 : l[i.index]) == null ? void 0 : c.choices) ? a.grants[i.index].choices : [], r = new Set(n.map((u) => u.type)).size > 1, s = n.map((u) => ({
      value: $a(u),
      label: gn(u, { includeTypePrefix: r }),
      selected: $a(u) === i.selectedKey
    })), o = s.length === 1 ? {
      value: s[0].value,
      label: s[0].label,
      displayLabel: gn(n[0], { includeBonusText: !0 })
    } : null;
    return {
      id: i.id,
      label: i.label,
      selectionPath: `system.selectedGrants.${i.id}`,
      selectedKey: i.selectedKey,
      options: s,
      singleOption: o,
      hasMultipleChoices: s.length > 1
    };
  });
}
function Fg(a, e) {
  return a.isDuplicate ? `Duplicate ${Ba(a.moduleType)} slot item.` : a.catalog ? a.unresolvedGrantCount > 0 ? "Choose valid bonus options." : a.excludedBy.length ? `Blocked by ${nc(a.excludedBy, e).join(", ")}.` : a.requiresAny.length && !a.matchedRequirementIds.length ? `Requires ${nc(a.requiresAny, e).join(" or ")}.` : "" : "Catalog entry is missing or unlinked.";
}
function Ug(a, e = [], t = {}) {
  var n, r, s;
  if (!a || !Array.isArray(e) || !e.length) return [];
  const i = Math.max(0, Number(((s = (r = (n = a.system) == null ? void 0 : n.attributes) == null ? void 0 : r.edge) == null ? void 0 : s.value) ?? 0));
  return e.filter((o) => (o == null ? void 0 : o.type) === "edgePool").map((o) => {
    var p, h, g, y;
    const l = String(o.value ?? "").trim(), c = xd(l), u = Math.max(0, Number(((y = (g = (h = (p = a.system) == null ? void 0 : p.counters) == null ? void 0 : h.edgePools) == null ? void 0 : g[l]) == null ? void 0 : y.rating) ?? 0)), d = Math.max(0, Number((t == null ? void 0 : t[l]) ?? 0)), m = Math.max(0, u + d - i);
    return m ? `${c} Pool bonus loses ${m} ${m === 1 ? "point" : "points"} to the Edge cap.` : "";
  }).filter(Boolean);
}
function Bi(a) {
  var m;
  const e = Qr(), t = new Map(e.map((f) => [f.id, f])), i = Array.from((a == null ? void 0 : a.items) ?? []).filter((f) => f.type === A.itemType.lifeModule), n = /* @__PURE__ */ new Map();
  for (const f of i) {
    const p = Vr((m = f.system) == null ? void 0 : m.moduleType);
    !p || n.has(p) || n.set(p, f.id);
  }
  const r = i.map((f) => {
    var k;
    const p = yn(f.system ?? {}), h = t.get(p.catalogId) ?? null, g = p.moduleType || (h == null ? void 0 : h.moduleType) || "", y = h ? Jr(h, p.selectedGrants, { legacySelectedSkill: p.selectedSkill }) : [], b = y.map((P) => P.choice).filter(Boolean), S = ((k = b.find((P) => P.type === "skill")) == null ? void 0 : k.value) ?? "", w = S ? Dt(S) : null;
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
      selectedChoiceLabels: b.map((P) => gn(P, { includeBonusText: !0 })),
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
  }), s = /* @__PURE__ */ new Map();
  for (const f of r) {
    if (!f.catalogId) continue;
    const p = s.get(f.catalogId) ?? [];
    p.push(f), s.set(f.catalogId, p);
  }
  for (const f of r)
    f.excludedBy = f.excludesAny.filter((p) => (s.get(p) ?? []).length > 0);
  let o = !0;
  for (; o; ) {
    o = !1;
    for (const f of r) {
      const p = f.requiresAny.filter(
        (g) => (s.get(g) ?? []).some((y) => y.isActive)
      ), h = !f.isDuplicate && !!f.catalog && f.unresolvedGrantCount === 0 && f.excludedBy.length === 0 && (f.requiresAny.length === 0 || p.length > 0);
      f.isActive !== h && (f.isActive = h, o = !0), f.matchedRequirementIds.join("|") !== p.join("|") && (f.matchedRequirementIds = p);
    }
  }
  const l = Object.fromEntries(di.map((f) => [f.code, 0])), c = Object.fromEntries(Ld.map((f) => [f, 0])), u = /* @__PURE__ */ new Map();
  for (const f of r) {
    const p = f.isActive ? f.selectedChoices : [], h = p.filter((y) => y.type === "skill"), g = p.filter((y) => y.type === "edgePool");
    f.bonus = h.length;
    for (const y of h)
      l[y.value] = Number(l[y.value] ?? 0) + 1;
    for (const y of g)
      c[y.value] = Number(c[y.value] ?? 0) + 1;
    f.inactiveReason = f.isActive ? "" : Fg(f, t), u.set(f.itemId, f);
  }
  for (const f of r)
    f.warningLabels = f.isActive ? Ug(a, f.selectedChoices, c) : [];
  const d = qr.map((f) => {
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
function jg(a = {}) {
  var t, i, n;
  const e = String((a == null ? void 0 : a.intent) ?? "").trim();
  return e === "skill" ? String(((t = a == null ? void 0 : a.data) == null ? void 0 : t.skillKey) ?? "").trim() : e === "attack" ? String(((n = (i = a == null ? void 0 : a.attack) == null ? void 0 : i.skill) == null ? void 0 : n.code) ?? "").trim() : "";
}
function Hg({ actor: a, resolved: e } = {}) {
  const t = jg(e);
  return !a || !t ? [] : Bi(a).states.flatMap(
    (i) => i.isActive ? i.selectedChoices.filter((n) => n.type === "skill" && n.value === t).map((n) => ({
      id: `life-module:${i.itemId}:${$a(n)}`,
      label: i.label,
      value: 1,
      source: "Life Module",
      tooltip: `${i.label}: +1 to ${gn(n)} rolls`
    })) : []
  );
}
const Kg = {
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
        shock: {
          value: 0
        },
        reliabilitySpendable: {
          value: 0
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
      templates: [
        "mwd-base"
      ],
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
        reliability: {
          value: 3
        }
      },
      mwd: {
        locations: {
          front: {
            enabled: !0,
            stress: 0,
            condition: 0,
            tags: [
              "weaponGroup",
              "motiveSystem"
            ],
            destroyed: !1
          },
          side: {
            enabled: !0,
            stress: 0,
            condition: 0,
            tags: [
              "weaponGroup",
              "motiveSystem"
            ],
            destroyed: !1
          },
          rear: {
            enabled: !0,
            stress: 0,
            condition: 0,
            tags: [
              "weaponGroup",
              "motiveSystem",
              "ammoStore"
            ],
            destroyed: !1
          },
          turret: {
            enabled: !0,
            stress: 0,
            condition: 0,
            tags: [
              "turret",
              "weaponGroup"
            ],
            destroyed: !1
          },
          rotor: {
            enabled: !1,
            stress: 0,
            condition: 0,
            tags: [
              "rotor"
            ],
            destroyed: !1
          },
          core: {
            enabled: !0,
            stress: 0,
            condition: 0,
            tags: [
              "crewCompartment",
              "engine",
              "ammoStore"
            ],
            destroyed: !1
          }
        }
      },
      movement: {
        ground: 0,
        flight: 0
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
        reliability: {
          value: 3
        }
      },
      mwd: {
        unitType: "mech",
        locations: {
          head: {
            enabled: !0,
            stress: 0,
            condition: 0,
            tags: [
              "cockpit",
              "sensor"
            ],
            destroyed: !1
          },
          torso: {
            enabled: !0,
            stress: 0,
            condition: 0,
            tags: [
              "weaponGroup",
              "engine",
              "gyro",
              "ammoStore"
            ],
            destroyed: !1
          },
          arms: {
            enabled: !0,
            stress: 0,
            condition: 0,
            tags: [
              "weaponGroup"
            ],
            destroyed: !1
          },
          legs: {
            enabled: !0,
            stress: 0,
            condition: 0,
            tags: [
              "motiveSystem"
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
    },
    "machine-movement-battlemech": {
      movement: {
        ground: 0,
        flight: 0,
        jump: 0
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
      "mwd-battlemech",
      "machine-movement-battlemech"
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
}, Wg = {
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
}, Xr = {
  Actor: Kg,
  Item: Wg
}, rc = Object.freeze({
  Actor: /* @__PURE__ */ new Set(["prototypeToken"]),
  Item: /* @__PURE__ */ new Set()
});
function bn(a) {
  return !!a && typeof a == "object" && !Array.isArray(a);
}
function za(a) {
  return typeof structuredClone == "function" ? structuredClone(a) : JSON.parse(JSON.stringify(a));
}
function Sn(a = {}, e = {}) {
  const t = za(a);
  for (const [i, n] of Object.entries(e ?? {})) {
    if (bn(n) && bn(t[i])) {
      t[i] = Sn(t[i], n);
      continue;
    }
    t[i] = za(n);
  }
  return t;
}
function Wd(a = "", e = Xr) {
  const t = e == null ? void 0 : e[a];
  return bn(t) ? t : {};
}
function Gd(a = Xr, e = "", t = "", i = /* @__PURE__ */ new Set()) {
  var c;
  const n = String(t ?? "").trim();
  if (!n || i.has(n)) return {};
  const r = Wd(e, a), s = (c = r == null ? void 0 : r.templates) == null ? void 0 : c[n];
  if (!bn(s)) return {};
  i.add(n);
  let o = {};
  for (const u of Array.from(s.templates ?? []))
    o = Sn(
      o,
      Gd(a, e, u, i)
    );
  const l = za(s);
  return delete l.templates, Sn(o, l);
}
function Gg(a = Xr, e = "", t = "") {
  const i = String(t ?? "").trim();
  if (!i) return {};
  const n = Wd(e, a), r = n == null ? void 0 : n[i];
  if (!bn(r)) return {};
  let s = {};
  for (const l of Array.from(r.templates ?? []))
    s = Sn(
      s,
      Gd(a, e, l)
    );
  const o = za(r);
  return delete o.templates, Sn(s, o);
}
function qg(a = "", e = "", t = Xr) {
  const i = Gg(t, a, e), n = rc[a] ?? rc.Item, r = { system: {} };
  for (const [s, o] of Object.entries(i))
    n.has(s) ? r[s] = za(o) : r.system[s] = za(o);
  return r;
}
async function qd(a = "", e = "") {
  return qg(a, e);
}
const Vd = Object.freeze({
  weapon: A.itemType.personalWeapon,
  shadowamp: A.itemType.assetModule
}), Vg = Object.freeze({
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
function Yd(a) {
  return Vd[a] ?? a;
}
function Yg(a) {
  return Vg[Yd(a)];
}
function Qg(a) {
  return Object.prototype.hasOwnProperty.call(Vd, a);
}
const la = Object.freeze(["close", "near", "far", "extreme"]), sc = Object.freeze({
  none: { targets: 1, adjust: [0] },
  shotgun: { targets: 2, adjust: [0, -2] },
  circle: { targets: void 0 },
  cone: { targets: void 0 },
  rect: { targets: void 0 },
  ray: { targets: void 0 }
});
function Qa() {
  return foundry.data.operators.ForcedDeletion;
}
function Jg(a, e) {
  const t = String(e ?? "").split(".").map((n) => n.trim()).filter(Boolean);
  if (!a || typeof a != "object" || t.length < 2) return a;
  let i = a;
  for (let n = 0; n < t.length - 1; n += 1) {
    const r = t[n], s = i == null ? void 0 : i[r];
    (!s || typeof s != "object" || Array.isArray(s)) && (i[r] = {}), i = i[r];
  }
  return a;
}
function Xg(a, e) {
  const t = String(e ?? "").trim();
  if (!a || typeof a != "object" || !t) return !1;
  if (t.startsWith("areaEffect.hazard.")) {
    (!a.areaEffect || typeof a.areaEffect != "object" || Array.isArray(a.areaEffect)) && (a.areaEffect = {});
    const i = String(a.areaEffect.kind ?? "").trim().toLowerCase();
    if (i && i !== "persistent")
      return !1;
    a.areaEffect.kind = "persistent";
  }
  return Jg(a, t), !0;
}
function Ja(a) {
  return Ua(a);
}
function oc(a = {}) {
  const e = Mu({
    traits: a.traits,
    keywords: a.keywords,
    report: Ho(),
    path: "system.traits"
  });
  return {
    traits: e.traits,
    keywords: e.keywords
  };
}
function Qd(a) {
  return a === "long" ? "extreme" : a === "short" ? "close" : a === "medium" ? "near" : la.includes(a) ? a : "near";
}
function Ta(a) {
  const e = ul(a);
  return e.max = Qd(e.max ?? (a == null ? void 0 : a.max) ?? "extreme"), e;
}
function gs(a) {
  return {
    close: Number((a == null ? void 0 : a.close) ?? (a == null ? void 0 : a.short) ?? 0) || 0,
    near: Number((a == null ? void 0 : a.near) ?? (a == null ? void 0 : a.medium) ?? 0) || 0,
    far: Number((a == null ? void 0 : a.far) ?? (a == null ? void 0 : a.long) ?? 0) || 0,
    extreme: Number((a == null ? void 0 : a.extreme) ?? 0) || 0
  };
}
function lc(a, e = 1) {
  const t = Number(a);
  return Number.isFinite(t) ? Math.max(0, Math.trunc(t)) : Math.max(0, Math.trunc(Number(e) || 0));
}
function cc(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? Math.max(0, Math.trunc(t)) : Math.max(0, Math.trunc(Number(e) || 0));
}
function uc(a) {
  return String(a ?? "").trim();
}
function dc(a) {
  return (Array.isArray(a) ? a : typeof a == "string" ? a.split(",") : []).map((t) => String(t ?? "").trim()).filter(Boolean);
}
function Zg(a) {
  const e = la.indexOf(a);
  return e >= 0 ? e : la.indexOf("near");
}
function ey(a = Ta({})) {
  const e = ["near", "close", "far", "extreme"], t = Zg(a.max);
  return e.find((i) => la.indexOf(i) <= t) ?? "close";
}
function ty(a) {
  const e = Qd(a == null ? void 0 : a.max), t = la.indexOf(e);
  return la.map((i, n) => ({
    key: i,
    allowed: t >= 0 ? n <= t : n === 0,
    value: (a == null ? void 0 : a[i]) ?? void 0,
    labelkey: wr(i)
  }));
}
function iy(a, e, t, i) {
  let n = Number(e);
  if (t)
    if (i !== void 0)
      n += Math.ceil(Number(i) / 2);
    else
      return console.warn("Weapon not attached to an actor"), $e.item.personalWeapon.weaponWithoutActor;
  return n;
}
function ay(a, e, t) {
  let i = "";
  return t && $e.attributes[t] && (i += $e.attributes[t].substring(0, 3).toUpperCase() + "/2 + "), i += String(e), i;
}
function ny(a, e) {
  return G.useArmor(a) ? e ? "noArmor" : "withArmor" : "";
}
function mc(a) {
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
function ys(a = {}) {
  const e = yn(a), t = xi(e.catalogId);
  return {
    system: e,
    ...t ? { name: t.label } : {}
  };
}
function ry(a) {
  const e = String(a ?? "").trim();
  return !!(!e || e.startsWith("icons/svg/") || e === "icons/mystery-man.svg");
}
var kn, Vt, to, Jd, ar;
const ht = class ht extends Item {
  static init() {
    H(this, kn) || (Ee(this, kn, !0), Hooks.on("createItem", (e, t, i) => {
      var n, r;
      Promise.resolve((n = e.onCreateItem) == null ? void 0 : n.call(e, t, i)).catch((s) => {
        console.error(`${Me}Item create hook failed`, s);
      }), C(r = ht, Vt, to).call(r, e);
    }), Hooks.on("updateItem", (e) => {
      var t;
      C(t = ht, Vt, to).call(t, e);
    }), Hooks.on("deleteItem", (e) => {
      var t;
      C(t = ht, Vt, Jd).call(t, e);
    }), Hooks.on("createActiveEffect", (e) => {
      var t;
      C(t = ht, Vt, ar).call(t, e);
    }), Hooks.on("updateActiveEffect", (e) => {
      var t;
      C(t = ht, Vt, ar).call(t, e);
    }), Hooks.on("deleteActiveEffect", (e) => {
      var t;
      C(t = ht, Vt, ar).call(t, e);
    }));
  }
  static canonicalType(e) {
    return Yd(e);
  }
  static defaultIconForType(e) {
    return Yg(e);
  }
  get canonicalType() {
    return this.constructor.canonicalType(this.type);
  }
  async onCreateItem(e, t) {
  }
  async _preCreate(e, t, i) {
    super._preCreate && await super._preCreate(e, t, i);
    const n = (e == null ? void 0 : e.type) ?? this.type, r = this.constructor.canonicalType(n), s = {}, o = await qd("Item", r);
    if (o.system && Object.keys(o.system).length && (s.system = foundry.utils.mergeObject(
      foundry.utils.deepClone(o.system),
      foundry.utils.deepClone((e == null ? void 0 : e.system) ?? this.system ?? {}),
      { inplace: !1, recursive: !0, overwrite: !0 }
    )), n !== r && Qg(n) && (s.type = r), ry((e == null ? void 0 : e.img) ?? this.img)) {
      const l = this.constructor.defaultIconForType(r);
      l && (s.img = l);
    }
    if (r === A.itemType.lifeModule && (!(e != null && e.name) || e.name === "DOCUMENT.Item") && (s.name = "MWD.itemType.singular.lifeModule"), r === A.itemType.lifeModule) {
      const l = ys(s.system ?? (e == null ? void 0 : e.system) ?? this.system ?? {});
      s.system = l.system, l.name && (!(e != null && e.name) || e.name === "DOCUMENT.Item") && (s.name = l.name);
    }
    Object.keys(s).length && this.updateSource(s);
  }
  async _preUpdate(e, t, i) {
    var l, c;
    super._preUpdate && await super._preUpdate(e, t, i);
    const n = e != null && e.system ? foundry.utils.mergeObject(foundry.utils.deepClone(this.system ?? {}), foundry.utils.deepClone(e.system), { inplace: !1 }) : null;
    if (n && this.isPersonalWeapon()) {
      e.system ?? (e.system = {});
      const u = n.ammo, d = oc(n);
      e.system.standardTraits = [], e.system.payloads = gi(n.payloads, { legacyAmmo: u, category: n.category }), e.system.consumptionSources = Za(n.consumptionSources, { legacyAmmo: u }), e.system.selectedPayloadId = Aa(
        n.selectedPayloadId,
        e.system.payloads,
        { legacyAmmo: u, category: n.category }
      ), e.system.traits = d.traits, e.system.keywords = d.keywords, e.system.resolution = Yn(n.resolution, "standard"), e.system.fireModes = Qn(n.fireModes), e.system.attackRatingBand = gs(n.attackRatingBand), e.system.range = Ta(n.range), e.system.damageType = Yt(n.damageType), e.system.ammo = Qa();
    }
    if (n && this.isArmor() && (e.system ?? (e.system = {}), e.system.mitigationByType = li(n.mitigationByType ?? n.mitigation), e.system.tags = Vn(n.tags), e.system.traits = Ja(n.traits), e.system.standardTraits = hi(n.standardTraits), e.system.traitState = us({
      standardTraits: e.system.standardTraits,
      traits: e.system.traits,
      traitState: n.traitState
    }).traitState), n && this.isLifeModule()) {
      const u = ys(n);
      e.system ?? (e.system = {}), foundry.utils.mergeObject(e.system, u.system, { inplace: !0, overwrite: !0 }), u.name && (e.name = u.name);
      return;
    }
    if (n && this.isQuality()) {
      e.system ?? (e.system = {});
      const u = qt(n);
      foundry.utils.mergeObject(e.system, u, { inplace: !0, overwrite: !0 });
      return;
    }
    if (n && this.isQuantityTrackedInventoryItem()) {
      e.system ?? (e.system = {}), e.system.quantity = lc(n.quantity, 1), e.system.rating = cc(n.rating, 0), e.system.category = uc(n.category), e.system.tags = dc(n.tags);
      return;
    }
    if (!this.isSkill()) return;
    const r = (l = e == null ? void 0 : e.system) == null ? void 0 : l.code;
    if (r === void 0) return;
    const s = this.system.code;
    if (r === s) return;
    const o = mc(r);
    o && ((c = o == null ? void 0 : o.system) == null || delete c.code, foundry.utils.mergeObject(e, o, { inplace: !0 }));
  }
  prepareBaseData() {
    super.prepareBaseData();
    const e = this.canonicalType;
    e === A.itemType.personalWeapon ? this._preparePersonalWeaponBaseData() : e === A.itemType.armor ? this._prepareArmorBaseData() : e === A.itemType.lifeModule ? this._prepareLifeModuleBaseData() : e === A.itemType.quality ? this._prepareQualityBaseData() : [A.itemType.gear, A.itemType.consumable].includes(e) && this._prepareGearBaseData();
  }
  _preparePersonalWeaponBaseData() {
    const e = this.system ?? {}, t = e.ammo;
    e.equipped = !!e.equipped, e.isPrimary = !!e.isPrimary, e.category = String(e.category ?? e.weaponCategory ?? "ranged").trim() || "ranged", e.skill = String(e.skill ?? "firearms").trim() || "firearms", e.ap = Number(e.ap ?? e.armorPiercing ?? 0) || 0, e.damage = Number(e.damage ?? 0) || 0, e.damageType = Yt(e.damageType), e.attackRatingBand = gs(e.attackRatingBand), e.range = Ta(e.range);
    const i = oc(e);
    e.standardTraits = [], e.traits = i.traits, e.keywords = i.keywords, e.resolution = Yn(e.resolution, "standard"), e.fireModes = Qn(e.fireModes), e.payloads = gi(e.payloads, { legacyAmmo: t, category: e.category }), e.consumptionSources = Za(e.consumptionSources, { legacyAmmo: t }), e.selectedPayloadId = Aa(e.selectedPayloadId, e.payloads, { legacyAmmo: t, category: e.category }), delete e.ammo, e.notes = String(e.notes ?? "").trim();
  }
  _prepareArmorBaseData() {
    const e = this.system ?? {};
    e.equipped = !!e.equipped, e.isPrimary = !!e.isPrimary, e.rating = Math.max(0, Number(e.rating ?? 0)), e.defenseBonus = Number(e.defenseBonus ?? 0) || 0, e.mitigationByType = li(e.mitigationByType ?? e.mitigation), delete e.mitigation, e.durability ?? (e.durability = {}), e.durability.max = Math.max(0, Number(e.durability.max ?? e.rating ?? 0)), e.durability.current = Math.min(
      e.durability.max,
      Math.max(0, Number(e.durability.current ?? e.durability.max ?? e.rating ?? 0))
    ), e.standardTraits = hi(e.standardTraits), e.tags = Vn(e.tags), e.traits = Ja(e.traits), e.traitState = us({
      standardTraits: e.standardTraits,
      traits: e.traits,
      traitState: e.traitState
    }).traitState, e.notes = String(e.notes ?? "").trim();
  }
  _prepareLifeModuleBaseData() {
    const e = ys(this.system ?? {});
    foundry.utils.mergeObject(this.system, e.system, { inplace: !0, overwrite: !0 });
  }
  _prepareQualityBaseData() {
    const e = qt(this.system ?? {});
    foundry.utils.mergeObject(this.system, e, { inplace: !0, overwrite: !0 });
  }
  _prepareGearBaseData() {
    const e = this.system ?? {};
    e.quantity = lc(e.quantity, 1), e.rating = cc(e.rating, 0), e.category = uc(e.category), e.tags = dc(e.tags);
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
      var n, r;
      const i = (r = (n = t.flags) == null ? void 0 : n[T]) == null ? void 0 : r[ht.EQUIPPED_EFFECT_FLAG];
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
      const y = (h = (p = (f = g.flags) == null ? void 0 : f[T]) == null ? void 0 : p[ht.EQUIPPED_EFFECT_FLAG]) == null ? void 0 : h.sourceEffectId;
      if (!y) continue;
      const b = n.get(y) ?? [];
      b.push(g), n.set(y, b);
    }
    const r = [], s = [], o = [], l = new Set(i.map((g) => g.id));
    for (const [g, y] of n.entries()) {
      if (!l.has(g)) {
        o.push(...y.map((b) => b.id));
        continue;
      }
      y.length > 1 && o.push(...y.slice(1).map((b) => b.id));
    }
    for (const g of i) {
      const b = (n.get(g.id) ?? [])[0] ?? null, S = this._prepareSyncedActorEffectData(g);
      b ? s.push({ _id: b.id, ...S }) : r.push(S);
    }
    const c = o.length ? await e.deleteEmbeddedDocuments("ActiveEffect", o) : [], u = s.length ? await e.updateEmbeddedDocuments("ActiveEffect", s) : [];
    return { created: r.length ? await e.createEmbeddedDocuments("ActiveEffect", r) : [], updated: u, deleted: c };
  }
  _prepareSyncedActorEffectData(e) {
    const t = e.toObject();
    delete t._id;
    const i = String(e.name ?? "Effect").trim() || "Effect", n = String(this.name ?? "Item").trim() || "Item", r = i.startsWith(n) ? i : `${n}: ${i}`;
    return t.name = r, t.transfer = !1, t.origin = e.uuid ?? this.uuid ?? t.origin ?? null, t.flags = foundry.utils.mergeObject(t.flags ?? {}, {
      [T]: {
        [ht.EQUIPPED_EFFECT_FLAG]: {
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
    this.parent && await ri.itemAttributeRoll(this, e);
  }
  async switchMonitorCheck(e, t, i, n = void 0) {
    await G.switchMonitorCheck(this.parent, e, t, i, n, this);
  }
  async setCounter(e, t) {
    await G.setCounter(this, e, t);
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
    ue.reindexIds(t), await this.update({ "system.modifiers": t });
  }
  async _mutateQualitySystem(e = (t) => t) {
    const t = e(foundry.utils.deepClone(qt(this.system ?? {})));
    await this.update({ system: qt(t) });
  }
  async createQualityPrerequisite(e = {}) {
    await this._mutateQualitySystem((t) => (t.prerequisites = bi(t.prerequisites).concat([{
      id: e.id ?? foundry.utils.randomID(),
      fact: e.fact ?? "",
      comparator: e.comparator ?? "eq",
      value: e.value ?? ""
    }]), t));
  }
  async deleteQualityPrerequisite(e) {
    await this._mutateQualitySystem((t) => (t.prerequisites = bi(t.prerequisites).filter((i) => i.id !== e), t));
  }
  async updateQualityPrerequisite(e, t, i) {
    await this._mutateQualitySystem((n) => (n.prerequisites = bi(n.prerequisites).map((r) => (r.id !== e || (t === "fact" && (r.fact = i), t === "comparator" && (r.comparator = i), t === "value" && (r.value = i)), r)), n));
  }
  async createQualityEffect(e = {}) {
    await this._mutateQualitySystem((t) => (t.effects = Ki(t.effects).concat([{
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
      conditions: bi(e.conditions ?? []),
      limit: _i(e.limit ?? {})
    }]), t));
  }
  async deleteQualityEffect(e) {
    await this._mutateQualitySystem((t) => (t.effects = Ki(t.effects).filter((i) => i.id !== e), t));
  }
  async updateQualityEffect(e, t, i) {
    await this._mutateQualitySystem((n) => (n.effects = Ki(n.effects).map((r) => (r.id !== e || (t === "type" && (r.type = i), t === "phase" && (r.phase = i), t === "selector" && (r.selector = i), t === "skillKeys" && (r.skillKeys = Array.isArray(i) ? i : []), t === "label" && (r.label = i), t === "value" && (r.value = Number(i ?? 0) || 0), t === "min" && (r.min = i === "" ? null : Number(i ?? 0)), t === "max" && (r.max = i === "" ? null : Number(i ?? 0)), t === "pool" && (r.pool = i), t === "operation" && (r.operation = i), t === "limit.perActivation" && (r.limit = _i({ ...r.limit ?? {}, perActivation: i })), t === "limit.perRound" && (r.limit = _i({ ...r.limit ?? {}, perRound: i })), t === "limit.perScene" && (r.limit = _i({ ...r.limit ?? {}, perScene: i }))), r)), n));
  }
  async createQualityEffectCondition(e, t = {}) {
    await this._mutateQualitySystem((i) => (i.effects = Ki(i.effects).map((n) => (n.id !== e || (n.conditions = bi(n.conditions).concat([{
      id: t.id ?? foundry.utils.randomID(),
      fact: t.fact ?? "",
      comparator: t.comparator ?? "eq",
      value: t.value ?? ""
    }])), n)), i));
  }
  async deleteQualityEffectCondition(e, t) {
    await this._mutateQualitySystem((i) => (i.effects = Ki(i.effects).map((n) => (n.id !== e || (n.conditions = bi(n.conditions).filter((r) => r.id !== t)), n)), i));
  }
  async updateQualityEffectCondition(e, t, i, n) {
    await this._mutateQualitySystem((r) => (r.effects = Ki(r.effects).map((s) => (s.id !== e || (s.conditions = bi(s.conditions).map((o) => (o.id !== t || (i === "fact" && (o.fact = n), i === "comparator" && (o.comparator = n), i === "value" && (o.value = n)), o))), s)), r));
  }
  async _mutateWeaponStandardTraits(e = (t) => t) {
    var i;
    const t = e(foundry.utils.deepClone(Wi((i = this.system) == null ? void 0 : i.standardTraits)));
    await this.update({ "system.standardTraits": Wi(t) });
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
    await this._mutateWeaponStandardTraits((n) => n.map((r) => (r.id !== e || (t === "key" && (r.key = i), t === "rating" && (r.rating = Math.max(0, Number(i ?? 0) || 0))), r)));
  }
  async _mutateArmorStandardTraits(e = (t) => t) {
    var i;
    const t = e(foundry.utils.deepClone(hi((i = this.system) == null ? void 0 : i.standardTraits)));
    await this.update({ "system.standardTraits": hi(t) });
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
    await this._mutateArmorStandardTraits((n) => n.map((r) => (r.id !== e || (t === "key" && (r.key = i), t === "rating" && (r.rating = Math.max(0, Number(i ?? 0) || 0))), r)));
  }
  async _mutatePayloads(e = (t) => t) {
    var n, r, s, o, l, c, u;
    const t = e(foundry.utils.deepClone(
      gi((n = this.system) == null ? void 0 : n.payloads, {
        legacyAmmo: (r = this.system) == null ? void 0 : r.ammo,
        category: ((s = this.system) == null ? void 0 : s.category) ?? ((o = this.system) == null ? void 0 : o.weaponCategory)
      })
    )).map(Pt), i = Aa((l = this.system) == null ? void 0 : l.selectedPayloadId, t, {
      category: ((c = this.system) == null ? void 0 : c.category) ?? ((u = this.system) == null ? void 0 : u.weaponCategory)
    });
    await this.update({
      "system.payloads": t,
      "system.selectedPayloadId": i,
      "system.ammo": Qa()
    });
  }
  async _mutateConsumptionSources(e = (t) => t) {
    var i, n;
    const t = e(foundry.utils.deepClone(
      Za((i = this.system) == null ? void 0 : i.consumptionSources, { legacyAmmo: (n = this.system) == null ? void 0 : n.ammo })
    )).map(ni);
    await this.update({
      "system.consumptionSources": t,
      "system.ammo": Qa()
    });
  }
  async updatePayloadField(e, t, i) {
    String(e ?? "").trim() !== "unloaded" && await this._mutatePayloads((n) => n.map((r) => r.id !== e ? r : (Xg(r, t) && foundry.utils.setProperty(r, t, i), Pt(r))));
  }
  async createPayload(e = {}) {
    await this._mutatePayloads((t) => t.concat([Pt({
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
    var r, s, o, l, c;
    if (String(e ?? "").trim() === "unloaded") return;
    const t = ((r = this.system) == null ? void 0 : r.category) ?? ((s = this.system) == null ? void 0 : s.weaponCategory), i = gi((o = this.system) == null ? void 0 : o.payloads, {
      legacyAmmo: (l = this.system) == null ? void 0 : l.ammo,
      category: t
    }).filter((u) => u.id !== e), n = ((c = i[0]) == null ? void 0 : c.id) ?? "unloaded";
    await this.update({
      "system.payloads": i.length ? i : gi([], { category: t }),
      "system.selectedPayloadId": i.some((u) => {
        var d;
        return u.id === ((d = this.system) == null ? void 0 : d.selectedPayloadId);
      }) ? this.system.selectedPayloadId : i.length ? n : "",
      "system.ammo": Qa()
    });
  }
  async createPayloadStandardTrait(e, t = {}) {
    String(e ?? "").trim() !== "unloaded" && await this._mutatePayloads((i) => i.map((n) => n.id !== e ? n : (n.modifies ?? (n.modifies = {}), n.modifies.standardTraits = Wi(n.modifies.standardTraits).concat([{
      id: t.id ?? foundry.utils.randomID(),
      key: t.key ?? "armorPiercing",
      rating: Math.max(0, Number(t.rating ?? 0) || 0)
    }]), Pt(n))));
  }
  async deletePayloadStandardTrait(e, t) {
    String(e ?? "").trim() !== "unloaded" && await this._mutatePayloads((i) => i.map((n) => n.id !== e ? n : (n.modifies ?? (n.modifies = {}), n.modifies.standardTraits = Wi(n.modifies.standardTraits).filter((r) => r.id !== t), Pt(n))));
  }
  async updatePayloadStandardTrait(e, t, i, n) {
    String(e ?? "").trim() !== "unloaded" && await this._mutatePayloads((r) => r.map((s) => s.id !== e ? s : (s.modifies ?? (s.modifies = {}), s.modifies.standardTraits = Wi(s.modifies.standardTraits).map((o) => (o.id !== t || (i === "key" && (o.key = n), i === "rating" && (o.rating = Math.max(0, Number(n ?? 0) || 0))), o)), Pt(s))));
  }
  async createConsumptionSource(e = {}) {
    await this._mutateConsumptionSources((t) => t.concat([ni({
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
      return ((n = i == null ? void 0 : i.consumption) == null ? void 0 : n.sourceId) !== e ? i : (i.consumption.sourceId = "", Pt(i));
    }));
  }
  async updateConsumptionSourceField(e, t, i) {
    await this._mutateConsumptionSources((n) => n.map((r) => {
      var s, o, l;
      if (r.id !== e) return r;
      if (foundry.utils.setProperty(r, t, i), t === "kind" && r.kind === "itemRef" && (r.link ?? (r.link = {}), String(r.link.itemPath ?? "").trim() || (r.link.itemPath = "quantity"), (!String(r.label ?? "").trim() || String(r.label ?? "").trim() === "Source") && (r.label = "Linked Item")), t === "link.itemId" && r.kind === "itemRef") {
        r.link ?? (r.link = {}), String(r.link.itemPath ?? "").trim() || (r.link.itemPath = "quantity");
        const c = ((l = (o = (s = this.actor) == null ? void 0 : s.items) == null ? void 0 : o.get) == null ? void 0 : l.call(o, String(r.link.itemId ?? "").trim())) ?? null;
        c && (!String(r.label ?? "").trim() || ["Source", "Linked Item"].includes(String(r.label ?? "").trim())) && (r.label = c.name ?? r.label);
      }
      return ni(r);
    }));
  }
  getPayloadState({ payloadId: e = "", ammoTypeId: t = "" } = {}) {
    var i, n, r, s, o;
    return Ws({
      payloads: (i = this.system) == null ? void 0 : i.payloads,
      selectedPayloadId: (n = this.system) == null ? void 0 : n.selectedPayloadId,
      consumptionSources: (r = this.system) == null ? void 0 : r.consumptionSources,
      actor: this.actor ?? null,
      payloadId: e || t,
      category: ((s = this.system) == null ? void 0 : s.category) ?? ((o = this.system) == null ? void 0 : o.weaponCategory)
    });
  }
  getActivePayloadReloadState({ payloadId: e = "", ammoTypeId: t = "", user: i = game.user } = {}) {
    var p, h, g;
    const n = String(((p = this.system) == null ? void 0 : p.category) ?? ((h = this.system) == null ? void 0 : h.weaponCategory) ?? "").trim().toLowerCase(), r = {
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
    if (n === "melee")
      return { ...r, reason: "Melee weapons do not use reloadable payloads." };
    const s = this.getPayloadState({ payloadId: e || t }), o = (s == null ? void 0 : s.sourceState) ?? null, l = (s == null ? void 0 : s.source) ?? null, c = String((s == null ? void 0 : s.activePayloadId) ?? "").trim(), u = String((s == null ? void 0 : s.payloadLabel) ?? "").trim() || "Unloaded", d = Math.max(0, Number((o == null ? void 0 : o.current) ?? 0) || 0), m = Math.max(0, Number((o == null ? void 0 : o.max) ?? 0) || 0), f = !!((g = z.getCombat(this.actor)) != null && g.combatant);
    return !c || c === "unloaded" ? {
      ...r,
      reason: "Select a payload before reloading.",
      payloadLabel: u,
      activePayloadId: c,
      payloadState: s,
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
      payloadState: s,
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
      payloadState: s,
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
      payloadState: s,
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
      payloadState: s,
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
      payloadState: s,
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
      payloadState: s,
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
    return !i.canReload || !((n = i.source) != null && n.id) ? { ok: !1, ...i } : (await this._mutateConsumptionSources((r) => r.map((s) => {
      var o;
      return s.id !== i.source.id ? s : (s.tracking ?? (s.tracking = {}), s.tracking.max = Math.max(0, Number(((o = s.tracking) == null ? void 0 : o.max) ?? i.max) || i.max), s.tracking.current = i.max, ni(s));
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
    var i, n, r, s, o, l;
    const t = Aa(
      e,
      gi((i = this.system) == null ? void 0 : i.payloads, {
        legacyAmmo: (n = this.system) == null ? void 0 : n.ammo,
        category: ((r = this.system) == null ? void 0 : r.category) ?? ((s = this.system) == null ? void 0 : s.weaponCategory)
      }),
      {
        category: ((o = this.system) == null ? void 0 : o.category) ?? ((l = this.system) == null ? void 0 : l.weaponCategory)
      }
    );
    await this.update({
      "system.selectedPayloadId": t,
      "system.ammo": Qa()
    });
  }
  canConsumePayload({ payloadId: e = "", ammoTypeId: t = "" } = {}) {
    var n;
    const i = this.getPayloadState({ payloadId: e || t });
    return (n = i == null ? void 0 : i.sourceState) != null && n.isTracked ? Number(i.sourceState.current ?? 0) >= Number(i.sourceState.consumePerUse ?? 1) : !0;
  }
  async consumePayload({ payloadId: e = "", ammoTypeId: t = "" } = {}) {
    var s;
    const i = this.getPayloadState({ payloadId: e || t });
    if (!((s = i == null ? void 0 : i.sourceState) != null && s.isTracked)) return !0;
    const n = Math.max(1, Number(i.sourceState.consumePerUse ?? 1) || 1), r = Math.max(0, Number(i.sourceState.current ?? 0) || 0);
    return r < n ? !1 : i.sourceState.kind === "internal" ? (await this._mutateConsumptionSources((o) => o.map((l) => {
      var c;
      return l.id !== ((c = i.source) == null ? void 0 : c.id) ? l : (l.tracking ?? (l.tracking = {}), l.tracking.current = Math.max(0, r - n), ni(l));
    })), !0) : i.sourceState.kind === "actorResource" && this.actor && i.sourceState.currentPath ? (await this.actor.update({
      [i.sourceState.currentPath]: Math.max(0, r - n)
    }), !0) : i.sourceState.kind === "itemRef" && i.sourceState.sourceItem && i.sourceState.currentPath ? (await i.sourceState.sourceItem.update({
      [i.sourceState.currentPath]: Math.max(0, r - n)
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
    const i = this.system ?? {}, n = Ta(i.range), r = String(i.skill ?? "").trim(), s = Dt(r), o = Number(i.damage ?? 0) || 0, l = String(i.category ?? i.weaponCategory ?? "ranged").trim() || "ranged", c = Cp({
      damageType: i.damageType,
      ap: Number(i.ap ?? i.armorPiercing ?? 0) || 0,
      attackRatingBand: gs(i.attackRatingBand),
      traits: Ja(i.traits),
      keywords: fp(i.keywords),
      standardTraits: [],
      resolution: Yn(i.resolution, "standard"),
      fireModes: Qn(i.fireModes),
      payloads: gi(i.payloads, { legacyAmmo: i.ammo, category: l }),
      selectedPayloadId: Aa(i.selectedPayloadId, i.payloads, { legacyAmmo: i.ammo, category: l }),
      consumptionSources: Za(i.consumptionSources, { legacyAmmo: i.ammo }),
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
      skillDef: s,
      damage: o,
      ap: c.ap,
      damageType: c.damageType,
      damageTypeLabel: Qt(c.damageType),
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
    const t = this.system ?? {}, i = Math.max(0, Number(t.rating ?? 0)), n = Math.max(0, Number(((d = t == null ? void 0 : t.durability) == null ? void 0 : d.max) ?? i)), r = Math.min(
      n,
      Math.max(0, Number(((m = t == null ? void 0 : t.durability) == null ? void 0 : m.current) ?? n))
    ), s = Math.min(i, r), o = li((t == null ? void 0 : t.mitigationByType) ?? (t == null ? void 0 : t.mitigation)), l = us({
      standardTraits: hi(t == null ? void 0 : t.standardTraits),
      traits: Ja(t == null ? void 0 : t.traits),
      traitState: t == null ? void 0 : t.traitState
    }), c = Vn(t == null ? void 0 : t.tags), u = qo(s);
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
      currentArmorRating: s,
      ratingCurrent: s,
      remainingDurability: r,
      baseMitigation: u,
      baseResistance: u,
      mitigationByType: qu(o, l.mitigationByType),
      tags: c,
      isDestroyed: r <= 0,
      durability: {
        current: r,
        max: n
      },
      traitState: l.traitState,
      standardTraits: hi(t.standardTraits),
      traits: Ep({
        traits: Ja(t.traits),
        standardTraits: hi(t.standardTraits)
      }),
      notes: String(t.notes ?? "").trim()
    };
  }
  getDefaultRangeBand(e = Ta(((t) => (t = this.system) == null ? void 0 : t.range)())) {
    return ey(e);
  }
  isWeaponSkill(e) {
    return ((e == null ? void 0 : e.canonicalType) ?? (e == null ? void 0 : e.type)) === A.itemType.skill && e.system.code === this.system.skill;
  }
  getWeaponSkill() {
    var i;
    const e = (i = this.actor) == null ? void 0 : i.items.find((n) => this.isWeaponSkill(n));
    if (e) return e;
    const t = game.items.find((n) => this.isWeaponSkill(n));
    return t || mc(this.system.skill);
  }
  getDefense() {
    if (!this.isPersonalWeapon())
      return this.system.defense ? Fe.fixedDefenseCode(this.system.defense) : void 0;
    if (this.system.defense)
      return Fe.fixedDefenseCode(this.system.defense);
    const e = Dt(String(this.system.skill ?? "").trim());
    return e != null && e.defense ? Fe.fixedDefenseCode(e.defense) : void 0;
  }
  getDamage() {
    if (!this.parent) return;
    const e = this._getMonitor(), t = this.system.damageAttribute ? this.parent.getAttributeValue(this.system.damageAttribute) ?? 0 : 0, i = this.isPersonalWeapon() ? this.getCombatProfile() : null;
    return {
      value: iy(
        e,
        this.system.damage,
        this.system.damageAttribute,
        t
      ),
      monitor: e,
      damageType: (i == null ? void 0 : i.damageType) ?? this.system.damageType,
      damageTypeLabel: (i == null ? void 0 : i.damageTypeLabel) ?? this.getDamageTypeLabel(),
      noArmor: this.system.noArmor ?? this.system.armorAvoidance,
      armorMode: ny(e, this.system.noArmor ?? this.system.armorAvoidance)
    };
  }
  getDamageCode() {
    return ay(
      this._getMonitor(),
      this.system.damage,
      this.system.damageAttribute
    );
  }
  getDamageTypeLabel() {
    var t;
    if (this.isPersonalWeapon())
      return Qt(((t = this.getCombatProfile()) == null ? void 0 : t.damageType) ?? this.system.damageType);
    const e = $e.mwd.weaponDamageType[this.system.damageType] ?? $e.mwd.personalDamageType[this.system.damageType];
    return e || this.system.damageType;
  }
  getRanges() {
    return ty(Ta(this.system.range)).filter((e) => e.allowed).map((e) => ({ value: e.value, labelkey: e.labelkey }));
  }
  validateTargets(e) {
    var s;
    const t = (s = this.getDamage()) == null ? void 0 : s.monitor, i = Gt.getTargetTokens(game.user), n = i.filter((o) => {
      var l;
      return (l = o.actor) == null ? void 0 : l.canReceiveDamage(t);
    }), r = i.filter((o) => {
      var l;
      return !((l = o.actor) != null && l.canReceiveDamage(t));
    }).map((o) => o.name);
    if (r.length > 0) {
      const o = Re($e.common.errors.ignoredTargets, {
        targets: r.reduce(ue.joiner(", "))
      });
      ui.notifications.info(o);
    }
    if (n.length === 0) {
      const o = Re($e.common.errors.noTargetSelected, {
        weapon: this.name ?? $e.itemType.singular.weapon
      });
      ui.notifications.info(o);
    } else
      this.checkWeaponTargetsCount(n);
    return n;
  }
  checkWeaponTargetsCount(e) {
    const t = this.system.area, i = sc[t] ?? {};
    da.checkTargetsCount(i.targets ?? 0, e, t);
  }
  getAreaModifier(e) {
    const t = this.getArea(), i = sc[t] ?? {};
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
kn = new WeakMap(), Vt = new WeakSet(), to = async function(e) {
  if (typeof (e == null ? void 0 : e.syncEquippedActorEffects) == "function")
    try {
      await e.syncEquippedActorEffects();
    } catch (t) {
      console.error(`${Me}Failed to sync equipped item effects`, { item: e, error: t });
    }
}, Jd = async function(e) {
  if (typeof (e == null ? void 0 : e.removeSyncedActorEffects) == "function")
    try {
      await e.removeSyncedActorEffects({ actor: e.actor ?? e.parent ?? null });
    } catch (t) {
      console.error(`${Me}Failed to remove synced item effects`, { item: e, error: t });
    }
}, ar = async function(e) {
  const t = e == null ? void 0 : e.parent;
  if (typeof (t == null ? void 0 : t.syncEquippedActorEffects) == "function")
    try {
      await t.syncEquippedActorEffects();
    } catch (i) {
      console.error(`${Me}Failed to sync parent item effects`, { effect: e, error: i });
    }
}, we(ht, Vt), we(ht, kn, !1), O(ht, "RANGE_ORDER", la), O(ht, "EQUIPPED_EFFECT_FLAG", "equippedItemSync"), O(ht, "DEFAULT_UNARMED", Object.freeze({
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
let Fa = ht;
const fc = {
  none: { targets: 1, adjust: [0] },
  shotgun: { targets: 2, adjust: [0, -2] },
  circle: { targets: void 0 },
  cone: { targets: void 0 },
  rect: { targets: void 0 },
  ray: { targets: void 0 }
}, sy = {
  code: "weapon-range",
  options: {
    flags: { editable: !0 },
    order: 20,
    category: ke.pool,
    labelkey: $e.common.roll.modifiers.weaponRange,
    hbsTemplateRoll: `${ee}/roll/parts/select-option.hbs`,
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
}, oy = {
  code: "weapon-area",
  options: {
    used: !0,
    order: 20,
    category: ke.pool,
    labelkey: $e.common.roll.modifiers.weaponArea,
    hbsTemplateRoll: `${ee}/roll/parts/input-numeric.hbs`,
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
}, Ae = class Ae extends Fa {
  static buildDefaultUnarmedProfile(e = null) {
    var n, r, s, o, l, c, u, d;
    const t = Math.max(0, Number(
      ((n = e == null ? void 0 : e.getAttributeValue) == null ? void 0 : n.call(e, A.actorAttributes.strength)) ?? ((o = (s = (r = e == null ? void 0 : e.system) == null ? void 0 : r.attributes) == null ? void 0 : s.strength) == null ? void 0 : o.value) ?? 0
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
    Hooks.once(Rt.REGISTER_ROLL_PARAMETERS, (e) => {
      e(oy), e(sy);
    });
  }
  prepareBaseData() {
    if (super.prepareBaseData(), (this.canonicalType ?? this.type) !== A.itemType.personalWeapon) return;
    const e = this.system ?? {};
    e.equipped = !!e.equipped, e.isPrimary = !!e.isPrimary, e.category = String(e.category ?? e.weaponCategory ?? "ranged").trim() || "ranged", e.skill = String(e.skill ?? "firearms").trim() || "firearms", e.ap = Number(e.ap ?? e.armorPiercing ?? 0) || 0, e.damage = Number(e.damage ?? 0) || 0, e.damageType = Yt(e.damageType), e.attackRatingBand = Ae.normalizeAttackRatingBand(e.attackRatingBand), e.range = Ae.normalizePersonalRangeData(e.range), e.traits = Ae.normalizeTraits(e.traits), e.notes = String(e.notes ?? "").trim();
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
    const t = e ?? {}, i = Ae.normalizeRangeKey(t.max ?? "near"), n = Ae.maxIndex(i), r = Ae.RANGE_ORDER.map((l, c) => ({
      key: l,
      allowed: c <= n,
      value: Number(t[l] ?? (l === "extreme" && t.long !== void 0 ? t.long : 0))
    }));
    let s = "close", o = -1 / 0;
    for (const l of r)
      l.allowed && l.value > o && (o = l.value, s = l.key);
    return { cap: i, bands: r, optimalKey: s };
  }
  static get defaultIcon() {
    return "systems/mwd/img/colt-m1911.svg";
  }
  static defaultIconForType(e) {
    return e === A.itemType.mechWeapon ? "systems/mwd/img/default/Default_Weapon.svg" : this.defaultIcon;
  }
  static normalizeTraits(e) {
    return Ua(e);
  }
  static normalizePersonalRangeData(e) {
    const t = ul(e);
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
    const t = this.system ?? {}, i = this.canonicalType ?? this.type, n = i === A.itemType.personalWeapon ? Ae.normalizePersonalRangeData(t.range) : Ae.normalizeRangeData(t.range), r = String(t.skill ?? "").trim(), s = Dt(r), o = Number(t.damage ?? 0) || 0, l = Number(t.ap ?? t.armorPiercing ?? 0) || 0, c = String(t.category ?? t.weaponCategory ?? "ranged").trim() || "ranged", u = Ae.normalizeTraits(t.traits);
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
      skillDef: s,
      damage: o,
      ap: l,
      damageType: i === A.itemType.personalWeapon ? Yt(t.damageType) : String(t.damageType ?? "kinetic").trim() || "kinetic",
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
    return i.find((r) => Ae.RANGE_ORDER.indexOf(r) <= n) ?? "close";
  }
  getWeaponSkill() {
    var i;
    const e = (i = this.actor) == null ? void 0 : i.items.find(
      (n) => n.type === A.itemType.skill && n.system.code === this.system.skill
    );
    if (e) return e;
    const t = Dt(String(this.system.skill ?? "").trim());
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
      return this.system.defense ? Fe.fixedDefenseCode(this.system.defense) : void 0;
    if (this.system.defense)
      return Fe.fixedDefenseCode(this.system.defense);
    const e = Dt(String(this.system.skill ?? "").trim());
    return e != null && e.defense ? Fe.fixedDefenseCode(e.defense) : void 0;
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
        return console.warn("Weapon not attached to an actor"), $e.item.personalWeapon.weaponWithoutActor;
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
    return i && $e.attributes[i] && (n += $e.attributes[i].substring(0, 3).toUpperCase() + "/2 + "), n += String(t), n;
  }
  static armorMode(e, t) {
    return G.useArmor(e) ? t ? "noArmor" : "withArmor" : "";
  }
  getDamageTypeLabel() {
    if ((this.canonicalType ?? this.type) === A.itemType.personalWeapon)
      return Qt(this.system.damageType);
    const e = $e.mwd.weaponDamageType[this.system.damageType] ?? $e.mwd.personalDamageType[this.system.damageType];
    return e || this.system.damageType;
  }
  getRanges() {
    const e = (this.canonicalType ?? this.type) === A.itemType.personalWeapon, t = e ? Ae.normalizePersonalRangeData(this.system.range) : Ae.normalizeRangeData(this.system.range);
    return Ae.getRangeList(t, {
      personalScale: e
    }).filter((i) => i.allowed).map((i) => ({ value: i.value, labelkey: i.labelkey }));
  }
  _getRange(e) {
    return { value: this.system.range[e], labelkey: ve.getFromList(ve.getEnums().ranges, e) };
  }
  static getRangeList(e, { personalScale: t = !1 } = {}) {
    const i = Ae.normalizeRangeKey(e == null ? void 0 : e.max), n = Ae.RANGE_ORDER.indexOf(i);
    return Ae.RANGE_ORDER.map((r, s) => ({
      key: r,
      allowed: n >= 0 ? s <= n : s === 0,
      value: (e == null ? void 0 : e[r]) ?? (r === "extreme" && (e == null ? void 0 : e.long) !== void 0 ? e.long : void 0),
      labelkey: t ? wr(r) : ve.getFromList(ve.getEnums().ranges, r)
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
    var s;
    const t = (s = this.getDamage()) == null ? void 0 : s.monitor, i = Gt.getTargetTokens(game.user), n = i.filter((o) => {
      var l;
      return (l = o.actor) == null ? void 0 : l.canReceiveDamage(t);
    }), r = i.filter((o) => {
      var l;
      return !((l = o.actor) != null && l.canReceiveDamage(t));
    }).map((o) => o.name);
    if (r.length > 0) {
      const o = Re($e.common.errors.ignoredTargets, {
        targets: r.reduce(ue.joiner(", "))
      });
      ui.notifications.info(o);
    }
    if (n.length == 0) {
      const o = Re($e.common.errors.noTargetSelected, {
        weapon: this.name ?? $e.itemType.singular.weapon
      });
      ui.notifications.info(o);
    } else
      this.checkWeaponTargetsCount(n);
    return n;
  }
  checkWeaponTargetsCount(e) {
    const t = this.system.area, i = fc[t] ?? {};
    da.checkTargetsCount(i.targets ?? 0, e, t);
  }
  getAreaModifier(e) {
    const t = this.getArea(), i = fc[t] ?? {};
    return i.targets && i.adjust && e <= i.targets ? i.adjust[e - 1] ?? 0 : 0;
  }
  getArea() {
    return this.system.area == "" ? A.area.none : this.system.area ?? A.area.none;
  }
  _getMonitor() {
    return (this.canonicalType ?? this.type) === A.itemType.personalWeapon ? A.monitors.physical : this.system.monitor || A.monitors.physical;
  }
};
O(Ae, "RANGE_ORDER", ["close", "near", "far", "extreme"]), O(Ae, "DEFAULT_UNARMED", Fa.DEFAULT_UNARMED);
let zt = Ae;
function ly(a) {
  const e = [];
  for (let [t, i] of Object.entries(a ?? {}))
    i !== void 0 && (t = t.replace(/[A-Z]+(?![a-z])|[A-Z]/g, (n, r) => (r ? "-" : "") + n.toLowerCase()), e.push(`data-${t}="${Handlebars.escapeExpression(i)}"`));
  return new Handlebars.SafeString(e.join(" "));
}
function cy({ hash: a }) {
  return a;
}
function uy() {
  var a, e;
  return ((e = (a = foundry == null ? void 0 : foundry.applications) == null ? void 0 : a.handlebars) == null ? void 0 : e.Handlebars) ?? Handlebars;
}
class pl {
  constructor() {
    this.registerHelpers(), Hooks.once("init", () => {
      this.registerHelpers(), console.log(`${Me}Handlebars helpers registered (init)`);
    }), console.log(`${Me}Handlebars helpers registered (ctor)`);
  }
  registerHelpers() {
    const e = uy(), t = {
      // Foundry utils
      getProperty: foundry.utils.getProperty,
      // DND5E-inspired utilities
      "mwd-dataset": ly,
      "mwd-object": cy,
      // Simple comparisons
      eq: (i, n) => i === n,
      ne: (i, n) => i !== n,
      // Strings/arrays
      concat: (...i) => ue.join(i.slice(0, -1)),
      join: (i, n = " ") => Array.isArray(i) ? i.join(n) : "",
      includes: (i, n) => i == null ? void 0 : i.includes(n),
      length: (i) => (i == null ? void 0 : i.length) || 0,
      substring: (i, n, r) => i == null ? void 0 : i.substring(n, r),
      toUpperCase: Pf.toUpperCaseNoAccent,
      // Math
      modulo: (i, n) => i % n,
      divint: ue.divint,
      divup: ue.divup,
      sum: (i, n) => i + n,
      diff: (i, n) => i - n,
      times: (i, n) => i * n,
      min: (i, n) => Math.min(i, n),
      max: (i, n) => Math.max(i, n),
      // Utility blocks
      for: pl.hbsForLoop,
      // fixes “Missing helper: for”
      range: (i, n) => Array.from({ length: n - i + 1 }, (r, s) => i + s),
      ifGte: (i, n, r) => i >= n ? r.fn(this) : r.inverse(this),
      // Damage / weapons (legacy-compatible)
      weaponDamageLetter: Ef.letter,
      weaponDamageCode: zt.damageCode,
      weaponDamageValue: zt.damageValue,
      weaponArmorMode: zt.armorMode,
      weaponRangeList: zt.getRangeList,
      // Icons
      iconFA: Z.fontAwesome,
      iconSrc: Z.iconSystemPath,
      iconPath: Z.iconPath,
      iconD6: Z.iconD6,
      // Enums
      localizeAttribute: ve.localizeAttribute
    };
    e.registerHelper(t), e !== Handlebars && Handlebars.registerHelper(t);
  }
  static hbsForLoop(e, t, i) {
    let n = "";
    for (let r = e; r < t; ++r) n += i.fn(r);
    return n;
  }
}
const pc = "sheetTheme", io = "mwd-theme-default", dy = "mwd-theme-sra", my = [
  { name: "Default (CSB)", cssClass: io },
  { name: "SRA", cssClass: dy }
];
class fy {
  constructor() {
    this.availableStyles = {}, na.register(Rt.REGISTER_STYLES), Hooks.once(Rt.REGISTER_STYLES, (e) => my.forEach((t) => e(t.cssClass, t.name))), Hooks.once("ready", () => this.onReady());
  }
  async onReady() {
    Hooks.callAll(Rt.REGISTER_STYLES, (e, t) => this.availableStyles[e] = t), console.log(Me + "Loaded styles", this.availableStyles), game.settings.register(T, pc, {
      scope: "world",
      name: "Sheet Theme",
      hint: "Select the visual theme used by MWD sheets.",
      config: !0,
      default: io,
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
    const e = game.settings.get(T, pc);
    return this.availableStyles[e] ? e : io;
  }
}
const py = /* @__PURE__ */ new Set([A.actorTypes.vehicle, A.actorTypes.battlemech]), hy = Object.freeze({
  head: "Head",
  torso: "Torso",
  arms: "Arms",
  legs: "Legs",
  core: "Core",
  front: "Front",
  side: "Side",
  rear: "Rear",
  turret: "Turret",
  rotor: "Rotor"
});
function gy(a) {
  const e = Math.trunc(Number(a ?? 0));
  return Number.isFinite(e) ? Math.min(18, Math.max(3, e)) : 10;
}
function Xd(a = null) {
  return String((a == null ? void 0 : a.type) ?? a ?? "").trim();
}
function yy(a = null) {
  var t, i;
  const e = ((i = (t = a == null ? void 0 : a.system) == null ? void 0 : t.mwd) == null ? void 0 : i.locations) ?? {};
  return Object.entries(e).filter(([, n]) => (n == null ? void 0 : n.enabled) !== !1).map(([n]) => n);
}
function Pe(a, e = [], t = "core") {
  const i = new Set(yy(a));
  return e.find((n) => i.has(n)) ?? e[0] ?? t;
}
function by(a = "") {
  return a === "head" ? "head" : a === "arms" ? "arms" : a === "legs" ? "legs" : ["front", "side", "rear", "rotor"].includes(a) ? "motive" : a === "turret" ? "weapon" : a === "torso" ? "torso" : "core";
}
function Sy(a, e) {
  return e <= 4 ? { locationKey: Pe(a, ["torso", "head"]), family: "critical" } : e === 5 ? { locationKey: Pe(a, ["legs", "torso"]), family: "legs" } : e === 6 ? { locationKey: Pe(a, ["legs", "torso"]), family: "legs" } : e === 7 ? { locationKey: Pe(a, ["arms", "torso"]), family: "arms" } : e === 8 ? { locationKey: Pe(a, ["arms", "torso"]), family: "arms" } : e <= 13 ? { locationKey: Pe(a, ["torso", "head"]), family: "torso" } : e === 14 ? { locationKey: Pe(a, ["arms", "torso"]), family: "arms" } : e === 15 ? { locationKey: Pe(a, ["arms", "torso"]), family: "arms" } : e === 16 ? { locationKey: Pe(a, ["arms", "torso"]), family: "arms" } : e === 17 ? { locationKey: Pe(a, ["legs", "torso"]), family: "legs" } : { locationKey: Pe(a, ["head", "torso"]), family: "head" };
}
function Ay(a, e) {
  return e <= 4 ? { locationKey: Pe(a, ["core", "front"]), family: "critical" } : e === 5 ? { locationKey: Pe(a, ["front", "core"]), family: "motive" } : e <= 7 ? { locationKey: Pe(a, ["side", "front"]), family: "motive" } : e === 8 ? { locationKey: Pe(a, ["rear", "side"]), family: "motive" } : e === 9 ? { locationKey: Pe(a, ["front", "core"]), family: "motive" } : e === 10 ? { locationKey: Pe(a, ["core", "front"]), family: "core" } : e === 11 ? { locationKey: Pe(a, ["turret", "core"]), family: "weapon" } : e === 12 ? { locationKey: Pe(a, ["side", "front"]), family: "motive" } : e === 13 ? { locationKey: Pe(a, ["rear", "side"]), family: "motive" } : e === 14 ? { locationKey: Pe(a, ["front", "side"]), family: "motive" } : e === 15 ? { locationKey: Pe(a, ["core", "rear"]), family: "core" } : e === 16 ? { locationKey: Pe(a, ["turret", "core"]), family: "weapon" } : e === 17 ? { locationKey: Pe(a, ["side", "front", "rotor"]), family: "motive" } : { locationKey: Pe(a, ["core", "front"]), family: "core" };
}
function An(a = "") {
  return hy[a] ?? (String(a ?? "").trim() || "Location");
}
function Zr(a = null) {
  return py.has(Xd(a));
}
function Zd() {
  if (typeof Roll == "function")
    try {
      const a = new Roll("3d6"), e = a.evaluate({ async: !1 });
      return Number((e == null ? void 0 : e.total) ?? a.total ?? 10) || 10;
    } catch {
    }
  return Array.from({ length: 3 }, () => 1 + Math.floor(Math.random() * 6)).reduce((a, e) => a + e, 0);
}
function em({
  actor: a = null,
  rollTotal: e = Zd(),
  armorBefore: t = 0,
  structureBefore: i = 0
} = {}) {
  const n = Xd(a), r = gy(e), s = Math.max(0, Number(t ?? 0) || 0) <= 0, o = n === A.actorTypes.battlemech ? Sy(a, r) : Ay(a, r), l = r <= 4, c = s && r >= 16, u = l || c, d = !u && r >= 16, m = r === 18 && n === A.actorTypes.battlemech ? Pe(a, ["torso", "head"]) : o.locationKey, f = o.family || by(o.locationKey);
  return {
    rollTotal: r,
    actorType: n,
    locationKey: o.locationKey,
    locationLabel: An(o.locationKey),
    locationFamily: f,
    isForcedCritical: l,
    isStructureCritical: c,
    isAutomaticCritical: u,
    chaosCriticalOption: d,
    chaosTargetLocationKey: m,
    chaosTargetLocationLabel: An(m),
    descriptiveOnly: !u,
    pureStructureHit: s,
    armorBefore: Math.max(0, Number(t ?? 0) || 0),
    structureBefore: Math.max(0, Number(i ?? 0) || 0)
  };
}
const ao = Object.freeze({
  none: Object.freeze({
    key: "none",
    label: "No Field Remedy",
    actionId: "machineCritNoFieldRemedy",
    actionLabel: "No Field Remedy",
    resource: "sa",
    cost: 0,
    category: "none",
    remediable: !1,
    skillKey: "",
    baseDn: 0
  }),
  emergencyRepair: Object.freeze({
    key: "emergencyRepair",
    label: "Emergency Repair",
    actionId: "machineCritEmergencyRepair",
    actionLabel: "Emergency Repair",
    resource: "sa",
    cost: 2,
    category: "complex",
    remediable: !0,
    skillKey: "technician",
    baseDn: 2
  }),
  systemReset: Object.freeze({
    key: "systemReset",
    label: "System Reset",
    actionId: "machineCritSystemReset",
    actionLabel: "System Reset",
    resource: "sa",
    cost: 1,
    category: "simple",
    remediable: !0,
    skillKey: "systemOps",
    baseDn: 1
  }),
  coolantDump: Object.freeze({
    key: "coolantDump",
    label: "Coolant Dump",
    actionId: "machineCritCoolantDump",
    actionLabel: "Coolant Dump",
    resource: "sa",
    cost: 1,
    category: "simple",
    remediable: !0,
    skillKey: "systemOps",
    baseDn: 1
  }),
  feedReset: Object.freeze({
    key: "feedReset",
    label: "Reload / Feed Reset",
    actionId: "machineCritFeedReset",
    actionLabel: "Reload / Feed Reset",
    resource: "sa",
    cost: 1,
    category: "simple",
    remediable: !0,
    skillKey: "gunnery",
    baseDn: 1
  }),
  pilotRecovery: Object.freeze({
    key: "pilotRecovery",
    label: "Pilot Recovery",
    actionId: "machineCritPilotRecovery",
    actionLabel: "Pilot Recovery",
    resource: "sa",
    cost: 2,
    category: "complex",
    remediable: !0,
    skillKey: "piloting",
    baseDn: 2
  })
});
function In(a = "") {
  const e = String(a ?? "").trim();
  return ao[e] ?? ao.emergencyRepair;
}
function Ty(a = "") {
  return Object.prototype.hasOwnProperty.call(ao, String(a ?? "").trim());
}
function wy(a = {}) {
  return [
    a == null ? void 0 : a.key,
    a == null ? void 0 : a.label,
    a == null ? void 0 : a.locationLabel,
    ...Array.isArray(a == null ? void 0 : a.gates) ? a.gates : [],
    ...Array.isArray(a == null ? void 0 : a.mods) ? a.mods : []
  ].map((e) => String(e ?? "").trim()).filter(Boolean).join(" ").toLowerCase();
}
function tm(a = {}, e = null) {
  const t = e ?? In((a == null ? void 0 : a.remedyKey) ?? ""), i = String((a == null ? void 0 : a.remedySkillKey) ?? "").trim();
  if (i) return i;
  if (t.key === "systemReset") {
    const n = wy(a);
    if (/(sensor|optic|target|tracking|communications|comms|processor|computer|fire-control|fire control)/i.test(n))
      return "computers";
  }
  return String(t.skillKey ?? "").trim();
}
function im(a = {}, e = null) {
  const t = e ?? In((a == null ? void 0 : a.remedyKey) ?? ""), i = Number(a == null ? void 0 : a.remedyBaseDn);
  if (Number.isFinite(i) && i >= 0) return i;
  const n = Number(t.baseDn ?? t.cost ?? 1);
  return Number.isFinite(n) ? Math.max(0, n) : 1;
}
function hl(a = {}) {
  const e = (a == null ? void 0 : a.remedyEffect) ?? {}, t = String((e == null ? void 0 : e.onSuccess) ?? "clear").trim() || "clear", i = String((e == null ? void 0 : e.onFailure) ?? "noChange").trim() || "noChange";
  return { onSuccess: t, onFailure: i };
}
const yt = Object.freeze({
  intact: 0,
  impaired: 1,
  damaged: 2,
  crippled: 3,
  disabled: 4
}), hc = Object.freeze({
  [yt.intact]: "Intact",
  [yt.impaired]: "Impaired",
  [yt.damaged]: "Damaged",
  [yt.crippled]: "Crippled",
  [yt.disabled]: "Disabled"
}), ky = Object.freeze({
  [yt.intact]: 0,
  [yt.impaired]: 1,
  [yt.damaged]: 2,
  [yt.crippled]: 3,
  [yt.disabled]: 4
}), vy = Object.freeze({
  0: 1,
  1: 2,
  2: 3,
  3: 4,
  4: 6,
  5: 8
}), My = Object.freeze([
  "head",
  "torso",
  "arms",
  "legs"
]), Cy = Object.freeze([
  "front",
  "side",
  "rear",
  "core",
  "turret",
  "rotor"
]), Ey = Object.freeze({
  head: Object.freeze({ enabled: !0, stress: 0, condition: 0, tags: ["cockpit", "sensor"], destroyed: !1 }),
  torso: Object.freeze({ enabled: !0, stress: 0, condition: 0, tags: ["weaponGroup", "engine", "gyro", "ammoStore"], destroyed: !1 }),
  arms: Object.freeze({ enabled: !0, stress: 0, condition: 0, tags: ["weaponGroup"], destroyed: !1 }),
  legs: Object.freeze({ enabled: !0, stress: 0, condition: 0, tags: ["motiveSystem"], destroyed: !1 })
}), Py = Object.freeze({
  front: Object.freeze({ enabled: !0, stress: 0, condition: 0, tags: ["weaponGroup", "motiveSystem"], destroyed: !1 }),
  side: Object.freeze({ enabled: !0, stress: 0, condition: 0, tags: ["weaponGroup", "motiveSystem"], destroyed: !1 }),
  rear: Object.freeze({ enabled: !0, stress: 0, condition: 0, tags: ["weaponGroup", "motiveSystem", "ammoStore"], destroyed: !1 }),
  turret: Object.freeze({ enabled: !0, stress: 0, condition: 0, tags: ["turret", "weaponGroup"], destroyed: !1 }),
  rotor: Object.freeze({ enabled: !1, stress: 0, condition: 0, tags: ["rotor"], destroyed: !1 }),
  core: Object.freeze({ enabled: !0, stress: 0, condition: 0, tags: ["crewCompartment", "engine", "ammoStore"], destroyed: !1 })
}), Ry = Object.freeze({
  [A.actorTypes.battlemech]: Object.freeze({
    head: Object.freeze({ type: "cockpitCatastrophe", destroyed: !0, statusState: "destroyed" }),
    torso: Object.freeze({ type: "torsoCollapse", destroyed: !0, statusState: "destroyed" }),
    arms: Object.freeze({ type: "armSystemCollapse", destroyed: !0, statusState: "" }),
    legs: Object.freeze({ type: "legCollapse", destroyed: !0, statusState: "immobilized" })
  }),
  [A.actorTypes.vehicle]: Object.freeze({
    front: Object.freeze({ type: "hullCollapse", destroyed: !0, statusState: "destroyed" }),
    side: Object.freeze({ type: "hullCollapse", destroyed: !0, statusState: "destroyed" }),
    rear: Object.freeze({ type: "hullCollapse", destroyed: !0, statusState: "destroyed" }),
    core: Object.freeze({ type: "coreFailure", destroyed: !0, statusState: "destroyed" }),
    turret: Object.freeze({ type: "turretDestroyed", destroyed: !0, statusState: "" }),
    rotor: Object.freeze({ type: "rotorFailure", destroyed: !0, statusState: "destroyed" })
  })
});
function Ia(a) {
  var e;
  return typeof foundry < "u" && typeof ((e = foundry == null ? void 0 : foundry.utils) == null ? void 0 : e.deepClone) == "function" ? foundry.utils.deepClone(a) : JSON.parse(JSON.stringify(a ?? null));
}
function Be(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function am(a, e, t) {
  return Math.min(t, Math.max(e, a));
}
function Dn(a = null) {
  const e = String((a == null ? void 0 : a.type) ?? a ?? "").trim();
  return e === A.actorTypes.battlemech || e === "mech" ? A.actorTypes.battlemech : A.actorTypes.vehicle;
}
function Ny(a = A.actorTypes.vehicle) {
  return a === A.actorTypes.battlemech ? Ey : Py;
}
function nm(a = A.actorTypes.vehicle) {
  return a === A.actorTypes.battlemech ? My : Cy;
}
function Fi(a = 0) {
  return am(Math.trunc(Be(a, 0)), 0, yt.disabled);
}
function gc(a = {}, e = {}) {
  return {
    enabled: (a == null ? void 0 : a.enabled) !== void 0 ? !!a.enabled : !!e.enabled,
    stress: Math.max(0, Be((a == null ? void 0 : a.stress) ?? (e == null ? void 0 : e.stress), 0)),
    condition: Fi((a == null ? void 0 : a.condition) ?? (e == null ? void 0 : e.condition) ?? 0),
    tags: Array.isArray(a == null ? void 0 : a.tags) ? a.tags.slice() : Array.isArray(e == null ? void 0 : e.tags) ? e.tags.slice() : [],
    destroyed: !!((a == null ? void 0 : a.destroyed) ?? (e == null ? void 0 : e.destroyed))
  };
}
function Iy(a = {}) {
  const e = {
    head: ["head"],
    torso: ["torso", "torsoFront", "torsoRear", "core"],
    arms: ["arms", "leftArm", "rightArm"],
    legs: ["legs", "leftLeg", "rightLeg"]
  }, t = {};
  for (const [i, n] of Object.entries(e)) {
    const r = n.map((d) => [d, a == null ? void 0 : a[d]]).filter(([, d]) => d && typeof d == "object");
    if (!r.length) continue;
    const s = r.reduce((d, [, m]) => d + Math.max(0, Be(m == null ? void 0 : m.stress, 0)), 0), o = r.reduce((d, [, m]) => Math.max(d, Fi(m == null ? void 0 : m.condition)), 0), l = r.some(([, d]) => (d == null ? void 0 : d.enabled) !== !1), c = r.some(([, d]) => (d == null ? void 0 : d.destroyed) === !0), u = Array.from(new Set(r.flatMap(([, d]) => Array.isArray(d == null ? void 0 : d.tags) ? d.tags : [])));
    t[i] = {
      enabled: l,
      stress: s,
      condition: o,
      destroyed: c,
      tags: u
    };
  }
  for (const [i, n] of Object.entries(a ?? {}))
    Object.hasOwn(t, i) || ["torsoFront", "torsoRear", "core", "leftArm", "rightArm", "leftLeg", "rightLeg"].includes(i) || (t[i] = n);
  return t;
}
function Dy(a = {}, e = A.actorTypes.vehicle) {
  const t = Ny(e), i = e === A.actorTypes.battlemech ? Iy(a ?? {}) : a ?? {}, n = {};
  for (const [r, s] of Object.entries(t))
    n[r] = gc((i == null ? void 0 : i[r]) ?? {}, s);
  for (const [r, s] of Object.entries(i ?? {}))
    n[r] || (n[r] = gc(s, {}));
  return n;
}
function Oy(a = {}, e = A.actorTypes.vehicle) {
  const t = a.mwd = a.mwd ?? {};
  return t.unitType = String(t.unitType ?? (e === A.actorTypes.battlemech ? "mech" : "vehicle")).trim() || (e === A.actorTypes.battlemech ? "mech" : "vehicle"), t.status = t.status ?? { state: "operational", reasons: [] }, t.crits = Array.isArray(t.crits) ? t.crits : [], t;
}
function Ly(a = {}) {
  var n, r;
  const e = a.attributes = a.attributes ?? {}, t = (n = e.reliability) == null ? void 0 : n.value, i = (r = e.condition) == null ? void 0 : r.value;
  return Math.max(0, Be(t ?? i, 0));
}
function _y(a = [], e = -1) {
  return !Array.isArray(a) || e < 0 ? !1 : a.some((t) => Math.trunc(Be(t, -1)) === e);
}
function rm(a, e, t) {
  !e || !Number.isFinite(t) || t === 0 || (a.stressDelta[e] = Number(a.stressDelta[e] ?? 0) + t);
}
function xy(a = "") {
  const e = String(a ?? "").trim();
  return e === "highMargin" ? 3 : e === "hit" ? 2 : e === "graze" ? 1 : 0;
}
function $y(a, e, t) {
  if (e.stress !== a.stress) return e.stress - a.stress;
  if (e.condition !== a.condition) return e.condition - a.condition;
  if (a.condition >= yt.disabled && e.condition < yt.disabled) return 1;
  if (e.condition >= yt.disabled && a.condition < yt.disabled) return -1;
  const i = nm(t), n = i.indexOf(a.key), r = i.indexOf(e.key);
  if (n !== r) {
    const s = n >= 0 ? n : Number.MAX_SAFE_INTEGER, o = r >= 0 ? r : Number.MAX_SAFE_INTEGER;
    return s - o;
  }
  return String(a.key).localeCompare(String(e.key));
}
function By(a = {}, e = A.actorTypes.vehicle) {
  return Object.entries(a).filter(([, t]) => t && t.enabled === !0 && t.destroyed !== !0).map(([t, i]) => ({
    key: t,
    stress: Math.max(0, Be(i == null ? void 0 : i.stress, 0)),
    condition: Fi(i == null ? void 0 : i.condition)
  })).sort((t, i) => $y(t, i, e));
}
function zy(a = {}, e = A.actorTypes.vehicle, t = "") {
  var n;
  const i = String(t ?? "").trim();
  if (i) {
    const r = a == null ? void 0 : a[i];
    if (r && r.enabled === !0 && r.destroyed !== !0) return i;
  }
  return ((n = By(a, e)[0]) == null ? void 0 : n.key) ?? "";
}
function Fy(a, e, t, i) {
  !t || !e || (a.fallbackEvents.push({
    location: t,
    type: e.type,
    destroyed: !!e.destroyed,
    statusState: String(e.statusState ?? "").trim()
  }), e.destroyed && (i[t].destroyed = !0), e.statusState && (a.statusState = e.statusState));
}
function Uy({ result: a, locations: e, locationKey: t, reliability: i, threshold: n, currentShock: r }) {
  var c;
  const s = Math.max(0, i), o = Math.max(0, Be((c = e == null ? void 0 : e[t]) == null ? void 0 : c.stress, 0)), l = Math.max(0, o - s);
  return e[t].stress = l, rm(a, t, l - o), Math.max(0, r - Math.max(1, n));
}
function jy({ locations: a = {}, shockBefore: e = 0, shockGain: t = 0, threshold: i = 1, reliability: n = 0, spendableBefore: r = 0 } = {}) {
  return {
    stressDelta: {},
    shockDelta: 0,
    conditionAdvancements: [],
    reliabilitySpends: [],
    fallbackEvents: [],
    spendOpportunities: [],
    statusState: "",
    summary: {
      shockBefore: e,
      shockGain: t,
      shockAfter: e + t,
      threshold: i,
      reliability: n,
      reliabilitySpendableBefore: r,
      reliabilitySpendableAfter: r,
      selectedLocations: [],
      locationsBefore: Ia(a),
      locationsAfter: null
    }
  };
}
function Hy(a, e = "critical") {
  if (typeof a == "string") {
    const i = String(a ?? "").trim();
    return i ? { locationKey: i, source: e, applyReductions: !0, allowSpend: !0 } : null;
  }
  if (!a || typeof a != "object") return null;
  const t = String(a.locationKey ?? a.location ?? "").trim();
  return t ? {
    locationKey: t,
    source: String(a.source ?? e).trim() || e,
    applyReductions: a.applyReductions !== !1,
    allowSpend: a.allowSpend !== !1
  } : null;
}
function sm(a = 0) {
  const e = am(Math.trunc(Be(a, 0)), 0, 5);
  return Math.max(1, Number(vy[e] ?? 1));
}
function om(a = 0) {
  return hc[Fi(a)] ?? hc[0];
}
function lm(a = 0) {
  return ky[Fi(a)] ?? 0;
}
function Ky(a = A.actorTypes.vehicle) {
  return nm(Dn(a)).slice();
}
function On(a = {}, e = A.actorTypes.vehicle) {
  var o, l, c;
  const t = Dn(e), i = a.attributes = a.attributes ?? {}, n = Ly(a);
  i.reliability = i.reliability ?? {}, i.reliability.value = n, i.condition = i.condition ?? {}, i.condition.value = Math.max(0, Be(((o = i.condition) == null ? void 0 : o.value) ?? n, n));
  const r = Oy(a, t);
  r.shock = r.shock ?? {}, r.shock.value = Math.max(0, Be((l = r.shock) == null ? void 0 : l.value, 0)), r.reliabilitySpendable = r.reliabilitySpendable ?? {};
  const s = (c = r.reliabilitySpendable) == null ? void 0 : c.value;
  return r.reliabilitySpendable.value = Math.max(0, Be(s ?? n, n)), r.locations = Dy(r.locations ?? {}, t), a;
}
function Wy({ actorSnapshot: a = null, unitType: e = "", locationKey: t = "" } = {}) {
  var s;
  const i = Dn(e || (a == null ? void 0 : a.type) || (a == null ? void 0 : a.actorType)), n = String(t ?? "").trim(), r = ((s = Ry[i]) == null ? void 0 : s[n]) ?? {
    type: "catastrophicFailure",
    destroyed: !0,
    statusState: ""
  };
  return {
    location: n,
    type: r.type,
    destroyed: !!r.destroyed,
    statusState: String(r.statusState ?? "").trim()
  };
}
function Gy({
  actorSnapshot: a = null,
  locationKey: e = "",
  machineDamageDealt: t = 0,
  attackQuality: i = "",
  allowReliabilitySpend: n = !1,
  reliabilitySpendSelections: r = [],
  directConditionLocations: s = [],
  maxIterations: o = 10
} = {}) {
  var x, K, q, j, W, _, F, V;
  const l = Ia(a ?? {}), c = Dn((l == null ? void 0 : l.type) ?? (l == null ? void 0 : l.actorType)), u = On(l.system ?? {}, c), d = Ia(((x = u.mwd) == null ? void 0 : x.locations) ?? {}), m = Math.max(0, Be((q = (K = u.attributes) == null ? void 0 : K.reliability) == null ? void 0 : q.value, 0));
  let f = Math.max(0, Be((W = (j = u.mwd) == null ? void 0 : j.reliabilitySpendable) == null ? void 0 : W.value, m));
  const p = sm(m), h = Math.max(0, Be(t, 0)), g = Math.max(0, Be((F = (_ = u.mwd) == null ? void 0 : _.shock) == null ? void 0 : F.value, 0)), y = xy(i);
  let b = Math.max(0, g + y);
  const S = jy({
    locations: d,
    shockBefore: g,
    shockGain: y,
    threshold: p,
    reliability: m,
    spendableBefore: f
  }), w = String(e ?? "").trim();
  if (w && d[w] && h > 0) {
    const te = Math.max(0, Be((V = d[w]) == null ? void 0 : V.stress, 0)) + h;
    d[w].stress = te, rm(S, w, h);
  }
  let k = 0, P = 0;
  const E = ({
    forcedLocationKey: Y = "",
    source: te = "shock",
    applyReductions: he = !0,
    allowSpendForThisAdvancement: ce = !0
  } = {}) => {
    const X = zy(d, c, Y);
    if (!X) return !1;
    const Ne = d[X];
    S.summary.selectedLocations.push({ source: te, location: X });
    const Le = !!n && !!ce && f > 0, _e = Le && _y(r, k);
    if (S.spendOpportunities.push({
      index: k,
      location: X,
      source: te,
      canSpend: Le,
      selected: _e
    }), k += 1, _e)
      f = Math.max(0, f - 1), S.reliabilitySpends.push({ location: X, prevented: !0, source: te });
    else {
      const Ue = Fi(Ne.condition);
      if (Ue >= yt.disabled)
        Fy(
          S,
          Wy({ actorSnapshot: l, unitType: c, locationKey: X }),
          X,
          d
        );
      else {
        const We = Fi(Ue + 1);
        d[X].condition = We, S.conditionAdvancements.push({ location: X, from: Ue, to: We, source: te });
      }
    }
    return he && (b = Uy({
      result: S,
      locations: d,
      locationKey: X,
      reliability: m,
      threshold: p,
      currentShock: b
    }), b = Math.max(0, b)), !0;
  };
  for (; b >= p && P < Math.max(1, Math.trunc(Be(o, 10))); ) {
    const Y = E({ source: "shock" });
    if (P += 1, !Y) break;
  }
  P >= Math.max(1, Math.trunc(Be(o, 10))) && b >= p && (S.loopGuardTriggered = !0);
  for (const Y of Array.isArray(s) ? s : []) {
    const te = Hy(Y, "critical");
    te && E({
      forcedLocationKey: te.locationKey,
      source: te.source,
      applyReductions: te.applyReductions,
      allowSpendForThisAdvancement: te.allowSpend
    });
  }
  return S.shockDelta = Math.max(0, b) - g, S.summary.shockAfter = Math.max(0, b), S.summary.reliabilitySpendableAfter = f, S.summary.locationsAfter = Ia(d), S;
}
function qy(a = null, e = null) {
  var l, c, u, d, m;
  if (!a || !e) return {};
  const t = Dn(a), i = On(Ia(a.system ?? {}), t), n = Ia(((l = i.mwd) == null ? void 0 : l.locations) ?? {}), r = {};
  for (const [f, p] of Object.entries(e.stressDelta ?? {})) {
    const h = n[f];
    h && (h.stress = Math.max(0, Math.max(0, Be(h.stress, 0)) + Be(p, 0)), r[`system.mwd.locations.${f}.stress`] = h.stress);
  }
  for (const f of Array.from(e.conditionAdvancements ?? [])) {
    const p = String((f == null ? void 0 : f.location) ?? "").trim(), h = n[p];
    h && (h.condition = Fi((f == null ? void 0 : f.to) ?? h.condition), r[`system.mwd.locations.${p}.condition`] = h.condition);
  }
  for (const f of Array.from(e.fallbackEvents ?? [])) {
    const p = String((f == null ? void 0 : f.location) ?? "").trim(), h = n[p];
    h && f.destroyed && (h.destroyed = !0, r[`system.mwd.locations.${p}.destroyed`] = !0);
  }
  const s = Array.isArray(e.reliabilitySpends) ? e.reliabilitySpends.length : 0, o = Math.max(0, Be((u = (c = i.mwd) == null ? void 0 : c.reliabilitySpendable) == null ? void 0 : u.value, 0));
  return r["system.mwd.reliabilitySpendable.value"] = Math.max(0, o - s), r["system.mwd.shock.value"] = Math.max(0, Be((m = (d = i.mwd) == null ? void 0 : d.shock) == null ? void 0 : m.value, 0) + Be(e.shockDelta, 0)), e.statusState && (r["system.mwd.status.state"] = e.statusState), r;
}
const cm = "machineCritical", um = "machineCriticalTableGeneralUuid", Vy = "machineCriticalTableBattlemechUuid", Yy = "machineCriticalTableVehicleUuid", dm = "machineCriticalTableBattlemechHeadUuid", mm = "machineCriticalTableBattlemechTorsoUuid", fm = "machineCriticalTableBattlemechArmsUuid", pm = "machineCriticalTableBattlemechLegsUuid", hm = "machineCriticalTableVehicleBodyUuid", gm = "machineCriticalTableVehicleTurretUuid", ym = "machineCriticalTableVehicleMobilityUuid", st = Object.freeze({
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
}), Qy = /* @__PURE__ */ new Set(["physical", "fatigue", ""]), no = Object.freeze({
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
}), yc = Object.freeze({
  battlemech: Object.freeze({
    head: Object.freeze({
      2: B("cockpitShock", "Cockpit Shock", "none", ["sensor"], ["sensorBlind"], {}, { track: "physical", amount: 3 }, "cascade"),
      3: B("targetingProcessorLock", "Targeting Processor Lock", "systemReset", ["attack"], [], {}, { track: "physical", amount: 2 }, "lockout"),
      4: B("neuralFeedback", "Neural Feedback", "systemReset", [], [], {}, { track: "fatigue", amount: 2 }, "surge"),
      5: B("opticsCoolantFog", "Optics Coolant Fog / View Obstruction", "systemReset", ["attack"], ["rangeLimitClose"], {}, {}, "feed"),
      6: B("commandInputDelay", "Command Input Delay", "systemReset", [], [], { nextActivationSaPenalty: 1 }, { track: "fatigue", amount: 2 }, "control"),
      7: B("fireControlDesyncHead", "Fire-Control Desync", "systemReset", ["attack"], ["noCqBonus"], {}, {}, "desync"),
      8: B("cockpitImpact", "Cockpit Impact", "pilotRecovery", ["piloting"], ["stabilityCheck"], {}, { track: "physical", amount: 2 }, "shock"),
      9: B("sensorOverload", "Sensor Overload", "systemReset", ["sensor"], ["sensorLockPenalty"], {}, { track: "fatigue", amount: 2 }, "overload"),
      10: B("opticsFracture", "Optics Fracture", "emergencyRepair", ["attack"], ["visibilitySevere"], {}, {}, "degradation"),
      11: B("commsSensorSuiteOut", "Communications / Sensor Suite Out", "systemReset", ["sensor"], [], {}, {}, "outage"),
      12: B("headCriticalBreach", "Head condition +1", "none", [], [], {}, { track: "physical", amount: 2 }, "conditionAdvance")
    }),
    torso: Object.freeze({
      2: B("reactorGyroCascade", "Reactor / Gyro Cascade", "none", ["piloting"], ["stabilityCheck"], {}, { track: "fatigue", amount: 3 }, "cascade"),
      3: B("gyroLock", "Gyro Lock", "emergencyRepair", ["move", "jump"], ["pilotingPenalty"], {}, {}, "lockout"),
      4: B("reactorUnstable", "Reactor Unstable", "coolantDump", ["energyWeapon"], [], { heatPerEnergyAttack: 1 }, { track: "fatigue", amount: 2 }, "heat"),
      5: B("coolantPowerRoutingFault", "Coolant / Power Routing Fault", "emergencyRepair", ["weaponGroup"], [], {}, {}, "feed"),
      6: B("coreResponseDelay", "Core Response Delay", "systemReset", [], [], { nextActivationSaPenalty: 1 }, { track: "fatigue", amount: 2 }, "control"),
      7: B("targetingMovementSyncFault", "Targeting / Movement Sync Fault", "systemReset", ["attack", "move"], ["noMovementFireAdvantage"], {}, {}, "desync"),
      8: B("internalShock", "Internal Shock", "emergencyRepair", ["piloting"], ["stabilityCheck"], {}, { track: "physical", amount: 2, condition: "failedFallImpact" }, "shock"),
      9: B("heatSinkSaturation", "Heat Sink Saturation", "coolantDump", ["attack"], [], { heatPerAttack: 1 }, {}, "heat"),
      10: B("gyroDrift", "Gyro Drift", "emergencyRepair", ["move"], ["highMobilityBlocked"], {}, {}, "degradation"),
      11: B("powerBusOutage", "Power Bus Outage", "emergencyRepair", ["subsystem"], [], {}, {}, "outage"),
      12: B("torsoCriticalBreach", "Torso condition +1", "none", [], [], {}, {}, "conditionAdvance")
    }),
    arms: Object.freeze({
      2: B("weaponMountCascade", "Weapon Mount Cascade", "emergencyRepair", ["attack"], [], {}, {}, "cascade"),
      3: B("actuatorLockArm", "Actuator Lock", "emergencyRepair", ["attack"], [], {}, {}, "lockout"),
      4: B("weaponFeedback", "Weapon Feedback", "emergencyRepair", ["attack"], [], { nextArmAttackHeat: 1 }, {}, "surge"),
      5: B("ammoFeedFaultArm", "Ammo / Feed Fault", "feedReset", ["attack"], [], {}, {}, "feed"),
      6: B("fineActuationError", "Fine Actuation Error", "emergencyRepair", ["attack"], ["aimBlocked"], {}, {}, "control"),
      7: B("targetingMisalignmentArm", "Targeting Misalignment", "systemReset", ["attack"], ["noCqBonus"], {}, {}, "desync"),
      8: B("recoilShock", "Recoil Shock", "emergencyRepair", ["attack"], ["nextArmAttackBlocked"], {}, {}, "shock"),
      9: B("servoStrainArm", "Servo Strain", "emergencyRepair", ["attack"], [], { heatOrStrainOnUse: 1 }, {}, "overload"),
      10: B("stabilizerDamageArm", "Stabilizer Damage", "emergencyRepair", ["attack"], ["armAttackSeverelyLimited"], {}, {}, "degradation"),
      11: B("localPowerLossArm", "Local Power Loss", "emergencyRepair", ["subsystem"], [], {}, {}, "outage"),
      12: B("armsCriticalBreach", "Arms condition +1", "none", [], [], {}, {}, "conditionAdvance")
    }),
    legs: Object.freeze({
      2: B("mobilityCascadeLegs", "Mobility Cascade", "emergencyRepair", ["move"], ["stabilityCheck"], {}, { track: "physical", amount: 2, condition: "resultingFallImpact" }, "cascade"),
      3: B("legActuatorLock", "Leg Actuator Lock", "emergencyRepair", ["move", "jump"], [], {}, {}, "lockout"),
      4: B("myomerSurge", "Myomer Surge", "coolantDump", ["move"], [], { heatOrStrainOnMove: 1 }, {}, "surge"),
      5: B("jumpJetMobilityFeedFault", "Jump Jet / Mobility Feed Fault", "emergencyRepair", ["move", "jump"], [], {}, {}, "feed"),
      6: B("gaitFault", "Gait Fault", "emergencyRepair", ["move"], ["repositionPenalty"], {}, {}, "control"),
      7: B("balanceTimingFault", "Balance Timing Fault", "systemReset", ["move"], ["noMobilityCqBonus"], {}, {}, "desync"),
      8: B("forcedStabilityTest", "Forced Stability Test", "emergencyRepair", ["move", "piloting"], ["stabilityCheck"], {}, { track: "physical", amount: 2, condition: "resultingFallImpact" }, "shock"),
      9: B("mobilityOverstress", "Mobility Overstress", "emergencyRepair", ["move"], [], { repeatedMoveCost: 1 }, {}, "overload"),
      10: B("legStabilizerDamage", "Leg Stabilizer Damage", "emergencyRepair", ["move"], ["advancedManeuverBlocked"], {}, {}, "degradation"),
      11: B("partialMobilityOutageLegs", "Partial Mobility Outage", "emergencyRepair", ["move"], [], {}, {}, "outage"),
      12: B("legsCriticalBreach", "Legs condition +1", "none", [], [], {}, {}, "conditionAdvance")
    })
  }),
  vehicle: Object.freeze({
    body: Object.freeze({
      2: B("internalSystemsCascade", "Internal Systems Cascade", "none", [], [], {}, { track: "physical", amount: 2, condition: "openToppedOrCatastrophic" }, "cascade"),
      3: B("coreSystemsLock", "Core Systems Lock", "systemReset", ["subsystem"], [], {}, {}, "lockout"),
      4: B("enginePowerSurge", "Engine / Power Surge", "coolantDump", [], [], {}, { track: "fatigue", amount: 2, condition: "crewApplicable" }, "surge"),
      5: B("fuelFeedDisruption", "Fuel / Feed Disruption", "emergencyRepair", ["subsystem"], [], {}, {}, "feed"),
      6: B("controlFaultBody", "Control Fault", "systemReset", ["move"], [], {}, {}, "control"),
      7: B("systemsDesyncBody", "Systems Desync", "systemReset", ["attack", "move"], [], {}, {}, "desync"),
      8: B("structuralShockBody", "Structural Shock", "emergencyRepair", ["piloting"], ["controlTest"], {}, { track: "physical", amount: 2, condition: "crashImpact" }, "shock"),
      9: B("overloadBody", "Overload", "coolantDump", [], [], {}, {}, "overload"),
      10: B("hullStressSpike", "Hull Stress Spike", "emergencyRepair", [], [], {}, {}, "degradation"),
      11: B("partialOutageBody", "Partial Outage", "emergencyRepair", ["subsystem"], [], {}, {}, "outage"),
      12: B("bodyCriticalBreach", "Body condition +1", "none", [], [], {}, {}, "conditionAdvance")
    }),
    turret: Object.freeze({
      2: B("turretWeaponCascade", "Turret Weapon Cascade", "emergencyRepair", ["attack"], [], {}, {}, "cascade"),
      3: B("traverseLock", "Traverse Lock", "emergencyRepair", ["attack"], [], {}, {}, "lockout"),
      4: B("fireControlSurgeTurret", "Fire-Control Surge", "systemReset", ["attack"], [], { heatOrStrainOnTurretAttack: 1 }, {}, "surge"),
      5: B("ammoFeedFaultTurret", "Ammo / Feed Fault", "feedReset", ["attack"], [], {}, {}, "feed"),
      6: B("controlFaultTurret", "Control Fault", "systemReset", ["attack"], [], { extraAttackCost: 1 }, {}, "control"),
      7: B("trackingDesyncTurret", "Tracking Desync", "systemReset", ["attack"], ["noCqBonus"], {}, {}, "desync"),
      8: B("mountShockTurret", "Mount Shock", "emergencyRepair", ["attack"], ["nextTurretAttackBlocked"], {}, {}, "shock"),
      9: B("overloadTurret", "Overload", "emergencyRepair", ["attack"], [], { turretAttackStress: 1 }, {}, "overload"),
      10: B("stabilizerDamageTurret", "Stabilizer Damage", "emergencyRepair", ["attack"], ["limitedArcFire"], {}, {}, "degradation"),
      11: B("turretSubsystemOutage", "Turret Subsystem Outage", "emergencyRepair", ["subsystem"], [], {}, {}, "outage"),
      12: B("turretCriticalBreach", "Turret condition +1", "none", [], [], {}, {}, "conditionAdvance")
    }),
    mobility: Object.freeze({
      2: B("mobilityCascadeVehicle", "Mobility Cascade", "emergencyRepair", ["move"], ["skidStallCrashRisk"], {}, {}, "cascade"),
      3: B("driveLock", "Drive / Track / Wheel Lock", "emergencyRepair", ["move"], [], {}, {}, "lockout"),
      4: B("powertrainSurge", "Powertrain Surge", "coolantDump", ["move"], [], { heatOrStrainOnMove: 1 }, {}, "surge"),
      5: B("transmissionRotorFeedFault", "Transmission / Rotor Feed Fault", "emergencyRepair", ["move"], [], {}, {}, "feed"),
      6: B("steeringFault", "Steering Fault", "emergencyRepair", ["move"], [], {}, {}, "control"),
      7: B("handlingDesync", "Handling Desync", "systemReset", ["move"], ["noMobilityCqBonus"], {}, {}, "desync"),
      8: B("chassisShock", "Chassis Shock", "emergencyRepair", ["move", "piloting"], ["controlTest"], {}, {}, "shock"),
      9: B("overloadMobility", "Overload", "emergencyRepair", ["move"], [], { repeatedMoveCost: 1 }, {}, "overload"),
      10: B("suspensionLiftDamage", "Suspension / Lift Damage", "emergencyRepair", ["move"], ["majorHandlingImpairment"], {}, {}, "degradation"),
      11: B("partialMobilityOutageVehicle", "Partial Mobility Outage", "emergencyRepair", ["move"], [], {}, {}, "outage"),
      12: B("mobilityCriticalBreach", "Mobility condition +1", "none", [], [], {}, {}, "conditionAdvance")
    })
  })
});
function bm() {
  return typeof foundry < "u" && (foundry == null ? void 0 : foundry.utils);
}
function Ln(a) {
  return bm() && typeof foundry.utils.deepClone == "function" ? foundry.utils.deepClone(a) : JSON.parse(JSON.stringify(a ?? null));
}
function B(a, e, t, i = [], n = [], r = {}, s = {}, o = "") {
  return Object.freeze({
    label: e,
    signal: Object.freeze({
      key: a,
      remedyKey: t,
      gates: i,
      mods: n,
      resourceEffects: r,
      pilotDamage: s,
      escalationKey: o
    })
  });
}
function Jy() {
  return bm() && typeof foundry.utils.randomID == "function" ? foundry.utils.randomID() : Math.random().toString(36).slice(2, 18).padEnd(16, "0").slice(0, 16);
}
function Xy() {
  try {
    return (/* @__PURE__ */ new Date()).toISOString();
  } catch {
    return "";
  }
}
function bc(a) {
  return Array.isArray(a) ? a : typeof a == "string" ? a.split(",").map((e) => e.trim()).filter(Boolean) : [];
}
function Sc(a) {
  return a && typeof a == "object" && !Array.isArray(a) ? a : {};
}
function Zy(a = {}) {
  var e, t, i, n, r, s, o, l;
  return ((t = (e = a == null ? void 0 : a.flags) == null ? void 0 : e.mwd) == null ? void 0 : t.crit) ?? ((r = (n = (i = a == null ? void 0 : a.document) == null ? void 0 : i.flags) == null ? void 0 : n.mwd) == null ? void 0 : r.crit) ?? ((l = (o = (s = a == null ? void 0 : a.data) == null ? void 0 : s.flags) == null ? void 0 : o.mwd) == null ? void 0 : l.crit) ?? a;
}
function eb(a, e, t) {
  if (!t) return null;
  const i = new Error(a);
  throw i.validationErrors = e.length ? e : [a], i;
}
function Ac(a = 7) {
  const e = Math.min(12, Math.max(2, Math.trunc(Number(a ?? 7)) || 7));
  return Ln(no[e] ?? no[7]);
}
function ca(a = {}, { strict: e = !1 } = {}) {
  const t = Zy(a), i = [], n = String((t == null ? void 0 : t.key) ?? "").trim(), r = String((t == null ? void 0 : t.remedyKey) ?? "emergencyRepair").trim() || "emergencyRepair", s = bc(t == null ? void 0 : t.gates).map((p) => String(p ?? "").trim()).filter(Boolean), o = bc(t == null ? void 0 : t.mods).map((p) => String(p ?? "").trim()).filter(Boolean), l = Sc(t == null ? void 0 : t.resourceEffects), c = Sc(t == null ? void 0 : t.pilotDamage), u = String((t == null ? void 0 : t.escalationKey) ?? "").trim();
  n || i.push("Critical signal key cannot be blank."), Ty(r) || i.push(`Unknown machine critical remedy "${r}".`);
  for (const [p, h] of Object.entries(l))
    Number.isFinite(Number(h)) || i.push(`Resource effect "${p}" must be numeric.`);
  const d = String((c == null ? void 0 : c.track) ?? "").trim(), m = Number((c == null ? void 0 : c.amount) ?? 0), f = String((c == null ? void 0 : c.condition) ?? "").trim();
  return Qy.has(d) || i.push(`Pilot damage track "${d}" is invalid.`), (!Number.isFinite(m) || m < 0) && i.push("Pilot damage amount must be non-negative."), i.length ? (eb(i[0], i, e), null) : {
    key: n,
    remedyKey: r,
    gates: s,
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
function Sm(a, e = {}) {
  var i, n;
  return (Array.isArray((n = (i = a == null ? void 0 : a.system) == null ? void 0 : i.mwd) == null ? void 0 : n.crits) ? a.system.mwd.crits : []).filter((r) => r && r.active !== !1).filter((r) => !e.key || r.key === e.key).filter((r) => !e.locationKey || r.locationKey === e.locationKey).filter((r) => !e.locationFamily || r.locationFamily === e.locationFamily).filter((r) => !e.gate || Array.isArray(r.gates) && r.gates.includes(e.gate)).filter((r) => !e.mod || Array.isArray(r.mods) && r.mods.includes(e.mod));
}
function Tc(a, e) {
  var r, s;
  const t = ((s = (r = a == null ? void 0 : a.system) == null ? void 0 : r.monitors) == null ? void 0 : s[e]) ?? {}, i = Math.max(0, Number(t.max ?? 0) || 0), n = Math.min(i, Math.max(0, Number(t.value ?? 0) || 0));
  return {
    max: i,
    value: n,
    remaining: Math.max(0, i - n)
  };
}
function tb(a) {
  return (a == null ? void 0 : a.type) === A.actorTypes.vehicle || (a == null ? void 0 : a.type) === A.actorTypes.battlemech;
}
function ib(a, e, t, i) {
  return {
    ...e != null && e.hitLocation && typeof e.hitLocation == "object" ? e.hitLocation : em({
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
function Am(a = {}, e = !1) {
  return e && a.chaosTargetLocationKey ? {
    locationKey: a.chaosTargetLocationKey,
    locationFamily: a.locationFamily === "head" ? "torso" : a.locationFamily,
    locationLabel: a.chaosTargetLocationLabel ?? An(a.chaosTargetLocationKey)
  } : {
    locationKey: a.locationKey,
    locationFamily: a.locationFamily,
    locationLabel: a.locationLabel ?? An(a.locationKey)
  };
}
function ab(a = {}, e = !1) {
  return !!(a.isAutomaticCritical || a.chaosCriticalOption && e);
}
function Tm(a = {}) {
  const e = String((a == null ? void 0 : a.attackQuality) ?? "").trim();
  if (["graze", "hit", "highMargin"].includes(e)) return e;
  const t = String((a == null ? void 0 : a.outcome) ?? "").trim(), i = Math.max(0, Number((a == null ? void 0 : a.netHits) ?? 0) || 0);
  return t === "graze" ? "graze" : t === "hit" && i >= 4 ? "highMargin" : t === "hit" ? "hit" : "";
}
function nb({
  actor: a = null,
  payload: e = {},
  hitLocation: t = null,
  chaosCriticalSelected: i = !1
} = {}) {
  if (!tb(a)) return { ok: !1, reason: "Machine damage requires a vehicle or BattleMech actor." };
  const n = Math.max(0, Math.ceil(Number((e == null ? void 0 : e.damage) ?? (e == null ? void 0 : e.amount) ?? 0) || 0)), r = Tc(a, A.monitors.armor), s = Tc(a, A.monitors.structure), o = t ? { ...t, armorBefore: r.remaining, structureBefore: s.remaining, pureStructureHit: r.remaining <= 0 } : ib(a, e, r.remaining, s.remaining), l = Math.min(n, a.type === A.actorTypes.vehicle && r.max <= 0 ? 0 : r.remaining), c = Math.min(s.remaining, Math.max(0, n - l)), u = Math.min(r.max, r.value + l), d = Math.min(s.max, s.value + c), m = ab(o, i), f = Am(o, i), p = Tm(e), h = c;
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
      armorBefore: r.remaining,
      armorAfter: Math.max(0, r.max - u),
      armorDamageBefore: r.value,
      armorDamageAfter: u,
      armorMax: r.max,
      armorAbsorbed: l,
      structureBefore: s.remaining,
      structureAfter: Math.max(0, s.max - d),
      structureDamageBefore: s.value,
      structureDamageAfter: d,
      structureMax: s.max,
      structureDamage: c,
      pureStructureHit: r.remaining <= 0,
      locationStressGain: h,
      locationTakesStress: h > 0
    },
    degradation: {
      attackQuality: p,
      locationStressGain: h
    },
    beforeLabel: `Armor ${r.remaining}/${r.max}, Structure ${s.remaining}/${s.max}`,
    afterLabel: `Armor ${Math.max(0, r.max - u)}/${r.max}, Structure ${Math.max(0, s.max - d)}/${s.max}`,
    source: String((e == null ? void 0 : e.source) ?? "").trim(),
    notes: String((e == null ? void 0 : e.notes) ?? "").trim()
  };
}
function ei(a, e = "") {
  var t, i;
  try {
    return ((i = (t = game == null ? void 0 : game.settings) == null ? void 0 : t.get) == null ? void 0 : i.call(t, T, a)) || e;
  } catch {
    return e;
  }
}
function rb(a = null) {
  return ei(um, st.general);
}
async function wm(a = null, e = "") {
  const t = String(e || rb(a)).trim();
  if (!t || typeof fromUuid != "function") return null;
  try {
    return await fromUuid(t);
  } catch (i) {
    return console.warn("MWD | Unable to resolve machine critical table", t, i), null;
  }
}
function km(a = null, e = {}) {
  const t = String((e == null ? void 0 : e.locationFamily) ?? (e == null ? void 0 : e.locationKey) ?? "").trim();
  return (a == null ? void 0 : a.type) === A.actorTypes.battlemech ? t === "head" ? "head" : t === "arms" || t === "arm" || /arm/i.test(String((e == null ? void 0 : e.locationKey) ?? "")) ? "arms" : t === "legs" || t === "leg" || /leg/i.test(String((e == null ? void 0 : e.locationKey) ?? "")) ? "legs" : "torso" : t === "turret" || t === "weapon" || /turret|weapon/i.test(String((e == null ? void 0 : e.locationKey) ?? "")) ? "turret" : t === "mobility" || t === "motive" || /mobility|motive|drive|wheel|track/i.test(String((e == null ? void 0 : e.locationKey) ?? "")) ? "mobility" : "body";
}
function sb(a = null, e = {}) {
  const t = km(a, e);
  return (a == null ? void 0 : a.type) === A.actorTypes.battlemech ? t === "head" ? ei(dm, st.mechHead) : t === "arms" ? ei(fm, st.mechArms) : t === "legs" ? ei(pm, st.mechLegs) : ei(mm, st.mechTorso) || ei(Vy, st.battlemech) : t === "turret" ? ei(gm, st.vehicleTurret) : t === "mobility" ? ei(ym, st.vehicleMobility) : ei(hm, st.vehicleBody) || ei(Yy, st.vehicle);
}
function ob(a = null, e = {}, t = 7) {
  var s, o, l, c;
  const i = (a == null ? void 0 : a.type) === A.actorTypes.vehicle ? "vehicle" : "battlemech", n = km(a, e), r = Math.min(12, Math.max(2, Math.trunc(Number(t ?? 7)) || 7));
  return Ln(((o = (s = yc[i]) == null ? void 0 : s[n]) == null ? void 0 : o[r]) ?? ((c = (l = yc[i]) == null ? void 0 : l[n]) == null ? void 0 : c[7]));
}
function jn(a = {}, e = {}) {
  const t = Number((a == null ? void 0 : a.rollTotal) ?? 0);
  if (Number.isFinite(t) && t >= 2 && t <= 12) return Math.trunc(t);
  const i = String((e == null ? void 0 : e.key) ?? "").trim();
  for (const [n, r] of Object.entries(no))
    if (r.key === i) return Number(n);
  return i === "cascade" || (e == null ? void 0 : e.escalationKey) === "cascade" ? 2 : (e == null ? void 0 : e.escalationKey) === "conditionAdvance" ? 12 : 7;
}
function bs(a = {}, e = 0) {
  return e === 2 || (a == null ? void 0 : a.key) === "catastrophicCascade" || (a == null ? void 0 : a.key) === "cascade" || (a == null ? void 0 : a.escalationKey) === "cascade";
}
function lb(a, e) {
  var i;
  return Array.from((a == null ? void 0 : a.results) ?? ((i = a == null ? void 0 : a.results) == null ? void 0 : i.contents) ?? []).find((n) => {
    const r = Array.isArray(n == null ? void 0 : n.range) ? n.range : [], s = Number(r[0] ?? 0), o = Number(r[1] ?? r[0] ?? 0);
    return e >= s && e <= o;
  }) ?? null;
}
async function wc({ actor: a = null, hitLocation: e = {}, rollTotal: t = 7, tableUuid: i = "" } = {}) {
  const n = ob(a, e, t), r = String(i || sb(a, e)).trim();
  if (!n) return { error: "No location critical table is defined for this hit location." };
  if (!r || typeof fromUuid != "function")
    return {
      signal: ca(n.signal, { strict: !0 }),
      label: n.label,
      tableUuid: r,
      resultId: "",
      rollTotal: t
    };
  const s = await wm(a, r);
  if (!s) return { error: `Machine location critical table could not be resolved: ${r}` };
  const o = lb(s, t);
  if (!o) return { error: `Machine location critical table has no result for ${t}: ${r}` };
  const l = ca(o, { strict: !0 });
  return {
    signal: l,
    label: String((o == null ? void 0 : o.text) ?? (o == null ? void 0 : o.name) ?? l.key).trim() || l.key,
    tableUuid: s.uuid ?? r,
    resultId: o.id ?? o._id ?? "",
    rollTotal: t
  };
}
async function kc({ actor: a = null, drawFn: e = null, tableUuid: t = "", recursiveCascade: i = !1 } = {}) {
  var l;
  if (typeof e == "function") {
    const c = await e({ actor: a, recursiveCascade: i }), u = ca((c == null ? void 0 : c.signal) ?? c, { strict: !0 });
    return {
      signal: u,
      label: String((c == null ? void 0 : c.label) ?? u.key).trim() || u.key,
      tableUuid: String((c == null ? void 0 : c.tableUuid) ?? t ?? "").trim(),
      resultId: String((c == null ? void 0 : c.resultId) ?? "").trim(),
      rollTotal: Number((c == null ? void 0 : c.rollTotal) ?? 0) || null
    };
  }
  const n = await wm(a, t);
  if (!(n != null && n.draw)) return { error: "Machine critical table is not configured." };
  const r = await n.draw({ displayChat: !1 }), s = Array.from((r == null ? void 0 : r.results) ?? [])[0] ?? null;
  if (!s) return { error: "Machine critical table returned no result." };
  const o = ca(s, { strict: !0 });
  return {
    signal: o,
    label: String((s == null ? void 0 : s.text) ?? (s == null ? void 0 : s.name) ?? o.key).trim() || o.key,
    tableUuid: n.uuid ?? t,
    resultId: s.id ?? s._id ?? "",
    rollTotal: Number(((l = r == null ? void 0 : r.roll) == null ? void 0 : l.total) ?? 0) || null
  };
}
function Ss({ actor: a, drawn: e, hitLocation: t, source: i = {}, cascade: n = !1 } = {}) {
  var u, d, m, f, p, h, g;
  const r = ca((e == null ? void 0 : e.signal) ?? e, { strict: !0 }), s = In(r.remedyKey), o = Am(t, !1), l = String((e == null ? void 0 : e.label) ?? r.key).trim() || r.key, c = tm({
    key: r.key,
    label: l,
    locationLabel: o.locationLabel,
    gates: r.gates,
    mods: r.mods,
    remedyKey: r.remedyKey
  }, s);
  return {
    id: Jy(),
    key: r.key,
    label: l,
    tableUuid: String((e == null ? void 0 : e.tableUuid) ?? "").trim(),
    resultId: String((e == null ? void 0 : e.resultId) ?? "").trim(),
    generalKey: String(((u = e == null ? void 0 : e.general) == null ? void 0 : u.key) ?? "").trim(),
    generalLabel: String(((d = e == null ? void 0 : e.general) == null ? void 0 : d.label) ?? "").trim(),
    generalRollTotal: Number(((m = e == null ? void 0 : e.general) == null ? void 0 : m.rollTotal) ?? (e == null ? void 0 : e.rollTotal) ?? 0) || null,
    generalTableUuid: String(((f = e == null ? void 0 : e.general) == null ? void 0 : f.tableUuid) ?? "").trim(),
    generalResultId: String(((p = e == null ? void 0 : e.general) == null ? void 0 : p.resultId) ?? "").trim(),
    locationKey: o.locationKey,
    locationFamily: o.locationFamily,
    locationLabel: o.locationLabel,
    gates: r.gates,
    mods: r.mods,
    resourceEffects: r.resourceEffects,
    pilotDamage: r.pilotDamage,
    remedyKey: r.remedyKey,
    remedyLabel: s.label,
    remedySkillKey: c,
    remedyBaseDn: im({ remedyKey: r.remedyKey }, s),
    remedyEffect: hl({}),
    escalationKey: r.escalationKey,
    active: !0,
    cascade: !!n,
    createdRound: Number(((g = (h = globalThis.game) == null ? void 0 : h.combat) == null ? void 0 : g.round) ?? 0) || 0,
    createdAt: Xy(),
    source: Ln(i ?? {}),
    actorType: (a == null ? void 0 : a.type) ?? ""
  };
}
async function cb({
  actor: a = null,
  hitLocation: e = {},
  source: t = {},
  drawFn: i = null,
  tableUuid: n = ""
} = {}) {
  try {
    const r = await kc({ actor: a, drawFn: i, tableUuid: n, recursiveCascade: !1 });
    if (r != null && r.error) return { ok: !1, reason: r.error, crits: [] };
    const s = ca(r.signal, { strict: !0 }), o = jn(r, s), l = await wc({ actor: a, hitLocation: e, rollTotal: o });
    if (l != null && l.error) return { ok: !1, reason: l.error, crits: [] };
    const c = {
      ...l,
      general: {
        key: s.key,
        label: String((r == null ? void 0 : r.label) ?? s.key).trim() || s.key,
        rollTotal: o,
        tableUuid: String((r == null ? void 0 : r.tableUuid) ?? "").trim(),
        resultId: String((r == null ? void 0 : r.resultId) ?? "").trim()
      }
    };
    if (!bs(s, o))
      return { ok: !0, crits: [Ss({ actor: a, drawn: c, hitLocation: e, source: t })], cascade: !1 };
    const u = await kc({ actor: a, drawFn: i, tableUuid: n, recursiveCascade: !0 }), d = u != null && u.error ? Ac(12) : ca(u.signal, { strict: !0 }), m = bs(d, jn(u, d)) ? 12 : jn(u, d), f = m === 12 && bs(d, jn(u, d)) ? Ac(12) : d, p = await wc({ actor: a, hitLocation: e, rollTotal: m });
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
        Ss({ actor: a, drawn: c, hitLocation: e, source: t, cascade: !0 }),
        Ss({ actor: a, drawn: h, hitLocation: e, source: t })
      ]
    };
  } catch (r) {
    return { ok: !1, reason: (r == null ? void 0 : r.message) ?? "Unable to draw machine critical.", crits: [] };
  }
}
function ub(a = {}) {
  return Array.isArray(a == null ? void 0 : a.preparedCriticalRecords) ? a.preparedCriticalRecords.map((e) => Ln(e)) : [];
}
function db(a = []) {
  return Array.from(a ?? []).filter((e) => String((e == null ? void 0 : e.escalationKey) ?? "").trim() === "conditionAdvance").map((e) => String((e == null ? void 0 : e.locationKey) ?? "").trim()).filter(Boolean);
}
function mb(a = {}) {
  var t, i, n;
  if (!((t = a == null ? void 0 : a.machine) != null && t.pureStructureHit)) return [];
  if (Math.max(0, Number(((i = a == null ? void 0 : a.machine) == null ? void 0 : i.structureDamage) ?? 0) || 0) <= 0) return [];
  const e = String(((n = a == null ? void 0 : a.hitLocation) == null ? void 0 : n.locationKey) ?? "").trim();
  return e ? [{ locationKey: e, source: "pureStructure", applyReductions: !1, allowSpend: !1 }] : [];
}
async function fb(a, e) {
  if (!(!(a != null && a.toggleStatusEffect) || !e))
    try {
      await Hr({
        actor: a,
        statusId: cm,
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
async function pb({
  actor: a = null,
  token: e = null,
  payload: t = {},
  options: i = {}
} = {}) {
  var d, m, f;
  const n = nb({
    actor: a,
    payload: t,
    chaosCriticalSelected: !!(t != null && t.chaosCriticalSelected)
  });
  if (!n.ok) return n;
  const r = !!i.dryRun, s = ub(t);
  let o = s.length ? { ok: !0, crits: s, cascade: s.length > 1 } : { ok: !0, crits: [] };
  !s.length && n.critical.selected && (o = await cb({
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
  const l = Gy({
    actorSnapshot: a,
    locationKey: n.critical.locationKey || n.hitLocation.locationKey,
    machineDamageDealt: n.machine.structureDamage,
    attackQuality: ((d = n.degradation) == null ? void 0 : d.attackQuality) ?? Tm(t),
    allowReliabilitySpend: !0,
    reliabilitySpendSelections: Array.isArray(t == null ? void 0 : t.reliabilitySpendSelections) ? t.reliabilitySpendSelections : [],
    directConditionLocations: [
      ...mb(n),
      ...o.ok ? db(o.crits) : []
    ]
  });
  l.loopGuardTriggered && console.warn("MWD | Machine degradation loop guard triggered", {
    actor: (a == null ? void 0 : a.name) ?? (a == null ? void 0 : a.id) ?? "Machine",
    payload: t,
    degradation: l
  });
  const c = Array.isArray((f = (m = a == null ? void 0 : a.system) == null ? void 0 : m.mwd) == null ? void 0 : f.crits) ? Ln(a.system.mwd.crits) : [], u = o.ok && o.crits.length ? c.concat(o.crits) : c;
  if (!r) {
    const p = {
      "system.monitors.armor.value": n.machine.armorDamageAfter,
      "system.monitors.structure.value": n.machine.structureDamageAfter,
      ...qy(a, l)
    };
    o.ok && o.crits.length && (p["system.mwd.crits"] = u), await a.update(p), await fb(a, u.some((h) => (h == null ? void 0 : h.active) !== !1));
  }
  return {
    ...n,
    dryRun: r,
    appliedDelta: n.machine.structureDamage,
    critical: {
      ...n.critical,
      drawOk: !!o.ok,
      reason: o.ok ? "" : o.reason,
      records: o.ok ? o.crits : [],
      cascade: !!o.cascade
    },
    degradation: l
  };
}
function vc(a) {
  const e = Number(a ?? 0);
  return Number.isFinite(e) ? Math.trunc(e) : 0;
}
function en(a) {
  return a === A.monitors.physical ? "Physical" : a === A.monitors.fatigue ? "Fatigue" : String(a ?? "").trim() || "Track";
}
function hb({
  incomingDamage: a = 0,
  armorBefore: e = 0,
  reinforcedBefore: t = 0,
  reinforcedMax: i = 0,
  hasArmorItem: n = !1
} = {}) {
  const r = {
    armorBefore: Math.max(0, Number(e ?? 0) || 0),
    armorAfter: Math.max(0, Number(e ?? 0) || 0),
    reinforcedBefore: Math.max(0, Number(t ?? 0) || 0),
    reinforcedAfter: Math.max(0, Number(t ?? 0) || 0),
    reinforcedMax: Math.max(0, Number(i ?? 0) || 0),
    update: {}
  };
  return !n || Math.max(0, Number(a ?? 0) || 0) <= 0 ? r : r.reinforcedBefore > 0 ? (r.reinforcedAfter = Math.max(0, r.reinforcedBefore - 1), r.reinforcedAfter !== r.reinforcedBefore && (r.update["system.traitState.reinforced.current"] = r.reinforcedAfter), r) : (r.armorAfter = Math.max(0, r.armorBefore - 1), r.armorAfter !== r.armorBefore && (r.update["system.durability.current"] = r.armorAfter), r);
}
function un(a) {
  return a ? (a == null ? void 0 : a.document) ?? a : null;
}
function As(a, e) {
  var i, n, r;
  if (!a) return null;
  const t = un(e) ?? un(a == null ? void 0 : a.token);
  return t ? t.isLinked ? t.baseActor ?? ((r = (i = game.actors) == null ? void 0 : i.get) == null ? void 0 : r.call(i, ((n = t == null ? void 0 : t.baseActor) == null ? void 0 : n.id) ?? "")) ?? t.actor ?? a : t.actor ?? a : a;
}
function Hn(a, e) {
  var t, i, n;
  return Math.max(0, Number(((n = (i = (t = a == null ? void 0 : a.system) == null ? void 0 : t.monitors) == null ? void 0 : i[e]) == null ? void 0 : n.value) ?? 0) || 0);
}
function Mc(a) {
  var e, t;
  return Math.max(0, Number(((t = (e = a == null ? void 0 : a.system) == null ? void 0 : e.burn) == null ? void 0 : t.value) ?? 0) || 0);
}
function gb(a) {
  return (a == null ? void 0 : a.type) === A.actorTypes.character || (a == null ? void 0 : a.type) === A.actorTypes.npc;
}
function yb(a) {
  return (a == null ? void 0 : a.type) === A.actorTypes.vehicle || (a == null ? void 0 : a.type) === A.actorTypes.battlemech;
}
function bb(a) {
  return [
    A.actorTypes.character,
    A.actorTypes.npc,
    A.actorTypes.vehicle,
    A.actorTypes.battlemech
  ].includes(a == null ? void 0 : a.type);
}
function Sb(a, e) {
  const t = String(a ?? "").trim();
  return t === "status" ? bb(e) : t === "machineAttackDamage" ? yb(e) : gb(e);
}
function Ab(a, e) {
  var t;
  return ((t = tl(e).find((i) => i.id === a)) == null ? void 0 : t.label) ?? a;
}
function Tb(a) {
  var i, n, r, s;
  const e = foundry.utils.escapeHTML, t = [];
  if (a.mode === "machineAttackDamage") {
    const o = a.appliedDelta >= 0 ? "Applied" : "Recovered";
    t.push(`<div><b>${o}:</b> ${Number(a.damageIncoming ?? a.requestedDelta ?? 0)} machine damage</div>`), (i = a.hitLocation) != null && i.locationLabel && t.push(`<div><b>Location:</b> ${e(a.hitLocation.locationLabel)} (${Number(a.hitLocation.rollTotal ?? 0)})</div>`), a.machine && (t.push(`<div><b>Armor:</b> ${Number(a.machine.armorBefore ?? 0)} -> ${Number(a.machine.armorAfter ?? 0)}</div>`), t.push(`<div><b>Structure:</b> ${Number(a.machine.structureBefore ?? 0)} -> ${Number(a.machine.structureAfter ?? 0)}</div>`)), (r = (n = a.critical) == null ? void 0 : n.records) != null && r.length ? t.push(`<div><b>Critical:</b> ${e(a.critical.records.map((l) => l.label).join(", "))}</div>`) : (s = a.critical) != null && s.reason && t.push(`<div><b>Critical:</b> ${e(a.critical.reason)}</div>`);
  }
  if (a.mode === "attackDamage" || a.mode === "trackDelta") {
    const o = a.appliedDelta >= 0 ? "Applied" : "Recovered", l = Math.abs(Number(a.appliedDelta ?? 0)), c = l === 1 ? "point" : "points", u = a.usedArmor ? ` via armor-aware ${e(Qt(a.damageType))}` : "";
    t.push(`<div><b>${o}:</b> ${l} ${c} to ${e(en(a.track))}${u}</div>`), a.usedArmor && a.mitigation && (t.push(
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
function wb(a) {
  var t, i;
  const e = (i = (t = game.settings) == null ? void 0 : t.get) == null ? void 0 : i.call(t, "core", "rollMode");
  return typeof ChatMessage.applyRollMode == "function" && ChatMessage.applyRollMode(a, e), a;
}
class Tt {
  static supportsActor(e, { mode: t = "" } = {}) {
    return Sb(t, e);
  }
  static getActorOptions({ mode: e = "" } = {}) {
    return Array.from(game.actors ?? []).filter((t) => this.supportsActor(t, { mode: e })).sort((t, i) => String(t.name ?? "").localeCompare(String(i.name ?? ""))).map((t) => ({
      id: t.id,
      name: t.name || "Character"
    }));
  }
  static getStatusOptions(e = null) {
    return tl(e).map((t) => ({
      value: t.id,
      label: t.label,
      active: t.active
    }));
  }
  static getSceneTarget({ mode: e = "" } = {}) {
    var n, r;
    const t = Array.from(((n = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : n.controlled) ?? []);
    if (t.length > 1)
      return { actor: null, token: null, reason: "Select only one controlled token." };
    if (t.length === 1) {
      const s = un(t[0]), o = As((s == null ? void 0 : s.actor) ?? null, s);
      return this._resolveSceneTargetResult(o, s, { mode: e });
    }
    const i = Array.from(((r = game.user) == null ? void 0 : r.targets) ?? []);
    if (i.length > 1)
      return { actor: null, token: null, reason: "Target only one token." };
    if (i.length === 1) {
      const s = un(i[0]), o = As((s == null ? void 0 : s.actor) ?? null, s);
      return this._resolveSceneTargetResult(o, s, { mode: e });
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
  static resolveTarget({ actor: e = null, token: t = null, actorId: i = "", preferSceneTarget: n = !1, mode: r = "" } = {}) {
    var l, c;
    const s = un(t);
    if (s) {
      const u = As((s == null ? void 0 : s.actor) ?? e, s), d = this._resolveSceneTargetResult(u, s, { mode: r });
      if (d.actor) return { ...d, source: "token" };
    }
    if (n) {
      const u = this.getSceneTarget({ mode: r });
      if (u.actor) return { ...u, source: "scene" };
    }
    if (e && this.supportsActor(e, { mode: r }))
      return { actor: e, token: s, reason: "", source: "actor" };
    const o = i ? ((c = (l = game.actors) == null ? void 0 : l.get) == null ? void 0 : c.call(l, i)) ?? null : null;
    return o && this.supportsActor(o, { mode: r }) ? { actor: o, token: null, reason: "", source: "fallback" } : {
      actor: null,
      token: s,
      source: null,
      reason: n && this.getSceneTarget({ mode: r }).reason || "Choose a supported target."
    };
  }
  static async apply({ actor: e = null, token: t = null, payload: i = {}, options: n = {} } = {}) {
    var c;
    const r = String((i == null ? void 0 : i.mode) ?? "").trim(), s = this.resolveTarget({
      actor: e,
      token: t,
      actorId: n.actorId ?? "",
      preferSceneTarget: !!n.preferSceneTarget,
      mode: r
    });
    if (!s.actor)
      return { ok: !1, reason: s.reason || "Choose a supported target." };
    let o;
    switch (String((i == null ? void 0 : i.mode) ?? "").trim()) {
      case "attackDamage":
        o = await this._applyAttackDamage(s.actor, i, n);
        break;
      case "machineAttackDamage":
        o = await this._applyMachineAttackDamage(s.actor, s.token, i, n);
        break;
      case "trackDelta":
        o = await this._applyTrackDelta(s.actor, i, n);
        break;
      case "burnDelta":
        o = await this._applyBurnDelta(s.actor, i);
        break;
      case "status":
        o = await this._applyStatus(s.actor, i);
        break;
      default:
        return { ok: !1, reason: "Unsupported harm mode." };
    }
    const l = {
      ok: !0,
      actor: s.actor,
      token: s.token,
      actorName: s.actor.name || "Character",
      sourceType: s.source,
      dryRun: !!n.dryRun,
      ...o
    };
    if (n.logToChat && !n.dryRun) {
      const u = Tb(l), d = wb({
        speaker: ChatMessage.getSpeaker({ actor: s.actor, token: s.token }),
        content: u
      });
      await ChatMessage.create(d);
    }
    return n.dryRun || (c = z.renderOpenCharacterSheets) == null || c.call(z, s.actor.id), l;
  }
  static async _applyTrackDelta(e, t, i = {}) {
    const n = (t == null ? void 0 : t.track) === A.monitors.fatigue ? A.monitors.fatigue : A.monitors.physical, r = vc((t == null ? void 0 : t.delta) ?? (t == null ? void 0 : t.amount) ?? 0);
    if (!!(t != null && t.useArmor) && r > 0)
      return this._applyPersonalArmorAwareDamage(e, {
        mode: "trackDelta",
        track: n,
        damage: r,
        damageType: t == null ? void 0 : t.damageType,
        ap: (t == null ? void 0 : t.ap) ?? 0,
        effects: (t == null ? void 0 : t.effects) ?? {},
        source: t == null ? void 0 : t.source,
        notes: t == null ? void 0 : t.notes
      }, i);
    const o = Hn(e, n);
    i.dryRun || await G.addCounter(e, n, r);
    const l = i.dryRun ? Math.max(0, o + r) : Hn(e, n);
    return {
      mode: "trackDelta",
      track: n,
      requestedDelta: r,
      appliedDelta: l - o,
      usedArmor: !1,
      beforeLabel: `${en(n)} ${o}`,
      afterLabel: `${en(n)} ${l}`,
      source: String((t == null ? void 0 : t.source) ?? "").trim(),
      notes: String((t == null ? void 0 : t.notes) ?? "").trim()
    };
  }
  static async _applyBurnDelta(e, t) {
    var l, c;
    const i = vc((t == null ? void 0 : t.delta) ?? (t == null ? void 0 : t.amount) ?? 0), n = Mc(e), r = Math.max(0, n + i), s = { "system.burn.value": r };
    r === 0 && ((c = (l = e.system) == null ? void 0 : l.burn) != null && c.overloaded) && (s["system.burn.overloaded"] = !1), await e.update(s);
    const o = Mc(e);
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
    const n = oa(e, i), r = !!(t != null && t.active);
    await Hr({
      actor: e,
      statusId: i,
      active: r,
      metadata: {
        scope: t == null ? void 0 : t.scope,
        notes: t == null ? void 0 : t.notes,
        location: t == null ? void 0 : t.location,
        itemUuid: t == null ? void 0 : t.itemUuid,
        targetUuid: t == null ? void 0 : t.targetUuid,
        severity: t == null ? void 0 : t.severity
      }
    });
    const s = oa(e, i);
    return {
      mode: "status",
      statusId: i,
      statusLabel: Ab(i, e),
      active: s,
      beforeLabel: n ? "Active" : "Inactive",
      afterLabel: s ? "Active" : "Inactive",
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
    return pb({ actor: e, token: t, payload: i, options: n });
  }
  static async _applyPersonalArmorAwareDamage(e, t, i = {}) {
    var x, K, q, j, W, _, F, V, Y;
    const n = !!i.dryRun, r = (t == null ? void 0 : t.track) === A.monitors.fatigue ? A.monitors.fatigue : A.monitors.physical, s = Math.max(0, Number((t == null ? void 0 : t.damage) ?? 0) || 0), o = Math.max(0, Number((t == null ? void 0 : t.netHits) ?? 0) || 0), l = (t == null ? void 0 : t.effects) ?? {}, c = ((x = e.getPersonalCombatLoadout) == null ? void 0 : x.call(e, { refresh: !0 })) ?? null, u = (c == null ? void 0 : c.activeArmor) ?? null, d = Math.max(0, Number((u == null ? void 0 : u.currentArmorRating) ?? ((K = u == null ? void 0 : u.durability) == null ? void 0 : K.current) ?? 0) || 0), m = Yt(t == null ? void 0 : t.damageType, "concussive"), f = Hn(e, r);
    let p = s + o;
    const h = d > 0 ? Rp({
      damageIncoming: p,
      armorTags: (u == null ? void 0 : u.tags) ?? [],
      effects: l
    }) : { damageIncoming: p, applied: [] };
    p = h.damageIncoming;
    const g = Pp({
      currentArmorRating: d,
      mitigationByType: (u == null ? void 0 : u.mitigationByType) ?? {},
      damageType: m
    }), y = Math.max(
      0,
      (Number((t == null ? void 0 : t.ap) ?? 0) || 0) + (Number((l == null ? void 0 : l.ap) ?? 0) || 0)
    ), b = g.isDestroyed ? 0 : Math.max(0, g.baseMitigation + g.typeMitigationMod - y);
    let S = Math.max(0, Math.ceil(p - b));
    const w = {
      snapshot: ((q = z.getSnapshot) == null ? void 0 : q.call(z, e)) ?? null
    }, k = Bt({
      actor: e,
      phase: "onDamageResolved",
      facts: Ed({
        actor: e,
        packet: {
          amount: S,
          track: r,
          damageType: m
        },
        runtime: w
      }),
      packet: {
        amount: S,
        track: r,
        damageType: m
      },
      options: { runtime: w, consumeUsage: !0 }
    });
    n || await Ai({ actor: e, mutations: k.mutations, runtime: w }), S = Math.max(0, Number(k.packet.amount ?? S) || 0), !n && S > 0 && await G.addCounter(e, r, S);
    const P = hb({
      incomingDamage: s + o,
      armorBefore: ((j = u == null ? void 0 : u.durability) == null ? void 0 : j.current) ?? 0,
      reinforcedBefore: ((_ = (W = u == null ? void 0 : u.traitState) == null ? void 0 : W.reinforced) == null ? void 0 : _.current) ?? 0,
      reinforcedMax: ((V = (F = u == null ? void 0 : u.traitState) == null ? void 0 : F.reinforced) == null ? void 0 : V.max) ?? 0,
      hasArmorItem: !!((Y = u == null ? void 0 : u.item) != null && Y.id)
    });
    !n && Object.keys(P.update).length > 0 && await u.item.update(P.update);
    const E = n ? Math.max(0, f + S) : Hn(e, r);
    return {
      mode: (t == null ? void 0 : t.mode) ?? "attackDamage",
      track: r,
      requestedDelta: s + o,
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
      beforeLabel: `${en(r)} ${f}`,
      afterLabel: `${en(r)} ${E}`,
      source: String((t == null ? void 0 : t.source) ?? "").trim(),
      notes: String((t == null ? void 0 : t.notes) ?? "").trim()
    };
  }
}
O(Tt, "MODE_OPTIONS", Object.freeze([
  { value: A.monitors.physical, label: "Physical" },
  { value: A.monitors.fatigue, label: "Fatigue" },
  { value: "burn", label: "Burn" },
  { value: "status", label: "Status" }
]));
const Cc = hr, ro = "damage-mode", kb = `${T}.${ro}`, Kn = {}, Ts = {};
class ye {
  static init() {
    na.register(Rt.PROVIDE_DAMAGE_MODE), Hooks.on("updateSetting", async (e, t, i, n) => ye.onUpdateSetting(e, t, i, n)), Hooks.on(Rt.PROVIDE_DAMAGE_MODE, (e) => {
      e("resistanceArmorMonitor", v.settings.damageMode.values.resistanceArmorMonitor, ye.sufferDamageResistanceArmorMonitor), e("armorResistanceMonitor", v.settings.damageMode.values.armorResistanceMonitor, ye.sufferDamageArmorResistanceMonitor), e("armorGivesResistance", v.settings.damageMode.values.armorGivesResistance, ye.sufferDamageArmorAsResistance_Earthdawn), e("armorGiveResistanceHitsAvoid", v.settings.damageMode.values.armorGiveResistanceHitsAvoid, ye.sufferDamageArmorAsResistance_Cyberpunk);
    }), Hooks.once("ready", () => ye.onReady());
  }
  static onReady() {
    ye._registerDamageModeSetting(), ye._selectDamageMode();
  }
  static _registerDamageModeSetting() {
    Hooks.callAll(Rt.PROVIDE_DAMAGE_MODE, (e, t, i) => {
      Kn[e] = t, Ts[e] = i;
    }), game.settings.register(T, ro, {
      scope: "world",
      name: v.settings.damageMode.name,
      hint: v.settings.damageMode.hint,
      config: !0,
      default: Object.keys(Kn)[0],
      choices: Kn,
      type: String
    });
  }
  static async onUpdateSetting(e, t, i, n) {
    e.key == kb && ye._selectDamageMode();
  }
  static _selectDamageMode() {
    let e = game.settings.get(T, ro);
    Ts[e] || (e = Object.keys(Kn)[0]), ye.damageModeCode = e, ye.damageModeMethod = Ts[e];
  }
  static async sufferDamage(e, t, i, n, r, s, o) {
    const { monitor: l, damageType: c } = ye._resolveDamageContext(e, t, o);
    if (da.checkActorCanReceiveDamage(c ?? l, l, e), ye._shouldUsePersonalDamageV2(e, l, o)) {
      await ye.sufferPersonalDamageV2(e, l, c, i, n, r, s, o);
      return;
    }
    await (ye.damageModeMethod ?? ye.sufferDamageResistanceArmorMonitor)(e, l, c, i, n, r, s), await e.applyArmorDamage(l, c, pe.sumModifiers([o], "other", "damageArmor"));
  }
  static _shouldUsePersonalDamageV2(e, t, i) {
    var n, r;
    return !((n = e == null ? void 0 : e.isCharacterLike) != null && n.call(e)) || ![A.monitors.physical, A.monitors.fatigue].includes(t) ? !1 : !!((r = i == null ? void 0 : i.isPersonalWeapon) != null && r.call(i) || (i == null ? void 0 : i.canonicalType) === A.itemType.personalWeapon || (i == null ? void 0 : i.type) === A.itemType.personalWeapon);
  }
  static async sufferPersonalDamageV2(e, t, i, n, r, s, o, l) {
    var d;
    const c = ((d = l == null ? void 0 : l.getCombatProfile) == null ? void 0 : d.call(l)) ?? l ?? null, u = await Tt.apply({
      actor: e,
      payload: {
        mode: "attackDamage",
        track: t,
        damage: Number(n ?? (c == null ? void 0 : c.damage) ?? 0) || 0,
        netHits: Number(r ?? 0) || 0,
        damageType: i ?? (c == null ? void 0 : c.damageType),
        ap: Number((c == null ? void 0 : c.ap) ?? 0) || 0,
        effects: (c == null ? void 0 : c.effects) ?? {}
      },
      options: {
        logToChat: !1
      }
    });
    u != null && u.ok && ye._notifyPersonalArmorMitigation(e, {
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
    const i = t.armorMitigation ?? {}, n = ye._localizeDamageType(t.damageType), r = i.isDestroyed ? "Armor destroyed" : `Base ${Number(i.baseMitigation ?? 0)} + Type ${Number(i.typeMitigationMod ?? 0)} - AP ${Number(t.effectiveAp ?? 0)}`, s = Number(t.adjustedIncoming ?? t.baseIncoming ?? 0), o = Number(t.finalDamage ?? 0), l = (((u = t.tagEffectResult) == null ? void 0 : u.applied) ?? []).map((d) => `${d.tag} +${Math.round((Number(d.bonus ?? 0) || 0) * 100)}%`).join(", "), c = l ? ` [${l}]` : "";
    ui.notifications.info(
      `${e.name} mitigated ${n}: ${r}${c}. Incoming ${s}, final ${o}.`
    );
  }
  static async sufferDamageResistanceArmorMonitor(e, t, i, n, r, s, o) {
    const l = G.resistanceDetail(e, t, i), c = l.value;
    let u = 0;
    if (s) {
      const d = Math.min(c, n), m = Math.min(c - d, r);
      u = n - d, G.useArmor(t) && (u -= await ye.damageToArmor(e, i, u)), u += r - m;
    } else
      u = n + r - c, G.useArmor(t) && (u -= await ye.damageToArmor(e, i, u));
    u > 0 && await G.addCounter(e, t, u), ye._notifyResistanceUsage(e, t, i, l);
  }
  static async sufferDamageArmorResistanceMonitor(e, t, i, n, r, s, o) {
    let l = 0;
    G.useArmor(t) ? s ? (n -= await ye.damageToArmor(e, i, n), l = r + n) : (l = r + n, l -= await ye.damageToArmor(e, i, l)) : l = n + r;
    const c = G.resistanceDetail(e, t, i);
    return l -= c.value, l > 0 && await G.addCounter(e, t, l), ye._notifyResistanceUsage(e, t, i, c), l;
  }
  static async sufferDamageArmorAsResistance_Cyberpunk(e, t, i, n, r, s, o) {
    let l = n + r;
    if (G.useArmor(t) && l > 0) {
      const u = s ? r : 0, d = Math.max(0, ye._computeArmorResistance(e) - u);
      d > 0 && (await G.addCounter(e, "armor", 1), l -= d);
    }
    const c = G.resistanceDetail(e, t, i);
    return l -= c.value, l > 0 && await G.addCounter(e, t, l), ye._notifyResistanceUsage(e, t, i, c), Math.max(l, 0);
  }
  static async sufferDamageArmorAsResistance_Earthdawn(e, t, i, n, r, s, o) {
    let l = n + r;
    if (G.useArmor(t) && !s && l > 0) {
      const u = ye._computeArmorResistance(e);
      u > 0 && (await G.addCounter(e, "armor", 1), l -= u);
    }
    l -= ye._computeStrengthResistance(e, t);
    const c = G.resistanceDetail(e, t, i);
    return l -= c.value, l > 0 && await G.addCounter(e, t, l), ye._notifyResistanceUsage(e, t, i, c), l;
  }
  static async damageToArmor(e, t, i) {
    if (i > 0) {
      const n = G.max(e, A.monitors.armor), r = G.getCounterValue(e, A.monitors.armor), s = Math.min(n - r, i), o = G.resistance(e, A.monitors.armor, t), l = Math.max(0, s - o);
      return l > 0 && await G.addCounter(e, A.monitors.armor, l), s;
    } else
      return 0;
  }
  static _resolveDamageContext(e, t, i) {
    var o;
    const n = (typeof t == "object" ? (t == null ? void 0 : t.damageType) ?? (t == null ? void 0 : t.type) : t) ?? ((o = i == null ? void 0 : i.system) == null ? void 0 : o.damageType), r = typeof t == "object" ? (t == null ? void 0 : t.monitor) ?? n : n;
    return { monitor: e.getDamageMonitor(r), damageType: n };
  }
  static _notifyResistanceUsage(e, t, i, n) {
    var u;
    if (!n || t === void 0)
      return;
    const r = v.actor.monitors[t] ?? t, s = ye._localizeDamageType(i) ?? r, o = n.usedType ? "type" : "default", l = ((u = v.actor.monitors.resistanceSources) == null ? void 0 : u[o]) ?? o, c = Re(v.actor.monitors.resistanceApplied, {
      actor: e.name,
      monitor: r,
      damageType: s,
      value: n.value,
      source: l
    });
    ui.notifications.info(c);
  }
  static _localizeDamageType(e) {
    if (e)
      return zu(e) ? Qt(e) : v.mwd.weaponDamageType[e] ?? v.mwd.personalDamageType[e] ?? v.actor.monitors[e] ?? e;
  }
  static _computeArmorResistance(e) {
    const t = G.max(e, "armor"), i = G.getCounterValue(e, "armor"), n = Math.max(0, t - i);
    return Math.max(0, Math.ceil(n / 3));
  }
  static _computeStrengthResistance(e, t) {
    const i = e.getAttributeValue(A.actorAttributes.strength);
    return Math.max(0, Math.floor(i / 4));
  }
}
class Nt extends Actor {
  static init() {
    Hooks.on("updateActor", (e, t, i, n) => {
      var r;
      return (r = Gt.firstResponsible(e)) == null ? void 0 : r.onUpdateActor(t, i);
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
      const r = i.system.code === "knowledge" || i.system.attribute === "knowledge", s = n.system.code === "knowledge" || n.system.attribute === "knowledge";
      if (r && !s) return 1;
      if (!s && r) return -1;
      if (r && s)
        return i.name > n.name ? 1 : i.name > n.name ? -1 : 0;
      const o = e.getAttributeValue(i.system.attribute) + i.system.value, l = e.getAttributeValue(n.system.attribute) + n.system.value;
      return o > l ? -1 : o < l ? 1 : 0;
    }) : [];
  }
  static sortQualities(e) {
    if (!e)
      return [];
    const t = ["positive", "negative", "narrative"], i = ["major", "minor"];
    return e.sort((n, r) => {
      var m, f, p, h, g, y;
      const s = String(((m = n.system) == null ? void 0 : m.category) ?? (((f = n.system) == null ? void 0 : f.positive) === !1 ? "negative" : "positive")).trim() || "positive", o = String(((p = r.system) == null ? void 0 : p.category) ?? (((h = r.system) == null ? void 0 : h.positive) === !1 ? "negative" : "positive")).trim() || "positive", l = t.indexOf(s) - t.indexOf(o);
      if (l !== 0) return l;
      const c = String(((g = n.system) == null ? void 0 : g.tier) ?? "minor").trim() || "minor", u = String(((y = r.system) == null ? void 0 : y.tier) ?? "minor").trim() || "minor", d = i.indexOf(c) - i.indexOf(u);
      return d !== 0 ? d : String(n.name ?? "").localeCompare(String(r.name ?? ""));
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
      initiative: pe.sumModifiers(this.items, "other", "initiative")
    }, this.system.monitors) {
      const e = ve.getDamageTypes();
      Object.entries(this.system.monitors).forEach((t) => {
        t[1].resistance = Nt.normalizeResistance(t[1].resistance), t[1].maxBonus = pe.sumMonitorModifiers(this.items, t[0], "max"), t[1].resistanceBonus = pe.sumMonitorModifiers(this.items, t[0], "resistance"), t[1].resistanceBonusByType = Object.fromEntries(
          e.map((i) => [i.value, pe.sumMonitorModifiers(this.items, t[0], "resistanceByType", i.value)]).filter(([, i]) => i)
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
    return _a[this.type] ?? [];
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
      const r = t[n] ?? {}, s = r.value;
      r.value = s ?? e ?? 0, r.value = Math.min(r.value, e ?? r.value ?? 0), r.max = e ?? r.max ?? 0, t[n] = r;
    }), foundry.utils.setProperty(this.system, "counters.edgePools", t);
  }
  async setCheckbarValue(e, t) {
    return await this.update({ [e]: t });
  }
  _getMonitorMax(e) {
    const t = this.getAttributeValue(e);
    return t == 0 ? 0 : Tu + ue.divup(t, 2);
  }
  getAttributeActions() {
    return Fe.getActorActions(this);
  }
  getUsableAttributes(e = void 0) {
    const t = (e ? [e] : this.items).map((n) => n.getAttributes()).reduce((n, r) => n.concat(r), []), i = ue.distinct(this.getAttributes().concat(t));
    return i.sort(ue.ascendingBySortedArray(ve.sortedAttributeKeys)), i;
  }
  getAttributeValue(e, t = void 0) {
    let i = 0;
    if (e = this.getCorrespondingAttribute(e), e) {
      if (this.getAttributes().includes(e))
        i = this.system.attributes[e].value;
      else if (t)
        i = (t == null ? void 0 : t.getAttributeValue(e)) ?? 0;
      else {
        const n = this.items.filter((r) => r.getAttributes().includes(e));
        if (n.length > 0) {
          const r = n.map((s) => s.getAttributeValue(e) ?? 0);
          i = Math.max(...r);
        }
      }
      i += pe.sumModifiers(this.items, "attribute", e);
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
        await ye.damageToArmor(this, t, i);
    }
  }
  async rollAttribute(e) {
    await ri.rollAttribute(this, e);
  }
  async rollAttributeAction(e) {
    const t = Fe.getActorAction(this, e);
    await ri.rollAttributeAction(this, t);
  }
  async rollSkill(e, t) {
    await ri.rollSkill(this, e, t);
  }
  async rollWeapon(e) {
    var r, s, o;
    da.checkWeaponDefense(e, this);
    const t = (r = e.validateTargets(this)) == null ? void 0 : r.map((l) => l.id), i = {
      attackerTokenId: (o = (s = game.scenes.current) == null ? void 0 : s.tokens.find((l) => {
        var c;
        return ((c = l.actor) == null ? void 0 : c.id) == this.id;
      })) == null ? void 0 : o.id,
      targetedTokenIds: t
    }, n = this.items.find((l) => e.isWeaponSkill(l));
    await ri.rollWeapon(this, n, e, i);
  }
  async rollDefense(e) {
    const t = e.attack.defense, i = Fe.getActorDefense(this, t);
    await ri.rollDefense(this, i, e);
  }
  async switchMonitorCheck(e, t, i, n = void 0) {
    await G.switchMonitorCheck(this, e, t, i, n);
  }
  async addCounter(e, t, i = void 0) {
    await G.addCounter(this, e, t, i);
  }
  async setCounter(e, t, i = void 0) {
    await G.setCounter(this, e, t, i);
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
    const e = pe.sumModifiers(this.items, "other", "sceneAnarchy");
    e > 0 && await G.setCounter(this, A.monitors.sceneAnarchy, e);
  }
  async onLeaveCombat() {
    await G.setCounter(this, A.monitors.sceneAnarchy, 0);
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
    var n, r;
    const e = this.hasGMAnarchy(), t = (r = (n = game.system) == null ? void 0 : n.anarchy) == null ? void 0 : r.gmAnarchy, i = e && t && typeof t.getAnarchy == "function" ? t.getAnarchy() : {
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
    var r, s;
    const t = this.getAttributeValue(A.actorAttributes.edge), n = ((s = (r = this.getEdgePools()) == null ? void 0 : r[e]) == null ? void 0 : s.value) ?? t ?? 0;
    return Math.min(n, t ?? n ?? 0);
  }
  getRemainingEdge(e = void 0) {
    return e ? this.getEdgePoolValue(e) : Math.max(0, ...Object.values(A.counters.edgePools).map((t) => this.getEdgePoolValue(t)));
  }
  canUseEdge() {
    return this.getAttributes().includes(A.actorAttributes.edge);
  }
  async spendEdgePool(e, t) {
    t != 0 && await G.addCounter(this, e, -t);
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
    const i = Nt._prepareFavorite(e, t);
    return !!this.system.favorites.find((n) => Nt._isSameFavorite(i, n));
  }
  static _prepareFavorite(e, t) {
    return { type: e, id: t };
  }
  static _isSameFavorite(e, t) {
    return e.id == t.id && e.type == t.type;
  }
  async switchFavorite(e, t, i) {
    const n = Nt._prepareFavorite(t, i), r = this.system.favorites.filter((s) => !Nt._isSameFavorite(n, s));
    e && r.push(n), this.update({ "system.favorites": r });
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
    const i = Nt._prepareFavorite(e, t);
    if (e == "attributeAction") {
      const r = Fe.prepareShortcut(this, t);
      if (r)
        return foundry.utils.mergeObject(r, i);
    } else if (Object.values(A.itemType).includes(e)) {
      const r = (n = this.items.get(t)) == null ? void 0 : n.prepareShortcut();
      if (r)
        return foundry.utils.mergeObject(r, i);
    }
    return i;
  }
  async _onSetManualStepper(e, t) {
    var s, o;
    e == null || e.preventDefault();
    const i = (s = t == null ? void 0 : t.dataset) == null ? void 0 : s.id, n = Number((o = t == null ? void 0 : t.dataset) == null ? void 0 : o.value);
    if (!i || Number.isNaN(n)) return;
    const r = this._mwd.state.manual.find((l) => l.id === i);
    if (r)
      return r.value = n, this.render(!1);
  }
}
const { ApplicationV2: vb, HandlebarsApplicationMixin: Mb } = foundry.applications.api, { renderTemplate: Ec } = foundry.applications.handlebars, Cb = `${ee}/chat/celebrity-roll.hbs`, Ea = class Ea extends Mb(vb) {
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
        pe.computeModifiers(e.items, "other", "celebrity")
      ),
      other: {
        label: v.common.roll.modifiers.other,
        value: 0
      },
      ANARCHY: v
    }, i = await Ec(`${ee}/dialog/roll-celebrite-title.hbs`, t), n = {
      id: `roll-celebrity-${foundry.utils.randomID()}`,
      classes: [game.system.anarchy.styles.selectCssClass(), ...Ea.DEFAULT_OPTIONS.classes],
      window: { title: i }
    };
    return new Ea({ roll: t }, n).render({ force: !0 });
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
      await Ea.doRoll(this.roll), await this.close();
    }), i.find('[data-action="cancel"]').on("click", async () => {
      await this.close();
    });
  }
  static async doRoll(e) {
    const t = [
      e.celebrity,
      e.modifiers,
      e.other
    ], i = ue.sumValues(t, (o) => o.value), n = {
      actor: e.actor,
      parameters: t,
      pool: i,
      options: {
        classes: [game.system.anarchy.styles.selectCssClass()]
      },
      ANARCHY: v
    }, r = new Roll(`${i}d6cs>=5`);
    await r.evaluate();
    const s = await Ec(Cb, n);
    await r.toMessage({ flavor: s });
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
O(Ea, "PARTS", {
  body: {
    template: `${ee}/dialog/roll-celebrite.hbs`
  }
});
let so = Ea;
const { renderTemplate: Eb } = foundry.applications.handlebars, Pb = `${ee}/chat/actor-say-word.hbs`;
class Pc extends Nt {
  static get initiative() {
    return Nt.initiative + " + max(@attributes.reflexes.value, @attributes.intelligence.value)";
  }
  hasOwnAnarchy() {
    return this.hasPlayerOwner;
  }
  prepareDerivedData() {
    !this.system.monitors.fatigue && this.system.monitors.stun && (this.system.monitors.fatigue = foundry.utils.duplicate(this.system.monitors.stun)), this.system.monitors.physical.max = this._getMonitorMax(A.actorAttributes.strength), this.system.monitors.fatigue.max = this._getMonitorMax(A.actorAttributes.willpower), super.prepareDerivedData(), this.system.ignoreWounds = pe.sumModifiers(this.items, "other", "ignoreWounds");
  }
  computePhysicalState() {
    var l, c;
    const e = Math.max(0, Number(((l = this.system.monitors.armor) == null ? void 0 : l.max) ?? 0)), t = Math.min(
      e,
      Math.max(0, Number(((c = this.system.monitors.armor) == null ? void 0 : c.value) ?? 0))
    ), i = Math.max(0, e - t), n = Math.max(this.system.monitors.physical.max, this.system.monitors.fatigue.max) + e, r = this.system.monitors.physical.value == this.system.monitors.physical.max, s = this.system.monitors.fatigue.max == this.system.monitors.fatigue.value, o = r || s ? n : Math.max(this.system.monitors.physical.value, this.system.monitors.fatigue.value) + i;
    return {
      max: n,
      value: n - o
    };
  }
  getAttributes() {
    return _a[this.type] ?? _a[A.actorTypes.character];
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
    var n, r;
    const i = (n = this.getWord(e, t)) == null ? void 0 : n.word;
    i && ChatMessage.create({
      speaker: { alias: ((r = this.token) == null ? void 0 : r.name) ?? this.name },
      content: await Eb(
        Pb,
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
    this._mutateWords(e, (n) => n.map((r) => (r.id == t && i(r), r)));
  }
  async deleteWord(e, t) {
    this._mutateWords(e, (i) => i.filter((n) => n.id != t));
  }
  async _mutateWords(e, t = (i) => i) {
    if (!e)
      return;
    let i = t(this.system[e]);
    ue.reindexIds(i), await this.update({ [`system.${e}`]: i });
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
      da.checkSufficient(v.actor.counters.anarchy, e, i + t);
      const n = Math.min(t, e), r = e - n;
      n > 0 && G.addCounter(this, A.monitors.sceneAnarchy, -n), this.hasPlayerOwner ? (await game.system.anarchy.gmAnarchy.actorGivesAnarchyToGM(this, e), G.addCounter(this, A.monitors.anarchy, -r)) : r > 0 && super.spendAnarchy(r);
    }
  }
  canUseEdge() {
    return !0;
  }
  getWounds() {
    const e = ue.divint(this.system.monitors.fatigue.value, 3) + ue.divint(this.system.monitors.physical.value, 3);
    return Math.max(0, e - this.system.ignoreWounds);
  }
  async rollCelebrity() {
    await so.create(this);
  }
}
function Rb(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function Nb(a = {}) {
  return !a || typeof a != "object" || Array.isArray(a) ? {} : Object.fromEntries(
    Object.entries(a).map(([e, t]) => [String(e ?? "").trim(), Rb(t, 0)]).filter(([e, t]) => e && t !== 0)
  );
}
function Rc(a = {}) {
  return {
    default: 0,
    byType: Nb(a == null ? void 0 : a.byType)
  };
}
const Ib = Object.freeze({
  ground: "Ground",
  flight: "Flight",
  jump: "Jump"
});
function tn(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? Math.max(0, Math.trunc(t)) : e;
}
function Db(a = "") {
  return a === A.actorTypes.vehicle || a === A.actorTypes.battlemech;
}
function Ob(a = "") {
  return a === A.actorTypes.battlemech ? ["ground", "flight", "jump"] : a === A.actorTypes.vehicle ? ["ground", "flight"] : [];
}
function gl(a = {}, { actorType: e = "", legacyMoves: t = 0 } = {}) {
  if (!Db(e)) return {};
  const i = a && typeof a == "object" ? a : {}, n = tn(t, 0), r = {
    ground: tn(i.ground ?? i.move ?? i.run, n),
    flight: tn(i.flight ?? i.fly, 0)
  };
  return e === A.actorTypes.battlemech && (r.jump = tn(i.jump, 0)), r;
}
function vm({
  actorType: a = "",
  movement: e = {},
  legacyMoves: t = 0,
  editing: i = !1,
  basePath: n = "system.movement"
} = {}) {
  const r = gl(e, { actorType: a, legacyMoves: t });
  return Ob(a).map((s) => {
    const o = tn(r[s], 0), l = s === "flight";
    return {
      key: s,
      label: Ib[s] ?? s,
      value: o,
      displayValue: String(o),
      path: `${n}.${s}`,
      visible: i || !l || o > 0
    };
  }).filter((s) => s.visible);
}
function Mm({ actorType: a = "", movement: e = {}, legacyMoves: t = 0 } = {}) {
  const i = gl(e, { actorType: a, legacyMoves: t });
  return vm({
    actorType: a,
    movement: i,
    legacyMoves: t,
    editing: !1
  }).map((n) => ({
    label: n.label,
    value: String(n.value)
  }));
}
function Lb() {
  return foundry.data.operators.ForcedDeletion;
}
class Cm extends Nt {
  prepareDerivedData() {
    this._prepareMwdAttributes(), this._prepareMwdDegradation(), this._prepareMwdMovement(), this._prepareMwdMonitors(), this._prepareMwdItems(), super.prepareDerivedData();
  }
  static get defaultIcon() {
    return `${Ir}/default/Default_Vehicle.svg`;
  }
  static get initiative() {
    return Nt.initiative;
  }
  computePhysicalState() {
    return {
      max: this.system.monitors.structure.max,
      value: this.system.monitors.structure.max - this.system.monitors.structure.value
    };
  }
  getAttributes() {
    return _a[this.type] ?? _a[A.actorTypes.vehicle];
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
      "system.handling": Lb(),
      "system.attributes.handling.value": i
    });
  }
  _prepareMwdAttributes() {
    const e = this.system.mwd = this.system.mwd ?? {}, t = {
      [A.actorAttributes.handling]: { value: 0 },
      [A.actorAttributes.system]: { value: 0 },
      [A.actorAttributes.reliability]: { value: 0 },
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
    ), Object.entries(e.attributes).forEach(([n, r]) => {
      var s;
      ((s = i[n]) == null ? void 0 : s.value) === void 0 && (i[n] = i[n] ?? {}, i[n].value = (r == null ? void 0 : r.value) ?? 0);
    });
  }
  _prepareMwdDegradation() {
    On(this.system, this.type);
  }
  _prepareMwdMovement() {
    const e = gl(this.system.movement, {
      actorType: this.type,
      legacyMoves: this.system.moves
    });
    this.system.movement = e, this.system.moves = e.ground ?? Math.max(0, Number(this.system.moves ?? 0) || 0);
  }
  _prepareMwdMonitors() {
    var s, o, l, c, u, d, m, f, p, h;
    const e = this.system.mwd = this.system.mwd ?? {}, t = this.system.monitors = this.system.monitors ?? {}, i = this.type === A.actorTypes.battlemech ? 15 : 12, n = Math.max(0, Number(((s = t.armor) == null ? void 0 : s.max) ?? i));
    t.armor = foundry.utils.mergeObject(
      { value: 0, max: n, resistance: Nt.normalizeResistance((o = t.armor) == null ? void 0 : o.resistance) },
      t.armor ?? {},
      { inplace: !1, recursive: !0 }
    ), t.armor.resistance = Rc(t.armor.resistance);
    const r = {
      value: ((l = t.structure) == null ? void 0 : l.value) ?? 0,
      max: ((c = t.structure) == null ? void 0 : c.max) ?? (this.type === A.actorTypes.battlemech ? 18 : 15),
      resistance: Nt.normalizeResistance((u = t.structure) == null ? void 0 : u.resistance)
    };
    if (t.structure = foundry.utils.mergeObject(
      foundry.utils.duplicate(r),
      t.structure ?? {},
      { inplace: !1, recursive: !0 }
    ), t.structure.resistance = Rc(t.structure.resistance), e.monitors = e.monitors ?? {}, e.monitors.structure = foundry.utils.mergeObject(
      foundry.utils.duplicate(r),
      e.monitors.structure ?? {},
      { inplace: !1, recursive: !0 }
    ), this.type === A.actorTypes.battlemech) {
      const g = {
        value: ((d = t.heat) == null ? void 0 : d.value) ?? ((m = e.heat) == null ? void 0 : m.current) ?? 0,
        max: ((f = t.heat) == null ? void 0 : f.max) ?? ((p = e.heat) == null ? void 0 : p.hardMax) ?? 4,
        resistance: Nt.normalizeResistance((h = t.heat) == null ? void 0 : h.resistance)
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
        this.items.filter((r) => n.includes(r.type))
      ])
    );
  }
}
const Nc = {
  light: 4,
  medium: 5,
  heavy: 6,
  assault: 7
}, _b = { mode: "normal", allowedWeaponIds: [], typeRestriction: "" }, xb = {
  baseProfile: { name: "Unarmed", damage: "", notes: "" },
  maxWeapons: 0,
  allowedLocations: []
};
class $b {
  constructor(e) {
    this.actor = e, this.mwd = e.system.mwd ?? {};
  }
  compute() {
    const e = this.mwd.weightClass ?? "medium", t = Nc[e] ?? Nc.medium, i = this._normalizeHardpoints(), n = this._normalizeWeaponGroups(), r = n.find((y) => y.isPrimary), s = n.filter((y) => y.isPrimary), o = this._primarySlot(), l = [], c = [];
    s.length > 1 && l.push(v.mwd.loadout.errors.multiplePrimary);
    const u = r ? t - 1 : t, d = n.length + (r ? 1 : 0);
    n.length > u && l.push(Re(v.mwd.loadout.errors.mountPointsExceeded, {
      used: d,
      total: t
    }));
    const m = this._getWeapons((y) => (y.system.weaponCategory ?? "ranged") !== "melee"), f = new Map(m.map((y) => [y.id, y])), p = /* @__PURE__ */ new Set(), h = i.map((y) => ({ ...y, occupiedBy: null, occupiedByName: void 0 }));
    for (const y of n)
      for (const b of y.weaponIds ?? []) {
        const S = f.get(b);
        if (!S) {
          c.push(Re(v.mwd.loadout.warnings.weaponMissing, { weapon: b }));
          continue;
        }
        const w = S.system.hardpointType ?? "energy", k = S.system.hardpointSize ?? "small";
        if (p.has(b)) {
          l.push(Re(v.mwd.loadout.errors.weaponAlreadyGrouped, { weapon: S.name }));
          continue;
        }
        if (p.add(b), y.isPrimary && this._validatePrimaryWeapon(S, w, k, o, l), (S.system.weaponCategory ?? "ranged") === "melee")
          continue;
        const P = h.find((E) => !E.occupiedBy && E.type === w && E.size === k);
        P ? (P.occupiedBy = y.id, P.occupiedByName = y.name) : l.push(Re(v.mwd.loadout.errors.hardpointUnavailable, {
          weapon: S.name,
          type: v.mwd.hardpointType[w] ?? w,
          size: v.mwd.hardpointSize[k] ?? k
        }));
      }
    r && (!r.weaponIds || r.weaponIds.length === 0) && l.push(v.mwd.loadout.errors.primaryWithoutWeapon);
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
      name: e.name || Re(v.common.newName, { type: v.itemType.singular.weapon }),
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
    const e = foundry.utils.mergeObject(foundry.utils.duplicate(_b), this.mwd.primarySlot ?? {});
    return e.allowedWeaponIds = this._asArray(e.allowedWeaponIds), e;
  }
  _computeMeleeState(e) {
    var o, l, c;
    const t = foundry.utils.mergeObject(foundry.utils.duplicate(xb), this.mwd.melee ?? {}), i = this._getWeapons((u) => (u.system.weaponCategory ?? "ranged") === "melee"), n = [], r = Number(t.maxWeapons ?? 0);
    i.length > r && e.push(Re(v.mwd.loadout.errors.meleeLimitExceeded, {
      equipped: i.length,
      limit: r
    }));
    const s = this._asArray(t.allowedLocations);
    return n.push({
      name: ((o = t.baseProfile) == null ? void 0 : o.name) || v.mwd.melee.baseProfile,
      damage: ((l = t.baseProfile) == null ? void 0 : l.damage) ?? "",
      notes: ((c = t.baseProfile) == null ? void 0 : c.notes) ?? ""
    }), i.forEach((u) => {
      var d;
      s.length > 0 && u.system.mountLocation && !s.includes(u.system.mountLocation) && e.push(Re(v.mwd.loadout.errors.meleeLocationRestricted, {
        weapon: u.name,
        location: v.mwd.meleeLocation[u.system.mountLocation] ?? u.system.mountLocation
      })), n.push({
        name: u.name,
        damage: u.getDamageCode(),
        notes: ((d = u.system.references) == null ? void 0 : d.description) ?? ""
      });
    }), { profiles: n, limit: r };
  }
  _validatePrimaryWeapon(e, t, i, n, r) {
    var s;
    n.mode === "converted" ? (((s = n.allowedWeaponIds) == null ? void 0 : s.length) > 0 && !n.allowedWeaponIds.includes(e.id) && r.push(Re(v.mwd.loadout.errors.primaryNotAllowedWeapon, { weapon: e.name })), n.typeRestriction && t !== n.typeRestriction && r.push(Re(v.mwd.loadout.errors.primaryTypeRestriction, {
      weapon: e.name,
      type: v.mwd.hardpointType[n.typeRestriction] ?? n.typeRestriction
    }))) : i !== "large" && r.push(Re(v.mwd.loadout.errors.primaryNeedsLarge, { weapon: e.name }));
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
const Ic = Object.freeze({
  safe: "Safe",
  hot: "Hot",
  overheat: "Overheat",
  danger: "Danger",
  runningHot: "Hot",
  overheated: "Overheat",
  shutdown: "Danger"
});
function an(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function kr(a = {}, e = 0) {
  const t = Math.max(0, an(e, 0)), i = Math.max(0, an(a.hot ?? a.runningHot, 2)), n = Math.max(0, an(a.overheat ?? a.overheated, 3)), r = Math.max(0, an(a.danger ?? a.shutdown, t || 4));
  return {
    hot: i,
    overheat: n,
    danger: r,
    runningHot: i,
    overheated: n,
    shutdown: r
  };
}
function oo(a = 0, e = {}, t = 0) {
  const i = Math.max(0, an(a, 0)), n = kr(e, t);
  return i >= n.danger ? "danger" : i >= n.overheat ? "overheat" : i >= n.hot ? "hot" : "safe";
}
function lo(a = "safe") {
  return Ic[String(a ?? "").trim()] ?? Ic.safe;
}
class Bb extends Cm {
  static get defaultIcon() {
    return `${Ir}/vehicles/apc.svg`;
  }
  prepareDerivedData() {
    var e;
    super.prepareDerivedData(), this.system.mwd = this.system.mwd ?? {}, this.system.mwd.chassis = this.system.mwd.chassis ?? "", this.system.mwd.tonnage = this.system.mwd.tonnage ?? 0, this.system.mwd.loadout = new $b(this).compute(), this.system.mwd.weaponGroupDetails = this._prepareConfiguredWeaponGroups(), this.system.mwd.heat = this._prepareHeatTrack(), this.system.mwd.primaryGroupName = ((e = this.system.mwd.weaponGroupDetails.find((t) => t.isPrimary)) == null ? void 0 : e.name) ?? "", this.system.skills = this._prepareSkillMap(), this.system.weaponGroups = this._prepareWeaponGroups(), this.system.meleeProfiles = this._prepareMeleeProfiles(), this.system.quickActions = {
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
    }, r = foundry.utils.mergeObject(n, i, { inplace: !1 });
    r.current = t.value ?? r.current, r.max = t.max ?? r.max, r.thresholds = kr(
      foundry.utils.mergeObject(n.thresholds, i.thresholds ?? {}, { inplace: !1 }),
      r.max
    );
    const s = this._resolveHeatStatus(r.current, r.thresholds, r.max);
    return this.system.mwd.heatStatus = {
      code: s,
      label: v.actor.battlemech.heat.status[s] ?? lo(s)
    }, r;
  }
  _resolveHeatStatus(e, t, i) {
    return oo(e, t, i);
  }
  _prepareConfiguredWeaponGroups() {
    var i;
    const e = ((i = this.system.mwd) == null ? void 0 : i.weaponGroups) ?? [], t = new Map(this.items.map((n) => [n.id, n]));
    return e.map((n, r) => {
      const s = Array.isArray(n.weaponIds) ? n.weaponIds : n.weaponIds ? [n.weaponIds] : [], o = s.map((c) => t.get(c)).filter((c) => (c == null ? void 0 : c.type) === A.itemType.mechWeapon), l = s.filter((c) => !t.has(c));
      return {
        id: n.id ?? `group-${r + 1}`,
        index: r,
        name: n.name || Re(v.common.newName, { type: v.itemType.singular.weapon }),
        weaponIds: s,
        isPrimary: n.isPrimary ?? !1,
        weapons: o,
        missingWeaponIds: l
      };
    });
  }
  _resolveSkill(e) {
    var n;
    const t = this.items.find((r) => r.type === A.itemType.skill && r.system.code === e);
    if (t)
      return t;
    const i = Dt(e);
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
    var r;
    const e = (((r = this.system.mwd) == null ? void 0 : r.weaponGroupDetails) ?? []).map((s) => ({
      ...s,
      weapons: s.weapons ?? []
    })).filter((s) => s.weapons.length > 0);
    if (e.length > 0)
      return e.map((s) => ({
        id: s.id,
        name: s.name,
        weaponIds: s.weapons.map((o) => o.id),
        isPrimary: s.isPrimary ?? !1
      }));
    const t = this.items.filter((s) => s.type === A.itemType.mechWeapon);
    if (t.length === 0)
      return [];
    const i = t.filter((s) => this.hasFavorite(A.itemType.mechWeapon, s.id)), n = [];
    return i.length > 0 && n.push({
      id: "favorite",
      name: v.actor.vehicle.quickActions.primaryWeapons,
      weaponIds: i.map((s) => s.id),
      isPrimary: !0
    }), n.push({
      id: "all",
      name: v.actor.vehicle.quickActions.allWeapons,
      weaponIds: t.map((s) => s.id),
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
    var r;
    const i = ((r = e == null ? void 0 : e.system) == null ? void 0 : r.attribute) ?? this.getPhysicalAgility(), n = foundry.utils.mergeObject(ri.prepareActorRoll(this), {
      mode: gt.rollType.skill,
      skill: e,
      attribute1: i,
      specialization: void 0
    });
    t.quickAction && (n.quickAction = t.quickAction), await ri.create(n);
  }
  async _promptWeaponGroup(e) {
    if (e.length === 1)
      return e[0];
    const t = e.find((r) => r.isPrimary) ?? e[0], i = `<form class="mwd-quick-select">${e.map((r) => `
      <label class="quick-select-option">
        <input type="radio" name="weapon-group" value="${r.id}" ${r.id === t.id ? "checked" : ""}>
        <span>${r.name}${r.isPrimary ? ` (${v.actor.vehicle.quickActions.primaryLabel})` : ""}</span>
      </label>`).join("")}</form>`, n = await Dialog.prompt({
      title: v.actor.vehicle.quickActions.selectWeaponGroup,
      content: i,
      label: v.common.roll.button,
      callback: (r) => r.find('input[name="weapon-group"]:checked').val() ?? t.id
    });
    return e.find((r) => r.id === n) ?? t;
  }
  async _promptMeleeProfile(e) {
    if (e.length === 1)
      return e[0];
    const t = e[0], i = `<form class="mwd-quick-select">${e.map((r) => `
      <label class="quick-select-option">
        <input type="radio" name="melee-profile" value="${r.id}" ${r.id === t.id ? "checked" : ""}>
        <span>${r.name}</span>
      </label>`).join("")}</form>`, n = await Dialog.prompt({
      title: v.actor.vehicle.quickActions.selectMeleeProfile,
      content: i,
      label: v.common.roll.button,
      callback: (r) => r.find('input[name="melee-profile"]:checked').val() ?? t.id
    });
    return e.find((r) => r.id === n) ?? t;
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
const nr = "activeModifiers", yl = [
  { value: "", label: "All Attributes" },
  { value: "reflexes", label: "Reflexes" },
  { value: "strength", label: "Strength" },
  { value: "willpower", label: "Willpower" },
  { value: "charisma", label: "Charisma" },
  { value: "intelligence", label: "Intelligence" },
  { value: "edge", label: "Edge" }
], bl = [
  { value: "", label: "All Intents" },
  { value: "skill", label: "Skill" },
  { value: "attack", label: "Attack" },
  { value: "defense", label: "Defense" },
  { value: "common", label: "Common" },
  { value: "attribute", label: "Attribute" },
  { value: "edge", label: "Edge" },
  { value: "initiative", label: "Initiative" }
];
function Dc(a) {
  const e = String(a ?? "").trim();
  return e === "" ? null : e;
}
function zb(a) {
  return String((a == null ? void 0 : a.intent) ?? "").trim() || null;
}
function Fb(a) {
  var e, t, i;
  return ((e = a == null ? void 0 : a.data) == null ? void 0 : e.attrKey) ?? // skill rolls
  ((i = (t = a == null ? void 0 : a.attack) == null ? void 0 : t.skill) == null ? void 0 : i.attribute) ?? // attack rolls
  null;
}
function Oc(a, e) {
  return a ? e ? a === e : !1 : !0;
}
function Em(a) {
  return {
    id: String((a == null ? void 0 : a.id) ?? ""),
    label: String((a == null ? void 0 : a.label) ?? "").trim(),
    value: Math.trunc(Number((a == null ? void 0 : a.value) ?? 0)) || 0,
    enabled: (a == null ? void 0 : a.enabled) !== !1,
    attributeFilter: Dc(a == null ? void 0 : a.attributeFilter),
    intentFilter: Dc(a == null ? void 0 : a.intentFilter),
    source: (a == null ? void 0 : a.source) === "preset" ? "preset" : "adhoc"
  };
}
class Ub {
  constructor() {
    O(this, "id", "mwd.sceneModifiers");
  }
  collect({ resolved: e } = {}) {
    var s;
    const t = (s = canvas == null ? void 0 : canvas.scene) == null ? void 0 : s.getFlag("mwd", nr);
    if (!Array.isArray(t) || !t.length) return [];
    const i = zb(e), n = Fb(e), r = [];
    for (const o of t) {
      const l = Em(o);
      l.enabled && Oc(l.intentFilter, i) && Oc(l.attributeFilter, n) && r.push({
        id: l.id || `scene:${l.label}`,
        label: l.label,
        value: l.value,
        source: "Scene"
      });
    }
    return r;
  }
}
const jb = `systems/${T}/templates/settings/collection-editor.hbs`, Pm = /* @__PURE__ */ new Map(), ws = /* @__PURE__ */ new Map();
function xt(a = []) {
  const e = Array.isArray(a) ? a.filter(Boolean) : [String(a ?? "").trim()].filter(Boolean), t = new Error(e[0] ?? "Invalid settings data.");
  return t.validationErrors = e, t;
}
function Ha(a) {
  Kb(a), Pm.set(a.id, a), game.settings.register(T, a.settingKey, {
    scope: "world",
    config: !1,
    type: a.settingType ?? Object,
    default: a.defaultData()
  }), game.settings.registerMenu(T, a.menuKey, {
    name: a.menu.name,
    label: a.menu.label,
    hint: a.menu.hint,
    icon: a.menu.icon,
    type: Wb(a.id),
    restricted: a.menu.restricted ?? !0
  });
}
function Hb(a) {
  return Pm.get(a) ?? null;
}
function Kb(a) {
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
function Wb(a) {
  if (ws.has(a))
    return ws.get(a);
  class e extends Rm {
  }
  return O(e, "definitionId", a), ws.set(a, e), e;
}
var ie, Nm, co, rr, sr, wa, uo, nn, Im, Dm, At;
class Rm extends FormApplication {
  constructor(t = {}, i = {}) {
    super(t, i);
    we(this, ie);
    const n = C(this, ie, sr).call(this);
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
      template: jb,
      width: 880,
      height: 760,
      resizable: !0,
      submitOnChange: !1,
      closeOnSubmit: !1
    }, { inplace: !1 });
  }
  get definition() {
    const t = Hb(this.constructor.definitionId);
    if (!t)
      throw new Error(`Missing settings collection definition: ${this.constructor.definitionId}`);
    return t;
  }
  get title() {
    var t;
    return this.definition.title ?? ((t = this.definition.menu) == null ? void 0 : t.name) ?? "Settings Editor";
  }
  getData(t = {}) {
    const i = C(this, ie, Dm).call(this), n = this.editorState.rows.map((r, s, o) => ({
      index: s,
      fields: i.map((l) => C(this, ie, Im).call(this, l, r, s)),
      canMoveUp: s > 0,
      canMoveDown: s < o.length - 1
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
      n.addEventListener("click", (r) => {
        var l;
        const s = r.currentTarget, o = String(((l = s == null ? void 0 : s.dataset) == null ? void 0 : l.action) ?? "").trim();
        o && C(this, ie, Nm).call(this, o, r, s);
      });
    });
  }
  async _onSubmit(t, { updateData: i = null, preventClose: n = !0, preventRender: r = !0 } = {}) {
    return super._onSubmit(t, { updateData: i, preventClose: n, preventRender: r });
  }
  async _updateObject(t, i) {
    var n;
    C(this, ie, At).call(this, []);
    try {
      const r = this.editorState.tab === "bulk" ? this.definition.parseBulk(C(this, ie, nn).call(this)) : this.definition.rowsToValue(C(this, ie, uo).call(this));
      await game.settings.set(T, this.definition.settingKey, r);
      const s = C(this, ie, sr).call(this);
      C(this, ie, rr).call(this, s), await this.close();
    } catch (r) {
      C(this, ie, At).call(this, Wn(r)), this.editorState.errors.length && ((n = ui.notifications) == null || n.error(this.editorState.errors[0])), this.render(!1);
    }
  }
}
ie = new WeakSet(), Nm = async function(t, i, n) {
  var r, s, o, l, c, u, d, m;
  switch (i.preventDefault(), i.stopPropagation(), t) {
    case "switchRows":
      C(this, ie, nn).call(this), this.editorState.tab = "rows", C(this, ie, At).call(this, []), this.render(!1);
      return;
    case "switchBulk":
      C(this, ie, wa).call(this);
      try {
        const f = this.definition.rowsToValue(this.editorState.rows);
        this.editorState.bulkText = this.definition.serializeBulk(f), this.editorState.tab = "bulk", C(this, ie, At).call(this, []);
      } catch (f) {
        C(this, ie, At).call(this, Wn(f)), this.editorState.errors.length && ((r = ui.notifications) == null || r.warn(this.editorState.errors[0]));
      }
      this.render(!1);
      return;
    case "addRow":
      C(this, ie, wa).call(this), this.editorState.rows.push(((o = (s = this.definition).createEmptyRow) == null ? void 0 : o.call(s)) ?? {}), C(this, ie, At).call(this, []), this.render(!1);
      return;
    case "removeRow":
      C(this, ie, wa).call(this), this.editorState.rows.splice(Number(((l = n == null ? void 0 : n.dataset) == null ? void 0 : l.index) ?? -1), 1), C(this, ie, At).call(this, []), this.render(!1);
      return;
    case "moveRowUp":
      C(this, ie, wa).call(this), C(this, ie, co).call(this, Number(((c = n == null ? void 0 : n.dataset) == null ? void 0 : c.index) ?? -1), -1), C(this, ie, At).call(this, []), this.render(!1);
      return;
    case "moveRowDown":
      C(this, ie, wa).call(this), C(this, ie, co).call(this, Number(((u = n == null ? void 0 : n.dataset) == null ? void 0 : u.index) ?? -1), 1), C(this, ie, At).call(this, []), this.render(!1);
      return;
    case "loadBulk":
      try {
        const f = this.definition.parseBulk(C(this, ie, nn).call(this));
        this.editorState.rows = this.definition.toRows(f), this.editorState.bulkText = this.definition.serializeBulk(f), this.editorState.tab = "rows", C(this, ie, At).call(this, []);
      } catch (f) {
        C(this, ie, At).call(this, Wn(f)), this.editorState.errors.length && ((d = ui.notifications) == null || d.warn(this.editorState.errors[0]));
      }
      this.render(!1);
      return;
    case "formatBulk":
      try {
        const f = this.definition.parseBulk(C(this, ie, nn).call(this));
        this.editorState.bulkText = this.definition.serializeBulk(f), C(this, ie, At).call(this, []);
      } catch (f) {
        C(this, ie, At).call(this, Wn(f)), this.editorState.errors.length && ((m = ui.notifications) == null || m.warn(this.editorState.errors[0]));
      }
      this.render(!1);
      return;
    case "resetSetting":
      C(this, ie, rr).call(this, C(this, ie, sr).call(this)), this.render(!1);
      return;
    case "restoreDefaults":
      C(this, ie, rr).call(this, this.definition.defaultData()), this.render(!1);
      return;
    case "cancel":
      await this.close();
      return;
    default:
      return;
  }
}, co = function(t, i) {
  if (!Number.isInteger(t)) return;
  const n = t + i;
  if (t < 0 || n < 0 || n >= this.editorState.rows.length) return;
  const r = [...this.editorState.rows], [s] = r.splice(t, 1);
  r.splice(n, 0, s), this.editorState.rows = r;
}, rr = function(t) {
  this.editorState.rows = this.definition.toRows(t), this.editorState.bulkText = this.definition.serializeBulk(t), this.editorState.tab = "rows", C(this, ie, At).call(this, []);
}, sr = function() {
  const t = game.settings.get(T, this.definition.settingKey);
  return foundry.utils.deepClone(t ?? this.definition.defaultData());
}, wa = function() {
  this.editorState.rows = C(this, ie, uo).call(this);
}, uo = function() {
  const t = foundry.utils.expandObject(this._getSubmitData()), i = (t == null ? void 0 : t.rows) ?? {};
  return Object.keys(i).sort((n, r) => Number(n) - Number(r)).map((n) => {
    const r = i[n] ?? {};
    return Object.fromEntries(
      this.definition.rowSchema.map((s) => [
        s.key,
        String((r == null ? void 0 : r[s.key]) ?? "")
      ])
    );
  });
}, nn = function() {
  var n;
  const t = this.form, i = (n = t == null ? void 0 : t.querySelector) == null ? void 0 : n.call(t, 'textarea[name="bulkText"]');
  return i instanceof HTMLTextAreaElement && (this.editorState.bulkText = i.value), this.editorState.bulkText ?? "";
}, Im = function(t, i, n) {
  const r = t.type ?? "text", s = String((i == null ? void 0 : i[t.key]) ?? t.default ?? ""), o = r === "select" ? Gb(t).map((l) => ({
    value: String(l.value ?? ""),
    label: String(l.label ?? l.value ?? ""),
    selected: String(l.value ?? "") === s
  })) : [];
  return {
    key: t.key,
    label: t.label,
    type: r,
    inputType: r === "select" ? "text" : r,
    name: `rows.${n}.${t.key}`,
    value: s,
    placeholder: t.placeholder ?? "",
    min: t.min ?? "",
    max: t.max ?? "",
    step: t.step ?? "",
    options: o
  };
}, Dm = function() {
  return this.definition.rowSchema.map((t) => ({
    ...t,
    type: t.type ?? "text"
  }));
}, At = function(t = []) {
  this.editorState.errors = Array.isArray(t) ? t.filter(Boolean) : [];
}, O(Rm, "definitionId", "");
function Gb(a) {
  const e = typeof a.options == "function" ? a.options() : a.options;
  return Array.isArray(e) ? e : [];
}
function Wn(a) {
  const e = Array.isArray(a == null ? void 0 : a.validationErrors) ? a.validationErrors.filter(Boolean) : [String((a == null ? void 0 : a.message) ?? "Unable to save settings.").trim()].filter(Boolean);
  return e.length ? e : ["Unable to save settings."];
}
const mo = "sceneModifierTemplates", qb = "sceneModifierTemplateEditor", Vb = Object.freeze([]);
function Ui(a) {
  const e = String(a ?? "").trim();
  return e === "" ? "" : e;
}
function Om(a = []) {
  const e = [], t = [], i = /* @__PURE__ */ new Set();
  if ((Array.isArray(a) ? a : []).forEach((n, r) => {
    const s = String((n == null ? void 0 : n.label) ?? "").trim(), o = String((n == null ? void 0 : n.value) ?? "").trim(), l = `Row ${r + 1}`;
    if (!s) {
      t.push(`${l}: label cannot be blank.`);
      return;
    }
    if (i.has(s.toLowerCase())) {
      t.push(`${l}: duplicate label "${s}".`);
      return;
    }
    i.add(s.toLowerCase());
    const c = Number(o);
    if (!Number.isFinite(c)) {
      t.push(`${l}: value must be a number.`);
      return;
    }
    e.push({
      label: s,
      value: Math.trunc(c),
      attributeFilter: Ui(n == null ? void 0 : n.attributeFilter),
      intentFilter: Ui(n == null ? void 0 : n.intentFilter)
    });
  }), t.length) throw xt(t);
  return e;
}
function Yb(a = []) {
  return (Array.isArray(a) ? a : []).map((e) => ({
    label: String((e == null ? void 0 : e.label) ?? ""),
    value: String((e == null ? void 0 : e.value) ?? "0"),
    attributeFilter: Ui(e == null ? void 0 : e.attributeFilter),
    intentFilter: Ui(e == null ? void 0 : e.intentFilter)
  }));
}
function Qb(a = "") {
  const e = String(a ?? "").trim();
  if (!e) return [];
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    throw xt([
      `Bulk JSON must be valid JSON: ${i.message}`
    ]);
  }
  if (!Array.isArray(t))
    throw xt(["Bulk JSON must be an array."]);
  return Om(t.map((i) => ({
    label: String((i == null ? void 0 : i.label) ?? ""),
    value: String((i == null ? void 0 : i.value) ?? "0"),
    attributeFilter: Ui(i == null ? void 0 : i.attributeFilter),
    intentFilter: Ui(i == null ? void 0 : i.intentFilter)
  })));
}
function Jb(a = []) {
  return JSON.stringify(
    (Array.isArray(a) ? a : []).map((e) => ({
      label: String((e == null ? void 0 : e.label) ?? ""),
      value: Number((e == null ? void 0 : e.value) ?? 0),
      attributeFilter: Ui(e == null ? void 0 : e.attributeFilter),
      intentFilter: Ui(e == null ? void 0 : e.intentFilter)
    })),
    null,
    2
  );
}
const Xb = {
  id: "scene-modifier-templates",
  menuKey: qb,
  settingKey: mo,
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
      options: yl
    },
    {
      key: "intentFilter",
      label: "Intent Filter",
      type: "select",
      options: bl
    }
  ],
  menu: {
    name: "Scene Modifier Templates",
    label: "Configure",
    hint: "Edit the preset scene modifier templates available in the GM Gadget.",
    icon: "fas fa-cloud",
    restricted: !0
  },
  defaultData: () => foundry.utils.deepClone(Vb),
  createEmptyRow: () => ({
    label: "",
    value: "0",
    attributeFilter: "",
    intentFilter: ""
  }),
  toRows: Yb,
  rowsToValue: Om,
  parseBulk: Qb,
  serializeBulk: Jb
};
function Zb() {
  Ha(Xb);
}
const { ApplicationV2: eS, HandlebarsApplicationMixin: tS } = foundry.applications.api, iS = "mwd-gmgadget", Lm = "gmDnPresets", or = "gmNextDn", rn = "gmDnAnnounceToChat", aS = Object.freeze([
  { label: "Standard", dn: 1 },
  { label: "Challenging", dn: 2 },
  { label: "Hard", dn: 3 },
  { label: "Extreme", dn: 4 }
]), nS = "systems/mwd/templates/v2/mwd-gmgadget.hbs", sn = Object.freeze({
  actorId: "",
  mode: "physical",
  delta: 1,
  useArmor: !1,
  damageType: "concussive",
  statusId: "",
  statusActive: !0,
  source: "",
  notes: ""
}), rS = Object.freeze({
  label: "Hazard Zone",
  startExposure: le.minor,
  escalationRate: 1,
  escalationIntervalTurns: 1,
  escalationMax: le.full,
  onFullBurnDelta: 0,
  clearOnExit: !0,
  damage: 6,
  ap: 0,
  damageType: "thermal",
  color: "#d86a2c"
});
function sS(a = "") {
  return String(a ?? "").split(",").map((e) => e.trim()).filter(Boolean).map((e) => {
    const [t, i] = e.split(":").map((s) => (s ?? "").trim()), n = t || "DN", r = Number.isFinite(Number(i)) ? Number(i) : Number(t);
    return {
      label: n,
      dn: Number.isFinite(r) ? Math.max(0, Math.trunc(r)) : null
    };
  }).filter((e) => Number.isFinite(e.dn));
}
function oS(a = []) {
  const e = new Error(a[0] ?? "Invalid GM DN presets.");
  return e.validationErrors = Array.isArray(a) ? a.filter(Boolean) : [], e;
}
function lS() {
  return foundry.utils.deepClone(aS);
}
function _n(a, { strict: e = !1 } = {}) {
  const t = typeof a == "string" ? sS(a) : Array.isArray(a) ? a : [], i = [], n = [], r = /* @__PURE__ */ new Set();
  if (t.forEach((s, o) => {
    const l = String((s == null ? void 0 : s.label) ?? "").trim(), c = s == null ? void 0 : s.dn, u = `Preset ${o + 1}`;
    if (!l) {
      e && n.push(`${u}: label cannot be blank.`);
      return;
    }
    const d = l.toLowerCase();
    if (r.has(d)) {
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
    r.add(d), i.push({
      label: l,
      dn: Math.trunc(m)
    });
  }), e && n.length) throw oS(n);
  return i;
}
function ks(a = {}) {
  return foundry.utils.mergeObject(
    foundry.utils.deepClone(sn),
    a ?? {},
    { inplace: !1, overwrite: !0 }
  );
}
function vs(a = {}) {
  return foundry.utils.mergeObject(
    foundry.utils.deepClone(rS),
    a ?? {},
    { inplace: !1, overwrite: !0 }
  );
}
function _m(a = null) {
  const e = (a == null ? void 0 : a.document) ?? a ?? null, t = Array.from((e == null ? void 0 : e.shapes) ?? []);
  if (t.length !== 1) return t.length > 1 ? "multiple" : "";
  const i = t[0], n = typeof (i == null ? void 0 : i.toObject) == "function" ? i.toObject() : i && typeof i == "object" ? i : null;
  return String((n == null ? void 0 : n.type) ?? "").trim().toLowerCase();
}
function Lc(a = null) {
  return !!_m(a);
}
function _c() {
  var i, n;
  const a = Array.from(((i = canvas == null ? void 0 : canvas.regions) == null ? void 0 : i.controlled) ?? []).map((r) => (r == null ? void 0 : r.document) ?? r ?? null).find(Lc);
  if (a) return a;
  const e = ((n = canvas == null ? void 0 : canvas.regions) == null ? void 0 : n.hover) ?? null, t = (e == null ? void 0 : e.document) ?? e ?? null;
  return Lc(t) ? t : null;
}
function cS(a = null) {
  var o, l;
  const e = (a == null ? void 0 : a.document) ?? a ?? null;
  if (!e)
    return {
      label: "No region selected",
      reason: "Select a Region created in Measured Template Mode on the current scene to turn it into a hazard.",
      supported: !1
    };
  const t = _m(e), i = Iu(e);
  if (!i)
    return {
      label: "Unsupported region",
      reason: t === "multiple" ? "The selected Region has multiple shapes and cannot be converted into a hazard template." : `The selected Region shape "${t || "unknown"}" is not supported for hazard conversion yet.`,
      supported: !1
    };
  const n = String(i.shape ?? "").trim().toLowerCase(), r = (l = (o = canvas == null ? void 0 : canvas.scene) == null ? void 0 : o.grid) != null && l.units ? ` ${canvas.scene.grid.units}` : "";
  return {
    label: n === "rect" ? `RECT ${Number(i.width ?? 0) || 0} x ${Number(i.height ?? 0) || 0}${r}`.trim() : `${n.toUpperCase()} ${Number(i.distance ?? 0) || 0}${r}`.trim(),
    reason: "",
    supported: !0
  };
}
function uS(a) {
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
function dS(a) {
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
function mS(a) {
  return Tt.getStatusOptions(a);
}
function fS(a = "mwd") {
  game.settings.register(a, or, {
    scope: "client",
    config: !1,
    type: Number,
    default: 1
  }), game.settings.register(a, rn, {
    scope: "client",
    config: !0,
    name: "Announce GM DN changes to chat",
    hint: "If enabled, posts a small chat notice when you change the current DN preset.",
    type: Boolean,
    default: !1
  });
}
const et = class et extends tS(eS) {
  constructor({ systemId: e = "mwd", ...t } = {}) {
    super(t), this.systemId = e, this.activeTab = "difficulty", this.harmState = ks(), this.hazardState = vs();
  }
  async render(e = {}) {
    var t;
    return (t = game.user) != null && t.isGM ? super.render(e) : this;
  }
  async _prepareContext(e) {
    var y, b, S, w;
    const t = await super._prepareContext(e), i = _n(
      game.settings.get(this.systemId, Lm),
      { strict: !1 }
    ), n = Number(game.settings.get(this.systemId, or) ?? 1), r = !!game.settings.get(this.systemId, rn), s = ks(this.harmState), o = Tt.getActorOptions({ mode: s.mode }), l = Tt.getSceneTarget({ mode: s.mode }), c = this.harmState.actorId ? ((b = (y = game.actors) == null ? void 0 : y.get) == null ? void 0 : b.call(y, this.harmState.actorId)) ?? null : null, u = Tt.resolveTarget({
      actor: c,
      actorId: this.harmState.actorId,
      preferSceneTarget: !0,
      mode: s.mode
    }), d = mS(u.actor ?? c ?? null);
    d.length && !d.some((k) => k.value === s.statusId) && (s.statusId = d[0].value, this.harmState.statusId = s.statusId);
    const m = xc(
      game.settings.get(this.systemId, mo)
    ), f = $c(
      (S = canvas == null ? void 0 : canvas.scene) == null ? void 0 : S.getFlag("mwd", nr)
    ), p = _c(), h = cS(p), g = vs(this.hazardState);
    return foundry.utils.mergeObject(t, {
      presets: i,
      currentDn: n,
      currentTab: this.activeTab,
      announce: r,
      isGM: ((w = game.user) == null ? void 0 : w.isGM) ?? !1,
      scene: {
        hasScene: !!(canvas != null && canvas.scene),
        templates: m,
        activeModifiers: f,
        attributeFilterOptions: yl,
        intentFilterOptions: bl
      },
      harm: {
        state: s,
        actorOptions: o,
        modes: Tt.MODE_OPTIONS,
        damageTypes: Cc,
        statusOptions: d,
        sceneTarget: uS(l),
        effectiveTarget: dS(u),
        canApply: !!u.actor,
        applyReason: u.reason || "",
        useArmorAvailable: s.mode === "physical" || s.mode === "fatigue",
        showDamageType: (s.mode === "physical" || s.mode === "fatigue") && s.useArmor,
        showStatusFields: s.mode === "status",
        showDeltaFields: s.mode !== "status"
      },
      hazard: {
        state: g,
        template: h,
        exposureTiers: [
          { value: le.minor, label: "Minor" },
          { value: le.major, label: "Major" },
          { value: le.full, label: "Full" }
        ],
        damageTypes: Cc,
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
    var r;
    const t = ((r = e == null ? void 0 : e.closest) == null ? void 0 : r.call(e, ".mwd-gmgadget__root")) ?? this._getRootElement();
    if (!(t instanceof HTMLElement)) return this.harmState;
    const i = (s, o = "") => {
      const l = t.querySelector(s);
      return l instanceof HTMLInputElement || l instanceof HTMLSelectElement || l instanceof HTMLTextAreaElement ? l.value : o;
    }, n = (s, o = !1) => {
      const l = t.querySelector(s);
      return l instanceof HTMLInputElement ? l.checked : o;
    };
    return this.harmState = ks({
      actorId: i('[name="harm-actorId"]', this.harmState.actorId),
      mode: i('[name="harm-mode"]', this.harmState.mode),
      delta: Number(i('[name="harm-delta"]', this.harmState.delta)),
      useArmor: n('[name="harm-useArmor"]', this.harmState.useArmor),
      damageType: i('[name="harm-damageType"]', this.harmState.damageType),
      statusId: i('[name="harm-statusId"]', this.harmState.statusId),
      statusActive: i('[name="harm-statusActive"]', this.harmState.statusActive ? "add" : "remove") !== "remove",
      source: i('[name="harm-source"]', this.harmState.source),
      notes: i('[name="harm-notes"]', this.harmState.notes)
    }), Number.isFinite(Number(this.harmState.delta)) || (this.harmState.delta = sn.delta), this.harmState;
  }
  async _onSetDn(e, t) {
    var r, s, o;
    if (e.preventDefault(), e.stopPropagation(), !((r = game.user) != null && r.isGM)) return;
    const i = Math.max(0, Math.trunc(Number(((s = t == null ? void 0 : t.dataset) == null ? void 0 : s.dn) ?? NaN)));
    if (!Number.isFinite(i)) return;
    if (await game.settings.set(this.systemId, or, i), !!game.settings.get(this.systemId, rn)) {
      const l = String(((o = t == null ? void 0 : t.dataset) == null ? void 0 : o.label) ?? `DN ${i}`);
      await ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ user: game.user }),
        content: `<div class="mwd-gm-notice"><b>GM Difficulty:</b> ${foundry.utils.escapeHTML(l)} (DN ${i} hits)</div>`
      });
    }
    return this.render({ parts: ["body"] });
  }
  async _onSwitchTab(e, t) {
    var n, r, s;
    (n = e == null ? void 0 : e.preventDefault) == null || n.call(e), (r = e == null ? void 0 : e.stopPropagation) == null || r.call(e);
    const i = String(((s = t == null ? void 0 : t.dataset) == null ? void 0 : s.tab) ?? "").trim();
    if (!(!i || i === this.activeTab))
      return this._captureHarmStateFromDom(t), this._captureHazardStateFromDom(t), this.activeTab = i, this.render({ parts: ["body"] });
  }
  async _onClearDn(e, t) {
    var i;
    if (e.preventDefault(), e.stopPropagation(), !!((i = game.user) != null && i.isGM))
      return await game.settings.set(this.systemId, or, 1), this.render({ parts: ["body"] });
  }
  async _onToggleAnnounce(e, t) {
    var n;
    if (e.preventDefault(), e.stopPropagation(), !((n = game.user) != null && n.isGM)) return;
    const i = !game.settings.get(this.systemId, rn);
    return await game.settings.set(this.systemId, rn, i), this.render({ parts: ["body"] });
  }
  async _onHarmInputChange(e, t) {
    var n, r;
    (n = e == null ? void 0 : e.preventDefault) == null || n.call(e), this._captureHarmStateFromDom(t);
    const i = String(((r = t == null ? void 0 : t.dataset) == null ? void 0 : r.harmKey) ?? "").trim();
    if (["actorId", "mode", "useArmor"].includes(i))
      return this.render({ parts: ["body"] });
  }
  async _onRefreshHarmTarget(e, t) {
    var i, n;
    return (i = e == null ? void 0 : e.preventDefault) == null || i.call(e), (n = e == null ? void 0 : e.stopPropagation) == null || n.call(e), this._captureHarmStateFromDom(t), this.render({ parts: ["body"] });
  }
  async _onApplyHarm(e, t) {
    var s, o, l, c, u;
    if ((s = e == null ? void 0 : e.preventDefault) == null || s.call(e), (o = e == null ? void 0 : e.stopPropagation) == null || o.call(e), !((l = game.user) != null && l.isGM)) return;
    const i = this._captureHarmStateFromDom(t), n = this._buildHarmPayload(i);
    if (!n) {
      (c = ui.notifications) == null || c.warn("Choose a valid harm action before applying it.");
      return;
    }
    const r = await Tt.apply({
      payload: n,
      options: {
        actorId: i.actorId,
        preferSceneTarget: !0,
        logToChat: !0
      }
    });
    return r != null && r.ok ? this.render({ parts: ["body"] }) : ((u = ui.notifications) == null || u.warn((r == null ? void 0 : r.reason) ?? "Unable to apply harm."), this.render({ parts: ["body"] }));
  }
  _captureHazardStateFromDom(e = null) {
    var r;
    const t = ((r = e == null ? void 0 : e.closest) == null ? void 0 : r.call(e, ".mwd-gmgadget__root")) ?? this._getRootElement();
    if (!(t instanceof HTMLElement)) return this.hazardState;
    const i = (s, o = "") => {
      const l = t.querySelector(s);
      return l instanceof HTMLInputElement || l instanceof HTMLSelectElement || l instanceof HTMLTextAreaElement ? l.value : o;
    }, n = (s, o = !1) => {
      const l = t.querySelector(s);
      return l instanceof HTMLInputElement ? l.checked : o;
    };
    return this.hazardState = vs({
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
    const i = this._captureHazardStateFromDom(t), n = _c(), r = Iu(n);
    if (!(canvas != null && canvas.scene) || !r) {
      (m = ui.notifications) == null || m.warn("Select a supported Region in Measured Template Mode before creating a hazard.");
      return;
    }
    const s = Ko({
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
    }), o = Lr(r);
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
          [ta]: {
            sourceActorUuid: null,
            sourceItemUuid: null,
            payloadId: "gm-hazard",
            templateGeometry: oi(r),
            damage: Math.max(0, Number(i.damage ?? 0) || 0),
            ap: Math.max(0, Number(i.ap ?? 0) || 0),
            damageType: String(i.damageType ?? "thermal").trim() || "thermal",
            label: `${String(i.label ?? "Hazard Zone").trim() || "Hazard Zone"} (${Ft(s.startExposure)})`,
            areaEffect: {
              kind: "persistent",
              hazard: s
            },
            hazardDef: s
          }
        }
      }
    }]);
    return (h = (p = l == null ? void 0 : l.sheet) == null ? void 0 : p.render) == null || h.call(p, !0), (g = ui.notifications) == null || g.info("Hazard region created from the selected region."), this.render({ parts: ["body"] });
  }
  _buildHarmPayload(e) {
    const t = String((e == null ? void 0 : e.source) ?? "").trim(), i = String((e == null ? void 0 : e.notes) ?? "").trim(), n = String((e == null ? void 0 : e.mode) ?? "").trim();
    if (n === "status") {
      const r = String((e == null ? void 0 : e.statusId) ?? "").trim();
      return r ? {
        mode: "status",
        statusId: r,
        active: !!(e != null && e.statusActive),
        source: t,
        notes: i
      } : null;
    }
    return n === "burn" ? {
      mode: "burnDelta",
      delta: Bc(e == null ? void 0 : e.delta, sn.delta),
      source: t,
      notes: i
    } : n === "physical" || n === "fatigue" ? {
      mode: "trackDelta",
      track: n,
      delta: Bc(e == null ? void 0 : e.delta, sn.delta),
      useArmor: !!(e != null && e.useArmor),
      damageType: (e == null ? void 0 : e.damageType) ?? sn.damageType,
      source: t,
      notes: i
    } : null;
  }
  // ---- Scene modifier actions ----
  async _onAddSceneModifierFromPreset(e, t) {
    var l, c, u, d;
    if ((l = e == null ? void 0 : e.preventDefault) == null || l.call(e), (c = e == null ? void 0 : e.stopPropagation) == null || c.call(e), !((u = game.user) != null && u.isGM)) return;
    const i = ((d = t == null ? void 0 : t.closest) == null ? void 0 : d.call(t, ".mwd-gmgadget__root")) ?? this._getRootElement(), n = i instanceof HTMLElement ? i.querySelector('select[name="scene-preset-index"]') : null, r = n instanceof HTMLSelectElement ? Number(n.value) : NaN, s = xc(
      game.settings.get(this.systemId, mo)
    ), o = Number.isFinite(r) ? s[r] : null;
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
    var n, r, s, o;
    if ((n = e == null ? void 0 : e.preventDefault) == null || n.call(e), (r = e == null ? void 0 : e.stopPropagation) == null || r.call(e), !((s = game.user) != null && s.isGM)) return;
    const i = this._captureAdhocFormFromDom(t);
    if (!i) {
      (o = ui.notifications) == null || o.warn("Label and a numeric value are required.");
      return;
    }
    await this._mutateSceneModifiers((l) => [...l, i]);
  }
  async _onToggleSceneModifier(e, t) {
    var n, r, s, o;
    if ((n = e == null ? void 0 : e.preventDefault) == null || n.call(e), (r = e == null ? void 0 : e.stopPropagation) == null || r.call(e), !((s = game.user) != null && s.isGM)) return;
    const i = String(((o = t == null ? void 0 : t.dataset) == null ? void 0 : o.modId) ?? "").trim();
    i && await this._mutateSceneModifiers(
      (l) => l.map((c) => c.id === i ? { ...c, enabled: !c.enabled } : c)
    );
  }
  async _onRemoveSceneModifier(e, t) {
    var n, r, s, o;
    if ((n = e == null ? void 0 : e.preventDefault) == null || n.call(e), (r = e == null ? void 0 : e.stopPropagation) == null || r.call(e), !((s = game.user) != null && s.isGM)) return;
    const i = String(((o = t == null ? void 0 : t.dataset) == null ? void 0 : o.modId) ?? "").trim();
    i && await this._mutateSceneModifiers((l) => l.filter((c) => c.id !== i));
  }
  async _onClearSceneModifiers(e, t) {
    var i, n, r;
    (i = e == null ? void 0 : e.preventDefault) == null || i.call(e), (n = e == null ? void 0 : e.stopPropagation) == null || n.call(e), (r = game.user) != null && r.isGM && await this._mutateSceneModifiers(() => []);
  }
  async _mutateSceneModifiers(e) {
    const t = canvas == null ? void 0 : canvas.scene;
    if (!t) return;
    const i = $c(t.getFlag("mwd", nr)), n = await e(i);
    return await t.setFlag("mwd", nr, n), this.render({ parts: ["body"] });
  }
  _captureAdhocFormFromDom(e) {
    var c;
    const t = ((c = e == null ? void 0 : e.closest) == null ? void 0 : c.call(e, ".mwd-gmgadget__root")) ?? this._getRootElement();
    if (!(t instanceof HTMLElement)) return null;
    const i = (u) => {
      const d = t.querySelector(u);
      return d instanceof HTMLInputElement || d instanceof HTMLSelectElement ? d.value : "";
    }, n = i('[name="scene-adhoc-label"]').trim(), r = i('[name="scene-adhoc-value"]').trim(), s = i('[name="scene-adhoc-attributeFilter"]').trim() || null, o = i('[name="scene-adhoc-intentFilter"]').trim() || null;
    if (!n) return null;
    const l = Number(r);
    return Number.isFinite(l) ? {
      id: foundry.utils.randomID(),
      label: n,
      value: Math.trunc(l),
      enabled: !0,
      attributeFilter: s,
      intentFilter: o,
      source: "adhoc"
    } : null;
  }
};
O(et, "DEFAULT_OPTIONS", {
  id: iS,
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
    switchTab: et.prototype._onSwitchTab,
    setDn: et.prototype._onSetDn,
    clearDn: et.prototype._onClearDn,
    toggleAnnounce: et.prototype._onToggleAnnounce,
    harmInputChange: et.prototype._onHarmInputChange,
    refreshHarmTarget: et.prototype._onRefreshHarmTarget,
    applyHarm: et.prototype._onApplyHarm,
    hazardInputChange: et.prototype._onHazardInputChange,
    refreshHazardTemplate: et.prototype._onRefreshHazardTemplate,
    createHazard: et.prototype._onCreateHazard,
    addSceneModifierFromPreset: et.prototype._onAddSceneModifierFromPreset,
    addSceneModifierAdhoc: et.prototype._onAddSceneModifierAdhoc,
    toggleSceneModifier: et.prototype._onToggleSceneModifier,
    removeSceneModifier: et.prototype._onRemoveSceneModifier,
    clearSceneModifiers: et.prototype._onClearSceneModifiers
  }
}), O(et, "PARTS", {
  body: { template: nS }
});
let fo = et;
function xc(a) {
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
function $c(a) {
  return Array.isArray(a) ? a.map((e) => {
    var r, s;
    const t = Em(e), i = ((r = yl.find((o) => o.value === (t.attributeFilter ?? ""))) == null ? void 0 : r.label) ?? null, n = ((s = bl.find((o) => o.value === (t.intentFilter ?? ""))) == null ? void 0 : s.label) ?? null;
    return {
      ...t,
      attributeFilterLabel: t.attributeFilter ? i : null,
      intentFilterLabel: t.intentFilter ? n : null,
      signedValue: t.value >= 0 ? `+${t.value}` : String(t.value),
      isPositive: t.value > 0
    };
  }) : [];
}
function Bc(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? Math.trunc(t) : e;
}
let Ms = null;
function pS({ systemId: a = "mwd" } = {}) {
  return Ms || (Ms = new fo({ systemId: a })), Ms;
}
const hS = "gmDnPresetEditor";
function gS(a = []) {
  const e = [], t = [], i = /* @__PURE__ */ new Set();
  if ((Array.isArray(a) ? a : []).forEach((n, r) => {
    const s = String((n == null ? void 0 : n.label) ?? "").trim(), o = String((n == null ? void 0 : n.dn) ?? "").trim(), l = `Row ${r + 1}`;
    if (!s) {
      t.push(`${l}: label cannot be blank.`);
      return;
    }
    if (i.has(s.toLowerCase())) {
      t.push(`${l}: duplicate label "${s}".`);
      return;
    }
    i.add(s.toLowerCase());
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
      label: s,
      dn: Math.trunc(c)
    });
  }), t.length) throw xt(t);
  return _n(e, { strict: !0 });
}
function yS(a = []) {
  return _n(a, { strict: !1 }).map((e) => ({
    label: e.label,
    dn: String(e.dn)
  }));
}
function bS(a = "") {
  const e = String(a ?? "").trim();
  if (!e) return [];
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    throw xt([
      `Bulk JSON must be valid JSON: ${i.message}`
    ]);
  }
  return _n(t, { strict: !0 });
}
function SS(a = []) {
  return JSON.stringify(
    _n(a, { strict: !1 }),
    null,
    2
  );
}
const AS = {
  id: "gm-dn-presets",
  menuKey: hS,
  settingKey: Lm,
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
  defaultData: lS,
  createEmptyRow: () => ({
    label: "",
    dn: "1"
  }),
  toRows: yS,
  rowsToValue: gS,
  parseBulk: bS,
  serializeBulk: SS
};
function TS() {
  Ha(AS);
}
const wS = "lifeModuleCatalogEditor";
function kS(a = []) {
  return fa((Array.isArray(a) ? a : []).map((e) => ({
    id: String((e == null ? void 0 : e.id) ?? ""),
    moduleType: String((e == null ? void 0 : e.moduleType) ?? ""),
    label: String((e == null ? void 0 : e.label) ?? ""),
    grants: String((e == null ? void 0 : e.grants) ?? ""),
    requiresAny: String((e == null ? void 0 : e.requiresAny) ?? ""),
    excludesAny: String((e == null ? void 0 : e.excludesAny) ?? "")
  })), { strict: !0 });
}
function vS(a = []) {
  return fa(a, { strict: !1 }).map((e) => ({
    id: e.id,
    moduleType: e.moduleType,
    label: e.label,
    grants: xg(e.grants),
    requiresAny: e.requiresAny.join(", "),
    excludesAny: e.excludesAny.join(", ")
  }));
}
function MS(a = "") {
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
  return fa(t, { strict: !0 });
}
function CS(a = []) {
  return JSON.stringify(
    fa(a, { strict: !1 }),
    null,
    2
  );
}
const ES = {
  id: "life-module-catalog",
  menuKey: wS,
  settingKey: Na,
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
      options: zd
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
  defaultData: ml,
  createEmptyRow: () => ({
    id: "",
    moduleType: "childhood",
    label: "",
    grants: "",
    requiresAny: "",
    excludesAny: ""
  }),
  toRows: vS,
  rowsToValue: kS,
  parseBulk: MS,
  serializeBulk: CS
};
function PS() {
  Ha(ES);
}
const RS = "personalActionCatalogEditor", zc = Object.freeze([
  { value: "false", label: "No" },
  { value: "true", label: "Yes" }
]);
function NS(a = []) {
  try {
    return Rn((Array.isArray(a) ? a : []).map((e) => ({
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
    throw xt(
      Array.isArray(e.validationErrors) ? e.validationErrors : [e.message]
    );
  }
}
function IS(a = []) {
  return Rn(a, { strict: !1 }).map((e) => {
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
function DS(a = "") {
  const e = String(a ?? "").trim();
  if (!e) return [];
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    throw xt([
      `Bulk JSON must be valid JSON: ${i.message}`
    ]);
  }
  try {
    return Rn(t, { strict: !0 });
  } catch (i) {
    throw xt(
      Array.isArray(i.validationErrors) ? i.validationErrors : [i.message]
    );
  }
}
function OS(a = []) {
  return JSON.stringify(
    Rn(a, { strict: !1 }),
    null,
    2
  );
}
const LS = {
  id: "personal-action-catalog",
  menuKey: RS,
  settingKey: Rd,
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
      options: () => Js
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
      options: () => Nd
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
      options: () => zc
    },
    {
      key: "prominentWhenBurning",
      label: "Burn Highlight",
      type: "select",
      options: () => zc
    }
  ],
  menu: {
    name: "Personal Action Catalog",
    label: "Configure",
    hint: "Edit the personal combat action menus and first-pass action handlers.",
    icon: "fas fa-list-check",
    restricted: !0
  },
  defaultData: ol,
  createEmptyRow: () => {
    var a;
    return {
      id: "",
      label: "",
      category: ((a = Js[0]) == null ? void 0 : a.value) ?? "standard",
      cost: "1",
      handler: "combatAction",
      reason: "",
      rollIntent: "",
      prominent: "false",
      prominentWhenBurning: "false"
    };
  },
  toRows: IS,
  rowsToValue: NS,
  parseBulk: DS,
  serializeBulk: OS
};
function _S() {
  Ha(LS);
}
const xS = "skillSpecializationEditor";
function po() {
  return yr().map((a) => ({
    value: a.code,
    label: a.label
  }));
}
function $S(a = []) {
  const e = new Set(po().map((n) => n.value)), t = {}, i = [];
  if ((Array.isArray(a) ? a : []).forEach((n, r) => {
    const s = String((n == null ? void 0 : n.skillCode) ?? "").trim(), o = String((n == null ? void 0 : n.label) ?? "").trim(), l = `Row ${r + 1}`;
    if (!s) {
      i.push(`${l}: choose a skill.`);
      return;
    }
    if (!e.has(s)) {
      i.push(`${l}: unknown skill code "${s}".`);
      return;
    }
    if (!o) {
      i.push(`${l}: specialization label cannot be blank.`);
      return;
    }
    (t[s] ?? (t[s] = [])).push(o);
  }), i.length) throw xt(i);
  return Br(t, { strict: !0 });
}
function BS(a = {}) {
  const e = Br(a, { strict: !1 });
  return Object.entries(e).flatMap(
    ([t, i]) => i.map((n) => ({ skillCode: t, label: n }))
  );
}
function zS(a = "") {
  const e = String(a ?? "").trim();
  if (!e) return {};
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    throw xt([
      `Bulk JSON must be valid JSON: ${i.message}`
    ]);
  }
  return Br(t, { strict: !0 });
}
function FS(a = {}) {
  return JSON.stringify(
    Br(a, { strict: !1 }),
    null,
    2
  );
}
const US = {
  id: "skill-specializations",
  menuKey: xS,
  settingKey: qs,
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
      options: po
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
  defaultData: ed,
  createEmptyRow: () => {
    var a;
    return {
      skillCode: ((a = po()[0]) == null ? void 0 : a.value) ?? "",
      label: ""
    };
  },
  toRows: BS,
  rowsToValue: $S,
  parseBulk: zS,
  serializeBulk: FS
};
function jS() {
  Ha(US);
}
const HS = "statusConditionCatalogEditor";
function KS(a = []) {
  try {
    return sa((Array.isArray(a) ? a : []).map((e) => ({
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
    throw xt(
      Array.isArray(e.validationErrors) ? e.validationErrors : [e.message]
    );
  }
}
function WS(a = []) {
  return sa(a, { strict: !1 }).map((e) => ({
    id: String(e.id ?? ""),
    label: String(e.label ?? ""),
    actorGroup: String(e.actorGroup ?? "person"),
    category: String(e.category ?? ""),
    tags: Zp(e.tags ?? []),
    icon: String(e.icon ?? ""),
    manual: e.manual ? "true" : "false",
    managed: e.managed ? "true" : "false",
    modifierKey: String(e.modifierKey ?? ""),
    order: String(e.order ?? "0")
  }));
}
function GS(a = "") {
  const e = String(a ?? "").trim();
  if (!e) return [];
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    throw xt([
      `Bulk JSON must be valid JSON: ${i.message}`
    ]);
  }
  try {
    return sa(t, { strict: !0 });
  } catch (i) {
    throw xt(
      Array.isArray(i.validationErrors) ? i.validationErrors : [i.message]
    );
  }
}
function qS(a = []) {
  return JSON.stringify(
    sa(a, { strict: !1 }),
    null,
    2
  );
}
const VS = {
  id: "status-condition-catalog",
  menuKey: HS,
  settingKey: ad,
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
    { key: "actorGroup", label: "Actor Group", type: "select", options: () => Vp },
    { key: "category", label: "Category", type: "text", placeholder: "stability" },
    { key: "tags", label: "Tags", type: "text", placeholder: "movement, piloting" },
    { key: "icon", label: "Icon", type: "text", placeholder: "systems/mwd/img/icons/status/falling.svg" },
    { key: "manual", label: "Manual", type: "select", options: () => jl },
    { key: "managed", label: "Managed", type: "select", options: () => jl },
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
  defaultData: od,
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
  toRows: WS,
  rowsToValue: KS,
  parseBulk: GS,
  serializeBulk: qS
};
function YS() {
  Ha(VS);
}
class QS {
  static register() {
    TS(), PS(), _S(), jS(), Zb(), YS(), game.settings.register(T, "useDestinyMechanics", {
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
    }), game.settings.register(T, um, {
      name: "Machine Critical Table: General",
      hint: "2d6 RollTable UUID that chooses the general type of machine critical problem.",
      scope: "world",
      config: !0,
      type: String,
      default: st.general
    }), game.settings.register(T, dm, {
      name: "Machine Critical Table: BattleMech Head",
      hint: "Location interpretation table for BattleMech head criticals.",
      scope: "world",
      config: !0,
      type: String,
      default: st.mechHead
    }), game.settings.register(T, mm, {
      name: "Machine Critical Table: BattleMech Torso",
      hint: "Location interpretation table for BattleMech torso and forced critical hits.",
      scope: "world",
      config: !0,
      type: String,
      default: st.mechTorso
    }), game.settings.register(T, fm, {
      name: "Machine Critical Table: BattleMech Arms",
      hint: "Location interpretation table for BattleMech arm criticals.",
      scope: "world",
      config: !0,
      type: String,
      default: st.mechArms
    }), game.settings.register(T, pm, {
      name: "Machine Critical Table: BattleMech Legs",
      hint: "Location interpretation table for BattleMech leg criticals.",
      scope: "world",
      config: !0,
      type: String,
      default: st.mechLegs
    }), game.settings.register(T, hm, {
      name: "Machine Critical Table: Vehicle Body",
      hint: "Location interpretation table for vehicle body criticals.",
      scope: "world",
      config: !0,
      type: String,
      default: st.vehicleBody
    }), game.settings.register(T, gm, {
      name: "Machine Critical Table: Vehicle Turret",
      hint: "Location interpretation table for vehicle turret and weapon criticals.",
      scope: "world",
      config: !0,
      type: String,
      default: st.vehicleTurret
    }), game.settings.register(T, ym, {
      name: "Machine Critical Table: Vehicle Mobility",
      hint: "Location interpretation table for vehicle mobility criticals.",
      scope: "world",
      config: !0,
      type: String,
      default: st.vehicleMobility
    });
  }
  static getSystemProperty(e, t) {
    return game.settings.get(T, e) ?? t;
  }
}
class JS extends Error {
  constructor(e, { severity: t = "error" } = {}) {
    super(e), this.name = "UserFacingRollError", this.userFacing = !0, this.severity = t === "warn" ? "warn" : "error";
  }
}
function qi(a, e = {}) {
  return new JS(a, e);
}
function ia(a, e = "Unable to execute roll.") {
  var i, n;
  const t = a != null && a.userFacing && (a == null ? void 0 : a.severity) === "warn" ? "warn" : "error";
  (n = (i = ui.notifications) == null ? void 0 : i[t]) == null || n.call(i, (a == null ? void 0 : a.message) ?? e);
}
const vr = Symbol("SKIP_FIELD");
function xm(a) {
  return a instanceof HTMLInputElement || a instanceof HTMLSelectElement || a instanceof HTMLTextAreaElement;
}
function XS({
  elementKind: a = "input",
  inputType: e = "",
  dtype: t = "",
  value: i = "",
  checked: n = !1
} = {}) {
  const r = String(a ?? "").trim().toLowerCase(), s = String(e ?? "").trim().toLowerCase(), o = String(t ?? "").trim().toLowerCase();
  if (!["input", "select", "textarea"].includes(r))
    return vr;
  if (r === "input") {
    if (s === "radio")
      return n ? i : vr;
    if (s === "checkbox")
      return !!n;
  }
  if (o === "number" || r === "input" && s === "number") {
    const l = Number(i);
    return Number.isFinite(l) ? l : 0;
  }
  return o === "boolean" ? i === !0 || i === "true" : i;
}
function ZS(a) {
  var e;
  return xm(a) ? XS({
    elementKind: a instanceof HTMLSelectElement ? "select" : a instanceof HTMLTextAreaElement ? "textarea" : "input",
    inputType: a instanceof HTMLInputElement ? a.type : "",
    dtype: String(((e = a.dataset) == null ? void 0 : e.dtype) ?? ""),
    value: a.value,
    checked: a instanceof HTMLInputElement ? a.checked : !1
  }) : vr;
}
function eA({
  root: a,
  document: e,
  selector: t = "input[name], select[name], textarea[name]",
  clampByPath: i = null,
  skipNames: n = []
} = {}) {
  if (!(a instanceof HTMLElement)) return {};
  const r = new Set(Array.isArray(n) ? n : [n]), s = {};
  for (const o of a.querySelectorAll(t)) {
    if (!xm(o) || o.closest("prose-mirror") || o.disabled) continue;
    const l = String(o.getAttribute("name") ?? o.name ?? "").trim();
    if (!l || r.has(l)) continue;
    let c = ZS(o);
    c === vr || (typeof i == "function" && (c = i(l, c)), (e ? foundry.utils.getProperty(e, l) : void 0) === c) || (s[l] = c);
  }
  return s;
}
const { HandlebarsApplicationMixin: tA } = foundry.applications.api, { HTMLField: iA } = foundry.data.fields;
function aA(a) {
  const e = new iA({ required: !1, blank: !0, initial: "" });
  return e.name = a, e;
}
var Kt, vn, Ri, Qi, ji, ho, go;
const Ge = class Ge extends tA(foundry.applications.sheets.ActorSheetV2) {
  constructor() {
    super(...arguments);
    we(this, ji);
    we(this, Kt, !1);
    /** Track active CSB tab per group across rerenders */
    we(this, vn, /* @__PURE__ */ new Map());
    // group -> tabId
    we(this, Ri, /* @__PURE__ */ new Map());
    // group -> sectionId|null
    we(this, Qi, null);
  }
  /** @override */
  _updatePosition(t) {
    const i = super._updatePosition(t), {
      MIN_WIDTH: n,
      MAX_WIDTH: r,
      MIN_HEIGHT: s,
      MAX_HEIGHT: o
    } = this.constructor;
    return typeof i.width == "number" && (i.width = Math.min(
      r,
      Math.max(n, i.width)
    )), typeof i.height == "number" && (i.height = Math.min(
      o,
      Math.max(s, i.height)
    )), i;
  }
  // Legacy callers still probe defaultOptions directly, so keep the alias until
  // the remaining compatibility surfaces are gone.
  static get defaultOptions() {
    return this.DEFAULT_OPTIONS;
  }
  /** Editing mode flag for templates */
  get editing() {
    return H(this, Kt);
  }
  toggleEditing() {
    if (this.isEditable) {
      if (H(this, Kt)) {
        this._commitEditsToActor().finally(() => {
          Ee(this, Kt, !H(this, Kt)), this.render({ force: !0 });
        });
        return;
      }
      Ee(this, Kt, !H(this, Kt)), this.render({ force: !0 });
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
      Ee(this, Qi, null);
      return;
    }
    Ee(this, Qi, {
      top: t.scrollTop,
      left: t.scrollLeft
    });
  }
  _restoreScrollPosition() {
    const t = H(this, Qi);
    if (!t) return;
    const i = () => {
      const n = this._getPrimaryScroller();
      n instanceof HTMLElement && (n.scrollTop = t.top, n.scrollLeft = t.left);
    };
    i(), requestAnimationFrame(i), Ee(this, Qi, null);
  }
  /**
   * Resolve the TokenDocument that launched this sheet when one exists.
   * This keeps linked-token behavior aligned with Foundry's token API.
   */
  getSheetTokenDocument() {
    var r, s;
    const t = this.actor ?? this.document ?? null, i = (t == null ? void 0 : t.token) ?? null, n = (r = this.document) != null && r.isToken ? ((s = this.document) == null ? void 0 : s.token) ?? i ?? null : i;
    return n ? (n == null ? void 0 : n.document) ?? n : null;
  }
  /**
   * Resolve the document that should persist actor-backed state.
   * Linked token sheets should write to the base actor document so state survives scene changes.
   */
  getPersistentActor() {
    var n, r, s;
    const t = this.actor ?? this.document ?? null;
    if (!t) return null;
    const i = this.getSheetTokenDocument();
    return i != null && i.isLinked ? i.baseActor ?? ((s = (n = game.actors) == null ? void 0 : n.get) == null ? void 0 : s.call(n, ((r = i == null ? void 0 : i.baseActor) == null ? void 0 : r.id) ?? "")) ?? i.actor ?? t : t;
  }
  /** @override */
  _initializeApplicationOptions(t) {
    var o, l, c, u, d;
    t = super._initializeApplicationOptions(t), t.classes = Array.from(t.classes ?? []);
    const i = (t == null ? void 0 : t.document) ?? this.document, n = (i == null ? void 0 : i.type) ?? ((o = this.actor) == null ? void 0 : o.type);
    n && t.classes.push(String(n));
    const r = ((d = (u = (c = (l = game.system) == null ? void 0 : l.anarchy) == null ? void 0 : c.styles) == null ? void 0 : u.selectCssClass) == null ? void 0 : d.call(u)) ?? "mwd-theme-default", s = ["mwd-theme-default", "mwd-theme-sra"];
    for (let m = t.classes.length - 1; m >= 0; m--)
      s.includes(t.classes[m]) && t.classes.splice(m, 1);
    return t.classes.push(r), t;
  }
  /**
   * No localization: provide a concrete title so Foundry doesn't show "TYPES.Actor.<type>".
   * @override
   */
  get title() {
    var s, o;
    const t = ((s = this.actor) == null ? void 0 : s.type) ?? "actor", n = {
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
    var s, o;
    let t = ((s = super._getHeaderControls) == null ? void 0 : s.call(this)) ?? [];
    const i = ((o = this.document) == null ? void 0 : o.isToken) ?? !1, n = /* @__PURE__ */ new Set();
    i ? (n.add("prototypeToken"), n.add("configurePrototypeToken")) : (n.add("token"), n.add("configureToken")), t = t.filter((l) => {
      const c = (l == null ? void 0 : l.action) ?? "", u = String((l == null ? void 0 : l.label) ?? "");
      return !(n.has(c) || i && u.includes("Prototype") || !i && u === "Token");
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
    const n = ((l = i == null ? void 0 : i.closest) == null ? void 0 : l.call(i, ".csb-tab-link[data-tab]")) ?? ((u = (c = t == null ? void 0 : t.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, ".csb-tab-link[data-tab]"));
    if (!n) return;
    const r = n.dataset.tab, s = n.closest(".csb-tabs");
    if (!s || !r) return;
    const o = s.dataset.group || "default";
    H(this, vn).set(o, r), C(this, ji, ho).call(this, s, r);
  }
  _onClickAccordion(t, i) {
    var u, d, m;
    const n = ((u = i == null ? void 0 : i.closest) == null ? void 0 : u.call(i, ".csb-accordion__trigger[data-section]")) ?? ((m = (d = t == null ? void 0 : t.target) == null ? void 0 : d.closest) == null ? void 0 : m.call(d, ".csb-accordion__trigger[data-section]"));
    if (!n) return;
    const r = n.dataset.section, s = n.closest(".csb-accordion");
    if (!s || !r) return;
    const o = s.dataset.group || "default", c = (H(this, Ri).has(o) ? H(this, Ri).get(o) : s.dataset.default || null) === r ? null : r;
    H(this, Ri).set(o, c), C(this, ji, go).call(this, s, c);
  }
  /**
   * Universal roll action: data-action="roll" + data-roll='{"intent":"skill","key":"gunnery"}'
   */
  async _onRollAction(t, i) {
    var c, u, d, m, f, p, h, g, y;
    (c = t == null ? void 0 : t.preventDefault) == null || c.call(t);
    const n = ((u = i == null ? void 0 : i.closest) == null ? void 0 : u.call(i, "[data-roll]")) ?? ((m = (d = t == null ? void 0 : t.target) == null ? void 0 : d.closest) == null ? void 0 : m.call(d, "[data-roll]")), r = (f = n == null ? void 0 : n.dataset) == null ? void 0 : f.roll;
    if (!r) return;
    let s;
    try {
      s = JSON.parse(r);
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
      return await l.execute({ actor: this.actor, payload: s, event: t, quick: o });
    } catch (b) {
      return console.error("MWD | Failed to execute roll action", b), ia(b, "Unable to execute that roll."), null;
    }
  }
  async _onEditImage(t, i) {
    var s, o, l;
    if ((s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable || !this.editing) return;
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
    var r, s, o, l, c, u, d, m, f, p, h;
    const n = String(
      ((r = t == null ? void 0 : t.dataset) == null ? void 0 : r.itemId) ?? ((l = (o = (s = t == null ? void 0 : t.closest) == null ? void 0 : s.call(t, "[data-item-id]")) == null ? void 0 : o.dataset) == null ? void 0 : l.itemId) ?? ((m = (d = (u = (c = i == null ? void 0 : i.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, "[data-item-id]")) == null ? void 0 : d.dataset) == null ? void 0 : m.itemId) ?? ""
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
    }[i] ?? i.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (r) => r.toUpperCase());
  }
  async _onCreateOwnedItem(t, i) {
    var o, l, c;
    if ((o = t == null ? void 0 : t.preventDefault) == null || o.call(t), (l = t == null ? void 0 : t.stopPropagation) == null || l.call(t), !this.isEditable) return;
    const n = String(((c = i == null ? void 0 : i.dataset) == null ? void 0 : c.itemType) ?? "").trim();
    if (!n) return;
    const r = this.getPersistentActor() ?? this.actor, s = r.items.filter((u) => (u.canonicalType ?? u.type) === n).length;
    await r.createEmbeddedDocuments("Item", [{
      name: `${this._getItemTypeLabel(n)} ${s + 1}`,
      type: n
    }]), this.render({ force: !0 });
  }
  async _onEditOwnedItem(t, i) {
    var r, s, o;
    (r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (s = t == null ? void 0 : t.stopPropagation) == null || s.call(t);
    const n = this._getOwnedItemFromTarget(i, t);
    (o = n == null ? void 0 : n.sheet) == null || o.render(!0);
  }
  async _onDeleteOwnedItem(t, i) {
    var s, o;
    if ((s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const n = this._getOwnedItemFromTarget(i, t);
    if (!n) return;
    await (this.getPersistentActor() ?? this.actor).deleteEmbeddedDocuments("Item", [n.id]), this.render({ force: !0 });
  }
  async _onToggleOwnedItemEquipped(t, i) {
    var s, o, l, c;
    if ((s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const n = this._getOwnedItemFromTarget(i, t);
    if (!n) return;
    const r = this.getPersistentActor() ?? this.actor;
    await ((c = r.setOwnedItemEquipped) == null ? void 0 : c.call(r, n.id, !((l = n.system) != null && l.equipped))), this.render({ force: !0 });
  }
  async _onSetOwnedItemPrimary(t, i) {
    var s, o, l, c;
    if ((s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const n = this._getOwnedItemFromTarget(i, t);
    if (!n) return;
    const r = this.getPersistentActor() ?? this.actor;
    await ((c = r.setOwnedItemPrimary) == null ? void 0 : c.call(r, n.id, !((l = n.system) != null && l.isPrimary))), this.render({ force: !0 });
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
    var r, s, o;
    (r = super._onRender) == null || r.call(this, t, i);
    const n = this._getRootElement();
    if (n) {
      for (const l of n.querySelectorAll(".csb-tabs")) {
        const c = l.dataset.group || "default", u = H(this, vn).get(c), d = l.dataset.default || ((s = l.querySelector(".csb-tab-link[data-tab]")) == null ? void 0 : s.dataset.tab), m = u || d;
        m && C(this, ji, ho).call(this, l, m);
      }
      for (const l of n.querySelectorAll(".csb-accordion")) {
        const c = l.dataset.group || "default", u = H(this, Ri).has(c) ? H(this, Ri).get(c) : l.dataset.default || null;
        C(this, ji, go).call(this, l, u);
      }
      n.querySelectorAll(".csb-tabs").length && !n.querySelector(".csb-tab-panel.is-active") && console.warn(`${Me} CSB tabs present but no active tab applied. Check element root resolution and CSS .is-active selectors.`, {
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
      } catch (r) {
        console.warn("MWD | Rich text history update failed:", r);
      }
  }
  async _commitEditsToActor() {
    var n;
    const t = this.element;
    if (!t) return;
    const i = eA({
      root: t,
      document: this.actor,
      selector: 'input[name][data-edit-field="staged"], select[name][data-edit-field="staged"], textarea[name][data-edit-field="staged"]',
      clampByPath: this._clampByPath.bind(this),
      skipNames: ["system.biography.history"]
    });
    if (["vehicle", "battlemech"].includes((n = this.actor) == null ? void 0 : n.type) && i["system.movement.ground"] !== void 0 && (i["system.moves"] = i["system.movement.ground"]), !!Object.keys(i).length)
      try {
        await (this.getPersistentActor() ?? this.actor).update(i);
      } catch (r) {
        console.warn("MWD | Commit failed (permissions or validation):", r);
      }
  }
  /** @override */
  async _prepareContext(t) {
    var s, o, l, c, u, d, m, f, p, h, g;
    console.log(`${Me}BaseActorSheetV2._prepareContext:start`, {
      actorName: (s = this.actor) == null ? void 0 : s.name,
      actorType: (o = this.actor) == null ? void 0 : o.type
    });
    const i = await super._prepareContext(t), n = foundry.utils.deepClone((i == null ? void 0 : i.options) ?? {});
    n.classes = Array.from(((l = this.options) == null ? void 0 : l.classes) ?? []), n.cssClass = n.classes.join(" ");
    const r = foundry.utils.mergeObject(
      i,
      {
        actor: this.actor,
        system: (c = this.actor) == null ? void 0 : c.system,
        editable: this.isEditable,
        owner: ((u = this.document) == null ? void 0 : u.isOwner) ?? !1,
        limited: !(((d = this.document) == null ? void 0 : d.isOwner) ?? !1),
        editing: H(this, Kt),
        data: this.actor,
        options: n,
        cssClass: n.cssClass
      },
      { inplace: !1 }
    );
    return r.options.owner = r.owner, r.options.limited = r.limited, r.options.editable = r.editable, r.options.editing = r.editing, r.options.viewMode = !r.editing, r.skillsDisplay = id(((m = this.actor) == null ? void 0 : m.system) ?? {}), r.bio = {
      ...r.bio ?? {},
      fields: {
        history: aA("system.biography.history")
      }
    }, r.items ?? (r.items = {}), (f = this.actor) != null && f.items && typeof (ue == null ? void 0 : ue.classifyInto) == "function" && (ue.classifyInto(r.items, this.actor.items), r.items.weapon = [
      ...r.items.mechWeapon ?? [],
      ...r.items.personalWeapon ?? []
    ]), r.npcItems = {
      traits: r.items.quality ?? [],
      weapons: r.items.weapon ?? [],
      assetModules: r.items.assetModule ?? [],
      // Legacy partials still read npcItems.inventory, so fold consumables into
      // that alias until every remaining actor surface reads explicit buckets.
      inventory: [
        ...r.items.gear ?? [],
        ...r.items.consumable ?? []
      ]
    }, console.log(`${Me}BaseActorSheetV2._prepareContext:done`, {
      actorType: (p = this.actor) == null ? void 0 : p.type,
      cssClass: r.cssClass,
      itemCount: ((g = (h = this.actor) == null ? void 0 : h.items) == null ? void 0 : g.size) ?? 0,
      editing: H(this, Kt)
    }), r;
  }
  /** Clamp certain actor system paths to valid ranges */
  _clampByPath(t, i) {
    return typeof i != "number" ? i : ((/^system\.skills\.[^.]+\.rating$/.test(t) || /^system\.attributes\.[^.]+\.value$/.test(t)) && (i = Math.trunc(i)), /^system\.skills\.[^.]+\.rating$/.test(t) ? Math.clamp(i, 0, 12) : /^system\.attributes\.[^.]+\.value$/.test(t) ? Math.clamp(i, 0, 10) : t === "system.speed" || /^system\.movement\.(ground|flight|jump)$/.test(t) ? Math.max(0, Math.trunc(i)) : i);
  }
  /** Action handler: Condition Monitor set */
  async _onMonitorSet(t, i) {
    var p, h, g, y, b, S;
    if (t.preventDefault(), (p = t.stopPropagation) == null || p.call(t), !this.isEditable) return;
    const n = ((h = i == null ? void 0 : i.closest) == null ? void 0 : h.call(i, "[data-action='monitorSet']")) ?? ((y = (g = t == null ? void 0 : t.target) == null ? void 0 : g.closest) == null ? void 0 : y.call(g, "[data-action='monitorSet']")) ?? i, r = String(((b = n == null ? void 0 : n.dataset) == null ? void 0 : b.monitor) ?? "").trim(), s = Number((S = n == null ? void 0 : n.dataset) == null ? void 0 : S.value);
    if (!r || !Number.isFinite(s)) return;
    this._captureScrollPosition();
    const o = r === "burn" ? "system.burn.value" : `system.monitors.${r}.value`, l = Number(foundry.utils.getProperty(this.actor, o) ?? 0), c = r === "armor" ? s : l === s ? 0 : s, u = this.getPersistentActor() ?? this.actor;
    if (typeof (u == null ? void 0 : u.setMonitorValue) == "function")
      return u.setMonitorValue(r, c, { source: "sheet" });
    const d = `system.monitors.${r}`, m = Number(foundry.utils.getProperty(u, `${d}.max`)) || 0, f = Math.min(Math.max(0, c), Math.max(0, m));
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
Kt = new WeakMap(), vn = new WeakMap(), Ri = new WeakMap(), Qi = new WeakMap(), ji = new WeakSet(), /**
 * Apply active-state classes within a single .csb-tabs root.
 * Idempotent: safe to call every render.
 */
ho = function(t, i) {
  t.querySelectorAll(".csb-tab-link").forEach((n) => {
    n.classList.toggle("is-active", n.dataset.tab === i);
  }), t.querySelectorAll(".csb-tab-panel").forEach((n) => {
    n.classList.toggle("is-active", n.dataset.tab === i);
  });
}, go = function(t, i) {
  t.dataset.activeSection = i ?? "", t.querySelectorAll(".csb-accordion__section").forEach((n) => {
    const r = n.dataset.section === i;
    n.classList.toggle("is-active", r);
  }), t.querySelectorAll(".csb-accordion__trigger").forEach((n) => {
    const r = n.dataset.section === i;
    n.classList.toggle("is-active", r), n.setAttribute("aria-expanded", r ? "true" : "false");
  }), t.querySelectorAll(".csb-accordion__panel").forEach((n) => {
    const r = n.closest(".csb-accordion__section"), s = (r == null ? void 0 : r.dataset.section) === i;
    n.classList.toggle("is-active", s);
  });
}, // Shared size bounds keep the V2 actor sheets visually consistent while still
// allowing each subclass to request a slightly different preferred size.
O(Ge, "MIN_WIDTH", 800), O(Ge, "MAX_WIDTH", 950), O(Ge, "MIN_HEIGHT", 600), O(Ge, "MAX_HEIGHT", 1400), /** @override */
O(Ge, "DEFAULT_OPTIONS", foundry.utils.mergeObject(Xt(Ge, Ge, "DEFAULT_OPTIONS"), {
  classes: ["sheet", "actor", T, "appv2", "mwd-sheet", "mwd-character-sheet"],
  position: { width: 760, height: 760 },
  window: { resizable: !0, minimizable: !0 },
  actions: {
    toggleViewMode: Ge.prototype._onToggleViewMode,
    tab: Ge.prototype._onClickTab,
    accordion: Ge.prototype._onClickAccordion,
    roll: Ge.prototype._onRollAction,
    monitorSet: Ge.prototype._onMonitorSet,
    editImage: Ge.prototype._onEditImage,
    createOwnedItem: Ge.prototype._onCreateOwnedItem,
    editOwnedItem: Ge.prototype._onEditOwnedItem,
    deleteOwnedItem: Ge.prototype._onDeleteOwnedItem,
    toggleOwnedItemEquipped: Ge.prototype._onToggleOwnedItemEquipped,
    setOwnedItemPrimary: Ge.prototype._onSetOwnedItemPrimary
  }
}, { inplace: !1 }));
let Tn = Ge;
function nA(a = {}) {
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
function rA(a) {
  return Array.isArray(a) ? a : typeof a == "string" ? a.split(/\s+/).filter(Boolean) : [];
}
function lr(a) {
  if (!a || typeof a != "object") return a;
  const e = {
    ...a,
    template: a.template ?? nA(a),
    classes: rA(a.classes),
    children: Array.isArray(a.children) ? a.children.map(lr) : []
  };
  return a.type === "tabs" && (e.tabs = Array.isArray(a.tabs) ? a.tabs.map((t) => ({
    ...t,
    children: Array.isArray(t.children) ? t.children.map(lr) : []
  })) : []), a.type === "accordion" && (e.sections = Array.isArray(a.sections) ? a.sections.map((t) => ({
    ...t,
    children: Array.isArray(t.children) ? t.children.map(lr) : []
  })) : []), e;
}
function Fc(a = {}) {
  return {
    ...a,
    root: lr(a.root ?? { type: "stack", children: [] })
  };
}
var Ni, Nr, $m;
class ua {
  static async get(e) {
    if (H(this, Ni).has(e)) {
      const n = await H(this, Ni).get(e);
      if (Number((n == null ? void 0 : n.version) ?? 0) > 0) return n;
      H(this, Ni).delete(e);
    }
    const t = C(this, Nr, $m).call(this, e);
    H(this, Ni).set(e, t);
    const i = await t;
    return Number((i == null ? void 0 : i.version) ?? 0) <= 0 && H(this, Ni).delete(e), i;
  }
}
Ni = new WeakMap(), Nr = new WeakSet(), $m = async function(e) {
  const t = `systems/${T}/templates/v2/layouts/${e}.layout.json`;
  try {
    const i = await fetch(t);
    if (!i.ok) throw new Error(`HTTP ${i.status} for ${t}`);
    return Fc(await i.json());
  } catch (i) {
    return console.error(`${Me}LayoutRegistry.get FAILED`, { layoutId: e, url: t, error: i }), Fc({
      id: e,
      version: 0,
      root: { type: "stack", children: [] }
    });
  }
}, we(ua, Nr), we(ua, Ni, /* @__PURE__ */ new Map());
function wn(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function Sl(a, e, t) {
  return Math.min(t, Math.max(e, a));
}
function Uc(a = "") {
  return String(a ?? "").replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim().replace(/\b\w/g, (e) => e.toUpperCase());
}
function sA(a = 0) {
  const e = Sl(wn(a, 0), 0, 100);
  return e >= 91 ? "green" : e >= 71 ? "yellow" : e >= 51 ? "orange" : e >= 31 ? "red" : "dark-red";
}
function jc(a, e = {}) {
  const t = Math.max(0, wn(e == null ? void 0 : e.max, 0)), i = Sl(wn(e == null ? void 0 : e.value, 0), 0, t), n = Math.max(0, t - i), r = t > 0 ? n / t * 100 : 0;
  return {
    label: a,
    value: String(n),
    tone: sA(r),
    remaining: n,
    max: t,
    percent: r,
    title: `${n}/${t}`
  };
}
function oA({ armor: a = {}, structure: e = {} } = {}) {
  const t = [
    jc("A", a),
    jc("S", e)
  ];
  return {
    parts: t,
    title: `Armor ${t[0].title}; Structure ${t[1].title}`
  };
}
function yo({
  id: a = "",
  label: e = "",
  kind: t = "wound",
  monitor: i = {},
  editable: n = !1
} = {}) {
  const r = Math.max(0, wn(i == null ? void 0 : i.max, 0)), s = Sl(wn(i == null ? void 0 : i.value, 0), 0, r), o = Math.max(0, r - s);
  return {
    id: a,
    label: e,
    kind: t,
    editable: !!n,
    value: o,
    max: r,
    segments: Array.from({ length: r }, (l, c) => {
      const u = c + 1;
      return {
        value: Math.max(0, r - u),
        filled: u <= o
      };
    })
  };
}
function lA(a = {}) {
  const e = String((a == null ? void 0 : a.label) ?? Uc((a == null ? void 0 : a.key) ?? "Critical")).trim() || "Critical", t = String((a == null ? void 0 : a.locationLabel) ?? Uc((a == null ? void 0 : a.locationKey) ?? "")).trim();
  return t ? `${e} (${t})` : e;
}
function Bm(a = []) {
  const e = Array.isArray(a) ? a.filter((i) => i && i.active !== !1) : [], t = e.length;
  return {
    value: t === 0 ? "CLEAR" : t === 1 ? "1 CRIT" : `${t} CRITS`,
    title: e.map(lA).join("; "),
    count: t
  };
}
function es(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function cA(a = {}) {
  var i, n, r, s;
  const e = Array.isArray((i = a == null ? void 0 : a.attack) == null ? void 0 : i.targets) ? a.attack.targets : [], t = Ti(((n = a == null ? void 0 : a.attack) == null ? void 0 : n.areaEffect) ?? ((s = (r = a == null ? void 0 : a.attack) == null ? void 0 : r.payload) == null ? void 0 : s.areaEffect) ?? {});
  if (!e.length && t.kind !== It.persistent)
    throw new Error("Attack requires at least one target.");
  return e;
}
async function zm(a = {}) {
  if (!(a != null && a.actorUuid)) return null;
  try {
    return await fromUuid(a.actorUuid);
  } catch (e) {
    return console.warn("MWD | Unable to resolve attack target actor for CQ", a, e), null;
  }
}
function uA(a = {}, e = null, t = "") {
  var i, n, r, s, o;
  return Math.max(0, es(
    ((i = a == null ? void 0 : a.attributes) == null ? void 0 : i[t]) ?? ((n = e == null ? void 0 : e.getAttributeValue) == null ? void 0 : n.call(e, t)) ?? ((o = (s = (r = e == null ? void 0 : e.system) == null ? void 0 : r.attributes) == null ? void 0 : s[t]) == null ? void 0 : o.value),
    0
  ));
}
function dA(a = {}, e = null, t = "") {
  var i, n, r, s, o, l;
  return Math.max(0, es(
    ((n = (i = a == null ? void 0 : a.skills) == null ? void 0 : i[t]) == null ? void 0 : n.rating) ?? ((r = e == null ? void 0 : e.getSkillRating) == null ? void 0 : r.call(e, t)) ?? ((l = (o = (s = e == null ? void 0 : e.system) == null ? void 0 : s.skills) == null ? void 0 : o[t]) == null ? void 0 : l.rating),
    0
  ));
}
function Hc(a = []) {
  return a.reduce((e, t) => e + es(t == null ? void 0 : t.value, 0), 0);
}
async function mA({ attacker: a = null, ctx: e = {}, target: t = {} } = {}) {
  var x, K, q, j, W, _, F, V, Y, te, he, ce, X, Ne, Le, _e, Ue, We, ot, Ye, lt, it;
  const i = await zm(t), n = Math.max(0, Number(((j = (K = (x = e == null ? void 0 : e.attack) == null ? void 0 : x.weapon) == null ? void 0 : K.attackRatingBand) == null ? void 0 : j[(q = e == null ? void 0 : e.attack) == null ? void 0 : q.rangeBand]) ?? 0) || 0), r = Zr(i), s = r ? A.actorAttributes.handling : "reflexes", o = uA(t, i, s), l = o + o, c = String(((_ = (W = e == null ? void 0 : e.attack) == null ? void 0 : W.skill) == null ? void 0 : _.code) ?? ((V = (F = e == null ? void 0 : e.attack) == null ? void 0 : F.weapon) == null ? void 0 : V.skill) ?? "").trim(), u = String(((te = (Y = e == null ? void 0 : e.attack) == null ? void 0 : Y.skill) == null ? void 0 : te.label) ?? c ?? "Attack Skill").trim() || "Attack Skill", d = c ? Math.max(0, es(((he = a == null ? void 0 : a.getSkillRating) == null ? void 0 : he.call(a, c)) ?? ((Ne = (X = (ce = a == null ? void 0 : a.system) == null ? void 0 : ce.skills) == null ? void 0 : X[c]) == null ? void 0 : Ne.rating), 0)) : 0, m = r ? "piloting" : "tactics", f = r ? "Piloting" : "Tactics", p = dA(t, i, m), h = d - p, g = Math.abs(h), y = Math.max(0, Number(((Le = t == null ? void 0 : t.activeArmor) == null ? void 0 : Le.defenseBonus) ?? 0) || 0), b = String(((_e = e == null ? void 0 : e.attack) == null ? void 0 : _e.rangeBand) ?? "").trim() || "range", w = [{
    id: "weapon.attackRating",
    label: `Weapon AR (${((We = (Ue = e == null ? void 0 : e.attack) == null ? void 0 : Ue.weapon) == null ? void 0 : We.type) === "personalWeapon" || (Ye = (ot = e == null ? void 0 : e.attack) == null ? void 0 : ot.weapon) != null && Ye.isSynthetic ? Gr(b) : b})`,
    value: n
  }], k = [{
    id: r ? "target.handlingDefense" : "target.reflexesDefense",
    label: r ? "Target Handling + Handling" : "Target REF + REF",
    value: l
  }];
  h > 0 ? w.push({
    id: "skill.attackVsTactics",
    label: `${u} over Tactics`,
    value: g
  }) : h < 0 && k.push({
    id: "target.tacticsAdvantage",
    label: `${f} over ${u}`,
    value: g
  }), (it = (lt = e == null ? void 0 : e.attack) == null ? void 0 : lt.aim) != null && it.eligible && w.push({
    id: "state.aim",
    label: `Aim (${u})`,
    value: d
  }), k.push({
    id: "target.armorDefense",
    label: "Armor Defense",
    value: y
  });
  const P = Hc(w), E = Hc(k);
  return {
    ar: {
      parts: w,
      total: P
    },
    dr: {
      parts: k,
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
function fA(a = {}, e = {}) {
  var p, h, g, y, b, S, w, k;
  const t = (a == null ? void 0 : a.attack) ?? {}, i = String(((h = (p = t == null ? void 0 : t.payload) == null ? void 0 : p.modifies) == null ? void 0 : h.damageType) ?? "").trim(), n = Math.max(0, Number(((g = t == null ? void 0 : t.weapon) == null ? void 0 : g.damage) ?? 0) || 0), r = !!(a != null && a.targetIsMachine), s = i || ((y = t == null ? void 0 : t.weapon) == null ? void 0 : y.damageType), o = r ? String(s ?? "kinetic").trim() || "kinetic" : Yt(s, "concussive"), l = Math.max(0, Number((t == null ? void 0 : t.totalAp) ?? ((b = t == null ? void 0 : t.weapon) == null ? void 0 : b.ap) ?? 0) || 0), c = e.outcome === "graze" ? n / 2 : e.outcome === "hit" ? n : 0, u = c + Number(e.netHits ?? 0), d = Go((t == null ? void 0 : t.currentExposure) ?? zi({
    tier: ((S = t == null ? void 0 : t.currentExposure) == null ? void 0 : S.initialTier) ?? ((w = t == null ? void 0 : t.currentExposure) == null ? void 0 : w.tier) ?? "none"
  }), {
    active: !!(t != null && t.evadeActive),
    locked: !!(t != null && t.evadeLocked)
  }), m = Ti((t == null ? void 0 : t.areaEffect) ?? ((k = t == null ? void 0 : t.payload) == null ? void 0 : k.areaEffect) ?? {}), f = m.kind === It.persistent ? u : aa(u, d.finalTier);
  return {
    baseDamage: n,
    effectiveWeaponDamage: c,
    netHits: Number(e.netHits ?? 0),
    attackQuality: e.outcome === "graze" ? "graze" : e.outcome === "hit" && Number(e.netHits ?? 0) >= 4 ? "highMargin" : e.outcome === "hit" ? "hit" : "",
    incoming: u,
    scaledIncoming: f,
    ap: l,
    damageType: o,
    damageTypeLabel: r ? o : Qt(o),
    exposure: d,
    areaEffect: m
  };
}
function pA(a = {}) {
  return String((a == null ? void 0 : a.tokenUuid) ?? (a == null ? void 0 : a.actorUuid) ?? (a == null ? void 0 : a.tokenId) ?? (a == null ? void 0 : a.actorId) ?? (a == null ? void 0 : a.name) ?? foundry.utils.randomID()).trim();
}
function Kc(a, e) {
  var r, s;
  const t = ((s = (r = a == null ? void 0 : a.system) == null ? void 0 : r.monitors) == null ? void 0 : s[e]) ?? {}, i = Math.max(0, Number(t.max ?? 0) || 0), n = Math.min(i, Math.max(0, Number(t.value ?? 0) || 0));
  return Math.max(0, i - n);
}
function Wc({ attacker: a, ctx: e, damage: t, targetActor: i = null, hitLocation: n = null } = {}) {
  var r, s, o, l, c, u, d, m, f, p, h;
  return Zr(i) ? {
    mode: "machineAttackDamage",
    damage: (t == null ? void 0 : t.scaledIncoming) ?? 0,
    attackQuality: (t == null ? void 0 : t.attackQuality) ?? "",
    outcome: (t == null ? void 0 : t.attackQuality) === "highMargin" ? "hit" : (t == null ? void 0 : t.attackQuality) ?? "",
    netHits: (t == null ? void 0 : t.netHits) ?? 0,
    damageType: t == null ? void 0 : t.damageType,
    ap: (t == null ? void 0 : t.ap) ?? 0,
    hitLocation: n,
    chaosCriticalSelected: !1,
    reliabilitySpendSelections: [],
    source: `${(a == null ? void 0 : a.name) ?? "Attacker"}: ${((s = (r = e == null ? void 0 : e.attack) == null ? void 0 : r.weapon) == null ? void 0 : s.name) ?? "Attack"}`,
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
    notes: (h = t == null ? void 0 : t.exposure) != null && h.initialTier ? `Exposure ${Ft(t.exposure.initialTier)}${t.exposure.evadeUsed ? ` -> ${Ft(t.exposure.finalTier)}` : ""}` : ""
  };
}
function Yi(a, e = {}, t = {}, { queued: i = !1, applied: n = !1, skipped: r = !1, reason: s = "" } = {}) {
  return r ? {
    ok: !0,
    skipped: !0,
    queued: !1,
    applied: !1,
    reason: s || "Missed target."
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
    degradation: a.degradation ?? null,
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
    reason: (a == null ? void 0 : a.reason) ?? s ?? "Unable to preview attack damage."
  };
}
async function hA({ attacker: a, ctx: e, target: t, outcome: i, damage: n } = {}) {
  var d, m;
  if ((i == null ? void 0 : i.outcome) === "miss")
    return Yi(null, t, n, { skipped: !0, reason: "Missed target." });
  if (((d = n == null ? void 0 : n.areaEffect) == null ? void 0 : d.kind) === It.persistent)
    return {
      ok: !0,
      queued: !0,
      applied: !1,
      preview: !0,
      actorName: (t == null ? void 0 : t.name) ?? "Target",
      mode: "hazardEntry",
      reason: ""
    };
  let r = null, s = null;
  try {
    r = t != null && t.tokenUuid ? await fromUuid(t.tokenUuid) : null, s = t != null && t.actorUuid ? await fromUuid(t.actorUuid) : null;
  } catch (f) {
    return console.warn("MWD | Unable to resolve target for queued attack damage", t, f), Yi(null, t, n, { reason: "Unable to resolve attack target." });
  }
  const l = Zr(s) ? em({
    actor: s,
    rollTotal: Zd(),
    armorBefore: Kc(s, A.monitors.armor),
    structureBefore: Kc(s, A.monitors.structure)
  }) : null, c = Wc({ attacker: a, ctx: e, damage: n, targetActor: s, hitLocation: l }), u = await Tt.apply({
    actor: s,
    token: r,
    payload: c,
    options: {
      actorId: (s == null ? void 0 : s.id) ?? "",
      dryRun: !0,
      logToChat: !1
    }
  });
  if (u != null && u.ok) {
    const f = Yi(u, t, n, { queued: !0, applied: !1 }), p = Wc({ attacker: a, ctx: e, damage: n, targetActor: s, hitLocation: l });
    return p.mode === "machineAttackDamage" && Array.isArray((m = f == null ? void 0 : f.critical) == null ? void 0 : m.records) && f.critical.records.length && (p.preparedCriticalRecords = foundry.utils.deepClone(f.critical.records)), {
      ...f,
      queuedMutation: {
        id: foundry.utils.randomID(),
        type: "attackDamage",
        applied: !1,
        target: {
          name: (t == null ? void 0 : t.name) ?? "Target",
          actorUuid: (t == null ? void 0 : t.actorUuid) ?? null,
          tokenUuid: (t == null ? void 0 : t.tokenUuid) ?? null
        },
        payload: p,
        hitLocation: l,
        preview: f
      }
    };
  }
  return Yi(u, t, n, { reason: "Unable to preview attack damage." });
}
async function gA({ attacker: a, ctx: e, outcomeModel: t, target: i, previewState: n = {} } = {}) {
  var b, S;
  const r = await mA({ attacker: a, ctx: e, target: i }), s = await zm(i), o = Number((t == null ? void 0 : t.margin) ?? 0), l = Number(r.value ?? 0), c = o;
  let u = l > 0 ? o >= 1 ? "hit" : o === 0 ? "graze" : "miss" : l < 0 ? o >= 2 ? "hit" : o === 1 ? "graze" : "miss" : o >= 1 ? "hit" : "miss";
  String(((b = e == null ? void 0 : e.attack) == null ? void 0 : b.rangeBand) ?? "").trim().toLowerCase() === "outofrange" && u === "hit" && (u = "graze");
  const d = u === "hit" ? Math.max(0, c) : 0, m = (e == null ? void 0 : e.attack) ?? {}, f = pA(i), p = (n == null ? void 0 : n[f]) ?? {}, h = (i == null ? void 0 : i.exposure) ?? zi({ tier: "none" }), g = fA({
    ...e,
    targetIsMachine: Zr(s),
    attack: {
      ...m,
      currentExposure: h,
      areaEffect: (m == null ? void 0 : m.areaEffect) ?? ((S = m == null ? void 0 : m.payload) == null ? void 0 : S.areaEffect) ?? null,
      evadeActive: !!(p != null && p.evadeActive),
      evadeLocked: !!(h != null && h.evadeLocked)
    }
  }, { outcome: u, netHits: d }), y = await hA({
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
    cq: r,
    margin: o,
    rawNetHits: c,
    netHits: d,
    outcome: u,
    damage: g,
    damageResult: y,
    queuedMutation: (y == null ? void 0 : y.queuedMutation) ?? null
  };
}
function yA(a = []) {
  const e = { hits: 0, grazes: 0, misses: 0 };
  for (const t of a)
    (t == null ? void 0 : t.outcome) === "hit" ? e.hits += 1 : (t == null ? void 0 : t.outcome) === "graze" ? e.grazes += 1 : e.misses += 1;
  return {
    ...e,
    overallOutcome: e.hits > 0 ? "hit" : e.grazes > 0 ? "graze" : "miss"
  };
}
async function Fm({ attacker: a, ctx: e, outcomeModel: t, previewState: i = {}, existingAttackResult: n = null } = {}) {
  var c, u, d, m, f, p;
  const r = cA(e), s = [];
  for (const h of r)
    s.push(await gA({ attacker: a, ctx: e, outcomeModel: t, target: h, previewState: i }));
  const o = Ti(((c = e == null ? void 0 : e.attack) == null ? void 0 : c.areaEffect) ?? ((d = (u = e == null ? void 0 : e.attack) == null ? void 0 : u.payload) == null ? void 0 : d.areaEffect) ?? {});
  let l = String((n == null ? void 0 : n.persistentRegionUuid) ?? "").trim() || null;
  if (o.kind === It.persistent && !l) {
    const h = await Vh({
      attacker: a,
      attack: (e == null ? void 0 : e.attack) ?? {},
      targetResult: s[0] ?? null
    });
    l = (h == null ? void 0 : h.uuid) ?? null;
  }
  return {
    targetCount: r.length,
    results: s,
    summary: yA(s),
    areaEffect: o,
    templateGeometry: oi(He(
      (m = e == null ? void 0 : e.attack) == null ? void 0 : m.templateGeometry,
      {
        template: (f = e == null ? void 0 : e.attack) == null ? void 0 : f.template,
        placement: (p = e == null ? void 0 : e.attack) == null ? void 0 : p.templatePlacement
      }
    )),
    persistentRegionUuid: l
  };
}
function Ke(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? Math.trunc(t) : e;
}
function Cs(a, e = 0, t = Number.POSITIVE_INFINITY) {
  const i = Ke(a, e);
  return Math.max(e, Math.min(t, i));
}
function Um(a, e = 1) {
  var i;
  const t = Ke((i = a == null ? void 0 : a.difficulty) == null ? void 0 : i.dn, Ke(e, 1));
  return Math.max(0, t);
}
function bA(a, e) {
  return Math.max(0, Ke(a, 0) - Ke(e, 0));
}
function SA({ convert: a, remainder: e, rate: t = 4 } = {}) {
  const i = Math.max(0, Ke(e, 0)), n = Math.max(1, Ke(t, 4)), r = Math.max(0, Ke(a, 0)), s = Math.floor(r / n) * n;
  return Math.min(i, s);
}
function Al(a, { rate: e = 4, maxPerRoll: t = Number.POSITIVE_INFINITY } = {}) {
  const i = Math.max(1, Ke(e, 4)), n = Math.floor(Math.max(0, Ke(a, 0)) / i), r = Number.isFinite(t) ? Math.max(0, Ke(t, 0)) : Number.POSITIVE_INFINITY;
  return { amount: Math.min(n, r), rate: i };
}
function Tl(a) {
  var i;
  const e = ((i = a == null ? void 0 : a.edge) == null ? void 0 : i.earn) ?? {};
  return {
    enabled: !!(e != null && e.enabled),
    rate: Math.max(1, Ke(e == null ? void 0 : e.rate, 4)),
    maxPerRoll: (e == null ? void 0 : e.maxPerRoll) ?? Number.POSITIVE_INFINITY
  };
}
function Mr(a) {
  var t;
  const e = (t = a == null ? void 0 : a.edge) == null ? void 0 : t.pool;
  return e ? String(e) : null;
}
function AA(a) {
  let e = 0, t = 0;
  const i = (n) => {
    if (!n) return;
    const r = n == null ? void 0 : n.results;
    if (Array.isArray(r))
      for (const o of r) {
        if ((o == null ? void 0 : o.active) === !1) continue;
        const l = Number(o == null ? void 0 : o.result);
        Number.isFinite(l) && (e += 1, l === 1 && (t += 1));
      }
    const s = n == null ? void 0 : n.terms;
    if (Array.isArray(s))
      for (const o of s) i(o);
    if (Array.isArray(n))
      for (const o of n) i(o);
  };
  return i(a), { dice: e, ones: t };
}
function jm(a, e) {
  if (Ke(a, 0) !== 0) return !1;
  const { dice: t, ones: i } = AA(e);
  return t <= 0 ? !1 : i >= Math.ceil(t / 2);
}
function TA(a, e, t = 4) {
  return !!(a && Ke(e, 0) >= Ke(t, 4));
}
function Gc(a, e) {
  const t = Ke(e == null ? void 0 : e.successes, 0), i = Um(a, 1), n = t >= i, r = t - i, s = TA(n, r, 4), o = jm(t, e == null ? void 0 : e.raw), l = Tl(a), c = l.maxPerRoll ?? 1, u = l.enabled && r >= l.rate ? (() => {
    const { amount: m, rate: f } = Al(r, { rate: l.rate, maxPerRoll: c }), p = Mr(a);
    return m > 0 ? { amount: m, pool: p, reason: "net4", details: { margin: r, rate: f } } : null;
  })() : null;
  return {
    rollType: "simple",
    passed: n,
    successes: t,
    difficulty: { dn: i },
    margin: r,
    criticalSuccess: s,
    criticalFailure: o,
    tier: s ? "criticalSuccess" : o ? "criticalFailure" : n ? "success" : "failure",
    edgeEarned: u
  };
}
function wA(a, e, t) {
  var m, f;
  const i = Ke(e == null ? void 0 : e.successes, 0), n = Ke(t == null ? void 0 : t.successes, 0), r = !!((m = a == null ? void 0 : a.opposed) != null && m.net), s = String(((f = a == null ? void 0 : a.opposed) == null ? void 0 : f.dnTies) ?? "stalemate");
  let o = null, l = !1;
  r ? (o = i - n, o > 0 ? l = !0 : o < 0 ? l = !1 : s === "attackerWins" ? l = !0 : l = !1) : i > n ? l = !0 : i < n ? l = !1 : s === "attackerWins" ? l = !0 : l = !1;
  const c = Tl(a), u = c.maxPerRoll ?? 1, d = c.enabled && r && typeof o == "number" && o >= c.rate ? (() => {
    const { amount: p, rate: h } = Al(o, { rate: c.rate, maxPerRoll: u }), g = Mr(a);
    return p > 0 ? { amount: p, pool: g, reason: "net4", details: { netHits: o, rate: h } } : null;
  })() : null;
  return {
    rollType: "opposed",
    passed: l,
    successes: i,
    opposed: {
      attacker: i,
      defender: n,
      netEnabled: r,
      netHits: r ? o : void 0,
      tiePolicy: s
    },
    edgeEarned: d
  };
}
function kA(a, e) {
  var h, g, y;
  const t = Ke(e == null ? void 0 : e.successes, 0), i = Um(a, 1), n = t >= i, r = jm(t, e == null ? void 0 : e.raw), s = bA(t, i), o = ((h = a == null ? void 0 : a.net) == null ? void 0 : h.convert) ?? ((g = a == null ? void 0 : a.allocation) == null ? void 0 : g.convert) ?? 0, l = Tl(a), c = l.rate, u = SA({ convert: o, remainder: s, rate: c }), d = s - u, m = l.enabled && u >= c ? (() => {
    const { amount: b } = Al(u, { rate: c, maxPerRoll: l.maxPerRoll }), S = Mr(a);
    return b > 0 ? { amount: b, pool: S, reason: "convert4", details: { converted: u, rate: c } } : null;
  })() : null, f = r ? { amount: 1, pool: Mr(a), reason: "critFail", details: { onesRule: "halfOrMoreOnes" } } : null, p = [];
  return m && p.push(m), f && p.push(f), p.length === 0 || (p.length === 1 ? p[0] : (p.reduce((b, S) => b + (Number(S == null ? void 0 : S.amount) || 0), 0), (y = p[0]) == null || y.pool)), {
    rollType: "net",
    passed: n,
    successes: t,
    difficulty: { dn: i },
    criticalFailure: r,
    tier: r ? "criticalFailure" : n ? "success" : "failure",
    net: {
      remainder: s,
      convertRequested: Ke(o, 0),
      converted: u,
      value: d,
      // the actual net effect magnitude you apply (+net dice, etc.)
      rate: c,
      canConvert: s >= c
    },
    edgeEarned: m
  };
}
function vA(a, e) {
  var o, l, c, u;
  const t = Ke(e == null ? void 0 : e.successes, 0), i = Cs((o = a == null ? void 0 : a.extended) == null ? void 0 : o.target, 1, 1e4), n = Cs((l = a == null ? void 0 : a.extended) == null ? void 0 : l.accumulated, 0, 1e4), r = Cs(n + t, 0, 1e4), s = r >= i;
  return {
    rollType: "extended",
    passed: s,
    successes: t,
    extended: {
      target: i,
      accumulated: n,
      nextAccumulated: r,
      remaining: Math.max(0, i - r),
      completed: s,
      interval: ((c = a == null ? void 0 : a.extended) == null ? void 0 : c.interval) ?? null,
      failureLimit: ((u = a == null ? void 0 : a.extended) == null ? void 0 : u.failureLimit) ?? null
    },
    // NOTE: Edge earn rules for extended are intentionally omitted per your earlier constraint.
    edgeEarned: null
  };
}
function Hm(a, e, t = null) {
  var n;
  switch (String((a == null ? void 0 : a.rollType) ?? "simple")) {
    case "simple":
      return Gc(a, e);
    case "opposed":
      return wA(a, e, t);
    case "net":
      return kA(a, e);
    case "extended":
      return vA(a, e);
    default: {
      const r = {
        ...a,
        difficulty: { dn: Number(((n = a == null ? void 0 : a.difficulty) == null ? void 0 : n.dn) ?? 1) || 1 }
      };
      return Gc(r, e);
    }
  }
}
function MA(a, e) {
  var c, u, d, m, f, p, h, g, y;
  const t = a ?? {}, i = Array.isArray((c = t == null ? void 0 : t.modifiers) == null ? void 0 : c.applied) ? t.modifiers.applied : [], n = Number(((u = t == null ? void 0 : t.modifiers) == null ? void 0 : u.total) ?? 0);
  if (i.length) {
    const b = Array.isArray(t == null ? void 0 : t.breakdownRows) ? t.breakdownRows.find((S) => S.id === "mods.total") : null;
    e.metaRows.push({
      text: `Mods: ${i.map((S) => `${S.label} ${qc(S.value)}`).join(", ")} (Total ${qc(n)})`,
      title: (b == null ? void 0 : b.tooltip) ?? ""
    });
  }
  const r = (t == null ? void 0 : t.edge) ?? null, s = Array.isArray((d = t == null ? void 0 : t.roll) == null ? void 0 : d.failureDiceRefs) ? t.roll.failureDiceRefs : [], o = !!((m = r == null ? void 0 : r.availableActions) != null && m.canPostRerollFailures), l = Array.isArray((f = r == null ? void 0 : r.allowed) == null ? void 0 : f.postPools) ? r.allowed.postPools : [];
  if (r != null && r.domain && (e.edge = {
    domain: r.domain,
    earned: ((p = t == null ? void 0 : t.outcomeModel) == null ? void 0 : p.edgeEarned) ?? null,
    preSpent: Number(((h = r == null ? void 0 : r.pre) == null ? void 0 : h.spent) ?? 0),
    postSpent: Number(((g = r == null ? void 0 : r.post) == null ? void 0 : g.spent) ?? 0),
    canPost: o && s.length > 0 && l.length > 0,
    failureCount: s.length,
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
function qc(a) {
  const e = Number(a ?? 0);
  return e >= 0 ? `+${e}` : `${e}`;
}
function CA(a, e) {
  var g, y, b, S, w, k, P, E, x, K, q, j, W, _, F, V, Y, te, he, ce, X, Ne, Le, _e, Ue, We, ot, Ye, lt, it, Qe, bt, kt, vt, Mt;
  const t = a ?? {}, i = (t == null ? void 0 : t.attackResult) ?? null;
  if (!i) return;
  const n = Array.isArray(i == null ? void 0 : i.results) ? i.results : [], r = (i == null ? void 0 : i.summary) ?? PA(n), s = n.some((N) => {
    var U;
    return !!((U = N == null ? void 0 : N.queuedMutation) != null && U.applied);
  }), o = n.filter(
    (N) => (N == null ? void 0 : N.queuedMutation) && !N.queuedMutation.applied
  ), l = !!((y = (g = t == null ? void 0 : t.attack) == null ? void 0 : g.capabilityReport) != null && y.isTemplated), c = Array.isArray((b = t == null ? void 0 : t.modifiers) == null ? void 0 : b.applied) ? t.modifiers.applied : [], u = Number(((S = t == null ? void 0 : t.modifiers) == null ? void 0 : S.total) ?? 0);
  if (c.length) {
    const N = Array.isArray(t == null ? void 0 : t.breakdownRows) ? t.breakdownRows.find((U) => U.id === "mods.total") : null;
    e.metaRows.push({
      text: `Mods: ${c.map((U) => `${U.label} ${Ma(U.value)}`).join(", ")} (Total ${Ma(u)})`,
      title: (N == null ? void 0 : N.tooltip) ?? ""
    });
  }
  const d = (t == null ? void 0 : t.edge) ?? null, m = Array.isArray((w = t == null ? void 0 : t.roll) == null ? void 0 : w.failureDiceRefs) ? t.roll.failureDiceRefs : [], f = !!((k = d == null ? void 0 : d.availableActions) != null && k.canPostRerollFailures) && !s, p = Array.isArray((P = d == null ? void 0 : d.allowed) == null ? void 0 : P.postPools) ? d.allowed.postPools : [];
  if (d != null && d.domain && (e.edge = {
    domain: d.domain,
    earned: ((E = t == null ? void 0 : t.outcomeModel) == null ? void 0 : E.edgeEarned) ?? null,
    preSpent: Number(((x = d == null ? void 0 : d.pre) == null ? void 0 : x.spent) ?? 0),
    postSpent: Number(((K = d == null ? void 0 : d.post) == null ? void 0 : K.spent) ?? 0),
    canPost: f && m.length > 0 && p.length > 0,
    failureCount: m.length,
    postPools: p
  }, e.metaRows.push({
    text: `Edge: ${d.domain} | pre ${e.edge.preSpent} | post ${e.edge.postSpent}`,
    title: ""
  })), (q = e.edge) != null && q.canPost) {
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
  const h = String((r == null ? void 0 : r.overallOutcome) ?? "").trim();
  if (e.outcomeText = n.length > 1 ? `ATTACK ${r.hits} HIT / ${r.grazes} GRAZE / ${r.misses} MISS` : h === "hit" ? "HIT!" : h === "graze" ? "GRAZE!" : "MISS!", e.metaRows.push({
    text: `Targets: ${n.length || 0}`,
    title: ""
  }), l && (e.targetRows = n.map((N, U) => {
    var at, dt, Ot, ne, Te, ct, ut, mt;
    const ge = ((at = t == null ? void 0 : t.areaEffectPreviewState) == null ? void 0 : at[N == null ? void 0 : N.previewKey]) ?? {}, re = ((dt = N == null ? void 0 : N.damage) == null ? void 0 : dt.exposure) ?? (N == null ? void 0 : N.exposure) ?? null, Ie = String((re == null ? void 0 : re.initialLabel) ?? "NONE").trim() || "NONE", M = String((re == null ? void 0 : re.finalLabel) ?? Ie).trim() || Ie, R = Number(((Ot = N == null ? void 0 : N.damage) == null ? void 0 : Ot.incoming) ?? 0), Q = Number(((ne = N == null ? void 0 : N.damage) == null ? void 0 : ne.scaledIncoming) ?? R), se = (N == null ? void 0 : N.queuedMutation) ?? null, ae = !!(se != null && se.applied || (Te = N == null ? void 0 : N.damageResult) != null && Te.applied), be = (ge == null ? void 0 : ge.reactionPreview) ?? null, ze = [];
    if (!ae && Ie !== "NONE" && ((ct = N == null ? void 0 : N.damageResult) != null && ct.ok) && !((ut = N == null ? void 0 : N.damageResult) != null && ut.skipped) && ze.push({
      action: "toggleEvade",
      label: N != null && N.evadeActive ? "Clear Evade" : "Use Reaction",
      dataset: { "preview-key": N.previewKey },
      cssClass: `mwd-target-row__action ${N != null && N.evadeActive ? "is-active" : ""}`
    }), N != null && N.evadeActive && (be != null && be.canSpendEdge) && Array.isArray(be.edgePools))
      for (const Je of be.edgePools)
        ze.push({
          action: "toggleEvadeEdge",
          label: (ge == null ? void 0 : ge.edgePoolKey) === Je.key ? `Edge: ${Je.key}` : `Use ${Je.key}`,
          dataset: {
            "preview-key": N.previewKey,
            "pool-key": Je.key
          },
          cssClass: `mwd-target-row__action ${(ge == null ? void 0 : ge.edgePoolKey) === Je.key ? "is-active" : ""}`
        });
    return se && !ae && ze.push({
      action: "applyAttackDamage",
      label: "Apply Damage",
      dataset: { "result-index": String(U) },
      cssClass: "mwd-target-row__action mwd-apply-attack-damage"
    }), {
      targetName: ((mt = N == null ? void 0 : N.target) == null ? void 0 : mt.name) ?? "Target",
      applied: ae,
      outcomeLabel: String((N == null ? void 0 : N.outcome) ?? "miss").toUpperCase(),
      exposureLabel: Ie === M ? Ie : `${Ie} -> ${M}`,
      damageLabel: R === Q ? String(Q) : `${R} -> ${Q}`,
      reactionHint: N != null && N.evadeActive ? ge != null && ge.edgePoolKey ? "Evade active. Reaction Burn canceled by Edge." : (be == null ? void 0 : be.burnDelta) > 0 ? `Evade active. This reaction adds +${be.burnDelta} Burn.` : "Evade active." : "",
      rowActions: ze
    };
  })), n.length > 1 && o.length > 1 && e.actions.push({
    action: "applyAllAttackDamage",
    label: `Apply All Damage (${o.length})`,
    cssClass: "mwd-apply-all-attack-damage"
  }), !l)
    for (const N of n) {
      const U = Number(((W = (j = N == null ? void 0 : N.cq) == null ? void 0 : j.ar) == null ? void 0 : W.total) ?? 0), ge = Number(((F = (_ = N == null ? void 0 : N.cq) == null ? void 0 : _.dr) == null ? void 0 : F.total) ?? 0);
      e.metaRows.push({
        text: `${((V = N == null ? void 0 : N.target) == null ? void 0 : V.name) ?? "Target"}: ${String((N == null ? void 0 : N.outcome) ?? "miss").toUpperCase()} | CQ ${Ma(((Y = N == null ? void 0 : N.cq) == null ? void 0 : Y.value) ?? 0)} (AR ${U} - DR ${ge}) | Net ${Number((N == null ? void 0 : N.netHits) ?? 0)}`,
        title: EA(N == null ? void 0 : N.cq)
      });
    }
  if (!l)
    for (const [N, U] of n.entries()) {
      const ge = (U == null ? void 0 : U.damage) ?? null;
      ge && (U == null ? void 0 : U.outcome) !== "miss" && e.footerRows.push({
        text: `${((te = U == null ? void 0 : U.target) == null ? void 0 : te.name) ?? "Target"}: ${ge.damageTypeLabel} ${Ma(ge.effectiveWeaponDamage)} weapon${ge.netHits ? ` + ${ge.netHits} net` : ""}`,
        title: ""
      });
      const re = (U == null ? void 0 : U.damageResult) ?? null;
      if (re != null && re.ok && !(re != null && re.skipped)) {
        const Ie = (U == null ? void 0 : U.queuedMutation) ?? (re == null ? void 0 : re.queuedMutation) ?? null, M = !!(Ie != null && Ie.applied || re != null && re.applied);
        if (re.mode === "machineAttackDamage") {
          const R = re.machine ?? {}, Q = re.hitLocation ?? {}, se = re.degradation ?? null;
          e.footerRows.push({
            text: `${((he = U == null ? void 0 : U.target) == null ? void 0 : he.name) ?? "Target"}: Location ${Q.locationLabel ?? "Location"}${Q.rollTotal ? ` (${Q.rollTotal})` : ""} | Armor ${Number(R.armorBefore ?? 0)} -> ${Number(R.armorAfter ?? 0)} | Structure ${Number(R.structureBefore ?? 0)} -> ${Number(R.structureAfter ?? 0)}`,
            title: ""
          }), se != null && se.summary && e.footerRows.push({
            text: `${((ce = U == null ? void 0 : U.target) == null ? void 0 : ce.name) ?? "Target"}: Shock ${Number(se.summary.shockBefore ?? 0)} -> ${Number(se.summary.shockAfter ?? 0)} | Threshold ${Number(se.summary.threshold ?? 0)} | Reliability ${Number(se.summary.reliability ?? 0)} | Reserve ${Number(se.summary.reliabilitySpendableBefore ?? 0)} -> ${Number(se.summary.reliabilitySpendableAfter ?? 0)}`,
            title: ""
          }), (X = re.critical) != null && X.automatic ? e.footerRows.push({
            text: `${((Ne = U == null ? void 0 : U.target) == null ? void 0 : Ne.name) ?? "Target"}: Automatic critical pending`,
            title: ""
          }) : (Le = re.critical) != null && Le.optional ? e.footerRows.push({
            text: `${((_e = U == null ? void 0 : U.target) == null ? void 0 : _e.name) ?? "Target"}: Chaos Edge can convert this location hit to a critical`,
            title: ""
          }) : e.footerRows.push({
            text: `${((Ue = U == null ? void 0 : U.target) == null ? void 0 : Ue.name) ?? "Target"}: Location hit is descriptive only`,
            title: ""
          });
          for (const ae of ((We = re.critical) == null ? void 0 : We.records) ?? [])
            e.footerRows.push({
              text: `${((ot = U == null ? void 0 : U.target) == null ? void 0 : ot.name) ?? "Target"}: Critical - ${ae.label}${ae.locationLabel ? ` (${ae.locationLabel})` : ""}`,
              title: ""
            }), M && ae.active !== !1 && ae.remedyKey !== "none" && e.actions.push({
              action: "machineCritRemedy",
              label: `Remedy: ${ae.label}`,
              dataset: {
                "machine-actor-uuid": ((Ye = U == null ? void 0 : U.target) == null ? void 0 : Ye.actorUuid) ?? "",
                "crit-id": ae.id,
                "remedy-key": ae.remedyKey,
                "gm-override": "true"
              },
              cssClass: "mwd-machine-crit-remedy"
            });
          if (Ie && !M && Array.isArray(se == null ? void 0 : se.spendOpportunities))
            for (const ae of se.spendOpportunities)
              ae != null && ae.canSpend && e.actions.push({
                action: "toggleMachineReliabilitySpend",
                label: ae.selected ? `Clear Reliability Spend: ${ae.location}` : `Spend Reliability: ${ae.location}`,
                dataset: {
                  "result-index": String(N),
                  "spend-index": String(ae.index)
                },
                cssClass: `mwd-toggle-machine-reliability ${ae.selected ? "is-active" : ""}`
              });
        }
        Ie && !M && ((lt = re == null ? void 0 : re.critical) != null && lt.optional) && e.actions.push({
          action: "toggleMachineChaosCrit",
          label: (it = Ie.payload) != null && it.chaosCriticalSelected ? `Clear Chaos Critical: ${re.actorName ?? ((Qe = U == null ? void 0 : U.target) == null ? void 0 : Qe.name) ?? "Target"}` : `Spend Chaos Edge: ${re.actorName ?? ((bt = U == null ? void 0 : U.target) == null ? void 0 : bt.name) ?? "Target"}`,
          dataset: { "result-index": String(N) },
          cssClass: `mwd-toggle-machine-chaos ${(kt = Ie.payload) != null && kt.chaosCriticalSelected ? "is-active" : ""}`
        }), Ie && !M && e.actions.push({
          action: "applyAttackDamage",
          label: `Apply Damage: ${re.actorName ?? ((vt = U == null ? void 0 : U.target) == null ? void 0 : vt.name) ?? "Target"}`,
          dataset: { "result-index": String(N) },
          cssClass: "mwd-apply-attack-damage"
        });
      } else re != null && re.reason && e.footerRows.push({
        text: `${((Mt = U == null ? void 0 : U.target) == null ? void 0 : Mt.name) ?? "Target"}: ${re.reason}`,
        title: ""
      });
    }
}
function EA(a = {}) {
  var i, n;
  const e = Array.isArray((i = a == null ? void 0 : a.ar) == null ? void 0 : i.parts) ? a.ar.parts : [], t = Array.isArray((n = a == null ? void 0 : a.dr) == null ? void 0 : n.parts) ? a.dr.parts : [];
  return [
    ...e.map((r) => `AR - ${r.label}: ${Ma(r.value)}`),
    ...t.map((r) => `DR - ${r.label}: ${Ma(r.value)}`)
  ].join(`
`);
}
function PA(a = []) {
  const e = { hits: 0, grazes: 0, misses: 0 };
  for (const t of a)
    (t == null ? void 0 : t.outcome) === "hit" ? e.hits += 1 : (t == null ? void 0 : t.outcome) === "graze" ? e.grazes += 1 : e.misses += 1;
  return {
    ...e,
    overallOutcome: e.hits > 0 ? "hit" : e.grazes > 0 ? "graze" : "miss"
  };
}
function Ma(a) {
  const e = Number(a ?? 0);
  return e >= 0 ? `+${e}` : `${e}`;
}
function RA(a, e) {
  var c;
  const t = a ?? {}, i = (t == null ? void 0 : t.outcomeModel) ?? {}, n = (i == null ? void 0 : i.net) ?? null;
  if (!n) return;
  e.net = n;
  const r = Number((n == null ? void 0 : n.converted) ?? 0), s = Number((n == null ? void 0 : n.value) ?? 0), o = Number((n == null ? void 0 : n.rate) ?? 4);
  e.metaRows.push({
    text: `Net: ${s} • Converted: ${r} • Rate: ${o}`,
    title: ""
  });
  const l = ((c = i == null ? void 0 : i.edgeEarned) == null ? void 0 : c.amount) > 0 ? i.edgeEarned : null;
  l && e.footerRows.push({
    text: `Edge Earned: +${l.amount}${l.pool ? ` (${l.pool})` : ""}`,
    title: l.reason ?? ""
  });
}
function NA(a, e) {
  var l, c, u, d;
  const t = a ?? {}, i = (t == null ? void 0 : t.outcomeModel) ?? {}, n = Number(((l = i == null ? void 0 : i.attacker) == null ? void 0 : l.successes) ?? (i == null ? void 0 : i.attackerHits) ?? NaN), r = Number(((c = i == null ? void 0 : i.defender) == null ? void 0 : c.successes) ?? (i == null ? void 0 : i.defenderHits) ?? NaN), s = Number((i == null ? void 0 : i.netHits) ?? (i == null ? void 0 : i.net) ?? NaN);
  Number.isFinite(n) && Number.isFinite(r) && e.metaRows.push({ text: `Opposed: Att ${n} vs Def ${r} • Net ${Number.isFinite(s) ? s : n - r}` }), (u = t == null ? void 0 : t.incoming) != null && u.label && (e.incoming = { label: t.incoming.label, value: t.incoming.value ?? "" }, e.footerRows.push({ text: `Incoming: ${e.incoming.label} ${e.incoming.value}` }));
  const o = ((d = i == null ? void 0 : i.edgeEarned) == null ? void 0 : d.amount) > 0 ? i.edgeEarned : null;
  o && e.footerRows.push({ text: `Edge Earned: +${o.amount}${o.pool ? ` (${o.pool})` : ""}` });
}
function IA(a, e) {
  var c;
  const t = a ?? {}, i = (t == null ? void 0 : t.outcomeModel) ?? {}, n = (i == null ? void 0 : i.extended) ?? null;
  if (!n) return;
  e.extended = n;
  const r = Number((n == null ? void 0 : n.progress) ?? 0), s = Number((n == null ? void 0 : n.target) ?? 0), o = Number((n == null ? void 0 : n.remaining) ?? Math.max(0, s - r));
  e.metaRows.push({
    text: `Extended: ${r}/${s} (Remaining ${o})`,
    title: ""
  }), n != null && n.completed && e.footerRows.push({ text: `Completed in ${Number((n == null ? void 0 : n.rounds) ?? (n == null ? void 0 : n.attempts) ?? 0) || "?"} attempts.` });
  const l = ((c = i == null ? void 0 : i.edgeEarned) == null ? void 0 : c.amount) > 0 ? i.edgeEarned : null;
  l && e.footerRows.push({ text: `Edge Earned: +${l.amount}${l.pool ? ` (${l.pool})` : ""}` });
}
function DA(a, e) {
  const t = (a == null ? void 0 : a.machineRemedy) ?? null, i = (a == null ? void 0 : a.machineRemedyResult) ?? null;
  if (t && (e.metaRows.push({
    text: `Problem: ${t.critLabel}${t.locationLabel ? ` | ${t.locationLabel}` : ""}`,
    title: ""
  }), e.metaRows.push({
    text: `Pool: Reliability + ${t.skillLabel}`,
    title: ""
  }), e.footerRows.push({
    text: `DN ${Number(t.baseDn ?? 0)} base + ${Number(t.conditionModifier ?? 0)} condition (${t.conditionLabel})`,
    title: ""
  }), !!i)) {
    if (i.ok && i.passed && i.applied) {
      e.outcomeText = "REMEDY SUCCESS!", e.footerRows.push({
        text: `${t.remedyLabel} cleared ${t.critLabel}.`,
        title: ""
      });
      return;
    }
    if (i.ok && !i.passed) {
      e.outcomeText = "REMEDY FAILED", e.footerRows.push({
        text: `${t.critLabel} remains active.`,
        title: ""
      });
      return;
    }
    i.ok || e.footerRows.push({
      text: i.reason ?? "Machine remedy could not be applied.",
      title: ""
    });
  }
}
const OA = {
  skill: MA,
  attack: CA,
  net: RA,
  opposed: NA,
  extended: IA,
  machineRemedy: DA
  // defense: enhanceDefense,
  // edge: enhanceEdge,
};
async function pa({ resolved: a } = {}) {
  const e = a ?? {}, t = LA(e), i = OA[t.intent];
  return typeof i == "function" && i(e, t), await foundry.applications.handlebars.renderTemplate(
    "mwd.v2.roll.mwd-roll-card",
    t
  );
}
function LA(a) {
  var f, p, h, g, y, b, S, w, k, P, E, x, K, q, j, W, _;
  const e = a ?? {}, t = Number(((f = e == null ? void 0 : e.roll) == null ? void 0 : f.target) ?? 5), i = Number(((p = e == null ? void 0 : e.dn) == null ? void 0 : p.total) ?? ((g = (h = e == null ? void 0 : e.ctxSnapshot) == null ? void 0 : h.dn) == null ? void 0 : g.total) ?? ((b = (y = e == null ? void 0 : e.ctxSnapshot) == null ? void 0 : y.difficulty) == null ? void 0 : b.dn) ?? 0), n = Number(((S = e == null ? void 0 : e.roll) == null ? void 0 : S.pool) ?? 0), r = Number(((w = e == null ? void 0 : e.outcome) == null ? void 0 : w.hits) ?? 0), s = (e == null ? void 0 : e.outcomeModel) ?? {}, o = typeof s.passed == "boolean" ? s.passed : r >= i, l = Number.isFinite(Number(s.margin)) ? Number(s.margin) : r - i, c = s.tier ?? null, u = Array.isArray(e == null ? void 0 : e.breakdownRows) ? e.breakdownRows.map((F) => `${F.label}: ${F.value}`).join(`
`) : "", d = {
    header: { left: (e == null ? void 0 : e.title) ?? "Roll", right: (e == null ? void 0 : e.subtitle) ?? "" },
    formula: String((e == null ? void 0 : e.formula) ?? "").trim(),
    intent: (e == null ? void 0 : e.intent) ?? "unknown",
    domains: Array.isArray(e == null ? void 0 : e.domains) ? e.domains : [],
    tn: t,
    dn: i,
    pool: n,
    hits: r,
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
  if ((k = e == null ? void 0 : e.specialization) != null && k.label && d.metaRows.push({
    text: `Specialization: ${e.specialization.label} (+${Number(e.specialization.value ?? 0)})`,
    title: ""
  }), (P = m == null ? void 0 : m.weapon) != null && P.name) {
    const F = ((E = m == null ? void 0 : m.weapon) == null ? void 0 : E.type) === "personalWeapon" || (x = m == null ? void 0 : m.weapon) != null && x.isSynthetic ? Gr((m == null ? void 0 : m.rangeBand) ?? "") : String((m == null ? void 0 : m.rangeBand) ?? "").trim(), V = String(((K = m == null ? void 0 : m.weapon) == null ? void 0 : K.damageTypeLabel) ?? ((q = m == null ? void 0 : m.weapon) == null ? void 0 : q.damageType) ?? "").trim(), Y = String(((j = m == null ? void 0 : m.payload) == null ? void 0 : j.label) ?? ((W = m == null ? void 0 : m.weapon) == null ? void 0 : W.payloadLabel) ?? "").trim();
    d.metaRows.push({
      text: `Weapon: ${m.weapon.name}${F ? ` • Range: ${F}` : ""}${V ? ` • Type: ${V}` : ""}${Y ? ` • Payload: ${Y}` : ""}`,
      title: ""
    }), (_ = m == null ? void 0 : m.sourceState) != null && _.isTracked && d.footerRows.push({
      text: `Source: ${Number(m.sourceState.current ?? 0)}/${Number(m.sourceState.max ?? 0)}`,
      title: ""
    });
  }
  return d;
}
async function Vc(a = "") {
  const e = String(a ?? "").trim();
  if (!e || typeof fromUuid != "function") return null;
  try {
    return await fromUuid(e);
  } catch {
    return null;
  }
}
async function wl({
  machineActor: a = null,
  operatorActorUuid: e = ""
} = {}) {
  var s, o, l, c, u, d, m, f, p, h, g, y, b;
  const t = await Vc(e);
  if (t)
    return { actor: t, uuid: t.uuid ?? e, source: "explicit", reason: "" };
  const i = String(
    ((o = (s = a == null ? void 0 : a.system) == null ? void 0 : s.pilot) == null ? void 0 : o.uuid) ?? ((u = (c = (l = a == null ? void 0 : a.system) == null ? void 0 : l.mwd) == null ? void 0 : c.pilot) == null ? void 0 : u.uuid) ?? ((f = (m = (d = a == null ? void 0 : a.system) == null ? void 0 : d.mwd) == null ? void 0 : m.crew) == null ? void 0 : f.operatorActorUuid) ?? ((g = (h = (p = a == null ? void 0 : a.system) == null ? void 0 : p.mwd) == null ? void 0 : h.crew) == null ? void 0 : g.pilotActorUuid) ?? ""
  ).trim(), n = await Vc(i);
  if (n)
    return { actor: n, uuid: n.uuid ?? i, source: "pilot", reason: "" };
  const r = ((b = (y = a == null ? void 0 : a.system) == null ? void 0 : y.mwd) == null ? void 0 : b.crew) ?? {};
  return Number((r == null ? void 0 : r.effectiveCount) ?? (r == null ? void 0 : r.count) ?? 0) > 0 ? {
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
async function _A(a = "") {
  const e = String(a ?? "").trim();
  if (!e || typeof fromUuid != "function") return null;
  try {
    return await fromUuid(e);
  } catch {
    return null;
  }
}
function xA(a) {
  var e, t;
  return Array.isArray((t = (e = a == null ? void 0 : a.system) == null ? void 0 : e.mwd) == null ? void 0 : t.crits) ? a.system.mwd.crits.filter((i) => (i == null ? void 0 : i.active) !== !1) : [];
}
async function $A(a) {
  if (!(xA(a).length || !(a != null && a.toggleStatusEffect)))
    try {
      await Hr({
        actor: a,
        statusId: cm,
        active: !1
      });
    } catch (e) {
      console.warn("MWD | Unable to clear machine critical status", e);
    }
}
function BA(a, { passed: e = !1, actorUuid: t = "", gmOverride: i = !1 } = {}) {
  return e ? {
    ...a,
    active: !1,
    resolvedAt: (/* @__PURE__ */ new Date()).toISOString(),
    resolvedBy: t,
    resolvedByOverride: i && !t,
    lastRemedyAttemptAt: (/* @__PURE__ */ new Date()).toISOString(),
    lastRemedyPassed: !0,
    lastRemedyActorUuid: t,
    lastRemedyOverride: i && !t
  } : {
    ...a,
    lastRemedyAttemptAt: (/* @__PURE__ */ new Date()).toISOString(),
    lastRemedyPassed: !1,
    lastRemedyActorUuid: t,
    lastRemedyOverride: i && !t
  };
}
async function ts(a = {}, e = {}) {
  var b, S, w, k, P, E, x, K, q;
  const t = String(a.critId ?? "").trim(), i = !!(e.gmOverride ?? ((S = (b = globalThis.game) == null ? void 0 : b.user) == null ? void 0 : S.isGM)), n = await _A(a.machineActorUuid);
  if (!n) return { ok: !1, reason: "Machine actor could not be resolved." };
  const r = Array.isArray((k = (w = n.system) == null ? void 0 : w.mwd) == null ? void 0 : k.crits) ? n.system.mwd.crits.slice() : [], s = r.findIndex((j) => String((j == null ? void 0 : j.id) ?? "") === t && (j == null ? void 0 : j.active) !== !1);
  if (s < 0) return { ok: !1, reason: "That critical effect is no longer active." };
  const o = r[s], l = In(a.remedyKey || o.remedyKey), c = await wl({
    machineActor: n,
    operatorActorUuid: a.operatorActorUuid
  });
  if (l.remediable === !1)
    return { ok: !1, reason: "That critical effect has no field remedy." };
  if (!c.actor && !i)
    return { ok: !1, reason: c.reason || "No linked operator or pilot actor." };
  const u = On(
    ((x = (E = (P = globalThis.foundry) == null ? void 0 : P.utils) == null ? void 0 : E.deepClone) == null ? void 0 : x.call(E, n.system ?? {})) ?? structuredClone(n.system ?? {}),
    n.type
  ), d = String(o.locationKey ?? "").trim(), m = ((q = (K = u.mwd) == null ? void 0 : K.locations) == null ? void 0 : q[d]) ?? {}, f = Number((m == null ? void 0 : m.condition) ?? 0) || 0, p = lm(f), h = tm(o, l), g = im(o, l), y = hl(o);
  return {
    ok: !0,
    machineActor: n,
    crit: o,
    critIndex: s,
    remedy: l,
    operatorActor: c.actor ?? null,
    operator: c,
    gmOverride: i,
    rollingActor: c.actor ?? n,
    locationKey: d,
    locationCondition: f,
    locationConditionLabel: om(f),
    locationConditionModifier: p,
    skillKey: h,
    baseDn: g,
    totalDn: g + p,
    remedyEffect: y
  };
}
async function kl(a = {}, e = {}) {
  var i;
  const t = await ts(a, e);
  return t.ok ? {
    ok: !0,
    actor: t.rollingActor,
    payload: {
      intent: "machineRemedy",
      machineActorUuid: t.machineActor.uuid ?? a.machineActorUuid ?? "",
      critId: t.crit.id,
      remedyKey: t.remedy.key,
      operatorActorUuid: ((i = t.operatorActor) == null ? void 0 : i.uuid) ?? "",
      gmOverride: t.gmOverride,
      tags: ["machine", "remedy"],
      edge: { allowed: ["pre", "post"] }
    },
    context: t
  } : t;
}
async function zA(a = {}, e = {}) {
  return !(a != null && a.ok) && !(a != null && a.machineActor) ? { ok: !1, reason: "Machine remedy context is not available." } : !a.operatorActor || a.gmOverride ? { ok: !0, skipped: !0 } : await (e.spendResource ?? z.spendResource.bind(z))(a.operatorActor, {
    resource: a.remedy.resource,
    cost: a.remedy.cost,
    actionId: a.remedy.actionId,
    actionLabel: a.remedy.actionLabel,
    actionCostLabel: `${a.remedy.cost} SA`,
    actionCategory: a.remedy.category
  });
}
async function FA(a = {}, e = {}) {
  var l, c, u;
  const t = await ts(a, e);
  if (!t.ok) return t;
  const i = !!e.passed, n = t.remedyEffect ?? hl(t.crit), r = Array.isArray((c = (l = t.machineActor.system) == null ? void 0 : l.mwd) == null ? void 0 : c.crits) ? t.machineActor.system.mwd.crits.slice() : [], s = r[t.critIndex];
  if (!s || s.active === !1)
    return { ok: !1, reason: "That critical effect is no longer active." };
  const o = BA(s, {
    passed: i && n.onSuccess === "clear",
    actorUuid: ((u = t.operatorActor) == null ? void 0 : u.uuid) ?? "",
    gmOverride: t.gmOverride
  });
  return r[t.critIndex] = o, await t.machineActor.update({ "system.mwd.crits": r }), await $A(t.machineActor), {
    ok: !0,
    passed: i,
    applied: i && n.onSuccess === "clear",
    machineActor: t.machineActor,
    operatorActor: t.operatorActor,
    crit: o,
    remedy: t.remedy,
    context: t
  };
}
function UA() {
  Hooks.on("renderChatMessageHTML", (a, e) => {
    e.addEventListener("click", (t) => {
      const i = t.target.closest("[data-mwd-action]");
      if (!i) return;
      const n = String(i.dataset.mwdAction || "").trim();
      n && (n === "edgePostReroll" && cT(t, a), n === "toggleEvade" && XA(t, a), n === "toggleEvadeEdge" && ZA(t, a), n === "toggleHazardEvade" && rT(t, a), n === "toggleHazardEvadeEdge" && sT(t, a), n === "applyHazardTick" && oT(t, a), n === "toggleMachineChaosCrit" && iT(t, a), n === "toggleMachineReliabilitySpend" && aT(t, a), n === "machineCritRemedy" && nT(t), n === "applyAttackDamage" && QA(t, a), n === "applyAllAttackDamage" && eT(t, a));
    });
  });
}
function jA(a = {}) {
  var t;
  return (Array.isArray((t = a == null ? void 0 : a.attackResult) == null ? void 0 : t.results) ? a.attackResult.results : []).some((i) => {
    var n;
    return !!((n = i == null ? void 0 : i.queuedMutation) != null && n.applied);
  });
}
function HA(a) {
  return a === A.monitors.physical ? "Physical" : a === A.monitors.fatigue ? "Fatigue" : String(a ?? "").trim() || "Track";
}
function KA(a) {
  const e = String(a ?? "").trim().toLowerCase();
  return e === "penetrating" ? "is-penetrating" : e === "energy" ? "is-energy" : e === "thermal" ? "is-thermal" : e === "electrical" ? "is-electrical" : "is-concussive";
}
function WA(a) {
  const e = Math.max(0, Number(a ?? 0) || 0);
  return e <= 0 ? { key: "is-none", label: "No Penetration" } : e <= 2 ? { key: "is-light", label: "Light Damage" } : e <= 4 ? { key: "is-medium", label: "Moderate Damage" } : e <= 7 ? { key: "is-heavy", label: "Heavy Damage" } : { key: "is-critical", label: "Critical Damage" };
}
function GA({ actor: a = null, token: e = null } = {}) {
  var r;
  const t = (e == null ? void 0 : e.document) ?? e ?? null, i = String(((r = t == null ? void 0 : t.texture) == null ? void 0 : r.src) ?? "").trim(), n = String((a == null ? void 0 : a.img) ?? "").trim();
  return i || n || "icons/svg/mystery-man.svg";
}
function qA(a) {
  var t, i;
  const e = (i = (t = game.settings) == null ? void 0 : t.get) == null ? void 0 : i.call(t, "core", "rollMode");
  return typeof ChatMessage.applyRollMode == "function" && ChatMessage.applyRollMode(a, e), a;
}
function VA({ summary: a = {}, actor: e = null, token: t = null } = {}) {
  const i = String((a == null ? void 0 : a.damageType) ?? "").trim(), n = Qt(i || "concussive") || "Damage", r = HA(a == null ? void 0 : a.track), s = Math.max(0, Number((a == null ? void 0 : a.finalDamage) ?? (a == null ? void 0 : a.appliedDelta) ?? 0) || 0), o = WA(s), l = s === 1 ? "1 point" : `${s} points`, c = String((a == null ? void 0 : a.actorName) ?? (e == null ? void 0 : e.name) ?? "Target").trim() || "Target", u = [];
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
    classes: ["mwd-damage-card", KA(i), o.key].join(" "),
    header: {
      left: "Damage Applied",
      right: r
    },
    target: {
      name: c,
      image: GA({ actor: e, token: t })
    },
    damageTypeLabel: n,
    severityLabel: o.label,
    impactValue: s,
    impactText: s > 0 ? `${n} damage applied to ${r}.` : `${n} damage did not penetrate.`,
    rows: u
  };
}
async function vl({ summary: a = {}, actor: e = null, token: t = null } = {}) {
  const i = await foundry.applications.handlebars.renderTemplate(
    "mwd.v2.roll.mwd-damage-application-card",
    VA({ summary: a, actor: e, token: t })
  ), n = qA({
    speaker: ChatMessage.getSpeaker({ actor: e, token: t }),
    content: i
  });
  return ChatMessage.create(n);
}
function YA(a = {}) {
  var i, n, r;
  const e = (a == null ? void 0 : a.ctxSnapshot) ?? {}, t = Number(((i = a == null ? void 0 : a.dn) == null ? void 0 : i.total) ?? ((n = e == null ? void 0 : e.dn) == null ? void 0 : n.total) ?? ((r = e == null ? void 0 : e.difficulty) == null ? void 0 : r.dn) ?? 1);
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
async function Km(a = {}, e = null) {
  var r, s, o;
  const t = YA(a), i = Number(((r = a == null ? void 0 : a.outcome) == null ? void 0 : r.hits) ?? 0) || 0, n = ((s = a == null ? void 0 : a.outcomeModel) == null ? void 0 : s.edgeEarned) ?? null;
  return a.outcomeModel = Hm(t, { successes: i, raw: (o = a == null ? void 0 : a.roll) == null ? void 0 : o.json }, null), a.outcomeModel.edgeEarned = n, t.intent === "attack" && e && t.attack && (a.attackResult = await Fm({
    attacker: e,
    ctx: t,
    outcomeModel: a.outcomeModel,
    previewState: a.areaEffectPreviewState ?? {},
    existingAttackResult: a.attackResult ?? null
  })), a;
}
async function QA(a, e) {
  var o, l, c, u, d, m, f;
  a.preventDefault();
  const t = a.target.closest("[data-mwd-action='applyAttackDamage']"), i = Number((o = t == null ? void 0 : t.dataset) == null ? void 0 : o.resultIndex);
  if (!Number.isInteger(i) || i < 0) return;
  const n = foundry.utils.deepClone((c = (l = e == null ? void 0 : e.flags) == null ? void 0 : l.mwd) == null ? void 0 : c.resolved);
  if (!n) return;
  const r = await Wm(n, i);
  if (!r.ok) {
    (d = (u = ui.notifications) == null ? void 0 : u.warn) == null || d.call(u, r.reason ?? "Unable to apply attack damage.");
    return;
  }
  if (r.skipped) {
    (f = (m = ui.notifications) == null ? void 0 : m.info) == null || f.call(m, r.reason ?? "That attack damage has already been applied.");
    return;
  }
  const s = await pa({ resolved: n });
  await e.update({
    content: s,
    "flags.mwd.resolved": n
  }), await vl({
    summary: r.summary,
    actor: r.targetActor,
    token: r.targetToken
  });
}
async function Ml(a = {}) {
  var i, n;
  const e = (i = a == null ? void 0 : a.target) != null && i.actorUuid ? await fromUuid(a.target.actorUuid) : null, t = (n = a == null ? void 0 : a.target) != null && n.tokenUuid ? await fromUuid(a.target.tokenUuid) : null;
  return is({
    actor: e,
    token: t,
    edgePoolKey: (a == null ? void 0 : a.evadeEdgePoolKey) ?? ""
  });
}
function JA(a = "") {
  var e, t;
  return ((t = (e = game.messages) == null ? void 0 : e.get) == null ? void 0 : t.call(e, String(a ?? "").trim())) ?? null;
}
async function is({ actor: a = null, token: e = null, actorUuid: t = "", tokenUuid: i = "", edgePoolKey: n = "" } = {}) {
  const r = a ?? (t ? await fromUuid(t) : null), s = e ?? (i ? await fromUuid(i) : null);
  return r ? {
    ...z.getReactionSpendPreview(r, { token: s, edgePoolKey: n }) ?? {},
    actor: r,
    token: s
  } : null;
}
async function Cl(a, e) {
  var r, s;
  const t = foundry.utils.deepClone((s = (r = a == null ? void 0 : a.flags) == null ? void 0 : r.mwd) == null ? void 0 : s.resolved);
  if (!t) return;
  await e(t);
  const i = await fromUuid(t.actorUuid);
  if (!i) return;
  await Km(t, i);
  const n = await pa({ resolved: t });
  return await a.update({
    content: n,
    "flags.mwd.resolved": t
  }), t;
}
async function El(a, e, { active: t = !1, edgePoolKey: i = "" } = {}) {
  var s, o, l, c, u, d, m, f;
  const n = (s = e == null ? void 0 : e.target) != null && s.actorUuid ? await fromUuid(e.target.actorUuid) : null, r = (o = e == null ? void 0 : e.target) != null && o.tokenUuid ? await fromUuid(e.target.tokenUuid) : null;
  if (n) {
    if (!t) {
      const p = z.getSnapshot(n, { token: r }), h = (p == null ? void 0 : p.pendingReaction) ?? null;
      (h == null ? void 0 : h.sourceKind) === "attack" && (h == null ? void 0 : h.messageId) === a.id && (h == null ? void 0 : h.sourceId) === (e == null ? void 0 : e.previewKey) && await z.clearPendingReaction(n, { token: r });
      return;
    }
    await z.setPendingReaction(n, {
      token: r,
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
async function XA(a, e) {
  var s, o;
  a.preventDefault();
  const t = a.target.closest("[data-mwd-action='toggleEvade']"), i = String(((s = t == null ? void 0 : t.dataset) == null ? void 0 : s.previewKey) ?? "").trim();
  if (!i) return;
  const n = await Cl(e, async (l) => {
    var f;
    if (l.areaEffectPreviewState ?? (l.areaEffectPreviewState = {}), !!(l.areaEffectPreviewState[i] ?? {}).evadeActive) {
      delete l.areaEffectPreviewState[i];
      return;
    }
    l.areaEffectPreviewState[i] = {
      evadeActive: !0,
      edgePoolKey: null
    };
    const d = (Array.isArray((f = l == null ? void 0 : l.attackResult) == null ? void 0 : f.results) ? l.attackResult.results : []).find((p) => (p == null ? void 0 : p.previewKey) === i) ?? null, m = d ? await Ml({ ...d, evadeEdgePoolKey: null }) : null;
    m && (l.areaEffectPreviewState[i].reactionPreview = {
      burnDelta: Number(m.burnDelta ?? 0),
      canSpendEdge: !!m.canSpendEdge,
      edgePools: (m.edgePools ?? []).map((p) => ({
        key: p.key,
        label: p.label,
        value: p.value
      }))
    });
  }), r = (Array.isArray((o = n == null ? void 0 : n.attackResult) == null ? void 0 : o.results) ? n.attackResult.results : []).find((l) => (l == null ? void 0 : l.previewKey) === i) ?? null;
  n && r && await El(e, r, {
    active: !!(r != null && r.evadeActive),
    edgePoolKey: String((r == null ? void 0 : r.evadeEdgePoolKey) ?? "").trim()
  });
}
async function ZA(a, e) {
  var o, l, c;
  a.preventDefault();
  const t = a.target.closest("[data-mwd-action='toggleEvadeEdge']"), i = String(((o = t == null ? void 0 : t.dataset) == null ? void 0 : o.previewKey) ?? "").trim(), n = String(((l = t == null ? void 0 : t.dataset) == null ? void 0 : l.poolKey) ?? "").trim();
  if (!i) return;
  const r = await Cl(e, async (u) => {
    var h;
    u.areaEffectPreviewState ?? (u.areaEffectPreviewState = {});
    const d = u.areaEffectPreviewState[i] ?? {}, m = d.edgePoolKey === n ? null : n;
    u.areaEffectPreviewState[i] = {
      ...d,
      evadeActive: !0,
      edgePoolKey: m
    };
    const f = (Array.isArray((h = u == null ? void 0 : u.attackResult) == null ? void 0 : h.results) ? u.attackResult.results : []).find((g) => (g == null ? void 0 : g.previewKey) === i) ?? null, p = f ? await Ml({ ...f, evadeEdgePoolKey: m }) : null;
    p && (u.areaEffectPreviewState[i].reactionPreview = {
      burnDelta: Number(p.burnDelta ?? 0),
      canSpendEdge: !!p.canSpendEdge,
      edgePools: (p.edgePools ?? []).map((g) => ({
        key: g.key,
        label: g.label,
        value: g.value
      }))
    });
  }), s = (Array.isArray((c = r == null ? void 0 : r.attackResult) == null ? void 0 : c.results) ? r.attackResult.results : []).find((u) => (u == null ? void 0 : u.previewKey) === i) ?? null;
  r && s && await El(e, s, {
    active: !!(s != null && s.evadeActive),
    edgePoolKey: String((s == null ? void 0 : s.evadeEdgePoolKey) ?? "").trim()
  });
}
async function eT(a, e) {
  var c, u, d, m, f, p, h, g, y;
  a.preventDefault();
  const t = foundry.utils.deepClone((u = (c = e == null ? void 0 : e.flags) == null ? void 0 : c.mwd) == null ? void 0 : u.resolved);
  if (!t) return;
  const n = (Array.isArray((d = t == null ? void 0 : t.attackResult) == null ? void 0 : d.results) ? t.attackResult.results : []).map((b, S) => ({ result: b, index: S })).filter(({ result: b }) => (b == null ? void 0 : b.queuedMutation) && !b.queuedMutation.applied).map(({ index: b }) => b);
  if (!n.length) {
    (f = (m = ui.notifications) == null ? void 0 : m.info) == null || f.call(m, "No queued attack damage remains to apply.");
    return;
  }
  let r = 0;
  const s = [], o = [];
  for (const b of n) {
    const S = await Wm(t, b);
    S.ok && S.applied ? (r += 1, o.push(S)) : S.ok || s.push(S.reason ?? `Target ${b + 1} failed.`);
  }
  if (r <= 0) {
    (h = (p = ui.notifications) == null ? void 0 : p.warn) == null || h.call(p, s[0] ?? "Unable to apply queued attack damage.");
    return;
  }
  const l = await pa({ resolved: t });
  await e.update({
    content: l,
    "flags.mwd.resolved": t
  });
  for (const b of o)
    await vl({
      summary: b.summary,
      actor: b.targetActor,
      token: b.targetToken
    });
  s.length && ((y = (g = ui.notifications) == null ? void 0 : g.warn) == null || y.call(g, `Applied ${r} queued damage result${r === 1 ? "" : "s"}; ${s.length} failed.`));
}
async function Wm(a, e) {
  var l, c, u, d, m, f, p, h, g;
  const t = ((c = (l = a == null ? void 0 : a.attackResult) == null ? void 0 : l.results) == null ? void 0 : c[e]) ?? null, i = (t == null ? void 0 : t.queuedMutation) ?? null;
  if (!i)
    return { ok: !1, reason: "No queued attack damage to apply." };
  if (i.applied)
    return { ok: !0, skipped: !0, reason: "That attack damage has already been applied." };
  let n = null, r = null, s = null;
  try {
    if (r = (u = i.target) != null && u.actorUuid ? await fromUuid(i.target.actorUuid) : null, s = (d = i.target) != null && d.tokenUuid ? await fromUuid(i.target.tokenUuid) : null, t != null && t.evadeActive && r) {
      const y = await z.commitReactionSpend(r, {
        token: s,
        actionId: "evade",
        actionLabel: "Evade",
        actionCategory: "reaction",
        logLabel: `Evade: ${((m = i.target) == null ? void 0 : m.name) ?? ((f = t == null ? void 0 : t.target) == null ? void 0 : f.name) ?? "Target"}`,
        edgePoolKey: String((t == null ? void 0 : t.evadeEdgePoolKey) ?? "").trim()
      });
      if (!(y != null && y.ok))
        return { ok: !1, reason: (y == null ? void 0 : y.reason) ?? "Unable to spend the Evade reaction." };
      await z.clearPendingReaction(r, { token: s });
    }
    if (((p = i.payload) == null ? void 0 : p.mode) === "machineAttackDamage" && ((h = i.payload) != null && h.chaosCriticalSelected)) {
      const y = await tT({
        machineActor: r,
        operatorActorUuid: (g = i.payload) == null ? void 0 : g.operatorActorUuid
      });
      if (!y.ok) return y;
    }
    n = await Tt.apply({
      actor: r,
      token: s,
      payload: i.payload ?? {},
      options: {
        actorId: (r == null ? void 0 : r.id) ?? "",
        logToChat: !1
      }
    });
  } catch (y) {
    return console.warn("MWD | Unable to apply queued attack damage", y), { ok: !1, reason: "Unable to apply attack damage to that target." };
  }
  const o = Yi(
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
    targetActor: r,
    targetToken: s
  }) : { ok: !1, reason: o.reason ?? "Unable to apply attack damage." };
}
async function tT({ machineActor: a = null, operatorActorUuid: e = "" } = {}) {
  var r, s, o, l, c, u, d, m;
  const t = await wl({ machineActor: a, operatorActorUuid: e });
  if (!t.actor)
    return (r = game.user) != null && r.isGM ? { ok: !0, gmOverride: !0 } : { ok: !1, reason: t.reason || "No linked operator or pilot actor for Chaos Edge." };
  const i = A.counters.edgePools.chaos, n = Number(((o = (s = t.actor).getRemainingEdge) == null ? void 0 : o.call(s, i)) ?? ((c = (l = t.actor).getEdgePoolValue) == null ? void 0 : c.call(l, i)) ?? 0);
  return n <= 0 && !((u = game.user) != null && u.isGM) ? { ok: !1, reason: `${t.actor.name ?? "Operator"} has no Chaos Edge remaining.` } : (n > 0 && await ((m = (d = t.actor).spendEdge) == null ? void 0 : m.call(d, i, 1, { source: "machineChaosCritical" })), { ok: !0, operatorActor: t.actor });
}
async function iT(a, e) {
  var m, f, p, h, g, y;
  a.preventDefault();
  const t = a.target.closest("[data-mwd-action='toggleMachineChaosCrit']"), i = Number(((m = t == null ? void 0 : t.dataset) == null ? void 0 : m.resultIndex) ?? -1), n = foundry.utils.deepClone(e.getFlag("mwd", "resolved")), r = ((p = (f = n == null ? void 0 : n.attackResult) == null ? void 0 : f.results) == null ? void 0 : p[i]) ?? null, s = (r == null ? void 0 : r.queuedMutation) ?? null;
  if (!s || s.applied || ((h = s.payload) == null ? void 0 : h.mode) !== "machineAttackDamage") return;
  s.payload.chaosCriticalSelected = !s.payload.chaosCriticalSelected, delete s.payload.preparedCriticalRecords, s.payload.reliabilitySpendSelections = [];
  const o = (g = s.target) != null && g.actorUuid ? await fromUuid(s.target.actorUuid) : null, l = (y = s.target) != null && y.tokenUuid ? await fromUuid(s.target.tokenUuid) : null, c = await Tt.apply({
    actor: o,
    token: l,
    payload: s.payload,
    options: {
      actorId: (o == null ? void 0 : o.id) ?? "",
      dryRun: !0,
      logToChat: !1
    }
  }), u = Yi(
    c,
    (r == null ? void 0 : r.target) ?? s.target ?? {},
    (r == null ? void 0 : r.damage) ?? {},
    { queued: !0, applied: !1 }
  );
  s.preview = u, r.queuedMutation = s, r.damageResult = u;
  const d = await pa({ resolved: n });
  await e.update({
    content: d,
    "flags.mwd.resolved": n
  });
}
async function aT(a, e) {
  var p, h, g, y, b, S, w, k;
  a.preventDefault();
  const t = a.target.closest("[data-mwd-action='toggleMachineReliabilitySpend']"), i = Number(((p = t == null ? void 0 : t.dataset) == null ? void 0 : p.resultIndex) ?? -1), n = Number(((h = t == null ? void 0 : t.dataset) == null ? void 0 : h.spendIndex) ?? -1);
  if (!Number.isInteger(i) || i < 0 || !Number.isInteger(n) || n < 0) return;
  const r = foundry.utils.deepClone(e.getFlag("mwd", "resolved")), s = ((y = (g = r == null ? void 0 : r.attackResult) == null ? void 0 : g.results) == null ? void 0 : y[i]) ?? null, o = (s == null ? void 0 : s.queuedMutation) ?? null;
  if (!o || o.applied || ((b = o.payload) == null ? void 0 : b.mode) !== "machineAttackDamage") return;
  const l = new Set(
    Array.isArray((S = o.payload) == null ? void 0 : S.reliabilitySpendSelections) ? o.payload.reliabilitySpendSelections.map((P) => Number(P)).filter(Number.isInteger) : []
  );
  l.has(n) ? l.delete(n) : l.add(n), o.payload.reliabilitySpendSelections = Array.from(l).sort((P, E) => P - E);
  const c = (w = o.target) != null && w.actorUuid ? await fromUuid(o.target.actorUuid) : null, u = (k = o.target) != null && k.tokenUuid ? await fromUuid(o.target.tokenUuid) : null, d = await Tt.apply({
    actor: c,
    token: u,
    payload: o.payload,
    options: {
      actorId: (c == null ? void 0 : c.id) ?? "",
      dryRun: !0,
      logToChat: !1
    }
  }), m = Yi(
    d,
    (s == null ? void 0 : s.target) ?? o.target ?? {},
    (s == null ? void 0 : s.damage) ?? {},
    { queued: !0, applied: !1 }
  );
  o.preview = m, s.queuedMutation = o, s.damageResult = m;
  const f = await pa({ resolved: r });
  await e.update({
    content: f,
    "flags.mwd.resolved": r
  });
}
async function nT(a, e) {
  var r, s, o, l, c, u, d, m, f, p, h, g, y;
  a.preventDefault();
  const t = a.target.closest("[data-mwd-action='machineCritRemedy']"), i = await kl({
    machineActorUuid: ((r = t == null ? void 0 : t.dataset) == null ? void 0 : r.machineActorUuid) ?? "",
    critId: ((s = t == null ? void 0 : t.dataset) == null ? void 0 : s.critId) ?? "",
    remedyKey: ((o = t == null ? void 0 : t.dataset) == null ? void 0 : o.remedyKey) ?? "",
    operatorActorUuid: ((l = t == null ? void 0 : t.dataset) == null ? void 0 : l.operatorActorUuid) ?? ""
  }, {
    gmOverride: !!((c = game.user) != null && c.isGM && ((u = t == null ? void 0 : t.dataset) == null ? void 0 : u.gmOverride) === "true")
  });
  if (!i.ok) {
    (m = (d = ui.notifications) == null ? void 0 : d.warn) == null || m.call(d, i.reason ?? "Unable to launch the machine remedy roll.");
    return;
  }
  const n = ((f = game.mwd) == null ? void 0 : f.roll) ?? ((h = (p = game.system) == null ? void 0 : p.mwd) == null ? void 0 : h.roll);
  if (!(n != null && n.execute)) {
    (y = (g = ui.notifications) == null ? void 0 : g.error) == null || y.call(g, "MWD roll system not initialized.");
    return;
  }
  await n.execute({
    actor: i.actor,
    payload: i.payload,
    event: a
  });
}
async function Gm(a, e) {
  const t = e != null && e.actorUuid ? await fromUuid(e.actorUuid) : null, i = e != null && e.tokenUuid ? await fromUuid(e.tokenUuid) : null, n = await Od(e, { actor: t, token: i });
  return await a.update({
    content: n,
    "flags.mwd.hazardCard": e
  }), e;
}
async function Pl(a, e) {
  var i, n;
  const t = ll(foundry.utils.deepClone(((n = (i = a == null ? void 0 : a.flags) == null ? void 0 : i.mwd) == null ? void 0 : n.hazardCard) ?? {}));
  return t != null && t.actorUuid ? (await e(t), await Gm(a, t), t) : null;
}
async function Rl(a, e, { active: t = !1, edgePoolKey: i = "" } = {}) {
  var s, o, l;
  const n = e != null && e.actorUuid ? await fromUuid(e.actorUuid) : null, r = e != null && e.tokenUuid ? await fromUuid(e.tokenUuid) : null;
  if (n) {
    if (!t) {
      const c = z.getSnapshot(n, { token: r }), u = (c == null ? void 0 : c.pendingReaction) ?? null;
      (u == null ? void 0 : u.sourceKind) === "hazard" && (u == null ? void 0 : u.messageId) === a.id && (u == null ? void 0 : u.sourceId) === (e == null ? void 0 : e.regionId) && await z.clearPendingReaction(n, { token: r });
      return;
    }
    await z.setPendingReaction(n, {
      token: r,
      pendingReaction: {
        type: "evade",
        sourceKind: "hazard",
        sourceId: (e == null ? void 0 : e.regionId) ?? null,
        messageId: a.id,
        exposureBefore: ((s = e == null ? void 0 : e.exposure) == null ? void 0 : s.initialTier) ?? "none",
        exposureAfterPreview: ((o = e == null ? void 0 : e.preview) == null ? void 0 : o.finalTier) ?? ((l = e == null ? void 0 : e.exposure) == null ? void 0 : l.initialTier) ?? "none",
        edgePoolKey: i,
        allowCurrentTurn: !0
      }
    });
  }
}
async function rT(a, e) {
  var i, n;
  a.preventDefault();
  const t = await Pl(e, async (r) => {
    var l, c, u;
    const s = !((l = r == null ? void 0 : r.preview) != null && l.evadeActive), o = Go(zi({
      tier: ((c = r == null ? void 0 : r.exposure) == null ? void 0 : c.initialTier) ?? "none"
    }), {
      active: s,
      locked: !!((u = r == null ? void 0 : r.exposure) != null && u.evadeLocked)
    });
    if (r.preview ?? (r.preview = {}), r.preview.evadeActive = s, r.preview.edgePoolKey = null, r.preview.finalTier = o.finalTier, r.damageAfter = aa(r.baseDamage ?? 0, o.finalTier), s) {
      const d = await is({
        actorUuid: r.actorUuid,
        tokenUuid: r.tokenUuid,
        edgePoolKey: ""
      });
      r.preview.reactionPreview = d ? {
        burnDelta: Number(d.burnDelta ?? 0),
        canSpendEdge: !!d.canSpendEdge,
        edgePools: (d.edgePools ?? []).map((m) => ({
          key: m.key,
          label: m.label,
          value: m.value
        }))
      } : {};
    } else
      r.preview.reactionPreview = {};
  });
  t && await Rl(e, t, {
    active: !!((i = t == null ? void 0 : t.preview) != null && i.evadeActive),
    edgePoolKey: String(((n = t == null ? void 0 : t.preview) == null ? void 0 : n.edgePoolKey) ?? "").trim()
  });
}
async function sT(a, e) {
  var r, s, o;
  a.preventDefault();
  const t = a.target.closest("[data-mwd-action='toggleHazardEvadeEdge']"), i = String(((r = t == null ? void 0 : t.dataset) == null ? void 0 : r.poolKey) ?? "").trim(), n = await Pl(e, async (l) => {
    l.preview ?? (l.preview = {}), l.preview.evadeActive = !0, l.preview.edgePoolKey = l.preview.edgePoolKey === i ? null : i;
    const c = await is({
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
  n && await Rl(e, n, {
    active: !!((s = n == null ? void 0 : n.preview) != null && s.evadeActive),
    edgePoolKey: String(((o = n == null ? void 0 : n.preview) == null ? void 0 : o.edgePoolKey) ?? "").trim()
  });
}
async function oT(a, e) {
  var u, d, m, f, p, h, g, y, b, S, w, k, P, E, x, K, q, j, W, _, F;
  a.preventDefault();
  const t = ll(foundry.utils.deepClone(((d = (u = e == null ? void 0 : e.flags) == null ? void 0 : u.mwd) == null ? void 0 : d.hazardCard) ?? {}));
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
    const V = await z.commitReactionSpend(i, {
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
  const r = {
    mode: "attackDamage",
    track: A.monitors.physical,
    damage: Number(t.damageAfter ?? t.damageBefore ?? 0) || 0,
    netHits: 0,
    damageType: t.damageType,
    ap: Number(t.ap ?? 0) || 0,
    source: t.source,
    notes: `Hazard exposure ${t.exposure.initialLabel}${(w = t.preview) != null && w.evadeActive ? ` -> ${String(t.preview.finalTier ?? t.exposure.initialTier).toUpperCase()}` : ""}`.trim()
  }, s = await Tt.apply({
    actor: i,
    token: n,
    payload: r,
    options: {
      actorId: i.id,
      logToChat: !1
    }
  });
  if (!(s != null && s.ok)) {
    (P = (k = ui.notifications) == null ? void 0 : k.warn) == null || P.call(k, (s == null ? void 0 : s.reason) ?? "Unable to apply hazard damage.");
    return;
  }
  const o = z.getSnapshot(i, { token: n }), l = ((E = o == null ? void 0 : o.hazards) == null ? void 0 : E[t.regionId]) ?? {}, c = je(t.nextTier, t.exposure.finalTier);
  await z.setHazardState(i, {
    token: n,
    regionId: t.regionId,
    hazardState: {
      ...l,
      tier: c,
      turnsExposed: Math.max(Number((l == null ? void 0 : l.turnsExposed) ?? 0), Number(t.turnsExposed ?? 0)) + 1,
      lastProcessedRound: Number(((x = o == null ? void 0 : o.combat) == null ? void 0 : x.round) ?? 0) || 0,
      evadeLocked: !!(l != null && l.evadeLocked) || !!(((K = t.exposure) == null ? void 0 : K.initialTier) === "full" && ((q = t.preview) == null ? void 0 : q.finalTier) === "major" && ((j = t.preview) != null && j.evadeActive))
    }
  }), c === "full" && Number((t == null ? void 0 : t.onFullBurnDelta) ?? 0) > 0 && await i.update({
    "system.burn.value": Math.max(0, Number(((_ = (W = i.system) == null ? void 0 : W.burn) == null ? void 0 : _.value) ?? 0) + Number(t.onFullBurnDelta ?? 0))
  }), await z.clearPendingReaction(i, { token: n }), t.applied = !0, t.applyReason = "Applied", await Gm(e, t), await vl({
    summary: {
      actorName: i.name,
      track: s.track,
      finalDamage: Number(s.finalDamage ?? s.appliedDelta ?? 0),
      damageIncoming: Number(s.damageIncoming ?? t.damageAfter ?? 0),
      damageType: s.damageType ?? t.damageType,
      usedArmor: !!s.usedArmor,
      effectiveAp: Number(s.effectiveAp ?? t.ap ?? 0),
      mitigation: s.mitigation ?? null,
      beforeLabel: String(s.beforeLabel ?? "").trim(),
      afterLabel: String(s.afterLabel ?? "").trim(),
      source: t.source,
      notes: `Hazard exposure ${t.exposure.initialLabel}${(F = t.preview) != null && F.evadeActive ? ` -> ${String(t.preview.finalTier ?? "").toUpperCase()}` : ""}`
    },
    actor: i,
    token: n
  });
}
async function lT(a, { token: e = null } = {}) {
  var r, s;
  const t = z.getSnapshot(a, { token: e }), i = (t == null ? void 0 : t.pendingReaction) ?? null;
  if (!(i != null && i.messageId))
    return { ok: !1, reason: "Use an area effect or hazard card to trigger Evade." };
  const n = JA(i.messageId);
  if (!n)
    return await z.clearPendingReaction(a, { token: e }), { ok: !1, reason: "The pending Evade card is no longer available." };
  if (i.sourceKind === "attack") {
    const o = String(i.sourceId ?? "").trim();
    if (!o) return { ok: !1, reason: "Pending Evade target is missing." };
    const l = await Cl(n, async (u) => {
      var f;
      u.areaEffectPreviewState ?? (u.areaEffectPreviewState = {}), u.areaEffectPreviewState[o] = {
        ...u.areaEffectPreviewState[o] ?? {},
        evadeActive: !0,
        edgePoolKey: i.edgePoolKey ?? null
      };
      const d = (Array.isArray((f = u == null ? void 0 : u.attackResult) == null ? void 0 : f.results) ? u.attackResult.results : []).find((p) => (p == null ? void 0 : p.previewKey) === o) ?? null, m = d ? await Ml({ ...d, evadeEdgePoolKey: i.edgePoolKey ?? "" }) : null;
      m && (u.areaEffectPreviewState[o].reactionPreview = {
        burnDelta: Number(m.burnDelta ?? 0),
        canSpendEdge: !!m.canSpendEdge,
        edgePools: (m.edgePools ?? []).map((p) => ({
          key: p.key,
          label: p.label,
          value: p.value
        }))
      });
    }), c = (Array.isArray((r = l == null ? void 0 : l.attackResult) == null ? void 0 : r.results) ? l.attackResult.results : []).find((u) => (u == null ? void 0 : u.previewKey) === o) ?? null;
    return c && await El(n, c, {
      active: !0,
      edgePoolKey: String((c == null ? void 0 : c.evadeEdgePoolKey) ?? i.edgePoolKey ?? "").trim()
    }), { ok: !0 };
  }
  if (i.sourceKind === "hazard") {
    const o = await Pl(n, async (l) => {
      var d, m;
      const c = Go(zi({
        tier: ((d = l == null ? void 0 : l.exposure) == null ? void 0 : d.initialTier) ?? "none"
      }), {
        active: !0,
        locked: !!((m = l == null ? void 0 : l.exposure) != null && m.evadeLocked)
      });
      l.preview ?? (l.preview = {}), l.preview.evadeActive = !0, l.preview.edgePoolKey = l.preview.edgePoolKey ?? i.edgePoolKey ?? null, l.preview.finalTier = c.finalTier, l.damageAfter = aa(l.baseDamage ?? 0, c.finalTier);
      const u = await is({
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
    return o && await Rl(n, o, {
      active: !0,
      edgePoolKey: String(((s = o == null ? void 0 : o.preview) == null ? void 0 : s.edgePoolKey) ?? i.edgePoolKey ?? "").trim()
    }), { ok: !0 };
  }
  return { ok: !1, reason: "That Evade source is not supported." };
}
async function cT(a, e) {
  var p, h, g, y, b, S, w, k, P, E, x, K, q, j, W, _, F, V, Y;
  a.preventDefault();
  const t = a.target.closest("[data-mwd-action='edgePostReroll']"), i = String(((p = t == null ? void 0 : t.dataset) == null ? void 0 : p.poolKey) ?? "").trim();
  if (!i) return;
  const n = foundry.utils.deepClone((g = (h = e == null ? void 0 : e.flags) == null ? void 0 : h.mwd) == null ? void 0 : g.resolved);
  if (!n) return;
  if (jA(n)) {
    (b = (y = ui.notifications) == null ? void 0 : y.warn) == null || b.call(y, "Post-roll Edge is disabled after attack damage has been applied.");
    return;
  }
  if (Number(((w = (S = n == null ? void 0 : n.edge) == null ? void 0 : S.post) == null ? void 0 : w.spent) ?? 0) === 1) return;
  if (!(Array.isArray((P = (k = n == null ? void 0 : n.edge) == null ? void 0 : k.allowed) == null ? void 0 : P.postPools) ? n.edge.allowed.postPools : []).includes(i)) {
    (x = (E = ui.notifications) == null ? void 0 : E.warn) == null || x.call(E, `Post-spend pool not allowed: ${i}`);
    return;
  }
  const s = Array.isArray((K = n == null ? void 0 : n.roll) == null ? void 0 : K.failureDiceRefs) ? n.roll.failureDiceRefs : [];
  if (s.length <= 0) {
    (j = (q = ui.notifications) == null ? void 0 : q.info) == null || j.call(q, "No failures to reroll.");
    return;
  }
  const o = await fromUuid(n.actorUuid);
  if (!o) {
    (_ = (W = ui.notifications) == null ? void 0 : W.warn) == null || _.call(W, "Actor not found for this roll.");
    return;
  }
  await ((F = o.spendEdge) == null ? void 0 : F.call(o, i, 1));
  const l = Number(((V = n == null ? void 0 : n.roll) == null ? void 0 : V.target) ?? 5), u = (Y = (await new Roll(`${s.length}d6cs>=${l}`).evaluate()).dice) == null ? void 0 : Y[0], d = Array.isArray(u == null ? void 0 : u.results) ? u.results : [], m = d.filter((te) => te.success).length;
  n.outcome = n.outcome ?? {}, n.outcome.hits = Number(n.outcome.hits ?? 0) + m, n.edge = n.edge ?? {}, n.edge.post = { poolKey: i, spent: 1 }, n.edge.availableActions = {
    ...n.edge.availableActions ?? {},
    canSpendPost: !1,
    canPostRerollFailures: !1
  }, n.roll = n.roll ?? {}, n.roll.diceGroups = Array.isArray(n.roll.diceGroups) ? n.roll.diceGroups : [], n.roll.diceGroups.push({
    id: "post",
    label: "Post Reroll",
    faces: 6,
    termIndex: null,
    dice: d.map((te, he) => {
      const ce = Number(te.result), X = !!te.success;
      return {
        ref: `post:${he}`,
        face: ce,
        isSuccess: X,
        isFailure: !X,
        tooltip: X ? `Post die ${he + 1}: ${ce} (Success vs TN ${l})` : `Post die ${he + 1}: ${ce} (Failure vs TN ${l})`
      };
    })
  }), await Km(n, o);
  const f = await pa({ resolved: n });
  await e.update({
    content: f,
    "flags.mwd.resolved": n,
    "flags.mwd.payload.edge.post": { poolKey: i, spent: 1 }
  });
}
const Nl = `${T}.ownedWeaponAttack`;
let Yc = !1;
function uT(a, e = null) {
  var s, o, l;
  const t = (a == null ? void 0 : a.actor) ?? null, i = {
    intent: "attack",
    weaponId: (a == null ? void 0 : a.id) ?? "",
    payloadId: ((s = a == null ? void 0 : a.system) == null ? void 0 : s.selectedPayloadId) ?? "",
    edge: { pool: "physical.grit", allowed: ["pre", "post"] },
    tags: ["combat", "attack"],
    sourceTokenId: (e == null ? void 0 : e.id) ?? null
  }, n = t ? z.getSnapshot(t, { token: e }) : null, r = !!((l = (o = n == null ? void 0 : n.state) == null ? void 0 : o.actionState) != null && l.aim);
  return r && (i.aim = { active: !0 }), { payload: i, hasAim: r };
}
function dT(a, e = null) {
  return e ?? (a == null ? void 0 : a.token) ?? z.getCurrentSceneTokenDocument(a) ?? null;
}
function qm(a) {
  const e = String((a == null ? void 0 : a.uuid) ?? "").trim();
  return e ? {
    type: Nl,
    uuid: e,
    name: String((a == null ? void 0 : a.name) ?? "Weapon").trim() || "Weapon",
    img: (a == null ? void 0 : a.img) ?? "icons/svg/sword.svg"
  } : null;
}
async function as({ weapon: a, event: e = null, token: t = null } = {}) {
  var i, n, r, s, o;
  try {
    if (!((i = a == null ? void 0 : a.isPersonalWeapon) != null && i.call(a)))
      throw new Error("Attack requires an owned personal weapon.");
    const l = a.actor ?? null;
    if (!l)
      throw new Error("Attack requires an owned personal weapon.");
    const c = dT(l, t), { payload: u, hasAim: d } = uT(a, c), m = ((n = game.mwd) == null ? void 0 : n.roll) ?? ((s = (r = game.system) == null ? void 0 : r.mwd) == null ? void 0 : s.roll);
    if (!(m != null && m.execute))
      throw new Error("MWD roll system not initialized.");
    const f = await m.execute({ actor: l, payload: u, event: e });
    if (f) {
      d && await z.clearAim(l, { token: c });
      const p = z.getSnapshot(l, { token: c });
      if (p != null && p.hasCombatant) {
        const h = await z.spendResource(l, {
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
    return console.error("MWD | Failed to launch weapon attack", l), ia(l, "Unable to attack with that weapon."), null;
  }
}
async function mT(a, { event: e = null } = {}) {
  var n, r;
  const t = String(a ?? "").trim();
  if (!t)
    return (n = ui.notifications) == null || n.warn("That weapon shortcut is missing its item reference."), null;
  const i = await fromUuid(t);
  return i ? as({ weapon: i, event: e }) : ((r = ui.notifications) == null || r.warn("That weapon shortcut could not find its source item."), null);
}
function fT(a) {
  return `(async () => {
  const attacks = game.mwd?.attacks;
  if (!attacks?.attackWeaponByUuid) {
    return ui.notifications?.error("MWD attack shortcuts are not available right now.");
  }
  await attacks.attackWeaponByUuid(${JSON.stringify(String(a ?? "").trim())});
})();`;
}
async function pT(a, e) {
  var s, o, l, c;
  const t = String((a == null ? void 0 : a.uuid) ?? "").trim();
  if (!t) return;
  const i = String((a == null ? void 0 : a.name) ?? "Weapon Attack").trim() || "Weapon Attack", n = fT(t);
  let r = ((o = (s = game.macros) == null ? void 0 : s.find) == null ? void 0 : o.call(
    s,
    (u) => (u == null ? void 0 : u.type) === "script" && (u == null ? void 0 : u.name) === i && (u == null ? void 0 : u.command) === n
  )) ?? null;
  r || (r = await Macro.create({
    name: i,
    type: "script",
    img: (a == null ? void 0 : a.img) ?? "icons/svg/sword.svg",
    command: n
  })), await ((c = (l = game.user) == null ? void 0 : l.assignHotbarMacro) == null ? void 0 : c.call(l, r, e));
}
function Vm(a, e, t) {
  return (e == null ? void 0 : e.type) !== Nl ? !0 : (pT(e, t), !1);
}
function Ym() {
  Yc || (Yc = !0, Hooks.on("hotbarDrop", Vm));
}
const Qc = {
  HOTBAR_ATTACK_TYPE: Nl,
  getOwnedWeaponAttackDragData: qm,
  launchOwnedWeaponAttack: as,
  attackWeaponByUuid: mT,
  handleWeaponAttackHotbarDrop: Vm,
  registerWeaponAttackHotbarHook: Ym
};
function Ce(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function hT(a) {
  return String(a ?? "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
function cr(a, e = 180) {
  const t = hT(a);
  return t ? t.length <= e ? t : `${t.slice(0, Math.max(0, e - 3)).trim()}...` : "";
}
function Si(a = []) {
  return a.map((e) => String(e ?? "").trim()).filter(Boolean);
}
function on(a = []) {
  return a.filter((e) => e && e.value !== void 0 && e.value !== null && String(e.value).trim() !== "").map((e) => ({
    label: String(e.label ?? "").trim(),
    value: String(e.value ?? "").trim(),
    emphasis: e.emphasis ?? ""
  }));
}
function ur(a = []) {
  return Si(a).map((e) => ({ label: e }));
}
function dr(a = []) {
  return a.filter((e) => e && e.value !== void 0 && e.value !== null && String(e.value).trim() !== "").map((e) => ({
    label: String(e.label ?? "").trim(),
    value: String(e.value ?? "").trim()
  }));
}
const gT = {
  penetrating: "Penetrating",
  concussive: "Concussive",
  energy: "Energy",
  thermal: "Thermal",
  electrical: "Electrical"
}, yT = {
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
}, bT = {
  ammo: "Ammunition",
  explosive: "Explosive",
  medical: "Medical",
  repair: "Repair",
  fuel: "Fuel / Power Cell",
  utility: "Utility"
};
function Jc(a) {
  const e = Number(a ?? 0) || 0;
  return e > 0 ? `+${e}` : `${e}`;
}
function Xc({
  item: a,
  accordionId: e,
  itemType: t,
  defaultSubtitle: i,
  categoryLabels: n = {},
  ratingLabel: r = "Rating",
  typeLabel: s = "",
  isEditable: o = !1,
  isExpanded: l = !1
} = {}) {
  var p, h, g, y, b, S, w;
  const c = Math.max(0, Math.trunc(Ce(((p = a == null ? void 0 : a.system) == null ? void 0 : p.quantity) ?? 1, 1))), u = Math.max(0, Math.trunc(Ce(((h = a == null ? void 0 : a.system) == null ? void 0 : h.rating) ?? 0, 0))), d = Si(((g = a == null ? void 0 : a.system) == null ? void 0 : g.tags) ?? []), m = String(((y = a == null ? void 0 : a.system) == null ? void 0 : y.category) ?? "").trim(), f = n[m] ?? m;
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
    summaryStats: on([
      { label: "Qty", value: c, emphasis: "strong" },
      { label: r, value: u }
    ]),
    detailTags: ur([
      s,
      ...d,
      (b = a == null ? void 0 : a.system) != null && b.inactive ? "Inactive" : ""
    ]),
    detailRows: dr([
      { label: "Quantity", value: c },
      { label: r, value: u },
      { label: "Source", value: ((S = a == null ? void 0 : a.system) == null ? void 0 : S.sourceReference) ?? "" },
      { label: "Category", value: f },
      { label: "Tags", value: d.join(", ") }
    ]),
    detailText: cr((w = a == null ? void 0 : a.system) == null ? void 0 : w.description),
    quantity: c,
    canAdjustQuantity: o
  };
}
function ST({ defenseBonus: a = 0, mitigationByType: e = {} } = {}) {
  const t = [], i = Number(a ?? 0) || 0;
  i !== 0 && t.push(`Defense ${Jc(i)}`);
  for (const [n, r] of Object.entries(gT)) {
    const s = Number((e == null ? void 0 : e[n]) ?? 0) || 0;
    s !== 0 && t.push(`${r} ${Jc(s)}`);
  }
  return t.join(" | ");
}
function AT(a = {}, e = ["close", "near", "far", "extreme"]) {
  return e.map((t) => {
    const i = Ce(a == null ? void 0 : a[t], 0);
    return `${t.charAt(0).toUpperCase() + t.slice(1)} ${i}`;
  }).join(" | ");
}
function TT(a = {}) {
  return ["close", "near", "far", "extreme"].map((e) => `${e.charAt(0).toUpperCase()}${Ce(a == null ? void 0 : a[e], 0)}`).join(" ");
}
function wT(a = "") {
  const e = String(a ?? "").trim().toLowerCase();
  return e ? e.charAt(0).toUpperCase() + e.slice(1) : "";
}
function Ct(a) {
  return String(a ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
async function Zc({ title: a, label: e, options: t = [], confirmLabel: i = "Select" } = {}) {
  const n = Array.isArray(t) ? t.filter((s) => s == null ? void 0 : s.value) : [];
  if (!n.length) return "";
  if (n.length === 1) return String(n[0].value ?? "").trim();
  const r = `<form class="mwd-quick-select"><div class="mwd-field"><label>${Ct(e)}</label><select name="selection">${n.map((s) => `<option value="${Ct(s.value)}">${Ct(s.label ?? s.value)}</option>`).join("")}</select></div></form>`;
  return await Dialog.prompt({
    title: a,
    content: r,
    label: i,
    callback: (s) => {
      var o;
      return String(s.find('select[name="selection"]').val() ?? ((o = n[0]) == null ? void 0 : o.value) ?? "").trim();
    }
  });
}
var $t, Ii, Ji, Wt, Da, Di, D, Qm, Jm, So, mr, Xm, Zm, Oe, Ut, Ci, ef, Ao, tf, af, nf, rf, sf, of, lf, jt, ka;
const fe = class fe extends Tn {
  constructor() {
    super(...arguments);
    we(this, D);
    we(this, $t, null);
    we(this, Ii, null);
    we(this, Ji, null);
    we(this, Wt, /* @__PURE__ */ new Set());
    we(this, Da, null);
    we(this, Di, null);
  }
  /** @override */
  async _prepareContext(t) {
    var W, _, F, V, Y, te, he, ce, X, Ne, Le, _e, Ue, We, ot, Ye, lt, it, Qe, bt, kt, vt, Mt, N, U, ge, re, Ie;
    const i = await super._prepareContext(t), n = ((W = this.getSheetTokenDocument) == null ? void 0 : W.call(this)) ?? null;
    i._mwdThemeClass = game.system.mwd.styles.selectCssClass(), i.layout = await ua.get("character");
    const r = ((F = (_ = this.actor).getEdgeCap) == null ? void 0 : F.call(_)) ?? Number(((te = (Y = (V = this.actor.system) == null ? void 0 : V.attributes) == null ? void 0 : Y.edge) == null ? void 0 : te.value) ?? 0), s = !!this.isEditable, o = { physical: "Physical", mental: "Mental", social: "Social" }, l = {
      grit: "Grit",
      insight: "Insight",
      legend: "Legend",
      chaos: "Chaos",
      rumor: "Rumor",
      credibility: "Credibility"
    }, c = this.actor.getEdgePoolSummary ? this.actor.getEdgePoolSummary({ groups: Fo }) : { groups: [] };
    i.edgeConsole = {
      cap: r,
      editable: s,
      capPips: Array.from({ length: Math.max(0, r) }, (M, R) => R + 1),
      groups: (c.groups ?? []).map((M) => ({
        id: M.id,
        label: o[M.id] ?? M.id,
        pools: (M.pools ?? []).map((R) => {
          const Q = Number(R.effectiveValue ?? 0), se = Number(R.effectiveMax ?? 0), ae = Array.from({ length: Math.max(0, se) }, (ze, at) => {
            const dt = at + 1;
            return { n: dt, filled: dt <= Q };
          }), be = String(R.key ?? "").split(".").pop();
          return {
            key: R.key,
            label: l[be] ?? be ?? R.key,
            value: Q,
            max: se,
            rating: Number(R.rating ?? 0),
            ratingBonus: Number(R.ratingBonus ?? 0),
            effectiveRating: Number(R.effectiveRating ?? R.rating ?? 0),
            isCapped: Number(R.effectiveRating ?? R.rating ?? 0) > Number(R.cap ?? r),
            pips: ae,
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
        const Q = String(R.key ?? "").split(".").pop();
        Q && d.set(Q, R), R.domain = M.id;
      }
    i.edgeConsole.poolsOrdered = u.map((M) => d.get(M)).filter(Boolean);
    const m = this.actor.system ?? {}, f = m.monitors ?? {}, p = [
      { id: "physical", label: "Physical", kind: "wound", status: { label: "Penalty", path: "derived.penalty" } },
      { id: "fatigue", label: "Fatigue", kind: "fatigue", status: { label: "Penalty", path: "derived.penalty" } },
      { id: "armor", label: "Armor", kind: "armor-personal", status: { label: "Resist", path: "derived.resistance" } }
    ], h = (M, R, Q = 0) => {
      const se = foundry.utils.getProperty(M, R), ae = Number(se);
      return Number.isFinite(ae) ? ae : Q;
    };
    i.conditionMonitors = p.map((M) => {
      const R = (f == null ? void 0 : f[M.id]) ?? {}, Q = Math.max(0, h(R, "max", 0)), se = Math.min(Math.max(0, h(R, "value", 0)), Q);
      return {
        id: M.id,
        label: M.label,
        kind: M.kind,
        editable: !!this.isEditable,
        value: se,
        max: Q,
        segments: Array.from({ length: Q }, (ae, be) => {
          const ze = be + 1;
          return { value: ze, filled: ze <= se };
        }),
        status: M.status ? { label: M.status.label, value: h(R, M.status.path, 0) } : null
      };
    });
    const g = Number(((ce = (he = this.actor.system) == null ? void 0 : he.burn) == null ? void 0 : ce.value) ?? 0), y = 10, b = 6, S = Math.min(g, y);
    i.burnOverflow = Math.max(0, g - y), i.burnPenalty = Math.floor(g / 2), i.burnPips = Array.from({ length: y }, (M, R) => {
      const Q = R + 1;
      return {
        pipValue: Q,
        filled: Q <= S,
        threshold: Q === b
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
      overloaded: !!((Ne = (X = this.actor.system) == null ? void 0 : X.burn) != null && Ne.overloaded)
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
    const k = z.buildActionModel(this.actor, w), P = new Set((k.menus ?? []).map((M) => M.id));
    H(this, $t) && !P.has(H(this, $t)) && Ee(this, $t, null), i.combatActions = {
      ...k,
      menus: (k.menus ?? []).map((M) => ({
        ...M,
        isOpen: M.id === H(this, $t)
      }))
    };
    const E = ((_e = (Le = this.actor).getPersonalCombatLoadout) == null ? void 0 : _e.call(Le)) ?? null;
    i.personalInventory = {
      warnings: [...(E == null ? void 0 : E.warnings) ?? []],
      weapons: ((E == null ? void 0 : E.weapons) ?? []).map((M) => {
        var Te, ct, ut, mt, Je, Jt, ki;
        const R = C(this, D, ka).call(this, "weapons", M.id), Q = String((M == null ? void 0 : M.category) ?? "").trim().toLowerCase() !== "melee", se = !!((Te = M == null ? void 0 : M.sourceState) != null && Te.isTracked), ae = String((M == null ? void 0 : M.payloadLabel) ?? "").trim() || "Unloaded", be = Q && se ? `${Ce((ct = M == null ? void 0 : M.sourceState) == null ? void 0 : ct.current, 0)}/${Ce((ut = M == null ? void 0 : M.sourceState) == null ? void 0 : ut.max, 0)}` : "", ze = Q ? se ? `${ae} ${be}` : ae : "", at = Q ? se ? `Payload ${be}` : `Payload ${ae}` : "", dt = AT(M.attackRatingBand), Ot = TT(M.attackRatingBand), ne = dr([
          { label: "Skill", value: ((mt = M.skillDef) == null ? void 0 : mt.label) ?? M.skill ?? "" },
          { label: "Category", value: M.category ?? "" },
          { label: "Damage Type", value: M.damageTypeLabel ?? M.damageType ?? "" },
          { label: "Max Range", value: wT(((Je = M.range) == null ? void 0 : Je.max) ?? M.defaultRangeBand ?? "") },
          { label: "CQ Bands", value: dt },
          { label: "Payload", value: ze },
          { label: "Traits", value: Si(M.traits ?? []).join(", ") }
        ]);
        return {
          id: M.id,
          accordionId: R,
          isExpanded: H(this, Wt).has(R),
          name: M.name,
          img: M.img,
          subtitle: ((Jt = M.skillDef) == null ? void 0 : Jt.label) ?? M.category ?? "",
          summaryStats: on([
            { label: "DV", value: Ce(M.damage, 0), emphasis: "strong" },
            { label: "AP", value: Ce(M.ap, 0) },
            { label: "Type", value: M.damageTypeLabel ?? M.damageType ?? "" },
            { label: "CQ", value: Ot }
          ]),
          detailTags: ur([
            M.equipped ? "Equipped" : "",
            M.isPrimary ? "Primary" : "",
            at,
            ...Si(M.traits ?? [])
          ]),
          detailRows: ne,
          detailText: cr(M.notes),
          equipped: !!M.equipped,
          isPrimary: !!M.isPrimary,
          attackUuid: M.uuid ?? "",
          attackRoll: JSON.stringify({
            intent: "attack",
            weaponId: M.id,
            payloadId: ((ki = M == null ? void 0 : M.payloadState) == null ? void 0 : ki.activePayloadId) ?? "",
            edge: { pool: "physical.grit", allowed: ["pre", "post"] },
            tags: ["combat", "attack"]
          })
        };
      }),
      armor: ((E == null ? void 0 : E.armor) ?? []).map((M) => {
        var ze, at, dt, Ot, ne, Te, ct, ut, mt, Je, Jt, ki, Wa, Ga;
        const R = ((ze = E == null ? void 0 : E.activeArmor) == null ? void 0 : ze.id) === M.id ? E.activeArmor : null, Q = C(this, D, ka).call(this, "armor", M.id), se = Ce(((dt = (at = R == null ? void 0 : R.traitState) == null ? void 0 : at.reinforced) == null ? void 0 : dt.max) ?? ((ne = (Ot = M == null ? void 0 : M.traitState) == null ? void 0 : Ot.reinforced) == null ? void 0 : ne.max), 0), ae = se > 0 ? `${Ce(((ct = (Te = R == null ? void 0 : R.traitState) == null ? void 0 : Te.reinforced) == null ? void 0 : ct.current) ?? ((mt = (ut = M == null ? void 0 : M.traitState) == null ? void 0 : ut.reinforced) == null ? void 0 : mt.current), 0)}/${se}` : "", be = ST({
          defenseBonus: M.defenseBonus,
          mitigationByType: (R == null ? void 0 : R.mitigationByType) ?? (R == null ? void 0 : R.typedMitigation) ?? M.mitigationByType ?? {}
        });
        return {
          id: M.id,
          accordionId: Q,
          isExpanded: H(this, Wt).has(Q),
          name: M.name,
          img: M.img,
          subtitle: (Je = M.tags) != null && Je.length ? M.tags.join(", ") : "Armor",
          summaryStats: on([
            { label: "Rating", value: Ce((R == null ? void 0 : R.ratingCurrent) ?? M.rating, 0), emphasis: "strong" },
            { label: "Res", value: Ce((R == null ? void 0 : R.baseMitigation) ?? (R == null ? void 0 : R.baseResistance), 0) },
            { label: "Def", value: Ce(M.defenseBonus, 0) },
            { label: "Dur", value: `${Ce(((Jt = R == null ? void 0 : R.durability) == null ? void 0 : Jt.current) ?? ((ki = M.durability) == null ? void 0 : ki.current), 0)}/${Ce(((Wa = R == null ? void 0 : R.durability) == null ? void 0 : Wa.max) ?? ((Ga = M.durability) == null ? void 0 : Ga.max), 0)}` }
          ]),
          detailTags: ur([
            M.equipped ? "Equipped" : "",
            M.isPrimary ? "Primary" : "",
            ae ? `Reinforced ${ae}` : "",
            ...Si(M.traits ?? [])
          ]),
          detailRows: dr([
            { label: "Modifiers", value: be },
            { label: "Traits", value: Si(M.traits ?? []).join(", ") },
            { label: "Tags", value: Si(M.tags ?? []).join(", ") }
          ]),
          detailText: cr(M.notes),
          equipped: !!M.equipped,
          isPrimary: !!M.isPrimary
        };
      }),
      gear: (((Ue = i.items) == null ? void 0 : Ue.gear) ?? []).map((M) => {
        const R = C(this, D, ka).call(this, "gear", M.id);
        return Xc({
          item: M,
          accordionId: R,
          itemType: "gear",
          defaultSubtitle: "Gear",
          categoryLabels: yT,
          ratingLabel: "Rating",
          isEditable: this.isEditable,
          isExpanded: H(this, Wt).has(R)
        });
      }),
      // Consumables deliberately share the same quantity-tracked record model as
      // gear so stock editing and linked-source authoring stay transferable.
      consumables: (((We = i.items) == null ? void 0 : We.consumable) ?? []).map((M) => {
        const R = C(this, D, ka).call(this, "consumables", M.id);
        return Xc({
          item: M,
          accordionId: R,
          itemType: "consumable",
          defaultSubtitle: "Consumable",
          categoryLabels: bT,
          ratingLabel: "Potency",
          typeLabel: "Consumable",
          isEditable: this.isEditable,
          isExpanded: H(this, Wt).has(R)
        });
      })
    }, i.bio = {
      fields: ((ot = i.bio) == null ? void 0 : ot.fields) ?? {},
      faction: ((Ye = m.biography) == null ? void 0 : Ye.faction) ?? "",
      age: ((lt = m.biography) == null ? void 0 : lt.age) ?? "",
      rank: ((it = m.biography) == null ? void 0 : it.rank) ?? "",
      height: ((Qe = m.biography) == null ? void 0 : Qe.height) ?? "",
      weight: ((bt = m.biography) == null ? void 0 : bt.weight) ?? "",
      xpTotal: ((vt = (kt = m.counters) == null ? void 0 : kt.xp) == null ? void 0 : vt.total) ?? 0,
      xpSpent: ((N = (Mt = m.counters) == null ? void 0 : Mt.xp) == null ? void 0 : N.value) ?? 0,
      experienceLevel: ((U = m.biography) == null ? void 0 : U.experienceLevel) ?? "green",
      enrichedHistory: await foundry.applications.ux.TextEditor.implementation.enrichHTML(
        ((ge = m.biography) == null ? void 0 : ge.history) ?? "",
        { async: !0, secrets: this.actor.isOwner, relativeTo: this.actor }
      )
    };
    const x = Bi(this.actor);
    i.skillsDisplay = id(((re = this.actor) == null ? void 0 : re.system) ?? {}, {
      bonusBySkill: x.bonusBySkill
    }), i.lifeModules = x.slotStates.map((M) => {
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
    const K = ["positive", "negative", "narrative"], q = ["major", "minor"], j = [...((Ie = i.items) == null ? void 0 : Ie.quality) ?? []].sort((M, R) => {
      const Q = qt(M.system ?? {}), se = qt(R.system ?? {}), ae = K.indexOf(Q.category) - K.indexOf(se.category);
      if (ae !== 0) return ae;
      const be = q.indexOf(Q.tier) - q.indexOf(se.tier);
      return be !== 0 ? be : String(M.name ?? "").localeCompare(String(R.name ?? ""));
    });
    return i.qualityGroups = K.map((M) => ({
      id: M,
      label: Jn(M),
      records: j.filter((R) => qt(R.system ?? {}).category === M).map((R) => {
        var ae, be, ze, at;
        const Q = qt(R.system ?? {}), se = C(this, D, ka).call(this, "quality", R.id);
        return {
          id: R.id,
          accordionId: se,
          isExpanded: H(this, Wt).has(se),
          name: R.name,
          img: R.img,
          subtitle: `${Xn(Q.tier)} ${Jn(Q.category)}`,
          summaryStats: on([
            { label: "Tier", value: Xn(Q.tier), emphasis: "strong" },
            { label: "Activation", value: Q.activation || "passive" },
            { label: "Effects", value: String(((ae = Q.effects) == null ? void 0 : ae.length) ?? 0) }
          ]),
          detailTags: ur([
            Q.inactive ? "Inactive" : "",
            ...Q.tags ?? []
          ]),
          detailRows: dr([
            { label: "Category", value: Jn(Q.category) },
            { label: "Tier", value: Xn(Q.tier) },
            { label: "Activation", value: Q.activation || "passive" },
            { label: "Prerequisites", value: String(((be = Q.prerequisites) == null ? void 0 : be.length) ?? 0) },
            { label: "Effects", value: String(((ze = Q.effects) == null ? void 0 : ze.length) ?? 0) },
            { label: "Tags", value: Si(Q.tags ?? []).join(", ") }
          ]),
          detailText: cr((at = R.system) == null ? void 0 : at.description)
        };
      })
    })), i.assignedMech = this._buildAssignedMech(), i;
  }
  _buildAssignedMech() {
    var r;
    const t = this.actor.uuid, i = { light: "Light", medium: "Medium", heavy: "Heavy", assault: "Assault" }, n = (((r = game.actors) == null ? void 0 : r.contents) ?? []).filter(
      (s) => {
        var o, l;
        return (s.type === "battlemech" || s.type === "vehicle") && String(((l = (o = s.system) == null ? void 0 : o.pilot) == null ? void 0 : l.uuid) ?? "").trim() === t;
      }
    ).map((s) => {
      var _, F, V, Y, te, he, ce, X, Ne, Le, _e, Ue, We, ot, Ye;
      const o = s.type === "battlemech", l = ((F = (_ = s.system) == null ? void 0 : _.monitors) == null ? void 0 : F.structure) ?? {}, c = ((Y = (V = s.system) == null ? void 0 : V.monitors) == null ? void 0 : Y.armor) ?? {}, u = ((he = (te = s.system) == null ? void 0 : te.mwd) == null ? void 0 : he.heat) ?? {}, d = ((X = (ce = s.system) == null ? void 0 : ce.mwd) == null ? void 0 : X.heatStatus) ?? {}, m = ((Le = (Ne = s.system) == null ? void 0 : Ne.mwd) == null ? void 0 : Le.crits) ?? [], f = ((_e = s.system) == null ? void 0 : _e.quickActions) ?? {}, p = (lt, it, Qe, bt) => {
        var Mt;
        const kt = Math.max(0, Ce(bt.value, 0)), vt = Math.max(0, Ce(bt.max, 0));
        return {
          id: lt,
          label: it,
          kind: Qe,
          value: kt,
          max: vt,
          resistance: Ce((Mt = bt.resistance) == null ? void 0 : Mt.default, 0),
          segments: Array.from({ length: vt }, (N, U) => {
            const ge = U + 1;
            return { value: ge, filled: ge <= kt };
          })
        };
      }, h = Math.max(0, Ce(u.current, 0)), g = Math.max(0, Ce(u.max, 0)), y = u.thresholds ?? {}, b = o ? {
        current: h,
        max: g,
        status: d.label ?? d.code ?? "safe",
        segments: Array.from({ length: g }, (lt, it) => {
          const Qe = it + 1;
          return {
            value: Qe,
            filled: Qe <= h,
            breakpoint: Si([
              Qe === Ce(y.runningHot, 0) ? "runningHot" : "",
              Qe === Ce(y.overheated, 0) ? "overheated" : "",
              Qe === Ce(y.shutdown, 0) ? "shutdown" : ""
            ]).join(" ")
          };
        })
      } : null, S = Bm(m), w = o ? [p("structure", "Structure", "wound", l), p("armor", "Armor", "armor", c)] : [p("structure", "Structure", "wound", l)], k = Array.isArray((Ue = s.system) == null ? void 0 : Ue.weaponGroups) && s.system.weaponGroups.length > 0, P = Array.isArray((We = s.system) == null ? void 0 : We.meleeProfiles) && s.system.meleeProfiles.length > 0, E = f.primaryWeaponGroup ?? null, x = o ? [
        { label: "Primary", hint: (E == null ? void 0 : E.name) ?? "Primary weapon group", handler: "mechAttack", disabled: !E, dataset: { attackKind: "primary", mechId: s.id } },
        { label: "Ranged", hint: "Prompt for a weapon group", handler: "mechAttack", disabled: !k, dataset: { attackKind: "ranged", mechId: s.id } },
        { label: "Melee", hint: "Prompt for a melee profile", handler: "mechAttack", disabled: !P, dataset: { attackKind: "melee", mechId: s.id } },
        { label: "Piloting", hint: "Vehicle handling test", handler: "mechRoll", disabled: !1, dataset: { rollKind: "piloting", mechId: s.id } },
        { label: "Sensors", hint: "Perception or technician", handler: "mechRoll", disabled: !f.hasSensorSweep, dataset: { rollKind: "sensor", mechId: s.id } },
        { label: "Repair", hint: "Technician quick check", handler: "mechRoll", disabled: !1, dataset: { rollKind: "repair", mechId: s.id } }
      ] : [], K = Math.max(0, Ce(c.max, 0)), q = Math.max(0, K - Ce(c.value, 0)), j = Math.max(0, Ce(l.max, 0)), W = Math.max(0, j - Ce(l.value, 0));
      return {
        id: s.id,
        uuid: s.uuid,
        name: s.name,
        typeLabel: o ? "BattleMech" : "Vehicle",
        isMech: o,
        weightLabel: i[(Ye = (ot = s.system) == null ? void 0 : ot.mwd) == null ? void 0 : Ye.weightClass] ?? "",
        summaryStats: on([
          ...o ? [{ label: "Armor", value: `${q} / ${K}` }] : [],
          { label: "Structure", value: `${W} / ${j}` },
          { label: "Heat", value: o ? `${h} / ${g}` : null },
          { label: "Status", value: S.count > 0 ? S.value : "OK" }
        ]),
        conditionMonitors: w,
        heat: b,
        critCount: m.length,
        quickActions: x
      };
    });
    return { mechs: n, hasMech: n.length > 0 };
  }
  async _onOpenAssignedMech(t, i) {
    var s;
    const n = (s = i == null ? void 0 : i.dataset) == null ? void 0 : s.mechId, r = n ? game.actors.get(n) : null;
    r && r.sheet.render(!0, { focus: !0 });
  }
  async _onMechAttack(t, i) {
    var o, l, c, u, d, m;
    (o = t == null ? void 0 : t.preventDefault) == null || o.call(t), (l = t == null ? void 0 : t.stopPropagation) == null || l.call(t);
    const n = (c = i == null ? void 0 : i.dataset) == null ? void 0 : c.mechId, r = n ? game.actors.get(n) : null;
    if (!r) return;
    const s = String(((u = i == null ? void 0 : i.dataset) == null ? void 0 : u.attackKind) ?? "").trim();
    try {
      s === "melee" ? await ((d = r.rollMeleeAttack) == null ? void 0 : d.call(r)) : await ((m = r.rollRangedAttack) == null ? void 0 : m.call(r));
    } catch (f) {
      ia(f, "Unable to launch BattleMech attack.");
    }
  }
  async _onMechRoll(t, i) {
    var o, l, c, u, d, m, f;
    (o = t == null ? void 0 : t.preventDefault) == null || o.call(t), (l = t == null ? void 0 : t.stopPropagation) == null || l.call(t);
    const n = (c = i == null ? void 0 : i.dataset) == null ? void 0 : c.mechId, r = n ? game.actors.get(n) : null;
    if (!r) return;
    const s = String(((u = i == null ? void 0 : i.dataset) == null ? void 0 : u.rollKind) ?? "").trim();
    try {
      s === "piloting" ? await ((d = r.rollPilotingCheck) == null ? void 0 : d.call(r)) : s === "sensor" ? await ((m = r.rollSensorSweep) == null ? void 0 : m.call(r)) : s === "repair" && await ((f = r.rollEmergencyRepair) == null ? void 0 : f.call(r));
    } catch (p) {
      ia(p, "Unable to launch BattleMech check.");
    }
  }
  _onRender(t, i) {
    super._onRender(t, i), C(this, D, Jm).call(this), C(this, D, Zm).call(this), C(this, D, ef).call(this), C(this, D, Qm).call(this);
  }
  async close(t = {}) {
    return C(this, D, So).call(this), C(this, D, Ao).call(this), H(this, Di) !== null && (Hooks.off("updateActor", H(this, Di)), Ee(this, Di, null)), super.close(t);
  }
  requestCombatDashboardRefresh() {
    C(this, D, Oe).call(this, { force: !0 });
  }
  async _onEdgeSet(t, i) {
    var c, u, d;
    if (t.preventDefault(), t.stopPropagation(), !this.isEditable) return;
    const n = ((c = i == null ? void 0 : i.closest) == null ? void 0 : c.call(i, "[data-edge-pool][data-edge-value]")) ?? ((d = (u = t == null ? void 0 : t.target) == null ? void 0 : u.closest) == null ? void 0 : d.call(u, "[data-edge-pool][data-edge-value]"));
    if (!n) return;
    const r = String(n.dataset.edgePool ?? "").trim(), s = Number(n.dataset.edgeValue ?? NaN);
    if (!r || !Number.isFinite(s)) return;
    const o = this.actor.getEdgePool(r);
    if (!(o != null && o.hasPools)) return;
    let l = s;
    return s === o.effectiveValue && (l = s - 1), (t.button === 2 || t.type === "contextmenu") && (l = 0), t.altKey && (l = 0), t.shiftKey && (l = o.effectiveMax), this.actor.setEdgePoolValue(r, l);
  }
  async _onToggleCombatMenu(t, i) {
    var r, s, o, l, c, u, d;
    (r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (s = t == null ? void 0 : t.stopPropagation) == null || s.call(t);
    const n = String(
      ((o = i == null ? void 0 : i.dataset) == null ? void 0 : o.combatMenu) ?? ((d = (u = (c = (l = t == null ? void 0 : t.target) == null ? void 0 : l.closest) == null ? void 0 : c.call(l, "[data-combat-menu]")) == null ? void 0 : u.dataset) == null ? void 0 : d.combatMenu) ?? ""
    ).trim();
    n && (Ee(this, $t, H(this, $t) === n ? null : n), C(this, D, Oe).call(this, !1));
  }
  async _onToggleStatuses(t, i) {
    var s, o, l, c, u, d, m, f;
    if ((s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), C(this, D, jt).call(this, i, t, "Statuses are not available right now.") || !this.isEditable) return;
    const n = this.getPersistentActor() ?? this.actor, r = ((l = this.getSheetTokenDocument) == null ? void 0 : l.call(this)) ?? ((u = z.getSnapshot(n, { token: ((c = this.getSheetTokenDocument) == null ? void 0 : c.call(this)) ?? null })) == null ? void 0 : u.tokenDocument) ?? ((m = z.getSnapshot(this.actor, { token: ((d = this.getSheetTokenDocument) == null ? void 0 : d.call(this)) ?? null })) == null ? void 0 : m.tokenDocument) ?? null;
    if (!r) {
      (f = ui.notifications) == null || f.warn("Statuses require a token for this actor on the current scene.");
      return;
    }
    return fd({
      actor: n,
      token: r
    });
  }
  async _onCombatSpend(t, i) {
    var c, u, d, m, f, p, h, g, y, b;
    if ((c = t == null ? void 0 : t.preventDefault) == null || c.call(t), (u = t == null ? void 0 : t.stopPropagation) == null || u.call(t), C(this, D, jt).call(this, i, t, "That combat action is not available right now.") || !this.isEditable) return;
    const n = String(((d = i == null ? void 0 : i.dataset) == null ? void 0 : d.resource) ?? "").trim(), r = Math.max(0, Number(((m = i == null ? void 0 : i.dataset) == null ? void 0 : m.cost) ?? 0)), s = String(((f = i == null ? void 0 : i.dataset) == null ? void 0 : f.combatAction) ?? "").trim(), o = String(((p = i == null ? void 0 : i.dataset) == null ? void 0 : p.combatLabel) ?? "").trim(), l = String(((h = i == null ? void 0 : i.dataset) == null ? void 0 : h.combatCostLabel) ?? "").trim();
    if (!(!n || !r || !s))
      try {
        const S = this.getPersistentActor() ?? this.actor, w = await z.spendResource(S, {
          token: ((g = this.getSheetTokenDocument) == null ? void 0 : g.call(this)) ?? z.getCurrentSceneTokenDocument(S) ?? z.getCurrentSceneTokenDocument(this.actor),
          resource: n,
          cost: r,
          actionId: s,
          actionLabel: o,
          actionCostLabel: l
        });
        if (!(w != null && w.ok)) {
          (y = ui.notifications) == null || y.warn((w == null ? void 0 : w.reason) ?? "Unable to spend action.");
          return;
        }
        C(this, D, Ut).call(this, { rerender: !1 }), C(this, D, Oe).call(this, { force: !0 });
      } catch (S) {
        console.error("MWD | Failed to spend combat action", S), (b = ui.notifications) == null || b.error("Unable to spend action.");
      }
  }
  async _onCombatAction(t, i) {
    var r, s, o, l, c, u;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (s = t == null ? void 0 : t.stopPropagation) == null || s.call(t), C(this, D, jt).call(this, i, t, "That combat action is not available right now.") || !this.isEditable) return;
    const n = String(((o = i == null ? void 0 : i.dataset) == null ? void 0 : o.combatAction) ?? "").trim();
    if (n)
      try {
        const d = this.getPersistentActor() ?? this.actor, m = await C(this, D, tf).call(this, n);
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
        C(this, D, Ut).call(this, { rerender: !1 }), C(this, D, Oe).call(this, { force: !0 });
      } catch (d) {
        console.error("MWD | Failed to perform combat action", d), (u = ui.notifications) == null || u.error("Unable to perform action.");
      }
  }
  async _onCombatReduceBurn(t, i) {
    var n, r, s, o, l;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (r = t == null ? void 0 : t.stopPropagation) == null || r.call(t), !C(this, D, jt).call(this, i, t, "Burn recovery is not available right now.") && this.isEditable)
      try {
        const c = this.getPersistentActor() ?? this.actor, u = await z.reduceBurn(c, {
          token: ((s = this.getSheetTokenDocument) == null ? void 0 : s.call(this)) ?? z.getCurrentSceneTokenDocument(c) ?? z.getCurrentSceneTokenDocument(this.actor)
        });
        if (!(u != null && u.ok)) {
          (o = ui.notifications) == null || o.warn((u == null ? void 0 : u.reason) ?? "Unable to reduce Burn.");
          return;
        }
        C(this, D, Ut).call(this, { rerender: !1 }), C(this, D, Oe).call(this, { force: !0 });
      } catch (c) {
        console.error("MWD | Failed to reduce Burn", c), (l = ui.notifications) == null || l.error("Unable to reduce Burn.");
      }
  }
  async _onCombatAssist(t, i) {
    var n, r, s, o, l, c, u;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (r = t == null ? void 0 : t.stopPropagation) == null || r.call(t), !C(this, D, jt).call(this, i, t, "Assist is not available right now.") && this.isEditable)
      try {
        const d = this.getPersistentActor() ?? this.actor, m = ((s = this.getSheetTokenDocument) == null ? void 0 : s.call(this)) ?? z.getCurrentSceneTokenDocument(d) ?? z.getCurrentSceneTokenDocument(this.actor), f = z.getSnapshot(d, { token: m });
        if (!f.hasCombatant) {
          (o = ui.notifications) == null || o.warn("No combatant on the current scene.");
          return;
        }
        if (f.isCurrentTurn) {
          (l = ui.notifications) == null || l.warn("Only outside your activation.");
          return;
        }
        const p = await C(this, D, sf).call(this, f);
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
        await C(this, D, of).call(this, {
          actor: d,
          token: m,
          target: p,
          costLabel: h.costLabel
        }), C(this, D, Ut).call(this, { rerender: !1 }), C(this, D, Oe).call(this, { force: !0 });
      } catch (d) {
        console.error("MWD | Failed to assist", d), (u = ui.notifications) == null || u.error("Unable to assist.");
      }
  }
  async _onCombatEvade(t, i) {
    var n, r, s, o, l;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (r = t == null ? void 0 : t.stopPropagation) == null || r.call(t), !C(this, D, jt).call(this, i, t, "Evade is not available right now.") && this.isEditable)
      try {
        const c = this.getPersistentActor() ?? this.actor, u = ((s = this.getSheetTokenDocument) == null ? void 0 : s.call(this)) ?? z.getCurrentSceneTokenDocument(c) ?? z.getCurrentSceneTokenDocument(this.actor), d = await lT(c, { token: u });
        if (!(d != null && d.ok)) {
          (o = ui.notifications) == null || o.warn((d == null ? void 0 : d.reason) ?? "Unable to activate Evade.");
          return;
        }
        C(this, D, Ut).call(this, { rerender: !1 }), C(this, D, Oe).call(this, { force: !0 });
      } catch (c) {
        console.error("MWD | Failed to activate Evade", c), (l = ui.notifications) == null || l.error("Unable to activate Evade.");
      }
  }
  async _onCombatInterrupt(t, i) {
    var n, r, s, o, l, c, u, d;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (r = t == null ? void 0 : t.stopPropagation) == null || r.call(t), !C(this, D, jt).call(this, i, t, "Interrupt is not available right now.") && this.isEditable)
      try {
        const m = this.getPersistentActor() ?? this.actor, f = ((s = this.getSheetTokenDocument) == null ? void 0 : s.call(this)) ?? z.getCurrentSceneTokenDocument(m) ?? z.getCurrentSceneTokenDocument(this.actor), p = z.getSnapshot(m, { token: f }), h = z.getPreparedInterrupt(p);
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
        if (!await C(this, D, af).call(this, h)) return;
        const y = await z.executeAction(m, {
          token: f,
          actionId: "interrupt",
          metadata: h
        });
        if (!(y != null && y.ok)) {
          (u = ui.notifications) == null || u.warn((y == null ? void 0 : y.reason) ?? "Unable to interrupt.");
          return;
        }
        await z.clearPreparedInterrupt(m, { token: f }), await C(this, D, lf).call(this, {
          actor: m,
          token: f,
          preparedInterrupt: h,
          costLabel: y.costLabel
        }), C(this, D, Ut).call(this, { rerender: !1 }), C(this, D, Oe).call(this, { force: !0 });
      } catch (m) {
        console.error("MWD | Failed to interrupt", m), (d = ui.notifications) == null || d.error("Unable to interrupt.");
      }
  }
  async _onCombatOverloadCheck(t, i) {
    var s, o, l, c, u, d, m, f, p, h, g;
    if ((s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), C(this, D, jt).call(this, i, t, "Overload check is not available right now.") || !this.isEditable) return;
    const n = ((l = i == null ? void 0 : i.dataset) == null ? void 0 : l.roll) ?? ((m = (d = (u = (c = t == null ? void 0 : t.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, "[data-roll]")) == null ? void 0 : d.dataset) == null ? void 0 : m.roll);
    if (!n) return;
    let r;
    try {
      r = JSON.parse(n);
    } catch (y) {
      console.warn("MWD | Invalid overload payload", n, y);
      return;
    }
    try {
      const y = this.getPersistentActor() ?? this.actor, b = await ((h = (p = (f = game.mwd) == null ? void 0 : f.roll) == null ? void 0 : p.execute) == null ? void 0 : h.call(p, { actor: y, payload: r, event: t }));
      if (C(this, D, Ut).call(this, { rerender: !1 }), !b) {
        C(this, D, Oe).call(this, !1);
        return;
      }
      C(this, D, Oe).call(this, { force: !0 });
    } catch (y) {
      console.error("MWD | Failed to launch overload check", y), (g = ui.notifications) == null || g.error("Unable to launch overload check.");
    }
  }
  async _onCombatAttack(t, i) {
    var m, f, p, h, g, y, b, S, w, k, P, E, x, K, q, j, W, _, F, V, Y, te, he;
    if ((m = t == null ? void 0 : t.preventDefault) == null || m.call(t), (f = t == null ? void 0 : t.stopPropagation) == null || f.call(t), C(this, D, jt).call(this, i, t, "Attack is not available right now.") || !this.isEditable) return;
    const n = this.getPersistentActor() ?? this.actor, r = ((p = this.getSheetTokenDocument) == null ? void 0 : p.call(this)) ?? z.getCurrentSceneTokenDocument(n) ?? z.getCurrentSceneTokenDocument(this.actor), s = String(((h = i == null ? void 0 : i.dataset) == null ? void 0 : h.combatAction) ?? "attack").trim() || "attack", o = String(((g = i == null ? void 0 : i.dataset) == null ? void 0 : g.combatLabel) ?? (s === "opportunity" ? "Opportunity" : "Attack")).trim() || "Attack", l = s === "opportunity", c = z.getSnapshot(n, { token: r }), u = !!((b = (y = c.state) == null ? void 0 : y.actionState) != null && b.aim);
    if (!c.hasCombatant) {
      (S = ui.notifications) == null || S.warn("No combatant on the current scene.");
      return;
    }
    if (l && c.isCurrentTurn) {
      (w = ui.notifications) == null || w.warn("Only outside your activation.");
      return;
    }
    if (!l && !c.isCurrentTurn) {
      (k = ui.notifications) == null || k.warn("Only available during your activation.");
      return;
    }
    if (!l && c.overloaded) {
      (P = ui.notifications) == null || P.warn("Overloaded actors can only recover Burn.");
      return;
    }
    if (!l) {
      const ce = 3 + Math.floor((Math.max(0, Number(((K = (x = (E = n.system) == null ? void 0 : E.attributes) == null ? void 0 : x.reflexes) == null ? void 0 : K.value) ?? 0)) + Math.max(0, Number(((W = (j = (q = n.system) == null ? void 0 : q.attributes) == null ? void 0 : j.willpower) == null ? void 0 : W.value) ?? 0))) / 2);
      if (Math.max(0, ce - Math.max(0, Number(((_ = c.state) == null ? void 0 : _.saSpentThisActivation) ?? 0))) < 2) {
        (F = ui.notifications) == null || F.warn("Activation SA cap reached.");
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
      sourceTokenId: (r == null ? void 0 : r.id) ?? null
    };
    try {
      const ce = await ((te = (Y = (V = game.mwd) == null ? void 0 : V.roll) == null ? void 0 : Y.execute) == null ? void 0 : te.call(Y, { actor: n, payload: d, event: t }));
      if (C(this, D, Ut).call(this, { rerender: !1 }), !ce) {
        C(this, D, Oe).call(this, !1);
        return;
      }
      u && await z.clearAim(n, { token: r });
      const X = l ? await z.executeAction(n, {
        token: r,
        actionId: "opportunity"
      }) : await z.spendResource(n, {
        token: r,
        resource: "sa",
        cost: 2,
        actionId: "attack",
        actionLabel: "Attack",
        actionCostLabel: "2 SA",
        actionCategory: "complex"
      });
      X != null && X.ok || (he = ui.notifications) == null || he.warn((X == null ? void 0 : X.reason) ?? `Unable to spend ${o} action.`), C(this, D, Oe).call(this, { force: !0 });
    } catch (ce) {
      console.error(`MWD | Failed to launch ${o}`, ce), ia(ce, `Unable to launch ${o}.`);
    }
  }
  async _onAddSkillSpecialization(t, i) {
    var d, m, f, p;
    if ((d = t == null ? void 0 : t.preventDefault) == null || d.call(t), (m = t == null ? void 0 : t.stopPropagation) == null || m.call(t), !this.isEditable || !this.editing) return;
    const n = String(((f = i == null ? void 0 : i.dataset) == null ? void 0 : f.skillKey) ?? "").trim();
    if (!n) return;
    const r = this.getPersistentActor() ?? this.actor, s = Ys(r.system ?? {}, n), o = zr(r.system ?? {}, n), l = ra(n).filter((h) => !o.includes(h.key));
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
    const u = br(
      s.concat([c])
    );
    await r.update({
      [`system.skills.${n}.specializations`]: u
    }), C(this, D, Oe).call(this, { force: !0 });
  }
  async _onRemoveSkillSpecialization(t, i) {
    var l, c, u, d;
    if ((l = t == null ? void 0 : t.preventDefault) == null || l.call(t), (c = t == null ? void 0 : t.stopPropagation) == null || c.call(t), !this.isEditable || !this.editing) return;
    const n = String(((u = i == null ? void 0 : i.dataset) == null ? void 0 : u.skillKey) ?? "").trim(), r = String(((d = i == null ? void 0 : i.dataset) == null ? void 0 : d.specializationKey) ?? "").trim();
    if (!n || !r) return;
    const s = this.getPersistentActor() ?? this.actor, o = br(
      Ys(s.system ?? {}, n).filter((m) => m !== r)
    );
    await s.update({
      [`system.skills.${n}.specializations`]: o
    }), C(this, D, Oe).call(this, { force: !0 });
  }
  async _onCreateLifeModuleItem(t, i) {
    var d, m, f, p, h;
    if ((d = t == null ? void 0 : t.preventDefault) == null || d.call(t), (m = t == null ? void 0 : t.stopPropagation) == null || m.call(t), !this.isEditable) return;
    const n = String(((f = i == null ? void 0 : i.dataset) == null ? void 0 : f.moduleType) ?? "").trim();
    if (!n) return;
    const r = this.getPersistentActor() ?? this.actor, s = fl(n);
    if (!s.length) {
      (p = ui.notifications) == null || p.warn(`No ${Ba(n)} life modules are configured in game settings.`);
      return;
    }
    const o = await Zc({
      title: `Choose ${Ba(n)} Life Module`,
      label: "Life Module",
      confirmLabel: "Create",
      options: s.map((g) => ({
        value: g.id,
        label: g.label
      }))
    });
    if (!o) return;
    const l = xi(o);
    if (!l) {
      (h = ui.notifications) == null || h.warn("That life module catalog entry no longer exists.");
      return;
    }
    const c = Kd(l, {}), u = {};
    for (const g of c.filter((y) => y.hasMultipleChoices)) {
      const y = await Zc({
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
      system: yn({
        moduleType: n,
        catalogId: l.id,
        selectedGrants: u
      })
    }]), C(this, D, Oe).call(this, { force: !0 });
  }
  async _onCreateOwnedItem(t, i) {
    var l, c, u;
    if ((l = t == null ? void 0 : t.preventDefault) == null || l.call(t), (c = t == null ? void 0 : t.stopPropagation) == null || c.call(t), !this.isEditable) return;
    const n = String(((u = i == null ? void 0 : i.dataset) == null ? void 0 : u.itemType) ?? "").trim();
    if (!n) return;
    const r = this.getPersistentActor() ?? this.actor, s = r.items.filter((d) => d.type === n).length, o = n === "personalWeapon" ? "Personal Weapon" : n === "armor" ? "Armor" : n === "consumable" ? "Consumable" : n.charAt(0).toUpperCase() + n.slice(1);
    await r.createEmbeddedDocuments("Item", [{
      name: `${o} ${s + 1}`,
      type: n
    }]), C(this, D, Oe).call(this, { force: !0 });
  }
  async _onEditOwnedItem(t, i) {
    var r, s, o;
    (r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (s = t == null ? void 0 : t.stopPropagation) == null || s.call(t);
    const n = C(this, D, Ci).call(this, i, t);
    (o = n == null ? void 0 : n.sheet) == null || o.render(!0);
  }
  async _onDeleteOwnedItem(t, i) {
    var s, o;
    if ((s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const n = C(this, D, Ci).call(this, i, t);
    if (!n) return;
    await (this.getPersistentActor() ?? this.actor).deleteEmbeddedDocuments("Item", [n.id]), C(this, D, Oe).call(this, { force: !0 });
  }
  async _onToggleInventoryAccordion(t, i) {
    var r, s, o, l, c, u, d, m, f, p;
    (r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (s = t == null ? void 0 : t.stopPropagation) == null || s.call(t);
    const n = String(
      ((o = i == null ? void 0 : i.dataset) == null ? void 0 : o.accordionId) ?? ((u = (c = (l = i == null ? void 0 : i.closest) == null ? void 0 : l.call(i, "[data-accordion-id]")) == null ? void 0 : c.dataset) == null ? void 0 : u.accordionId) ?? ((p = (f = (m = (d = t == null ? void 0 : t.target) == null ? void 0 : d.closest) == null ? void 0 : m.call(d, "[data-accordion-id]")) == null ? void 0 : f.dataset) == null ? void 0 : p.accordionId) ?? ""
    ).trim();
    n && (H(this, Wt).has(n) ? H(this, Wt).delete(n) : H(this, Wt).add(n), C(this, D, Oe).call(this, !1));
  }
  async _onToggleOwnedItemEquipped(t, i) {
    var s, o, l, c;
    if ((s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const n = C(this, D, Ci).call(this, i, t);
    if (!n) return;
    const r = this.getPersistentActor() ?? this.actor;
    await ((c = r.setOwnedItemEquipped) == null ? void 0 : c.call(r, n.id, !((l = n.system) != null && l.equipped))), C(this, D, Oe).call(this, { force: !0 });
  }
  async _onSetOwnedItemPrimary(t, i) {
    var s, o, l, c;
    if ((s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const n = C(this, D, Ci).call(this, i, t);
    if (!n) return;
    const r = this.getPersistentActor() ?? this.actor;
    await ((c = r.setOwnedItemPrimary) == null ? void 0 : c.call(r, n.id, !((l = n.system) != null && l.isPrimary))), C(this, D, Oe).call(this, { force: !0 });
  }
  async _onAdjustGearQuantity(t, i) {
    var c, u, d, m, f, p, h, g, y, b, S;
    if ((c = t == null ? void 0 : t.preventDefault) == null || c.call(t), (u = t == null ? void 0 : t.stopPropagation) == null || u.call(t), !this.isEditable) return;
    const n = C(this, D, Ci).call(this, i, t);
    if (!n || !["gear", "consumable"].includes(String(n.canonicalType ?? n.type ?? "").trim())) return;
    const r = Math.trunc(Number(
      ((d = i == null ? void 0 : i.dataset) == null ? void 0 : d.delta) ?? ((p = (f = (m = i == null ? void 0 : i.closest) == null ? void 0 : m.call(i, "[data-delta]")) == null ? void 0 : f.dataset) == null ? void 0 : p.delta) ?? ((b = (y = (g = (h = t == null ? void 0 : t.target) == null ? void 0 : h.closest) == null ? void 0 : g.call(h, "[data-delta]")) == null ? void 0 : y.dataset) == null ? void 0 : b.delta) ?? 0
    ) || 0);
    if (!r) return;
    const o = (this.getPersistentActor() ?? this.actor).items.get(n.id) ?? n, l = Math.max(0, Math.trunc(Number(((S = o.system) == null ? void 0 : S.quantity) ?? 1) || 0) + r);
    await o.update({ "system.quantity": l }), C(this, D, Oe).call(this, { force: !0 });
  }
  async _onAttackWeapon(t, i) {
    var l, c, u, d;
    if ((l = t == null ? void 0 : t.preventDefault) == null || l.call(t), (c = t == null ? void 0 : t.stopPropagation) == null || c.call(t), C(this, D, jt).call(this, i, t, "Equip that weapon before attacking.")) return;
    const n = C(this, D, Ci).call(this, i, t);
    if (!((u = n == null ? void 0 : n.isPersonalWeapon) != null && u.call(n))) return;
    const r = this.getPersistentActor() ?? this.actor, s = ((d = this.getSheetTokenDocument) == null ? void 0 : d.call(this)) ?? z.getCurrentSceneTokenDocument(r) ?? z.getCurrentSceneTokenDocument(this.actor);
    await as({ weapon: n, event: t, token: s }) && C(this, D, Oe).call(this, { force: !0 });
  }
};
$t = new WeakMap(), Ii = new WeakMap(), Ji = new WeakMap(), Wt = new WeakMap(), Da = new WeakMap(), Di = new WeakMap(), D = new WeakSet(), Qm = function() {
  if (H(this, Di) !== null) return;
  const t = this.actor.uuid;
  Ee(this, Di, Hooks.on("updateActor", (i) => {
    var n, r;
    i.type !== "battlemech" && i.type !== "vehicle" || String(((r = (n = i.system) == null ? void 0 : n.pilot) == null ? void 0 : r.uuid) ?? "").trim() === t && this.render();
  }));
}, Jm = function() {
  C(this, D, So).call(this), H(this, $t) && (Ee(this, Ii, (t) => {
    var r;
    const i = this._getRootElement();
    if (!i) return;
    const n = t.target;
    if (n instanceof Node && !((r = n.closest) != null && r.call(n, ".mwd-combat-menu"))) {
      if (!i.contains(n)) {
        C(this, D, Ut).call(this);
        return;
      }
      C(this, D, Ut).call(this);
    }
  }), document.addEventListener("click", H(this, Ii)));
}, So = function() {
  H(this, Ii) && (document.removeEventListener("click", H(this, Ii)), Ee(this, Ii, null));
}, mr = function() {
  const t = this._getRootElement();
  return t ? t.querySelector(".mwd-scroll-area") ?? t.querySelector(".csb-tab-panels") : null;
}, Xm = function() {
  const t = C(this, D, mr).call(this);
  if (!(t instanceof HTMLElement)) {
    Ee(this, Ji, null);
    return;
  }
  Ee(this, Ji, {
    top: t.scrollTop,
    left: t.scrollLeft
  });
}, Zm = function() {
  const t = H(this, Ji);
  if (!t) return;
  const i = C(this, D, mr).call(this);
  i instanceof HTMLElement && (i.scrollTop = t.top, i.scrollLeft = t.left, requestAnimationFrame(() => {
    const n = C(this, D, mr).call(this);
    n instanceof HTMLElement && (n.scrollTop = t.top, n.scrollLeft = t.left);
  }), Ee(this, Ji, null));
}, Oe = function(t = !1) {
  C(this, D, Xm).call(this), this.render(t);
}, Ut = function({ rerender: t = !0 } = {}) {
  H(this, $t) && (Ee(this, $t, null), t && C(this, D, Oe).call(this, !1));
}, Ci = function(t, i) {
  var r, s, o, l, c, u, d, m;
  const n = String(
    ((r = t == null ? void 0 : t.dataset) == null ? void 0 : r.itemId) ?? ((l = (o = (s = t == null ? void 0 : t.closest) == null ? void 0 : s.call(t, "[data-item-id]")) == null ? void 0 : o.dataset) == null ? void 0 : l.itemId) ?? ((m = (d = (u = (c = i == null ? void 0 : i.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, "[data-item-id]")) == null ? void 0 : d.dataset) == null ? void 0 : m.itemId) ?? ""
  ).trim();
  return n ? this.actor.items.get(n) ?? null : null;
}, ef = function() {
  var n;
  const t = (n = this._getRootElement) == null ? void 0 : n.call(this);
  if (!t) return;
  C(this, D, Ao).call(this);
  const i = new AbortController();
  Ee(this, Da, i), t.addEventListener("dragstart", (r) => {
    var c, u, d;
    const s = (u = (c = r.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, "[data-weapon-attack-uuid]");
    if (!s || !t.contains(s)) return;
    const o = C(this, D, Ci).call(this, s, r), l = o ? qm(o) : null;
    if (!l) {
      r.preventDefault();
      return;
    }
    r.stopPropagation(), (d = r.dataTransfer) == null || d.setData("text/plain", JSON.stringify(l)), r.dataTransfer && (r.dataTransfer.effectAllowed = "copy");
  }, { signal: i.signal });
}, Ao = function() {
  var t;
  (t = H(this, Da)) == null || t.abort(), Ee(this, Da, null);
}, tf = async function(t) {
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
    callback: (r) => ({
      condition: String(r.find('input[name="condition"]').val() ?? "").trim(),
      scope: String(r.find('input[name="scope"]').val() ?? "").trim()
    })
  });
  return n || null;
}, af = async function(t = {}) {
  const i = String((t == null ? void 0 : t.condition) ?? "").trim(), n = String((t == null ? void 0 : t.scope) ?? "").trim(), r = `
    <div class="mwd-quick-select">
      <p><strong>Trigger:</strong> ${Ct(i || "Unspecified trigger")}</p>
      <p><strong>Scope:</strong> ${Ct(n || "Unspecified response")}</p>
    </div>`;
  return !!await Dialog.confirm({
    title: "Resolve Interrupt",
    content: r,
    yes: () => !0,
    no: () => !1
  });
}, nf = function(t) {
  return t != null && t.combatants ? typeof t.combatants.values == "function" ? Array.from(t.combatants.values()) : Array.from(t.combatants ?? []) : [];
}, rf = function(t) {
  var n;
  const i = String(((n = t == null ? void 0 : t.combatant) == null ? void 0 : n.id) ?? "").trim();
  return C(this, D, nf).call(this, t == null ? void 0 : t.combat).filter((r) => r && String(r.id ?? "").trim() !== i).map((r) => {
    var c;
    const s = ((c = r.token) == null ? void 0 : c.document) ?? r.token ?? null, o = r.actor ?? (s == null ? void 0 : s.actor) ?? null, l = String(r.name ?? (s == null ? void 0 : s.name) ?? (o == null ? void 0 : o.name) ?? "Combatant").trim() || "Combatant";
    return {
      combatantId: String(r.id ?? "").trim(),
      actorUuid: (o == null ? void 0 : o.uuid) ?? null,
      tokenUuid: (s == null ? void 0 : s.uuid) ?? null,
      name: l
    };
  }).filter((r) => r.combatantId && r.name).sort((r, s) => r.name.localeCompare(s.name));
}, sf = async function(t) {
  var s;
  const i = C(this, D, rf).call(this, t);
  if (!i.length)
    return (s = ui.notifications) == null || s.warn("No other combatants are available to assist."), null;
  const n = `
    <form class="mwd-quick-select">
      <div class="mwd-field">
        <label>Assist</label>
        <select name="combatant">
          ${i.map((o) => `<option value="${Ct(o.combatantId)}">${Ct(o.name)}</option>`).join("")}
        </select>
      </div>
    </form>`, r = await Dialog.prompt({
    title: "Assist Combatant",
    content: n,
    label: "Assist",
    callback: (o) => {
      var l;
      return String(o.find('select[name="combatant"]').val() ?? ((l = i[0]) == null ? void 0 : l.combatantId) ?? "").trim();
    }
  });
  return r ? i.find((o) => o.combatantId === r) ?? null : null;
}, of = async function({ actor: t, token: i = null, target: n = null, costLabel: r = "" } = {}) {
  const s = String((t == null ? void 0 : t.name) ?? "Ally").trim() || "Ally", o = String((n == null ? void 0 : n.name) ?? "an ally").trim() || "an ally", l = String(r ?? "").trim(), c = `
    <div class="mwd-chat-card mwd-chat-card--assist">
      <h3>Assist</h3>
      <p><strong>${Ct(s)}</strong> assists <strong>${Ct(o)}</strong>.</p>
      ${l ? `<p><small>Cost: ${Ct(l)}</small></p>` : ""}
    </div>`;
  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor: t, token: (i == null ? void 0 : i.object) ?? i }),
    content: c
  });
}, lf = async function({ actor: t, token: i = null, preparedInterrupt: n = null, costLabel: r = "" } = {}) {
  const s = String((t == null ? void 0 : t.name) ?? "Combatant").trim() || "Combatant", o = String((n == null ? void 0 : n.condition) ?? "").trim(), l = String((n == null ? void 0 : n.scope) ?? "").trim(), c = String(r ?? "").trim(), u = `
    <div class="mwd-chat-card mwd-chat-card--interrupt">
      <h3>Interrupt</h3>
      <p><strong>${Ct(s)}</strong> resolves a prepared interrupt.</p>
      ${o ? `<p><strong>Trigger:</strong> ${Ct(o)}</p>` : ""}
      ${l ? `<p><strong>Scope:</strong> ${Ct(l)}</p>` : ""}
      ${c ? `<p><small>Cost: ${Ct(c)}</small></p>` : ""}
    </div>`;
  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor: t, token: (i == null ? void 0 : i.object) ?? i }),
    content: u
  });
}, jt = function(t, i, n = "That action is not available right now.") {
  var o, l, c, u, d;
  const r = ((o = t == null ? void 0 : t.closest) == null ? void 0 : o.call(t, "[data-action-disabled='true']")) ?? ((c = (l = i == null ? void 0 : i.target) == null ? void 0 : l.closest) == null ? void 0 : c.call(l, "[data-action-disabled='true']"));
  if (!r) return !1;
  const s = String(((u = r.dataset) == null ? void 0 : u.actionReason) ?? n).trim() || n;
  return (d = ui.notifications) == null || d.warn(s), !0;
}, ka = function(t, i) {
  return `${String(t ?? "").trim()}:${String(i ?? "").trim()}`;
}, O(fe, "PARTS", {
  sheet: {
    get template() {
      return `${ee}/v2/actor/character-sheet.hbs`;
    }
  }
}), O(fe, "DEFAULT_OPTIONS", foundry.utils.mergeObject(Xt(fe, fe, "DEFAULT_OPTIONS"), {
  classes: ["character-sheet", T, "actor-sheet-v2", "mwd-character-sheet", "mwd-sheet"],
  window: { minWidth: 450, minHeight: 740, resizable: !0 },
  position: { width: 980, height: 900 },
  actions: {
    ...Xt(fe, fe, "DEFAULT_OPTIONS").actions,
    edgeSet: fe.prototype._onEdgeSet,
    toggleCombatMenu: fe.prototype._onToggleCombatMenu,
    toggleStatuses: fe.prototype._onToggleStatuses,
    combatAction: fe.prototype._onCombatAction,
    combatSpend: fe.prototype._onCombatSpend,
    combatAssist: fe.prototype._onCombatAssist,
    combatEvade: fe.prototype._onCombatEvade,
    combatInterrupt: fe.prototype._onCombatInterrupt,
    combatReduceBurn: fe.prototype._onCombatReduceBurn,
    combatOverloadCheck: fe.prototype._onCombatOverloadCheck,
    combatAttack: fe.prototype._onCombatAttack,
    createOwnedItem: fe.prototype._onCreateOwnedItem,
    addSkillSpecialization: fe.prototype._onAddSkillSpecialization,
    removeSkillSpecialization: fe.prototype._onRemoveSkillSpecialization,
    createLifeModuleItem: fe.prototype._onCreateLifeModuleItem,
    editOwnedItem: fe.prototype._onEditOwnedItem,
    deleteOwnedItem: fe.prototype._onDeleteOwnedItem,
    toggleInventoryAccordion: fe.prototype._onToggleInventoryAccordion,
    toggleOwnedItemEquipped: fe.prototype._onToggleOwnedItemEquipped,
    setOwnedItemPrimary: fe.prototype._onSetOwnedItemPrimary,
    adjustGearQuantity: fe.prototype._onAdjustGearQuantity,
    attackWeapon: fe.prototype._onAttackWeapon,
    openAssignedMech: fe.prototype._onOpenAssignedMech,
    mechAttack: fe.prototype._onMechAttack,
    mechRoll: fe.prototype._onMechRoll
  }
}, { inplace: !1 }));
let bo = fe;
function kT(a, e, t = "") {
  const i = foundry.utils.getProperty(a, e);
  return i === void 0 ? t : i;
}
function Il(a, e, t = {}) {
  const {
    document: i = null,
    type: n = "text",
    value: r = kT(i, a, n === "number" ? 0 : ""),
    displayValue: s = r,
    options: o = [],
    placeholder: l = "",
    readOnly: c = !1,
    rows: u = 4,
    help: d = ""
  } = t;
  return {
    path: a,
    label: e,
    value: r,
    displayValue: s,
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
function eu(a, e, t, i = {}) {
  return Il(e, t, { ...i, document: a, type: "text" });
}
function va(a, e, t, i = {}) {
  return Il(e, t, { ...i, document: a, type: "number" });
}
function vT(a, e, t, i = {}) {
  return Il(e, t, { ...i, document: a, type: "textarea" });
}
function MT(a, e = []) {
  return e.map(
    (t) => va(
      a,
      `system.attributes.${t.key}.value`,
      t.label
    )
  );
}
function Gn(a, {
  types: e = [],
  includeTypes: t = [],
  describe: i = (o) => "",
  supportsEquip: n = !1,
  supportsPrimary: r = !1,
  supportsAttack: s = !1
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
      supportsPrimary: r,
      supportsAttack: s && !!((d = l.isPersonalWeapon) != null && d.call(l))
    };
  });
}
class cf extends Tn {
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      classes: ["npc-sheet", T, "actor-sheet-v2"],
      position: { width: 920, height: 860 }
    }, { inplace: !1 });
  }
  async _prepareContext(e) {
    const t = await super._prepareContext(e), i = this.actor;
    return t.layout = await ua.get("npc"), t.actorSheet = {
      profileFields: [
        eu(i, "system.role", "Role / Archetype")
      ],
      attributeFields: MT(i, [
        { key: "strength", label: "Strength" },
        { key: "reflexes", label: "Reflexes" },
        { key: "intelligence", label: "Intelligence" },
        { key: "willpower", label: "Willpower" },
        { key: "charisma", label: "Charisma" },
        { key: "edge", label: "Edge" }
      ]),
      monitorFields: [
        va(i, "system.monitors.physical.value", "Physical"),
        va(i, "system.monitors.physical.max", "Physical Max"),
        va(i, "system.monitors.fatigue.value", "Fatigue"),
        va(i, "system.monitors.fatigue.max", "Fatigue Max"),
        va(i, "system.monitors.armor.value", "Armor"),
        eu(i, "system.monitors.armor.effect", "Armor Effect")
      ],
      itemCollections: {
        traits: Gn(i, {
          types: ["quality"],
          describe: (n) => {
            var r;
            return ((r = n.system) == null ? void 0 : r.category) ?? "";
          }
        }),
        weapons: Gn(i, {
          types: ["personalWeapon"],
          supportsEquip: !0,
          supportsPrimary: !0,
          describe: (n) => {
            var r, s;
            return `${((r = n.system) == null ? void 0 : r.category) ?? "ranged"} | DV ${Number(((s = n.system) == null ? void 0 : s.damage) ?? 0)}`;
          }
        }),
        assetModules: Gn(i, {
          types: ["assetModule"],
          describe: (n) => {
            var r;
            return `Level ${Number(((r = n.system) == null ? void 0 : r.level) ?? 1)}`;
          }
        }),
        inventory: Gn(i, {
          // Consumables share the same quantity-driven row contract as gear on
          // lightweight actor sheets, so we present them in one inventory list.
          types: ["gear", "consumable"],
          describe: (n) => {
            var r, s;
            return `Qty ${Number(((r = n.system) == null ? void 0 : r.quantity) ?? 1)} | Rating ${Number(((s = n.system) == null ? void 0 : s.rating) ?? 0)}`;
          }
        })
      },
      notesField: vT(i, "system.biography", "Notes", { rows: 12 })
    }, t;
  }
}
O(cf, "PARTS", {
  sheet: {
    template: `${ee}/v2/actor/npc-sheet.hbs`,
    scrollable: [".sheet-body"]
  }
});
const { ApplicationV2: CT, HandlebarsApplicationMixin: ET } = foundry.applications.api, dn = class dn extends ET(CT) {
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
  static async selectActor(e, t, i = async (r) => {
  }, n = async () => {
  }) {
    var o, l, c, u;
    const r = {
      id: `select-actor-${foundry.utils.randomID()}`,
      classes: [((u = (c = (l = (o = game.system) == null ? void 0 : o.mwd) == null ? void 0 : l.styles) == null ? void 0 : c.selectCssClass) == null ? void 0 : u.call(c)) ?? "", ...dn.DEFAULT_OPTIONS.classes].filter(Boolean),
      window: { title: e }
    };
    return new dn({ actors: t, onActorSelected: i, onCancel: n }, r).render({ force: !0 });
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
O(dn, "PARTS", {
  body: {
    template: `${ee}/dialog/select-actor.hbs`
  }
});
let To = dn;
function Xe(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function uf(a = []) {
  return a.map((e) => String(e ?? "").trim()).filter(Boolean);
}
function PT(a) {
  return String(a ?? "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
function RT(a, e = 180) {
  const t = PT(a);
  return t ? t.length <= e ? t : `${t.slice(0, Math.max(0, e - 3)).trim()}...` : "";
}
function Vi(a = "") {
  return String(a ?? "").replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim().replace(/\b\w/g, (e) => e.toUpperCase());
}
function Es(a = []) {
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
function NT(a = []) {
  return uf(a).map((e) => ({ label: e }));
}
function tu(a = []) {
  return a.filter((e) => e && e.value !== void 0 && e.value !== null && String(e.value).trim() !== "").map((e) => ({
    label: String(e.label ?? "").trim(),
    value: String(e.value ?? "").trim()
  }));
}
function IT(a = {}) {
  return ["close", "near", "far", "extreme", "max"].filter((i) => (a == null ? void 0 : a[i]) !== void 0 && (a == null ? void 0 : a[i]) !== null && String(a[i]).trim() !== "").map((i) => {
    const n = a[i];
    return i === "max" ? `Max ${Vi(n)}` : `${Vi(i)} ${Xe(n, 0)}`;
  }).join(" | ");
}
const DT = Object.freeze({
  handling: "Handling",
  system: "System",
  chassis: "Chassis",
  reliability: "Reliability"
}), iu = Object.freeze({
  mechWeapon: "BattleMech Weapon",
  vehicleWeapon: "Vehicle Weapon",
  personalWeapon: "Personal Weapon",
  assetModule: "Asset Module",
  vehicleUpgrade: "Vehicle Upgrade",
  mechEquipment: "Mech Equipment",
  gear: "Gear",
  quality: "Trait",
  skill: "Skill"
}), au = Object.freeze({
  battlemech: Object.freeze({
    artPath: "systems/mwd/img/mek/misc/repair/location_mek.png",
    mode: "silhouette",
    positions: Object.freeze({
      head: Object.freeze({ top: "9%", left: "50%" }),
      torso: Object.freeze({ top: "40%", left: "50%" }),
      arms: Object.freeze({ top: "34%", left: "18%" }),
      legs: Object.freeze({ top: "75%", left: "50%" })
    })
  }),
  vehicle: Object.freeze({
    artPath: "",
    mode: "schematic",
    positions: Object.freeze({
      front: Object.freeze({ top: "13%", left: "50%" }),
      side: Object.freeze({ top: "40%", left: "18%" }),
      turret: Object.freeze({ top: "33%", left: "50%" }),
      core: Object.freeze({ top: "57%", left: "50%" }),
      rear: Object.freeze({ top: "83%", left: "50%" }),
      rotor: Object.freeze({ top: "17%", left: "79%" })
    })
  })
});
function OT({ condition: a = 0, destroyed: e = !1, stress: t = 0 } = {}) {
  return e ? "dark-red" : Number(a ?? 0) >= 4 ? "red" : Number(a ?? 0) >= 3 ? "orange" : Number(a ?? 0) >= 2 ? "yellow" : Number(t ?? 0) > 0 ? "green" : "";
}
var Xi, Mn, wo;
const qe = class qe extends Tn {
  constructor() {
    super(...arguments);
    we(this, Mn);
    we(this, Xi, /* @__PURE__ */ new Set());
  }
  async _prepareContext(t) {
    var n, r, s, o;
    const i = await super._prepareContext(t);
    return i._mwdThemeClass = ((o = (s = (r = (n = game.system) == null ? void 0 : n.mwd) == null ? void 0 : r.styles) == null ? void 0 : s.selectCssClass) == null ? void 0 : o.call(s)) ?? "", i.layout = await ua.get(this.constructor.LAYOUT_ID ?? qe.LAYOUT_ID), i.vehicleSheet = {
      summaryStats: this._buildSummaryStats(),
      alerts: this._buildAlerts(),
      statusAction: {
        label: "Statuses",
        disabled: !this._resolveStatusToken(this.getPersistentActor() ?? this.actor),
        reason: "Statuses require a token for this actor on the current scene."
      },
      activeCrits: this._buildActiveCrits(),
      attributes: this._buildAttributeCards(),
      movement: this._buildMovementCards(),
      degradation: this._buildDegradationPanel(),
      sections: this._buildVehicleSections(),
      pilotPanel: await this._buildPilotPanel()
    }, i.conditionMonitors = this._buildConditionMonitors(), i;
  }
  async _buildPilotPanel() {
    var r, s, o;
    const t = ((r = this.getPersistentActor) == null ? void 0 : r.call(this)) ?? this.actor, i = String(((o = (s = t.system) == null ? void 0 : s.pilot) == null ? void 0 : o.uuid) ?? "").trim();
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
    var s, o;
    if (!this.isEditable) return;
    const n = (((s = game.actors) == null ? void 0 : s.contents) ?? []).filter((l) => l.type === "character");
    if (!n.length) {
      (o = ui.notifications) == null || o.warn("No character actors found in this world.");
      return;
    }
    const r = this.getPersistentActor() ?? this.actor;
    await To.selectActor(
      "Assign Pilot",
      n,
      async (l) => r.update({ "system.pilot.uuid": l.uuid })
    );
  }
  async _onRemovePilot(t, i) {
    if (!this.isEditable) return;
    await (this.getPersistentActor() ?? this.actor).update({ "system.pilot.uuid": "" });
  }
  async _onOpenPilot(t, i) {
    var o, l, c;
    const n = ((o = this.getPersistentActor) == null ? void 0 : o.call(this)) ?? this.actor, r = String(((c = (l = n.system) == null ? void 0 : l.pilot) == null ? void 0 : c.uuid) ?? "").trim();
    if (!r) return;
    const s = await fromUuid(r).catch(() => null);
    s && s.sheet.render(!0, { focus: !0 });
  }
  async _onDrop(t) {
    var n, r;
    if (!this.isEditable) return (n = super._onDrop) == null ? void 0 : n.call(this, t);
    let i;
    try {
      i = TextEditor.getDragEventData(t);
    } catch {
    }
    if ((i == null ? void 0 : i.type) === "Actor") {
      const s = await fromUuid(i.uuid).catch(() => null);
      if ((s == null ? void 0 : s.type) === "character") {
        await (this.getPersistentActor() ?? this.actor).update({ "system.pilot.uuid": s.uuid });
        return;
      }
    }
    return (r = super._onDrop) == null ? void 0 : r.call(this, t);
  }
  _buildSummaryStats() {
    var r, s, o, l, c, u, d, m, f, p;
    const t = ((r = this.actor.system) == null ? void 0 : r.attributes) ?? {}, i = ((o = (s = this.actor.system) == null ? void 0 : s.monitors) == null ? void 0 : o.structure) ?? {}, n = Mm({
      actorType: this.actor.type,
      movement: (l = this.actor.system) == null ? void 0 : l.movement,
      legacyMoves: (c = this.actor.system) == null ? void 0 : c.moves
    });
    return Es([
      { label: "Handling", value: Xe((u = t.handling) == null ? void 0 : u.value, 0), emphasis: "strong" },
      { label: "Move", parts: n },
      { label: "System", value: Xe((d = t.system) == null ? void 0 : d.value, 0) },
      { label: "Chassis", value: Xe((m = t.chassis) == null ? void 0 : m.value, 0) },
      { label: "Reliability", value: Xe(((f = t.reliability) == null ? void 0 : f.value) ?? ((p = t.condition) == null ? void 0 : p.value), 0) },
      { label: "Structure", value: `${Xe(i.value, 0)} / ${Xe(i.max, 0)}` }
    ]);
  }
  _buildAlerts() {
    return [];
  }
  _buildAttributeCards() {
    var i;
    const t = ((i = this.actor.system) == null ? void 0 : i.attributes) ?? {};
    return Object.entries(DT).map(([n, r]) => {
      var s;
      return {
        key: n,
        label: r,
        value: Xe((s = t == null ? void 0 : t[n]) == null ? void 0 : s.value, 0),
        path: `system.attributes.${n}.value`
      };
    });
  }
  _buildMovementCards() {
    var t, i;
    return vm({
      actorType: this.actor.type,
      movement: (t = this.actor.system) == null ? void 0 : t.movement,
      legacyMoves: (i = this.actor.system) == null ? void 0 : i.moves,
      editing: this.editing
    });
  }
  _buildDegradationPanel() {
    var f, p, h, g;
    const t = On(
      foundry.utils.deepClone(this.actor.system ?? {}),
      this.actor.type
    ), i = t.attributes ?? {}, n = t.mwd ?? {}, r = Xe(((f = i.reliability) == null ? void 0 : f.value) ?? ((p = i.condition) == null ? void 0 : p.value), 0), s = sm(r), o = Xe((h = n.shock) == null ? void 0 : h.value, 0), l = Xe((g = n.reliabilitySpendable) == null ? void 0 : g.value, r), c = au[this.actor.type] ?? au.vehicle, u = Ky(this.actor.type), m = Object.entries(n.locations ?? {}).sort(([y], [b]) => {
      const S = u.indexOf(y), w = u.indexOf(b), k = S >= 0 ? S : Number.MAX_SAFE_INTEGER, P = w >= 0 ? w : Number.MAX_SAFE_INTEGER;
      return k !== P ? k - P : String(y).localeCompare(String(b));
    }).map(([y, b]) => {
      const S = Xe(b == null ? void 0 : b.condition, 0), w = Xe(b == null ? void 0 : b.stress, 0), k = !!(b != null && b.destroyed), P = OT({ condition: S, destroyed: k, stress: w }), E = c.positions[y] ?? { top: "50%", left: "50%" };
      return {
        key: y,
        label: An(y),
        stress: w,
        conditionValue: S,
        conditionLabel: om(S),
        conditionModifier: lm(S),
        destroyed: k,
        enabled: (b == null ? void 0 : b.enabled) !== !1,
        tone: P,
        style: `--pin-top:${E.top}; --pin-left:${E.left};`,
        stressLabel: w > 0 ? `Stress ${w}` : "Stress 0"
      };
    });
    return {
      mode: c.mode,
      artPath: c.artPath,
      reliability: r,
      spendable: l,
      shock: o,
      threshold: s,
      locations: m
    };
  }
  _buildConditionMonitors() {
    var i, n, r, s, o;
    const t = ((n = (i = this.actor.system) == null ? void 0 : i.monitors) == null ? void 0 : n.structure) ?? ((o = (s = (r = this.actor.system) == null ? void 0 : r.mwd) == null ? void 0 : s.monitors) == null ? void 0 : o.structure) ?? {};
    return [
      yo({ id: "structure", label: "Structure", kind: "structure", monitor: t, editable: this.isEditable })
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
  _buildRecordSection({ sectionId: t = "", itemType: i = "", addLabel: n = "", emptyLabel: r = "", items: s = [] } = {}) {
    return {
      sectionId: t,
      itemType: i,
      addLabel: String(n ?? "").trim(),
      emptyLabel: String(r ?? "Nothing here yet.").trim(),
      records: Array.from(s ?? []).map((o) => this._buildItemRecord(o, { sectionId: t }))
    };
  }
  _buildItemRecord(t, { sectionId: i = "" } = {}) {
    var f, p, h;
    const n = (t == null ? void 0 : t.system) ?? {}, r = (t == null ? void 0 : t.canonicalType) ?? (t == null ? void 0 : t.type) ?? "", s = typeof (t == null ? void 0 : t.getCombatProfile) == "function" ? t.getCombatProfile() : null, o = `${String(i ?? "").trim()}:${String((t == null ? void 0 : t.id) ?? "").trim()}`, l = iu[r] ?? Vi(r || "item"), c = n.notes ?? n.description ?? ((f = n.references) == null ? void 0 : f.description) ?? "", u = n.quantity, d = Es(s ? [
      { label: "DV", value: Xe(s.damage, 0), emphasis: "strong" },
      { label: "AP", value: Xe(s.ap, 0) },
      { label: "Type", value: s.damageTypeLabel ?? s.damageType ?? "" }
    ] : [
      { label: "Type", value: l },
      ...u !== void 0 ? [{ label: "Qty", value: Xe(u, 0) }] : []
    ]), m = tu(s ? [
      { label: "Skill", value: ((p = s.skillDef) == null ? void 0 : p.label) ?? s.skill ?? "" },
      { label: "Category", value: s.category ?? n.weaponCategory ?? n.category ?? "" },
      { label: "Range", value: IT(s.range) }
    ] : [
      { label: "Category", value: n.category ?? l },
      { label: "Quantity", value: u !== void 0 ? Xe(u, 0) : "" }
    ]);
    return {
      id: (t == null ? void 0 : t.id) ?? "",
      accordionId: o,
      isExpanded: H(this, Xi).has(o),
      name: (t == null ? void 0 : t.name) ?? l,
      img: (t == null ? void 0 : t.img) ?? "icons/svg/item-bag.svg",
      subtitle: ((h = s == null ? void 0 : s.skillDef) == null ? void 0 : h.label) ?? n.category ?? l,
      summaryStats: d,
      detailTags: NT([
        n.equipped ? "Equipped" : "",
        n.isPrimary ? "Primary" : "",
        n.weaponCategory ?? n.category ?? ""
      ]),
      detailRows: m,
      detailText: RT(c),
      equipped: !!n.equipped,
      isPrimary: !!n.isPrimary,
      canAdjustQuantity: !1,
      machineAttack: ["mechWeapon", "vehicleWeapon"].includes(r) ? {
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
    const r = this.getPersistentActor() ?? this.actor, s = iu[n] ?? Vi(n), o = r.items.filter((d) => d.type === n).length;
    await r.createEmbeddedDocuments("Item", [{
      name: `${s} ${o + 1}`,
      type: n
    }]), this.render({ force: !0 });
  }
  async _onEditOwnedItem(t, i) {
    var r, s, o;
    (r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (s = t == null ? void 0 : t.stopPropagation) == null || s.call(t);
    const n = C(this, Mn, wo).call(this, i, t);
    (o = n == null ? void 0 : n.sheet) == null || o.render(!0);
  }
  async _onDeleteOwnedItem(t, i) {
    var s, o;
    if ((s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const n = C(this, Mn, wo).call(this, i, t);
    if (!n) return;
    await (this.getPersistentActor() ?? this.actor).deleteEmbeddedDocuments("Item", [n.id]), this.render({ force: !0 });
  }
  async _onToggleInventoryAccordion(t, i) {
    var r, s, o, l, c, u, d, m, f, p;
    (r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (s = t == null ? void 0 : t.stopPropagation) == null || s.call(t);
    const n = String(
      ((o = i == null ? void 0 : i.dataset) == null ? void 0 : o.accordionId) ?? ((u = (c = (l = i == null ? void 0 : i.closest) == null ? void 0 : l.call(i, "[data-accordion-id]")) == null ? void 0 : c.dataset) == null ? void 0 : u.accordionId) ?? ((p = (f = (m = (d = t == null ? void 0 : t.target) == null ? void 0 : d.closest) == null ? void 0 : m.call(d, "[data-accordion-id]")) == null ? void 0 : f.dataset) == null ? void 0 : p.accordionId) ?? ""
    ).trim();
    n && (H(this, Xi).has(n) ? H(this, Xi).delete(n) : H(this, Xi).add(n), this.render({ force: !1 }));
  }
  _buildActiveCrits() {
    var r;
    const t = ((r = this.getPersistentActor) == null ? void 0 : r.call(this)) ?? this.actor, i = this._buildDegradationPanel(), n = new Map((i.locations ?? []).map((s) => [s.key, s]));
    return Sm(t).map((s) => {
      var m;
      const o = In(s.remedyKey), l = n.get(String(s.locationKey ?? "").trim()) ?? null, c = String(s.remedySkillKey ?? o.skillKey ?? "").trim(), u = ((m = Dt(c)) == null ? void 0 : m.label) ?? Vi(c), d = Xe(s.remedyBaseDn ?? o.baseDn, 0) + Xe((l == null ? void 0 : l.conditionModifier) ?? 0, 0);
      return {
        id: s.id,
        label: s.label ?? Vi(s.key),
        locationLabel: s.locationLabel ?? Vi(s.locationKey),
        detail: uf([
          Array.isArray(s.gates) && s.gates.length ? `Gates: ${s.gates.join(", ")}` : "",
          Array.isArray(s.mods) && s.mods.length ? `Mods: ${s.mods.join(", ")}` : "",
          s.escalationKey ? `Escalates: ${s.escalationKey}` : ""
        ]).join(" | "),
        remedyLabel: o.label,
        remedySummary: u ? `Reliability + ${u} vs DN ${d}${l ? ` (${l.conditionLabel})` : ""}` : "",
        remedyKey: o.key,
        remediable: o.remediable !== !1,
        machineActorUuid: (t == null ? void 0 : t.uuid) ?? ""
      };
    });
  }
  async _onToggleStatuses(t, i) {
    var s, o, l, c, u, d;
    if ((s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), ((l = i == null ? void 0 : i.dataset) == null ? void 0 : l.actionDisabled) === "true")
      return (u = ui.notifications) == null || u.warn(((c = i == null ? void 0 : i.dataset) == null ? void 0 : c.actionReason) || "Statuses are not available right now."), !1;
    const n = this.getPersistentActor() ?? this.actor, r = this._resolveStatusToken(n);
    return r ? fd({
      actor: n,
      token: r
    }) : ((d = ui.notifications) == null || d.warn("Statuses require a token for this actor on the current scene."), !1);
  }
  async _onMachineWeaponAttack(t, i) {
    var u, d, m, f, p, h, g, y, b, S, w, k;
    (u = t == null ? void 0 : t.preventDefault) == null || u.call(t), (d = t == null ? void 0 : t.stopPropagation) == null || d.call(t);
    const n = this.getPersistentActor() ?? this.actor, r = String(((m = i == null ? void 0 : i.dataset) == null ? void 0 : m.itemId) ?? "").trim(), s = r ? (p = (f = n.items) == null ? void 0 : f.get) == null ? void 0 : p.call(f, r) : null;
    if (!s)
      return (h = ui.notifications) == null || h.warn("That weapon is no longer available."), !1;
    const o = ((g = game.mwd) == null ? void 0 : g.roll) ?? ((b = (y = game.system) == null ? void 0 : y.mwd) == null ? void 0 : b.roll);
    if (!(o != null && o.execute))
      return (S = ui.notifications) == null || S.error("MWD roll system not initialized."), !1;
    const l = this._resolveStatusToken(n), c = await o.execute({
      actor: n,
      payload: {
        intent: "attack",
        weaponId: s.id,
        edge: { pool: "physical.grit", allowed: ["pre", "post"] },
        tags: ["combat", "attack", "machine"],
        sourceTokenId: (l == null ? void 0 : l.id) ?? null
      },
      event: t
    });
    if (c) {
      const P = ((w = z.getSnapshot) == null ? void 0 : w.call(z, n, { token: l })) ?? null;
      if (P != null && P.hasCombatant) {
        const E = await z.spendResource(n, {
          token: l,
          resource: "sa",
          cost: 2,
          actionId: "attack",
          actionLabel: "Attack",
          actionCostLabel: "2 SA",
          actionCategory: "complex"
        });
        E != null && E.ok || (k = ui.notifications) == null || k.warn((E == null ? void 0 : E.reason) ?? "Unable to record attack action.");
      }
    }
    return !!c;
  }
  async _onMachineCritRemedy(t, i) {
    var o, l, c, u, d, m, f, p, h, g, y;
    (o = t == null ? void 0 : t.preventDefault) == null || o.call(t), (l = t == null ? void 0 : t.stopPropagation) == null || l.call(t);
    const n = this.getPersistentActor() ?? this.actor, r = await kl({
      machineActorUuid: ((c = i == null ? void 0 : i.dataset) == null ? void 0 : c.machineActorUuid) ?? n.uuid,
      critId: ((u = i == null ? void 0 : i.dataset) == null ? void 0 : u.critId) ?? "",
      remedyKey: ((d = i == null ? void 0 : i.dataset) == null ? void 0 : d.remedyKey) ?? ""
    }, {
      gmOverride: !!((m = game.user) != null && m.isGM)
    });
    if (!r.ok)
      return (f = ui.notifications) == null || f.warn(r.reason ?? "Unable to launch that machine remedy."), !1;
    const s = ((p = game.mwd) == null ? void 0 : p.roll) ?? ((g = (h = game.system) == null ? void 0 : h.mwd) == null ? void 0 : g.roll);
    return s != null && s.execute ? (await s.execute({
      actor: r.actor,
      payload: r.payload,
      event: t
    }), !0) : ((y = ui.notifications) == null || y.error("MWD roll system not initialized."), !1);
  }
  _resolveStatusToken(t = this.actor) {
    var i, n, r, s, o, l, c, u, d;
    return ((i = this.getSheetTokenDocument) == null ? void 0 : i.call(this)) ?? ((n = t == null ? void 0 : t.token) == null ? void 0 : n.document) ?? (t == null ? void 0 : t.token) ?? ((o = (s = (r = t == null ? void 0 : t.getActiveTokens) == null ? void 0 : r.call(t, !0, !0)) == null ? void 0 : s[0]) == null ? void 0 : o.document) ?? ((c = (l = t == null ? void 0 : t.getActiveTokens) == null ? void 0 : l.call(t, !0, !0)) == null ? void 0 : c[0]) ?? ((d = Array.from(((u = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : u.placeables) ?? []).find((m) => {
      var f;
      return ((f = m == null ? void 0 : m.actor) == null ? void 0 : f.id) && m.actor.id === (t == null ? void 0 : t.id);
    })) == null ? void 0 : d.document) ?? null;
  }
};
Xi = new WeakMap(), Mn = new WeakSet(), wo = function(t, i) {
  var r, s, o, l, c, u, d, m;
  const n = String(
    ((r = t == null ? void 0 : t.dataset) == null ? void 0 : r.itemId) ?? ((l = (o = (s = t == null ? void 0 : t.closest) == null ? void 0 : s.call(t, "[data-item-id]")) == null ? void 0 : o.dataset) == null ? void 0 : l.itemId) ?? ((m = (d = (u = (c = i == null ? void 0 : i.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, "[data-item-id]")) == null ? void 0 : d.dataset) == null ? void 0 : m.itemId) ?? ""
  ).trim();
  return n ? this.actor.items.get(n) ?? null : null;
}, O(qe, "LAYOUT_ID", "vehicle"), O(qe, "PARTS", {
  sheet: {
    get template() {
      return `${ee}/v2/actor/vehicle-sheet.hbs`;
    }
  }
}), O(qe, "DEFAULT_OPTIONS", foundry.utils.mergeObject(Xt(qe, qe, "DEFAULT_OPTIONS"), {
  classes: ["vehicle-sheet", T, "actor-sheet-v2", "mwd-vehicle-sheet", "mwd-sheet"],
  window: { minWidth: 520, minHeight: 720, resizable: !0 },
  position: { width: 940, height: 900 },
  actions: {
    ...Xt(qe, qe, "DEFAULT_OPTIONS").actions,
    createOwnedItem: qe.prototype._onCreateOwnedItem,
    editOwnedItem: qe.prototype._onEditOwnedItem,
    deleteOwnedItem: qe.prototype._onDeleteOwnedItem,
    toggleInventoryAccordion: qe.prototype._onToggleInventoryAccordion,
    machineWeaponAttack: qe.prototype._onMachineWeaponAttack,
    toggleStatuses: qe.prototype._onToggleStatuses,
    machineCritRemedy: qe.prototype._onMachineCritRemedy,
    assignPilot: qe.prototype._onAssignPilot,
    removePilot: qe.prototype._onRemovePilot,
    openPilot: qe.prototype._onOpenPilot
  }
}, { inplace: !1 }));
let Cr = qe;
function St(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function df(a = []) {
  return a.map((e) => String(e ?? "").trim()).filter(Boolean);
}
function ii(a = "") {
  return String(a ?? "").replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim().replace(/\b\w/g, (e) => e.toUpperCase());
}
function Ps(a = []) {
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
function nu(a = []) {
  return df(a).map((e) => ({ label: e }));
}
function ru(a = []) {
  return a.filter((e) => e && e.value !== void 0 && e.value !== null && String(e.value).trim() !== "").map((e) => ({
    label: String(e.label ?? "").trim(),
    value: String(e.value ?? "").trim()
  }));
}
function Sa(a = "") {
  var t, i;
  const e = ((i = (t = v == null ? void 0 : v.actor) == null ? void 0 : t.vehicle) == null ? void 0 : i.quickActions) ?? {};
  return String((e == null ? void 0 : e[a]) ?? ii(a)).trim() || ii(a);
}
var Cn, vo;
const Ht = class Ht extends Cr {
  constructor() {
    super(...arguments);
    we(this, Cn);
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
    var r, s, o, l;
    const t = St((s = (r = this.actor.system) == null ? void 0 : r.mwd) == null ? void 0 : s.tonnage, 0), i = ((l = (o = this.actor.system) == null ? void 0 : o.mwd) == null ? void 0 : l.weightClass) ?? "medium", n = { light: "Light", medium: "Medium", heavy: "Heavy", assault: "Assault" };
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
        displayValue: n[i] ?? ii(i),
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
    var n, r, s, o;
    const t = ((r = (n = this.actor.system) == null ? void 0 : n.monitors) == null ? void 0 : r.structure) ?? {}, i = ((o = (s = this.actor.system) == null ? void 0 : s.monitors) == null ? void 0 : o.armor) ?? {};
    return [
      yo({ id: "structure", label: "Structure", kind: "structure", monitor: t, editable: this.isEditable }),
      yo({ id: "armor", label: "Armor", kind: "armor", monitor: i, editable: this.isEditable })
    ];
  }
  _buildSummaryStats() {
    var p, h, g, y, b, S, w, k, P, E, x, K, q, j, W, _;
    const t = ((h = (p = this.actor.system) == null ? void 0 : p.monitors) == null ? void 0 : h.armor) ?? {}, i = ((y = (g = this.actor.system) == null ? void 0 : g.monitors) == null ? void 0 : y.structure) ?? {}, n = ((S = (b = this.actor.system) == null ? void 0 : b.monitors) == null ? void 0 : S.heat) ?? {}, r = ((k = (w = this.actor.system) == null ? void 0 : w.mwd) == null ? void 0 : k.heat) ?? {}, s = Math.max(0, St(n.value ?? r.current, 0)), o = Math.max(0, St(n.max ?? r.max ?? r.hardMax, 0)), l = kr(r.thresholds ?? {}, o), c = lo(oo(s, l, o)), u = c.toUpperCase(), d = oA({ armor: t, structure: i }), m = Bm(((E = (P = this.actor.system) == null ? void 0 : P.mwd) == null ? void 0 : E.crits) ?? []), f = Mm({
      actorType: this.actor.type,
      movement: (x = this.actor.system) == null ? void 0 : x.movement,
      legacyMoves: (K = this.actor.system) == null ? void 0 : K.moves
    });
    return Ps([
      { label: "Weight", value: ii(((j = (q = this.actor.system) == null ? void 0 : q.mwd) == null ? void 0 : j.weightClass) ?? "medium"), emphasis: "strong" },
      { label: "Move", parts: f },
      { label: "Tonnage", value: St((_ = (W = this.actor.system) == null ? void 0 : W.mwd) == null ? void 0 : _.tonnage, 0) },
      { label: "Integrity", parts: d.parts, title: d.title },
      { label: "Heat", value: `${s} / ${o} ${u}`, title: c },
      { label: "Status", value: m.value, title: m.title, tone: m.count > 0 ? "red" : "" }
    ]);
  }
  _buildAlerts() {
    var i, n;
    const t = ((n = (i = this.actor.system) == null ? void 0 : i.mwd) == null ? void 0 : n.loadout) ?? {};
    return [
      ...Array.isArray(t.errors) ? t.errors.map((r) => ({ tone: "danger", text: r })) : [],
      ...Array.isArray(t.warnings) ? t.warnings.map((r) => ({ tone: "warning", text: r })) : []
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
    const t = ((c = (l = this.actor.system) == null ? void 0 : l.monitors) == null ? void 0 : c.heat) ?? {}, i = ((d = (u = this.actor.system) == null ? void 0 : u.mwd) == null ? void 0 : d.heat) ?? {}, n = Math.max(0, St(t.value ?? i.current, 0)), r = Math.max(0, St(t.max ?? i.max ?? i.hardMax, 0)), s = kr(i.thresholds ?? {}, r), o = oo(n, s, r);
    return {
      label: "Heat",
      current: n,
      max: r,
      editable: !!this.isEditable,
      status: lo(o),
      thresholds: {
        runningHot: St(s.runningHot, 0),
        overheated: St(s.overheated, 0),
        shutdown: St(s.shutdown, 0),
        hot: St(s.hot, 0),
        overheat: St(s.overheat, 0),
        danger: St(s.danger, 0)
      },
      segments: Array.from({ length: r }, (m, f) => {
        const p = f + 1;
        return {
          value: p,
          filled: p <= n,
          breakpoint: df([
            p === St(s.runningHot, 0) ? "runningHot" : "",
            p === St(s.overheated, 0) ? "overheated" : "",
            p === St(s.shutdown, 0) ? "shutdown" : ""
          ]).join(" ")
        };
      })
    };
  }
  _buildQuickActions() {
    var s, o, l;
    const t = ((s = this.actor.system) == null ? void 0 : s.quickActions) ?? {}, i = t.primaryWeaponGroup ?? null, n = Array.isArray((o = this.actor.system) == null ? void 0 : o.weaponGroups) && this.actor.system.weaponGroups.length > 0, r = Array.isArray((l = this.actor.system) == null ? void 0 : l.meleeProfiles) && this.actor.system.meleeProfiles.length > 0;
    return [
      {
        label: Sa("primaryWeapons"),
        hint: (i == null ? void 0 : i.name) ?? "Primary weapon group",
        handler: "mechAttack",
        disabled: !i,
        dataset: { attackKind: "primary" }
      },
      {
        label: Sa("rangedAttack"),
        hint: "Prompt for a weapon group",
        handler: "mechAttack",
        disabled: !n,
        dataset: { attackKind: "ranged" }
      },
      {
        label: Sa("meleeAttack"),
        hint: "Prompt for a melee profile",
        handler: "mechAttack",
        disabled: !r,
        dataset: { attackKind: "melee" }
      },
      {
        label: Sa("pilotingCheck"),
        hint: "Vehicle handling test",
        handler: "mechRoll",
        disabled: !1,
        dataset: { rollKind: "piloting" }
      },
      {
        label: Sa("sensorSweep"),
        hint: "Perception or technician",
        handler: "mechRoll",
        disabled: !t.hasSensorSweep,
        dataset: { rollKind: "sensor" }
      },
      {
        label: Sa("emergencyRepair"),
        hint: "Technician quick check",
        handler: "mechRoll",
        disabled: !1,
        dataset: { rollKind: "repair" }
      }
    ];
  }
  _buildWeaponGroups() {
    var i, n;
    return (Array.isArray((n = (i = this.actor.system) == null ? void 0 : i.mwd) == null ? void 0 : n.weaponGroupDetails) ? this.actor.system.mwd.weaponGroupDetails : []).map((r) => ({
      id: r.id,
      name: r.name,
      subtitle: (r.weapons ?? []).map((s) => s.name).join(", "),
      summaryStats: Ps([
        { label: "Weapons", value: Array.isArray(r.weapons) ? r.weapons.length : 0, emphasis: "strong" },
        { label: "Missing", value: Array.isArray(r.missingWeaponIds) ? r.missingWeaponIds.length : 0 }
      ]),
      detailTags: nu([
        r.isPrimary ? "Primary" : "",
        ...Array.isArray(r.weapons) ? r.weapons.map((s) => {
          var o;
          return ((o = s.system) == null ? void 0 : o.weaponCategory) ?? "";
        }) : []
      ]),
      detailRows: ru([
        { label: "Weapon Names", value: (r.weapons ?? []).map((s) => s.name).join(", ") },
        { label: "Missing IDs", value: (r.missingWeaponIds ?? []).join(", ") }
      ]),
      action: {
        label: "Attack Group",
        dataset: {
          attackKind: "group",
          groupId: r.id
        }
      }
    }));
  }
  _buildHardpoints() {
    var s, o, l, c, u;
    const t = ((o = (s = this.actor.system) == null ? void 0 : s.mwd) == null ? void 0 : o.loadout) ?? {}, i = ((l = v == null ? void 0 : v.mwd) == null ? void 0 : l.hardpointType) ?? {}, n = ((c = v == null ? void 0 : v.mwd) == null ? void 0 : c.hardpointSize) ?? {}, r = ((u = v == null ? void 0 : v.mwd) == null ? void 0 : u.hardpointLocation) ?? {};
    return Array.from(t.hardpoints ?? []).map((d) => ({
      id: d.id,
      name: `${i[d.type] ?? ii(d.type)} ${n[d.size] ?? ii(d.size)}`,
      subtitle: r[d.location] ?? ii(d.location),
      summaryStats: Ps([
        { label: "Type", value: i[d.type] ?? ii(d.type), emphasis: "strong" },
        { label: "Size", value: n[d.size] ?? ii(d.size) }
      ]),
      detailTags: nu([
        d.occupiedByName ? `Occupied by ${d.occupiedByName}` : "Open"
      ]),
      detailRows: ru([
        { label: "Location", value: r[d.location] ?? ii(d.location) },
        { label: "Assigned Group", value: d.occupiedByName ?? "Unassigned" }
      ])
    }));
  }
  async _onMechAttack(t, i) {
    var o, l, c, u, d, m, f, p;
    (o = t == null ? void 0 : t.preventDefault) == null || o.call(t), (l = t == null ? void 0 : t.stopPropagation) == null || l.call(t);
    const n = this.getPersistentActor() ?? this.actor, r = String(((c = i == null ? void 0 : i.dataset) == null ? void 0 : c.attackKind) ?? "").trim(), s = String(((u = i == null ? void 0 : i.dataset) == null ? void 0 : u.groupId) ?? "").trim();
    try {
      if (r === "group" && s)
        await C(this, Cn, vo).call(this, n, s);
      else if (r === "primary") {
        const h = (((d = n.system) == null ? void 0 : d.weaponGroups) ?? []).find((g) => g == null ? void 0 : g.isPrimary) ?? null;
        h != null && h.id ? await C(this, Cn, vo).call(this, n, h.id) : await ((m = n.rollRangedAttack) == null ? void 0 : m.call(n));
      } else r === "melee" ? await ((f = n.rollMeleeAttack) == null ? void 0 : f.call(n)) : await ((p = n.rollRangedAttack) == null ? void 0 : p.call(n));
    } catch (h) {
      console.error("MWD | Failed to launch BattleMech attack", h), ia(h, "Unable to launch that BattleMech attack.");
    }
  }
  async _onMechRoll(t, i) {
    var s, o, l, c, u, d;
    (s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t);
    const n = this.getPersistentActor() ?? this.actor, r = String(((l = i == null ? void 0 : i.dataset) == null ? void 0 : l.rollKind) ?? "").trim();
    try {
      r === "piloting" ? await ((c = n.rollPilotingCheck) == null ? void 0 : c.call(n)) : r === "sensor" ? await ((u = n.rollSensorSweep) == null ? void 0 : u.call(n)) : r === "repair" && await ((d = n.rollEmergencyRepair) == null ? void 0 : d.call(n));
    } catch (m) {
      console.error("MWD | Failed to launch BattleMech check", m), ia(m, "Unable to launch that BattleMech check.");
    }
  }
};
Cn = new WeakSet(), vo = async function(t, i) {
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
  const s = ((m = game.mwd) == null ? void 0 : m.roll) ?? ((p = (f = game.system) == null ? void 0 : f.mwd) == null ? void 0 : p.roll);
  if (!(s != null && s.execute)) {
    await ((h = t.rollRangedAttack) == null ? void 0 : h.call(t));
    return;
  }
  const o = this._resolveStatusToken(t);
  if (await s.execute({
    actor: t,
    payload: {
      intent: "attack",
      weaponGroupId: n.id,
      edge: { pool: "physical.grit", allowed: ["pre", "post"] },
      tags: ["combat", "attack", "machine", "groupFire"],
      sourceTokenId: (o == null ? void 0 : o.id) ?? null
    }
  })) {
    const b = ((g = z.getSnapshot) == null ? void 0 : g.call(z, t, { token: o })) ?? null;
    if (b != null && b.hasCombatant) {
      const S = await z.spendResource(t, {
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
}, O(Ht, "LAYOUT_ID", "battlemech"), O(Ht, "PARTS", {
  sheet: {
    get template() {
      return `${ee}/v2/actor/battlemech-sheet.hbs`;
    }
  }
}), O(Ht, "DEFAULT_OPTIONS", foundry.utils.mergeObject(Xt(Ht, Ht, "DEFAULT_OPTIONS"), {
  classes: ["battlemech-sheet", T, "actor-sheet-v2", "mwd-battlemech-sheet", "mwd-sheet"],
  position: { width: 980, height: 940 },
  actions: {
    ...Xt(Ht, Ht, "DEFAULT_OPTIONS").actions,
    mechAttack: Ht.prototype._onMechAttack,
    mechRoll: Ht.prototype._onMechRoll
  }
}, { inplace: !1 }));
let ko = Ht;
function LT() {
  console.log(`${Me}Registering Actor sheets (V2)`);
  const { Actors: a } = foundry.documents.collections;
  a.registerSheet(T, bo, {
    types: ["character"],
    makeDefault: !0,
    label: "Character (V2)"
  }), a.registerSheet(T, cf, {
    types: ["npc"],
    makeDefault: !0,
    label: "NPC (V2)"
  }), a.registerSheet(T, Cr, {
    types: ["vehicle"],
    makeDefault: !0,
    label: "Vehicle (V2)"
  }), a.registerSheet(T, ko, {
    types: ["battlemech"],
    makeDefault: !0,
    label: "BattleMech (V2)"
  });
}
const { HandlebarsApplicationMixin: _T } = foundry.applications.api, { HTMLField: su, StringField: xT } = foundry.data.fields, Rs = /* @__PURE__ */ new Set(["system.notes", "system.description"]), $T = /* @__PURE__ */ new Set(["name"]), BT = Object.freeze({
  [A.itemType.personalWeapon]: `${ee}/v2/item/personal-weapon-root.hbs`,
  [A.itemType.mechWeapon]: `${ee}/v2/item/mech-weapon-root.hbs`,
  [A.itemType.armor]: `${ee}/v2/item/armor-root.hbs`
});
function Ns(a, e) {
  const t = new a({ required: !1, blank: !0, initial: "" });
  return t.name = e, t;
}
function zT(a = {}) {
  return {
    ...a,
    sourceReference: a.sourceReference ?? Ns(xT, "system.sourceReference"),
    notes: a.notes ?? Ns(su, "system.notes"),
    description: a.description ?? Ns(su, "system.description")
  };
}
function FT(a = {}) {
  return Object.fromEntries(
    Object.entries(a ?? {}).filter(([, e]) => e !== void 0)
  );
}
var Zi, Oi, ea, Oa, si, ln, Mo;
const tt = class tt extends _T(foundry.applications.sheets.ItemSheetV2) {
  constructor() {
    super(...arguments);
    we(this, si);
    we(this, Zi, /* @__PURE__ */ new Map());
    we(this, Oi, /* @__PURE__ */ new Map());
    we(this, ea, null);
    we(this, Oa, /* @__PURE__ */ new Map());
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
        editImage: tt._onEditImage,
        tab: tt.prototype._onClickTab,
        accordion: tt.prototype._onClickAccordion,
        checkbarElement: tt._onClickCheckbar,
        modifierAdd: tt._onModifierAdd,
        modifierDelete: tt._onModifierDelete,
        modifierValueChange: tt._onModifierValueChange,
        modifierConditionChange: tt._onModifierConditionChange,
        modifierSelectionChange: tt._onModifierSelectionChange,
        effectCreate: tt._onEffectCreate,
        effectEdit: tt._onEffectEdit,
        effectDelete: tt._onEffectDelete,
        effectToggleDisabled: tt._onEffectToggleDisabled
      },
      form: {
        submitOnChange: !1,
        closeOnSubmit: !1,
        handler: tt.prototype._onSubmitForm
      }
    }, { inplace: !1 });
  }
  static get defaultOptions() {
    return this.DEFAULT_OPTIONS;
  }
  _initializeApplicationOptions(t) {
    var s, o, l, c;
    t = super._initializeApplicationOptions(t), t.classes = Array.from(t.classes ?? []);
    const i = this._getCanonicalItemTypeFromOptions(t);
    i && t.classes.push(String(i));
    const n = ((c = (l = (o = (s = game.system) == null ? void 0 : s.mwd) == null ? void 0 : o.styles) == null ? void 0 : l.selectCssClass) == null ? void 0 : c.call(l)) ?? "mwd-theme-default", r = ["mwd-theme-default", "mwd-theme-sra"];
    return t.classes = t.classes.filter((u) => !r.includes(u)), t.classes.push(n), t;
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
      return BT[n] ?? `${ee}/v2/item/${n}.hbs`;
    }
    return ((i = super._getPartTemplate) == null ? void 0 : i.call(this, t)) ?? "";
  }
  /**
   * Override title to show localized item type and name.
   * @override
   */
  get title() {
    const t = this._getCanonicalItemType();
    return `${$e.itemType.singular[t] ?? t}: ${this.item.name}`;
  }
  /**
   * Prepare context data for rendering.
   * @param {object} options - Rendering options
   * @returns {Promise<object>} The context object
   * @override
   */
  async _prepareContext(t) {
    var E, x, K, q, j, W, _, F, V;
    const i = await super._prepareContext(t), n = ((x = (E = game.system.mwd.modifiers) == null ? void 0 : E.getEnums) == null ? void 0 : x.call(E)) ?? {}, r = foundry.utils.deepClone((i == null ? void 0 : i.options) ?? {}), s = zT((i == null ? void 0 : i.fields) ?? ((q = (K = this.item.system) == null ? void 0 : K.schema) == null ? void 0 : q.fields) ?? {}), o = ((W = (j = this.item.actor) == null ? void 0 : j.getAttributes) == null ? void 0 : W.call(j, this.item)) ?? [], l = this._getCanonicalItemType(), c = !this.item.actor, u = !!this.item.actor, d = $e.itemType.singular[l] ?? l, m = this._getEffectEntries(), f = m.filter((Y) => Y.syncedCount > 0).length, p = this.constructor.LAYOUT_ID, h = this.item.actor ? (Y) => o.includes(Y) : (Y) => !0, g = l === A.itemType.skill, b = ["mwd", "item-sheet", this.isEditable ? "editable" : "locked"], S = b.join(" ");
    r.classes = b, r.cssClass = S;
    const w = async (Y, { secrets: te = this.item.isOwner } = {}) => foundry.applications.ux.TextEditor.implementation.enrichHTML(Y ?? "", {
      async: !0,
      secrets: te,
      relativeTo: this.item
    }), k = foundry.utils.expandObject({
      "system.notes": await w(this.item.system.notes ?? ""),
      "system.description": await w(this.item.system.description ?? "")
    }), P = {
      ...i,
      item: this.item,
      data: this.item,
      system: this.item.system,
      // AppV2 prose editors need both raw field definitions and pre-enriched
      // HTML. Keeping both here avoids template-specific enrichment branches.
      fields: s,
      enriched: k,
      enrichedDescription: ((_ = k == null ? void 0 : k.system) == null ? void 0 : _.description) ?? "",
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
      ENUMS: {
        ...ve.getEnums(h, g),
        ...n
      },
      MWD: $e,
      itemSheet: {
        canonicalType: l,
        typeLabel: d,
        isArmorSheet: l === A.itemType.armor,
        isStandalone: c,
        canUseActorControls: u,
        supportsEffectSync: !!((V = (F = this.item).supportsEquippedEffectSync) != null && V.call(F)),
        effectEntries: m,
        effectCount: m.length,
        syncedEffectCount: f,
        summaryChips: this._getSummaryChips(),
        stateChips: this._getStateChips(m)
      },
      cssClass: S,
      tabs: this._getTabs()
    };
    return p && (P.layout = await ua.get(p)), P;
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
    var n, r, s;
    const i = [];
    return i.push({ kind: "ownership", label: this.item.actor ? "Owned Item" : "World Item" }), Object.prototype.hasOwnProperty.call(this.item.system ?? {}, "equipped") && i.push({
      kind: "equipment",
      label: (n = this.item.system) != null && n.equipped ? "Equipped" : "Unequipped",
      tone: (r = this.item.system) != null && r.equipped ? "active" : "muted"
    }), Object.prototype.hasOwnProperty.call(this.item.system ?? {}, "isPrimary") && ((s = this.item.system) != null && s.isPrimary) && i.push({ kind: "role", label: "Primary", tone: "accent" }), t.length && i.push({
      kind: "effects",
      label: `${t.length} Effect${t.length === 1 ? "" : "s"}`,
      tone: t.some((o) => o.syncedCount > 0) ? "active" : "muted"
    }), i;
  }
  _getEffectEntries() {
    var n, r, s, o, l, c;
    const t = /* @__PURE__ */ new Map(), i = ((r = (n = this.item).getSyncedActorEffects) == null ? void 0 : r.call(n)) ?? [];
    for (const u of i) {
      const d = (l = (o = (s = u.flags) == null ? void 0 : s[T]) == null ? void 0 : o.equippedItemSync) == null ? void 0 : l.sourceEffectId;
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
    const r = n.closest(".csb-tabs");
    if (!r) return;
    const s = r.dataset.group || "default", o = n.dataset.tab;
    o && (H(this, Zi).set(s, o), C(this, si, ln).call(this, this._getRootElement(), s, o));
  }
  _onClickAccordion(t, i) {
    var u, d, m;
    const n = ((u = i == null ? void 0 : i.closest) == null ? void 0 : u.call(i, ".csb-accordion__trigger[data-section]")) ?? ((m = (d = t == null ? void 0 : t.target) == null ? void 0 : d.closest) == null ? void 0 : m.call(d, ".csb-accordion__trigger[data-section]"));
    if (!n) return;
    const r = n.dataset.section, s = n.closest(".csb-accordion");
    if (!s || !r) return;
    const o = s.dataset.group || "default", c = (H(this, Oi).has(o) ? H(this, Oi).get(o) : s.dataset.default || null) === r ? null : r;
    H(this, Oi).set(o, c), C(this, si, Mo).call(this, s, c);
  }
  _onRender(t, i) {
    var s, o, l, c;
    (s = super._onRender) == null || s.call(this, t, i), (o = this.window) != null && o.title && (this.window.title.textContent = this.title);
    const n = this._getRootElement();
    if (!n) return;
    const r = n.querySelector('.item-name input[name="name"]');
    r instanceof HTMLInputElement && (r.setAttribute("dir", "ltr"), r.style.direction = "ltr", r.style.unicodeBidi = "isolate", r.style.textAlign = "left", r.style.writingMode = "horizontal-tb");
    for (const u of n.querySelectorAll(".sheet-tabs")) {
      const d = u.dataset.group || "default", m = Array.from(u.querySelectorAll("[data-tab]"));
      if (!m.length) continue;
      for (const g of m)
        g.addEventListener("click", (y) => {
          y.preventDefault(), y.stopPropagation();
          const b = g.dataset.tab;
          b && (H(this, Zi).set(d, b), C(this, si, ln).call(this, n, d, b));
        });
      const f = H(this, Zi).get(d), p = u.dataset.default || ((l = m[0]) == null ? void 0 : l.dataset.tab), h = f || p;
      h && C(this, si, ln).call(this, n, d, h);
    }
    for (const u of n.querySelectorAll(".csb-tabs")) {
      const d = u.dataset.group || "default", m = Array.from(u.querySelectorAll(".csb-tab-link[data-tab]"));
      if (!m.length) continue;
      const f = H(this, Zi).get(d), p = u.dataset.default || ((c = m[0]) == null ? void 0 : c.dataset.tab), h = f || p;
      h && C(this, si, ln).call(this, n, d, h);
    }
    for (const u of n.querySelectorAll(".csb-accordion")) {
      const d = u.dataset.group || "default", m = H(this, Oi).has(d) ? H(this, Oi).get(d) : u.dataset.default || null;
      C(this, si, Mo).call(this, u, m);
    }
    for (const u of n.querySelectorAll("prose-mirror[name]")) {
      const d = u.getAttribute("name") ?? "";
      Rs.has(d) && u.addEventListener("change", (m) => {
        m.preventDefault(), m.stopPropagation(), this._updateRichTextField(u);
      });
    }
    if (this.isEditable)
      for (const u of n.querySelectorAll("input[name], select[name], textarea[name]")) {
        if (u.closest("prose-mirror") || u.hasAttribute("data-action") || !(u instanceof HTMLElement)) continue;
        const d = String(u.getAttribute("name") ?? "").trim();
        u instanceof HTMLInputElement && !$T.has(d) && !["checkbox", "radio"].includes(u.type) ? u.addEventListener("input", (m) => {
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
    var s;
    const i = String(((s = t == null ? void 0 : t.getAttribute) == null ? void 0 : s.call(t, "name")) ?? (t == null ? void 0 : t.name) ?? "");
    if (!this.isEditable || !Rs.has(i)) return;
    const n = String(t.value ?? ""), r = String(foundry.utils.getProperty(this.item, i) ?? "");
    if (n !== r)
      try {
        await this.item.update({ [i]: n });
      } catch (o) {
        console.warn("MWD | Rich text item update failed:", o);
      }
  }
  _queueNamedFieldSync(t, i = {}) {
    var o;
    if (!this.isEditable) return;
    const n = String(((o = t == null ? void 0 : t.getAttribute) == null ? void 0 : o.call(t, "name")) ?? "").trim() || foundry.utils.randomID(), r = H(this, Oa).get(n);
    r && clearTimeout(r);
    const s = setTimeout(() => {
      H(this, Oa).delete(n), this._syncNamedField(t, i);
    }, 180);
    H(this, Oa).set(n, s);
  }
  _getNamedFieldUpdate(t) {
    var r, s;
    if (!(t instanceof HTMLElement)) return null;
    const i = String(((r = t.getAttribute) == null ? void 0 : r.call(t, "name")) ?? "").trim();
    if (!i || Rs.has(i)) return null;
    if (t instanceof HTMLInputElement) {
      if (t.type === "radio" && !t.checked) return null;
      if (t.type === "checkbox") return { [i]: t.checked };
      if (t.type === "number") {
        const o = Number(t.value);
        return Number.isFinite(o) ? { [i]: o } : null;
      }
    }
    const n = String(((s = t.dataset) == null ? void 0 : s.dtype) ?? "").trim().toLowerCase();
    if (n === "number") {
      const o = Number(t.value);
      return Number.isFinite(o) ? { [i]: o } : null;
    }
    return n === "boolean" ? { [i]: t.value === "true" } : { [i]: String(t.value ?? "") };
  }
  async _syncNamedField(t, i = {}) {
    if (!this.isEditable) return;
    const n = this._getNamedFieldUpdate(t), r = FT({
      ...n ?? {},
      ...i && typeof i == "object" ? i : {}
    });
    if (Object.keys(r).length) {
      this._captureScrollPositions();
      try {
        await this.item.update(r);
      } catch (s) {
        console.warn("MWD | Item field sync failed:", { updates: r, err: s });
      }
    }
  }
  async _onSubmitForm(t, i, n, { updateData: r = null } = {}) {
    if (!this.isEditable || !(i instanceof HTMLFormElement)) return;
    this._captureScrollPositions();
    const s = this._prepareSubmitData(t, i, n, r ?? {});
    await this._processSubmitData(t, i, s);
  }
  _getScrollRestoreSelectors() {
    return [".sheet-body", ".csb-tab-panels"];
  }
  _captureScrollPositions() {
    const t = this._getRootElement();
    if (!t) {
      Ee(this, ea, null);
      return;
    }
    const i = [];
    for (const n of this._getScrollRestoreSelectors())
      t.querySelectorAll(n).forEach((r, s) => {
        r instanceof HTMLElement && i.push({
          selector: n,
          index: s,
          top: r.scrollTop,
          left: r.scrollLeft
        });
      });
    Ee(this, ea, i.length ? i : null);
  }
  _restoreScrollPositions() {
    const t = H(this, ea);
    if (!(t != null && t.length)) return;
    const i = () => {
      const n = this._getRootElement();
      if (n)
        for (const r of t) {
          const s = n.querySelectorAll(r.selector).item(r.index);
          s instanceof HTMLElement && (s.scrollTop = r.top, s.scrollLeft = r.left);
        }
    };
    i(), requestAnimationFrame(i), Ee(this, ea, null);
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
    const r = i.closest(".checkbar-root");
    if (!r) return;
    const s = r.dataset.monitorCode, o = Number.parseInt(i.dataset.index), l = i.dataset.checked === "true";
    await n.parent.switchMonitorCheck(s, o, l);
  }
  static async _onEditImage(t) {
    var r, s, o;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (s = t == null ? void 0 : t.stopPropagation) == null || s.call(t), !this.isEditable) return;
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
    const r = n.dataset.modifierId;
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
    const n = i.closest(".define-modifier");
    if (!n) return;
    const r = n.dataset.modifierId;
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
    const n = i.closest(".define-modifier");
    if (!n) return;
    const r = n.dataset.modifierId;
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
    const n = i.closest(".define-modifier");
    if (!n) return;
    const r = n.dataset.modifierId, s = i.dataset.modifierSelect;
    r && s && await this.item.changeModifierSelection(r, s, i.value);
  }
  static async _onEffectCreate(t, i) {
    var r, s, o;
    (r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (s = t == null ? void 0 : t.stopPropagation) == null || s.call(t);
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
    var s, o, l, c, u, d, m;
    (s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t);
    const n = ((l = i == null ? void 0 : i.dataset) == null ? void 0 : l.effectId) ?? ((d = (u = (c = i == null ? void 0 : i.closest) == null ? void 0 : c.call(i, "[data-effect-id]")) == null ? void 0 : u.dataset) == null ? void 0 : d.effectId);
    if (!n) return;
    const r = this.item.effects.get(n);
    (m = r == null ? void 0 : r.sheet) == null || m.render(!0);
  }
  static async _onEffectDelete(t, i) {
    var r, s, o, l, c, u;
    (r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (s = t == null ? void 0 : t.stopPropagation) == null || s.call(t);
    const n = ((o = i == null ? void 0 : i.dataset) == null ? void 0 : o.effectId) ?? ((u = (c = (l = i == null ? void 0 : i.closest) == null ? void 0 : l.call(i, "[data-effect-id]")) == null ? void 0 : c.dataset) == null ? void 0 : u.effectId);
    n && await this.item.deleteEmbeddedDocuments("ActiveEffect", [n]);
  }
  static async _onEffectToggleDisabled(t, i) {
    var s, o, l, c, u, d;
    (s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t);
    const n = ((l = i == null ? void 0 : i.dataset) == null ? void 0 : l.effectId) ?? ((d = (u = (c = i == null ? void 0 : i.closest) == null ? void 0 : c.call(i, "[data-effect-id]")) == null ? void 0 : u.dataset) == null ? void 0 : d.effectId);
    if (!n) return;
    const r = this.item.effects.get(n);
    r && await r.update({ disabled: !r.disabled });
  }
};
Zi = new WeakMap(), Oi = new WeakMap(), ea = new WeakMap(), Oa = new WeakMap(), si = new WeakSet(), ln = function(t, i, n) {
  t && (t.querySelectorAll(`.csb-tabs[data-group="${i}"] .csb-tab-link[data-tab]`).forEach((r) => {
    r.classList.toggle("is-active", r.dataset.tab === n);
  }), t.querySelectorAll(`.csb-tabs[data-group="${i}"] .csb-tab-panel[data-tab]`).forEach((r) => {
    r.classList.toggle("is-active", r.dataset.tab === n);
  }), t.querySelectorAll(".sheet-tabs [data-tab]").forEach((r) => {
    var o;
    (((o = r.closest(".sheet-tabs")) == null ? void 0 : o.dataset.group) || "default") === i && r.classList.toggle("active", r.dataset.tab === n);
  }), t.querySelectorAll(`.tab[data-group="${i}"]`).forEach((r) => {
    r.classList.toggle("active", r.dataset.tab === n);
  }));
}, Mo = function(t, i) {
  t.dataset.activeSection = i ?? "", t.querySelectorAll(".csb-accordion__section").forEach((n) => {
    const r = n.dataset.section === i;
    n.classList.toggle("is-active", r);
  }), t.querySelectorAll(".csb-accordion__trigger").forEach((n) => {
    const r = n.dataset.section === i;
    n.classList.toggle("is-active", r), n.setAttribute("aria-expanded", r ? "true" : "false");
  }), t.querySelectorAll(".csb-accordion__panel").forEach((n) => {
    const r = n.closest(".csb-accordion__section"), s = (r == null ? void 0 : r.dataset.section) === i;
    n.classList.toggle("is-active", s);
  });
}, O(tt, "LAYOUT_ID", null), /** @override */
O(tt, "PARTS", {
  sheet: {
    template: "",
    // Set dynamically in _getPartTemplate
    scrollable: [".sheet-body"]
  }
}), O(tt, "TABS", {
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
let ci = tt;
class Co extends ci {
}
O(Co, "LAYOUT_ID", "contact"), O(Co, "PARTS", {
  sheet: {
    template: `${ee}/v2/item/contact.hbs`,
    scrollable: [".sheet-body"]
  }
});
const UT = Object.freeze([
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
]), jT = Object.freeze([
  { value: "ammo", label: "Ammunition" },
  { value: "explosive", label: "Explosive" },
  { value: "medical", label: "Medical" },
  { value: "repair", label: "Repair" },
  { value: "fuel", label: "Fuel / Power Cell" },
  { value: "utility", label: "Utility" }
]);
function HT(a) {
  return a === "consumable" ? jT : UT;
}
class Eo extends ci {
  async _prepareContext(e) {
    var s;
    const t = await super._prepareContext(e), i = this._getCanonicalItemType(), n = this.item.system ?? {}, r = HT(i);
    return t.system = {
      ...n,
      quantity: Math.max(0, Math.trunc(Number(n.quantity ?? 1) || 0)),
      rating: Math.max(0, Math.trunc(Number(n.rating ?? 0) || 0)),
      category: String(n.category ?? "").trim(),
      tags: Array.isArray(n.tags) ? n.tags.map((o) => String(o ?? "").trim()).filter(Boolean) : []
    }, t.gearEditor = {
      categories: r.map((o) => ({ ...o }))
    }, t.tagsText = t.system.tags.join(", "), t.itemSheet = {
      ...t.itemSheet ?? {},
      summaryChips: [
        { label: "Qty", value: String(t.system.quantity) },
        { label: "Rating", value: String(t.system.rating) },
        {
          label: "Category",
          value: ((s = r.find((o) => o.value === t.system.category)) == null ? void 0 : s.label) ?? "Uncategorized"
        }
      ]
    }, t.layout = await ua.get(i === "consumable" ? "consumable" : "gear"), t;
  }
}
// One sheet class intentionally backs both gear and consumables so quantity,
// rating, and reference editing never drift into parallel implementations.
O(Eo, "LAYOUT_ID", null), O(Eo, "PARTS", {
  sheet: {
    template: `${ee}/v2/item/gear.hbs`,
    scrollable: [".sheet-body"]
  }
});
class Po extends ci {
  async _prepareContext(e) {
    var s, o;
    const t = await super._prepareContext(e), i = qt(this.item.system ?? {}), n = Td(), r = Array.isArray((s = t.ENUMS) == null ? void 0 : s.skills) ? t.ENUMS.skills.map((l) => ({
      value: String((l == null ? void 0 : l.value) ?? "").trim(),
      label: String((l == null ? void 0 : l.label) ?? (l == null ? void 0 : l.value) ?? "").trim()
    })).filter((l) => l.value) : [];
    return t.system = {
      ...i,
      effects: (Array.isArray(i.effects) ? i.effects : []).map((l) => ({
        ...l,
        showSkillPicker: Ad(l) || Array.isArray(l.skillKeys) && l.skillKeys.length > 0,
        isEdgeEvent: l.type === "edgeEvent"
      }))
    }, t.traitEditor = {
      ...n,
      skills: r
    }, t.itemSheet = {
      ...t.itemSheet ?? {},
      sheetClass: "mwd-item-sheet--quality",
      summaryChips: [
        { label: "Category", value: Jn(i.category) },
        { label: "Tier", value: Xn(i.tier) },
        { label: "Activation", value: String(i.activation ?? "passive").trim() || "Passive" },
        { label: "Effects", value: String(((o = i.effects) == null ? void 0 : o.length) ?? 0) }
      ]
    }, t.tagsText = Array.isArray(i.tags) ? i.tags.join(", ") : "", t;
  }
  _onRender(e, t) {
    var r, s;
    (r = super._onRender) == null || r.call(this, e, t);
    const i = (s = this._getRootElement) == null ? void 0 : s.call(this);
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
O(Po, "LAYOUT_ID", "quality"), O(Po, "PARTS", {
  sheet: {
    template: `${ee}/v2/item/quality.hbs`,
    scrollable: [".sheet-body"]
  }
});
class Ro extends ci {
}
O(Ro, "LAYOUT_ID", "asset-module"), O(Ro, "PARTS", {
  sheet: {
    template: `${ee}/v2/item/assetModule.hbs`,
    scrollable: [".sheet-body"]
  }
});
class No extends ci {
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
    const e = yn(this.item.system ?? {}), t = xi(e.catalogId), n = Jr(t, e.selectedGrants, { legacySelectedSkill: e.selectedSkill }).map((s) => s.choice).filter(Boolean).map((s) => gn(s, { includeBonusText: !0 })).join(", "), r = this.item.actor ? Bi(this.item.actor).stateByItemId.get(this.item.id) ?? null : null;
    return [
      { label: "Slot", value: Ba(e.moduleType) },
      { label: "Module", value: (t == null ? void 0 : t.label) ?? "Unlinked" },
      { label: "Bonuses", value: n || "Pending choice" },
      r ? { label: "Status", value: r.isActive ? "Active" : "Inactive" } : null
    ].filter(Boolean);
  }
  async _prepareContext(e) {
    const t = await super._prepareContext(e), i = yn(this.item.system ?? {}), n = i.moduleType, r = xi(i.catalogId), s = n ? fl(n) : [], o = Kd(r, i.selectedGrants, { legacySelectedSkill: i.selectedSkill }), l = this.item.actor ? Bi(this.item.actor).stateByItemId.get(this.item.id) ?? null : null;
    return t.lifeModuleEditor = {
      moduleType: n,
      moduleTypeLabel: Ba(n),
      moduleTypes: zd().map((c) => ({
        ...c,
        selected: c.value === n
      })),
      availableEntries: s.map((c) => ({
        id: c.id,
        label: c.label,
        selected: c.id === i.catalogId
      })),
      hasAvailableEntries: s.length > 0,
      selectedEntry: r,
      selectedGrants: i.selectedGrants,
      grantFields: o,
      requiresAnyLabels: ((r == null ? void 0 : r.requiresAny) ?? []).map((c) => {
        var u;
        return ((u = xi(c)) == null ? void 0 : u.label) ?? c;
      }),
      excludesAnyLabels: ((r == null ? void 0 : r.excludesAny) ?? []).map((c) => {
        var u;
        return ((u = xi(c)) == null ? void 0 : u.label) ?? c;
      }),
      actorState: l,
      warningLabels: [...(l == null ? void 0 : l.warningLabels) ?? []],
      isOwned: !!this.item.actor,
      statusLabel: l ? l.isActive ? "Active" : "Inactive" : r ? "Configured" : "Unlinked",
      statusReason: (l == null ? void 0 : l.inactiveReason) ?? ""
    }, t;
  }
}
O(No, "LAYOUT_ID", "life-module"), O(No, "PARTS", {
  sheet: {
    template: `${ee}/v2/item/lifeModule.hbs`,
    scrollable: [".sheet-body"]
  }
});
class Io extends ci {
}
O(Io, "LAYOUT_ID", "skill"), O(Io, "PARTS", {
  sheet: {
    template: `${ee}/v2/item/skill.hbs`,
    scrollable: [".sheet-body"]
  }
});
const KT = Object.freeze([
  "firearms",
  "projectileWeapons",
  "heavyWeapons",
  "meleeCombat"
]), WT = Object.freeze([
  { value: "energy", label: "Energy" },
  { value: "kinetic", label: "Kinetic" },
  { value: "ballistic", label: "Ballistic" },
  { value: "explosive", label: "Explosive" },
  { value: "plasma", label: "Plasma" },
  { value: "electrical", label: "Electrical" },
  { value: "melee", label: "Melee" },
  { value: "none", label: "None" }
]), ou = Object.freeze([
  { value: "quantity", label: "Quantity" },
  { value: "durability.current", label: "Durability" },
  { value: "", label: "Custom Path" }
]), GT = "consumable";
function qT(a) {
  return String((a == null ? void 0 : a.canonicalType) ?? (a == null ? void 0 : a.type) ?? "item").trim().replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (t) => t.toUpperCase());
}
function mf(a) {
  return String((a == null ? void 0 : a.canonicalType) ?? (a == null ? void 0 : a.type) ?? "").trim() === GT;
}
function VT(a, e = "") {
  var i;
  const t = String(e ?? "").trim();
  return Array.from(((i = a == null ? void 0 : a.actor) == null ? void 0 : i.items) ?? []).filter((n) => {
    const r = String((n == null ? void 0 : n.id) ?? "").trim();
    return !r || r === (a == null ? void 0 : a.id) ? !1 : r === t || mf(n);
  }).sort((n, r) => String((n == null ? void 0 : n.name) ?? "").localeCompare(String((r == null ? void 0 : r.name) ?? ""))).map((n) => ({
    value: n.id,
    label: `${n.name || "Unnamed Item"} (${qT(n)})`
  }));
}
function Do(a, e, t) {
  const i = String(e ?? "").trim();
  return !i || a.some((n) => n.value === i) ? a : a.concat({ value: i, label: t(i) });
}
function YT(a, e) {
  var d, m, f, p, h, g, y;
  const t = ni(e), i = VT(a, (d = t.link) == null ? void 0 : d.itemId), n = Mp({
    source: t,
    actor: (a == null ? void 0 : a.actor) ?? null
  }), r = ((h = (f = (m = a == null ? void 0 : a.actor) == null ? void 0 : m.items) == null ? void 0 : f.get) == null ? void 0 : h.call(f, ((p = t.link) == null ? void 0 : p.itemId) ?? "")) ?? null, s = Do(
    [...ou],
    (g = t.link) == null ? void 0 : g.itemPath,
    (b) => `Custom (${b})`
  ), o = new Set(ou.map((b) => String(b.value ?? "").trim())), l = String(((y = t.link) == null ? void 0 : y.itemPath) ?? "").trim(), c = !!(a != null && a.actor);
  let u = "";
  return t.kind === "itemRef" && (c ? i.length ? r ? mf(r) ? l ? u = n.isTracked ? `Linked to ${r.name} | Available ${Number(n.current ?? 0)}` : `Linked to ${r.name} | Path not resolving to a tracked value yet.` : u = `Linked to ${r.name}. Pick which field should be consumed.` : u = `Linked to ${r.name} | Legacy non-consumable source. Repoint this to a Consumable item when convenient.` : u = "Pick an owned Consumable item to consume from." : u = "Add an owned Consumable item to the actor, then link this weapon to it." : u = "Embed this weapon in an actor to link it to owned inventory."), {
    ...t,
    resolvedState: n,
    ui: {
      ownedItemOptions: i,
      itemPathOptions: s,
      hasOwnedActor: c,
      linkedItemName: (r == null ? void 0 : r.name) ?? "",
      showCustomItemPath: t.kind === "itemRef" && !o.has(l),
      preview: u
    }
  };
}
class ns extends ci {
  /** @override */
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      actions: {
        ...super.DEFAULT_OPTIONS.actions,
        weaponSkillChange: ns._onWeaponSkillChange
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
      defenses: Fe.getDefenses()
    };
    const n = Array.isArray((l = t.ENUMS) == null ? void 0 : l.skills) ? t.ENUMS.skills : [], r = (c = this.item.system) == null ? void 0 : c.skill, s = (u = this.item.system) == null ? void 0 : u.damageType, o = i === "personalWeapon" ? Do(
      n.filter((h) => KT.includes(h.value)),
      r,
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
      damageTypes: Do(
        i === "personalWeapon" ? [...hr] : [...WT],
        s,
        (h) => i === "personalWeapon" ? Qt(h) : h
      ),
      ranges: zt.RANGE_ORDER.map((h) => ({
        value: h,
        label: i === "personalWeapon" ? wr(h) : h.charAt(0).toUpperCase() + h.slice(1)
      })),
      rangeBandLabels: Object.fromEntries(zt.RANGE_ORDER.map((h) => [
        h,
        i === "personalWeapon" ? wr(h) : h.charAt(0).toUpperCase() + h.slice(1)
      ])),
      weaponCapabilityOptions: Lf,
      payloadCapabilityOptions: _f,
      ammoDamageTypes: [{ value: "", label: "Use Weapon Default" }, ...hr],
      payloadTemplateShapes: wu,
      payloadTemplatePlacements: ku,
      areaEffectKinds: [
        { value: It.discrete, label: "Discrete" },
        { value: It.persistent, label: "Persistent Hazard" }
      ],
      exposureTiers: [
        { value: le.minor, label: "Minor" },
        { value: le.major, label: "Major" },
        { value: le.full, label: "Full" }
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
      consumptionSources: Array.isArray((f = this.item.system) == null ? void 0 : f.consumptionSources) ? this.item.system.consumptionSources.map((h) => YT(this.item, h)) : []
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
    var r, s;
    const i = t.value, n = (s = (r = game.system.mwd.skills) == null ? void 0 : r.get) == null ? void 0 : s.call(r, i);
    await this._syncNamedField(t, {
      ...n != null && n.defense ? { "system.defense": n.defense } : {}
    });
  }
}
const Pa = class Pa extends ns {
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
        attackWeapon: Pa._onAttackWeapon,
        reloadWeaponPayload: Pa._onReloadWeaponPayload
      }
    }, { inplace: !1 });
  }
  async _prepareContext(e) {
    var s, o, l;
    const t = await super._prepareContext(e), i = this.item.actor ?? null, n = t.weaponProfile ?? null, r = !!(i && typeof i.isCharacterLike == "function" && i.isCharacterLike() && ((o = (s = this.item).isPersonalWeapon) != null && o.call(s)));
    return t.itemSheet = {
      ...t.itemSheet ?? {},
      canAttack: r,
      attackDisabled: !r || !((l = this.item.system) != null && l.equipped)
    }, t.itemSheet.summaryChips = this._getSummaryChips(n), t.itemSheet.reloadState = this._getReloadDisplayState(n), t;
  }
  _getReloadDisplayState(e = ((t) => ((i) => (i = (t = this.item).getCombatProfile) == null ? void 0 : i.call(t))())() ?? null) {
    var d, m, f, p, h;
    const n = ((m = (d = this.item).canReloadActivePayload) == null ? void 0 : m.call(d, { detailed: !0 })) ?? { canReload: !1, reason: "" }, r = !!((f = e == null ? void 0 : e.sourceState) != null && f.isTracked), s = String((e == null ? void 0 : e.payloadLabel) ?? (n == null ? void 0 : n.payloadLabel) ?? "").trim() || "Unloaded", o = Number(((p = e == null ? void 0 : e.sourceState) == null ? void 0 : p.current) ?? (n == null ? void 0 : n.current) ?? 0) || 0, l = Number(((h = e == null ? void 0 : e.sourceState) == null ? void 0 : h.max) ?? (n == null ? void 0 : n.max) ?? 0) || 0, c = r ? `${s} ${o}/${l}` : s, u = n.canReload ? "Click to reload" : String(n.reason ?? "").trim() || "Payload read-only";
    return {
      canReload: !!n.canReload,
      disabled: !n.canReload,
      value: c,
      hint: u,
      title: n.canReload ? `Reload ${s}` : u
    };
  }
  _getSummaryChips(e = ((t) => ((i) => (i = (t = this.item).getCombatProfile) == null ? void 0 : i.call(t))())() ?? null) {
    var r, s, o;
    if (!e) return [];
    const n = [
      { label: "Category", value: String(e.category ?? "").trim() || "Ranged" },
      { label: "Skill", value: ((r = e.skillDef) == null ? void 0 : r.label) ?? e.skill ?? "Firearms" },
      { label: "DV", value: String(Number(e.damage ?? 0)) },
      { label: "AP", value: String(Number(e.ap ?? 0)) },
      { label: "Type", value: Qt(e.damageType) || "Penetrating" },
      { label: "Range", value: String(((s = e.range) == null ? void 0 : s.max) ?? "near").trim() || "Near" }
    ];
    return String(e.category ?? "").trim().toLowerCase() !== "melee" && n.push((o = e == null ? void 0 : e.sourceState) != null && o.isTracked ? { label: "Payload", value: `${(e == null ? void 0 : e.payloadLabel) || "Unloaded"} (${Number(e.sourceState.current ?? 0)}/${Number(e.sourceState.max ?? 0)})` } : { label: "Payload", value: (e == null ? void 0 : e.payloadLabel) || "Unloaded" }), n;
  }
  static async _onAttackWeapon(e) {
    var i, n, r, s;
    (i = e == null ? void 0 : e.preventDefault) == null || i.call(e), (n = e == null ? void 0 : e.stopPropagation) == null || n.call(e), !(!(this.item.actor ?? null) || !((s = (r = this.item).isPersonalWeapon) != null && s.call(r))) && await as({ weapon: this.item, event: e });
  }
  static async _onReloadWeaponPayload(e) {
    var i, n, r, s, o, l, c, u;
    if ((i = e == null ? void 0 : e.preventDefault) == null || i.call(e), (n = e == null ? void 0 : e.stopPropagation) == null || n.call(e), !((s = (r = this.item) == null ? void 0 : r.isPersonalWeapon) != null && s.call(r))) return;
    (o = this._captureScrollPositions) == null || o.call(this);
    const t = await ((c = (l = this.item).reloadActivePayload) == null ? void 0 : c.call(l));
    t != null && t.ok || (u = ui.notifications) == null || u.warn((t == null ? void 0 : t.reason) ?? "Unable to reload that weapon.");
  }
  _onRender(e, t) {
    var r, s;
    (r = super._onRender) == null || r.call(this, e, t);
    const i = (s = this._getRootElement) == null ? void 0 : s.call(this);
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
O(Pa, "LAYOUT_ID", "personal-weapon"), O(Pa, "PARTS", {
  sheet: {
    template: `${ee}/v2/item/personal-weapon-root.hbs`,
    scrollable: [".sheet-body"]
  }
});
let Oo = Pa;
class Lo extends ns {
}
O(Lo, "LAYOUT_ID", "mech-weapon"), O(Lo, "PARTS", {
  sheet: {
    template: `${ee}/v2/item/mech-weapon-root.hbs`,
    scrollable: [".sheet-body"]
  }
});
const QT = {
  penetrating: "Penetrating",
  concussive: "Concussive",
  energy: "Energy",
  thermal: "Thermal",
  electrical: "Electrical"
};
function lu(a) {
  const e = Number(a ?? 0) || 0;
  return e > 0 ? `+${e}` : `${e}`;
}
function JT({ defenseBonus: a = 0, mitigationByType: e = {} } = {}) {
  const t = [], i = Number(a ?? 0) || 0;
  i !== 0 && t.push(`Defense ${lu(i)}`);
  const n = li(e);
  for (const [r, s] of Object.entries(QT)) {
    const o = Number((n == null ? void 0 : n[r]) ?? 0) || 0;
    o !== 0 && t.push(`${s} ${lu(o)}`);
  }
  return t.join(" | ");
}
class _o extends ci {
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
    var l, c, u, d, m, f, p, h, g, y, b, S, w, k, P, E;
    const t = await super._prepareContext(e), i = this.item, n = i.actor ?? null, r = ((l = n == null ? void 0 : n.getPersonalCombatLoadout) == null ? void 0 : l.call(n)) ?? null, s = ((c = r == null ? void 0 : r.activeArmor) == null ? void 0 : c.id) ?? null, o = ((u = r == null ? void 0 : r.activeArmor) == null ? void 0 : u.id) === i.id ? r.activeArmor : (d = i.getArmorProfile) == null ? void 0 : d.call(i, { actor: n });
    return t.armorState = o, t.isActiveArmor = s === i.id, t.effectiveDurabilityCurrent = Number(
      ((m = o == null ? void 0 : o.durability) == null ? void 0 : m.current) ?? ((p = (f = i.system) == null ? void 0 : f.durability) == null ? void 0 : p.current) ?? ((g = (h = i.system) == null ? void 0 : h.durability) == null ? void 0 : g.max) ?? ((y = i.system) == null ? void 0 : y.rating) ?? 0
    ), t.effectiveArmorRating = Number(
      (o == null ? void 0 : o.currentArmorRating) ?? (o == null ? void 0 : o.ratingCurrent) ?? Math.min(
        Number(((b = i.system) == null ? void 0 : b.rating) ?? 0),
        Number(((w = (S = i.system) == null ? void 0 : S.durability) == null ? void 0 : w.current) ?? ((P = (k = i.system) == null ? void 0 : k.durability) == null ? void 0 : P.max) ?? ((E = i.system) == null ? void 0 : E.rating) ?? 0)
      )
    ), t.effectiveArmorResist = Number(
      (o == null ? void 0 : o.baseMitigation) ?? (o == null ? void 0 : o.baseResistance) ?? 0
    ), t.armorModifierSummary = this._getArmorModifierSummary(o), t.itemSheet = { ...t.itemSheet ?? {} }, t.itemSheet.summaryChips = this._getSummaryChips(o), t.armorEditor = {
      standardTraits: [...mp]
    }, t;
  }
  _getSummaryChips(e = null) {
    var r, s, o, l, c, u, d, m, f, p, h, g, y, b, S;
    const t = this.item.system ?? {}, i = [
      {
        label: "Rating",
        value: String(Number(
          (e == null ? void 0 : e.ratingCurrent) ?? (e == null ? void 0 : e.currentArmorRating) ?? Math.min(
            Number(t.rating ?? 0),
            Number(((r = t.durability) == null ? void 0 : r.current) ?? ((s = t.durability) == null ? void 0 : s.max) ?? t.rating ?? 0)
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
    return JT({
      defenseBonus: (e == null ? void 0 : e.defenseBonus) ?? t.defenseBonus ?? 0,
      mitigationByType: (e == null ? void 0 : e.mitigationByType) ?? (e == null ? void 0 : e.typedMitigation) ?? t.mitigationByType ?? {}
    });
  }
  _onRender(e, t) {
    var n, r;
    (n = super._onRender) == null || n.call(this, e, t);
    const i = (r = this._getRootElement) == null ? void 0 : r.call(this);
    i && (i.querySelectorAll(".mwd-armor-standard-trait-add").forEach((s) => {
      s.addEventListener("click", (o) => {
        var l, c;
        o.preventDefault(), (c = (l = this.item).createArmorStandardTrait) == null || c.call(l);
      });
    }), i.querySelectorAll(".mwd-armor-standard-trait-delete").forEach((s) => {
      s.addEventListener("click", (o) => {
        var l, c;
        o.preventDefault(), (c = (l = this.item).deleteArmorStandardTrait) == null || c.call(l, s.dataset.traitId);
      });
    }), i.querySelectorAll(".mwd-armor-standard-trait-field").forEach((s) => {
      s.addEventListener("change", (o) => {
        var l, c;
        o.preventDefault(), (c = (l = this.item).updateArmorStandardTrait) == null || c.call(
          l,
          s.dataset.traitId,
          s.dataset.field,
          s.value
        );
      });
    }));
  }
}
O(_o, "LAYOUT_ID", "armor"), O(_o, "PARTS", {
  sheet: {
    template: `${ee}/v2/item/armor-root.hbs`,
    scrollable: [".sheet-body"]
  }
});
function XT() {
  console.log(`${Me}Registering Item sheets (V2)`);
  const { Items: a } = foundry.documents.collections;
  a.registerSheet(T, Co, { types: ["contact"], makeDefault: !0, label: "Contact (V2)" }), a.registerSheet(T, Eo, { types: ["gear", "consumable"], makeDefault: !0, label: "Gear / Consumable (V2)" }), a.registerSheet(T, Po, { types: ["quality"], makeDefault: !0, label: "Quality (V2)" }), a.registerSheet(T, Ro, { types: ["assetModule"], makeDefault: !0, label: "Asset Module (V2)" }), a.registerSheet(T, No, { types: ["lifeModule"], makeDefault: !0, label: "Life Module (V2)" }), a.registerSheet(T, Io, { types: ["skill"], makeDefault: !0, label: "Skill (V2)" }), a.registerSheet(T, Oo, { types: ["personalWeapon", "weapon"], makeDefault: !0, label: "Personal Weapon (V2)" }), a.registerSheet(T, Lo, { types: ["mechWeapon"], makeDefault: !0, label: "Mech Weapon (V2)" }), a.registerSheet(T, _o, { types: ["armor"], makeDefault: !0, label: "Armor (V2)" });
}
const cu = [
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
  `systems/${T}/templates/v2/ui/vehicle/movement-grid.hbs`,
  `systems/${T}/templates/v2/ui/vehicle/degradation-grid.hbs`,
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
function ZT(a) {
  const e = String(a).replaceAll("\\", "/"), t = `systems/${T}/templates/`, i = e.indexOf(t);
  return `mwd.${(i >= 0 ? e.slice(i + t.length) : e).replace(/\.hbs$/i, "").split("/").filter(Boolean).map((o) => o.replace(/^_+/, "")).join(".")}`;
}
function ew() {
  var a, e;
  return ((e = (a = foundry == null ? void 0 : foundry.applications) == null ? void 0 : a.handlebars) == null ? void 0 : e.Handlebars) ?? Handlebars;
}
async function tw() {
  var e, t;
  const a = ew();
  try {
    const i = {};
    for (const r of cu)
      i[ZT(r)] = r, i[r] = r;
    await foundry.applications.handlebars.loadTemplates(i);
    const n = "mwd.v2.ui.layout-root";
    if (!((e = Handlebars.partials) != null && e[n])) {
      const r = Object.keys(Handlebars.partials ?? {});
      throw console.error("Missing required partial:", n), console.error("Closest matches:", r.filter((s) => s.includes("layout-root"))), new Error(`Template preload failed: ${n} not registered`);
    }
    if (a !== Handlebars) {
      for (const [r, s] of Object.entries(a.partials ?? {}))
        if (!((t = Handlebars.partials) != null && t[r]))
          try {
            Handlebars.registerPartial(r, s);
          } catch {
          }
    }
    console.log(`${Me}preloadTemplatesV2 OK`, { loaded: cu.length });
  } catch (i) {
    throw console.error(`${Me}preloadTemplatesV2 FAILED`, i), i;
  }
}
function uu(a) {
  const e = Math.max(0, Number(a) || 0);
  return -Math.floor(e / 3);
}
function iw(a) {
  const e = Math.max(0, Number(a) || 0);
  return e === 0 ? 0 : Math.ceil(e / 4);
}
function aw(a = {}) {
  const e = a.physical ?? {}, t = a.fatigue ?? {}, i = a.armor ?? {}, n = Number(e.value) || 0, r = Number(t.value) || 0, s = Math.max(Number(i.value) || 0, Number(i.max) || 0);
  return {
    physical: { penalty: uu(n) },
    fatigue: { penalty: uu(r) },
    armor: { resistance: iw(s) }
  };
}
const Is = {
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
function nw(a, e, t, i) {
  const n = a.system ?? {}, r = `monitors.${e}`, s = Number(foundry.utils.getProperty(n, `${r}.max`)) || 0, o = Number(foundry.utils.getProperty(n, `${r}.value`)) || 0;
  switch (t) {
    case "value":
      return i;
    case "armorPersonalBase":
      return i;
    case "mechArmorBase":
      return Math.max(i, s, o);
    case "vehicleArmorBase":
      return Math.max(i, s, o);
    default:
      return i;
  }
}
function rw(a = {}) {
  return Object.entries(li(a)).filter(([, e]) => Number(e) > 0).map(([e, t]) => `${e} +${t}`).join(", ");
}
class sw extends Actor {
  /** @override */
  async _preCreate(e, t, i) {
    super._preCreate && await super._preCreate(e, t, i);
    const n = await qd("Actor", (e == null ? void 0 : e.type) ?? this.type), r = {};
    n.system && Object.keys(n.system).length && (r.system = foundry.utils.mergeObject(
      foundry.utils.deepClone(n.system),
      foundry.utils.deepClone((e == null ? void 0 : e.system) ?? this.system ?? {}),
      { inplace: !1, recursive: !0, overwrite: !0 }
    )), n.prototypeToken && (r.prototypeToken = foundry.utils.mergeObject(
      foundry.utils.deepClone(n.prototypeToken),
      foundry.utils.deepClone((e == null ? void 0 : e.prototypeToken) ?? this.prototypeToken ?? {}),
      { inplace: !1, recursive: !0, overwrite: !0 }
    )), Object.keys(r).length && this.updateSource(r);
  }
  /* -------------------------------------------- */
  /* Base & Derived Data                           */
  /* -------------------------------------------- */
  /** @override */
  prepareBaseData() {
    var e, t;
    if (super.prepareBaseData(), this.isCharacterLike()) {
      const i = this.system ?? {};
      if (qp(i), i.speed = Math.max(0, Math.trunc(Number(i.speed ?? 12) || 12)), (e = i.skills) != null && e.skills && typeof i.skills.skills == "object") {
        for (const [n, r] of Object.entries(i.skills.skills))
          (t = i.skills)[n] ?? (t[n] = r);
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
        const r = Object.prototype.hasOwnProperty.call(n, "value"), s = Number(n.value);
        (!r || !Number.isFinite(s)) && (n.value = n.rating), "max" in n && delete n.max;
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
    const e = this.getEdgeCap(), t = this.type === "character" ? Bi(this).bonusByEdgePool ?? {} : {};
    if (this.type === "character" && this.hasEdgePools()) {
      const r = ((n = (i = this.system) == null ? void 0 : i.counters) == null ? void 0 : n.edgePools) ?? {}, s = {};
      for (const [o, l] of Object.entries(r)) {
        const c = Math.max(0, Number((l == null ? void 0 : l.rating) ?? 0)), u = Math.max(0, Number((l == null ? void 0 : l.value) ?? 0)), d = Math.max(0, Number((t == null ? void 0 : t[o]) ?? 0)), m = c + d, f = Math.min(m, e), p = Math.min(u, f);
        s[o] = {
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
      this._mwdDerived.edgePools = { cap: e, pools: s };
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
    }).filter(Boolean), n = t.filter((f) => f.equipped), r = i.filter((f) => f.equipped), s = n.filter((f) => f.isPrimary), o = r.filter((f) => f.isPrimary);
    let l = null, c = null, u = !1;
    s.length === 1 ? (c = s[0], l = c) : s.length > 1 ? (e.push("Multiple equipped primary weapons found; attack selection requires a chooser."), u = !0) : n.length === 1 ? l = n[0] : n.length > 1 ? u = !0 : l = zt.buildDefaultUnarmedProfile(this);
    let d = null, m = null;
    return o.length === 1 ? (d = o[0], m = this._buildActiveArmorState(d)) : o.length > 1 ? (e.push("Multiple equipped primary armor items found; using the first equipped armor."), m = r[0] ? this._buildActiveArmorState(r[0]) : null) : r.length === 1 ? m = this._buildActiveArmorState(r[0]) : r.length > 1 && (e.push("Multiple equipped armor items found without a single primary; using the first equipped armor."), m = this._buildActiveArmorState(r[0])), {
      weapons: t,
      equippedWeapons: n,
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
    ), n = Math.max(0, Number((e == null ? void 0 : e.rating) ?? 0)), r = Math.min(n, i), s = li(e == null ? void 0 : e.mitigationByType), o = qo(r);
    return {
      ...e,
      armorId: e.id,
      remainingDurability: i,
      currentArmorRating: r,
      baseMitigation: o,
      baseResistance: o,
      mitigationByType: s,
      typedMitigation: s,
      ratingCurrent: r,
      isDestroyed: i <= 0,
      durability: {
        current: i,
        max: t
      }
    };
  }
  async setOwnedItemEquipped(e, t) {
    var n, r, s;
    const i = this.getOwnedItem(e);
    return !i || !((n = i.isPersonalWeapon) != null && n.call(i) || (r = i.isArmor) != null && r.call(i)) ? null : this.updateEmbeddedDocuments("Item", [{
      _id: i.id,
      "system.equipped": !!t,
      "system.isPrimary": t ? !!((s = i.system) != null && s.isPrimary) : !1
    }]);
  }
  async setOwnedItemPrimary(e, t) {
    var s, o, l, c;
    const i = this.getOwnedItem(e);
    if (!i || !((s = i.isPersonalWeapon) != null && s.call(i) || (o = i.isArmor) != null && o.call(i))) return null;
    const n = [], r = !!t;
    if (r)
      for (const u of this.items.filter((d) => d.type === i.type && d.id !== i.id))
        (l = u.system) != null && l.isPrimary && n.push({ _id: u.id, "system.isPrimary": !1 });
    return n.push({
      _id: i.id,
      "system.isPrimary": r,
      "system.equipped": r ? !0 : !!((c = i.system) != null && c.equipped)
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
    const n = this.getEdgePoolRaw(e), r = Math.max(0, Number((n == null ? void 0 : n.rating) ?? 0)), s = Math.max(0, Number((n == null ? void 0 : n.value) ?? 0)), o = Math.max(0, Number(((p = Bi(this).bonusByEdgePool) == null ? void 0 : p[e]) ?? 0)), l = r + o, c = Math.min(l, t), u = Math.min(s, c);
    return {
      key: e,
      value: s,
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
    var s;
    if (!this.hasEdgePools()) return;
    const i = Math.max(0, Number(((s = this.getEdgePool(e)) == null ? void 0 : s.effectiveMax) ?? 0)), n = Number(t ?? 0), r = Math.max(0, Math.min(n, i));
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
    const i = Math.max(0, Number(((r = this.getEdgePoolRaw(e)) == null ? void 0 : r.value) ?? 0)), n = Number(t ?? 0);
    return this.setEdgePoolValue(e, i + n);
  }
  /**
   * Set the RATING (advancement ceiling) for a pool.
   * Stores true rating (not cap-clamped), then clamps current value to new effective max.
   */
  async setEdgePoolRating(e, t) {
    var c, u;
    if (!this.hasEdgePools()) return;
    const i = this.getEdgeCap(), n = Math.max(0, Number(t ?? 0)), r = Math.max(0, Number(((c = Bi(this).bonusByEdgePool) == null ? void 0 : c[e]) ?? 0)), s = Math.min(n + r, i), o = Math.max(0, Number(((u = this.getEdgePoolRaw(e)) == null ? void 0 : u.value) ?? 0)), l = Math.min(o, s);
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
    var i, n, r, s;
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
      const l = Object.keys(((s = (r = this.system) == null ? void 0 : r.counters) == null ? void 0 : s.edgePools) ?? {}).map((c) => {
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
    let r = n;
    if (!i.skipTraitHooks) {
      const o = i.runtime ?? {}, l = {
        poolKey: e,
        amount: n,
        source: String(i.source ?? "").trim(),
        eventKey: String(i.eventKey ?? "").trim()
      }, c = Bt({
        actor: this,
        phase: "onEdgeSpend",
        facts: Qs({ actor: this, packet: l, phase: "onEdgeSpend", runtime: o }),
        packet: l,
        options: { runtime: o, consumeUsage: !0 }
      });
      await Ai({ actor: this, mutations: c.mutations, runtime: o }), r = Math.max(0, Number(c.packet.amount ?? n) || 0);
    }
    const s = r;
    if (s)
      return this.adjustEdgePoolValue(e, -s);
  }
  async gainEdge(e, t = 1, i = {}) {
    if (!this.hasEdgePools()) return;
    const n = Number(t ?? 0);
    if (!n) return;
    let r = n;
    if (!i.skipTraitHooks) {
      const s = i.runtime ?? {}, o = {
        poolKey: e,
        amount: n,
        source: String(i.source ?? "").trim(),
        eventKey: String(i.eventKey ?? "").trim()
      }, l = Bt({
        actor: this,
        phase: "onEdgeGain",
        facts: Qs({ actor: this, packet: o, phase: "onEdgeGain", runtime: s }),
        packet: o,
        options: { runtime: s, consumeUsage: !0 }
      });
      await Ai({ actor: this, mutations: l.mutations, runtime: s }), r = Number(l.packet.amount ?? n) || 0;
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
  _onCreateDescendantDocuments(e, t, i, n, r, s) {
    super._onCreateDescendantDocuments(e, t, i, n, r, s), t === "effects" && this._syncOverloadedFieldFromEffects();
  }
  _onUpdateDescendantDocuments(e, t, i, n, r, s) {
    super._onUpdateDescendantDocuments(e, t, i, n, r, s), t === "effects" && this._syncOverloadedFieldFromEffects();
  }
  _onDeleteDescendantDocuments(e, t, i, n, r, s) {
    super._onDeleteDescendantDocuments(e, t, i, n, r, s), t === "effects" && this._syncOverloadedFieldFromEffects();
  }
  async _syncOverloadedEffect(e) {
    await this.toggleStatusEffect("overloaded", { active: e, overlay: !1 });
  }
  async _syncOverloadedFieldFromEffects() {
    var i, n, r, s;
    const e = ((n = (i = this.statuses) == null ? void 0 : i.has) == null ? void 0 : n.call(i, "overloaded")) ?? !1, t = !!((s = (r = this.system) == null ? void 0 : r.burn) != null && s.overloaded);
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
      ), k = Math.min(Math.max(0, Number(t) || 0), w);
      return this.update({
        "system.monitors.heat.value": k,
        "system.monitors.heat.max": w,
        "system.mwd.heat.current": k,
        "system.mwd.heat.max": w
      });
    }
    if (e === "armor" && this.isCharacterLike()) {
      const y = this.getPersonalCombatLoadout({ refresh: !0 }), b = ((d = y == null ? void 0 : y.activeArmor) == null ? void 0 : d.armorId) ?? ((m = y == null ? void 0 : y.activeArmor) == null ? void 0 : m.id) ?? null, S = b ? this.items.get(b) : null;
      if (!(S != null && S.id)) return null;
      const w = Math.max(0, Number(((f = S.system) == null ? void 0 : f.rating) ?? 0) || 0), k = Math.max(0, Number(((h = (p = S.system) == null ? void 0 : p.durability) == null ? void 0 : h.max) ?? 0) || 0), P = k > 0 ? k : w, E = Math.min(Math.max(0, Number(t) || 0), P);
      return this.updateEmbeddedDocuments("Item", [{
        _id: S.id,
        "system.durability.max": P,
        "system.durability.current": E
      }]);
    }
    const n = `system.monitors.${e}`, r = Number(foundry.utils.getProperty(this, `${n}.max`)) || 0, s = Math.max(0, r), o = Math.min(Math.max(0, Number(t) || 0), s), l = { [`${n}.value`]: o }, c = this.type, u = (g = os == null ? void 0 : os[c]) == null ? void 0 : g[e];
    if (u != null && u.derived)
      for (const [y, b] of Object.entries(u.derived)) {
        const S = Is == null ? void 0 : Is[b.fn];
        if (typeof S != "function") continue;
        const w = nw(this, e, b.source, o);
        l[`${n}.derived.${y}`] = S(w);
      }
    return this.update(l);
  }
  _prepareMonitors() {
    var o, l, c, u, d, m, f, p;
    const e = this.system.monitors ?? {}, t = aw(e);
    (o = this.system).derived ?? (o.derived = {}), this.system.derived.monitors = t;
    const i = Number(((l = t == null ? void 0 : t.physical) == null ? void 0 : l.penalty) ?? 0), n = Number(((c = t == null ? void 0 : t.fatigue) == null ? void 0 : c.penalty) ?? 0), r = Number(((u = t == null ? void 0 : t.armor) == null ? void 0 : u.resistance) ?? 0), s = i + n;
    e.physical ?? (e.physical = {}), (d = e.physical).derived ?? (d.derived = {}), e.physical.derived.penalty = i, e.fatigue ?? (e.fatigue = {}), (m = e.fatigue).derived ?? (m.derived = {}), e.fatigue.derived.penalty = n, e.armor ?? (e.armor = {}), (f = e.armor).derived ?? (f.derived = {}), e.armor.derived.resistance = r, (p = this.system.derived).condition ?? (p.condition = {}), this.system.derived.condition.physicalPenalty = i, this.system.derived.condition.fatiguePenalty = n, this.system.derived.condition.totalPenalty = s, this.system.derived.conditionPenalty = s;
  }
  _preparePersonalCombatDerived() {
    var s, o, l, c, u, d;
    if (!this.isCharacterLike()) return;
    const e = this.getPersonalCombatLoadout({ refresh: !0 }), t = (o = (s = this.system) == null ? void 0 : s.monitors) == null ? void 0 : o.armor;
    if (!t) return;
    const i = e.activeArmor, n = Math.max(0, Number(((l = i == null ? void 0 : i.durability) == null ? void 0 : l.max) ?? 0)), r = Math.max(0, Number((i == null ? void 0 : i.remainingDurability) ?? ((c = i == null ? void 0 : i.durability) == null ? void 0 : c.current) ?? 0));
    t.max = n, t.value = Math.min(n, r), t.resistance = {
      default: Number((i == null ? void 0 : i.baseMitigation) ?? (i == null ? void 0 : i.baseResistance) ?? 0),
      byType: {}
    }, t.resistanceBonusByType = i != null && i.isDestroyed ? {} : (i == null ? void 0 : i.mitigationByType) ?? (i == null ? void 0 : i.typedMitigation) ?? {}, t.derived ?? (t.derived = {}), t.derived.resistance = Number((i == null ? void 0 : i.baseMitigation) ?? (i == null ? void 0 : i.baseResistance) ?? 0), t.effect = i != null && i.isDestroyed ? "Destroyed" : i ? rw(i.mitigationByType ?? i.typedMitigation) : "", (u = this.system).derived ?? (u.derived = {}), this.system.derived.personalCombat = {
      defaultWeaponId: ((d = e.defaultWeapon) == null ? void 0 : d.id) ?? null,
      activeArmorId: (i == null ? void 0 : i.id) ?? null,
      warnings: [...e.warnings ?? []]
    };
  }
}
async function ow({ actor: a, payload: e } = {}) {
  var g, y, b, S, w, k;
  if (!a) throw new Error("resolveSkill requires actor");
  const t = String((e == null ? void 0 : e.key) ?? "").trim(), i = Dt(t);
  if (!i) throw new Error(`Unknown skill: ${t}`);
  const n = a.system ?? {}, r = String((e == null ? void 0 : e.attrKey) ?? i.attribute ?? "").trim();
  if (!r) throw new Error(`Skill ${t} missing attribute key`);
  const s = Number(((y = (g = n == null ? void 0 : n.attributes) == null ? void 0 : g[r]) == null ? void 0 : y.value) ?? 0), o = Number(((S = (b = n == null ? void 0 : n.skills) == null ? void 0 : b[t]) == null ? void 0 : S.rating) ?? 0), l = Number(((k = (w = n == null ? void 0 : n.skills) == null ? void 0 : w[t]) == null ? void 0 : k.bonus) ?? 0), c = new Set(zr(n, t)), u = Jo(t, e == null ? void 0 : e.specializationKey), d = u && c.has(u.key) ? u : null, m = d ? Vo : 0, f = Array.isArray(e == null ? void 0 : e.domains) ? e.domains : i.domains ?? [], p = Number.isFinite(Number(e == null ? void 0 : e.diceTarget)) ? Number(e.diceTarget) : Number.isFinite(Number(e == null ? void 0 : e.target)) ? Number(e.target) : 5, h = Number.isFinite(Number(e == null ? void 0 : e.dn)) ? Number(e.dn) : 1;
  return {
    intent: "skill",
    rollType: "simple",
    title: `${i.label} (${r})`,
    subtitle: a.name ?? "Actor",
    domains: f,
    // Per-die threshold (cs>=X). Kept separate from dnHits.
    diceTarget: p,
    // DN = hits needed for success
    difficulty: { dn: h },
    edge: {
      earn: { enabled: !0, rate: 4, maxPerRoll: 1 }
    },
    pool: { attribute: s, skill: o, bonus: l, specialization: m },
    breakdown: [
      { id: "attribute", label: "Attribute", value: s },
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
const lw = /* @__PURE__ */ new Set([
  "grit",
  "chaos",
  "insight",
  "rumor",
  "legend",
  "credibility"
]), cw = {
  grit: "physical",
  chaos: "physical",
  insight: "mental",
  rumor: "mental",
  legend: "social",
  credibility: "social"
};
async function uw({ actor: a, payload: e } = {}) {
  if (!a) throw new Error("resolveEdge requires actor");
  const t = String((e == null ? void 0 : e.pool) ?? "").trim();
  if (!lw.has(t)) throw new Error(`Invalid edge pool: ${t}`);
  const i = a.getEdgePool(t), n = Math.max(0, Number((i == null ? void 0 : i.effectiveValue) ?? 0));
  return {
    intent: "edge",
    title: `Edge — ${t}`,
    subtitle: a.name ?? "Actor",
    domains: [cw[t] ?? "unknown"],
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
async function dw({ actor: a, payload: e, event: t } = {}) {
  return {
    title: "Attribute",
    intent: "attribute",
    domainTags: ["general"],
    pool: { attribute: 0, skill: 0, bonus: 0 },
    breakdown: [],
    mods: []
  };
}
async function mw({ actor: a, payload: e } = {}) {
  if (!a) throw new Error("resolveCommon requires actor");
  const t = String((e == null ? void 0 : e.id) ?? "").trim();
  if (!t) throw new Error("Common rolls require payload.id");
  const i = il(t);
  if (!i) throw new Error(`Unknown common check: ${t}`);
  const n = Array.isArray(i.formula) ? i.formula : [];
  if (n.length !== 2)
    throw new Error(`Common check ${t} must define exactly two attributes.`);
  const r = n.map((c) => {
    var d, m, f;
    const u = Sh(c);
    if (!u) throw new Error(`Common check ${t} uses unsupported attribute code: ${c}`);
    return {
      code: String(c).trim().toUpperCase(),
      key: u,
      label: Ah(c),
      value: Number(((f = (m = (d = a.system) == null ? void 0 : d.attributes) == null ? void 0 : m[u]) == null ? void 0 : f.value) ?? 0)
    };
  }), s = r.reduce((c, u) => c + Number(u.value ?? 0), 0), o = Array.isArray(i.tags) ? [...i.tags] : [], l = Array.isArray(i.domains) ? [...i.domains] : [];
  return {
    intent: "common",
    rollType: "simple",
    title: String(i.label ?? t).trim() || t,
    subtitle: a.name ?? "Actor",
    domains: l,
    tags: o,
    formula: Th(n),
    difficulty: {
      dn: Number.isFinite(Number(e == null ? void 0 : e.dn)) ? Number(e.dn) : 1
    },
    edge: {
      earn: { enabled: !0, rate: 4, maxPerRoll: 1 }
    },
    pool: {
      attribute: s,
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
      formulaCodes: n,
      tags: o,
      attributes: r
    }
  };
}
const fw = 90;
var Su;
const pw = Number(((Su = CONST == null ? void 0 : CONST.REGION_VISIBILITY) == null ? void 0 : Su.ALWAYS) ?? 2) || 2;
function Er() {
  var a, e;
  return Number(((a = canvas.grid) == null ? void 0 : a.size) ?? ((e = canvas.dimensions) == null ? void 0 : e.size) ?? 100) || 100;
}
function hw(a = {}) {
  return Math.max(0, Number((a == null ? void 0 : a.size) ?? 0) || 0);
}
function Ka(a) {
  var t, i, n, r;
  return ((i = (t = canvas.tokens) == null ? void 0 : t.controlled) == null ? void 0 : i.find((s) => {
    var o;
    return ((o = s.actor) == null ? void 0 : o.id) === (a == null ? void 0 : a.id);
  })) ?? null ?? ((r = (n = a == null ? void 0 : a.getActiveTokens) == null ? void 0 : n.call(a, !0, !0)) == null ? void 0 : r[0]) ?? null;
}
function du(a) {
  var e, t;
  return Number(
    ((e = a == null ? void 0 : a.document) == null ? void 0 : e.disposition) ?? (a == null ? void 0 : a.disposition) ?? ((t = CONST == null ? void 0 : CONST.TOKEN_DISPOSITIONS) == null ? void 0 : t.NEUTRAL) ?? 0
  );
}
function Pr(a) {
  var s, o, l, c, u;
  const e = (a == null ? void 0 : a.center) ?? ((s = a == null ? void 0 : a.object) == null ? void 0 : s.center);
  if (e) return { x: Number(e.x ?? 0), y: Number(e.y ?? 0) };
  const t = Number((a == null ? void 0 : a.x) ?? ((o = a == null ? void 0 : a.document) == null ? void 0 : o.x) ?? 0), i = Number((a == null ? void 0 : a.y) ?? ((l = a == null ? void 0 : a.document) == null ? void 0 : l.y) ?? 0), n = Number((a == null ? void 0 : a.w) ?? (a == null ? void 0 : a.width) ?? ((c = a == null ? void 0 : a.document) == null ? void 0 : c.width) ?? 1) * Er(), r = Number((a == null ? void 0 : a.h) ?? (a == null ? void 0 : a.height) ?? ((u = a == null ? void 0 : a.document) == null ? void 0 : u.height) ?? 1) * Er();
  return { x: t + n / 2, y: i + r / 2 };
}
function gw(a) {
  var i, n, r, s;
  const e = Number((a == null ? void 0 : a.w) ?? ((i = a == null ? void 0 : a.object) == null ? void 0 : i.w) ?? 0) || Number(((n = a == null ? void 0 : a.document) == null ? void 0 : n.width) ?? 1) * Er(), t = Number((a == null ? void 0 : a.h) ?? ((r = a == null ? void 0 : a.object) == null ? void 0 : r.h) ?? 0) || Number(((s = a == null ? void 0 : a.document) == null ? void 0 : s.height) ?? 1) * Er();
  return Math.max(e, t) / 2;
}
function yw() {
  var t;
  const a = ((t = canvas == null ? void 0 : canvas.stage) == null ? void 0 : t.pivot) ?? null, e = (canvas == null ? void 0 : canvas.dimensions) ?? {};
  return {
    x: Number((a == null ? void 0 : a.x) ?? e.width / 2 ?? 0) || 0,
    y: Number((a == null ? void 0 : a.y) ?? e.height / 2 ?? 0) || 0
  };
}
function bw() {
  var a;
  return Array.from(((a = game.user) == null ? void 0 : a.targets) ?? []).find((e) => e == null ? void 0 : e.actor) ?? null;
}
function Sw(a, e) {
  return {
    x: (Number((a == null ? void 0 : a.x) ?? 0) + Number((e == null ? void 0 : e.x) ?? 0)) / 2,
    y: (Number((a == null ? void 0 : a.y) ?? 0) + Number((e == null ? void 0 : e.y) ?? 0)) / 2
  };
}
function Aw({ template: a = {}, actor: e = null } = {}) {
  const t = String((a == null ? void 0 : a.placement) ?? "").trim().toLowerCase(), i = Ka(e), n = bw(), r = i ? Pr(i) : null, s = n ? Pr(n) : null;
  return t === "origin" && r ? r : t === "targeted" && s ? s : t === "placed" && r && s ? Sw(r, s) : yw();
}
function Tw({ attack: a = {}, actor: e = null } = {}) {
  const t = (a == null ? void 0 : a.template) ?? null, i = String((t == null ? void 0 : t.shape) ?? "").trim().toLowerCase();
  if (!i) return null;
  const n = Aw({ template: t, actor: e });
  return He({
    shape: i,
    x: n.x,
    y: n.y,
    direction: 0,
    distance: hw(t),
    angle: i === "cone" ? fw : null,
    width: i === "line" ? 1 : null,
    placementMode: (t == null ? void 0 : t.placement) ?? null
  });
}
function ww() {
  var e, t;
  const a = new PIXI.Container();
  return a.eventMode = "none", a.sortableChildren = !0, (t = (e = canvas.stage) == null ? void 0 : e.addChild) == null || t.call(e, a), a;
}
function kw(a) {
  var e;
  a != null && a.parent && a.parent.removeChild(a), (e = a == null ? void 0 : a.destroy) == null || e.call(a, { children: !0 });
}
function vw() {
  const a = ww(), e = new PIXI.Container();
  e.eventMode = "none", e.zIndex = 5;
  const t = new PIXI.Container();
  return t.eventMode = "none", t.zIndex = 10, a.addChild(e), a.addChild(t), { root: a, templateLayer: e, markerLayer: t };
}
function Mw(a) {
  kw((a == null ? void 0 : a.root) ?? a);
}
function Cw() {
  var t;
  const a = String(((t = game.user) == null ? void 0 : t.color) ?? "#ff6400").replace("#", "").trim(), e = Number.parseInt(a, 16);
  return Number.isFinite(e) ? e : 16737280;
}
function ff(a) {
  var e;
  (e = a == null ? void 0 : a.removeChildren) == null || e.call(a).forEach((t) => {
    var i;
    return (i = t.destroy) == null ? void 0 : i.call(t, { children: !0 });
  });
}
function xo(a) {
  var c, u, d;
  const e = ((c = canvas == null ? void 0 : canvas.app) == null ? void 0 : c.view) ?? null, t = ((u = canvas == null ? void 0 : canvas.app) == null ? void 0 : u.renderer) ?? null, i = (canvas == null ? void 0 : canvas.stage) ?? null;
  if (!e || !i) return null;
  const n = Number((a == null ? void 0 : a.clientX) ?? NaN), r = Number((a == null ? void 0 : a.clientY) ?? NaN);
  if (!Number.isFinite(n) || !Number.isFinite(r)) return null;
  const s = e.getBoundingClientRect();
  if (n < s.left || n > s.right || r < s.top || r > s.bottom) return null;
  const o = new PIXI.Point();
  if (typeof ((d = t == null ? void 0 : t.events) == null ? void 0 : d.mapPositionToPoint) == "function")
    t.events.mapPositionToPoint(o, n, r);
  else {
    const m = Number((t == null ? void 0 : t.resolution) ?? window.devicePixelRatio ?? 1) || 1;
    o.x = (n - s.left) * m, o.y = (r - s.top) * m;
  }
  const l = i.toLocal(o);
  return {
    x: Number((l == null ? void 0 : l.x) ?? 0) || 0,
    y: Number((l == null ? void 0 : l.y) ?? 0) || 0
  };
}
function Ew(a, e) {
  const t = Number((e == null ? void 0 : e.x) ?? 0) - Number((a == null ? void 0 : a.x) ?? 0), i = Number((e == null ? void 0 : e.y) ?? 0) - Number((a == null ? void 0 : a.y) ?? 0);
  return t === 0 && i === 0 ? 0 : Math.atan2(i, t) * 180 / Math.PI;
}
function Ds(a = 0) {
  var i, n, r, s, o;
  const e = Number(((i = canvas.grid) == null ? void 0 : i.size) ?? ((n = canvas.dimensions) == null ? void 0 : n.size) ?? 100) || 100, t = Number(((s = (r = canvas.scene) == null ? void 0 : r.grid) == null ? void 0 : s.distance) ?? ((o = canvas.dimensions) == null ? void 0 : o.distance) ?? 1) || 1;
  return Number(a ?? 0) * (e / t);
}
function Pw({ geometry: a = null, pointer: e = null, attack: t = {}, actor: i = null } = {}) {
  var l;
  const n = He(a);
  if (!n) return null;
  const r = oi(n) ?? null;
  if (!r || !e) return r;
  const o = String(((l = t == null ? void 0 : t.template) == null ? void 0 : l.placement) ?? r.placementMode ?? "").trim().toLowerCase() !== "origin";
  if (o && (r.x = e.x, r.y = e.y), ["line", "cone", "rect"].includes(String(r.shape ?? "").trim().toLowerCase())) {
    const c = Ka(i), u = c ? Pr(c) : null, d = o ? u ?? { x: Number(n.x ?? 0), y: Number(n.y ?? 0) } : { x: Number(r.x ?? 0), y: Number(r.y ?? 0) };
    r.direction = Ew(d, e);
  }
  return He(r);
}
function Rw(a, e = null) {
  if (!a) return;
  ff(a);
  const t = He(e);
  if (!t) return;
  const i = Cw(), n = new PIXI.Graphics();
  switch (n.lineStyle(3, i, 0.95), n.beginFill(i, 0.18), String(t.shape ?? "").trim().toLowerCase()) {
    case "blast": {
      n.drawCircle(
        Number(t.x ?? 0),
        Number(t.y ?? 0),
        Ds(t.distance ?? 0)
      );
      break;
    }
    case "rect": {
      const r = Ds(t.width ?? 0), s = Ds(t.height ?? 0);
      n.position.set(Number(t.x ?? 0), Number(t.y ?? 0)), n.rotation = Number(t.direction ?? 0) * Math.PI / 180, n.drawRect(
        -(Number(t.anchorX ?? 0) || 0) * r,
        -(Number(t.anchorY ?? 0) || 0) * s,
        r,
        s
      );
      break;
    }
    default: {
      const [r] = Lr(t);
      (r == null ? void 0 : r.type) === "polygon" && Array.isArray(r.points) && r.points.length >= 3 && n.drawPolygon(r.points.flatMap((s) => [Number((s == null ? void 0 : s.x) ?? 0), Number((s == null ? void 0 : s.y) ?? 0)]));
      break;
    }
  }
  n.endFill(), a.addChild(n);
}
function Nw(a = le.none) {
  return a === le.full ? 14042437 : a === le.major ? 15174447 : a === le.minor ? 15782993 : 10134706;
}
function Iw(a, e = []) {
  if (a) {
    ff(a);
    for (const t of e) {
      const i = Pr(t.token), n = Math.max(20, gw(t.token) + 12), r = Nw(t.exposureTier), s = new PIXI.Graphics();
      s.lineStyle(4, r, 0.95), s.beginFill(r, 0.14), s.drawCircle(i.x, i.y, n), s.endFill(), s.zIndex = 10;
      const o = new PIXI.Text(Ft(t.exposureTier), {
        fontFamily: "MWD UI",
        fontSize: 18,
        fontWeight: "700",
        fill: r,
        stroke: 1118481,
        strokeThickness: 4,
        align: "center"
      });
      o.anchor.set(0.5, 1), o.position.set(i.x, i.y - n - 6), o.zIndex = 11, a.addChild(s), a.addChild(o);
    }
  }
}
function pf(a, e = {}) {
  var r, s, o, l, c, u, d, m, f, p, h, g, y, b, S, w;
  const t = (a == null ? void 0 : a.actor) ?? null;
  if (!t) return null;
  const i = ((r = t == null ? void 0 : t.getPersonalCombatLoadout) == null ? void 0 : r.call(t)) ?? null, n = (i == null ? void 0 : i.activeArmor) ?? null;
  return {
    tokenId: (a == null ? void 0 : a.id) ?? null,
    tokenUuid: ((s = a == null ? void 0 : a.document) == null ? void 0 : s.uuid) ?? null,
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
    exposure: zi({
      tier: ((h = e == null ? void 0 : e.exposure) == null ? void 0 : h.initialTier) ?? ((g = e == null ? void 0 : e.exposure) == null ? void 0 : g.tier) ?? (e == null ? void 0 : e.exposureTier) ?? le.none,
      appliedTier: ((y = e == null ? void 0 : e.exposure) == null ? void 0 : y.finalTier) ?? ((b = e == null ? void 0 : e.exposure) == null ? void 0 : b.appliedTier) ?? (e == null ? void 0 : e.exposureTier) ?? le.none,
      evadeUsed: !!((S = e == null ? void 0 : e.exposure) != null && S.evadeUsed),
      evadeLocked: !!((w = e == null ? void 0 : e.exposure) != null && w.evadeLocked)
    }),
    areaEffect: e != null && e.areaEffect ? foundry.utils.deepClone(e.areaEffect) : null
  };
}
function Dw({ attack: a = {}, geometry: e = null, attacker: t = null } = {}) {
  var o;
  const i = (a == null ? void 0 : a.template) ?? null, n = He(e);
  if (!i || !n) return [];
  const r = Ka(t), s = (r == null ? void 0 : r.id) ?? null;
  return (((o = canvas.tokens) == null ? void 0 : o.placeables) ?? []).filter((l) => l == null ? void 0 : l.actor).filter((l) => l.id !== s || (i == null ? void 0 : i.placement) === "origin").filter((l) => Or(n, l)).map((l) => {
    const c = Ou({ geometry: n, token: l });
    return pf(l, {
      exposureTier: c,
      areaEffect: {
        templateShape: (i == null ? void 0 : i.shape) ?? "",
        templatePlacement: (i == null ? void 0 : i.placement) ?? "",
        templateGeometry: oi(n)
      }
    });
  }).filter(Boolean);
}
function Ow({ attack: a = {}, geometry: e = null, attacker: t = null } = {}) {
  var o;
  const i = (a == null ? void 0 : a.template) ?? null, n = Ka(t), r = (n == null ? void 0 : n.id) ?? null, s = He(e);
  return !i || !s ? [] : (((o = canvas.tokens) == null ? void 0 : o.placeables) ?? []).filter((l) => l == null ? void 0 : l.actor).filter((l) => l.id !== r || (i == null ? void 0 : i.placement) === "origin").filter((l) => Or(s, l)).map((l) => ({
    token: l,
    exposureTier: Ou({ geometry: s, token: l })
  }));
}
function Lw({ geometry: a = null, attack: e = {}, attacker: t = null } = {}) {
  var m, f, p, h;
  const i = (e == null ? void 0 : e.template) ?? null, n = He(a);
  if (!i || !n) return [];
  const r = Ka(t), s = (r == null ? void 0 : r.id) ?? null, o = Number(((m = CONST == null ? void 0 : CONST.TOKEN_DISPOSITIONS) == null ? void 0 : m.HOSTILE) ?? -1), l = Number(((f = CONST == null ? void 0 : CONST.TOKEN_DISPOSITIONS) == null ? void 0 : f.FRIENDLY) ?? 1), c = Number(((p = CONST == null ? void 0 : CONST.TOKEN_DISPOSITIONS) == null ? void 0 : p.NEUTRAL) ?? 0), u = du(r), d = (g) => {
    const y = du(g);
    return r ? u === l ? y === o : u === o ? y === l : u === c ? y === o : y !== u : !0;
  };
  return (((h = canvas.tokens) == null ? void 0 : h.placeables) ?? []).filter((g) => g == null ? void 0 : g.actor).filter((g) => g.id !== s || (i == null ? void 0 : i.placement) === "origin").filter((g) => Or(n, g)).filter(d).map((g) => String(g.id ?? "").trim()).filter(Boolean);
}
function _w(a = {}) {
  var i;
  const e = String(((i = a == null ? void 0 : a.template) == null ? void 0 : i.shape) ?? "template").trim().toLowerCase();
  return `${e ? `${e.slice(0, 1).toUpperCase()}${e.slice(1)}` : "Template"} placement: left-click to place, right-click or Esc to cancel, Enter or Space to confirm.`;
}
async function xw({ attack: a = {} } = {}) {
  var t, i;
  const e = _w(a);
  return e && ((i = (t = ui.notifications) == null ? void 0 : t.info) == null || i.call(t, e)), new Promise((n) => {
    let r = !1;
    const s = () => {
      window.removeEventListener("pointerdown", u, !0), window.removeEventListener("keydown", d, !0), window.removeEventListener("contextmenu", m, !0);
    }, o = (f = !1) => {
      r || (r = !0, s(), n(!!f));
    }, l = (f) => {
      var p, h, g;
      (p = f == null ? void 0 : f.preventDefault) == null || p.call(f), (h = f == null ? void 0 : f.stopPropagation) == null || h.call(f), (g = f == null ? void 0 : f.stopImmediatePropagation) == null || g.call(f);
    }, c = (f) => {
      if (!(f instanceof HTMLElement)) return !1;
      const p = String(f.tagName ?? "").trim().toUpperCase();
      return f.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(p);
    }, u = (f) => {
      const p = Number((f == null ? void 0 : f.button) ?? 0), h = xo(f);
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
      xo(f) && l(f);
    };
    window.addEventListener("pointerdown", u, !0), window.addEventListener("keydown", d, !0), window.addEventListener("contextmenu", m, !0);
  });
}
async function $w({ actor: a = null, attack: e = {}, templateGeometry: t = null } = {}) {
  var o, l, c, u, d, m;
  if (!(canvas != null && canvas.scene) || Ru((e == null ? void 0 : e.areaEffect) ?? ((o = e == null ? void 0 : e.payload) == null ? void 0 : o.areaEffect) ?? {})) return null;
  const i = He(t, {
    template: e == null ? void 0 : e.template,
    placement: e == null ? void 0 : e.templatePlacement
  });
  if (!i) return null;
  const n = Lr(i);
  if (!n.length) return null;
  const r = `${String(((l = e == null ? void 0 : e.weapon) == null ? void 0 : l.name) ?? (e == null ? void 0 : e.name) ?? "Template").trim() || "Template"} Template`, [s] = await canvas.scene.createEmbeddedDocuments("Region", [{
    name: r,
    color: String(((c = game.user) == null ? void 0 : c.color) ?? "#ff6400").trim() || "#ff6400",
    visibility: pw,
    locked: !1,
    shapes: n,
    flags: {
      mwd: {
        templateIndicator: {
          sourceActorUuid: (a == null ? void 0 : a.uuid) ?? null,
          sourceItemUuid: ((u = e == null ? void 0 : e.weapon) == null ? void 0 : u.uuid) ?? null,
          payloadId: ((d = e == null ? void 0 : e.payloadState) == null ? void 0 : d.activePayloadId) ?? ((m = e == null ? void 0 : e.payload) == null ? void 0 : m.id) ?? "",
          label: r,
          templateGeometry: oi(i),
          templatePlacement: foundry.utils.deepClone((e == null ? void 0 : e.templatePlacement) ?? null),
          template: foundry.utils.deepClone((e == null ? void 0 : e.template) ?? null)
        }
      }
    }
  }]);
  return s ?? null;
}
async function Bw({ actor: a, attack: e } = {}) {
  if (!(canvas != null && canvas.scene))
    throw qi("Templated attacks require an active scene canvas.", { severity: "warn" });
  const t = (e == null ? void 0 : e.template) ?? null;
  if (!(t != null && t.shape) || !(Number(t == null ? void 0 : t.size) > 0))
    throw qi("Templated attack is missing valid template configuration.", { severity: "warn" });
  if (!xf.includes(t.shape))
    throw qi(`Template shape "${t.shape}" is normalized but not supported in v1.`, { severity: "warn" });
  const i = Ka(a);
  if (t.placement === "origin" && !i)
    throw qi("Origin-placed templated attacks require the attacker to have a token on the current scene.", { severity: "warn" });
  const n = Tw({ attack: e, actor: a });
  if (!n)
    throw qi("Unable to initialize template placement for this attack.", { severity: "warn" });
  const r = vw();
  let s = oi(n), o = "";
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
    Rw(r.templateLayer, s), Iw(r.markerLayer, Ow({ attack: e, geometry: s, attacker: a }));
  }, u = (d) => {
    const m = xo(d);
    if (!m) return;
    const f = Pw({
      geometry: s,
      pointer: m,
      attack: e,
      actor: a
    });
    if (!f) return;
    const p = l(f);
    p !== o && (s = f, o = p, c());
  };
  try {
    if (o = l(s), c(), window.addEventListener("pointermove", u), !await xw({
      attack: {
        ...e,
        actor: a
      }
    })) return null;
    const m = oi(s);
    if (!m) return null;
    const f = tp(m, t), p = Dw({
      attack: e,
      geometry: m,
      attacker: a
    });
    return {
      templateGeometry: oi(m),
      placement: (f == null ? void 0 : f.placement) ?? null,
      autoTargetTokenIds: Lw({
        geometry: m,
        attack: e,
        attacker: a
      }),
      targetSnapshots: p
    };
  } finally {
    window.removeEventListener("pointermove", u), Mw(r);
  }
}
function zw(a = {}) {
  var e;
  return Array.isArray(a == null ? void 0 : a.targetSnapshots) ? a.targetSnapshots : Array.from(((e = game.user) == null ? void 0 : e.targets) ?? []).map(pf).filter(Boolean);
}
function Fw(a, e = {}) {
  var n, r, s, o, l, c, u, d, m;
  const t = String((e == null ? void 0 : e.sourceTokenId) ?? "").trim();
  if (t) {
    const f = ((r = (n = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : n.get) == null ? void 0 : r.call(n, t)) ?? ((l = (o = (s = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : s.placeables) == null ? void 0 : o.find) == null ? void 0 : l.call(o, (p) => (p == null ? void 0 : p.id) === t)) ?? null;
    if (f) return f;
  }
  return ((u = (c = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : c.controlled) == null ? void 0 : u.find((f) => {
    var p;
    return ((p = f.actor) == null ? void 0 : p.id) === (a == null ? void 0 : a.id);
  })) ?? null ?? ((m = (d = a == null ? void 0 : a.getActiveTokens) == null ? void 0 : d.call(a, !0, !0)) == null ? void 0 : m[0]) ?? null;
}
function Uw(a = {}) {
  var t, i, n, r, s;
  const e = String((a == null ? void 0 : a.tokenId) ?? "").trim();
  return e ? ((i = (t = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : t.get) == null ? void 0 : i.call(t, e)) ?? ((s = (r = (n = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : n.placeables) == null ? void 0 : r.find) == null ? void 0 : s.call(r, (o) => (o == null ? void 0 : o.id) === e)) ?? null : null;
}
function jw(a, e) {
  var s, o, l, c;
  const t = canvas == null ? void 0 : canvas.grid, i = (a == null ? void 0 : a.center) ?? ((s = a == null ? void 0 : a.object) == null ? void 0 : s.center) ?? null, n = (e == null ? void 0 : e.center) ?? ((o = e == null ? void 0 : e.object) == null ? void 0 : o.center) ?? null;
  if (!t || !i || !n) return null;
  if (typeof t.measurePath == "function")
    try {
      const u = t.measurePath([i, n], { gridSpaces: !0 }), d = Number(
        (u == null ? void 0 : u.distance) ?? (u == null ? void 0 : u.cost) ?? (u == null ? void 0 : u.totalDistance) ?? (u == null ? void 0 : u.totalCost) ?? NaN
      );
      if (Number.isFinite(d)) return d;
    } catch {
    }
  const r = ((c = (l = foundry == null ? void 0 : foundry.canvas) == null ? void 0 : l.geometry) == null ? void 0 : c.Ray) ?? globalThis.Ray;
  if (typeof t.measureDistances == "function" && typeof r == "function")
    try {
      const u = t.measureDistances([{ ray: new r(i, n) }], { gridSpaces: !0 }), d = Number(Array.isArray(u) ? u[0] : NaN);
      if (Number.isFinite(d)) return d;
    } catch {
      return null;
    }
  return null;
}
function Hw({ actor: a, payload: e, weapon: t, targets: i = [] } = {}) {
  const n = String((e == null ? void 0 : e.rangeBand) ?? "").trim().toLowerCase();
  if (!(((t == null ? void 0 : t.type) === "personalWeapon" || (t == null ? void 0 : t.isSynthetic)) && i.length === 1))
    return n || String((t == null ? void 0 : t.defaultRangeBand) ?? "close").trim() || "close";
  const s = Fw(a, e), o = Uw(i[0]), l = jw(s, o), c = mg(l, (t == null ? void 0 : t.range) ?? {}, (t == null ? void 0 : t.defaultRangeBand) ?? "close");
  return c === "outOfRange" ? c : n || ((t == null ? void 0 : t.type) !== "personalWeapon" && !(t != null && t.isSynthetic) || i.length !== 1 ? String((t == null ? void 0 : t.defaultRangeBand) ?? "close").trim() || "close" : c);
}
function Kw(a) {
  return (a == null ? void 0 : a.type) === A.actorTypes.vehicle || (a == null ? void 0 : a.type) === A.actorTypes.battlemech;
}
function hf(a) {
  return ["mechWeapon", "vehicleWeapon"].includes((a == null ? void 0 : a.canonicalType) ?? (a == null ? void 0 : a.type));
}
function Ww(a = {}, e = {}) {
  return {
    close: Number(a.close ?? 0) + Number(e.close ?? 0),
    near: Number(a.near ?? 0) + Number(e.near ?? 0),
    far: Number(a.far ?? 0) + Number(e.far ?? 0),
    extreme: Number(a.extreme ?? 0) + Number(e.extreme ?? 0)
  };
}
function Gw(a, e) {
  var m, f, p, h;
  const t = String((e == null ? void 0 : e.weaponGroupId) ?? ((m = e == null ? void 0 : e.machineWeaponGroup) == null ? void 0 : m.id) ?? "").trim();
  if (!t) return null;
  const i = Array.from(((f = a.system) == null ? void 0 : f.weaponGroups) ?? ((h = (p = a.system) == null ? void 0 : p.mwd) == null ? void 0 : h.weaponGroupDetails) ?? []).find((g) => String((g == null ? void 0 : g.id) ?? "").trim() === t) ?? null, n = Array.isArray(i == null ? void 0 : i.weaponIds) ? i.weaponIds : Array.isArray(i == null ? void 0 : i.weapons) ? i.weapons.map((g) => g == null ? void 0 : g.id).filter(Boolean) : [], r = n.map((g) => {
    var y, b;
    return (b = (y = a.items) == null ? void 0 : y.get) == null ? void 0 : b.call(y, g);
  }).filter((g) => g && hf(g));
  if (!i || !r.length) return null;
  const s = r.map((g) => {
    var y;
    return ((y = g.getCombatProfile) == null ? void 0 : y.call(g)) ?? null;
  }).filter(Boolean), o = s[0] ?? {}, l = s.reduce((g, y) => Ww(g, y.attackRatingBand), {}), c = s.reduce((g, y) => g + (Number(y.damage ?? 0) || 0), 0), u = Math.max(0, ...s.map((g) => Number(g.ap ?? 0) || 0)), d = String(o.skill ?? "gunnery").trim() || "gunnery";
  return {
    id: i.id,
    uuid: a.uuid ?? null,
    name: i.name || "Weapon Group",
    img: o.img,
    type: "mechWeaponGroup",
    machineWeaponGroup: {
      id: i.id,
      weaponIds: n,
      weaponNames: r.map((g) => g.name)
    },
    category: o.category ?? "ranged",
    skill: d,
    skillDef: Dt(d),
    damage: c,
    ap: u,
    damageType: o.damageType ?? "kinetic",
    attackRatingBand: l,
    range: o.range ?? {},
    defaultRangeBand: o.defaultRangeBand ?? "near",
    effects: {},
    notes: s.map((g) => g.notes).filter(Boolean).join(`
`)
  };
}
function qw(a, e) {
  var i, n, r, s, o, l, c, u, d, m;
  if (((i = e == null ? void 0 : e.syntheticWeapon) == null ? void 0 : i.id) === "unarmed") {
    const f = zt.buildDefaultUnarmedProfile(a);
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
  if (Kw(a)) {
    const f = Gw(a, e);
    if (f) return f;
    const p = ((s = (r = a.items) == null ? void 0 : r.get) == null ? void 0 : s.call(r, (e == null ? void 0 : e.weaponId) ?? "")) ?? null;
    if (!p || !hf(p))
      throw new Error("Machine attack requires an owned vehicle or BattleMech weapon.");
    return ((o = p.getCombatProfile) == null ? void 0 : o.call(p)) ?? null;
  }
  const t = ((c = (l = a.items) == null ? void 0 : l.get) == null ? void 0 : c.call(l, (e == null ? void 0 : e.weaponId) ?? "")) ?? null;
  if (!t || !(((u = t.isPersonalWeapon) == null ? void 0 : u.call(t)) ?? t.type === "personalWeapon") || !((d = t.system) != null && d.equipped))
    throw new Error("Attack requires an equipped personal weapon.");
  return ((m = t.getCombatProfile) == null ? void 0 : m.call(t, { payloadId: e == null ? void 0 : e.payloadId })) ?? null;
}
async function Vw({ actor: a, payload: e } = {}) {
  var P, E, x, K, q, j, W, _, F, V, Y, te, he, ce, X, Ne, Le, _e;
  if (!a) throw new Error("resolveAttack requires actor");
  const t = qw(a, e);
  if (!t) throw new Error("Unable to resolve weapon profile.");
  if (Array.isArray((P = t == null ? void 0 : t.capabilityReport) == null ? void 0 : P.errors) && t.capabilityReport.errors.length > 0)
    throw qi(
      ((E = t.capabilityReport.errors[0]) == null ? void 0 : E.message) ?? "Weapon capability data is invalid for this attack.",
      { severity: "warn" }
    );
  const i = Dt(t.skill) ?? {
    code: t.skill,
    label: t.skill || "Attack",
    attribute: "reflexes",
    domains: ["physical"]
  }, n = String(i.attribute ?? "reflexes").trim() || "reflexes", r = ((x = a.getAttributeValue) == null ? void 0 : x.call(a, n)) ?? Number(((j = (q = (K = a.system) == null ? void 0 : K.attributes) == null ? void 0 : q[n]) == null ? void 0 : j.value) ?? 0), s = ((W = a.getSkillRating) == null ? void 0 : W.call(a, t.skill)) ?? Number(((V = (F = (_ = a.system) == null ? void 0 : _.skills) == null ? void 0 : F[t.skill]) == null ? void 0 : V.rating) ?? 0), o = Number(((he = (te = (Y = a.system) == null ? void 0 : Y.skills) == null ? void 0 : te[t.skill]) == null ? void 0 : he.bonus) ?? 0), l = new Set(zr(a.system ?? {}, t.skill)), c = Jo(t.skill, e == null ? void 0 : e.specializationKey), u = c && l.has(c.key) ? c : null, d = u ? Vo : 0, m = Number(((ce = t == null ? void 0 : t.effects) == null ? void 0 : ce.accuracyMod) ?? 0) || 0, f = o + m, p = zw(e), h = Hw({ actor: a, payload: e, weapon: t, targets: p }), g = (t == null ? void 0 : t.type) === "personalWeapon" || t != null && t.isSynthetic ? Gr(h) : h, y = Number(((X = t == null ? void 0 : t.attackRatingBand) == null ? void 0 : X[h]) ?? 0) || 0, b = !!((Ne = t == null ? void 0 : t.capabilityReport) != null && Ne.isTemplated), S = (Le = e == null ? void 0 : e.aim) != null && Le.active ? {
    active: !0,
    eligible: !b && p.length === 1,
    ineligibleReason: b ? "Aim cannot apply to template attacks." : p.length !== 1 ? "Aim cannot apply to multi-target attacks." : "",
    skillCode: t.skill,
    skillLabel: i.label ?? t.skill ?? "Attack Skill"
  } : null;
  if (!b && p.length === 0)
    throw qi("Target at least one token to attack.", { severity: "warn" });
  const w = Number(t.ap ?? 0) + Number(((_e = t == null ? void 0 : t.effects) == null ? void 0 : _e.ap) ?? 0), k = Number.isFinite(Number(e == null ? void 0 : e.dn)) ? Number(e.dn) : (t == null ? void 0 : t.type) === "personalWeapon" || t != null && t.isSynthetic ? dg(h, 1) : 1;
  return {
    intent: "attack",
    rollType: "simple",
    title: `${t.name} Attack`,
    subtitle: a.name ?? "Actor",
    domains: Array.isArray(i.domains) && i.domains.length ? i.domains : ["physical"],
    domainTags: ["combat", "attack"],
    diceTarget: Number.isFinite(Number(e == null ? void 0 : e.diceTarget)) ? Number(e.diceTarget) : 5,
    difficulty: { dn: k },
    dn: {
      parts: [{
        id: "difficulty.current",
        label: (t == null ? void 0 : t.type) === "personalWeapon" || t != null && t.isSynthetic ? `Base DN (${g})` : "DN",
        value: k,
        tags: ["manual"]
      }],
      total: k
    },
    edge: {
      earn: { enabled: !0, rate: 4, maxPerRoll: 1 }
    },
    pool: { attribute: r, skill: s, bonus: f, specialization: d },
    breakdown: [
      { id: "attribute", label: "Attribute", value: r },
      { id: "skill", label: i.label, value: s },
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
async function Yw({ actor: a, payload: e, event: t } = {}) {
  return {
    title: "Defense",
    intent: "defense",
    domainTags: ["combat"],
    pool: { attribute: 0, skill: 0, bonus: 0 },
    breakdown: [],
    mods: []
  };
}
async function Qw({ actor: a, payload: e, event: t } = {}) {
  return {
    title: "Resistance",
    intent: "resistance",
    domainTags: ["combat"],
    pool: { attribute: 0, skill: 0, bonus: 0 },
    breakdown: [],
    mods: []
  };
}
function Jw(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function Os(a, e) {
  var t, i, n;
  return Math.max(0, Jw((n = (i = (t = a == null ? void 0 : a.system) == null ? void 0 : t.attributes) == null ? void 0 : i[e]) == null ? void 0 : n.value, 0));
}
function Xw(a) {
  return (a == null ? void 0 : a.type) === A.actorTypes.vehicle || (a == null ? void 0 : a.type) === A.actorTypes.battlemech;
}
function Zw({ machineActor: a = null, pilotActor: e = null } = {}) {
  const t = Os(a, A.actorAttributes.handling), i = Os(a, A.actorAttributes.system), n = Os(e, A.actorAttributes.reflexes), r = i > t ? A.actorAttributes.system : A.actorAttributes.handling, s = i > t ? "System" : "Handling", o = Math.max(t, i);
  return {
    handling: t,
    system: i,
    machineAttributeKey: r,
    machineAttributeLabel: s,
    machineAttributeValue: o,
    pilotReflexes: n,
    totalBonus: o + n
  };
}
async function e0({ actor: a } = {}) {
  var i, n, r, s, o, l, c;
  if (Xw(a)) {
    const u = await wl({ machineActor: a }), d = Zw({
      machineActor: a,
      pilotActor: u.actor
    }), m = (i = u.actor) != null && i.name ? `Pilot REF (${u.actor.name})` : "Pilot REF";
    return {
      intent: "initiative",
      title: "Initiative",
      rollType: "sum",
      domains: ["combat", "machine"],
      sum: {
        formula: "2d6 + @machine + @pilotReflexes",
        data: {
          machine: d.machineAttributeValue,
          pilotReflexes: d.pilotReflexes
        }
      },
      breakdown: [
        { id: "base", label: "2d6", value: 0 },
        {
          id: `machine.${d.machineAttributeKey}`,
          label: `Best Machine (${d.machineAttributeLabel})`,
          value: d.machineAttributeValue
        },
        {
          id: "pilot.reflexes",
          label: m,
          value: d.pilotReflexes,
          title: u.reason
        }
      ],
      pool: { attribute: 0, skill: 0, bonus: 0 }
    };
  }
  const e = Number(((s = (r = (n = a.system) == null ? void 0 : n.attributes) == null ? void 0 : r.reflexes) == null ? void 0 : s.value) ?? 0), t = Number(((c = (l = (o = a.system) == null ? void 0 : o.attributes) == null ? void 0 : l.edge) == null ? void 0 : c.value) ?? 0);
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
async function t0({ actor: a }) {
  var i, n, r, s, o;
  const e = Number(((n = (i = a.system) == null ? void 0 : i.burn) == null ? void 0 : n.value) ?? 0);
  e < 6 && ui.notifications.warn("Overload check is only required at Burn 6+.");
  const t = Number(((o = (s = (r = a.system) == null ? void 0 : r.attributes) == null ? void 0 : s.willpower) == null ? void 0 : o.value) ?? 0);
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
function $o(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function i0(a = null, e = "") {
  var t, i, n, r, s, o;
  return {
    rating: $o((n = (i = (t = a == null ? void 0 : a.system) == null ? void 0 : t.skills) == null ? void 0 : i[e]) == null ? void 0 : n.rating, 0),
    bonus: $o((o = (s = (r = a == null ? void 0 : a.system) == null ? void 0 : r.skills) == null ? void 0 : s[e]) == null ? void 0 : o.bonus, 0)
  };
}
async function a0({ actor: a, payload: e } = {}) {
  var l, c, u, d, m, f, p;
  const t = await kl(e, {
    gmOverride: !!(e != null && e.gmOverride)
  });
  if (!t.ok)
    throw new Error(t.reason ?? "Machine remedy could not be prepared.");
  const i = await ts(e, {
    gmOverride: !!(e != null && e.gmOverride)
  });
  if (!i.ok)
    throw new Error(i.reason ?? "Machine remedy could not be resolved.");
  const n = Dt(i.skillKey);
  if (!n)
    throw new Error(`Machine remedy is missing a valid skill: ${i.skillKey}`);
  const r = t.actor ?? a ?? i.operatorActor ?? i.machineActor, s = $o((d = (u = (c = (l = i.machineActor) == null ? void 0 : l.system) == null ? void 0 : c.attributes) == null ? void 0 : u.reliability) == null ? void 0 : d.value, 0), o = i0(r, i.skillKey);
  return {
    intent: "machineRemedy",
    rollType: "simple",
    title: `${i.remedy.label}: ${i.crit.label ?? "Critical Remedy"}`,
    subtitle: `${((m = i.machineActor) == null ? void 0 : m.name) ?? "Machine"} | ${i.crit.locationLabel ?? i.locationKey}`,
    domains: ["mental"],
    diceTarget: 5,
    difficulty: { dn: i.totalDn },
    pool: {
      attribute: s,
      skill: o.rating,
      bonus: o.bonus,
      specialization: 0
    },
    breakdown: [
      { id: "reliability", label: "Reliability", value: s },
      { id: "skill", label: n.label, value: o.rating },
      ...o.bonus ? [{ id: "skillBonus", label: "Skill Bonus", value: o.bonus }] : []
    ],
    machineRemedy: {
      machineActorUuid: ((f = i.machineActor) == null ? void 0 : f.uuid) ?? "",
      operatorActorUuid: ((p = i.operatorActor) == null ? void 0 : p.uuid) ?? "",
      critId: i.crit.id,
      critLabel: i.crit.label ?? "",
      locationKey: i.locationKey,
      locationLabel: i.crit.locationLabel ?? i.locationKey,
      remedyKey: i.remedy.key,
      remedyLabel: i.remedy.label,
      skillKey: i.skillKey,
      skillLabel: n.label,
      baseDn: i.baseDn,
      conditionModifier: i.locationConditionModifier,
      conditionLabel: i.locationConditionLabel,
      conditionValue: i.locationCondition,
      totalDn: i.totalDn,
      gmOverride: i.gmOverride,
      remedyEffect: i.remedyEffect,
      cost: i.remedy.cost
    }
  };
}
const n0 = {
  skill: ow,
  edge: uw,
  attribute: dw,
  common: mw,
  attack: Vw,
  defense: Yw,
  resistance: Qw,
  initiative: e0,
  overload: t0,
  machineRemedy: a0
};
async function Ls({ actor: a, payload: e, event: t } = {}) {
  if (!a) throw new Error("resolveIntent requires actor");
  const i = String((e == null ? void 0 : e.intent) ?? "").trim();
  if (!i) throw new Error("resolveIntent requires payload.intent");
  const n = n0[i];
  if (!n) throw new Error(`Unsupported roll intent: ${i}`);
  const r = await n({ actor: a, payload: e, event: t });
  return r0(r, { intent: i });
}
function r0(a, { intent: e } = {}) {
  (!a || typeof a != "object") && (a = {}), a.intent = a.intent ?? e ?? "unknown", a.title = String(a.title ?? "Roll"), a.domains = Array.isArray(a.domains) ? a.domains : [], a.breakdown = Array.isArray(a.breakdown) ? a.breakdown : [], a.mods = Array.isArray(a.mods) ? a.mods : [];
  const t = a.pool && typeof a.pool == "object" ? a.pool : {}, i = Number(t.attribute ?? t.base ?? 0), n = Number(t.skill ?? t.rating ?? 0), r = Number(t.bonus ?? 0), s = Number(t.specialization ?? 0);
  if (![i, n, r, s].every(Number.isFinite))
    throw console.error("MWD | Invalid pool parts after intent resolution", { intent: e, ctx: a }), new Error("MWD.roll: pool parts must be numeric (attribute/skill/bonus/specialization).");
  return a.pool = {
    attribute: i,
    skill: n,
    bonus: r,
    specialization: s,
    totalBase: i + n + r + s
  }, a.rollType = a.rollType ?? "simple", a.diceTarget = Number.isFinite(a.diceTarget) ? a.diceTarget : Number(a.target ?? 5), a.difficulty && typeof a.difficulty == "object" ? a.difficulty.dn = Number(a.difficulty.dn ?? 0) : Number.isFinite(a.dn) && (a.difficulty = { dn: Number(a.dn) }), a.breakdown.length || (a.breakdown = [
    { id: "attribute", label: "Attribute", value: i },
    { id: "skill", label: "Skill", value: n },
    { id: "bonus", label: "Bonus", value: r },
    ...s ? [{ id: "specialization", label: "Specialization", value: s }] : []
  ]), a;
}
var La;
class s0 {
  constructor() {
    we(this, La, /* @__PURE__ */ new Map());
  }
  register(e) {
    if (!(e != null && e.id) || typeof e.collect != "function")
      throw new Error("Invalid ModifierProvider: missing id or collect()");
    H(this, La).has(e.id) || H(this, La).set(e.id, e);
  }
  async collectAll(e) {
    const t = [];
    for (const i of H(this, La).values()) {
      const n = await i.collect(e);
      if (console.log("MWD | provider", i.id, "returned", n), !!(n != null && n.length))
        for (const r of n)
          r && typeof r.label == "string" && typeof r.value == "number" && typeof r.source == "string" ? t.push(r) : console.warn("MWD | DROPPED MOD (bad shape)", i.id, r);
    }
    return t;
  }
}
La = new WeakMap();
const ti = new s0();
function o0(a) {
  if (a == null || a === "" || a === "—" || a === "–") return 0;
  const e = Number(a);
  return Number.isFinite(e) ? e : null;
}
function l0(a) {
  const e = o0(a == null ? void 0 : a.value);
  return e === null ? null : { ...a, value: e };
}
async function mu({
  actor: a,
  rollType: e,
  skillId: t,
  domains: i,
  // NEW (optional)
  payload: n,
  resolved: r,
  context: s
} = {}) {
  const o = { actor: a, rollType: e, skillId: t, domains: i, payload: n, resolved: r, context: s }, l = await ti.collectAll(o);
  console.log("MWD|condition collect called", o.rollType);
  let c = [];
  for (const d of l ?? []) {
    const m = l0(d);
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
function c0({
  actor: a,
  payload: e,
  ctx: t,
  roll: i,
  target: n,
  pool: r,
  mods: s = [],
  modTotal: o = 0,
  hits: l = null,
  ones: c = null,
  edge: u = null,
  outcomeModel: d = null
} = {}) {
  var K, q, j, W;
  if (!a) throw new Error("buildResolved requires actor");
  if (!(e != null && e.intent)) throw new Error("buildResolved requires payload.intent");
  if (!i) throw new Error("buildResolved requires roll");
  const m = foundry.utils.randomID(), f = (K = i.dice) == null ? void 0 : K[0], h = (Array.isArray(f == null ? void 0 : f.results) ? f.results : []).map((_, F) => {
    const V = `pool:${F}`, Y = Number(_.result), te = !!_.success;
    return {
      ref: V,
      face: Y,
      isSuccess: te,
      isFailure: !te,
      tooltip: te ? `Die ${F + 1}: ${Y} (Success vs TN ${Number(n ?? 5)})` : `Die ${F + 1}: ${Y} (Failure vs TN ${Number(n ?? 5)})`
    };
  }), g = h.filter((_) => _.isFailure).map((_) => _.ref), y = [{
    id: "pool",
    label: "Pool",
    faces: 6,
    termIndex: 0,
    // informational only
    dice: h
  }], b = (Array.isArray(s) ? s : []).map((_, F) => {
    const V = Number(_.value ?? 0), Y = `mod:${d0(_.label ?? "mod")}:${F}`;
    return {
      id: _.id ?? Y,
      label: _.label ?? "Modifier",
      value: V,
      domain: _.domain ?? null,
      source: _.source ?? null,
      tooltip: _.tooltip ?? `${_.label ?? "Modifier"} ${fu(V)}`
    };
  }), S = b.map((_) => _.id), k = (Array.isArray(t == null ? void 0 : t.breakdown) ? t.breakdown : []).map((_) => ({
    id: `pool.${_.id ?? foundry.utils.randomID()}`,
    label: _.label ?? _.id ?? "Row",
    value: Number(_.value ?? 0),
    tooltip: `Contribution from ${_.label ?? _.id}: ${Number(_.value ?? 0)}`
  }));
  k.push({
    id: "mods.total",
    label: "Mods",
    value: Number(o ?? 0),
    modIds: S,
    tooltip: b.length ? b.map((_) => `${_.label}: ${fu(_.value)}`).join(`
`) : "No roll-time modifiers."
  }), k.push({
    id: "pool.final",
    label: "Final Pool",
    value: Number(r ?? 0),
    tooltip: `Final dice pool rolled: ${Number(r ?? 0)}d6`
  });
  const P = Number.isFinite(Number(l)) ? Number(l) : h.filter((_) => _.isSuccess).length, E = Number.isFinite(Number(c)) ? Number(c) : h.filter((_) => _.face === 1).length, x = u0(u, { payload: e });
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
    machineRemedy: (t == null ? void 0 : t.machineRemedy) ?? null,
    specialization: (t == null ? void 0 : t.specialization) ?? null,
    dn: (t == null ? void 0 : t.dn) ?? (((q = t == null ? void 0 : t.difficulty) == null ? void 0 : q.dn) !== void 0 ? {
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
        pool: ((j = t == null ? void 0 : t.edge) == null ? void 0 : j.pool) ?? null,
        earn: ((W = t == null ? void 0 : t.edge) == null ? void 0 : W.earn) ?? null
      }
    },
    // Roll + dice
    roll: {
      json: i.toJSON(),
      formula: i.formula,
      target: Number(n ?? 5),
      pool: Number(r ?? 0),
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
    breakdownRows: k,
    modifiers: {
      applied: b,
      total: Number(o ?? 0)
    },
    areaEffectPreviewState: foundry.utils.deepClone((e == null ? void 0 : e.areaEffectPreviewState) ?? {}),
    // Edge snapshot / affordances
    edge: x
  };
}
function u0(a, { payload: e } = {}) {
  var p, h, g, y, b, S, w, k, P, E, x, K, q, j;
  const t = !!((p = e == null ? void 0 : e.edge) != null && p.enabled), i = (a == null ? void 0 : a.domain) ?? null, n = (a == null ? void 0 : a.pools) ?? null, r = ((h = a == null ? void 0 : a.pre) == null ? void 0 : h.poolKey) ?? ((y = (g = e == null ? void 0 : e.edge) == null ? void 0 : g.pre) == null ? void 0 : y.poolKey) ?? (t ? ((b = e == null ? void 0 : e.edge) == null ? void 0 : b.poolKey) ?? null : null), s = Number(((S = a == null ? void 0 : a.pre) == null ? void 0 : S.spent) ?? ((k = (w = e == null ? void 0 : e.edge) == null ? void 0 : w.pre) == null ? void 0 : k.spent) ?? (t ? 1 : 0)) ? 1 : 0, o = ((P = a == null ? void 0 : a.post) == null ? void 0 : P.poolKey) ?? ((x = (E = e == null ? void 0 : e.edge) == null ? void 0 : E.post) == null ? void 0 : x.poolKey) ?? null, l = Number(((K = a == null ? void 0 : a.post) == null ? void 0 : K.spent) ?? ((j = (q = e == null ? void 0 : e.edge) == null ? void 0 : q.post) == null ? void 0 : j.spent) ?? 0) ? 1 : 0, c = (n == null ? void 0 : n.a) ?? null, u = (n == null ? void 0 : n.b) ?? null, d = [c, u].filter(Boolean);
  let m = [c, u].filter(Boolean);
  s && r && (m = m.filter((W) => W !== r));
  const f = {
    canSpendPre: d.length > 0 && !s,
    // spending pre after roll is not a thing
    canSpendPost: m.length > 0 && !l,
    canPostRerollFailures: m.length > 0 && !l
  };
  return {
    domain: i,
    pools: n ? { a: c, b: u } : null,
    pre: { poolKey: r, spent: s },
    post: { poolKey: o, spent: l },
    allowed: {
      prePools: d,
      postPools: m
    },
    availableActions: f
  };
}
function fu(a) {
  const e = Number(a ?? 0);
  return e >= 0 ? `+${e}` : `${e}`;
}
function d0(a) {
  return String(a).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
const { ApplicationV2: m0, HandlebarsApplicationMixin: f0 } = foundry.applications.api;
function p0(a, e = -3, t = 3) {
  const i = [], n = "../img/dice";
  for (let r = e; r <= t; r++) {
    const s = Math.abs(r), o = s === 0 ? `${n}/BlankDice.webp` : `${n}/D6_${s}.svg`;
    i.push({
      value: r,
      abs: s,
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
function pu(a) {
  return (Array.isArray(a) ? a : []).map((t) => ({
    id: (t == null ? void 0 : t.id) ?? foundry.utils.randomID(),
    label: typeof (t == null ? void 0 : t.label) == "string" ? t.label : "Manual",
    value: Number((t == null ? void 0 : t.value) ?? 0)
  }));
}
function _s(a, e) {
  const t = a == null ? void 0 : a.toggles;
  return t && typeof t == "object" && e in t ? !!t[e] : !!(a != null && a[e]);
}
function h0(a, e) {
  a.useEdge = !!e.useEdge, a.takeRisks = !!e.takeRisks, a.opponentRoll = !!e.opponentRoll, a.toggles = a.toggles && typeof a.toggles == "object" ? a.toggles : {}, a.toggles.useEdge = !!e.useEdge, a.toggles.takeRisks = !!e.takeRisks, a.toggles.opponentRoll = !!e.opponentRoll;
}
function hu(a, e, t) {
  const i = String(t ?? "").trim(), n = i ? Kp(e, i) : "";
  if (i && n) {
    a.specializationKey = i, a.specializationLabel = n;
    return;
  }
  delete a.specializationKey, delete a.specializationLabel;
}
function g0(a) {
  const e = Array.isArray(a == null ? void 0 : a.breakdown) ? a.breakdown : [], t = (i) => {
    var n;
    return Number(((n = e.find((r) => (r == null ? void 0 : r.id) === i)) == null ? void 0 : n.value) ?? 0);
  };
  return {
    attribute: t("attribute"),
    skill: t("skill"),
    bonus: t("bonus"),
    specialization: t("specialization")
  };
}
var Lt;
const Ve = class Ve extends f0(m0) {
  constructor({ actor: t, baseContext: i, initialState: n = null, options: r = {} }) {
    var c, u;
    super(r);
    we(this, Lt, null);
    /** @type {{ baseContext: any, state: any }} */
    O(this, "_mwd", { baseContext: null, state: null });
    this.actor = t, this._mwd.baseContext = i ?? {};
    const s = foundry.utils.deepClone(this._mwd.baseContext.payload ?? {}), o = pu(s.manualModifiers);
    this._mwd.state = foundry.utils.mergeObject(
      {
        payload: s,
        manual: o,
        toggles: {
          useEdge: _s(s, "useEdge"),
          takeRisks: _s(s, "takeRisks"),
          opponentRoll: _s(s, "opponentRoll")
        }
      },
      n ?? {},
      { inplace: !1, insertKeys: !0, insertValues: !0, overwrite: !0 }
    );
    const l = String(((u = (c = s == null ? void 0 : s.edge) == null ? void 0 : c.pre) == null ? void 0 : u.poolKey) ?? "").trim() || null;
    this._mwd.state.edge = {
      prePoolKey: l
    };
  }
  async wait() {
    return new Promise((t) => {
      Ee(this, Lt, t), this.render(!0);
    });
  }
  async close(t = {}) {
    if (H(this, Lt)) {
      const i = H(this, Lt);
      Ee(this, Lt, null), i(null);
    }
    return super.close(t);
  }
  /* --------------------------- */
  /* Prepare Context             */
  /* --------------------------- */
  async _prepareContext(t) {
    var K, q, j, W, _, F, V, Y, te, he, ce, X, Ne, Le, _e, Ue, We, ot, Ye, lt, it, Qe, bt, kt, vt, Mt, N, U, ge, re, Ie, M, R, Q, se, ae, be, ze, at, dt, Ot;
    const i = this._mwd.baseContext ?? {}, n = this._mwd.state ?? {}, r = Number.isFinite(Number((K = n == null ? void 0 : n.payload) == null ? void 0 : K.dn)) ? Number(n.payload.dn) : Number.isFinite(Number((j = (q = i == null ? void 0 : i.resolved) == null ? void 0 : q.dn) == null ? void 0 : j.total)) ? Number(i.resolved.dn.total) : Number.isFinite(Number(i == null ? void 0 : i.dn)) ? Number(i.dn) : Number.isFinite(Number((_ = (W = i == null ? void 0 : i.resolved) == null ? void 0 : W.difficulty) == null ? void 0 : _.dn)) ? Number(i.resolved.difficulty.dn) : 1, s = (i == null ? void 0 : i.intent) ?? "skill";
    let o, l;
    const c = Array.isArray(n.manual) ? n.manual.reduce((ne, Te) => ne + Number((Te == null ? void 0 : Te.value) || 0), 0) : 0;
    if (s === "edge") {
      const ne = (i == null ? void 0 : i.resolved) ?? {}, Te = Array.isArray(ne.breakdown) ? ne.breakdown : [], ct = (mt) => {
        var Je;
        return Number(((Je = Te.find((Jt) => Jt.id === mt)) == null ? void 0 : Je.value) ?? 0);
      }, ut = Number(((F = ne == null ? void 0 : ne.pool) == null ? void 0 : F.attribute) ?? 0);
      o = {
        pool: ut,
        rating: ct("rating"),
        cap: ct("cap"),
        modifiers: Number(((V = i == null ? void 0 : i.dice) == null ? void 0 : V.modifiers) ?? 0)
      }, l = Math.max(0, ut + o.modifiers + c);
    } else {
      o = {
        attribute: Number(((Y = i == null ? void 0 : i.dice) == null ? void 0 : Y.attribute) ?? 0),
        skill: Number(((te = i == null ? void 0 : i.dice) == null ? void 0 : te.skill) ?? 0),
        bonus: Number(((he = i == null ? void 0 : i.dice) == null ? void 0 : he.bonus) ?? 0),
        specialization: Number(((ce = i == null ? void 0 : i.dice) == null ? void 0 : ce.specialization) ?? 0),
        modifiers: Number(((X = i == null ? void 0 : i.dice) == null ? void 0 : X.modifiers) ?? 0)
      };
      const ne = o.modifiers + c, Te = o.attribute + o.skill + o.bonus + o.specialization;
      l = Math.max(0, Te + ne);
    }
    const u = Array.isArray((Ne = i == null ? void 0 : i.resolved) == null ? void 0 : Ne.domains) ? i.resolved.domains : [], d = u.includes("physical") ? "physical" : u.includes("mental") ? "mental" : u.includes("social") ? "social" : null, f = (d === "physical" ? ["grit", "chaos"] : d === "mental" ? ["insight", "rumor"] : d === "social" ? ["legend", "credibility"] : []).map((ne) => {
      var Te, ct, ut, mt;
      return {
        key: ne,
        label: ne.charAt(0).toUpperCase() + ne.slice(1),
        available: Number(((ut = (ct = (Te = this.actor) == null ? void 0 : Te.getEdgePool) == null ? void 0 : ct.call(Te, ne)) == null ? void 0 : ut.effectiveValue) ?? 0),
        selected: ne === (((mt = n.edge) == null ? void 0 : mt.prePoolKey) ?? null)
      };
    }), p = f.find((ne) => ne.selected), h = (p == null ? void 0 : p.label) ?? null, g = ((Le = i == null ? void 0 : i.resolved) == null ? void 0 : Le.attack) ?? null, y = String(
      ((_e = g == null ? void 0 : g.skill) == null ? void 0 : _e.code) ?? ((We = (Ue = i == null ? void 0 : i.resolved) == null ? void 0 : Ue.specialization) == null ? void 0 : We.skillKey) ?? ((Ye = (ot = i == null ? void 0 : i.resolved) == null ? void 0 : ot.data) == null ? void 0 : Ye.skillKey) ?? ((lt = i == null ? void 0 : i.payload) == null ? void 0 : lt.key) ?? ""
    ).trim(), b = y ? td(((it = this.actor) == null ? void 0 : it.system) ?? {}, y) : [], S = String(((Qe = n == null ? void 0 : n.payload) == null ? void 0 : Qe.specializationKey) ?? "").trim(), w = b.find((ne) => ne.key === S) ?? null;
    if (s !== "edge") {
      o.specialization = w ? Number(((kt = (bt = i == null ? void 0 : i.resolved) == null ? void 0 : bt.specialization) == null ? void 0 : kt.value) ?? 2) : 0;
      const ne = o.modifiers + c, Te = o.attribute + o.skill + o.bonus + o.specialization;
      l = Math.max(0, Te + ne);
    }
    const k = Array.isArray((vt = g == null ? void 0 : g.payloadState) == null ? void 0 : vt.payloads) ? g.payloadState.payloads : [], P = String(((Mt = g == null ? void 0 : g.weapon) == null ? void 0 : Mt.category) ?? "").trim().toLowerCase() !== "melee" && k.length > 0, E = String(((N = n == null ? void 0 : n.payload) == null ? void 0 : N.payloadId) ?? ((U = g == null ? void 0 : g.payloadState) == null ? void 0 : U.activePayloadId) ?? "").trim(), x = k.find((ne) => ne.id === E) ?? null;
    return {
      header: {
        left: ((ge = i == null ? void 0 : i.header) == null ? void 0 : ge.left) ?? "Roll",
        right: ((re = i == null ? void 0 : i.header) == null ? void 0 : re.right) ?? ((Ie = this.actor) == null ? void 0 : Ie.name) ?? ""
      },
      formula: String((i == null ? void 0 : i.formula) ?? ((M = i == null ? void 0 : i.resolved) == null ? void 0 : M.formula) ?? "").trim(),
      dice: o,
      modifiers: Array.isArray(i.modifiers) ? i.modifiers : [],
      manual: (n.manual ?? []).map((ne) => ({
        ...ne,
        steps: p0(Number(ne.value ?? 0), -3, 3)
      })),
      edge: {
        domain: d,
        choices: f,
        selectedLabel: h
      },
      toggles: s === "edge" ? { useEdge: !1, takeRisks: !1, opponentRoll: !1 } : n.toggles,
      totalPool: l,
      intent: s,
      dn: r,
      specialization: b.length ? {
        skillCode: y,
        options: b.map((ne) => ({
          key: ne.key,
          label: ne.label,
          selected: ne.key === S
        })),
        selectedKey: S,
        selectedLabel: (w == null ? void 0 : w.label) ?? ""
      } : null,
      attack: g ? {
        weaponName: ((R = g == null ? void 0 : g.weapon) == null ? void 0 : R.name) ?? "Weapon",
        rangeBand: ((Q = g == null ? void 0 : g.weapon) == null ? void 0 : Q.type) === "personalWeapon" || (se = g == null ? void 0 : g.weapon) != null && se.isSynthetic ? Gr((g == null ? void 0 : g.rangeBand) ?? "") : (g == null ? void 0 : g.rangeBand) ?? "",
        damageType: ((ae = x == null ? void 0 : x.modifies) == null ? void 0 : ae.damageType) || ((be = g == null ? void 0 : g.weapon) == null ? void 0 : be.damageTypeLabel) || ((ze = g == null ? void 0 : g.weapon) == null ? void 0 : ze.damageType) || "",
        usesPayloads: P,
        source: (g == null ? void 0 : g.sourceState) ?? null,
        payloads: k.map((ne) => {
          var Te;
          return {
            id: ne.id,
            name: ne.label,
            damageType: (Te = ne.modifies) == null ? void 0 : Te.damageType,
            selected: ne.id === E
          };
        }),
        selectedPayloadId: E,
        selectedPayloadLabel: (x == null ? void 0 : x.label) ?? ((at = g == null ? void 0 : g.payload) == null ? void 0 : at.label) ?? ((dt = g == null ? void 0 : g.weapon) == null ? void 0 : dt.payloadLabel) ?? "",
        selectedSourceLabel: ((Ot = g == null ? void 0 : g.sourceState) == null ? void 0 : Ot.label) ?? ""
      } : null
    };
  }
  /* --------------------------- */
  /* Actions                     */
  /* --------------------------- */
  async _onCancel(t) {
    if (t == null || t.preventDefault(), H(this, Lt)) {
      const i = H(this, Lt);
      Ee(this, Lt, null), i(null);
    }
    return this.close();
  }
  async _onSubmit(t) {
    var n, r, s, o, l, c, u, d, m, f, p, h, g;
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
    }), h0(i.payload, i.toggles ?? {}), hu(
      i.payload,
      ((n = i.payload) == null ? void 0 : n.intent) === "attack" ? ((r = i.payload) == null ? void 0 : r.skillKey) ?? ((c = (l = (o = (s = this._mwd.baseContext) == null ? void 0 : s.resolved) == null ? void 0 : o.attack) == null ? void 0 : l.skill) == null ? void 0 : c.code) : ((u = i.payload) == null ? void 0 : u.key) ?? ((f = (m = (d = this._mwd.baseContext) == null ? void 0 : d.resolved) == null ? void 0 : m.data) == null ? void 0 : f.skillKey),
      (p = i.payload) == null ? void 0 : p.specializationKey
    ), H(this, Lt)) {
      const y = H(this, Lt);
      Ee(this, Lt, null), y({ payload: i.payload });
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
    const n = (r = i == null ? void 0 : i.dataset) == null ? void 0 : r.id;
    if (n)
      return this._mwd.state.manual = this._mwd.state.manual.filter((s) => s.id !== n), this.render(!1);
  }
  async _onSetManualValue(t, i) {
    var o, l;
    t == null || t.preventDefault();
    const n = (o = i == null ? void 0 : i.dataset) == null ? void 0 : o.id, r = (l = i == null ? void 0 : i.dataset) == null ? void 0 : l.field;
    if (!n || !r) return;
    const s = this._mwd.state.manual.find((c) => c.id === n);
    if (s)
      return r === "label" && (s.label = String(i.value ?? "")), r === "value" && (s.value = Number(i.value ?? 0)), this.render(!1);
  }
  async _onSetManualStepper(t, i) {
    var o, l;
    t == null || t.preventDefault();
    const n = (o = i == null ? void 0 : i.dataset) == null ? void 0 : o.id, r = Number((l = i == null ? void 0 : i.dataset) == null ? void 0 : l.value);
    if (!n || Number.isNaN(r)) return;
    const s = this._mwd.state.manual.find((c) => c.id === n);
    if (s)
      return s.value = r, this.render(!1);
  }
  async _onSetEdgePrePool(t, i) {
    var r;
    t == null || t.preventDefault();
    const n = String(((r = i == null ? void 0 : i.dataset) == null ? void 0 : r.poolKey) ?? "").trim();
    if (n)
      return this._mwd.state.edge = this._mwd.state.edge ?? {}, this._mwd.state.edge.prePoolKey = n, this._mwd.state.toggles.useEdge = !0, this.render(!1);
  }
  async _onToggleCheckbox(t, i) {
    var r;
    t == null || t.preventDefault();
    const n = (r = i == null ? void 0 : i.dataset) == null ? void 0 : r.key;
    if (n)
      return this._mwd.state.toggles[n] = !!i.checked, this.render(!1);
  }
  async _onSetDn(t, i) {
    t == null || t.preventDefault();
    const n = String((i == null ? void 0 : i.value) ?? "").trim(), r = n === "" ? null : Number(n);
    return this._mwd.state.payload.dn = Number.isFinite(r) ? Math.max(0, Math.trunc(r)) : null, this.render(!1);
  }
  async _onSetPayload(t, i) {
    return t == null || t.preventDefault(), this._mwd.state.payload.payloadId = String((i == null ? void 0 : i.value) ?? "").trim(), this.render(!1);
  }
  async _onSetSpecialization(t, i) {
    var s;
    t == null || t.preventDefault();
    const n = String(((s = i == null ? void 0 : i.dataset) == null ? void 0 : s.skillCode) ?? "").trim(), r = String((i == null ? void 0 : i.value) ?? "").trim();
    if (n)
      return hu(this._mwd.state.payload, n, r), this.render(!1);
  }
  _onRender(t, i) {
    var r, s;
    (r = super._onRender) == null || r.call(this, t, i);
    const n = this.element instanceof HTMLElement ? this.element : (s = this.element) == null ? void 0 : s[0];
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
  static async prompt({ actor: t, basePayload: i, resolved: n, diceParts: r = null, mods: s = [], modTotal: o = 0 } = {}) {
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
    }, u = r ?? g0(n), d = {
      attribute: Number((u == null ? void 0 : u.attribute) ?? 0),
      skill: Number((u == null ? void 0 : u.skill) ?? 0),
      bonus: Number((u == null ? void 0 : u.bonus) ?? 0),
      specialization: Number((u == null ? void 0 : u.specialization) ?? 0),
      modifiers: Number(o ?? 0)
    }, m = (Array.isArray(s) ? s : []).map((y) => ({
      label: y.label ?? "Modifier",
      source: y.source ?? "",
      value: Number(y.value ?? 0)
    }));
    l.manualModifiers = pu(l.manualModifiers);
    const p = await new Ve({
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
Lt = new WeakMap(), O(Ve, "DEFAULT_OPTIONS", foundry.utils.mergeObject(
  Xt(Ve, Ve, "DEFAULT_OPTIONS"),
  {
    id: "mwd-roll-dialog",
    classes: [
      ...Xt(Ve, Ve, "DEFAULT_OPTIONS").classes ?? [],
      "mwd",
      "mwd-roll-dialog"
    ],
    window: { title: "Roll", resizable: !1 },
    position: { width: 520, height: "auto" },
    actions: {
      submit: Ve.prototype._onSubmit,
      cancel: Ve.prototype._onCancel,
      addManual: Ve.prototype._onAddManual,
      removeManual: Ve.prototype._onRemoveManual,
      setManualValue: Ve.prototype._onSetManualValue,
      setManualStepper: Ve.prototype._onSetManualStepper,
      setEdgePrePool: Ve.prototype._onSetEdgePrePool,
      toggleCheckbox: Ve.prototype._onToggleCheckbox,
      setDn: Ve.prototype._onSetDn,
      setPayload: Ve.prototype._onSetPayload,
      setSpecialization: Ve.prototype._onSetSpecialization
    }
  },
  { inplace: !1 }
)), O(Ve, "PARTS", {
  body: { template: "systems/mwd/templates/v2/roll/mwd-roll-dialog.hbs" }
});
let Bo = Ve;
const { ApplicationV2: y0, HandlebarsApplicationMixin: b0 } = foundry.applications.api, mn = class mn extends b0(y0) {
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
      classes: [game.system.anarchy.styles.selectCssClass(), ...mn.DEFAULT_OPTIONS.classes],
      window: { title: e }
    };
    return new mn({ items: t }, i).wait();
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
O(mn, "PARTS", {
  body: {
    template: `${ee}/dialog/select-item.hbs`
  }
});
let zo = mn;
const gu = { execute: M0 }, S0 = {
  physical: ["grit", "chaos"],
  mental: ["insight", "rumor"],
  social: ["legend", "credibility"]
};
function A0(a, e) {
  var r;
  const t = S0[e] ?? [];
  let i = null, n = -1;
  for (const s of t) {
    const o = (r = a.getEdgePool) == null ? void 0 : r.call(a, s), l = Number((o == null ? void 0 : o.rating) ?? 0), c = Number((o == null ? void 0 : o.value) ?? 0), u = Math.max(0, l - c);
    u > n && (n = u, i = s);
  }
  return i ?? t[0] ?? null;
}
function T0(a) {
  const t = (Array.isArray(a == null ? void 0 : a.manualModifiers) ? a.manualModifiers : []).map((n) => ({
    id: n.id ?? foundry.utils.randomID(),
    label: (n.label ?? "Manual").trim() || "Manual",
    value: Number(n.value ?? 0),
    source: "Manual"
  })).filter((n) => Number.isFinite(n.value) && n.value !== 0), i = t.reduce((n, r) => n + r.value, 0);
  return { mods: t, total: i };
}
function yu(a = {}) {
  const e = a.toggles ?? {}, t = String((a == null ? void 0 : a.payloadId) ?? (a == null ? void 0 : a.ammoTypeId) ?? "").trim();
  return {
    ...a,
    ...t ? { payloadId: t } : {},
    toggles: {
      useEdge: !!e.useEdge,
      takeRisks: !!e.takeRisks,
      opponentRoll: !!e.opponentRoll
    },
    manualModifiers: k0(a.manualModifiers)
  };
}
async function w0({ actor: a, payload: e } = {}) {
  var r, s, o, l, c, u, d, m, f, p, h, g;
  if ((e == null ? void 0 : e.intent) !== "attack") return e;
  const t = foundry.utils.deepClone(e ?? {}), i = ((r = a.getPersonalCombatLoadout) == null ? void 0 : r.call(a, { refresh: !0 })) ?? null, n = (y) => {
    var S, w, k, P, E;
    const b = ((w = (S = a.items) == null ? void 0 : S.get) == null ? void 0 : w.call(S, y)) ?? null;
    return !b || !(((k = b.isPersonalWeapon) == null ? void 0 : k.call(b)) ?? b.type === A.itemType.personalWeapon) || !((P = b.system) != null && P.equipped) ? null : ((E = b.getCombatProfile) == null ? void 0 : E.call(b, { payloadId: t == null ? void 0 : t.payloadId })) ?? null;
  };
  if (t.weaponId) {
    const y = n(t.weaponId);
    if (!y)
      throw new Error("Attack requires an owned equipped personal weapon.");
    return t.payloadId = t.payloadId ?? ((s = y == null ? void 0 : y.payloadState) == null ? void 0 : s.activePayloadId) ?? "", t;
  }
  if (t.mode === "auto") {
    if (i != null && i.weaponChoiceRequired) {
      const y = await zo.selectItem(
        "Choose Weapon",
        i.equippedWeapons ?? []
      );
      return y ? (t.weaponId = y.id, t.payloadId = t.payloadId ?? ((o = y == null ? void 0 : y.payloadState) == null ? void 0 : o.activePayloadId) ?? "", delete t.mode, t) : null;
    }
    if ((l = i == null ? void 0 : i.defaultWeapon) != null && l.isSynthetic || ((c = i == null ? void 0 : i.defaultWeapon) == null ? void 0 : c.id) === "unarmed")
      return t.syntheticWeapon = foundry.utils.deepClone(i.defaultWeapon ?? zt.buildDefaultUnarmedProfile(a)), t.weaponId = t.syntheticWeapon.id, t.payloadId = t.payloadId ?? ((d = (u = t.syntheticWeapon) == null ? void 0 : u.payloadState) == null ? void 0 : d.activePayloadId) ?? "", delete t.mode, t;
    if ((m = i == null ? void 0 : i.defaultWeapon) != null && m.id)
      return t.weaponId = i.defaultWeapon.id, t.payloadId = t.payloadId ?? ((p = (f = i.defaultWeapon) == null ? void 0 : f.payloadState) == null ? void 0 : p.activePayloadId) ?? "", delete t.mode, t;
  }
  if (t.fallback === "unarmed")
    return t.syntheticWeapon = foundry.utils.deepClone(zt.buildDefaultUnarmedProfile(a)), t.weaponId = t.syntheticWeapon.id, t.payloadId = t.payloadId ?? ((g = (h = t.syntheticWeapon) == null ? void 0 : h.payloadState) == null ? void 0 : g.activePayloadId) ?? "", delete t.mode, t;
  throw new Error("Attack could not resolve a usable weapon.");
}
function k0(a) {
  return Array.isArray(a) ? a.map((e) => ({
    id: (e == null ? void 0 : e.id) ?? foundry.utils.randomID(),
    label: typeof (e == null ? void 0 : e.label) == "string" ? e.label : "Manual",
    value: Number((e == null ? void 0 : e.value) ?? 0)
  })) : [];
}
async function v0(a = []) {
  var t, i, n, r, s, o, l, c, u;
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
    const m = ((s = (r = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : r.get) == null ? void 0 : s.call(r, d)) ?? ((c = (l = (o = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : o.placeables) == null ? void 0 : l.find) == null ? void 0 : c.call(l, (f) => (f == null ? void 0 : f.id) === d)) ?? null;
    (u = m == null ? void 0 : m.setTarget) == null || u.call(m, !0, { releaseOthers: !1, user: game.user });
  }
}
async function M0({ actor: a, payload: e, event: t } = {}) {
  var F, V, Y, te, he, ce, X, Ne, Le, _e, Ue, We, ot, Ye, lt, it, Qe, bt, kt, vt, Mt, N, U, ge, re, Ie, M, R, Q, se, ae, be, ze, at, dt, Ot, ne, Te, ct, ut, mt, Je, Jt, ki, Wa, Ga;
  if (a != null && a.actor && (a = a.actor), (F = a == null ? void 0 : a.document) != null && F.actor && (a = a.document.actor), !a) throw new Error("MWD.roll.execute requires actor");
  if (!(e != null && e.intent)) throw new Error("MWD.roll.execute requires payload.intent");
  if (e = yu(e), e = await w0({ actor: a, payload: e }), !e) return null;
  let i = await Ls({ actor: a, payload: e, event: t });
  if (e.intent === "attack" && ((Y = (V = i == null ? void 0 : i.attack) == null ? void 0 : V.capabilityReport) != null && Y.isTemplated)) {
    const J = await Bw({
      actor: a,
      attack: i.attack
    });
    if (!J) return null;
    try {
      await $w({
        actor: a,
        attack: i.attack,
        templateGeometry: J.templateGeometry ?? null
      });
    } catch (De) {
      console.warn("MWD | Unable to create visual template indicator", De);
    }
    if (await v0(J.autoTargetTokenIds ?? []), !Ru(((te = i == null ? void 0 : i.attack) == null ? void 0 : te.areaEffect) ?? ((ce = (he = i == null ? void 0 : i.attack) == null ? void 0 : he.payload) == null ? void 0 : ce.areaEffect) ?? {}) && (!Array.isArray(J.targetSnapshots) || J.targetSnapshots.length === 0))
      return (X = ui.notifications) == null || X.warn("Template placement did not affect any targets."), null;
    e.targetSnapshots = Array.isArray(J.targetSnapshots) ? J.targetSnapshots : [], e.templateGeometry = J.templateGeometry ?? null, e.templatePlacement = J.placement, i = await Ls({ actor: a, payload: e, event: t });
  } else e.intent === "attack" && (delete e.targetSnapshots, delete e.templatePlacement, delete e.templateGeometry);
  let n = await mu({
    actor: a,
    rollType: e.intent,
    skillId: e.key,
    domains: i.domains,
    payload: e,
    resolved: i,
    context: { event: t }
  });
  const r = await Bo.prompt({
    actor: a,
    basePayload: e,
    resolved: i,
    diceParts: {
      attribute: ((Ne = i == null ? void 0 : i.pool) == null ? void 0 : Ne.attribute) ?? 0,
      skill: ((Le = i == null ? void 0 : i.pool) == null ? void 0 : Le.skill) ?? 0,
      bonus: ((_e = i == null ? void 0 : i.pool) == null ? void 0 : _e.bonus) ?? 0,
      specialization: ((Ue = i == null ? void 0 : i.pool) == null ? void 0 : Ue.specialization) ?? 0
    },
    mods: n.mods,
    modTotal: n.total,
    options: {
      allowEdge: e.intent !== "initiative"
    }
  });
  if (!r) return null;
  if (e = yu(r), i = await Ls({ actor: a, payload: e, event: t }), e.intent === "attack" && !((ot = (We = i == null ? void 0 : i.attack) == null ? void 0 : We.capabilityReport) != null && ot.isTemplated) && (delete e.targetSnapshots, delete e.templatePlacement, delete e.templateGeometry), e.intent === "attack" && e.weaponId) {
    const J = ((lt = (Ye = a.items) == null ? void 0 : Ye.get) == null ? void 0 : lt.call(Ye, e.weaponId)) ?? null;
    if ((it = J == null ? void 0 : J.isPersonalWeapon) != null && it.call(J)) {
      const De = String(e.payloadId ?? "").trim(), rs = String(((Qe = J.system) == null ? void 0 : Qe.selectedPayloadId) ?? "").trim();
      if (De && De !== rs && await ((bt = J.setActivePayload) == null ? void 0 : bt.call(J, De)), !((kt = J.canConsumePayload) != null && kt.call(J, { payloadId: De }))) {
        const mi = (vt = J.getPayloadState) == null ? void 0 : vt.call(J, { payloadId: De }), qa = mi != null && mi.payloadLabel ? ` (${mi.payloadLabel})` : "";
        return (Mt = ui.notifications) == null || Mt.warn(`Not enough payload${qa} for ${J.name}.`), null;
      }
    }
  }
  n = await mu({
    actor: a,
    rollType: e.intent,
    skillId: e.key,
    domains: i.domains,
    payload: e,
    resolved: i,
    context: { event: t }
  });
  const { mods: s, total: o } = n, { mods: l, total: c } = T0(e);
  let u = [...s, ...l], d = Number(o ?? 0) + Number(c ?? 0);
  const m = Number(((N = i == null ? void 0 : i.pool) == null ? void 0 : N.attribute) ?? 0) + Number(((U = i == null ? void 0 : i.pool) == null ? void 0 : U.skill) ?? 0) + Number(((ge = i == null ? void 0 : i.pool) == null ? void 0 : ge.bonus) ?? 0) + Number(((re = i == null ? void 0 : i.pool) == null ? void 0 : re.specialization) ?? 0), f = Math.max(0, m + Number(d ?? 0)), p = e.intent !== "initiative", h = p ? C0({ actor: a, ctx: i, payload: e }) : null, g = (Ie = h == null ? void 0 : h.pre) != null && Ie.spent ? 4 : Number(i.diceTarget ?? i.target ?? 5), y = {
    snapshot: ((Q = (R = (M = game.mwd) == null ? void 0 : M.personalCombat) == null ? void 0 : R.getSnapshot) == null ? void 0 : Q.call(R, a)) ?? null
  };
  let b = null, S = null;
  if (i.intent === "machineRemedy") {
    if (S = await ts(e, {
      gmOverride: !!(e != null && e.gmOverride)
    }), !S.ok)
      return (se = ui.notifications) == null || se.warn(S.reason ?? "Unable to resolve the machine remedy."), null;
    if (b = await zA(S), !(b != null && b.ok))
      return (ae = ui.notifications) == null || ae.warn((b == null ? void 0 : b.reason) ?? "Unable to spend the remedy action."), null;
  }
  const w = Bt({
    actor: a,
    phase: "onBuildRoll",
    facts: sl({ actor: a, resolved: i, payload: e, runtime: y }),
    packet: {},
    options: { runtime: y, consumeUsage: !0 }
  });
  await Ai({ actor: a, mutations: w.mutations, runtime: y }), p && ((be = h == null ? void 0 : h.pre) != null && be.spent) && ((ze = h == null ? void 0 : h.pre) != null && ze.poolKey) && await ((at = a.spendEdge) == null ? void 0 : at.call(a, h.pre.poolKey, 1));
  let k, P = 0, E = 0;
  if (i.rollType === "sum" && ((dt = i.sum) != null && dt.formula))
    k = await new Roll(i.sum.formula, i.sum.data ?? {}).evaluate(), P = Number(k.total ?? 0) + Number(d ?? 0);
  else {
    k = await new Roll(`${f}d6cs>=${g}`).evaluate();
    const J = (Ot = k.dice) == null ? void 0 : Ot[0];
    P = Array.isArray(J == null ? void 0 : J.results) ? J.results.filter((De) => De.success).length : 0, E = Array.isArray(J == null ? void 0 : J.results) ? J.results.filter((De) => De.result === 1).length : 0;
  }
  if (i.intent === "initiative" && (k == null ? void 0 : k.total) != null) {
    const J = { total: Number(k.total ?? 0) + Number(d ?? 0) }, De = Bt({
      actor: a,
      phase: "onInitiativeResolved",
      facts: Cd({ actor: a, packet: J, runtime: y }),
      packet: J,
      options: { runtime: y, consumeUsage: !0 }
    });
    if (await Ai({ actor: a, mutations: De.mutations, runtime: y }), De.modifiers.length) {
      const rs = De.modifiers.reduce((mi, qa) => mi + Number(qa.value ?? 0), 0);
      u = u.concat(De.modifiers), d += rs, P = Number(De.packet.total ?? 0), await bu({ actor: a, total: De.packet.total ?? k.total }), i.breakdown = (i.breakdown ?? []).concat(De.modifiers.map((mi, qa) => ({
        id: `traitInitiative${qa + 1}`,
        label: mi.label,
        value: Number(mi.value ?? 0)
      })));
    } else
      P = Number(J.total ?? 0), await bu({ actor: a, total: J.total });
  }
  const x = Hm(
    i,
    { successes: P, raw: (ne = k == null ? void 0 : k.toJSON) == null ? void 0 : ne.call(k) },
    null
    // opposed rolls can pass defender result later
  ), K = x == null ? void 0 : x.edgeEarned;
  if ((K == null ? void 0 : K.amount) > 0) {
    const J = (Te = i == null ? void 0 : i.domains) != null && Te.includes("physical") ? "physical" : (ct = i == null ? void 0 : i.domains) != null && ct.includes("mental") ? "mental" : (ut = i == null ? void 0 : i.domains) != null && ut.includes("social") ? "social" : null, De = A0(a, J);
    await ((mt = a.gainEdge) == null ? void 0 : mt.call(a, De, K.amount)), x.edgeEarned.pool = De;
  }
  i.intent === "overload" && await R0({ actor: a, passed: x.passed });
  let q = null, j = null;
  i.intent === "attack" ? q = await Fm({
    attacker: a,
    ctx: i,
    outcomeModel: x
  }) : i.intent === "machineRemedy" && (j = await FA(e, {
    gmOverride: !!(e != null && e.gmOverride),
    passed: !!(x != null && x.passed)
  }));
  const W = c0({
    actor: a,
    payload: e,
    ctx: i,
    roll: k,
    target: g,
    pool: f,
    mods: u,
    modTotal: d,
    hits: P,
    ones: E,
    edge: h,
    outcomeModel: x
  });
  q && (W.attackResult = q), i.intent === "machineRemedy" && (W.machineRemedy = i.machineRemedy ?? null, W.machineRemedyResult = {
    ...j ?? { ok: !1, reason: "Machine remedy result missing." },
    spend: b,
    context: S
  });
  const _ = await pa({ resolved: W });
  if (e.intent === "attack" && e.weaponId) {
    const J = ((Jt = (Je = a.items) == null ? void 0 : Je.get) == null ? void 0 : Jt.call(Je, e.weaponId)) ?? null;
    (ki = J == null ? void 0 : J.isPersonalWeapon) != null && ki.call(J) && (await ((Wa = J.consumePayload) == null ? void 0 : Wa.call(J, { payloadId: e.payloadId })) || (Ga = ui.notifications) == null || Ga.warn(`Payload could not be consumed for ${J.name}.`));
  }
  return ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor: a }),
    content: _,
    flags: {
      mwd: {
        payload: e,
        resolved: W
      }
    }
  });
}
function C0({ actor: a, ctx: e, payload: t }) {
  var p, h, g, y, b, S, w;
  const i = E0(e == null ? void 0 : e.domains), n = P0[i] ?? null, r = (n == null ? void 0 : n.a) ?? null, s = (n == null ? void 0 : n.b) ?? null, o = [r, s].filter(Boolean), l = !!((p = t == null ? void 0 : t.toggles) != null && p.useEdge) || !!(t != null && t.useEdge);
  let c = String(((g = (h = t == null ? void 0 : t.edge) == null ? void 0 : h.pre) == null ? void 0 : g.poolKey) ?? "").trim() || null;
  c && !o.includes(c) && (c = null);
  const u = l && c ? 1 : 0;
  let d = [...o];
  u && c && (d = d.filter((k) => k !== c));
  let m = String(((b = (y = t == null ? void 0 : t.edge) == null ? void 0 : y.post) == null ? void 0 : b.poolKey) ?? "").trim() || null;
  m && !d.includes(m) && (m = null);
  const f = Number(((w = (S = t == null ? void 0 : t.edge) == null ? void 0 : S.post) == null ? void 0 : w.spent) ?? 0) ? 1 : 0;
  return {
    domain: i,
    pools: n ? { a: r, b: s } : null,
    pre: { poolKey: c, spent: u },
    post: { poolKey: m, spent: f },
    allowed: { prePools: o, postPools: d }
  };
}
function E0(a) {
  return Array.isArray(a) ? a.includes("physical") ? "physical" : a.includes("mental") ? "mental" : a.includes("social") ? "social" : null : null;
}
const P0 = {
  physical: { a: "grit", b: "chaos" },
  mental: { a: "insight", b: "rumor" },
  social: { a: "legend", b: "credibility" }
};
async function bu({ actor: a, total: e }) {
  var o, l, c, u, d;
  const t = (l = (o = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : o.controlled) == null ? void 0 : l.find((m) => {
    var f;
    return ((f = m.actor) == null ? void 0 : f.id) === a.id;
  }), i = ((u = (c = a.getActiveTokens) == null ? void 0 : c.call(a, !0, !0)) == null ? void 0 : u[0]) ?? null, n = t ?? i;
  if (!n) {
    (d = ui.notifications) == null || d.warn("Initiative requires a token on the current scene.");
    return;
  }
  let r = game.combat;
  r || (r = await Combat.create({
    scene: canvas.scene.id,
    active: !0
  }));
  let s = r.combatants.find((m) => m.tokenId === n.id);
  if (!s) {
    const m = await r.createEmbeddedDocuments("Combatant", [{
      tokenId: n.id,
      actorId: a.id,
      sceneId: canvas.scene.id
    }]);
    s = m == null ? void 0 : m[0];
  }
  s && await s.update({ initiative: Number(e) });
}
async function R0({ actor: a, passed: e }) {
  e || await a.update({ "system.burn.overloaded": !0 });
}
const N0 = /* @__PURE__ */ new Set(["physical", "mental", "social"]);
function I0(a) {
  if (a == null || a === "" || a === "—" || a === "–") return 0;
  const e = Number(a);
  return Number.isFinite(e) ? e : null;
}
function D0(a) {
  if (!a) return;
  const e = String(a).trim().toLowerCase();
  return N0.has(e) ? e : void 0;
}
class O0 {
  constructor() {
    O(this, "id", "mwd.itemModifiers");
    O(this, "label", "Item Modifiers");
  }
  collect(e) {
    var n, r;
    const t = e == null ? void 0 : e.actor;
    if (!t) return [];
    const i = [];
    for (const s of t.items) {
      const o = (r = (n = s.flags) == null ? void 0 : n.mwd) == null ? void 0 : r.modifiers;
      if (!(!Array.isArray(o) || o.length === 0))
        for (const l of o) {
          if (!l) continue;
          const c = I0(l.value);
          if (c === null) {
            console.warn("MWD | Dropping item modifier with invalid value", {
              actor: t.name,
              item: s.name,
              modifier: l
            });
            continue;
          }
          i.push({
            label: l.label ?? s.name,
            value: c,
            source: s.name,
            domain: D0(l.domain)
          });
        }
    }
    return i;
  }
}
class L0 {
  constructor() {
    O(this, "id", "mwd.statusEffects");
    O(this, "label", "Status Effects");
  }
  collect({ actor: e } = {}) {
    var n;
    const t = e == null ? void 0 : e.statuses;
    if (!e || !t) return [];
    const i = [];
    for (const r of t) {
      const s = Ur(r), o = s ? jr(s, e) ? s.modifierKey : "" : r, l = Ra == null ? void 0 : Ra[o];
      if ((n = l == null ? void 0 : l.mods) != null && n.length)
        for (const c of l.mods) {
          const u = Array.isArray(c.domains) ? c.domains : [], d = c.value;
          if (u.length)
            for (const m of u)
              i.push({
                label: l.label ?? r,
                value: d,
                source: "Status",
                domain: m
              });
          else
            i.push({
              label: l.label ?? r,
              value: d,
              source: "Status"
            });
        }
    }
    return i;
  }
}
class _0 {
  constructor() {
    O(this, "id", "mwd.baseRollModifiers");
    O(this, "label", "Roll (Base)");
  }
  collect({ payload: e } = {}) {
    var s, o, l;
    const t = [], i = (s = e == null ? void 0 : e.modifiers) == null ? void 0 : s.manual;
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
    const n = ((o = e == null ? void 0 : e.dialog) == null ? void 0 : o.otherMods) ?? ((l = e == null ? void 0 : e.modifiers) == null ? void 0 : l.otherMods) ?? (e == null ? void 0 : e.otherMods) ?? 0, r = Number(n);
    return Number.isFinite(r) && r !== 0 && t.push({
      id: "otherMods",
      label: "Other modifiers",
      value: r,
      source: "Roll"
    }), t;
  }
}
class x0 {
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
    ), r = Number(
      ((d = i == null ? void 0 : i.condition) == null ? void 0 : d.fatiguePenalty) ?? ((f = (m = i == null ? void 0 : i.monitors) == null ? void 0 : m.fatigue) == null ? void 0 : f.penalty) ?? 0
    ), s = [];
    return Number.isFinite(n) && n !== 0 && s.push({
      id: "conditionPhysical",
      label: "Physical Penalty",
      value: n,
      source: "Physical Track"
      // domain: "physical" // optional; leave unset to apply to all domains
    }), Number.isFinite(r) && r !== 0 && s.push({
      id: "conditionFatigue",
      label: "Fatigue Penalty",
      value: r,
      source: "Fatigue Track"
      // domain: "physical" // optional
    }), console.log("MWD|condition derived snapshot", e.name, foundry.utils.deepClone((p = e.system) == null ? void 0 : p.derived)), s;
  }
}
const $0 = {
  id: "burn",
  async collect(a) {
    var n, r;
    const e = a.actor;
    if (!e) return [];
    const t = Number(((r = (n = e.system) == null ? void 0 : n.burn) == null ? void 0 : r.value) ?? 0), i = Math.floor(t / 2);
    return i <= 0 ? [] : [{
      id: "burn",
      label: "Burn",
      value: -i,
      source: "Burn Track",
      domain: null
    }];
  }
};
class B0 {
  constructor() {
    O(this, "id", "mwd.lifeModules");
    O(this, "label", "Life Modules");
  }
  collect({ actor: e, resolved: t } = {}) {
    return Hg({ actor: e, resolved: t });
  }
}
class z0 {
  constructor() {
    O(this, "id", "mwd.traits");
    O(this, "label", "Traits");
  }
  collect({ actor: e, resolved: t, payload: i } = {}) {
    var r, s, o;
    if (!e) return [];
    const n = {
      snapshot: ((o = (s = (r = game.mwd) == null ? void 0 : r.personalCombat) == null ? void 0 : s.getSnapshot) == null ? void 0 : o.call(s, e)) ?? null
    };
    return Bt({
      actor: e,
      phase: "onBuildRoll",
      facts: sl({ actor: e, resolved: t, payload: i, runtime: n }),
      packet: {},
      options: { runtime: n, consumeUsage: !1 }
    }).modifiers;
  }
}
const F0 = Object.freeze({
  attackCQPenalty: { value: -1, intents: ["attack"], label: "Attack CQ Penalty" },
  sensorPenalty: { value: -1, skills: ["perception", "technician"], label: "Sensor Penalty" },
  pilotingPenalty: { value: -1, skills: ["piloting"], label: "Piloting Penalty" }
});
class U0 {
  constructor() {
    O(this, "id", "mwd.machineCriticals");
    O(this, "label", "Machine Criticals");
  }
  collect({ actor: e, resolved: t, payload: i } = {}) {
    var l, c, u;
    const n = Sm(e);
    if (!n.length) return [];
    const r = String((t == null ? void 0 : t.intent) ?? (i == null ? void 0 : i.intent) ?? "").trim(), s = String(((c = (l = t == null ? void 0 : t.attack) == null ? void 0 : l.skill) == null ? void 0 : c.code) ?? ((u = t == null ? void 0 : t.skill) == null ? void 0 : u.code) ?? (i == null ? void 0 : i.key) ?? "").trim(), o = [];
    for (const d of n)
      for (const m of d.mods ?? []) {
        const f = F0[m];
        f && (f.intents && !f.intents.includes(r) || f.skills && !f.skills.includes(s) || o.push({
          id: `machineCrit.${d.id}.${m}`,
          label: `${d.label ?? "Machine Critical"}: ${f.label}`,
          value: f.value,
          source: "Machine Critical"
        }));
      }
    return o;
  }
}
function j0() {
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
function H0() {
  return {
    get(a) {
      return Dt(a);
    },
    getSkills({ withKnowledge: a = !1 } = {}) {
      return yr();
    },
    list() {
      return yr();
    }
  };
}
function K0() {
  return {
    get(a) {
      return xi(a);
    },
    list() {
      return Qr();
    },
    listByType(a) {
      return fl(a);
    },
    getTypeLabel(a) {
      return Ba(a);
    },
    evaluate(a) {
      return Bi(a);
    }
  };
}
function W0() {
  return {
    normalizeQualitySystem(a) {
      return qt(a);
    },
    getEditorConfig() {
      return Td();
    },
    evaluatePhase(a) {
      return Bt(a);
    },
    applyMutations(a) {
      return Ai(a);
    },
    buildRollFacts(a) {
      return sl(a);
    },
    buildActionCostFacts(a) {
      return Md(a);
    },
    buildBurnFacts(a) {
      return Zn(a);
    },
    buildInitiativeFacts(a) {
      return Cd(a);
    },
    buildDamageFacts(a) {
      return Ed(a);
    },
    buildEdgeFacts(a) {
      return Qs(a);
    },
    buildEndOfActivationFacts(a) {
      return Pd(a);
    }
  };
}
class Dl {
  static start() {
    const e = new Dl();
    Hooks.once("init", () => e.onInit()), Hooks.once("ready", () => e.onReady());
  }
  async onInit() {
    console.log(Me + "AnarchySystem.onInit"), game.system.mwd = this, game.system.anarchy = this, game.mwd ?? (game.mwd = {}), j0(), UA(), fS("mwd"), game.mwd.roll = gu, game.mwd.attacks = Qc, game.mwd.personalCombat = z, game.mwd.harm = Tt, this.roll = gu, this.attacks = Qc, this.personalCombat = z, this.harm = Tt, this.skills = H0(), this.lifeModules = K0(), this.traits = W0(), this.remoteCall = new Gs(), game.system.mwd.skills = this.skills, game.system.mwd.lifeModules = this.lifeModules, game.system.mwd.traits = this.traits, game.mwd.skills = this.skills, game.mwd.lifeModules = this.lifeModules, game.mwd.traits = this.traits, ve.init(), this.modifiers = new pe(), ti.register(new O0()), ti.register(new L0()), ti.register(new _0()), ti.register(new x0()), ti.register($0), ti.register(new B0()), ti.register(new z0()), ti.register(new U0()), ti.register(new Ub()), Handlebars.registerHelper("mwdClassList", (e) => Array.isArray(e) ? e.join(" ") : typeof e == "string" ? e : ""), this.actorClasses = {
      character: Pc,
      npc: Pc,
      vehicle: Cm,
      battlemech: Bb
    }, this.hooks = new na(), this.styles = new fy(), this.handlebarsManager = new pl(), z.init(), QS.register(), Hooks.on("updateSetting", (e) => {
      (e == null ? void 0 : e.key) === `${T}.statusConditionCatalog` && Kl();
    }), console.log(Me + "AnarchySystem.onInit | loading system"), CONFIG.ANARCHY = $e, CONFIG.Combat.initiative = { formula: "2d6" }, Kl(), CONFIG.Actor.documentClass = sw, CONFIG.Item.documentClass = Fa, Fa.init(), Ym(), ph(), LT(), XT(), await tw(), console.log(Me + "AnarchySystem.onInit | done");
  }
  async onReady() {
    if (console.log(Me + "AnarchySystem.onReady"), await z.onReady(), !game.user.isGM) return;
    await $g();
    const e = game.settings.get(T, "enableGMGadget");
    if (!e) {
      console.log(`${Me}GMManager render skipped (enableGMGadget=false)`);
      return;
    }
    game.mwd = game.mwd ?? {}, game.mwd.gmGadget = () => pS({ systemId: T }).render({ force: !0 }), e && game.mwd.gmGadget();
  }
}
Dl.start();
//# sourceMappingURL=index.mjs.map
