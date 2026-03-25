import { LOG_HEAD } from "./constants.js";

/**
 * Hardens Handlebars template loading by stripping null/empty paths and emitting
 * diagnostics to catch unexpected callers that hand invalid values to
 * loadTemplates. This prevents the native loader from trying to run
 * `startsWith` against a null path while still letting valid entries load.
 */
export class TemplateGuards {
  static install() {
    // In Foundry V12+, loadTemplates is on globalThis, not on handlebars object
    if (!globalThis.loadTemplates) {
      console.warn(`${LOG_HEAD}TemplateGuards skipped; no loadTemplates found.`);
      return;
    }
    
    if (globalThis.loadTemplates.__mwdGuarded) {
      console.debug(`${LOG_HEAD}TemplateGuards already installed.`);
      return;
    }

    const originalLoadTemplates = globalThis.loadTemplates;

    // Define the wrapped function
    const guardedLoadTemplates = async function(paths = [], options = {}) {
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

    // Mark as guarded
    guardedLoadTemplates.__mwdGuarded = true;

    // Use Object.defineProperty to override even if the property is non-writable
    try {
      Object.defineProperty(globalThis, 'loadTemplates', {
        value: guardedLoadTemplates,
        writable: true,
        configurable: true
      });
      console.log(`${LOG_HEAD}TemplateGuards installed successfully.`);
    } catch (error) {
      console.error(`${LOG_HEAD}Failed to install TemplateGuards:`, error);
      // Fall back to direct assignment (might fail but worth trying)
      try {
        globalThis.loadTemplates = guardedLoadTemplates;
      } catch (e) {
        console.error(`${LOG_HEAD}Cannot override loadTemplates - it may be frozen.`);
      }
    }
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
