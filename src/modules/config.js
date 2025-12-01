
export const ANARCHY = {
    TYPES: {
        Actor: {
            character: "TYPES.Actor.character",
            vehicle: "TYPES.Actor.vehicle",
            battlemech: "TYPES.Actor.battlemech"
        },
        Item: {
            contact: "TYPES.Item.contact",
            gear: "TYPES.Item.gear",
            quality: "TYPES.Item.quality",
            shadowamp: "TYPES.Item.shadowamp",
            skill: "TYPES.Item.skill",
            mechWeapon: "TYPES.Item.mechWeapon",
            personalWeapon: "TYPES.Item.personalWeapon"
        }
    },
    settings: {
        defaultCssClass: {
            name: 'ANARCHY.settings.defaultCssClass.name',
            hint: 'ANARCHY.settings.defaultCssClass.hint'
        },
        anarchyHack: {
            name: 'ANARCHY.settings.anarchyHack.name',
            hint: 'ANARCHY.settings.anarchyHack.hint'
        },
        skillSet: {
            name: 'ANARCHY.settings.skillSet.name',
            hint: 'ANARCHY.settings.skillSet.hint'
        },
        gmDifficulty: {
            name: 'ANARCHY.settings.gmDifficulty.name',
            hint: 'ANARCHY.settings.gmDifficulty.hint',
            default: 'ANARCHY.settings.gmDifficulty.default',
            chatMessage: 'ANARCHY.settings.gmDifficulty.chatMessage',
        },
        damageMode: {
            name: 'ANARCHY.settings.damageMode.name',
            hint: 'ANARCHY.settings.damageMode.hint',
            values: {
                resistanceArmorMonitor: 'ANARCHY.settings.damageMode.values.resistanceArmorMonitor',
                armorResistanceMonitor: 'ANARCHY.settings.damageMode.values.armorResistanceMonitor',
                armorGivesResistance: 'ANARCHY.settings.damageMode.values.armorGivesResistance',
                armorGiveResistanceHitsAvoid: 'ANARCHY.settings.damageMode.values.armorGiveResistanceHitsAvoid',
            },
        },
        useDestinyMechanics: {
            name: 'ANARCHY.settings.useDestinyMechanics.name',
            hint: 'ANARCHY.settings.useDestinyMechanics.hint',
        }
    },
    gmManager: {
        title: 'ANARCHY.gmManager.title',
        playerChangedAnarchy: 'ANARCHY.gmManager.playerChangedAnarchy',
        gmReceivedAnarchy: 'ANARCHY.gmManager.gmReceivedAnarchy',
        gmConvergence: 'ANARCHY.gmManager.gmConvergence',
    },
    chat: {
        blindMessageToGM: 'ANARCHY.chat.blindMessageToGM',
        sufferedDrain: 'ANARCHY.chat.sufferedDrain',
        noDrain: 'ANARCHY.chat.noDrain',
        defendAttack: 'ANARCHY.chat.defendAttack',
        defendPilotAttack: 'ANARCHY.chat.defendPilotAttack',
        partiallyDefended: 'ANARCHY.chat.partiallyDefended',
        fullyDefended: 'ANARCHY.chat.fullyDefended',
        applyDamage: 'ANARCHY.chat.applyDamage',
    },
    user: {
        selectedTokenActors: 'ANARCHY.user.selectedTokenActors'
    },
    common: {
        newEntry: 'ANARCHY.common.newEntry',
        newName: 'ANARCHY.common.newName',
        cancel: 'ANARCHY.common.cancel',
        add: 'ANARCHY.common.add',
        edit: 'ANARCHY.common.edit',
        activate: 'ANARCHY.common.activate',
        del: 'ANARCHY.common.del',
        favorite: 'ANARCHY.common.favorite',
        addFavorite: 'ANARCHY.common.addFavorite',
        delFavorite: 'ANARCHY.common.delFavorite',
        attach: 'ANARCHY.common.attach',
        attachCopy: 'ANARCHY.common.attachCopy',
        matrix: {
            connectionMode: 'ANARCHY.common.matrix.connectionMode',
        },
        roll: {
            button: 'ANARCHY.common.roll.button',
            title: 'ANARCHY.common.roll.title',
            attribute: 'ANARCHY.common.roll.attribute',
            attribute2: 'ANARCHY.common.roll.attribute2',
            modifiers: {
                edge: 'ANARCHY.common.roll.modifiers.edge',
                specialization: 'ANARCHY.common.roll.modifiers.specialization',
                poolModifiers: 'ANARCHY.common.roll.modifiers.poolModifiers',
                social: {
                    credibility: 'ANARCHY.common.roll.modifiers.social.credibility',
                    rumor: 'ANARCHY.common.roll.modifiers.social.rumor',
                },
                anarchyDisposition: 'ANARCHY.common.roll.modifiers.anarchyDisposition',
                anarchyRisk: 'ANARCHY.common.roll.modifiers.anarchyRisk',
                glitch: 'ANARCHY.common.roll.modifiers.glitch',
                drain: 'ANARCHY.common.roll.modifiers.drain',
                convergence: 'ANARCHY.common.roll.modifiers.convergence',
                wounds: 'ANARCHY.common.roll.modifiers.wounds',
                weaponRange: 'ANARCHY.common.roll.modifiers.weaponRange',
                weaponArea: 'ANARCHY.common.roll.modifiers.weaponArea',
                other: 'ANARCHY.common.roll.modifiers.other',
                virtualReality: 'ANARCHY.common.roll.modifiers.virtualReality',
                reduced: 'ANARCHY.common.roll.modifiers.reduced',
                reroll: 'ANARCHY.common.roll.modifiers.reroll',
                rerollForced: 'ANARCHY.common.roll.modifiers.rerollForced',
                opponentReroll: 'ANARCHY.common.roll.modifiers.opponentReroll',
                opponentPool: 'ANARCHY.common.roll.modifiers.opponentPool'
            },
            rollTheme: {
                dicePool: 'ANARCHY.common.roll.rollTheme.dicePool',
                reroll: 'ANARCHY.common.roll.rollTheme.reroll',
                removed: 'ANARCHY.common.roll.rollTheme.removed',
                rerollRemoved: 'ANARCHY.common.roll.rollTheme.rerollRemoved',
                glitch: 'ANARCHY.common.roll.rollTheme.glitch',
                drain: 'ANARCHY.common.roll.rollTheme.drain',
                convergence: 'ANARCHY.common.roll.rollTheme.convergence',
                anarchyRisk: 'ANARCHY.common.roll.rollTheme.anarchyRisk',
            },
            opponentRoll: 'ANARCHY.common.roll.opponentRoll',
            totalSuccess: 'ANARCHY.common.roll.totalSuccess',
            success: 'ANARCHY.common.roll.success',
            risk: {
                prowess: 'ANARCHY.common.roll.risk.prowess',
                nothing: 'ANARCHY.common.roll.risk.nothing',
                mixed: 'ANARCHY.common.roll.risk.mixed',
                glitch: 'ANARCHY.common.roll.risk.glitch',
            },
            rerollSuccess: 'ANARCHY.common.roll.rerollSuccess',
            rerollForcedLoss: 'ANARCHY.common.roll.rerollForcedLoss',
            rerollForcedSuccess: 'ANARCHY.common.roll.rerollForcedSuccess',
        },
        confirmation: {
            del: 'ANARCHY.common.confirmation.del',
            delItem: 'ANARCHY.common.confirmation.delItem',
            delOwner: 'ANARCHY.common.confirmation.delOwner',
            attach: 'ANARCHY.common.confirmation.attach',
            attachOrCopy: 'ANARCHY.common.confirmation.attachOrCopy',
        },
        selection: {
            actorSettingMarks: 'ANARCHY.common.selection.actorSettingMarks'
        },
        errors: {
            insufficient: 'ANARCHY.common.errors.insufficient',
            outOfRange: 'ANARCHY.common.errors.outOfRange',
            onlyGM: 'ANARCHY.common.errors.onlyGM',
            noEdgeForActor: 'ANARCHY.common.errors.noEdgeForActor',
            expectedType: 'ANARCHY.common.errors.expectedType',
            ignoredTargets: 'ANARCHY.common.errors.ignoredTargets',
            noTargetSelected: 'ANARCHY.common.errors.noTargetSelected',
            maxTargetsExceedeed: 'ANARCHY.common.errors.maxTargetsExceedeed',
            noDefenseOnWeapon: 'ANARCHY.common.errors.noDefenseOnWeapon',
            noTokenActor: 'ANARCHY.common.errors.noTokenActor',
            noValidPilotForVehicle: 'ANARCHY.common.errors.noValidPilotForVehicle',
            cannotUseEdgeAnymore: 'ANARCHY.common.errors.cannotUseEdgeAnymore',
            actorCannotApplyDamage: 'ANARCHY.common.errors.actorCannotApplyDamage',
            actorCannotReceiveDamage: 'ANARCHY.common.errors.actorCannotReceiveDamage',
            actorDoesNotHaveDefense: 'ANARCHY.common.errors.actorDoesNotHaveDefense',
        },
        sourceReference: 'ANARCHY.common.sourceReference',
        sourceReferenceHelp: 'ANARCHY.common.sourceReferenceHelp',
        description: 'ANARCHY.common.description',
        gmnotes: 'ANARCHY.common.gmnotes',
    },
    actor: {
        characterSheet: 'ANARCHY.actor.characterSheet',
        characterTabbedSheet: 'ANARCHY.actor.characterTabbedSheet',
        characterEnhancedSheet: 'ANARCHY.actor.characterEnhancedSheet',
        vehicleSheet: 'ANARCHY.actor.vehicleSheet',
        characterNPCSheet: 'ANARCHY.actor.characterNPCSheet',
        actorName: 'ANARCHY.actor.actorName',
        genre: 'ANARCHY.actor.genre',
        celebrity: 'ANARCHY.actor.counters.edgePools.legend',
        tabs: {
            main: 'ANARCHY.actor.tabs.main',
            equipment: 'ANARCHY.actor.tabs.equipment',
            biography: 'ANARCHY.actor.tabs.biography',
        },
        words: {
            keywords: 'ANARCHY.actor.words.keywords',
            cues: 'ANARCHY.actor.words.cues',
            dispositions: 'ANARCHY.actor.words.dispositions',
        },
        counters: {
            xp: 'ANARCHY.actor.counters.xp',
            xpTotal: 'ANARCHY.actor.counters.xpTotal',
            edge: 'ANARCHY.actor.counters.edge',
            anarchy: 'ANARCHY.actor.counters.anarchy',
            sceneAnarchy: 'ANARCHY.actor.counters.sceneAnarchy',
            plot: 'ANARCHY.actor.counters.plot',
            edgePools: {
                title: 'ANARCHY.actor.counters.edgePools.title',
                grit: 'ANARCHY.actor.counters.edgePools.grit',
                insight: 'ANARCHY.actor.counters.edgePools.insight',
                rumor: 'ANARCHY.actor.counters.edgePools.rumor',
                legend: 'ANARCHY.actor.counters.edgePools.legend',
                credibility: 'ANARCHY.actor.counters.edgePools.credibility',
                chaos: 'ANARCHY.actor.counters.edgePools.chaos',
            },
            social: {
                credibility: 'ANARCHY.actor.counters.social.credibility',
                rumor: 'ANARCHY.actor.counters.social.rumor',
            }
        },
        monitors: {
            conditionMonitors: 'ANARCHY.actor.monitors.conditionMonitors',
            overflow: 'ANARCHY.actor.monitors.overflow',
            physical: 'ANARCHY.actor.monitors.physical',
            fatigue: 'ANARCHY.actor.monitors.fatigue',
            armor: 'ANARCHY.actor.monitors.armor',
            structure: 'ANARCHY.actor.monitors.structure',
            heat: 'ANARCHY.actor.monitors.heat',
            resistance: 'ANARCHY.actor.monitors.resistance',
        },
        vehicle: {
            moves: 'ANARCHY.actor.vehicle.moves',
            attacks: 'ANARCHY.actor.vehicle.attacks',
            stealth: 'ANARCHY.actor.vehicle.stealth',
            category: 'ANARCHY.actor.vehicle.category',
            skill: 'ANARCHY.actor.vehicle.skill',
            quickActions: {
                title: 'ANARCHY.actor.vehicle.quickActions.title',
                rangedAttack: 'ANARCHY.actor.vehicle.quickActions.rangedAttack',
                meleeAttack: 'ANARCHY.actor.vehicle.quickActions.meleeAttack',
                dodgeCheck: 'ANARCHY.actor.vehicle.quickActions.dodgeCheck',
                pilotingCheck: 'ANARCHY.actor.vehicle.quickActions.pilotingCheck',
                sensorSweep: 'ANARCHY.actor.vehicle.quickActions.sensorSweep',
                emergencyRepair: 'ANARCHY.actor.vehicle.quickActions.emergencyRepair',
                primaryWeapons: 'ANARCHY.actor.vehicle.quickActions.primaryWeapons',
                allWeapons: 'ANARCHY.actor.vehicle.quickActions.allWeapons',
                primaryLabel: 'ANARCHY.actor.vehicle.quickActions.primaryLabel',
                unarmed: 'ANARCHY.actor.vehicle.quickActions.unarmed',
                unarmedNotes: 'ANARCHY.actor.vehicle.quickActions.unarmedNotes',
                selectWeaponGroup: 'ANARCHY.actor.vehicle.quickActions.selectWeaponGroup',
                selectMeleeProfile: 'ANARCHY.actor.vehicle.quickActions.selectMeleeProfile',
                selectSensorSkill: 'ANARCHY.actor.vehicle.quickActions.selectSensorSkill',
                weaponGroup: 'ANARCHY.actor.vehicle.quickActions.weaponGroup',
                weaponsUsed: 'ANARCHY.actor.vehicle.quickActions.weaponsUsed',
                meleeProfile: 'ANARCHY.actor.vehicle.quickActions.meleeProfile',
                meleeDamage: 'ANARCHY.actor.vehicle.quickActions.meleeDamage',
                skillUsed: 'ANARCHY.actor.vehicle.quickActions.skillUsed',
                tooltips: {
                    ranged: 'ANARCHY.actor.vehicle.quickActions.tooltips.ranged',
                    melee: 'ANARCHY.actor.vehicle.quickActions.tooltips.melee',
                    dodge: 'ANARCHY.actor.vehicle.quickActions.tooltips.dodge',
                    piloting: 'ANARCHY.actor.vehicle.quickActions.tooltips.piloting',
                    sensorSweep: 'ANARCHY.actor.vehicle.quickActions.tooltips.sensorSweep',
                    emergencyRepair: 'ANARCHY.actor.vehicle.quickActions.tooltips.emergencyRepair',
                },
                errors: {
                    noRanged: 'ANARCHY.actor.vehicle.quickActions.errors.noRanged',
                    noMelee: 'ANARCHY.actor.vehicle.quickActions.errors.noMelee',
                    noSensorSweep: 'ANARCHY.actor.vehicle.quickActions.errors.noSensorSweep',
                }
            }
        },
        ownership: {
            owner: 'ANARCHY.actor.ownership.owner',
            unknown: 'ANARCHY.actor.ownership.unknown',
            owned: 'ANARCHY.actor.ownership.owned',
        }
    },
    actorType: {
        character: 'ANARCHY.actorType.character',
        vehicle: 'ANARCHY.actorType.vehicle',
        battlemech: 'ANARCHY.actorType.battlemech',
    },
    item: {
        sheet: 'ANARCHY.item.sheet',
        tabs: {
            main: 'ANARCHY.item.tabs.main',
            modifiers: 'ANARCHY.item.tabs.modifiers',
        },
        common: {
            inactive: 'ANARCHY.item.common.inactive',
        },
        skill: {
            code: 'ANARCHY.item.skill.code',
            copyDefault: 'ANARCHY.item.skill.useDefault',
            isKnowledge: 'ANARCHY.item.skill.isKnowledge',
            attribute: 'ANARCHY.item.skill.attribute',
            value: 'ANARCHY.item.skill.value',
            specialization: 'ANARCHY.item.skill.specialization',
            hasDrain: 'ANARCHY.item.skill.isSocial',
            hasDrain: 'ANARCHY.item.skill.hasDrain',
            hasConvergence: 'ANARCHY.item.skill.hasConvergence',
            specializationHelp: 'ANARCHY.item.skill.specializationHelp'
        },
        quality: {
            positive: 'ANARCHY.item.quality.positive'
        },
        shadowamp: {
            category: 'ANARCHY.item.shadowamp.category',
            capacity: 'ANARCHY.item.shadowamp.capacity',
            level: 'ANARCHY.item.shadowamp.level',
            levelShort: 'ANARCHY.item.shadowamp.levelShort',
        },
        mechWeapon: {
            damage: 'ANARCHY.item.mechWeapon.damage',
            heat: 'ANARCHY.item.mechWeapon.heat',
            area: 'ANARCHY.item.mechWeapon.area',
            range: {
                max: 'ANARCHY.item.mechWeapon.range.max'
            }
        },
        personalWeapon: {
            skill: 'ANARCHY.item.personalWeapon.skill',
            weaponCategory: 'ANARCHY.item.personalWeapon.category',
            damageCategory: 'ANARCHY.item.personalWeapon.damageCategory',
            damage: 'ANARCHY.item.personalWeapon.damage',
            defense: 'ANARCHY.item.personalWeapon.defense',
            area: 'ANARCHY.item.personalWeapon.area',
            armorAvoidance: 'ANARCHY.item.personalWeapon.armorAvoidance',
            damageShort: 'ANARCHY.item.personalWeapon.damageShort',
            areaShort: 'ANARCHY.item.personalWeapon.areaShort',
            weaponWithoutActor: 'ANARCHY.item.personalWeapon.weaponWithoutActor',
            range: {
                max: 'ANARCHY.item.personalWeapon.range.max'
            }
        }
    },
    itemType: {
        singular: {
            skill: 'ANARCHY.itemType.singular.skill',
            quality: 'ANARCHY.itemType.singular.quality',
            shadowamp: 'ANARCHY.itemType.singular.shadowamp',
            mechWeapon: 'ANARCHY.itemType.singular.mechWeapon',
            personalWeapon: 'ANARCHY.itemType.singular.personalWeapon',
            gear: 'ANARCHY.itemType.singular.gear',
            contact: 'ANARCHY.itemType.singular.contact'
        },
        plural: {
            skill: 'ANARCHY.itemType.plural.skill',
            quality: 'ANARCHY.itemType.plural.quality',
            shadowamp: 'ANARCHY.itemType.plural.shadowamp',
            mechWeapon: 'ANARCHY.itemType.plural.mechWeapon',
            personalWeapon: 'ANARCHY.itemType.plural.personalWeapon',
            gear: 'ANARCHY.itemType.plural.gear',
            contact: 'ANARCHY.itemType.plural.contact'
        }
    },
    capacity: {
        mundane: 'ANARCHY.capacity.mundane'
    },
    monitor: {
        physical: 'ANARCHY.monitor.physical',
        fatigue: 'ANARCHY.monitor.fatigue',
    },
    monitorLetter: {
        physical: 'ANARCHY.monitorLetter.physical',
        fatigue: 'ANARCHY.monitorLetter.fatigue',
    },
    shadowampCategory: {
        adeptPower: 'ANARCHY.shadowampCategory.adeptPower',
        bioware: 'ANARCHY.shadowampCategory.bioware',
        complexForm: 'ANARCHY.shadowampCategory.complexForm',
        cyberdeck: 'ANARCHY.shadowampCategory.cyberdeck',
        cyberware: 'ANARCHY.shadowampCategory.cyberware',
        drone: 'ANARCHY.shadowampCategory.drone',
        equipment: 'ANARCHY.shadowampCategory.equipment',
        focus: 'ANARCHY.shadowampCategory.focus',
        program: 'ANARCHY.shadowampCategory.program',
        spell: 'ANARCHY.shadowampCategory.spell',
        special: 'ANARCHY.shadowampCategory.special'
    },
    attributes: {
        noAttribute: 'ANARCHY.attributes.noAttributes',
        strength: 'ANARCHY.attributes.strength',
        agility: 'ANARCHY.attributes.agility',
        willpower: 'ANARCHY.attributes.willpower',
        logic: 'ANARCHY.attributes.logic',
        charisma: 'ANARCHY.attributes.charisma',
        edge: 'ANARCHY.attributes.edge',
        autopilot: 'ANARCHY.attributes.autopilot',
        handling: 'ANARCHY.attributes.handling',
        firewall: 'ANARCHY.attributes.firewall',
        system: 'ANARCHY.attributes.system',
        chassis: 'ANARCHY.attributes.chassis',
        condition: 'ANARCHY.attributes.condition',
        knowledge: 'ANARCHY.attributes.knowledge',
    },
    attributeAction: {
        defense: 'ANARCHY.attributeAction.defense',
        judgeIntentions: 'ANARCHY.attributeAction.judgeIntentions',
        perception: 'ANARCHY.attributeAction.perception',
        resistTorture: 'ANARCHY.attributeAction.resistTorture',
        composure: 'ANARCHY.attributeAction.composure',
        memory: 'ANARCHY.attributeAction.memory',
        catch: 'ANARCHY.attributeAction.catch',
        lift: 'ANARCHY.attributeAction.lift'
    },
    defense: {
        physicalDefense: 'ANARCHY.defense.physicalDefense',
        physicalResistance: 'ANARCHY.defense.physicalResistance',
        socialDefense: 'ANARCHY.defense.socialDefense',
        mentalResistance: 'ANARCHY.defense.mentalResistance',
    },
    skill: {
        athletics: 'ANARCHY.skill.athletics',
        heavyWeapons: 'ANARCHY.skill.heavyWeapons',
        escapeArtist: 'ANARCHY.skill.escapeArtist',
        gunnery: 'ANARCHY.skill.gunnery',
        meleeCombat: 'ANARCHY.skill.meleeCombat',
        piloting: 'ANARCHY.skill.piloting',
        projectileWeapons: 'ANARCHY.skill.projectileWeapons',
        firearms: 'ANARCHY.skill.firearms',
        stealth: 'ANARCHY.skill.stealth',
        zeroGOperations: 'ANARCHY.skill.zeroGOperations',
        art: 'ANARCHY.skill.art',
        artillery: 'ANARCHY.skill.artillery',
        communications: 'ANARCHY.skill.communications',
        computers: 'ANARCHY.skill.computers',
        demolitions: 'ANARCHY.skill.demolitions',
        knowledge: 'ANARCHY.skill.knowledge',
        medTech: 'ANARCHY.skill.medTech',
        science: 'ANARCHY.skill.science',
        perception: 'ANARCHY.skill.perception',
        tactics: 'ANARCHY.skill.tactics',
        technician: 'ANARCHY.skill.technician',
        tracking: 'ANARCHY.skill.tracking',
        navigation: 'ANARCHY.skill.navigation',
        animalHandling: 'ANARCHY.skill.animalHandling',
        survival: 'ANARCHY.skill.survival',
        acting: 'ANARCHY.skill.acting',
        disguise: 'ANARCHY.skill.disguise',
        leadership: 'ANARCHY.skill.leadership',
        negotiation: 'ANARCHY.skill.negotiation',
        etiquette: 'ANARCHY.skill.etiquette',
        streetwise: 'ANARCHY.skill.streetwise',
        intimidation: 'ANARCHY.skill.intimidation',
    },
    area: {
        none: 'ANARCHY.area.none',
        shotgun: 'ANARCHY.area.shotgun',
        circle: 'ANARCHY.area.circle',
        cone: 'ANARCHY.area.cone',
        rect: 'ANARCHY.area.rect',
        ray: 'ANARCHY.area.ray'
    },
    range: {
        contact: 'ANARCHY.range.contact',
        short: 'ANARCHY.range.short',
        medium: 'ANARCHY.range.medium',
        far: 'ANARCHY.range.far',
        extreme: 'ANARCHY.range.extreme',
    },
    connectionMode: {
        disconnected: 'ANARCHY.connectionMode.disconnected',
        augmented: 'ANARCHY.connectionMode.augmented',
        virtual: 'ANARCHY.connectionMode.virtual',
    },
    vehicleCategory: {
        drone: 'ANARCHY.vehicleCategory.drone',
        personal: 'ANARCHY.vehicleCategory.personal',
        combat: 'ANARCHY.vehicleCategory.combat',
        aerospace: 'ANARCHY.vehicleCategory.aerospace',
        mech: 'ANARCHY.vehicleCategory.mech',
    },
    mwd: {
        weightClass: {
            light: 'ANARCHY.mwd.weightClass.light',
            medium: 'ANARCHY.mwd.weightClass.medium',
            heavy: 'ANARCHY.mwd.weightClass.heavy',
            assault: 'ANARCHY.mwd.weightClass.assault',
        },
        hardpointType: {
            ballistic: 'ANARCHY.mwd.hardpoint.type.ballistic',
            energy: 'ANARCHY.mwd.hardpoint.type.energy',
            missile: 'ANARCHY.mwd.hardpoint.type.missile',
            special: 'ANARCHY.mwd.hardpoint.type.special',
            melee: 'ANARCHY.mwd.hardpoint.type.melee',
        },
        hardpointSize: {
            small: 'ANARCHY.mwd.hardpoint.size.small',
            medium: 'ANARCHY.mwd.hardpoint.size.medium',
            large: 'ANARCHY.mwd.hardpoint.size.large',
        },
        hardpointLocation: {
            head: 'ANARCHY.mwd.hardpoint.location.head',
            torso: 'ANARCHY.mwd.hardpoint.location.torso',
            arm: 'ANARCHY.mwd.hardpoint.location.arm',
            leg: 'ANARCHY.mwd.hardpoint.location.leg',
        },
        primarySlotMode: {
            normal: 'ANARCHY.mwd.primarySlot.mode.normal',
            converted: 'ANARCHY.mwd.primarySlot.mode.converted',
        },
        weaponCategory: {
            ranged: 'ANARCHY.mwd.weaponCategory.ranged',
            melee: 'ANARCHY.mwd.weaponCategory.melee',
        },
        weaponDamageType: {
            energy: 'ANARCHY.mwd.weapon.damageType.energy',
            kinetic: 'ANARCHY.mwd.weapon.damageType.kinetic',
            explosive: 'ANARCHY.mwd.weapon.damageType.explosive',
            plasma: 'ANARCHY.mwd.weapon.damageType.plasma',
            none: 'ANARCHY.mwd.weapon.damageType.none'
        },
        personalDamageType: {
            energy: 'ANARCHY.personal.weapon.damageType.energy',
            kinetic: 'ANARCHY.personal.weapon.damageType.kinetic',
            explosive: 'ANARCHY.personal.weapon.damageType.explosive',
            plasma: 'ANARCHY.personal.weapon.damageType.plasma',
            corrosive: 'ANARCHY.personal.weapon.damageType.corrosive',
            poison: 'ANARCHY.personal.weapon.damageType.poison'
        },
        personalDamageCategory: {
            physical: 'ANARCHY.personal.weapon.damageCategory.physical',
            fatigue: 'ANARCHY.personal.weapon.damageCategory.fatigue'
        },
        meleeLocation: {
            head: 'ANARCHY.mwd.melee.location.head',
            torso: 'ANARCHY.mwd.melee.location.torso',
            arm: 'ANARCHY.mwd.melee.location.arm',
            leg: 'ANARCHY.mwd.melee.location.leg',
        },
    },
    modifier: {
        column: {
            group: 'ANARCHY.modifier.column.group',
            effect: 'ANARCHY.modifier.column.effect',
            value: 'ANARCHY.modifier.column.value',
            category: 'ANARCHY.modifier.column.category',
            subCategory: 'ANARCHY.modifier.column.subCategory',
            target: 'ANARCHY.modifier.column.target',
            condition: 'ANARCHY.modifier.column.condition',
        },
        group: {
            roll: 'ANARCHY.modifier.group.roll',
            attribute: 'ANARCHY.modifier.group.attribute',
            monitor: 'ANARCHY.modifier.group.monitor',
            other: 'ANARCHY.modifier.group.other',
        },
        roll: {
            effect: {
                pool: 'ANARCHY.modifier.roll.effect.pool',
                reroll: 'ANARCHY.modifier.roll.effect.reroll',
                glitch: 'ANARCHY.modifier.roll.effect.glitch',
                successReroll: 'ANARCHY.modifier.roll.effect.successReroll',
                opponentPool: 'ANARCHY.modifier.roll.effect.opponentPool',
                opponentReroll: 'ANARCHY.modifier.roll.effect.opponentReroll',
            },
            category: {
                attribute: 'ANARCHY.modifier.roll.category.attribute',
                skill: 'ANARCHY.modifier.roll.category.skill',
                attributeAction: 'ANARCHY.modifier.roll.category.attributeAction',
            },
        },
            monitor: {
                effect: {
                    armor: 'ANARCHY.modifier.monitor.effect.armor',
                    structure: 'ANARCHY.modifier.monitor.effect.structure',
                    fatigue: 'ANARCHY.modifier.monitor.effect.fatigue',
                physical: 'ANARCHY.modifier.monitor.effect.physical',
                },
                category: {
                    max: 'ANARCHY.modifier.monitor.category.max',
                    resistance: 'ANARCHY.modifier.monitor.category.resistance',
                }
        },
        other: {
            effect: {
                ignoreWounds: 'ANARCHY.modifier.other.effect.ignoreWounds',
                damageArmor: 'ANARCHY.modifier.other.effect.damageArmor',
                sceneAnarchy: 'ANARCHY.modifier.other.effect.sceneAnarchy',
                locationAnarchy: 'ANARCHY.modifier.other.effect.locationAnarchy',
                initiative: 'ANARCHY.modifier.other.effect.initiative',
                celebrity: 'ANARCHY.modifier.other.effect.celebrity',
            },
            category: {
            }
        },
        condition: {
            always: 'ANARCHY.modifier.condition.always'
        }
    }
};

