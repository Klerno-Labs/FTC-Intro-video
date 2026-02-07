/**
 * FTC Intro — Central Timing Configuration
 *
 * All scene durations and narration timings in one place.
 * Durations are in frames at 30fps.
 */

export const FPS = 30;

// ─── Scene Durations (frames) ────────────────────────────
export const scenes = {
  scene01: {
    start: 0,
    duration: 6 * FPS, // 6 seconds — Authority open
  },
  scene02: {
    get start() {
      return scenes.scene01.start + scenes.scene01.duration;
    },
    duration: 9 * FPS, // 9 seconds — Industrial environment
  },
  scene03: {
    get start() {
      return scenes.scene02.start + scenes.scene02.duration;
    },
    duration: 11 * FPS, // 11 seconds — What FTC delivers
  },
  scene04: {
    get start() {
      return scenes.scene03.start + scenes.scene03.duration;
    },
    duration: 11 * FPS, // 11 seconds — Trust & quality
  },
  scene05: {
    get start() {
      return scenes.scene04.start + scenes.scene04.duration;
    },
    duration: 6 * FPS, // 6 seconds — Presentation handoff
  },
} as const;

// Total duration
export const TOTAL_DURATION =
  scenes.scene01.duration +
  scenes.scene02.duration +
  scenes.scene03.duration +
  scenes.scene04.duration +
  scenes.scene05.duration; // 43 seconds = 1290 frames

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

// ─── Transition Timing ───────────────────────────────────
export const transitions = {
  crossfade: 15, // frames of overlap between scenes
  stagger: 6, // frames between staggered element animations
} as const;
