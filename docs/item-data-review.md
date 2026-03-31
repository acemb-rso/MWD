# Item data model review

> **Status:** Current as of the AppV2 item sheet migration. `Items.txt` in this folder is the raw schema spec; this document covers design decisions, canonical contracts, and the sheet architecture.

---

## Item types and canonical type keys

The following types are registered in `template.json` and `system.json`. The canonical key is what the document class reports via `item.canonicalType`.

| Canonical type | Description | Document class |
|----------------|-------------|----------------|
| `skill` | Skills with attribute link and specializations | `SkillItem` |
| `quality` | Traits / qualities authored as item-backed rule packets | `QualityItem` |
| `lifeModule` | Background/character-creation modules | `LifeModuleItem` |
| `gear` | Generic inventory items | `GearItem` |
| `assetModule` | Character-scale shadowamps/modules | `AssetModuleItem` |
| `contact` | NPC contacts with loyalty/connection | `ContactItem` |
| `personalWeapon` | Character-scale weapons | `WeaponItem` |
| `mechWeapon` | Mech-scale weapons | `WeaponItem` |
| `armor` | Personal armor | `ArmorItem` |

**Legacy type remapping** — handled in `MWDItem.getCanonicalType()`: 【F:src/modules/item/anarchy-base-item.js†L10-L20】
- `weapon` → `personalWeapon` (Anarchy-era legacy type)
- `shadowamp` → `assetModule` (Anarchy-era legacy type)

Always read `item.canonicalType` (not `item.type`) when branching on item type. The raw `item.type` may be a legacy key for documents that predate the rename.

---

## Common data model (all items)

All item types in `template.json` compose from three reusable template segments. Whether a given type opts in is declared per-type in `template.json`. 【F:template.json†L413-L425】

| Template | Field | Notes |
|----------|-------|-------|
| `modifiers` | `system.modifiers[]` | Modifier array; see Modifier system below |
| `inactive` | `system.inactive: boolean` | "Inactive for actor" toggle; only meaningful on owned items |
| `references` | `system.description: string` | Rich-text description (enriched in sheets) |
| | `system.sourceReference: string` | Book/page reference |
| | `system.gmnotes: string` | GM-only notes |

The `references` template is the canonical home for all descriptive text. Do not add separate `notes` or `text` fields to new item types — use `description`.

---

## Personal weapon schema

`template.json` lines ~482-506. Inherits `modifiers`, `inactive`, `references`.

```json
{
  "equipped": false,
  "isPrimary": false,
  "category": "ranged",
  "skill": "firearms",
  "damage": 0,
  "ap": 0,
  "damageType": "ballistic",
  "attackRatingBand": { "close": 0, "near": 0, "far": 0, "extreme": 0 },
  "range": { "max": "near", "close": 0, "near": 0, "far": 0, "extreme": 0 },
  "traits": [],
  "notes": ""
}
```

`category`: `"melee" | "ranged" | "thrown" | "other"`. `skill` is a skill code; it drives defense derivation in the roll engine.

`prepareBaseData()` normalizes all fields: booleans coerced, strings trimmed with fallbacks, `traits` parsed from CSV or array, `ap` falls back to legacy `armorPiercing`.

**Canonical combat API** (`WeaponItem`): 【F:src/modules/item/weapon-item.js†L1-L80】

| Method | Returns |
|--------|---------|
| `getCombatProfile()` | Full weapon data for the roll engine |
| `getDamage()` | `{value, monitor, damageType, damageTypeLabel, noArmor, armorMode}` |
| `getDamageCode()` | Display string e.g. `"STR/2 + 4"` |
| `getWeaponSkill()` | Resolved skill from actor, world compendium, or defaults |
| `getDefense()` | Fixed defense code derived from skill, or `undefined` |
| `getDefaultRangeBand(range)` | Preferred range: near > close > far > extreme |
| `getRanges()` | `[{value, labelkey}]` filtered to max range |

---

## Armor schema

`template.json` lines ~507-525. Inherits `modifiers`, `inactive`, `references`. 【F:src/modules/item/armor-item.js†L1-L77】

```json
{
  "equipped": false,
  "isPrimary": false,
  "rating": 0,
  "defenseBonus": 0,
  "mitigation": { "ballistic": 0, "energy": 0, "explosive": 0, "melee": 0 },
  "durability": { "current": 0, "max": 0 },
  "traits": [],
  "notes": ""
}
```

**Canonical API:**

| Method | Returns |
|--------|---------|
| `getArmorProfile({actor})` | `{id, uuid, name, img, type, item, actor, equipped, isPrimary, rating, defenseBonus, mitigation, durability, traits, notes}` |

`ActorDamageManager` calls `getArmorProfile()` to look up mitigation during damage application. Do not access armor fields directly from outside the item.

---

## Modifier system

Items that include the `modifiers` template expose a mutation API. The modifier object shape: 【F:src/modules/item/anarchy-base-item.js†L512-L578】

```javascript
{
  id: string,        // Reindexed on every mutation — never cache IDs
  group: string,     // "roll" | "attribute" | "monitor" | "other"
  effect: string,    // Effect type within group
  category: string,  // Category within effect
  subCategory: string,
  value: number,
  condition: string  // Activation condition/label
}
```

**Mutation API** (all async):

| Method | Description |
|--------|-------------|
| `createModifier(defaults?)` | Appends new modifier |
| `deleteModifier(id)` | Removes by ID |
| `changeModifierSelection(id, select, value)` | Updates group/effect/category/subCategory with cascading resets |
| `changeModifierValue(id, value)` | Updates numeric value |
| `changeModifierCondition(id, value)` | Updates condition text |

Cascading reset rule: changing `group` resets effect + category + subCategory; changing `category` resets subCategory. This is enforced in `_mutateModifiers()`.

Modifier IDs are reindexed on every save. External code must not hold IDs across async boundaries.

---

## Equipped effect synchronization

Supported by: `personalWeapon`, `armor`. 【F:src/modules/item/anarchy-base-item.js†L387-L490】

When an item is embedded in an actor **and** `system.equipped = true`, its embedded `ActiveEffect` documents are copied to the actor as synced effects. When the item is unequipped or removed, the synced effects are deleted.

**Guards:**

| Method | Description |
|--------|-------------|
| `supportsEquippedEffectSync()` | `true` for personalWeapon and armor |
| `shouldApplyEquippedEffects()` | `true` if equipped, owned, and supports sync |
| `getSyncedActorEffects({actor})` | Returns effects on actor with `flags.mwd.equippedItemSync` |
| `syncEquippedActorEffects({actor})` | Copies/removes effects as needed |
| `removeSyncedActorEffects({actor})` | Removes all synced copies |

Synced effects are flagged `flags.mwd.equippedItemSync = {synced: true, sourceItemId, sourceEffectId}` and prefixed with the item name. Do not remove or modify these effects directly — always go through the sync API.

---

## Sheet architecture

### Base sheet (`BaseItemSheet`)

Extends `HandlebarsApplicationMixin(ItemSheetV2)`. All item sheets inherit from this class. 【F:src/modules/item/base-item-sheet.js†L1-L80】

**Key static properties:**

```javascript
static LAYOUT_ID = null;      // Override in subclass to enable layout-driven rendering
static DEFAULT_OPTIONS = { position: { width: 600, height: "auto" }, ... };
static TABS = { primary: { initial: "main", tabs: ["main", "modifiers", "effects"] } };
```

**`_prepareContext()` provides:** `item`, `system`, `enrichedDescription`, `enrichedGMNotes`, `ENUMS`, `MWD`, `cssClass`, `tabs`, and an `itemSheet` object:

```javascript
itemSheet: {
  canonicalType,
  typeLabel,
  isStandalone,          // true when item is not owned by any actor
  canUseActorControls,   // true when item is owned
  supportsEffectSync,    // true for personalWeapon, armor
  effectEntries[],       // Metadata for each embedded ActiveEffect
  summaryChips[],        // Type-specific chips (override _getSummaryChips)
  stateChips[]           // Equipped/Primary/Effects chips (auto-derived)
}
```

If `LAYOUT_ID` is set, `_prepareContext` also fetches the layout and attaches it as `context.layout` via `LayoutRegistry.get(LAYOUT_ID)`. 【F:src/modules/layout/layout-registry.js†L1-L83】

### Layout-driven item sheets

`personalWeapon` and `armor` use the JSON layout system. The pipeline mirrors the character sheet exactly:

```
[item-type].layout.json         ← templates/v2/layouts/
  ↓ LayoutRegistry.get()
PersonalWeaponItemSheet         ← LAYOUT_ID = "personal-weapon"
  ↓ _prepareContext → ctx.layout
personal-weapon-root.hbs        ← PARTS entry point
  ↓ _item-sheet-root.hbs        ← block partial: header + shell
    ↓ layout-root.hbs → node type templates (tabs, accordion, stack, panel, include)
      ↓ weapon-main.hbs         ← content partial (Details tab)
      ↓ modifiers.hbs           ← content partial (Modifiers tab)
      ↓ item-effects.hbs        ← content partial (Effects tab)
```

Layout JSON format: `templates/v2/layouts/{id}.layout.json`. Node types: `stack`, `panel`, `tabs`, `accordion`, `include`. These are the same node types used by the character sheet — no item-specific node types exist.

**To add a new layout-driven item sheet:**
1. Create `templates/v2/layouts/{type}.layout.json`
2. Create `templates/v2/item/{type}-root.hbs` (copy `personal-weapon-root.hbs`)
3. Create `templates/v2/item/parts/{type}-main.hbs` for the main content
4. Set `static LAYOUT_ID = "{type}"` on the sheet class
5. Update `PARTS.sheet.template` to `{type}-root.hbs`
6. Add all new `.hbs` files to `preload-templates.js`

Item types that do not yet have a layout JSON continue to use direct `.hbs` templates selected by `BaseItemSheet._getPartTemplate()`.

### Shared partials

| Alias | File | Purpose |
|-------|------|---------|
| `mwd.v2.item.parts.itemname` | `parts/itemname.hbs` | Name input in sheet header |
| `mwd.v2.item.parts.inactive` | `parts/inactive.hbs` | "Inactive for actor" checkbox (owned items only) |
| `mwd.v2.item.parts.references` | `parts/references.hbs` | Source, description editor, GM notes |
| `mwd.v2.item.parts.modifiers` | `parts/modifiers.hbs` | Full modifier editor |
| `mwd.v2.item.parts.item-effects` | `parts/item-effects.hbs` | Active Effects editor with sync status |

`inactive.hbs` renders only when `options.isOwned` is true. `references.hbs` GM notes block renders only when `options.isGM` is true.

---

## Owned vs standalone items

Items exist in two contexts: embedded in an actor ("owned") and in the world or a compendium ("standalone").

| Context | `item.actor` | `isStandalone` | `canUseActorControls` |
|---------|-------------|----------------|-----------------------|
| Owned | actor reference | `false` | `true` |
| Standalone | `null` | `true` | `false` |

Equip/unequip, isPrimary toggles, the attack button, and effect sync only apply to owned items. Sheet templates gate these controls on `itemSheet.canUseActorControls`. The `inactive` toggle is likewise owned-only.

---

## Sheet registration

Registered in `register-item-sheets-v2.js` via `foundry.documents.collections.Items.registerSheet()`. 【F:src/modules/sheets/register-item-sheets-v2.js†L1-L34】

`PersonalWeaponItemSheet` handles both `personalWeapon` and the legacy `weapon` type so that pre-rename documents open correctly.

---

## Known gaps

| Item type | Sheet status | Notes |
|-----------|-------------|-------|
| `skill` | Direct `.hbs` template | No layout JSON yet |
| `quality` | Direct `.hbs` template | No layout JSON yet |
| `gear` | Direct `.hbs` template | No layout JSON yet |
| `contact` | Direct `.hbs` template | No layout JSON yet |
| `assetModule` | Direct `.hbs` template | No layout JSON yet |
| `lifeModule` | Direct `.hbs` template | No layout JSON yet |
| `mechWeapon` | Direct `.hbs` template | No layout JSON yet |
| `personalWeapon` | ✅ Layout-driven | `personal-weapon.layout.json` |
| `armor` | ✅ Layout-driven | `armor.layout.json` |

The old `templates/v2/item/personal-weapon.hbs` is dead code — `PersonalWeaponItemSheet.PARTS` no longer references it. It can be deleted.
