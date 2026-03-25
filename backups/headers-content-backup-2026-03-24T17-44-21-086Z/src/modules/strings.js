// src/modules/strings.js
// Purpose: System module or client script for strings. Integrates with the system's JavaScript modules.

export const formatString = (template, values = {}) =>
    template.replace(/\{(.*?)\}/g, (_, key) => values[key] ?? "");
