# Visual Landing Page Elevation — Cinematic Keynote Stage

Elevate the initial presentation landing stage into an immersive, theater-grade Apple Keynote opening featuring an interactive 3D perspective particle grid, subtle volumetric stage spotlight, glass floor reflection, and an enhanced primary action button.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following directions were confirmed during interactive clarification and will guide the visual implementation:

- **Stage Atmosphere**: Cinematic keynote spotlight paired with an interactive 3D perspective particle grid and frosted glass reflection floor on the canvas.
- **Visual Purity**: Zero decorative metadata clutter, category pills, or floating badges on the hero stage. The stage remains exclusively focused on the theatrical question and prompt.
- **Call-to-Action Design**: Premium Apple-grade pill button with an animated gradient shine, subtle pulsing glow ring, responsive scale micro-interaction, and an integrated audio-ready waveform accent.

---

## 1. Overview & Core Concept

- **What It Does**: Transforms the opening hero stage of the presentation into a high-impact, cinematic prologue that immediately commands attention before the speaker advances to Chapter 01.
- **Target Audience / Experience**: Conference audiences, students, and evaluators attending the Ethics & Future Systems 2026 Keynote.
- **Key Value**: Delivers the visual gravitas of a flagship Apple or WWDC keynote opening—evoking anticipation, intellectual curiosity, and high technical polish without adding confusing UI widgets.

---

## 2. User Experience & Visual Design

### Visual Identity & Theme
- **Dominant Canvas (60%)**: Deep obsidian and cosmic charcoal (`#07080b` in dark mode / pure off-white frost `#f8fafc` in light mode) with high-contrast text rendering.
- **Atmospheric Surfaces (30%)**:
  - **Volumetric Stage Spotlight**: A soft, elliptical radial overhead spotlight anchored at top-center, casting subtle light down toward the center stage.
  - **Perspective Ground Grid**: A subtle 3D-projected canvas grid that recedes into the horizon, reacting smoothly to mouse movement (or subtle idle drift on touch devices).
  - **Glass Floor Reflection**: Mirrored inverted reflection and gradient fade beneath the hero typography, simulating polished stage lacquer.
- **Accent Budget (10%)**: Cyan/violet spectral luminescence concentrated around the central spotlight focus and primary action button ring.

### Keynote Typography
- **Hero Title**: *"Are You Ready ?"* rendered in high-contrast `Cinzel` serif with an improved liquid-light shimmer sweep animation and tight optical kerning.
- **Subtitle**: Single-line balanced prose in `Plus Jakarta Sans` (`tracking-wide`, `text-slate-400` in dark mode) with balanced line wrapping.

### Primary Call-to-Action & Micro-Interactions
- **Keynote Action Button**:
  - Subtle breathing ambient glow halo that expands and contracts softly ($T = 3.2\text{s}$).
  - Smooth glassmorphism surface with a hairline inner highlight border (`1px solid rgba(255,255,255,0.22)`).
  - Micro soundwave audio indicator on hover/active signaling that sound effects are synthesized and ready.
  - Tactile physical press response (`scale(0.97)` on mousedown).
- **Presenter Keyboard Affordance**:
  - Restyled floating keyboard key badge (`Space`) with realistic bevel, soft drop shadow, and clean unboxed label (`or click anywhere to proceed`).

---

## 3. Key Product Decisions & Trade-Offs

- **Canvas 2D Dual-Layer Projection vs Three.js**:
  - *Chosen Approach*: Implement the 3D perspective grid and reflective floor using optimized HTML5 Canvas 2D matrix projection within the existing responsive canvas loop.
  - *Why*: Delivers 60 FPS performance without adding 600KB+ Three.js bundle overhead or WebGL context recreation delays.
  - *Alternatives Considered*: Pure CSS perspective planes (prone to subpixel jitter on high-DPI displays) or WebGL shaders (unnecessary overhead for a 2D/2.5D stage).
- **Distraction-Free Layout vs Metadata Cards**:
  - *Chosen Approach*: Pure theatrical focus with no taglines, pill badges, or duration counters on the hero stage.
  - *Why*: Confirmed by user response; prevents cognitive clutter and ensures maximum dramatic tension before the presentation unfolds.

---

## 4. Technical Architecture & Visual Pipeline

### Visual Rendering Pipeline

```
┌────────────────────────────────────────────────────────┐
│                   HTML5 Canvas Engine                  │
├────────────────────────────────────────────────────────┤
│ 1. Overhead Volumetric Radial Spotlight Gradient       │
│ 2. Floating Ambient Spectral Color Orbs                │
│ 3. 3D Perspective Floor Grid (Vanishing Point Horizon) │
│ 4. Ambient Stardust Sparkles Floating Upwards          │
└──────────────────────────┬─────────────────────────────┘
                           │ Composited Under
┌──────────────────────────▼─────────────────────────────┐
│                    DOM Presentation Layer              │
├────────────────────────────────────────────────────────┤
│ • Mac Window Header (Controls, Title, Actions)         │
│ • Shimmering Hero Headline ("Are You Ready ?")        │
│ • Frosted Stage Lacquer Mirror Reflection              │
│ • Enhanced Keynote Action Button with Breathing Halo   │
│ • Tactile Spacebar Shortcut Affordance                 │
└────────────────────────────────────────────────────────┘
```

### Component & Style Files to Update
- **`src/components/CoverStage.tsx`**: Update canvas rendering loop to project the 3D perspective floor grid, spotlight cone, and dust motes; add the typography stage reflection container.
- **`src/styles/keynote.css`**: Add styles for the breathing glow halo, glass lacquer reflection, typography shimmer refinement, and tactile keycap styling.
