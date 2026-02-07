# FTC Filters — Cinematic Intro Video

A narrated cinematic intro video for FTC Filters (Filtration Technology Corporation) salesperson presentations. Built with [Remotion](https://remotion.dev/).

**1920×1080 · 30fps · ~43 seconds**

---

## Structure

| Scene | Duration | Content |
|-------|----------|---------|
| 01 | 6s | Authority open — logo reveal with calm motion background |
| 02 | 9s | Industrial environment — industries served, filtration system visuals |
| 03 | 11s | What FTC delivers — Invicta, Strata, Tersus product lines |
| 04 | 11s | Trust & quality — four pillars: Quality, Service, Innovation, Integrity |
| 05 | 6s | Presentation handoff — brand close, prepares viewer for salesperson |

## Project Layout

```
src/
├── theme.ts              # Colors, typography, spacing, motion tokens
├── timing.ts             # Central timing config + narration script
├── index.ts              # Remotion entry point
├── Root.tsx              # Composition registration
├── FTCIntro.tsx          # Main composition (scene orchestration)
├── components/
│   ├── BackgroundMotion.tsx   # Animated dark gradient + geometric elements
│   ├── LogoReveal.tsx         # Logo entrance with scale + blur animation
│   ├── TextBlock.tsx          # Animated typography (heading, body, label, metric)
│   ├── AccentLine.tsx         # Animated horizontal accent rule
│   ├── FadeTransition.tsx     # Scene fade-in/fade-out wrapper
│   ├── IndustrialVisual.tsx   # SVG-based filtration system schematics
│   └── index.ts
├── scenes/
│   ├── Scene01.tsx        # Authority open
│   ├── Scene02.tsx        # Industrial environment
│   ├── Scene03.tsx        # Product showcase
│   ├── Scene04.tsx        # Trust & quality pillars
│   ├── Scene05.tsx        # Presentation handoff
│   └── index.ts
└── assets/
    └── logo.svg           # FTC logo (placeholder — replace with official)
public/
    └── logo.svg           # Static copy served by Remotion
```

## Install

```bash
npm install
```

## Preview (Remotion Studio)

```bash
npm start
```

Opens the Remotion Studio at `http://localhost:3000` where you can scrub through the timeline, preview scenes, and adjust timing.

## Render MP4

```bash
npm run render
```

Outputs to `out/ftc-intro.mp4`. Requires Chrome/Chromium to be available on the system.

For custom output settings:

```bash
npx remotion render src/index.ts FTCIntro out/custom-name.mp4 --codec h264
```

## Customization

### Timing
All scene durations are in `src/timing.ts`. Adjust `duration` values (in frames at 30fps) to match final voiceover length.

### Theme
Colors, typography, and motion tokens are in `src/theme.ts`. Update brand colors here to cascade across all scenes.

### Logo
Replace `public/logo.svg` and `src/assets/logo.svg` with the official FTC logo file.

### Narration
The narration script is in `src/timing.ts` under the `narration` export. This serves as the source of truth for voiceover recording.

## Narration Script

> **Scene 1:** Since 1987, Filtration Technology Corporation has been engineering quality filtration solutions — at the forefront of filtration technology.
>
> **Scene 2:** From oil and gas to chemical processing, power generation, and water treatment — FTC systems operate where reliability is non-negotiable.
>
> **Scene 3:** Invicta liquid-solid filtration. Strata liquid-liquid separation. Tersus gas filtration. Engineered for performance. Built for demanding environments.
>
> **Scene 4:** Every product is designed, tested, and manufactured to outperform — delivering consistency, precision, and measurable results.
>
> **Scene 5:** Filtration Technology Corporation. Quality matched by unparalleled service.

## Tech Stack

- [Remotion](https://remotion.dev/) 4.x
- React 19
- TypeScript 5

---

*Filtration Technology Corporation · Houston, TX · Since 1987*
