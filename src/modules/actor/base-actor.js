import { AttributeActions } from "../attribute-actions.js";
import { Checkbars } from "../common/checkbars.js";
import { ANARCHY } from "../config.js";
import { BASE_MONITOR, TEMPLATE } from "../constants.js";
import { Enums } from "../enums.js";
import { ErrorManager } from "../error-manager.js";
import { NO_MATRIX_MONITOR } from "../matrix-helper.js";
import { Misc } from "../misc.js";
import { Modifiers } from "../modifiers/modifiers.js";
import { RollDialog } from "../roll/roll-dialog.js";
import { MATRIX_SKILLS } from "../skills.js";
import { AnarchyUsers } from "../users.js";
import { ActorDamageManager } from "./actor-damage.js";

export class AnarchyBaseActor extends Actor {

  static init() {
    Hooks.on('updateActor', (actor, updates, options, id) => AnarchyUsers.firstResponsible(actor)?.onUpdateActor(updates, options))
  }

  constructor(docData, context = {}) {
    if (!context.anarchy?.ready) {
      const ActorConstructor = game.system.anarchy.actorClasses[docData.type];
      foundry.utils.mergeObject(context, { anarchy: { ready: true } });
      if (ActorConstructor) {
        if (!docData.img) {
          docData.img = ActorConstructor.defaultIcon;
        }
        return new ActorConstructor(docData, context);
      }
    }
    context.anarchy = undefined
    super(docData, context);
  }

  static get initiative() {
    return "2d6 + @modifiers.initiative";
  }

  static get defaultIcon() {
    return undefined;
  }

  static padWordListToMin(items, min) {
    for (let index = items.length; index < min; index++) {
      items.push({
        word: "",
        id: index + 1,
        audio: "",
        no_delete: false
      });
    }
    for (let index = 0; index < min; index++) {
      items[index]["no_delete"] = true;
    }
    return items;
  }

  static sortSkills(actor, skills) {
    if (!skills) {
      return []
    }
    return skills.sort((skilla, skillb) => {
      const skillaIsKnowledge = (skilla.system.code === 'knowledge') || (skilla.system.attribute === 'knowledge');
      const skillbIsKnowledge = (skillb.system.code === 'knowledge') || (skillb.system.attribute === 'knowledge');
      if (skillaIsKnowledge && !skillbIsKnowledge) return 1;
      if (!skillbIsKnowledge && skillaIsKnowledge) return -1;
      if (skillaIsKnowledge && skillbIsKnowledge) {
        if (skilla.name > skillb.name) return 1;
        if (skilla.name > skillb.name) return -1;
        return 0;
      }

      const skillATotal = actor.getAttributeValue(skilla.system.attribute) + skilla.system.value;
      const skillBTotal = actor.getAttributeValue(skillb.system.attribute) + skillb.system.value;
      if (skillATotal > skillBTotal) return -1;
      if (skillATotal < skillBTotal) return 1;
      return 0;
    })
  }

  static sortQualities(qualities) {
    if (!qualities) {
      return []
    }
    return qualities.sort((qa, qb) => {
      // same type of quality
      if (qa.system.positive === qb.system.positive) {
        if (qa.name > qb.name) return 1;
        if (qa.name < qb.name) return -1;
        return 0;
      }

      if (qa.system.positive) return -1;
      if (qb.system.positive) return 1;

      return 0;
    })
  }

  static sortShadowamps(shadowamps) {
    if (!shadowamps) {
      return []
    }
    return shadowamps.sort((sa, sb) => {
      if (sa.system.level > sb.system.level) return -1;
      if (sa.system.level < sb.system.level) return 1;
      if (sa.name > sb.name) return 1;
      if (sa.name < sb.name) return -1;
      return 0;
    })
  }

  static sortAttributeButton(buttons) {
    if (!buttons) {
      return []
    }
    return buttons.sort((a, b) => {
      if (game.i18n.localize(a.labelkey) > game.i18n.localize(b.labelkey)) return 1;
      if (game.i18n.localize(a.labelkey) < game.i18n.localize(b.labelkey)) return -1;
      return 0;
    })
  }

  getAllowedUsers(permission = CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER) {
    return game.users.filter(user => this.testUserPermission(user, permission));
  }

  getAllowedUserIds(permission = CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER) {
    return this.getAllowedUsers(permission).map(it => it.id);
  }

  getRightToDefend() { return CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER }

  hasOwnAnarchy() { return false; }
  hasGMAnarchy() { return !this.hasPlayerOwner; }
  isVehicle() { return this.type == TEMPLATE.actorTypes.vehicle }
  prepareData() {
    super.prepareData()
    this.cleanupFavorites()
  }

  prepareDerivedData() {
    this.prepareMatrixMonitor()
    this.system.modifiers = {
      initiative: Modifiers.sumModifiers(this.items, 'other', 'initiative')
    }
    if (this.system.monitors) {
      Object.entries(this.system.monitors).forEach(kv => {
        kv[1].maxBonus = Modifiers.sumMonitorModifiers(this.items, kv[0], 'max')
        kv[1].resistanceBonus = Modifiers.sumMonitorModifiers(this.items, kv[0], 'resistance')
      })
    }
    if (this.system.attributes) {
      Object.entries(this.system.attributes).forEach(kv => kv[1].total = this.getAttributeValue(kv[0]))
    }
    this.system.state = this.computeState()
  }

  getAttributes() { return []; }
  getPhysicalAgility() { return undefined }
  getCorrespondingAttribute(attribute) {
    const attributes = this.getAttributes()
    if (attributes.includes(attribute)) {
      return attribute
    }
    return undefined
  }

  prepareMatrixMonitor() {
    const matrix = this.getMatrixDetails()
    if (matrix.hasMatrix) {
      this.system.monitors.matrix.max = this._getMonitorMax(matrix.logic)
      this.system.monitors.matrix.canMark = true
    }
  }

  async onUpdateActor(updates, options) {
    if (updates.system?.monitors != undefined && updates.system?.state == undefined) {
      this.update({ 'system.state': this.computeState() })
    }
  }

  computeState() {
    return {
      matrix: this.computeMatrixState(),
      physical: this.computePhysicalState(),
    }
  }

  computePhysicalState() {
    return { value: 0, max: 0 }
  }

  computeMatrixState() {
    const matrixDetails = this.getMatrixDetails();
    if (matrixDetails.hasMatrix) {
      return {
        value: matrixDetails.monitor.max - matrixDetails.monitor.value,
        max: matrixDetails.monitor.max
      }
    }
    return { value: 0, max: 0 }
  }

  getMatrixDetails() {
    return {
      hasMatrix: false,
      logic: undefined,
      firewall: undefined,
      monitor: NO_MATRIX_MONITOR,
      overflow: undefined,
    }
  }

  getMatrixLogic() { return this.getMatrixDetails().logic }
  getMatrixFirewall() { return this.getMatrixDetails().firewall }
  getMatrixMonitor() { return this.getMatrixDetails().monitor }
  getMatrixMarks() { return this.getMatrixDetails().monitor?.marks ?? [] }
  getMatrixOverflow() { return this.getMatrixDetails().overflow }
  hasMatrixMonitor() { return this.getMatrixDetails().hasMatrix }
  isMatrixConnected(mode = undefined) { return false }
  isMatrixSkill(skill) {
    return MATRIX_SKILLS.includes(skill?.system.code)
  }

  async nextConnectionMode(cyberdeck) { }

  async defSetMatrixMonitor(path, value) {
    if (!this.getMatrixDetails().hasMatrix) {
      game.system.anarchy.hacks.i18n.format(ANARCHY.actor.monitors.noMatrixMonitor, { actor: this.name })
    }
    else {
      await this.update({ [path]: value })
    }
  }

  async setCheckbarValue(path, value) {
    if (path.startsWith('system.monitors.matrix.')) {
      const matrixDetails = this.getMatrixDetails();
      if (matrixDetails.setMatrixMonitor) {
        return await matrixDetails.setMatrixMonitor(path, value)
      }
      return await this.defSetMatrixMonitor(path, value)
    }
    return await this.update({ [path]: value })
  }

  _getMonitorMax(attribute) {
    const attributeValue = this.getAttributeValue(attribute);
    return attributeValue == 0 ? 0 : (BASE_MONITOR + Misc.divup(attributeValue, 2));
  }


  getAttributeActions() {
    return AttributeActions.getActorActions(this);
  }

  getUsableAttributes(item = undefined) {
    const itemsAttributes = (item ? [item] : this.items)
      .map(it => it.getUsableAttributes())
      .reduce((a, b) => a.concat(b), [])
    const usableAttributes = Misc.distinct(this.getAttributes().concat(itemsAttributes));
    usableAttributes.sort(Misc.ascendingBySortedArray(Enums.sortedAttributeKeys));
    return usableAttributes;
  }

  getAttributeValue(attribute, item = undefined) {
    let value = 0;
    attribute = this.getCorrespondingAttribute(attribute)
    if (attribute) {
      if (this.getAttributes().includes(attribute)) {
        value = this.system.attributes[attribute].value;
      }
      else if (!item) {
        const candidateItems = this.items.filter(item => item.isActive() && item.getAttributes().includes(attribute))
        if (candidateItems.length > 0) {
          const candidateValues = candidateItems.map(it => it.getAttributeValue(attribute) ?? 0)
          value = Math.max(...candidateValues)
        }
      }
      else if (this.isEmerged() && attribute == TEMPLATE.attributes.firewall) {
        return this.getAttributeValue(TEMPLATE.attributes.logic);
      }
      else {
        value = item?.getAttributeValue(attribute) ?? 0;
      }
      value += Modifiers.sumModifiers(this.items, 'attribute', attribute);
    }
    return value;
  }

  getDamageMonitor(damageType) {
    switch (damageType) {
      case TEMPLATE.monitors.matrix:
      case TEMPLATE.monitors.marks:
        return damageType;
    }
    return undefined;
  }

  async applyArmorDamage(damageType, damage = 0) {
    switch (damageType) {
      case TEMPLATE.monitors.physical:
      case TEMPLATE.monitors.stun:
        await ActorDamageManager.damageToArmor(this, damage);
    }
  }

  async rollAttribute(attribute) {
    await RollDialog.rollAttribute(this, attribute);
  }

  async rollAttributeAction(code) {
    const action = AttributeActions.getActorAction(this, code);
    await RollDialog.rollAttributeAction(this, action);
  }

  async rollSkill(skill, specialization) {
    await RollDialog.rollSkill(this, skill, specialization);
  }

  async rollWeapon(weapon) {
    ErrorManager.checkWeaponDefense(weapon, this);
    const targetedTokenIds = weapon.validateTargets(this)?.map(it => it.id)
    const targeting = {
      attackerTokenId: game.scenes.current?.tokens.find(it => it.actor?.id == this.id)?.id,
      targetedTokenIds: targetedTokenIds
    }
    const skill = this.items.find(it => weapon.isWeaponSkill(it));
    await RollDialog.rollWeapon(this, skill, weapon, targeting);
  }

  async rollDefense(attack) {
    const defense = attack.attack.defense;
    const action = AttributeActions.getActorDefense(this, defense);
    await RollDialog.rollDefense(this, action, attack);
  }

  async rollPilotDefense(attack) { }

  async rollDrain(drain) { }

  async rollConvergence(convergence) { }

  async switchMonitorCheck(monitor, index, checked, sourceActorId = undefined) {
    await Checkbars.switchMonitorCheck(this, monitor, index, checked, sourceActorId);
  }

  async addCounter(monitor, value, sourceActorId = undefined) {
    await Checkbars.addCounter(this, monitor, value, sourceActorId);
  }

  async setCounter(monitor, value, sourceActorId = undefined) {
    await Checkbars.setCounter(this, monitor, value, sourceActorId);
  }

  canPilotVehicle() { return false }

  canSetMarks() { return false }

  getCyberdeck() { return undefined }

  canReceiveMarks() { return this.system.monitors?.matrix?.canMark }

  canApplyDamage(monitor) {
    switch (monitor) {
      case TEMPLATE.monitors.matrix:
      case TEMPLATE.monitors.marks:
        return this.hasMatrixMonitor()
      case TEMPLATE.monitors.physical:
      case TEMPLATE.monitors.stun:
        return this.getDamageMonitor(monitor) != undefined
    }
    return false
  }

  canReceiveDamage(monitor) {
    return this.canApplyDamage(monitor)
  }

  isEmerged() { return false }

  async addActorMark(sourceActorId) {
    await Checkbars.addActorMark(this, sourceActorId);
  }

  getActorMarks(sourceActorId) {
    return Checkbars.getActorMarks(this, sourceActorId)?.marks;
  }

  async onEnterCombat() {
    const sceneAnarchy = Modifiers.sumModifiers(this.items, 'other', 'sceneAnarchy');
    if (sceneAnarchy > 0) {
      await Checkbars.setCounter(this, TEMPLATE.monitors.sceneAnarchy, sceneAnarchy);
    }
  }

  async onLeaveCombat() {
    await Checkbars.setCounter(this, TEMPLATE.monitors.sceneAnarchy, 0);
  }

  getCelebrityValue() { return 0; }
  getCredibilityValue() { return 0; }
  getRumorValue() { return 0; }

  getAnarchy() {
    const anarchy = this.hasGMAnarchy()
      ? game.system.anarchy.gmAnarchy.getAnarchy()
      : {
        isGM: false,
        value: 0,
        max: 0,
      };
    anarchy.scene = this.getAnarchyScene()
    return anarchy;
  }

  getAnarchyScene() {
    return 0;
  }

  getAnarchyValue() {
    return this.getAnarchy().value ?? 0;
  }

  async spendCredibility(count) {
    await Checkbars.addCounter(this, TEMPLATE.counters.social.credibility, - count);
  }
  async spendRumor(count) {
    await Checkbars.addCounter(this, TEMPLATE.counters.social.rumor, - count);
  }

  async spendAnarchy(count) {
    if (count && !this.hasPlayerOwner) {
      await game.system.anarchy.gmAnarchy.npcConsumesAnarchy(this, count);
    }
  }

  getRemainingEdge() {
    return this.system.counters?.edge?.value ?? 0
  }

  canUseEdge() {
    return this.getAttributes().includes(TEMPLATE.attributes.edge);
  }

  async spendEdge(count) {
    if (count == 0) {
      return;
    }
    if (!this.canUseEdge()) {
      const message = game.system.anarchy.hacks.i18n.localize(ANARCHY.common.errors.noEdgeForActor, {
        actor: this.name,
        actorType: game.system.anarchy.hacks.i18n.localize(ANARCHY.actorType[this.type])
      });
      ui.notifications.warn(message)
      throw ANARCHY.common.errors.noEdgeForActor + message;
    }
    await Checkbars.addCounter(this, TEMPLATE.counters.edge, - count);
  }

  getSkillValue(skillId, specialization = undefined) {
    const skill = this.items.get(skillId);
    const attribute = this.getAttributeValue(skill.system.attribute);
    return skill.system.value + attribute + (specialization && skill.system.specialization ? 2 : 0);
  }

  getWounds() {
    return 0;
  }

  async removeOtherMetatype(metatype) {
    const metatypeIds = this.items.filter(it => it.isMetatype() && it.id != metatype?.id)
      .map(it => it.id);
    this.deleteEmbeddedDocuments("Item", metatypeIds);
  }

  /**
   * @param ownerActor the Actor who becomes the owner of this Actor
   */
  async attachToOwnerActor(ownerActor = undefined, attachOrCopy = 'attach') {
    if (ownerActor?.id == this.id) {
      return;
    }
    if (ownerActor?.hasPlayerOwner) {
      // TODO: enforce player to have rights if owner hasPlayer
    }
    let actorToAttach = this;
    if (attachOrCopy == 'copy') {
      const cloneTmp = this.clone();
      const created = await Actor.createDocuments([cloneTmp]);
      actorToAttach = created[0];
    }
    await actorToAttach.update({ 'system.ownerId': ownerActor?.id ?? '' });
    ownerActor?.render();
    this.render();
  }

  getOwnerActor() {
    if (this.system.ownerId) {
      return game.actors.get(this.system.ownerId);
    }
    return undefined;
  }

  getOwnedActors() {
    return game.actors.filter(it => it.system.ownerId == this.id);
  }


  hasFavorite(type, id) {
    const search = AnarchyBaseActor._prepareFavorite(type, id);
    return this.system.favorites.find(it => AnarchyBaseActor._isSameFavorite(search, it)) ? true : false;
  }

  static _prepareFavorite(type, id) { return { type, id } }

  static _isSameFavorite(f1, f2) {
    return f1.id == f2.id && f1.type == f2.type;
  }

  async switchFavorite(setFavorite, type, id) {
    const favorite = AnarchyBaseActor._prepareFavorite(type, id);
    const newFavorites = this.system.favorites.filter(it => !AnarchyBaseActor._isSameFavorite(favorite, it));
    if (setFavorite) {
      newFavorites.push(favorite);
    }
    this.update({ 'system.favorites': newFavorites })
  }

  async cleanupFavorites() {
    const newFavorites = this.computeShortcuts().filter(f => !f.callback);
    if (newFavorites.length < this.system.favorites) {
      this.update({ 'system.favorites': newFavorites })
    }
  }

  getShortcuts() {
    return this.computeShortcuts().filter(s => s.label && s.callback);
  }

  computeShortcuts() {
    if (this.system.favorites) {
      return this.system.favorites.map(f => this.getShortcut(f.type, f.id));
    }
    return []
  }

  getShortcut(type, id) {
    const favorite = AnarchyBaseActor._prepareFavorite(type, id);
    if (type == 'attributeAction') {
      const shortcut = AttributeActions.prepareShortcut(this, id);
      if (shortcut) {
        return foundry.utils.mergeObject(shortcut, favorite);
      }
    }
    else if (Object.values(TEMPLATE.itemType).includes(type)) {
      const shortcut = this.items.get(id)?.prepareShortcut();
      if (shortcut) {
        return foundry.utils.mergeObject(shortcut, favorite);
      }
    }
    return favorite;
  }
}