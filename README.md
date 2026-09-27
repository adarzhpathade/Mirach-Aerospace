# Mirach Aerospace

> **Airborne innovation with precision.**  
> *Giving wings to autonomous unmanned aerial mobility with purpose and excellence.*

---

## 1. Company Overview

**Mirach Aerospace** (Mirach Aerospace Private Limited) is a DPIIT- and MSME-certified defence deep-tech aerospace manufacturing and research company based in India. Mirach Aerospace engineers purpose-built tactical and logistical Unmanned Aerial Systems (UAS) featuring edge-computed Artificial Intelligence from concept to execution.

- **Classification:** DPIIT-certified, MSME-certified Defence Deep-Tech Manufacturer
- **CIN:** `U30305MP2025PTC079134` | **GSTIN:** `23AATCM8995Q1Z2`
- **Headquarters & Prototyping:** 423, Platinum Paradise, Nipania Bypass Road, Indore, Madhya Pradesh, 452016
- **Aerospace Technology Hub:** Bengaluru, Karnataka
- **Official Website:** [mirachaerospace.com](https://www.mirachaerospace.com)
- **Contact:** `info@mirachaerospace.com`

### Incubation & Industrial Alliances
- **Academic & Deep-Tech Incubation:**
  - **IIT Indore:** Incubated under the **Drishti CPS Foundation** (I-Hub Foundation for Cyber-Physical Systems).
  - **IIM Udaipur:** Incubated at the **IIM Udaipur Incubation Centre**.
- **Strategic Industrial Partner:**
  - **Electropneumatics & Hydraulics (I) Pvt. Ltd. (Electro Pneumatics):** Advanced manufacturing and engineering execution.

---

## 2. Mission & Vision

### Vision
> *"To create sustainable transformation with reliable, accessible, and Made-in-India aerial systems with Artificial Intelligence inbuilt."*

### Mission
> *"To engineer innovative, mission-ready drone solutions that deliver reliability where it matters through precision and actionable intelligence."*

### Core Operational Verticals
1. **Defence & Security:** Border surveillance, tactical loiter munitions, target acquisition, perimeter defense, and swarming operations.
2. **Government & Strategic Logistics:** High-altitude Himalayan logistics supply for armed forces, emergency medical dispatch, and disaster response.
3. **Civil & Industrial Infrastructure:** Critical asset inspection, industrial survey, corridor mapping, and automated perimeter reconnaissance.

---

## 3. Flagship UAS Platforms

| Platform | Category | Primary Profile | Key Specs |
|---|---|---|---|
| **Zeus β** | Autonomous Tailsitter VTOL UAV | Tactical surveillance, border reconnaissance | Max Speed: `120 km/h` • Range: `60 km` • Endurance: `60 min` • Payload: `1.5 kg` |
| **Bolt** | Tactical Loiter Munition Multicopter | Precision loitering munition, target acquisition, swarm strike | Agile tactical multirotor architecture |
| **X777** | Long-Range Fixed-Wing UAS | Strategic corridor surveillance, wide-area mapping | High-endurance fixed-wing aerodynamic platform |
| **Eagleray** | Heavy-Lift VTOL Logistics & UAM | High-terrain armed forces supply, emergency medical delivery | Large-class vertical take-off and landing transport |

---

## 4. Website Engineering & Design System

The Mirach Aerospace digital experience is built as a high-precision, motion-driven digital engineering platform combining aerospace technical documentation, CAD blueprint schematics, and modern editorial typography.

### Technology Stack
- **Framework:** [Next.js](https://nextjs.org/) (App Router, React 19)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Motion & Timelines:** [GSAP](https://gsap.com/) (`ScrollTrigger`, `@gsap/react`, `useGSAP`)
- **Micro-Interactions & Gestures:** [Motion](https://motion.dev/) (`motion/react`)
- **Smooth Scrolling:** [Lenis](https://lenis.darkroom.engineering/) (Desktop pointer-optimized)
- **Typography:** Instrument Sans (Self-hosted WOFF2 via `next/font/local`)

### Official Color Tokens
```css
:root {
  --mirach-dark-bg: #252324;      /* Deep industrial charcoal (primary dark surface) */
  --mirach-light-bg: #ede8e4;     /* Warm titanium off-white */
  --mirach-light-blue: #f1f7ff;   /* Mirach light blue editorial surface */
  --mirach-blue: #7db7ff;         /* Primary technical accent blue */
  --mirach-card-dark: #413e40;    /* Card and divider dark surface */
  --mirach-card-muted: #625d60;   /* Secondary technical surface */
}
```

---

## 5. Mobile & Production Optimizations

- **Dynamic Mobile Dock / Status Bar Adaptation:**
  - Integrated `<DynamicThemeColor />` using hardware `IntersectionObserver` to dynamically transition the mobile browser UI chrome (iOS Safari status bar and bottom floating tab dock, Android Chrome address bar) between `#F1F7FF` and `#252324` in sync with the active screen section.
  - Automatically turns dark `#252324` when the mobile navigation menu expands.
- **Buttery-Smooth 120Hz Mobile Scrolling:**
  - Replaced `overflow-x: hidden` with `overflow-x: clip` in [globals.css](file:///e:/Projects/Landing%20Pages/Mirach%20Aerospace/src/app/globals.css) to eliminate the iOS WebKit scroll-container bug and restore native GPU compositor-driven momentum.
  - Eliminated dynamic `dvh` resize jank by adopting stable Small Viewport Height (`svh`).
  - Scoped GPU compositing layers (`will-change: transform`) exclusively to desktop breakpoints (`md:will-change-transform`) to prevent mobile GPU memory thrashing.
  - Bypassed desktop scroll listeners and ScrollTriggers on touch screens for zero main-thread contention.
- **In-Place Expanding Mobile Menu:**
  - Flat, industrial aesthetic without drop shadows, blurs, or off-screen drop-downs.
  - Matches the exact desktop site hierarchy (`About us`, `Applications`, `Products`, `Why choose us`, `Join us`).
  - Precision SVG hamburger strokes with uniform visual weight across all pixel densities.
- **Production-Ready SEO & PWA Metadata:**
  - OpenGraph cards, Twitter preview cards, Apple mobile web app capability tags, search crawler directives, and descriptive semantic markup.

---

## 6. Project Architecture

```text
src/
├── app/
│   ├── globals.css                # Tailwind CSS v4 tokens & compositor rules
│   ├── layout.tsx                 # Root layout with SEO metadata & viewport settings
│   └── page.tsx                   # Main page assembling root Navbar & sections
├── components/
│   ├── fancy/text/                # Interactive typography animations (LetterSwapForward)
│   ├── navigation/
│   │   └── Navbar.tsx             # Responsive navbar with desktop compaction & mobile expanding menu
│   ├── providers/
│   │   └── SmoothScroll.tsx       # Lenis smooth scroll provider (desktop pointer-optimized)
│   ├── sections/
│   │   ├── HeroSection.tsx        # Dual-block layout with side CAD drone blueprint & parallax
│   │   └── AboutSection.tsx       # Light blue editorial surface (How We Work, Vision & Mission)
│   └── ui/
│       └── DynamicThemeColor.tsx  # Dynamic mobile status bar & dock theme-color synchronizer
public/
├── fonts/                         # Instrument Sans self-hosted WOFF2 assets
└── images/                        # High-resolution CAD schematics & technical blueprints
```

---

## 7. Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.17+ or v20+)
- npm, pnpm, or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/adarzhpathade/Mirach-Aerospace.git

# Navigate to project directory
cd Mirach-Aerospace

# Install dependencies
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### Production Build
```bash
# Compile and optimize for production
npm run build

# Start the production server
npm run start
```

---

## 8. License & Attribution

Copyright © 2026 Mirach Aerospace. All rights reserved.  
Proprietary CAD schematics, technical documentation, and design assets are property of Mirach Aerospace Private Limited.
