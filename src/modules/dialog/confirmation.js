// src/modules/confirmation.js
// Purpose: References legacy Anarchy system behavior.
// How it fits: Describes role within src/modules or template rendering pipeline.


import { ANARCHY } from "../core/config.js";
import { Icons } from "../utils/icons.js";
import { formatString } from "../utils/strings.js";

export class ConfirmationDialog {

  static async confirmDeleteItem(item, onConfirm = () => { }) {
    const itemType = ANARCHY.itemType.singular[item.type];
    const content = formatString(ANARCHY.common.confirmation.delItem, {
      name: item.name,
      type: itemType,
    });
    let dialog = new Dialog({
      title: ANARCHY.common.confirmation.del,
      content,
      buttons: {
        delete: {
          icon: Icons.fontAwesome('fas fa-check'),
          label: ANARCHY.common.del,
          callback: onConfirm
        },
        cancel: {
          icon: Icons.fontAwesome('fas fa-times'),
          label: ANARCHY.common.cancel
        }
      },
      default: "cancel"
    });
    dialog.render(true);
  }

  static async confirmDetachOwnerActor(owner, owned, onConfirm = () => { }) {
    const content = formatString(ANARCHY.common.confirmation.delowner, {
      name: owner.name,
    });
    let dialog = new Dialog({
      title: ANARCHY.common.confirmation.del,
      content,
      buttons: {
        delete: {
          icon: Icons.fontAwesome('fas fa-check'),
          label: ANARCHY.common.del,
          callback: onConfirm
        },
        cancel: {
          icon: Icons.fontAwesome('fas fa-times'),
          label: ANARCHY.common.cancel
        }
      },
      default: "cancel"
    });
    dialog.render(true);
  }


  static async confirmAttachOrCopy(owner, owned, onAttach = () => { }, onAttachCopy = () => { }) {
    const content = formatString(ANARCHY.common.confirmation.attachOrCopy, {
      ownerName: owner.name,
      ownerType: ANARCHY.actorType[owner.type],
      ownedName: owned.name,
      ownedType: ANARCHY.actorType[owned.type],
    });
    let dialog = new Dialog({
      title: ANARCHY.common.confirmation.attach,
      content,
      buttons: {
        attach: {
          icon: Icons.fontAwesome('fas fa-user-tag'),
          label: ANARCHY.common.attach,
          callback: onAttach
        },
        attachCopy: {
          icon: Icons.fontAwesome('fas fa-user-plus'),
          label: ANARCHY.common.attachCopy,
          callback: onAttachCopy
        },
        cancel: {
          icon: Icons.fontAwesome('fas fa-times'),
          label: ANARCHY.common.cancel
        }
      },
      default: "cancel"
    });
    dialog.render(true);
  }
}