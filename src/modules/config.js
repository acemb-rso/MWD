// src/modules/config.js
// Purpose: References legacy Anarchy system behavior.
// How it fits: Describes role within src/modules or template rendering pipeline.


// config.js
// Primary config for the MWD system.
//
// Refactor notes:
// - The legacy system exported `ANARCHY`. We now export `MWD` as the canonical symbol.
// - For migration safety, we also export `ANARCHY = MWD` as a temporary compatibility alias.
//   Remove that alias after you have updated all imports.

export const MWD = {
  "TYPES": {
    "Actor": {
      "character": "Character",
      "vehicle": "Vehicle/drone",
      "battlemech": "Battlemech"
    },
    "Item": {
      "contact": "Contact",
      "gear": "Gear",
      "consumable": "Consumable",
      "quality": "Trait",
      "assetModule": "Asset Module",
      "skill": "Skill",
      "mechWeapon": "Mech-Scale Weapon",
      "personalWeapon": "Personal Weapon",
      "armor": "Armor"
    }
  },

  "settings": {
    "defaultCssClass": {
      "name": "Style of Destiny UI",
      "hint": "Select the style used for actors, items and GM Manager"
    },
"skillSet": {
      "name": "Skill set",
      "hint": "Select the set of skills to use"
    },
    "gmDifficulty": {
      "name": "Default difficulty pools",
      "hint": "The default difficulty pools, represented as 'Trivial:4,Easy:6' ...",
      "default": "Trivial:4,Easy:6,Average:8,Hard:10,Very hard:12",
      "chatMessage": "The difficulty {difficulty} ({pool}d6) is {success}"
    },
    "damageMode": {
      "name": "Damage application",
      "hint": "Determine how Armor / Damage Resistance (RD) applies",
      "values": {
        "resistanceArmorMonitor": "MechWarrior: Destiny: Resistance, Armor, then Monitor",
        "armorResistanceMonitor": "Armor, Resistance, Monitor",
        "armorGivesResistance": "RD = Armor/3 + Str/4, damaged per blow, AA ignores armor",
        "armorGiveResistanceHitsAvoid": "RD = Armor/3, damaged per blow, AA reduces resistance"
      }
    },
    "useDestinyMechanics": {
      "name": "Use Destiny opposed roll mechanics",
      "hint": "Roll 2D6 and add the computed pool as a modifier instead of counting successes."
    }
  },

  "chat": {
    "blindMessageToGM": "Blind message from {user}:<br>{message}",
    "sufferedDrain": "{actor} suffered a drain of {drain}",
    "noDrain": "{actor} did not suffer any drain",
    "defendAttack": "Defense against {success} success",
    "partiallyDefended": "Attack exceeds defense of {success} success",
    "fullyDefended": "The attack is fully defended",
    "applyDamage": "Apply {damage}"
  },

  "chat_actions": {
    "rollDice": {
      "title": "Roll Destiny dice",
      "instruction": "Number of dice to roll: ",
      "error": "Veuillez entrer un nombre valide de dés.",
      "result": "Roll of {count}d6, {success} success! {ones} dice with a value of 1"
    }
  },

  "user": {
    "selectedTokenActors": "Selected actor tokens"
  },

  "common": {
    "newEntry": "New entry...",
    "newName": "New {type}",
    "cancel": "Cancel",
    "add": "Add",
    "resize": "Resize",
    "say": "Say:",
    "edit": "Edit",
    "activate": "Activate",
    "del": "Remove",
    "favorite": "Favorites",
    "addFavorite": "Add to favorites",
    "delFavorite": "Remove from favorites",
    "viewMode": "View mode",
    "editMode": "Edit mode",
    "attach": "Change owner",
    "attachCopy": "Give a copy",

    "roll": {
      "button": "Roll",
      "title": "Roll {name} {specialization}",
      "attribute": "Attribute",
      "attribute2": "Second attribute",
      "modifiers": {
        "edge": "Use edge",
        "edgePool": "Spend from",
        "specialization": "Specialization",
        "poolModifiers": "Asset Modules",
        "social": {
          "credibility": "Credibility",
          "rumor": "Rumor"
        },
        "anarchyDisposition": "Anarchy - Dispositions",
        "anarchyRisk": "Anarchy - Take risks",
        "glitch": "Glitch dice",
        "convergence": "GOD Convergence",
        "drain": "Drain",
        "wounds": "Wounds modifiers",
        "weaponRange": "Range",
        "weaponArea": "Multiple targets",
        "other": "Other modifiers",
        "virtualReality": "Virtual Reality",
        "reduced": "Pool reduced",
        "reroll": "Rerolls",
        "rerollForced": "Rerolls successes",
        "opponentReroll": "Force opponent rerolls",
        "opponentPool": "Reduce opponent pool"
      },
      "rollTheme": {
        "dicePool": "Dice pool",
        "reroll": "Failure rerolls",
        "removed": "Success to reroll",
        "rerollRemoved": "Reroll removed success",
        "glitch": "Glitch dice",
        "drain": "Drain",
        "convergence": "Convergence",
        "anarchyRisk": "Anarchy risk dice"
      },
      "opponentRoll": "Opponent roll",
      "totalSuccess": "Total successes",
      "success": "Successes",
      "risk": {
        "prowess": "Prowess",
        "mixed": "Prowess and Glitch",
        "nothing": "no effect",
        "glitch": "Glitch"
      },
      "rerollSuccess": "Successes after reroll",
      "rerollForcedLoss": "Forced reroll",
      "rerollForcedSuccess": "Forced reroll successes"
    },

    "monitorValue": "Monitor value",

    "confirmation": {
      "del": "Confirm removal",
      "delItem": "Confirm removal of {name} ({type})",
      "delowner": "Confirm detach from owner {name}",
      "attach": "Attach actor to owner",
      "attachOrCopy": "Attach {ownedType} {ownedName} to {ownerType} {ownerName}, or create a copy first"
    },

    "selection": {
      "actorSettingMarks": "Select actor setting Marks on {name}"
    },

    "errors": {
      "insufficient": "Not enough {resource}: required {required}, available {available}",
      "outOfRange": "Cannot set {resource} to {value}, out of range [{min} , {max}]",
      "onlyGM": "Only allowed for GM",
      "noEdgeForActor": "{actor} is a {actorType}, so it cannot use Edge",
      "expectedType": "Item is of type {type} instead of expected type {expectedType}",
      "ignoredTargets": "This action cannot target {targets} due to its damage type",
      "noTargetSelected": "No valid target is selected, consider selecting a valid target before using this {weapon}",
      "maxTargetsExceedeed": "{weapon} has a {area} area of effect, with a maximum of {max} targets. You are currently targetting {count} targets",
      "noDefenseOnWeapon": "No defense configured for {actor} weapon: {weapon}.<br>Configure defense against this weapon to be able to attack with it.",
      "weaponNotFound": "No weapon could be found for this roll.",
      "noTokenActor": "Token is not attached to an Actor!",
      "cannotUseEdgeAnymore": "Too late to use edge. A defender already rolled his defense!",
      "actorCannotApplyDamage": "Actor {actor} cannot apply {damageType} : maybe check the decker has connected his cyberdeck",
      "actorCannotReceiveDamage": "Cannot apply {damageType} to actor {actor} : it does not have a condition monitor for this type of damage",
      "actorDoesNotHaveDefense": "Actor {actor} does not have a {defense}, the attack should not to target {actorType}.<br>Or it may be a bug, please report and manage manually"
    },

    "sourceReference": "Source reference",
    "sourceReferenceHelp": "rulebook, page, ...",
    "description": "Description"
  },

  "actor": {
    "characterSheet": "Character sheet",
    "characterTabbedSheet": "Character sheet (tabs)",
    "characterEnhancedSheet": "Character enhanced sheet (tabs)",
    "vehicleSheet": "Vehicle sheet",
    "battlemechSheet": "Battlemech sheet",
    "characterNPCSheet": "NPC sheet",

    "actorName": "Name",
    "celebrity": "Legend",
    "famous": "Fame",

    "edgePools": {
      "title": "Edge Pools",
      "physical": "Physical",
      "mental": "Mental",
      "social": "Social",
      "grit": "Grit",
      "insight": "Insight",
      "rumor": "Rumor",
      "legend": "Legend",
      "credibility": "Credibility",
      "chaos": "Chaos",
      "rating": "Rating",
      "current": "Current"
    },

    "tabs": {
      "main": "Character",
      "equipment": "Equipment",
      "biography": "Biography"
    },

    "words": {
      "keywords": "Keywords",
      "cues": "Cues",
      "dispositions": "Dispositions"
    },

    "counters": {
      "xp": "XP",
      "xpUnused": "Unspent XP",
      "xpTotal": "Lifetime XP",
      "current": "Current",
      "lifetime": "Lifetime",
      "edge": "Edge",
      "edgePools": {
        "physical": "Physical",
        "mental": "Mental",
        "social": "Social",
        "grit": "Grit",
        "insight": "Insight",
        "rumor": "Rumor",
        "legend": "Legend",
        "credibility": "Credibility",
        "chaos": "Chaos",
        "rating": "Rating",
        "current": "Current"
      },

      "mental": {
        "insight": "Insight",
        "rumor": "Rumor"
      },
      "social": {
        "legend": "Legend",
        "credibility": "Credibility"
      }
    },

    "monitors": {
      "conditionMonitors": "Condition monitors",
      "overflow": "{actor}: Overflow of {monitor} condition monitor, transfering {overflow} to {overflowMonitor} condition monitor",

      "physical": "Physical",
      "fatigue": "Fatigue",
      "armor": "Armor",
      "structure": "Structure",
      "heat": "Heat",

      "effect": "Effect",

      "grit": "Grit",
      "insight": "Insight",
      "rumor": "Rumor",
      "legend": "Legend",
      "credibility": "Credibility",
      "chaos": "Chaos",

      "resistance": "Resistance",
      "resistanceBase": "Base resistance",
      "resistanceByType": "By damage type",
      "resistanceByTypeButton": "Resist by type",
      "resistanceByTypeTitle": "Type-specific resistance",
      "resistanceBonusLabel": "Bonuses",
      "resistanceTotal": "Total",
      "resistanceFallback": "Falls back to base",
      "damageType": "Damage type",

      "resistancePresets": {
        "label": "Presets",
        "biological": "Biological",
        "armoredVehicle": "Armored vehicle",
        "energyShielded": "Energy shielded"
      },

      "resistanceApplied": "{actor} resisted {value} vs {damageType} on {monitor} ({source})",
      "resistanceSources": {
        "default": "base",
        "type": "type-specific"
      }
    },

    "vehicle": {
      "moves": "Moves",
      "attacks": "Attacks",
      "stealth": "Stealth",
      "category": "Category",
      "skill": "Skill",
      "weapons": "Vehicle Weapons",
      "heatDissipation": "Heat dissipation",
      "criticalTrack": "Criticals",
      "locationFront": "Front effects",
      "locationSide": "Side effects",
      "locationRear": "Rear effects",
      "locationCore": "Core effects",

      "crew": {
        "label": "Crew",
        "placeholder": "Crew names or notes"
      },

      "quickActions": {
        "title": "Quick Actions",
        "rangedAttack": "Ranged Attack",
        "meleeAttack": "Melee Attack",
        "pilotingCheck": "Piloting Check",
        "sensorSweep": "Sensor Sweep",
        "emergencyRepair": "Emergency Repair",

        "primaryWeapons": "Primary Weapons",
        "allWeapons": "All Weapons",
        "primaryLabel": "Primary",

        "unarmed": "Unarmed (Punch/Kick)",
        "unarmedNotes": "Basic unarmed strike.",

        "selectWeaponGroup": "Select Weapon Group",
        "selectMeleeProfile": "Select Melee Profile",
        "selectSensorSkill": "Select Sensor Sweep Skill",

        "weaponGroup": "Weapon Group",
        "weaponsUsed": "Weapons",
        "meleeProfile": "Melee Profile",
        "meleeDamage": "Damage",
        "skillUsed": "Skill",

        "tooltips": {
          "ranged": "Roll an attack using any Weapon Group or Primary Weapon",
          "melee": "Roll a melee attack using fists, kicks, or installed melee weapons",
          "piloting": "Piloting roll for movement, jumping, stability, or hazard checks",
          "sensorSweep": "Perception/Tech roll using sensors or Active Probe",
          "emergencyRepair": "Technician roll to stabilize or fix a system during battle"
        },

        "errors": {
          "noRanged": "No weapon groups available for ranged attack.",
          "noMelee": "No melee attacks available.",
          "noSensorSweep": "Sensor sweep requires Perception or Technician."
        }
      }
    },

    "battlemech": {
      "chassis": "Chassis",
      "tonnage": "Tonnage",

      "heat": {
        "thresholds": "Heat thresholds",
        "runningHot": "Hot",
        "overheated": "Overheat",
        "shutdown": "Danger",
        "statusLabel": "Current heat state",
        "status": {
          "safe": "Safe",
          "hot": "Hot",
          "overheat": "Overheat",
          "danger": "Danger",
          "runningHot": "Hot",
          "overheated": "Overheat",
          "shutdown": "Danger"
        }
      },

      "hardpoints": {
        "title": "Hardpoint summary",
        "type": "Type",
        "size": "Size",
        "location": "Location",
        "assigned": "Assigned to",
        "none": "No hardpoints configured."
      },

      "weaponGroups": {
        "title": "Weapon groups",
        "mountPoints": "Mount points used: {used} / {total}",
        "group": "Group",
        "weapons": "Weapons",
        "empty": "No weapons assigned to this group.",
        "none": "No weapon groups configured.",
        "missingWeapon": "Weapon {missingId} is missing from the actor."
      },

      "weapons": {
        "title": "Battlemech weapons",
        "weapon": "Weapon",
        "category": "Category",
        "mount": "Mount",
        "hardpoint": "Hardpoint",
        "heat": "Heat",
        "none": "No mech weapons equipped.",
        "mountUnknown": "Unspecified"
      }
    },

    "ownership": {
      "owner": "Owner",
      "unknown": "Unknown",
      "owned": "Owned"
    }
  },

  "actorType": {
    "character": "Character",
    "npc": "NPC",
    "vehicle": "Vehicle",
    "battlemech": "Battlemech"
  },

  "item": {
    "sheet": "Sheet for ",
    "tabs": {
      "main": "Details",
      "modifiers": "Modifiers"
    },
    "skill": {
      "code": "Internal code",
      "copyDefault": "Configure skill",
      "isKnowledge": "Knowledge",
      "attribute": "Attribute",
      "value": "Level",
      "specialization": "Specialisation",
      "specializationHelp": "Type the name to choose a specialization",
      "isSocial": "Social skill",
      "hasDrain": "Drain",
      "hasConvergence": "Convergence"
    },

    "quality": {
      "positive": "Legacy positive flag",
      "category": "Category",
      "tier": "Tier",
      "activation": "Activation",
      "tags": "Tags",
      "effects": "Effects",
      "prerequisites": "Prerequisites",
      "limits": "Limits",
      "categoryOptions": {
        "positive": "Positive",
        "negative": "Negative",
        "narrative": "Narrative"
      },
      "tierOptions": {
        "minor": "Minor",
        "major": "Major"
      },
      "activationOptions": {
        "passive": "Passive",
        "triggered": "Triggered"
      }
    },

    "assetModule": {
      "category": "Category",
      "level": "Level",
      "levelShort": "Lvl",
      "jumping": {
        "enabled": "Grants Jumping",
        "movement": "Jump Move",
        "heat": "Jump Heat",
        "attackRatingBonus": "Jump AR Bonus",
        "defenseRatingBonus": "Jump DR Bonus",
        "dfaEnabled": "Enable Death From Above"
      }
    },

    "gear": {
      "quantity": "Quantity",
      "quantityShort": "Qty",
      "rating": "Rating",
      "category": "Category",
      "tags": "Tags"
    },

    "consumable": {
      "quantity": "Quantity",
      "quantityShort": "Qty",
      "rating": "Potency",
      "category": "Consumable Type",
      "tags": "Tags"
    },

    "lifeModule": {
      "moduleType": "Module Type",
      "type": {
        "faction": "Faction",
        "childhood": "Childhood",
        "higherEducation": "Higher Education",
        "realLife": "Real Life"
      }
    },

    "mechWeapon": {
      "category": "Weapon Category",
      "size": "Size",
      "hardpoint": "Hardpoint",
      "damage": "Damage Value",
      "damageType": "Damage Type",
      "heat": "Heat",
      "area": "Area of effect",
      "range": {
        "max": "Maximum range"
      }
    },

    "personalWeapon": {
      "skill": "Skill",
      "category": "Weapon Category",
      "damage": "Damage Value",
      "ap": "Armor Piercing",
      "damageType": "Damage Type",
      "damageShort": "DV",
      "apShort": "AP",
      "weaponWithoutActor": "No Actor",
      "equipped": "Equipped",
      "primary": "Primary",
      "attack": "Attack",
      "traits": "Traits",
      "notes": "Notes",
      "attackRatingBand": {
        "label": "Attack Rating Modifiers",
        "close": "Close",
        "near": "Near",
        "far": "Far",
        "extreme": "Extreme"
      },
      "range": {
        "max": "Maximum range"
      },
      "withArmor": "Armor protects"
    },

    "armor": {
      "equipped": "Equipped",
      "primary": "Primary",
      "rating": "Armor Rating",
      "defenseBonus": "Defense Bonus",
      "mitigation": "Type Modifiers",
      "durability": "Durability",
      "tags": "Armor Tags",
      "traits": "Traits",
      "notes": "Notes"
    }
  },

  "itemType": {
    "singular": {
      "skill": "Skill",
      "quality": "Trait",
      "assetModule": "Asset Module",
      "gear": "Gear",
      "consumable": "Consumable",
      "contact": "Contact",
      "lifeModule": "Life Module",
      "mechWeapon": "Mech-Scale Weapon",
      "personalWeapon": "Personal Weapon",
      "armor": "Armor"
    },
    "plural": {
      "skill": "Skills",
      "quality": "Qualities",
      "assetModule": "Asset Modules",
      "gear": "Gears",
      "consumable": "Consumables",
      "contact": "Contacts",
      "lifeModule": "Life Modules",
      "action": "Actions",
      "monitor": "Monitors",
      "mechWeapon": "Mech-Scale Weapons",
      "personalWeapon": "Personal Weapons",
      "armor": "Armor"
    }
  },

  "monitor": {
    "physical": "Physical",
    "fatigue": "Fatigue"
  },

  "monitorLetter": {
    "physical": "P",
    "fatigue": "F"
  },

  "assetModuleCategory": {
    "faction": "Faction",
    "logistics": "Logistics",
    "mobility": "Mobility",
    "training": "Training",
    "influence": "Influence",
    "personal": "Personal",
    "operations": "Operations",
    "special": "Special"
  },

  "attributes": {
    "strength": "Strength",
    "reflexes": "Reflexes",
    "willpower": "Guts",
    "intelligence": "Intelligence",
    "charisma": "Charisma",
    "edge": "Edge",

    // Legacy synonyms retained for migration safety:
    "agility": "Reflexes",
    "logic": "Intelligence",

    "knowledge": "Knowledge",
    "noAttribute": "No attribute chosen",

    // Legacy vehicle attributes retained (if still referenced somewhere):
    "autopilot": "Autopilot",
    "handling": "Handling",
    "firewall": "Firewall",
    "system": "System",

    // MWD vehicle attributes:
    "chassis": "Chassis",
    "reliability": "Reliability",
    "condition": "Condition"
  },

  "attributeAction": {
    "defense": "Defense",
    "judgeIntentions": "Judge intentions",
    "perception": "Perception / Mental resistance",
    "resistTorture": "Resist torture / Physical resistance",
    "composure": "Composure / Social resistance",
    "memory": "Memory",
    "catch": "Catch object",
    "lift": "Lift/carry"
  },

  "defense": {
    "physicalDefense": "Physical defense",
    "physicalResistance": "Physical resistance",
    "socialDefense": "Social defense",
    "mentalResistance": "Mental resistance"
  },

  "skill": {
    "athletics": "Athletics",
    "heavyWeapons": "Heavy Weapons",
    "escapeArtist": "Escape Artist",
    "gunnery": "Gunnery",
    "meleeCombat": "Melee Combat",
    "piloting": "Piloting",
    "projectileWeapons": "Projectile Weapons",
    "firearms": "Firearms",
    "stealth": "Stealth",
    "zeroGOps": "Zero-G Operations",
    "art": "Art",
    "artillery": "Artillery",
    "systemOps": "System Operations",
    "computers": "Computers",
    "demolitions": "Demolitions",
    "knowledge": "Knowledge",
    "medTech": "MedTech",
    "science": "Science",
    "perception": "Perception",
    "tactics": "Tactics",
    "technician": "Technician",
    "tracking": "Tracking",
    "navigation": "Navigation",
    "animalHandling": "Animal Handling",
    "survival": "Survival",
    "acting": "Acting",
    "disguise": "Disguise",
    "leadership": "Leadership",
    "negotiation": "Negotiation",
    "etiquette": "Etiquette",
    "streetwise": "Streetwise",
    "intimidation": "Intimidation",
    "Administration": "Administration"
  },

  "area": {
    "none": "None",
    "shotgun": "Shotgun",
    "circle": "Circle",
    "cone": "Cone",
    "rect": "Rectangle",
    "ray": "Ray"
  },

  "range": {
    "contact": "Contact",
    "short": "Short",
    "medium": "Medium",
    "far": "Far",
    "extreme": "Extreme"
  },

  "vehicleCategory": {
    "drone": "Drone",
    "personal": "Personal",
    "combat": "Combat",
    "aerospace": "Aerospace",
    "mech": "Mech"
  },

  "mwd": {
    "weightClass": {
      "label": "Weight class",
      "light": "Light",
      "medium": "Medium",
      "heavy": "Heavy",
      "assault": "Assault"
    },

    "hardpoint": {
      "type": {
        "penetrating": "Penetrating",
        "concussive": "Concussive",
        "energy": "Energy",
        "thermal": "Thermal",
        "electrical": "Electrical",
        "support": "Support",
        "omni": "Omni"
      },
      "size": {
        "small": "Small",
        "medium": "Medium",
        "large": "Large"
      },
      "location": {
        "head": "Head",
        "torso": "Torso",
        "arms": "Arms",
        "turret": "Turret"
      }
    },
    "hardpointType": {
      "penetrating": "Penetrating",
      "concussive": "Concussive",
      "energy": "Energy",
      "thermal": "Thermal",
      "electrical": "Electrical",
      "support": "Support",
      "omni": "Omni"
    },
    "hardpointSize": {
      "small": "Small",
      "medium": "Medium",
      "large": "Large"
    },
    "hardpointLocation": {
      "head": "Head",
      "torso": "Torso",
      "arms": "Arms",
      "turret": "Turret"
    },

    "primarySlot": {
      "mode": {
        "normal": "Large hardpoint",
        "converted": "Converted slot"
      }
    },

    "weaponCategory": {
      "ranged": "Ranged",
      "melee": "Melee"
    },

    "melee": {
      "title": "Melee options",
      "baseProfile": "Unarmed",
      "baseProfileLabel": "Base melee profile",
      "damagePlaceholder": "Damage code",
      "notesPlaceholder": "Notes",
      "maxWeapons": "Maximum equipped melee weapons",
      "allowedLocations": "Allowed locations",
      "availableProfiles": "Available melee profiles",
      "location": {
        "head": "Head",
        "torso": "Torso",
        "arm": "Arm",
        "leg": "Leg"
      },
      "locationAny": "Any location"
    },

    "loadout": {
      "title": "Weapon loadout",
      "mountPoints": "Mount points used",
      "primarySlot": {
        "label": "Primary weapon slot",
        "noRestriction": "No type restriction",
        "allowedWeapons": "Allowed primary weapons"
      },
      "hardpoints": "Hardpoints",
      "weaponGroups": "Weapon groups",
      "primaryTag": "Primary",
      "occupied": "{{weaponGroup}} assigned",
      "emptyHardpoint": "Empty",
      "errors": {
        "label": "Errors",
        "multiplePrimary": "Only one primary weapon group is allowed.",
        "mountPointsExceeded": "Loadout uses {used} mount points but only {total} are available.",
        "hardpointUnavailable": "No matching hardpoint for {weapon} ({type}, {size}).",
        "primaryNeedsLarge": "{weapon} must use a large hardpoint to be primary.",
        "primaryWithoutWeapon": "Primary group needs at least one weapon.",
        "weaponAlreadyGrouped": "{weapon} is already assigned to another group.",
        "primaryNotAllowedWeapon": "{weapon} is not allowed in the converted primary slot.",
        "primaryTypeRestriction": "{weapon} does not match the converted primary slot restriction ({type}).",
        "meleeLimitExceeded": "Equipped melee weapons {equipped} exceed limit {limit}.",
        "meleeLocationRestricted": "{weapon} cannot be mounted at that location."
      },
      "warnings": {
        "label": "Warnings",
        "weaponMissing": "Weapon with id {weapon} is missing."
      },
      "newGroup": "New weapon group"
    },

    "weapon": {
      "damageType": {
        "energy": "Energy",
        "kinetic": "Kinetic",
        "ballistic": "Ballistic",
        "explosive": "Explosive",
        "plasma": "Plasma",
        "electrical": "Electrical",
        "melee": "Melee",
        "none": "None"
      }
    },

    "personalWeapon": {
      "damageType": {
        "penetrating": "Penetrating",
        "concussive": "Concussive",
        "energy": "Energy",
        "thermal": "Thermal",
        "electrical": "Electrical"
      }
    }
  },

  "modifier": {
    "column": {
      "group": "Group",
      "effect": "Effect",
      "value": "Value",
      "category": "",
      "subCategory": "",
      "condition": "When"
    },

    "group": {
      "roll": "Roll",
      "attribute": "Attribute",
      "monitor": "Monitor",
      "other": "Other"
    },

    "roll": {
      "effect": {
        "pool": "Pool bonus",
        "reroll": "Rerolls",
        "rerollMax": "Reroll allowance cap",
        "glitch": "Glitch dice",
        "successReroll": "Reroll own successes",
        "opponentPool": "Opponent pool malus",
        "opponentReroll": "Opponent rerolls"
      },
      "category": {
        "attribute": "Attribute",
        "skill": "Skill",
        "attributeAction": "Attribute action"
      }
    },

    "monitor": {
      "effect": {
        "armor": "Armor",
        "structure": "Structure",
        "fatigue": "Fatigue",
        "physical": "Physical",
      },
      "category": {
        "max": "Increased max",
        "resistance": "Resistance",
        "resistanceByType": "Damage-type resistance"
      }
    },

    "other": {
      "effect": {
        "ignoreWounds": "Ignore wounds",
        "damageArmor": "Damage to armor",
        "initiative": "Initiative bonus",
        "celebrity": "Adjust legend"
      },
      "category": {}
    },

    "condition": {
      "always": "Always"
    }
  }
};

// Temporary compatibility export.
// Remove after you have migrated all imports away from ANARCHY.
export const ANARCHY = MWD;
