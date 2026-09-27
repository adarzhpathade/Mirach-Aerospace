# Memory — Mirach Aerospace Landing Page

Last updated: 2026-09-28 01:18:00 IST  
Current Git Branch: `main`

---

## 1. What was built

### A. Navigation System (`src/components/navigation/Navbar.tsx`)
- **Global Positioning**: Mounted at root level of `src/app/page.tsx` with `z-[100]` to escape section-level stacking contexts and prevent overlap with underlying CAD graphics.
- **Desktop Architecture (>= 768px)**:
  - Left: Plain editorial wordmark `Mirach` (`font-bold tracking-tight text-2xl sm:text-3xl`).
  - Right: Floating dark navigation container (`bg-[#252324] border border-[#413E40]/60 rounded-md`).
  - Desktop nav links: `About us` (`#about`), `Applications` (`#applications`), `Products` (`#products`), `Why choose us` (`#why-choose-us`), with interactive vertical letter-swap hover animations (`LetterSwapForward`).
  - Desktop CTA button: `Join us` (`#join-us`) in Mirach Blue (`#7DB7FF`, `rounded-[5px]`) with animated white rectangular slide-up fill effect on hover.
  - **Scroll Compaction**: Smoothly morphs into a compact pill containing a hamburger icon (`≡`) + `Join us` button when scrolling past threshold (`scrollY > 60 || rect.top <= 280`); uncompacts when returned to top (`scrollY < 20`).
  - **Hover-to-Expand**: Hovering over the hamburger icon in compact mode temporarily reveals the full navigation bar inline; collapses back on mouse leave.
  - **Zero Entrance Flash**: Uses `layout={hasMounted}` so initial page load renders immediately without unwanted drop/fade animations.
- **Mobile Architecture (< 768px)**:
  - **In-Place Expanding Container**: Single container positioned at `top-4 bottom-4 left-4 right-4` (`rounded-md`, flat `bg-[#252324]`, `border border-[#413E40]/70`, `shadow-none`, no blur, no backdrop).
  - Smoothly expands height in-place from `54px` (collapsed pill) to `calc(100dvh - 2rem)` (full-screen menu) via Motion cubic bezier easing (`[0.16, 1, 0.3, 1]`).
  - Fixed pill header: White `Mirach` wordmark on left, square `36x36px` Mirach Blue (`#7DB7FF`) toggle button on right.
  - **Precision SVG Hamburger Icon**: SVG vector strokes (`d="M1 1.5H17M1 6H17M1 10.5H17"` with `strokeWidth="2"` and `strokeLinecap="round"`).
  - Mobile nav links: Clean vertical stack of exact site options (`About us`, `Applications`, `Products`, `Why choose us`) in `text-3xl sm:text-4xl text-white hover:text-[#7DB7FF]`.
  - Utility footer links: `LinkedIn`, `Terms & Conditions`, `Privacy Policy`.
  - Mobile CTA: Full-width `Join us` button with white slide-up hover fill.
  - Automatic body scroll lock (`document.body.style.overflow = "hidden"`) when open.

### B. Hero Section (`src/components/sections/HeroSection.tsx`)
- **Dual-Block Editorial & Technical Blueprint Layout**:
  - **Top Block (#F1F7FF Light Blue Editorial Intro)**:
    - `id="hero-top-block"`
    - Stable mobile height set to `min-h-[60svh] sm:min-h-[60vh] md:min-h-[500px] lg:min-h-[540px] xl:min-h-[58vh]` (using Small Viewport Height to prevent URL-bar resize jumping).
    - Large display headline: *"Airborne innovation with precision."* — scaled on mobile to `text-[36px] min-[390px]:text-[42px]` (`leading-[1.08]`) and expanding to `sm:text-5xl md:text-6xl lg:text-[66px]`.
    - Right column mission statement paragraph (`text-base sm:text-[17px] lg:text-[18.5px] leading-[1.5] text-[#383536]`).
    - **Solid-State Desktop Parallax**: Split headline (`topHeadlineRef`, `y: -40px`) and description (`topDescRef`, `y: -75px`) on differential planes; **zero opacity fading** to ensure 100% crisp typography.
  - **Bottom Block (#252324 Dark Charcoal CAD Blueprint Container)**:
    - `id="hero-lower-block"`
    - Mobile height expanded to `min-h-[700px] sm:min-h-[620px] lg:min-h-[580px] xl:min-h-[66vh]`.
    - Subtle CAD grid background with deep parallax (`y: -50px → 50px`, `scrub: 1.5`).
    - Top-left label: *"Your autonomous UAS design and build partners"* with gentle foreground parallax (`y: 30px → -25px`).
    - Bottom-left feature list: 4 items with divider lines, `LetterSwapForward` hover interactions, and parallax (`y: 40px → -35px`).
    - **Center-Right CAD Drone Graphic**:
      - High-resolution `Hero Drone Side.png` (`1536x1024`).
      - Centered vertically on mobile at `top-[39%]` to provide 90px of clear breathing room above feature list; on desktop positioned at `top-1/2 -translate-y-1/2` on the right column (`lg:w-[70%] xl:w-[66%]`).
      - High-impact **130px aerospace 3D glide** (`y: 65px → -65px`, `scrub: 1.2`), giving the aircraft authentic suspended flight presence.

### C. About Section (`src/components/sections/AboutSection.tsx`)
- **Mirach Light Blue Editorial Surface (#F1F7FF)**:
  - `id="about"`
  - Positioned directly below Hero's dark block with a subtle border divider (`border-t border-[#252324]/10`).
  - **Unified Two-Column Responsive Grid (`grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 xl:gap-28`)**:
    - **Top Row**:
      - Left column: Square indicator bullet (`w-2.5 h-2.5 rounded-[2px] bg-[#252324]`) + *"How we work"* (`text-[14.5px] sm:text-[15px] font-medium text-[#252324]`).
      - Right column: Large editorial statement paragraph (*"We’ve got your tactical aerospace platforms covered..."*) in clean, unbolded typography (`text-xl sm:text-2xl lg:text-[26px] xl:text-[28px] text-[#252324]`).
      - Action CTA button: *"Explore capabilities"* (`bg-[#252324]` dark charcoal base, white text, and Mirach Blue `#7DB7FF` rectangular slide-up fill effect on hover).
    - **Section Divider**: Full-width subtle horizontal rule (`border-t border-[#252324]/12`).
    - **Bottom Row**:
      - Left column: *"Vision"* heading + clean description of sustainable Made-in-India AI aerial transformation in solid `#252324`.
      - Right column: *"Mission"* heading + clean description of mission-ready drone engineering and actionable intelligence in solid `#252324`.
  - **Continuous Solid Multi-Plane Parallax**:
    - Left column: `y: 25px → -25px` (`scrub: 1.2`).
    - Right column: `y: 45px → -40px` (`scrub: 1.4`).
    - Divider line: `scaleX: 0.95 → 1` (`scrub: 1.0`).
    - Background telemetry watermark: `[SYS.REF // 22.7196° N 75.8577° E]` (`y: -30px → 40px`).
    - **Zero Opacity Scrubbing**: All elements remain at 100% solid opacity and deep `#252324` contrast.

### D. Values Section (`src/components/sections/ValuesSection.tsx` & `src/components/cards/ValueCard.tsx`)
- **Direct Edge-to-Edge Positioning**: Mounted directly below the About Us section with no outer dark padding wrapper and no section heading.
- **Full-Width Viewport Panels**: Each card spans 100% screen width (`w-full`) with internal content aligned to the global `max-w-[1520px]` grid.
- **Official 4-Card Material Color Mapping ([AGENTS.md Section 10](file:///e:/Projects/Landing%20Pages/Mirach%20Aerospace/AGENTS.md#L10))**:
  1. **Card 01 — `Leadership focused`**:
     - Background: `#413E40` (Card Dark Charcoal) | Border: `border-[#625D60]/50`
     - Tagline: *"Own the outcome. / Decisive execution."*
     - Statement: *"Own outcomes, act decisively and solve problems proactively to prevent mistakes and lead the team to excellence."*
     - CAD Schematic: Concentric guidance reticle with target crosshairs, measurement ticks, and 4 HUD sensor brackets in pale gold (`#E5C158`).
  2. **Card 02 — `Quality first`**:
     - Background: `#625D60` (Card Muted Slate Gray) | Border: `border-[#413E40]/70`
     - Tagline: *"Aerospace precision. / Zero compromise."*
     - Statement: *"Refuse to settle for less. Prioritize details, critical analysis, and excellence, delivering results that consistently meet the highest aerospace standards."*
     - CAD Schematic: Precision circuit / resistor waveform with terminal solder joints in pale gold (`#E5C158`).
  3. **Card 03 — `Growth and skill development`**:
     - Background: `#252324` (Deep Charcoal) | Border: `border-[#625D60]/40`
     - Tagline: *"Continuous learning. / Deep capability."*
     - Statement: *"Foster continuous learning and upskilling. Reward initiative and dedication to drive personal development and aerospace innovation."*
     - CAD Schematic: Semiconductor diode symbol with exponential amplifier growth trace in pale gold (`#E5C158`).
  4. **Card 04 — `Trust and teamwork`**:
     - Background: `#EDE8E4` (Warm Light Industrial) | Border: `border-[#252324]/15`
     - Text: Deep `#252324` charcoal typography
     - Tagline: *"Unified accountability. / Shared flight."*
     - Statement: *"Build trust through clear communication, collaboration, and accountability. Share knowledge and follow through to grow together."*
     - CAD Schematic: Dual-bus telemetry interconnect bridge with parallel rails and synchronizer diamond in rich gold (`#B8860B`).
- **Interactive Sliding Underline Button**:
  - Button text: **`Partner with us`** (arrow removed).
  - Resting state: Subtle baseline underline track (`#EDE8E4]/30` on dark cards, `#252324]/25` on light card).
  - Hover state: Mirach Blue (`#7DB7FF`) highlight bar smoothly slides across from left to right (`-translate-x-full → translate-x-0` via `cubic-bezier(0.16, 1, 0.3, 1)`).
- **Desktop Pinned Stacking & Multi-Plane Parallax**:
  - Section pins at `top top` for `(cards.length - 1) * 120%` scroll distance.
  - Subsequent cards slide up flat at `yPercent: 100 → 0`.
  - Underlying cards glide upward with inter-card parallax (`yPercent: 0 → -18%`).
  - CAD diagram boxes float in with differential motion lag (`y: 80px → 0 → -50px`).
  - Card titles have subtle differential translation (`y: 30px → 0`).
  - **Zero Opacity Fading**: All cards remain 100% solid.
  - **Zero Scale Reduction**: No artificial 3D perspective distortion.
  - **Zero Drop Shadows**: Completely flat industrial panel aesthetic.
- **Mobile Optimizations (< 768px)**:
  - Removed `min-h-screen` on mobile; cards size naturally to content (~420px–460px height) to eliminate excessive vertical scroll voids.
  - Tightened mobile padding (`pt-8 pb-6`), scaled display titles (`text-3xl sm:text-5xl`), and reduced CAD box height to `190px`.
  - Flowing vertical layout with 100% native 120Hz momentum scrolling.

### E. Dynamic Mobile Dock & Status Bar (`src/components/ui/DynamicThemeColor.tsx`)
- Hardware-backed `IntersectionObserver` observing sections:
  - Top Hero block (`#hero-top-block`): `#F1F7FF`
  - Dark CAD blueprint lower block (`#hero-lower-block`): `#252324`
  - About section (`#about`): `#F1F7FF`
  - Values section (`#values`): `#252324`
- Dynamically updates `<meta name="theme-color">` with root margin `-10px 0px -75% 0px`.

### F. Smooth Scroll & Global Compositor Rules
- Desktop powered by Lenis v1.3.26 synchronized with GSAP ticker (`gsap.ticker.lagSmoothing(0)`).
- Mobile completely bypasses Lenis and ScrollTrigger for native touch performance.
- Global `html, body { overflow-x: clip }` prevents horizontal overflow and iOS WebKit scroll bugs.

---

## 2. Key Decisions Made

1. **Strict Section-by-Section Workflow**: Iterative progress following user instructions section by section.
2. **Industrial Aesthetic & "No Curves" Rule**: Crisp geometry (`rounded-md`, `rounded-[5px]`), zero generic SaaS pills or heavy shadows.
3. **Flat Card Stacking Standard**: No opacity fading, no scale shrinking, no drop shadows. Stacking transitions rely on pure, crisp spatial translation.
4. **Official 4-Card Material Palette**: Every card in the Values section uses an official approved color from Section 10 of AGENTS.md (`#413E40`, `#625D60`, `#252324`, `#EDE8E4`).
5. **Sliding Underline Button Interaction**: Replaced arrow glyphs with clean, engineering-grade sliding underline highlight animations.
6. **Mobile Layout Efficiency**: Elimination of 100vh constraints on mobile cards to keep content compact, readable, and fast to navigate.

---

## 3. Problems Solved

1. **About Us Section Color Faded Appearance**:
   - *Problem*: In previous parallax scrub, opacity was scrubbed from `0.25` / `0.35` across the scroll, causing text and dividers to look washed out.
   - *Fix*: Removed all opacity animations from `AboutSection.tsx` and `HeroSection.tsx`; all typography now renders at solid 100% opacity in rich dark `#252324` charcoal.
2. **Mobile Card Over-stretching**:
   - *Problem*: Full-screen `100vh` on mobile cards created excessive empty vertical space and prolonged scroll distances.
   - *Fix*: Removed `min-h-screen` on mobile, adjusted padding and CAD box dimensions, allowing natural compact height (~420-460px).
3. **CTA Generic Arrow Removal**:
   - *Problem*: Card CTA used generic arrow glyph `↳`.
   - *Fix*: Swapped to an authentic sliding underline highlight in Mirach Blue `#7DB7FF` on hover.

---

## 4. Current State

- **Development Server**: Running on `http://localhost:3000` (HTTP 200 OK).
- **Production Build**: Verified with `npm run build` (Turbopack, static prerendering, 0 errors, 0 warnings).
- **TypeScript**: Compiles cleanly (`npx tsc --noEmit` exit code 0).
- **Git Branch**: `main`.
- **Completed Sections**:
  1. Root Navbar (Compacting desktop pill + mobile expanding menu).
  2. Hero Section (Dual-block: Light editorial + CAD blueprint with 130px drone glide).
  3. About Section (Unified 2-column grid: How We Work, statement, CTA, Vision & Mission with solid parallax).
  4. Values Section (Full-width edge-to-edge 4-card pinned stack with 4 approved material colors, CAD schematics, and sliding underline buttons).

---

## 5. Next Session Starts With

- Awaiting user instructions for the next section (e.g., Capabilities / Technology / Products / Applications / Why Choose Us).
- Maintain established design tokens, typography scale, CAD blueprint language, and mobile performance architecture.
