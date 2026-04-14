// src/modules/sheets/actor-sheet-support.js
// Purpose: Shared field and record builders for layout-driven actor sheets.
// How it fits: Keeps NPC, vehicle, and battlemech sheets on the same data-shaping contract.

function readPathValue(document, path, fallback = "") {
  const value = foundry.utils.getProperty(document, path);
  return value === undefined ? fallback : value;
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
