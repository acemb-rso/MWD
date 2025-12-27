MWD Layout JSON Style Guide (v2)
1. Purpose and scope

The layout JSON defines structure only:

what appears

in what order

in which grouping container (stack, tabs, panel)

which partials are included

It does not define:

data logic

roll logic

conditional behavior

actor-type rules (those belong in sheet selection / renderer mapping)

2. Golden rules

Deterministic rendering
If it’s not in the layout JSON, it doesn’t render. No hidden “ifs.”

Layout stays structural
Use CSS classes for styling; avoid encoding presentation rules into layout structure beyond grouping.

One responsibility per node

panel = chrome + title + padding + border

include = render one partial

stack = vertical grouping

tabs = tab grouping

Never bury global components in tabs
Top-band components (Attributes, Edge console, Condition Monitors) belong above tabs.

3. Canonical UI structure

Character sheet layout (canonical):

root (stack)
  ├─ topband (stack)    <-- always visible / sets minimum viable window
  │    ├─ Attributes (panel + include)
  │    ├─ Edge (panel + include)
  │    └─ Condition Monitors (panel + include)
  └─ tabs (tabs)
       ├─ Combat Readiness (panels/includes)
       ├─ Inventory
       ├─ Assigned Systems
       └─ Bio


Actor-type rule: Condition Monitors are actor-type defining and must never leak across actor types.
So: character topband includes only character monitors (Physical/Fatigue/Armor).

4. Node types: contract and usage
stack

Vertical container. Use it to group siblings in order.

Required:

type: "stack"
Optional:

classes: string[]

children: node[]

panel

A titled UI section. A panel should almost always contain includes or nested layout groups.

Required:

type: "panel"

title: string

children: node[]
Optional:

classes: string[]

include

Renders exactly one Handlebars partial by alias.

Required:

type: "include"

partial: string (alias)
Optional:

label: string (dev readability only)

classes: string[]

Rule: include nodes should be leaf nodes (don’t give them children).

tabs

Defines tabbed content. Currently you’re using renderMode: "stack" and CSS-only default tab selection.

Required:

type: "tabs"

group: string (e.g., "primary")

default: string (tab id)

tabs: tab[]
Optional:

renderMode: "stack"

classes: string[]

Tab object:

id: string

label: string

children: node[]

5. Naming conventions
IDs

Sheet layout id matches actor type: character, vehicle, battlemech, npc.

CSS classes

Layout structural classes start with csb- or character-layout.

Region classes: csb-topband, csb-topband__attributes, csb-topband__edge, csb-topband__monitors.

Partials

Prefer aliased partials: mwd.v2.* (per your preload aliasing system)

Placeholders: mwd.v2.ui.placeholders.*

6. Formatting rules (so diffs stay readable)

One property per line

Arrays written vertically:

"classes": [
  "csb-layout",
  "character-layout"
]


Keep ordering consistent:

type

title/label/id (as applicable)

group/default/renderMode (tabs)

classes

children/tabs

Avoid “inline objects” in arrays unless it’s a single short include. Prefer expanded formatting.

7. Placeholders and migration rules

Placeholders are allowed when:

the component exists structurally but UI isn’t implemented yet

you want the sheet “first-open” to be stable while internals evolve

Placeholder partials must:

render a visible box

be non-interactive

have a unique class hook for future replacement

When you replace a placeholder:

keep the layout node in place

swap only the partial alias

8. Tabs behavior (current “no JS” stance)

Right now:

only the default tab is displayed (CSS selects via data-default)

other tabs are visually present but do not switch

This is acceptable during “first-open styling” phase.

When enabling tab switching:

prefer letting Foundry’s tab mechanism handle it (AppV2-friendly)

ensure the layout renderer emits compatible markup (nav.tabs / .tab panels) OR adapts its output to Foundry’s expectations

9. Validation checklist (before committing a layout change)

 Topband exists for the actor type

 Attributes included in topband (character)

 Edge console included in topband

 Condition monitors included in topband (actor-type specific)

 No monitors inside Combat tab

 Inventory uses mwd.actor.parts.gears and mwd.actor.parts.weapons

 Partials referenced are valid aliases (preloaded / registered)

 JSON is valid (no comments, no trailing commas)

10. Known failure modes

Wrong alias → partial renders blank or throws

Missing children on stack/panel → renderer errors or silent empty section

Monitors in wrong actor layout → leaks UI across actor types (explicitly disallowed)

Tabs markup mismatch → “tabs look right but don’t switch” (expected for now)