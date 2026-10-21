# Destiny vs. Third-Party Sheet Layouts

## Availability of third-party references
The repository does not currently include the `/third-party` directory referenced for the original Shadowrun: Anarchy templates, so a file-by-file comparison cannot be performed in-tree. If those templates are added, we can directly diff the markup and CSS scaffolding.

## Observations on the current Destiny templates
* **Everything is stacked in one long column.** The character sheet streams attributes, words, skills, items, monitors, edge pools, cyberdecks, and descriptions sequentially inside a single `<section>` without columnar scaffolding or tabbing. This means every partial expands to full width and wraps based on its own internal flex rules instead of fitting a consistent grid.
* **Monitor rows mix disparate widgets.** The character sheet’s `monitors-row` packs armor, physical, fatigue, six separate edge pools, and the Anarchy block into one flex row; as soon as any label grows, the row wraps unpredictably and the blocks end up jagged.
* **Battlemech sheets follow the same pattern.** The mech layout repeats the stacked `section-group` pattern for quick actions, attributes, multiple monitor blocks, hardpoints, weapon groups, loadouts, and weapons, so nothing is grouped into stable columns.
* **Shared flex rules amplify the sprawl.** Global sheet styles force every `.section-group` to flex and wrap, but without fixed bases or max widths for the children, wide labels or long lists push each other around, producing uneven spacing instead of the fixed grids seen in more structured templates.

## Why the Destiny layouts feel less clean
Because the Destiny templates rely on a single long flow with broadly applied flex-and-wrap rules, each partial sizes itself independently. Without the tighter column and grid scaffolding that the original Anarchy sheets used, the Destiny layouts are more prone to wrapping, uneven widths, and jagged alignment when content length varies.
