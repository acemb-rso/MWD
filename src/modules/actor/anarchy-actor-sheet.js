import { ANARCHY } from "../config.js";
import { LOG_HEAD, TEMPLATE, TEMPLATES_PATH } from "../constants.js";
import { ConfirmationDialog } from "../confirmation.js";
import { Misc } from "../misc.js";
import { Enums } from "../enums.js";
import { SelectActor } from "../dialog/select-actor.js";
import { ResistanceByTypeDialog } from "../dialog/resistance-by-type.js";

const { HandlebarsApplicationMixin } = foundry.applications.api;

export class AnarchyActorSheet extends HandlebarsApplicationMixin(foundry.applications.sheets.ActorSheet) {

  static PARTS = {
    sheet: {
      template: TEMPLATES_PATH + "/actor/character.hbs",
      scrollable: [".sheet-body"]
    }
  };

  /** @override */
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      isGM: game.user.isGM,
      dragDrop: [{ dragSelector: ".item ", dropSelector: null }],
      classes: [game.system.anarchy.styles.selectCssClass(), "sheet", "actor"],
      actions: {},
      resizable: true,
      position: {
        width: 760,
        height: 760
      }
    });
  }

  /**
   * Keep support for code paths that still read {@link defaultOptions} from app-v1 style classes.
   */
  static get defaultOptions() {
    return this.DEFAULT_OPTIONS;
  }

  /** @override */
  _getHeaderButtons() {
    const buttons = super._getHeaderButtons?.() ?? [];
    const seen = new Set();
    return buttons.filter(button => {
      const key = `${button.class ?? ''}|${button.icon ?? ''}|${button.label ?? button.title ?? ''}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  /** @override */
  _configureRenderOptions(options) {
    super._configureRenderOptions(options);

    // Dynamically set the template based on actor type
    if (this.actor?.type) {
      const template = `${TEMPLATES_PATH}/actor/${this.actor.type}.hbs`;
      this.constructor.PARTS.sheet.template = template;
      options.parts = foundry.utils.mergeObject(options.parts ?? {}, {
        sheet: { template }
      });
    }
  }

  async _prepareContext(options) {
    this._logSheetDiagnostics('prepareContext-start', { options });
    
    const context = await super._prepareContext(options);

    console.log(`${LOG_HEAD}Actor data for template:`, {
      actor: this.actor,
      system: this.actor?.system,
      type: this.actor?.type,
      hasGetAnarchy: typeof this.actor?.getAnarchy === 'function'
    });

    // Merge in your custom data
    const hbsData = foundry.utils.mergeObject(context, {
      items: {},
      anarchy: this.actor.getAnarchy?.() ?? {},
      ownerActor: this.actor.getOwnerActor?.() ?? null,
      ownedActors: this.actor.getOwnedActors?.() ?? [],
      editable: this.isEditable,
      owner: this.document.isOwner,
      limited: !this.document.isOwner,
      actor: this.actor,
      data: context.data ?? this.actor,
      ENUMS: foundry.utils.mergeObject(
        { attributeAction: this.actor.getAttributeActions?.() ?? {} },
        Enums.getEnums()
      ),
      ANARCHY: ANARCHY,
      system: this.actor.system
    });

    // Classify items
    if (this.actor.items) {
      Misc.classifyInto(hbsData.items, this.actor.items);
      hbsData.items.weapon = [
        ...(hbsData.items.mechWeapon ?? []),
        ...(hbsData.items.personalWeapon ?? []),
      ];
    }

    this._logSheetDiagnostics('prepareContext-complete', { 
      hasItems: !!hbsData.items,
      itemCount: this.actor.items?.size ?? 0 
    });
    
    return hbsData;
  }

  _onRender(context, options) {
    super._onRender(context, options);
    this._logSheetDiagnostics('onRender-complete');
  }

  activateListeners(html) {
    const element = html instanceof HTMLElement ? html : html[0];
    super.activateListeners(element);

    const jqHtml = $(element);

    // items standard actions (add/edit/activate/delete)
    jqHtml.find('.click-item-add').click(async event => {
      event.stopPropagation();
      await this.createNewItem(this.getEventItemType(event));
    });

    jqHtml.find('.click-item-edit').click(async event => {
      event.stopPropagation();
      this.getEventItem(event)?.sheet.render(true);
    });

    jqHtml.find('.click-item-activate').click(async event => {
      event.stopPropagation();
      const item = this.getEventItem(event)
      const inactive = item.system.inactive;
      await item.update({ 'system.inactive': !inactive })
    })

    jqHtml.find('.click-item-delete').click(async event => {
      event.stopPropagation();
      const item = this.getEventItem(event);
      ConfirmationDialog.confirmDeleteItem(item, async () => {
        await this.actor.deleteEmbeddedDocuments('Item', [item.id]);
      });
    });

    jqHtml.find('.click-favorite').click(async event => {
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
    jqHtml.find('.click-owner-actor-unlink').click(async event => {
      event.stopPropagation();
      this.detachFromOwner(this.actor.getOwnerActor(), this.actor);
    });
    jqHtml.find('.click-owned-actor-view').click(async event => {
      event.stopPropagation();
      this.getEventOwnedActor(event)?.sheet.render(true);
    });
    jqHtml.find('.click-owned-actor-unlink').click(async event => {
      event.stopPropagation();
      this.detachFromOwner(this.actor, this.getEventOwnedActor(event));
    });

    // counters & monitors
    jqHtml.find('a.click-checkbar-element').click(async event => {
      event.stopPropagation();
      const item = this.getEventItem(event);
      const handler = item ?? this.actor;
      const monitor = this.getEventMonitorCode(event);
      await handler.switchMonitorCheck(
        monitor,
        this.getEventIndex(event),
        this.isEventChecked(event),
        item
      );
    });

    // rolls
    jqHtml.find('.click-skill-roll').click(async event => {
      event.stopPropagation();
      this.actor.rollSkill(
        this.getEventItem(event),
        this.getEventSkillSpecialization(event));
    });

    jqHtml.find('.click-roll-attribute').click(async event => {
      event.stopPropagation();
      const handler = this.getEventItem(event) ?? this.actor;
      handler.rollAttribute(
        $(event.currentTarget).closest('.anarchy-attribute').attr('data-attribute')
      );
    });

    jqHtml.find('.click-roll-attribute-action').click(async event => {
      event.stopPropagation();
      this.actor.rollAttributeAction(this.getEventActionCode(event));
    });

    jqHtml.find('.click-weapon-roll').click(async event => {
      event.stopPropagation();
      const weapon = this.getEventItem(event);
      if (!weapon) {
        ui.notifications.warn(game.i18n.localize('ANARCHY.common.errors.weaponNotFound'));
        return;
      }
      this.actor.rollWeapon(weapon);
    });

    jqHtml.find('.click-resistance-by-type').click(async event => {
      event.stopPropagation();
      const monitor = this.getEventMonitorCode(event);
      await ResistanceByTypeDialog.show(this.actor, monitor);
    });
  }

  _logSheetDiagnostics(stage, extra = {}) {
    const diagnostics = {
      stage,
      actorId: this.actor?.id,
      actorName: this.actor?.name,
      actorType: this.actor?.type,
      template: this.constructor.PARTS?.sheet?.template,
      hasSystemData: !!this.actor?.system,
      ownerId: this.actor?.system?.ownerId ?? null,
      systemReady: !!game.system?.anarchy,
      sheetId: this.id,
      rendered: this.rendered,
      ...extra
    };
    console.debug(`${LOG_HEAD}ActorSheet`, diagnostics);
  }

  getEventItemType(event) {
    return $(event.currentTarget).closest('.define-item-type').attr('data-item-type');
  }

  getEventItem(event) {
    const itemId = $(event.currentTarget).closest('[data-item-id]').attr('data-item-id')
      ?? $(event.currentTarget).attr('data-item-id');
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
    return $(event.currentTarget).closest('[data-monitor-code]').attr('data-monitor-code');
  }

  getEventIndex(event) {
    return Number.parseInt($(event.currentTarget).attr('data-index'));
  }

  getEventOwnedActor(event) {
    const ownedActorId = $(event.currentTarget).closest('.define-owned-actor').attr('data-actor-id');
    return game.actors.get(ownedActorId);
  }

  async createNewItem(itemType) {
    if (itemType === 'weapon') {
      itemType = this.actor.type === TEMPLATE.actorTypes.battlemech
        ? TEMPLATE.itemType.mechWeapon
        : TEMPLATE.itemType.personalWeapon;
    }
    const name = game.i18n.format(ANARCHY.common.newName, { type: game.i18n.localize(ANARCHY.itemType.singular[itemType]) });
    await this.actor.createEmbeddedDocuments('Item', [{ name: name, type: itemType }], { renderSheet: true });
  }

  async onClickFavorite(options) {
    const newState = options.isFavorite != "true";
    if (options.skillId) {
      await this.actor.switchFavorite(newState, TEMPLATE.itemType.skill, options.skillId, options.specialization);
    }
    else if (options.weaponId) {
      const weapon = this.actor.items.get(options.weaponId);
      await this.actor.switchFavorite(newState, weapon?.type ?? TEMPLATE.itemType.personalWeapon, options.weaponId);
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
