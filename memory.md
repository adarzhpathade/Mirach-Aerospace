# Memory — Mirach Aerospace Landing Page

Last updated: 2026-09-27 21:28:00 IST

## What was built

### 1. Hero Section (`src/components/sections/HeroSection.tsx`)
- **Dual-Block Editorial & Technical Layout**:
  - **Top Block (#F1F7FF Light Blue)**:
    - Editorial header with bottom-aligned baseline layout.
    - Large display headline: *"Airborne innovation with precision."* (`text-[66px]`, `font-normal`, `tracking-[-0.03em]`, `text-[#252324]`).
    - Supporting paragraph text (`text-[18.5px]`, `font-normal`, `text-[#383536]`).
  - **Bottom Block (#252324 Dark Charcoal)**:
    - Subtle CAD engineering grid background (40px grid in `rgba(125, 183, 255, 0.08)`).
    - Top-left label: *"Your autonomous UAS design and build partners"*.
    - Bottom-left feature list: 4 stacked items (`PO to shipped in 4 weeks`, `Fast, intuitive quotes`, `UL 508A listed by default`, `Automated build process`) with divider lines and interactive vertical letter-swap hover animations.
    - **Center-Right CAD Drone Graphic**:
      - Uses `Hero Drone Side.png` (`1536x1024`, copied from `design/images/Hero Drone Side.png` to `public/images/`).
      - Positioned directly as an absolute child of `#hero-lower-block` with `top-1/2 -translate-y-1/2` for true Y-axis centering with respect to the gray container.
      - Scaled to a clean, crisp footprint (`max-w-[940px]`, `h-[300px] sm:h-[400px] lg:h-[480px]`) with no artificial scale multipliers or tilt angles.

### 2. Navigation Bar (`src/components/navigation/Navbar.tsx`)
- Wordmark `Mirach` as plain editorial text (no icon).
- Nav options (`About us`, `Applications`, `Products`, `Why choose us`) with `LetterSwapForward` hover animation.
- Action button `Join us` in Mirach Blue (`#7DB7FF`, `rounded-[5px]`, no arrow) with a white rectangular slide-up fill effect on hover.
- **Scroll Compaction**:
  - Smoothly morphs from full-width bar into a compact rectangular pill with hamburger (`≡`) + `Join us` button when scrolling (`scrollY > 60 || rect.top <= 280`).
  - Uncompacts cleanly when returned to the top (`scrollY < 20`).
- **Desktop Hover-to-Expand**:
  - Hovering over the hamburger icon in the compact state temporarily expands the full navbar inline; collapses back on mouse leave.
- **Zero Entrance Animation**:
  - Renders statically on initial mount (`layout={hasMounted}`) to eliminate jarring drop/fade animations.

### 3. Smooth Scroll & Animation Architecture
- **Global Smooth Scroll (`src/components/providers/SmoothScroll.tsx`)**:
  - Powered by `lenis` (v1.3.26).
  - Synchronized with GSAP's central ticker (`gsap.ticker.add((time) => lenis.raf(time * 1000))`, `lenis.on("scroll", ScrollTrigger.update)`, and `gsap.ticker.lagSmoothing(0)`).
  - Respects accessibility via `prefers-reduced-motion`.
  - Global scrollbars hidden site-wide via `src/app/globals.css`.
- **GSAP ScrollTrigger Multi-Plane Parallax (`HeroSection.tsx`)**:
  - Top editorial text lifts and softly fades (`y: -45px`, `opacity: 0.72`).
  - CAD background grid drifts slower (`y: -30px → 35px`, `scrub: 1.5`).
  - Drone side CAD model floats symmetrically on the Y-axis (`y: 20px → -20px`, `scrub: 1.2`), passing through exact zero-offset when centered in the viewport.
  - Bottom-left features have subtle grounded parallax (`y: 20px → -18px`).
  - All tilt/rotation effects (both mouse tracking and scroll scale) removed for clean, precision CAD presentation.

### 4. Project Reference & Dossier
- `company-profile.md`: Comprehensive company dossier extracted from official Mirach Aerospace documentation detailing tactical UAV platforms, logistical drones, AI edge avionics, and mission capabilities.

---

## Decisions made

1. **Strict Section-by-Section Workflow ([AGENTS.md](file:///e:/Projects/Landing%20Pages/Mirach%20Aerospace/AGENTS.md))**:
   - The user controls the design and structure one section at a time. Do not invent or stub future sections without explicit instruction.
2. **No Curves Rule**:
   - Strictly avoid `rounded-full` or pill cards. Use sharp/crisp industrial geometry (`rounded-md` for containers, `rounded-[5px]` for action buttons).
3. **Button Styling**:
   - No arrow glyphs (e.g. `↳`) in buttons.
   - Use the white slide-up rectangle fill effect on hover.
4. **Clean CAD Graphic Presentation**:
   - The drone blueprint must remain clean and unobstructed. No telemetry badges, hotspot pins, pulse rings, glow blobs, or tilt angles.
5. **Color System Compliance**:
   - Dark background: `#252324`
   - Light background: `#EDE8E4`
   - Light editorial intro surface: `#F1F7FF`
   - Accent blue: `#7DB7FF`
   - Card surfaces/borders: `#413E40` and `#625D60`

---

## Problems solved

1. **Scroll Compaction Trigger with Single Section**:
   - Because only the Hero section exists currently, `rect.top <= 90` was unreachable on tall monitors; tuned compaction hysteresis to `scrollY > 60 || rect.top <= 280` and `scrollY < 20`.
2. **Lenis + GSAP ScrollTrigger Synchronization**:
   - Hooked Lenis directly into GSAP's central ticker with `lagSmoothing(0)` and `ScrollTrigger.update`, ensuring 120Hz smooth scrolling without frame skips or jitter.
3. **Drone Y-Axis Centering**:
   - Positioned the drone container directly under `#hero-lower-block` rather than inside the padded inner container, ensuring `top-1/2 -translate-y-1/2` centers it against the actual container height.
   - Symmetrically centered parallax travel (`y: 20px → -20px`) so the graphic rests at exact dead-center when the section is in the viewport.

---

## Current state

- **Development Server**: Running on `http://localhost:3000` (HTTP 200 OK).
- **TypeScript**: Compiles cleanly with zero errors (`npx tsc --noEmit` exit code 0).
- **Working Sections**: Navigation bar (with compact scroll + desktop hover expansion) and Hero section (dual-block layout, side CAD drone model, smooth scroll + multi-plane parallax, letter-swap hover effects).

---

## Next session starts with

- Receive user instructions/reference for the next section of the page (e.g., Capabilities, Products/Tactical UAS Platforms, About Us, or Technical Specifications).
- Maintain existing typography, color tokens, and smooth scroll integration.

---

## Open questions

- Awaiting user direction on the design and requirements for the next section.
