
export const ANARCHY = {
    TYPES: {
        Actor: {
            character: "TYPES.Actor.character",
            vehicle: "TYPES.Actor.vehicle",
            device: "TYPES.Actor.device",
            sprite: "TYPES.Actor.sprite",
            ic: "TYPES.Actor.ic"
        },
        Item: {
            contact: "TYPES.Item.contact",
            cyberdeck: "TYPES.Item.cyberdeck",
            gear: "TYPES.Item.gear",
            metatype: "TYPES.Item.metatype",
            quality: "TYPES.Item.quality",
            shadowamp: "TYPES.Item.shadowamp",
            skill: "TYPES.Item.skill",
            weapon: "TYPES.Item.weapon"
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
        deviceSheet: 'ANARCHY.actor.deviceSheet',
        spriteSheet: 'ANARCHY.actor.spriteSheet',
        icSheet: 'ANARCHY.actor.icSheet',
        characterNPCSheet: 'ANARCHY.actor.characterNPCSheet',
        actorName: 'ANARCHY.actor.actorName',
        genre: 'ANARCHY.actor.genre',
        noMetatype: 'ANARCHY.actor.noMetatype',
        celebrity: 'ANARCHY.actor.celebrity',
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
        essence: {
            adjustments: 'ANARCHY.actor.essence.adjustments',
            adjustShort: 'ANARCHY.actor.essence.adjustShort',
        },
        counters: {
            essence: 'ANARCHY.actor.counters.essence',
            karma: 'ANARCHY.actor.counters.karma',
            karmaTotal: 'ANARCHY.actor.counters.karmaTotal',
            edge: 'ANARCHY.actor.counters.edge',
            anarchy: 'ANARCHY.actor.counters.anarchy',
            sceneAnarchy: 'ANARCHY.actor.counters.sceneAnarchy',
            plot: 'ANARCHY.actor.counters.plot',
            social: {
                credibility: 'ANARCHY.actor.counters.social.credibility',
                rumor: 'ANARCHY.actor.counters.social.rumor',
            }
        },
        monitors: {
            conditionMonitors: 'ANARCHY.actor.monitors.conditionMonitors',
            overflow: 'ANARCHY.actor.monitors.overflow',
            noMatrixMonitor: 'ANARCHY.actor.monitors.noMatrixMonitor',
            physical: 'ANARCHY.actor.monitors.physical',
            stun: 'ANARCHY.actor.monitors.stun',
            matrix: 'ANARCHY.actor.monitors.matrix',
            armor: 'ANARCHY.actor.monitors.armor',
            structure: 'ANARCHY.actor.monitors.structure',
            resistance: 'ANARCHY.actor.monitors.resistance',
            marks: 'ANARCHY.actor.monitors.marks',
            convergence: 'ANARCHY.actor.monitors.convergence',
        },
        vehicle: {
            moves: 'ANARCHY.actor.vehicle.moves',
            attacks: 'ANARCHY.actor.vehicle.attacks',
            stealth: 'ANARCHY.actor.vehicle.stealth',
            category: 'ANARCHY.actor.vehicle.category',
            skill: 'ANARCHY.actor.vehicle.skill'
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
        device: 'ANARCHY.actorType.device',
        sprite: 'ANARCHY.actorType.sprite',
        ic: 'ANARCHY.actorType.ic',
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
            essence: 'ANARCHY.item.shadowamp.essence',
            levelShort: 'ANARCHY.item.shadowamp.levelShort',
            essenceShort: 'ANARCHY.item.shadowamp.essenceShort'
        },
        weapon: {
            skill: 'ANARCHY.item.weapon.skill',
            damage: 'ANARCHY.item.weapon.damage',
            strength: 'ANARCHY.item.weapon.strength',
            defense: 'ANARCHY.item.weapon.defense',
            area: 'ANARCHY.item.weapon.area',
            noArmor: 'ANARCHY.item.weapon.noArmor',
            withArmor: 'ANARCHY.item.weapon.withArmor',
            damageShort: 'ANARCHY.item.weapon.damageShort',
            areaShort: 'ANARCHY.item.weapon.areaShort',
            noArmorShort: 'ANARCHY.item.weapon.noArmorShort',
            weaponWithoutActor: 'ANARCHY.item.weapon.weaponWithoutActor',
            range: {
                max: 'ANARCHY.item.weapon.range.max'
            }
        },
        cyberdeck: {
            programs: 'ANARCHY.item.cyberdeck.programs',
            processing: 'ANARCHY.item.cyberdeck.processing',
            processingHelp: 'ANARCHY.item.cyberdeck.processingHelp',
        }
    },
    itemType: {
        singular: {
            metatype: 'ANARCHY.itemType.singular.metatype',
            skill: 'ANARCHY.itemType.singular.skill',
            quality: 'ANARCHY.itemType.singular.quality',
            shadowamp: 'ANARCHY.itemType.singular.shadowamp',
            weapon: 'ANARCHY.itemType.singular.weapon',
            gear: 'ANARCHY.itemType.singular.gear',
            cyberdeck: 'ANARCHY.itemType.singular.cyberdeck',
            contact: 'ANARCHY.itemType.singular.contact'
        },
        plural: {
            metatype: 'ANARCHY.itemType.plural.metatype',
            skill: 'ANARCHY.itemType.plural.skill',
            quality: 'ANARCHY.itemType.plural.quality',
            shadowamp: 'ANARCHY.itemType.plural.shadowamp',
            weapon: 'ANARCHY.itemType.plural.weapon',
            gear: 'ANARCHY.itemType.plural.gear',
            cyberdeck: 'ANARCHY.itemType.plural.cyberdeck',
            contact: 'ANARCHY.itemType.plural.contact'
        }
    },
    capacity: {
        mundane: 'ANARCHY.capacity.mundane',
        awakened: 'ANARCHY.capacity.awakened',
        emerged: 'ANARCHY.capacity.emerged'
    },
    monitor: {
        physical: 'ANARCHY.monitor.physical',
        stun: 'ANARCHY.monitor.stun',
        matrix: 'ANARCHY.monitor.matrix',
        marks: 'ANARCHY.monitor.marks',
    },
    monitorLetter: {
        physical: 'ANARCHY.monitorLetter.physical',
        stun: 'ANARCHY.monitorLetter.stun',
        matrix: 'ANARCHY.monitorLetter.matrix',
        marks: 'ANARCHY.monitorLetter.marks',
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
        lift: 'ANARCHY.attributeAction.lift',
        matrixDefense: 'ANARCHY.attributeAction.matrixDefense',
        astralDefense: 'ANARCHY.attributeAction.astralDefense'
    },
    defense: {
        physicalDefense: 'ANARCHY.defense.physicalDefense',
        physicalResistance: 'ANARCHY.defense.physicalResistance',
        socialDefense: 'ANARCHY.defense.socialDefense',
        matrixDefense: 'ANARCHY.defense.matrixDefense',
        mentalResistance: 'ANARCHY.defense.mentalResistance',
    },
    skill: {
        athletics: 'ANARCHY.skill.athletics',
        acrobatics: 'ANARCHY.skill.acrobatics',
        closeCombat: 'ANARCHY.skill.closeCombat',
        projectileWeapons: 'ANARCHY.skill.projectileWeapons',
        firearms: 'ANARCHY.skill.firearms',
        heavyWeapons: 'ANARCHY.skill.heavyWeapons',
        vehicleWeapons: 'ANARCHY.skill.vehicleWeapons',
        stealth: 'ANARCHY.skill.stealth',
        pilotingGround: 'ANARCHY.skill.pilotingGround',
        pilotingOther: 'ANARCHY.skill.pilotingOther',
        escapeArtist: 'ANARCHY.skill.escapeArtist',
        astralCombat: 'ANARCHY.skill.astralCombat',
        conjuring: 'ANARCHY.skill.conjuring',
        sorcery: 'ANARCHY.skill.sorcery',
        survival: 'ANARCHY.skill.survival',
        biotech: 'ANARCHY.skill.biotech',
        electronics: 'ANARCHY.skill.electronics',
        hacking: 'ANARCHY.skill.hacking',
        engineering: 'ANARCHY.skill.engineering',
        tracking: 'ANARCHY.skill.tracking',
        tasking: 'ANARCHY.skill.tasking',
        con: 'ANARCHY.skill.con',
        intimidation: 'ANARCHY.skill.intimidation',
        negotiation: 'ANARCHY.skill.negotiation',
        disguise: 'ANARCHY.skill.disguise',
        animals: 'ANARCHY.skill.animals',
        etiquette: 'ANARCHY.skill.etiquette',
        knowledge: 'ANARCHY.skill.knowledge',
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
        short: 'ANARCHY.range.short',
        medium: 'ANARCHY.range.medium',
        long: 'ANARCHY.range.long',
    },
    connectionMode: {
        disconnected: 'ANARCHY.connectionMode.disconnected',
        augmented: 'ANARCHY.connectionMode.augmented',
        virtual: 'ANARCHY.connectionMode.virtual',
    },
    vehicleCategory: {
        miniDrone: 'ANARCHY.vehicleCategory.miniDrone',
        smallDrone: 'ANARCHY.vehicleCategory.smallDrone',
        mediumDrone: 'ANARCHY.vehicleCategory.mediumDrone',
        largeDrone: 'ANARCHY.vehicleCategory.largeDrone',
        motorcycle: 'ANARCHY.vehicleCategory.motorcycle',
        smallCar: 'ANARCHY.vehicleCategory.smallCar',
        largeCar: 'ANARCHY.vehicleCategory.largeCar',
        van: 'ANARCHY.vehicleCategory.van',
        truck: 'ANARCHY.vehicleCategory.truck',
        aircraft: 'ANARCHY.vehicleCategory.aircraft',
        boat: 'ANARCHY.vehicleCategory.boat',
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
                stun: 'ANARCHY.modifier.monitor.effect.stun',
                physical: 'ANARCHY.modifier.monitor.effect.physical',
                matrix: 'ANARCHY.modifier.monitor.effect.matrix',
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
                essenceAdjustment: 'ANARCHY.modifier.other.effect.essenceAdjustment',
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

