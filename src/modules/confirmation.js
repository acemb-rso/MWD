import { ANARCHY } from "./config.js";
import { Icons } from "./icons.js";

export class ConfirmationDialog {

  static async confirmDeleteItem(item, onConfirm = () => { }) {
    let dialog = new Dialog({
      title: game.i18n.localize(ANARCHY.common.confirmation.del),
      content: game.i18n.format(ANARCHY.common.confirmation.delItem, {
        name: item.name,
        type: game.i18n.localize(ANARCHY.itemType.singular[item.type])
      }),
      buttons: {
        delete: {
          icon: Icons.fontAwesome('fas fa-check'),
          label: game.i18n.localize(ANARCHY.common.del),
          callback: onConfirm
        },
        cancel: {
          icon: Icons.fontAwesome('fas fa-times'),
          label: game.i18n.localize(ANARCHY.common.cancel)
        }
      },
      default: "cancel"
    });
    dialog.render(true);
  }

  static async confirmDetachOwnerActor(owner, owned, onConfirm = () => { }) {
    let dialog = new Dialog({
      title: game.i18n.localize(ANARCHY.common.confirmation.del),
      content: game.i18n.format(ANARCHY.common.confirmation.delOwner, {
        name: owner.name,
      }),
      buttons: {
        delete: {
          icon: Icons.fontAwesome('fas fa-check'),
          label: game.i18n.localize(ANARCHY.common.del),
          callback: onConfirm
        },
        cancel: {
          icon: Icons.fontAwesome('fas fa-times'),
          label: game.i18n.localize(ANARCHY.common.cancel)
        }
      },
      default: "cancel"
    });
    dialog.render(true);
  }


  static async confirmAttachOrCopy(owner, owned, onAttach = () => { }, onAttachCopy = () => { }) {
    let dialog = new Dialog({
      title: game.i18n.localize(ANARCHY.common.confirmation.attach),
      content: game.i18n.format(ANARCHY.common.confirmation.attachOrCopy, {
        ownerName: owner.name, ownerType: game.i18n.localize(ANARCHY.actorType[owner.type]),
        ownedName: owned.name, ownedType: game.i18n.localize(ANARCHY.actorType[owned.type])
      }),
      buttons: {
        attach: {
          icon: Icons.fontAwesome('fas fa-user-tag'),
          label: game.i18n.localize(ANARCHY.common.attach),
          callback: onAttach
        },
        attachCopy: {
          icon: Icons.fontAwesome('fas fa-user-plus'),
          label: game.i18n.localize(ANARCHY.common.attachCopy),
          callback: onAttachCopy
        },
        cancel: {
          icon: Icons.fontAwesome('fas fa-times'),
          label: game.i18n.localize(ANARCHY.common.cancel)
        }
      },
      default: "cancel"
    });
    dialog.render(true);
  }
}