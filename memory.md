# Memory — Mirach Aerospace Landing Page

Last updated: 2026-09-28 02:26:00 IST  
Current Git Branch: `main`

---

## 1. What was built

### A. Values Section & CAD Drone Schematics (`src/components/sections/ValuesSection.tsx` & `src/components/cards/ValueCard.tsx`)
- **Sticky Light Blue Section Header (`#F1F7FF`)**:
  - Pinned/sticky at `top: 0` with explicit inline `style={{ paddingTop: "92px" }}` to flow cleanly behind the fixed desktop navbar while clearing the `Mirach` wordmark by over 35px without text collision.
  - Contains category pill (`Core Philosophy & Engineering Standards`), display title (`Our Values`), and right-aligned narrative description.
  - Card stacking container uses `flex-1 min-h-0` so the pinned card stack occupies the remaining ~75% viewport height below the header.
- **ValueCard Content Sizing & Proportions**:
  - Grouped display title (`text-3xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[60px] font-normal leading-[1.08]`) and tagline (`text-sm sm:text-base lg:text-[16.5px]`) into a unified editorial block, eliminating previous vertical empty voids.
  - CAD diagram box scaled to `w-full md:w-[380px] lg:w-[440px] xl:w-[480px] h-[195px] sm:h-[215px] md:h-[220px] lg:h-[240px]` and vertically centered with `md:items-center`.
  - Mobile card sizing: Added `min-h-[560px] sm:min-h-[620px] md:min-h-0` with expanded vertical padding (`pt-8 sm:pt-10 pb-6 sm:pb-7`) and `py-5 sm:py-5.5` on the bottom row to prevent cramped mobile views.
- **Authentic Aerospace Drone CAD Blueprints (Replacing Abstract Circuit Symbols)**:
  1. **Card 01 — `Leadership focused` (`guidance`)**:
     - Tactical Delta-Wing UAV Airframe with swept elevons, forward canards, Pitot airspeed tube, forward radar wavefront arcs, and an electro-optical nose turret with target acquisition crosshairs and azimuth telemetry coordinates (`AZ: 042°`, `FOV: 45°`).
  2. **Card 02 — `Quality first` (`resistor`)**:
     - High-precision aerospace brushless outrunner motor assembly with balanced carbon-fiber propeller blade (`Ø 18.5" x 6.5`), 12 stator teeth, bearing race, 4 crosshair bolt holes, and tolerance callout (`TOL: ±0.012mm`).
  3. **Card 03 — `Growth and skill development` (`diode`)**:
     - High-altitude tactical airframe with internal wing structural rib stations (`WINGSPAN: 3,400mm`), continuous central spar, dual propulsion nacelles with propeller discs, central neural edge AI processor, V-tail stabilizers, and dynamic ascending flight envelope arc (`AUTONOMOUS CEILING: 16,000m`).
  4. **Card 04 — `Trust and teamwork` (`network`)**:
     - 3-UAV tactical drone swarm in synchronized V-formation with encrypted datalink mesh lines (`AES-256 MESH`), swarm centroid coordinate diamond, ranging distance callouts (`45m`), and true bearing telemetry.

### B. Applications Section (`src/components/sections/ApplicationsSection.tsx`)
- Full-width domain dossier carousel on light `#EDE8E4` background with domain selector tabs (`Defence & Security`, `Research & Development`, `Composite Manufacturing`, etc.).
- High-impact CAD blueprint viewport showcasing active domain platform specifications, operational ceiling, telemetry encryption, and mission dossier download.
- Desktop navigation buttons positioned on the right, lower-aligned with the 2-line heading, featuring signature white slide-up hover fill.

### C. Products Section (`src/components/sections/ProductsSection.tsx`)
- **Wide Card Carousel Layout**:
  - Each platform (`UAS-01 Valkyrie Tactical ISR`, `UAS-02 Straton High-Altitude`, `UAS-03 AeroCargo Logistics`) is housed inside an expansive dark aerospace card (`bg-[#252324]` with `#413E40` borders).
  - Left column: CAD technical blueprint viewport with custom SVG airframes (Delta tactical wing, solar-assisted high-altitude platform, and tandem heavy-lift logistics carrier).
  - Right column: Platform classification badge, title, headline, technical specifications grid, narrative overview, platform counter (`01 / 03`), and dossier CTA button with signature slide-up hover effect.
- **Timed Auto-Scroll with Pause-on-Hover**:
  - Slides horizontally every 6 seconds with smooth Motion cubic-bezier easing (`[0.16, 1, 0.3, 1]`).
  - Automatically pauses when hovered or interacted with; supports touch swipe gestures (`onTouchStart`/`onTouchEnd`).
- **Clean 2-Line Header & Arrow Navigation**:
  - Headline formatted cleanly across exactly 2 lines:
    > Engineered for sovereign control,  
    > endurance, and operational superiority.
  - Removed clutter tags from top bar; retained sleek `[ ← ]` and `[ → ]` navigation buttons on the right.

### D. Global Enhancements & Scrollbar Cleaning (`src/app/globals.css` & `SmoothScroll.tsx`)
- Global scrollbar suppression across all browsers (`scrollbar-width: none !important`, `-webkit-appearance: none !important`).
- Lenis instance exposed to `window.__lenis` for coordinated script access.
- Dynamic theme color observer updated for `applications` section.

---

## 2. Key Decisions Made

1. **Drone-Specific Visuals in Value Cards**: Replaced generic electrical schematics (resistors, diodes) with authentic aerospace CAD blueprints of tactical airframes, brushless propulsion assemblies, internal wing ribs, and drone swarm datalink meshes.
2. **Products Wide-Card Carousel Architecture**: Adopted horizontal wide-card sliding carousel for Products section with timed auto-advance and interactive `[ ← ]` / `[ → ]` navigation.
3. **Section Header 2-Line Constraint**: Headings in major sections follow a clean 2-line maximum with responsive inline breaks to maintain crisp editorial layout.
4. **Collision-Proof Sticky Headers**: Sticky section headers use explicit top padding (`paddingTop: "92px"`) to allow background colors to flow behind the fixed Navbar without colliding with the `Mirach` wordmark.

---

## 3. Problems Solved

1. **Fixed Navbar Collision with "Our Values" Header**:
   - *Problem*: Sticky header text collided directly with the fixed `Mirach` navbar wordmark when scrolling.
   - *Fix*: Applied `style={{ paddingTop: "92px" }}` to the sticky header container, ensuring the light-blue background extends to `top: 0` while text begins safely below the navbar.
2. **Value Cards Empty Vertical Voids**:
   - *Problem*: `justify-between` spread title and tagline to opposite vertical ends of the card, leaving an empty center.
   - *Fix*: Grouped title and tagline into a unified column and centered content vertically with `md:items-center`.
3. **Mobile Value Card Height**:
   - *Problem*: Cards were too compact on mobile, causing elements to feel squeezed.
   - *Fix*: Introduced `min-h-[560px] sm:min-h-[620px]` on mobile with expanded vertical padding and larger CAD boxes.
4. **Products Header Line Wraps**:
   - *Problem*: Bulky product tag buttons in the header forced the headline to wrap across 5 lines.
   - *Fix*: Removed tag pills from the top header, formatted the headline cleanly in 2 lines with `max-w-[1080px]`, and placed arrow buttons neatly on the right.

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
  4. Values Section (Sticky `#F1F7FF` header + 4-card pinned stack with drone CAD schematics and sliding underline buttons).
  5. Applications Section (Full-width domain dossier carousel with CAD blueprint image viewport and nav buttons).
  6. Products Section (Wide-card auto-scrolling carousel with CAD airframe schematics and arrow navigation).

---

## 5. Next Session Starts With

- Products section refinement / user asset integration (as instructed: *"we will work on products section later"*).
- Awaiting user instructions for the next section or design adjustments.
