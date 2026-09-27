# Memory — Mirach Aerospace Landing Page

Last updated: 2026-09-27 22:08:00 IST

## What was built

### 1. Hero Section (`src/components/sections/HeroSection.tsx`)
- **Dual-Block Editorial & Technical Layout**:
  - **Top Block (#F1F7FF Light Blue)**:
    - Editorial header with bottom-aligned baseline layout.
    - Large display headline: *"Airborne innovation with precision."* — enhanced on mobile to `text-[36px] min-[390px]:text-[42px]` (`leading-[1.08]`) scaling up to `sm:text-5xl md:text-6xl lg:text-[66px]`.
    - Mobile height set to `min-h-[60svh]` (60% small viewport height, completely stable without dynamic address bar resize jitter).
    - Supporting paragraph text (`text-[18.5px]`, `font-normal`, `text-[#383536]`).
  - **Bottom Block (#252324 Dark Charcoal)**:
    - Subtle CAD engineering grid background (40px grid in `rgba(125, 183, 255, 0.08)`).
    - Top-left label: *"Your autonomous UAS design and build partners"*.
    - Bottom-left feature list: 4 stacked items (`PO to shipped in 4 weeks`, `Fast, intuitive quotes`, `UL 508A listed by default`, `Automated build process`) with divider lines and interactive vertical letter-swap hover animations.
    - **Center-Right CAD Drone Graphic**:
      - Uses `Hero Drone Side.png` (`1536x1024`, high-resolution CAD blueprint).
      - Expanded container height on mobile to `min-h-[700px]` with drone positioned at `top-[39%]` to provide clean breathing room and eliminate overlapping/collision with the bottom feature list.
      - On desktop (>= 768px), positioned at `top-1/2 -translate-y-1/2` on the right side.
      - Scoped `will-change-transform` and heavy drop-shadow filters strictly to desktop to preserve mobile GPU memory.

### 2. About Section (`src/components/sections/AboutSection.tsx`)
- **Mirach Light Blue Editorial Surface (#F1F7FF)**:
  - Positioned immediately beneath the Hero's dark charcoal block with a subtle border divider (`border-[#252324]/10`).
  - **Unified Two-Column Responsive Grid**:
    - **Top Row**:
      - Left column: Square indicator bullet + *"● How we work"* (`text-[15px] font-medium text-[#252324]`).
      - Right column: Large editorial paragraph (*"We’ve got your tactical aerospace platforms covered..."*) with crisp, clean typography without unnecessary bold or colored text.
      - Action CTA button: *"Explore capabilities"* with dark charcoal base (`#252324`), white text, and Mirach Blue (`#7DB7FF`) rectangular slide-up fill effect on hover.
    - **Divider**: Full-width subtle horizontal rule (`border-[#252324]/12`).
    - **Bottom Row**:
      - Left column: *"Vision"* heading with mission-ready drone transformation statement.
      - Right column: *"Mission"* heading with autonomous UAV engineering statement.
  - Desktop-only GSAP ScrollTrigger reveal; zero mobile scroll overhead.

### 3. Navigation Bar (`src/components/navigation/Navbar.tsx`)
- **Desktop (>= 768px)**:
  - Plain editorial wordmark `Mirach` on left.
  - Scrolled compaction into a compact pill with hamburger (`≡`) + `Join us` button.
  - Hover-to-expand behavior in compact mode.
  - Solid `#252324` background and mounted at root level (`z-[100]`) to permanently avoid stacking context clipping.
- **Mobile (< 768px)**:
  - In-place expanding container (`top-4 bottom-4 left-4 right-4`, height `54px` when closed, expanding to `calc(100dvh - 2rem)` when open).
  - Floating pill header with white `Mirach` wordmark and a `#7DB7FF` square toggle button.
  - Clean SVG hamburger icon lines with uniform visual stroke weight (`strokeWidth="2"`).
  - Flat aesthetic without drop shadows, blur, or depth.
  - Full-screen editorial nav links, legal links, and *"Start your quote"* action button.
  - Automatically locks body scroll when open.
  - Scroll event listeners bypassed on mobile to prevent forced reflows.

### 4. Mobile Scrolling & Performance Architecture
- **Stable Viewport Sizing**: Used `svh` (`min-h-[60svh]`) instead of dynamic `dvh` to prevent URL bar resize jitter during swipe gestures.
- **Pure Native Compositor Momentum**: Replaced `overflow-x: hidden` with `overflow-x: clip` in `globals.css` to prevent WebKit mobile scroll container bugs and maintain 120Hz native scrolling.
- **GPU Layer Management**: Scoped `will-change-transform` exclusively to desktop breakpoints (`md:will-change-transform`).
- **Touch Bypass in SmoothScroll (`src/components/providers/SmoothScroll.tsx`)**: Lenis runs exclusively on desktop pointer devices; bypassed on mobile touch screens for zero-lag native scrolling.

---

## Decisions made

1. **Strict Section-by-Section Workflow ([AGENTS.md](file:///e:/Projects/Landing%20Pages/Mirach%20Aerospace/AGENTS.md))**:
   - Only build the sections requested by the user. Do not invent or stub future sections.
2. **Mobile Menu Style**:
   - In-place container expansion instead of off-screen drop-downs.
   - Flat industrial styling (no shadows, no depth, solid `#252324`).
3. **No Overlaps on Mobile**:
   - Sized the hero lower box to `min-h-[700px]` with drone centered at `top-[39%]` so CAD blueprint art does not overlap feature text.
4. **Button Styling**:
   - Default background `#252324`, rising rectangle hover fill in `#7DB7FF` (Hero/About CTA) and `#FFFFFF` (Nav CTA).
5. **Color System Compliance**:
   - Dark background: `#252324`
   - Light background: `#EDE8E4`
   - Light editorial intro / About surface: `#F1F7FF`
   - Accent blue: `#7DB7FF`
   - Card surfaces/borders: `#413E40` and `#625D60`

---

## Problems solved

1. **Mobile Scroll Jitter & Lag**:
   - Eliminated `dvh` dynamic resizing mid-scroll by switching to `svh`.
   - Switched `overflow-x: hidden` to `overflow-x: clip` on `html, body`.
   - Bypassed mobile GSAP ScrollTriggers and scroll event listeners.
2. **Mobile Drone & Feature List Overlap**:
   - Increased lower box height from `500px` to `700px` and adjusted drone vertical placement on mobile.
3. **Navbar Stacking Context Collisions**:
   - Elevated `<Navbar />` to root level in `src/app/page.tsx` with `z-[100]`.
4. **Subpixel Hamburger Stroke Discrepancy**:
   - Replaced HTML spans with precise SVG vector strokes (`strokeWidth="2"`).

---

## Current state

- **Development Server**: Running on `http://localhost:3000` (HTTP 200 OK).
- **TypeScript**: Compiles cleanly with zero errors (`npx tsc --noEmit` exit code 0).
- **Git Branch**: `main`, ready to commit and push.
- **Implemented Sections**:
  1. Root Navbar (Desktop dynamic compaction + mobile in-place expanding menu).
  2. Hero Section (Dual-block: 60svh Light Blue + 700px Dark Charcoal CAD container).
  3. About Section (Light Blue unified 2-column grid: How We Work, statement, CTA, Vision & Mission).

---

## Next session starts with

- Receive user instructions/reference for the next section (e.g., Capabilities, Products / Tactical UAS Platforms, Applications, or Why Choose Us).
- Maintain existing design tokens, typography, and motion standards.

---

## Open questions

- Awaiting user direction on the design and requirements for the next section.
