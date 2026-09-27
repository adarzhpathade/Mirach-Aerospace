# Memory — Mirach Aerospace Landing Page

Last updated: 2026-09-27 22:13:00 IST  
Current Git Commit: `ebe0e20` on `main` (clean working tree)

---

## 1. What was built

### A. Navigation System (`src/components/navigation/Navbar.tsx`)
- **Global Positioning**: Mounted at root level of `src/app/page.tsx` with `z-[100]` to escape section-level stacking contexts and prevent overlap with underlying CAD graphics.
- **Desktop Architecture (>= 768px)**:
  - Left: Plain editorial wordmark `Mirach` (`font-bold tracking-tight text-2xl sm:text-3xl`).
  - Right: Floating dark navigation container (`bg-[#252324] border border-[#413E40]/60 rounded-md`).
  - Desktop nav links: `About us` (`#about`), `Applications` (`#applications`), `Products` (`#products`), `Why choose us` (`#why-choose-us`), with interactive vertical letter-swap hover animations (`LetterSwapForward`).
  - Desktop CTA button: `Join us` (`#join-us`) in Mirach Blue (`#7DB7FF`, `rounded-[5px]`) with an animated white rectangular slide-up fill effect on hover.
  - **Scroll Compaction**: Smoothly morphs into a compact pill containing a hamburger icon (`≡`) + `Join us` button when scrolling past threshold (`scrollY > 60 || rect.top <= 280`); automatically uncompacts when returned to top (`scrollY < 20`).
  - **Hover-to-Expand**: Hovering over the hamburger icon in compact mode temporarily reveals the full navigation bar inline; collapses back on mouse leave.
  - **Zero Entrance Flash**: Uses `layout={hasMounted}` so initial page load renders immediately without unwanted drop/fade animations.
- **Mobile Architecture (< 768px)**:
  - **In-Place Expanding Container**: Single container positioned at `top-4 bottom-4 left-4 right-4` (`rounded-md`, flat `bg-[#252324]`, `border border-[#413E40]/70`, `shadow-none`, no blur, no backdrop).
  - Smoothly expands height in-place from `54px` (collapsed pill) to `calc(100dvh - 2rem)` (full-screen menu) via Motion cubic bezier easing (`[0.16, 1, 0.3, 1]`).
  - Fixed pill header: White `Mirach` wordmark on left, square `36x36px` Mirach Blue (`#7DB7FF`) toggle button on right.
  - **Precision SVG Hamburger Icon**: Replaced HTML spans with precise SVG vector strokes (`d="M1 1.5H17M1 6H17M1 10.5H17"` with `strokeWidth="2"` and `strokeLinecap="round"`) to ensure mathematically equal visual weight across high-DPI displays.
  - Mobile nav links: Clean vertical stack of exact site options (`About us`, `Applications`, `Products`, `Why choose us`) in `text-3xl sm:text-4xl text-white hover:text-[#7DB7FF]`.
  - Utility footer links: `LinkedIn`, `Terms & Conditions`, `Privacy Policy`.
  - Mobile CTA: Full-width `Join us` button with white slide-up hover fill, matching desktop brand standards without external arrows or placeholder text.
  - Automatic body scroll lock (`document.body.style.overflow = "hidden"`) when open.
  - Desktop scroll listeners completely bypassed on mobile viewports to prevent event thread contention.

### B. Hero Section (`src/components/sections/HeroSection.tsx`)
- **Dual-Block Editorial & Technical Blueprint Layout**:
  - **Top Block (#F1F7FF Light Blue Editorial Intro)**:
    - `id="hero-top-block"`
    - Stable mobile height set to `min-h-[60svh] sm:min-h-[60vh] md:min-h-[500px] lg:min-h-[540px] xl:min-h-[58vh]` (using Small Viewport Height to prevent URL-bar resize jumping).
    - Large display headline: *"Airborne innovation with precision."* — scaled on mobile to `text-[36px] min-[390px]:text-[42px]` (`leading-[1.08]`) and smoothly expanding to `sm:text-5xl md:text-6xl lg:text-[66px]`.
    - Right column mission statement paragraph (`text-base sm:text-[17px] lg:text-[18.5px] leading-[1.5] text-[#383536]`).
    - Parallax lift and fade effect (`y: -45px`, `opacity: 0.72`) scoped strictly to desktop (`>= 768px`).
  - **Bottom Block (#252324 Dark Charcoal CAD Blueprint Container)**:
    - `id="hero-lower-block"`
    - Mobile height expanded to `min-h-[700px] sm:min-h-[620px] lg:min-h-[580px] xl:min-h-[66vh]` to ensure the CAD drone graphic never collides with or overlaps the bottom feature list.
    - Subtle CAD grid background (40px grid in `rgba(125, 183, 255, 0.08)`).
    - Top-left label: *"Your autonomous UAS design and build partners"*.
    - Bottom-left feature list: 4 items (`PO to shipped in 4 weeks`, `Fast, intuitive quotes`, `UL 508A listed by default`, `Automated build process`) with divider lines and `LetterSwapForward` hover interactions.
    - **Center-Right CAD Drone Graphic**:
      - High-resolution `Hero Drone Side.png` (`1536x1024`).
      - Centered vertically on mobile at `top-[39%]` to provide 90px of clear breathing room above the feature list; on desktop positioned at `top-1/2 -translate-y-1/2` on the right column (`lg:w-[70%] xl:w-[66%]`).
      - `will-change-transform` and heavy drop-shadow filters scoped strictly to desktop (`md:will-change-transform`, `md:drop-shadow-[...]`) to protect mobile GPU texture memory.

### C. About Section (`src/components/sections/AboutSection.tsx`)
- **Mirach Light Blue Editorial Surface (#F1F7FF)**:
  - `id="about"`
  - Positioned directly below Hero's dark block with a subtle border divider (`border-t border-[#252324]/10`).
  - **Unified Two-Column Responsive Grid (`grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 xl:gap-28`)**:
    - **Top Row**:
      - Left column: Square indicator bullet (`w-2.5 h-2.5 rounded-[2px] bg-[#252324]`) + *"How we work"* (`text-[15px] font-medium text-[#252324]`).
      - Right column: Large editorial statement paragraph (*"We’ve got your tactical aerospace platforms covered..."*) in clean, unbolded, neutral typography (`text-xl sm:text-2xl lg:text-[26px] xl:text-[28px] text-[#252324]`).
      - Action CTA button: *"Explore capabilities"* (`bg-[#252324]` dark charcoal base, white text, and Mirach Blue `#7DB7FF` rectangular slide-up fill effect on hover).
    - **Section Divider**: Full-width subtle horizontal rule (`border-t border-[#252324]/12`).
    - **Bottom Row**:
      - Left column: *"Vision"* heading (`text-xl sm:text-2xl font-medium text-[#252324]`) + clean description of sustainable Made-in-India AI aerial transformation.
      - Right column: *"Mission"* heading + clean description of mission-ready drone engineering and actionable intelligence.
  - GSAP ScrollTrigger reveal scoped exclusively to desktop; zero mobile scroll calculation overhead.

### D. Dynamic Mobile Dock & Status Bar (`src/components/ui/DynamicThemeColor.tsx`)
- Hardware-backed `IntersectionObserver` observing sections:
  - Top Hero block (`#hero-top-block`): `#F1F7FF`
  - Dark CAD blueprint lower block (`#hero-lower-block`): `#252324`
  - About section (`#about`): `#F1F7FF`
  - Mobile menu open state: `#252324`
- Dynamically updates `<meta name="theme-color">` with root margin `-10px 0px -75% 0px`.
- On iOS Safari (status bar notch & bottom floating tab dock) and Android Chrome (address bar), the browser UI smoothly transitions color to match the section currently on screen.

### E. Smooth Scroll & Animation Architecture (`src/components/providers/SmoothScroll.tsx`)
- **Desktop (>= 768px)**:
  - Powered by Lenis v1.3.26.
  - Synchronized with GSAP's central ticker (`gsap.ticker.add((time) => lenis.raf(time * 1000))`, `lenis.on("scroll", ScrollTrigger.update)`, and `gsap.ticker.lagSmoothing(0)`).
  - Respects accessibility via `prefers-reduced-motion`.
- **Mobile Touch Bypass (< 768px / pointer: coarse)**:
  - Lenis is completely bypassed on touch devices; removes Lenis HTML classes and allows 100% native browser compositor-thread momentum scrolling at 120Hz ProMotion refresh rates.

### F. Global Styles & Compositor Rules (`src/app/globals.css`)
- Replaced `body { overflow-x: hidden }` with `html, body { overflow-x: clip }` to eliminate iOS WebKit scroll-container bugs.
- Removed universal selector scrollbar reset (`* { scrollbar-width: none }`) and targeted `html, body` directly to avoid DOM-wide style invalidation.
- Set `html { scroll-behavior: auto }` to prevent conflicts between native CSS smooth scrolling and gesture dragging.

### G. Production Metadata & Layout (`src/app/layout.tsx`)
- Next.js `Viewport` configured with `themeColor: "#F1F7FF"` and `viewportFit: "cover"`.
- Production-grade SEO metadata: OpenGraph cards, Twitter large image cards, Apple web app meta tags (`apple-mobile-web-app-capable: yes`), search indexing directives, and keywords.
- Pre-loaded self-hosted Instrument Sans font (WOFF2).

### H. Project Documentation (`README.md` & `company-profile.md`)
- Comprehensive `README.md` containing official company credentials:
  - DPIIT- and MSME-certified defence deep-tech aerospace company.
  - Incubated at **IIT Indore (Drishti CPS Foundation)** and **IIM Udaipur Incubation Centre**.
  - Strategic manufacturing partner: **Electropneumatics & Hydraulics (I) Pvt. Ltd.**
  - Headquarters in Indore (MP) and aerospace tech hub in Bengaluru (Karnataka).
  - Full product platform profiles: **Zeus β** (VTOL Tailsitter), **Bolt** (Loiter Munition), **X777** (Fixed-wing), **Eagleray** (Heavy-lift VTOL logistics).
  - System architecture, color tokens, and getting-started guide.

---

## 2. Key Decisions Made

1. **Strict Section-by-Section Workflow ([AGENTS.md](file:///e:/Projects/Landing%20Pages/Mirach%20Aerospace/AGENTS.md))**:
   - Every section is implemented iteratively upon explicit user instruction. No future sections are invented or stubbed ahead of time.
2. **Industrial Aesthetic & "No Curves" Rule**:
   - Strictly avoid generic SaaS rounded pills (`rounded-full`) or card depth. Use crisp industrial geometry (`rounded-md`, `rounded-[5px]`).
3. **Mobile Menu Architecture**:
   - In-place container expansion instead of off-screen drop-downs or sliding overlays.
   - Flat styling (solid `#252324`, no drop shadows, no blur).
   - Menu items strictly reflect the actual site navigation (`About us`, `Applications`, `Products`, `Why choose us`, `Join us`).
4. **Mobile Scroll Optimization Standard**:
   - Use Small Viewport Height (`svh`) for mobile containers to eliminate URL-bar resize jank.
   - Zero GSAP ScrollTriggers running on mobile devices.
   - Zero scroll event listeners running on mobile devices.
   - GPU layers (`will-change: transform`) scoped strictly to desktop breakpoints.
5. **Button Design System**:
   - Nav CTA: Mirach Blue (`#7DB7FF`) base with white slide-up rectangle fill on hover.
   - Section CTAs: Dark Charcoal (`#252324`) base with Mirach Blue (`#7DB7FF`) slide-up rectangle fill on hover.
   - No arrow glyphs (e.g. `↳`).
6. **Official Color Tokens**:
   - Dark background: `#252324`
   - Light industrial background: `#EDE8E4`
   - Light editorial / About surface: `#F1F7FF`
   - Primary technical accent: `#7DB7FF`
   - Card / border grays: `#413E40` and `#625D60`

---

## 3. Problems Solved

1. **Mobile Scroll Jitter & Lag**:
   - *Problem*: Mobile scroll felt jittery and laggy due to dynamic `dvh` recalculations when the mobile browser URL bar collapsed/expanded, coupled with multiple `will-change-transform` GPU layers and active GSAP ScrollTrigger listeners.
   - *Fix*: Switched `min-h-[60dvh]` to static `min-h-[60svh]`, scoped `will-change-transform` to `md:`, bypassed Lenis and GSAP ScrollTriggers on touch devices, and used `overflow-x: clip` on `html, body`.
2. **Mobile CAD Drone & Feature List Overlap**:
   - *Problem*: In the lower dark box on mobile, the CAD drone blueprint overlapped directly onto the 4-item feature list.
   - *Fix*: Increased the container's mobile height from `500px` to `700px` (`min-h-[700px]`) and positioned the drone at `top-[39%]` with `h-[260px]`, creating 90px of clear space above the feature list.
3. **Navbar Stacking Context Collisions**:
   - *Problem*: Mounting `<Navbar />` inside the hero section trapped it in the hero's stacking context, causing the lower block CAD drone to bleed across the navigation bar.
   - *Fix*: Elevated `<Navbar />` to the root level of `src/app/page.tsx` with `z-[100]`.
4. **Subpixel Hamburger Stroke Discrepancy**:
   - *Problem*: Using HTML flex `span` tags with fractional pixel heights caused subpixel rasterization rounding errors on different mobile displays, making the top bar appear thinner.
   - *Fix*: Replaced HTML spans with precise SVG vector strokes (`strokeWidth="2"`).
5. **Mobile Browser Dock & Status Bar Theme Matching**:
   - *Problem*: When scrolling between light `#F1F7FF` and dark `#252324` sections on mobile Safari and Chrome, the phone's status bar and dock clashed with the background.
   - *Fix*: Built `DynamicThemeColor.tsx` using `IntersectionObserver` to dynamically transition `<meta name="theme-color">` between `#F1F7FF` and `#252324`.

---

## 4. Current State

- **Development Server**: Running on `http://localhost:3000` (HTTP 200 OK).
- **Production Build**: Verified with `npm run build` (Turbopack, static prerendering, 0 errors, 0 warnings).
- **TypeScript**: Compiles cleanly (`npx tsc --noEmit` exit code 0).
- **Git Branch**: `main` at commit `ebe0e20`, working tree clean.
- **Completed Sections**:
  1. Root Navbar (Desktop dynamic compaction + mobile in-place expanding menu).
  2. Hero Section (Dual-block: 60svh Light Blue + 700px Dark Charcoal CAD container).
  3. About Section (Light Blue unified 2-column grid: How We Work, statement, CTA, Vision & Mission).

---

## 5. Next Session Starts With

- Receive user instructions/reference for the next section of the website (e.g., Capabilities, Products / Tactical UAS Platforms, Applications, or Why Choose Us).
- Maintain established design tokens, typography scale, CAD blueprint language, and mobile performance architecture.

---

## 6. Open Questions

- Awaiting user direction on the design, assets, and requirements for the next section.
