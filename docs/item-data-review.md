# Item Data Review

This document describes the current AppV2 item-sheet architecture, canonical item-type contract, and the create-time defaults path.

---

## Canonical item types

Always branch on `item.canonicalType`, not `item.type`.

Canonical runtime types:

- `skill`
- `quality`
- `lifeModule`
- `gear`
- `assetModule`
- `contact`
- `personalWeapon`
- `mechWeapon`
- `armor`

Legacy runtime inputs that are still accepted during migration:

- `weapon` -> `personalWeapon`
- `shadowamp` -> `assetModule`

The canonicalization helpers live in `src/modules/item/item-type-utils.js` and are consumed by `src/modules/item/anarchy-base-item.js`.

---

## Create-time defaults

Create defaults are resolved from an inlined JS constant in `src/modules/document-type-defaults.js`.

Important rules:

- Template composition is resolved in JavaScript before document creation.
- `Actor.prototypeToken` stays at the document root.
- Other resolved fields are placed under `system`.
- The public API remains async (`getDocumentTypeCreateDefaults`) so existing creation hooks do not need a second migration.

The inlined constant replaces both the older runtime `fetch(template.json)` path and the deprecated `template.json` Foundry mechanism.

---

## Shared item document contract

`src/modules/item/anarchy-base-item.js` is still the shared item base class. It owns:

- Canonical type remapping.
- Create-time default application.
- Default icon selection.
- Modifier mutation helpers.
- Equipped effect synchronization for supported owned items.

Effect sync remains intentionally narrow:

- `personalWeapon`
- `armor`

External code should use the document API rather than reaching directly into raw effect flags or armor fields.

---

## Shared AppV2 sheet contract

`src/modules/item/base-item-sheet.js` is the single shared AppV2 item-sheet foundation.

It provides:

- One authoritative root-template selector for item sheets.
- Incremental field syncing for simple controls.
- Full-form submission for controls that do not participate in incremental sync.
- Shared effect and modifier actions.
- Shared rich-text handling.
- Shared summary/state chip context.
- Shared layout loading through `LayoutRegistry`.

Every supported item sheet now has one authoritative root template under `templates/v2/item/`.

Root templates currently include:

- `armor-root.hbs`
- `personal-weapon-root.hbs`
- `mech-weapon-root.hbs`
- `skill.hbs`
- `quality.hbs`
- `gear.hbs`
- `contact.hbs`
- `assetModule.hbs`
- `lifeModule.hbs`

Obsolete duplicate roots such as `templates/v2/item/armor.hbs`, `templates/v2/item/mech-weapon.hbs`, and `templates/v2/item/weapon.hbs` have been removed.

---

## Layout pipeline

The active item-sheet pipeline is:

```text
templates/v2/layouts/{id}.layout.json
  -> LayoutRegistry.get(id)
  -> sheet _prepareContext() attaches context.layout
  -> templates/v2/item/{root}.hbs
  -> templates/v2/item/_item-sheet-root.hbs
  -> templates/v2/ui/layout-root.hbs
  -> layout node partials + item content partials
```

Shared layout node types are:

- `stack`
- `panel`
- `tabs`
- `accordion`
- `include`
- `hexabox`

`src/modules/layout/layout-registry.js` normalizes class lists, node templates, and nested children before the sheet renders.

---

## Item sheet status

All supported item sheets are AppV2 sheets registered through `src/modules/sheets/register-item-sheets-v2.js`.

Current sheet classes:

- `SkillItemSheet`
- `QualityItemSheet`
- `LifeModuleItemSheet`
- `GearItemSheet`
- `AssetModuleItemSheet`
- `ContactItemSheet`
- `PersonalWeaponItemSheet`
- `MechWeaponItemSheet`
- `ArmorItemSheet`

Each class has one authoritative root template. Many also attach a `LAYOUT_ID` so the root template delegates composition to a matching layout JSON file.

---

## Owned versus standalone items

Items still exist in two contexts:

- Owned: embedded in an actor.
- Standalone: world or compendium documents.

Relevant sheet flags:

- `itemSheet.isStandalone`
- `itemSheet.canUseActorControls`

Owned-only behaviors include:

- Equip/unequip.
- Primary-item toggles.
- Weapon attack affordances.
- Equipped effect synchronization.

---

## Notes for future work

- Keep branching on canonical item types only.
- Add new item-sheet behavior in AppV2 sheets, not legacy item templates.
- Keep migrations focused on converting old documents, not preserving permanent parallel runtime branches.
- When adding a new item type, give it one root template and one layout definition instead of layering duplicate templates over time.
