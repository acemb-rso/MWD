var wi = Object.defineProperty;
var Si = Object.getPrototypeOf;
var ki = Reflect.get;
var ma = (r) => {
  throw TypeError(r);
};
var Mi = (r, e, t) => e in r ? wi(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var v = (r, e, t) => Mi(r, typeof e != "symbol" ? e + "" : e, t), As = (r, e, t) => e.has(r) || ma("Cannot " + t);
var _ = (r, e, t) => (As(r, e, "read from private field"), t ? t.call(r) : e.get(r)), le = (r, e, t) => e.has(r) ? ma("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(r) : e.set(r, t), Pe = (r, e, t, s) => (As(r, e, "write to private field"), s ? s.call(r, t) : e.set(r, t), t), R = (r, e, t) => (As(r, e, "access private method"), t);
var Xt = (r, e, t) => ki(Si(r), t, e);
const Y = {
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
}, f = Y, A = "mwd", vi = "MechWarrior: Destiny", Ls = `system.${A}`, Ci = A, Qt = `systems/${A}`, La = `${Qt}/style`, Lt = `${Qt}/third-party/style`, O = `systems/${A}/templates`, hs = `${Qt}/img/icons`, H = `${hs}/skills`, z = "MWD | ", Ei = 2, Pi = 5, Ri = 4, $a = 8, $s = {
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
}, Ws = {
  autopilot: "autopilot",
  firewall: "firewall",
  knowledge: "knowledge"
}, ke = {
  grit: "grit",
  chaos: "chaos",
  insight: "insight",
  rumor: "rumor",
  legend: "legend",
  credibility: "credibility"
}, sa = {
  physical: [ke.grit, ke.chaos],
  mental: [ke.insight, ke.rumor],
  social: [ke.legend, ke.credibility]
}, d = {
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
  actorAttributes: $s,
  itemAttributes: Ws,
  attributes: { ...$s, ...Ws },
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
    edgePools: ke,
    edgePoolGroups: sa,
    physical: {
      grit: ke.grit,
      chaos: ke.chaos
    },
    mental: {
      insight: ke.insight,
      rumor: ke.rumor
    },
    social: {
      legend: ke.legend,
      credibility: ke.credibility
    },
    chaos: ke.chaos
  },
  area: {
    none: "none",
    shotgun: "shotgun",
    circle: "circle",
    cone: "cone",
    rect: "rect",
    ray: "ray"
  }
}, Di = Object.freeze({
  physical: "physical",
  mental: "mental",
  social: "social"
});
Object.freeze(Object.values(Di));
const kt = {
  [d.actorTypes.character]: [
    d.actorAttributes.strength,
    d.actorAttributes.reflexes,
    d.actorAttributes.willpower,
    d.actorAttributes.intelligence,
    d.actorAttributes.charisma,
    d.actorAttributes.edge
  ],
  [d.actorTypes.npc]: [
    d.actorAttributes.strength,
    d.actorAttributes.reflexes,
    d.actorAttributes.willpower,
    d.actorAttributes.intelligence,
    d.actorAttributes.charisma,
    d.actorAttributes.edge
  ],
  [d.actorTypes.vehicle]: [
    d.actorAttributes.handling,
    d.actorAttributes.system,
    d.actorAttributes.chassis,
    d.actorAttributes.condition
  ],
  [d.actorTypes.battlemech]: [
    d.actorAttributes.handling,
    d.actorAttributes.system,
    d.actorAttributes.chassis,
    d.actorAttributes.condition
  ]
}, Ts = {
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
}, de = {
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
  SYSTEM_NAME: A,
  SYSTEM_DESCRIPTION: vi,
  SYSTEM_SOCKET: Ls,
  SYSTEM_SCOPE: Ci,
  SYSTEM_PATH: Qt,
  STYLE_PATH: La,
  THIRD_PARTY_STYLE_PATH: Lt,
  TEMPLATES_PATH: O,
  ICONS_PATH: hs,
  ICONS_SKILLS_PATH: H,
  LOG_HEAD: z,
  SPECIALIZATION_BONUS: Ei,
  TARGET_SUCCESS: Pi,
  TARGET_SUCCESS_EDGE: Ri,
  BASE_MONITOR: $a,
  ACTOR_ATTRIBUTES: $s,
  ITEM_ATTRIBUTES: Ws,
  EDGE_POOL_GROUPS: sa,
  TEMPLATE: d,
  ANARCHY_SYSTEM: de
};
const je = class je {
  static ascending(e = (t) => t) {
    return (t, s) => je.sortingBy(e(t), e(s));
  }
  static descending(e = (t) => t) {
    return (t, s) => je.sortingBy(e(s), e(t));
  }
  static sortingBy(e, t) {
    return e > t ? 1 : e < t ? -1 : 0;
  }
  static bySortedArray(e) {
    return (t) => e.indexOf(t);
  }
  static ascendingBySortedArray(e) {
    return je.ascending(je.bySortedArray(e));
  }
  static sortedMap(e, t = (s, a) => 0) {
    return Object.keys(e).sort(t).reduce(
      (s, a) => (s[a] = e[a], s),
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
    return e.map(t).filter((s) => s != null).reduce(je.sum(), 0);
  }
  static divint(e, t) {
    return Math.floor(e / t);
  }
  static divup(e, t) {
    return Math.ceil(e / t);
  }
  static join(e, t = "") {
    return e.reduce(je.joiner(t));
  }
  static joiner(e = "") {
    return (t, s) => t + e + s;
  }
  static classify(e, t = (s) => s.type) {
    let s = {};
    return je.classifyInto(s, e, t), s;
  }
  static classifyFirst(e, t) {
    let s = {};
    for (const a of e) {
      const i = t(a);
      s[i] || (s[i] = a);
    }
    return s;
  }
  static classifyInto(e, t, s = (a) => a.type) {
    for (const a of t) {
      const i = s(a);
      let n = e[i];
      n || (n = [], e[i] = n), n.push(a);
    }
  }
  static showControlWhen(e, t) {
    t ? e.show() : e.hide();
  }
  static minmax(e, t, s) {
    return Math.max(t, Math.min(e, s));
  }
};
v(je, "isString", (e) => typeof e == "string" || e instanceof String);
let L = je;
const Oi = {
  keyword: "keywords",
  disposition: "dispositions",
  cue: "cues"
}, w = class w {
  /**
   * Initialize enum caches.
   * Call once during system init/setup after config/constants are available.
   */
  static init() {
    var t, s, a, i, n, l, o, c, u, m, p, y;
    w.hbsAttributes = w.mapObjectToKeyValue(f.attributes).filter((h) => h.value !== "knowledge" && h.value !== "noAttribute"), w.hbsItemTypes = w.mapObjectToKeyValue(f.itemType), w.hbsMonitors = w.mapObjectToKeyValue(f.monitor), w.hbsMonitorLetters = w.mapObjectToKeyValue(f.monitorLetter), w.hbsAssetModuleCategories = w.mapObjectToKeyValue(f.assetModuleCategory), (s = (t = f.item) == null ? void 0 : t.lifeModule) != null && s.type ? w.hbsLifeModuleTypes = w.mapObjectToKeyValue(f.item.lifeModule.type) : (console.warn("MWD | MWD.item.lifeModule.type is missing; life module enums disabled."), w.hbsLifeModuleTypes = []), w.hbsAreas = w.mapObjectToKeyValue(f.area), w.hbsRanges = w.mapObjectToKeyValue(f.range), w.hbsVehicleCategories = w.mapObjectToKeyValue(f.vehicleCategory), w.hbsMwdWeightClasses = w.mapObjectToKeyValue((a = f.mwd) == null ? void 0 : a.weightClass), w.hbsMwdHardpointTypes = w.mapObjectToKeyValue((i = f.mwd) == null ? void 0 : i.hardpointType), w.hbsMwdHardpointSizes = w.mapObjectToKeyValue((n = f.mwd) == null ? void 0 : n.hardpointSize), w.hbsMwdHardpointLocations = w.mapObjectToKeyValue((l = f.mwd) == null ? void 0 : l.hardpointLocation), w.hbsMwdPrimaryModes = w.mapObjectToKeyValue((o = f.mwd) == null ? void 0 : o.primarySlotMode), w.hbsMwdWeaponCategories = w.mapObjectToKeyValue((c = f.mwd) == null ? void 0 : c.weaponCategory), w.hbsMwdWeaponDamageTypes = w.mapObjectToKeyValue((u = f.mwd) == null ? void 0 : u.weaponDamageType), w.hbsPersonalWeaponDamageTypes = w.mapObjectToKeyValue((m = f.mwd) == null ? void 0 : m.personalDamageType), w.hbsPersonalWeaponDamageCategories = w.mapObjectToKeyValue((p = f.mwd) == null ? void 0 : p.personalDamageCategory), w.hbsMwdMeleeLocations = w.mapObjectToKeyValue((y = f.mwd) == null ? void 0 : y.meleeLocation), w.hbsDamageTypes = L.distinct(
      (w.hbsMwdWeaponDamageTypes ?? []).concat(w.hbsPersonalWeaponDamageTypes ?? []),
      (h) => h.value
    );
    const e = Object.values(kt).flat();
    w.sortedAttributeKeys = L.distinct(
      e.concat(Object.keys(f.attributes ?? {}))
    ), w.registerHandleBarHelpers(), w.ENUMS = w.getEnums();
  }
  static registerHandleBarHelpers() {
    typeof Handlebars > "u" || Handlebars.registerHelper("sortedAttributes", (e) => {
      if (!e || typeof e != "object") return [];
      const t = Object.keys(e), s = w.sortedAttributeKeys ?? [], a = new Map(s.map((i, n) => [i, n]));
      return t.sort((i, n) => {
        const l = a.has(i) ? a.get(i) : 9999, o = a.has(n) ? a.get(n) : 9999;
        return l !== o ? l - o : String(i).localeCompare(String(n));
      }), t.map((i) => {
        const n = e[i];
        return n && typeof n == "object" ? { key: i, ...n } : { key: i, value: n };
      });
    });
  }
  static getDamageTypes() {
    return w.hbsDamageTypes ?? [];
  }
  static getAttributes(e = () => !0) {
    return (w.hbsAttributes ?? []).filter((t) => e(t.value));
  }
  static getActorWordTypes() {
    return Oi;
  }
  static getMonitors() {
    return w.hbsMonitors ?? [];
  }
  /**
   * Returns a big blob of enums suitable for sheet contexts.
   * `withKnowledge` is passed through to the skills service.
   */
  static getEnums(e = () => !0, t = !1) {
    return {
      attributes: w.getAttributes(e),
      itemTypes: w.hbsItemTypes ?? [],
      monitors: w.hbsMonitors ?? [],
      monitorLetters: w.hbsMonitorLetters ?? [],
      assetModuleCategories: w.hbsAssetModuleCategories ?? [],
      lifeModuleTypes: w.hbsLifeModuleTypes ?? [],
      areas: w.hbsAreas ?? [],
      ranges: w.hbsRanges ?? [],
      vehicleCategories: w.hbsVehicleCategories ?? [],
      // Skills: now sourced from MWD namespace (with safe fallback)
      skills: w.getSkillsEnum({ withKnowledge: t }),
      // MWD enums
      mwdWeightClasses: w.hbsMwdWeightClasses ?? [],
      mwdHardpointTypes: w.hbsMwdHardpointTypes ?? [],
      mwdHardpointSizes: w.hbsMwdHardpointSizes ?? [],
      mwdHardpointLocations: w.hbsMwdHardpointLocations ?? [],
      mwdPrimaryModes: w.hbsMwdPrimaryModes ?? [],
      mwdWeaponCategories: w.hbsMwdWeaponCategories ?? [],
      mwdWeaponDamageTypes: w.hbsMwdWeaponDamageTypes ?? [],
      personalWeaponDamageTypes: w.hbsPersonalWeaponDamageTypes ?? [],
      personalWeaponDamageCategories: w.hbsPersonalWeaponDamageCategories ?? [],
      damageTypes: w.hbsDamageTypes ?? [],
      mwdMeleeLocations: w.hbsMwdMeleeLocations ?? []
    };
  }
  static getSkillsEnum({ withKnowledge: e = !1 } = {}) {
    var a, i, n, l, o;
    const t = ((i = (a = game == null ? void 0 : game.system) == null ? void 0 : a.mwd) == null ? void 0 : i.skills) ?? ((l = (n = game == null ? void 0 : game.system) == null ? void 0 : n.anarchy) == null ? void 0 : l.skills);
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
    return !e || typeof e != "object" ? [] : Object.keys(e).map((a) => {
      const i = e[a];
      let n;
      return i && typeof i == "object" ? n = i.label ?? i.name ?? i.value ?? String(a) : i != null ? n = String(i) : n = String(a), {
        [t]: a,
        [s]: n
      };
    });
  }
  // Backwards-compat alias (the legacy file misspelled this)
  static mapObjetToKeyValue(e, t = "value", s = "label") {
    return w.mapObjectToKeyValue(e, t, s);
  }
};
v(w, "ENUMS"), // HBS-friendly arrays of { value, label } (or key/value depending on caller)
v(w, "hbsAttributes"), v(w, "hbsItemTypes"), v(w, "hbsMonitors"), v(w, "hbsMonitorLetters"), v(w, "hbsAssetModuleCategories"), v(w, "hbsLifeModuleTypes"), v(w, "hbsAreas"), v(w, "hbsRanges"), v(w, "hbsVehicleCategories"), // MWD-specific enum groups
v(w, "hbsMwdWeightClasses"), v(w, "hbsMwdHardpointTypes"), v(w, "hbsMwdHardpointSizes"), v(w, "hbsMwdHardpointLocations"), v(w, "hbsMwdPrimaryModes"), v(w, "hbsMwdWeaponCategories"), v(w, "hbsMwdWeaponDamageTypes"), v(w, "hbsPersonalWeaponDamageTypes"), v(w, "hbsPersonalWeaponDamageCategories"), v(w, "hbsDamageTypes"), v(w, "hbsMwdMeleeLocations"), v(w, "sortedAttributeKeys");
let G = w;
class Ni {
  static monitor(e) {
    return G.getFromList(G.getMonitors(), e) ?? "";
  }
  static letter(e) {
    return G.getFromList(G.getMonitorLetters(), e) ?? "";
  }
}
class Ii {
  static toLowerCaseNoAccent(e) {
    return e == null ? void 0 : e.normalize("NFD").toLowerCase().replace(/[\u0300-\u036f]/g, "");
  }
  static toUpperCaseNoAccent(e) {
    return e == null ? void 0 : e.normalize("NFD").toUpperCase().replace(/[\u0300-\u036f]/g, "");
  }
}
const xi = [
  "fas fa-dice",
  "fas fa-dice-one",
  "fas fa-dice-two",
  "fas fa-dice-three",
  "fas fa-dice-four",
  "fas fa-dice-five",
  "fas fa-dice-six"
];
class D {
  static fontAwesome(e) {
    return `<i class="${e}"></i>`;
  }
  static iconSystemPath(e, t) {
    return D.iconPath(`${La}/${e}`, t);
  }
  static iconPath(e, t) {
    return `<img class="${t}" src="${e}" />`;
  }
  static iconD6(e) {
    if (e < 0 || e > 6)
      throw `Dice ${e} is out of dice range [1..6] or 0 for multidice`;
    return D.fontAwesome(xi[e]);
  }
}
globalThis.ANARCHY_ICONS = D;
const K = (r, e = {}) => r.replace(/\{(.*?)\}/g, (t, s) => e[s] ?? ""), Wa = Object.freeze({
  penetrating: "Penetrating",
  concussive: "Concussive",
  energy: "Energy",
  thermal: "Thermal",
  electrical: "Electrical"
}), cs = Object.freeze(
  Object.entries(Wa).map(([r, e]) => ({ value: r, label: e }))
), _i = Object.freeze({
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
}), Li = Object.freeze(
  cs.map((r) => r.value)
), Mt = Object.freeze({
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
}), fs = Object.freeze({
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
    resolve: (r) => ({ reinforced: Math.max(0, Number((r == null ? void 0 : r.rating) ?? 0) || 0) })
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
}), $i = Object.freeze(
  Object.values(Mt).map((r) => ({
    value: r.key,
    label: r.label,
    rated: r.rated
  }))
), Wi = Object.freeze(
  Object.values(fs).map((r) => ({
    value: r.key,
    label: r.label,
    rated: r.rated
  }))
), Ha = Fa(Mt), Ba = Fa(fs);
Object.freeze(
  Object.fromEntries(
    Object.values(Mt).flatMap((r) => [r.key, ...r.aliases ?? []].map((t) => [String(t).trim().toLowerCase(), r.resolve]))
  )
);
function aa(r) {
  return r && typeof r == "object" && !Array.isArray(r) ? Object.values(r).flatMap((e) => aa(e)) : Array.isArray(r) ? r.map((e) => String(e ?? "").trim()).filter(Boolean) : String(r ?? "").split(",").map((e) => e.trim()).filter(Boolean);
}
function Xe(r, e = "penetrating") {
  const t = String(r ?? "").trim().toLowerCase();
  return _i[t] ?? e;
}
function Hi(r) {
  const e = String(r ?? "").trim();
  return e ? Xe(e, "") : "";
}
function ja(r) {
  const e = String(r ?? "").trim().toLowerCase();
  return Li.includes(e);
}
function at(r) {
  const e = Xe(r, "");
  return Wa[e] ?? String(r ?? "").trim();
}
function Je(r) {
  const e = r ?? {}, t = Number(e.ballistic ?? 0) || 0, s = Number(e.melee ?? 0) || 0;
  return {
    penetrating: e.penetrating !== void 0 ? Number(e.penetrating ?? 0) || 0 : Math.max(t, s),
    concussive: e.concussive !== void 0 ? Number(e.concussive ?? 0) || 0 : Number(e.explosive ?? 0) || 0,
    energy: Number(e.energy ?? 0) || 0,
    thermal: Number(e.thermal ?? 0) || 0,
    electrical: Number(e.electrical ?? 0) || 0
  };
}
function is(r) {
  return aa(r);
}
function Ze(r) {
  return aa(r);
}
function us(r = "id") {
  var t, s;
  const e = (s = (t = globalThis.foundry) == null ? void 0 : t.utils) == null ? void 0 : s.randomID;
  return typeof e == "function" ? e() : `${r}-${Math.random().toString(36).slice(2, 10)}`;
}
function Fa(r) {
  const e = {};
  return Object.values(r).forEach((t) => {
    [t.key, ...t.aliases ?? []].forEach((s) => {
      e[Vt(s)] = t.key;
    });
  }), Object.freeze(e);
}
function Vt(r) {
  return String(r ?? "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "");
}
function ia(r) {
  return Array.isArray(r) ? r : r && typeof r == "object" ? Object.values(r) : r == null || r === "" ? [] : [r];
}
function Ga(r, e) {
  return ia(r).map((t) => Bi(t, e)).filter(Boolean);
}
function Bi(r, e) {
  if (typeof r == "string" || typeof r == "number") {
    const s = e[Vt(r)];
    return s ? { id: us("trait"), key: s, rating: 1 } : null;
  }
  if (!r || typeof r != "object") return null;
  const t = e[Vt(r.key ?? r.value ?? r.name)];
  return t ? {
    id: String(r.id ?? "").trim() || us("trait"),
    key: t,
    rating: Math.max(0, Number(r.rating ?? 0) || 0)
  } : null;
}
function Ce(r) {
  return Ga(r, Ha);
}
function Ke(r) {
  return Ga(r, Ba);
}
function Hs(r) {
  return {
    close: Number((r == null ? void 0 : r.close) ?? (r == null ? void 0 : r.short) ?? 0) || 0,
    near: Number((r == null ? void 0 : r.near) ?? (r == null ? void 0 : r.medium) ?? 0) || 0,
    far: Number((r == null ? void 0 : r.far) ?? (r == null ? void 0 : r.long) ?? 0) || 0,
    extreme: Number((r == null ? void 0 : r.extreme) ?? 0) || 0
  };
}
function ji(r = {}, e = {}) {
  const t = Hs(r), s = Hs(e);
  return {
    close: t.close + s.close,
    near: t.near + s.near,
    far: t.far + s.far,
    extreme: t.extreme + s.extreme
  };
}
function Fi(r, e) {
  var t;
  return ((t = e[r]) == null ? void 0 : t.label) ?? r;
}
function ra(r, e) {
  var a;
  const t = Fi(r == null ? void 0 : r.key, e), s = Math.max(0, Number((r == null ? void 0 : r.rating) ?? 0) || 0);
  return (a = e[r == null ? void 0 : r.key]) != null && a.rated && s > 0 ? `${t} ${s}` : t;
}
function Ua(r, e) {
  return ia(r).map((t) => {
    const s = t == null ? void 0 : t.key, a = e[s];
    return a != null && a.resolve ? {
      entry: t,
      effect: a.resolve(t),
      label: ra(t, e)
    } : null;
  }).filter(Boolean);
}
function Gi(r, e) {
  const t = { ...r ?? {} };
  return Object.entries(e ?? {}).forEach(([s, a]) => {
    t[s] = (Number(t[s] ?? 0) || 0) + (Number(a ?? 0) || 0);
  }), t;
}
function Ui(r = []) {
  const e = {}, t = /* @__PURE__ */ new Set();
  for (const s of r.filter(Boolean)) {
    s.accuracyMod !== void 0 && (e.accuracyMod = (Number(e.accuracyMod ?? 0) || 0) + (Number(s.accuracyMod ?? 0) || 0)), s.ap !== void 0 && (e.ap = (Number(e.ap ?? 0) || 0) + (Number(s.ap ?? 0) || 0)), s.addHeat !== void 0 && (e.addHeat = (Number(e.addHeat ?? 0) || 0) + (Number(s.addHeat ?? 0) || 0)), s.bonusVsArmorTag && (e.bonusVsArmorTag = Gi(e.bonusVsArmorTag, s.bonusVsArmorTag));
    for (const a of s.flags ?? []) {
      const i = String(a ?? "").trim();
      i && t.add(i);
    }
  }
  return t.size > 0 && (e.flags = Array.from(t)), e;
}
function Va(r = [], e = []) {
  const t = Array.isArray(r) || typeof r == "string" ? { traits: r, standardTraits: e } : r ?? {}, s = Ze(t.traits), a = Ce(t.standardTraits), i = Ua(a, Mt), n = s.map((l) => {
    var u;
    const o = Ha[Vt(l)];
    if (!o) return null;
    const c = (u = Mt[o]) == null ? void 0 : u.resolve;
    return typeof c == "function" ? c({ key: o, rating: 1 }) : null;
  });
  return Ui([
    ...i.map((l) => l.effect),
    ...n
  ]);
}
function Vi({ traits: r = [], standardTraits: e = [] } = {}) {
  return [
    ...Ze(r),
    ...Ce(e).map((s) => ra(s, Mt))
  ].filter(Boolean);
}
function qi(r) {
  const e = r ?? {};
  return {
    id: String(e.id ?? "").trim() || us("ammo"),
    name: String(e.name ?? "").trim() || "Ammo",
    damageType: Hi(e.damageType),
    apMod: Number(e.apMod ?? e.ap ?? 0) || 0,
    attackRatingBandMod: Hs(e.attackRatingBandMod ?? e.attackRatingBand),
    standardTraits: Ce(e.standardTraits),
    traits: Ze(e.traits)
  };
}
function yt(r) {
  var o;
  const e = r ?? {}, t = Math.max(0, Number(e.max ?? 0) || 0), s = Number(e.current), a = Number.isFinite(s) ? Math.max(0, Math.min(s, t > 0 ? t : s)) : Math.max(0, t), i = ia(e.types).map(qi), n = String(e.activeTypeId ?? "").trim(), l = i.some((c) => c.id === n) ? n : ((o = i[0]) == null ? void 0 : o.id) ?? "";
  return {
    current: a,
    max: t,
    consumePerAttack: Math.max(1, Number(e.consumePerAttack ?? 1) || 1),
    activeTypeId: l,
    types: i
  };
}
function qa(r = {}, e = "") {
  const t = yt(r), a = String(e ?? "").trim() || t.activeTypeId, i = t.types.find((n) => n.id === a) ?? null;
  return {
    ammo: t,
    activeType: i,
    activeTypeId: (i == null ? void 0 : i.id) ?? "",
    ammoLabel: (i == null ? void 0 : i.name) ?? "",
    isTracked: t.max > 0
  };
}
function zi({
  damageType: r = "penetrating",
  ap: e = 0,
  attackRatingBand: t = {},
  traits: s = [],
  standardTraits: a = [],
  ammo: i = {},
  ammoTypeId: n = ""
} = {}) {
  const l = qa(i, n), o = l.activeType, c = [
    ...Ce(a),
    ...Ce(o == null ? void 0 : o.standardTraits)
  ], u = [
    ...Ze(s),
    ...Ze(o == null ? void 0 : o.traits)
  ], m = Va({
    traits: u,
    standardTraits: c
  });
  return {
    damageType: (o == null ? void 0 : o.damageType) || Xe(r),
    ap: (Number(e ?? 0) || 0) + (Number((o == null ? void 0 : o.apMod) ?? 0) || 0),
    attackRatingBand: ji(
      t,
      (o == null ? void 0 : o.attackRatingBandMod) ?? {}
    ),
    effects: m,
    traits: Vi({
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
function za(r = {}, e = {}) {
  const t = Je(r), s = Je(e);
  return {
    penetrating: t.penetrating + s.penetrating,
    concussive: t.concussive + s.concussive,
    energy: t.energy + s.energy,
    thermal: t.thermal + s.thermal,
    electrical: t.electrical + s.electrical
  };
}
function ws({ standardTraits: r = [], traits: e = [], traitState: t = {} } = {}) {
  var p, y;
  const s = Ke(r), i = Ze(e).map((h) => {
    const T = Ba[Vt(h)];
    return T ? { id: us("trait"), key: T, rating: T === "reinforced" ? 1 : 0 } : null;
  }).filter(Boolean), n = Ua(
    [...s, ...i],
    fs
  ), l = n.reduce((h, T) => {
    var S;
    return za(h, ((S = T.effect) == null ? void 0 : S.mitigationByType) ?? {});
  }, Je({})), o = n.reduce(
    (h, T) => {
      var S;
      return h + Math.max(0, Number(((S = T.effect) == null ? void 0 : S.reinforced) ?? 0) || 0);
    },
    0
  ), c = Number((p = t == null ? void 0 : t.reinforced) == null ? void 0 : p.current), u = Number((y = t == null ? void 0 : t.reinforced) == null ? void 0 : y.max), m = Number.isFinite(c) ? c : Number.isFinite(u) ? u : o;
  return {
    mitigationByType: l,
    reinforcedMax: o,
    traitState: {
      reinforced: {
        current: Math.min(o, Math.max(0, m || 0)),
        max: o
      }
    },
    labels: n.map((h) => h.label),
    standardTraits: s
  };
}
function Ki({ traits: r = [], standardTraits: e = [] } = {}) {
  return [
    ...Ze(r),
    ...Ke(e).map((s) => ra(s, fs))
  ].filter(Boolean);
}
function na(r) {
  const e = Math.max(0, Number(r ?? 0) || 0);
  return e <= 0 ? 0 : Math.ceil(e / 4);
}
function Yi({
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
  const a = Xe(t, "penetrating"), i = Je(e), n = na(s), l = Number(i[a] ?? 0) || 0;
  return {
    currentArmorRating: s,
    baseMitigation: n,
    typeMitigationMod: l,
    totalMitigation: n + l,
    isDestroyed: !1
  };
}
function Qi({ damageIncoming: r = 0, armorTags: e = [], effects: t = {} } = {}) {
  const s = new Set(is(e));
  let a = Number(r ?? 0) || 0;
  const i = [];
  return Object.entries((t == null ? void 0 : t.bonusVsArmorTag) ?? {}).forEach(([n, l]) => {
    if (!s.has(n)) return;
    const o = Number(l ?? 0) || 0;
    o && (a *= 1 + o, i.push({ tag: n, bonus: o }));
  }), {
    damageIncoming: a,
    applied: i
  };
}
class ft {
  static checkSufficient(e, t, s) {
    if (t > s) {
      const a = K(f.common.errors.insufficient, {
        resource: e,
        required: t,
        available: s
      });
      throw ui.notifications.error(a), a;
    }
  }
  static checkOutOfRange(e, t, s, a) {
    if (t < s || t > a) {
      const i = K(f.common.errors.outOfRange, {
        resource: e,
        value: t,
        min: s,
        max: a
      });
      throw ui.notifications.error(i), i;
    }
  }
  static checkUserGM() {
    if (!game.user.isGM) {
      const e = f.common.errors.onlyGM;
      throw ui.notifications.error(e), e;
    }
  }
  static checkItemType(e, t) {
    if (e.type != t) {
      const s = K(f.common.errors.expectedType, {
        type: e.type ? f.itemType.singular[e.type] : e.type,
        expectedType: t
      });
      throw ui.notifications.error(s), s;
    }
  }
  static checkActorCanReceiveDamage(e, t, s) {
    if (!t) {
      const a = K(f.common.errors.actorCannotReceiveDamage, {
        actor: s.name,
        damageType: ja(e) ? at(e) : f.actor.monitors[e] ?? f.mwd.weaponDamageType[e] ?? f.mwd.personalDamageType[e] ?? e
      });
      throw ui.notifications.error(a), a;
    }
  }
  static checkWeaponDefense(e, t) {
    var a;
    const s = e.getDefense();
    if ((((a = e.isPersonalWeapon) == null ? void 0 : a.call(e)) ?? e.type === d.itemType.personalWeapon) && !s) {
      const i = K(f.common.errors.noDefenseOnWeapon, { actor: t.name, weapon: e.name });
      throw ui.notifications.error(i), i;
    }
  }
  static checkTargetsCount(e, t, s) {
    if (e > 0 && t.length > e) {
      const a = K(f.common.errors.maxTargetsExceedeed, {
        weapon: this.name,
        area: f.area[s],
        count: t.length,
        max: e
      });
      throw ui.notifications.error(a), a;
    }
  }
  static checkActorDefenseAction(e, t, s) {
    if (!e) {
      const a = K(f.common.errors.actorDoesNotHaveDefense, {
        actor: t.name,
        defense: s.labelkey,
        actorType: f.actorType[t.type]
      });
      throw ui.notifications.error(a), a;
    }
  }
}
function Be(r, e, t, s, a, i = (n) => !0) {
  return {
    code: r,
    labelkey: f.attributeAction[r],
    label: f.attributeAction[r],
    attributeFunction1: e ?? ((n) => {
    }),
    attributeFunction2: t ?? ((n) => {
    }),
    icon: s,
    actorTypes: a,
    condition: i
  };
}
function Zt(r, e) {
  return {
    code: r,
    labelkey: f.defense[r],
    label: f.defense[r],
    actionCode: e
  };
}
const Z = d.actorAttributes, ee = d.actorTypes, Se = de.actions, es = de.defenses, Ss = [
  Be(Se.defense, (r) => Z.reflexes, (r) => Z.intelligence, D.fontAwesome("fas fa-shield-alt"), [ee.character, ee.npc]),
  Be(Se.defense, (r) => Z.handling, (r) => Z.chassis, D.fontAwesome("fas fa-tachometer-alt"), [ee.vehicle, ee.battlemech]),
  Be(Se.resistTorture, (r) => Z.strength, (r) => Z.willpower, D.fontAwesome("fas fa-angry"), [ee.character, ee.npc]),
  Be(Se.perception, (r) => Z.logic, (r) => Z.willpower, D.fontAwesome("fas fa-eye"), [ee.character, ee.npc]),
  Be(Se.perception, (r) => Z.system, (r) => Z.handling, D.fontAwesome("fas fa-video"), [ee.vehicle, ee.battlemech]),
  Be(Se.composure, (r) => Z.charisma, (r) => Z.willpower, D.fontAwesome("fas fa-meh"), [ee.character, ee.npc]),
  Be(Se.judgeIntentions, (r) => Z.charisma, (r) => Z.charisma, D.fontAwesome("fas fa-theater-masks"), [ee.character, ee.npc]),
  Be(Se.memory, (r) => Z.logic, (r) => Z.logic, D.fontAwesome("fas fa-brain"), [ee.character, ee.npc]),
  Be(Se.catch, (r) => Z.reflexes, (r) => Z.reflexes, D.fontAwesome("fas fa-baseball-ball"), [ee.character, ee.npc]),
  Be(Se.lift, (r) => Z.strength, (r) => Z.strength, D.fontAwesome("fas fa-dumbbell"), [ee.character, ee.npc])
], ts = [
  Zt(es.physicalDefense, Se.defense),
  Zt(es.physicalResistance, Se.resistTorture),
  Zt(es.socialDefense, Se.composure),
  Zt(es.mentalResistance, Se.perception)
];
class J {
  static init() {
    Handlebars.registerHelper("fixedDefenseCode", (e) => J.fixedDefenseCode(e));
  }
  static all(e = void 0) {
    return e ? Ss.filter(e) : Ss;
  }
  static getActorActions(e) {
    return Ss.filter((t) => t.actorTypes.includes(e.type) && t.condition(e));
  }
  static fixedDefenseCode(e) {
    return de.fixedDefenseCode[e] ?? e;
  }
  static getActorDefenses(e) {
    return ts.map((t) => {
      const s = J.getActorAction(e, t.actionCode);
      return J._convertToDefense(s, t);
    }).filter((t) => t == null ? void 0 : t.code);
  }
  static getDefenseAttributeAction(e) {
    var t;
    return (t = ts.find((s) => s.code == e)) == null ? void 0 : t.actionCode;
  }
  static getActorAction(e, t) {
    return J.getActorActions(e).find((s) => s.code == t);
  }
  static getActorDefense(e, t) {
    t = J.fixedDefenseCode(t);
    const s = ts.find((i) => i.code == t), a = J.getActorAction(e, s.actionCode);
    return ft.checkActorDefenseAction(a, e, s), J._convertToDefense(a, s);
  }
  static _convertToDefense(e, t) {
    return e ? foundry.utils.mergeObject(
      t,
      e ?? {},
      { overwrite: !1, inplace: !1 }
    ) : void 0;
  }
  static getDefenses() {
    return ts;
  }
  static prepareShortcut(e, t) {
    const s = J.getActorActions(e).find((a) => a.code == t);
    if (s)
      return {
        icon: s.icon,
        label: s.labelkey,
        callback: (a) => a.actor.rollAttributeAction(t)
      };
  }
}
class Bs {
  constructor() {
    this.remoteCalls = {}, game.socket.on(Ls, async (e) => this.onSocketMessage(e));
  }
  static async register(e, t) {
    game.system.anarchy.remoteCall._register(e, t);
  }
  async _register(e, t) {
    if (this.remoteCalls[e])
      throw `RemoteCall msg ${e} is already registered`;
    foundry.utils.mergeObject(t, {
      callback: (s) => {
        console.log(z + "RemoteCall [", e, "] (", s, ")");
      },
      condition: (s) => !0,
      multiple: !1
      /* true if multiple users should handle the message */
    }, { overwrite: !1 }), this.remoteCalls[e] = t, console.log(z + "RemoteCall registered", e);
  }
  static call(e, t) {
    return game.system.anarchy.remoteCall._remoteCall(e, t);
  }
  _remoteCall(e, t) {
    const s = this.remoteCalls[e];
    return !s || s.condition(game.user) || !s.multiple && We.isUniqueConnectedGM() ? !1 : (game.socket.emit(Ls, { msg: e, data: t }), !0);
  }
  async onSocketMessage(e) {
    const t = this.remoteCalls[e.msg];
    if (t) {
      const s = t.condition(game.user), a = t.multiple, i = We.isUniqueConnectedGM();
      s && (a || i) ? t.callback(e.data) : console.log(z + "RemoteCall.onSocketMessage(", e, ") ignored :", s, a, i);
    } else
      console.log(z + "RemoteCall: No callback registered for", e);
  }
}
const da = "Users.blindMessageToGM";
class We {
  static init() {
    Bs.register(da, {
      callback: (e) => We.blindMessageToGM(e),
      condition: (e) => e.isGM
    });
  }
  static blindMessageToGM(e) {
    Bs.call(da, e) || ChatMessage.create({
      user: e.user,
      whisper: ChatMessage.getWhisperRecipients("GM"),
      blind: !0,
      content: K(f.chat.blindMessageToGM, {
        user: game.user.name,
        message: e.content
      })
    });
  }
  static getUsers(e = (t) => !0) {
    return (game.version ? game.users : game.users.entities).filter(e);
  }
  static firstConnectedGM() {
    return We.getUsers((e) => e.isGM && e.active).sort(L.ascending((e) => e.id)).at(0) ?? {};
  }
  /**
   * @returns true pour un seul utilisateur: le premier GM connecté par ordre d'id
   */
  static isUniqueConnectedGM(e = game.user) {
    return e.id == We.firstConnectedGM().id;
  }
  static firstResponsible(e) {
    if (!(e != null && e.testUserPermission))
      return;
    const t = We.getUsers(
      (s) => s.active && e.testUserPermission(s, CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER)
    ).sort(L.ascending((s) => s.id)).at(0);
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
const gt = f.actor.monitors, ze = f.actor.counters, Ka = {
  armor: {
    path: "system.monitors.armor.value",
    monitor: (r) => r.system.monitors.armor,
    iconChecked: D.fontAwesome("fas fa-shield-slash"),
    iconUnchecked: D.fontAwesome("fas fa-shield-alt"),
    iconHit: D.fontAwesome("fas fa-bahai"),
    resource: gt.armor
  },
  fatigue: {
    path: "system.monitors.fatigue.value",
    monitor: (r) => r.system.monitors.fatigue,
    iconChecked: D.fontAwesome("fas fa-grimace"),
    iconUnchecked: D.fontAwesome("far fa-smile"),
    iconHit: D.fontAwesome("fas fa-bahai"),
    resource: gt.fatigue,
    overflow: (r) => d.monitors.physical,
    useArmor: !0
  },
  physical: {
    path: "system.monitors.physical.value",
    monitor: (r) => r.system.monitors.physical,
    iconChecked: D.fontAwesome("fas fa-heartbeat"),
    iconUnchecked: D.fontAwesome("far fa-heart"),
    iconHit: D.fontAwesome("fas fa-bahai"),
    resource: gt.physical,
    useArmor: !0
  },
  structure: {
    path: "system.monitors.structure.value",
    monitor: (r) => r.system.monitors.structure,
    iconChecked: D.fontAwesome("fas fa-car-crash"),
    iconUnchecked: D.fontAwesome("fas fa-car-alt"),
    iconHit: D.fontAwesome("fas fa-bahai"),
    resource: gt.structure
  },
  heat: {
    path: "system.monitors.heat.value",
    monitor: (r) => r.system.monitors.heat,
    iconChecked: D.fontAwesome("fas fa-fire"),
    iconUnchecked: D.fontAwesome("far fa-sun"),
    iconHit: D.fontAwesome("fas fa-temperature-high"),
    resource: gt.heat
  },
  criticals: {
    path: "system.hybrid.criticals.value",
    monitor: (r) => {
      var e;
      return ((e = r.system.hybrid) == null ? void 0 : e.criticals) ?? { value: 0, max: 0 };
    },
    iconChecked: D.fontAwesome("fas fa-bolt"),
    iconUnchecked: D.fontAwesome("far fa-dot-circle"),
    iconHit: D.fontAwesome("fas fa-exclamation-triangle"),
    resource: gt.structure
  },
  anarchy: {
    path: "system.counters.anarchy.value",
    monitor: (r) => ({
      value: r.system.counters.anarchy.value,
      max: 6
    }),
    iconChecked: D.iconPath(`${Lt}/anarchy-point.webp`, "checkbar-img"),
    iconUnchecked: D.iconPath(`${Lt}/anarchy-point-off.webp`, "checkbar-img"),
    resource: ze.anarchy
  },
  plot: {
    path: "system.counters.anarchy.value",
    monitor: (r) => {
      const e = r.system.counters.anarchy.value;
      return { value: e, max: e + 1 };
    },
    iconChecked: D.iconPath(`${Lt}/danger-point.webp`, "checkbar-img"),
    iconUnchecked: D.iconPath(`${Lt}/danger-point-off.webp`, "checkbar-img"),
    resource: ze.anarchy
  },
  sceneAnarchy: {
    path: "system.counters.edgePools.chaos.value",
    monitor: (r) => {
      const e = r.getEdgePoolValue(d.counters.edgePools.chaos), t = r.getAttributeValue(d.actorAttributes.edge);
      return { value: e, max: t };
    },
    iconChecked: D.iconPath("systems/mwd/icons/default/explosion.svg", "checkbar-img"),
    iconUnchecked: D.iconPath("systems/mwd/icons/default/explosion.svg", "checkbar-img"),
    resource: ze.edgePools.chaos
  },
  grit: {
    path: "system.counters.edgePools.grit.value",
    monitor: (r) => ({ value: r.getEdgePoolValue(d.counters.edgePools.grit), max: r.getAttributeValue(d.actorAttributes.edge) }),
    iconChecked: D.iconPath("systems/mwd/icons/default/shield.svg", "checkbar-img"),
    iconUnchecked: D.iconPath("systems/mwd/icons/default/shield.svg", "checkbar-img"),
    resource: ze.edgePools.grit
  },
  insight: {
    path: "system.counters.edgePools.insight.value",
    monitor: (r) => ({ value: r.getEdgePoolValue(d.counters.edgePools.insight), max: r.getAttributeValue(d.actorAttributes.edge) }),
    iconChecked: D.iconPath("systems/mwd/icons/default/eye.svg", "checkbar-img"),
    iconUnchecked: D.iconPath("systems/mwd/icons/default/eye.svg", "checkbar-img"),
    resource: ze.edgePools.insight
  },
  legend: {
    path: "system.counters.edgePools.legend.value",
    monitor: (r) => ({ value: r.getEdgePoolValue(d.counters.edgePools.legend), max: r.getAttributeValue(d.actorAttributes.edge) }),
    iconChecked: D.iconPath("systems/mwd/icons/default/tower-flag.svg", "checkbar-img"),
    iconUnchecked: D.iconPath("systems/mwd/icons/default/tower-flag.svg", "checkbar-img"),
    resource: ze.edgePools.legend
  },
  credibility: {
    path: "system.counters.edgePools.credibility.value",
    monitor: (r) => ({ value: r.getEdgePoolValue(d.counters.edgePools.credibility), max: r.getAttributeValue(d.actorAttributes.edge) }),
    iconChecked: D.iconPath("systems/mwd/icons/misc/hand.svg", "checkbar-img"),
    iconUnchecked: D.iconPath("systems/mwd/icons/misc/hand.svg", "checkbar-img"),
    resource: ze.edgePools.credibility
  },
  rumor: {
    path: "system.counters.edgePools.rumor.value",
    monitor: (r) => ({ value: r.getEdgePoolValue(d.counters.edgePools.rumor), max: r.getAttributeValue(d.actorAttributes.edge) }),
    iconChecked: D.iconPath("systems/mwd/icons/default/mystery-man.svg", "checkbar-img"),
    iconUnchecked: D.iconPath("systems/mwd/icons/default/mystery-man.svg", "checkbar-img"),
    resource: ze.edgePools.rumor
  }
}, _e = foundry.utils.mergeObject(Ka, {});
class E {
  static init() {
    Handlebars.registerHelper("iconCheckbar", E.iconCheckbar), Handlebars.registerHelper("iconCheckbarHit", E.iconHit);
  }
  static hackCheckbars(e) {
    if (e) {
      const t = foundry.utils.mergeObject(Ka, {});
      foundry.utils.mergeObject(t, e, { recursive: !0 }), foundry.utils.mergeObject(_e, t, { overwrite: !0 });
    }
  }
  static iconCheckbar(e, t) {
    return t ? E.iconChecked(e) : E.iconUnchecked(e);
  }
  static iconChecked(e) {
    var t;
    return (t = _e[e]) == null ? void 0 : t.iconChecked;
  }
  static iconUnchecked(e) {
    var t;
    return (t = _e[e]) == null ? void 0 : t.iconUnchecked;
  }
  static iconHit(e) {
    var t, s;
    return ((t = _e[e]) == null ? void 0 : t.iconHit) ?? ((s = _e[e]) == null ? void 0 : s.iconChecked);
  }
  static useArmor(e) {
    var t;
    return (t = _e[e]) == null ? void 0 : t.useArmor;
  }
  static max(e, t) {
    var a;
    const s = (a = _e[t]) == null ? void 0 : a.monitor(e);
    return ((s == null ? void 0 : s.max) ?? 0) + ((s == null ? void 0 : s.maxBonus) ?? 0);
  }
  static value(e, t) {
    var a;
    const s = (a = _e[t]) == null ? void 0 : a.monitor(e);
    return (s == null ? void 0 : s.value) ?? 0;
  }
  static resistance(e, t, s = void 0) {
    return E.resistanceDetail(e, t, s).value;
  }
  static resistanceDetail(e, t, s = void 0) {
    var o, c;
    const a = (o = _e[t]) == null ? void 0 : o.monitor(e), i = E._resolveResistance(a == null ? void 0 : a.resistance, s), n = E._resolveResistance(a == null ? void 0 : a.resistanceBonus, s), l = s === void 0 ? 0 : Number(((c = a == null ? void 0 : a.resistanceBonusByType) == null ? void 0 : c[s]) ?? 0);
    return {
      value: i.value + n.value + l,
      damageType: s,
      source: i.source,
      bonusSource: n.source,
      bonusByType: l,
      usedType: i.source === "type" || n.source === "type" || l !== 0
    };
  }
  static _resolveResistance(e, t = void 0) {
    var i;
    if (typeof e == "number")
      return { value: e ?? 0, source: "legacy" };
    const s = t !== void 0 ? (i = e == null ? void 0 : e.byType) == null ? void 0 : i[t] : void 0;
    return s !== void 0 ? { value: Number(s) || 0, source: "type" } : { value: Number((e == null ? void 0 : e.default) ?? 0) || 0, source: "default" };
  }
  static newValue(e, t) {
    return e + (t ? 0 : 1);
  }
  static async switchMonitorCheck(e, t, s, a, i = void 0, n = void 0) {
    await E.setCounter(e, t, E.newValue(s, a), i, n);
  }
  static async addCounter(e, t, s, a = void 0) {
    if (s != 0) {
      const i = E.getCounterValue(e, t, a) ?? 0;
      await E.setCounter(e, t, i + s, a);
    }
  }
  static async setCounter(e, t, s, a = void 0, i = void 0) {
    switch (t) {
      case d.monitors.anarchy:
        return await E.setAnarchy(e, s);
      case d.monitors.sceneAnarchy:
        return await E.setSceneAnarchy(e, s);
    }
    return await E.setCheckbar(e, t, s);
  }
  static getCounterValue(e, t, s) {
    switch (t) {
      case d.monitors.anarchy:
        return E.getAnarchy(e, t);
    }
    return E.value(e, t);
  }
  static async setCheckbar(e, t, s) {
    if (s == E.getCounterValue(e, t))
      return;
    const a = _e[t];
    if (a.path) {
      const i = E.max(e, t);
      if (i <= 0)
        return;
      await E._manageOverflow(a, e, t, s, i), s = Math.min(s, i), ft.checkOutOfRange(a.resource, s, 0, i), await e.setCheckbarValue(a.path, s);
    }
  }
  static async _manageOverflow(e, t, s, a, i) {
    if (a > i) {
      const n = e.overflow ? e.overflow(t) : void 0, l = e.recomputeOverflow ? e.recomputeOverflow(a - i) : a - i;
      n && l > 0 && (E._notifyOverflow(t, s, l, n), await E.addCounter(t, n, l));
    }
  }
  static _notifyOverflow(e, t, s, a) {
    const i = K(f.actor.monitors.overflow, {
      actor: e.name,
      monitor: f.actor.monitors[t],
      overflow: s,
      overflowMonitor: f.actor.monitors[a]
    });
    ui.notifications.warn(i);
  }
  static async _manageFatigueOverflow(e, t, s) {
    await E.addCounter(e, d.monitors.physical, t - s);
  }
  static async setAnarchy(e, t) {
    if (e.hasOwnAnarchy()) {
      if (e.hasGMAnarchy()) {
        await game.system.anarchy.gmAnarchy.setAnarchy(t), e.render();
        return;
      }
      await E._setAnarchyMonitor(e, d.monitors.anarchy, t);
    }
  }
  static async setSceneAnarchy(e, t) {
    await E._setAnarchyMonitor(e, d.monitors.sceneAnarchy, t);
  }
  static async _setAnarchyMonitor(e, t, s) {
    const a = E.value(e, t);
    await E.setCheckbar(e, t, s), game.user.isGM || E.notifyAnarchyChange(e, t, a, s);
  }
  static getAnarchy(e, t) {
    return !game.user.isGM && (!e.hasOwnAnarchy() || e.hasGMAnarchy()) || t == ze.anarchy && (!e.hasOwnAnarchy() || e.hasGMAnarchy()) ? 0 : E.value(e, t);
  }
  static notifyAnarchyChange(e, t, s, a) {
    We.blindMessageToGM({
      from: game.user.id,
      content: K(
        f.gmManager.playerChangedAnarchy,
        {
          user: game.user.name,
          actor: e.name,
          monitor: f.actor.counters[t],
          from: s,
          to: a
        }
      )
    });
  }
}
const { loadTemplates: Ji, renderTemplate: Xi } = foundry.applications.handlebars, pa = {
  highlighted: ["far fa-times-circle", "fas fa-dice-one", "fas fa-dice-two", "fas fa-dice-three", "fas fa-dice-four", "fas fa-dice-five", "fas fa-dice-six"],
  dimmed: ["far fa-times-circle", "far fa-dice-one", "far fa-dice-two", "far fa-dice-three", "far fa-dice-four", "far fa-dice-five", "far fa-dice-six"]
};
class Ye {
  static init() {
    Hooks.once("ready", async () => await this.onReady()), Handlebars.registerHelper("dice-cursor-array", (e, t) => Ye.array(e ?? 0, t ?? 5)), Handlebars.registerHelper("dice-cursor-fas", (e, t) => Ye.fasClass(e, t)), Handlebars.registerHelper("dice-cursor-active", (e, t) => Ye.activeClass(e, t)), Handlebars.registerHelper("dice-cursor-color", (e, t) => Ye.colorClass(e, t));
  }
  static async onReady() {
    await Ji([
      "systems/mwd/templates/roll/parts/dice-cursor.hbs"
    ]);
  }
  static array(e, t) {
    if (e > t) throw `min>max: ${e} > ${t}`;
    return Array(t - e + 1).fill().map((s, a) => e + a);
  }
  static isActive(e, t) {
    return t <= e && e < 0 || 0 < e && e <= t;
  }
  static activeClass(e, t) {
    return Ye.isActive(e, t) ? "active" : "inactive";
  }
  static fasClass(e, t) {
    const s = Ye.isActive(e, t) ? pa.highlighted : pa.dimmed;
    return Ye.$getFas(s, Math.abs(e));
  }
  static colorClass(e, t) {
    return e == 0 || !t ? e < 0 ? "fixed-dice-malus" : "fixed-dice-bonus" : e < 0 ? "variable-dice-malus" : "variable-dice-bonus";
  }
  static $getFas(e, t) {
    return e[t > 6 ? t % 6 : t];
  }
  static async diceCursor({ value: e, min: t, max: s, editable: a }) {
    return await Xi("systems/mwd/templates/roll/parts/dice-cursor.hbs", {
      value: e,
      min: t,
      max: s,
      editable: a
    });
  }
}
const te = {
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
}, ha = "anarchy-", Ya = `${A}.${te.ANARCHY_HACK}`, js = {
  id: A,
  name: "Standard Shadowrun Anarchy",
  hack: {
    checkbars: () => _e
  }
};
globalThis.ANARCHY_HOOKS = te;
globalThis.SETTING_KEY_ANARCHY_HACK = Ya;
globalThis.SHADOWRUN_ANARCHY_NO_HACK = js;
class pt {
  constructor() {
    this.hooks = [], this.hacks = {}, this.hackNames = {}, this.hookMethods = {}, this._register(te.ANARCHY_HACK), Hooks.on(te.ANARCHY_HACK, (e) => e(js)), Hooks.on("updateSetting", async (e, t, s, a) => this.onUpdateSetting(e, t, s, a)), Hooks.once("ready", () => this.onReady()), Hooks.on("getSceneControlButtons", (e) => {
      var s;
      if (!((s = game.user) != null && s.isGM)) return;
      const t = Array.isArray(e) ? e.find((a) => a.name === "notes") : e == null ? void 0 : e.notes;
      if (!t) {
        const a = Array.isArray(e) ? e.map((i) => i.name) : Object.keys(e ?? {});
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
          var a, i;
          return (i = (a = game.mwd) == null ? void 0 : a.gmGadget) == null ? void 0 : i.call(a);
        }
      });
    });
  }
  async onReady() {
    Hooks.callAll(te.ANARCHY_HACK, (e) => {
      this.hacks[e.id] = e, this.hackNames[e.id] = e.name;
    }), game.settings.register(A, te.ANARCHY_HACK, {
      scope: "world",
      name: f.settings.anarchyHack.name,
      hint: f.settings.anarchyHack.hint,
      config: !0,
      default: js.id,
      choices: this.hackNames,
      type: String
    }), this.applySelectedAnarchyHack();
  }
  async onUpdateSetting(e, t, s, a) {
    e.key == Ya && this.applySelectedAnarchyHack();
  }
  applySelectedAnarchyHack() {
    const e = this.getSelectedHack();
    e && E.hackCheckbars(e.hack.checkbars());
  }
  selectHookMethod(e, t) {
    Hooks.callAll(t, (s, a) => {
      s == e && (this.hookMethods[t] = a);
    });
  }
  getSelectedHack() {
    return this.hacks[game.settings.get(A, te.ANARCHY_HACK)];
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
    pt.instance()._register(e);
  }
  _register(e) {
    if (console.log(z + "HooksManager.register", e), !e.startsWith(ha))
      throw `For safety Anarchy Hooks names must be prefixed by '${ha}'`;
    this.hooks.push(e);
  }
}
const fa = [
  d.itemType.assetModule,
  d.itemType.mechWeapon,
  d.itemType.personalWeapon,
  "weapon"
];
class B {
  constructor() {
    this.modifiers = {
      groups: G.mapObjetToKeyValue(f.modifier.group, "key", "label"),
      roll: B._buildGroupOptions("roll"),
      attribute: B._buildGroupOptions("attribute"),
      monitor: B._buildGroupOptions("monitor"),
      other: B._buildGroupOptions("other")
    }, Hooks.once("ready", () => this.onReady());
  }
  static _buildGroupOptions(e) {
    switch (e) {
      case "attribute":
        return {
          label: f.modifier.group[e],
          effects: G.hbsAttributes.map((t) => ({ key: t.value, label: t.labelkey })),
          categories: []
        };
    }
    return {
      label: f.modifier.group[e],
      effects: G.mapObjetToKeyValue(f.modifier[e].effect, "key", "label"),
      categories: G.mapObjetToKeyValue(f.modifier[e].category, "key", "label")
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
    var s, a;
    switch (e) {
      case "group":
        return this.modifiers.groups;
      case "effect":
        return (s = this.modifiers[t.hash.group]) == null ? void 0 : s.effects;
      case "category":
        return (a = this.modifiers[t.hash.group]) == null ? void 0 : a.categories;
      case "subCategory":
        switch (t.hash.group) {
          case "roll":
            return this.getSelectRollSubCategories(t.hash.category);
          case "monitor": {
            switch (t.hash.category) {
              case "resistanceByType":
                return G.getDamageTypes().map((i) => ({ key: i.value, label: i.labelkey }));
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
        return G.getAttributes().map((s) => ({ key: s.value, label: s.labelkey }));
      case "skill":
        return game.system.anarchy.skills.getSkills().map((s) => ({ key: s.code, label: s.labelkey }));
      case "attributeAction":
        const t = J.all().map((s) => ({ key: s.code, label: s.labelkey }));
        return L.distinct(t.map((s) => s.key)).map((s) => t.find((a) => a.key == s));
    }
    return [];
  }
  getEnums() {
    return { modifiers: this.modifiers };
  }
  static buildRollModifiersFilter(e, t) {
    return (s) => {
      var a;
      if (s.group == "roll" && s.effect == t)
        switch (s.category) {
          case "attribute":
            return [e.attribute1, e.attribute2].includes(s.subCategory);
          case "skill":
            return s.subCategory == ((a = e.skill) == null ? void 0 : a.system.code);
          case "attributeAction":
            return s.subCategory == e.attributeAction || s.subCategory == J.getDefenseAttributeAction(e.defenseAction);
        }
      return !1;
    };
  }
  static computeRollModifiers(e, t, s) {
    const a = B.buildRollModifiersFilter(t, s), i = (c) => c.group == "roll" && c.effect == s && a(c), n = B._activeItems(e).map((c) => B.itemModifiers(c, i)).reduce((c, u) => c.concat(u), []).sort(L.descending((c) => c.modifier.value)), l = B.$sumAssetModuleModifiers(n.filter((c) => fa.includes(c.item.type)).map((c) => c.modifier.value)), o = L.sumValues(n.filter((c) => !fa.includes(c.item.type)).map((c) => c.modifier.value));
    return {
      value: l + o,
      sources: n
    };
  }
  static $sumAssetModuleModifiers(e) {
    const t = e.find((i) => i > 3) ?? 0, s = L.sumValues(e.filter((i) => i < 0)), a = Math.min(3, L.sumValues(e.filter((i) => i > 0 && i <= 3)));
    return s + Math.max(a, t);
  }
  static computeModifiers(e, t, s = void 0, a = void 0) {
    const i = B._createFilter(t, s, a), n = B._activeItems(e).map((o) => B.itemModifiers(o, i)).reduce((o, c) => o.concat(c), []);
    return {
      value: L.sumValues(n, (o) => o.modifier.value),
      sources: n
    };
  }
  static sumMonitorModifiers(e, t, s, a = void 0) {
    return B.sumModifiers(B._activeItems(e), "monitor", t, s, a);
  }
  static sumModifiers(e, t, s, a, i = void 0) {
    const n = B._createFilter(t, s, a, i), l = B._activeItems(e).map((o) => B.itemModifiers(o, n)).reduce((o, c) => o.concat(c), []);
    return L.sumValues(l, (o) => o.modifier.value);
  }
  static _createFilter(e, t, s, a = void 0) {
    return (i) => i.group == e && i.effect == (t ?? i.effect) && i.category == (s ?? i.category) && (a == null ? !0 : i.subCategory == a);
  }
  static countModifiers(e, t, s = void 0, a = void 0) {
    const i = B._createFilter(t, s, a);
    return B._activeItems(e).map((l) => B.itemModifiers(l, i)).reduce((l, o) => l.concat(o), []).count;
  }
  static itemModifiers(e, t) {
    return B._listItemModifiers(e, t).map((s) => B._itemModifier(e, s));
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
const { loadTemplates: ks, renderTemplate: zn } = foundry.applications.handlebars, q = {
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
}, ga = 4, Zi = [
  // attribute1
  {
    code: "attribute1",
    options: {
      order: 1,
      category: q.pool,
      hbsTemplateRoll: `${O}/roll/parts/select-attribute.hbs`
    },
    condition: (r) => Object.values(de.rollType).includes(r.mode),
    isUsed: (r) => !0,
    factory: (r) => {
      var t;
      const e = r.attribute1 ?? ((t = r.skill) == null ? void 0 : t.system.attribute);
      return {
        labelkey: e ? f.attributes[e] : f.attributes.noAttributes,
        value: r.actor.getAttributeValue(e, r.activeItem),
        flags: { editable: r.skill },
        selected: e,
        choices: G.getAttributes((s) => r.attributes.includes(s))
      };
    }
  },
  // attribute2
  {
    code: "attribute2",
    options: {
      order: 1,
      category: q.pool,
      hbsTemplateRoll: `${O}/roll/parts/select-attribute.hbs`,
      hbsTemplateChat: `${O}/chat/parts/pool-attribute2.hbs`
    },
    condition: (r) => [de.rollType.attribute, de.rollType.attributeAction, de.rollType.defense].includes(r.mode),
    isUsed: (r) => r.used,
    onChecked: (r, e) => r.used = !!e,
    factory: (r) => {
      const e = r.attribute2;
      return {
        labelkey: e ? f.attributes[e] : f.attributes.noAttributes,
        value: r.actor.getAttributeValue(e, r.activeItem),
        flags: { editable: de.rollType.attribute == r.mode },
        selected: e,
        choices: G.getAttributes((t) => r.attributes.includes(t))
      };
    }
  },
  // skill
  {
    code: "skill",
    options: {
      flags: {},
      order: 3,
      category: q.pool,
      hbsTemplateRoll: `${O}/roll/parts/input-numeric.hbs`
    },
    condition: (r) => ["skill", "weapon"].includes(r.mode),
    factory: (r) => {
      var t, s, a, i;
      const e = (t = r.actor) != null && t.getSkillRating ? r.actor.getSkillRating(r.skill) : ((a = (s = r.skill) == null ? void 0 : s.system) == null ? void 0 : a.value) ?? 0;
      return {
        label: (i = r.skill) == null ? void 0 : i.name,
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
      category: q.pool,
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
      category: q.pool,
      value: 0,
      labelkey: f.common.roll.modifiers.social.credibility,
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
      labelkey: f.common.roll.modifiers.poolModifiers,
      order: 5,
      category: q.pool,
      hbsTemplateRoll: `${O}/roll/parts/input-numeric.hbs`,
      min: -4,
      max: 4
    },
    factory: (r) => nt.computeRollModifiers(q.pool, r)
  },
  // wounds
  {
    code: "wounds",
    options: {
      flags: { optional: !0 },
      order: 10,
      category: q.pool,
      labelkey: f.common.roll.modifiers.wounds,
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
      category: q.pool,
      value: 0,
      labelkey: f.common.roll.modifiers.other,
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
      category: q.glitch,
      value: 0,
      labelkey: f.common.roll.modifiers.glitch,
      hbsTemplateRoll: `${O}/roll/parts/input-numeric.hbs`,
      hbsTemplateChat: `${O}/chat/parts/glitch.hbs`,
      min: 0,
      max: 5
    },
    isUsed: (r) => r.value > 0,
    factory: (r) => {
      const e = r.actor.getWounds(), t = nt.computeRollModifiers(q.glitch, r);
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
      category: q.glitch,
      value: 0,
      labelkey: f.common.roll.modifiers.social.rumor,
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
      category: q.reroll,
      labelkey: f.common.roll.modifiers.reroll,
      hbsTemplateRoll: `${O}/roll/parts/input-numeric.hbs`,
      min: 0,
      max: ga
    },
    factory: (r) => {
      const e = nt.computeRollModifiers(q.reroll, r), t = nt.computeRollModifiers(q.rerollMax, r);
      return foundry.utils.mergeObject(e, {
        max: ga + Math.max(0, t.value ?? 0)
      });
    }
  },
  // reduction from opponent
  {
    code: "reduced",
    options: {
      order: 29,
      category: q.pool,
      labelkey: f.common.roll.modifiers.reduced,
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
      category: q.rerollForced,
      labelkey: f.common.roll.modifiers.rerollForced,
      hbsTemplateRoll: `${O}/roll/parts/input-numeric.hbs`,
      min: -5,
      max: 0
    },
    factory: (r) => {
      var t;
      const e = nt.computeRollModifiers(q.successReroll, r);
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
      category: q.pool,
      value: 0,
      min: 0,
      max: 3,
      labelkey: f.common.roll.modifiers.anarchyDisposition,
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
      category: q.risk,
      value: 0,
      labelkey: f.common.roll.modifiers.anarchyRisk,
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
      category: q.edge,
      labelkey: f.common.roll.modifiers.edge,
      hbsTemplateRoll: `${O}/roll/parts/check-option.hbs`
    },
    isUsed: (r) => r.used,
    condition: (r) => r.options.canUseEdge && r.actor.getRemainingEdge(),
    onChecked: (r, e) => {
      r.used = e, r.value = e ? 1 : 0;
    },
    factory: (r) => {
      var a;
      const t = [
        d.counters.edgePools.grit,
        d.counters.edgePools.chaos,
        d.counters.edgePools.insight,
        d.counters.edgePools.rumor,
        d.counters.edgePools.legend,
        d.counters.edgePools.credibility
      ].map((i) => {
        const n = r.actor.getEdgePoolValue(i);
        return {
          code: i,
          label: f.actor.counters.edgePools[i] ?? i,
          value: n
        };
      }), s = ((a = t.find((i) => i.value > 0)) == null ? void 0 : a.code) ?? d.counters.edgePools.grit;
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
      category: q.opponentPool,
      labelkey: f.common.roll.modifiers.opponentPool,
      hbsTemplateRoll: `${O}/roll/parts/input-numeric.hbs`,
      min: 0,
      max: 4
    },
    factory: (r) => nt.computeRollModifiers(q.opponentPool, r),
    condition: (r) => !r.attributeAction
  },
  // force opponent rerolls
  {
    code: "opponentReroll",
    options: {
      flags: { editDice: !0, editable: !0, forceDisplay: !0 },
      order: 100,
      category: q.opponentReroll,
      value: 0,
      labelkey: f.common.roll.modifiers.opponentReroll,
      hbsTemplateRoll: `${O}/roll/parts/input-numeric.hbs`,
      min: 0,
      max: 4
    },
    factory: (r) => nt.computeRollModifiers(q.opponentReroll, r),
    condition: (r) => !r.attributeAction
  }
];
class nt {
  constructor() {
    this.registeredParameters = {}, pt.register(te.REGISTER_ROLL_PARAMETERS), pt.register(te.MODIFY_ROLL_PARAMETER), Hooks.on(te.MODIFY_ROLL_PARAMETER, (e) => this._validate(e)), Hooks.once(te.REGISTER_ROLL_PARAMETERS, (e) => Zi.forEach(
      (t) => e(t)
    )), Hooks.once("ready", () => this.onReady());
  }
  async onReady() {
    Hooks.callAll(te.REGISTER_ROLL_PARAMETERS, async (t) => {
      Hooks.callAll(te.MODIFY_ROLL_PARAMETER, t), t.ignore || await this._register(t);
    });
    const e = L.distinct([].concat(Object.values(this.registeredParameters).map((t) => t.options.hbsTemplateRoll)).concat(Object.values(this.registeredParameters).map((t) => t.options.hbsTemplateChat)).filter((t) => typeof t == "string" && t.length > 0));
    await ks(L.distinct(e)), await ks([`${O}/roll/parts/parameter-label.hbs`]);
  }
  _validate(e) {
    e.code || (console.error(`${z} RollParameter does not have a code`, e), e.ignore = !0);
  }
  async _register(e) {
    if (this.registeredParameters[e.code]) {
      console.error(`${z} RollParameter ${e.code} is already registered`, e);
      return;
    }
    e.onChecked || (e.onChecked = (t, s) => t.used = s), e.onValue = (t, s) => t.value = s, this.registeredParameters[e.code] = e;
  }
  async _optionalLoadTemplate(e) {
    e && await ks([e]);
  }
  build(e) {
    return Object.values(this.registeredParameters).filter((t) => !t.condition || t.condition(e)).map((t) => this._computeParameter(t, e));
  }
  compute(e) {
    const t = e.filter((i) => this.isParameterUsed(i)), s = L.classify(t, (i) => i.category), a = {};
    return Object.values(s).forEach((i) => a[i[0].category] = L.sumValues(i, (n) => n.value ?? (n.optional ? 1 : 0))), a;
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
    const s = (i) => {
      var n;
      return !((n = i.isWeapon) != null && n.call(i)) || t.weapon && i.id == t.weapon.id;
    }, a = t.actor.items.filter(s);
    return B.computeRollModifiers(a, t, e);
  }
}
const { ApplicationV2: er, HandlebarsApplicationMixin: tr } = foundry.applications.api, { loadTemplates: sr, renderTemplate: ar } = foundry.applications.handlebars;
var ps, Qa;
const ae = class ae extends tr(er) {
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
    await sr([
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
    const s = foundry.utils.mergeObject(ae.prepareActorRoll(e), {
      mode: de.rollType.attribute,
      attribute1: t
    });
    await ae.create(s);
  }
  static async rollAttributeAction(e, t) {
    const s = foundry.utils.mergeObject(ae.prepareActorRoll(e), {
      mode: de.rollType.attributeAction,
      attributeAction: t.code,
      attribute1: t.attributeFunction1(e),
      attribute2: t.attributeFunction2(e)
    });
    await ae.create(s);
  }
  static async rollSkill(e, t, s) {
    const a = foundry.utils.mergeObject(ae.prepareActorRoll(e), {
      mode: de.rollType.skill,
      skill: t,
      attribute1: (t == null ? void 0 : t.system.attribute) ?? d.actorAttributes.reflexes,
      specialization: s
    });
    await ae.create(a);
  }
  static async rollWeapon(e, t, s, a) {
    const i = foundry.utils.mergeObject(ae.prepareActorRoll(e), {
      mode: de.rollType.weapon,
      weapon: s,
      skill: t,
      attribute1: (t == null ? void 0 : t.system.attribute) ?? e.getPhysicalAgility(),
      specialization: t == null ? void 0 : t.system.specialization,
      targeting: a
    });
    await ae.create(i);
  }
  static async rollDefense(e, t, s) {
    const a = foundry.utils.mergeObject(ae.prepareActorRoll(e), {
      mode: de.rollType.defense,
      attribute1: t.attributeFunction1(e),
      attribute2: t.attributeFunction2(e),
      defenseAction: t.code,
      attackRoll: s.attackRoll,
      tokenId: s.defenderTokenId,
      choiceChatMessageId: s.choiceChatMessageId
    });
    await ae.create(a);
  }
  static async itemAttributeRoll(e, t) {
    const s = foundry.utils.mergeObject(ae.prepareActorRoll(e.actor), {
      mode: de.rollType.attribute,
      item: e,
      attribute1: t,
      attributes: e.actor.getUsableAttributes(e)
    });
    await ae.create(s);
  }
  static async create(e) {
    var n;
    const t = R(n = ae, ps, Qa).call(n, e), s = await ar(`${O}/roll/roll-dialog-title.hbs`, t), a = {
      id: `roll-dialog-${foundry.utils.randomID()}`,
      classes: [game.system.anarchy.styles.selectCssClass(), ...ae.DEFAULT_OPTIONS.classes],
      window: { title: s }
    };
    return new ae({ roll: t }, a).render({ force: !0 });
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
      const a = this._getRollParameter(s), i = this._getEventItem(s, this.roll.actor), n = s.currentTarget.value, l = this.roll.actor.getAttributeValue(n, i);
      this.roll[a.code] = n, await this._setParameterSelectedOption(a, n, l);
    }), this.html.find(".check-optional").click(async (s) => {
      const a = this._getRollParameter(s);
      a.onChecked(a, s.currentTarget.checked), a.category == q.pool && await this._updateParameterValue(a, a.value), a.code == "edge" && this.html.find(`.parameter[data-parameter-code='${a.code}'] .edge-pool-select`).prop("disabled", !a.used);
    }), this.activateDiceParameterClick(), this.html.find("input.parameter-value:not(:disabled)").on("input", async (s) => {
      const a = this._getRollParameter(s), i = Number.parseInt(s.currentTarget.value) ?? 0;
      await this._updateParameterValue(a, i);
    }), this.html.find(".select-option-parameter").change(async (s) => {
      const a = this._getRollParameter(s), i = s.currentTarget.value, n = Number.parseInt(i);
      await this._setParameterSelectedOption(a, i, n);
    }), this.html.find(".edge-pool-select").change(async (s) => {
      const a = this._getRollParameter(s);
      a.pool = s.currentTarget.value;
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
        const a = Number.parseInt(this.html.find(e.currentTarget).attr("data-dice")) ?? 0, i = t.value != a || a == 0 ? a : a > 0 ? a - 1 : a + 1;
        await this._updateParameterValue(t, i);
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
    return await Ye.diceCursor({
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
ps = new WeakSet(), Qa = function(e) {
  const t = game.system.anarchy.rollParameters.build(e).sort(L.ascending((s) => s.order ?? 200));
  return foundry.utils.mergeObject(e, {
    ENUMS: G.getEnums((s) => e.attributes.includes(s)),
    ANARCHY: f,
    parameters: t
  });
}, le(ae, ps), v(ae, "PARTS", {
  body: {
    template: `${O}/roll/roll-dialog.hbs`
  }
});
let Fe = ae;
const oa = [
  // Strength
  { code: "athletics", label: "Athletics", attribute: "strength", icon: `${H}/athletics.svg`, domains: ["physical"] },
  { code: "heavyWeapons", label: "Heavy Weapons", attribute: "strength", icon: `${H}/heavy-weapons.svg`, defense: "physicalDefense", domains: ["physical"] },
  // Reflexes
  { code: "escapeArtist", label: "Escape Artist", attribute: "reflexes", icon: `${H}/escape-artist.svg`, domains: ["physical"] },
  { code: "gunnery", label: "Gunnery", attribute: "reflexes", icon: `${H}/vehicle-weapons.svg`, defense: "physicalDefense", domains: ["physical"] },
  { code: "meleeCombat", label: "Melee Combat", attribute: "reflexes", icon: `${H}/close-combat.svg`, defense: "physicalDefense", domains: ["physical"] },
  { code: "piloting", label: "Piloting", attribute: "reflexes", icon: `${H}/piloting-ground-steering-wheel.svg`, domains: ["physical"] },
  { code: "projectileWeapons", label: "Projectile Weapons", attribute: "reflexes", icon: `${H}/projectile-weapons.svg`, defense: "physicalDefense", domains: ["physical"] },
  { code: "firearms", label: "Firearms", attribute: "reflexes", icon: `${H}/firearms.svg`, defense: "physicalDefense", domains: ["physical"] },
  { code: "stealth", label: "Stealth", attribute: "reflexes", icon: `${H}/stealth.svg`, domains: ["physical"] },
  { code: "zeroGOps", label: "Zero-G Operations", attribute: "reflexes", icon: `${H}/fly.svg`, domains: ["physical"] },
  // Intelligence
  { code: "art", label: "Art", attribute: "intelligence", icon: `${H}/art.svg`, domains: ["mental"] },
  { code: "artillery", label: "Artillery", attribute: "intelligence", icon: `${H}/artillery.svg`, domains: ["mental"] },
  { code: "systemOps", label: "System Operations", attribute: "intelligence", icon: `${H}/electronics.svg`, domains: ["mental"] },
  { code: "computers", label: "Computers", attribute: "intelligence", icon: `${H}/hacking.svg`, domains: ["mental"] },
  { code: "demolitions", label: "Demolitions", attribute: "intelligence", icon: `${H}/demolition.svg`, domains: ["mental"] },
  { code: "medTech", label: "Medtech", attribute: "intelligence", icon: `${H}/biotech.svg`, domains: ["mental"] },
  { code: "science", label: "Science", attribute: "intelligence", icon: `${H}/skills.svg`, domains: ["mental"] },
  { code: "perception", label: "Perception", attribute: "intelligence", icon: `${H}/skills.svg`, domains: ["mental"] },
  { code: "tactics", label: "Tactics", attribute: "intelligence", icon: `${H}/skills.svg`, domains: ["mental"] },
  { code: "technician", label: "Technician", attribute: "intelligence", icon: `${H}/engineering.svg`, domains: ["mental"] },
  { code: "tracking", label: "Tracking", attribute: "intelligence", icon: `${H}/tracking.svg`, domains: ["physical", "mental"] },
  { code: "navigation", label: "Navigation", attribute: "intelligence", icon: `${H}/piloting-other.svg`, domains: ["mental"] },
  // Guts
  { code: "administration", label: "Administration", attribute: "willpower", icon: `${H}/knowledge.svg`, domains: ["social", "mental"] },
  { code: "animalHandling", label: "Animal Handling", attribute: "willpower", icon: `${H}/animals.svg`, domains: ["physical", "mental"] },
  { code: "survival", label: "Survival", attribute: "willpower", icon: `${H}/survival.svg`, domains: ["physical", "mental"] },
  // Charisma
  { code: "acting", label: "Acting", attribute: "charisma", icon: `${H}/con-art.svg`, domains: ["social"] },
  { code: "disguise", label: "Disguise", attribute: "charisma", icon: `${H}/disguise.svg`, domains: ["social", "mental"] },
  { code: "leadership", label: "Leadership", attribute: "charisma", icon: `${H}/psychology.svg`, domains: ["social"] },
  { code: "negotiation", label: "Negotiation", attribute: "charisma", icon: `${H}/negotiation.svg`, domains: ["social"] },
  { code: "etiquette", label: "Etiquette", attribute: "charisma", icon: `${H}/etiquette.svg`, domains: ["social"] },
  { code: "streetwise", label: "Streetwise", attribute: "charisma", icon: `${H}/etiquette2.svg`, domains: ["social"] },
  { code: "intimidation", label: "Intimidation", attribute: "charisma", icon: `${H}/intimidation.svg`, domains: ["social", "mental"] }
].map(ir);
function ir(r) {
  return {
    ...r,
    label: r.label ?? r.code,
    icon: r.icon ?? `${Qt}/icons/skills/skills.svg`
  };
}
function qt(r) {
  return oa.find((e) => e.code === r);
}
function Fs() {
  return [...oa].sort((r, e) => r.label.localeCompare(e.label));
}
function rr(r) {
  const e = Math.ceil(r.length / 2);
  return { left: r.slice(0, e), right: r.slice(e) };
}
function nr(r) {
  var e, t;
  r.skills ?? (r.skills = {});
  for (const s of oa) {
    const a = (e = r.skills)[t = s.code] ?? (e[t] = {});
    a.rating == null && (a.rating = 0);
  }
}
function or(r) {
  const e = Fs(), { left: t, right: s } = rr(e), a = (i) => {
    var p, y, h, T, S, g;
    const n = i.code, l = i.attribute, o = Number(((y = (p = r == null ? void 0 : r.skills) == null ? void 0 : p[n]) == null ? void 0 : y.rating) ?? 0), c = Number(((T = (h = r == null ? void 0 : r.attributes) == null ? void 0 : h[l]) == null ? void 0 : T.value) ?? 0), u = Number(((g = (S = r == null ? void 0 : r.skills) == null ? void 0 : S[n]) == null ? void 0 : g.bonus) ?? 0), m = c + o + u;
    return {
      code: n,
      label: i.label,
      icon: i.icon,
      attribute: l,
      attributeLabel: G != null && G.localizeAttribute ? G.localizeAttribute(l) : l,
      rating: o,
      base: c,
      bonus: u,
      total: m,
      // Input wiring paths (so templates don’t concat strings themselves)
      pathRating: `system.skills.${n}.rating`,
      pathBonus: `system.skills.${n}.bonus`
    };
  };
  return {
    left: t.map(a),
    right: s.map(a)
  };
}
const ya = Object.freeze({
  weapon: d.itemType.personalWeapon,
  shadowamp: d.itemType.assetModule
}), Ja = Object.freeze({
  contact: "systems/mwd/img/default/mystery-man.svg",
  gear: "systems/mwd/img/default/Default_Gear.svg",
  quality: "systems/mwd/img/default/card-joker.svg",
  assetModule: "systems/mwd/img/default/upgrade.svg",
  skill: "systems/mwd/img/default/Default_Skill.svg",
  lifeModule: "systems/mwd/img/default/book.svg",
  mechWeapon: "systems/mwd/img/default/Default_Weapon.svg",
  personalWeapon: "systems/mwd/img/colt-m1911.svg",
  armor: "systems/mwd/img/default/Default_Armor.svg"
}), ht = Object.freeze(["close", "near", "far", "extreme"]), ba = Object.freeze({
  none: { targets: 1, adjust: [0] },
  shotgun: { targets: 2, adjust: [0, -2] },
  circle: { targets: void 0 },
  cone: { targets: void 0 },
  rect: { targets: void 0 },
  ray: { targets: void 0 }
});
function ot(r) {
  return Ze(r);
}
function Xa(r) {
  return r === "long" ? "extreme" : r === "short" ? "close" : r === "medium" ? "near" : ht.includes(r) ? r : "near";
}
function bt(r) {
  return {
    max: Xa((r == null ? void 0 : r.max) ?? "near"),
    close: Number((r == null ? void 0 : r.close) ?? (r == null ? void 0 : r.short) ?? 0) || 0,
    near: Number((r == null ? void 0 : r.near) ?? (r == null ? void 0 : r.medium) ?? 0) || 0,
    far: Number((r == null ? void 0 : r.far) ?? (r == null ? void 0 : r.long) ?? 0) || 0,
    extreme: Number((r == null ? void 0 : r.extreme) ?? 0) || 0
  };
}
function Ms(r) {
  return {
    close: Number((r == null ? void 0 : r.close) ?? (r == null ? void 0 : r.short) ?? 0) || 0,
    near: Number((r == null ? void 0 : r.near) ?? (r == null ? void 0 : r.medium) ?? 0) || 0,
    far: Number((r == null ? void 0 : r.far) ?? (r == null ? void 0 : r.long) ?? 0) || 0,
    extreme: Number((r == null ? void 0 : r.extreme) ?? 0) || 0
  };
}
function lr(r) {
  const e = ht.indexOf(r);
  return e >= 0 ? e : ht.indexOf("near");
}
function cr(r = bt({})) {
  const e = ["near", "close", "far", "extreme"], t = lr(r.max);
  return e.find((s) => ht.indexOf(s) <= t) ?? "close";
}
function ur(r) {
  const e = Xa(r == null ? void 0 : r.max), t = ht.indexOf(e);
  return ht.map((s, a) => ({
    key: s,
    allowed: t >= 0 ? a <= t : a === 0,
    value: (r == null ? void 0 : r[s]) ?? void 0,
    labelkey: G.getFromList(G.getEnums().ranges, s)
  }));
}
function mr(r, e, t, s) {
  let a = Number(e);
  if (t)
    if (s !== void 0)
      a += Math.ceil(Number(s) / 2);
    else
      return console.warn("Weapon not attached to an actor"), Y.item.personalWeapon.weaponWithoutActor;
  return a;
}
function dr(r, e, t) {
  let s = "";
  return t && Y.attributes[t] && (s += Y.attributes[t].substring(0, 3).toUpperCase() + "/2 + "), s += String(e), s;
}
function pr(r, e) {
  return E.useArmor(r) ? e ? "noArmor" : "withArmor" : "";
}
function Aa(r) {
  const e = game.system.mwd.skills.get(r);
  if (!e)
    return {
      img: Ja.skill,
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
function hr(r) {
  const e = String(r ?? "").trim();
  return !!(!e || e.startsWith("icons/svg/") || e === "icons/mystery-man.svg");
}
var zt, He, Gs, Za, rs;
const me = class me extends Item {
  static init() {
    _(this, zt) || (Pe(this, zt, !0), Hooks.on("createItem", (e, t, s) => {
      var a, i;
      Promise.resolve((a = e.onCreateItem) == null ? void 0 : a.call(e, t, s)).catch((n) => {
        console.error(`${z}Item create hook failed`, n);
      }), R(i = me, He, Gs).call(i, e);
    }), Hooks.on("updateItem", (e) => {
      var t;
      R(t = me, He, Gs).call(t, e);
    }), Hooks.on("deleteItem", (e) => {
      var t;
      R(t = me, He, Za).call(t, e);
    }), Hooks.on("createActiveEffect", (e) => {
      var t;
      R(t = me, He, rs).call(t, e);
    }), Hooks.on("updateActiveEffect", (e) => {
      var t;
      R(t = me, He, rs).call(t, e);
    }), Hooks.on("deleteActiveEffect", (e) => {
      var t;
      R(t = me, He, rs).call(t, e);
    }));
  }
  static canonicalType(e) {
    return ya[e] ?? e;
  }
  static defaultIconForType(e) {
    return Ja[this.canonicalType(e)];
  }
  get canonicalType() {
    return this.constructor.canonicalType(this.type);
  }
  async onCreateItem(e, t) {
  }
  async _preCreate(e, t, s) {
    super._preCreate && await super._preCreate(e, t, s);
    const a = (e == null ? void 0 : e.type) ?? this.type, i = this.constructor.canonicalType(a), n = {};
    if (a !== i && ya[a] && (n.type = i), hr((e == null ? void 0 : e.img) ?? this.img)) {
      const l = this.constructor.defaultIconForType(i);
      l && (n.img = l);
    }
    i === d.itemType.lifeModule && (!(e != null && e.name) || e.name === "DOCUMENT.Item") && (n.name = "MWD.itemType.singular.lifeModule"), Object.keys(n).length && this.updateSource(n);
  }
  async _preUpdate(e, t, s) {
    var o, c;
    super._preUpdate && await super._preUpdate(e, t, s);
    const a = e != null && e.system ? foundry.utils.mergeObject(foundry.utils.deepClone(this.system ?? {}), foundry.utils.deepClone(e.system), { inplace: !1 }) : null;
    if (a && this.isPersonalWeapon() && (e.system ?? (e.system = {}), e.system.standardTraits = Ce(a.standardTraits), e.system.ammo = yt(a.ammo), e.system.traits = ot(a.traits), e.system.attackRatingBand = Ms(a.attackRatingBand), e.system.range = bt(a.range), e.system.damageType = Xe(a.damageType)), a && this.isArmor() && (e.system ?? (e.system = {}), e.system.mitigationByType = Je(a.mitigationByType ?? a.mitigation), e.system.tags = is(a.tags), e.system.traits = ot(a.traits), e.system.standardTraits = Ke(a.standardTraits), e.system.traitState = ws({
      standardTraits: e.system.standardTraits,
      traits: e.system.traits,
      traitState: a.traitState
    }).traitState), !this.isSkill()) return;
    const i = (o = e == null ? void 0 : e.system) == null ? void 0 : o.code;
    if (i === void 0) return;
    const n = this.system.code;
    if (i === n) return;
    const l = Aa(i);
    l && ((c = l == null ? void 0 : l.system) == null || delete c.code, foundry.utils.mergeObject(e, l, { inplace: !0 }));
  }
  prepareBaseData() {
    super.prepareBaseData();
    const e = this.canonicalType;
    e === d.itemType.personalWeapon ? this._preparePersonalWeaponBaseData() : e === d.itemType.armor && this._prepareArmorBaseData();
  }
  _preparePersonalWeaponBaseData() {
    const e = this.system ?? {};
    e.equipped = !!e.equipped, e.isPrimary = !!e.isPrimary, e.category = String(e.category ?? e.weaponCategory ?? "ranged").trim() || "ranged", e.skill = String(e.skill ?? "firearms").trim() || "firearms", e.ap = Number(e.ap ?? e.armorPiercing ?? 0) || 0, e.damage = Number(e.damage ?? 0) || 0, e.damageType = Xe(e.damageType), e.attackRatingBand = Ms(e.attackRatingBand), e.range = bt(e.range), e.standardTraits = Ce(e.standardTraits), e.ammo = yt(e.ammo), e.traits = ot(e.traits), e.notes = String(e.notes ?? "").trim();
  }
  _prepareArmorBaseData() {
    const e = this.system ?? {};
    e.equipped = !!e.equipped, e.isPrimary = !!e.isPrimary, e.rating = Math.max(0, Number(e.rating ?? 0)), e.defenseBonus = Number(e.defenseBonus ?? 0) || 0, e.mitigationByType = Je(e.mitigationByType ?? e.mitigation), delete e.mitigation, e.durability ?? (e.durability = {}), e.durability.max = Math.max(0, Number(e.durability.max ?? e.rating ?? 0)), e.durability.current = Math.min(
      e.durability.max,
      Math.max(0, Number(e.durability.current ?? e.durability.max ?? e.rating ?? 0))
    ), e.standardTraits = Ke(e.standardTraits), e.tags = is(e.tags), e.traits = ot(e.traits), e.traitState = ws({
      standardTraits: e.standardTraits,
      traits: e.traits,
      traitState: e.traitState
    }).traitState, e.notes = String(e.notes ?? "").trim();
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
    return [d.itemType.mechWeapon, d.itemType.personalWeapon].includes(this.canonicalType);
  }
  isPersonalWeapon() {
    return this.canonicalType === d.itemType.personalWeapon;
  }
  isArmor() {
    return this.canonicalType === d.itemType.armor;
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
      var a, i;
      const s = (i = (a = t.flags) == null ? void 0 : a[A]) == null ? void 0 : i[me.EQUIPPED_EFFECT_FLAG];
      return (s == null ? void 0 : s.sourceItemId) === this.id;
    }) : [];
  }
  async removeSyncedActorEffects({ actor: e = this.actor } = {}) {
    const t = this.getSyncedActorEffects({ actor: e });
    return !t.length || !e ? [] : e.deleteEmbeddedDocuments("ActiveEffect", t.map((s) => s.id));
  }
  async syncEquippedActorEffects({ actor: e = this.actor } = {}) {
    var p, y, h, T;
    if (!e || !this.supportsEquippedEffectSync()) return { created: [], updated: [], deleted: [] };
    const t = this.getSyncedActorEffects({ actor: e }), s = Array.from(((p = this.effects) == null ? void 0 : p.contents) ?? []);
    if (!this.shouldApplyEquippedEffects()) {
      if (!t.length) return { created: [], updated: [], deleted: [] };
      const S = await e.deleteEmbeddedDocuments("ActiveEffect", t.map((g) => g.id));
      return { created: [], updated: [], deleted: S };
    }
    const a = /* @__PURE__ */ new Map();
    for (const S of t) {
      const g = (T = (h = (y = S.flags) == null ? void 0 : y[A]) == null ? void 0 : h[me.EQUIPPED_EFFECT_FLAG]) == null ? void 0 : T.sourceEffectId;
      if (!g) continue;
      const k = a.get(g) ?? [];
      k.push(S), a.set(g, k);
    }
    const i = [], n = [], l = [], o = new Set(s.map((S) => S.id));
    for (const [S, g] of a.entries()) {
      if (!o.has(S)) {
        l.push(...g.map((k) => k.id));
        continue;
      }
      g.length > 1 && l.push(...g.slice(1).map((k) => k.id));
    }
    for (const S of s) {
      const k = (a.get(S.id) ?? [])[0] ?? null, C = this._prepareSyncedActorEffectData(S);
      k ? n.push({ _id: k.id, ...C }) : i.push(C);
    }
    const c = l.length ? await e.deleteEmbeddedDocuments("ActiveEffect", l) : [], u = n.length ? await e.updateEmbeddedDocuments("ActiveEffect", n) : [];
    return { created: i.length ? await e.createEmbeddedDocuments("ActiveEffect", i) : [], updated: u, deleted: c };
  }
  _prepareSyncedActorEffectData(e) {
    const t = e.toObject();
    delete t._id;
    const s = String(e.name ?? "Effect").trim() || "Effect", a = String(this.name ?? "Item").trim() || "Item", i = s.startsWith(a) ? s : `${a}: ${s}`;
    return t.name = i, t.transfer = !1, t.origin = e.uuid ?? this.uuid ?? t.origin ?? null, t.flags = foundry.utils.mergeObject(t.flags ?? {}, {
      [A]: {
        [me.EQUIPPED_EFFECT_FLAG]: {
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
    return this.canonicalType === d.itemType.skill;
  }
  isActive() {
    return !this.system.inactive;
  }
  async rollAttribute(e) {
    this.parent && await Fe.itemAttributeRoll(this, e);
  }
  async switchMonitorCheck(e, t, s, a = void 0) {
    await E.switchMonitorCheck(this.parent, e, t, s, a, this);
  }
  async setCounter(e, t) {
    await E.setCounter(this, e, t);
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
    const a = this._computeModifierImpact(t, s);
    this._applyModifierUpdate(e, a);
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
    await this._mutateModifiers((s) => s.map((a) => (a.id === e && t(a), a)));
  }
  async _mutateModifiers(e = (t) => t) {
    const t = e(this.system.modifiers);
    L.reindexIds(t), await this.update({ "system.modifiers": t });
  }
  async _mutateWeaponStandardTraits(e = (t) => t) {
    var s;
    const t = e(foundry.utils.deepClone(Ce((s = this.system) == null ? void 0 : s.standardTraits)));
    await this.update({ "system.standardTraits": Ce(t) });
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
    await this._mutateWeaponStandardTraits((a) => a.map((i) => (i.id !== e || (t === "key" && (i.key = s), t === "rating" && (i.rating = Math.max(0, Number(s ?? 0) || 0))), i)));
  }
  async _mutateArmorStandardTraits(e = (t) => t) {
    var s;
    const t = e(foundry.utils.deepClone(Ke((s = this.system) == null ? void 0 : s.standardTraits)));
    await this.update({ "system.standardTraits": Ke(t) });
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
    await this._mutateArmorStandardTraits((a) => a.map((i) => (i.id !== e || (t === "key" && (i.key = s), t === "rating" && (i.rating = Math.max(0, Number(s ?? 0) || 0))), i)));
  }
  async _mutateAmmo(e = (t) => t) {
    var s;
    const t = e(foundry.utils.deepClone(yt((s = this.system) == null ? void 0 : s.ammo)));
    await this.update({ "system.ammo": yt(t) });
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
      return t.types = t.types.filter((a) => a.id !== e), t.activeTypeId === e && (t.activeTypeId = ((s = t.types[0]) == null ? void 0 : s.id) ?? ""), t;
    });
  }
  async updateAmmoType(e, t, s) {
    await this._mutateAmmo((a) => (a.types = a.types.map((i) => {
      if (i.id !== e) return i;
      if (t === "traits")
        i.traits = s;
      else if (t === "damageType")
        i.damageType = s;
      else if (t === "apMod")
        i.apMod = Number(s ?? 0) || 0;
      else if (t.startsWith("attackRatingBandMod.")) {
        const n = t.split(".")[1];
        i.attackRatingBandMod ?? (i.attackRatingBandMod = {}), i.attackRatingBandMod[n] = Number(s ?? 0) || 0;
      } else
        i[t] = s;
      return i;
    }), a));
  }
  async createAmmoTypeStandardTrait(e, t = {}) {
    await this._mutateAmmo((s) => (s.types = s.types.map((a) => (a.id !== e || (a.standardTraits = Ce(a.standardTraits).concat([{
      id: t.id ?? foundry.utils.randomID(),
      key: t.key ?? "armorPiercing",
      rating: Math.max(0, Number(t.rating ?? 0) || 0)
    }])), a)), s));
  }
  async deleteAmmoTypeStandardTrait(e, t) {
    await this._mutateAmmo((s) => (s.types = s.types.map((a) => (a.id !== e || (a.standardTraits = Ce(a.standardTraits).filter((i) => i.id !== t)), a)), s));
  }
  async updateAmmoTypeStandardTrait(e, t, s, a) {
    await this._mutateAmmo((i) => (i.types = i.types.map((n) => (n.id !== e || (n.standardTraits = Ce(n.standardTraits).map((l) => (l.id !== t || (s === "key" && (l.key = a), s === "rating" && (l.rating = Math.max(0, Number(a ?? 0) || 0))), l))), n)), i));
  }
  getAmmoState({ ammoTypeId: e = "" } = {}) {
    var t;
    return qa((t = this.system) == null ? void 0 : t.ammo, e);
  }
  async setActiveAmmoType(e) {
    await this.updateAmmoField("activeTypeId", e);
  }
  canConsumeAmmo({ ammoTypeId: e = "" } = {}) {
    var s, a;
    const t = this.getAmmoState({ ammoTypeId: e });
    return t != null && t.isTracked ? Number(((s = t == null ? void 0 : t.ammo) == null ? void 0 : s.current) ?? 0) >= Number(((a = t == null ? void 0 : t.ammo) == null ? void 0 : a.consumePerAttack) ?? 1) : !0;
  }
  async consumeAmmo({ ammoTypeId: e = "" } = {}) {
    var i, n;
    const t = this.getAmmoState({ ammoTypeId: e });
    if (!(t != null && t.isTracked)) return !0;
    const s = Math.max(1, Number(((i = t == null ? void 0 : t.ammo) == null ? void 0 : i.consumePerAttack) ?? 1) || 1), a = Math.max(0, Number(((n = t == null ? void 0 : t.ammo) == null ? void 0 : n.current) ?? 0) || 0);
    return a < s ? !1 : (await this._mutateAmmo((l) => (l.activeTypeId = t.activeTypeId || l.activeTypeId || "", l.current = Math.max(0, a - s), l)), !0);
  }
  getCombatProfile({ ammoTypeId: e = "" } = {}) {
    if (!this.isPersonalWeapon()) return null;
    const t = this.system ?? {}, s = bt(t.range), a = String(t.skill ?? "").trim(), i = qt(a), n = Number(t.damage ?? 0) || 0, l = String(t.category ?? t.weaponCategory ?? "ranged").trim() || "ranged", o = zi({
      damageType: t.damageType,
      ap: Number(t.ap ?? t.armorPiercing ?? 0) || 0,
      attackRatingBand: Ms(t.attackRatingBand),
      traits: ot(t.traits),
      standardTraits: Ce(t.standardTraits),
      ammo: yt(t.ammo),
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
      skill: a || "firearms",
      skillDef: i,
      damage: n,
      ap: o.ap,
      damageType: o.damageType,
      damageTypeLabel: at(o.damageType),
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
    const t = this.system ?? {}, s = Math.max(0, Number(t.rating ?? 0)), a = Math.max(0, Number(((u = t == null ? void 0 : t.durability) == null ? void 0 : u.max) ?? s)), i = Math.min(
      a,
      Math.max(0, Number(((m = t == null ? void 0 : t.durability) == null ? void 0 : m.current) ?? a))
    ), n = Je((t == null ? void 0 : t.mitigationByType) ?? (t == null ? void 0 : t.mitigation)), l = ws({
      standardTraits: Ke(t == null ? void 0 : t.standardTraits),
      traits: ot(t == null ? void 0 : t.traits),
      traitState: t == null ? void 0 : t.traitState
    }), o = is(t == null ? void 0 : t.tags), c = na(i);
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
      currentArmorRating: i,
      baseMitigation: c,
      baseResistance: c,
      mitigationByType: za(n, l.mitigationByType),
      tags: o,
      isDestroyed: i <= 0,
      durability: {
        current: i,
        max: a
      },
      traitState: l.traitState,
      standardTraits: Ke(t.standardTraits),
      traits: Ki({
        traits: ot(t.traits),
        standardTraits: Ke(t.standardTraits)
      }),
      notes: String(t.notes ?? "").trim()
    };
  }
  getDefaultRangeBand(e = bt(((t) => (t = this.system) == null ? void 0 : t.range)())) {
    return cr(e);
  }
  isWeaponSkill(e) {
    return ((e == null ? void 0 : e.canonicalType) ?? (e == null ? void 0 : e.type)) === d.itemType.skill && e.system.code === this.system.skill;
  }
  getWeaponSkill() {
    var s;
    const e = (s = this.actor) == null ? void 0 : s.items.find((a) => this.isWeaponSkill(a));
    if (e) return e;
    const t = game.items.find((a) => this.isWeaponSkill(a));
    return t || Aa(this.system.skill);
  }
  getDefense() {
    if (!this.isPersonalWeapon())
      return this.system.defense ? J.fixedDefenseCode(this.system.defense) : void 0;
    if (this.system.defense)
      return J.fixedDefenseCode(this.system.defense);
    const e = qt(String(this.system.skill ?? "").trim());
    return e != null && e.defense ? J.fixedDefenseCode(e.defense) : void 0;
  }
  getDamage() {
    if (!this.parent) return;
    const e = this._getMonitor(), t = this.system.damageAttribute ? this.parent.getAttributeValue(this.system.damageAttribute) ?? 0 : 0, s = this.isPersonalWeapon() ? this.getCombatProfile() : null;
    return {
      value: mr(
        e,
        this.system.damage,
        this.system.damageAttribute,
        t
      ),
      monitor: e,
      damageType: (s == null ? void 0 : s.damageType) ?? this.system.damageType,
      damageTypeLabel: (s == null ? void 0 : s.damageTypeLabel) ?? this.getDamageTypeLabel(),
      noArmor: this.system.noArmor ?? this.system.armorAvoidance,
      armorMode: pr(e, this.system.noArmor ?? this.system.armorAvoidance)
    };
  }
  getDamageCode() {
    return dr(
      this._getMonitor(),
      this.system.damage,
      this.system.damageAttribute
    );
  }
  getDamageTypeLabel() {
    var t;
    if (this.isPersonalWeapon())
      return at(((t = this.getCombatProfile()) == null ? void 0 : t.damageType) ?? this.system.damageType);
    const e = Y.mwd.weaponDamageType[this.system.damageType] ?? Y.mwd.personalDamageType[this.system.damageType];
    return e || this.system.damageType;
  }
  getRanges() {
    return ur(bt(this.system.range)).filter((e) => e.allowed).map((e) => ({ value: e.value, labelkey: e.labelkey }));
  }
  validateTargets(e) {
    var n;
    const t = (n = this.getDamage()) == null ? void 0 : n.monitor, s = We.getTargetTokens(game.user), a = s.filter((l) => {
      var o;
      return (o = l.actor) == null ? void 0 : o.canReceiveDamage(t);
    }), i = s.filter((l) => {
      var o;
      return !((o = l.actor) != null && o.canReceiveDamage(t));
    }).map((l) => l.name);
    if (i.length > 0) {
      const l = K(Y.common.errors.ignoredTargets, {
        targets: i.reduce(L.joiner(", "))
      });
      ui.notifications.info(l);
    }
    if (a.length === 0) {
      const l = K(Y.common.errors.noTargetSelected, {
        weapon: this.name ?? Y.itemType.singular.weapon
      });
      ui.notifications.info(l);
    } else
      this.checkWeaponTargetsCount(a);
    return a;
  }
  checkWeaponTargetsCount(e) {
    const t = this.system.area, s = ba[t] ?? {};
    ft.checkTargetsCount(s.targets ?? 0, e, t);
  }
  getAreaModifier(e) {
    const t = this.getArea(), s = ba[t] ?? {};
    return s.targets && s.adjust && e <= s.targets ? s.adjust[e - 1] ?? 0 : 0;
  }
  getArea() {
    return this.system.area === "" ? d.area.none : this.system.area ?? d.area.none;
  }
  _getMonitor() {
    return this.isPersonalWeapon() ? d.monitors.physical : this.system.monitor || d.monitors.physical;
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
zt = new WeakMap(), He = new WeakSet(), Gs = async function(e) {
  if (typeof (e == null ? void 0 : e.syncEquippedActorEffects) == "function")
    try {
      await e.syncEquippedActorEffects();
    } catch (t) {
      console.error(`${z}Failed to sync equipped item effects`, { item: e, error: t });
    }
}, Za = async function(e) {
  if (typeof (e == null ? void 0 : e.removeSyncedActorEffects) == "function")
    try {
      await e.removeSyncedActorEffects({ actor: e.actor ?? e.parent ?? null });
    } catch (t) {
      console.error(`${z}Failed to remove synced item effects`, { item: e, error: t });
    }
}, rs = async function(e) {
  const t = e == null ? void 0 : e.parent;
  if (typeof (t == null ? void 0 : t.syncEquippedActorEffects) == "function")
    try {
      await t.syncEquippedActorEffects();
    } catch (s) {
      console.error(`${z}Failed to sync parent item effects`, { effect: e, error: s });
    }
}, le(me, He), le(me, zt, !1), v(me, "RANGE_ORDER", ht), v(me, "EQUIPPED_EFFECT_FLAG", "equippedItemSync"), v(me, "DEFAULT_UNARMED", Object.freeze({
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
let vt = me;
class gs extends vt {
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
    var l, o, c;
    await ((l = super._preUpdate) == null ? void 0 : l.call(this, e, t, s));
    const a = (o = e == null ? void 0 : e.system) == null ? void 0 : o.code;
    if (a === void 0) return;
    const i = this.system.code;
    if (a === i) return;
    const n = gs.prepareSkill(a);
    n && ((c = n == null ? void 0 : n.system) == null || delete c.code, foundry.utils.mergeObject(e, n, { inplace: !0 }));
  }
}
const Ta = {
  none: { targets: 1, adjust: [0] },
  shotgun: { targets: 2, adjust: [0, -2] },
  circle: { targets: void 0 },
  cone: { targets: void 0 },
  rect: { targets: void 0 },
  ray: { targets: void 0 }
}, fr = {
  code: "weapon-range",
  options: {
    flags: { editable: !0 },
    order: 20,
    category: q.pool,
    labelkey: Y.common.roll.modifiers.weaponRange,
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
}, gr = {
  code: "weapon-area",
  options: {
    used: !0,
    order: 20,
    category: q.pool,
    labelkey: Y.common.roll.modifiers.weaponArea,
    hbsTemplateRoll: `${O}/roll/parts/input-numeric.hbs`,
    hbsTemplateChat: void 0
    //``
  },
  isUsed: (r) => r.used,
  condition: (r) => r.weapon && r.weapon.getArea() != d.area.none,
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
};
var F;
let At = (F = class extends vt {
  static init() {
    Hooks.once(te.REGISTER_ROLL_PARAMETERS, (e) => {
      e(gr), e(fr);
    });
  }
  prepareBaseData() {
    if (super.prepareBaseData(), (this.canonicalType ?? this.type) !== d.itemType.personalWeapon) return;
    const e = this.system ?? {};
    e.equipped = !!e.equipped, e.isPrimary = !!e.isPrimary, e.category = String(e.category ?? e.weaponCategory ?? "ranged").trim() || "ranged", e.skill = String(e.skill ?? "firearms").trim() || "firearms", e.ap = Number(e.ap ?? e.armorPiercing ?? 0) || 0, e.damage = Number(e.damage ?? 0) || 0, e.damageType = Xe(e.damageType), e.attackRatingBand = F.normalizeAttackRatingBand(e.attackRatingBand), e.range = F.normalizeRangeData(e.range), e.traits = F.normalizeTraits(e.traits), e.notes = String(e.notes ?? "").trim();
  }
  static maxIndex(e) {
    const t = F.RANGE_ORDER.indexOf(e);
    return t >= 0 ? t : F.RANGE_ORDER.indexOf("near");
  }
  /**
    * Compute UI-friendly range band data:
    * - cap: normalized max band
    * - bands: [{key, allowed, value}]
    * - optimalKey: highest value among allowed (tie -> closest)
    */
  static getRangeBands(e) {
    const t = e ?? {}, s = F.normalizeRangeKey(t.max ?? "near"), a = F.maxIndex(s), i = F.RANGE_ORDER.map((o, c) => ({
      key: o,
      allowed: c <= a,
      value: Number(t[o] ?? (o === "extreme" && t.long !== void 0 ? t.long : 0))
    }));
    let n = "close", l = -1 / 0;
    for (const o of i)
      o.allowed && o.value > l && (l = o.value, n = o.key);
    return { cap: s, bands: i, optimalKey: n };
  }
  static get defaultIcon() {
    return "systems/mwd/img/colt-m1911.svg";
  }
  static defaultIconForType(e) {
    return e === d.itemType.mechWeapon ? "systems/mwd/img/default/Default_Weapon.svg" : this.defaultIcon;
  }
  static normalizeTraits(e) {
    return Ze(e);
  }
  static normalizeRangeData(e) {
    return {
      max: F.normalizeRangeKey((e == null ? void 0 : e.max) ?? "near"),
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
    const e = this.system ?? {}, t = this.canonicalType ?? this.type, s = F.normalizeRangeData(e.range), a = String(e.skill ?? "").trim(), i = qt(a), n = Number(e.damage ?? 0) || 0, l = Number(e.ap ?? e.armorPiercing ?? 0) || 0, o = String(e.category ?? e.weaponCategory ?? "ranged").trim() || "ranged", c = F.normalizeTraits(e.traits), u = Va(c);
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
      skill: a || "firearms",
      skillDef: i,
      damage: n,
      ap: l,
      damageType: t === d.itemType.personalWeapon ? Xe(e.damageType) : String(e.damageType ?? "kinetic").trim() || "kinetic",
      attackRatingBand: F.normalizeAttackRatingBand(e.attackRatingBand),
      range: s,
      defaultRangeBand: this.getDefaultRangeBand(s),
      traits: c,
      effects: t === d.itemType.personalWeapon ? u : {},
      notes: String(e.notes ?? e.description ?? "").trim()
    };
  }
  getDefaultRangeBand(e = F.normalizeRangeData(((t) => (t = this.system) == null ? void 0 : t.range)())) {
    const s = ["near", "close", "far", "extreme"], a = F.maxIndex(e.max);
    return s.find((i) => F.RANGE_ORDER.indexOf(i) <= a) ?? "close";
  }
  isWeaponSkill(e) {
    return e.type == "skill" && e.system.code === this.system.skill;
  }
  getWeaponSkill() {
    var s;
    const e = (s = this.actor) == null ? void 0 : s.items.find((a) => this.isWeaponSkill(a));
    if (e)
      return e;
    const t = game.items.find((a) => this.isWeaponSkill(a));
    return t || gs.prepareSkill(this.system.skill);
  }
  getDefense() {
    if ((this.canonicalType ?? this.type) !== d.itemType.personalWeapon)
      return this.system.defense ? J.fixedDefenseCode(this.system.defense) : void 0;
    if (this.system.defense)
      return J.fixedDefenseCode(this.system.defense);
    const e = qt(String(this.system.skill ?? "").trim());
    return e != null && e.defense ? J.fixedDefenseCode(e.defense) : void 0;
  }
  getDamage() {
    if (!this.parent)
      return;
    const e = this._getMonitor(), t = this.system.damageAttribute ? this.parent.getAttributeValue(this.system.damageAttribute) ?? 0 : 0;
    return {
      value: F.damageValue(
        e,
        this.system.damage,
        this.system.damageAttribute,
        t
      ),
      monitor: e,
      damageType: this.system.damageType,
      damageTypeLabel: this.getDamageTypeLabel(),
      noArmor: this.system.noArmor ?? this.system.armorAvoidance,
      armorMode: F.armorMode(e, this.system.noArmor ?? this.system.armorAvoidance)
    };
  }
  static damageValue(e, t, s, a) {
    if (t = Number(t), s)
      if (a !== void 0)
        t = t + Math.ceil(Number(a) / 2);
      else
        return console.warn("Weapon not attached to an actor"), Y.item.personalWeapon.weaponWithoutActor;
    return t;
  }
  getDamageCode() {
    return F.damageCode(
      this._getMonitor(),
      this.system.damage,
      this.system.damageAttribute
    );
  }
  static damageCode(e, t, s) {
    let a = "";
    return s && Y.attributes[s] && (a += Y.attributes[s].substring(0, 3).toUpperCase() + "/2 + "), a += String(t), a;
  }
  static armorMode(e, t) {
    return E.useArmor(e) ? t ? "noArmor" : "withArmor" : "";
  }
  getDamageTypeLabel() {
    if ((this.canonicalType ?? this.type) === d.itemType.personalWeapon)
      return at(this.system.damageType);
    const e = Y.mwd.weaponDamageType[this.system.damageType] ?? Y.mwd.personalDamageType[this.system.damageType];
    return e || this.system.damageType;
  }
  getRanges() {
    return F.getRangeList(F.normalizeRangeData(this.system.range)).filter((e) => e.allowed).map((e) => ({ value: e.value, labelkey: e.labelkey }));
  }
  _getRange(e) {
    return { value: this.system.range[e], labelkey: G.getFromList(G.getEnums().ranges, e) };
  }
  static getRangeList(e) {
    const t = F.normalizeRangeKey(e == null ? void 0 : e.max), s = F.RANGE_ORDER.indexOf(t);
    return F.RANGE_ORDER.map((a, i) => ({
      key: a,
      allowed: s >= 0 ? i <= s : i === 0,
      value: (e == null ? void 0 : e[a]) ?? (a === "extreme" && (e == null ? void 0 : e.long) !== void 0 ? e.long : void 0),
      labelkey: G.getFromList(G.getEnums().ranges, a)
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
    const t = (n = this.getDamage()) == null ? void 0 : n.monitor, s = We.getTargetTokens(game.user), a = s.filter((l) => {
      var o;
      return (o = l.actor) == null ? void 0 : o.canReceiveDamage(t);
    }), i = s.filter((l) => {
      var o;
      return !((o = l.actor) != null && o.canReceiveDamage(t));
    }).map((l) => l.name);
    if (i.length > 0) {
      const l = K(Y.common.errors.ignoredTargets, {
        targets: i.reduce(L.joiner(", "))
      });
      ui.notifications.info(l);
    }
    if (a.length == 0) {
      const l = K(Y.common.errors.noTargetSelected, {
        weapon: this.name ?? Y.itemType.singular.weapon
      });
      ui.notifications.info(l);
    } else
      this.checkWeaponTargetsCount(a);
    return a;
  }
  checkWeaponTargetsCount(e) {
    const t = this.system.area, s = Ta[t] ?? {};
    ft.checkTargetsCount(s.targets ?? 0, e, t);
  }
  getAreaModifier(e) {
    const t = this.getArea(), s = Ta[t] ?? {};
    return s.targets && s.adjust && e <= s.targets ? s.adjust[e - 1] ?? 0 : 0;
  }
  getArea() {
    return this.system.area == "" ? d.area.none : this.system.area ?? d.area.none;
  }
  _getMonitor() {
    return (this.canonicalType ?? this.type) === d.itemType.personalWeapon ? d.monitors.physical : this.system.monitor || d.monitors.physical;
  }
}, v(F, "RANGE_ORDER", ["close", "near", "far", "extreme"]), v(F, "DEFAULT_UNARMED", Object.freeze({
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
})), F);
function yr(r) {
  const e = [];
  for (let [t, s] of Object.entries(r ?? {}))
    s !== void 0 && (t = t.replace(/[A-Z]+(?![a-z])|[A-Z]/g, (a, i) => (i ? "-" : "") + a.toLowerCase()), e.push(`data-${t}="${Handlebars.escapeExpression(s)}"`));
  return new Handlebars.SafeString(e.join(" "));
}
function br({ hash: r }) {
  return r;
}
function Ar() {
  var r, e;
  return ((e = (r = foundry == null ? void 0 : foundry.applications) == null ? void 0 : r.handlebars) == null ? void 0 : e.Handlebars) ?? Handlebars;
}
class la {
  constructor() {
    this.registerHelpers(), Hooks.once("init", () => {
      this.registerHelpers(), console.log(`${z}Handlebars helpers registered (init)`);
    }), console.log(`${z}Handlebars helpers registered (ctor)`);
  }
  registerHelpers() {
    const e = Ar(), t = {
      // Foundry utils
      getProperty: foundry.utils.getProperty,
      // DND5E-inspired utilities
      "mwd-dataset": yr,
      "mwd-object": br,
      // Simple comparisons
      eq: (s, a) => s === a,
      ne: (s, a) => s !== a,
      // Strings/arrays
      concat: (...s) => L.join(s.slice(0, -1)),
      join: (s, a = " ") => Array.isArray(s) ? s.join(a) : "",
      includes: (s, a) => s == null ? void 0 : s.includes(a),
      length: (s) => (s == null ? void 0 : s.length) || 0,
      substring: (s, a, i) => s == null ? void 0 : s.substring(a, i),
      toUpperCase: Ii.toUpperCaseNoAccent,
      // Math
      modulo: (s, a) => s % a,
      divint: L.divint,
      divup: L.divup,
      sum: (s, a) => s + a,
      diff: (s, a) => s - a,
      times: (s, a) => s * a,
      min: (s, a) => Math.min(s, a),
      max: (s, a) => Math.max(s, a),
      // Utility blocks
      for: la.hbsForLoop,
      // fixes “Missing helper: for”
      range: (s, a) => Array.from({ length: a - s + 1 }, (i, n) => s + n),
      ifGte: (s, a, i) => s >= a ? i.fn(this) : i.inverse(this),
      // Damage / weapons (legacy-compatible)
      weaponDamageLetter: Ni.letter,
      weaponDamageCode: At.damageCode,
      weaponDamageValue: At.damageValue,
      weaponArmorMode: At.armorMode,
      weaponRangeList: At.getRangeList,
      // Icons
      iconFA: D.fontAwesome,
      iconSrc: D.iconSystemPath,
      iconPath: D.iconPath,
      iconD6: D.iconD6,
      // Enums
      localizeAttribute: G.localizeAttribute
    };
    e.registerHelper(t), e !== Handlebars && Handlebars.registerHelper(t);
  }
  static hbsForLoop(e, t, s) {
    let a = "";
    for (let i = e; i < t; ++i) a += s.fn(i);
    return a;
  }
}
const wa = "sheetTheme", Us = "mwd-theme-default", Tr = "mwd-theme-sra", wr = [
  { name: "Default (CSB)", cssClass: Us },
  { name: "SRA", cssClass: Tr }
];
class Sr {
  constructor() {
    this.availableStyles = {}, pt.register(te.REGISTER_STYLES), Hooks.once(te.REGISTER_STYLES, (e) => wr.forEach((t) => e(t.cssClass, t.name))), Hooks.once("ready", () => this.onReady());
  }
  async onReady() {
    Hooks.callAll(te.REGISTER_STYLES, (e, t) => this.availableStyles[e] = t), console.log(z + "Loaded styles", this.availableStyles), game.settings.register(A, wa, {
      scope: "world",
      name: "Sheet Theme",
      hint: "Select the visual theme used by MWD sheets.",
      config: !0,
      default: Us,
      choices: this.availableStyles,
      type: String,
      onChange: () => {
        setTimeout(() => {
          var e, t;
          for (const s of Object.values(ui.windows ?? {})) {
            if (typeof (s == null ? void 0 : s.render) != "function") continue;
            const a = s.element instanceof HTMLElement ? s.element : (e = s.element) == null ? void 0 : e[0];
            (t = a == null ? void 0 : a.classList) != null && t.contains("actor-sheet-v2") && s.render(!1);
          }
        }, 0);
      }
    });
  }
  selectCssClass() {
    const e = game.settings.get(A, wa);
    return this.availableStyles[e] ? e : Us;
  }
}
const kr = /* @__PURE__ */ new Set(["overloaded"]);
function Sa(r) {
  return r ? (r == null ? void 0 : r.document) ?? r : null;
}
function Mr(r, e) {
  var s, a, i;
  if (!r) return null;
  const t = Sa(e) ?? Sa(r == null ? void 0 : r.token);
  return t ? t.isLinked ? t.baseActor ?? ((i = (s = game.actors) == null ? void 0 : s.get) == null ? void 0 : i.call(s, ((a = t == null ? void 0 : t.baseActor) == null ? void 0 : a.id) ?? "")) ?? t.actor ?? r : t.actor ?? r : r;
}
function ei(r) {
  const e = String(r ?? "").trim();
  if (!e) return "Status";
  const a = (e.includes(".") ? e.split(".").at(-1) : e).replace(/^status/i, "").replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim();
  return a ? a.replace(/\b\w/g, (i) => i.toUpperCase()) : e;
}
function vr(r) {
  const e = String((r == null ? void 0 : r.name) ?? (r == null ? void 0 : r.label) ?? (r == null ? void 0 : r.id) ?? "Status").trim();
  return e ? ei(e) : "Status";
}
function Cr(r) {
  const e = typeof (r == null ? void 0 : r.img) == "string" ? r.img.trim() : "";
  if (e) return e;
  const t = r ? Object.getOwnPropertyDescriptor(r, "icon") : null;
  return "value" in (t ?? {}) ? String(t.value ?? "").trim() : "";
}
function ms(r, e) {
  var t, s, a, i, n, l;
  return e === "overloaded" ? !!((s = (t = r == null ? void 0 : r.system) == null ? void 0 : t.burn) != null && s.overloaded) || !!((i = (a = r == null ? void 0 : r.statuses) == null ? void 0 : a.has) != null && i.call(a, e)) : ((l = (n = r == null ? void 0 : r.statuses) == null ? void 0 : n.has) == null ? void 0 : l.call(n, e)) ?? !1;
}
function ca(r) {
  const e = /* @__PURE__ */ new Set();
  return (CONFIG.statusEffects ?? []).filter((t) => {
    const s = String((t == null ? void 0 : t.id) ?? "").trim();
    return !s || e.has(s) ? !1 : (e.add(s), !0);
  }).map((t) => {
    const s = String(t.id).trim();
    return {
      id: s,
      label: vr(t),
      icon: Cr(t),
      active: ms(r, s),
      managed: kr.has(s)
    };
  }).sort((t, s) => t.active !== s.active ? t.active ? -1 : 1 : t.label.localeCompare(s.label));
}
function Er(r) {
  if (!r.length)
    return "<p>No token statuses are configured.</p>";
  const e = foundry.utils.escapeHTML;
  return `
    <div class="mwd-token-status-dialog">
      <p style="margin-top: 0;">Toggle the statuses shown on this token.</p>
      <div style="display: grid; gap: 0.2rem; max-height: 20rem; overflow-y: auto; padding-right: 0.25rem;">
        ${r.map((s) => {
    const a = s.active ? "checked" : "", i = s.icon ? `<img src="${e(s.icon)}" alt="" width="20" height="20" style="flex: 0 0 20px; border: 0;" />` : "", n = s.managed ? '<small style="opacity: 0.7;">Managed by system state</small>' : "";
    return `
      <label style="display: flex; align-items: center; gap: 0.5rem; padding: 0.2rem 0;">
        <input type="checkbox" name="status" value="${e(s.id)}" ${a} />
        ${i}
        <span style="flex: 1 1 auto;">${e(s.label)}</span>
        ${n}
      </label>
    `;
  }).join("")}
      </div>
    </div>
  `;
}
async function Pr({ actor: r, effects: e, selectedStatusIds: t }) {
  const s = new Set(t);
  for (const a of e) {
    const i = s.has(a.id);
    await ti({ actor: r, statusId: a.id, active: i });
  }
}
async function ti({ actor: r, statusId: e, active: t }) {
  if (!r || !e) return !1;
  const s = ms(r, e);
  return !!t === s ? !1 : e === "overloaded" ? (await r.update({ "system.burn.overloaded": !!t }), !0) : (await r.toggleStatusEffect(e, { active: !!t, overlay: !1 }), !0);
}
async function Rr({ actor: r, token: e } = {}) {
  var a;
  if (!r || !e) return !1;
  const t = Mr(r, e), s = ca(t);
  return s.length ? foundry.applications.api.DialogV2.wait({
    window: {
      title: `Token Statuses: ${e.name ?? r.name ?? "Token"}`
    },
    position: {
      width: 420
    },
    content: Er(s),
    buttons: [
      {
        action: "apply",
        label: "Apply",
        icon: "fa-solid fa-check",
        default: !0,
        callback: async (i, n) => {
          var l, o;
          try {
            const c = Array.from(
              ((l = n.form) == null ? void 0 : l.querySelectorAll('input[name="status"]:checked')) ?? []
            ).map((u) => u.value);
            return await Pr({ actor: t, effects: s, selectedStatusIds: c }), !0;
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
  }) : ((a = ui.notifications) == null || a.warn("No token statuses are configured."), !1);
}
const It = "mwd", xt = "personalCombat", Vs = 3, Dr = 1, Or = 1;
function ka(r, e) {
  return !(r != null && r.activation) || !e ? !1 : r.activation.combatId === e.combatId && Number(r.activation.round ?? -1) === Number(e.round ?? -1) && Number(r.activation.turn ?? -1) === Number(e.turn ?? -1) && r.activation.combatantId === e.combatantId;
}
function qs(r = null) {
  return {
    saRemaining: Vs,
    faRemaining: Dr,
    raRemaining: Or,
    saSpentThisActivation: 0,
    burnThisActivation: 0,
    attacksThisActivation: 0,
    actionLog: [],
    activation: r
  };
}
function Ma(r, e = null) {
  return foundry.utils.mergeObject(
    qs(e),
    foundry.utils.deepClone(r ?? {}),
    { inplace: !1, overwrite: !0 }
  );
}
function vs(r) {
  return Array.isArray(r) ? r.map((e) => {
    const t = String((e == null ? void 0 : e.label) ?? "").trim();
    return t ? {
      id: String((e == null ? void 0 : e.id) ?? "").trim(),
      label: t,
      costLabel: String((e == null ? void 0 : e.costLabel) ?? "").trim()
    } : null;
  }).filter(Boolean) : [];
}
function Nr(r) {
  const e = (CONFIG.statusEffects ?? []).find((s) => String((s == null ? void 0 : s.id) ?? "").trim() === r), t = String((e == null ? void 0 : e.name) ?? (e == null ? void 0 : e.label) ?? r ?? "").trim();
  return ei(t);
}
class X {
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
    var s, a, i, n;
    const t = this._asTokenDocument(e);
    return ((s = t == null ? void 0 : t.parent) == null ? void 0 : s.id) ?? ((a = t == null ? void 0 : t.scene) == null ? void 0 : a.id) ?? ((n = (i = t == null ? void 0 : t.object) == null ? void 0 : i.scene) == null ? void 0 : n.id) ?? null;
  }
  static _getSceneTokenDocumentById(e, t = ((s) => (s = canvas == null ? void 0 : canvas.scene) == null ? void 0 : s.id)()) {
    var n, l, o, c, u;
    const a = String(e ?? "").trim();
    if (!a || !t) return null;
    const i = ((n = canvas == null ? void 0 : canvas.scene) == null ? void 0 : n.id) === t ? canvas.scene : (o = (l = game.scenes) == null ? void 0 : l.get) == null ? void 0 : o.call(l, t);
    return ((u = (c = i == null ? void 0 : i.tokens) == null ? void 0 : c.get) == null ? void 0 : u.call(c, a)) ?? null;
  }
  static _collectActorIds(e, t = null) {
    var n, l;
    const s = /* @__PURE__ */ new Set(), a = (o) => {
      const c = String(o ?? "").trim();
      c && s.add(c);
    };
    a(e == null ? void 0 : e.id), a(e == null ? void 0 : e._id);
    const i = this._asTokenDocument(t) ?? this._asTokenDocument(e == null ? void 0 : e.token);
    return a((n = i == null ? void 0 : i.actor) == null ? void 0 : n.id), a((l = i == null ? void 0 : i.baseActor) == null ? void 0 : l.id), a(i == null ? void 0 : i.actorId), s;
  }
  static _tokenDocumentMatchesActor(e, t, s = null) {
    var n, l;
    const a = this._asTokenDocument(e);
    if (!a || !t) return !1;
    const i = s ?? this._collectActorIds(t, a);
    return [
      (n = a == null ? void 0 : a.actor) == null ? void 0 : n.id,
      (l = a == null ? void 0 : a.baseActor) == null ? void 0 : l.id,
      a == null ? void 0 : a.actorId
    ].some((o) => i.has(String(o ?? "").trim()));
  }
  static getPreferredTokenDocument(e) {
    var a, i;
    if (!e) return null;
    const t = this._asTokenDocument(e == null ? void 0 : e.token);
    return t || (((i = (((a = e.getActiveTokens) == null ? void 0 : a.call(e, !0, !0)) ?? [])[0]) == null ? void 0 : i.document) ?? null);
  }
  static getPreferredToken(e) {
    const t = this.getPreferredTokenDocument(e);
    return t ? t.object ?? this._getSceneTokenById(t.id) : null;
  }
  static getCurrentSceneTokenDocument(e, t = null) {
    var h, T, S, g;
    const s = (h = canvas == null ? void 0 : canvas.scene) == null ? void 0 : h.id, a = this._asTokenDocument(t);
    if (this._getTokenSceneId(a) === s) return a;
    const i = String((a == null ? void 0 : a.id) ?? (t == null ? void 0 : t.id) ?? "").trim();
    if (i) {
      const k = this._getSceneTokenDocumentById(i, s);
      if (k) return k;
    }
    const n = this.getPreferredTokenDocument(e);
    if (this._getTokenSceneId(n) === s) return n;
    const l = String((n == null ? void 0 : n.id) ?? "").trim();
    if (l) {
      const k = this._getSceneTokenDocumentById(l, s);
      if (k) return k;
    }
    const c = ((S = (((T = e == null ? void 0 : e.getActiveTokens) == null ? void 0 : T.call(e, !0, !0)) ?? []).find((k) => {
      var C, M;
      return ((M = (C = k == null ? void 0 : k.document) == null ? void 0 : C.parent) == null ? void 0 : M.id) === s;
    })) == null ? void 0 : S.document) ?? null;
    if (c) return c;
    const u = Array.from(((g = canvas == null ? void 0 : canvas.scene) == null ? void 0 : g.tokens) ?? []), m = this._collectActorIds(e, n), p = u.filter((k) => this._tokenDocumentMatchesActor(k, e, m));
    return p.find((k) => {
      var C, M, x;
      return ((C = k == null ? void 0 : k.combatant) == null ? void 0 : C.id) === ((x = (M = game.combat) == null ? void 0 : M.combatant) == null ? void 0 : x.id);
    }) ?? null ?? p[0] ?? null;
  }
  static getCurrentSceneToken(e, t = null) {
    const s = this.getCurrentSceneTokenDocument(e, t);
    return s ? s.object ?? this._getSceneTokenById(s.id) : null;
  }
  static _getSceneTokenById(e) {
    var t, s, a, i;
    return e ? ((s = (t = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : t.get) == null ? void 0 : s.call(t, e)) ?? ((i = (a = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : a.placeables) == null ? void 0 : i.find((n) => n.id === e)) ?? null : null;
  }
  static getCombat(e, t = null) {
    var p, y, h, T;
    const s = (p = canvas == null ? void 0 : canvas.scene) == null ? void 0 : p.id, a = game.combat, i = this.getCurrentSceneTokenDocument(e, t), n = (i == null ? void 0 : i.object) ?? this._getSceneTokenById((i == null ? void 0 : i.id) ?? null);
    if (!a || ((y = a.scene) == null ? void 0 : y.id) !== s)
      return {
        combat: null,
        combatant: null,
        token: n,
        tokenDocument: i
      };
    let l = ((T = (h = i == null ? void 0 : i.combatant) == null ? void 0 : h.combat) == null ? void 0 : T.id) === a.id ? i.combatant : null;
    const o = Array.from(a.combatants ?? []);
    if (!l) {
      const S = this._collectActorIds(e, i), g = o.filter((M) => {
        const x = String((M == null ? void 0 : M.tokenId) ?? "").trim();
        if (i && x === String(i.id ?? "").trim() || S.has(String((M == null ? void 0 : M.actorId) ?? "").trim())) return !0;
        const U = this._asTokenDocument(M == null ? void 0 : M.token) ?? this._getSceneTokenDocumentById(x, s);
        return this._tokenDocumentMatchesActor(U, e, S);
      }), k = g.find((M) => {
        var x;
        return M.id === ((x = a == null ? void 0 : a.combatant) == null ? void 0 : x.id);
      }) ?? null, C = g.find(
        (M) => i && String((M == null ? void 0 : M.tokenId) ?? "").trim() === String(i.id ?? "").trim()
      ) ?? null;
      l = k ?? C ?? g[0] ?? null;
    }
    !l && o.length === 1 && (n || e) && (l = o[0]);
    const c = this._asTokenDocument(l == null ? void 0 : l.token) ?? this._getSceneTokenDocumentById((l == null ? void 0 : l.tokenId) ?? null, s), u = i ?? c ?? null, m = n ?? (c == null ? void 0 : c.object) ?? this._getSceneTokenById((l == null ? void 0 : l.tokenId) ?? null) ?? null;
    return {
      combat: a,
      combatant: l,
      token: m,
      tokenDocument: u
    };
  }
  static getSnapshot(e, { token: t = null } = {}) {
    var S, g, k, C, M;
    const {
      combat: s,
      combatant: a,
      token: i,
      tokenDocument: n
    } = this.getCombat(e, t), l = !!a && ((S = s == null ? void 0 : s.combatant) == null ? void 0 : S.id) === a.id, o = a ? this.getActivationIdentity(s, a) : null, c = a ? a.getFlag(It, xt) : null, u = a && l && ka(c, o) ? Ma(c, o) : qs(o);
    u.actionLog = vs(u.actionLog);
    const m = Math.max(0, Number(((k = (g = e == null ? void 0 : e.system) == null ? void 0 : g.burn) == null ? void 0 : k.value) ?? 0)), p = Math.floor(m / 2), y = !!((M = (C = e == null ? void 0 : e.system) == null ? void 0 : C.burn) != null && M.overloaded), h = this.getActiveStatuses(e), T = a ? l ? "" : "Waiting for this combatant's activation." : "No combatant on the current scene.";
    return {
      token: i,
      tokenDocument: n,
      combat: s,
      combatant: a,
      hasCombatant: !!a,
      isCurrentTurn: l,
      overloaded: y,
      burn: {
        value: m,
        penalty: p,
        canOverloadCheck: m >= 6 && !y
      },
      state: u,
      statuses: h,
      summaryText: `SA: ${u.saRemaining} / ${Vs}   FA: ${u.faRemaining}   RA: ${u.raRemaining}`,
      inactiveReason: T,
      modifierSummary: this.getModifierSummary(e, p)
    };
  }
  static getModifierSummary(e, t = Math.floor(Number(((a) => (a = ((s) => (s = e == null ? void 0 : e.system) == null ? void 0 : s.burn)()) == null ? void 0 : a.value)() ?? 0) / 2)) {
    var c, u;
    const i = ((u = (c = e == null ? void 0 : e.system) == null ? void 0 : c.derived) == null ? void 0 : u.condition) ?? {}, n = [];
    n.push({
      label: "Burn Penalty",
      value: t > 0 ? `-${t}` : "0"
    });
    const l = Number(i.fatiguePenalty ?? 0);
    l && n.push({ label: "Fatigue", value: `${l}` });
    const o = Number(i.physicalPenalty ?? 0);
    return o && n.push({ label: "Physical", value: `${o}` }), n.length || n.push({ label: "Modifiers", value: "0" }), n;
  }
  static getActiveStatuses(e) {
    return Array.from((e == null ? void 0 : e.statuses) ?? []).map((s) => ({
      id: s,
      label: Nr(s)
    })).sort((s, a) => s.label.localeCompare(a.label));
  }
  static buildActionModel(e, t) {
    var y;
    const s = t.hasCombatant ? "" : "No current-scene combatant.", a = t.isCurrentTurn ? "" : "Only during your activation.", i = t.overloaded ? "Overloaded: only Burn recovery is allowed." : "", n = s || a || i, l = [
      { id: "move", label: "Move", resource: "sa", cost: 1, supported: !0 },
      { id: "aim", label: "Aim", resource: "sa", cost: 1, supported: !0 },
      { id: "reload", label: "Reload", resource: "sa", cost: 1, supported: !0 },
      { id: "assist", label: "Assist", resource: "sa", cost: 1, supported: !0 },
      { id: "stand", label: "Stand", resource: "sa", cost: 1, supported: !0 }
    ].map((h) => this._buildSpendAction(t, h, n)), o = s || a || i || (t.state.saRemaining < 2 ? "Need 2 SA remaining." : ""), c = [
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
    ].map((h) => h.handler ? h : this._buildStubAction(h)), u = s || a || (t.state.saRemaining <= 0 ? "No SA remaining." : "") || (t.burn.value <= 0 ? "Burn is already at 0." : ""), m = s || a || (t.burn.canOverloadCheck ? "" : t.overloaded ? "Already Overloaded." : "Burn below 6."), p = s || a;
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
        { label: "SA", value: `${t.state.saRemaining}/${Vs}` },
        { label: "FA", value: `${t.state.faRemaining}` },
        { label: "RA", value: `${t.state.raRemaining}` }
      ],
      activationLog: vs((y = t.state) == null ? void 0 : y.actionLog).map((h, T) => ({
        ...h,
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
  static _buildSpendAction(e, t, s = "") {
    var o;
    const i = Number(((o = e.state) == null ? void 0 : o[`${t.resource}Remaining`]) ?? 0) < t.cost ? `No ${String(t.resource).toUpperCase()} remaining.` : "", n = s || i, l = this._formatCostLabel(t.resource, t.cost);
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
  static _appendActionLog(e, { id: t = "", label: s = "", costLabel: a = "" } = {}) {
    const i = String(s ?? "").trim();
    if (!i) return;
    const n = vs(e == null ? void 0 : e.actionLog);
    n.push({
      id: String(t ?? "").trim(),
      label: i,
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
    var i, n;
    if (!game.user.isGM) return;
    const e = game.combat, t = e == null ? void 0 : e.combatant;
    if (!e || !t || ((i = e.scene) == null ? void 0 : i.id) !== ((n = canvas == null ? void 0 : canvas.scene) == null ? void 0 : n.id)) return;
    const s = this.getActivationIdentity(e, t), a = t.getFlag(It, xt);
    ka(a, s) || await t.setFlag(It, xt, qs(s));
  }
  static async spendResource(e, {
    token: t = null,
    resource: s = "sa",
    cost: a = 1,
    actionId: i = "",
    actionLabel: n = "",
    actionCostLabel: l = ""
  } = {}) {
    var p;
    const o = this.getSnapshot(e, { token: t });
    if (!o.hasCombatant)
      return { ok: !1, reason: "No combatant on the current scene." };
    if (!o.isCurrentTurn)
      return { ok: !1, reason: "Only available during your activation." };
    const c = `${s}Remaining`, u = Number(((p = o.state) == null ? void 0 : p[c]) ?? 0);
    if (u < a)
      return { ok: !1, reason: `No ${String(s).toUpperCase()} remaining.` };
    const m = Ma(o.state, this.getActivationIdentity(o.combat, o.combatant));
    return m[c] = Math.max(0, u - a), s === "sa" && (m.saSpentThisActivation = Number(m.saSpentThisActivation ?? 0) + a, i === "attack" && (m.attacksThisActivation = Number(m.attacksThisActivation ?? 0) + 1)), this._appendActionLog(m, {
      id: i,
      label: n,
      costLabel: l || this._formatCostLabel(s, a)
    }), await o.combatant.setFlag(It, xt, m), { ok: !0, snapshot: this.getSnapshot(e, { token: o.token }) };
  }
  static async reduceBurn(e, { token: t = null } = {}) {
    var l, o, c, u;
    const s = this.getSnapshot(e, { token: t });
    if (!s.hasCombatant) return { ok: !1, reason: "No combatant on the current scene." };
    if (!s.isCurrentTurn) return { ok: !1, reason: "Only available during your activation." };
    if (s.state.saRemaining <= 0) return { ok: !1, reason: "No SA remaining." };
    if (s.burn.value <= 0) return { ok: !1, reason: "Burn is already at 0." };
    const a = await this.spendResource(e, {
      token: s.token,
      resource: "sa",
      cost: 1,
      actionId: "reduceBurn",
      actionLabel: "Reduce Burn",
      actionCostLabel: "1 SA"
    });
    if (!a.ok) return a;
    const i = Math.max(0, Number(((o = (l = e.system) == null ? void 0 : l.burn) == null ? void 0 : o.value) ?? 0) - 1), n = { "system.burn.value": i };
    return i === 0 && ((u = (c = e.system) == null ? void 0 : c.burn) != null && u.overloaded) && (n["system.burn.overloaded"] = !1), await e.update(n), { ok: !0, snapshot: this.getSnapshot(e, { token: s.token }) };
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
    foundry.utils.hasProperty(t, `flags.${It}.${xt}`) && this.renderOpenCharacterSheets((s = e == null ? void 0 : e.actor) == null ? void 0 : s.id);
  }
  static renderOpenCharacterSheets(e = null) {
    var s;
    const t = Object.values(ui.windows ?? {}).filter((a) => {
      var i;
      return ((i = a == null ? void 0 : a.actor) == null ? void 0 : i.type) === "character";
    });
    for (const a of t)
      e && ((s = a.actor) == null ? void 0 : s.id) !== e || a.render(!1);
  }
}
function Ft(r) {
  return r ? (r == null ? void 0 : r.document) ?? r : null;
}
function Cs(r, e) {
  var s, a, i;
  if (!r) return null;
  const t = Ft(e) ?? Ft(r == null ? void 0 : r.token);
  return t ? t.isLinked ? t.baseActor ?? ((i = (s = game.actors) == null ? void 0 : s.get) == null ? void 0 : i.call(s, ((a = t == null ? void 0 : t.baseActor) == null ? void 0 : a.id) ?? "")) ?? t.actor ?? r : t.actor ?? r : r;
}
function va(r) {
  const e = Number(r ?? 0);
  return Number.isFinite(e) ? Math.trunc(e) : 0;
}
function ss(r, e) {
  var t, s, a;
  return Math.max(0, Number(((a = (s = (t = r == null ? void 0 : r.system) == null ? void 0 : t.monitors) == null ? void 0 : s[e]) == null ? void 0 : a.value) ?? 0) || 0);
}
function Ca(r) {
  var e, t;
  return Math.max(0, Number(((t = (e = r == null ? void 0 : r.system) == null ? void 0 : e.burn) == null ? void 0 : t.value) ?? 0) || 0);
}
function $t(r) {
  return r === d.monitors.physical ? "Physical" : r === d.monitors.fatigue ? "Fatigue" : String(r ?? "").trim() || "Track";
}
function Ir(r, e) {
  var t;
  return ((t = ca(e).find((s) => s.id === r)) == null ? void 0 : t.label) ?? r;
}
function xr(r) {
  const e = foundry.utils.escapeHTML, t = [];
  if (r.mode === "attackDamage" || r.mode === "trackDelta") {
    const s = r.appliedDelta >= 0 ? "Applied" : "Recovered", a = Math.abs(Number(r.appliedDelta ?? 0)), i = a === 1 ? "point" : "points", n = r.usedArmor ? ` via armor-aware ${e(at(r.damageType))}` : "";
    t.push(`<div><b>${s}:</b> ${a} ${i} to ${e($t(r.track))}${n}</div>`), r.usedArmor && r.mitigation && (t.push(
      `<div><b>Mitigation:</b> base ${Number(r.mitigation.baseMitigation ?? 0)} + type ${Number(r.mitigation.typeMitigationMod ?? 0)} - AP ${Number(r.effectiveAp ?? 0)} = ${Number(r.mitigation.netResistance ?? 0)}</div>`
    ), Number(r.mitigation.reinforcedMax ?? 0) > 0 && t.push(
      `<div><b>Reinforced:</b> ${Number(r.mitigation.reinforcedAfter ?? 0)}/${Number(r.mitigation.reinforcedMax ?? 0)}</div>`
    ));
  }
  if (r.mode === "burnDelta") {
    const s = r.appliedDelta >= 0 ? "Adjusted Burn +" : "Adjusted Burn -";
    t.push(`<div><b>${s}</b>${Math.abs(Number(r.appliedDelta ?? 0))}</div>`);
  }
  return r.mode === "status" && t.push(
    `<div><b>Status:</b> ${r.active ? "Applied" : "Removed"} ${e(r.statusLabel ?? r.statusId ?? "Status")}</div>`
  ), t.push(`<div><b>Target:</b> ${e(r.actorName ?? "Actor")}</div>`), r.beforeLabel && r.afterLabel && t.push(`<div><b>Result:</b> ${e(r.beforeLabel)} -> ${e(r.afterLabel)}</div>`), r.source && t.push(`<div><b>Source:</b> ${e(r.source)}</div>`), r.notes && t.push(`<div><b>Notes:</b> ${e(r.notes)}</div>`), `<div class="mwd-gm-notice"><b>GM Harm:</b>${t.join("")}</div>`;
}
function _r(r) {
  var t, s;
  const e = (s = (t = game.settings) == null ? void 0 : t.get) == null ? void 0 : s.call(t, "core", "rollMode");
  return typeof ChatMessage.applyRollMode == "function" && ChatMessage.applyRollMode(r, e), r;
}
class Ge {
  static supportsActor(e) {
    return (e == null ? void 0 : e.type) === d.actorTypes.character;
  }
  static getActorOptions() {
    return Array.from(game.actors ?? []).filter((e) => this.supportsActor(e)).sort((e, t) => String(e.name ?? "").localeCompare(String(t.name ?? ""))).map((e) => ({
      id: e.id,
      name: e.name || "Character"
    }));
  }
  static getStatusOptions(e = null) {
    return ca(e).map((t) => ({
      value: t.id,
      label: t.label,
      active: t.active
    }));
  }
  static getSceneTarget() {
    var s, a;
    const e = Array.from(((s = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : s.controlled) ?? []);
    if (e.length > 1)
      return { actor: null, token: null, reason: "Select only one controlled token." };
    if (e.length === 1) {
      const i = Ft(e[0]), n = Cs((i == null ? void 0 : i.actor) ?? null, i);
      return this._resolveSceneTargetResult(n, i);
    }
    const t = Array.from(((a = game.user) == null ? void 0 : a.targets) ?? []);
    if (t.length > 1)
      return { actor: null, token: null, reason: "Target only one token." };
    if (t.length === 1) {
      const i = Ft(t[0]), n = Cs((i == null ? void 0 : i.actor) ?? null, i);
      return this._resolveSceneTargetResult(n, i);
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
  static resolveTarget({ actor: e = null, token: t = null, actorId: s = "", preferSceneTarget: a = !1 } = {}) {
    var l, o;
    const i = Ft(t);
    if (i) {
      const c = Cs((i == null ? void 0 : i.actor) ?? e, i), u = this._resolveSceneTargetResult(c, i);
      if (u.actor) return { ...u, source: "token" };
    }
    if (a) {
      const c = this.getSceneTarget();
      if (c.actor) return { ...c, source: "scene" };
    }
    if (e && this.supportsActor(e))
      return { actor: e, token: i, reason: "", source: "actor" };
    const n = s ? ((o = (l = game.actors) == null ? void 0 : l.get) == null ? void 0 : o.call(l, s)) ?? null : null;
    return n && this.supportsActor(n) ? { actor: n, token: null, reason: "", source: "fallback" } : {
      actor: null,
      token: i,
      source: null,
      reason: a && this.getSceneTarget().reason || "Choose a supported character target."
    };
  }
  static async apply({ actor: e = null, token: t = null, payload: s = {}, options: a = {} } = {}) {
    var o;
    const i = this.resolveTarget({
      actor: e,
      token: t,
      actorId: a.actorId ?? "",
      preferSceneTarget: !!a.preferSceneTarget
    });
    if (!i.actor)
      return { ok: !1, reason: i.reason || "Choose a supported character target." };
    let n;
    switch (String((s == null ? void 0 : s.mode) ?? "").trim()) {
      case "attackDamage":
        n = await this._applyAttackDamage(i.actor, s);
        break;
      case "trackDelta":
        n = await this._applyTrackDelta(i.actor, s);
        break;
      case "burnDelta":
        n = await this._applyBurnDelta(i.actor, s);
        break;
      case "status":
        n = await this._applyStatus(i.actor, s);
        break;
      default:
        return { ok: !1, reason: "Unsupported harm mode." };
    }
    const l = {
      ok: !0,
      actor: i.actor,
      token: i.token,
      actorName: i.actor.name || "Character",
      sourceType: i.source,
      ...n
    };
    if (a.logToChat) {
      const c = xr(l), u = _r({
        speaker: ChatMessage.getSpeaker({ actor: i.actor, token: i.token }),
        content: c
      });
      await ChatMessage.create(u);
    }
    return (o = X.renderOpenCharacterSheets) == null || o.call(X, i.actor.id), l;
  }
  static async _applyTrackDelta(e, t) {
    const s = (t == null ? void 0 : t.track) === d.monitors.fatigue ? d.monitors.fatigue : d.monitors.physical, a = va((t == null ? void 0 : t.delta) ?? (t == null ? void 0 : t.amount) ?? 0);
    if (!!(t != null && t.useArmor) && a > 0)
      return this._applyPersonalArmorAwareDamage(e, {
        mode: "trackDelta",
        track: s,
        damage: a,
        damageType: t == null ? void 0 : t.damageType,
        ap: (t == null ? void 0 : t.ap) ?? 0,
        effects: (t == null ? void 0 : t.effects) ?? {},
        source: t == null ? void 0 : t.source,
        notes: t == null ? void 0 : t.notes
      });
    const n = ss(e, s);
    await E.addCounter(e, s, a);
    const l = ss(e, s);
    return {
      mode: "trackDelta",
      track: s,
      requestedDelta: a,
      appliedDelta: l - n,
      usedArmor: !1,
      beforeLabel: `${$t(s)} ${n}`,
      afterLabel: `${$t(s)} ${l}`,
      source: String((t == null ? void 0 : t.source) ?? "").trim(),
      notes: String((t == null ? void 0 : t.notes) ?? "").trim()
    };
  }
  static async _applyBurnDelta(e, t) {
    var o, c;
    const s = va((t == null ? void 0 : t.delta) ?? (t == null ? void 0 : t.amount) ?? 0), a = Ca(e), i = Math.max(0, a + s), n = { "system.burn.value": i };
    i === 0 && ((c = (o = e.system) == null ? void 0 : o.burn) != null && c.overloaded) && (n["system.burn.overloaded"] = !1), await e.update(n);
    const l = Ca(e);
    return {
      mode: "burnDelta",
      requestedDelta: s,
      appliedDelta: l - a,
      beforeLabel: `Burn ${a}`,
      afterLabel: `Burn ${l}`,
      source: String((t == null ? void 0 : t.source) ?? "").trim(),
      notes: String((t == null ? void 0 : t.notes) ?? "").trim()
    };
  }
  static async _applyStatus(e, t) {
    const s = String((t == null ? void 0 : t.statusId) ?? (t == null ? void 0 : t.status) ?? "").trim();
    if (!s)
      return { mode: "status", statusId: "", active: !1, statusLabel: "Status", beforeLabel: "", afterLabel: "" };
    const a = ms(e, s), i = !!(t != null && t.active);
    await ti({ actor: e, statusId: s, active: i });
    const n = ms(e, s);
    return {
      mode: "status",
      statusId: s,
      statusLabel: Ir(s, e),
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
      track: (t == null ? void 0 : t.track) ?? d.monitors.physical,
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
    var ie, ge, ue, ye, re, De, Oe, Me;
    const s = (t == null ? void 0 : t.track) === d.monitors.fatigue ? d.monitors.fatigue : d.monitors.physical, a = Math.max(0, Number((t == null ? void 0 : t.damage) ?? 0) || 0), i = Math.max(0, Number((t == null ? void 0 : t.netHits) ?? 0) || 0), n = (t == null ? void 0 : t.effects) ?? {}, l = ((ie = e.getPersonalCombatLoadout) == null ? void 0 : ie.call(e, { refresh: !0 })) ?? null, o = (l == null ? void 0 : l.activeArmor) ?? null, c = Math.max(0, Number((o == null ? void 0 : o.currentArmorRating) ?? ((ge = o == null ? void 0 : o.durability) == null ? void 0 : ge.current) ?? 0) || 0), u = Xe(t == null ? void 0 : t.damageType, "concussive"), m = ss(e, s);
    let p = a + i;
    const y = c > 0 ? Qi({
      damageIncoming: p,
      armorTags: (o == null ? void 0 : o.tags) ?? [],
      effects: n
    }) : { damageIncoming: p, applied: [] };
    p = y.damageIncoming;
    const h = Yi({
      currentArmorRating: c,
      mitigationByType: (o == null ? void 0 : o.mitigationByType) ?? {},
      damageType: u
    }), T = Math.max(
      0,
      (Number((t == null ? void 0 : t.ap) ?? 0) || 0) + (Number((n == null ? void 0 : n.ap) ?? 0) || 0)
    ), S = h.isDestroyed ? 0 : Math.max(0, h.baseMitigation + h.typeMitigationMod - T), g = Math.max(0, Math.ceil(p - S));
    g > 0 && await E.addCounter(e, s, g);
    const k = Math.max(0, Number(((ue = o == null ? void 0 : o.durability) == null ? void 0 : ue.current) ?? 0) || 0);
    let C = k;
    const M = Math.max(0, Number(((re = (ye = o == null ? void 0 : o.traitState) == null ? void 0 : ye.reinforced) == null ? void 0 : re.current) ?? 0) || 0), x = Math.max(0, Number(((Oe = (De = o == null ? void 0 : o.traitState) == null ? void 0 : De.reinforced) == null ? void 0 : Oe.max) ?? 0) || 0);
    let U = M;
    if (a + i > 0 && ((Me = o == null ? void 0 : o.item) != null && Me.id)) {
      const be = {};
      M > 0 ? (U = Math.max(0, M - 1), U !== M && (be["system.traitState.reinforced.current"] = U)) : (C = Math.max(0, k - 1), C !== k && (be["system.durability.current"] = C)), Object.keys(be).length > 0 && await o.item.update(be);
    }
    const W = ss(e, s);
    return {
      mode: (t == null ? void 0 : t.mode) ?? "attackDamage",
      track: s,
      requestedDelta: a + i,
      appliedDelta: W - m,
      usedArmor: !0,
      damageType: u,
      effectiveAp: T,
      mitigation: {
        ...h,
        netResistance: S,
        armorBefore: k,
        armorAfter: C,
        reinforcedBefore: M,
        reinforcedAfter: U,
        reinforcedMax: x
      },
      damageIncoming: p,
      adjustedIncoming: p,
      finalDamage: g,
      tagEffectResult: y,
      beforeLabel: `${$t(s)} ${m}`,
      afterLabel: `${$t(s)} ${W}`,
      source: String((t == null ? void 0 : t.source) ?? "").trim(),
      notes: String((t == null ? void 0 : t.notes) ?? "").trim()
    };
  }
}
v(Ge, "MODE_OPTIONS", Object.freeze([
  { value: d.monitors.physical, label: "Physical" },
  { value: d.monitors.fatigue, label: "Fatigue" },
  { value: "burn", label: "Burn" },
  { value: "status", label: "Status" }
]));
const Lr = cs, zs = "damage-mode", $r = `${A}.${zs}`, as = {}, Es = {};
class j {
  static init() {
    pt.register(te.PROVIDE_DAMAGE_MODE), Hooks.on("updateSetting", async (e, t, s, a) => j.onUpdateSetting(e, t, s, a)), Hooks.on(te.PROVIDE_DAMAGE_MODE, (e) => {
      e("resistanceArmorMonitor", f.settings.damageMode.values.resistanceArmorMonitor, j.sufferDamageResistanceArmorMonitor), e("armorResistanceMonitor", f.settings.damageMode.values.armorResistanceMonitor, j.sufferDamageArmorResistanceMonitor), e("armorGivesResistance", f.settings.damageMode.values.armorGivesResistance, j.sufferDamageArmorAsResistance_Earthdawn), e("armorGiveResistanceHitsAvoid", f.settings.damageMode.values.armorGiveResistanceHitsAvoid, j.sufferDamageArmorAsResistance_Cyberpunk);
    }), Hooks.once("ready", () => j.onReady());
  }
  static onReady() {
    j._registerDamageModeSetting(), j._selectDamageMode();
  }
  static _registerDamageModeSetting() {
    Hooks.callAll(te.PROVIDE_DAMAGE_MODE, (e, t, s) => {
      as[e] = t, Es[e] = s;
    }), game.settings.register(A, zs, {
      scope: "world",
      name: f.settings.damageMode.name,
      hint: f.settings.damageMode.hint,
      config: !0,
      default: Object.keys(as)[0],
      choices: as,
      type: String
    });
  }
  static async onUpdateSetting(e, t, s, a) {
    e.key == $r && j._selectDamageMode();
  }
  static _selectDamageMode() {
    let e = game.settings.get(A, zs);
    Es[e] || (e = Object.keys(as)[0]), j.damageModeCode = e, j.damageModeMethod = Es[e];
  }
  static async sufferDamage(e, t, s, a, i, n, l) {
    const { monitor: o, damageType: c } = j._resolveDamageContext(e, t, l);
    if (ft.checkActorCanReceiveDamage(c ?? o, o, e), j._shouldUsePersonalDamageV2(e, o, l)) {
      await j.sufferPersonalDamageV2(e, o, c, s, a, i, n, l);
      return;
    }
    await (j.damageModeMethod ?? j.sufferDamageResistanceArmorMonitor)(e, o, c, s, a, i, n), await e.applyArmorDamage(o, c, B.sumModifiers([l], "other", "damageArmor"));
  }
  static _shouldUsePersonalDamageV2(e, t, s) {
    var a, i;
    return !((a = e == null ? void 0 : e.isCharacterLike) != null && a.call(e)) || ![d.monitors.physical, d.monitors.fatigue].includes(t) ? !1 : !!((i = s == null ? void 0 : s.isPersonalWeapon) != null && i.call(s) || (s == null ? void 0 : s.canonicalType) === d.itemType.personalWeapon || (s == null ? void 0 : s.type) === d.itemType.personalWeapon);
  }
  static async sufferPersonalDamageV2(e, t, s, a, i, n, l, o) {
    var m;
    const c = ((m = o == null ? void 0 : o.getCombatProfile) == null ? void 0 : m.call(o)) ?? o ?? null, u = await Ge.apply({
      actor: e,
      payload: {
        mode: "attackDamage",
        track: t,
        damage: Number(a ?? (c == null ? void 0 : c.damage) ?? 0) || 0,
        netHits: Number(i ?? 0) || 0,
        damageType: s ?? (c == null ? void 0 : c.damageType),
        ap: Number((c == null ? void 0 : c.ap) ?? 0) || 0,
        effects: (c == null ? void 0 : c.effects) ?? {}
      },
      options: {
        logToChat: !1
      }
    });
    u != null && u.ok && j._notifyPersonalArmorMitigation(e, {
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
    const s = t.armorMitigation ?? {}, a = j._localizeDamageType(t.damageType), i = s.isDestroyed ? "Armor destroyed" : `Base ${Number(s.baseMitigation ?? 0)} + Type ${Number(s.typeMitigationMod ?? 0)} - AP ${Number(t.effectiveAp ?? 0)}`, n = Number(t.adjustedIncoming ?? t.baseIncoming ?? 0), l = Number(t.finalDamage ?? 0), o = (((u = t.tagEffectResult) == null ? void 0 : u.applied) ?? []).map((m) => `${m.tag} +${Math.round((Number(m.bonus ?? 0) || 0) * 100)}%`).join(", "), c = o ? ` [${o}]` : "";
    ui.notifications.info(
      `${e.name} mitigated ${a}: ${i}${c}. Incoming ${n}, final ${l}.`
    );
  }
  static async sufferDamageResistanceArmorMonitor(e, t, s, a, i, n, l) {
    const o = E.resistanceDetail(e, t, s), c = o.value;
    let u = 0;
    if (n) {
      const m = Math.min(c, a), p = Math.min(c - m, i);
      u = a - m, E.useArmor(t) && (u -= await j.damageToArmor(e, s, u)), u += i - p;
    } else
      u = a + i - c, E.useArmor(t) && (u -= await j.damageToArmor(e, s, u));
    u > 0 && await E.addCounter(e, t, u), j._notifyResistanceUsage(e, t, s, o);
  }
  static async sufferDamageArmorResistanceMonitor(e, t, s, a, i, n, l) {
    let o = 0;
    E.useArmor(t) ? n ? (a -= await j.damageToArmor(e, s, a), o = i + a) : (o = i + a, o -= await j.damageToArmor(e, s, o)) : o = a + i;
    const c = E.resistanceDetail(e, t, s);
    return o -= c.value, o > 0 && await E.addCounter(e, t, o), j._notifyResistanceUsage(e, t, s, c), o;
  }
  static async sufferDamageArmorAsResistance_Cyberpunk(e, t, s, a, i, n, l) {
    let o = a + i;
    if (E.useArmor(t) && o > 0) {
      const u = n ? i : 0, m = Math.max(0, j._computeArmorResistance(e) - u);
      m > 0 && (await E.addCounter(e, "armor", 1), o -= m);
    }
    const c = E.resistanceDetail(e, t, s);
    return o -= c.value, o > 0 && await E.addCounter(e, t, o), j._notifyResistanceUsage(e, t, s, c), Math.max(o, 0);
  }
  static async sufferDamageArmorAsResistance_Earthdawn(e, t, s, a, i, n, l) {
    let o = a + i;
    if (E.useArmor(t) && !n && o > 0) {
      const u = j._computeArmorResistance(e);
      u > 0 && (await E.addCounter(e, "armor", 1), o -= u);
    }
    o -= j._computeStrengthResistance(e, t);
    const c = E.resistanceDetail(e, t, s);
    return o -= c.value, o > 0 && await E.addCounter(e, t, o), j._notifyResistanceUsage(e, t, s, c), o;
  }
  static async damageToArmor(e, t, s) {
    if (s > 0) {
      const a = E.max(e, d.monitors.armor), i = E.getCounterValue(e, d.monitors.armor), n = Math.min(a - i, s), l = E.resistance(e, d.monitors.armor, t), o = Math.max(0, n - l);
      return o > 0 && await E.addCounter(e, d.monitors.armor, o), n;
    } else
      return 0;
  }
  static _resolveDamageContext(e, t, s) {
    var l;
    const a = (typeof t == "object" ? (t == null ? void 0 : t.damageType) ?? (t == null ? void 0 : t.type) : t) ?? ((l = s == null ? void 0 : s.system) == null ? void 0 : l.damageType), i = typeof t == "object" ? (t == null ? void 0 : t.monitor) ?? a : a;
    return { monitor: e.getDamageMonitor(i), damageType: a };
  }
  static _notifyResistanceUsage(e, t, s, a) {
    var u;
    if (!a || t === void 0)
      return;
    const i = f.actor.monitors[t] ?? t, n = j._localizeDamageType(s) ?? i, l = a.usedType ? "type" : "default", o = ((u = f.actor.monitors.resistanceSources) == null ? void 0 : u[l]) ?? l, c = K(f.actor.monitors.resistanceApplied, {
      actor: e.name,
      monitor: i,
      damageType: n,
      value: a.value,
      source: o
    });
    ui.notifications.info(c);
  }
  static _localizeDamageType(e) {
    if (e)
      return ja(e) ? at(e) : f.mwd.weaponDamageType[e] ?? f.mwd.personalDamageType[e] ?? f.actor.monitors[e] ?? e;
  }
  static _computeArmorResistance(e) {
    const t = E.max(e, "armor"), s = E.getCounterValue(e, "armor"), a = Math.max(0, t - s);
    return Math.max(0, Math.ceil(a / 3));
  }
  static _computeStrengthResistance(e, t) {
    const s = e.getAttributeValue(d.actorAttributes.strength);
    return Math.max(0, Math.floor(s / 4));
  }
}
class Ee extends Actor {
  static init() {
    Hooks.on("updateActor", (e, t, s, a) => {
      var i;
      return (i = We.firstResponsible(e)) == null ? void 0 : i.onUpdateActor(t, s);
    });
  }
  constructor(e, t = {}) {
    var s;
    if (!((s = t.anarchy) != null && s.ready)) {
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
    return t ? t.sort((s, a) => {
      const i = s.system.code === "knowledge" || s.system.attribute === "knowledge", n = a.system.code === "knowledge" || a.system.attribute === "knowledge";
      if (i && !n) return 1;
      if (!n && i) return -1;
      if (i && n)
        return s.name > a.name ? 1 : s.name > a.name ? -1 : 0;
      const l = e.getAttributeValue(s.system.attribute) + s.system.value, o = e.getAttributeValue(a.system.attribute) + a.system.value;
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
    return [d.actorTypes.vehicle, d.actorTypes.battlemech].includes(this.type);
  }
  prepareData() {
    super.prepareData(), this._prepareEdgePools(), this.cleanupFavorites();
  }
  prepareDerivedData() {
    if (this.system.modifiers = {
      initiative: B.sumModifiers(this.items, "other", "initiative")
    }, this.system.monitors) {
      const e = G.getDamageTypes();
      Object.entries(this.system.monitors).forEach((t) => {
        t[1].resistance = Ee.normalizeResistance(t[1].resistance), t[1].maxBonus = B.sumMonitorModifiers(this.items, t[0], "max"), t[1].resistanceBonus = B.sumMonitorModifiers(this.items, t[0], "resistance"), t[1].resistanceBonusByType = Object.fromEntries(
          e.map((s) => [s.value, B.sumMonitorModifiers(this.items, t[0], "resistanceByType", s.value)]).filter(([, s]) => s)
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
    return kt[this.type] ?? [];
  }
  getPhysicalAgility() {
  }
  getCorrespondingAttribute(e) {
    if (this.getAttributes().includes(e))
      return e;
  }
  async onUpdateActor(e, t) {
    var s, a;
    ((s = e.system) == null ? void 0 : s.monitors) != null && ((a = e.system) == null ? void 0 : a.state) == null && this.update({ "system.state": this.computeState() });
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
    const e = this.getAttributeValue(d.actorAttributes.edge), t = foundry.utils.getProperty(this.system, "counters.edgePools") ?? {};
    Object.values(d.counters.edgePools).forEach((a) => {
      const i = t[a] ?? {}, n = i.value;
      i.value = n ?? e ?? 0, i.value = Math.min(i.value, e ?? i.value ?? 0), i.max = e ?? i.max ?? 0, t[a] = i;
    }), foundry.utils.setProperty(this.system, "counters.edgePools", t);
  }
  async setCheckbarValue(e, t) {
    return await this.update({ [e]: t });
  }
  _getMonitorMax(e) {
    const t = this.getAttributeValue(e);
    return t == 0 ? 0 : $a + L.divup(t, 2);
  }
  getAttributeActions() {
    return J.getActorActions(this);
  }
  getUsableAttributes(e = void 0) {
    const t = (e ? [e] : this.items).map((a) => a.getUsableAttributes()).reduce((a, i) => a.concat(i), []), s = L.distinct(this.getAttributes().concat(t));
    return s.sort(L.ascendingBySortedArray(G.sortedAttributeKeys)), s;
  }
  getAttributeValue(e, t = void 0) {
    let s = 0;
    if (e = this.getCorrespondingAttribute(e), e) {
      if (this.getAttributes().includes(e))
        s = this.system.attributes[e].value;
      else if (t)
        s = (t == null ? void 0 : t.getAttributeValue(e)) ?? 0;
      else {
        const a = this.items.filter((i) => i.isActive() && i.getAttributes().includes(e));
        if (a.length > 0) {
          const i = a.map((n) => n.getAttributeValue(e) ?? 0);
          s = Math.max(...i);
        }
      }
      s += B.sumModifiers(this.items, "attribute", e);
    }
    return s;
  }
  resolveDamageType(e) {
    switch (e) {
      case "stun":
        return d.monitors.fatigue;
    }
    return e;
  }
  getDamageMonitor(e) {
    e = this.resolveDamageType(e);
  }
  async applyArmorDamage(e, t, s = 0) {
    switch (e = this.resolveDamageType(e), e) {
      case d.monitors.physical:
      case d.monitors.fatigue:
        await j.damageToArmor(this, t, s);
    }
  }
  async rollAttribute(e) {
    await Fe.rollAttribute(this, e);
  }
  async rollAttributeAction(e) {
    const t = J.getActorAction(this, e);
    await Fe.rollAttributeAction(this, t);
  }
  async rollSkill(e, t) {
    await Fe.rollSkill(this, e, t);
  }
  async rollWeapon(e) {
    var i, n, l;
    ft.checkWeaponDefense(e, this);
    const t = (i = e.validateTargets(this)) == null ? void 0 : i.map((o) => o.id), s = {
      attackerTokenId: (l = (n = game.scenes.current) == null ? void 0 : n.tokens.find((o) => {
        var c;
        return ((c = o.actor) == null ? void 0 : c.id) == this.id;
      })) == null ? void 0 : l.id,
      targetedTokenIds: t
    }, a = this.items.find((o) => e.isWeaponSkill(o));
    await Fe.rollWeapon(this, a, e, s);
  }
  async rollDefense(e) {
    const t = e.attack.defense, s = J.getActorDefense(this, t);
    await Fe.rollDefense(this, s, e);
  }
  async switchMonitorCheck(e, t, s, a = void 0) {
    await E.switchMonitorCheck(this, e, t, s, a);
  }
  async addCounter(e, t, s = void 0) {
    await E.addCounter(this, e, t, s);
  }
  async setCounter(e, t, s = void 0) {
    await E.setCounter(this, e, t, s);
  }
  canSetMarks() {
    return !1;
  }
  getCyberdeck() {
  }
  canApplyDamage(e) {
    switch (e) {
      case d.monitors.physical:
      case d.monitors.fatigue:
        return this.getDamageMonitor(e) != null;
    }
    return !1;
  }
  canReceiveDamage(e) {
    return this.canApplyDamage(e);
  }
  async onEnterCombat() {
    const e = B.sumModifiers(this.items, "other", "sceneAnarchy");
    e > 0 && await E.setCounter(this, d.monitors.sceneAnarchy, e);
  }
  async onLeaveCombat() {
    await E.setCounter(this, d.monitors.sceneAnarchy, 0);
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
    var a, i;
    const e = this.hasGMAnarchy(), t = (i = (a = game.system) == null ? void 0 : a.anarchy) == null ? void 0 : i.gmAnarchy, s = e && t && typeof t.getAnarchy == "function" ? t.getAnarchy() : {
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
    await this.spendEdgePool(d.counters.social.credibility, e);
  }
  async spendRumor(e) {
    await this.spendEdgePool(d.counters.mental.rumor, e);
  }
  async spendAnarchy(e) {
    var t, s;
    if (e && !this.hasPlayerOwner) {
      const a = (s = (t = game.system) == null ? void 0 : t.anarchy) == null ? void 0 : s.gmAnarchy;
      a != null && a.npcConsumesAnarchy && await a.npcConsumesAnarchy(this, e);
      return;
    }
  }
  getEdgePools() {
    var e;
    return ((e = this.system.counters) == null ? void 0 : e.edgePools) ?? {};
  }
  getEdgePoolValue(e) {
    var i, n;
    const t = this.getAttributeValue(d.actorAttributes.edge), a = ((n = (i = this.getEdgePools()) == null ? void 0 : i[e]) == null ? void 0 : n.value) ?? t ?? 0;
    return Math.min(a, t ?? a ?? 0);
  }
  getRemainingEdge(e = void 0) {
    return e ? this.getEdgePoolValue(e) : Math.max(0, ...Object.values(d.counters.edgePools).map((t) => this.getEdgePoolValue(t)));
  }
  canUseEdge() {
    return this.getAttributes().includes(d.actorAttributes.edge);
  }
  async spendEdgePool(e, t) {
    t != 0 && await E.addCounter(this, e, -t);
  }
  async spendEdge(e, t = d.counters.edgePools.grit) {
    if (e != 0) {
      if (!this.canUseEdge()) {
        const s = f.actorType[this.type] ?? this.type, a = `${this.name} (${s}) cannot use Edge`;
        throw ui.notifications.warn(a), a;
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
    const a = this.getAttributeValue(s.system.attribute);
    return this.getSkillRating(s) + a + (t && s.system.specialization ? 2 : 0);
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
      const a = this.clone();
      s = (await Actor.createDocuments([a]))[0];
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
    return !!this.system.favorites.find((a) => Ee._isSameFavorite(s, a));
  }
  static _prepareFavorite(e, t) {
    return { type: e, id: t };
  }
  static _isSameFavorite(e, t) {
    return e.id == t.id && e.type == t.type;
  }
  async switchFavorite(e, t, s) {
    const a = Ee._prepareFavorite(t, s), i = this.system.favorites.filter((n) => !Ee._isSameFavorite(a, n));
    e && i.push(a), this.update({ "system.favorites": i });
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
    const s = Ee._prepareFavorite(e, t);
    if (e == "attributeAction") {
      const i = J.prepareShortcut(this, t);
      if (i)
        return foundry.utils.mergeObject(i, s);
    } else if (Object.values(d.itemType).includes(e)) {
      const i = (a = this.items.get(t)) == null ? void 0 : a.prepareShortcut();
      if (i)
        return foundry.utils.mergeObject(i, s);
    }
    return s;
  }
  async _onSetManualStepper(e, t) {
    var n, l;
    e == null || e.preventDefault();
    const s = (n = t == null ? void 0 : t.dataset) == null ? void 0 : n.id, a = Number((l = t == null ? void 0 : t.dataset) == null ? void 0 : l.value);
    if (!s || Number.isNaN(a)) return;
    const i = this._mwd.state.manual.find((o) => o.id === s);
    if (i)
      return i.value = a, this.render(!1);
  }
}
const { ApplicationV2: Wr, HandlebarsApplicationMixin: Hr } = foundry.applications.api, { renderTemplate: Ea } = foundry.applications.handlebars, Br = `${O}/chat/celebrity-roll.hbs`, Tt = class Tt extends Hr(Wr) {
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
        label: f.actor.counters.edgePools.legend,
        value: e.getCelebrityValue()
      },
      modifiers: foundry.utils.mergeObject(
        { label: f.item.tabs.modifiers },
        B.computeModifiers(e.items, "other", "celebrity")
      ),
      other: {
        label: f.common.roll.modifiers.other,
        value: 0
      },
      ANARCHY: f
    }, s = await Ea(`${O}/dialog/roll-celebrite-title.hbs`, t), a = {
      id: `roll-celebrity-${foundry.utils.randomID()}`,
      classes: [game.system.anarchy.styles.selectCssClass(), ...Tt.DEFAULT_OPTIONS.classes],
      window: { title: s }
    };
    return new Tt({ roll: t }, a).render({ force: !0 });
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
    s.find(".input-celebrity-other").on("input", (a) => {
      this.roll.other.value = Number.parseInt(a.currentTarget.value) ?? 0;
    }), s.find('[data-action="roll"]').on("click", async () => {
      await Tt.doRoll(this.roll), await this.close();
    }), s.find('[data-action="cancel"]').on("click", async () => {
      await this.close();
    });
  }
  static async doRoll(e) {
    const t = [
      e.celebrity,
      e.modifiers,
      e.other
    ], s = L.sumValues(t, (l) => l.value), a = {
      actor: e.actor,
      parameters: t,
      pool: s,
      options: {
        classes: [game.system.anarchy.styles.selectCssClass()]
      },
      ANARCHY: f
    }, i = new Roll(`${s}d6cs>=5`);
    await i.evaluate();
    const n = await Ea(Br, a);
    await i.toMessage({ flavor: n });
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
v(Tt, "PARTS", {
  body: {
    template: `${O}/dialog/roll-celebrite.hbs`
  }
});
let Ks = Tt;
const { renderTemplate: jr } = foundry.applications.handlebars, Fr = `${O}/chat/actor-say-word.hbs`;
class Pa extends Ee {
  static get initiative() {
    return Ee.initiative + " + max(@attributes.reflexes.value, @attributes.intelligence.value)";
  }
  hasOwnAnarchy() {
    return this.hasPlayerOwner;
  }
  prepareDerivedData() {
    !this.system.monitors.fatigue && this.system.monitors.stun && (this.system.monitors.fatigue = foundry.utils.duplicate(this.system.monitors.stun)), this.system.monitors.physical.max = this._getMonitorMax(d.actorAttributes.strength), this.system.monitors.fatigue.max = this._getMonitorMax(d.actorAttributes.willpower), super.prepareDerivedData(), this.system.ignoreWounds = B.sumModifiers(this.items, "other", "ignoreWounds");
  }
  computePhysicalState() {
    var o, c;
    const e = Math.max(0, Number(((o = this.system.monitors.armor) == null ? void 0 : o.max) ?? 0)), t = Math.min(
      e,
      Math.max(0, Number(((c = this.system.monitors.armor) == null ? void 0 : c.value) ?? 0))
    ), s = Math.max(0, e - t), a = Math.max(this.system.monitors.physical.max, this.system.monitors.fatigue.max) + e, i = this.system.monitors.physical.value == this.system.monitors.physical.max, n = this.system.monitors.fatigue.max == this.system.monitors.fatigue.value, l = i || n ? a : Math.max(this.system.monitors.physical.value, this.system.monitors.fatigue.value) + s;
    return {
      max: a,
      value: a - l
    };
  }
  getAttributes() {
    return kt[this.type] ?? kt[d.actorTypes.character];
  }
  getPhysicalAgility() {
    return d.actorAttributes.reflexes;
  }
  getCorrespondingAttribute(e) {
    return d.itemAttributes.firewall == e ? d.itemAttributes.firewall : super.getCorrespondingAttribute(e);
  }
  getDamageMonitor(e) {
    switch (e = this.resolveDamageType(e), e) {
      case d.monitors.fatigue:
      case d.monitors.physical:
        return e;
    }
    return super.getDamageMonitor(e);
  }
  async createWord(e, t) {
    this._mutateWords(e, (s) => s.concat([{ word: t, audio: "" }]));
  }
  async sayWord(e, t) {
    var a, i;
    const s = (a = this.getWord(e, t)) == null ? void 0 : a.word;
    s && ChatMessage.create({
      speaker: { alias: ((i = this.token) == null ? void 0 : i.name) ?? this.name },
      content: await jr(
        Fr,
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
    this._applyWordUpdate(e, t, (a) => foundry.utils.mergeObject(a, { word: s }, { overwrite: !0 }));
  }
  async _applyWordUpdate(e, t, s) {
    this._mutateWords(e, (a) => a.map((i) => (i.id == t && s(i), i)));
  }
  async deleteWord(e, t) {
    this._mutateWords(e, (s) => s.filter((a) => a.id != t));
  }
  async _mutateWords(e, t = (s) => s) {
    if (!e)
      return;
    let s = t(this.system[e]);
    L.reindexIds(s), await this.update({ [`system.${e}`]: s });
  }
  getCelebrityValue() {
    return this.getEdgePoolValue(d.counters.social.legend);
  }
  getCredibilityValue() {
    return this.getEdgePoolValue(d.counters.social.credibility);
  }
  getRumorValue() {
    return this.getEdgePoolValue(d.counters.mental.rumor);
  }
  getAnarchy() {
    return this.hasOwnAnarchy() ? {
      value: this.system.counters.anarchy.value,
      max: this.system.counters.anarchy.max,
      scene: this.getAnarchyScene()
    } : super.getAnarchy();
  }
  getAnarchyScene() {
    return this.getEdgePoolValue(d.counters.edgePools.chaos);
  }
  async spendAnarchy(e) {
    if (e > 0) {
      const t = this.getAnarchyScene(), s = this.getAnarchyValue();
      ft.checkSufficient(f.actor.counters.anarchy, e, s + t);
      const a = Math.min(t, e), i = e - a;
      a > 0 && E.addCounter(this, d.monitors.sceneAnarchy, -a), this.hasPlayerOwner ? (await game.system.anarchy.gmAnarchy.actorGivesAnarchyToGM(this, e), E.addCounter(this, d.monitors.anarchy, -i)) : i > 0 && super.spendAnarchy(i);
    }
  }
  canUseEdge() {
    return !0;
  }
  getWounds() {
    const e = L.divint(this.system.monitors.fatigue.value, 3) + L.divint(this.system.monitors.physical.value, 3);
    return Math.max(0, e - this.system.ignoreWounds);
  }
  async rollCelebrity() {
    await Ks.create(this);
  }
}
class si extends Ee {
  prepareDerivedData() {
    this._prepareMwdAttributes(), this._prepareMwdMonitors(), this._prepareMwdItems(), super.prepareDerivedData();
  }
  static get defaultIcon() {
    return `${hs}/default/Default_Vehicle.svg`;
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
    return kt[this.type] ?? kt[d.actorTypes.vehicle];
  }
  getPhysicalAgility() {
    return d.actorAttributes.handling;
  }
  getDamageMonitor(e) {
    switch (e = this.resolveDamageType(e), e) {
      case d.monitors.physical:
        return d.monitors.structure;
      case d.monitors.fatigue:
        return;
    }
    return super.getDamageMonitor(e);
  }
  getRightToDefend() {
    return CONST.DOCUMENT_OWNERSHIP_LEVELS.OBSERVER;
  }
  async _migrateHandlingToAttribute(e) {
    var a;
    const t = ((a = this.system.attributes.handling) == null ? void 0 : a.value) ?? 0, s = this.system.handling;
    s && t < s && await this.update({
      "system.-=handling": null,
      "system.attributes.handling.value": s
    });
  }
  _prepareMwdAttributes() {
    const e = this.system.mwd = this.system.mwd ?? {}, t = {
      [d.actorAttributes.handling]: { value: 0 },
      [d.actorAttributes.system]: { value: 0 },
      [d.actorAttributes.condition]: { value: 0 },
      [d.actorAttributes.chassis]: { value: 0 }
    }, s = foundry.utils.mergeObject(
      foundry.utils.duplicate(t),
      this.system.attributes ?? {},
      { inplace: !1, recursive: !0 }
    );
    this.system.attributes = s, e.attributes = foundry.utils.mergeObject(
      foundry.utils.duplicate(t),
      e.attributes ?? {},
      { inplace: !1, recursive: !0 }
    ), Object.entries(e.attributes).forEach(([a, i]) => {
      var n;
      ((n = s[a]) == null ? void 0 : n.value) === void 0 && (s[a] = s[a] ?? {}, s[a].value = (i == null ? void 0 : i.value) ?? 0);
    });
  }
  _prepareMwdMonitors() {
    var a, i, n, l, o, c, u, m;
    const e = this.system.mwd = this.system.mwd ?? {}, t = this.system.monitors = this.system.monitors ?? {}, s = {
      value: ((a = t.structure) == null ? void 0 : a.value) ?? 0,
      max: ((i = t.structure) == null ? void 0 : i.max) ?? (this.type === d.actorTypes.battlemech ? 18 : 15),
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
    ), this.type === d.actorTypes.battlemech) {
      const p = {
        value: ((l = t.heat) == null ? void 0 : l.value) ?? ((o = e.heat) == null ? void 0 : o.current) ?? 0,
        max: ((c = t.heat) == null ? void 0 : c.max) ?? ((u = e.heat) == null ? void 0 : u.hardMax) ?? 4,
        resistance: Ee.normalizeResistance((m = t.heat) == null ? void 0 : m.resistance)
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
      traits: ["trait", d.itemType.quality],
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
      Object.entries(t).map(([s, a]) => [
        s,
        this.items.filter((i) => a.includes(i.type))
      ])
    );
  }
}
const Ra = {
  light: 4,
  medium: 5,
  heavy: 6,
  assault: 7
}, Gr = { mode: "normal", allowedWeaponIds: [], typeRestriction: "" }, Ur = {
  baseProfile: { name: "Unarmed", damage: "", notes: "" },
  maxWeapons: 0,
  allowedLocations: []
};
class Vr {
  constructor(e) {
    this.actor = e, this.mwd = e.system.mwd ?? {};
  }
  compute() {
    const e = this.mwd.weightClass ?? "medium", t = Ra[e] ?? Ra.medium, s = this._normalizeHardpoints(), a = this._normalizeWeaponGroups(), i = a.find((g) => g.isPrimary), n = a.filter((g) => g.isPrimary), l = this._primarySlot(), o = [], c = [];
    n.length > 1 && o.push(f.mwd.loadout.errors.multiplePrimary);
    const u = i ? t - 1 : t, m = a.length + (i ? 1 : 0);
    a.length > u && o.push(K(f.mwd.loadout.errors.mountPointsExceeded, {
      used: m,
      total: t
    }));
    const p = this._getWeapons((g) => (g.system.weaponCategory ?? "ranged") !== "melee"), y = new Map(p.map((g) => [g.id, g])), h = /* @__PURE__ */ new Set(), T = s.map((g) => ({ ...g, occupiedBy: null, occupiedByName: void 0 }));
    for (const g of a)
      for (const k of g.weaponIds ?? []) {
        const C = y.get(k);
        if (!C) {
          c.push(K(f.mwd.loadout.warnings.weaponMissing, { weapon: k }));
          continue;
        }
        const M = C.system.hardpointType ?? "energy", x = C.system.hardpointSize ?? "small";
        if (h.has(k)) {
          o.push(K(f.mwd.loadout.errors.weaponAlreadyGrouped, { weapon: C.name }));
          continue;
        }
        if (h.add(k), g.isPrimary && this._validatePrimaryWeapon(C, M, x, l, o), (C.system.weaponCategory ?? "ranged") === "melee")
          continue;
        const U = T.find((W) => !W.occupiedBy && W.type === M && W.size === x);
        U ? (U.occupiedBy = g.id, U.occupiedByName = g.name) : o.push(K(f.mwd.loadout.errors.hardpointUnavailable, {
          weapon: C.name,
          type: f.mwd.hardpointType[M] ?? M,
          size: f.mwd.hardpointSize[x] ?? x
        }));
      }
    i && (!i.weaponIds || i.weaponIds.length === 0) && o.push(f.mwd.loadout.errors.primaryWithoutWeapon);
    const S = this._computeMeleeState(o);
    return {
      mountPoints: {
        total: t,
        used: m,
        remaining: Math.max(0, t - m)
      },
      weightClass: e,
      hardpoints: T,
      weaponGroups: a,
      primaryGroupId: i == null ? void 0 : i.id,
      errors: o,
      warnings: c,
      meleeProfiles: S.profiles,
      meleeLimit: S.limit
    };
  }
  _normalizeWeaponGroups() {
    return (this.mwd.weaponGroups ?? []).map((e, t) => ({
      id: e.id ?? `group-${t + 1}`,
      name: e.name || K(f.common.newName, { type: f.itemType.singular.weapon }),
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
    const e = foundry.utils.mergeObject(foundry.utils.duplicate(Gr), this.mwd.primarySlot ?? {});
    return e.allowedWeaponIds = this._asArray(e.allowedWeaponIds), e;
  }
  _computeMeleeState(e) {
    var l, o, c;
    const t = foundry.utils.mergeObject(foundry.utils.duplicate(Ur), this.mwd.melee ?? {}), s = this._getWeapons((u) => (u.system.weaponCategory ?? "ranged") === "melee"), a = [], i = Number(t.maxWeapons ?? 0);
    s.length > i && e.push(K(f.mwd.loadout.errors.meleeLimitExceeded, {
      equipped: s.length,
      limit: i
    }));
    const n = this._asArray(t.allowedLocations);
    return a.push({
      name: ((l = t.baseProfile) == null ? void 0 : l.name) || f.mwd.melee.baseProfile,
      damage: ((o = t.baseProfile) == null ? void 0 : o.damage) ?? "",
      notes: ((c = t.baseProfile) == null ? void 0 : c.notes) ?? ""
    }), s.forEach((u) => {
      var m;
      n.length > 0 && u.system.mountLocation && !n.includes(u.system.mountLocation) && e.push(K(f.mwd.loadout.errors.meleeLocationRestricted, {
        weapon: u.name,
        location: f.mwd.meleeLocation[u.system.mountLocation] ?? u.system.mountLocation
      })), a.push({
        name: u.name,
        damage: u.getDamageCode(),
        notes: ((m = u.system.references) == null ? void 0 : m.description) ?? ""
      });
    }), { profiles: a, limit: i };
  }
  _validatePrimaryWeapon(e, t, s, a, i) {
    var n;
    a.mode === "converted" ? (((n = a.allowedWeaponIds) == null ? void 0 : n.length) > 0 && !a.allowedWeaponIds.includes(e.id) && i.push(K(f.mwd.loadout.errors.primaryNotAllowedWeapon, { weapon: e.name })), a.typeRestriction && t !== a.typeRestriction && i.push(K(f.mwd.loadout.errors.primaryTypeRestriction, {
      weapon: e.name,
      type: f.mwd.hardpointType[a.typeRestriction] ?? a.typeRestriction
    }))) : s !== "large" && i.push(K(f.mwd.loadout.errors.primaryNeedsLarge, { weapon: e.name }));
  }
  _getWeapons(e) {
    return this.actor.items.filter((t) => t.type === d.itemType.mechWeapon).filter((t) => {
      var s;
      return (s = t.isActive) == null ? void 0 : s.call(t);
    }).filter(e);
  }
  _asArray(e) {
    return Array.isArray(e) ? e : e == null || e === "" ? [] : [e];
  }
}
class qr extends si {
  static get defaultIcon() {
    return `${hs}/vehicles/apc.svg`;
  }
  prepareDerivedData() {
    var e;
    super.prepareDerivedData(), this.system.mwd = this.system.mwd ?? {}, this.system.mwd.chassis = this.system.mwd.chassis ?? "", this.system.mwd.tonnage = this.system.mwd.tonnage ?? 0, this.system.mwd.loadout = new Vr(this).compute(), this.system.mwd.weaponGroupDetails = this._prepareConfiguredWeaponGroups(), this.system.mwd.heat = this._prepareHeatTrack(), this.system.mwd.primaryGroupName = ((e = this.system.mwd.weaponGroupDetails.find((t) => t.isPrimary)) == null ? void 0 : e.name) ?? "", this.system.skills = this._prepareSkillMap(), this.system.weaponGroups = this._prepareWeaponGroups(), this.system.meleeProfiles = this._prepareMeleeProfiles(), this.system.quickActions = {
      primaryWeaponGroup: this.system.weaponGroups.find((t) => t.isPrimary),
      hasSensorSweep: !!(this.system.skills.perception || this.system.skills.technician)
    };
  }
  async rollRangedAttack() {
    const e = this.system.weaponGroups ?? [];
    if (e.length === 0) {
      ui.notifications.warn(f.actor.vehicle.quickActions.errors.noRanged);
      return;
    }
    const t = await this._promptWeaponGroup(e);
    if (!t)
      return;
    const s = t.weaponIds.map((a) => this.items.get(a)).filter((a) => a);
    await this._rollQuickSkill(this.system.skills.gunnery, {
      quickAction: {
        title: f.actor.vehicle.quickActions.rangedAttack,
        weaponGroup: this._serializeWeaponGroup(t, s)
      }
    });
  }
  async rollMeleeAttack() {
    const e = this.system.meleeProfiles ?? [];
    if (e.length === 0) {
      ui.notifications.warn(f.actor.vehicle.quickActions.errors.noMelee);
      return;
    }
    const t = await this._promptMeleeProfile(e);
    t && await this._rollQuickSkill(this.system.skills.melee, {
      quickAction: {
        title: f.actor.vehicle.quickActions.meleeAttack,
        meleeProfile: t
      }
    });
  }
  async rollDodge() {
    await this._rollQuickSkill(this.system.skills.piloting, {
      quickAction: { title: f.actor.vehicle.quickActions.dodgeCheck }
    });
  }
  async rollPilotingCheck() {
    await this._rollQuickSkill(this.system.skills.piloting, {
      quickAction: { title: f.actor.vehicle.quickActions.pilotingCheck }
    });
  }
  async rollSensorSweep() {
    const e = [this.system.skills.perception, this.system.skills.technician].filter((s) => s);
    if (e.length === 0) {
      ui.notifications.warn(f.actor.vehicle.quickActions.errors.noSensorSweep);
      return;
    }
    const t = await this._promptSensorSweepSkill(e);
    t && await this._rollQuickSkill(t, {
      quickAction: {
        title: f.actor.vehicle.quickActions.sensorSweep,
        skillName: t.name
      }
    });
  }
  async rollEmergencyRepair() {
    await this._rollQuickSkill(this.system.skills.technician, {
      quickAction: { title: f.actor.vehicle.quickActions.emergencyRepair }
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
    const e = this.system ?? {}, t = ((l = e.monitors) == null ? void 0 : l.heat) ?? { value: 0, max: 0 }, s = ((o = e.mwd) == null ? void 0 : o.heat) ?? {}, a = {
      current: t.value ?? 0,
      max: t.max ?? 0,
      thresholds: {
        runningHot: 2,
        overheated: 3,
        shutdown: 4
      }
    }, i = foundry.utils.mergeObject(a, s, { inplace: !1 });
    i.thresholds = foundry.utils.mergeObject(a.thresholds, s.thresholds ?? {}, { inplace: !1 }), i.current = t.value ?? i.current, i.max = t.max ?? i.max;
    const n = this._resolveHeatStatus(i.current, i.thresholds, i.max);
    return this.system.mwd.heatStatus = {
      code: n,
      label: f.actor.battlemech.heat.status[n] ?? n
    }, i;
  }
  _resolveHeatStatus(e, t, s) {
    return e >= ((t == null ? void 0 : t.shutdown) ?? s) ? "shutdown" : e >= ((t == null ? void 0 : t.overheated) ?? s) ? "overheated" : e >= ((t == null ? void 0 : t.runningHot) ?? 0) ? "runningHot" : "safe";
  }
  _prepareConfiguredWeaponGroups() {
    var s;
    const e = ((s = this.system.mwd) == null ? void 0 : s.weaponGroups) ?? [], t = new Map(this.items.map((a) => [a.id, a]));
    return e.map((a, i) => {
      const n = Array.isArray(a.weaponIds) ? a.weaponIds : a.weaponIds ? [a.weaponIds] : [], l = n.map((c) => t.get(c)).filter((c) => (c == null ? void 0 : c.type) === d.itemType.mechWeapon), o = n.filter((c) => !t.has(c));
      return {
        id: a.id ?? `group-${i + 1}`,
        index: i,
        name: a.name || K(f.common.newName, { type: f.itemType.singular.weapon }),
        weaponIds: n,
        isPrimary: a.isPrimary ?? !1,
        weapons: l,
        missingWeaponIds: o
      };
    });
  }
  _resolveSkill(e) {
    var a, i;
    const t = this.items.find((n) => n.type === d.itemType.skill && n.system.code === e);
    if (t)
      return t;
    const s = gs.prepareSkill(e);
    if (s) {
      const n = (a = f.skill) == null ? void 0 : a[e];
      return {
        name: s.name ?? (n || e),
        system: foundry.utils.mergeObject({
          code: e,
          attribute: (i = s.system) == null ? void 0 : i.attribute,
          value: 0
        }, s.system ?? {})
      };
    }
  }
  _prepareWeaponGroups() {
    var i;
    const e = (((i = this.system.mwd) == null ? void 0 : i.weaponGroupDetails) ?? []).map((n) => ({
      ...n,
      weapons: (n.weapons ?? []).filter((l) => {
        var o;
        return (o = l == null ? void 0 : l.isActive) == null ? void 0 : o.call(l);
      })
    })).filter((n) => n.weapons.length > 0);
    if (e.length > 0)
      return e.map((n) => ({
        id: n.id,
        name: n.name,
        weaponIds: n.weapons.map((l) => l.id),
        isPrimary: n.isPrimary ?? !1
      }));
    const t = this.items.filter((n) => n.type === d.itemType.mechWeapon && n.isActive());
    if (t.length === 0)
      return [];
    const s = t.filter((n) => this.hasFavorite(d.itemType.mechWeapon, n.id)), a = [];
    return s.length > 0 && a.push({
      id: "favorite",
      name: f.actor.vehicle.quickActions.primaryWeapons,
      weaponIds: s.map((n) => n.id),
      isPrimary: !0
    }), a.push({
      id: "all",
      name: f.actor.vehicle.quickActions.allWeapons,
      weaponIds: t.map((n) => n.id),
      isPrimary: a.length === 0
    }), a;
  }
  _prepareMeleeProfiles() {
    const e = [{
      id: "unarmed",
      name: f.actor.vehicle.quickActions.unarmed,
      weaponId: null,
      damage: 1,
      notes: f.actor.vehicle.quickActions.unarmedNotes
    }], t = this.items.filter((s) => s.type === d.itemType.mechWeapon && s.isActive() && s.system.skill === "meleeCombat");
    return e.push(...t.map((s) => {
      var a;
      return {
        id: s.id,
        name: s.name,
        weaponId: s.id,
        damage: ((a = s.getDamage()) == null ? void 0 : a.value) ?? s.system.damage,
        notes: s.system.description ?? ""
      };
    })), e;
  }
  async _rollQuickSkill(e, t = {}) {
    var i, n;
    const s = ((i = e == null ? void 0 : e.system) == null ? void 0 : i.attribute) ?? this.getPhysicalAgility(), a = foundry.utils.mergeObject(Fe.prepareActorRoll(this), {
      mode: de.rollType.skill,
      skill: e,
      attribute1: s,
      specialization: (n = e == null ? void 0 : e.system) == null ? void 0 : n.specialization
    });
    t.quickAction && (a.quickAction = t.quickAction), await Fe.create(a);
  }
  async _promptWeaponGroup(e) {
    if (e.length === 1)
      return e[0];
    const t = e.find((i) => i.isPrimary) ?? e[0], s = `<form class="mwd-quick-select">${e.map((i) => `
      <label class="quick-select-option">
        <input type="radio" name="weapon-group" value="${i.id}" ${i.id === t.id ? "checked" : ""}>
        <span>${i.name}${i.isPrimary ? ` (${f.actor.vehicle.quickActions.primaryLabel})` : ""}</span>
      </label>`).join("")}</form>`, a = await Dialog.prompt({
      title: f.actor.vehicle.quickActions.selectWeaponGroup,
      content: s,
      label: f.common.roll.button,
      callback: (i) => i.find('input[name="weapon-group"]:checked').val() ?? t.id
    });
    return e.find((i) => i.id === a) ?? t;
  }
  async _promptMeleeProfile(e) {
    if (e.length === 1)
      return e[0];
    const t = e[0], s = `<form class="mwd-quick-select">${e.map((i) => `
      <label class="quick-select-option">
        <input type="radio" name="melee-profile" value="${i.id}" ${i.id === t.id ? "checked" : ""}>
        <span>${i.name}</span>
      </label>`).join("")}</form>`, a = await Dialog.prompt({
      title: f.actor.vehicle.quickActions.selectMeleeProfile,
      content: s,
      label: f.common.roll.button,
      callback: (i) => i.find('input[name="melee-profile"]:checked').val() ?? t.id
    });
    return e.find((i) => i.id === a) ?? t;
  }
  async _promptSensorSweepSkill(e) {
    if (e.length === 1)
      return e[0];
    const t = `<form class="mwd-quick-select">${e.map((a) => `
      <label class="quick-select-option">
        <input type="radio" name="sensor-skill" value="${a.system.code}">
        <span>${a.name}</span>
      </label>`).join("")}</form>`, s = await Dialog.prompt({
      title: f.actor.vehicle.quickActions.selectSensorSkill,
      content: t,
      label: f.common.roll.button,
      callback: (a) => a.find('input[name="sensor-skill"]:checked').val()
    });
    return e.find((a) => a.system.code === s) ?? e[0];
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
class zr {
  static register() {
    game.settings.register(A, "useDestinyMechanics", {
      name: f.settings.useDestinyMechanics.name,
      hint: f.settings.useDestinyMechanics.hint,
      scope: "world",
      config: !0,
      type: Boolean,
      default: !0
    }), game.settings.register(A, "enableGMGadget", {
      name: "Enable GM Gadget",
      hint: "If enabled, renders the new AppV2 GM Gadget UI on startup.",
      scope: "world",
      config: !0,
      type: Boolean,
      default: !0
    });
  }
  static getSystemProperty(e, t) {
    return game.settings.get(A, e) ?? t;
  }
}
const { HandlebarsApplicationMixin: Kr } = foundry.applications.api;
var $e, Kt, Yt, Ys;
const we = class we extends Kr(foundry.applications.sheets.ActorSheetV2) {
  constructor() {
    super(...arguments);
    le(this, Yt);
    le(this, $e, !1);
    /** Track active CSB tab per group across rerenders */
    le(this, Kt, /* @__PURE__ */ new Map());
  }
  /** @override */
  _updatePosition(t) {
    const s = super._updatePosition(t), {
      MIN_WIDTH: a,
      MAX_WIDTH: i,
      MIN_HEIGHT: n,
      MAX_HEIGHT: l
    } = this.constructor;
    return typeof s.width == "number" && (s.width = Math.min(
      i,
      Math.max(a, s.width)
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
    return _(this, $e);
  }
  toggleEditing() {
    if (this.isEditable) {
      if (_(this, $e)) {
        this._commitEditsToActor().finally(() => {
          Pe(this, $e, !_(this, $e)), this.render({ force: !0 });
        });
        return;
      }
      Pe(this, $e, !_(this, $e)), this.render({ force: !0 });
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
    var i, n;
    const t = this.actor ?? this.document ?? null, s = (t == null ? void 0 : t.token) ?? null, a = (i = this.document) != null && i.isToken ? ((n = this.document) == null ? void 0 : n.token) ?? s ?? null : s;
    return a ? (a == null ? void 0 : a.document) ?? a : null;
  }
  /**
   * Resolve the document that should persist actor-backed state.
   * Linked token sheets should write to the base actor document so state survives scene changes.
   */
  getPersistentActor() {
    var a, i, n;
    const t = this.actor ?? this.document ?? null;
    if (!t) return null;
    const s = this.getSheetTokenDocument();
    return s != null && s.isLinked ? s.baseActor ?? ((n = (a = game.actors) == null ? void 0 : a.get) == null ? void 0 : n.call(a, ((i = s == null ? void 0 : s.baseActor) == null ? void 0 : i.id) ?? "")) ?? s.actor ?? t : t;
  }
  /** @override */
  _initializeApplicationOptions(t) {
    var l, o, c, u, m;
    t = super._initializeApplicationOptions(t), t.classes = Array.from(t.classes ?? []);
    const s = (t == null ? void 0 : t.document) ?? this.document, a = (s == null ? void 0 : s.type) ?? ((l = this.actor) == null ? void 0 : l.type);
    a && t.classes.push(String(a));
    const i = ((m = (u = (c = (o = game.system) == null ? void 0 : o.anarchy) == null ? void 0 : c.styles) == null ? void 0 : u.selectCssClass) == null ? void 0 : m.call(u)) ?? "mwd-theme-default", n = ["mwd-theme-default", "mwd-theme-sra"];
    for (let p = t.classes.length - 1; p >= 0; p--)
      n.includes(t.classes[p]) && t.classes.splice(p, 1);
    return t.classes.push(i), t;
  }
  /**
   * No localization: provide a concrete title so Foundry doesn't show "TYPES.Actor.<type>".
   * @override
   */
  get title() {
    var n, l;
    const t = ((n = this.actor) == null ? void 0 : n.type) ?? "actor", a = {
      character: "Character",
      npc: "NPC",
      battlemech: "BattleMech",
      vehicle: "Vehicle",
      device: "Device"
    }[t] ?? String(t).replace(/(^|[-_])([a-z])/g, (o, c, u) => (c ? " " : "") + u.toUpperCase());
    return `${((l = this.actor) == null ? void 0 : l.name) ?? "Actor"} — ${a}`;
  }
  /**
   * Window actions (header/menu). Centralize here and dedupe by action key.
   * @override
   */
  _getHeaderControls() {
    var n, l;
    let t = ((n = super._getHeaderControls) == null ? void 0 : n.call(this)) ?? [];
    const s = ((l = this.document) == null ? void 0 : l.isToken) ?? !1, a = /* @__PURE__ */ new Set();
    s ? (a.add("prototypeToken"), a.add("configurePrototypeToken")) : (a.add("token"), a.add("configureToken")), t = t.filter((o) => {
      const c = (o == null ? void 0 : o.action) ?? "", u = String((o == null ? void 0 : o.label) ?? "");
      return !(a.has(c) || s && u.includes("Prototype") || !s && u === "Token");
    });
    const i = /* @__PURE__ */ new Set();
    return t = t.filter((o) => {
      const c = o == null ? void 0 : o.action, u = c ? `a:${c}` : `il:${(o == null ? void 0 : o.icon) ?? ""}|${(o == null ? void 0 : o.label) ?? ""}`;
      return i.has(u) ? !1 : (i.add(u), !0);
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
    const a = ((o = s == null ? void 0 : s.closest) == null ? void 0 : o.call(s, ".csb-tab-link[data-tab]")) ?? ((u = (c = t == null ? void 0 : t.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, ".csb-tab-link[data-tab]"));
    if (!a) return;
    const i = a.dataset.tab, n = a.closest(".csb-tabs");
    if (!n || !i) return;
    const l = n.dataset.group || "default";
    _(this, Kt).set(l, i), R(this, Yt, Ys).call(this, n, i);
  }
  /**
   * Universal roll action: data-action="roll" + data-roll='{"intent":"skill","key":"gunnery"}'
   */
  async _onRollAction(t, s) {
    var c, u, m, p, y, h, T, S, g;
    (c = t == null ? void 0 : t.preventDefault) == null || c.call(t);
    const a = ((u = s == null ? void 0 : s.closest) == null ? void 0 : u.call(s, "[data-roll]")) ?? ((p = (m = t == null ? void 0 : t.target) == null ? void 0 : m.closest) == null ? void 0 : p.call(m, "[data-roll]")), i = (y = a == null ? void 0 : a.dataset) == null ? void 0 : y.roll;
    if (!i) return;
    let n;
    try {
      n = JSON.parse(i);
    } catch (k) {
      console.warn("MWD | Invalid data-roll JSON:", i, k);
      return;
    }
    const l = !!(t != null && t.shiftKey), o = ((h = game.mwd) == null ? void 0 : h.roll) ?? ((S = (T = game.system) == null ? void 0 : T.mwd) == null ? void 0 : S.roll);
    if (!(o != null && o.execute)) {
      (g = ui.notifications) == null || g.error("MWD roll system not initialized (game.mwd.roll.execute missing).");
      return;
    }
    return o.execute({ actor: this.actor, payload: n, event: t, quick: l });
  }
  async _onEditImage(t, s) {
    var n, l, o;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (l = t == null ? void 0 : t.stopPropagation) == null || l.call(t), !this.isEditable || !this.editing) return;
    const a = foundry.applications.apps.FilePicker.implementation;
    new a({
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
    var i, n, l;
    (i = super._onRender) == null || i.call(this, t, s);
    const a = this._getRootElement();
    if (a) {
      for (const o of a.querySelectorAll(".csb-tabs")) {
        const c = o.dataset.group || "default", u = _(this, Kt).get(c), m = o.dataset.default || ((n = o.querySelector(".csb-tab-link[data-tab]")) == null ? void 0 : n.dataset.tab), p = u || m;
        p && R(this, Yt, Ys).call(this, o, p);
      }
      a.querySelectorAll(".csb-tabs").length && !a.querySelector(".csb-tab-panel.is-active") && console.warn(`${z} CSB tabs present but no active tab applied. Check element root resolution and CSS .is-active selectors.`, {
        sheet: (l = this.constructor) == null ? void 0 : l.name
      });
    }
  }
  async _commitEditsToActor() {
    const t = this.element;
    if (!t) return;
    const s = t.querySelectorAll('input[name][data-edit-field="staged"], select[name][data-edit-field="staged"], textarea[name][data-edit-field="staged"]');
    if (!s.length) return;
    const a = {};
    for (const i of s) {
      const n = i.getAttribute("name");
      if (!n || i.disabled) continue;
      let l;
      i instanceof HTMLInputElement ? i.type === "checkbox" ? l = i.checked : i.type === "number" ? l = Number(i.value) : l = i.value : l = i.value, typeof l == "number" && Number.isNaN(l) && (l = 0), l = this._clampByPath(n, l), foundry.utils.getProperty(this.actor, n) !== l && (a[n] = l);
    }
    if (Object.keys(a).length)
      try {
        await (this.getPersistentActor() ?? this.actor).update(a);
      } catch (i) {
        console.warn("MWD | Commit failed (permissions or validation):", i);
      }
  }
  /** @override */
  async _prepareContext(t) {
    var n, l, o, c, u, m, p, y, h, T, S;
    console.log(`${z}BaseActorSheetV2._prepareContext:start`, {
      actorName: (n = this.actor) == null ? void 0 : n.name,
      actorType: (l = this.actor) == null ? void 0 : l.type
    });
    const s = await super._prepareContext(t), a = foundry.utils.deepClone((s == null ? void 0 : s.options) ?? {});
    a.classes = Array.from(((o = this.options) == null ? void 0 : o.classes) ?? []), a.cssClass = a.classes.join(" ");
    const i = foundry.utils.mergeObject(
      s,
      {
        actor: this.actor,
        system: (c = this.actor) == null ? void 0 : c.system,
        editable: this.isEditable,
        owner: ((u = this.document) == null ? void 0 : u.isOwner) ?? !1,
        limited: !(((m = this.document) == null ? void 0 : m.isOwner) ?? !1),
        editing: _(this, $e),
        // Template contract
        data: this.actor,
        // legacy alias
        options: a,
        // safe, template-only
        cssClass: a.cssClass
      },
      { inplace: !1 }
    );
    return i.options.owner = i.owner, i.options.limited = i.limited, i.options.editable = i.editable, i.options.editing = i.editing, i.options.viewMode = !i.editing, i.skillsDisplay = or(((p = this.actor) == null ? void 0 : p.system) ?? {}), i.items ?? (i.items = {}), (y = this.actor) != null && y.items && typeof (L == null ? void 0 : L.classifyInto) == "function" && (L.classifyInto(i.items, this.actor.items), i.items.weapon = [
      ...i.items.mechWeapon ?? [],
      ...i.items.personalWeapon ?? []
    ]), i.npcItems = {
      traits: i.items.quality ?? [],
      weapons: i.items.weapon ?? [],
      assetModules: i.items.assetModule ?? [],
      inventory: i.items.gear ?? []
    }, console.log(`${z}BaseActorSheetV2._prepareContext:done`, {
      actorType: (h = this.actor) == null ? void 0 : h.type,
      cssClass: i.cssClass,
      itemCount: ((S = (T = this.actor) == null ? void 0 : T.items) == null ? void 0 : S.size) ?? 0,
      editing: _(this, $e)
    }), i;
  }
  /** Clamp certain actor system paths to valid ranges */
  _clampByPath(t, s) {
    return typeof s != "number" ? s : ((/^system\.skills\.[^.]+\.rating$/.test(t) || /^system\.attributes\.[^.]+\.value$/.test(t)) && (s = Math.trunc(s)), /^system\.skills\.[^.]+\.rating$/.test(t) ? Math.clamp(s, 0, 12) : /^system\.attributes\.[^.]+\.value$/.test(t) ? Math.clamp(s, 0, 10) : s);
  }
  /** Action handler: Condition Monitor set */
  async _onMonitorSet(t, s) {
    var y, h;
    if (t.preventDefault(), !this.isEditable) return;
    const a = String(((y = s == null ? void 0 : s.dataset) == null ? void 0 : y.monitor) ?? "").trim(), i = Number((h = s == null ? void 0 : s.dataset) == null ? void 0 : h.value);
    if (!a || !Number.isFinite(i)) return;
    const n = a === "burn" ? "system.burn.value" : `system.monitors.${a}.value`, l = Number(foundry.utils.getProperty(this.actor, n) ?? 0), o = a === "armor" ? i : l === i ? 0 : i, c = this.getPersistentActor() ?? this.actor;
    if (typeof (c == null ? void 0 : c.setMonitorValue) == "function")
      return c.setMonitorValue(a, o, { source: "sheet" });
    const u = `system.monitors.${a}`, m = Number(foundry.utils.getProperty(c, `${u}.max`)) || 0, p = Math.min(Math.max(0, o), Math.max(0, m));
    return c.update({ [`${u}.value`]: p });
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
$e = new WeakMap(), Kt = new WeakMap(), Yt = new WeakSet(), /**
 * Apply active-state classes within a single .csb-tabs root.
 * Idempotent: safe to call every render.
 */
Ys = function(t, s) {
  t.querySelectorAll(".csb-tab-link").forEach((a) => {
    a.classList.toggle("is-active", a.dataset.tab === s);
  }), t.querySelectorAll(".csb-tab-panel").forEach((a) => {
    a.classList.toggle("is-active", a.dataset.tab === s);
  });
}, // ---- Hard minimum size (resize clamp) ----
v(we, "MIN_WIDTH", 800), v(we, "MAX_WIDTH", 950), v(we, "MIN_HEIGHT", 600), v(we, "MAX_HEIGHT", 1400), // group -> tabId
/** @override */
v(we, "DEFAULT_OPTIONS", foundry.utils.mergeObject(Xt(we, we, "DEFAULT_OPTIONS"), {
  classes: ["sheet", "actor", A, "appv2", "mwd-sheet", "mwd-character-sheet"],
  position: { width: 760, height: 760 },
  window: { resizable: !0, minimizable: !0 },
  actions: {
    toggleViewMode: we.prototype._onToggleViewMode,
    tab: we.prototype._onClickTab,
    roll: we.prototype._onRollAction,
    monitorSet: we.prototype._onMonitorSet,
    editImage: we.prototype._onEditImage
  }
}, { inplace: !1 }));
let Ct = we;
var wt, it, ai, ii, ri;
const Gt = class Gt {
  static async get(e) {
    if (_(this, wt).has(e)) return _(this, wt).get(e);
    const t = R(this, it, ai).call(this, e);
    return _(this, wt).set(e, t), t;
  }
};
wt = new WeakMap(), it = new WeakSet(), ai = async function(e) {
  const t = `systems/${A}/templates/v2/layouts/${e}.layout.json`;
  let s;
  try {
    const a = await fetch(t);
    if (!a.ok) throw new Error(`HTTP ${a.status} for ${t}`);
    s = await a.json();
  } catch (a) {
    console.error(`${z}LayoutRegistry.get FAILED`, { layoutId: e, url: t, e: a }), s = { id: e, version: 0, root: { type: "stack", children: [] } };
  }
  return R(this, it, ii).call(this, s);
}, ii = function(e) {
  const t = (s) => {
    var a;
    return !s || typeof s != "object" || (s.template ?? (s.template = R(a = Gt, it, ri).call(a, s)), s.children = Array.isArray(s.children) ? s.children : [], Array.isArray(s.classes) || (typeof s.classes == "string" ? s.classes = s.classes.split(/\s+/).filter(Boolean) : s.classes = []), s.children = s.children.map(t), s.type === "tabs" && Array.isArray(s.tabs) && (s.tabs = s.tabs.map((i) => ({
      ...i,
      children: (Array.isArray(i.children) ? i.children : []).map(t)
    })))), s;
  };
  return {
    ...e,
    root: t(e.root ?? { type: "stack", children: [] })
  };
}, ri = function(e) {
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
}, le(Gt, it), le(Gt, wt, /* @__PURE__ */ new Map());
let ds = Gt;
function fe(r, e = 0) {
  const t = Number(r);
  return Number.isFinite(t) ? t : e;
}
function Yr(r) {
  return String(r ?? "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
function Ps(r, e = 180) {
  const t = Yr(r);
  return t ? t.length <= e ? t : `${t.slice(0, Math.max(0, e - 3)).trim()}...` : "";
}
function lt(r = []) {
  return r.map((e) => String(e ?? "").trim()).filter(Boolean);
}
function Rs(r = []) {
  return r.filter((e) => e && e.value !== void 0 && e.value !== null && String(e.value).trim() !== "").map((e) => ({
    label: String(e.label ?? "").trim(),
    value: String(e.value ?? "").trim(),
    emphasis: e.emphasis ?? ""
  }));
}
function Ds(r = []) {
  return lt(r).map((e) => ({ label: e }));
}
function Os(r = []) {
  return r.filter((e) => e && e.value !== void 0 && e.value !== null && String(e.value).trim() !== "").map((e) => ({
    label: String(e.label ?? "").trim(),
    value: String(e.value ?? "").trim()
  }));
}
function Qr(r = {}, e = ["close", "near", "far", "extreme"]) {
  return e.map((t) => {
    const s = fe(r == null ? void 0 : r[t], 0);
    return `${t.charAt(0).toUpperCase() + t.slice(1)} ${s}`;
  }).join(" | ");
}
function Jr(r = {}) {
  return ["close", "near", "far", "extreme"].map((t) => {
    const s = fe(r == null ? void 0 : r[t], 0);
    return `${t.charAt(0).toUpperCase() + t.slice(1)} ${s}`;
  }).join(" | ");
}
var Re, st, ut, Qe, N, ni, Js, ns, oi, li, he, ct, Wt, os;
const Q = class Q extends Ct {
  constructor() {
    super(...arguments);
    le(this, N);
    le(this, Re, null);
    le(this, st, null);
    le(this, ut, null);
    le(this, Qe, /* @__PURE__ */ new Set());
  }
  /** @override */
  async _prepareContext(t) {
    var ie, ge, ue, ye, re, De, Oe, Me, be, Ve, qe, Et, Pt;
    const s = await super._prepareContext(t), a = ((ie = this.getSheetTokenDocument) == null ? void 0 : ie.call(this)) ?? null;
    s._mwdThemeClass = game.system.mwd.styles.selectCssClass(), s.layout = await ds.get("character");
    const i = ((ue = (ge = this.actor).getEdgeCap) == null ? void 0 : ue.call(ge)) ?? Number(((De = (re = (ye = this.actor.system) == null ? void 0 : ye.attributes) == null ? void 0 : re.edge) == null ? void 0 : De.value) ?? 0), n = !!this.isEditable, l = { physical: "Physical", mental: "Mental", social: "Social" }, o = {
      grit: "Grit",
      insight: "Insight",
      legend: "Legend",
      chaos: "Chaos",
      rumor: "Rumor",
      credibility: "Credibility"
    }, c = this.actor.getEdgePoolSummary ? this.actor.getEdgePoolSummary({ groups: sa }) : { groups: [] };
    s.edgeConsole = {
      cap: i,
      editable: n,
      capPips: Array.from({ length: Math.max(0, i) }, (b, P) => P + 1),
      groups: (c.groups ?? []).map((b) => ({
        id: b.id,
        label: l[b.id] ?? b.id,
        pools: (b.pools ?? []).map((P) => {
          const V = Number(P.effectiveValue ?? 0), ne = Number(P.effectiveMax ?? 0), se = Array.from({ length: Math.max(0, ne) }, (pe, ve) => {
            const Te = ve + 1;
            return { n: Te, filled: Te <= V };
          }), Ae = String(P.key ?? "").split(".").pop();
          return {
            key: P.key,
            label: o[Ae] ?? Ae ?? P.key,
            value: V,
            max: ne,
            rating: Number(P.rating ?? 0),
            isCapped: Number(P.rating ?? 0) > Number(P.cap ?? i),
            pips: se,
            // Paths for edit-mode inputs
            pathRating: `system.counters.edgePools.${P.key}.rating`,
            pathValue: `system.counters.edgePools.${P.key}.value`,
            // Keep the roll payload if you want pool-name click to route through BaseActorSheetV2 roll handler
            roll: JSON.stringify({ intent: "edge", pool: P.key })
          };
        })
      }))
    };
    const u = ["grit", "insight", "legend", "chaos", "rumor", "credibility"], m = /* @__PURE__ */ new Map();
    for (const b of s.edgeConsole.groups ?? [])
      for (const P of b.pools ?? []) {
        const V = String(P.key ?? "").split(".").pop();
        V && m.set(V, P), P.domain = b.id;
      }
    s.edgeConsole.poolsOrdered = u.map((b) => m.get(b)).filter(Boolean);
    const y = (this.actor.system ?? {}).monitors ?? {}, h = [
      { id: "physical", label: "Physical", kind: "wound", status: { label: "Penalty", path: "derived.penalty" } },
      { id: "fatigue", label: "Fatigue", kind: "fatigue", status: { label: "Penalty", path: "derived.penalty" } },
      { id: "armor", label: "Armor", kind: "armor-personal", status: { label: "Resist", path: "derived.resistance" } }
    ], T = (b, P, V = 0) => {
      const ne = foundry.utils.getProperty(b, P), se = Number(ne);
      return Number.isFinite(se) ? se : V;
    };
    s.conditionMonitors = h.map((b) => {
      const P = (y == null ? void 0 : y[b.id]) ?? {}, V = Math.max(0, T(P, "max", 0)), ne = Math.min(Math.max(0, T(P, "value", 0)), V);
      return {
        id: b.id,
        label: b.label,
        kind: b.kind,
        editable: !!this.isEditable,
        value: ne,
        max: V,
        segments: Array.from({ length: V }, (se, Ae) => {
          const pe = Ae + 1;
          return { value: pe, filled: pe <= ne };
        }),
        status: b.status ? { label: b.status.label, value: T(P, b.status.path, 0) } : null
      };
    });
    const S = Number(((Me = (Oe = this.actor.system) == null ? void 0 : Oe.burn) == null ? void 0 : Me.value) ?? 0), g = 10, k = 6, C = Math.min(S, g);
    s.burnOverflow = Math.max(0, S - g), s.burnPenalty = Math.floor(S / 2), s.burnPips = Array.from({ length: g }, (b, P) => {
      const V = P + 1;
      return {
        pipValue: V,
        filled: V <= C,
        threshold: V === k
      };
    }), s.combat = {
      roll: {
        initiative: JSON.stringify({ intent: "initiative" }),
        overload: JSON.stringify({ intent: "overload" })
      }
    }, s.burn = {
      value: S,
      penalty: Math.floor(S / 2),
      overflow: Math.max(0, S - 10),
      canOverloadCheck: S >= 6,
      overloaded: !!((Ve = (be = this.actor.system) == null ? void 0 : be.burn) != null && Ve.overloaded)
    };
    const M = X.getSnapshot(this.actor, { token: a });
    s.combatDashboard = {
      overloadedLabel: M.overloaded ? "Yes" : "No",
      burnLabel: String(M.burn.value),
      burnPenaltyLabel: M.burn.penalty > 0 ? `-${M.burn.penalty}` : "0",
      actionSummary: M.summaryText,
      burnThisActivationLabel: `+${Math.max(0, Number(M.state.burnThisActivation ?? 0))}`,
      statuses: M.statuses,
      modifiers: M.modifierSummary,
      inactiveReason: M.inactiveReason
    };
    const x = X.buildActionModel(this.actor, M), U = new Set((x.menus ?? []).map((b) => b.id));
    _(this, Re) && !U.has(_(this, Re)) && Pe(this, Re, null), s.combatActions = {
      ...x,
      menus: (x.menus ?? []).map((b) => ({
        ...b,
        isOpen: b.id === _(this, Re)
      }))
    };
    const W = ((Et = (qe = this.actor).getPersonalCombatLoadout) == null ? void 0 : Et.call(qe)) ?? null;
    return s.personalInventory = {
      warnings: [...(W == null ? void 0 : W.warnings) ?? []],
      weapons: ((W == null ? void 0 : W.weapons) ?? []).map((b) => {
        var pe, ve, Te, Ne, Ie, xe;
        const P = R(this, N, os).call(this, "weapons", b.id), V = !!((pe = b == null ? void 0 : b.ammoState) != null && pe.isTracked), ne = b != null && b.ammoLabel ? `Loaded ${b.ammoLabel}` : "", se = V ? `${fe((ve = b == null ? void 0 : b.ammoState) == null ? void 0 : ve.current, 0)}/${fe((Te = b == null ? void 0 : b.ammoState) == null ? void 0 : Te.max, 0)}` : "", Ae = Os([
          { label: "Skill", value: ((Ne = b.skillDef) == null ? void 0 : Ne.label) ?? b.skill ?? "" },
          { label: "Category", value: b.category ?? "" },
          { label: "Range", value: Jr(b.range) },
          { label: "Attack Rating", value: Qr(b.attackRatingBand) },
          { label: "Ammo", value: V ? `${se} tracked` : b.ammoLabel || "Untracked" },
          { label: "Traits", value: lt(b.traits ?? []).join(", ") }
        ]);
        return {
          id: b.id,
          accordionId: P,
          isExpanded: _(this, Qe).has(P),
          name: b.name,
          img: b.img,
          subtitle: ((Ie = b.skillDef) == null ? void 0 : Ie.label) ?? b.category ?? "",
          summaryStats: Rs([
            { label: "DV", value: fe(b.damage, 0), emphasis: "strong" },
            { label: "AP", value: fe(b.ap, 0) },
            { label: "Type", value: b.damageTypeLabel ?? b.damageType ?? "" },
            { label: "Ammo", value: V ? se : b.ammoLabel || "--" }
          ]),
          detailTags: Ds([
            b.equipped ? "Equipped" : "",
            b.isPrimary ? "Primary" : "",
            ne,
            ...lt(b.traits ?? [])
          ]),
          detailRows: Ae,
          detailText: Ps(b.notes),
          equipped: !!b.equipped,
          isPrimary: !!b.isPrimary,
          attackRoll: JSON.stringify({
            intent: "attack",
            weaponId: b.id,
            ammoTypeId: ((xe = b == null ? void 0 : b.ammoState) == null ? void 0 : xe.activeTypeId) ?? "",
            edge: { pool: "physical.grit", allowed: ["pre", "post"] },
            tags: ["combat", "attack"]
          })
        };
      }),
      armor: ((W == null ? void 0 : W.armor) ?? []).map((b) => {
        var pe, ve, Te, Ne, Ie, xe, et, tt, rt, Rt, Dt, Ot, Nt, I;
        const P = ((pe = W == null ? void 0 : W.activeArmor) == null ? void 0 : pe.id) === b.id ? W.activeArmor : null, V = R(this, N, os).call(this, "armor", b.id), ne = fe(((Te = (ve = P == null ? void 0 : P.traitState) == null ? void 0 : ve.reinforced) == null ? void 0 : Te.max) ?? ((Ie = (Ne = b == null ? void 0 : b.traitState) == null ? void 0 : Ne.reinforced) == null ? void 0 : Ie.max), 0), se = ne > 0 ? `${fe(((et = (xe = P == null ? void 0 : P.traitState) == null ? void 0 : xe.reinforced) == null ? void 0 : et.current) ?? ((rt = (tt = b == null ? void 0 : b.traitState) == null ? void 0 : tt.reinforced) == null ? void 0 : rt.current), 0)}/${ne}` : "", Ae = [
          Object.entries((P == null ? void 0 : P.mitigationByType) ?? (P == null ? void 0 : P.typedMitigation) ?? b.mitigationByType ?? {}).filter(([, oe]) => Number(oe) > 0).map(([oe, bs]) => `${oe} +${bs}`).join(", "),
          se ? `Reinforced ${se}` : ""
        ].filter(Boolean).join(" | ");
        return {
          id: b.id,
          accordionId: V,
          isExpanded: _(this, Qe).has(V),
          name: b.name,
          img: b.img,
          subtitle: (Rt = b.tags) != null && Rt.length ? b.tags.join(", ") : "Armor",
          summaryStats: Rs([
            { label: "Rating", value: fe((P == null ? void 0 : P.ratingCurrent) ?? b.rating, 0), emphasis: "strong" },
            { label: "Res", value: fe((P == null ? void 0 : P.baseMitigation) ?? (P == null ? void 0 : P.baseResistance), 0) },
            { label: "Def", value: fe(b.defenseBonus, 0) },
            { label: "Dur", value: `${fe(((Dt = P == null ? void 0 : P.durability) == null ? void 0 : Dt.current) ?? ((Ot = b.durability) == null ? void 0 : Ot.current), 0)}/${fe(((Nt = P == null ? void 0 : P.durability) == null ? void 0 : Nt.max) ?? ((I = b.durability) == null ? void 0 : I.max), 0)}` }
          ]),
          detailTags: Ds([
            b.equipped ? "Equipped" : "",
            b.isPrimary ? "Primary" : "",
            se ? `Reinforced ${se}` : "",
            ...lt(b.traits ?? [])
          ]),
          detailRows: Os([
            { label: "Mitigation", value: Ae },
            { label: "Defense Bonus", value: fe(b.defenseBonus, 0) },
            { label: "Traits", value: lt(b.traits ?? []).join(", ") },
            { label: "Tags", value: lt(b.tags ?? []).join(", ") }
          ]),
          detailText: Ps(b.notes),
          equipped: !!b.equipped,
          isPrimary: !!b.isPrimary
        };
      }),
      gear: (((Pt = s.items) == null ? void 0 : Pt.gear) ?? []).map((b) => {
        var se, Ae, pe, ve, Te, Ne, Ie, xe, et, tt;
        const P = R(this, N, os).call(this, "gear", b.id), V = fe(((se = b.system) == null ? void 0 : se.quantity) ?? 1, 1) || 1, ne = lt(((Ae = b.system) == null ? void 0 : Ae.tags) ?? ((pe = b.system) == null ? void 0 : pe.traits) ?? []);
        return {
          id: b.id,
          accordionId: P,
          isExpanded: _(this, Qe).has(P),
          name: b.name,
          img: b.img,
          subtitle: ((ve = b.system) == null ? void 0 : ve.category) ?? b.type ?? "Gear",
          summaryStats: Rs([
            { label: "Qty", value: V, emphasis: "strong" },
            { label: "State", value: (Te = b.system) != null && Te.equipped ? "Readied" : "" }
          ]),
          detailTags: Ds([
            (Ne = b.system) != null && Ne.equipped ? "Readied" : "",
            ...ne
          ]),
          detailRows: Os([
            { label: "Quantity", value: V },
            { label: "Source", value: ((Ie = b.system) == null ? void 0 : Ie.sourceReference) ?? "" },
            { label: "Tags", value: ne.join(", ") }
          ]),
          detailText: Ps(((xe = b.system) == null ? void 0 : xe.notes) ?? ((et = b.system) == null ? void 0 : et.description)),
          equipped: !!((tt = b.system) != null && tt.equipped)
        };
      })
    }, s;
  }
  _onRender(t, s) {
    super._onRender(t, s), R(this, N, ni).call(this), R(this, N, li).call(this);
  }
  async close(t = {}) {
    return R(this, N, Js).call(this), super.close(t);
  }
  async _onEdgeSet(t, s) {
    var c, u, m;
    if (t.preventDefault(), t.stopPropagation(), !this.isEditable) return;
    const a = ((c = s == null ? void 0 : s.closest) == null ? void 0 : c.call(s, "[data-edge-pool][data-edge-value]")) ?? ((m = (u = t == null ? void 0 : t.target) == null ? void 0 : u.closest) == null ? void 0 : m.call(u, "[data-edge-pool][data-edge-value]"));
    if (!a) return;
    const i = String(a.dataset.edgePool ?? "").trim(), n = Number(a.dataset.edgeValue ?? NaN);
    if (!i || !Number.isFinite(n)) return;
    const l = this.actor.getEdgePool(i);
    if (!(l != null && l.hasPools)) return;
    let o = n;
    return n === l.effectiveValue && (o = n - 1), (t.button === 2 || t.type === "contextmenu") && (o = 0), t.altKey && (o = 0), t.shiftKey && (o = l.effectiveMax), this.actor.setEdgePoolValue(i, o);
  }
  async _onToggleCombatMenu(t, s) {
    var i, n, l, o, c, u, m;
    (i = t == null ? void 0 : t.preventDefault) == null || i.call(t), (n = t == null ? void 0 : t.stopPropagation) == null || n.call(t);
    const a = String(
      ((l = s == null ? void 0 : s.dataset) == null ? void 0 : l.combatMenu) ?? ((m = (u = (c = (o = t == null ? void 0 : t.target) == null ? void 0 : o.closest) == null ? void 0 : c.call(o, "[data-combat-menu]")) == null ? void 0 : u.dataset) == null ? void 0 : m.combatMenu) ?? ""
    ).trim();
    a && (Pe(this, Re, _(this, Re) === a ? null : a), R(this, N, he).call(this, !1));
  }
  async _onToggleStatuses(t) {
    var i, n, l, o, c, u, m, p;
    if ((i = t == null ? void 0 : t.preventDefault) == null || i.call(t), (n = t == null ? void 0 : t.stopPropagation) == null || n.call(t), !this.isEditable) return;
    const s = this.getPersistentActor() ?? this.actor, a = ((l = this.getSheetTokenDocument) == null ? void 0 : l.call(this)) ?? ((c = X.getSnapshot(s, { token: ((o = this.getSheetTokenDocument) == null ? void 0 : o.call(this)) ?? null })) == null ? void 0 : c.tokenDocument) ?? ((m = X.getSnapshot(this.actor, { token: ((u = this.getSheetTokenDocument) == null ? void 0 : u.call(this)) ?? null })) == null ? void 0 : m.tokenDocument) ?? null;
    if (!a) {
      (p = ui.notifications) == null || p.warn("Statuses require a token for this actor on the current scene.");
      return;
    }
    return Rr({
      actor: s,
      token: a
    });
  }
  async _onCombatSpend(t, s) {
    var c, u, m, p, y, h, T, S, g, k;
    if ((c = t == null ? void 0 : t.preventDefault) == null || c.call(t), (u = t == null ? void 0 : t.stopPropagation) == null || u.call(t), !this.isEditable) return;
    const a = String(((m = s == null ? void 0 : s.dataset) == null ? void 0 : m.resource) ?? "").trim(), i = Math.max(0, Number(((p = s == null ? void 0 : s.dataset) == null ? void 0 : p.cost) ?? 0)), n = String(((y = s == null ? void 0 : s.dataset) == null ? void 0 : y.combatAction) ?? "").trim(), l = String(((h = s == null ? void 0 : s.dataset) == null ? void 0 : h.combatLabel) ?? "").trim(), o = String(((T = s == null ? void 0 : s.dataset) == null ? void 0 : T.combatCostLabel) ?? "").trim();
    if (!(!a || !i || !n))
      try {
        const C = this.getPersistentActor() ?? this.actor, M = await X.spendResource(C, {
          token: ((S = this.getSheetTokenDocument) == null ? void 0 : S.call(this)) ?? X.getCurrentSceneTokenDocument(C) ?? X.getCurrentSceneTokenDocument(this.actor),
          resource: a,
          cost: i,
          actionId: n,
          actionLabel: l,
          actionCostLabel: o
        });
        if (!(M != null && M.ok)) {
          (g = ui.notifications) == null || g.warn((M == null ? void 0 : M.reason) ?? "Unable to spend action.");
          return;
        }
        R(this, N, ct).call(this, { rerender: !1 }), R(this, N, he).call(this, { force: !0 });
      } catch (C) {
        console.error("MWD | Failed to spend combat action", C), (k = ui.notifications) == null || k.error("Unable to spend action.");
      }
  }
  async _onCombatReduceBurn(t) {
    var s, a, i, n, l;
    if ((s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (a = t == null ? void 0 : t.stopPropagation) == null || a.call(t), !!this.isEditable)
      try {
        const o = this.getPersistentActor() ?? this.actor, c = await X.reduceBurn(o, {
          token: ((i = this.getSheetTokenDocument) == null ? void 0 : i.call(this)) ?? X.getCurrentSceneTokenDocument(o) ?? X.getCurrentSceneTokenDocument(this.actor)
        });
        if (!(c != null && c.ok)) {
          (n = ui.notifications) == null || n.warn((c == null ? void 0 : c.reason) ?? "Unable to reduce Burn.");
          return;
        }
        R(this, N, ct).call(this, { rerender: !1 }), R(this, N, he).call(this, { force: !0 });
      } catch (o) {
        console.error("MWD | Failed to reduce Burn", o), (l = ui.notifications) == null || l.error("Unable to reduce Burn.");
      }
  }
  async _onCombatOverloadCheck(t, s) {
    var n, l, o, c, u, m, p, y, h, T, S;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (l = t == null ? void 0 : t.stopPropagation) == null || l.call(t), !this.isEditable) return;
    const a = ((o = s == null ? void 0 : s.dataset) == null ? void 0 : o.roll) ?? ((p = (m = (u = (c = t == null ? void 0 : t.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, "[data-roll]")) == null ? void 0 : m.dataset) == null ? void 0 : p.roll);
    if (!a) return;
    let i;
    try {
      i = JSON.parse(a);
    } catch (g) {
      console.warn("MWD | Invalid overload payload", a, g);
      return;
    }
    try {
      const g = this.getPersistentActor() ?? this.actor, k = await ((T = (h = (y = game.mwd) == null ? void 0 : y.roll) == null ? void 0 : h.execute) == null ? void 0 : T.call(h, { actor: g, payload: i, event: t }));
      if (R(this, N, ct).call(this, { rerender: !1 }), !k) {
        R(this, N, he).call(this, !1);
        return;
      }
      R(this, N, he).call(this, { force: !0 });
    } catch (g) {
      console.error("MWD | Failed to launch overload check", g), (S = ui.notifications) == null || S.error("Unable to launch overload check.");
    }
  }
  async _onCombatAttack(t) {
    var l, o, c, u, m, p, y, h, T, S, g, k;
    if ((l = t == null ? void 0 : t.preventDefault) == null || l.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const s = this.getPersistentActor() ?? this.actor, a = ((c = this.getSheetTokenDocument) == null ? void 0 : c.call(this)) ?? X.getCurrentSceneTokenDocument(s) ?? X.getCurrentSceneTokenDocument(this.actor), i = X.getSnapshot(s, { token: a });
    if (!i.hasCombatant) {
      (u = ui.notifications) == null || u.warn("No combatant on the current scene.");
      return;
    }
    if (!i.isCurrentTurn) {
      (m = ui.notifications) == null || m.warn("Only available during your activation.");
      return;
    }
    if (i.overloaded) {
      (p = ui.notifications) == null || p.warn("Overloaded actors can only recover Burn.");
      return;
    }
    if (i.state.saRemaining < 2) {
      (y = ui.notifications) == null || y.warn("Need 2 SA remaining to attack.");
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
      const C = await ((S = (T = (h = game.mwd) == null ? void 0 : h.roll) == null ? void 0 : T.execute) == null ? void 0 : S.call(T, { actor: s, payload: n, event: t }));
      if (R(this, N, ct).call(this, { rerender: !1 }), !C) {
        R(this, N, he).call(this, !1);
        return;
      }
      const M = await X.spendResource(s, {
        token: a,
        resource: "sa",
        cost: 2,
        actionId: "attack",
        actionLabel: "Attack",
        actionCostLabel: "2 SA"
      });
      M != null && M.ok || (g = ui.notifications) == null || g.warn((M == null ? void 0 : M.reason) ?? "Unable to spend attack action."), R(this, N, he).call(this, { force: !0 });
    } catch (C) {
      console.error("MWD | Failed to launch attack", C), (k = ui.notifications) == null || k.error((C == null ? void 0 : C.message) ?? "Unable to launch attack.");
    }
  }
  async _onCreateOwnedItem(t, s) {
    var o, c, u;
    if ((o = t == null ? void 0 : t.preventDefault) == null || o.call(t), (c = t == null ? void 0 : t.stopPropagation) == null || c.call(t), !this.isEditable) return;
    const a = String(((u = s == null ? void 0 : s.dataset) == null ? void 0 : u.itemType) ?? "").trim();
    if (!a) return;
    const i = this.getPersistentActor() ?? this.actor, n = i.items.filter((m) => m.type === a).length, l = a === "personalWeapon" ? "Personal Weapon" : a === "armor" ? "Armor" : a.charAt(0).toUpperCase() + a.slice(1);
    await i.createEmbeddedDocuments("Item", [{
      name: `${l} ${n + 1}`,
      type: a
    }]), R(this, N, he).call(this, { force: !0 });
  }
  async _onEditOwnedItem(t, s) {
    var i, n, l;
    (i = t == null ? void 0 : t.preventDefault) == null || i.call(t), (n = t == null ? void 0 : t.stopPropagation) == null || n.call(t);
    const a = R(this, N, Wt).call(this, s, t);
    (l = a == null ? void 0 : a.sheet) == null || l.render(!0);
  }
  async _onDeleteOwnedItem(t, s) {
    var n, l;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (l = t == null ? void 0 : t.stopPropagation) == null || l.call(t), !this.isEditable) return;
    const a = R(this, N, Wt).call(this, s, t);
    if (!a) return;
    await (this.getPersistentActor() ?? this.actor).deleteEmbeddedDocuments("Item", [a.id]), R(this, N, he).call(this, { force: !0 });
  }
  async _onToggleInventoryAccordion(t, s) {
    var i, n, l, o, c, u, m, p, y, h;
    (i = t == null ? void 0 : t.preventDefault) == null || i.call(t), (n = t == null ? void 0 : t.stopPropagation) == null || n.call(t);
    const a = String(
      ((l = s == null ? void 0 : s.dataset) == null ? void 0 : l.accordionId) ?? ((u = (c = (o = s == null ? void 0 : s.closest) == null ? void 0 : o.call(s, "[data-accordion-id]")) == null ? void 0 : c.dataset) == null ? void 0 : u.accordionId) ?? ((h = (y = (p = (m = t == null ? void 0 : t.target) == null ? void 0 : m.closest) == null ? void 0 : p.call(m, "[data-accordion-id]")) == null ? void 0 : y.dataset) == null ? void 0 : h.accordionId) ?? ""
    ).trim();
    a && (_(this, Qe).has(a) ? _(this, Qe).delete(a) : _(this, Qe).add(a), R(this, N, he).call(this, !1));
  }
  async _onToggleOwnedItemEquipped(t, s) {
    var n, l, o, c;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (l = t == null ? void 0 : t.stopPropagation) == null || l.call(t), !this.isEditable) return;
    const a = R(this, N, Wt).call(this, s, t);
    if (!a) return;
    const i = this.getPersistentActor() ?? this.actor;
    await ((c = i.setOwnedItemEquipped) == null ? void 0 : c.call(i, a.id, !((o = a.system) != null && o.equipped))), R(this, N, he).call(this, { force: !0 });
  }
  async _onSetOwnedItemPrimary(t, s) {
    var n, l, o, c;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (l = t == null ? void 0 : t.stopPropagation) == null || l.call(t), !this.isEditable) return;
    const a = R(this, N, Wt).call(this, s, t);
    if (!a) return;
    const i = this.getPersistentActor() ?? this.actor;
    await ((c = i.setOwnedItemPrimary) == null ? void 0 : c.call(i, a.id, !((o = a.system) != null && o.isPrimary))), R(this, N, he).call(this, { force: !0 });
  }
  async _onAttackWeapon(t, s) {
    var n, l, o, c, u, m, p, y, h, T, S;
    (n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (l = t == null ? void 0 : t.stopPropagation) == null || l.call(t);
    const a = ((o = s == null ? void 0 : s.dataset) == null ? void 0 : o.roll) ?? ((p = (m = (u = (c = t == null ? void 0 : t.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, "[data-roll]")) == null ? void 0 : m.dataset) == null ? void 0 : p.roll);
    if (!a) return;
    let i;
    try {
      i = JSON.parse(a);
    } catch (g) {
      console.warn("MWD | Invalid attack payload", a, g);
      return;
    }
    try {
      const g = this.getPersistentActor() ?? this.actor;
      if (!await ((T = (h = (y = game.mwd) == null ? void 0 : y.roll) == null ? void 0 : h.execute) == null ? void 0 : T.call(h, { actor: g, payload: i, event: t }))) return;
      R(this, N, he).call(this, { force: !0 });
    } catch (g) {
      console.error("MWD | Failed to launch weapon attack", g), (S = ui.notifications) == null || S.error((g == null ? void 0 : g.message) ?? "Unable to attack with that weapon.");
    }
  }
};
Re = new WeakMap(), st = new WeakMap(), ut = new WeakMap(), Qe = new WeakMap(), N = new WeakSet(), ni = function() {
  R(this, N, Js).call(this), _(this, Re) && (Pe(this, st, (t) => {
    var i;
    const s = this._getRootElement();
    if (!s) return;
    const a = t.target;
    if (a instanceof Node && !((i = a.closest) != null && i.call(a, ".mwd-combat-menu"))) {
      if (!s.contains(a)) {
        R(this, N, ct).call(this);
        return;
      }
      R(this, N, ct).call(this);
    }
  }), document.addEventListener("click", _(this, st)));
}, Js = function() {
  _(this, st) && (document.removeEventListener("click", _(this, st)), Pe(this, st, null));
}, ns = function() {
  const t = this._getRootElement();
  return t ? t.querySelector(".mwd-scroll-area") ?? t.querySelector(".csb-tab-panels") : null;
}, oi = function() {
  const t = R(this, N, ns).call(this);
  if (!(t instanceof HTMLElement)) {
    Pe(this, ut, null);
    return;
  }
  Pe(this, ut, {
    top: t.scrollTop,
    left: t.scrollLeft
  });
}, li = function() {
  const t = _(this, ut);
  if (!t) return;
  const s = R(this, N, ns).call(this);
  s instanceof HTMLElement && (s.scrollTop = t.top, s.scrollLeft = t.left, requestAnimationFrame(() => {
    const a = R(this, N, ns).call(this);
    a instanceof HTMLElement && (a.scrollTop = t.top, a.scrollLeft = t.left);
  }), Pe(this, ut, null));
}, he = function(t = !1) {
  R(this, N, oi).call(this), this.render(t);
}, ct = function({ rerender: t = !0 } = {}) {
  _(this, Re) && (Pe(this, Re, null), t && R(this, N, he).call(this, !1));
}, Wt = function(t, s) {
  var i, n, l, o, c, u, m, p;
  const a = String(
    ((i = t == null ? void 0 : t.dataset) == null ? void 0 : i.itemId) ?? ((o = (l = (n = t == null ? void 0 : t.closest) == null ? void 0 : n.call(t, "[data-item-id]")) == null ? void 0 : l.dataset) == null ? void 0 : o.itemId) ?? ((p = (m = (u = (c = s == null ? void 0 : s.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, "[data-item-id]")) == null ? void 0 : m.dataset) == null ? void 0 : p.itemId) ?? ""
  ).trim();
  return a ? this.actor.items.get(a) ?? null : null;
}, os = function(t, s) {
  return `${String(t ?? "").trim()}:${String(s ?? "").trim()}`;
}, v(Q, "PARTS", {
  sheet: {
    get template() {
      return `${O}/v2/actor/character-sheet.hbs`;
    }
  }
}), v(Q, "DEFAULT_OPTIONS", foundry.utils.mergeObject(Xt(Q, Q, "DEFAULT_OPTIONS"), {
  classes: ["character-sheet", A, "actor-sheet-v2", "mwd-character-sheet", "mwd-sheet"],
  window: { minWidth: 450, minHeight: 740, resizable: !0 },
  position: { width: 980, height: 900 },
  actions: {
    ...Xt(Q, Q, "DEFAULT_OPTIONS").actions,
    edgeSet: Q.prototype._onEdgeSet,
    toggleCombatMenu: Q.prototype._onToggleCombatMenu,
    toggleStatuses: Q.prototype._onToggleStatuses,
    combatSpend: Q.prototype._onCombatSpend,
    combatReduceBurn: Q.prototype._onCombatReduceBurn,
    combatOverloadCheck: Q.prototype._onCombatOverloadCheck,
    combatAttack: Q.prototype._onCombatAttack,
    createOwnedItem: Q.prototype._onCreateOwnedItem,
    editOwnedItem: Q.prototype._onEditOwnedItem,
    deleteOwnedItem: Q.prototype._onDeleteOwnedItem,
    toggleInventoryAccordion: Q.prototype._onToggleInventoryAccordion,
    toggleOwnedItemEquipped: Q.prototype._onToggleOwnedItemEquipped,
    setOwnedItemPrimary: Q.prototype._onSetOwnedItemPrimary,
    attackWeapon: Q.prototype._onAttackWeapon
  }
}));
let Qs = Q;
class ci extends Ct {
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      classes: ["npc-sheet", A, "actor-sheet-v2"]
    });
  }
}
v(ci, "PARTS", {
  sheet: {
    get template() {
      return `${O}/actor/npc.hbs`;
    },
    scrollable: [".sheet-body"]
  }
});
class mi extends Ct {
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      classes: ["vehicle-sheet", A, "actor-sheet-v2"],
      position: { width: 860, height: 820 }
    });
  }
}
v(mi, "PARTS", {
  sheet: {
    get template() {
      return `${O}/actor/vehicle.hbs`;
    },
    scrollable: [".sheet-body"]
  }
});
class di extends Ct {
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      classes: ["battlemech-sheet", A, "actor-sheet-v2"],
      position: { width: 900, height: 820 }
    });
  }
}
v(di, "PARTS", {
  sheet: {
    get template() {
      return `${O}/actor/battlemech.hbs`;
    },
    scrollable: [".sheet-body"]
  }
});
function Xr() {
  console.log(`${z}Registering Actor sheets (V2)`);
  const { Actors: r } = foundry.documents.collections;
  r.registerSheet(A, Qs, {
    types: ["character"],
    makeDefault: !0,
    label: "Character (V2)"
  }), r.registerSheet(A, ci, {
    types: ["npc"],
    makeDefault: !0,
    label: "NPC (V2)"
  }), r.registerSheet(A, mi, {
    types: ["vehicle"],
    makeDefault: !0,
    label: "Vehicle (V2)"
  }), r.registerSheet(A, di, {
    types: ["battlemech"],
    makeDefault: !0,
    label: "BattleMech (V2)"
  });
}
const { HandlebarsApplicationMixin: Zr } = foundry.applications.api;
var mt, dt, Ht;
const ce = class ce extends Zr(foundry.applications.sheets.ItemSheetV2) {
  constructor() {
    super(...arguments);
    le(this, dt);
    le(this, mt, /* @__PURE__ */ new Map());
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
      classes: ["sheet", "item", A, "appv2", "mwd-sheet", "item-sheet"],
      position: {
        width: 760,
        height: 860
      },
      window: {
        resizable: !0
      },
      actions: {
        editImage: ce._onEditImage,
        tab: ce.prototype._onClickTab,
        checkbarElement: ce._onClickCheckbar,
        modifierAdd: ce._onModifierAdd,
        modifierDelete: ce._onModifierDelete,
        modifierValueChange: ce._onModifierValueChange,
        modifierConditionChange: ce._onModifierConditionChange,
        modifierSelectionChange: ce._onModifierSelectionChange,
        effectCreate: ce._onEffectCreate,
        effectEdit: ce._onEffectEdit,
        effectDelete: ce._onEffectDelete,
        effectToggleDisabled: ce._onEffectToggleDisabled
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
    const a = ((c = (o = (l = (n = game.system) == null ? void 0 : n.mwd) == null ? void 0 : l.styles) == null ? void 0 : o.selectCssClass) == null ? void 0 : c.call(o)) ?? "mwd-theme-default", i = ["mwd-theme-default", "mwd-theme-sra"];
    return t.classes = t.classes.filter((u) => !i.includes(u)), t.classes.push(a), t;
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
      const a = this._getCanonicalItemType();
      return {
        [d.itemType.mechWeapon]: `${O}/v2/item/mech-weapon-root.hbs`,
        [d.itemType.armor]: `${O}/v2/item/armor.hbs`
      }[a] ?? `${O}/v2/item/${a}.hbs`;
    }
    return ((s = super._getPartTemplate) == null ? void 0 : s.call(this, t)) ?? "";
  }
  /**
   * Override title to show localized item type and name.
   * @override
   */
  get title() {
    const t = this._getCanonicalItemType();
    return `${Y.itemType.singular[t] ?? t}: ${this.item.name}`;
  }
  /**
   * Prepare context data for rendering.
   * @param {object} options - Rendering options
   * @returns {Promise<object>} The context object
   * @override
   */
  async _prepareContext(t) {
    var U, W, ie, ge, ue, ye;
    const s = await super._prepareContext(t), a = ((W = (U = game.system.mwd.modifiers) == null ? void 0 : U.getEnums) == null ? void 0 : W.call(U)) ?? {}, i = foundry.utils.deepClone((s == null ? void 0 : s.options) ?? {}), n = ((ge = (ie = this.item.actor) == null ? void 0 : ie.getAttributes) == null ? void 0 : ge.call(ie, this.item)) ?? [], l = this._getCanonicalItemType(), o = !this.item.actor, c = !!this.item.actor, u = Y.itemType.singular[l] ?? l, m = this._getEffectEntries(), p = m.filter((re) => re.syncedCount > 0).length, y = this.constructor.LAYOUT_ID, h = this.item.actor ? (re) => n.includes(re) : (re) => !0, T = l === d.itemType.skill, g = ["mwd", "item-sheet", this.isEditable ? "editable" : "locked"], k = g.join(" ");
    i.classes = g, i.cssClass = k;
    const C = await foundry.applications.ux.TextEditor.implementation.enrichHTML(this.item.system.description ?? "", {
      async: !0,
      secrets: this.item.isOwner,
      relativeTo: this.item
    }), M = game.user.isGM && this.item.system.gmnotes ? await foundry.applications.ux.TextEditor.implementation.enrichHTML(this.item.system.gmnotes, {
      async: !0,
      secrets: !0,
      relativeTo: this.item
    }) : "", x = foundry.utils.mergeObject(s, {
      // Item data
      item: this.item,
      data: this.item,
      system: this.item.system,
      // Enriched content
      enrichedDescription: C,
      enrichedGMNotes: M,
      // Options for templates
      options: {
        ...i,
        isGM: game.user.isGM,
        limited: !this.document.isOwner,
        owner: this.document.isOwner,
        isOwned: !!this.item.actor,
        editable: this.isEditable,
        cssClass: k,
        viewMode: !1
        // Items don't have view mode like actors do
      },
      // Configuration data
      ENUMS: foundry.utils.mergeObject(
        G.getEnums(h, T),
        a
      ),
      MWD: Y,
      itemSheet: {
        canonicalType: l,
        typeLabel: u,
        isArmorSheet: l === d.itemType.armor,
        isStandalone: o,
        canUseActorControls: c,
        supportsEffectSync: !!((ye = (ue = this.item).supportsEquippedEffectSync) != null && ye.call(ue)),
        effectEntries: m,
        effectCount: m.length,
        syncedEffectCount: p,
        summaryChips: this._getSummaryChips(),
        stateChips: this._getStateChips(m)
      },
      // CSS class for form element
      cssClass: k,
      // Tab configuration
      tabs: this._getTabs()
    });
    return y && (x.layout = await ds.get(y)), x;
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
    var a, i, n;
    const s = [];
    return s.push({ kind: "ownership", label: this.item.actor ? "Owned Item" : "World Item" }), Object.prototype.hasOwnProperty.call(this.item.system ?? {}, "equipped") && s.push({
      kind: "equipment",
      label: (a = this.item.system) != null && a.equipped ? "Equipped" : "Unequipped",
      tone: (i = this.item.system) != null && i.equipped ? "active" : "muted"
    }), Object.prototype.hasOwnProperty.call(this.item.system ?? {}, "isPrimary") && ((n = this.item.system) != null && n.isPrimary) && s.push({ kind: "role", label: "Primary", tone: "accent" }), t.length && s.push({
      kind: "effects",
      label: `${t.length} Effect${t.length === 1 ? "" : "s"}`,
      tone: t.some((l) => l.syncedCount > 0) ? "active" : "muted"
    }), s;
  }
  _getEffectEntries() {
    var a, i, n, l, o, c;
    const t = /* @__PURE__ */ new Map(), s = ((i = (a = this.item).getSyncedActorEffects) == null ? void 0 : i.call(a)) ?? [];
    for (const u of s) {
      const m = (o = (l = (n = u.flags) == null ? void 0 : n[A]) == null ? void 0 : l.equippedItemSync) == null ? void 0 : o.sourceEffectId;
      if (!m) continue;
      const p = t.get(m) ?? [];
      p.push(u), t.set(m, p);
    }
    return Array.from(((c = this.item.effects) == null ? void 0 : c.contents) ?? []).map((u) => {
      var p, y, h, T, S, g, k;
      const m = t.get(u.id) ?? [];
      return {
        id: u.id,
        name: u.name || "New Effect",
        img: u.img || "icons/svg/aura.svg",
        disabled: !!u.disabled,
        transfer: !!u.transfer,
        changesCount: Array.isArray(u.changes) ? u.changes.length : 0,
        statusesCount: Number(((p = u.statuses) == null ? void 0 : p.size) ?? ((y = u.statuses) == null ? void 0 : y.length) ?? 0),
        durationLabel: (h = u.duration) != null && h.seconds ? `${u.duration.seconds}s` : (T = u.duration) != null && T.rounds ? `${u.duration.rounds} rounds` : "Passive",
        syncedCount: m.length,
        syncLabel: this.item.actor ? (g = (S = this.item).supportsEquippedEffectSync) != null && g.call(S) ? (k = this.item.system) != null && k.equipped ? m.length ? `Synced to actor (${m.length})` : "Pending sync" : "Applies when equipped" : "No equip sync" : "World item"
      };
    });
  }
  _getRootElement() {
    var t;
    return this.element instanceof HTMLElement ? this.element : (t = this.element) == null ? void 0 : t[0];
  }
  _onClickTab(t, s) {
    var o, c, u;
    const a = ((o = s == null ? void 0 : s.closest) == null ? void 0 : o.call(s, ".csb-tab-link[data-tab]")) ?? ((u = (c = t == null ? void 0 : t.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, ".csb-tab-link[data-tab]"));
    if (!a) return;
    const i = a.closest(".csb-tabs");
    if (!i) return;
    const n = i.dataset.group || "default", l = a.dataset.tab;
    l && (_(this, mt).set(n, l), R(this, dt, Ht).call(this, this._getRootElement(), n, l));
  }
  _onRender(t, s) {
    var i, n, l, o;
    (i = super._onRender) == null || i.call(this, t, s), (n = this.window) != null && n.title && (this.window.title.textContent = this.title);
    const a = this._getRootElement();
    if (a) {
      for (const c of a.querySelectorAll(".sheet-tabs")) {
        const u = c.dataset.group || "default", m = Array.from(c.querySelectorAll("[data-tab]"));
        if (!m.length) continue;
        for (const T of m)
          T.addEventListener("click", (S) => {
            S.preventDefault(), S.stopPropagation();
            const g = T.dataset.tab;
            g && (_(this, mt).set(u, g), R(this, dt, Ht).call(this, a, u, g));
          });
        const p = _(this, mt).get(u), y = c.dataset.default || ((l = m[0]) == null ? void 0 : l.dataset.tab), h = p || y;
        h && R(this, dt, Ht).call(this, a, u, h);
      }
      for (const c of a.querySelectorAll(".csb-tabs")) {
        const u = c.dataset.group || "default", m = Array.from(c.querySelectorAll(".csb-tab-link[data-tab]"));
        if (!m.length) continue;
        const p = _(this, mt).get(u), y = c.dataset.default || ((o = m[0]) == null ? void 0 : o.dataset.tab), h = p || y;
        h && R(this, dt, Ht).call(this, a, u, h);
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
    const a = this.item;
    if (!a.parent) return;
    const i = s.closest(".checkbar-root");
    if (!i) return;
    const n = i.dataset.monitorCode, l = Number.parseInt(s.dataset.index), o = s.dataset.checked === "true";
    await a.parent.switchMonitorCheck(n, l, o);
  }
  static async _onEditImage(t) {
    var i, n, l;
    if ((i = t == null ? void 0 : t.preventDefault) == null || i.call(t), (n = t == null ? void 0 : t.stopPropagation) == null || n.call(t), !this.isEditable) return;
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
    const a = s.closest(".define-modifier");
    if (!a) return;
    const i = a.dataset.modifierId;
    i && await this.item.deleteModifier(i);
  }
  /**
   * Handle changing a modifier's value.
   * @param {Event} event - The triggering event
   * @param {HTMLElement} target - The input element
   * @returns {Promise<void>}
   * @static
   */
  static async _onModifierValueChange(t, s) {
    const a = s.closest(".define-modifier");
    if (!a) return;
    const i = a.dataset.modifierId;
    i && await this.item.changeModifierValue(i, s.value);
  }
  /**
   * Handle changing a modifier's condition.
   * @param {Event} event - The triggering event
   * @param {HTMLElement} target - The input element
   * @returns {Promise<void>}
   * @static
   */
  static async _onModifierConditionChange(t, s) {
    const a = s.closest(".define-modifier");
    if (!a) return;
    const i = a.dataset.modifierId;
    i && await this.item.changeModifierCondition(i, s.value);
  }
  /**
   * Handle changing a modifier's selection (dropdown).
   * @param {Event} event - The triggering event
   * @param {HTMLElement} target - The select element
   * @returns {Promise<void>}
   * @static
   */
  static async _onModifierSelectionChange(t, s) {
    const a = s.closest(".define-modifier");
    if (!a) return;
    const i = a.dataset.modifierId, n = s.dataset.modifierSelect;
    i && n && await this.item.changeModifierSelection(i, n, s.value);
  }
  static async _onEffectCreate(t, s) {
    var i, n, l;
    (i = t == null ? void 0 : t.preventDefault) == null || i.call(t), (n = t == null ? void 0 : t.stopPropagation) == null || n.call(t);
    const [a] = await this.item.createEmbeddedDocuments("ActiveEffect", [{
      name: `${this.item.name} Effect`,
      img: this.item.img || "icons/svg/aura.svg",
      disabled: !1,
      transfer: !1,
      changes: []
    }]);
    (l = a == null ? void 0 : a.sheet) == null || l.render(!0);
  }
  static async _onEffectEdit(t, s) {
    var n, l, o, c, u, m, p;
    (n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (l = t == null ? void 0 : t.stopPropagation) == null || l.call(t);
    const a = ((o = s == null ? void 0 : s.dataset) == null ? void 0 : o.effectId) ?? ((m = (u = (c = s == null ? void 0 : s.closest) == null ? void 0 : c.call(s, "[data-effect-id]")) == null ? void 0 : u.dataset) == null ? void 0 : m.effectId);
    if (!a) return;
    const i = this.item.effects.get(a);
    (p = i == null ? void 0 : i.sheet) == null || p.render(!0);
  }
  static async _onEffectDelete(t, s) {
    var i, n, l, o, c, u;
    (i = t == null ? void 0 : t.preventDefault) == null || i.call(t), (n = t == null ? void 0 : t.stopPropagation) == null || n.call(t);
    const a = ((l = s == null ? void 0 : s.dataset) == null ? void 0 : l.effectId) ?? ((u = (c = (o = s == null ? void 0 : s.closest) == null ? void 0 : o.call(s, "[data-effect-id]")) == null ? void 0 : c.dataset) == null ? void 0 : u.effectId);
    a && await this.item.deleteEmbeddedDocuments("ActiveEffect", [a]);
  }
  static async _onEffectToggleDisabled(t, s) {
    var n, l, o, c, u, m;
    (n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (l = t == null ? void 0 : t.stopPropagation) == null || l.call(t);
    const a = ((o = s == null ? void 0 : s.dataset) == null ? void 0 : o.effectId) ?? ((m = (u = (c = s == null ? void 0 : s.closest) == null ? void 0 : c.call(s, "[data-effect-id]")) == null ? void 0 : u.dataset) == null ? void 0 : m.effectId);
    if (!a) return;
    const i = this.item.effects.get(a);
    i && await i.update({ disabled: !i.disabled });
  }
};
mt = new WeakMap(), dt = new WeakSet(), Ht = function(t, s, a) {
  t && (t.querySelectorAll(`.csb-tabs[data-group="${s}"] .csb-tab-link[data-tab]`).forEach((i) => {
    i.classList.toggle("is-active", i.dataset.tab === a);
  }), t.querySelectorAll(`.csb-tabs[data-group="${s}"] .csb-tab-panel[data-tab]`).forEach((i) => {
    i.classList.toggle("is-active", i.dataset.tab === a);
  }), t.querySelectorAll(".sheet-tabs [data-tab]").forEach((i) => {
    var l;
    (((l = i.closest(".sheet-tabs")) == null ? void 0 : l.dataset.group) || "default") === s && i.classList.toggle("active", i.dataset.tab === a);
  }), t.querySelectorAll(`.tab[data-group="${s}"]`).forEach((i) => {
    i.classList.toggle("active", i.dataset.tab === a);
  }));
}, v(ce, "LAYOUT_ID", null), /** @override */
v(ce, "PARTS", {
  sheet: {
    template: "",
    // Set dynamically in _getPartTemplate
    scrollable: [".sheet-body"]
  }
}), v(ce, "TABS", {
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
let Ue = ce;
class pi extends Ue {
}
v(pi, "PARTS", {
  sheet: {
    template: `${O}/v2/item/contact.hbs`,
    scrollable: [".sheet-body"]
  }
});
class hi extends Ue {
}
v(hi, "PARTS", {
  sheet: {
    template: `${O}/v2/item/gear.hbs`,
    scrollable: [".sheet-body"]
  }
});
class fi extends Ue {
}
v(fi, "PARTS", {
  sheet: {
    template: `${O}/v2/item/quality.hbs`,
    scrollable: [".sheet-body"]
  }
});
class gi extends Ue {
}
v(gi, "PARTS", {
  sheet: {
    template: `${O}/v2/item/assetModule.hbs`,
    scrollable: [".sheet-body"]
  }
});
class yi extends Ue {
}
v(yi, "PARTS", {
  sheet: {
    template: `${O}/v2/item/lifeModule.hbs`,
    scrollable: [".sheet-body"]
  }
});
class bi extends Ue {
}
v(bi, "PARTS", {
  sheet: {
    template: `${O}/v2/item/skill.hbs`,
    scrollable: [".sheet-body"]
  }
});
const en = Object.freeze([
  "firearms",
  "projectileWeapons",
  "heavyWeapons",
  "meleeCombat"
]), tn = Object.freeze([
  { value: "energy", label: "Energy" },
  { value: "kinetic", label: "Kinetic" },
  { value: "ballistic", label: "Ballistic" },
  { value: "explosive", label: "Explosive" },
  { value: "plasma", label: "Plasma" },
  { value: "electrical", label: "Electrical" },
  { value: "melee", label: "Melee" },
  { value: "none", label: "None" }
]);
function Da(r, e, t) {
  const s = String(e ?? "").trim();
  return !s || r.some((a) => a.value === s) ? r : r.concat({ value: s, label: t(s) });
}
class ys extends Ue {
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
    var o, c, u, m, p, y;
    const t = await super._prepareContext(e), s = this._getCanonicalItemType();
    t.ENUMS = foundry.utils.mergeObject(
      { defenses: J.getDefenses() },
      t.ENUMS
    );
    const a = Array.isArray((o = t.ENUMS) == null ? void 0 : o.skills) ? t.ENUMS.skills : [], i = (c = this.item.system) == null ? void 0 : c.skill, n = (u = this.item.system) == null ? void 0 : u.damageType, l = s === "personalWeapon" ? Da(
      a.filter((h) => en.includes(h.value)),
      i,
      (h) => {
        var T;
        return ((T = a.find((S) => S.value === h)) == null ? void 0 : T.label) ?? h;
      }
    ) : a;
    return t.weaponProfile = ((p = (m = this.item).getCombatProfile) == null ? void 0 : p.call(m)) ?? null, t.weaponEditor = {
      skills: l,
      categories: [
        { value: "melee", label: "Melee" },
        { value: "ranged", label: "Ranged" },
        { value: "thrown", label: "Thrown" },
        { value: "other", label: "Other" }
      ],
      damageTypes: Da(
        s === "personalWeapon" ? [...cs] : [...tn],
        n,
        (h) => s === "personalWeapon" ? at(h) : h
      ),
      ranges: At.RANGE_ORDER.map((h) => ({
        value: h,
        label: h.charAt(0).toUpperCase() + h.slice(1)
      })),
      standardTraits: [...$i],
      ammoDamageTypes: [{ value: "", label: "Use Weapon Default" }, ...cs]
    }, t.itemSheet = foundry.utils.mergeObject(t.itemSheet ?? {}, {
      isCompactWeaponSheet: !0,
      weaponSheetVariant: s === "mechWeapon" ? "mech" : "personal"
    }), t.itemSheet.stateChips = (t.itemSheet.stateChips ?? []).filter((h) => h.kind !== "ownership"), t.itemSheet.currentAmmoLabel = ((y = t.weaponProfile) == null ? void 0 : y.ammoLabel) ?? "", t;
  }
  /**
   * Handle changing the weapon skill, which updates the defense attribute.
   * @param {Event} event - The triggering event
   * @param {HTMLElement} target - The changed select element
   * @static
   * @async
   */
  static async _onWeaponSkillChange(e, t) {
    var i, n;
    const s = t.value, a = (n = (i = game.system.mwd.skills) == null ? void 0 : i.get) == null ? void 0 : n.call(i, s);
    a != null && a.defense && await this.item.update({ "system.defense": a.defense }, { render: !1 });
  }
}
const Ut = class Ut extends ys {
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
        attackWeapon: Ut._onAttackWeapon
      }
    }, { inplace: !1 });
  }
  async _prepareContext(e) {
    var i, n, l;
    const t = await super._prepareContext(e), s = this.item.actor ?? null, a = !!(s && typeof s.isCharacterLike == "function" && s.isCharacterLike() && ((n = (i = this.item).isPersonalWeapon) != null && n.call(i)));
    return t.itemSheet = foundry.utils.mergeObject(t.itemSheet ?? {}, {
      canAttack: a,
      attackDisabled: !a || !((l = this.item.system) != null && l.equipped)
    }), t.itemSheet.summaryChips = this._getSummaryChips(t.weaponProfile ?? null), t;
  }
  _getSummaryChips(e = ((t) => ((s) => (s = (t = this.item).getCombatProfile) == null ? void 0 : s.call(t))())() ?? null) {
    var a, i, n;
    return e ? [
      { label: "Category", value: String(e.category ?? "").trim() || "Ranged" },
      { label: "Skill", value: ((a = e.skillDef) == null ? void 0 : a.label) ?? e.skill ?? "Firearms" },
      { label: "DV", value: String(Number(e.damage ?? 0)) },
      { label: "AP", value: String(Number(e.ap ?? 0)) },
      { label: "Type", value: at(e.damageType) || "Penetrating" },
      { label: "Range", value: String(((i = e.range) == null ? void 0 : i.max) ?? "near").trim() || "Near" },
      (n = e == null ? void 0 : e.ammoState) != null && n.isTracked ? { label: "Ammo", value: `${Number(e.ammoState.current ?? 0)}/${Number(e.ammoState.max ?? 0)}` } : { label: "Ammo", value: (e == null ? void 0 : e.ammoLabel) || "Untracked" }
    ] : [];
  }
  static async _onAttackWeapon(e) {
    var s, a, i, n, l, o;
    (s = e == null ? void 0 : e.preventDefault) == null || s.call(e), (a = e == null ? void 0 : e.stopPropagation) == null || a.call(e);
    const t = this.item.actor ?? null;
    !t || !((n = (i = this.item).isPersonalWeapon) != null && n.call(i)) || await game.mwd.roll.execute({
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
    var a, i;
    (a = super._onRender) == null || a.call(this, e, t);
    const s = (i = this._getRootElement) == null ? void 0 : i.call(this);
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
v(Ut, "LAYOUT_ID", "personal-weapon"), v(Ut, "PARTS", {
  sheet: {
    template: `${O}/v2/item/personal-weapon-root.hbs`,
    scrollable: [".sheet-body"]
  }
});
let Xs = Ut;
class Zs extends ys {
}
v(Zs, "LAYOUT_ID", "mech-weapon"), v(Zs, "PARTS", {
  sheet: {
    template: `${O}/v2/item/mech-weapon-root.hbs`,
    scrollable: [".sheet-body"]
  }
});
class ea extends Ue {
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
    var o, c, u, m, p, y, h, T, S;
    const t = await super._prepareContext(e), s = this.item, a = s.actor ?? null, i = ((o = a == null ? void 0 : a.getPersonalCombatLoadout) == null ? void 0 : o.call(a)) ?? null, n = ((c = i == null ? void 0 : i.activeArmor) == null ? void 0 : c.id) ?? null, l = ((u = i == null ? void 0 : i.activeArmor) == null ? void 0 : u.id) === s.id ? i.activeArmor : null;
    return t.armorState = l, t.isActiveArmor = n === s.id, t.effectiveDurabilityCurrent = Number(
      ((m = l == null ? void 0 : l.durability) == null ? void 0 : m.current) ?? ((y = (p = s.system) == null ? void 0 : p.durability) == null ? void 0 : y.current) ?? ((T = (h = s.system) == null ? void 0 : h.durability) == null ? void 0 : T.max) ?? ((S = s.system) == null ? void 0 : S.rating) ?? 0
    ), t.itemSheet = foundry.utils.mergeObject(t.itemSheet ?? {}, {}), t.itemSheet.summaryChips = this._getSummaryChips(l), t.armorEditor = {
      standardTraits: [...Wi]
    }, t;
  }
  _getSummaryChips(e = null) {
    var i, n, l, o, c, u, m, p, y, h, T, S, g;
    const t = this.item.system ?? {}, s = [
      { label: "Rating", value: String(Number((e == null ? void 0 : e.ratingCurrent) ?? t.rating ?? 0)) },
      { label: "Defense", value: String(Number(t.defenseBonus ?? 0)) },
      {
        label: "Durability",
        value: `${Number(((i = e == null ? void 0 : e.durability) == null ? void 0 : i.current) ?? ((n = t.durability) == null ? void 0 : n.current) ?? ((l = t.durability) == null ? void 0 : l.max) ?? 0)}/${Number(((o = e == null ? void 0 : e.durability) == null ? void 0 : o.max) ?? ((c = t.durability) == null ? void 0 : c.max) ?? t.rating ?? 0)}`
      },
      {
        label: "Resist",
        value: String(Number((e == null ? void 0 : e.baseMitigation) ?? (e == null ? void 0 : e.baseResistance) ?? 0))
      }
    ], a = Number(((m = (u = e == null ? void 0 : e.traitState) == null ? void 0 : u.reinforced) == null ? void 0 : m.max) ?? ((y = (p = t == null ? void 0 : t.traitState) == null ? void 0 : p.reinforced) == null ? void 0 : y.max) ?? 0);
    return a > 0 && s.push({
      label: "Reinforced",
      value: `${Number(((T = (h = e == null ? void 0 : e.traitState) == null ? void 0 : h.reinforced) == null ? void 0 : T.current) ?? ((g = (S = t == null ? void 0 : t.traitState) == null ? void 0 : S.reinforced) == null ? void 0 : g.current) ?? 0)}/${a}`
    }), s;
  }
  _onRender(e, t) {
    var a, i;
    (a = super._onRender) == null || a.call(this, e, t);
    const s = (i = this._getRootElement) == null ? void 0 : i.call(this);
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
v(ea, "LAYOUT_ID", "armor"), v(ea, "PARTS", {
  sheet: {
    template: `${O}/v2/item/armor-root.hbs`,
    scrollable: [".sheet-body"]
  }
});
function sn() {
  console.log(`${z}Registering Item sheets (V2)`);
  const { Items: r } = foundry.documents.collections;
  r.registerSheet(A, pi, { types: ["contact"], makeDefault: !0, label: "Contact (V2)" }), r.registerSheet(A, hi, { types: ["gear"], makeDefault: !0, label: "Gear (V2)" }), r.registerSheet(A, fi, { types: ["quality"], makeDefault: !0, label: "Quality (V2)" }), r.registerSheet(A, gi, { types: ["assetModule"], makeDefault: !0, label: "Asset Module (V2)" }), r.registerSheet(A, yi, { types: ["lifeModule"], makeDefault: !0, label: "Life Module (V2)" }), r.registerSheet(A, bi, { types: ["skill"], makeDefault: !0, label: "Skill (V2)" }), r.registerSheet(A, Xs, { types: ["personalWeapon", "weapon"], makeDefault: !0, label: "Personal Weapon (V2)" }), r.registerSheet(A, Zs, { types: ["mechWeapon"], makeDefault: !0, label: "Mech Weapon (V2)" }), r.registerSheet(A, ea, { types: ["armor"], makeDefault: !0, label: "Armor (V2)" });
}
const Oa = [
  // UI (CSB render entry point + node types)
  `systems/${A}/templates/v2/ui/layout-root.hbs`,
  `systems/${A}/templates/v2/ui/nodes/hexabox.hbs`,
  `systems/${A}/templates/v2/ui/nodes/stack.hbs`,
  `systems/${A}/templates/v2/ui/nodes/panel.hbs`,
  `systems/${A}/templates/v2/ui/nodes/include.hbs`,
  `systems/${A}/templates/v2/ui/nodes/tabs.hbs`,
  `systems/${A}/templates/v2/ui/nodes/unknown.hbs`,
  `systems/${A}/templates/common/view-mode.hbs`,
  `systems/${A}/templates/common/label.hbs`,
  `systems/${A}/templates/common/enum-value-label.hbs`,
  `systems/${A}/templates/common/damage-code.hbs`,
  `systems/${A}/templates/common/damage-armor.hbs`,
  `systems/${A}/templates/v2/ui/mod-stepper.hbs`,
  `systems/${A}/templates/v2/ui/condition-monitors.hbs`,
  `systems/${A}/templates/v2/roll/_mwd-roll-card.hbs`,
  // Character UI
  `systems/${A}/templates/v2/ui/character/attributes.hbs`,
  `systems/${A}/templates/v2/ui/character/combat-actions.hbs`,
  `systems/${A}/templates/v2/ui/character/skills-column.hbs`,
  `systems/${A}/templates/v2/ui/character/skill-row.hbs`,
  `systems/${A}/templates/v2/ui/character/edge-console.hbs`,
  `systems/${A}/templates/v2/ui/character/burn-monitor.hbs`,
  `systems/${A}/templates/v2/ui/character/status-dashboard.hbs`,
  `systems/${A}/templates/v2/ui/character/inventory-section.hbs`,
  `systems/${A}/templates/v2/ui/character/inventory-record.hbs`,
  // Sheet wrapper
  `systems/${A}/templates/v2/actor/_sheet-root.hbs`,
  // Placeholders
  `systems/${A}/templates/v2/ui/placeholders/assigned-systems.hbs`,
  `systems/${A}/templates/v2/ui/placeholders/inventory-gear.hbs`,
  `systems/${A}/templates/v2/ui/placeholders/inventory-armor.hbs`,
  `systems/${A}/templates/v2/ui/placeholders/inventory-weapons.hbs`,
  `systems/${A}/templates/v2/ui/placeholders/bio-description.hbs`,
  // V2 item partials
  `systems/${A}/templates/v2/item/_item-sheet-root.hbs`,
  `systems/${A}/templates/v2/item/personal-weapon-root.hbs`,
  `systems/${A}/templates/v2/item/mech-weapon-root.hbs`,
  `systems/${A}/templates/v2/item/armor-root.hbs`,
  `systems/${A}/templates/v2/item/parts/itemname.hbs`,
  `systems/${A}/templates/v2/item/parts/inactive.hbs`,
  `systems/${A}/templates/v2/item/parts/references.hbs`,
  `systems/${A}/templates/v2/item/parts/modifier.hbs`,
  `systems/${A}/templates/v2/item/parts/modifiers.hbs`,
  `systems/${A}/templates/v2/item/parts/weapon-main.hbs`,
  `systems/${A}/templates/v2/item/parts/weapon-compact-main.hbs`,
  `systems/${A}/templates/v2/item/parts/weapon-summary-hero.hbs`,
  `systems/${A}/templates/v2/item/parts/weapon-combat-essentials.hbs`,
  `systems/${A}/templates/v2/item/parts/weapon-usage-bands.hbs`,
  `systems/${A}/templates/v2/item/parts/weapon-standard-traits.hbs`,
  `systems/${A}/templates/v2/item/parts/weapon-ammo-profiles.hbs`,
  `systems/${A}/templates/v2/item/parts/weapon-notes-reference.hbs`,
  `systems/${A}/templates/v2/item/parts/armor-main.hbs`,
  `systems/${A}/templates/v2/item/parts/armor-summary-hero.hbs`,
  `systems/${A}/templates/v2/item/parts/armor-combat-essentials.hbs`,
  `systems/${A}/templates/v2/item/parts/armor-usage-protection.hbs`,
  `systems/${A}/templates/v2/item/parts/armor-identity-fields.hbs`,
  `systems/${A}/templates/v2/item/parts/armor-standard-traits.hbs`,
  `systems/${A}/templates/v2/item/parts/armor-notes-reference.hbs`,
  `systems/${A}/templates/v2/item/parts/item-effects.hbs`,
  // Actors
  `systems/${A}/templates/v2/actor/character-sheet.hbs`
];
function an(r) {
  const e = String(r).replaceAll("\\", "/"), t = `systems/${A}/templates/`, s = e.indexOf(t);
  return `mwd.${(s >= 0 ? e.slice(s + t.length) : e).replace(/\.hbs$/i, "").split("/").filter(Boolean).map((l) => l.replace(/^_+/, "")).join(".")}`;
}
function rn() {
  var r, e;
  return ((e = (r = foundry == null ? void 0 : foundry.applications) == null ? void 0 : r.handlebars) == null ? void 0 : e.Handlebars) ?? Handlebars;
}
async function nn() {
  var e, t;
  const r = rn();
  try {
    const s = {};
    for (const i of Oa)
      s[an(i)] = i, s[i] = i;
    await foundry.applications.handlebars.loadTemplates(s);
    const a = "mwd.v2.ui.layout-root";
    if (!((e = Handlebars.partials) != null && e[a])) {
      const i = Object.keys(Handlebars.partials ?? {});
      throw console.error("Missing required partial:", a), console.error("Closest matches:", i.filter((n) => n.includes("layout-root"))), new Error(`Template preload failed: ${a} not registered`);
    }
    if (r !== Handlebars) {
      for (const [i, n] of Object.entries(r.partials ?? {}))
        if (!((t = Handlebars.partials) != null && t[i]))
          try {
            Handlebars.registerPartial(i, n);
          } catch {
          }
    }
    console.log(`${z}preloadTemplatesV2 OK`, { loaded: Oa.length });
  } catch (s) {
    throw console.error(`${z}preloadTemplatesV2 FAILED`, s), s;
  }
}
function Na(r) {
  const e = Math.max(0, Number(r) || 0);
  return -Math.floor(e / 3);
}
function on(r) {
  const e = Math.max(0, Number(r) || 0);
  return e === 0 ? 0 : Math.ceil(e / 4);
}
function ln(r = {}) {
  const e = r.physical ?? {}, t = r.fatigue ?? {}, s = r.armor ?? {}, a = Number(e.value) || 0, i = Number(t.value) || 0, n = Math.max(Number(s.value) || 0, Number(s.max) || 0);
  return {
    physical: { penalty: Na(a) },
    fatigue: { penalty: Na(i) },
    armor: { resistance: on(n) }
  };
}
const Ns = {
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
function cn(r, e, t, s) {
  const a = r.system ?? {}, i = `monitors.${e}`, n = Number(foundry.utils.getProperty(a, `${i}.max`)) || 0, l = Number(foundry.utils.getProperty(a, `${i}.value`)) || 0;
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
function un(r = {}) {
  return Object.entries(Je(r)).filter(([, e]) => Number(e) > 0).map(([e, t]) => `${e} +${t}`).join(", ");
}
class mn extends Actor {
  /* -------------------------------------------- */
  /* Base & Derived Data                           */
  /* -------------------------------------------- */
  /** @override */
  prepareBaseData() {
    var e, t;
    if (super.prepareBaseData(), this.isCharacterLike()) {
      const s = this.system ?? {};
      if (nr(s), (e = s.skills) != null && e.skills && typeof s.skills.skills == "object") {
        for (const [a, i] of Object.entries(s.skills.skills))
          (t = s.skills)[a] ?? (t[a] = i);
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
      for (const a of Object.values(e)) {
        if (!a || typeof a != "object") continue;
        a.rating = Math.max(0, Number(a.rating ?? 0));
        const i = Object.prototype.hasOwnProperty.call(a, "value"), n = Number(a.value);
        (!i || !Number.isFinite(n)) && (a.value = a.rating), "max" in a && delete a.max;
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
      const a = ((s = (t = this.system) == null ? void 0 : t.counters) == null ? void 0 : s.edgePools) ?? {}, i = {};
      for (const [n, l] of Object.entries(a)) {
        const o = Math.max(0, Number((l == null ? void 0 : l.rating) ?? 0)), c = Math.max(0, Number((l == null ? void 0 : l.value) ?? 0)), u = Math.min(o, e), m = Math.min(c, u);
        i[n] = {
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
      this._mwdDerived.edgePools = { cap: e, pools: i };
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
    var t, s, a;
    return Math.max(0, Number(((a = (s = (t = this.system) == null ? void 0 : t.attributes) == null ? void 0 : s[e]) == null ? void 0 : a.value) ?? 0));
  }
  getSkillRating(e) {
    var t, s, a;
    return Math.max(0, Number(((a = (s = (t = this.system) == null ? void 0 : t.skills) == null ? void 0 : s[e]) == null ? void 0 : a.rating) ?? 0));
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
      const a = (s = this._mwdDerived) == null ? void 0 : s.personalCombat;
      if (a) return a;
    }
    const t = this._computePersonalCombatLoadout();
    return this._mwdDerived ?? (this._mwdDerived = {}), this._mwdDerived.personalCombat = t, t;
  }
  _computePersonalCombatLoadout() {
    const e = [], t = this.items.filter((y) => {
      var h;
      return ((h = y.isPersonalWeapon) == null ? void 0 : h.call(y)) ?? y.type === d.itemType.personalWeapon;
    }).map((y) => {
      var h;
      return ((h = y.getCombatProfile) == null ? void 0 : h.call(y)) ?? null;
    }).filter(Boolean), s = this.items.filter((y) => {
      var h;
      return ((h = y.isArmor) == null ? void 0 : h.call(y)) ?? y.type === d.itemType.armor;
    }).map((y) => {
      var h;
      return ((h = y.getArmorProfile) == null ? void 0 : h.call(y, { actor: this })) ?? null;
    }).filter(Boolean), a = t.filter((y) => y.equipped), i = s.filter((y) => y.equipped), n = a.filter((y) => y.isPrimary), l = i.filter((y) => y.isPrimary);
    let o = null, c = null, u = !1;
    n.length === 1 ? (c = n[0], o = c) : n.length > 1 ? (e.push("Multiple equipped primary weapons found; attack selection requires a chooser."), u = !0) : a.length === 1 ? o = a[0] : a.length > 1 ? u = !0 : o = {
      ...At.DEFAULT_UNARMED,
      uuid: null,
      img: null,
      item: null,
      equipped: !0,
      isPrimary: !1,
      defaultRangeBand: "close",
      isSynthetic: !0
    };
    let m = null, p = null;
    return l.length === 1 ? (m = l[0], p = this._buildActiveArmorState(m)) : l.length > 1 ? (e.push("Multiple equipped primary armor items found; using the first equipped armor."), p = i[0] ? this._buildActiveArmorState(i[0]) : null) : i.length === 1 ? p = this._buildActiveArmorState(i[0]) : i.length > 1 && (e.push("Multiple equipped armor items found without a single primary; using the first equipped armor."), p = this._buildActiveArmorState(i[0])), {
      weapons: t,
      equippedWeapons: a,
      primaryWeapon: c,
      defaultWeapon: o,
      weaponChoiceRequired: u,
      armor: s,
      equippedArmor: i,
      primaryArmor: m,
      activeArmor: p,
      warnings: e
    };
  }
  _buildActiveArmorState(e) {
    var n, l;
    if (!e) return null;
    const t = Math.max(0, Number(((n = e == null ? void 0 : e.durability) == null ? void 0 : n.max) ?? (e == null ? void 0 : e.rating) ?? 0)), s = Math.min(
      t,
      Math.max(0, Number(((l = e == null ? void 0 : e.durability) == null ? void 0 : l.current) ?? (e == null ? void 0 : e.currentArmorRating) ?? t))
    ), a = Je(e == null ? void 0 : e.mitigationByType), i = na(s);
    return {
      ...e,
      armorId: e.id,
      remainingDurability: s,
      currentArmorRating: s,
      baseMitigation: i,
      baseResistance: i,
      mitigationByType: a,
      typedMitigation: a,
      ratingCurrent: s,
      isDestroyed: s <= 0,
      durability: {
        current: s,
        max: t
      }
    };
  }
  async setOwnedItemEquipped(e, t) {
    var a, i, n;
    const s = this.getOwnedItem(e);
    return !s || !((a = s.isPersonalWeapon) != null && a.call(s) || (i = s.isArmor) != null && i.call(s)) ? null : this.updateEmbeddedDocuments("Item", [{
      _id: s.id,
      "system.equipped": !!t,
      "system.isPrimary": t ? !!((n = s.system) != null && n.isPrimary) : !1
    }]);
  }
  async setOwnedItemPrimary(e, t) {
    var n, l, o, c;
    const s = this.getOwnedItem(e);
    if (!s || !((n = s.isPersonalWeapon) != null && n.call(s) || (l = s.isArmor) != null && l.call(s))) return null;
    const a = [], i = !!t;
    if (i)
      for (const u of this.items.filter((m) => m.type === s.type && m.id !== s.id))
        (o = u.system) != null && o.isPrimary && a.push({ _id: u.id, "system.isPrimary": !1 });
    return a.push({
      _id: s.id,
      "system.isPrimary": i,
      "system.equipped": i ? !0 : !!((c = s.system) != null && c.equipped)
    }), this.updateEmbeddedDocuments("Item", a);
  }
  /* -------------------------------------------- */
  /* Edge API (cap + pools w/ rating + current)    */
  /* -------------------------------------------- */
  getEdgeCap() {
    var e, t, s;
    return Math.max(0, Number(((s = (t = (e = this.system) == null ? void 0 : e.attributes) == null ? void 0 : t.edge) == null ? void 0 : s.value) ?? 0));
  }
  getEdgePoolRaw(e) {
    var t, s, a;
    return ((a = (s = (t = this.system) == null ? void 0 : t.counters) == null ? void 0 : s.edgePools) == null ? void 0 : a[e]) ?? null;
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
      const p = t, y = t;
      return {
        key: e,
        value: y,
        rating: p,
        effectiveValue: y,
        effectiveMax: p,
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
    const a = this.getEdgePoolRaw(e), i = Math.max(0, Number((a == null ? void 0 : a.rating) ?? 0)), n = Math.max(0, Number((a == null ? void 0 : a.value) ?? 0)), l = Math.min(i, t), o = Math.min(n, l);
    return {
      key: e,
      value: n,
      rating: i,
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
    const s = this.getEdgeCap(), a = this.getEdgePoolRaw(e), i = Math.max(0, Number((a == null ? void 0 : a.rating) ?? 0)), n = Math.min(i, s), l = Number(t ?? 0), o = Math.max(0, Math.min(l, n));
    return this.update({
      [`system.counters.edgePools.${e}.value`]: o
    });
  }
  /**
   * Convenience: adjust CURRENT value by delta (e.g., spend -1, award +1).
   */
  async adjustEdgePoolValue(e, t) {
    var i;
    if (!this.hasEdgePools()) return;
    const s = Math.max(0, Number(((i = this.getEdgePoolRaw(e)) == null ? void 0 : i.value) ?? 0)), a = Number(t ?? 0);
    return this.setEdgePoolValue(e, s + a);
  }
  /**
   * Set the RATING (advancement ceiling) for a pool.
   * Stores true rating (not cap-clamped), then clamps current value to new effective max.
   */
  async setEdgePoolRating(e, t) {
    var o;
    if (!this.hasEdgePools()) return;
    const s = this.getEdgeCap(), a = Math.max(0, Number(t ?? 0)), i = Math.min(a, s), n = Math.max(0, Number(((o = this.getEdgePoolRaw(e)) == null ? void 0 : o.value) ?? 0)), l = Math.min(n, i);
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
    var s, a, i, n;
    const t = this.getEdgeCap();
    if (this.hasEdgePools()) {
      const l = ((a = (s = this._mwdDerived) == null ? void 0 : s.edgePools) == null ? void 0 : a.pools) ?? {};
      if (e && typeof e == "object") {
        const c = Object.entries(e).map(([u, m]) => {
          const p = (m ?? []).map((y) => {
            const h = l[y] ?? this.getEdgePool(y);
            return {
              ...h,
              isEmpty: (h.effectiveValue ?? 0) <= 0,
              isCapped: (h.rating ?? 0) > (h.cap ?? t)
            };
          });
          return { id: u, pools: p };
        });
        return { cap: t, hasPools: !0, groups: c, pools: [] };
      }
      const o = Object.keys(((n = (i = this.system) == null ? void 0 : i.counters) == null ? void 0 : n.edgePools) ?? {}).map((c) => {
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
    var a;
    if (!this.hasEdgePools()) return;
    Math.max(
      0,
      Number(((a = this.getEdgePoolRaw(e)) == null ? void 0 : a.value) ?? 0)
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
  _onCreateDescendantDocuments(e, t, s, a, i, n) {
    super._onCreateDescendantDocuments(e, t, s, a, i, n), t === "effects" && this._syncOverloadedFieldFromEffects();
  }
  _onUpdateDescendantDocuments(e, t, s, a, i, n) {
    super._onUpdateDescendantDocuments(e, t, s, a, i, n), t === "effects" && this._syncOverloadedFieldFromEffects();
  }
  _onDeleteDescendantDocuments(e, t, s, a, i, n) {
    super._onDeleteDescendantDocuments(e, t, s, a, i, n), t === "effects" && this._syncOverloadedFieldFromEffects();
  }
  async _syncOverloadedEffect(e) {
    await this.toggleStatusEffect("overloaded", { active: e, overlay: !1 });
  }
  async _syncOverloadedFieldFromEffects() {
    var s, a, i, n;
    const e = ((a = (s = this.statuses) == null ? void 0 : s.has) == null ? void 0 : a.call(s, "overloaded")) ?? !1, t = !!((n = (i = this.system) == null ? void 0 : i.burn) != null && n.overloaded);
    e !== t && await this.update(
      { "system.burn.overloaded": e },
      { mwdSyncOverloadedFromEffect: !0 }
    );
  }
  /* -------------------------------------------- */
  /* Condition Monitors                            */
  /* -------------------------------------------- */
  async setMonitorValue(e, t, { source: s = "unknown" } = {}) {
    var m, p, y, h, T, S;
    if (e === "burn") {
      const g = Math.max(0, Number(t) || 0);
      return this.update({ "system.burn.value": g });
    }
    if (e === "armor" && this.isCharacterLike()) {
      const g = this.getPersonalCombatLoadout({ refresh: !0 }), k = ((m = g == null ? void 0 : g.activeArmor) == null ? void 0 : m.armorId) ?? ((p = g == null ? void 0 : g.activeArmor) == null ? void 0 : p.id) ?? null, C = k ? this.items.get(k) : null;
      if (!(C != null && C.id)) return null;
      const M = Math.max(0, Number(((y = C.system) == null ? void 0 : y.rating) ?? 0) || 0), x = Math.max(0, Number(((T = (h = C.system) == null ? void 0 : h.durability) == null ? void 0 : T.max) ?? 0) || 0), U = x > 0 ? x : M, W = Math.min(Math.max(0, Number(t) || 0), U);
      return this.updateEmbeddedDocuments("Item", [{
        _id: C.id,
        "system.durability.max": U,
        "system.durability.current": W
      }]);
    }
    const a = `system.monitors.${e}`, i = Number(foundry.utils.getProperty(this, `${a}.max`)) || 0, n = Math.max(0, i), l = Math.min(Math.max(0, Number(t) || 0), n), o = { [`${a}.value`]: l }, c = this.type, u = (S = Ts == null ? void 0 : Ts[c]) == null ? void 0 : S[e];
    if (u != null && u.derived)
      for (const [g, k] of Object.entries(u.derived)) {
        const C = Ns == null ? void 0 : Ns[k.fn];
        if (typeof C != "function") continue;
        const M = cn(this, e, k.source, l);
        o[`${a}.derived.${g}`] = C(M);
      }
    return this.update(o);
  }
  _prepareMonitors() {
    var n, l, o, c;
    const e = this.system.monitors ?? {}, t = ln(e);
    (n = this.system).derived ?? (n.derived = {}), this.system.derived.monitors = t;
    const s = Number(((l = t == null ? void 0 : t.physical) == null ? void 0 : l.penalty) ?? 0), a = Number(((o = t == null ? void 0 : t.fatigue) == null ? void 0 : o.penalty) ?? 0), i = s + a;
    (c = this.system.derived).condition ?? (c.condition = {}), this.system.derived.condition.physicalPenalty = s, this.system.derived.condition.fatiguePenalty = a, this.system.derived.condition.totalPenalty = i, this.system.derived.conditionPenalty = i;
  }
  _preparePersonalCombatDerived() {
    var n, l, o, c, u, m;
    if (!this.isCharacterLike()) return;
    const e = this.getPersonalCombatLoadout({ refresh: !0 }), t = (l = (n = this.system) == null ? void 0 : n.monitors) == null ? void 0 : l.armor;
    if (!t) return;
    const s = e.activeArmor, a = Math.max(0, Number(((o = s == null ? void 0 : s.durability) == null ? void 0 : o.max) ?? 0)), i = Math.max(0, Number((s == null ? void 0 : s.currentArmorRating) ?? ((c = s == null ? void 0 : s.durability) == null ? void 0 : c.current) ?? 0));
    t.max = a, t.value = Math.min(a, i), t.resistance = {
      default: Number((s == null ? void 0 : s.baseMitigation) ?? (s == null ? void 0 : s.baseResistance) ?? 0),
      byType: {}
    }, t.resistanceBonusByType = s != null && s.isDestroyed ? {} : (s == null ? void 0 : s.mitigationByType) ?? (s == null ? void 0 : s.typedMitigation) ?? {}, t.derived ?? (t.derived = {}), t.derived.resistance = Number((s == null ? void 0 : s.baseMitigation) ?? (s == null ? void 0 : s.baseResistance) ?? 0), t.effect = s != null && s.isDestroyed ? "Destroyed" : s ? un(s.mitigationByType ?? s.typedMitigation) : "", (u = this.system).derived ?? (u.derived = {}), this.system.derived.personalCombat = {
      defaultWeaponId: ((m = e.defaultWeapon) == null ? void 0 : m.id) ?? null,
      activeArmorId: (s == null ? void 0 : s.id) ?? null,
      warnings: [...e.warnings ?? []]
    };
  }
}
const Ia = { execute: yn }, dn = {
  physical: ["grit", "chaos"],
  mental: ["insight", "rumor"],
  social: ["legend", "credibility"]
};
function pn(r, e) {
  var i;
  const t = dn[e] ?? [];
  let s = null, a = -1;
  for (const n of t) {
    const l = (i = r.getEdgePool) == null ? void 0 : i.call(r, n), o = Number((l == null ? void 0 : l.rating) ?? 0), c = Number((l == null ? void 0 : l.value) ?? 0), u = Math.max(0, o - c);
    u > a && (a = u, s = n);
  }
  return s ?? t[0] ?? null;
}
function hn(r) {
  const t = (Array.isArray(r == null ? void 0 : r.manualModifiers) ? r.manualModifiers : []).map((a) => ({
    id: a.id ?? foundry.utils.randomID(),
    label: (a.label ?? "Manual").trim() || "Manual",
    value: Number(a.value ?? 0),
    source: "Manual"
  })).filter((a) => Number.isFinite(a.value) && a.value !== 0), s = t.reduce((a, i) => a + i.value, 0);
  return { mods: t, total: s };
}
function xa(r = {}) {
  const e = r.toggles ?? {};
  return {
    ...r,
    toggles: {
      useEdge: !!e.useEdge,
      takeRisks: !!e.takeRisks,
      opponentRoll: !!e.opponentRoll
    },
    manualModifiers: gn(r.manualModifiers)
  };
}
async function fn({ actor: r, payload: e } = {}) {
  var i, n, l, o, c, u, m, p, y, h, T, S;
  if ((e == null ? void 0 : e.intent) !== "attack") return e;
  const t = foundry.utils.deepClone(e ?? {}), s = ((i = r.getPersonalCombatLoadout) == null ? void 0 : i.call(r, { refresh: !0 })) ?? null, a = (g) => {
    var C, M, x, U, W;
    const k = ((M = (C = r.items) == null ? void 0 : C.get) == null ? void 0 : M.call(C, g)) ?? null;
    return !k || !(((x = k.isPersonalWeapon) == null ? void 0 : x.call(k)) ?? k.type === TEMPLATE.itemType.personalWeapon) || !((U = k.system) != null && U.equipped) ? null : ((W = k.getCombatProfile) == null ? void 0 : W.call(k, { ammoTypeId: t == null ? void 0 : t.ammoTypeId })) ?? null;
  };
  if (t.weaponId) {
    const g = a(t.weaponId);
    if (!g)
      throw new Error("Attack requires an owned equipped personal weapon.");
    return t.rangeBand = t.rangeBand ?? g.defaultRangeBand ?? "close", t.ammoTypeId = t.ammoTypeId ?? ((n = g == null ? void 0 : g.ammoState) == null ? void 0 : n.activeTypeId) ?? "", t;
  }
  if (t.mode === "auto") {
    if (s != null && s.weaponChoiceRequired) {
      const g = await SelectItem.selectItem(
        "Choose Weapon",
        s.equippedWeapons ?? []
      );
      return g ? (t.weaponId = g.id, t.rangeBand = t.rangeBand ?? g.defaultRangeBand ?? "close", t.ammoTypeId = t.ammoTypeId ?? ((l = g == null ? void 0 : g.ammoState) == null ? void 0 : l.activeTypeId) ?? "", delete t.mode, t) : null;
    }
    if ((o = s == null ? void 0 : s.defaultWeapon) != null && o.isSynthetic || ((c = s == null ? void 0 : s.defaultWeapon) == null ? void 0 : c.id) === "unarmed")
      return t.syntheticWeapon = foundry.utils.deepClone(s.defaultWeapon ?? WeaponItem.DEFAULT_UNARMED), t.weaponId = t.syntheticWeapon.id, t.rangeBand = t.rangeBand ?? "close", t.ammoTypeId = t.ammoTypeId ?? ((m = (u = t.syntheticWeapon) == null ? void 0 : u.ammoState) == null ? void 0 : m.activeTypeId) ?? "", delete t.mode, t;
    if ((p = s == null ? void 0 : s.defaultWeapon) != null && p.id)
      return t.weaponId = s.defaultWeapon.id, t.rangeBand = t.rangeBand ?? s.defaultWeapon.defaultRangeBand ?? "close", t.ammoTypeId = t.ammoTypeId ?? ((h = (y = s.defaultWeapon) == null ? void 0 : y.ammoState) == null ? void 0 : h.activeTypeId) ?? "", delete t.mode, t;
  }
  if (t.fallback === "unarmed")
    return t.syntheticWeapon = foundry.utils.deepClone(WeaponItem.DEFAULT_UNARMED), t.weaponId = t.syntheticWeapon.id, t.rangeBand = t.rangeBand ?? "close", t.ammoTypeId = t.ammoTypeId ?? ((S = (T = t.syntheticWeapon) == null ? void 0 : T.ammoState) == null ? void 0 : S.activeTypeId) ?? "", delete t.mode, t;
  throw new Error("Attack could not resolve a usable weapon.");
}
function gn(r) {
  return Array.isArray(r) ? r.map((e) => ({
    id: (e == null ? void 0 : e.id) ?? foundry.utils.randomID(),
    label: typeof (e == null ? void 0 : e.label) == "string" ? e.label : "Manual",
    value: Number((e == null ? void 0 : e.value) ?? 0)
  })) : [];
}
async function yn({ actor: r, payload: e, event: t } = {}) {
  var ie, ge, ue, ye, re, De, Oe, Me, be, Ve, qe, Et, Pt, b, P, V, ne, se, Ae, pe, ve, Te, Ne, Ie, xe, et, tt, rt, Rt, Dt, Ot, Nt;
  if (r != null && r.actor && (r = r.actor), (ie = r == null ? void 0 : r.document) != null && ie.actor && (r = r.document.actor), !r) throw new Error("MWD.roll.execute requires actor");
  if (!(e != null && e.intent)) throw new Error("MWD.roll.execute requires payload.intent");
  if (e = xa(e), e = await fn({ actor: r, payload: e }), !e) return null;
  let s = await resolveIntent({ actor: r, payload: e, event: t }), a = await collectModifiers({
    actor: r,
    rollType: e.intent,
    skillId: e.key,
    domains: s.domains,
    payload: e,
    resolved: s,
    context: { event: t }
  });
  const i = await MWDRollDialog.prompt({
    actor: r,
    basePayload: e,
    resolved: s,
    diceParts: {
      attribute: ((ge = s == null ? void 0 : s.pool) == null ? void 0 : ge.attribute) ?? 0,
      skill: ((ue = s == null ? void 0 : s.pool) == null ? void 0 : ue.skill) ?? 0,
      bonus: ((ye = s == null ? void 0 : s.pool) == null ? void 0 : ye.bonus) ?? 0
    },
    mods: a.mods,
    modTotal: a.total,
    options: {
      allowEdge: e.intent !== "initiative"
    }
  });
  if (!i) return null;
  if (e = xa(i), s = await resolveIntent({ actor: r, payload: e, event: t }), e.intent === "attack" && e.weaponId) {
    const I = ((De = (re = r.items) == null ? void 0 : re.get) == null ? void 0 : De.call(re, e.weaponId)) ?? null;
    if ((Oe = I == null ? void 0 : I.isPersonalWeapon) != null && Oe.call(I)) {
      const oe = String(e.ammoTypeId ?? "").trim(), bs = String(((be = (Me = I.system) == null ? void 0 : Me.ammo) == null ? void 0 : be.activeTypeId) ?? "").trim();
      if (oe && oe !== bs && await ((Ve = I.setActiveAmmoType) == null ? void 0 : Ve.call(I, oe)), !((qe = I.canConsumeAmmo) != null && qe.call(I, { ammoTypeId: oe }))) {
        const Jt = (Et = I.getAmmoState) == null ? void 0 : Et.call(I, { ammoTypeId: oe }), Ti = Jt != null && Jt.ammoLabel ? ` (${Jt.ammoLabel})` : "";
        return (Pt = ui.notifications) == null || Pt.warn(`Not enough ammo${Ti} for ${I.name}.`), null;
      }
    }
  }
  a = await collectModifiers({
    actor: r,
    rollType: e.intent,
    skillId: e.key,
    domains: s.domains,
    payload: e,
    resolved: s,
    context: { event: t }
  });
  const { mods: n, total: l } = a, { mods: o, total: c } = hn(e), u = [...n, ...o], m = Number(l ?? 0) + Number(c ?? 0), p = Number(((b = s == null ? void 0 : s.pool) == null ? void 0 : b.attribute) ?? 0) + Number(((P = s == null ? void 0 : s.pool) == null ? void 0 : P.skill) ?? 0) + Number(((V = s == null ? void 0 : s.pool) == null ? void 0 : V.bonus) ?? 0), y = Math.max(0, p + Number(m ?? 0)), h = e.intent !== "initiative", T = h ? bn({ actor: r, ctx: s, payload: e }) : null, S = (ne = T == null ? void 0 : T.pre) != null && ne.spent ? 4 : Number(s.diceTarget ?? s.target ?? 5);
  h && ((se = T == null ? void 0 : T.pre) != null && se.spent) && ((Ae = T == null ? void 0 : T.pre) != null && Ae.poolKey) && await ((pe = r.spendEdge) == null ? void 0 : pe.call(r, T.pre.poolKey, 1));
  let g, k = 0, C = 0;
  if (s.rollType === "sum" && ((ve = s.sum) != null && ve.formula))
    g = await new Roll(s.sum.formula, s.sum.data ?? {}).evaluate({ async: !0 }), k = Number(g.total ?? 0) + Number(m ?? 0);
  else {
    g = await new Roll(`${y}d6cs>=${S}`).evaluate({ async: !0 });
    const I = (Te = g.dice) == null ? void 0 : Te[0];
    k = Array.isArray(I == null ? void 0 : I.results) ? I.results.filter((oe) => oe.success).length : 0, C = Array.isArray(I == null ? void 0 : I.results) ? I.results.filter((oe) => oe.result === 1).length : 0;
  }
  s.intent === "initiative" && (g == null ? void 0 : g.total) != null && await wn({ actor: r, total: g.total });
  const M = interpretOutcome(
    s,
    { successes: k, raw: (Ne = g == null ? void 0 : g.toJSON) == null ? void 0 : Ne.call(g) },
    null
    // opposed rolls can pass defender result later
  ), x = M == null ? void 0 : M.edgeEarned;
  if ((x == null ? void 0 : x.amount) > 0) {
    const I = (Ie = s == null ? void 0 : s.domains) != null && Ie.includes("physical") ? "physical" : (xe = s == null ? void 0 : s.domains) != null && xe.includes("mental") ? "mental" : (et = s == null ? void 0 : s.domains) != null && et.includes("social") ? "social" : null, oe = pn(r, I);
    await ((tt = r.gainEdge) == null ? void 0 : tt.call(r, oe, x.amount)), M.edgeEarned.pool = oe;
  }
  s.intent === "overload" && await Sn({ actor: r, passed: M.passed });
  const U = buildResolved({
    actor: r,
    payload: e,
    ctx: s,
    roll: g,
    target: S,
    pool: y,
    mods: u,
    modTotal: m,
    hits: k,
    ones: C,
    edge: T,
    outcomeModel: M
  }), W = await renderChat({ resolved: U });
  if (e.intent === "attack" && e.weaponId) {
    const I = ((Rt = (rt = r.items) == null ? void 0 : rt.get) == null ? void 0 : Rt.call(rt, e.weaponId)) ?? null;
    (Dt = I == null ? void 0 : I.isPersonalWeapon) != null && Dt.call(I) && (await ((Ot = I.consumeAmmo) == null ? void 0 : Ot.call(I, { ammoTypeId: e.ammoTypeId })) || (Nt = ui.notifications) == null || Nt.warn(`Ammo could not be consumed for ${I.name}.`));
  }
  return ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor: r }),
    content: W,
    flags: {
      mwd: {
        payload: e,
        resolved: U
      }
    }
  });
}
function bn({ actor: r, ctx: e, payload: t }) {
  var h, T, S, g, k, C, M;
  const s = An(e == null ? void 0 : e.domains), a = Tn[s] ?? null, i = (a == null ? void 0 : a.a) ?? null, n = (a == null ? void 0 : a.b) ?? null, l = [i, n].filter(Boolean), o = !!((h = t == null ? void 0 : t.toggles) != null && h.useEdge) || !!(t != null && t.useEdge);
  let c = String(((S = (T = t == null ? void 0 : t.edge) == null ? void 0 : T.pre) == null ? void 0 : S.poolKey) ?? "").trim() || null;
  c && !l.includes(c) && (c = null);
  const u = o && c ? 1 : 0;
  let m = [...l];
  u && c && (m = m.filter((x) => x !== c));
  let p = String(((k = (g = t == null ? void 0 : t.edge) == null ? void 0 : g.post) == null ? void 0 : k.poolKey) ?? "").trim() || null;
  p && !m.includes(p) && (p = null);
  const y = Number(((M = (C = t == null ? void 0 : t.edge) == null ? void 0 : C.post) == null ? void 0 : M.spent) ?? 0) ? 1 : 0;
  return {
    domain: s,
    pools: a ? { a: i, b: n } : null,
    pre: { poolKey: c, spent: u },
    post: { poolKey: p, spent: y },
    allowed: { prePools: l, postPools: m }
  };
}
function An(r) {
  return Array.isArray(r) ? r.includes("physical") ? "physical" : r.includes("mental") ? "mental" : r.includes("social") ? "social" : null : null;
}
const Tn = {
  physical: { a: "grit", b: "chaos" },
  mental: { a: "insight", b: "rumor" },
  social: { a: "legend", b: "credibility" }
};
async function wn({ actor: r, total: e }) {
  var l, o, c, u, m;
  const t = (o = (l = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : l.controlled) == null ? void 0 : o.find((p) => {
    var y;
    return ((y = p.actor) == null ? void 0 : y.id) === r.id;
  }), s = ((u = (c = r.getActiveTokens) == null ? void 0 : c.call(r, !0, !0)) == null ? void 0 : u[0]) ?? null, a = t ?? s;
  if (!a) {
    (m = ui.notifications) == null || m.warn("Initiative requires a token on the current scene.");
    return;
  }
  let i = game.combat;
  i || (i = await Combat.create({
    scene: canvas.scene.id,
    active: !0
  }));
  let n = i.combatants.find((p) => p.tokenId === a.id);
  if (!n) {
    const p = await i.createEmbeddedDocuments("Combatant", [{
      tokenId: a.id,
      actorId: r.id,
      sceneId: canvas.scene.id
    }]);
    n = p == null ? void 0 : p[0];
  }
  n && await n.update({ initiative: Number(e) });
}
async function Sn({ actor: r, passed: e }) {
  e || await r.update({ "system.burn.overloaded": !0 });
}
var St;
class kn {
  constructor() {
    le(this, St, /* @__PURE__ */ new Map());
  }
  register(e) {
    if (!(e != null && e.id) || typeof e.collect != "function")
      throw new Error("Invalid ModifierProvider: missing id or collect()");
    _(this, St).has(e.id) || _(this, St).set(e.id, e);
  }
  async collectAll(e) {
    const t = [];
    for (const s of _(this, St).values()) {
      const a = await s.collect(e);
      if (console.log("MWD | provider", s.id, "returned", a), !!(a != null && a.length))
        for (const i of a)
          i && typeof i.label == "string" && typeof i.value == "number" && typeof i.source == "string" ? t.push(i) : console.warn("MWD | DROPPED MOD (bad shape)", s.id, i);
    }
    return t;
  }
}
St = new WeakMap();
const _t = new kn(), Mn = /* @__PURE__ */ new Set(["physical", "mental", "social"]);
function vn(r) {
  if (r == null || r === "" || r === "—" || r === "–") return 0;
  const e = Number(r);
  return Number.isFinite(e) ? e : null;
}
function Cn(r) {
  if (!r) return;
  const e = String(r).trim().toLowerCase();
  return Mn.has(e) ? e : void 0;
}
class En {
  constructor() {
    v(this, "id", "mwd.itemModifiers");
    v(this, "label", "Item Modifiers");
  }
  collect(e) {
    var a, i;
    const t = e == null ? void 0 : e.actor;
    if (!t) return [];
    const s = [];
    for (const n of t.items) {
      const l = (i = (a = n.flags) == null ? void 0 : a.mwd) == null ? void 0 : i.modifiers;
      if (!(!Array.isArray(l) || l.length === 0))
        for (const o of l) {
          if (!o) continue;
          const c = vn(o.value);
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
            domain: Cn(o.domain)
          });
        }
    }
    return s;
  }
}
const Is = {
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
class Pn {
  constructor() {
    v(this, "id", "mwd.statusEffects");
    v(this, "label", "Status Effects");
  }
  collect({ actor: e } = {}) {
    var a;
    const t = e == null ? void 0 : e.statuses;
    if (!e || !t) return [];
    const s = [];
    for (const i of t) {
      const n = Is == null ? void 0 : Is[i];
      if ((a = n == null ? void 0 : n.mods) != null && a.length)
        for (const l of n.mods) {
          const o = Array.isArray(l.domains) ? l.domains : [], c = l.value;
          if (o.length)
            for (const u of o)
              s.push({
                label: n.label ?? i,
                value: c,
                source: "Status",
                domain: u
              });
          else
            s.push({
              label: n.label ?? i,
              value: c,
              source: "Status"
            });
        }
    }
    return s;
  }
}
class Rn {
  constructor() {
    v(this, "id", "mwd.baseRollModifiers");
    v(this, "label", "Roll (Base)");
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
    const a = ((l = e == null ? void 0 : e.dialog) == null ? void 0 : l.otherMods) ?? ((o = e == null ? void 0 : e.modifiers) == null ? void 0 : o.otherMods) ?? (e == null ? void 0 : e.otherMods) ?? 0, i = Number(a);
    return Number.isFinite(i) && i !== 0 && t.push({
      id: "otherMods",
      label: "Other modifiers",
      value: i,
      source: "Roll"
    }), t;
  }
}
class Dn {
  constructor() {
    v(this, "id", "mwd.condition");
    v(this, "label", "Condition");
  }
  collect({ actor: e, rollType: t } = {}) {
    var l, o, c, u, m, p, y, h;
    if (!e) return [];
    if (t === "edge") return [];
    const s = ((l = e.system) == null ? void 0 : l.derived) ?? {}, a = Number(
      ((o = s == null ? void 0 : s.condition) == null ? void 0 : o.physicalPenalty) ?? ((u = (c = s == null ? void 0 : s.monitors) == null ? void 0 : c.physical) == null ? void 0 : u.penalty) ?? 0
    ), i = Number(
      ((m = s == null ? void 0 : s.condition) == null ? void 0 : m.fatiguePenalty) ?? ((y = (p = s == null ? void 0 : s.monitors) == null ? void 0 : p.fatigue) == null ? void 0 : y.penalty) ?? 0
    ), n = [];
    return Number.isFinite(a) && a !== 0 && n.push({
      id: "conditionPhysical",
      label: "Physical Penalty",
      value: a,
      source: "Physical Track"
      // domain: "physical" // optional; leave unset to apply to all domains
    }), Number.isFinite(i) && i !== 0 && n.push({
      id: "conditionFatigue",
      label: "Fatigue Penalty",
      value: i,
      source: "Fatigue Track"
      // domain: "physical" // optional
    }), console.log("MWD|condition derived snapshot", e.name, foundry.utils.deepClone((h = e.system) == null ? void 0 : h.derived)), n;
  }
}
const On = {
  id: "burn",
  async collect(r) {
    var a, i;
    const e = r.actor;
    if (!e) return [];
    const t = Number(((i = (a = e.system) == null ? void 0 : a.burn) == null ? void 0 : i.value) ?? 0), s = Math.floor(t / 2);
    return s <= 0 ? [] : [{
      id: "burn",
      label: "Burn",
      value: -s,
      source: "Burn Track",
      domain: null
    }];
  }
};
function Nn() {
  Hooks.on("renderChatMessageHTML", (r, e) => {
    e.addEventListener("click", (t) => {
      const s = t.target.closest("[data-mwd-action]");
      if (!s) return;
      const a = String(s.dataset.mwdAction || "").trim();
      a && a === "edgePostReroll" && In(t, r);
    });
  });
}
async function In(r, e) {
  var h, T, S, g, k, C, M, x, U, W, ie, ge, ue, ye, re, De, Oe;
  r.preventDefault();
  const t = r.target.closest("[data-mwd-action='edgePostReroll']"), s = String(((h = t == null ? void 0 : t.dataset) == null ? void 0 : h.poolKey) ?? "").trim();
  if (!s) return;
  const a = foundry.utils.deepClone((S = (T = e == null ? void 0 : e.flags) == null ? void 0 : T.mwd) == null ? void 0 : S.resolved);
  if (!a || Number(((k = (g = a == null ? void 0 : a.edge) == null ? void 0 : g.post) == null ? void 0 : k.spent) ?? 0) === 1) return;
  if (!(Array.isArray((M = (C = a == null ? void 0 : a.edge) == null ? void 0 : C.allowed) == null ? void 0 : M.postPools) ? a.edge.allowed.postPools : []).includes(s)) {
    (U = (x = ui.notifications) == null ? void 0 : x.warn) == null || U.call(x, `Post-spend pool not allowed: ${s}`);
    return;
  }
  const n = Array.isArray((W = a == null ? void 0 : a.roll) == null ? void 0 : W.failureDiceRefs) ? a.roll.failureDiceRefs : [];
  if (n.length <= 0) {
    (ge = (ie = ui.notifications) == null ? void 0 : ie.info) == null || ge.call(ie, "No failures to reroll.");
    return;
  }
  const l = await fromUuid(a.actorUuid);
  if (!l) {
    (ye = (ue = ui.notifications) == null ? void 0 : ue.warn) == null || ye.call(ue, "Actor not found for this roll.");
    return;
  }
  await ((re = l.spendEdge) == null ? void 0 : re.call(l, s, 1));
  const o = Number(((De = a == null ? void 0 : a.roll) == null ? void 0 : De.target) ?? 5), u = (Oe = (await new Roll(`${n.length}d6cs>=${o}`).evaluate()).dice) == null ? void 0 : Oe[0], m = Array.isArray(u == null ? void 0 : u.results) ? u.results : [], p = m.filter((Me) => Me.success).length;
  a.outcome = a.outcome ?? {}, a.outcome.hits = Number(a.outcome.hits ?? 0) + p, a.edge = a.edge ?? {}, a.edge.post = { poolKey: s, spent: 1 }, a.edge.availableActions = {
    ...a.edge.availableActions ?? {},
    canSpendPost: !1,
    canPostRerollFailures: !1
  }, a.roll = a.roll ?? {}, a.roll.diceGroups = Array.isArray(a.roll.diceGroups) ? a.roll.diceGroups : [], a.roll.diceGroups.push({
    id: "post",
    label: "Post Reroll",
    faces: 6,
    termIndex: null,
    dice: m.map((Me, be) => {
      const Ve = Number(Me.result), qe = !!Me.success;
      return {
        ref: `post:${be}`,
        face: Ve,
        isSuccess: qe,
        isFailure: !qe,
        tooltip: qe ? `Post die ${be + 1}: ${Ve} (Success vs TN ${o})` : `Post die ${be + 1}: ${Ve} (Failure vs TN ${o})`
      };
    })
  });
  const y = await renderChat({ resolved: a });
  await e.update({
    content: y,
    "flags.mwd.resolved": a,
    "flags.mwd.payload.edge.post": { poolKey: s, spent: 1 }
  });
}
const { ApplicationV2: xn, HandlebarsApplicationMixin: _n } = foundry.applications.api, Ln = "mwd-gmgadget", Ai = "gmDnPresets", ls = "gmNextDn", Bt = "gmDnAnnounceToChat", $n = "systems/mwd/templates/v2/mwd-gmgadget.hbs", jt = Object.freeze({
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
function Wn(r) {
  return (typeof r == "string" ? r : "").split(",").map((t) => t.trim()).filter(Boolean).map((t) => {
    const [s, a] = t.split(":").map((l) => (l ?? "").trim()), i = s || "DN", n = Number.isFinite(Number(a)) ? Number(a) : Number(s);
    return {
      label: i,
      dn: Number.isFinite(n) ? Math.max(0, Math.trunc(n)) : null
    };
  }).filter((t) => Number.isFinite(t.dn));
}
function xs(r = {}) {
  return foundry.utils.mergeObject(
    foundry.utils.deepClone(jt),
    r ?? {},
    { inplace: !1, overwrite: !0 }
  );
}
function Hn(r) {
  var t, s;
  return !(r != null && r.token) || !(r != null && r.actor) ? {
    label: "No scene target",
    reason: String((r == null ? void 0 : r.reason) ?? "No controlled or targeted token."),
    supported: !1
  } : {
    label: String(((t = r.token) == null ? void 0 : t.name) ?? ((s = r.actor) == null ? void 0 : s.name) ?? "Token").trim(),
    reason: "",
    supported: !0
  };
}
function Bn(r) {
  var t;
  if (!(r != null && r.actor))
    return {
      label: "No target selected",
      source: "",
      reason: String((r == null ? void 0 : r.reason) ?? "Choose a supported character target.")
    };
  const e = r.source === "scene" || r.source === "token" ? "Scene target" : "Actor fallback";
  return {
    label: String(((t = r.actor) == null ? void 0 : t.name) ?? "Character").trim() || "Character",
    source: e,
    reason: ""
  };
}
function jn(r) {
  return Ge.getStatusOptions(r);
}
function Fn(r = "mwd") {
  game.settings.register(r, Ai, {
    scope: "world",
    config: !0,
    name: "GM Difficulty Presets (DN hits)",
    hint: "Comma-separated list like: Standard:1,Challenging:2,Hard:3,Extreme:4",
    type: String,
    default: "Standard:1,Challenging:2,Hard:3,Extreme:4"
  }), game.settings.register(r, ls, {
    scope: "client",
    config: !1,
    type: Number,
    default: 1
  }), game.settings.register(r, Bt, {
    scope: "client",
    config: !0,
    name: "Announce GM DN changes to chat",
    hint: "If enabled, posts a small chat notice when you change the current DN preset.",
    type: Boolean,
    default: !1
  });
}
const Le = class Le extends _n(xn) {
  constructor({ systemId: e = "mwd", ...t } = {}) {
    super(t), this.systemId = e, this.activeTab = "difficulty", this.harmState = xs();
  }
  async render(e = {}) {
    var t;
    return (t = game.user) != null && t.isGM ? super.render(e) : this;
  }
  async _prepareContext(e) {
    var y, h, T;
    const t = await super._prepareContext(e), s = game.settings.get(this.systemId, Ai), a = Wn(s), i = Number(game.settings.get(this.systemId, ls) ?? 1), n = !!game.settings.get(this.systemId, Bt), l = Ge.getActorOptions(), o = Ge.getSceneTarget(), c = this.harmState.actorId ? ((h = (y = game.actors) == null ? void 0 : y.get) == null ? void 0 : h.call(y, this.harmState.actorId)) ?? null : null, u = Ge.resolveTarget({
      actor: c,
      actorId: this.harmState.actorId,
      preferSceneTarget: !0
    }), m = jn(u.actor ?? c ?? null), p = xs(this.harmState);
    return !p.statusId && m.length && (p.statusId = m[0].value, this.harmState.statusId = p.statusId), foundry.utils.mergeObject(t, {
      presets: a,
      currentDn: i,
      currentTab: this.activeTab,
      announce: n,
      isGM: ((T = game.user) == null ? void 0 : T.isGM) ?? !1,
      harm: {
        state: p,
        actorOptions: l,
        modes: Ge.MODE_OPTIONS,
        damageTypes: Lr,
        statusOptions: m,
        sceneTarget: Hn(o),
        effectiveTarget: Bn(u),
        canApply: !!u.actor,
        applyReason: u.reason || "",
        useArmorAvailable: p.mode === "physical" || p.mode === "fatigue",
        showDamageType: (p.mode === "physical" || p.mode === "fatigue") && p.useArmor,
        showStatusFields: p.mode === "status",
        showDeltaFields: p.mode !== "status"
      }
    });
  }
  _getRootElement() {
    var e;
    return this.element instanceof HTMLElement ? this.element : (e = this.element) == null ? void 0 : e[0];
  }
  _captureHarmStateFromDom(e = null) {
    var i;
    const t = ((i = e == null ? void 0 : e.closest) == null ? void 0 : i.call(e, ".mwd-gmgadget__root")) ?? this._getRootElement();
    if (!(t instanceof HTMLElement)) return this.harmState;
    const s = (n, l = "") => {
      const o = t.querySelector(n);
      return o instanceof HTMLInputElement || o instanceof HTMLSelectElement || o instanceof HTMLTextAreaElement ? o.value : l;
    }, a = (n, l = !1) => {
      const o = t.querySelector(n);
      return o instanceof HTMLInputElement ? o.checked : l;
    };
    return this.harmState = xs({
      actorId: s('[name="harm-actorId"]', this.harmState.actorId),
      mode: s('[name="harm-mode"]', this.harmState.mode),
      delta: Number(s('[name="harm-delta"]', this.harmState.delta)),
      useArmor: a('[name="harm-useArmor"]', this.harmState.useArmor),
      damageType: s('[name="harm-damageType"]', this.harmState.damageType),
      statusId: s('[name="harm-statusId"]', this.harmState.statusId),
      statusActive: s('[name="harm-statusActive"]', this.harmState.statusActive ? "add" : "remove") !== "remove",
      source: s('[name="harm-source"]', this.harmState.source),
      notes: s('[name="harm-notes"]', this.harmState.notes)
    }), Number.isFinite(Number(this.harmState.delta)) || (this.harmState.delta = jt.delta), this.harmState;
  }
  async _onSetDn(e, t) {
    var i, n, l;
    if (e.preventDefault(), e.stopPropagation(), !((i = game.user) != null && i.isGM)) return;
    const s = Math.max(0, Math.trunc(Number(((n = t == null ? void 0 : t.dataset) == null ? void 0 : n.dn) ?? NaN)));
    if (!Number.isFinite(s)) return;
    if (await game.settings.set(this.systemId, ls, s), !!game.settings.get(this.systemId, Bt)) {
      const o = String(((l = t == null ? void 0 : t.dataset) == null ? void 0 : l.label) ?? `DN ${s}`);
      await ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ user: game.user }),
        content: `<div class="mwd-gm-notice"><b>GM Difficulty:</b> ${foundry.utils.escapeHTML(o)} (DN ${s} hits)</div>`
      });
    }
    return this.render({ parts: ["body"] });
  }
  async _onSwitchTab(e, t) {
    var a, i, n;
    (a = e == null ? void 0 : e.preventDefault) == null || a.call(e), (i = e == null ? void 0 : e.stopPropagation) == null || i.call(e);
    const s = String(((n = t == null ? void 0 : t.dataset) == null ? void 0 : n.tab) ?? "").trim();
    if (!(!s || s === this.activeTab))
      return this._captureHarmStateFromDom(t), this.activeTab = s, this.render({ parts: ["body"] });
  }
  async _onClearDn(e, t) {
    var s;
    if (e.preventDefault(), e.stopPropagation(), !!((s = game.user) != null && s.isGM))
      return await game.settings.set(this.systemId, ls, 1), this.render({ parts: ["body"] });
  }
  async _onToggleAnnounce(e, t) {
    var a;
    if (e.preventDefault(), e.stopPropagation(), !((a = game.user) != null && a.isGM)) return;
    const s = !game.settings.get(this.systemId, Bt);
    return await game.settings.set(this.systemId, Bt, s), this.render({ parts: ["body"] });
  }
  async _onHarmInputChange(e, t) {
    var a, i;
    (a = e == null ? void 0 : e.preventDefault) == null || a.call(e), this._captureHarmStateFromDom(t);
    const s = String(((i = t == null ? void 0 : t.dataset) == null ? void 0 : i.harmKey) ?? "").trim();
    if (["actorId", "mode", "useArmor"].includes(s))
      return this.render({ parts: ["body"] });
  }
  async _onRefreshHarmTarget(e, t) {
    var s, a;
    return (s = e == null ? void 0 : e.preventDefault) == null || s.call(e), (a = e == null ? void 0 : e.stopPropagation) == null || a.call(e), this._captureHarmStateFromDom(t), this.render({ parts: ["body"] });
  }
  async _onApplyHarm(e, t) {
    var n, l, o, c, u;
    if ((n = e == null ? void 0 : e.preventDefault) == null || n.call(e), (l = e == null ? void 0 : e.stopPropagation) == null || l.call(e), !((o = game.user) != null && o.isGM)) return;
    const s = this._captureHarmStateFromDom(t), a = this._buildHarmPayload(s);
    if (!a) {
      (c = ui.notifications) == null || c.warn("Choose a valid harm action before applying it.");
      return;
    }
    const i = await Ge.apply({
      payload: a,
      options: {
        actorId: s.actorId,
        preferSceneTarget: !0,
        logToChat: !0
      }
    });
    return i != null && i.ok ? this.render({ parts: ["body"] }) : ((u = ui.notifications) == null || u.warn((i == null ? void 0 : i.reason) ?? "Unable to apply harm."), this.render({ parts: ["body"] }));
  }
  _buildHarmPayload(e) {
    const t = String((e == null ? void 0 : e.source) ?? "").trim(), s = String((e == null ? void 0 : e.notes) ?? "").trim(), a = String((e == null ? void 0 : e.mode) ?? "").trim();
    if (a === "status") {
      const i = String((e == null ? void 0 : e.statusId) ?? "").trim();
      return i ? {
        mode: "status",
        statusId: i,
        active: !!(e != null && e.statusActive),
        source: t,
        notes: s
      } : null;
    }
    return a === "burn" ? {
      mode: "burnDelta",
      delta: _a(e == null ? void 0 : e.delta, jt.delta),
      source: t,
      notes: s
    } : a === "physical" || a === "fatigue" ? {
      mode: "trackDelta",
      track: a,
      delta: _a(e == null ? void 0 : e.delta, jt.delta),
      useArmor: !!(e != null && e.useArmor),
      damageType: (e == null ? void 0 : e.damageType) ?? jt.damageType,
      source: t,
      notes: s
    } : null;
  }
};
v(Le, "DEFAULT_OPTIONS", {
  id: Ln,
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
    switchTab: Le.prototype._onSwitchTab,
    setDn: Le.prototype._onSetDn,
    clearDn: Le.prototype._onClearDn,
    toggleAnnounce: Le.prototype._onToggleAnnounce,
    harmInputChange: Le.prototype._onHarmInputChange,
    refreshHarmTarget: Le.prototype._onRefreshHarmTarget,
    applyHarm: Le.prototype._onApplyHarm
  }
}), v(Le, "PARTS", {
  body: { template: $n }
});
let ta = Le;
function _a(r, e = 0) {
  const t = Number(r);
  return Number.isFinite(t) ? Math.trunc(t) : e;
}
let _s = null;
function Gn({ systemId: r = "mwd" } = {}) {
  return _s || (_s = new ta({ systemId: r })), _s;
}
function Un() {
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
function Vn() {
  return {
    get(r) {
      return qt(r);
    },
    getSkills({ withKnowledge: r = !1 } = {}) {
      return Fs();
    },
    list() {
      return Fs();
    }
  };
}
class ua {
  static start() {
    const e = new ua();
    Hooks.once("init", () => e.onInit()), Hooks.once("ready", () => e.onReady());
  }
  async onInit() {
    console.log(z + "AnarchySystem.onInit"), game.system.mwd = this, game.system.anarchy = this, game.mwd ?? (game.mwd = {}), Un(), Nn(), Fn("mwd"), game.mwd.roll = Ia, game.mwd.personalCombat = X, game.mwd.harm = Ge, this.roll = Ia, this.personalCombat = X, this.harm = Ge, this.skills = Vn(), this.remoteCall = new Bs(), game.system.mwd.skills = this.skills, game.mwd.skills = this.skills, G.init(), this.modifiers = new B(), _t.register(new En()), _t.register(new Pn()), _t.register(new Rn()), _t.register(new Dn()), _t.register(On), Handlebars.registerHelper("mwdClassList", (e) => Array.isArray(e) ? e.join(" ") : typeof e == "string" ? e : ""), this.actorClasses = {
      character: Pa,
      npc: Pa,
      vehicle: si,
      battlemech: qr
    }, this.hooks = new pt(), this.styles = new Sr(), this.handlebarsManager = new la(), X.init(), zr.register(), console.log(z + "AnarchySystem.onInit | loading system"), CONFIG.ANARCHY = Y, CONFIG.Combat.initiative = { formula: "2d6" }, CONFIG.statusEffects.push({
      id: "overloaded",
      name: "Overloaded",
      icon: "systems/mwd/img/icons/status/surge.svg"
    }), CONFIG.Actor.documentClass = mn, CONFIG.Item.documentClass = vt, vt.init(), Xr(), sn(), await nn(), console.log(z + "AnarchySystem.onInit | done");
  }
  async onReady() {
    if (console.log(z + "AnarchySystem.onReady"), await X.onReady(), !game.user.isGM) return;
    const e = game.settings.get(A, "enableGMGadget");
    if (!e) {
      console.log(`${z}GMManager render skipped (enableGMGadget=false)`);
      return;
    }
    game.mwd = game.mwd ?? {}, game.mwd.gmGadget = () => Gn({ systemId: A }).render({ force: !0 }), e && game.mwd.gmGadget();
  }
}
ua.start();
//# sourceMappingURL=index.mjs.map
