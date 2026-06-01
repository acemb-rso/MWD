// src/modules/sheets/actor-sheet-support.js
// Purpose: Shared field and record builders for layout-driven actor sheets.
// How it fits: Keeps NPC, vehicle, and battlemech sheets on the same data-shaping contract.

import { buildPersonalCriticalRestrictionChips, getWeaponAttackGateReason } from "../mwd/personal-critical-gates.js";
import { getActivePersonalCrits, getPersonalSpeedState } from "../mwd/personal-criticals.js";

function readPathValue(document, path, fallback = "") {
  const value = foundry.utils.getProperty(document, path);
  return value === undefined ? fallback : value;
}

export function toNumber(value, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function stripHtml(value) {
  return String(value ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function toSnippet(value, max = 180) {
  const plain = stripHtml(value);
  if (!plain) return "";
  if (plain.length <= max) return plain;
  return `${plain.slice(0, Math.max(0, max - 3)).trim()}...`;
}

export function compactList(values = []) {
  return values
    .map(value => String(value ?? "").trim())
    .filter(Boolean);
}

export function buildSummaryStats(stats = []) {
  return stats
    .filter(stat => stat && stat.value !== undefined && stat.value !== null && String(stat.value).trim() !== "")
    .map(stat => ({
      label: String(stat.label ?? "").trim(),
      value: String(stat.value ?? "").trim(),
      emphasis: stat.emphasis ?? ""
    }));
}

export function buildDetailTags(tags = []) {
  return compactList(tags).map(label => ({ label }));
}

export function buildDetailRows(rows = []) {
  return rows
    .filter(row => row && row.value !== undefined && row.value !== null && String(row.value).trim() !== "")
    .map(row => ({
      label: String(row.label ?? "").trim(),
      value: String(row.value ?? "").trim()
    }));
}

function buildField(path, label, options = {}) {
  const {
    document = null,
    type = "text",
    value = readPathValue(document, path, type === "number" ? 0 : ""),
    displayValue = value,
    options: selectOptions = [],
    placeholder = "",
    readOnly = false,
    rows = 4,
    help = "",
  } = options;

  return {
    path,
    label,
    value,
    displayValue,
    placeholder,
    readOnly,
    rows,
    help,
    options: selectOptions,
    isText: type === "text",
    isNumber: type === "number",
    isSelect: type === "select",
    isTextarea: type === "textarea",
  };
}

export function textField(document, path, label, options = {}) {
  return buildField(path, label, { ...options, document, type: "text" });
}

export function numberField(document, path, label, options = {}) {
  return buildField(path, label, { ...options, document, type: "number" });
}

export function selectField(document, path, label, selectOptions = [], options = {}) {
  const value = options.value ?? readPathValue(document, path, "");
  const normalizedOptions = selectOptions.map(option => ({
    ...option,
    selected: option.value === value,
  }));

  return buildField(path, label, {
    ...options,
    document,
    type: "select",
    value,
    displayValue: normalizedOptions.find(option => option.selected)?.label ?? value,
    options: normalizedOptions,
  });
}

export function textareaField(document, path, label, options = {}) {
  return buildField(path, label, { ...options, document, type: "textarea" });
}

export function attributeFields(document, descriptors = []) {
  return descriptors.map(descriptor =>
    numberField(
      document,
      `system.attributes.${descriptor.key}.value`,
      descriptor.label
    )
  );
}

export function buildPersonalConditionMonitors(actor, {
  editable = false,
  tracks = [
    { id: "physical", label: "Physical", kind: "wound", status: { label: "Penalty", path: "derived.penalty" } },
    { id: "fatigue", label: "Fatigue", kind: "fatigue", status: { label: "Penalty", path: "derived.penalty" } },
    { id: "armor", label: "Armor", kind: "armor-personal", status: { label: "Resist", path: "derived.resistance" } },
  ],
} = {}) {
  const monitors = actor?.system?.monitors ?? {};

  return tracks.map(track => {
    const monitor = monitors?.[track.id] ?? {};
    const max = Math.max(0, toNumber(foundry.utils.getProperty(monitor, "max"), 0));
    const value = Math.min(Math.max(0, toNumber(foundry.utils.getProperty(monitor, "value"), 0)), max);

    return {
      id: track.id,
      label: track.label,
      kind: track.kind,
      editable: Boolean(editable),
      value,
      max,
      segments: Array.from({ length: max }, (_, index) => {
        const segmentValue = index + 1;
        return { value: segmentValue, filled: segmentValue <= value };
      }),
      status: track.status
        ? { label: track.status.label, value: toNumber(foundry.utils.getProperty(monitor, track.status.path), 0) }
        : null
    };
  });
}

export function buildPersonalCombatDashboardContext(combatSnapshot = {}, { actor = null } = {}) {
  const criticalRestrictions = actor ? buildPersonalCriticalRestrictionChips(actor) : [];
  return {
    targeting: combatSnapshot.targeting,
    rollImpact: combatSnapshot.rollImpact,
    states: combatSnapshot.states,
    effects: [
      ...(combatSnapshot.effects ?? []),
      ...criticalRestrictions.map(entry => ({
        id: `critical.${entry.id}`,
        label: `${entry.label} (${entry.reason})`,
      })),
    ],
    criticalRestrictions,
    activation: combatSnapshot.activation,
    inactiveReason: combatSnapshot.inactiveReason
  };
}

function formatSignedMeters(value) {
  const numeric = Math.trunc(Number(value ?? 0) || 0);
  return `${numeric > 0 ? "+" : ""}${numeric} m`;
}

export function buildPersonalSpeedContext(actor) {
  const speed = actor?.system?.derived?.personalCombat?.speed ?? getPersonalSpeedState(actor);
  const base = Math.max(0, Math.trunc(Number(speed?.base ?? actor?.system?.speed ?? 0) || 0));
  const modifier = Math.trunc(Number(speed?.modifier ?? 0) || 0);
  const effective = Math.max(0, Math.trunc(Number(speed?.effective ?? base + modifier) || 0));
  return {
    base,
    modifier,
    effective,
    adjusted: modifier !== 0,
    displayValue: `${effective} m`,
    modifierLabel: modifier !== 0 ? formatSignedMeters(modifier) : "",
    title: modifier !== 0 ? `Base ${base} m, criticals ${formatSignedMeters(modifier)}` : `${base} m`,
  };
}

function buildPersonalCriticalRemedySummary(crit = {}) {
  if (!crit.remedyLabel || crit.remedyKey === "none") return "";
  return `Remedy: ${crit.remedyLabel}${crit.remedyBaseDn ? ` DN ${crit.remedyBaseDn}` : ""}`;
}

export function buildPersonalActiveCriticalsContext(actor) {
  return getActivePersonalCrits(actor).map(crit => {
    const restrictions = [];
    const payload = crit.effectPayload ?? {};
    if (payload.cannotAim) restrictions.push("Cannot Aim");
    if (payload.cannotReact) restrictions.push("Cannot React");
    if (payload.cannotComplex) restrictions.push("Cannot Complex Action");
    if (payload.weaponUnequipped) restrictions.push(`Weapon Unequipped${crit.weaponName ? `: ${crit.weaponName}` : ""}`);
    return {
      ...crit,
      summary: buildPersonalCriticalRemedySummary(crit),
      restrictions: restrictions.map(label => ({ label })),
      remediable: crit.remedyKey && crit.remedyKey !== "none",
    };
  });
}

function buildArmorModifierSummary({ defenseBonus = 0, mitigationByType = {}, armorModifierLabels = {} } = {}) {
  const summary = [];
  const defense = Number(defenseBonus ?? 0) || 0;
  if (defense !== 0) summary.push(`Defense ${formatSignedValue(defense)}`);

  for (const [key, label] of Object.entries(armorModifierLabels)) {
    const value = Number(mitigationByType?.[key] ?? 0) || 0;
    if (value !== 0) summary.push(`${label} ${formatSignedValue(value)}`);
  }

  return summary.join(" | ");
}

function formatSignedValue(value) {
  const numeric = Number(value ?? 0) || 0;
  return numeric > 0 ? `+${numeric}` : `${numeric}`;
}

function formatBandValues(bands = {}, order = ["close", "near", "far", "extreme"]) {
  return order
    .map(key => {
      const value = toNumber(bands?.[key], 0);
      return `${key.charAt(0).toUpperCase() + key.slice(1)} ${value}`;
    })
    .join(" | ");
}

function formatCompactBandValues(bands = {}) {
  return ["close", "near", "far", "extreme"]
    .map(key => `${key.charAt(0).toUpperCase()}${toNumber(bands?.[key], 0)}`)
    .join(" ");
}

function formatRangeBandLabel(rangeKey = "") {
  const value = String(rangeKey ?? "").trim().toLowerCase();
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function buildQuantityTrackedInventoryRecord({
  item,
  accordionId,
  itemType,
  defaultSubtitle,
  categoryLabels = {},
  ratingLabel = "Rating",
  typeLabel = "",
  isEditable = false,
  isExpanded = false,
} = {}) {
  const quantity = Math.max(0, Math.trunc(toNumber(item?.system?.quantity ?? 1, 1)));
  const rating = Math.max(0, Math.trunc(toNumber(item?.system?.rating ?? 0, 0)));
  const tags = compactList(item?.system?.tags ?? []);
  const category = String(item?.system?.category ?? "").trim();
  const categoryLabel = categoryLabels[category] ?? category;
  const relatedSkill = String(item?.system?.relatedSkill ?? "").trim();
  const availability = String(item?.system?.availability ?? "").trim();
  const rulesHook = String(item?.system?.rulesHook ?? "").trim();

  return {
    id: item.id,
    itemType,
    isGear: itemType === "gear",
    isConsumable: itemType === "consumable",
    accordionId,
    isExpanded,
    name: item.name,
    img: item.img,
    subtitle: categoryLabel || defaultSubtitle,
    summaryStats: buildSummaryStats([
      { label: "Qty", value: quantity, emphasis: "strong" },
      { label: ratingLabel, value: rating },
      { label: "Avail", value: availability }
    ]),
    detailTags: buildDetailTags([
      typeLabel,
      ...tags,
      item?.system?.inactive ? "Inactive" : ""
    ]),
    detailRows: buildDetailRows([
      { label: "Quantity", value: quantity },
      { label: ratingLabel, value: rating },
      { label: "Related Skill", value: relatedSkill },
      { label: "Availability", value: availability },
      { label: "Rules Hook", value: rulesHook },
      { label: "Source", value: item?.system?.sourceReference ?? "" },
      { label: "Category", value: categoryLabel },
      { label: "Tags", value: tags.join(", ") }
    ]),
    detailText: toSnippet(item?.system?.description || rulesHook),
    quantity,
    canAdjustQuantity: isEditable
  };
}

export function buildPersonalInventoryContext(actor, {
  items = {},
  isEditable = false,
  isExpanded = () => false,
  inventoryAccordionId = (section, itemId) => `${String(section ?? "").trim()}:${String(itemId ?? "").trim()}`,
  armorModifierLabels = {},
  gearCategoryLabels = {},
  consumableCategoryLabels = {},
} = {}) {
  const loadout = actor?.getPersonalCombatLoadout?.() ?? { warnings: [], weapons: [], armor: [] };

  return {
    warnings: [...(loadout?.warnings ?? [])],
    weapons: (loadout?.weapons ?? []).map(weapon => {
      const accordionId = inventoryAccordionId("weapons", weapon.id);
      const usesPayloads = String(weapon?.category ?? "").trim().toLowerCase() !== "melee";
      const payloadTracked = Boolean(weapon?.sourceState?.isTracked);
      const payloadName = String(weapon?.payloadLabel ?? "").trim() || "Unloaded";
      const payloadCount = usesPayloads && payloadTracked
        ? `${toNumber(weapon?.sourceState?.current, 0)}/${toNumber(weapon?.sourceState?.max, 0)}`
        : "";
      const payloadDetail = usesPayloads
        ? (payloadTracked ? `${payloadName} ${payloadCount}` : payloadName)
        : "";
      const payloadTag = usesPayloads
        ? (payloadTracked ? `Payload ${payloadCount}` : `Payload ${payloadName}`)
        : "";
      const cqBands = formatBandValues(weapon.attackRatingBand);
      const cqBandsCompact = formatCompactBandValues(weapon.attackRatingBand);
      const attackGateReason = getWeaponAttackGateReason(actor, weapon);
      const attackDisabledReason = !weapon.equipped
        ? "Equip to attack"
        : attackGateReason;

      return {
        id: weapon.id,
        accordionId,
        isExpanded: isExpanded(accordionId),
        name: weapon.name,
        img: weapon.img,
        subtitle: weapon.skillDef?.label ?? weapon.category ?? "",
        summaryStats: buildSummaryStats([
          { label: "DV", value: toNumber(weapon.damage, 0), emphasis: "strong" },
          { label: "AP", value: toNumber(weapon.ap, 0) },
          { label: "Type", value: weapon.damageTypeLabel ?? weapon.damageType ?? "" },
          { label: "CQ", value: cqBandsCompact }
        ]),
        detailTags: buildDetailTags([
          weapon.equipped ? "Equipped" : "",
          weapon.isPrimary ? "Primary" : "",
          payloadTag,
          ...compactList(weapon.traits ?? [])
        ]),
        detailRows: buildDetailRows([
          { label: "Skill", value: weapon.skillDef?.label ?? weapon.skill ?? "" },
          { label: "Category", value: weapon.category ?? "" },
          { label: "Damage Type", value: weapon.damageTypeLabel ?? weapon.damageType ?? "" },
          { label: "Max Range", value: formatRangeBandLabel(weapon.range?.max ?? weapon.defaultRangeBand ?? "") },
          { label: "CQ Bands", value: cqBands },
          { label: "Payload", value: payloadDetail },
          { label: "Traits", value: compactList(weapon.traits ?? []).join(", ") }
        ]),
        detailText: toSnippet(weapon.notes),
        equipped: Boolean(weapon.equipped),
        attackDisabled: Boolean(attackDisabledReason),
        attackDisabledReason,
        isPrimary: Boolean(weapon.isPrimary),
        attackUuid: weapon.uuid ?? "",
        attackRoll: JSON.stringify({
          intent: "attack",
          weaponId: weapon.id,
          payloadId: weapon?.payloadState?.activePayloadId ?? "",
          edge: { pool: "physical.grit", allowed: ["pre", "post"] },
          tags: ["combat", "attack"]
        })
      };
    }),
    armor: (loadout?.armor ?? []).map(armor => {
      const activeArmor = loadout?.activeArmor?.id === armor.id ? loadout.activeArmor : null;
      const accordionId = inventoryAccordionId("armor", armor.id);
      const reinforcedMax = toNumber(activeArmor?.traitState?.reinforced?.max ?? armor?.traitState?.reinforced?.max, 0);
      const availability = String(armor?.availability ?? armor?.system?.availability ?? "").trim();
      const reinforcedLabel = reinforcedMax > 0
        ? `${toNumber(activeArmor?.traitState?.reinforced?.current ?? armor?.traitState?.reinforced?.current, 0)}/${reinforcedMax}`
        : "";
      const modifierSummary = buildArmorModifierSummary({
        defenseBonus: armor.defenseBonus,
        mitigationByType: activeArmor?.mitigationByType ?? activeArmor?.typedMitigation ?? armor.mitigationByType ?? {},
        armorModifierLabels
      });

      return {
        id: armor.id,
        accordionId,
        isExpanded: isExpanded(accordionId),
        name: armor.name,
        img: armor.img,
        subtitle: armor.tags?.length ? armor.tags.join(", ") : "Armor",
        summaryStats: buildSummaryStats([
          { label: "Rating", value: toNumber(activeArmor?.ratingCurrent ?? armor.rating, 0), emphasis: "strong" },
          { label: "Res", value: toNumber(activeArmor?.baseMitigation ?? activeArmor?.baseResistance, 0) },
          { label: "Def", value: toNumber(armor.defenseBonus, 0) },
          { label: "Dur", value: `${toNumber(activeArmor?.durability?.current ?? armor.durability?.current, 0)}/${toNumber(activeArmor?.durability?.max ?? armor.durability?.max, 0)}` }
        ]),
        detailTags: buildDetailTags([
          armor.equipped ? "Equipped" : "",
          armor.isPrimary ? "Primary" : "",
          availability,
          reinforcedLabel ? `Reinforced ${reinforcedLabel}` : "",
          ...compactList(armor.traits ?? [])
        ]),
        detailRows: buildDetailRows([
          { label: "Availability", value: availability },
          { label: "Modifiers", value: modifierSummary },
          { label: "Traits", value: compactList(armor.traits ?? []).join(", ") },
          { label: "Tags", value: compactList(armor.tags ?? []).join(", ") }
        ]),
        detailText: toSnippet(armor.notes),
        equipped: Boolean(armor.equipped),
        isPrimary: Boolean(armor.isPrimary),
      };
    }),
    gear: (items?.gear ?? []).map(item => {
      const accordionId = inventoryAccordionId("gear", item.id);
      return buildQuantityTrackedInventoryRecord({
        item,
        accordionId,
        itemType: "gear",
        defaultSubtitle: "Gear",
        categoryLabels: gearCategoryLabels,
        ratingLabel: "Rating",
        isEditable,
        isExpanded: isExpanded(accordionId),
      });
    }),
    consumables: (items?.consumable ?? []).map(item => {
      const accordionId = inventoryAccordionId("consumables", item.id);
      return buildQuantityTrackedInventoryRecord({
        item,
        accordionId,
        itemType: "consumable",
        defaultSubtitle: "Consumable",
        categoryLabels: consumableCategoryLabels,
        ratingLabel: "Potency",
        typeLabel: "Consumable",
        isEditable,
        isExpanded: isExpanded(accordionId),
      });
    })
  };
}

// Actor sheets mostly need compact item rows with a predictable set of actions.
// We build those rows once here so the partials stay declarative.
export function collectActorItemRecords(actor, {
  types = [],
  includeTypes = [],
  describe = item => "",
  supportsEquip = false,
  supportsPrimary = false,
  supportsAttack = false,
} = {}) {
  const acceptedTypes = new Set([...(types ?? []), ...(includeTypes ?? [])].map(value => String(value ?? "").trim()));

  return Array.from(actor?.items ?? [])
    .filter(item => acceptedTypes.has(String(item?.canonicalType ?? item?.type ?? "").trim()))
    .sort((left, right) => String(left.name ?? "").localeCompare(String(right.name ?? "")))
    .map(item => ({
      id: item.id,
      name: item.name || "Item",
      subtitle: String(describe(item) ?? "").trim(),
      equipped: Boolean(item.system?.equipped),
      isPrimary: Boolean(item.system?.isPrimary),
      supportsEquip,
      supportsPrimary,
      supportsAttack: supportsAttack && Boolean(item.isPersonalWeapon?.()),
    }));
}
