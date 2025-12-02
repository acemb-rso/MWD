import { LOG_HEAD } from "./constants.js";

/**
 * Hardens Handlebars template loading by stripping null/empty paths and emitting
 * diagnostics to catch unexpected callers that hand invalid values to
 * loadTemplates. This prevents the native loader from trying to run
 * `startsWith` against a null path while still letting valid entries load.
 */
export class TemplateGuards {

  static install() {
    const handlebars = foundry.applications?.handlebars;
    if (!handlebars?.loadTemplates) {
      console.warn(`${LOG_HEAD}TemplateGuards skipped; no handlebars loader found.`);
      return;
    }

    if (handlebars.loadTemplates.__mwdGuarded) return;

    const originalLoadTemplates = handlebars.loadTemplates.bind(handlebars);

    handlebars.loadTemplates = async function guardedLoadTemplates(paths = [], options = {}) {
      const { normalized, stripped } = TemplateGuards._normalize(paths);

      if (stripped.length) {
        console.warn(`${LOG_HEAD}Stripping invalid template paths before loadTemplates`, {
          paths,
          normalized,
          stripped,
          caller: options?.label ?? null,
          stack: new Error("loadTemplates invalid input").stack
        });
      }

      if (!normalized.length) return [];

      return originalLoadTemplates(normalized, options);
    };

    handlebars.loadTemplates.__mwdGuarded = true;
  }

  static _normalize(paths) {
    const candidates = Array.isArray(paths) ? paths : [paths];
    const normalized = [];
    const stripped = [];

    for (const path of candidates) {
      const trimmed = typeof path === "string" ? path.trim() : path;
      const valid = typeof trimmed === "string" && trimmed.length > 0;
      (valid ? normalized : stripped).push(path);
    }

    return { normalized, stripped };
  }
}
