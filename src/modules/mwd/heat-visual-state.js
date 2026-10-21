// src/modules/mwd/heat-visual-state.js
// Purpose: Maps BattleMech heat state to rendering-only visual parameters.
// How it fits: Keeps heat math separate from token rendering and shader code.

import { buildBattlemechHeatModel } from "./machine-heat.js";
import { clamp, clampMin } from "../utils/coercion.js";

function inverseLerp(value, min, max) {
  if (max <= min) return value >= max ? 1 : 0;
  return clamp((value - min) / (max - min), 0, 1);
}

function hasHeatShape(source = {}) {
  return Boolean(source && typeof source === "object" && ("current" in source) && ("thresholds" in source));
}

function resolveHeatModel(source = null) {
  if (!source) return null;
  if (source?.type && source.type !== "battlemech") return null;
  if (hasHeatShape(source)) return source;
  if (source?.actor?.type && source.actor.type !== "battlemech") return null;
  return buildBattlemechHeatModel(source);
}

export function buildBattlemechHeatVisualState(source = null) {
  const heat = resolveHeatModel(source);
  if (!heat) return null;

  const current = clampMin(heat.current, 0);
  const thresholds = heat.thresholds ?? {};
  const hot = clampMin(thresholds.runningHot ?? thresholds.hot, 0);
  const overheat = Math.max(hot, clampMin(thresholds.overheated ?? thresholds.overheat, hot));
  const danger = Math.max(overheat, clampMin(thresholds.shutdown ?? thresholds.danger, overheat || 1));
  const dangerLevel = clampMin(heat?.penalties?.dangerLevel, current >= danger ? (current - danger + 1) : 0);
  const normalized = clamp(danger > 0 ? current / danger : 0, 0, 1);

  if (current < hot || hot <= 0) {
    return {
      active: false,
      heat: current,
      normalized,
      band: "safe",
      warmth: 0,
      glow: 0,
      shimmer: 0,
      blur: 0,
      pulseAmplitude: 0,
      pulseSpeed: 0,
      animated: false,
    };
  }

  if (current < overheat) {
    const progress = inverseLerp(current, hot, Math.max(hot + 1, overheat - 1));
    return {
      active: true,
      heat: current,
      normalized,
      band: "hot",
      warmth: 0.12 + (progress * 0.16),
      glow: 0.04 + (progress * 0.16),
      shimmer: 0.02 + (progress * 0.1),
      blur: 0,
      pulseAmplitude: 0,
      pulseSpeed: 0,
      animated: false,
    };
  }

  if (current < danger) {
    const progress = inverseLerp(current, overheat, Math.max(overheat + 1, danger - 1));
    return {
      active: true,
      heat: current,
      normalized,
      band: "overheat",
      warmth: 0.30 + (progress * 0.24),
      glow: 0.18 + (progress * 0.24),
      shimmer: 0.16 + (progress * 0.25),
      blur: progress * 0.18,
      pulseAmplitude: 0.20 + (progress * 0.15),
      pulseSpeed: 0,
      animated: true,
    };
  }

  const dangerRamp = clamp((dangerLevel - 1) / 4, 0, 1);
  return {
    active: true,
    heat: current,
    normalized,
    band: "danger",
    warmth: 0.58 + (dangerRamp * 0.10),
    glow: 0.42 + (dangerRamp * 0.25),
    shimmer: 0.42 + (dangerRamp * 0.5),
    blur: 0.18 + (dangerRamp * 0.10),
    pulseAmplitude: 0.3 + (dangerRamp * 0.15),
    pulseSpeed: 0.95 + (dangerRamp * 0.55),
    animated: true,
  };
}
