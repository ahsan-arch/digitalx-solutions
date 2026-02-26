---
name: remotion-best-practices
description: Best practices for Remotion - Video creation in React
metadata:
  tags: remotion, video, react, animation, composition
---

## When to use

Use this skills whenever you are dealing with Remotion code to obtain the domain-specific knowledge.

## Source

These skills are sourced from https://github.com/remotion-dev/skills

## Key Rules

### Animations
- All animations MUST be driven by `useCurrentFrame()` hook
- CSS transitions/animations are FORBIDDEN — they will not render correctly
- Tailwind animation class names are FORBIDDEN
- Use `interpolate()` for linear animations, `spring()` for natural motion
- Write animations in seconds and multiply by `fps` from `useVideoConfig()`

### Spring Configs
```ts
const smooth = { damping: 200 };           // Smooth, no bounce
const snappy = { damping: 20, stiffness: 200 }; // Snappy, minimal bounce
const bouncy = { damping: 8 };             // Bouncy entrance
const heavy = { damping: 15, stiffness: 80, mass: 2 }; // Heavy, slow
```

### Compositions
- Define in `src/remotion/Root.tsx` using `<Composition>`
- Use `type` declarations (not `interface`) for props
- Use `<Folder>` to organize compositions in the sidebar
- Use `<Still>` for single-frame images
- Use `calculateMetadata` for dynamic dimensions/duration

### Sequencing
- Use `<Sequence>` to delay elements in the timeline
- Use `<Series>` for sequential playback without overlap
- Inside a Sequence, `useCurrentFrame()` returns local frame (starting from 0)
- Use `<TransitionSeries>` with `fade()`, `slide()`, `wipe()`, `flip()`, `clockWipe()` for transitions

### Assets
- Place assets in `public/` folder
- MUST use `staticFile()` to reference public files
- Use Remotion components `<Img>`, `<Video>`, `<Audio>` (not HTML equivalents)
- Remote URLs can be used directly without `staticFile()`

### Text Animations
- Use string slicing for typewriter effects — never per-character opacity
- Use `useCurrentFrame()` to control character reveal

### Transitions
- Install: `npx remotion add @remotion/transitions`
- Use `<TransitionSeries>` for scene transitions
- Transitions overlap adjacent scenes (shortens timeline)
- Overlays do not affect total duration
- Available: `fade`, `slide`, `wipe`, `flip`, `clockWipe`

## Project Structure
```
src/remotion/
├── Root.tsx              # Entry point, registers compositions
├── index.ts              # Re-exports RemotionRoot
├── compositions/         # Video compositions
│   └── PromoVideo.tsx
├── scenes/               # Individual scenes
│   ├── IntroScene.tsx
│   ├── ServicesScene.tsx
│   ├── TaglineScene.tsx
│   └── CTAScene.tsx
└── lib/                  # Shared utilities
    ├── styles.ts         # Brand colors & fonts
    └── animations.ts     # Spring configs & helpers
```

## Commands
- `npm run remotion:studio` — Open Remotion Studio for previewing
- `npm run remotion:render` — Render PromoVideo to MP4
- `npx remotion render <CompositionId> <output>` — Render any composition

## Additional Rules
For detailed rules on specific topics, read the rule files from:
https://github.com/remotion-dev/skills/tree/main/skills/remotion/rules
