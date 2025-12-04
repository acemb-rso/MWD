import { ActorDamageManager } from "../actor/actor-damage.js";
import { ChatManager, CAN_USE_EDGE, MESSAGE_DATA, OWNING_ACTOR, PARENT_MESSAGE_ID } from "../chat/chat-manager.js";
import { ANARCHY } from "../config.js";
import { ANARCHY_SYSTEM, SYSTEM_SCOPE, TEMPLATES_PATH } from "../constants.js";
import { RollManager } from "../roll/roll-manager.js";

const TEMPLATE_INFORM_DEFENDER = `${TEMPLATES_PATH}/combat/inform-defender.hbs`;

export class CombatManager {

  async manageCombat(roll) {

    switch (roll.mode) {
      case ANARCHY_SYSTEM.rollType.weapon:
        if (!roll.targeting || roll.roll.total == 0) {
          return;
        }
        roll.targeting.targetedTokenIds?.forEach(async defenderTokenId =>
          await this.onAttack(defenderTokenId, roll)
        );
        break;
      case ANARCHY_SYSTEM.rollType.defense:
        // notify attacker about the defense
        await this.onDefense(roll);
        break;
      case ANARCHY_SYSTEM.rollType.defensePilot:
        await this.onDefensePilot(roll);
      // TODO defensePilot: 'defensePilot',
    }
  }

  async onAttack(defenderTokenId, attackRoll) {
    const attackerTokenId = attackRoll.targeting?.attackerTokenId;
    if (!(defenderTokenId && attackerTokenId)) {
      return;
    }
    await this.displayDefenseChoice(defenderTokenId, attackRoll);
  }

  async displayDefenseChoice(defenderTokenId, attackRoll, defenseRoll = undefined, defensePilotRoll = undefined) {
    const attackerTokenId = attackRoll.targeting?.attackerTokenId;
    const defender = this.getTokenActor(defenderTokenId)

    const attackHits = attackRoll.roll.total;
    const defenseHits = defenseRoll?.roll.total ?? defensePilotRoll?.roll.total ?? 0;
    const attack = {
      attackerTokenId: attackerTokenId,
      defenderTokenId: defenderTokenId,
      attackRoll: RollManager.deflateAnarchyRoll(attackRoll),
      defenseRoll: RollManager.deflateAnarchyRoll(defenseRoll),
      defensePilotRoll: RollManager.deflateAnarchyRoll(defensePilotRoll),
      attack: {
        isHit: attackHits > 0 && attackHits >= defenseHits,
        defense: attackRoll.weapon.getDefense(),
        pilotCanDefend: defender?.isVehicle(),
        success: Math.max(0, attackHits - defenseHits),
        damage: attackRoll.weapon.getDamage(),
      },
    }
    // parent message is the defense, or else the attack: the last roll made.
    // When defense is made, the attack can't be touched anymore
    const actionChatMessageIds = [
      attack.defenseRoll?.chatMessageId, attack.defensePilotRoll?.chatMessageId, attack.attackRoll.chatMessageId
    ]

    const flags = {}
    ChatManager.prepareFlag(flags, OWNING_ACTOR, ChatManager.messageActorRights(defender, defender.getRightToDefend()))
    ChatManager.prepareFlag(flags, PARENT_MESSAGE_ID, actionChatMessageIds.find(it => it != undefined));

    const notifyMessage = await ChatMessage.create({
      user: game.user.id,
      whisper: defender.getAllowedUserIds(defender.getRightToDefend()),
      content: await renderTemplate(TEMPLATE_INFORM_DEFENDER, foundry.utils.mergeObject(
        {
          ANARCHY: ANARCHY,
          options: { classes: [game.system.anarchy.styles.selectCssClass()] },
          attacker: this.getTokenActor(attack.attackerTokenId),
          defender: defender,
          weapon: attack.attackRoll.weapon
        },
        attack)),
      flags: flags
    })
    attack.choiceChatMessageId = notifyMessage.id
    notifyMessage.setFlag(SYSTEM_SCOPE, MESSAGE_DATA, attack)
  }

  async onDefense(roll) {
    this._preventObsoleteChoices(roll)
    const attackRoll = RollManager.inflateAnarchyRoll(roll.attackRoll)
    await this.displayDefenseChoice(roll.tokenId, attackRoll, roll)
  }

  async onDefensePilot(roll) {
    this._preventObsoleteChoices(roll)
    const attackRoll = RollManager.inflateAnarchyRoll(roll.attackRoll)
    await this.displayDefenseChoice(roll.tokenId, attackRoll, roll)
  }

  _preventObsoleteChoices(roll) {
    const defenseChoiceChatMessage = game.messages.get(roll.choiceChatMessageId)
    if (defenseChoiceChatMessage) {
      // prevent edge on attack, remove the previous defense message
      const attackChatMessageId = defenseChoiceChatMessage.getFlag(SYSTEM_SCOPE, PARENT_MESSAGE_ID) ?? '';
      const attackChatMessage = game.messages.get(attackChatMessageId)
      attackChatMessage?.setFlag(SYSTEM_SCOPE, CAN_USE_EDGE, false)
      ChatManager.removeChatMessage(roll.choiceChatMessageId)
    }
  }

  async onClickDefendAttack(attack) {
    const defender = this.getTokenActor(attack.defenderTokenId);
    await defender.rollDefense(attack);
  }
  async onClickPilotDefendAttack(attack) {
    const defender = this.getTokenActor(attack.defenderTokenId);
    await defender.rollPilotDefense(attack);
  }

  async onClickApplyAttackDamage(attack) {
    const attacker = this.getTokenActor(attack.attackerTokenId);
    const defender = this.getTokenActor(attack.defenderTokenId);
    const attackRoll = RollManager.inflateAnarchyRoll(attack.attackRoll);
    await ActorDamageManager.sufferDamage(defender,
      attack.attack.damage.monitor,
      attack.attack.damage.value,
      attack.attack.success,
      attack.attack.damage.noArmor,
      attacker,
      attackRoll.weapon);
    this._preventObsoleteChoices(attack);
  }

  getTokenActor(tokenId) {
    return canvas.tokens.get(tokenId)?.actor;
  }
}
