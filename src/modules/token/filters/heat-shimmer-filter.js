// src/modules/token/filters/heat-shimmer-filter.js
// Purpose: BattleMech token shimmer filter for heat mirage and internal glow.
// How it fits: Encapsulates shader-specific behavior behind a reusable filter object.

const DEFAULT_UNIFORMS = Object.freeze({
  uTime: 0,
  uHeat: 0,
  uShimmer: 0,
  uGlow: 0,
  uPulse: 0,
  uTopBias: 1.75,
});

const VERTEX_SHADER = `
attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void) {
  vTextureCoord = aTextureCoord;
  gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform float uTime;
uniform float uHeat;
uniform float uShimmer;
uniform float uGlow;
uniform float uPulse;
uniform float uTopBias;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

void main(void) {
  vec2 uv = vTextureCoord;
  float topBias = pow(clamp(1.0 - uv.y, 0.0, 1.0), max(0.001, uTopBias));
  float wave = sin((uv.y * 46.0) + (uTime * 3.1)) * 0.0025 * uShimmer * (0.3 + topBias);
  float jitter = (hash(vec2(floor(uv.y * 64.0), floor((uTime * 8.0) + (uv.x * 24.0)))) - 0.5)
    * 0.0020
    * uShimmer
    * (0.2 + topBias);
  vec2 sampleUv = uv + vec2(wave + jitter, 0.0);

  vec4 base = texture2D(uSampler, sampleUv);
  float pulse = 1.0 + (sin(uTime * 4.0) * uPulse);
  float glowFactor = uGlow * pulse * (0.35 + (topBias * 0.65));

  vec3 warmed = base.rgb;
  warmed.r += (uHeat * 0.18) + (glowFactor * 0.18);
  warmed.g += (uHeat * 0.04) + (glowFactor * 0.04);
  warmed.b = max(0.0, warmed.b - (uHeat * 0.08));

  vec3 finalColor = mix(base.rgb, warmed, clamp((uHeat * 0.85) + (glowFactor * 0.55), 0.0, 1.0));
  finalColor += vec3(1.0, 0.38, 0.08) * glowFactor * 0.10 * base.a;

  gl_FragColor = vec4(finalColor, base.a);
}
`;

class FilterFallback {
  constructor(_vertexSrc = "", _fragmentSrc = "", uniforms = {}) {
    this.uniforms = { ...uniforms };
    this.enabled = true;
    this.padding = 0;
    this.autoFit = true;
  }
}

function getFilterBaseClass() {
  return globalThis.foundry?.canvas?.rendering?.filters?.AbstractBaseFilter
    ?? globalThis.PIXI?.Filter
    ?? FilterFallback;
}

const HeatFilterBase = getFilterBaseClass();

export class HeatShimmerFilter extends HeatFilterBase {
  constructor(initialUniforms = {}) {
    super(VERTEX_SHADER, FRAGMENT_SHADER, {
      ...DEFAULT_UNIFORMS,
      ...initialUniforms,
    });

    this.padding = 6;
    this.autoFit = true;
  }

  static create(initialUniforms = {}) {
    return new this(initialUniforms);
  }

  setVisualState(state = {}, { photosensitive = false } = {}) {
    const uniforms = this.uniforms ?? {};
    uniforms.uHeat = Number(state?.normalized ?? 0) || 0;
    uniforms.uGlow = Number(state?.glow ?? 0) || 0;
    uniforms.uTopBias = 1.75;
    uniforms.uShimmer = photosensitive ? 0 : (Number(state?.shimmer ?? 0) || 0);
    uniforms.uPulse = photosensitive ? 0 : (Number(state?.pulseAmplitude ?? 0) || 0);
  }

  setTime(seconds = 0) {
    const uniforms = this.uniforms ?? {};
    uniforms.uTime = Number(seconds) || 0;
  }
}

export function createHeatShimmerFilter(initialUniforms = {}) {
  return HeatShimmerFilter.create(initialUniforms);
}
