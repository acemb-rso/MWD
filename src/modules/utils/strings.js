// src/modules/strings.js
// Purpose: Defines helper or exported constant `formatString`.
// How it fits: Describes role within src/modules or template rendering pipeline.


export const formatString = (template, values = {}) =>
    template.replace(/\{(.*?)\}/g, (_, key) => values[key] ?? "");
