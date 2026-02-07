/**
 * FTC Intro — Central Timing Configuration
 *
 * All scene durations and narration timings in one place.
 * Durations are in frames at 30fps.
 *
 * With TransitionSeries, transition durations overlap between scenes,
 * so total duration = sum of scenes - sum of transitions.
 */

export const FPS = 30;

// ─── Transition Timing ───────────────────────────────────
export const TRANSITION_FRAMES = Math.round(0.8 * FPS); // 24 frames per crossfade
const NUM_TRANSITIONS = 4; // 4 transitions between 5 scenes

export const transitions = {
  crossfade: TRANSITION_FRAMES,
  stagger: 5, // frames between staggered element animations
} as const;

// ─── Scene Durations (frames) ────────────────────────────
export const scenes = {
  scene01: {
    duration: 7 * FPS, // 7 seconds — Authority open
  },
  scene02: {
    duration: 9 * FPS, // 9 seconds — Industrial environment
  },
  scene03: {
    duration: 11 * FPS, // 11 seconds — What FTC delivers
  },
  scene04: {
    duration: 11 * FPS, // 11 seconds — Trust & quality
  },
  scene05: {
    duration: 7 * FPS, // 7 seconds — Presentation handoff
  },
} as const;

// Total duration accounting for TransitionSeries overlaps
const sceneDurationSum =
  scenes.scene01.duration +
  scenes.scene02.duration +
  scenes.scene03.duration +
  scenes.scene04.duration +
  scenes.scene05.duration;

export const TOTAL_DURATION = sceneDurationSum - NUM_TRANSITIONS * TRANSITION_FRAMES;
// = 1350 - 96 = 1254 frames = ~41.8 seconds

// ─── Narration Script ────────────────────────────────────
// Each line maps to a scene and drives timing.
export const narration = {
  scene01:
    'Since 1987, Filtration Technology Corporation has been engineering quality filtration solutions — at the forefront of filtration technology.',
  scene02:
    'From oil and gas to chemical processing, power generation, and water treatment — FTC systems operate where reliability is non-negotiable.',
  scene03:
    'Invicta liquid-solid filtration. Strata liquid-liquid separation. Tersus gas filtration. Engineered for performance. Built for demanding environments.',
  scene04:
    'Every product is designed, tested, and manufactured to outperform — delivering consistency, precision, and measurable results.',
  scene05:
    'Filtration Technology Corporation. Quality matched by unparalleled service.',
} as const;
