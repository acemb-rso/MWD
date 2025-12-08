export const formatString = (template, values = {}) =>
    template.replace(/\{(.*?)\}/g, (_, key) => values[key] ?? "");
