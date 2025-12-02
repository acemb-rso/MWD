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

    const descriptor = Object.getOwnPropertyDescriptor(handlebars, "loadTemplates");
    const canPatch = !descriptor || descriptor.writable || descriptor.set || descriptor.configurable;

    if (handlebars.loadTemplates.__mwdGuarded) {
      TemplateGuards._guardedLoader = handlebars.loadTemplates;
      return;
    }

    const guardedLoader = TemplateGuards._createGuardedLoader(handlebars.loadTemplates, handlebars);

    TemplateGuards._guardedLoader = guardedLoader;

    if (!canPatch) {
      console.warn(`${LOG_HEAD}TemplateGuards skipped; handlebars.loadTemplates is read-only.`);
      return;
    }

    handlebars.loadTemplates = guardedLoader;
    handlebars.loadTemplates.__mwdGuarded = true;
  }

  static async loadTemplates(paths = [], options = {}) {
    const handlebars = foundry.applications?.handlebars;
    const loader = handlebars?.loadTemplates;

    if (!loader) {
      console.warn(`${LOG_HEAD}TemplateGuards loadTemplates skipped; no handlebars loader found.`);
      return [];
    }

    const guardedLoader = TemplateGuards._guardedLoader
      ?? (loader.__mwdGuarded ? loader : TemplateGuards._createGuardedLoader(loader, handlebars));

    TemplateGuards._guardedLoader = guardedLoader;

    return guardedLoader(paths, options);
  }

  static _createGuardedLoader(loader, handlebars) {
    const originalLoadTemplates = loader?.bind(handlebars);

    const guardedLoadTemplates = async function guardedLoadTemplates(paths = [], options = {}) {
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

    guardedLoadTemplates.__mwdGuarded = true;

    return guardedLoadTemplates;
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
