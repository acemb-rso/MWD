import { ANARCHY } from "../config.js";
import { TEMPLATE, TEMPLATES_PATH } from "../constants.js";
import { AnarchyBaseActor } from "./base-actor.js";
import { ErrorManager } from "../error-manager.js";
import { Misc } from "../misc.js";
import { Modifiers } from "../modifiers/modifiers.js";
import { Checkbars, DEFAULT_CHECKBARS } from "../common/checkbars.js";
import { RollCelebrity } from "../dialog/roll-celebrity.js";

const { renderTemplate } = foundry.applications.handlebars;

const HBS_TEMPLATE_ACTOR_DRAIN = `${TEMPLATES_PATH}/chat/actor-drain.hbs`;
const HBS_TEMPLATE_ACTOR_SAY_WORD = `${TEMPLATES_PATH}/chat/actor-say-word.hbs`;

export class CharacterActor extends AnarchyBaseActor {

  static get initiative() {
    return AnarchyBaseActor.initiative + " + max(@attributes.agility.value, @attributes.logic.value)";
  }

  hasOwnAnarchy() { return this.hasPlayerOwner; }

  prepareDerivedData() {
    if (!this.system.monitors.fatigue && this.system.monitors.stun) {
      this.system.monitors.fatigue = foundry.utils.duplicate(this.system.monitors.stun)
    }
    this.system.monitors.physical.max = this._getMonitorMax(TEMPLATE.attributes.strength)
    this.system.monitors.fatigue.max = this._getMonitorMax(TEMPLATE.attributes.willpower)
    super.prepareDerivedData()
    this.system.ignoreWounds = Modifiers.sumModifiers(this.items, 'other', 'ignoreWounds')
  }

  computePhysicalState() {
    const maxMonitor = Math.max(this.system.monitors.physical.max, this.system.monitors.fatigue.max) + this.system.monitors.armor.max
    const dead = this.system.monitors.physical.value == this.system.monitors.physical.max
    const ko = this.system.monitors.fatigue.max == this.system.monitors.fatigue.value
    const current = (dead || ko)
      ? maxMonitor
      : Math.max(this.system.monitors.physical.value, this.system.monitors.fatigue.value) + this.system.monitors.armor.value
    return {
      max: maxMonitor,
      value: maxMonitor - current
    }
  }

  getAttributes() {
    return [
      TEMPLATE.attributes.strength,
      TEMPLATE.attributes.agility,
      TEMPLATE.attributes.willpower,
      TEMPLATE.attributes.logic,
      TEMPLATE.attributes.charisma,
      TEMPLATE.attributes.edge
    ];
  }

  getPhysicalAgility() { return TEMPLATE.attributes.agility }

  getCorrespondingAttribute(attribute) {
    if (TEMPLATE.attributes.firewall == attribute) {
      return TEMPLATE.attributes.firewall
    }
    return super.getCorrespondingAttribute(attribute)
  }

  getDamageMonitor(damageType) {
    damageType = this.resolveDamageType(damageType);
    switch (damageType) {
      case TEMPLATE.monitors.fatigue:
      case TEMPLATE.monitors.physical:
        return damageType;
    }
    return super.getDamageMonitor(damageType);
  }

  async createWord(wordType, added) {
    this._mutateWords(wordType, values => values.concat([{ word: added, audio: '' }]));
  }

  async sayWord(wordType, wordId) {
    const wordsToSay = this.getWord(wordType, wordId)?.word
    if (wordsToSay) {
      ChatMessage.create({
        speaker: { alias: this.token?.name ?? this.name },
        content: await renderTemplate(HBS_TEMPLATE_ACTOR_SAY_WORD,
          {
            actor: this,
            wordsToSay: wordsToSay
          })
      });
    }
  }

  getWord(wordType, wordId) {
    return wordType ? this.system[wordType].find(it => it.id == wordId) : undefined;
  }

  async updateWord(wordType, id, updated) {
    this._applyWordUpdate(wordType, id, it => foundry.utils.mergeObject(it, { word: updated }, { overwrite: true }));
  }

  async _applyWordUpdate(wordType, id, updateFunction) {
    this._mutateWords(wordType, values => values.map(it => {
      if (it.id == id) {
        updateFunction(it)
      }
      return it;
    }));
  }

  async deleteWord(wordType, deletedId) {
    this._mutateWords(wordType, values => values.filter(it => it.id != deletedId));
  }

  async _mutateWords(wordType, mutate = values => values) {
    if (!wordType) {
      return;
    }
    let newValues = mutate(this.system[wordType]);
    Misc.reindexIds(newValues);
    await this.update({ [`system.${wordType}`]: newValues });
  }

  getCelebrityValue() {
    return this.system.counters.social.celebrity.value;
  }
  getCredibilityValue() {
    return this.system.counters.social.credibility.value;
  }
  getRumorValue() {
    return this.system.counters.social.rumor.value;
  }

  getAnarchy() {
    if (this.hasOwnAnarchy()) {
      return {
        value: this.system.counters.anarchy.value,
        max: this.system.counters.anarchy.max,
        scene: this.getAnarchyScene()
      };
    }
    return super.getAnarchy();
  }

  getAnarchyScene() {
    return this.system.counters.sceneAnarchy.value ?? 0;
  }

  async spendAnarchy(count) {
    if (count > 0) {
      const sceneAnarchy = this.getAnarchyScene();
      const currentAnarchy = this.getAnarchyValue();
      ErrorManager.checkSufficient(ANARCHY.actor.counters.anarchy, count, currentAnarchy + sceneAnarchy);

      const useSceneAnarchy = Math.min(sceneAnarchy, count);
      const useAnarchy = count - useSceneAnarchy;

      if (useSceneAnarchy > 0) {
        Checkbars.addCounter(this, TEMPLATE.monitors.sceneAnarchy, -useSceneAnarchy);
      }
      if (this.hasPlayerOwner) {
        await game.system.anarchy.gmAnarchy.actorGivesAnarchyToGM(this, count);
        Checkbars.addCounter(this, TEMPLATE.monitors.anarchy, -useAnarchy);
      }
      else if (useAnarchy > 0) {
        super.spendAnarchy(useAnarchy);
      }
    }
  }

  canUseEdge() { return true }

  getWounds() {
    const wounds = Misc.divint(this.system.monitors.fatigue.value, 3) + Misc.divint(this.system.monitors.physical.value, 3);
    return Math.max(0, wounds - this.system.ignoreWounds);
  }

  canPilotVehicle() { return true }

  canSetMarks() {
    return this.getCyberdeck()?.isConnected()
  }

  canReceiveMarks() {
    return this.getCyberdeck()?.isConnected()
  }

  getCyberdeck() {
    return this.items.find(it => it.isActive() && it.isCyberdeck())
  }

  async rollDrain(drain) {
    if (drain) {
      const rollDrain = new Roll(`${drain}dgcf=1[${game.i18n.localize(ANARCHY.common.roll.rollTheme.drain)}]`);
      await rollDrain.evaluate({ async: true });
      await this.sufferDrain(rollDrain.total);

      const flavor = await renderTemplate(HBS_TEMPLATE_ACTOR_DRAIN, {
        ANARCHY: ANARCHY,
        actor: this,
        drain: rollDrain.total,
        options: {
          classes: game.system.anarchy.styles.selectCssClass()
        }
      });
      await rollDrain.toMessage({ flavor: flavor });
    }
  }

  async sufferDrain(drain) {
    if (drain != 0) {
      await this.addCounter(TEMPLATE.monitors.fatigue, drain);
    }
  }

  async rollCelebrity() {
    await RollCelebrity.create(this);
  }
}