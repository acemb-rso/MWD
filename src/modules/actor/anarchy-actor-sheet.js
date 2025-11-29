import { ANARCHY } from "../config.js";
import { TEMPLATE, TEMPLATES_PATH } from "../constants.js";
import { ConfirmationDialog } from "../confirmation.js";
import { Misc } from "../misc.js";
import { Enums } from "../enums.js";
import { SelectActor } from "../dialog/select-actor.js";

export class AnarchyActorSheet extends ActorSheet {

  get template() {
    return `${TEMPLATES_PATH}/actor/${this.actor.type}.hbs`;
  }

  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      isGM: game.user.isGM,
      dragDrop: [{ dragSelector: ".item ", dropSelector: null }],
      classes: [game.system.anarchy.styles.selectCssClass(), "sheet", "actor"],
    });
  }

  getData(options) {
    let hbsData = foundry.utils.mergeObject(
      super.getData(options),
      {
        items: {},
        anarchy: this.actor.getAnarchy(),
        ownerActor: this.actor.getOwnerActor(),
        ownedActors: this.actor.getOwnedActors(),
        options: {
          limited: this.document.limited,
          owner: this.document.isOwner,
          cssClass: this.isEditable ? "editable" : "locked",
        },
        ENUMS: foundry.utils.mergeObject({ attributeAction: this.actor.getAttributeActions() }, Enums.getEnums()),
        ANARCHY: ANARCHY
      });
    hbsData.options.classes.push(`actor-${this.actor.type}`);
    hbsData.options.classes = Misc.distinct(hbsData.options.classes);
    hbsData.system = this.actor.system;

    Misc.classifyInto(hbsData.items, this.actor.items);
    return hbsData;
  }

  activateListeners(html) {
    super.activateListeners(html);

    // items standard actions (add/edit/activate/delete)
    html.find('.click-item-add').click(async event => {
      event.stopPropagation();
      await this.createNewItem(this.getEventItemType(event));
    });

    html.find('.click-item-edit').click(async event => {
      event.stopPropagation();
      this.getEventItem(event)?.sheet.render(true);
    });

    html.find('.click-item-activate').click(async event => {
      event.stopPropagation();
      const item = this.getEventItem(event)
      const inactive = item.system.inactive;
      await item.update({ 'system.inactive': !inactive })
    })

    html.find('a.click-matrix-connectionMode').click(async event => {
      event.stopPropagation();
      await this.actor.nextConnectionMode(this.getEventItem(event))
    })

    html.find('.click-item-delete').click(async event => {
      event.stopPropagation();
      const item = this.getEventItem(event);
      ConfirmationDialog.confirmDeleteItem(item, async () => {
        await this.actor.deleteEmbeddedDocuments('Item', [item.id]);
      });
    });

    html.find('.click-favorite').click(async event => {
      event.stopPropagation();
      this.onClickFavorite({
        skillId: $(event.currentTarget).attr('data-skill-id'),
        specialization: $(event.currentTarget).attr('data-specialization'),
        weaponId: $(event.currentTarget).attr('data-weapon-id'),
        attributeAction: $(event.currentTarget).attr('data-attributeAction'),
        isFavorite: $(event.currentTarget).attr('data-isFavorite')
      });
    });

    // ownership management
    html.find('.click-owner-actor-unlink').click(async event => {
      event.stopPropagation();
      this.detachFromOwner(this.actor.getOwnerActor(), this.actor);
    });
    html.find('.click-owned-actor-view').click(async event => {
      event.stopPropagation();
      this.getEventOwnedActor(event)?.sheet.render(true);
    });
    html.find('.click-owned-actor-unlink').click(async event => {
      event.stopPropagation();
      this.detachFromOwner(this.actor, this.getEventOwnedActor(event));
    });

    // counters & monitors
    html.find('a.click-checkbar-element').click(async event => {
      event.stopPropagation();
      const item = this.getEventItem(event);
      const handler = item ?? this.actor;
      const monitor = this.getEventMonitorCode(event);
      const sourceActorId = monitor == 'marks' ?
        $(event.currentTarget).closest('.anarchy-marks').attr('data-actor-id')
        : undefined;
      await handler.switchMonitorCheck(
        monitor,
        this.getEventIndex(event),
        this.isEventChecked(event),
        sourceActorId,
        item
      );
    });
    html.find('a.click-add-mark-actor').click(async event => {
      event.stopPropagation();
      this.onClickAddMark();
    });

    // rolls
    html.find('.click-skill-roll').click(async event => {
      event.stopPropagation();
      this.actor.rollSkill(
        this.getEventItem(event),
        this.getEventSkillSpecialization(event));
    });

    html.find('.click-roll-attribute').click(async event => {
      event.stopPropagation();
      const handler = this.getEventItem(event) ?? this.actor;
      handler.rollAttribute(
        $(event.currentTarget).closest('.anarchy-attribute').attr('data-attribute')
      );
    });

    html.find('.click-roll-attribute-action').click(async event => {
      event.stopPropagation();
      this.actor.rollAttributeAction(this.getEventActionCode(event));
    });

    html.find('.click-weapon-roll').click(async event => {
      event.stopPropagation();
      this.actor.rollWeapon(this.getEventItem(event));
    });
  }

  getEventItemType(event) {
    return $(event.currentTarget).closest('.define-item-type').attr('data-item-type');
  }

  getEventItem(event) {
    const itemId = $(event.currentTarget).closest('.item').attr('data-item-id')
      ?? $(event.currentTarget).closest('.anarchy-metatype').attr('data-item-id');
    return this.actor.items.get(itemId);
  }

  isEventChecked(event) {
    return $(event.currentTarget).attr('data-checked') == 'true';
  }

  getEventSkillSpecialization(event) {
    return $(event.currentTarget).closest('.click-skill-roll').attr('data-item-specialization');
  }

  getEventActionCode(event) {
    return $(event.currentTarget).attr('data-action-code');
  }

  getEventMonitorCode(event) {
    return $(event.currentTarget).closest('.click-checkbar-element').attr('data-monitor-code');
  }

  getEventIndex(event) {
    return Number.parseInt($(event.currentTarget).attr('data-index'));
  }

  getEventOwnedActor(event) {
    const ownedActorId = $(event.currentTarget).closest('.define-owned-actor').attr('data-actor-id');
    return game.actors.get(ownedActorId);
  }

  async createNewItem(itemType) {
    const name = game.i18n.format(ANARCHY.common.newName, { type: game.i18n.localize(ANARCHY.itemType.singular[itemType]) });
    await this.actor.createEmbeddedDocuments('Item', [{ name: name, type: itemType }], { renderSheet: true });
  }

  async onClickFavorite(options) {
    const newState = options.isFavorite != "true";
    if (options.skillId) {
      await this.actor.switchFavorite(newState, TEMPLATE.itemType.skill, options.skillId, options.specialization);
    }
    else if (options.weaponId) {
      await this.actor.switchFavorite(newState, TEMPLATE.itemType.weapon, options.weaponId);
    }
    else if (options.attributeAction) {
      await this.actor.switchFavorite(newState, 'attributeAction', options.attributeAction);
    }
    else {
      console.warn('Favorite not supported', options);
    }
  }

  detachFromOwner(owner, owned) {
    ConfirmationDialog.confirmDetachOwnerActor(owner, owned, async () => {
      await owned.attachToOwnerActor();
      this.render(true);
    });
  }

  async _onDropActor(event, drag) {
    const dropActor = fromUuidSync(drag.uuid);
    if (dropActor?.id != this.actor.id) {
      // check circular references: find a owner, without finding the owned id
      ConfirmationDialog.confirmAttachOrCopy(this.actor, dropActor,
        async () => await dropActor.attachToOwnerActor(this.actor),
        async () => await dropActor.attachToOwnerActor(this.actor, 'copy'));
    }
    super._onDropActor(event, drag);
  }

  async onClickAddMark() {
    if (this.actor.canReceiveMarks()) {
      const title = game.i18n.format(ANARCHY.common.selection.actorSettingMarks, { name: this.actor.name });
      await SelectActor.selectActor(title,
        game.actors.filter(actor => !this.actor.getActorMarks(actor.id) && actor.canSetMarks()),
        actor => this.actor.addActorMark(actor.id)
      );
    }
  }
}