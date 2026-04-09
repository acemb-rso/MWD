# AppV2 Sheet Form Pattern

This note captures a sheet bug we hit during the AppV2 migration and the implementation rules we want to follow going forward.

The immediate symptom was on `personalWeapon` item sheets: editable controls changed in the UI, but the summary/header still showed old values. The root cause was not the weapon model itself. The problem was that the sheet was mixing:

- raw editable document state from `system.*`
- derived display state from `getCombatProfile()`
- inconsistent form persistence behavior

That combination made the sheet fragile.

## What went wrong

The item sheets were relying on three different update styles at once:

1. Some fields were plain named form controls like `system.damage`, `system.range.max`, and `name`.
2. Some fields were custom controls with manual handlers, such as personal weapon payloads and consumption sources.
3. Some displayed values were derived from `weaponProfile` / `getCombatProfile()`, which only reflects persisted document state.

The bug happened because the sheet assumed AppV2 would automatically persist normal named form fields without us defining an explicit form handler. That assumption was unreliable.

At the same time, a few editable controls were incorrectly rendering from derived state instead of raw document state. For example:

- editable controls must bind to `system.*`
- read-only summaries may bind to `weaponProfile`

When that boundary is violated, the DOM can show one value while the document still holds another.

## Architectural lesson

For document sheets, we need one clear rule:

- editable controls read from raw document state
- derived display reads from computed profile state
- persistence goes through the native document-sheet submit lifecycle

Do not rely on implicit AppV2 behavior when the sheet is a primary editing surface.

It is not enough to simply persist data somehow. The sheet must go through the framework's expected submission path so rerendering, document diffing, and derived context updates happen in the right order.

## What we learned after the first fix

The first refactor corrected the data-flow direction, but it still took a shortcut:

- item sheets had an explicit `form.handler`
- but that handler called `item.update(...)` directly

That fixed "data is not being saved" but it did not fully honor the `DocumentSheetV2` submission lifecycle. The result was another subtle failure mode: combat-essential fields could persist, but the hero/header display could still lag behind because the computed context was not refreshing through the exact path Foundry expects.

The correct pattern is:

- use an explicit AppV2 `form.handler`
- inside that handler, call the sheet's native submit helpers
- let `DocumentSheetV2` own preparation, processing, validation, and rerender timing

In practice, that means using:

- `_prepareSubmitData(...)`
- `_processSubmitData(...)`

instead of replacing the whole submit pipeline with a manual `document.update(...)`.

We also hit a second class of bug in the personal weapon payload editor:

- nested payload paths like `template.shape` and `areaEffect.hazard.escalation.rate`
- were being written into payload structures where parent containers were still `null`

That means there are two distinct concerns to protect:

- normal named form submission for document-backed fields
- manual nested editor safety for structured sub-doc-like payload data

## Current standard

We now use a shared AppV2 document form pattern.

### Item sheets

Base item sheets use an explicit AppV2 form handler in `src/modules/item/base-item-sheet.js`.

- `submitOnChange: true`
- `form.handler: BaseItemSheet.prototype._onSubmitForm`

`_onSubmitForm` should use the native `DocumentSheetV2` submit helpers:

- `_prepareSubmitData(...)`
- `_processSubmitData(...)`

That keeps item sheets on the same lifecycle Foundry expects for document-backed forms.

### Shared form collector

Common form parsing now lives in `src/modules/sheets/document-sheet-form.js`.

That helper is responsible for:

- collecting named inputs, selects, and textareas
- skipping disabled controls
- skipping `prose-mirror` managed fields
- coercing checkboxes, radios, and numeric values
- ignoring unchanged values

### Actor sheets

Actor sheets still use staged editing, but their staged commit path now uses the same shared collector in `src/modules/sheets/base-actor-sheet-v2.js`.

That means actor and item sheets now share the same field coercion rules even though their editing UX differs.

### Manual nested editors

Manual editors such as personal weapon payloads still need their own mutation methods. Those mutation methods must not assume all parent containers already exist.

If a manual editor writes a dotted path like:

- `template.shape`
- `template.size`
- `areaEffect.hazard.startExposure`
- `areaEffect.hazard.escalation.rate`

then it must ensure intermediate objects exist before calling `setProperty(...)`.

## Rules for future sheets

### 1. Never bind editable controls to derived view models

If a field is editable, its `value` or selected state should come from raw document data such as:

- `system.damage`
- `system.range.max`
- `system.traits`
- `name`

Do not bind editable controls to:

- `weaponProfile`
- `armorProfile`
- any other computed summary object

Those objects are for display only.

### 2. Keep derived models read-only

Computed models like `getCombatProfile()` are still correct and useful. They should power:

- summary chips
- hero/header stats
- computed labels
- roll-facing display

They should not be the backing state for form controls.

### 3. Use one explicit submit path for normal named fields

If a sheet uses normal named controls, wire them through the AppV2 form handler. Do not assume Foundry will save them the way older sheet stacks did.

For new item sheets, the default should be:

- extend `BaseItemSheet`
- use normal named form controls
- let the base AppV2 form handler route them through `_prepareSubmitData(...)` and `_processSubmitData(...)`

### 4. Keep complex nested editors on custom handlers only when necessary

Some UI sections are not plain document-form editing. Personal weapon payloads and consumption sources are good examples.

Those controls remain manual because they edit structured arrays and nested normalized state through item methods like:

- `updatePayloadField(...)`
- `updateConsumptionSourceField(...)`
- `createPayload(...)`
- `deletePayload(...)`

That is acceptable, but it should be deliberate. If a control can be represented as a normal named field, prefer the form handler path.

If a control remains manual, its updater must be responsible for:

- creating missing nested parent objects before dotted-path writes
- normalizing the edited structure after mutation
- avoiding assumptions that optional containers are already non-null

### 5. Separate raw data, normalized data, and derived data mentally

There are three different layers in play:

- raw persisted document data
- normalized data in document preparation / `_preUpdate`
- derived runtime display or resolver data

Do not collapse these into one concept when building sheets.

For items in this system:

- raw data lives on `item.system`
- normalization happens in `src/modules/item/anarchy-base-item.js`
- derived display commonly comes from methods like `getCombatProfile()`

### 6. Centralize coercion and change detection

If we need new coercion rules, add them to the shared collector instead of re-implementing them per sheet.

This keeps:

- numeric parsing
- checkbox handling
- radio selection handling
- skip rules
- change detection

consistent across future item and actor sheets.

## Practical checklist for new sheet work

Before shipping a new editable sheet:

1. Check that every editable field reads from raw document state, not a computed view model.
2. Check that normal named fields persist through the native AppV2 document-sheet submit lifecycle.
3. Check that rich text fields are either handled by the existing rich text path or intentionally excluded.
4. Check that any manual control is manual for a real reason, not by accident.
5. Check that manual nested editors create missing parent containers before calling `setProperty(...)`.
6. Check that summaries and headers read from derived state that is recomputed after document update.

## Red flags

Stop and review the design if any of these are true:

- "This editable field is easier to populate from `weaponProfile`."
- "The header updates only if the sheet rerenders, but the form might not have saved yet."
- "This new sheet mostly works without a form handler."
- "This form handler just calls `document.update(...)`; that should be close enough."
- "This nested editor looks weird, so I'll just update the DOM and not the document."
- "This dotted-path write should work even if the parent object is currently `null`."
- "This field is editable, but its displayed value comes from a computed helper."

## File references

The current implementation lives here:

- `src/modules/item/base-item-sheet.js`
- `src/modules/sheets/document-sheet-form.js`
- `src/modules/sheets/base-actor-sheet-v2.js`
- `src/modules/item/anarchy-base-item.js`

If this pattern changes later, update this document at the same time.
