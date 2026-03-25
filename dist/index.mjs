var Ii = Object.defineProperty;
var xi = Object.getPrototypeOf;
var Li = Reflect.get;
var Rs = (r) => {
  throw TypeError(r);
};
var $i = (r, e, t) => e in r ? Ii(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var M = (r, e, t) => $i(r, typeof e != "symbol" ? e + "" : e, t), Vt = (r, e, t) => e.has(r) || Rs("Cannot " + t);
var B = (r, e, t) => (Vt(r, e, "read from private field"), t ? t.call(r) : e.get(r)), re = (r, e, t) => e.has(r) ? Rs("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(r) : e.set(r, t), ye = (r, e, t, s) => (Vt(r, e, "write to private field"), s ? s.call(r, t) : e.set(r, t), t), R = (r, e, t) => (Vt(r, e, "access private method"), t);
var Dt = (r, e, t) => Li(xi(r), t, e);
const K = {
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
}, p = K, w = "mwd", Hi = "MechWarrior: Destiny", ss = `system.${w}`, Wi = w, Pt = `systems/${w}`, si = `${Pt}/style`, dt = `${Pt}/third-party/style`, O = `systems/${w}/templates`, Gt = `${Pt}/img/icons`, x = `${Gt}/skills`, j = "MWD | ", Bi = 2, Fi = 5, Gi = 4, ii = 8, is = {
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
}, as = {
  autopilot: "autopilot",
  firewall: "firewall",
  knowledge: "knowledge"
}, de = {
  grit: "grit",
  chaos: "chaos",
  insight: "insight",
  rumor: "rumor",
  legend: "legend",
  credibility: "credibility"
}, Ss = {
  physical: [de.grit, de.chaos],
  mental: [de.insight, de.rumor],
  social: [de.legend, de.credibility]
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
  actorAttributes: is,
  itemAttributes: as,
  attributes: { ...is, ...as },
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
    edgePools: de,
    edgePoolGroups: Ss,
    physical: {
      grit: de.grit,
      chaos: de.chaos
    },
    mental: {
      insight: de.insight,
      rumor: de.rumor
    },
    social: {
      legend: de.legend,
      credibility: de.credibility
    },
    chaos: de.chaos
  },
  area: {
    none: "none",
    shotgun: "shotgun",
    circle: "circle",
    cone: "cone",
    rect: "rect",
    ray: "ray"
  }
}, Ui = Object.freeze({
  physical: "physical",
  mental: "mental",
  social: "social"
});
Object.freeze(Object.values(Ui));
const it = {
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
}, qt = {
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
}, oe = {
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
  SYSTEM_DESCRIPTION: Hi,
  SYSTEM_SOCKET: ss,
  SYSTEM_SCOPE: Wi,
  SYSTEM_PATH: Pt,
  STYLE_PATH: si,
  THIRD_PARTY_STYLE_PATH: dt,
  TEMPLATES_PATH: O,
  ICONS_PATH: Gt,
  ICONS_SKILLS_PATH: x,
  LOG_HEAD: j,
  SPECIALIZATION_BONUS: Bi,
  TARGET_SUCCESS: Fi,
  TARGET_SUCCESS_EDGE: Gi,
  BASE_MONITOR: ii,
  ACTOR_ATTRIBUTES: is,
  ITEM_ATTRIBUTES: as,
  EDGE_POOL_GROUPS: Ss,
  TEMPLATE: d,
  ANARCHY_SYSTEM: oe
};
const De = class De {
  static ascending(e = (t) => t) {
    return (t, s) => De.sortingBy(e(t), e(s));
  }
  static descending(e = (t) => t) {
    return (t, s) => De.sortingBy(e(s), e(t));
  }
  static sortingBy(e, t) {
    return e > t ? 1 : e < t ? -1 : 0;
  }
  static bySortedArray(e) {
    return (t) => e.indexOf(t);
  }
  static ascendingBySortedArray(e) {
    return De.ascending(De.bySortedArray(e));
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
    return e.map(t).filter((s) => s != null).reduce(De.sum(), 0);
  }
  static divint(e, t) {
    return Math.floor(e / t);
  }
  static divup(e, t) {
    return Math.ceil(e / t);
  }
  static join(e, t = "") {
    return e.reduce(De.joiner(t));
  }
  static joiner(e = "") {
    return (t, s) => t + e + s;
  }
  static classify(e, t = (s) => s.type) {
    let s = {};
    return De.classifyInto(s, e, t), s;
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
M(De, "isString", (e) => typeof e == "string" || e instanceof String);
let I = De;
const ji = {
  keyword: "keywords",
  disposition: "dispositions",
  cue: "cues"
}, b = class b {
  /**
   * Initialize enum caches.
   * Call once during system init/setup after config/constants are available.
   */
  static init() {
    var t, s, i, a, n, o, l, c, u, m, h, f;
    b.hbsAttributes = b.mapObjectToKeyValue(p.attributes).filter((g) => g.value !== "knowledge" && g.value !== "noAttribute"), b.hbsItemTypes = b.mapObjectToKeyValue(p.itemType), b.hbsMonitors = b.mapObjectToKeyValue(p.monitor), b.hbsMonitorLetters = b.mapObjectToKeyValue(p.monitorLetter), b.hbsAssetModuleCategories = b.mapObjectToKeyValue(p.assetModuleCategory), (s = (t = p.item) == null ? void 0 : t.lifeModule) != null && s.type ? b.hbsLifeModuleTypes = b.mapObjectToKeyValue(p.item.lifeModule.type) : (console.warn("MWD | MWD.item.lifeModule.type is missing; life module enums disabled."), b.hbsLifeModuleTypes = []), b.hbsAreas = b.mapObjectToKeyValue(p.area), b.hbsRanges = b.mapObjectToKeyValue(p.range), b.hbsVehicleCategories = b.mapObjectToKeyValue(p.vehicleCategory), b.hbsMwdWeightClasses = b.mapObjectToKeyValue((i = p.mwd) == null ? void 0 : i.weightClass), b.hbsMwdHardpointTypes = b.mapObjectToKeyValue((a = p.mwd) == null ? void 0 : a.hardpointType), b.hbsMwdHardpointSizes = b.mapObjectToKeyValue((n = p.mwd) == null ? void 0 : n.hardpointSize), b.hbsMwdHardpointLocations = b.mapObjectToKeyValue((o = p.mwd) == null ? void 0 : o.hardpointLocation), b.hbsMwdPrimaryModes = b.mapObjectToKeyValue((l = p.mwd) == null ? void 0 : l.primarySlotMode), b.hbsMwdWeaponCategories = b.mapObjectToKeyValue((c = p.mwd) == null ? void 0 : c.weaponCategory), b.hbsMwdWeaponDamageTypes = b.mapObjectToKeyValue((u = p.mwd) == null ? void 0 : u.weaponDamageType), b.hbsPersonalWeaponDamageTypes = b.mapObjectToKeyValue((m = p.mwd) == null ? void 0 : m.personalDamageType), b.hbsPersonalWeaponDamageCategories = b.mapObjectToKeyValue((h = p.mwd) == null ? void 0 : h.personalDamageCategory), b.hbsMwdMeleeLocations = b.mapObjectToKeyValue((f = p.mwd) == null ? void 0 : f.meleeLocation), b.hbsDamageTypes = I.distinct(
      (b.hbsMwdWeaponDamageTypes ?? []).concat(b.hbsPersonalWeaponDamageTypes ?? []),
      (g) => g.value
    );
    const e = Object.values(it).flat();
    b.sortedAttributeKeys = I.distinct(
      e.concat(Object.keys(p.attributes ?? {}))
    ), b.registerHandleBarHelpers(), b.ENUMS = b.getEnums();
  }
  static registerHandleBarHelpers() {
    typeof Handlebars > "u" || Handlebars.registerHelper("sortedAttributes", (e) => {
      if (!e || typeof e != "object") return [];
      const t = Object.keys(e), s = b.sortedAttributeKeys ?? [], i = new Map(s.map((a, n) => [a, n]));
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
    return b.hbsDamageTypes ?? [];
  }
  static getAttributes(e = () => !0) {
    return (b.hbsAttributes ?? []).filter((t) => e(t.value));
  }
  static getActorWordTypes() {
    return ji;
  }
  static getMonitors() {
    return b.hbsMonitors ?? [];
  }
  /**
   * Returns a big blob of enums suitable for sheet contexts.
   * `withKnowledge` is passed through to the skills service.
   */
  static getEnums(e = () => !0, t = !1) {
    return {
      attributes: b.getAttributes(e),
      itemTypes: b.hbsItemTypes ?? [],
      monitors: b.hbsMonitors ?? [],
      monitorLetters: b.hbsMonitorLetters ?? [],
      assetModuleCategories: b.hbsAssetModuleCategories ?? [],
      lifeModuleTypes: b.hbsLifeModuleTypes ?? [],
      areas: b.hbsAreas ?? [],
      ranges: b.hbsRanges ?? [],
      vehicleCategories: b.hbsVehicleCategories ?? [],
      // Skills: now sourced from MWD namespace (with safe fallback)
      skills: b.getSkillsEnum({ withKnowledge: t }),
      // MWD enums
      mwdWeightClasses: b.hbsMwdWeightClasses ?? [],
      mwdHardpointTypes: b.hbsMwdHardpointTypes ?? [],
      mwdHardpointSizes: b.hbsMwdHardpointSizes ?? [],
      mwdHardpointLocations: b.hbsMwdHardpointLocations ?? [],
      mwdPrimaryModes: b.hbsMwdPrimaryModes ?? [],
      mwdWeaponCategories: b.hbsMwdWeaponCategories ?? [],
      mwdWeaponDamageTypes: b.hbsMwdWeaponDamageTypes ?? [],
      personalWeaponDamageTypes: b.hbsPersonalWeaponDamageTypes ?? [],
      personalWeaponDamageCategories: b.hbsPersonalWeaponDamageCategories ?? [],
      damageTypes: b.hbsDamageTypes ?? [],
      mwdMeleeLocations: b.hbsMwdMeleeLocations ?? []
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
    return b.mapObjectToKeyValue(e, t, s);
  }
};
M(b, "ENUMS"), // HBS-friendly arrays of { value, label } (or key/value depending on caller)
M(b, "hbsAttributes"), M(b, "hbsItemTypes"), M(b, "hbsMonitors"), M(b, "hbsMonitorLetters"), M(b, "hbsAssetModuleCategories"), M(b, "hbsLifeModuleTypes"), M(b, "hbsAreas"), M(b, "hbsRanges"), M(b, "hbsVehicleCategories"), // MWD-specific enum groups
M(b, "hbsMwdWeightClasses"), M(b, "hbsMwdHardpointTypes"), M(b, "hbsMwdHardpointSizes"), M(b, "hbsMwdHardpointLocations"), M(b, "hbsMwdPrimaryModes"), M(b, "hbsMwdWeaponCategories"), M(b, "hbsMwdWeaponDamageTypes"), M(b, "hbsPersonalWeaponDamageTypes"), M(b, "hbsPersonalWeaponDamageCategories"), M(b, "hbsDamageTypes"), M(b, "hbsMwdMeleeLocations"), M(b, "sortedAttributeKeys");
let G = b;
class Vi {
  static monitor(e) {
    return G.getFromList(G.getMonitors(), e) ?? "";
  }
  static letter(e) {
    return G.getFromList(G.getMonitorLetters(), e) ?? "";
  }
}
class qi {
  static toLowerCaseNoAccent(e) {
    return e == null ? void 0 : e.normalize("NFD").toLowerCase().replace(/[\u0300-\u036f]/g, "");
  }
  static toUpperCaseNoAccent(e) {
    return e == null ? void 0 : e.normalize("NFD").toUpperCase().replace(/[\u0300-\u036f]/g, "");
  }
}
const zi = [
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
    return D.iconPath(`${si}/${e}`, t);
  }
  static iconPath(e, t) {
    return `<img class="${t}" src="${e}" />`;
  }
  static iconD6(e) {
    if (e < 0 || e > 6)
      throw `Dice ${e} is out of dice range [1..6] or 0 for multidice`;
    return D.fontAwesome(zi[e]);
  }
}
globalThis.ANARCHY_ICONS = D;
const V = (r, e = {}) => r.replace(/\{(.*?)\}/g, (t, s) => e[s] ?? ""), ai = Object.freeze({
  penetrating: "Penetrating",
  concussive: "Concussive",
  energy: "Energy",
  thermal: "Thermal",
  electrical: "Electrical"
}), ks = Object.freeze(
  Object.entries(ai).map(([r, e]) => ({ value: r, label: e }))
), Ki = Object.freeze({
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
}), Yi = Object.freeze(
  ks.map((r) => r.value)
), Qi = Object.freeze({
  "armor piercing": () => ({ ap: 2 }),
  "anti-ferro": () => ({ bonusVsArmorTag: { ferroFibrous: 0.33 } }),
  blast: () => ({ flags: ["blast", "area"] }),
  corrosive: () => ({ flags: ["corrosive"] }),
  emp: () => ({ flags: ["emp"] }),
  inaccurate: () => ({ accuracyMod: -1 })
});
function ri(r) {
  return Array.isArray(r) ? r.map((e) => String(e ?? "").trim()).filter(Boolean) : String(r ?? "").split(",").map((e) => e.trim()).filter(Boolean);
}
function ze(r, e = "penetrating") {
  const t = String(r ?? "").trim().toLowerCase();
  return Ki[t] ?? e;
}
function ni(r) {
  const e = String(r ?? "").trim().toLowerCase();
  return Yi.includes(e);
}
function Qe(r) {
  const e = ze(r, "");
  return ai[e] ?? String(r ?? "").trim();
}
function St(r) {
  const e = r ?? {}, t = Number(e.ballistic ?? 0) || 0, s = Number(e.melee ?? 0) || 0;
  return {
    penetrating: e.penetrating !== void 0 ? Number(e.penetrating ?? 0) || 0 : Math.max(t, s),
    concussive: e.concussive !== void 0 ? Number(e.concussive ?? 0) || 0 : Number(e.explosive ?? 0) || 0,
    energy: Number(e.energy ?? 0) || 0,
    thermal: Number(e.thermal ?? 0) || 0,
    electrical: Number(e.electrical ?? 0) || 0
  };
}
function rs(r) {
  return ri(r);
}
function Ms(r) {
  return ri(r);
}
function Ji(r, e) {
  const t = { ...r ?? {} };
  return Object.entries(e ?? {}).forEach(([s, i]) => {
    t[s] = (Number(t[s] ?? 0) || 0) + (Number(i ?? 0) || 0);
  }), t;
}
function Xi(r = []) {
  const e = {}, t = /* @__PURE__ */ new Set();
  for (const s of r.filter(Boolean)) {
    s.accuracyMod !== void 0 && (e.accuracyMod = (Number(e.accuracyMod ?? 0) || 0) + (Number(s.accuracyMod ?? 0) || 0)), s.ap !== void 0 && (e.ap = (Number(e.ap ?? 0) || 0) + (Number(s.ap ?? 0) || 0)), s.addHeat !== void 0 && (e.addHeat = (Number(e.addHeat ?? 0) || 0) + (Number(s.addHeat ?? 0) || 0)), s.bonusVsArmorTag && (e.bonusVsArmorTag = Ji(e.bonusVsArmorTag, s.bonusVsArmorTag));
    for (const i of s.flags ?? []) {
      const a = String(i ?? "").trim();
      a && t.add(a);
    }
  }
  return t.size > 0 && (e.flags = Array.from(t)), e;
}
function oi(r = []) {
  return Xi(
    Ms(r).map((e) => {
      const t = Qi[String(e).trim().toLowerCase()];
      return typeof t == "function" ? t() : null;
    })
  );
}
function Cs(r) {
  const e = Math.max(0, Number(r ?? 0) || 0);
  return e <= 0 ? 0 : Math.ceil(e / 4);
}
function Zi({
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
  const i = ze(t, "penetrating"), a = St(e), n = Cs(s), o = Number(a[i] ?? 0) || 0;
  return {
    currentArmorRating: s,
    baseMitigation: n,
    typeMitigationMod: o,
    totalMitigation: n + o,
    isDestroyed: !1
  };
}
function ea({ damageIncoming: r = 0, armorTags: e = [], effects: t = {} } = {}) {
  const s = new Set(rs(e));
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
class Je {
  static checkSufficient(e, t, s) {
    if (t > s) {
      const i = V(p.common.errors.insufficient, {
        resource: e,
        required: t,
        available: s
      });
      throw ui.notifications.error(i), i;
    }
  }
  static checkOutOfRange(e, t, s, i) {
    if (t < s || t > i) {
      const a = V(p.common.errors.outOfRange, {
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
      const e = p.common.errors.onlyGM;
      throw ui.notifications.error(e), e;
    }
  }
  static checkItemType(e, t) {
    if (e.type != t) {
      const s = V(p.common.errors.expectedType, {
        type: e.type ? p.itemType.singular[e.type] : e.type,
        expectedType: t
      });
      throw ui.notifications.error(s), s;
    }
  }
  static checkActorCanReceiveDamage(e, t, s) {
    if (!t) {
      const i = V(p.common.errors.actorCannotReceiveDamage, {
        actor: s.name,
        damageType: ni(e) ? Qe(e) : p.actor.monitors[e] ?? p.mwd.weaponDamageType[e] ?? p.mwd.personalDamageType[e] ?? e
      });
      throw ui.notifications.error(i), i;
    }
  }
  static checkWeaponDefense(e, t) {
    var i;
    const s = e.getDefense();
    if ((((i = e.isPersonalWeapon) == null ? void 0 : i.call(e)) ?? e.type === d.itemType.personalWeapon) && !s) {
      const a = V(p.common.errors.noDefenseOnWeapon, { actor: t.name, weapon: e.name });
      throw ui.notifications.error(a), a;
    }
  }
  static checkTargetsCount(e, t, s) {
    if (e > 0 && t.length > e) {
      const i = V(p.common.errors.maxTargetsExceedeed, {
        weapon: this.name,
        area: p.area[s],
        count: t.length,
        max: e
      });
      throw ui.notifications.error(i), i;
    }
  }
  static checkActorDefenseAction(e, t, s) {
    if (!e) {
      const i = V(p.common.errors.actorDoesNotHaveDefense, {
        actor: t.name,
        defense: s.labelkey,
        actorType: p.actorType[t.type]
      });
      throw ui.notifications.error(i), i;
    }
  }
}
function Ee(r, e, t, s, i, a = (n) => !0) {
  return {
    code: r,
    labelkey: p.attributeAction[r],
    label: p.attributeAction[r],
    attributeFunction1: e ?? ((n) => {
    }),
    attributeFunction2: t ?? ((n) => {
    }),
    icon: s,
    actorTypes: i,
    condition: a
  };
}
function Rt(r, e) {
  return {
    code: r,
    labelkey: p.defense[r],
    label: p.defense[r],
    actionCode: e
  };
}
const X = d.actorAttributes, Z = d.actorTypes, me = oe.actions, Ot = oe.defenses, zt = [
  Ee(me.defense, (r) => X.reflexes, (r) => X.intelligence, D.fontAwesome("fas fa-shield-alt"), [Z.character, Z.npc]),
  Ee(me.defense, (r) => X.handling, (r) => X.chassis, D.fontAwesome("fas fa-tachometer-alt"), [Z.vehicle, Z.battlemech]),
  Ee(me.resistTorture, (r) => X.strength, (r) => X.willpower, D.fontAwesome("fas fa-angry"), [Z.character, Z.npc]),
  Ee(me.perception, (r) => X.logic, (r) => X.willpower, D.fontAwesome("fas fa-eye"), [Z.character, Z.npc]),
  Ee(me.perception, (r) => X.system, (r) => X.handling, D.fontAwesome("fas fa-video"), [Z.vehicle, Z.battlemech]),
  Ee(me.composure, (r) => X.charisma, (r) => X.willpower, D.fontAwesome("fas fa-meh"), [Z.character, Z.npc]),
  Ee(me.judgeIntentions, (r) => X.charisma, (r) => X.charisma, D.fontAwesome("fas fa-theater-masks"), [Z.character, Z.npc]),
  Ee(me.memory, (r) => X.logic, (r) => X.logic, D.fontAwesome("fas fa-brain"), [Z.character, Z.npc]),
  Ee(me.catch, (r) => X.reflexes, (r) => X.reflexes, D.fontAwesome("fas fa-baseball-ball"), [Z.character, Z.npc]),
  Ee(me.lift, (r) => X.strength, (r) => X.strength, D.fontAwesome("fas fa-dumbbell"), [Z.character, Z.npc])
], Nt = [
  Rt(Ot.physicalDefense, me.defense),
  Rt(Ot.physicalResistance, me.resistTorture),
  Rt(Ot.socialDefense, me.composure),
  Rt(Ot.mentalResistance, me.perception)
];
class Y {
  static init() {
    Handlebars.registerHelper("fixedDefenseCode", (e) => Y.fixedDefenseCode(e));
  }
  static all(e = void 0) {
    return e ? zt.filter(e) : zt;
  }
  static getActorActions(e) {
    return zt.filter((t) => t.actorTypes.includes(e.type) && t.condition(e));
  }
  static fixedDefenseCode(e) {
    return oe.fixedDefenseCode[e] ?? e;
  }
  static getActorDefenses(e) {
    return Nt.map((t) => {
      const s = Y.getActorAction(e, t.actionCode);
      return Y._convertToDefense(s, t);
    }).filter((t) => t == null ? void 0 : t.code);
  }
  static getDefenseAttributeAction(e) {
    var t;
    return (t = Nt.find((s) => s.code == e)) == null ? void 0 : t.actionCode;
  }
  static getActorAction(e, t) {
    return Y.getActorActions(e).find((s) => s.code == t);
  }
  static getActorDefense(e, t) {
    t = Y.fixedDefenseCode(t);
    const s = Nt.find((a) => a.code == t), i = Y.getActorAction(e, s.actionCode);
    return Je.checkActorDefenseAction(i, e, s), Y._convertToDefense(i, s);
  }
  static _convertToDefense(e, t) {
    return e ? foundry.utils.mergeObject(
      t,
      e ?? {},
      { overwrite: !1, inplace: !1 }
    ) : void 0;
  }
  static getDefenses() {
    return Nt;
  }
  static prepareShortcut(e, t) {
    const s = Y.getActorActions(e).find((i) => i.code == t);
    if (s)
      return {
        icon: s.icon,
        label: s.labelkey,
        callback: (i) => i.actor.rollAttributeAction(t)
      };
  }
}
class ns {
  constructor() {
    this.remoteCalls = {}, game.socket.on(ss, async (e) => this.onSocketMessage(e));
  }
  static async register(e, t) {
    game.system.anarchy.remoteCall._register(e, t);
  }
  async _register(e, t) {
    if (this.remoteCalls[e])
      throw `RemoteCall msg ${e} is already registered`;
    foundry.utils.mergeObject(t, {
      callback: (s) => {
        console.log(j + "RemoteCall [", e, "] (", s, ")");
      },
      condition: (s) => !0,
      multiple: !1
      /* true if multiple users should handle the message */
    }, { overwrite: !1 }), this.remoteCalls[e] = t, console.log(j + "RemoteCall registered", e);
  }
  static call(e, t) {
    return game.system.anarchy.remoteCall._remoteCall(e, t);
  }
  _remoteCall(e, t) {
    const s = this.remoteCalls[e];
    return !s || s.condition(game.user) || !s.multiple && Ce.isUniqueConnectedGM() ? !1 : (game.socket.emit(ss, { msg: e, data: t }), !0);
  }
  async onSocketMessage(e) {
    const t = this.remoteCalls[e.msg];
    if (t) {
      const s = t.condition(game.user), i = t.multiple, a = Ce.isUniqueConnectedGM();
      s && (i || a) ? t.callback(e.data) : console.log(j + "RemoteCall.onSocketMessage(", e, ") ignored :", s, i, a);
    } else
      console.log(j + "RemoteCall: No callback registered for", e);
  }
}
const Os = "Users.blindMessageToGM";
class Ce {
  static init() {
    ns.register(Os, {
      callback: (e) => Ce.blindMessageToGM(e),
      condition: (e) => e.isGM
    });
  }
  static blindMessageToGM(e) {
    ns.call(Os, e) || ChatMessage.create({
      user: e.user,
      whisper: ChatMessage.getWhisperRecipients("GM"),
      blind: !0,
      content: V(p.chat.blindMessageToGM, {
        user: game.user.name,
        message: e.content
      })
    });
  }
  static getUsers(e = (t) => !0) {
    return (game.version ? game.users : game.users.entities).filter(e);
  }
  static firstConnectedGM() {
    return Ce.getUsers((e) => e.isGM && e.active).sort(I.ascending((e) => e.id)).at(0) ?? {};
  }
  /**
   * @returns true pour un seul utilisateur: le premier GM connecté par ordre d'id
   */
  static isUniqueConnectedGM(e = game.user) {
    return e.id == Ce.firstConnectedGM().id;
  }
  static firstResponsible(e) {
    if (!(e != null && e.testUserPermission))
      return;
    const t = Ce.getUsers(
      (s) => s.active && e.testUserPermission(s, CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER)
    ).sort(I.ascending((s) => s.id)).at(0);
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
const Xe = p.actor.monitors, Le = p.actor.counters, li = {
  armor: {
    path: "system.monitors.armor.value",
    monitor: (r) => r.system.monitors.armor,
    iconChecked: D.fontAwesome("fas fa-shield-slash"),
    iconUnchecked: D.fontAwesome("fas fa-shield-alt"),
    iconHit: D.fontAwesome("fas fa-bahai"),
    resource: Xe.armor
  },
  fatigue: {
    path: "system.monitors.fatigue.value",
    monitor: (r) => r.system.monitors.fatigue,
    iconChecked: D.fontAwesome("fas fa-grimace"),
    iconUnchecked: D.fontAwesome("far fa-smile"),
    iconHit: D.fontAwesome("fas fa-bahai"),
    resource: Xe.fatigue,
    overflow: (r) => d.monitors.physical,
    useArmor: !0
  },
  physical: {
    path: "system.monitors.physical.value",
    monitor: (r) => r.system.monitors.physical,
    iconChecked: D.fontAwesome("fas fa-heartbeat"),
    iconUnchecked: D.fontAwesome("far fa-heart"),
    iconHit: D.fontAwesome("fas fa-bahai"),
    resource: Xe.physical,
    useArmor: !0
  },
  structure: {
    path: "system.monitors.structure.value",
    monitor: (r) => r.system.monitors.structure,
    iconChecked: D.fontAwesome("fas fa-car-crash"),
    iconUnchecked: D.fontAwesome("fas fa-car-alt"),
    iconHit: D.fontAwesome("fas fa-bahai"),
    resource: Xe.structure
  },
  heat: {
    path: "system.monitors.heat.value",
    monitor: (r) => r.system.monitors.heat,
    iconChecked: D.fontAwesome("fas fa-fire"),
    iconUnchecked: D.fontAwesome("far fa-sun"),
    iconHit: D.fontAwesome("fas fa-temperature-high"),
    resource: Xe.heat
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
    resource: Xe.structure
  },
  anarchy: {
    path: "system.counters.anarchy.value",
    monitor: (r) => ({
      value: r.system.counters.anarchy.value,
      max: 6
    }),
    iconChecked: D.iconPath(`${dt}/anarchy-point.webp`, "checkbar-img"),
    iconUnchecked: D.iconPath(`${dt}/anarchy-point-off.webp`, "checkbar-img"),
    resource: Le.anarchy
  },
  plot: {
    path: "system.counters.anarchy.value",
    monitor: (r) => {
      const e = r.system.counters.anarchy.value;
      return { value: e, max: e + 1 };
    },
    iconChecked: D.iconPath(`${dt}/danger-point.webp`, "checkbar-img"),
    iconUnchecked: D.iconPath(`${dt}/danger-point-off.webp`, "checkbar-img"),
    resource: Le.anarchy
  },
  sceneAnarchy: {
    path: "system.counters.edgePools.chaos.value",
    monitor: (r) => {
      const e = r.getEdgePoolValue(d.counters.edgePools.chaos), t = r.getAttributeValue(d.actorAttributes.edge);
      return { value: e, max: t };
    },
    iconChecked: D.iconPath("systems/mwd/icons/default/explosion.svg", "checkbar-img"),
    iconUnchecked: D.iconPath("systems/mwd/icons/default/explosion.svg", "checkbar-img"),
    resource: Le.edgePools.chaos
  },
  grit: {
    path: "system.counters.edgePools.grit.value",
    monitor: (r) => ({ value: r.getEdgePoolValue(d.counters.edgePools.grit), max: r.getAttributeValue(d.actorAttributes.edge) }),
    iconChecked: D.iconPath("systems/mwd/icons/default/shield.svg", "checkbar-img"),
    iconUnchecked: D.iconPath("systems/mwd/icons/default/shield.svg", "checkbar-img"),
    resource: Le.edgePools.grit
  },
  insight: {
    path: "system.counters.edgePools.insight.value",
    monitor: (r) => ({ value: r.getEdgePoolValue(d.counters.edgePools.insight), max: r.getAttributeValue(d.actorAttributes.edge) }),
    iconChecked: D.iconPath("systems/mwd/icons/default/eye.svg", "checkbar-img"),
    iconUnchecked: D.iconPath("systems/mwd/icons/default/eye.svg", "checkbar-img"),
    resource: Le.edgePools.insight
  },
  legend: {
    path: "system.counters.edgePools.legend.value",
    monitor: (r) => ({ value: r.getEdgePoolValue(d.counters.edgePools.legend), max: r.getAttributeValue(d.actorAttributes.edge) }),
    iconChecked: D.iconPath("systems/mwd/icons/default/tower-flag.svg", "checkbar-img"),
    iconUnchecked: D.iconPath("systems/mwd/icons/default/tower-flag.svg", "checkbar-img"),
    resource: Le.edgePools.legend
  },
  credibility: {
    path: "system.counters.edgePools.credibility.value",
    monitor: (r) => ({ value: r.getEdgePoolValue(d.counters.edgePools.credibility), max: r.getAttributeValue(d.actorAttributes.edge) }),
    iconChecked: D.iconPath("systems/mwd/icons/misc/hand.svg", "checkbar-img"),
    iconUnchecked: D.iconPath("systems/mwd/icons/misc/hand.svg", "checkbar-img"),
    resource: Le.edgePools.credibility
  },
  rumor: {
    path: "system.counters.edgePools.rumor.value",
    monitor: (r) => ({ value: r.getEdgePoolValue(d.counters.edgePools.rumor), max: r.getAttributeValue(d.actorAttributes.edge) }),
    iconChecked: D.iconPath("systems/mwd/icons/default/mystery-man.svg", "checkbar-img"),
    iconUnchecked: D.iconPath("systems/mwd/icons/default/mystery-man.svg", "checkbar-img"),
    resource: Le.edgePools.rumor
  }
}, Se = foundry.utils.mergeObject(li, {});
class C {
  static init() {
    Handlebars.registerHelper("iconCheckbar", C.iconCheckbar), Handlebars.registerHelper("iconCheckbarHit", C.iconHit);
  }
  static hackCheckbars(e) {
    if (e) {
      const t = foundry.utils.mergeObject(li, {});
      foundry.utils.mergeObject(t, e, { recursive: !0 }), foundry.utils.mergeObject(Se, t, { overwrite: !0 });
    }
  }
  static iconCheckbar(e, t) {
    return t ? C.iconChecked(e) : C.iconUnchecked(e);
  }
  static iconChecked(e) {
    var t;
    return (t = Se[e]) == null ? void 0 : t.iconChecked;
  }
  static iconUnchecked(e) {
    var t;
    return (t = Se[e]) == null ? void 0 : t.iconUnchecked;
  }
  static iconHit(e) {
    var t, s;
    return ((t = Se[e]) == null ? void 0 : t.iconHit) ?? ((s = Se[e]) == null ? void 0 : s.iconChecked);
  }
  static useArmor(e) {
    var t;
    return (t = Se[e]) == null ? void 0 : t.useArmor;
  }
  static max(e, t) {
    var i;
    const s = (i = Se[t]) == null ? void 0 : i.monitor(e);
    return ((s == null ? void 0 : s.max) ?? 0) + ((s == null ? void 0 : s.maxBonus) ?? 0);
  }
  static value(e, t) {
    var i;
    const s = (i = Se[t]) == null ? void 0 : i.monitor(e);
    return (s == null ? void 0 : s.value) ?? 0;
  }
  static resistance(e, t, s = void 0) {
    return C.resistanceDetail(e, t, s).value;
  }
  static resistanceDetail(e, t, s = void 0) {
    var l, c;
    const i = (l = Se[t]) == null ? void 0 : l.monitor(e), a = C._resolveResistance(i == null ? void 0 : i.resistance, s), n = C._resolveResistance(i == null ? void 0 : i.resistanceBonus, s), o = s === void 0 ? 0 : Number(((c = i == null ? void 0 : i.resistanceBonusByType) == null ? void 0 : c[s]) ?? 0);
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
      case d.monitors.anarchy:
        return await C.setAnarchy(e, s);
      case d.monitors.sceneAnarchy:
        return await C.setSceneAnarchy(e, s);
    }
    return await C.setCheckbar(e, t, s);
  }
  static getCounterValue(e, t, s) {
    switch (t) {
      case d.monitors.anarchy:
        return C.getAnarchy(e, t);
    }
    return C.value(e, t);
  }
  static async setCheckbar(e, t, s) {
    if (s == C.getCounterValue(e, t))
      return;
    const i = Se[t];
    if (i.path) {
      const a = C.max(e, t);
      if (a <= 0)
        return;
      await C._manageOverflow(i, e, t, s, a), s = Math.min(s, a), Je.checkOutOfRange(i.resource, s, 0, a), await e.setCheckbarValue(i.path, s);
    }
  }
  static async _manageOverflow(e, t, s, i, a) {
    if (i > a) {
      const n = e.overflow ? e.overflow(t) : void 0, o = e.recomputeOverflow ? e.recomputeOverflow(i - a) : i - a;
      n && o > 0 && (C._notifyOverflow(t, s, o, n), await C.addCounter(t, n, o));
    }
  }
  static _notifyOverflow(e, t, s, i) {
    const a = V(p.actor.monitors.overflow, {
      actor: e.name,
      monitor: p.actor.monitors[t],
      overflow: s,
      overflowMonitor: p.actor.monitors[i]
    });
    ui.notifications.warn(a);
  }
  static async _manageFatigueOverflow(e, t, s) {
    await C.addCounter(e, d.monitors.physical, t - s);
  }
  static async setAnarchy(e, t) {
    if (e.hasOwnAnarchy()) {
      if (e.hasGMAnarchy()) {
        await game.system.anarchy.gmAnarchy.setAnarchy(t), e.render();
        return;
      }
      await C._setAnarchyMonitor(e, d.monitors.anarchy, t);
    }
  }
  static async setSceneAnarchy(e, t) {
    await C._setAnarchyMonitor(e, d.monitors.sceneAnarchy, t);
  }
  static async _setAnarchyMonitor(e, t, s) {
    const i = C.value(e, t);
    await C.setCheckbar(e, t, s), game.user.isGM || C.notifyAnarchyChange(e, t, i, s);
  }
  static getAnarchy(e, t) {
    return !game.user.isGM && (!e.hasOwnAnarchy() || e.hasGMAnarchy()) || t == Le.anarchy && (!e.hasOwnAnarchy() || e.hasGMAnarchy()) ? 0 : C.value(e, t);
  }
  static notifyAnarchyChange(e, t, s, i) {
    Ce.blindMessageToGM({
      from: game.user.id,
      content: V(
        p.gmManager.playerChangedAnarchy,
        {
          user: game.user.name,
          actor: e.name,
          monitor: p.actor.counters[t],
          from: s,
          to: i
        }
      )
    });
  }
}
const { loadTemplates: ta, renderTemplate: sa } = foundry.applications.handlebars, Ns = {
  highlighted: ["far fa-times-circle", "fas fa-dice-one", "fas fa-dice-two", "fas fa-dice-three", "fas fa-dice-four", "fas fa-dice-five", "fas fa-dice-six"],
  dimmed: ["far fa-times-circle", "far fa-dice-one", "far fa-dice-two", "far fa-dice-three", "far fa-dice-four", "far fa-dice-five", "far fa-dice-six"]
};
class $e {
  static init() {
    Hooks.once("ready", async () => await this.onReady()), Handlebars.registerHelper("dice-cursor-array", (e, t) => $e.array(e ?? 0, t ?? 5)), Handlebars.registerHelper("dice-cursor-fas", (e, t) => $e.fasClass(e, t)), Handlebars.registerHelper("dice-cursor-active", (e, t) => $e.activeClass(e, t)), Handlebars.registerHelper("dice-cursor-color", (e, t) => $e.colorClass(e, t));
  }
  static async onReady() {
    await ta([
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
    return $e.isActive(e, t) ? "active" : "inactive";
  }
  static fasClass(e, t) {
    const s = $e.isActive(e, t) ? Ns.highlighted : Ns.dimmed;
    return $e.$getFas(s, Math.abs(e));
  }
  static colorClass(e, t) {
    return e == 0 || !t ? e < 0 ? "fixed-dice-malus" : "fixed-dice-bonus" : e < 0 ? "variable-dice-malus" : "variable-dice-bonus";
  }
  static $getFas(e, t) {
    return e[t > 6 ? t % 6 : t];
  }
  static async diceCursor({ value: e, min: t, max: s, editable: i }) {
    return await sa("systems/mwd/templates/roll/parts/dice-cursor.hbs", {
      value: e,
      min: t,
      max: s,
      editable: i
    });
  }
}
const ee = {
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
}, _s = "anarchy-", ci = `${w}.${ee.ANARCHY_HACK}`, os = {
  id: w,
  name: "Standard Shadowrun Anarchy",
  hack: {
    checkbars: () => Se
  }
};
globalThis.ANARCHY_HOOKS = ee;
globalThis.SETTING_KEY_ANARCHY_HACK = ci;
globalThis.SHADOWRUN_ANARCHY_NO_HACK = os;
class Ke {
  constructor() {
    this.hooks = [], this.hacks = {}, this.hackNames = {}, this.hookMethods = {}, this._register(ee.ANARCHY_HACK), Hooks.on(ee.ANARCHY_HACK, (e) => e(os)), Hooks.on("updateSetting", async (e, t, s, i) => this.onUpdateSetting(e, t, s, i)), Hooks.once("ready", () => this.onReady()), Hooks.on("getSceneControlButtons", (e) => {
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
    Hooks.callAll(ee.ANARCHY_HACK, (e) => {
      this.hacks[e.id] = e, this.hackNames[e.id] = e.name;
    }), game.settings.register(w, ee.ANARCHY_HACK, {
      scope: "world",
      name: p.settings.anarchyHack.name,
      hint: p.settings.anarchyHack.hint,
      config: !0,
      default: os.id,
      choices: this.hackNames,
      type: String
    }), this.applySelectedAnarchyHack();
  }
  async onUpdateSetting(e, t, s, i) {
    e.key == ci && this.applySelectedAnarchyHack();
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
    return this.hacks[game.settings.get(w, ee.ANARCHY_HACK)];
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
    Ke.instance()._register(e);
  }
  _register(e) {
    if (console.log(j + "HooksManager.register", e), !e.startsWith(_s))
      throw `For safety Anarchy Hooks names must be prefixed by '${_s}'`;
    this.hooks.push(e);
  }
}
const Is = [
  d.itemType.assetModule,
  d.itemType.mechWeapon,
  d.itemType.personalWeapon,
  "weapon"
];
class L {
  constructor() {
    this.modifiers = {
      groups: G.mapObjetToKeyValue(p.modifier.group, "key", "label"),
      roll: L._buildGroupOptions("roll"),
      attribute: L._buildGroupOptions("attribute"),
      monitor: L._buildGroupOptions("monitor"),
      other: L._buildGroupOptions("other")
    }, Hooks.once("ready", () => this.onReady());
  }
  static _buildGroupOptions(e) {
    switch (e) {
      case "attribute":
        return {
          label: p.modifier.group[e],
          effects: G.hbsAttributes.map((t) => ({ key: t.value, label: t.labelkey })),
          categories: []
        };
    }
    return {
      label: p.modifier.group[e],
      effects: G.mapObjetToKeyValue(p.modifier[e].effect, "key", "label"),
      categories: G.mapObjetToKeyValue(p.modifier[e].category, "key", "label")
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
                return G.getDamageTypes().map((a) => ({ key: a.value, label: a.labelkey }));
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
        const t = Y.all().map((s) => ({ key: s.code, label: s.labelkey }));
        return I.distinct(t.map((s) => s.key)).map((s) => t.find((i) => i.key == s));
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
            return s.subCategory == e.attributeAction || s.subCategory == Y.getDefenseAttributeAction(e.defenseAction);
        }
      return !1;
    };
  }
  static computeRollModifiers(e, t, s) {
    const i = L.buildRollModifiersFilter(t, s), a = (c) => c.group == "roll" && c.effect == s && i(c), n = L._activeItems(e).map((c) => L.itemModifiers(c, a)).reduce((c, u) => c.concat(u), []).sort(I.descending((c) => c.modifier.value)), o = L.$sumAssetModuleModifiers(n.filter((c) => Is.includes(c.item.type)).map((c) => c.modifier.value)), l = I.sumValues(n.filter((c) => !Is.includes(c.item.type)).map((c) => c.modifier.value));
    return {
      value: o + l,
      sources: n
    };
  }
  static $sumAssetModuleModifiers(e) {
    const t = e.find((a) => a > 3) ?? 0, s = I.sumValues(e.filter((a) => a < 0)), i = Math.min(3, I.sumValues(e.filter((a) => a > 0 && a <= 3)));
    return s + Math.max(i, t);
  }
  static computeModifiers(e, t, s = void 0, i = void 0) {
    const a = L._createFilter(t, s, i), n = L._activeItems(e).map((l) => L.itemModifiers(l, a)).reduce((l, c) => l.concat(c), []);
    return {
      value: I.sumValues(n, (l) => l.modifier.value),
      sources: n
    };
  }
  static sumMonitorModifiers(e, t, s, i = void 0) {
    return L.sumModifiers(L._activeItems(e), "monitor", t, s, i);
  }
  static sumModifiers(e, t, s, i, a = void 0) {
    const n = L._createFilter(t, s, i, a), o = L._activeItems(e).map((l) => L.itemModifiers(l, n)).reduce((l, c) => l.concat(c), []);
    return I.sumValues(o, (l) => l.modifier.value);
  }
  static _createFilter(e, t, s, i = void 0) {
    return (a) => a.group == e && a.effect == (t ?? a.effect) && a.category == (s ?? a.category) && (i == null ? !0 : a.subCategory == i);
  }
  static countModifiers(e, t, s = void 0, i = void 0) {
    const a = L._createFilter(t, s, i);
    return L._activeItems(e).map((o) => L.itemModifiers(o, a)).reduce((o, l) => o.concat(l), []).count;
  }
  static itemModifiers(e, t) {
    return L._listItemModifiers(e, t).map((s) => L._itemModifier(e, s));
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
const { loadTemplates: Kt, renderTemplate: zr } = foundry.applications.handlebars, U = {
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
}, xs = 4, ia = [
  // attribute1
  {
    code: "attribute1",
    options: {
      order: 1,
      category: U.pool,
      hbsTemplateRoll: `${O}/roll/parts/select-attribute.hbs`
    },
    condition: (r) => Object.values(oe.rollType).includes(r.mode),
    isUsed: (r) => !0,
    factory: (r) => {
      var t;
      const e = r.attribute1 ?? ((t = r.skill) == null ? void 0 : t.system.attribute);
      return {
        labelkey: e ? p.attributes[e] : p.attributes.noAttributes,
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
      category: U.pool,
      hbsTemplateRoll: `${O}/roll/parts/select-attribute.hbs`,
      hbsTemplateChat: `${O}/chat/parts/pool-attribute2.hbs`
    },
    condition: (r) => [oe.rollType.attribute, oe.rollType.attributeAction, oe.rollType.defense].includes(r.mode),
    isUsed: (r) => r.used,
    onChecked: (r, e) => r.used = !!e,
    factory: (r) => {
      const e = r.attribute2;
      return {
        labelkey: e ? p.attributes[e] : p.attributes.noAttributes,
        value: r.actor.getAttributeValue(e, r.activeItem),
        flags: { editable: oe.rollType.attribute == r.mode },
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
      category: U.pool,
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
      category: U.pool,
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
      category: U.pool,
      value: 0,
      labelkey: p.common.roll.modifiers.social.credibility,
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
      labelkey: p.common.roll.modifiers.poolModifiers,
      order: 5,
      category: U.pool,
      hbsTemplateRoll: `${O}/roll/parts/input-numeric.hbs`,
      min: -4,
      max: 4
    },
    factory: (r) => Ge.computeRollModifiers(U.pool, r)
  },
  // wounds
  {
    code: "wounds",
    options: {
      flags: { optional: !0 },
      order: 10,
      category: U.pool,
      labelkey: p.common.roll.modifiers.wounds,
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
      category: U.pool,
      value: 0,
      labelkey: p.common.roll.modifiers.other,
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
      category: U.glitch,
      value: 0,
      labelkey: p.common.roll.modifiers.glitch,
      hbsTemplateRoll: `${O}/roll/parts/input-numeric.hbs`,
      hbsTemplateChat: `${O}/chat/parts/glitch.hbs`,
      min: 0,
      max: 5
    },
    isUsed: (r) => r.value > 0,
    factory: (r) => {
      const e = r.actor.getWounds(), t = Ge.computeRollModifiers(U.glitch, r);
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
      category: U.glitch,
      value: 0,
      labelkey: p.common.roll.modifiers.social.rumor,
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
      category: U.reroll,
      labelkey: p.common.roll.modifiers.reroll,
      hbsTemplateRoll: `${O}/roll/parts/input-numeric.hbs`,
      min: 0,
      max: xs
    },
    factory: (r) => {
      const e = Ge.computeRollModifiers(U.reroll, r), t = Ge.computeRollModifiers(U.rerollMax, r);
      return foundry.utils.mergeObject(e, {
        max: xs + Math.max(0, t.value ?? 0)
      });
    }
  },
  // reduction from opponent
  {
    code: "reduced",
    options: {
      order: 29,
      category: U.pool,
      labelkey: p.common.roll.modifiers.reduced,
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
      category: U.rerollForced,
      labelkey: p.common.roll.modifiers.rerollForced,
      hbsTemplateRoll: `${O}/roll/parts/input-numeric.hbs`,
      min: -5,
      max: 0
    },
    factory: (r) => {
      var t;
      const e = Ge.computeRollModifiers(U.successReroll, r);
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
      category: U.pool,
      value: 0,
      min: 0,
      max: 3,
      labelkey: p.common.roll.modifiers.anarchyDisposition,
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
      category: U.risk,
      value: 0,
      labelkey: p.common.roll.modifiers.anarchyRisk,
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
      category: U.edge,
      labelkey: p.common.roll.modifiers.edge,
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
        d.counters.edgePools.grit,
        d.counters.edgePools.chaos,
        d.counters.edgePools.insight,
        d.counters.edgePools.rumor,
        d.counters.edgePools.legend,
        d.counters.edgePools.credibility
      ].map((a) => {
        const n = r.actor.getEdgePoolValue(a);
        return {
          code: a,
          label: p.actor.counters.edgePools[a] ?? a,
          value: n
        };
      }), s = ((i = t.find((a) => a.value > 0)) == null ? void 0 : i.code) ?? d.counters.edgePools.grit;
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
      category: U.opponentPool,
      labelkey: p.common.roll.modifiers.opponentPool,
      hbsTemplateRoll: `${O}/roll/parts/input-numeric.hbs`,
      min: 0,
      max: 4
    },
    factory: (r) => Ge.computeRollModifiers(U.opponentPool, r),
    condition: (r) => !r.attributeAction
  },
  // force opponent rerolls
  {
    code: "opponentReroll",
    options: {
      flags: { editDice: !0, editable: !0, forceDisplay: !0 },
      order: 100,
      category: U.opponentReroll,
      value: 0,
      labelkey: p.common.roll.modifiers.opponentReroll,
      hbsTemplateRoll: `${O}/roll/parts/input-numeric.hbs`,
      min: 0,
      max: 4
    },
    factory: (r) => Ge.computeRollModifiers(U.opponentReroll, r),
    condition: (r) => !r.attributeAction
  }
];
class Ge {
  constructor() {
    this.registeredParameters = {}, Ke.register(ee.REGISTER_ROLL_PARAMETERS), Ke.register(ee.MODIFY_ROLL_PARAMETER), Hooks.on(ee.MODIFY_ROLL_PARAMETER, (e) => this._validate(e)), Hooks.once(ee.REGISTER_ROLL_PARAMETERS, (e) => ia.forEach(
      (t) => e(t)
    )), Hooks.once("ready", () => this.onReady());
  }
  async onReady() {
    Hooks.callAll(ee.REGISTER_ROLL_PARAMETERS, async (t) => {
      Hooks.callAll(ee.MODIFY_ROLL_PARAMETER, t), t.ignore || await this._register(t);
    });
    const e = I.distinct([].concat(Object.values(this.registeredParameters).map((t) => t.options.hbsTemplateRoll)).concat(Object.values(this.registeredParameters).map((t) => t.options.hbsTemplateChat)).filter((t) => typeof t == "string" && t.length > 0));
    await Kt(I.distinct(e)), await Kt([`${O}/roll/parts/parameter-label.hbs`]);
  }
  _validate(e) {
    e.code || (console.error(`${j} RollParameter does not have a code`, e), e.ignore = !0);
  }
  async _register(e) {
    if (this.registeredParameters[e.code]) {
      console.error(`${j} RollParameter ${e.code} is already registered`, e);
      return;
    }
    e.onChecked || (e.onChecked = (t, s) => t.used = s), e.onValue = (t, s) => t.value = s, this.registeredParameters[e.code] = e;
  }
  async _optionalLoadTemplate(e) {
    e && await Kt([e]);
  }
  build(e) {
    return Object.values(this.registeredParameters).filter((t) => !t.condition || t.condition(e)).map((t) => this._computeParameter(t, e));
  }
  compute(e) {
    const t = e.filter((a) => this.isParameterUsed(a)), s = I.classify(t, (a) => a.category), i = {};
    return Object.values(s).forEach((a) => i[a[0].category] = I.sumValues(a, (n) => n.value ?? (n.optional ? 1 : 0))), i;
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
    return L.computeRollModifiers(i, t, e);
  }
}
const { ApplicationV2: aa, HandlebarsApplicationMixin: ra } = foundry.applications.api, { loadTemplates: na, renderTemplate: oa } = foundry.applications.handlebars;
var Ft, mi;
const se = class se extends ra(aa) {
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
    await na([
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
    const s = foundry.utils.mergeObject(se.prepareActorRoll(e), {
      mode: oe.rollType.attribute,
      attribute1: t
    });
    await se.create(s);
  }
  static async rollAttributeAction(e, t) {
    const s = foundry.utils.mergeObject(se.prepareActorRoll(e), {
      mode: oe.rollType.attributeAction,
      attributeAction: t.code,
      attribute1: t.attributeFunction1(e),
      attribute2: t.attributeFunction2(e)
    });
    await se.create(s);
  }
  static async rollSkill(e, t, s) {
    const i = foundry.utils.mergeObject(se.prepareActorRoll(e), {
      mode: oe.rollType.skill,
      skill: t,
      attribute1: (t == null ? void 0 : t.system.attribute) ?? d.actorAttributes.reflexes,
      specialization: s
    });
    await se.create(i);
  }
  static async rollWeapon(e, t, s, i) {
    const a = foundry.utils.mergeObject(se.prepareActorRoll(e), {
      mode: oe.rollType.weapon,
      weapon: s,
      skill: t,
      attribute1: (t == null ? void 0 : t.system.attribute) ?? e.getPhysicalAgility(),
      specialization: t == null ? void 0 : t.system.specialization,
      targeting: i
    });
    await se.create(a);
  }
  static async rollDefense(e, t, s) {
    const i = foundry.utils.mergeObject(se.prepareActorRoll(e), {
      mode: oe.rollType.defense,
      attribute1: t.attributeFunction1(e),
      attribute2: t.attributeFunction2(e),
      defenseAction: t.code,
      attackRoll: s.attackRoll,
      tokenId: s.defenderTokenId,
      choiceChatMessageId: s.choiceChatMessageId
    });
    await se.create(i);
  }
  static async itemAttributeRoll(e, t) {
    const s = foundry.utils.mergeObject(se.prepareActorRoll(e.actor), {
      mode: oe.rollType.attribute,
      item: e,
      attribute1: t,
      attributes: e.actor.getUsableAttributes(e)
    });
    await se.create(s);
  }
  static async create(e) {
    var n;
    const t = R(n = se, Ft, mi).call(n, e), s = await oa(`${O}/roll/roll-dialog-title.hbs`, t), i = {
      id: `roll-dialog-${foundry.utils.randomID()}`,
      classes: [game.system.anarchy.styles.selectCssClass(), ...se.DEFAULT_OPTIONS.classes],
      window: { title: s }
    };
    return new se({ roll: t }, i).render({ force: !0 });
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
      i.onChecked(i, s.currentTarget.checked), i.category == U.pool && await this._updateParameterValue(i, i.value), i.code == "edge" && this.html.find(`.parameter[data-parameter-code='${i.code}'] .edge-pool-select`).prop("disabled", !i.used);
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
    return await $e.diceCursor({
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
Ft = new WeakSet(), mi = function(e) {
  const t = game.system.anarchy.rollParameters.build(e).sort(I.ascending((s) => s.order ?? 200));
  return foundry.utils.mergeObject(e, {
    ENUMS: G.getEnums((s) => e.attributes.includes(s)),
    ANARCHY: p,
    parameters: t
  });
}, re(se, Ft), M(se, "PARTS", {
  body: {
    template: `${O}/roll/roll-dialog.hbs`
  }
});
let Re = se;
const vs = [
  // Strength
  { code: "athletics", label: "Athletics", attribute: "strength", icon: `${x}/athletics.svg`, domains: ["physical"] },
  { code: "heavyWeapons", label: "Heavy Weapons", attribute: "strength", icon: `${x}/heavy-weapons.svg`, defense: "physicalDefense", domains: ["physical"] },
  // Reflexes
  { code: "escapeArtist", label: "Escape Artist", attribute: "reflexes", icon: `${x}/escape-artist.svg`, domains: ["physical"] },
  { code: "gunnery", label: "Gunnery", attribute: "reflexes", icon: `${x}/vehicle-weapons.svg`, defense: "physicalDefense", domains: ["physical"] },
  { code: "meleeCombat", label: "Melee Combat", attribute: "reflexes", icon: `${x}/close-combat.svg`, defense: "physicalDefense", domains: ["physical"] },
  { code: "piloting", label: "Piloting", attribute: "reflexes", icon: `${x}/piloting-ground-steering-wheel.svg`, domains: ["physical"] },
  { code: "projectileWeapons", label: "Projectile Weapons", attribute: "reflexes", icon: `${x}/projectile-weapons.svg`, defense: "physicalDefense", domains: ["physical"] },
  { code: "firearms", label: "Firearms", attribute: "reflexes", icon: `${x}/firearms.svg`, defense: "physicalDefense", domains: ["physical"] },
  { code: "stealth", label: "Stealth", attribute: "reflexes", icon: `${x}/stealth.svg`, domains: ["physical"] },
  { code: "zeroGOps", label: "Zero-G Operations", attribute: "reflexes", icon: `${x}/fly.svg`, domains: ["physical"] },
  // Intelligence
  { code: "art", label: "Art", attribute: "intelligence", icon: `${x}/art.svg`, domains: ["mental"] },
  { code: "artillery", label: "Artillery", attribute: "intelligence", icon: `${x}/artillery.svg`, domains: ["mental"] },
  { code: "systemOps", label: "System Operations", attribute: "intelligence", icon: `${x}/electronics.svg`, domains: ["mental"] },
  { code: "computers", label: "Computers", attribute: "intelligence", icon: `${x}/hacking.svg`, domains: ["mental"] },
  { code: "demolitions", label: "Demolitions", attribute: "intelligence", icon: `${x}/demolition.svg`, domains: ["mental"] },
  { code: "medTech", label: "Medtech", attribute: "intelligence", icon: `${x}/biotech.svg`, domains: ["mental"] },
  { code: "science", label: "Science", attribute: "intelligence", icon: `${x}/skills.svg`, domains: ["mental"] },
  { code: "perception", label: "Perception", attribute: "intelligence", icon: `${x}/skills.svg`, domains: ["mental"] },
  { code: "tactics", label: "Tactics", attribute: "intelligence", icon: `${x}/skills.svg`, domains: ["mental"] },
  { code: "technician", label: "Technician", attribute: "intelligence", icon: `${x}/engineering.svg`, domains: ["mental"] },
  { code: "tracking", label: "Tracking", attribute: "intelligence", icon: `${x}/tracking.svg`, domains: ["physical", "mental"] },
  { code: "navigation", label: "Navigation", attribute: "intelligence", icon: `${x}/piloting-other.svg`, domains: ["mental"] },
  // Guts
  { code: "administration", label: "Administration", attribute: "willpower", icon: `${x}/knowledge.svg`, domains: ["social", "mental"] },
  { code: "animalHandling", label: "Animal Handling", attribute: "willpower", icon: `${x}/animals.svg`, domains: ["physical", "mental"] },
  { code: "survival", label: "Survival", attribute: "willpower", icon: `${x}/survival.svg`, domains: ["physical", "mental"] },
  // Charisma
  { code: "acting", label: "Acting", attribute: "charisma", icon: `${x}/con-art.svg`, domains: ["social"] },
  { code: "disguise", label: "Disguise", attribute: "charisma", icon: `${x}/disguise.svg`, domains: ["social", "mental"] },
  { code: "leadership", label: "Leadership", attribute: "charisma", icon: `${x}/psychology.svg`, domains: ["social"] },
  { code: "negotiation", label: "Negotiation", attribute: "charisma", icon: `${x}/negotiation.svg`, domains: ["social"] },
  { code: "etiquette", label: "Etiquette", attribute: "charisma", icon: `${x}/etiquette.svg`, domains: ["social"] },
  { code: "streetwise", label: "Streetwise", attribute: "charisma", icon: `${x}/etiquette2.svg`, domains: ["social"] },
  { code: "intimidation", label: "Intimidation", attribute: "charisma", icon: `${x}/intimidation.svg`, domains: ["social", "mental"] }
].map(la);
function la(r) {
  return {
    ...r,
    label: r.label ?? r.code,
    icon: r.icon ?? `${Pt}/icons/skills/skills.svg`
  };
}
function kt(r) {
  return vs.find((e) => e.code === r);
}
function ls() {
  return [...vs].sort((r, e) => r.label.localeCompare(e.label));
}
function ca(r) {
  const e = Math.ceil(r.length / 2);
  return { left: r.slice(0, e), right: r.slice(e) };
}
function ua(r) {
  var e, t;
  r.skills ?? (r.skills = {});
  for (const s of vs) {
    const i = (e = r.skills)[t = s.code] ?? (e[t] = {});
    i.rating == null && (i.rating = 0);
  }
}
function ma(r) {
  const e = ls(), { left: t, right: s } = ca(e), i = (a) => {
    var h, f, g, A, T, y;
    const n = a.code, o = a.attribute, l = Number(((f = (h = r == null ? void 0 : r.skills) == null ? void 0 : h[n]) == null ? void 0 : f.rating) ?? 0), c = Number(((A = (g = r == null ? void 0 : r.attributes) == null ? void 0 : g[o]) == null ? void 0 : A.value) ?? 0), u = Number(((y = (T = r == null ? void 0 : r.skills) == null ? void 0 : T[n]) == null ? void 0 : y.bonus) ?? 0), m = c + l + u;
    return {
      code: n,
      label: a.label,
      icon: a.icon,
      attribute: o,
      attributeLabel: G != null && G.localizeAttribute ? G.localizeAttribute(o) : o,
      rating: l,
      base: c,
      bonus: u,
      total: m,
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
const Ls = Object.freeze({
  weapon: d.itemType.personalWeapon,
  shadowamp: d.itemType.assetModule
}), di = Object.freeze({
  contact: "systems/mwd/img/default/mystery-man.svg",
  gear: "systems/mwd/img/default/Default_Gear.svg",
  quality: "systems/mwd/img/default/card-joker.svg",
  assetModule: "systems/mwd/img/default/upgrade.svg",
  skill: "systems/mwd/img/default/Default_Skill.svg",
  lifeModule: "systems/mwd/img/default/book.svg",
  mechWeapon: "systems/mwd/img/default/Default_Weapon.svg",
  personalWeapon: "systems/mwd/img/colt-m1911.svg",
  armor: "systems/mwd/img/default/Default_Armor.svg"
}), Ye = Object.freeze(["close", "near", "far", "extreme"]), $s = Object.freeze({
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
function hi(r) {
  return r === "long" ? "extreme" : r === "short" ? "close" : r === "medium" ? "near" : Ye.includes(r) ? r : "near";
}
function ht(r) {
  return {
    max: hi((r == null ? void 0 : r.max) ?? "near"),
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
function da(r) {
  const e = Ye.indexOf(r);
  return e >= 0 ? e : Ye.indexOf("near");
}
function ha(r = ht({})) {
  const e = ["near", "close", "far", "extreme"], t = da(r.max);
  return e.find((s) => Ye.indexOf(s) <= t) ?? "close";
}
function pa(r) {
  const e = hi(r == null ? void 0 : r.max), t = Ye.indexOf(e);
  return Ye.map((s, i) => ({
    key: s,
    allowed: t >= 0 ? i <= t : i === 0,
    value: (r == null ? void 0 : r[s]) ?? void 0,
    labelkey: G.getFromList(G.getEnums().ranges, s)
  }));
}
function fa(r, e, t, s) {
  let i = Number(e);
  if (t)
    if (s !== void 0)
      i += Math.ceil(Number(s) / 2);
    else
      return console.warn("Weapon not attached to an actor"), K.item.personalWeapon.weaponWithoutActor;
  return i;
}
function ga(r, e, t) {
  let s = "";
  return t && K.attributes[t] && (s += K.attributes[t].substring(0, 3).toUpperCase() + "/2 + "), s += String(e), s;
}
function ya(r, e) {
  return C.useArmor(r) ? e ? "noArmor" : "withArmor" : "";
}
function Ws(r) {
  const e = game.system.mwd.skills.get(r);
  if (!e)
    return {
      img: di.skill,
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
function ba(r) {
  const e = String(r ?? "").trim();
  return !!(!e || e.startsWith("icons/svg/") || e === "icons/mystery-man.svg");
}
var Mt, ve, cs, pi, Lt;
const ne = class ne extends Item {
  static init() {
    B(this, Mt) || (ye(this, Mt, !0), Hooks.on("createItem", (e, t, s) => {
      var i, a;
      Promise.resolve((i = e.onCreateItem) == null ? void 0 : i.call(e, t, s)).catch((n) => {
        console.error(`${j}Item create hook failed`, n);
      }), R(a = ne, ve, cs).call(a, e);
    }), Hooks.on("updateItem", (e) => {
      var t;
      R(t = ne, ve, cs).call(t, e);
    }), Hooks.on("deleteItem", (e) => {
      var t;
      R(t = ne, ve, pi).call(t, e);
    }), Hooks.on("createActiveEffect", (e) => {
      var t;
      R(t = ne, ve, Lt).call(t, e);
    }), Hooks.on("updateActiveEffect", (e) => {
      var t;
      R(t = ne, ve, Lt).call(t, e);
    }), Hooks.on("deleteActiveEffect", (e) => {
      var t;
      R(t = ne, ve, Lt).call(t, e);
    }));
  }
  static canonicalType(e) {
    return Ls[e] ?? e;
  }
  static defaultIconForType(e) {
    return di[this.canonicalType(e)];
  }
  get canonicalType() {
    return this.constructor.canonicalType(this.type);
  }
  async onCreateItem(e, t) {
  }
  async _preCreate(e, t, s) {
    super._preCreate && await super._preCreate(e, t, s);
    const i = (e == null ? void 0 : e.type) ?? this.type, a = this.constructor.canonicalType(i), n = {};
    if (i !== a && Ls[i] && (n.type = a), ba((e == null ? void 0 : e.img) ?? this.img)) {
      const o = this.constructor.defaultIconForType(a);
      o && (n.img = o);
    }
    a === d.itemType.lifeModule && (!(e != null && e.name) || e.name === "DOCUMENT.Item") && (n.name = "MWD.itemType.singular.lifeModule"), Object.keys(n).length && this.updateSource(n);
  }
  async _preUpdate(e, t, s) {
    var o, l;
    if (super._preUpdate && await super._preUpdate(e, t, s), !this.isSkill()) return;
    const i = (o = e == null ? void 0 : e.system) == null ? void 0 : o.code;
    if (i === void 0) return;
    const a = this.system.code;
    if (i === a) return;
    const n = Ws(i);
    n && ((l = n == null ? void 0 : n.system) == null || delete l.code, foundry.utils.mergeObject(e, n, { inplace: !0 }));
  }
  prepareBaseData() {
    super.prepareBaseData();
    const e = this.canonicalType;
    e === d.itemType.personalWeapon ? this._preparePersonalWeaponBaseData() : e === d.itemType.armor && this._prepareArmorBaseData();
  }
  _preparePersonalWeaponBaseData() {
    const e = this.system ?? {};
    e.equipped = !!e.equipped, e.isPrimary = !!e.isPrimary, e.category = String(e.category ?? e.weaponCategory ?? "ranged").trim() || "ranged", e.skill = String(e.skill ?? "firearms").trim() || "firearms", e.ap = Number(e.ap ?? e.armorPiercing ?? 0) || 0, e.damage = Number(e.damage ?? 0) || 0, e.damageType = ze(e.damageType), e.attackRatingBand = Hs(e.attackRatingBand), e.range = ht(e.range), e.traits = _t(e.traits), e.notes = String(e.notes ?? "").trim();
  }
  _prepareArmorBaseData() {
    const e = this.system ?? {};
    e.equipped = !!e.equipped, e.isPrimary = !!e.isPrimary, e.rating = Math.max(0, Number(e.rating ?? 0)), e.defenseBonus = Number(e.defenseBonus ?? 0) || 0, e.mitigationByType = St(e.mitigationByType ?? e.mitigation), delete e.mitigation, e.durability ?? (e.durability = {}), e.durability.max = Math.max(0, Number(e.durability.max ?? e.rating ?? 0)), e.durability.current = Math.min(
      e.durability.max,
      Math.max(0, Number(e.durability.current ?? e.durability.max ?? e.rating ?? 0))
    ), e.tags = rs(e.tags), e.traits = _t(e.traits), e.notes = String(e.notes ?? "").trim();
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
      var i, a;
      const s = (a = (i = t.flags) == null ? void 0 : i[w]) == null ? void 0 : a[ne.EQUIPPED_EFFECT_FLAG];
      return (s == null ? void 0 : s.sourceItemId) === this.id;
    }) : [];
  }
  async removeSyncedActorEffects({ actor: e = this.actor } = {}) {
    const t = this.getSyncedActorEffects({ actor: e });
    return !t.length || !e ? [] : e.deleteEmbeddedDocuments("ActiveEffect", t.map((s) => s.id));
  }
  async syncEquippedActorEffects({ actor: e = this.actor } = {}) {
    var h, f, g, A;
    if (!e || !this.supportsEquippedEffectSync()) return { created: [], updated: [], deleted: [] };
    const t = this.getSyncedActorEffects({ actor: e }), s = Array.from(((h = this.effects) == null ? void 0 : h.contents) ?? []);
    if (!this.shouldApplyEquippedEffects()) {
      if (!t.length) return { created: [], updated: [], deleted: [] };
      const T = await e.deleteEmbeddedDocuments("ActiveEffect", t.map((y) => y.id));
      return { created: [], updated: [], deleted: T };
    }
    const i = /* @__PURE__ */ new Map();
    for (const T of t) {
      const y = (A = (g = (f = T.flags) == null ? void 0 : f[w]) == null ? void 0 : g[ne.EQUIPPED_EFFECT_FLAG]) == null ? void 0 : A.sourceEffectId;
      if (!y) continue;
      const S = i.get(y) ?? [];
      S.push(T), i.set(y, S);
    }
    const a = [], n = [], o = [], l = new Set(s.map((T) => T.id));
    for (const [T, y] of i.entries()) {
      if (!l.has(T)) {
        o.push(...y.map((S) => S.id));
        continue;
      }
      y.length > 1 && o.push(...y.slice(1).map((S) => S.id));
    }
    for (const T of s) {
      const S = (i.get(T.id) ?? [])[0] ?? null, v = this._prepareSyncedActorEffectData(T);
      S ? n.push({ _id: S.id, ...v }) : a.push(v);
    }
    const c = o.length ? await e.deleteEmbeddedDocuments("ActiveEffect", o) : [], u = n.length ? await e.updateEmbeddedDocuments("ActiveEffect", n) : [];
    return { created: a.length ? await e.createEmbeddedDocuments("ActiveEffect", a) : [], updated: u, deleted: c };
  }
  _prepareSyncedActorEffectData(e) {
    const t = e.toObject();
    delete t._id;
    const s = String(e.name ?? "Effect").trim() || "Effect", i = String(this.name ?? "Item").trim() || "Item", a = s.startsWith(i) ? s : `${i}: ${s}`;
    return t.name = a, t.transfer = !1, t.origin = e.uuid ?? this.uuid ?? t.origin ?? null, t.flags = foundry.utils.mergeObject(t.flags ?? {}, {
      [w]: {
        [ne.EQUIPPED_EFFECT_FLAG]: {
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
    this.parent && await Re.itemAttributeRoll(this, e);
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
    I.reindexIds(t), await this.update({ "system.modifiers": t });
  }
  getCombatProfile() {
    if (!this.isPersonalWeapon()) return null;
    const e = this.system ?? {}, t = ht(e.range), s = String(e.skill ?? "").trim(), i = kt(s), a = Number(e.damage ?? 0) || 0, n = Number(e.ap ?? e.armorPiercing ?? 0) || 0, o = String(e.category ?? e.weaponCategory ?? "ranged").trim() || "ranged", l = _t(e.traits), c = oi(l);
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
      damageType: ze(e.damageType),
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
    ), n = St((t == null ? void 0 : t.mitigationByType) ?? (t == null ? void 0 : t.mitigation)), o = rs(t == null ? void 0 : t.tags), l = Cs(a);
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
  getDefaultRangeBand(e = ht(((t) => (t = this.system) == null ? void 0 : t.range)())) {
    return ha(e);
  }
  isWeaponSkill(e) {
    return ((e == null ? void 0 : e.canonicalType) ?? (e == null ? void 0 : e.type)) === d.itemType.skill && e.system.code === this.system.skill;
  }
  getWeaponSkill() {
    var s;
    const e = (s = this.actor) == null ? void 0 : s.items.find((i) => this.isWeaponSkill(i));
    if (e) return e;
    const t = game.items.find((i) => this.isWeaponSkill(i));
    return t || Ws(this.system.skill);
  }
  getDefense() {
    if (!this.isPersonalWeapon())
      return this.system.defense ? Y.fixedDefenseCode(this.system.defense) : void 0;
    if (this.system.defense)
      return Y.fixedDefenseCode(this.system.defense);
    const e = kt(String(this.system.skill ?? "").trim());
    return e != null && e.defense ? Y.fixedDefenseCode(e.defense) : void 0;
  }
  getDamage() {
    if (!this.parent) return;
    const e = this._getMonitor(), t = this.system.damageAttribute ? this.parent.getAttributeValue(this.system.damageAttribute) ?? 0 : 0;
    return {
      value: fa(
        e,
        this.system.damage,
        this.system.damageAttribute,
        t
      ),
      monitor: e,
      damageType: this.system.damageType,
      damageTypeLabel: this.getDamageTypeLabel(),
      noArmor: this.system.noArmor ?? this.system.armorAvoidance,
      armorMode: ya(e, this.system.noArmor ?? this.system.armorAvoidance)
    };
  }
  getDamageCode() {
    return ga(
      this._getMonitor(),
      this.system.damage,
      this.system.damageAttribute
    );
  }
  getDamageTypeLabel() {
    if (this.isPersonalWeapon())
      return Qe(this.system.damageType);
    const e = K.mwd.weaponDamageType[this.system.damageType] ?? K.mwd.personalDamageType[this.system.damageType];
    return e || this.system.damageType;
  }
  getRanges() {
    return pa(ht(this.system.range)).filter((e) => e.allowed).map((e) => ({ value: e.value, labelkey: e.labelkey }));
  }
  validateTargets(e) {
    var n;
    const t = (n = this.getDamage()) == null ? void 0 : n.monitor, s = Ce.getTargetTokens(game.user), i = s.filter((o) => {
      var l;
      return (l = o.actor) == null ? void 0 : l.canReceiveDamage(t);
    }), a = s.filter((o) => {
      var l;
      return !((l = o.actor) != null && l.canReceiveDamage(t));
    }).map((o) => o.name);
    if (a.length > 0) {
      const o = V(K.common.errors.ignoredTargets, {
        targets: a.reduce(I.joiner(", "))
      });
      ui.notifications.info(o);
    }
    if (i.length === 0) {
      const o = V(K.common.errors.noTargetSelected, {
        weapon: this.name ?? K.itemType.singular.weapon
      });
      ui.notifications.info(o);
    } else
      this.checkWeaponTargetsCount(i);
    return i;
  }
  checkWeaponTargetsCount(e) {
    const t = this.system.area, s = $s[t] ?? {};
    Je.checkTargetsCount(s.targets ?? 0, e, t);
  }
  getAreaModifier(e) {
    const t = this.getArea(), s = $s[t] ?? {};
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
Mt = new WeakMap(), ve = new WeakSet(), cs = async function(e) {
  if (typeof (e == null ? void 0 : e.syncEquippedActorEffects) == "function")
    try {
      await e.syncEquippedActorEffects();
    } catch (t) {
      console.error(`${j}Failed to sync equipped item effects`, { item: e, error: t });
    }
}, pi = async function(e) {
  if (typeof (e == null ? void 0 : e.removeSyncedActorEffects) == "function")
    try {
      await e.removeSyncedActorEffects({ actor: e.actor ?? e.parent ?? null });
    } catch (t) {
      console.error(`${j}Failed to remove synced item effects`, { item: e, error: t });
    }
}, Lt = async function(e) {
  const t = e == null ? void 0 : e.parent;
  if (typeof (t == null ? void 0 : t.syncEquippedActorEffects) == "function")
    try {
      await t.syncEquippedActorEffects();
    } catch (s) {
      console.error(`${j}Failed to sync parent item effects`, { effect: e, error: s });
    }
}, re(ne, ve), re(ne, Mt, !1), M(ne, "RANGE_ORDER", Ye), M(ne, "EQUIPPED_EFFECT_FLAG", "equippedItemSync"), M(ne, "DEFAULT_UNARMED", Object.freeze({
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
let at = ne;
class Ut extends at {
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
    const n = Ut.prepareSkill(i);
    n && ((c = n == null ? void 0 : n.system) == null || delete c.code, foundry.utils.mergeObject(e, n, { inplace: !0 }));
  }
}
const Bs = {
  none: { targets: 1, adjust: [0] },
  shotgun: { targets: 2, adjust: [0, -2] },
  circle: { targets: void 0 },
  cone: { targets: void 0 },
  rect: { targets: void 0 },
  ray: { targets: void 0 }
}, wa = {
  code: "weapon-range",
  options: {
    flags: { editable: !0 },
    order: 20,
    category: U.pool,
    labelkey: K.common.roll.modifiers.weaponRange,
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
}, Aa = {
  code: "weapon-area",
  options: {
    used: !0,
    order: 20,
    category: U.pool,
    labelkey: K.common.roll.modifiers.weaponArea,
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
let Ze = (F = class extends at {
  static init() {
    Hooks.once(ee.REGISTER_ROLL_PARAMETERS, (e) => {
      e(Aa), e(wa);
    });
  }
  prepareBaseData() {
    if (super.prepareBaseData(), (this.canonicalType ?? this.type) !== d.itemType.personalWeapon) return;
    const e = this.system ?? {};
    e.equipped = !!e.equipped, e.isPrimary = !!e.isPrimary, e.category = String(e.category ?? e.weaponCategory ?? "ranged").trim() || "ranged", e.skill = String(e.skill ?? "firearms").trim() || "firearms", e.ap = Number(e.ap ?? e.armorPiercing ?? 0) || 0, e.damage = Number(e.damage ?? 0) || 0, e.damageType = ze(e.damageType), e.attackRatingBand = F.normalizeAttackRatingBand(e.attackRatingBand), e.range = F.normalizeRangeData(e.range), e.traits = F.normalizeTraits(e.traits), e.notes = String(e.notes ?? "").trim();
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
    const t = e ?? {}, s = F.normalizeRangeKey(t.max ?? "near"), i = F.maxIndex(s), a = F.RANGE_ORDER.map((l, c) => ({
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
    return e === d.itemType.mechWeapon ? "systems/mwd/img/default/Default_Weapon.svg" : this.defaultIcon;
  }
  static normalizeTraits(e) {
    return Ms(e);
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
    const e = this.system ?? {}, t = this.canonicalType ?? this.type, s = F.normalizeRangeData(e.range), i = String(e.skill ?? "").trim(), a = kt(i), n = Number(e.damage ?? 0) || 0, o = Number(e.ap ?? e.armorPiercing ?? 0) || 0, l = String(e.category ?? e.weaponCategory ?? "ranged").trim() || "ranged", c = F.normalizeTraits(e.traits), u = oi(c);
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
      damageType: t === d.itemType.personalWeapon ? ze(e.damageType) : String(e.damageType ?? "kinetic").trim() || "kinetic",
      attackRatingBand: F.normalizeAttackRatingBand(e.attackRatingBand),
      range: s,
      defaultRangeBand: this.getDefaultRangeBand(s),
      traits: c,
      effects: t === d.itemType.personalWeapon ? u : {},
      notes: String(e.notes ?? e.description ?? "").trim()
    };
  }
  getDefaultRangeBand(e = F.normalizeRangeData(((t) => (t = this.system) == null ? void 0 : t.range)())) {
    const s = ["near", "close", "far", "extreme"], i = F.maxIndex(e.max);
    return s.find((a) => F.RANGE_ORDER.indexOf(a) <= i) ?? "close";
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
    return t || Ut.prepareSkill(this.system.skill);
  }
  getDefense() {
    if ((this.canonicalType ?? this.type) !== d.itemType.personalWeapon)
      return this.system.defense ? Y.fixedDefenseCode(this.system.defense) : void 0;
    if (this.system.defense)
      return Y.fixedDefenseCode(this.system.defense);
    const e = kt(String(this.system.skill ?? "").trim());
    return e != null && e.defense ? Y.fixedDefenseCode(e.defense) : void 0;
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
  static damageValue(e, t, s, i) {
    if (t = Number(t), s)
      if (i !== void 0)
        t = t + Math.ceil(Number(i) / 2);
      else
        return console.warn("Weapon not attached to an actor"), K.item.personalWeapon.weaponWithoutActor;
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
    let i = "";
    return s && K.attributes[s] && (i += K.attributes[s].substring(0, 3).toUpperCase() + "/2 + "), i += String(t), i;
  }
  static armorMode(e, t) {
    return C.useArmor(e) ? t ? "noArmor" : "withArmor" : "";
  }
  getDamageTypeLabel() {
    if ((this.canonicalType ?? this.type) === d.itemType.personalWeapon)
      return Qe(this.system.damageType);
    const e = K.mwd.weaponDamageType[this.system.damageType] ?? K.mwd.personalDamageType[this.system.damageType];
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
    return F.RANGE_ORDER.map((i, a) => ({
      key: i,
      allowed: s >= 0 ? a <= s : a === 0,
      value: (e == null ? void 0 : e[i]) ?? (i === "extreme" && (e == null ? void 0 : e.long) !== void 0 ? e.long : void 0),
      labelkey: G.getFromList(G.getEnums().ranges, i)
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
    const t = (n = this.getDamage()) == null ? void 0 : n.monitor, s = Ce.getTargetTokens(game.user), i = s.filter((o) => {
      var l;
      return (l = o.actor) == null ? void 0 : l.canReceiveDamage(t);
    }), a = s.filter((o) => {
      var l;
      return !((l = o.actor) != null && l.canReceiveDamage(t));
    }).map((o) => o.name);
    if (a.length > 0) {
      const o = V(K.common.errors.ignoredTargets, {
        targets: a.reduce(I.joiner(", "))
      });
      ui.notifications.info(o);
    }
    if (i.length == 0) {
      const o = V(K.common.errors.noTargetSelected, {
        weapon: this.name ?? K.itemType.singular.weapon
      });
      ui.notifications.info(o);
    } else
      this.checkWeaponTargetsCount(i);
    return i;
  }
  checkWeaponTargetsCount(e) {
    const t = this.system.area, s = Bs[t] ?? {};
    Je.checkTargetsCount(s.targets ?? 0, e, t);
  }
  getAreaModifier(e) {
    const t = this.getArea(), s = Bs[t] ?? {};
    return s.targets && s.adjust && e <= s.targets ? s.adjust[e - 1] ?? 0 : 0;
  }
  getArea() {
    return this.system.area == "" ? d.area.none : this.system.area ?? d.area.none;
  }
  _getMonitor() {
    return (this.canonicalType ?? this.type) === d.itemType.personalWeapon ? d.monitors.physical : this.system.monitor || d.monitors.physical;
  }
}, M(F, "RANGE_ORDER", ["close", "near", "far", "extreme"]), M(F, "DEFAULT_UNARMED", Object.freeze({
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
})), F);
function Ta(r) {
  const e = [];
  for (let [t, s] of Object.entries(r ?? {}))
    s !== void 0 && (t = t.replace(/[A-Z]+(?![a-z])|[A-Z]/g, (i, a) => (a ? "-" : "") + i.toLowerCase()), e.push(`data-${t}="${Handlebars.escapeExpression(s)}"`));
  return new Handlebars.SafeString(e.join(" "));
}
function Sa({ hash: r }) {
  return r;
}
function ka() {
  var r, e;
  return ((e = (r = foundry == null ? void 0 : foundry.applications) == null ? void 0 : r.handlebars) == null ? void 0 : e.Handlebars) ?? Handlebars;
}
class Ps {
  constructor() {
    this.registerHelpers(), Hooks.once("init", () => {
      this.registerHelpers(), console.log(`${j}Handlebars helpers registered (init)`);
    }), console.log(`${j}Handlebars helpers registered (ctor)`);
  }
  registerHelpers() {
    const e = ka(), t = {
      // Foundry utils
      getProperty: foundry.utils.getProperty,
      // DND5E-inspired utilities
      "mwd-dataset": Ta,
      "mwd-object": Sa,
      // Simple comparisons
      eq: (s, i) => s === i,
      ne: (s, i) => s !== i,
      // Strings/arrays
      concat: (...s) => I.join(s.slice(0, -1)),
      join: (s, i = " ") => Array.isArray(s) ? s.join(i) : "",
      includes: (s, i) => s == null ? void 0 : s.includes(i),
      length: (s) => (s == null ? void 0 : s.length) || 0,
      substring: (s, i, a) => s == null ? void 0 : s.substring(i, a),
      toUpperCase: qi.toUpperCaseNoAccent,
      // Math
      modulo: (s, i) => s % i,
      divint: I.divint,
      divup: I.divup,
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
      weaponDamageLetter: Vi.letter,
      weaponDamageCode: Ze.damageCode,
      weaponDamageValue: Ze.damageValue,
      weaponArmorMode: Ze.armorMode,
      weaponRangeList: Ze.getRangeList,
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
    let i = "";
    for (let a = e; a < t; ++a) i += s.fn(a);
    return i;
  }
}
const Fs = "sheetTheme", us = "mwd-theme-default", Ma = "mwd-theme-sra", Ca = [
  { name: "Default (CSB)", cssClass: us },
  { name: "SRA", cssClass: Ma }
];
class va {
  constructor() {
    this.availableStyles = {}, Ke.register(ee.REGISTER_STYLES), Hooks.once(ee.REGISTER_STYLES, (e) => Ca.forEach((t) => e(t.cssClass, t.name))), Hooks.once("ready", () => this.onReady());
  }
  async onReady() {
    Hooks.callAll(ee.REGISTER_STYLES, (e, t) => this.availableStyles[e] = t), console.log(j + "Loaded styles", this.availableStyles), game.settings.register(w, Fs, {
      scope: "world",
      name: "Sheet Theme",
      hint: "Select the visual theme used by MWD sheets.",
      config: !0,
      default: us,
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
    const e = game.settings.get(w, Fs);
    return this.availableStyles[e] ? e : us;
  }
}
const Pa = /* @__PURE__ */ new Set(["overloaded"]);
function Gs(r) {
  return r ? (r == null ? void 0 : r.document) ?? r : null;
}
function Ea(r, e) {
  var s, i, a;
  if (!r) return null;
  const t = Gs(e) ?? Gs(r == null ? void 0 : r.token);
  return t ? t.isLinked ? t.baseActor ?? ((a = (s = game.actors) == null ? void 0 : s.get) == null ? void 0 : a.call(s, ((i = t == null ? void 0 : t.baseActor) == null ? void 0 : i.id) ?? "")) ?? t.actor ?? r : t.actor ?? r : r;
}
function fi(r) {
  const e = String(r ?? "").trim();
  if (!e) return "Status";
  const i = (e.includes(".") ? e.split(".").at(-1) : e).replace(/^status/i, "").replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim();
  return i ? i.replace(/\b\w/g, (a) => a.toUpperCase()) : e;
}
function Da(r) {
  const e = String((r == null ? void 0 : r.name) ?? (r == null ? void 0 : r.label) ?? (r == null ? void 0 : r.id) ?? "Status").trim();
  return e ? fi(e) : "Status";
}
function Ra(r) {
  const e = typeof (r == null ? void 0 : r.img) == "string" ? r.img.trim() : "";
  if (e) return e;
  const t = r ? Object.getOwnPropertyDescriptor(r, "icon") : null;
  return "value" in (t ?? {}) ? String(t.value ?? "").trim() : "";
}
function Wt(r, e) {
  var t, s, i, a, n, o;
  return e === "overloaded" ? !!((s = (t = r == null ? void 0 : r.system) == null ? void 0 : t.burn) != null && s.overloaded) || !!((a = (i = r == null ? void 0 : r.statuses) == null ? void 0 : i.has) != null && a.call(i, e)) : ((o = (n = r == null ? void 0 : r.statuses) == null ? void 0 : n.has) == null ? void 0 : o.call(n, e)) ?? !1;
}
function Es(r) {
  const e = /* @__PURE__ */ new Set();
  return (CONFIG.statusEffects ?? []).filter((t) => {
    const s = String((t == null ? void 0 : t.id) ?? "").trim();
    return !s || e.has(s) ? !1 : (e.add(s), !0);
  }).map((t) => {
    const s = String(t.id).trim();
    return {
      id: s,
      label: Da(t),
      icon: Ra(t),
      active: Wt(r, s),
      managed: Pa.has(s)
    };
  }).sort((t, s) => t.active !== s.active ? t.active ? -1 : 1 : t.label.localeCompare(s.label));
}
function Oa(r) {
  if (!r.length)
    return "<p>No token statuses are configured.</p>";
  const e = foundry.utils.escapeHTML;
  return `
    <div class="mwd-token-status-dialog">
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
    </div>
  `;
}
async function Na({ actor: r, effects: e, selectedStatusIds: t }) {
  const s = new Set(t);
  for (const i of e) {
    const a = s.has(i.id);
    await gi({ actor: r, statusId: i.id, active: a });
  }
}
async function gi({ actor: r, statusId: e, active: t }) {
  if (!r || !e) return !1;
  const s = Wt(r, e);
  return !!t === s ? !1 : e === "overloaded" ? (await r.update({ "system.burn.overloaded": !!t }), !0) : (await r.toggleStatusEffect(e, { active: !!t, overlay: !1 }), !0);
}
async function _a({ actor: r, token: e } = {}) {
  var i;
  if (!r || !e) return !1;
  const t = Ea(r, e), s = Es(t);
  return s.length ? foundry.applications.api.DialogV2.wait({
    window: {
      title: `Token Statuses: ${e.name ?? r.name ?? "Token"}`
    },
    position: {
      width: 420
    },
    content: Oa(s),
    buttons: [
      {
        action: "apply",
        label: "Apply",
        icon: "fa-solid fa-check",
        default: !0,
        callback: async (a, n) => {
          var o, l;
          try {
            const c = Array.from(
              ((o = n.form) == null ? void 0 : o.querySelectorAll('input[name="status"]:checked')) ?? []
            ).map((u) => u.value);
            return await Na({ actor: t, effects: s, selectedStatusIds: c }), !0;
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
const ct = "mwd", ut = "personalCombat", ms = 3, Ia = 1, xa = 1;
function Us(r, e) {
  return !(r != null && r.activation) || !e ? !1 : r.activation.combatId === e.combatId && Number(r.activation.round ?? -1) === Number(e.round ?? -1) && Number(r.activation.turn ?? -1) === Number(e.turn ?? -1) && r.activation.combatantId === e.combatantId;
}
function ds(r = null) {
  return {
    saRemaining: ms,
    faRemaining: Ia,
    raRemaining: xa,
    saSpentThisActivation: 0,
    burnThisActivation: 0,
    attacksThisActivation: 0,
    actionLog: [],
    activation: r
  };
}
function js(r, e = null) {
  return foundry.utils.mergeObject(
    ds(e),
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
function La(r) {
  const e = (CONFIG.statusEffects ?? []).find((s) => String((s == null ? void 0 : s.id) ?? "").trim() === r), t = String((e == null ? void 0 : e.name) ?? (e == null ? void 0 : e.label) ?? r ?? "").trim();
  return fi(t);
}
class J {
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
    var g, A, T, y;
    const s = (g = canvas == null ? void 0 : canvas.scene) == null ? void 0 : g.id, i = this._asTokenDocument(t);
    if (this._getTokenSceneId(i) === s) return i;
    const a = String((i == null ? void 0 : i.id) ?? (t == null ? void 0 : t.id) ?? "").trim();
    if (a) {
      const S = this._getSceneTokenDocumentById(a, s);
      if (S) return S;
    }
    const n = this.getPreferredTokenDocument(e);
    if (this._getTokenSceneId(n) === s) return n;
    const o = String((n == null ? void 0 : n.id) ?? "").trim();
    if (o) {
      const S = this._getSceneTokenDocumentById(o, s);
      if (S) return S;
    }
    const c = ((T = (((A = e == null ? void 0 : e.getActiveTokens) == null ? void 0 : A.call(e, !0, !0)) ?? []).find((S) => {
      var v, k;
      return ((k = (v = S == null ? void 0 : S.document) == null ? void 0 : v.parent) == null ? void 0 : k.id) === s;
    })) == null ? void 0 : T.document) ?? null;
    if (c) return c;
    const u = Array.from(((y = canvas == null ? void 0 : canvas.scene) == null ? void 0 : y.tokens) ?? []), m = this._collectActorIds(e, n), h = u.filter((S) => this._tokenDocumentMatchesActor(S, e, m));
    return h.find((S) => {
      var v, k, _;
      return ((v = S == null ? void 0 : S.combatant) == null ? void 0 : v.id) === ((_ = (k = game.combat) == null ? void 0 : k.combatant) == null ? void 0 : _.id);
    }) ?? null ?? h[0] ?? null;
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
    var h, f, g, A;
    const s = (h = canvas == null ? void 0 : canvas.scene) == null ? void 0 : h.id, i = game.combat, a = this.getCurrentSceneTokenDocument(e, t), n = (a == null ? void 0 : a.object) ?? this._getSceneTokenById((a == null ? void 0 : a.id) ?? null);
    if (!i || ((f = i.scene) == null ? void 0 : f.id) !== s)
      return {
        combat: null,
        combatant: null,
        token: n,
        tokenDocument: a
      };
    let o = ((A = (g = a == null ? void 0 : a.combatant) == null ? void 0 : g.combat) == null ? void 0 : A.id) === i.id ? a.combatant : null;
    const l = Array.from(i.combatants ?? []);
    if (!o) {
      const T = this._collectActorIds(e, a), y = l.filter((k) => {
        const _ = String((k == null ? void 0 : k.tokenId) ?? "").trim();
        if (a && _ === String(a.id ?? "").trim() || T.has(String((k == null ? void 0 : k.actorId) ?? "").trim())) return !0;
        const q = this._asTokenDocument(k == null ? void 0 : k.token) ?? this._getSceneTokenDocumentById(_, s);
        return this._tokenDocumentMatchesActor(q, e, T);
      }), S = y.find((k) => {
        var _;
        return k.id === ((_ = i == null ? void 0 : i.combatant) == null ? void 0 : _.id);
      }) ?? null, v = y.find(
        (k) => a && String((k == null ? void 0 : k.tokenId) ?? "").trim() === String(a.id ?? "").trim()
      ) ?? null;
      o = S ?? v ?? y[0] ?? null;
    }
    !o && l.length === 1 && (n || e) && (o = l[0]);
    const c = this._asTokenDocument(o == null ? void 0 : o.token) ?? this._getSceneTokenDocumentById((o == null ? void 0 : o.tokenId) ?? null, s), u = a ?? c ?? null, m = n ?? (c == null ? void 0 : c.object) ?? this._getSceneTokenById((o == null ? void 0 : o.tokenId) ?? null) ?? null;
    return {
      combat: i,
      combatant: o,
      token: m,
      tokenDocument: u
    };
  }
  static getSnapshot(e, { token: t = null } = {}) {
    var T, y, S, v, k;
    const {
      combat: s,
      combatant: i,
      token: a,
      tokenDocument: n
    } = this.getCombat(e, t), o = !!i && ((T = s == null ? void 0 : s.combatant) == null ? void 0 : T.id) === i.id, l = i ? this.getActivationIdentity(s, i) : null, c = i ? i.getFlag(ct, ut) : null, u = i && o && Us(c, l) ? js(c, l) : ds(l);
    u.actionLog = Yt(u.actionLog);
    const m = Math.max(0, Number(((S = (y = e == null ? void 0 : e.system) == null ? void 0 : y.burn) == null ? void 0 : S.value) ?? 0)), h = Math.floor(m / 2), f = !!((k = (v = e == null ? void 0 : e.system) == null ? void 0 : v.burn) != null && k.overloaded), g = this.getActiveStatuses(e), A = i ? o ? "" : "Waiting for this combatant's activation." : "No combatant on the current scene.";
    return {
      token: a,
      tokenDocument: n,
      combat: s,
      combatant: i,
      hasCombatant: !!i,
      isCurrentTurn: o,
      overloaded: f,
      burn: {
        value: m,
        penalty: h,
        canOverloadCheck: m >= 6 && !f
      },
      state: u,
      statuses: g,
      summaryText: `SA: ${u.saRemaining} / ${ms}   FA: ${u.faRemaining}   RA: ${u.raRemaining}`,
      inactiveReason: A,
      modifierSummary: this.getModifierSummary(e, h)
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
      label: La(s)
    })).sort((s, i) => s.label.localeCompare(i.label));
  }
  static buildActionModel(e, t) {
    var f;
    const s = t.hasCombatant ? "" : "No current-scene combatant.", i = t.isCurrentTurn ? "" : "Only during your activation.", a = t.overloaded ? "Overloaded: only Burn recovery is allowed." : "", n = s || i || a, o = [
      { id: "move", label: "Move", resource: "sa", cost: 1, supported: !0 },
      { id: "aim", label: "Aim", resource: "sa", cost: 1, supported: !0 },
      { id: "reload", label: "Reload", resource: "sa", cost: 1, supported: !0 },
      { id: "assist", label: "Assist", resource: "sa", cost: 1, supported: !0 },
      { id: "stand", label: "Stand", resource: "sa", cost: 1, supported: !0 }
    ].map((g) => this._buildSpendAction(t, g, n)), l = s || i || a || (t.state.saRemaining < 2 ? "Need 2 SA remaining." : ""), c = [
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
    ].map((g) => g.handler ? g : this._buildStubAction(g)), u = s || i || (t.state.saRemaining <= 0 ? "No SA remaining." : "") || (t.burn.value <= 0 ? "Burn is already at 0." : ""), m = s || i || (t.burn.canOverloadCheck ? "" : t.overloaded ? "Already Overloaded." : "Burn below 6."), h = s || i;
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
        { label: "SA", value: `${t.state.saRemaining}/${ms}` },
        { label: "FA", value: `${t.state.faRemaining}` },
        { label: "RA", value: `${t.state.raRemaining}` }
      ],
      activationLog: Yt((f = t.state) == null ? void 0 : f.actionLog).map((g, A) => ({
        ...g,
        index: A + 1
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
            }, h),
            this._buildSpendAction(t, {
              id: "spendRA",
              label: "Spend RA",
              resource: "ra",
              cost: 1,
              supported: !0
            }, h)
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
    const s = this.getActivationIdentity(e, t), i = t.getFlag(ct, ut);
    Us(i, s) || await t.setFlag(ct, ut, ds(s));
  }
  static async spendResource(e, {
    token: t = null,
    resource: s = "sa",
    cost: i = 1,
    actionId: a = "",
    actionLabel: n = "",
    actionCostLabel: o = ""
  } = {}) {
    var h;
    const l = this.getSnapshot(e, { token: t });
    if (!l.hasCombatant)
      return { ok: !1, reason: "No combatant on the current scene." };
    if (!l.isCurrentTurn)
      return { ok: !1, reason: "Only available during your activation." };
    const c = `${s}Remaining`, u = Number(((h = l.state) == null ? void 0 : h[c]) ?? 0);
    if (u < i)
      return { ok: !1, reason: `No ${String(s).toUpperCase()} remaining.` };
    const m = js(l.state, this.getActivationIdentity(l.combat, l.combatant));
    return m[c] = Math.max(0, u - i), s === "sa" && (m.saSpentThisActivation = Number(m.saSpentThisActivation ?? 0) + i, a === "attack" && (m.attacksThisActivation = Number(m.attacksThisActivation ?? 0) + 1)), this._appendActionLog(m, {
      id: a,
      label: n,
      costLabel: o || this._formatCostLabel(s, i)
    }), await l.combatant.setFlag(ct, ut, m), { ok: !0, snapshot: this.getSnapshot(e, { token: l.token }) };
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
    foundry.utils.hasProperty(t, `flags.${ct}.${ut}`) && this.renderOpenCharacterSheets((s = e == null ? void 0 : e.actor) == null ? void 0 : s.id);
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
function wt(r) {
  return r ? (r == null ? void 0 : r.document) ?? r : null;
}
function Qt(r, e) {
  var s, i, a;
  if (!r) return null;
  const t = wt(e) ?? wt(r == null ? void 0 : r.token);
  return t ? t.isLinked ? t.baseActor ?? ((a = (s = game.actors) == null ? void 0 : s.get) == null ? void 0 : a.call(s, ((i = t == null ? void 0 : t.baseActor) == null ? void 0 : i.id) ?? "")) ?? t.actor ?? r : t.actor ?? r : r;
}
function Vs(r) {
  const e = Number(r ?? 0);
  return Number.isFinite(e) ? Math.trunc(e) : 0;
}
function It(r, e) {
  var t, s, i;
  return Math.max(0, Number(((i = (s = (t = r == null ? void 0 : r.system) == null ? void 0 : t.monitors) == null ? void 0 : s[e]) == null ? void 0 : i.value) ?? 0) || 0);
}
function qs(r) {
  var e, t;
  return Math.max(0, Number(((t = (e = r == null ? void 0 : r.system) == null ? void 0 : e.burn) == null ? void 0 : t.value) ?? 0) || 0);
}
function pt(r) {
  return r === d.monitors.physical ? "Physical" : r === d.monitors.fatigue ? "Fatigue" : String(r ?? "").trim() || "Track";
}
function $a(r, e) {
  var t;
  return ((t = Es(e).find((s) => s.id === r)) == null ? void 0 : t.label) ?? r;
}
function Ha(r) {
  const e = foundry.utils.escapeHTML, t = [];
  if (r.mode === "attackDamage" || r.mode === "trackDelta") {
    const s = r.appliedDelta >= 0 ? "Applied" : "Recovered", i = Math.abs(Number(r.appliedDelta ?? 0)), a = i === 1 ? "point" : "points", n = r.usedArmor ? ` via armor-aware ${e(Qe(r.damageType))}` : "";
    t.push(`<div><b>${s}:</b> ${i} ${a} to ${e(pt(r.track))}${n}</div>`), r.usedArmor && r.mitigation && t.push(
      `<div><b>Mitigation:</b> base ${Number(r.mitigation.baseMitigation ?? 0)} + type ${Number(r.mitigation.typeMitigationMod ?? 0)} - AP ${Number(r.effectiveAp ?? 0)} = ${Number(r.mitigation.netResistance ?? 0)}</div>`
    );
  }
  if (r.mode === "burnDelta") {
    const s = r.appliedDelta >= 0 ? "Adjusted Burn +" : "Adjusted Burn -";
    t.push(`<div><b>${s}</b>${Math.abs(Number(r.appliedDelta ?? 0))}</div>`);
  }
  return r.mode === "status" && t.push(
    `<div><b>Status:</b> ${r.active ? "Applied" : "Removed"} ${e(r.statusLabel ?? r.statusId ?? "Status")}</div>`
  ), t.push(`<div><b>Target:</b> ${e(r.actorName ?? "Actor")}</div>`), r.beforeLabel && r.afterLabel && t.push(`<div><b>Result:</b> ${e(r.beforeLabel)} -> ${e(r.afterLabel)}</div>`), r.source && t.push(`<div><b>Source:</b> ${e(r.source)}</div>`), r.notes && t.push(`<div><b>Notes:</b> ${e(r.notes)}</div>`), `<div class="mwd-gm-notice"><b>GM Harm:</b>${t.join("")}</div>`;
}
function Wa(r) {
  var t, s;
  const e = (s = (t = game.settings) == null ? void 0 : t.get) == null ? void 0 : s.call(t, "core", "rollMode");
  return typeof ChatMessage.applyRollMode == "function" && ChatMessage.applyRollMode(r, e), r;
}
class Oe {
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
    return Es(e).map((t) => ({
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
      const a = wt(e[0]), n = Qt((a == null ? void 0 : a.actor) ?? null, a);
      return this._resolveSceneTargetResult(n, a);
    }
    const t = Array.from(((i = game.user) == null ? void 0 : i.targets) ?? []);
    if (t.length > 1)
      return { actor: null, token: null, reason: "Target only one token." };
    if (t.length === 1) {
      const a = wt(t[0]), n = Qt((a == null ? void 0 : a.actor) ?? null, a);
      return this._resolveSceneTargetResult(n, a);
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
    const a = wt(t);
    if (a) {
      const c = Qt((a == null ? void 0 : a.actor) ?? e, a), u = this._resolveSceneTargetResult(c, a);
      if (u.actor) return { ...u, source: "token" };
    }
    if (i) {
      const c = this.getSceneTarget();
      if (c.actor) return { ...c, source: "scene" };
    }
    if (e && this.supportsActor(e))
      return { actor: e, token: a, reason: "", source: "actor" };
    const n = s ? ((l = (o = game.actors) == null ? void 0 : o.get) == null ? void 0 : l.call(o, s)) ?? null : null;
    return n && this.supportsActor(n) ? { actor: n, token: null, reason: "", source: "fallback" } : {
      actor: null,
      token: a,
      source: null,
      reason: i && this.getSceneTarget().reason || "Choose a supported character target."
    };
  }
  static async apply({ actor: e = null, token: t = null, payload: s = {}, options: i = {} } = {}) {
    var l;
    const a = this.resolveTarget({
      actor: e,
      token: t,
      actorId: i.actorId ?? "",
      preferSceneTarget: !!i.preferSceneTarget
    });
    if (!a.actor)
      return { ok: !1, reason: a.reason || "Choose a supported character target." };
    let n;
    switch (String((s == null ? void 0 : s.mode) ?? "").trim()) {
      case "attackDamage":
        n = await this._applyAttackDamage(a.actor, s);
        break;
      case "trackDelta":
        n = await this._applyTrackDelta(a.actor, s);
        break;
      case "burnDelta":
        n = await this._applyBurnDelta(a.actor, s);
        break;
      case "status":
        n = await this._applyStatus(a.actor, s);
        break;
      default:
        return { ok: !1, reason: "Unsupported harm mode." };
    }
    const o = {
      ok: !0,
      actor: a.actor,
      token: a.token,
      actorName: a.actor.name || "Character",
      sourceType: a.source,
      ...n
    };
    if (i.logToChat) {
      const c = Ha(o), u = Wa({
        speaker: ChatMessage.getSpeaker({ actor: a.actor, token: a.token }),
        content: c
      });
      await ChatMessage.create(u);
    }
    return (l = J.renderOpenCharacterSheets) == null || l.call(J, a.actor.id), o;
  }
  static async _applyTrackDelta(e, t) {
    const s = (t == null ? void 0 : t.track) === d.monitors.fatigue ? d.monitors.fatigue : d.monitors.physical, i = Vs((t == null ? void 0 : t.delta) ?? (t == null ? void 0 : t.amount) ?? 0);
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
    const n = It(e, s);
    await C.addCounter(e, s, i);
    const o = It(e, s);
    return {
      mode: "trackDelta",
      track: s,
      requestedDelta: i,
      appliedDelta: o - n,
      usedArmor: !1,
      beforeLabel: `${pt(s)} ${n}`,
      afterLabel: `${pt(s)} ${o}`,
      source: String((t == null ? void 0 : t.source) ?? "").trim(),
      notes: String((t == null ? void 0 : t.notes) ?? "").trim()
    };
  }
  static async _applyBurnDelta(e, t) {
    var l, c;
    const s = Vs((t == null ? void 0 : t.delta) ?? (t == null ? void 0 : t.amount) ?? 0), i = qs(e), a = Math.max(0, i + s), n = { "system.burn.value": a };
    a === 0 && ((c = (l = e.system) == null ? void 0 : l.burn) != null && c.overloaded) && (n["system.burn.overloaded"] = !1), await e.update(n);
    const o = qs(e);
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
    const i = Wt(e, s), a = !!(t != null && t.active);
    await gi({ actor: e, statusId: s, active: a });
    const n = Wt(e, s);
    return {
      mode: "status",
      statusId: s,
      statusLabel: $a(s, e),
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
    var _, q, W, ie;
    const s = (t == null ? void 0 : t.track) === d.monitors.fatigue ? d.monitors.fatigue : d.monitors.physical, i = Math.max(0, Number((t == null ? void 0 : t.damage) ?? 0) || 0), a = Math.max(0, Number((t == null ? void 0 : t.netHits) ?? 0) || 0), n = (t == null ? void 0 : t.effects) ?? {}, o = ((_ = e.getPersonalCombatLoadout) == null ? void 0 : _.call(e, { refresh: !0 })) ?? null, l = (o == null ? void 0 : o.activeArmor) ?? null, c = Math.max(0, Number((l == null ? void 0 : l.currentArmorRating) ?? ((q = l == null ? void 0 : l.durability) == null ? void 0 : q.current) ?? 0) || 0), u = ze(t == null ? void 0 : t.damageType, "concussive"), m = It(e, s);
    let h = i + a;
    const f = c > 0 ? ea({
      damageIncoming: h,
      armorTags: (l == null ? void 0 : l.tags) ?? [],
      effects: n
    }) : { damageIncoming: h, applied: [] };
    h = f.damageIncoming;
    const g = Zi({
      currentArmorRating: c,
      mitigationByType: (l == null ? void 0 : l.mitigationByType) ?? {},
      damageType: u
    }), A = Math.max(
      0,
      (Number((t == null ? void 0 : t.ap) ?? 0) || 0) + (Number((n == null ? void 0 : n.ap) ?? 0) || 0)
    ), T = g.isDestroyed ? 0 : Math.max(0, g.baseMitigation + g.typeMitigationMod - A), y = Math.max(0, Math.ceil(h - T));
    y > 0 && await C.addCounter(e, s, y);
    const S = Math.max(0, Number(((W = l == null ? void 0 : l.durability) == null ? void 0 : W.current) ?? 0) || 0);
    let v = S;
    i + a > 0 && ((ie = l == null ? void 0 : l.item) != null && ie.id) && (v = Math.max(0, S - 1), v !== S && await l.item.update({ "system.durability.current": v }));
    const k = It(e, s);
    return {
      mode: (t == null ? void 0 : t.mode) ?? "attackDamage",
      track: s,
      requestedDelta: i + a,
      appliedDelta: k - m,
      usedArmor: !0,
      damageType: u,
      effectiveAp: A,
      mitigation: {
        ...g,
        netResistance: T,
        armorBefore: S,
        armorAfter: v
      },
      damageIncoming: h,
      adjustedIncoming: h,
      finalDamage: y,
      tagEffectResult: f,
      beforeLabel: `${pt(s)} ${m}`,
      afterLabel: `${pt(s)} ${k}`,
      source: String((t == null ? void 0 : t.source) ?? "").trim(),
      notes: String((t == null ? void 0 : t.notes) ?? "").trim()
    };
  }
}
M(Oe, "MODE_OPTIONS", Object.freeze([
  { value: d.monitors.physical, label: "Physical" },
  { value: d.monitors.fatigue, label: "Fatigue" },
  { value: "burn", label: "Burn" },
  { value: "status", label: "Status" }
]));
const Ba = ks, hs = "damage-mode", Fa = `${w}.${hs}`, xt = {}, Jt = {};
class H {
  static init() {
    Ke.register(ee.PROVIDE_DAMAGE_MODE), Hooks.on("updateSetting", async (e, t, s, i) => H.onUpdateSetting(e, t, s, i)), Hooks.on(ee.PROVIDE_DAMAGE_MODE, (e) => {
      e("resistanceArmorMonitor", p.settings.damageMode.values.resistanceArmorMonitor, H.sufferDamageResistanceArmorMonitor), e("armorResistanceMonitor", p.settings.damageMode.values.armorResistanceMonitor, H.sufferDamageArmorResistanceMonitor), e("armorGivesResistance", p.settings.damageMode.values.armorGivesResistance, H.sufferDamageArmorAsResistance_Earthdawn), e("armorGiveResistanceHitsAvoid", p.settings.damageMode.values.armorGiveResistanceHitsAvoid, H.sufferDamageArmorAsResistance_Cyberpunk);
    }), Hooks.once("ready", () => H.onReady());
  }
  static onReady() {
    H._registerDamageModeSetting(), H._selectDamageMode();
  }
  static _registerDamageModeSetting() {
    Hooks.callAll(ee.PROVIDE_DAMAGE_MODE, (e, t, s) => {
      xt[e] = t, Jt[e] = s;
    }), game.settings.register(w, hs, {
      scope: "world",
      name: p.settings.damageMode.name,
      hint: p.settings.damageMode.hint,
      config: !0,
      default: Object.keys(xt)[0],
      choices: xt,
      type: String
    });
  }
  static async onUpdateSetting(e, t, s, i) {
    e.key == Fa && H._selectDamageMode();
  }
  static _selectDamageMode() {
    let e = game.settings.get(w, hs);
    Jt[e] || (e = Object.keys(xt)[0]), H.damageModeCode = e, H.damageModeMethod = Jt[e];
  }
  static async sufferDamage(e, t, s, i, a, n, o) {
    const { monitor: l, damageType: c } = H._resolveDamageContext(e, t, o);
    if (Je.checkActorCanReceiveDamage(c ?? l, l, e), H._shouldUsePersonalDamageV2(e, l, o)) {
      await H.sufferPersonalDamageV2(e, l, c, s, i, a, n, o);
      return;
    }
    await (H.damageModeMethod ?? H.sufferDamageResistanceArmorMonitor)(e, l, c, s, i, a, n), await e.applyArmorDamage(l, c, L.sumModifiers([o], "other", "damageArmor"));
  }
  static _shouldUsePersonalDamageV2(e, t, s) {
    var i, a;
    return !((i = e == null ? void 0 : e.isCharacterLike) != null && i.call(e)) || ![d.monitors.physical, d.monitors.fatigue].includes(t) ? !1 : !!((a = s == null ? void 0 : s.isPersonalWeapon) != null && a.call(s) || (s == null ? void 0 : s.canonicalType) === d.itemType.personalWeapon || (s == null ? void 0 : s.type) === d.itemType.personalWeapon);
  }
  static async sufferPersonalDamageV2(e, t, s, i, a, n, o, l) {
    var m;
    const c = ((m = l == null ? void 0 : l.getCombatProfile) == null ? void 0 : m.call(l)) ?? l ?? null, u = await Oe.apply({
      actor: e,
      payload: {
        mode: "attackDamage",
        track: t,
        damage: Number(i ?? (c == null ? void 0 : c.damage) ?? 0) || 0,
        netHits: Number(a ?? 0) || 0,
        damageType: s ?? (c == null ? void 0 : c.damageType),
        ap: Number((c == null ? void 0 : c.ap) ?? 0) || 0,
        effects: (c == null ? void 0 : c.effects) ?? {}
      },
      options: {
        logToChat: !1
      }
    });
    u != null && u.ok && H._notifyPersonalArmorMitigation(e, {
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
    const s = t.armorMitigation ?? {}, i = H._localizeDamageType(t.damageType), a = s.isDestroyed ? "Armor destroyed" : `Base ${Number(s.baseMitigation ?? 0)} + Type ${Number(s.typeMitigationMod ?? 0)} - AP ${Number(t.effectiveAp ?? 0)}`, n = Number(t.adjustedIncoming ?? t.baseIncoming ?? 0), o = Number(t.finalDamage ?? 0), l = (((u = t.tagEffectResult) == null ? void 0 : u.applied) ?? []).map((m) => `${m.tag} +${Math.round((Number(m.bonus ?? 0) || 0) * 100)}%`).join(", "), c = l ? ` [${l}]` : "";
    ui.notifications.info(
      `${e.name} mitigated ${i}: ${a}${c}. Incoming ${n}, final ${o}.`
    );
  }
  static async sufferDamageResistanceArmorMonitor(e, t, s, i, a, n, o) {
    const l = C.resistanceDetail(e, t, s), c = l.value;
    let u = 0;
    if (n) {
      const m = Math.min(c, i), h = Math.min(c - m, a);
      u = i - m, C.useArmor(t) && (u -= await H.damageToArmor(e, s, u)), u += a - h;
    } else
      u = i + a - c, C.useArmor(t) && (u -= await H.damageToArmor(e, s, u));
    u > 0 && await C.addCounter(e, t, u), H._notifyResistanceUsage(e, t, s, l);
  }
  static async sufferDamageArmorResistanceMonitor(e, t, s, i, a, n, o) {
    let l = 0;
    C.useArmor(t) ? n ? (i -= await H.damageToArmor(e, s, i), l = a + i) : (l = a + i, l -= await H.damageToArmor(e, s, l)) : l = i + a;
    const c = C.resistanceDetail(e, t, s);
    return l -= c.value, l > 0 && await C.addCounter(e, t, l), H._notifyResistanceUsage(e, t, s, c), l;
  }
  static async sufferDamageArmorAsResistance_Cyberpunk(e, t, s, i, a, n, o) {
    let l = i + a;
    if (C.useArmor(t) && l > 0) {
      const u = n ? a : 0, m = Math.max(0, H._computeArmorResistance(e) - u);
      m > 0 && (await C.addCounter(e, "armor", 1), l -= m);
    }
    const c = C.resistanceDetail(e, t, s);
    return l -= c.value, l > 0 && await C.addCounter(e, t, l), H._notifyResistanceUsage(e, t, s, c), Math.max(l, 0);
  }
  static async sufferDamageArmorAsResistance_Earthdawn(e, t, s, i, a, n, o) {
    let l = i + a;
    if (C.useArmor(t) && !n && l > 0) {
      const u = H._computeArmorResistance(e);
      u > 0 && (await C.addCounter(e, "armor", 1), l -= u);
    }
    l -= H._computeStrengthResistance(e, t);
    const c = C.resistanceDetail(e, t, s);
    return l -= c.value, l > 0 && await C.addCounter(e, t, l), H._notifyResistanceUsage(e, t, s, c), l;
  }
  static async damageToArmor(e, t, s) {
    if (s > 0) {
      const i = C.max(e, d.monitors.armor), a = C.getCounterValue(e, d.monitors.armor), n = Math.min(i - a, s), o = C.resistance(e, d.monitors.armor, t), l = Math.max(0, n - o);
      return l > 0 && await C.addCounter(e, d.monitors.armor, l), n;
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
    const a = p.actor.monitors[t] ?? t, n = H._localizeDamageType(s) ?? a, o = i.usedType ? "type" : "default", l = ((u = p.actor.monitors.resistanceSources) == null ? void 0 : u[o]) ?? o, c = V(p.actor.monitors.resistanceApplied, {
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
      return ni(e) ? Qe(e) : p.mwd.weaponDamageType[e] ?? p.mwd.personalDamageType[e] ?? p.actor.monitors[e] ?? e;
  }
  static _computeArmorResistance(e) {
    const t = C.max(e, "armor"), s = C.getCounterValue(e, "armor"), i = Math.max(0, t - s);
    return Math.max(0, Math.ceil(i / 3));
  }
  static _computeStrengthResistance(e, t) {
    const s = e.getAttributeValue(d.actorAttributes.strength);
    return Math.max(0, Math.floor(s / 4));
  }
}
class ge extends Actor {
  static init() {
    Hooks.on("updateActor", (e, t, s, i) => {
      var a;
      return (a = Ce.firstResponsible(e)) == null ? void 0 : a.onUpdateActor(t, s);
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
    return [d.actorTypes.vehicle, d.actorTypes.battlemech].includes(this.type);
  }
  prepareData() {
    super.prepareData(), this._prepareEdgePools(), this.cleanupFavorites();
  }
  prepareDerivedData() {
    if (this.system.modifiers = {
      initiative: L.sumModifiers(this.items, "other", "initiative")
    }, this.system.monitors) {
      const e = G.getDamageTypes();
      Object.entries(this.system.monitors).forEach((t) => {
        t[1].resistance = ge.normalizeResistance(t[1].resistance), t[1].maxBonus = L.sumMonitorModifiers(this.items, t[0], "max"), t[1].resistanceBonus = L.sumMonitorModifiers(this.items, t[0], "resistance"), t[1].resistanceBonusByType = Object.fromEntries(
          e.map((s) => [s.value, L.sumMonitorModifiers(this.items, t[0], "resistanceByType", s.value)]).filter(([, s]) => s)
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
    return it[this.type] ?? [];
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
    const e = this.getAttributeValue(d.actorAttributes.edge), t = foundry.utils.getProperty(this.system, "counters.edgePools") ?? {};
    Object.values(d.counters.edgePools).forEach((i) => {
      const a = t[i] ?? {}, n = a.value;
      a.value = n ?? e ?? 0, a.value = Math.min(a.value, e ?? a.value ?? 0), a.max = e ?? a.max ?? 0, t[i] = a;
    }), foundry.utils.setProperty(this.system, "counters.edgePools", t);
  }
  async setCheckbarValue(e, t) {
    return await this.update({ [e]: t });
  }
  _getMonitorMax(e) {
    const t = this.getAttributeValue(e);
    return t == 0 ? 0 : ii + I.divup(t, 2);
  }
  getAttributeActions() {
    return Y.getActorActions(this);
  }
  getUsableAttributes(e = void 0) {
    const t = (e ? [e] : this.items).map((i) => i.getUsableAttributes()).reduce((i, a) => i.concat(a), []), s = I.distinct(this.getAttributes().concat(t));
    return s.sort(I.ascendingBySortedArray(G.sortedAttributeKeys)), s;
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
      s += L.sumModifiers(this.items, "attribute", e);
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
        await H.damageToArmor(this, t, s);
    }
  }
  async rollAttribute(e) {
    await Re.rollAttribute(this, e);
  }
  async rollAttributeAction(e) {
    const t = Y.getActorAction(this, e);
    await Re.rollAttributeAction(this, t);
  }
  async rollSkill(e, t) {
    await Re.rollSkill(this, e, t);
  }
  async rollWeapon(e) {
    var a, n, o;
    Je.checkWeaponDefense(e, this);
    const t = (a = e.validateTargets(this)) == null ? void 0 : a.map((l) => l.id), s = {
      attackerTokenId: (o = (n = game.scenes.current) == null ? void 0 : n.tokens.find((l) => {
        var c;
        return ((c = l.actor) == null ? void 0 : c.id) == this.id;
      })) == null ? void 0 : o.id,
      targetedTokenIds: t
    }, i = this.items.find((l) => e.isWeaponSkill(l));
    await Re.rollWeapon(this, i, e, s);
  }
  async rollDefense(e) {
    const t = e.attack.defense, s = Y.getActorDefense(this, t);
    await Re.rollDefense(this, s, e);
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
    const e = L.sumModifiers(this.items, "other", "sceneAnarchy");
    e > 0 && await C.setCounter(this, d.monitors.sceneAnarchy, e);
  }
  async onLeaveCombat() {
    await C.setCounter(this, d.monitors.sceneAnarchy, 0);
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
    await this.spendEdgePool(d.counters.social.credibility, e);
  }
  async spendRumor(e) {
    await this.spendEdgePool(d.counters.mental.rumor, e);
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
    const t = this.getAttributeValue(d.actorAttributes.edge), i = ((n = (a = this.getEdgePools()) == null ? void 0 : a[e]) == null ? void 0 : n.value) ?? t ?? 0;
    return Math.min(i, t ?? i ?? 0);
  }
  getRemainingEdge(e = void 0) {
    return e ? this.getEdgePoolValue(e) : Math.max(0, ...Object.values(d.counters.edgePools).map((t) => this.getEdgePoolValue(t)));
  }
  canUseEdge() {
    return this.getAttributes().includes(d.actorAttributes.edge);
  }
  async spendEdgePool(e, t) {
    t != 0 && await C.addCounter(this, e, -t);
  }
  async spendEdge(e, t = d.counters.edgePools.grit) {
    if (e != 0) {
      if (!this.canUseEdge()) {
        const s = p.actorType[this.type] ?? this.type, i = `${this.name} (${s}) cannot use Edge`;
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
    const s = ge._prepareFavorite(e, t);
    return !!this.system.favorites.find((i) => ge._isSameFavorite(s, i));
  }
  static _prepareFavorite(e, t) {
    return { type: e, id: t };
  }
  static _isSameFavorite(e, t) {
    return e.id == t.id && e.type == t.type;
  }
  async switchFavorite(e, t, s) {
    const i = ge._prepareFavorite(t, s), a = this.system.favorites.filter((n) => !ge._isSameFavorite(i, n));
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
    const s = ge._prepareFavorite(e, t);
    if (e == "attributeAction") {
      const a = Y.prepareShortcut(this, t);
      if (a)
        return foundry.utils.mergeObject(a, s);
    } else if (Object.values(d.itemType).includes(e)) {
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
const { ApplicationV2: Ga, HandlebarsApplicationMixin: Ua } = foundry.applications.api, { renderTemplate: zs } = foundry.applications.handlebars, ja = `${O}/chat/celebrity-roll.hbs`, et = class et extends Ua(Ga) {
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
        label: p.actor.counters.edgePools.legend,
        value: e.getCelebrityValue()
      },
      modifiers: foundry.utils.mergeObject(
        { label: p.item.tabs.modifiers },
        L.computeModifiers(e.items, "other", "celebrity")
      ),
      other: {
        label: p.common.roll.modifiers.other,
        value: 0
      },
      ANARCHY: p
    }, s = await zs(`${O}/dialog/roll-celebrite-title.hbs`, t), i = {
      id: `roll-celebrity-${foundry.utils.randomID()}`,
      classes: [game.system.anarchy.styles.selectCssClass(), ...et.DEFAULT_OPTIONS.classes],
      window: { title: s }
    };
    return new et({ roll: t }, i).render({ force: !0 });
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
      await et.doRoll(this.roll), await this.close();
    }), s.find('[data-action="cancel"]').on("click", async () => {
      await this.close();
    });
  }
  static async doRoll(e) {
    const t = [
      e.celebrity,
      e.modifiers,
      e.other
    ], s = I.sumValues(t, (o) => o.value), i = {
      actor: e.actor,
      parameters: t,
      pool: s,
      options: {
        classes: [game.system.anarchy.styles.selectCssClass()]
      },
      ANARCHY: p
    }, a = new Roll(`${s}d6cs>=5`);
    await a.evaluate();
    const n = await zs(ja, i);
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
M(et, "PARTS", {
  body: {
    template: `${O}/dialog/roll-celebrite.hbs`
  }
});
let ps = et;
const { renderTemplate: Va } = foundry.applications.handlebars, qa = `${O}/chat/actor-say-word.hbs`;
class Ks extends ge {
  static get initiative() {
    return ge.initiative + " + max(@attributes.reflexes.value, @attributes.intelligence.value)";
  }
  hasOwnAnarchy() {
    return this.hasPlayerOwner;
  }
  prepareDerivedData() {
    !this.system.monitors.fatigue && this.system.monitors.stun && (this.system.monitors.fatigue = foundry.utils.duplicate(this.system.monitors.stun)), this.system.monitors.physical.max = this._getMonitorMax(d.actorAttributes.strength), this.system.monitors.fatigue.max = this._getMonitorMax(d.actorAttributes.willpower), super.prepareDerivedData(), this.system.ignoreWounds = L.sumModifiers(this.items, "other", "ignoreWounds");
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
    return it[this.type] ?? it[d.actorTypes.character];
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
    var i, a;
    const s = (i = this.getWord(e, t)) == null ? void 0 : i.word;
    s && ChatMessage.create({
      speaker: { alias: ((a = this.token) == null ? void 0 : a.name) ?? this.name },
      content: await Va(
        qa,
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
    I.reindexIds(s), await this.update({ [`system.${e}`]: s });
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
      Je.checkSufficient(p.actor.counters.anarchy, e, s + t);
      const i = Math.min(t, e), a = e - i;
      i > 0 && C.addCounter(this, d.monitors.sceneAnarchy, -i), this.hasPlayerOwner ? (await game.system.anarchy.gmAnarchy.actorGivesAnarchyToGM(this, e), C.addCounter(this, d.monitors.anarchy, -a)) : a > 0 && super.spendAnarchy(a);
    }
  }
  canUseEdge() {
    return !0;
  }
  getWounds() {
    const e = I.divint(this.system.monitors.fatigue.value, 3) + I.divint(this.system.monitors.physical.value, 3);
    return Math.max(0, e - this.system.ignoreWounds);
  }
  async rollCelebrity() {
    await ps.create(this);
  }
}
class yi extends ge {
  prepareDerivedData() {
    this._prepareMwdAttributes(), this._prepareMwdMonitors(), this._prepareMwdItems(), super.prepareDerivedData();
  }
  static get defaultIcon() {
    return `${Gt}/default/Default_Vehicle.svg`;
  }
  static get initiative() {
    return ge.initiative + " + max(@attributes.system.value, @attributes.handling.value)";
  }
  computePhysicalState() {
    return {
      max: this.system.monitors.structure.max,
      value: this.system.monitors.structure.max - this.system.monitors.structure.value
    };
  }
  getAttributes() {
    return it[this.type] ?? it[d.actorTypes.vehicle];
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
    var i;
    const t = ((i = this.system.attributes.handling) == null ? void 0 : i.value) ?? 0, s = this.system.handling;
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
    ), Object.entries(e.attributes).forEach(([i, a]) => {
      var n;
      ((n = s[i]) == null ? void 0 : n.value) === void 0 && (s[i] = s[i] ?? {}, s[i].value = (a == null ? void 0 : a.value) ?? 0);
    });
  }
  _prepareMwdMonitors() {
    var i, a, n, o, l, c, u, m;
    const e = this.system.mwd = this.system.mwd ?? {}, t = this.system.monitors = this.system.monitors ?? {}, s = {
      value: ((i = t.structure) == null ? void 0 : i.value) ?? 0,
      max: ((a = t.structure) == null ? void 0 : a.max) ?? (this.type === d.actorTypes.battlemech ? 18 : 15),
      resistance: ge.normalizeResistance((n = t.structure) == null ? void 0 : n.resistance)
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
      const h = {
        value: ((o = t.heat) == null ? void 0 : o.value) ?? ((l = e.heat) == null ? void 0 : l.current) ?? 0,
        max: ((c = t.heat) == null ? void 0 : c.max) ?? ((u = e.heat) == null ? void 0 : u.hardMax) ?? 4,
        resistance: ge.normalizeResistance((m = t.heat) == null ? void 0 : m.resistance)
      };
      t.heat = foundry.utils.mergeObject(
        foundry.utils.duplicate(h),
        t.heat ?? {},
        { inplace: !1, recursive: !0 }
      ), e.monitors.heat = foundry.utils.mergeObject(
        foundry.utils.duplicate(h),
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
      Object.entries(t).map(([s, i]) => [
        s,
        this.items.filter((a) => i.includes(a.type))
      ])
    );
  }
}
const Ys = {
  light: 4,
  medium: 5,
  heavy: 6,
  assault: 7
}, za = { mode: "normal", allowedWeaponIds: [], typeRestriction: "" }, Ka = {
  baseProfile: { name: "Unarmed", damage: "", notes: "" },
  maxWeapons: 0,
  allowedLocations: []
};
class Ya {
  constructor(e) {
    this.actor = e, this.mwd = e.system.mwd ?? {};
  }
  compute() {
    const e = this.mwd.weightClass ?? "medium", t = Ys[e] ?? Ys.medium, s = this._normalizeHardpoints(), i = this._normalizeWeaponGroups(), a = i.find((y) => y.isPrimary), n = i.filter((y) => y.isPrimary), o = this._primarySlot(), l = [], c = [];
    n.length > 1 && l.push(p.mwd.loadout.errors.multiplePrimary);
    const u = a ? t - 1 : t, m = i.length + (a ? 1 : 0);
    i.length > u && l.push(V(p.mwd.loadout.errors.mountPointsExceeded, {
      used: m,
      total: t
    }));
    const h = this._getWeapons((y) => (y.system.weaponCategory ?? "ranged") !== "melee"), f = new Map(h.map((y) => [y.id, y])), g = /* @__PURE__ */ new Set(), A = s.map((y) => ({ ...y, occupiedBy: null, occupiedByName: void 0 }));
    for (const y of i)
      for (const S of y.weaponIds ?? []) {
        const v = f.get(S);
        if (!v) {
          c.push(V(p.mwd.loadout.warnings.weaponMissing, { weapon: S }));
          continue;
        }
        const k = v.system.hardpointType ?? "energy", _ = v.system.hardpointSize ?? "small";
        if (g.has(S)) {
          l.push(V(p.mwd.loadout.errors.weaponAlreadyGrouped, { weapon: v.name }));
          continue;
        }
        if (g.add(S), y.isPrimary && this._validatePrimaryWeapon(v, k, _, o, l), (v.system.weaponCategory ?? "ranged") === "melee")
          continue;
        const q = A.find((W) => !W.occupiedBy && W.type === k && W.size === _);
        q ? (q.occupiedBy = y.id, q.occupiedByName = y.name) : l.push(V(p.mwd.loadout.errors.hardpointUnavailable, {
          weapon: v.name,
          type: p.mwd.hardpointType[k] ?? k,
          size: p.mwd.hardpointSize[_] ?? _
        }));
      }
    a && (!a.weaponIds || a.weaponIds.length === 0) && l.push(p.mwd.loadout.errors.primaryWithoutWeapon);
    const T = this._computeMeleeState(l);
    return {
      mountPoints: {
        total: t,
        used: m,
        remaining: Math.max(0, t - m)
      },
      weightClass: e,
      hardpoints: A,
      weaponGroups: i,
      primaryGroupId: a == null ? void 0 : a.id,
      errors: l,
      warnings: c,
      meleeProfiles: T.profiles,
      meleeLimit: T.limit
    };
  }
  _normalizeWeaponGroups() {
    return (this.mwd.weaponGroups ?? []).map((e, t) => ({
      id: e.id ?? `group-${t + 1}`,
      name: e.name || V(p.common.newName, { type: p.itemType.singular.weapon }),
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
    const e = foundry.utils.mergeObject(foundry.utils.duplicate(za), this.mwd.primarySlot ?? {});
    return e.allowedWeaponIds = this._asArray(e.allowedWeaponIds), e;
  }
  _computeMeleeState(e) {
    var o, l, c;
    const t = foundry.utils.mergeObject(foundry.utils.duplicate(Ka), this.mwd.melee ?? {}), s = this._getWeapons((u) => (u.system.weaponCategory ?? "ranged") === "melee"), i = [], a = Number(t.maxWeapons ?? 0);
    s.length > a && e.push(V(p.mwd.loadout.errors.meleeLimitExceeded, {
      equipped: s.length,
      limit: a
    }));
    const n = this._asArray(t.allowedLocations);
    return i.push({
      name: ((o = t.baseProfile) == null ? void 0 : o.name) || p.mwd.melee.baseProfile,
      damage: ((l = t.baseProfile) == null ? void 0 : l.damage) ?? "",
      notes: ((c = t.baseProfile) == null ? void 0 : c.notes) ?? ""
    }), s.forEach((u) => {
      var m;
      n.length > 0 && u.system.mountLocation && !n.includes(u.system.mountLocation) && e.push(V(p.mwd.loadout.errors.meleeLocationRestricted, {
        weapon: u.name,
        location: p.mwd.meleeLocation[u.system.mountLocation] ?? u.system.mountLocation
      })), i.push({
        name: u.name,
        damage: u.getDamageCode(),
        notes: ((m = u.system.references) == null ? void 0 : m.description) ?? ""
      });
    }), { profiles: i, limit: a };
  }
  _validatePrimaryWeapon(e, t, s, i, a) {
    var n;
    i.mode === "converted" ? (((n = i.allowedWeaponIds) == null ? void 0 : n.length) > 0 && !i.allowedWeaponIds.includes(e.id) && a.push(V(p.mwd.loadout.errors.primaryNotAllowedWeapon, { weapon: e.name })), i.typeRestriction && t !== i.typeRestriction && a.push(V(p.mwd.loadout.errors.primaryTypeRestriction, {
      weapon: e.name,
      type: p.mwd.hardpointType[i.typeRestriction] ?? i.typeRestriction
    }))) : s !== "large" && a.push(V(p.mwd.loadout.errors.primaryNeedsLarge, { weapon: e.name }));
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
class Qa extends yi {
  static get defaultIcon() {
    return `${Gt}/vehicles/apc.svg`;
  }
  prepareDerivedData() {
    var e;
    super.prepareDerivedData(), this.system.mwd = this.system.mwd ?? {}, this.system.mwd.chassis = this.system.mwd.chassis ?? "", this.system.mwd.tonnage = this.system.mwd.tonnage ?? 0, this.system.mwd.loadout = new Ya(this).compute(), this.system.mwd.weaponGroupDetails = this._prepareConfiguredWeaponGroups(), this.system.mwd.heat = this._prepareHeatTrack(), this.system.mwd.primaryGroupName = ((e = this.system.mwd.weaponGroupDetails.find((t) => t.isPrimary)) == null ? void 0 : e.name) ?? "", this.system.skills = this._prepareSkillMap(), this.system.weaponGroups = this._prepareWeaponGroups(), this.system.meleeProfiles = this._prepareMeleeProfiles(), this.system.quickActions = {
      primaryWeaponGroup: this.system.weaponGroups.find((t) => t.isPrimary),
      hasSensorSweep: !!(this.system.skills.perception || this.system.skills.technician)
    };
  }
  async rollRangedAttack() {
    const e = this.system.weaponGroups ?? [];
    if (e.length === 0) {
      ui.notifications.warn(p.actor.vehicle.quickActions.errors.noRanged);
      return;
    }
    const t = await this._promptWeaponGroup(e);
    if (!t)
      return;
    const s = t.weaponIds.map((i) => this.items.get(i)).filter((i) => i);
    await this._rollQuickSkill(this.system.skills.gunnery, {
      quickAction: {
        title: p.actor.vehicle.quickActions.rangedAttack,
        weaponGroup: this._serializeWeaponGroup(t, s)
      }
    });
  }
  async rollMeleeAttack() {
    const e = this.system.meleeProfiles ?? [];
    if (e.length === 0) {
      ui.notifications.warn(p.actor.vehicle.quickActions.errors.noMelee);
      return;
    }
    const t = await this._promptMeleeProfile(e);
    t && await this._rollQuickSkill(this.system.skills.melee, {
      quickAction: {
        title: p.actor.vehicle.quickActions.meleeAttack,
        meleeProfile: t
      }
    });
  }
  async rollDodge() {
    await this._rollQuickSkill(this.system.skills.piloting, {
      quickAction: { title: p.actor.vehicle.quickActions.dodgeCheck }
    });
  }
  async rollPilotingCheck() {
    await this._rollQuickSkill(this.system.skills.piloting, {
      quickAction: { title: p.actor.vehicle.quickActions.pilotingCheck }
    });
  }
  async rollSensorSweep() {
    const e = [this.system.skills.perception, this.system.skills.technician].filter((s) => s);
    if (e.length === 0) {
      ui.notifications.warn(p.actor.vehicle.quickActions.errors.noSensorSweep);
      return;
    }
    const t = await this._promptSensorSweepSkill(e);
    t && await this._rollQuickSkill(t, {
      quickAction: {
        title: p.actor.vehicle.quickActions.sensorSweep,
        skillName: t.name
      }
    });
  }
  async rollEmergencyRepair() {
    await this._rollQuickSkill(this.system.skills.technician, {
      quickAction: { title: p.actor.vehicle.quickActions.emergencyRepair }
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
      label: p.actor.battlemech.heat.status[n] ?? n
    }, a;
  }
  _resolveHeatStatus(e, t, s) {
    return e >= ((t == null ? void 0 : t.shutdown) ?? s) ? "shutdown" : e >= ((t == null ? void 0 : t.overheated) ?? s) ? "overheated" : e >= ((t == null ? void 0 : t.runningHot) ?? 0) ? "runningHot" : "safe";
  }
  _prepareConfiguredWeaponGroups() {
    var s;
    const e = ((s = this.system.mwd) == null ? void 0 : s.weaponGroups) ?? [], t = new Map(this.items.map((i) => [i.id, i]));
    return e.map((i, a) => {
      const n = Array.isArray(i.weaponIds) ? i.weaponIds : i.weaponIds ? [i.weaponIds] : [], o = n.map((c) => t.get(c)).filter((c) => (c == null ? void 0 : c.type) === d.itemType.mechWeapon), l = n.filter((c) => !t.has(c));
      return {
        id: i.id ?? `group-${a + 1}`,
        index: a,
        name: i.name || V(p.common.newName, { type: p.itemType.singular.weapon }),
        weaponIds: n,
        isPrimary: i.isPrimary ?? !1,
        weapons: o,
        missingWeaponIds: l
      };
    });
  }
  _resolveSkill(e) {
    var i, a;
    const t = this.items.find((n) => n.type === d.itemType.skill && n.system.code === e);
    if (t)
      return t;
    const s = Ut.prepareSkill(e);
    if (s) {
      const n = (i = p.skill) == null ? void 0 : i[e];
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
    const t = this.items.filter((n) => n.type === d.itemType.mechWeapon && n.isActive());
    if (t.length === 0)
      return [];
    const s = t.filter((n) => this.hasFavorite(d.itemType.mechWeapon, n.id)), i = [];
    return s.length > 0 && i.push({
      id: "favorite",
      name: p.actor.vehicle.quickActions.primaryWeapons,
      weaponIds: s.map((n) => n.id),
      isPrimary: !0
    }), i.push({
      id: "all",
      name: p.actor.vehicle.quickActions.allWeapons,
      weaponIds: t.map((n) => n.id),
      isPrimary: i.length === 0
    }), i;
  }
  _prepareMeleeProfiles() {
    const e = [{
      id: "unarmed",
      name: p.actor.vehicle.quickActions.unarmed,
      weaponId: null,
      damage: 1,
      notes: p.actor.vehicle.quickActions.unarmedNotes
    }], t = this.items.filter((s) => s.type === d.itemType.mechWeapon && s.isActive() && s.system.skill === "meleeCombat");
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
    const s = ((a = e == null ? void 0 : e.system) == null ? void 0 : a.attribute) ?? this.getPhysicalAgility(), i = foundry.utils.mergeObject(Re.prepareActorRoll(this), {
      mode: oe.rollType.skill,
      skill: e,
      attribute1: s,
      specialization: (n = e == null ? void 0 : e.system) == null ? void 0 : n.specialization
    });
    t.quickAction && (i.quickAction = t.quickAction), await Re.create(i);
  }
  async _promptWeaponGroup(e) {
    if (e.length === 1)
      return e[0];
    const t = e.find((a) => a.isPrimary) ?? e[0], s = `<form class="mwd-quick-select">${e.map((a) => `
      <label class="quick-select-option">
        <input type="radio" name="weapon-group" value="${a.id}" ${a.id === t.id ? "checked" : ""}>
        <span>${a.name}${a.isPrimary ? ` (${p.actor.vehicle.quickActions.primaryLabel})` : ""}</span>
      </label>`).join("")}</form>`, i = await Dialog.prompt({
      title: p.actor.vehicle.quickActions.selectWeaponGroup,
      content: s,
      label: p.common.roll.button,
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
      title: p.actor.vehicle.quickActions.selectMeleeProfile,
      content: s,
      label: p.common.roll.button,
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
      title: p.actor.vehicle.quickActions.selectSensorSkill,
      content: t,
      label: p.common.roll.button,
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
class Ja {
  static register() {
    game.settings.register(w, "useDestinyMechanics", {
      name: p.settings.useDestinyMechanics.name,
      hint: p.settings.useDestinyMechanics.hint,
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
const { HandlebarsApplicationMixin: Xa } = foundry.applications.api;
var Me, Ct, vt, fs;
const ue = class ue extends Xa(foundry.applications.sheets.ActorSheetV2) {
  constructor() {
    super(...arguments);
    re(this, vt);
    re(this, Me, !1);
    /** Track active CSB tab per group across rerenders */
    re(this, Ct, /* @__PURE__ */ new Map());
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
    return B(this, Me);
  }
  toggleEditing() {
    if (this.isEditable) {
      if (B(this, Me)) {
        this._commitEditsToActor().finally(() => {
          ye(this, Me, !B(this, Me)), this.render({ force: !0 });
        });
        return;
      }
      ye(this, Me, !B(this, Me)), this.render({ force: !0 });
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
    var o, l, c, u, m;
    t = super._initializeApplicationOptions(t), t.classes = Array.from(t.classes ?? []);
    const s = (t == null ? void 0 : t.document) ?? this.document, i = (s == null ? void 0 : s.type) ?? ((o = this.actor) == null ? void 0 : o.type);
    i && t.classes.push(String(i));
    const a = ((m = (u = (c = (l = game.system) == null ? void 0 : l.anarchy) == null ? void 0 : c.styles) == null ? void 0 : u.selectCssClass) == null ? void 0 : m.call(u)) ?? "mwd-theme-default", n = ["mwd-theme-default", "mwd-theme-sra"];
    for (let h = t.classes.length - 1; h >= 0; h--)
      n.includes(t.classes[h]) && t.classes.splice(h, 1);
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
    B(this, Ct).set(o, a), R(this, vt, fs).call(this, n, a);
  }
  /**
   * Universal roll action: data-action="roll" + data-roll='{"intent":"skill","key":"gunnery"}'
   */
  async _onRollAction(t, s) {
    var c, u, m, h, f, g, A, T, y;
    (c = t == null ? void 0 : t.preventDefault) == null || c.call(t);
    const i = ((u = s == null ? void 0 : s.closest) == null ? void 0 : u.call(s, "[data-roll]")) ?? ((h = (m = t == null ? void 0 : t.target) == null ? void 0 : m.closest) == null ? void 0 : h.call(m, "[data-roll]")), a = (f = i == null ? void 0 : i.dataset) == null ? void 0 : f.roll;
    if (!a) return;
    let n;
    try {
      n = JSON.parse(a);
    } catch (S) {
      console.warn("MWD | Invalid data-roll JSON:", a, S);
      return;
    }
    const o = !!(t != null && t.shiftKey), l = ((g = game.mwd) == null ? void 0 : g.roll) ?? ((T = (A = game.system) == null ? void 0 : A.mwd) == null ? void 0 : T.roll);
    if (!(l != null && l.execute)) {
      (y = ui.notifications) == null || y.error("MWD roll system not initialized (game.mwd.roll.execute missing).");
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
        const c = l.dataset.group || "default", u = B(this, Ct).get(c), m = l.dataset.default || ((n = l.querySelector(".csb-tab-link[data-tab]")) == null ? void 0 : n.dataset.tab), h = u || m;
        h && R(this, vt, fs).call(this, l, h);
      }
      i.querySelectorAll(".csb-tabs").length && !i.querySelector(".csb-tab-panel.is-active") && console.warn(`${j} CSB tabs present but no active tab applied. Check element root resolution and CSS .is-active selectors.`, {
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
    var n, o, l, c, u, m, h, f, g, A, T;
    console.log(`${j}BaseActorSheetV2._prepareContext:start`, {
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
        limited: !(((m = this.document) == null ? void 0 : m.isOwner) ?? !1),
        editing: B(this, Me),
        // Template contract
        data: this.actor,
        // legacy alias
        options: i,
        // safe, template-only
        cssClass: i.cssClass
      },
      { inplace: !1 }
    );
    return a.options.owner = a.owner, a.options.limited = a.limited, a.options.editable = a.editable, a.options.editing = a.editing, a.options.viewMode = !a.editing, a.skillsDisplay = ma(((h = this.actor) == null ? void 0 : h.system) ?? {}), a.items ?? (a.items = {}), (f = this.actor) != null && f.items && typeof (I == null ? void 0 : I.classifyInto) == "function" && (I.classifyInto(a.items, this.actor.items), a.items.weapon = [
      ...a.items.mechWeapon ?? [],
      ...a.items.personalWeapon ?? []
    ]), a.npcItems = {
      traits: a.items.quality ?? [],
      weapons: a.items.weapon ?? [],
      assetModules: a.items.assetModule ?? [],
      inventory: a.items.gear ?? []
    }, console.log(`${j}BaseActorSheetV2._prepareContext:done`, {
      actorType: (g = this.actor) == null ? void 0 : g.type,
      cssClass: a.cssClass,
      itemCount: ((T = (A = this.actor) == null ? void 0 : A.items) == null ? void 0 : T.size) ?? 0,
      editing: B(this, Me)
    }), a;
  }
  /** Clamp certain actor system paths to valid ranges */
  _clampByPath(t, s) {
    return typeof s != "number" ? s : ((/^system\.skills\.[^.]+\.rating$/.test(t) || /^system\.attributes\.[^.]+\.value$/.test(t)) && (s = Math.trunc(s)), /^system\.skills\.[^.]+\.rating$/.test(t) ? Math.clamp(s, 0, 12) : /^system\.attributes\.[^.]+\.value$/.test(t) ? Math.clamp(s, 0, 10) : s);
  }
  /** Action handler: Condition Monitor set */
  async _onMonitorSet(t, s) {
    var f, g;
    if (t.preventDefault(), !this.isEditable) return;
    const i = String(((f = s == null ? void 0 : s.dataset) == null ? void 0 : f.monitor) ?? "").trim(), a = Number((g = s == null ? void 0 : s.dataset) == null ? void 0 : g.value);
    if (!i || !Number.isFinite(a)) return;
    const n = i === "burn" ? "system.burn.value" : `system.monitors.${i}.value`, o = Number(foundry.utils.getProperty(this.actor, n) ?? 0), l = i === "armor" ? a : o === a ? 0 : a, c = this.getPersistentActor() ?? this.actor;
    if (typeof (c == null ? void 0 : c.setMonitorValue) == "function")
      return c.setMonitorValue(i, l, { source: "sheet" });
    const u = `system.monitors.${i}`, m = Number(foundry.utils.getProperty(c, `${u}.max`)) || 0, h = Math.min(Math.max(0, l), Math.max(0, m));
    return c.update({ [`${u}.value`]: h });
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
Me = new WeakMap(), Ct = new WeakMap(), vt = new WeakSet(), /**
 * Apply active-state classes within a single .csb-tabs root.
 * Idempotent: safe to call every render.
 */
fs = function(t, s) {
  t.querySelectorAll(".csb-tab-link").forEach((i) => {
    i.classList.toggle("is-active", i.dataset.tab === s);
  }), t.querySelectorAll(".csb-tab-panel").forEach((i) => {
    i.classList.toggle("is-active", i.dataset.tab === s);
  });
}, // ---- Hard minimum size (resize clamp) ----
M(ue, "MIN_WIDTH", 800), M(ue, "MAX_WIDTH", 950), M(ue, "MIN_HEIGHT", 600), M(ue, "MAX_HEIGHT", 1400), // group -> tabId
/** @override */
M(ue, "DEFAULT_OPTIONS", foundry.utils.mergeObject(Dt(ue, ue, "DEFAULT_OPTIONS"), {
  classes: ["sheet", "actor", w, "appv2", "mwd-sheet", "mwd-character-sheet"],
  position: { width: 760, height: 760 },
  window: { resizable: !0, minimizable: !0 },
  actions: {
    toggleViewMode: ue.prototype._onToggleViewMode,
    tab: ue.prototype._onClickTab,
    roll: ue.prototype._onRollAction,
    monitorSet: ue.prototype._onMonitorSet,
    editImage: ue.prototype._onEditImage
  }
}, { inplace: !1 }));
let rt = ue;
var tt, Fe, bi, wi, Ai;
const At = class At {
  static async get(e) {
    if (B(this, tt).has(e)) return B(this, tt).get(e);
    const t = R(this, Fe, bi).call(this, e);
    return B(this, tt).set(e, t), t;
  }
};
tt = new WeakMap(), Fe = new WeakSet(), bi = async function(e) {
  const t = `systems/${w}/templates/v2/layouts/${e}.layout.json`;
  let s;
  try {
    const i = await fetch(t);
    if (!i.ok) throw new Error(`HTTP ${i.status} for ${t}`);
    s = await i.json();
  } catch (i) {
    console.error(`${j}LayoutRegistry.get FAILED`, { layoutId: e, url: t, e: i }), s = { id: e, version: 0, root: { type: "stack", children: [] } };
  }
  return R(this, Fe, wi).call(this, s);
}, wi = function(e) {
  const t = (s) => {
    var i;
    return !s || typeof s != "object" || (s.template ?? (s.template = R(i = At, Fe, Ai).call(i, s)), s.children = Array.isArray(s.children) ? s.children : [], Array.isArray(s.classes) || (typeof s.classes == "string" ? s.classes = s.classes.split(/\s+/).filter(Boolean) : s.classes = []), s.children = s.children.map(t), s.type === "tabs" && Array.isArray(s.tabs) && (s.tabs = s.tabs.map((a) => ({
      ...a,
      children: (Array.isArray(a.children) ? a.children : []).map(t)
    })))), s;
  };
  return {
    ...e,
    root: t(e.root ?? { type: "stack", children: [] })
  };
}, Ai = function(e) {
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
}, re(At, Fe), re(At, tt, /* @__PURE__ */ new Map());
let Bt = At;
var be, Be, je, N, Ti, ys, $t, Si, ki, ce, Ue, ft;
const Q = class Q extends rt {
  constructor() {
    super(...arguments);
    re(this, N);
    re(this, be, null);
    re(this, Be, null);
    re(this, je, null);
  }
  /** @override */
  async _prepareContext(t) {
    var ie, we, he, Ae, pe, He, We, Pe, _e, Ie, xe, nt, ot;
    const s = await super._prepareContext(t), i = ((ie = this.getSheetTokenDocument) == null ? void 0 : ie.call(this)) ?? null;
    s._mwdThemeClass = game.system.mwd.styles.selectCssClass(), s.layout = await Bt.get("character");
    const a = ((he = (we = this.actor).getEdgeCap) == null ? void 0 : he.call(we)) ?? Number(((He = (pe = (Ae = this.actor.system) == null ? void 0 : Ae.attributes) == null ? void 0 : pe.edge) == null ? void 0 : He.value) ?? 0), n = !!this.isEditable, o = { physical: "Physical", mental: "Mental", social: "Social" }, l = {
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
      capPips: Array.from({ length: Math.max(0, a) }, (P, E) => E + 1),
      groups: (c.groups ?? []).map((P) => ({
        id: P.id,
        label: o[P.id] ?? P.id,
        pools: (P.pools ?? []).map((E) => {
          const z = Number(E.effectiveValue ?? 0), fe = Number(E.effectiveMax ?? 0), Te = Array.from({ length: Math.max(0, fe) }, (le, lt) => {
            const Et = lt + 1;
            return { n: Et, filled: Et <= z };
          }), te = String(E.key ?? "").split(".").pop();
          return {
            key: E.key,
            label: l[te] ?? te ?? E.key,
            value: z,
            max: fe,
            rating: Number(E.rating ?? 0),
            isCapped: Number(E.rating ?? 0) > Number(E.cap ?? a),
            pips: Te,
            // Paths for edit-mode inputs
            pathRating: `system.counters.edgePools.${E.key}.rating`,
            pathValue: `system.counters.edgePools.${E.key}.value`,
            // Keep the roll payload if you want pool-name click to route through BaseActorSheetV2 roll handler
            roll: JSON.stringify({ intent: "edge", pool: E.key })
          };
        })
      }))
    };
    const u = ["grit", "insight", "legend", "chaos", "rumor", "credibility"], m = /* @__PURE__ */ new Map();
    for (const P of s.edgeConsole.groups ?? [])
      for (const E of P.pools ?? []) {
        const z = String(E.key ?? "").split(".").pop();
        z && m.set(z, E), E.domain = P.id;
      }
    s.edgeConsole.poolsOrdered = u.map((P) => m.get(P)).filter(Boolean);
    const f = (this.actor.system ?? {}).monitors ?? {}, g = [
      { id: "physical", label: "Physical", kind: "wound", status: { label: "Penalty", path: "derived.penalty" } },
      { id: "fatigue", label: "Fatigue", kind: "fatigue", status: { label: "Penalty", path: "derived.penalty" } },
      { id: "armor", label: "Armor", kind: "armor-personal", status: { label: "Resist", path: "derived.resistance" } }
    ], A = (P, E, z = 0) => {
      const fe = foundry.utils.getProperty(P, E), Te = Number(fe);
      return Number.isFinite(Te) ? Te : z;
    };
    s.conditionMonitors = g.map((P) => {
      const E = (f == null ? void 0 : f[P.id]) ?? {}, z = Math.max(0, A(E, "max", 0)), fe = Math.min(Math.max(0, A(E, "value", 0)), z);
      return {
        id: P.id,
        label: P.label,
        kind: P.kind,
        editable: !!this.isEditable,
        value: fe,
        max: z,
        segments: Array.from({ length: z }, (Te, te) => {
          const le = te + 1;
          return { value: le, filled: le <= fe };
        }),
        status: P.status ? { label: P.status.label, value: A(E, P.status.path, 0) } : null
      };
    });
    const T = Number(((Pe = (We = this.actor.system) == null ? void 0 : We.burn) == null ? void 0 : Pe.value) ?? 0), y = 10, S = 6, v = Math.min(T, y);
    s.burnOverflow = Math.max(0, T - y), s.burnPenalty = Math.floor(T / 2), s.burnPips = Array.from({ length: y }, (P, E) => {
      const z = E + 1;
      return {
        pipValue: z,
        filled: z <= v,
        threshold: z === S
      };
    }), s.combat = {
      roll: {
        initiative: JSON.stringify({ intent: "initiative" }),
        overload: JSON.stringify({ intent: "overload" })
      }
    }, s.burn = {
      value: T,
      penalty: Math.floor(T / 2),
      overflow: Math.max(0, T - 10),
      canOverloadCheck: T >= 6,
      overloaded: !!((Ie = (_e = this.actor.system) == null ? void 0 : _e.burn) != null && Ie.overloaded)
    };
    const k = J.getSnapshot(this.actor, { token: i });
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
    const _ = J.buildActionModel(this.actor, k), q = new Set((_.menus ?? []).map((P) => P.id));
    B(this, be) && !q.has(B(this, be)) && ye(this, be, null), s.combatActions = {
      ..._,
      menus: (_.menus ?? []).map((P) => ({
        ...P,
        isOpen: P.id === B(this, be)
      }))
    };
    const W = ((nt = (xe = this.actor).getPersonalCombatLoadout) == null ? void 0 : nt.call(xe)) ?? null;
    return s.personalInventory = {
      warnings: [...(W == null ? void 0 : W.warnings) ?? []],
      weapons: ((W == null ? void 0 : W.weapons) ?? []).map((P) => ({
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
      armor: ((W == null ? void 0 : W.armor) ?? []).map((P) => {
        var z, fe, Te, te, le;
        const E = ((z = W == null ? void 0 : W.activeArmor) == null ? void 0 : z.id) === P.id ? W.activeArmor : null;
        return {
          id: P.id,
          name: P.name,
          img: P.img,
          rating: Number((E == null ? void 0 : E.ratingCurrent) ?? P.rating ?? 0),
          baseResistance: Number((E == null ? void 0 : E.baseMitigation) ?? (E == null ? void 0 : E.baseResistance) ?? 0),
          defenseBonus: Number(P.defenseBonus ?? 0),
          equipped: !!P.equipped,
          isPrimary: !!P.isPrimary,
          durability: `${Number(((fe = E == null ? void 0 : E.durability) == null ? void 0 : fe.current) ?? ((Te = P.durability) == null ? void 0 : Te.current) ?? 0)}/${Number(((te = E == null ? void 0 : E.durability) == null ? void 0 : te.max) ?? ((le = P.durability) == null ? void 0 : le.max) ?? 0)}`,
          mitigationLabel: Object.entries((E == null ? void 0 : E.mitigationByType) ?? (E == null ? void 0 : E.typedMitigation) ?? P.mitigationByType ?? {}).filter(([, lt]) => Number(lt) > 0).map(([lt, Et]) => `${lt} +${Et}`).join(", ")
        };
      }),
      gear: (((ot = s.items) == null ? void 0 : ot.gear) ?? []).map((P) => {
        var E, z;
        return {
          id: P.id,
          name: P.name,
          img: P.img,
          quantity: Number(((E = P.system) == null ? void 0 : E.quantity) ?? 1) || 1,
          equipped: !!((z = P.system) != null && z.equipped)
        };
      })
    }, s;
  }
  _onRender(t, s) {
    super._onRender(t, s), R(this, N, Ti).call(this), R(this, N, ki).call(this);
  }
  async close(t = {}) {
    return R(this, N, ys).call(this), super.close(t);
  }
  async _onEdgeSet(t, s) {
    var c, u, m;
    if (t.preventDefault(), t.stopPropagation(), !this.isEditable) return;
    const i = ((c = s == null ? void 0 : s.closest) == null ? void 0 : c.call(s, "[data-edge-pool][data-edge-value]")) ?? ((m = (u = t == null ? void 0 : t.target) == null ? void 0 : u.closest) == null ? void 0 : m.call(u, "[data-edge-pool][data-edge-value]"));
    if (!i) return;
    const a = String(i.dataset.edgePool ?? "").trim(), n = Number(i.dataset.edgeValue ?? NaN);
    if (!a || !Number.isFinite(n)) return;
    const o = this.actor.getEdgePool(a);
    if (!(o != null && o.hasPools)) return;
    let l = n;
    return n === o.effectiveValue && (l = n - 1), (t.button === 2 || t.type === "contextmenu") && (l = 0), t.altKey && (l = 0), t.shiftKey && (l = o.effectiveMax), this.actor.setEdgePoolValue(a, l);
  }
  async _onToggleCombatMenu(t, s) {
    var a, n, o, l, c, u, m;
    (a = t == null ? void 0 : t.preventDefault) == null || a.call(t), (n = t == null ? void 0 : t.stopPropagation) == null || n.call(t);
    const i = String(
      ((o = s == null ? void 0 : s.dataset) == null ? void 0 : o.combatMenu) ?? ((m = (u = (c = (l = t == null ? void 0 : t.target) == null ? void 0 : l.closest) == null ? void 0 : c.call(l, "[data-combat-menu]")) == null ? void 0 : u.dataset) == null ? void 0 : m.combatMenu) ?? ""
    ).trim();
    i && (ye(this, be, B(this, be) === i ? null : i), R(this, N, ce).call(this, !1));
  }
  async _onToggleStatuses(t) {
    var a, n, o, l, c, u, m, h;
    if ((a = t == null ? void 0 : t.preventDefault) == null || a.call(t), (n = t == null ? void 0 : t.stopPropagation) == null || n.call(t), !this.isEditable) return;
    const s = this.getPersistentActor() ?? this.actor, i = ((o = this.getSheetTokenDocument) == null ? void 0 : o.call(this)) ?? ((c = J.getSnapshot(s, { token: ((l = this.getSheetTokenDocument) == null ? void 0 : l.call(this)) ?? null })) == null ? void 0 : c.tokenDocument) ?? ((m = J.getSnapshot(this.actor, { token: ((u = this.getSheetTokenDocument) == null ? void 0 : u.call(this)) ?? null })) == null ? void 0 : m.tokenDocument) ?? null;
    if (!i) {
      (h = ui.notifications) == null || h.warn("Statuses require a token for this actor on the current scene.");
      return;
    }
    return _a({
      actor: s,
      token: i
    });
  }
  async _onCombatSpend(t, s) {
    var c, u, m, h, f, g, A, T, y, S;
    if ((c = t == null ? void 0 : t.preventDefault) == null || c.call(t), (u = t == null ? void 0 : t.stopPropagation) == null || u.call(t), !this.isEditable) return;
    const i = String(((m = s == null ? void 0 : s.dataset) == null ? void 0 : m.resource) ?? "").trim(), a = Math.max(0, Number(((h = s == null ? void 0 : s.dataset) == null ? void 0 : h.cost) ?? 0)), n = String(((f = s == null ? void 0 : s.dataset) == null ? void 0 : f.combatAction) ?? "").trim(), o = String(((g = s == null ? void 0 : s.dataset) == null ? void 0 : g.combatLabel) ?? "").trim(), l = String(((A = s == null ? void 0 : s.dataset) == null ? void 0 : A.combatCostLabel) ?? "").trim();
    if (!(!i || !a || !n))
      try {
        const v = this.getPersistentActor() ?? this.actor, k = await J.spendResource(v, {
          token: ((T = this.getSheetTokenDocument) == null ? void 0 : T.call(this)) ?? J.getCurrentSceneTokenDocument(v) ?? J.getCurrentSceneTokenDocument(this.actor),
          resource: i,
          cost: a,
          actionId: n,
          actionLabel: o,
          actionCostLabel: l
        });
        if (!(k != null && k.ok)) {
          (y = ui.notifications) == null || y.warn((k == null ? void 0 : k.reason) ?? "Unable to spend action.");
          return;
        }
        R(this, N, Ue).call(this, { rerender: !1 }), R(this, N, ce).call(this, { force: !0 });
      } catch (v) {
        console.error("MWD | Failed to spend combat action", v), (S = ui.notifications) == null || S.error("Unable to spend action.");
      }
  }
  async _onCombatReduceBurn(t) {
    var s, i, a, n, o;
    if ((s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (i = t == null ? void 0 : t.stopPropagation) == null || i.call(t), !!this.isEditable)
      try {
        const l = this.getPersistentActor() ?? this.actor, c = await J.reduceBurn(l, {
          token: ((a = this.getSheetTokenDocument) == null ? void 0 : a.call(this)) ?? J.getCurrentSceneTokenDocument(l) ?? J.getCurrentSceneTokenDocument(this.actor)
        });
        if (!(c != null && c.ok)) {
          (n = ui.notifications) == null || n.warn((c == null ? void 0 : c.reason) ?? "Unable to reduce Burn.");
          return;
        }
        R(this, N, Ue).call(this, { rerender: !1 }), R(this, N, ce).call(this, { force: !0 });
      } catch (l) {
        console.error("MWD | Failed to reduce Burn", l), (o = ui.notifications) == null || o.error("Unable to reduce Burn.");
      }
  }
  async _onCombatOverloadCheck(t, s) {
    var n, o, l, c, u, m, h, f, g, A, T;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const i = ((l = s == null ? void 0 : s.dataset) == null ? void 0 : l.roll) ?? ((h = (m = (u = (c = t == null ? void 0 : t.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, "[data-roll]")) == null ? void 0 : m.dataset) == null ? void 0 : h.roll);
    if (!i) return;
    let a;
    try {
      a = JSON.parse(i);
    } catch (y) {
      console.warn("MWD | Invalid overload payload", i, y);
      return;
    }
    try {
      const y = this.getPersistentActor() ?? this.actor, S = await ((A = (g = (f = game.mwd) == null ? void 0 : f.roll) == null ? void 0 : g.execute) == null ? void 0 : A.call(g, { actor: y, payload: a, event: t }));
      if (R(this, N, Ue).call(this, { rerender: !1 }), !S) {
        R(this, N, ce).call(this, !1);
        return;
      }
      R(this, N, ce).call(this, { force: !0 });
    } catch (y) {
      console.error("MWD | Failed to launch overload check", y), (T = ui.notifications) == null || T.error("Unable to launch overload check.");
    }
  }
  async _onCombatAttack(t) {
    var o, l, c, u, m, h, f, g, A, T, y, S;
    if ((o = t == null ? void 0 : t.preventDefault) == null || o.call(t), (l = t == null ? void 0 : t.stopPropagation) == null || l.call(t), !this.isEditable) return;
    const s = this.getPersistentActor() ?? this.actor, i = ((c = this.getSheetTokenDocument) == null ? void 0 : c.call(this)) ?? J.getCurrentSceneTokenDocument(s) ?? J.getCurrentSceneTokenDocument(this.actor), a = J.getSnapshot(s, { token: i });
    if (!a.hasCombatant) {
      (u = ui.notifications) == null || u.warn("No combatant on the current scene.");
      return;
    }
    if (!a.isCurrentTurn) {
      (m = ui.notifications) == null || m.warn("Only available during your activation.");
      return;
    }
    if (a.overloaded) {
      (h = ui.notifications) == null || h.warn("Overloaded actors can only recover Burn.");
      return;
    }
    if (a.state.saRemaining < 2) {
      (f = ui.notifications) == null || f.warn("Need 2 SA remaining to attack.");
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
      const v = await ((T = (A = (g = game.mwd) == null ? void 0 : g.roll) == null ? void 0 : A.execute) == null ? void 0 : T.call(A, { actor: s, payload: n, event: t }));
      if (R(this, N, Ue).call(this, { rerender: !1 }), !v) {
        R(this, N, ce).call(this, !1);
        return;
      }
      const k = await J.spendResource(s, {
        token: i,
        resource: "sa",
        cost: 2,
        actionId: "attack",
        actionLabel: "Attack",
        actionCostLabel: "2 SA"
      });
      k != null && k.ok || (y = ui.notifications) == null || y.warn((k == null ? void 0 : k.reason) ?? "Unable to spend attack action."), R(this, N, ce).call(this, { force: !0 });
    } catch (v) {
      console.error("MWD | Failed to launch attack", v), (S = ui.notifications) == null || S.error((v == null ? void 0 : v.message) ?? "Unable to launch attack.");
    }
  }
  async _onCreateOwnedItem(t, s) {
    var l, c, u;
    if ((l = t == null ? void 0 : t.preventDefault) == null || l.call(t), (c = t == null ? void 0 : t.stopPropagation) == null || c.call(t), !this.isEditable) return;
    const i = String(((u = s == null ? void 0 : s.dataset) == null ? void 0 : u.itemType) ?? "").trim();
    if (!i) return;
    const a = this.getPersistentActor() ?? this.actor, n = a.items.filter((m) => m.type === i).length, o = i === "personalWeapon" ? "Personal Weapon" : i === "armor" ? "Armor" : i.charAt(0).toUpperCase() + i.slice(1);
    await a.createEmbeddedDocuments("Item", [{
      name: `${o} ${n + 1}`,
      type: i
    }]), R(this, N, ce).call(this, { force: !0 });
  }
  async _onEditOwnedItem(t, s) {
    var a, n, o;
    (a = t == null ? void 0 : t.preventDefault) == null || a.call(t), (n = t == null ? void 0 : t.stopPropagation) == null || n.call(t);
    const i = R(this, N, ft).call(this, s, t);
    (o = i == null ? void 0 : i.sheet) == null || o.render(!0);
  }
  async _onDeleteOwnedItem(t, s) {
    var n, o;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const i = R(this, N, ft).call(this, s, t);
    if (!i) return;
    await (this.getPersistentActor() ?? this.actor).deleteEmbeddedDocuments("Item", [i.id]), R(this, N, ce).call(this, { force: !0 });
  }
  async _onToggleOwnedItemEquipped(t, s) {
    var n, o, l, c;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const i = R(this, N, ft).call(this, s, t);
    if (!i) return;
    const a = this.getPersistentActor() ?? this.actor;
    await ((c = a.setOwnedItemEquipped) == null ? void 0 : c.call(a, i.id, !((l = i.system) != null && l.equipped))), R(this, N, ce).call(this, { force: !0 });
  }
  async _onSetOwnedItemPrimary(t, s) {
    var n, o, l, c;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const i = R(this, N, ft).call(this, s, t);
    if (!i) return;
    const a = this.getPersistentActor() ?? this.actor;
    await ((c = a.setOwnedItemPrimary) == null ? void 0 : c.call(a, i.id, !((l = i.system) != null && l.isPrimary))), R(this, N, ce).call(this, { force: !0 });
  }
  async _onAttackWeapon(t, s) {
    var n, o, l, c, u, m, h, f, g, A, T;
    (n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t);
    const i = ((l = s == null ? void 0 : s.dataset) == null ? void 0 : l.roll) ?? ((h = (m = (u = (c = t == null ? void 0 : t.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, "[data-roll]")) == null ? void 0 : m.dataset) == null ? void 0 : h.roll);
    if (!i) return;
    let a;
    try {
      a = JSON.parse(i);
    } catch (y) {
      console.warn("MWD | Invalid attack payload", i, y);
      return;
    }
    try {
      const y = this.getPersistentActor() ?? this.actor;
      if (!await ((A = (g = (f = game.mwd) == null ? void 0 : f.roll) == null ? void 0 : g.execute) == null ? void 0 : A.call(g, { actor: y, payload: a, event: t }))) return;
      R(this, N, ce).call(this, { force: !0 });
    } catch (y) {
      console.error("MWD | Failed to launch weapon attack", y), (T = ui.notifications) == null || T.error((y == null ? void 0 : y.message) ?? "Unable to attack with that weapon.");
    }
  }
};
be = new WeakMap(), Be = new WeakMap(), je = new WeakMap(), N = new WeakSet(), Ti = function() {
  R(this, N, ys).call(this), B(this, be) && (ye(this, Be, (t) => {
    var a;
    const s = this._getRootElement();
    if (!s) return;
    const i = t.target;
    if (i instanceof Node && !((a = i.closest) != null && a.call(i, ".mwd-combat-menu"))) {
      if (!s.contains(i)) {
        R(this, N, Ue).call(this);
        return;
      }
      R(this, N, Ue).call(this);
    }
  }), document.addEventListener("click", B(this, Be)));
}, ys = function() {
  B(this, Be) && (document.removeEventListener("click", B(this, Be)), ye(this, Be, null));
}, $t = function() {
  const t = this._getRootElement();
  return t ? t.querySelector(".mwd-scroll-area") ?? t.querySelector(".csb-tab-panels") : null;
}, Si = function() {
  const t = R(this, N, $t).call(this);
  if (!(t instanceof HTMLElement)) {
    ye(this, je, null);
    return;
  }
  ye(this, je, {
    top: t.scrollTop,
    left: t.scrollLeft
  });
}, ki = function() {
  const t = B(this, je);
  if (!t) return;
  const s = R(this, N, $t).call(this);
  s instanceof HTMLElement && (s.scrollTop = t.top, s.scrollLeft = t.left, requestAnimationFrame(() => {
    const i = R(this, N, $t).call(this);
    i instanceof HTMLElement && (i.scrollTop = t.top, i.scrollLeft = t.left);
  }), ye(this, je, null));
}, ce = function(t = !1) {
  R(this, N, Si).call(this), this.render(t);
}, Ue = function({ rerender: t = !0 } = {}) {
  B(this, be) && (ye(this, be, null), t && R(this, N, ce).call(this, !1));
}, ft = function(t, s) {
  var a, n, o, l, c, u, m, h;
  const i = String(
    ((a = t == null ? void 0 : t.dataset) == null ? void 0 : a.itemId) ?? ((l = (o = (n = t == null ? void 0 : t.closest) == null ? void 0 : n.call(t, "[data-item-id]")) == null ? void 0 : o.dataset) == null ? void 0 : l.itemId) ?? ((h = (m = (u = (c = s == null ? void 0 : s.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, "[data-item-id]")) == null ? void 0 : m.dataset) == null ? void 0 : h.itemId) ?? ""
  ).trim();
  return i ? this.actor.items.get(i) ?? null : null;
}, M(Q, "PARTS", {
  sheet: {
    get template() {
      return `${O}/v2/actor/character-sheet.hbs`;
    }
  }
}), M(Q, "DEFAULT_OPTIONS", foundry.utils.mergeObject(Dt(Q, Q, "DEFAULT_OPTIONS"), {
  classes: ["character-sheet", w, "actor-sheet-v2", "mwd-character-sheet", "mwd-sheet"],
  window: { minWidth: 450, minHeight: 740, resizable: !0 },
  position: { width: 980, height: 900 },
  actions: {
    ...Dt(Q, Q, "DEFAULT_OPTIONS").actions,
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
    toggleOwnedItemEquipped: Q.prototype._onToggleOwnedItemEquipped,
    setOwnedItemPrimary: Q.prototype._onSetOwnedItemPrimary,
    attackWeapon: Q.prototype._onAttackWeapon
  }
}));
let gs = Q;
class Mi extends rt {
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      classes: ["npc-sheet", w, "actor-sheet-v2"]
    });
  }
}
M(Mi, "PARTS", {
  sheet: {
    get template() {
      return `${O}/actor/npc.hbs`;
    },
    scrollable: [".sheet-body"]
  }
});
class Ci extends rt {
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      classes: ["vehicle-sheet", w, "actor-sheet-v2"],
      position: { width: 860, height: 820 }
    });
  }
}
M(Ci, "PARTS", {
  sheet: {
    get template() {
      return `${O}/actor/vehicle.hbs`;
    },
    scrollable: [".sheet-body"]
  }
});
class vi extends rt {
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      classes: ["battlemech-sheet", w, "actor-sheet-v2"],
      position: { width: 900, height: 820 }
    });
  }
}
M(vi, "PARTS", {
  sheet: {
    get template() {
      return `${O}/actor/battlemech.hbs`;
    },
    scrollable: [".sheet-body"]
  }
});
function Za() {
  console.log(`${j}Registering Actor sheets (V2)`);
  const { Actors: r } = foundry.documents.collections;
  r.registerSheet(w, gs, {
    types: ["character"],
    makeDefault: !0,
    label: "Character (V2)"
  }), r.registerSheet(w, Mi, {
    types: ["npc"],
    makeDefault: !0,
    label: "NPC (V2)"
  }), r.registerSheet(w, Ci, {
    types: ["vehicle"],
    makeDefault: !0,
    label: "Vehicle (V2)"
  }), r.registerSheet(w, vi, {
    types: ["battlemech"],
    makeDefault: !0,
    label: "BattleMech (V2)"
  });
}
const { HandlebarsApplicationMixin: er } = foundry.applications.api;
var Ve, qe, gt;
const ae = class ae extends er(foundry.applications.sheets.ItemSheetV2) {
  constructor() {
    super(...arguments);
    re(this, qe);
    re(this, Ve, /* @__PURE__ */ new Map());
    /** @override */
    M(this, "tabGroups", {
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
      classes: ["sheet", "item", w, "appv2", "mwd-sheet", "item-sheet"],
      position: {
        width: 760,
        height: 860
      },
      window: {
        resizable: !0
      },
      actions: {
        editImage: ae._onEditImage,
        tab: ae.prototype._onClickTab,
        checkbarElement: ae._onClickCheckbar,
        modifierAdd: ae._onModifierAdd,
        modifierDelete: ae._onModifierDelete,
        modifierValueChange: ae._onModifierValueChange,
        modifierConditionChange: ae._onModifierConditionChange,
        modifierSelectionChange: ae._onModifierSelectionChange,
        effectCreate: ae._onEffectCreate,
        effectEdit: ae._onEffectEdit,
        effectDelete: ae._onEffectDelete,
        effectToggleDisabled: ae._onEffectToggleDisabled
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
        [d.itemType.mechWeapon]: `${O}/v2/item/mech-weapon-root.hbs`,
        [d.itemType.armor]: `${O}/v2/item/armor.hbs`
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
    return `${K.itemType.singular[t] ?? t}: ${this.item.name}`;
  }
  /**
   * Prepare context data for rendering.
   * @param {object} options - Rendering options
   * @returns {Promise<object>} The context object
   * @override
   */
  async _prepareContext(t) {
    var q, W, ie, we, he, Ae;
    const s = await super._prepareContext(t), i = ((W = (q = game.system.mwd.modifiers) == null ? void 0 : q.getEnums) == null ? void 0 : W.call(q)) ?? {}, a = foundry.utils.deepClone((s == null ? void 0 : s.options) ?? {}), n = ((we = (ie = this.item.actor) == null ? void 0 : ie.getAttributes) == null ? void 0 : we.call(ie, this.item)) ?? [], o = this._getCanonicalItemType(), l = !this.item.actor, c = !!this.item.actor, u = K.itemType.singular[o] ?? o, m = this._getEffectEntries(), h = m.filter((pe) => pe.syncedCount > 0).length, f = this.constructor.LAYOUT_ID, g = this.item.actor ? (pe) => n.includes(pe) : (pe) => !0, A = o === d.itemType.skill, y = ["mwd", "item-sheet", this.isEditable ? "editable" : "locked"], S = y.join(" ");
    a.classes = y, a.cssClass = S;
    const v = await foundry.applications.ux.TextEditor.implementation.enrichHTML(this.item.system.description ?? "", {
      async: !0,
      secrets: this.item.isOwner,
      relativeTo: this.item
    }), k = game.user.isGM && this.item.system.gmnotes ? await foundry.applications.ux.TextEditor.implementation.enrichHTML(this.item.system.gmnotes, {
      async: !0,
      secrets: !0,
      relativeTo: this.item
    }) : "", _ = foundry.utils.mergeObject(s, {
      // Item data
      item: this.item,
      data: this.item,
      system: this.item.system,
      // Enriched content
      enrichedDescription: v,
      enrichedGMNotes: k,
      // Options for templates
      options: {
        ...a,
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
      ENUMS: foundry.utils.mergeObject(
        G.getEnums(g, A),
        i
      ),
      MWD: K,
      itemSheet: {
        canonicalType: o,
        typeLabel: u,
        isArmorSheet: o === d.itemType.armor,
        isStandalone: l,
        canUseActorControls: c,
        supportsEffectSync: !!((Ae = (he = this.item).supportsEquippedEffectSync) != null && Ae.call(he)),
        effectEntries: m,
        effectCount: m.length,
        syncedEffectCount: h,
        summaryChips: this._getSummaryChips(),
        stateChips: this._getStateChips(m)
      },
      // CSS class for form element
      cssClass: S,
      // Tab configuration
      tabs: this._getTabs()
    });
    return f && (_.layout = await Bt.get(f)), _;
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
      const m = (l = (o = (n = u.flags) == null ? void 0 : n[w]) == null ? void 0 : o.equippedItemSync) == null ? void 0 : l.sourceEffectId;
      if (!m) continue;
      const h = t.get(m) ?? [];
      h.push(u), t.set(m, h);
    }
    return Array.from(((c = this.item.effects) == null ? void 0 : c.contents) ?? []).map((u) => {
      var h, f, g, A, T, y, S;
      const m = t.get(u.id) ?? [];
      return {
        id: u.id,
        name: u.name || "New Effect",
        img: u.img || "icons/svg/aura.svg",
        disabled: !!u.disabled,
        transfer: !!u.transfer,
        changesCount: Array.isArray(u.changes) ? u.changes.length : 0,
        statusesCount: Number(((h = u.statuses) == null ? void 0 : h.size) ?? ((f = u.statuses) == null ? void 0 : f.length) ?? 0),
        durationLabel: (g = u.duration) != null && g.seconds ? `${u.duration.seconds}s` : (A = u.duration) != null && A.rounds ? `${u.duration.rounds} rounds` : "Passive",
        syncedCount: m.length,
        syncLabel: this.item.actor ? (y = (T = this.item).supportsEquippedEffectSync) != null && y.call(T) ? (S = this.item.system) != null && S.equipped ? m.length ? `Synced to actor (${m.length})` : "Pending sync" : "Applies when equipped" : "No equip sync" : "World item"
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
    o && (B(this, Ve).set(n, o), R(this, qe, gt).call(this, this._getRootElement(), n, o));
  }
  _onRender(t, s) {
    var a, n, o, l;
    (a = super._onRender) == null || a.call(this, t, s), (n = this.window) != null && n.title && (this.window.title.textContent = this.title);
    const i = this._getRootElement();
    if (i) {
      for (const c of i.querySelectorAll(".sheet-tabs")) {
        const u = c.dataset.group || "default", m = Array.from(c.querySelectorAll("[data-tab]"));
        if (!m.length) continue;
        for (const A of m)
          A.addEventListener("click", (T) => {
            T.preventDefault(), T.stopPropagation();
            const y = A.dataset.tab;
            y && (B(this, Ve).set(u, y), R(this, qe, gt).call(this, i, u, y));
          });
        const h = B(this, Ve).get(u), f = c.dataset.default || ((o = m[0]) == null ? void 0 : o.dataset.tab), g = h || f;
        g && R(this, qe, gt).call(this, i, u, g);
      }
      for (const c of i.querySelectorAll(".csb-tabs")) {
        const u = c.dataset.group || "default", m = Array.from(c.querySelectorAll(".csb-tab-link[data-tab]"));
        if (!m.length) continue;
        const h = B(this, Ve).get(u), f = c.dataset.default || ((l = m[0]) == null ? void 0 : l.dataset.tab), g = h || f;
        g && R(this, qe, gt).call(this, i, u, g);
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
    var n, o, l, c, u, m, h;
    (n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t);
    const i = ((l = s == null ? void 0 : s.dataset) == null ? void 0 : l.effectId) ?? ((m = (u = (c = s == null ? void 0 : s.closest) == null ? void 0 : c.call(s, "[data-effect-id]")) == null ? void 0 : u.dataset) == null ? void 0 : m.effectId);
    if (!i) return;
    const a = this.item.effects.get(i);
    (h = a == null ? void 0 : a.sheet) == null || h.render(!0);
  }
  static async _onEffectDelete(t, s) {
    var a, n, o, l, c, u;
    (a = t == null ? void 0 : t.preventDefault) == null || a.call(t), (n = t == null ? void 0 : t.stopPropagation) == null || n.call(t);
    const i = ((o = s == null ? void 0 : s.dataset) == null ? void 0 : o.effectId) ?? ((u = (c = (l = s == null ? void 0 : s.closest) == null ? void 0 : l.call(s, "[data-effect-id]")) == null ? void 0 : c.dataset) == null ? void 0 : u.effectId);
    i && await this.item.deleteEmbeddedDocuments("ActiveEffect", [i]);
  }
  static async _onEffectToggleDisabled(t, s) {
    var n, o, l, c, u, m;
    (n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t);
    const i = ((l = s == null ? void 0 : s.dataset) == null ? void 0 : l.effectId) ?? ((m = (u = (c = s == null ? void 0 : s.closest) == null ? void 0 : c.call(s, "[data-effect-id]")) == null ? void 0 : u.dataset) == null ? void 0 : m.effectId);
    if (!i) return;
    const a = this.item.effects.get(i);
    a && await a.update({ disabled: !a.disabled });
  }
};
Ve = new WeakMap(), qe = new WeakSet(), gt = function(t, s, i) {
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
}, M(ae, "LAYOUT_ID", null), /** @override */
M(ae, "PARTS", {
  sheet: {
    template: "",
    // Set dynamically in _getPartTemplate
    scrollable: [".sheet-body"]
  }
}), M(ae, "TABS", {
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
let Ne = ae;
class Pi extends Ne {
}
M(Pi, "PARTS", {
  sheet: {
    template: `${O}/v2/item/contact.hbs`,
    scrollable: [".sheet-body"]
  }
});
class Ei extends Ne {
}
M(Ei, "PARTS", {
  sheet: {
    template: `${O}/v2/item/gear.hbs`,
    scrollable: [".sheet-body"]
  }
});
class Di extends Ne {
}
M(Di, "PARTS", {
  sheet: {
    template: `${O}/v2/item/quality.hbs`,
    scrollable: [".sheet-body"]
  }
});
class Ri extends Ne {
}
M(Ri, "PARTS", {
  sheet: {
    template: `${O}/v2/item/assetModule.hbs`,
    scrollable: [".sheet-body"]
  }
});
class Oi extends Ne {
}
M(Oi, "PARTS", {
  sheet: {
    template: `${O}/v2/item/lifeModule.hbs`,
    scrollable: [".sheet-body"]
  }
});
class Ni extends Ne {
}
M(Ni, "PARTS", {
  sheet: {
    template: `${O}/v2/item/skill.hbs`,
    scrollable: [".sheet-body"]
  }
});
const tr = Object.freeze([
  "firearms",
  "projectileWeapons",
  "heavyWeapons",
  "meleeCombat"
]), sr = Object.freeze([
  { value: "energy", label: "Energy" },
  { value: "kinetic", label: "Kinetic" },
  { value: "ballistic", label: "Ballistic" },
  { value: "explosive", label: "Explosive" },
  { value: "plasma", label: "Plasma" },
  { value: "electrical", label: "Electrical" },
  { value: "melee", label: "Melee" },
  { value: "none", label: "None" }
]);
function Qs(r, e, t) {
  const s = String(e ?? "").trim();
  return !s || r.some((i) => i.value === s) ? r : r.concat({ value: s, label: t(s) });
}
class jt extends Ne {
  /** @override */
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      actions: {
        ...super.DEFAULT_OPTIONS.actions,
        weaponSkillChange: jt._onWeaponSkillChange
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
    var l, c, u, m, h;
    const t = await super._prepareContext(e), s = this._getCanonicalItemType();
    t.ENUMS = foundry.utils.mergeObject(
      { defenses: Y.getDefenses() },
      t.ENUMS
    );
    const i = Array.isArray((l = t.ENUMS) == null ? void 0 : l.skills) ? t.ENUMS.skills : [], a = (c = this.item.system) == null ? void 0 : c.skill, n = (u = this.item.system) == null ? void 0 : u.damageType, o = s === "personalWeapon" ? Qs(
      i.filter((f) => tr.includes(f.value)),
      a,
      (f) => {
        var g;
        return ((g = i.find((A) => A.value === f)) == null ? void 0 : g.label) ?? f;
      }
    ) : i;
    return t.weaponProfile = ((h = (m = this.item).getCombatProfile) == null ? void 0 : h.call(m)) ?? null, t.weaponEditor = {
      skills: o,
      categories: [
        { value: "melee", label: "Melee" },
        { value: "ranged", label: "Ranged" },
        { value: "thrown", label: "Thrown" },
        { value: "other", label: "Other" }
      ],
      damageTypes: Qs(
        s === "personalWeapon" ? [...ks] : [...sr],
        n,
        (f) => s === "personalWeapon" ? Qe(f) : f
      ),
      ranges: Ze.RANGE_ORDER.map((f) => ({
        value: f,
        label: f.charAt(0).toUpperCase() + f.slice(1)
      }))
    }, t.itemSheet = foundry.utils.mergeObject(t.itemSheet ?? {}, {
      isCompactWeaponSheet: !0,
      weaponSheetVariant: s === "mechWeapon" ? "mech" : "personal"
    }), t.itemSheet.stateChips = (t.itemSheet.stateChips ?? []).filter((f) => f.kind !== "ownership"), t;
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
const Tt = class Tt extends jt {
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
        attackWeapon: Tt._onAttackWeapon
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
      { label: "Type", value: Qe(e.damageType) || "Penetrating" },
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
M(Tt, "LAYOUT_ID", "personal-weapon"), M(Tt, "PARTS", {
  sheet: {
    template: `${O}/v2/item/personal-weapon-root.hbs`,
    scrollable: [".sheet-body"]
  }
});
let bs = Tt;
class ws extends jt {
}
M(ws, "LAYOUT_ID", "mech-weapon"), M(ws, "PARTS", {
  sheet: {
    template: `${O}/v2/item/mech-weapon-root.hbs`,
    scrollable: [".sheet-body"]
  }
});
class As extends Ne {
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
    var l, c, u, m, h, f, g, A, T;
    const t = await super._prepareContext(e), s = this.item, i = s.actor ?? null, a = ((l = i == null ? void 0 : i.getPersonalCombatLoadout) == null ? void 0 : l.call(i)) ?? null, n = ((c = a == null ? void 0 : a.activeArmor) == null ? void 0 : c.id) ?? null, o = ((u = a == null ? void 0 : a.activeArmor) == null ? void 0 : u.id) === s.id ? a.activeArmor : null;
    return t.armorState = o, t.isActiveArmor = n === s.id, t.effectiveDurabilityCurrent = Number(
      ((m = o == null ? void 0 : o.durability) == null ? void 0 : m.current) ?? ((f = (h = s.system) == null ? void 0 : h.durability) == null ? void 0 : f.current) ?? ((A = (g = s.system) == null ? void 0 : g.durability) == null ? void 0 : A.max) ?? ((T = s.system) == null ? void 0 : T.rating) ?? 0
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
M(As, "LAYOUT_ID", "armor"), M(As, "PARTS", {
  sheet: {
    template: `${O}/v2/item/armor-root.hbs`,
    scrollable: [".sheet-body"]
  }
});
function ir() {
  console.log(`${j}Registering Item sheets (V2)`);
  const { Items: r } = foundry.documents.collections;
  r.registerSheet(w, Pi, { types: ["contact"], makeDefault: !0, label: "Contact (V2)" }), r.registerSheet(w, Ei, { types: ["gear"], makeDefault: !0, label: "Gear (V2)" }), r.registerSheet(w, Di, { types: ["quality"], makeDefault: !0, label: "Quality (V2)" }), r.registerSheet(w, Ri, { types: ["assetModule"], makeDefault: !0, label: "Asset Module (V2)" }), r.registerSheet(w, Oi, { types: ["lifeModule"], makeDefault: !0, label: "Life Module (V2)" }), r.registerSheet(w, Ni, { types: ["skill"], makeDefault: !0, label: "Skill (V2)" }), r.registerSheet(w, bs, { types: ["personalWeapon", "weapon"], makeDefault: !0, label: "Personal Weapon (V2)" }), r.registerSheet(w, ws, { types: ["mechWeapon"], makeDefault: !0, label: "Mech Weapon (V2)" }), r.registerSheet(w, As, { types: ["armor"], makeDefault: !0, label: "Armor (V2)" });
}
const Js = [
  // UI (CSB render entry point + node types)
  `systems/${w}/templates/v2/ui/layout-root.hbs`,
  `systems/${w}/templates/v2/ui/nodes/hexabox.hbs`,
  `systems/${w}/templates/v2/ui/nodes/stack.hbs`,
  `systems/${w}/templates/v2/ui/nodes/panel.hbs`,
  `systems/${w}/templates/v2/ui/nodes/include.hbs`,
  `systems/${w}/templates/v2/ui/nodes/tabs.hbs`,
  `systems/${w}/templates/v2/ui/nodes/unknown.hbs`,
  `systems/${w}/templates/common/view-mode.hbs`,
  `systems/${w}/templates/common/label.hbs`,
  `systems/${w}/templates/common/enum-value-label.hbs`,
  `systems/${w}/templates/common/damage-code.hbs`,
  `systems/${w}/templates/common/damage-armor.hbs`,
  `systems/${w}/templates/v2/ui/mod-stepper.hbs`,
  `systems/${w}/templates/v2/ui/condition-monitors.hbs`,
  `systems/${w}/templates/v2/roll/_mwd-roll-card.hbs`,
  // Character UI
  `systems/${w}/templates/v2/ui/character/attributes.hbs`,
  `systems/${w}/templates/v2/ui/character/combat-actions.hbs`,
  `systems/${w}/templates/v2/ui/character/skills-column.hbs`,
  `systems/${w}/templates/v2/ui/character/skill-row.hbs`,
  `systems/${w}/templates/v2/ui/character/edge-console.hbs`,
  `systems/${w}/templates/v2/ui/character/burn-monitor.hbs`,
  `systems/${w}/templates/v2/ui/character/status-dashboard.hbs`,
  // Sheet wrapper
  `systems/${w}/templates/v2/actor/_sheet-root.hbs`,
  // Placeholders
  `systems/${w}/templates/v2/ui/placeholders/assigned-systems.hbs`,
  `systems/${w}/templates/v2/ui/placeholders/inventory-gear.hbs`,
  `systems/${w}/templates/v2/ui/placeholders/inventory-armor.hbs`,
  `systems/${w}/templates/v2/ui/placeholders/inventory-weapons.hbs`,
  `systems/${w}/templates/v2/ui/placeholders/bio-description.hbs`,
  // V2 item partials
  `systems/${w}/templates/v2/item/_item-sheet-root.hbs`,
  `systems/${w}/templates/v2/item/personal-weapon-root.hbs`,
  `systems/${w}/templates/v2/item/mech-weapon-root.hbs`,
  `systems/${w}/templates/v2/item/armor-root.hbs`,
  `systems/${w}/templates/v2/item/parts/itemname.hbs`,
  `systems/${w}/templates/v2/item/parts/inactive.hbs`,
  `systems/${w}/templates/v2/item/parts/references.hbs`,
  `systems/${w}/templates/v2/item/parts/modifier.hbs`,
  `systems/${w}/templates/v2/item/parts/modifiers.hbs`,
  `systems/${w}/templates/v2/item/parts/weapon-main.hbs`,
  `systems/${w}/templates/v2/item/parts/weapon-compact-main.hbs`,
  `systems/${w}/templates/v2/item/parts/armor-main.hbs`,
  `systems/${w}/templates/v2/item/parts/item-effects.hbs`,
  // Actors
  `systems/${w}/templates/v2/actor/character-sheet.hbs`
];
function ar(r) {
  const e = String(r).replaceAll("\\", "/"), t = `systems/${w}/templates/`, s = e.indexOf(t);
  return `mwd.${(s >= 0 ? e.slice(s + t.length) : e).replace(/\.hbs$/i, "").split("/").filter(Boolean).map((o) => o.replace(/^_+/, "")).join(".")}`;
}
function rr() {
  var r, e;
  return ((e = (r = foundry == null ? void 0 : foundry.applications) == null ? void 0 : r.handlebars) == null ? void 0 : e.Handlebars) ?? Handlebars;
}
async function nr() {
  var e, t;
  const r = rr();
  try {
    const s = {};
    for (const a of Js)
      s[ar(a)] = a, s[a] = a;
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
    console.log(`${j}preloadTemplatesV2 OK`, { loaded: Js.length });
  } catch (s) {
    throw console.error(`${j}preloadTemplatesV2 FAILED`, s), s;
  }
}
function Xs(r) {
  const e = Math.max(0, Number(r) || 0);
  return -Math.floor(e / 3);
}
function or(r) {
  const e = Math.max(0, Number(r) || 0);
  return e === 0 ? 0 : Math.ceil(e / 4);
}
function lr(r = {}) {
  const e = r.physical ?? {}, t = r.fatigue ?? {}, s = r.armor ?? {}, i = Number(e.value) || 0, a = Number(t.value) || 0, n = Math.max(Number(s.value) || 0, Number(s.max) || 0);
  return {
    physical: { penalty: Xs(i) },
    fatigue: { penalty: Xs(a) },
    armor: { resistance: or(n) }
  };
}
const Xt = {
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
function cr(r, e, t, s) {
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
function ur(r = {}) {
  return Object.entries(St(r)).filter(([, e]) => Number(e) > 0).map(([e, t]) => `${e} +${t}`).join(", ");
}
class mr extends Actor {
  /* -------------------------------------------- */
  /* Base & Derived Data                           */
  /* -------------------------------------------- */
  /** @override */
  prepareBaseData() {
    var e, t;
    if (super.prepareBaseData(), this.isCharacterLike()) {
      const s = this.system ?? {};
      if (ua(s), (e = s.skills) != null && e.skills && typeof s.skills.skills == "object") {
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
        const l = Math.max(0, Number((o == null ? void 0 : o.rating) ?? 0)), c = Math.max(0, Number((o == null ? void 0 : o.value) ?? 0)), u = Math.min(l, e), m = Math.min(c, u);
        a[n] = {
          key: n,
          rating: l,
          value: c,
          cap: e,
          effectiveMax: u,
          effectiveValue: m,
          hasPools: !0,
          isEmpty: m <= 0,
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
    const e = [], t = this.items.filter((f) => {
      var g;
      return ((g = f.isPersonalWeapon) == null ? void 0 : g.call(f)) ?? f.type === d.itemType.personalWeapon;
    }).map((f) => {
      var g;
      return ((g = f.getCombatProfile) == null ? void 0 : g.call(f)) ?? null;
    }).filter(Boolean), s = this.items.filter((f) => {
      var g;
      return ((g = f.isArmor) == null ? void 0 : g.call(f)) ?? f.type === d.itemType.armor;
    }).map((f) => {
      var g;
      return ((g = f.getArmorProfile) == null ? void 0 : g.call(f, { actor: this })) ?? null;
    }).filter(Boolean), i = t.filter((f) => f.equipped), a = s.filter((f) => f.equipped), n = i.filter((f) => f.isPrimary), o = a.filter((f) => f.isPrimary);
    let l = null, c = null, u = !1;
    n.length === 1 ? (c = n[0], l = c) : n.length > 1 ? (e.push("Multiple equipped primary weapons found; attack selection requires a chooser."), u = !0) : i.length === 1 ? l = i[0] : i.length > 1 ? u = !0 : l = {
      ...Ze.DEFAULT_UNARMED,
      uuid: null,
      img: null,
      item: null,
      equipped: !0,
      isPrimary: !1,
      defaultRangeBand: "close",
      isSynthetic: !0
    };
    let m = null, h = null;
    return o.length === 1 ? (m = o[0], h = this._buildActiveArmorState(m)) : o.length > 1 ? (e.push("Multiple equipped primary armor items found; using the first equipped armor."), h = a[0] ? this._buildActiveArmorState(a[0]) : null) : a.length === 1 ? h = this._buildActiveArmorState(a[0]) : a.length > 1 && (e.push("Multiple equipped armor items found without a single primary; using the first equipped armor."), h = this._buildActiveArmorState(a[0])), {
      weapons: t,
      equippedWeapons: i,
      primaryWeapon: c,
      defaultWeapon: l,
      weaponChoiceRequired: u,
      armor: s,
      equippedArmor: a,
      primaryArmor: m,
      activeArmor: h,
      warnings: e
    };
  }
  _buildActiveArmorState(e) {
    var n, o;
    if (!e) return null;
    const t = Math.max(0, Number(((n = e == null ? void 0 : e.durability) == null ? void 0 : n.max) ?? (e == null ? void 0 : e.rating) ?? 0)), s = Math.min(
      t,
      Math.max(0, Number(((o = e == null ? void 0 : e.durability) == null ? void 0 : o.current) ?? (e == null ? void 0 : e.currentArmorRating) ?? t))
    ), i = St(e == null ? void 0 : e.mitigationByType), a = Cs(s);
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
      for (const u of this.items.filter((m) => m.type === s.type && m.id !== s.id))
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
    var c, u, m;
    const t = this.getEdgeCap();
    if (this.type === "npc" && !this.hasEdgePools()) {
      const h = t, f = t;
      return {
        key: e,
        value: f,
        rating: h,
        effectiveValue: f,
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
        const c = Object.entries(e).map(([u, m]) => {
          const h = (m ?? []).map((f) => {
            const g = o[f] ?? this.getEdgePool(f);
            return {
              ...g,
              isEmpty: (g.effectiveValue ?? 0) <= 0,
              isCapped: (g.rating ?? 0) > (g.cap ?? t)
            };
          });
          return { id: u, pools: h };
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
    var m, h, f, g, A, T;
    if (e === "burn") {
      const y = Math.max(0, Number(t) || 0);
      return this.update({ "system.burn.value": y });
    }
    if (e === "armor" && this.isCharacterLike()) {
      const y = this.getPersonalCombatLoadout({ refresh: !0 }), S = ((m = y == null ? void 0 : y.activeArmor) == null ? void 0 : m.armorId) ?? ((h = y == null ? void 0 : y.activeArmor) == null ? void 0 : h.id) ?? null, v = S ? this.items.get(S) : null;
      if (!(v != null && v.id)) return null;
      const k = Math.max(0, Number(((f = v.system) == null ? void 0 : f.rating) ?? 0) || 0), _ = Math.max(0, Number(((A = (g = v.system) == null ? void 0 : g.durability) == null ? void 0 : A.max) ?? 0) || 0), q = _ > 0 ? _ : k, W = Math.min(Math.max(0, Number(t) || 0), q);
      return this.updateEmbeddedDocuments("Item", [{
        _id: v.id,
        "system.durability.max": q,
        "system.durability.current": W
      }]);
    }
    const i = `system.monitors.${e}`, a = Number(foundry.utils.getProperty(this, `${i}.max`)) || 0, n = Math.max(0, a), o = Math.min(Math.max(0, Number(t) || 0), n), l = { [`${i}.value`]: o }, c = this.type, u = (T = qt == null ? void 0 : qt[c]) == null ? void 0 : T[e];
    if (u != null && u.derived)
      for (const [y, S] of Object.entries(u.derived)) {
        const v = Xt == null ? void 0 : Xt[S.fn];
        if (typeof v != "function") continue;
        const k = cr(this, e, S.source, o);
        l[`${i}.derived.${y}`] = v(k);
      }
    return this.update(l);
  }
  _prepareMonitors() {
    var n, o, l, c;
    const e = this.system.monitors ?? {}, t = lr(e);
    (n = this.system).derived ?? (n.derived = {}), this.system.derived.monitors = t;
    const s = Number(((o = t == null ? void 0 : t.physical) == null ? void 0 : o.penalty) ?? 0), i = Number(((l = t == null ? void 0 : t.fatigue) == null ? void 0 : l.penalty) ?? 0), a = s + i;
    (c = this.system.derived).condition ?? (c.condition = {}), this.system.derived.condition.physicalPenalty = s, this.system.derived.condition.fatiguePenalty = i, this.system.derived.condition.totalPenalty = a, this.system.derived.conditionPenalty = a;
  }
  _preparePersonalCombatDerived() {
    var n, o, l, c, u, m;
    if (!this.isCharacterLike()) return;
    const e = this.getPersonalCombatLoadout({ refresh: !0 }), t = (o = (n = this.system) == null ? void 0 : n.monitors) == null ? void 0 : o.armor;
    if (!t) return;
    const s = e.activeArmor, i = Math.max(0, Number(((l = s == null ? void 0 : s.durability) == null ? void 0 : l.max) ?? 0)), a = Math.max(0, Number((s == null ? void 0 : s.currentArmorRating) ?? ((c = s == null ? void 0 : s.durability) == null ? void 0 : c.current) ?? 0));
    t.max = i, t.value = Math.min(i, a), t.resistance = {
      default: Number((s == null ? void 0 : s.baseMitigation) ?? (s == null ? void 0 : s.baseResistance) ?? 0),
      byType: {}
    }, t.resistanceBonusByType = s != null && s.isDestroyed ? {} : (s == null ? void 0 : s.mitigationByType) ?? (s == null ? void 0 : s.typedMitigation) ?? {}, t.derived ?? (t.derived = {}), t.derived.resistance = Number((s == null ? void 0 : s.baseMitigation) ?? (s == null ? void 0 : s.baseResistance) ?? 0), t.effect = s != null && s.isDestroyed ? "Destroyed" : s ? ur(s.mitigationByType ?? s.typedMitigation) : "", (u = this.system).derived ?? (u.derived = {}), this.system.derived.personalCombat = {
      defaultWeaponId: ((m = e.defaultWeapon) == null ? void 0 : m.id) ?? null,
      activeArmorId: (s == null ? void 0 : s.id) ?? null,
      warnings: [...e.warnings ?? []]
    };
  }
}
const Zs = { execute: yr }, dr = {
  physical: ["grit", "chaos"],
  mental: ["insight", "rumor"],
  social: ["legend", "credibility"]
};
function hr(r, e) {
  var a;
  const t = dr[e] ?? [];
  let s = null, i = -1;
  for (const n of t) {
    const o = (a = r.getEdgePool) == null ? void 0 : a.call(r, n), l = Number((o == null ? void 0 : o.rating) ?? 0), c = Number((o == null ? void 0 : o.value) ?? 0), u = Math.max(0, l - c);
    u > i && (i = u, s = n);
  }
  return s ?? t[0] ?? null;
}
function pr(r) {
  const t = (Array.isArray(r == null ? void 0 : r.manualModifiers) ? r.manualModifiers : []).map((i) => ({
    id: i.id ?? foundry.utils.randomID(),
    label: (i.label ?? "Manual").trim() || "Manual",
    value: Number(i.value ?? 0),
    source: "Manual"
  })).filter((i) => Number.isFinite(i.value) && i.value !== 0), s = t.reduce((i, a) => i + a.value, 0);
  return { mods: t, total: s };
}
function ei(r = {}) {
  const e = r.toggles ?? {};
  return {
    ...r,
    toggles: {
      useEdge: !!e.useEdge,
      takeRisks: !!e.takeRisks,
      opponentRoll: !!e.opponentRoll
    },
    manualModifiers: gr(r.manualModifiers)
  };
}
async function fr({ actor: r, payload: e } = {}) {
  var a, n, o, l;
  if ((e == null ? void 0 : e.intent) !== "attack") return e;
  const t = foundry.utils.deepClone(e ?? {}), s = ((a = r.getPersonalCombatLoadout) == null ? void 0 : a.call(r, { refresh: !0 })) ?? null, i = (c) => {
    var m, h, f, g, A;
    const u = ((h = (m = r.items) == null ? void 0 : m.get) == null ? void 0 : h.call(m, c)) ?? null;
    return !u || !(((f = u.isPersonalWeapon) == null ? void 0 : f.call(u)) ?? u.type === TEMPLATE.itemType.personalWeapon) || !((g = u.system) != null && g.equipped) ? null : ((A = u.getCombatProfile) == null ? void 0 : A.call(u)) ?? null;
  };
  if (t.weaponId) {
    const c = i(t.weaponId);
    if (!c)
      throw new Error("Attack requires an owned equipped personal weapon.");
    return t.rangeBand = t.rangeBand ?? c.defaultRangeBand ?? "close", t;
  }
  if (t.mode === "auto") {
    if (s != null && s.weaponChoiceRequired) {
      const c = await SelectItem.selectItem(
        "Choose Weapon",
        s.equippedWeapons ?? []
      );
      return c ? (t.weaponId = c.id, t.rangeBand = t.rangeBand ?? c.defaultRangeBand ?? "close", delete t.mode, t) : null;
    }
    if ((n = s == null ? void 0 : s.defaultWeapon) != null && n.isSynthetic || ((o = s == null ? void 0 : s.defaultWeapon) == null ? void 0 : o.id) === "unarmed")
      return t.syntheticWeapon = foundry.utils.deepClone(s.defaultWeapon ?? WeaponItem.DEFAULT_UNARMED), t.weaponId = t.syntheticWeapon.id, t.rangeBand = t.rangeBand ?? "close", delete t.mode, t;
    if ((l = s == null ? void 0 : s.defaultWeapon) != null && l.id)
      return t.weaponId = s.defaultWeapon.id, t.rangeBand = t.rangeBand ?? s.defaultWeapon.defaultRangeBand ?? "close", delete t.mode, t;
  }
  if (t.fallback === "unarmed")
    return t.syntheticWeapon = foundry.utils.deepClone(WeaponItem.DEFAULT_UNARMED), t.weaponId = t.syntheticWeapon.id, t.rangeBand = t.rangeBand ?? "close", delete t.mode, t;
  throw new Error("Attack could not resolve a usable weapon.");
}
function gr(r) {
  return Array.isArray(r) ? r.map((e) => ({
    id: (e == null ? void 0 : e.id) ?? foundry.utils.randomID(),
    label: typeof (e == null ? void 0 : e.label) == "string" ? e.label : "Manual",
    value: Number((e == null ? void 0 : e.value) ?? 0)
  })) : [];
}
async function yr({ actor: r, payload: e, event: t } = {}) {
  var ie, we, he, Ae, pe, He, We, Pe, _e, Ie, xe, nt, ot, P, E, z, fe, Te;
  if (r != null && r.actor && (r = r.actor), (ie = r == null ? void 0 : r.document) != null && ie.actor && (r = r.document.actor), !r) throw new Error("MWD.roll.execute requires actor");
  if (!(e != null && e.intent)) throw new Error("MWD.roll.execute requires payload.intent");
  if (e = ei(e), e = await fr({ actor: r, payload: e }), !e) return null;
  const s = await resolveIntent({ actor: r, payload: e, event: t });
  let i = await collectModifiers({
    actor: r,
    rollType: e.intent,
    skillId: e.key,
    domains: s.domains,
    payload: e,
    resolved: s,
    context: { event: t }
  });
  const a = await MWDRollDialog.prompt({
    actor: r,
    basePayload: e,
    resolved: s,
    diceParts: {
      attribute: ((we = s == null ? void 0 : s.pool) == null ? void 0 : we.attribute) ?? 0,
      skill: ((he = s == null ? void 0 : s.pool) == null ? void 0 : he.skill) ?? 0,
      bonus: ((Ae = s == null ? void 0 : s.pool) == null ? void 0 : Ae.bonus) ?? 0
    },
    mods: i.mods,
    modTotal: i.total,
    options: {
      allowEdge: e.intent !== "initiative"
    }
  });
  if (!a) return null;
  e = ei(a), i = await collectModifiers({
    actor: r,
    rollType: e.intent,
    skillId: e.key,
    domains: s.domains,
    payload: e,
    resolved: s,
    context: { event: t }
  });
  const { mods: n, total: o } = i, { mods: l, total: c } = pr(e), u = [...n, ...l], m = Number(o ?? 0) + Number(c ?? 0), h = Number(((pe = s == null ? void 0 : s.pool) == null ? void 0 : pe.attribute) ?? 0) + Number(((He = s == null ? void 0 : s.pool) == null ? void 0 : He.skill) ?? 0) + Number(((We = s == null ? void 0 : s.pool) == null ? void 0 : We.bonus) ?? 0), f = Math.max(0, h + Number(m ?? 0)), g = e.intent !== "initiative", A = g ? br({ actor: r, ctx: s, payload: e }) : null, T = (Pe = A == null ? void 0 : A.pre) != null && Pe.spent ? 4 : Number(s.diceTarget ?? s.target ?? 5);
  g && ((_e = A == null ? void 0 : A.pre) != null && _e.spent) && ((Ie = A == null ? void 0 : A.pre) != null && Ie.poolKey) && await ((xe = r.spendEdge) == null ? void 0 : xe.call(r, A.pre.poolKey, 1));
  let y, S = 0, v = 0;
  if (s.rollType === "sum" && ((nt = s.sum) != null && nt.formula))
    y = await new Roll(s.sum.formula, s.sum.data ?? {}).evaluate({ async: !0 }), S = Number(y.total ?? 0) + Number(m ?? 0);
  else {
    y = await new Roll(`${f}d6cs>=${T}`).evaluate({ async: !0 });
    const te = (ot = y.dice) == null ? void 0 : ot[0];
    S = Array.isArray(te == null ? void 0 : te.results) ? te.results.filter((le) => le.success).length : 0, v = Array.isArray(te == null ? void 0 : te.results) ? te.results.filter((le) => le.result === 1).length : 0;
  }
  s.intent === "initiative" && (y == null ? void 0 : y.total) != null && await Tr({ actor: r, total: y.total });
  const k = interpretOutcome(
    s,
    { successes: S, raw: (P = y == null ? void 0 : y.toJSON) == null ? void 0 : P.call(y) },
    null
    // opposed rolls can pass defender result later
  ), _ = k == null ? void 0 : k.edgeEarned;
  if ((_ == null ? void 0 : _.amount) > 0) {
    const te = (E = s == null ? void 0 : s.domains) != null && E.includes("physical") ? "physical" : (z = s == null ? void 0 : s.domains) != null && z.includes("mental") ? "mental" : (fe = s == null ? void 0 : s.domains) != null && fe.includes("social") ? "social" : null, le = hr(r, te);
    await ((Te = r.gainEdge) == null ? void 0 : Te.call(r, le, _.amount)), k.edgeEarned.pool = le;
  }
  s.intent === "overload" && await Sr({ actor: r, passed: k.passed });
  const q = buildResolved({
    actor: r,
    payload: e,
    ctx: s,
    roll: y,
    target: T,
    pool: f,
    mods: u,
    modTotal: m,
    hits: S,
    ones: v,
    edge: A,
    outcomeModel: k
  }), W = await renderChat({ resolved: q });
  return ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor: r }),
    content: W,
    flags: {
      mwd: {
        payload: e,
        resolved: q
      }
    }
  });
}
function br({ actor: r, ctx: e, payload: t }) {
  var g, A, T, y, S, v, k;
  const s = wr(e == null ? void 0 : e.domains), i = Ar[s] ?? null, a = (i == null ? void 0 : i.a) ?? null, n = (i == null ? void 0 : i.b) ?? null, o = [a, n].filter(Boolean), l = !!((g = t == null ? void 0 : t.toggles) != null && g.useEdge) || !!(t != null && t.useEdge);
  let c = String(((T = (A = t == null ? void 0 : t.edge) == null ? void 0 : A.pre) == null ? void 0 : T.poolKey) ?? "").trim() || null;
  c && !o.includes(c) && (c = null);
  const u = l && c ? 1 : 0;
  let m = [...o];
  u && c && (m = m.filter((_) => _ !== c));
  let h = String(((S = (y = t == null ? void 0 : t.edge) == null ? void 0 : y.post) == null ? void 0 : S.poolKey) ?? "").trim() || null;
  h && !m.includes(h) && (h = null);
  const f = Number(((k = (v = t == null ? void 0 : t.edge) == null ? void 0 : v.post) == null ? void 0 : k.spent) ?? 0) ? 1 : 0;
  return {
    domain: s,
    pools: i ? { a, b: n } : null,
    pre: { poolKey: c, spent: u },
    post: { poolKey: h, spent: f },
    allowed: { prePools: o, postPools: m }
  };
}
function wr(r) {
  return Array.isArray(r) ? r.includes("physical") ? "physical" : r.includes("mental") ? "mental" : r.includes("social") ? "social" : null : null;
}
const Ar = {
  physical: { a: "grit", b: "chaos" },
  mental: { a: "insight", b: "rumor" },
  social: { a: "legend", b: "credibility" }
};
async function Tr({ actor: r, total: e }) {
  var o, l, c, u, m;
  const t = (l = (o = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : o.controlled) == null ? void 0 : l.find((h) => {
    var f;
    return ((f = h.actor) == null ? void 0 : f.id) === r.id;
  }), s = ((u = (c = r.getActiveTokens) == null ? void 0 : c.call(r, !0, !0)) == null ? void 0 : u[0]) ?? null, i = t ?? s;
  if (!i) {
    (m = ui.notifications) == null || m.warn("Initiative requires a token on the current scene.");
    return;
  }
  let a = game.combat;
  a || (a = await Combat.create({
    scene: canvas.scene.id,
    active: !0
  }));
  let n = a.combatants.find((h) => h.tokenId === i.id);
  if (!n) {
    const h = await a.createEmbeddedDocuments("Combatant", [{
      tokenId: i.id,
      actorId: r.id,
      sceneId: canvas.scene.id
    }]);
    n = h == null ? void 0 : h[0];
  }
  n && await n.update({ initiative: Number(e) });
}
async function Sr({ actor: r, passed: e }) {
  e || await r.update({ "system.burn.overloaded": !0 });
}
var st;
class kr {
  constructor() {
    re(this, st, /* @__PURE__ */ new Map());
  }
  register(e) {
    if (!(e != null && e.id) || typeof e.collect != "function")
      throw new Error("Invalid ModifierProvider: missing id or collect()");
    B(this, st).has(e.id) || B(this, st).set(e.id, e);
  }
  async collectAll(e) {
    const t = [];
    for (const s of B(this, st).values()) {
      const i = await s.collect(e);
      if (console.log("MWD | provider", s.id, "returned", i), !!(i != null && i.length))
        for (const a of i)
          a && typeof a.label == "string" && typeof a.value == "number" && typeof a.source == "string" ? t.push(a) : console.warn("MWD | DROPPED MOD (bad shape)", s.id, a);
    }
    return t;
  }
}
st = new WeakMap();
const mt = new kr(), Mr = /* @__PURE__ */ new Set(["physical", "mental", "social"]);
function Cr(r) {
  if (r == null || r === "" || r === "—" || r === "–") return 0;
  const e = Number(r);
  return Number.isFinite(e) ? e : null;
}
function vr(r) {
  if (!r) return;
  const e = String(r).trim().toLowerCase();
  return Mr.has(e) ? e : void 0;
}
class Pr {
  constructor() {
    M(this, "id", "mwd.itemModifiers");
    M(this, "label", "Item Modifiers");
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
          const c = Cr(l.value);
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
            domain: vr(l.domain)
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
class Er {
  constructor() {
    M(this, "id", "mwd.statusEffects");
    M(this, "label", "Status Effects");
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
class Dr {
  constructor() {
    M(this, "id", "mwd.baseRollModifiers");
    M(this, "label", "Roll (Base)");
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
class Rr {
  constructor() {
    M(this, "id", "mwd.condition");
    M(this, "label", "Condition");
  }
  collect({ actor: e, rollType: t } = {}) {
    var o, l, c, u, m, h, f, g;
    if (!e) return [];
    if (t === "edge") return [];
    const s = ((o = e.system) == null ? void 0 : o.derived) ?? {}, i = Number(
      ((l = s == null ? void 0 : s.condition) == null ? void 0 : l.physicalPenalty) ?? ((u = (c = s == null ? void 0 : s.monitors) == null ? void 0 : c.physical) == null ? void 0 : u.penalty) ?? 0
    ), a = Number(
      ((m = s == null ? void 0 : s.condition) == null ? void 0 : m.fatiguePenalty) ?? ((f = (h = s == null ? void 0 : s.monitors) == null ? void 0 : h.fatigue) == null ? void 0 : f.penalty) ?? 0
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
    }), console.log("MWD|condition derived snapshot", e.name, foundry.utils.deepClone((g = e.system) == null ? void 0 : g.derived)), n;
  }
}
const Or = {
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
function Nr() {
  Hooks.on("renderChatMessageHTML", (r, e) => {
    e.addEventListener("click", (t) => {
      const s = t.target.closest("[data-mwd-action]");
      if (!s) return;
      const i = String(s.dataset.mwdAction || "").trim();
      i && i === "edgePostReroll" && _r(t, r);
    });
  });
}
async function _r(r, e) {
  var g, A, T, y, S, v, k, _, q, W, ie, we, he, Ae, pe, He, We;
  r.preventDefault();
  const t = r.target.closest("[data-mwd-action='edgePostReroll']"), s = String(((g = t == null ? void 0 : t.dataset) == null ? void 0 : g.poolKey) ?? "").trim();
  if (!s) return;
  const i = foundry.utils.deepClone((T = (A = e == null ? void 0 : e.flags) == null ? void 0 : A.mwd) == null ? void 0 : T.resolved);
  if (!i || Number(((S = (y = i == null ? void 0 : i.edge) == null ? void 0 : y.post) == null ? void 0 : S.spent) ?? 0) === 1) return;
  if (!(Array.isArray((k = (v = i == null ? void 0 : i.edge) == null ? void 0 : v.allowed) == null ? void 0 : k.postPools) ? i.edge.allowed.postPools : []).includes(s)) {
    (q = (_ = ui.notifications) == null ? void 0 : _.warn) == null || q.call(_, `Post-spend pool not allowed: ${s}`);
    return;
  }
  const n = Array.isArray((W = i == null ? void 0 : i.roll) == null ? void 0 : W.failureDiceRefs) ? i.roll.failureDiceRefs : [];
  if (n.length <= 0) {
    (we = (ie = ui.notifications) == null ? void 0 : ie.info) == null || we.call(ie, "No failures to reroll.");
    return;
  }
  const o = await fromUuid(i.actorUuid);
  if (!o) {
    (Ae = (he = ui.notifications) == null ? void 0 : he.warn) == null || Ae.call(he, "Actor not found for this roll.");
    return;
  }
  await ((pe = o.spendEdge) == null ? void 0 : pe.call(o, s, 1));
  const l = Number(((He = i == null ? void 0 : i.roll) == null ? void 0 : He.target) ?? 5), u = (We = (await new Roll(`${n.length}d6cs>=${l}`).evaluate()).dice) == null ? void 0 : We[0], m = Array.isArray(u == null ? void 0 : u.results) ? u.results : [], h = m.filter((Pe) => Pe.success).length;
  i.outcome = i.outcome ?? {}, i.outcome.hits = Number(i.outcome.hits ?? 0) + h, i.edge = i.edge ?? {}, i.edge.post = { poolKey: s, spent: 1 }, i.edge.availableActions = {
    ...i.edge.availableActions ?? {},
    canSpendPost: !1,
    canPostRerollFailures: !1
  }, i.roll = i.roll ?? {}, i.roll.diceGroups = Array.isArray(i.roll.diceGroups) ? i.roll.diceGroups : [], i.roll.diceGroups.push({
    id: "post",
    label: "Post Reroll",
    faces: 6,
    termIndex: null,
    dice: m.map((Pe, _e) => {
      const Ie = Number(Pe.result), xe = !!Pe.success;
      return {
        ref: `post:${_e}`,
        face: Ie,
        isSuccess: xe,
        isFailure: !xe,
        tooltip: xe ? `Post die ${_e + 1}: ${Ie} (Success vs TN ${l})` : `Post die ${_e + 1}: ${Ie} (Failure vs TN ${l})`
      };
    })
  });
  const f = await renderChat({ resolved: i });
  await e.update({
    content: f,
    "flags.mwd.resolved": i,
    "flags.mwd.payload.edge.post": { poolKey: s, spent: 1 }
  });
}
const { ApplicationV2: Ir, HandlebarsApplicationMixin: xr } = foundry.applications.api, Lr = "mwd-gmgadget", _i = "gmDnPresets", Ht = "gmNextDn", yt = "gmDnAnnounceToChat", $r = "systems/mwd/templates/v2/mwd-gmgadget.hbs", bt = Object.freeze({
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
function Hr(r) {
  return (typeof r == "string" ? r : "").split(",").map((t) => t.trim()).filter(Boolean).map((t) => {
    const [s, i] = t.split(":").map((o) => (o ?? "").trim()), a = s || "DN", n = Number.isFinite(Number(i)) ? Number(i) : Number(s);
    return {
      label: a,
      dn: Number.isFinite(n) ? Math.max(0, Math.trunc(n)) : null
    };
  }).filter((t) => Number.isFinite(t.dn));
}
function es(r = {}) {
  return foundry.utils.mergeObject(
    foundry.utils.deepClone(bt),
    r ?? {},
    { inplace: !1, overwrite: !0 }
  );
}
function Wr(r) {
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
function Br(r) {
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
function Fr(r) {
  return Oe.getStatusOptions(r);
}
function Gr(r = "mwd") {
  game.settings.register(r, _i, {
    scope: "world",
    config: !0,
    name: "GM Difficulty Presets (DN hits)",
    hint: "Comma-separated list like: Standard:1,Challenging:2,Hard:3,Extreme:4",
    type: String,
    default: "Standard:1,Challenging:2,Hard:3,Extreme:4"
  }), game.settings.register(r, Ht, {
    scope: "client",
    config: !1,
    type: Number,
    default: 1
  }), game.settings.register(r, yt, {
    scope: "client",
    config: !0,
    name: "Announce GM DN changes to chat",
    hint: "If enabled, posts a small chat notice when you change the current DN preset.",
    type: Boolean,
    default: !1
  });
}
const ke = class ke extends xr(Ir) {
  constructor({ systemId: e = "mwd", ...t } = {}) {
    super(t), this.systemId = e, this.activeTab = "difficulty", this.harmState = es();
  }
  async render(e = {}) {
    var t;
    return (t = game.user) != null && t.isGM ? super.render(e) : this;
  }
  async _prepareContext(e) {
    var f, g, A;
    const t = await super._prepareContext(e), s = game.settings.get(this.systemId, _i), i = Hr(s), a = Number(game.settings.get(this.systemId, Ht) ?? 1), n = !!game.settings.get(this.systemId, yt), o = Oe.getActorOptions(), l = Oe.getSceneTarget(), c = this.harmState.actorId ? ((g = (f = game.actors) == null ? void 0 : f.get) == null ? void 0 : g.call(f, this.harmState.actorId)) ?? null : null, u = Oe.resolveTarget({
      actor: c,
      actorId: this.harmState.actorId,
      preferSceneTarget: !0
    }), m = Fr(u.actor ?? c ?? null), h = es(this.harmState);
    return !h.statusId && m.length && (h.statusId = m[0].value, this.harmState.statusId = h.statusId), foundry.utils.mergeObject(t, {
      presets: i,
      currentDn: a,
      currentTab: this.activeTab,
      announce: n,
      isGM: ((A = game.user) == null ? void 0 : A.isGM) ?? !1,
      harm: {
        state: h,
        actorOptions: o,
        modes: Oe.MODE_OPTIONS,
        damageTypes: Ba,
        statusOptions: m,
        sceneTarget: Wr(l),
        effectiveTarget: Br(u),
        canApply: !!u.actor,
        applyReason: u.reason || "",
        useArmorAvailable: h.mode === "physical" || h.mode === "fatigue",
        showDamageType: (h.mode === "physical" || h.mode === "fatigue") && h.useArmor,
        showStatusFields: h.mode === "status",
        showDeltaFields: h.mode !== "status"
      }
    });
  }
  _getRootElement() {
    var e;
    return this.element instanceof HTMLElement ? this.element : (e = this.element) == null ? void 0 : e[0];
  }
  _captureHarmStateFromDom(e = null) {
    var a;
    const t = ((a = e == null ? void 0 : e.closest) == null ? void 0 : a.call(e, ".mwd-gmgadget__root")) ?? this._getRootElement();
    if (!(t instanceof HTMLElement)) return this.harmState;
    const s = (n, o = "") => {
      const l = t.querySelector(n);
      return l instanceof HTMLInputElement || l instanceof HTMLSelectElement || l instanceof HTMLTextAreaElement ? l.value : o;
    }, i = (n, o = !1) => {
      const l = t.querySelector(n);
      return l instanceof HTMLInputElement ? l.checked : o;
    };
    return this.harmState = es({
      actorId: s('[name="harm-actorId"]', this.harmState.actorId),
      mode: s('[name="harm-mode"]', this.harmState.mode),
      delta: Number(s('[name="harm-delta"]', this.harmState.delta)),
      useArmor: i('[name="harm-useArmor"]', this.harmState.useArmor),
      damageType: s('[name="harm-damageType"]', this.harmState.damageType),
      statusId: s('[name="harm-statusId"]', this.harmState.statusId),
      statusActive: s('[name="harm-statusActive"]', this.harmState.statusActive ? "add" : "remove") !== "remove",
      source: s('[name="harm-source"]', this.harmState.source),
      notes: s('[name="harm-notes"]', this.harmState.notes)
    }), Number.isFinite(Number(this.harmState.delta)) || (this.harmState.delta = bt.delta), this.harmState;
  }
  async _onSetDn(e, t) {
    var a, n, o;
    if (e.preventDefault(), e.stopPropagation(), !((a = game.user) != null && a.isGM)) return;
    const s = Math.max(0, Math.trunc(Number(((n = t == null ? void 0 : t.dataset) == null ? void 0 : n.dn) ?? NaN)));
    if (!Number.isFinite(s)) return;
    if (await game.settings.set(this.systemId, Ht, s), !!game.settings.get(this.systemId, yt)) {
      const l = String(((o = t == null ? void 0 : t.dataset) == null ? void 0 : o.label) ?? `DN ${s}`);
      await ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ user: game.user }),
        content: `<div class="mwd-gm-notice"><b>GM Difficulty:</b> ${foundry.utils.escapeHTML(l)} (DN ${s} hits)</div>`
      });
    }
    return this.render({ parts: ["body"] });
  }
  async _onSwitchTab(e, t) {
    var i, a, n;
    (i = e == null ? void 0 : e.preventDefault) == null || i.call(e), (a = e == null ? void 0 : e.stopPropagation) == null || a.call(e);
    const s = String(((n = t == null ? void 0 : t.dataset) == null ? void 0 : n.tab) ?? "").trim();
    if (!(!s || s === this.activeTab))
      return this._captureHarmStateFromDom(t), this.activeTab = s, this.render({ parts: ["body"] });
  }
  async _onClearDn(e, t) {
    var s;
    if (e.preventDefault(), e.stopPropagation(), !!((s = game.user) != null && s.isGM))
      return await game.settings.set(this.systemId, Ht, 1), this.render({ parts: ["body"] });
  }
  async _onToggleAnnounce(e, t) {
    var i;
    if (e.preventDefault(), e.stopPropagation(), !((i = game.user) != null && i.isGM)) return;
    const s = !game.settings.get(this.systemId, yt);
    return await game.settings.set(this.systemId, yt, s), this.render({ parts: ["body"] });
  }
  async _onHarmInputChange(e, t) {
    var i, a;
    (i = e == null ? void 0 : e.preventDefault) == null || i.call(e), this._captureHarmStateFromDom(t);
    const s = String(((a = t == null ? void 0 : t.dataset) == null ? void 0 : a.harmKey) ?? "").trim();
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
    const a = await Oe.apply({
      payload: i,
      options: {
        actorId: s.actorId,
        preferSceneTarget: !0,
        logToChat: !0
      }
    });
    return a != null && a.ok ? this.render({ parts: ["body"] }) : ((u = ui.notifications) == null || u.warn((a == null ? void 0 : a.reason) ?? "Unable to apply harm."), this.render({ parts: ["body"] }));
  }
  _buildHarmPayload(e) {
    const t = String((e == null ? void 0 : e.source) ?? "").trim(), s = String((e == null ? void 0 : e.notes) ?? "").trim(), i = String((e == null ? void 0 : e.mode) ?? "").trim();
    if (i === "status") {
      const a = String((e == null ? void 0 : e.statusId) ?? "").trim();
      return a ? {
        mode: "status",
        statusId: a,
        active: !!(e != null && e.statusActive),
        source: t,
        notes: s
      } : null;
    }
    return i === "burn" ? {
      mode: "burnDelta",
      delta: ti(e == null ? void 0 : e.delta, bt.delta),
      source: t,
      notes: s
    } : i === "physical" || i === "fatigue" ? {
      mode: "trackDelta",
      track: i,
      delta: ti(e == null ? void 0 : e.delta, bt.delta),
      useArmor: !!(e != null && e.useArmor),
      damageType: (e == null ? void 0 : e.damageType) ?? bt.damageType,
      source: t,
      notes: s
    } : null;
  }
};
M(ke, "DEFAULT_OPTIONS", {
  id: Lr,
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
    switchTab: ke.prototype._onSwitchTab,
    setDn: ke.prototype._onSetDn,
    clearDn: ke.prototype._onClearDn,
    toggleAnnounce: ke.prototype._onToggleAnnounce,
    harmInputChange: ke.prototype._onHarmInputChange,
    refreshHarmTarget: ke.prototype._onRefreshHarmTarget,
    applyHarm: ke.prototype._onApplyHarm
  }
}), M(ke, "PARTS", {
  body: { template: $r }
});
let Ts = ke;
function ti(r, e = 0) {
  const t = Number(r);
  return Number.isFinite(t) ? Math.trunc(t) : e;
}
let ts = null;
function Ur({ systemId: r = "mwd" } = {}) {
  return ts || (ts = new Ts({ systemId: r })), ts;
}
function jr() {
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
function Vr() {
  return {
    get(r) {
      return kt(r);
    },
    getSkills({ withKnowledge: r = !1 } = {}) {
      return ls();
    },
    list() {
      return ls();
    }
  };
}
class Ds {
  static start() {
    const e = new Ds();
    Hooks.once("init", () => e.onInit()), Hooks.once("ready", () => e.onReady());
  }
  async onInit() {
    console.log(j + "AnarchySystem.onInit"), game.system.mwd = this, game.system.anarchy = this, game.mwd ?? (game.mwd = {}), jr(), Nr(), Gr("mwd"), game.mwd.roll = Zs, game.mwd.personalCombat = J, game.mwd.harm = Oe, this.roll = Zs, this.personalCombat = J, this.harm = Oe, this.skills = Vr(), this.remoteCall = new ns(), game.system.mwd.skills = this.skills, game.mwd.skills = this.skills, G.init(), this.modifiers = new L(), mt.register(new Pr()), mt.register(new Er()), mt.register(new Dr()), mt.register(new Rr()), mt.register(Or), Handlebars.registerHelper("mwdClassList", (e) => Array.isArray(e) ? e.join(" ") : typeof e == "string" ? e : ""), this.actorClasses = {
      character: Ks,
      npc: Ks,
      vehicle: yi,
      battlemech: Qa
    }, this.hooks = new Ke(), this.styles = new va(), this.handlebarsManager = new Ps(), J.init(), Ja.register(), console.log(j + "AnarchySystem.onInit | loading system"), CONFIG.ANARCHY = K, CONFIG.Combat.initiative = { formula: "2d6" }, CONFIG.statusEffects.push({
      id: "overloaded",
      name: "Overloaded",
      icon: "systems/mwd/img/icons/status/surge.svg"
    }), CONFIG.Actor.documentClass = mr, CONFIG.Item.documentClass = at, at.init(), Za(), ir(), await nr(), console.log(j + "AnarchySystem.onInit | done");
  }
  async onReady() {
    if (console.log(j + "AnarchySystem.onReady"), await J.onReady(), !game.user.isGM) return;
    const e = game.settings.get(w, "enableGMGadget");
    if (!e) {
      console.log(`${j}GMManager render skipped (enableGMGadget=false)`);
      return;
    }
    game.mwd = game.mwd ?? {}, game.mwd.gmGadget = () => Ur({ systemId: w }).render({ force: !0 }), e && game.mwd.gmGadget();
  }
}
Ds.start();
//# sourceMappingURL=index.mjs.map
