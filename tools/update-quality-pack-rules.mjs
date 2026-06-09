import { promises as fs } from "fs";
import path from "path";
import { compilePack } from "@foundryvtt/foundryvtt-cli";

const OUT_DIR = path.resolve("src/packs/qualities");
const PACK_DIR = path.resolve("packs/qualities");

const LEGACY_PHASE_TO_RULE_PHASE = Object.freeze({
  onBuildRoll: "rollBuild",
  onBeforeBurnApplied: "burn",
  onBeforeActionCostFinalized: "actionCost",
  onDamageResolved: "personalDamage",
  onDerivedPersonalCombat: "derivedPersonalCombat",
  onAttackRatingResolved: "personalAttackRating",
  onDefenseRatingResolved: "personalDefenseRating",
  onActivationBudgetResolved: "activationBudget",
  onConditionPenaltyResolved: "conditionPenalty",
  onInitiativeResolved: "initiative",
  onEdgeGain: "edgeEvent",
  onEndOfActivation: "endOfActivation",
});

function compactObject(value = {}) {
  return Object.fromEntries(
    Object.entries(value).filter(([, entry]) => {
      if (entry === undefined || entry === null || entry === "") return false;
      if (Array.isArray(entry) && !entry.length) return false;
      if (typeof entry === "object" && !Array.isArray(entry) && !Object.keys(entry).length) return false;
      return true;
    }),
  );
}

function nonZeroLimits(limits = {}) {
  return compactObject({
    perActivation: Number(limits.perActivation) || undefined,
    perRound: Number(limits.perRound) || undefined,
    perScene: Number(limits.perScene) || undefined,
  });
}

function modeFromEffect(effect = {}) {
  if (effect.application === "optional") return "optional";
  if (effect.application === "triggered") return "triggered";
  return "automatic";
}

function selectorFromEffect(effect = {}) {
  const selector = String(effect.selector ?? "").trim();
  const skillIds = Array.isArray(effect.skillKeys)
    ? effect.skillKeys.map(entry => String(entry ?? "").trim()).filter(Boolean)
    : [];
  const tags = selector ? [selector] : [];
  if (!skillIds.length) return compactObject({ tags });
  return compactObject({ tags, skillIds });
}

function trackFromSelector(selector = "") {
  const text = String(selector ?? "").trim();
  if (text.includes("fatigue")) return "fatigue";
  if (text.includes("physical")) return "physical";
  return "";
}

function actionIdFromSelector(selector = "") {
  return String(selector ?? "").trim().replace(/^action\./, "");
}

function outputFromEffect(item, effect = {}) {
  const label = effect.label || item.name;
  const value = Number(effect.value) || 0;
  const id = effect.id || `${item._id}.${effect.type}`;
  switch (effect.type) {
    case "rollMod":
      return [{ type: "dicePart", id: `${id}.dice`, label, value }];
    case "burnAdjust":
      return [{
        type: "burnRuleAdjustment",
        id: `${id}.burn`,
        label,
        trigger: effect.selector,
        value,
        min: effect.min,
        max: effect.max,
      }];
    case "actionCostMod":
      return [{
        type: "actionCostAdjustment",
        id: `${id}.actionCost`,
        label,
        actionId: actionIdFromSelector(effect.selector),
        value,
      }];
    case "initiativeMod":
      return [{ type: "initiativeAdjustment", id: `${id}.initiative`, label, value }];
    case "damageMod":
      return [{
        type: "damageAdjustment",
        id: `${id}.damage`,
        label,
        value,
        appliesTo: [trackFromSelector(effect.selector)].filter(Boolean),
        track: trackFromSelector(effect.selector),
      }];
    case "speedMod":
      return [{ type: "personalSpeedAdjustment", id: `${id}.speed`, label, value, unit: "meters" }];
    case "attackRatingMod":
      return [{ type: "cqPart", id: `${id}.attackRating`, label, ar: value, dr: 0 }];
    case "defenseRatingMod":
      return [{ type: "cqPart", id: `${id}.defenseRating`, label, ar: 0, dr: value }];
    case "saCapMod":
      return [{ type: "activationBudgetAdjustment", id: `${id}.sa`, label, resource: "sa", value }];
    case "faCapMod":
      return [{ type: "activationBudgetAdjustment", id: `${id}.fa`, label, resource: "fa", value }];
    case "raCapMod":
      return [{ type: "activationBudgetAdjustment", id: `${id}.ra`, label, resource: "ra", value }];
    case "conditionPenaltyMod":
      return [{
        type: "conditionPenaltyAdjustment",
        id: `${id}.conditionPenalty`,
        label,
        track: trackFromSelector(effect.selector),
        value,
        minPenalty: effect.min,
        maxPenalty: effect.max,
      }];
    case "edgeEvent":
      return [{
        type: "edgeEventHook",
        id: `${id}.edgeEvent`,
        label,
        trigger: effect.selector,
        effect: compactObject({
          operation: effect.operation,
          pool: effect.pool,
          value,
        }),
      }];
    default:
      return [{ type: "summary", id: `${id}.summary`, label, text: label }];
  }
}

function ruleFromEffect(item, effect = {}) {
  return {
    id: effect.id || `${item._id}.${effect.type}`,
    label: effect.label || item.name,
    sourceType: "quality",
    phase: LEGACY_PHASE_TO_RULE_PHASE[effect.phase] ?? effect.phase ?? "rollBuild",
    mode: modeFromEffect(effect),
    selector: selectorFromEffect(effect),
    requires: item.system?.prerequisites ?? [],
    conditions: effect.conditions ?? [],
    outputs: outputFromEffect(item, effect).map(compactObject),
    limits: nonZeroLimits(effect.limits ?? {}),
    usage: null,
    presentation: compactObject({
      defaultEnabled: effect.defaultEnabled,
      showInRollDialog: effect.application === "optional" ? true : undefined,
    }),
    summary: effect.label || item.name,
  };
}

function bespokeRules(item) {
  if (item.name === "Brittle") {
    return [{
      id: "brittle-edge-failure-burn",
      label: "Brittle",
      sourceType: "quality",
      phase: "edgeEvent",
      mode: "triggered",
      selector: { tags: ["edge.postFailure"] },
      requires: item.system?.prerequisites ?? [],
      conditions: [],
      outputs: [{
        type: "edgeEventHook",
        id: "brittle-edge-failure-burn.edgeEvent",
        label: "Brittle",
        trigger: "edgeSpentRollFailed",
        effect: { operation: "burnDelta", value: 1 },
      }],
      limits: { perRound: 1 },
      usage: null,
      summary: "Gain +1 Burn when Edge is spent and the roll still fails.",
    }];
  }
  if (item.name === "Equipped") {
    return [{
      id: "equipped-inventory-points",
      label: "Equipped",
      sourceType: "quality",
      phase: "characterCreation",
      mode: "automatic",
      selector: { tags: ["characterCreation.inventory"] },
      requires: item.system?.prerequisites ?? [],
      conditions: [],
      outputs: [{
        type: "creationBudgetAdjustment",
        id: "equipped-inventory-points.creationBudget",
        label: "Equipped",
        budget: "inventoryPoints",
        value: 2,
      }],
      limits: {},
      usage: null,
      summary: "Grants +2 inventory points at character creation.",
    }];
  }
  return [];
}

function updateQuality(item) {
  const effects = item.system?.effects ?? [];
  const rules = effects.length
    ? effects.map(effect => ruleFromEffect(item, effect))
    : bespokeRules(item);
  item.system.rules = rules;
  item.system.narrativeOnly = rules.length === 0;
  return item;
}

async function main() {
  const files = (await fs.readdir(OUT_DIR)).filter(file => file.endsWith(".yml")).sort();
  for (const file of files) {
    const fullPath = path.join(OUT_DIR, file);
    const item = JSON.parse(await fs.readFile(fullPath, "utf8"));
    if (item.type === "quality") {
      updateQuality(item);
      await fs.writeFile(fullPath, `${JSON.stringify(item, null, 2)}\n`, "utf8");
    }
  }

  if (process.argv.includes("--pack-public")) {
    await compilePack(OUT_DIR, PACK_DIR, { yaml: true });
  }
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
