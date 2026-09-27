# AGENTS.md --- Mirach Aerospace

## 1. Project Overview

**Project:** Mirach Aerospace\
**Type:** Premium aerospace / drone technology website\
**Framework:** Next.js App Router\
**Language:** TypeScript\
**Styling:** Tailwind CSS v4\
**Primary goal:** Build a highly polished, motion-driven, technically
sophisticated website for Mirach Aerospace, focused on drones, aerospace
engineering, technical capability, reliability, and modern engineering.

The website should feel like a combination of:

-   Aerospace engineering documentation
-   Premium industrial design
-   Technical CAD / blueprint systems
-   Modern editorial web design
-   High-end motion design
-   A sophisticated engineering dashboard

Avoid generic SaaS styling, generic startup landing pages, excessive
rounded cards, excessive gradients, or stock-template aesthetics.

------------------------------------------------------------------------

# 2. Development Workflow --- IMPORTANT

## Build the website section by section

This project will **NOT** be designed and implemented all at once.

The user will provide the design and requirements for each section **one
by one**.

The agent must:

1.  Wait for the user's instructions for the current section.
2.  Implement only the requested section.
3.  Reuse the established design system and project architecture.
4.  Do not invent major sections, layouts, copy, interactions, or visual
    directions that the user has not requested.
5.  Preserve previously completed sections unless the user explicitly
    asks for changes.
6.  Keep components reusable and organized so later sections can build
    on them.
7.  After completing the requested section, stop and wait for the next
    section instruction.

### Do not automatically proceed to the next section.

The user controls the design direction section by section.

------------------------------------------------------------------------

# 3. Browser / Verification Workflow

## DO NOT automatically inspect the browser after every step.

Do **not**:

-   Automatically open the browser after every implementation.
-   Automatically take screenshots after every small change.
-   Automatically inspect the rendered page after every component.
-   Automatically run a visual browser check after every step.
-   Automatically run the full test/build/lint pipeline after every
    small change.

The user explicitly wants the implementation workflow to remain fast and
iterative.

### Instead

After implementing a requested section:

-   Make the code changes.
-   Ensure the code is internally coherent.
-   Do lightweight reasoning about obvious TypeScript/React errors.
-   Do not launch browser verification unless the user requests it or
    there is a specific reason that browser inspection is necessary to
    diagnose a problem.
-   Do not run expensive checks repeatedly after every tiny change.

### When checks ARE appropriate

Run checks when:

-   The user explicitly asks for verification.
-   A major milestone is reached.
-   A dependency/configuration change could cause a project-wide
    failure.
-   A build/runtime error needs diagnosis.
-   The user asks for a final production-readiness check.

------------------------------------------------------------------------

# 4. Technology Stack

Use modern, current, stable versions available at implementation time.

## Core

-   Next.js --- latest stable release
-   React --- latest stable version compatible with the selected Next.js
    version
-   TypeScript --- latest stable
-   Tailwind CSS --- **v4+**
-   ESLint --- current version compatible with the project
-   npm/pnpm according to the existing project setup

As of the current project planning date, Next.js 16.x, Tailwind CSS 4.x,
Motion 13.x, and GSAP 3.15.x are current reference points. **Do not
hard-code outdated versions just because they appear in this document.**
When initializing or updating dependencies, verify the latest stable
versions from official documentation/package sources.

------------------------------------------------------------------------

# 5. Motion & Animation Stack

This is a **motion-driven website**.

Motion is a major part of the visual identity and should be treated as a
first-class design system.

## Primary animation tools

### GSAP

Use GSAP for:

-   Complex timelines
-   Scroll-driven animations
-   ScrollTrigger
-   SVG drawing
-   Morphing
-   Technical diagram animation
-   Large coordinated sequences
-   Pinning sections
-   Horizontal scroll systems
-   Text sequencing when appropriate
-   Complex entrance/exit sequences

Use `@gsap/react` and `useGSAP()` where appropriate in React components.

Prefer GSAP when the animation requires precise timeline control.

### Motion

Use Motion for:

-   Component-level animations
-   Micro-interactions
-   Hover states
-   Button interactions
-   Layout animations
-   Presence animations
-   Small reveal animations
-   Gesture interactions
-   React-native declarative animation behavior

Use the modern package/API:

``` tsx
import { motion } from "motion/react";
```

Use Motion's client-specific import when appropriate for Next.js to
reduce unnecessary client-side JavaScript.

### Lenis

Use Lenis when smooth scrolling is required.

Use it carefully and avoid creating scroll-jacking behavior that makes
the website difficult to navigate.

### CSS

Use native CSS transitions/animations for simple effects.

Do not use GSAP or Motion for trivial:

-   color transitions
-   opacity transitions
-   simple hover states
-   basic transforms

Use the simplest appropriate animation tool.

------------------------------------------------------------------------

# 6. Animation Philosophy

The website should feel **engineered**, not overloaded.

Motion should communicate:

-   Precision
-   Speed
-   Technical sophistication
-   Mechanical movement
-   Aerospace systems
-   Data flow
-   Structural relationships
-   Depth
-   Scale

Avoid:

-   Random bouncing
-   Excessive spring animations
-   Overly playful easing
-   Constant movement
-   Animation for animation's sake
-   Excessive blur
-   Generic SaaS reveal animations

Prefer:

-   Precise easing
-   Controlled acceleration/deceleration
-   Mechanical timing
-   Staggered technical reveals
-   Line drawing
-   Grid movement
-   SVG path animation
-   Slow camera-like movement
-   Controlled parallax
-   Scroll-linked engineering diagrams
-   Layered depth
-   Subtle micro-interactions

Animations should feel like a **precision aerospace system**.

------------------------------------------------------------------------

# 7. Visual Identity

## Brand

**Mirach Aerospace**

The design language should communicate:

> Aerospace engineering + drones + precision + technology +
> reliability + modern industrial design.

The website should look premium without becoming visually noisy.

------------------------------------------------------------------------

# 8. Official Color System

These colors are part of the project's design system.

## Primary Blue

### Dark / Primary Blue

``` text
#7DB7FF
```

Use for:

-   Primary accents
-   Interactive elements
-   Technical highlights
-   Important UI states
-   Lines
-   Icons
-   Data visualizations
-   Selected text
-   Hover states

### Light Blue

``` text
#F1F7FF
```

Use for:

-   Light technical backgrounds
-   Light-mode accents
-   Technical diagrams
-   Soft blue panels
-   Secondary surfaces
-   Highlight regions

------------------------------------------------------------------------

# 9. Background Colors

## Dark Background

``` text
#252324
```

Primary dark-mode background.

Use this as the main deep background rather than pure black.

## Light Background

``` text
#EDE8E4
```

Primary light-mode background.

The light theme should remain warm and slightly industrial rather than
becoming a generic white SaaS interface.

------------------------------------------------------------------------

# 10. Card / Surface Colors

Approved card colors:

``` text
#625D60
#413E40
#252324
#EDE8E4
```

Use these intentionally.

Do not create dozens of random gray shades.

Cards should feel like part of one coherent material system.

------------------------------------------------------------------------

# 11. Color Usage Rules

### Dark mode

Typical relationship:

``` text
Background: #252324
Card:       #413E40 / #625D60
Text:       warm off-white
Accent:     #7DB7FF
Secondary:  muted gray
```

### Light mode

Typical relationship:

``` text
Background: #EDE8E4
Card:       #EDE8E4 / #F1F7FF
Text:       dark charcoal
Accent:     #7DB7FF
```

Blue should be used deliberately.

Do not turn the entire website blue.

------------------------------------------------------------------------

# 12. Technical Illustration Style

A major part of Mirach Aerospace's visual language is **technical CAD /
blueprint illustration**.

Reference style:

-   Thin engineering linework
-   Orthographic views
-   Isometric views
-   Side views
-   Top views
-   Exploded diagrams
-   Mechanical component drawings
-   Drone schematics
-   Electronics diagrams
-   Circuit-like visual systems
-   Technical grids
-   Coordinate systems
-   Measurement-like guides
-   Fine line details
-   Minimal fills
-   Controlled shading
-   Subtle gold/yellow accents where appropriate

The illustrations should feel like:

> A premium aerospace engineering document translated into an
> interactive website.

Avoid generic 3D renders when a technical illustration would communicate
the idea better.

------------------------------------------------------------------------

# 13. Illustration Color Treatment

### Dark background illustration

Use:

-   muted gray/off-white lines
-   subtle warm line colors
-   `#7DB7FF` as an occasional highlight
-   restrained gold/yellow accents

### Light background illustration

Use:

-   muted gray/brown linework
-   `#7DB7FF` selectively
-   subtle warm neutrals
-   restrained gold/yellow accents

Do not make every illustration bright blue.

------------------------------------------------------------------------

# 14. Drone Illustration Requirements

Drone illustrations may include:

-   Top view
-   Side view
-   Front view
-   Rear view
-   Isometric view
-   Exploded view
-   Internal electronics
-   Motors
-   Propellers
-   Camera systems
-   Sensors
-   PCB/electronics
-   Battery
-   Structural arms
-   Mounting systems
-   Mechanical brackets
-   Fasteners

Illustrations should maintain the same technical-line-art language
across all views.

------------------------------------------------------------------------

# 15. Editorial Card System

The site uses large editorial/technical cards rather than conventional
SaaS cards.

Card characteristics:

-   Large typography
-   Strong whitespace
-   Thin borders
-   Minimal UI
-   Technical diagrams
-   Grid systems
-   Fine linework
-   Muted surfaces
-   Small accent details
-   Engineering-style labels
-   Bottom CTAs
-   Editorial composition

Example conceptual structure:

``` text
------------------------------------------------
|                                              |
|  LARGE TITLE                    TECHNICAL     |
|                                 DIAGRAM       |
|                                              |
|                                              |
|  Supporting statement                         |
|                                              |
|  ------------------------------------------  |
|  Description                    CTA →        |
------------------------------------------------
```

Avoid:

-   Excessive rounded cards
-   Heavy shadows
-   Generic dashboard cards
-   Excessive glassmorphism
-   Large gradient blobs

------------------------------------------------------------------------

# 16. Technical UI Graphics

Small graphics may include:

-   Crosshairs
-   Radar systems
-   Circuit symbols
-   Measurement guides
-   Technical grids
-   Nodes
-   Dashed construction lines
-   Arcs
-   Target systems
-   Data paths
-   Mechanical diagrams
-   Signal diagrams
-   Coordinate markers
-   SVG line drawings

These should remain subtle and precise.

------------------------------------------------------------------------

# 17. Typography

Typography should be:

-   Modern
-   Clean
-   Technical
-   Highly legible
-   Editorial
-   Strong at large display sizes

Use a modern sans-serif family.

Prefer a strong display hierarchy:

``` text
Hero / section title
↓
Large supporting title
↓
Short descriptor
↓
Body copy
↓
Technical metadata
```

Avoid overly decorative fonts.

Typography should provide most of the visual hierarchy.

------------------------------------------------------------------------

# 18. Layout

Use:

-   Strong grid systems
-   Large whitespace
-   Full-width sections
-   Asymmetrical editorial compositions where appropriate
-   Precise alignment
-   Thin dividers
-   Technical grids
-   Large viewport compositions

The website should not feel like a collection of centered content
blocks.

------------------------------------------------------------------------

# 19. Responsive Design

Responsive design is required from the beginning.

Support:

-   Large desktop
-   Laptop
-   Tablet
-   Mobile

Do not simply shrink desktop layouts.

For mobile:

-   Recompose complex technical diagrams
-   Reduce unnecessary decorative elements
-   Preserve hierarchy
-   Keep text readable
-   Maintain animation quality
-   Avoid horizontal overflow
-   Avoid huge WebGL payloads where unnecessary

Complex desktop diagrams may be simplified on mobile when required.

------------------------------------------------------------------------

# 20. Performance

This project may contain:

-   GSAP
-   Motion
-   Lenis
-   SVG
-   Canvas
-   WebGL
-   Three.js
-   React Three Fiber
-   Large technical illustrations

Performance must remain a priority.

Rules:

-   Prefer SVG for technical diagrams.
-   Optimize images.
-   Lazy-load heavy visual assets.
-   Dynamically import expensive client components.
-   Avoid loading Three.js/WebGL on pages that do not need it.
-   Use GPU-friendly transforms.
-   Avoid animating layout properties unnecessarily.
-   Prefer transform and opacity for high-frequency animation.
-   Respect `prefers-reduced-motion`.
-   Avoid unnecessary React re-renders.
-   Keep client components limited to interactive areas.

------------------------------------------------------------------------

# 21. 3D / WebGL

3D may be used when the section design requires it.

Preferred stack when needed:

-   Three.js
-   React Three Fiber
-   Drei
-   GSAP / Motion for surrounding UI choreography

Do not add WebGL simply because it is technically possible.

Every 3D element should have a clear visual purpose.

------------------------------------------------------------------------

# 22. Component Architecture

Use reusable components.

Suggested structure:

``` text
src/
├── app/
├── components/
│   ├── layout/
│   ├── navigation/
│   ├── sections/
│   ├── cards/
│   ├── technical/
│   ├── motion/
│   └── ui/
├── lib/
├── hooks/
├── data/
├── styles/
└── public/
```

The exact structure may evolve as the project develops.

Do not over-engineer prematurely.

------------------------------------------------------------------------

# 23. Section Architecture

Each major section should ideally have its own component.

Example:

``` tsx
<Hero />
<About />
<Capabilities />
<Technology />
<Engineering />
<Applications />
<CTA />
<Footer />
```

These are examples only.

**Do not implement these sections unless the user asks for them.**

The user will define the actual page section by section.

------------------------------------------------------------------------

# 24. Tailwind CSS

Use **Tailwind CSS v4**.

Prefer Tailwind's modern CSS-first configuration approach.

Create centralized design tokens using CSS variables where appropriate.

Example:

``` css
:root {
  --mirach-dark-bg: #252324;
  --mirach-light-bg: #ede8e4;
  --mirach-blue: #7db7ff;
  --mirach-light-blue: #f1f7ff;
  --mirach-card-dark: #413e40;
  --mirach-card-muted: #625d60;
}
```

Do not scatter hard-coded colors throughout components when a design
token is appropriate.

------------------------------------------------------------------------

# 25. Icons

Use a consistent icon system.

Lucide or another modern SVG icon library may be used where appropriate.

Technical icons should remain minimal and geometric.

Avoid mixing many unrelated icon styles.

------------------------------------------------------------------------

# 26. SVG Guidelines

SVG is highly encouraged for:

-   Technical illustrations
-   Drone diagrams
-   Grids
-   Icons
-   Line systems
-   Animated paths
-   Engineering schematics

SVG paths may be animated with GSAP when appropriate.

Use `stroke`, `pathLength`, transforms, and controlled opacity for
technical drawing animations.

------------------------------------------------------------------------

# 27. Accessibility

Accessibility is required.

Ensure:

-   Semantic HTML
-   Keyboard navigation
-   Visible focus states
-   Accessible buttons
-   Meaningful alt text
-   Sufficient contrast
-   Reduced-motion support
-   No interaction that depends solely on hover
-   No critical content hidden behind animation

Animations should never prevent users from accessing content.

------------------------------------------------------------------------

# 28. Motion Accessibility

Respect:

``` css
@media (prefers-reduced-motion: reduce)
```

For reduced-motion users:

-   Disable large parallax
-   Reduce scroll-linked movement
-   Remove unnecessary transforms
-   Keep opacity transitions short
-   Preserve content and functionality

------------------------------------------------------------------------

# 29. Code Quality

Write:

-   Clean TypeScript
-   Strong component boundaries
-   Small reusable components
-   Clear naming
-   Minimal duplication
-   No unnecessary abstraction
-   No dead code
-   No unused dependencies

Prefer composition over huge components.

Avoid putting an entire section into one 1000+ line component.

------------------------------------------------------------------------

# 30. Dependencies

Use modern libraries where they provide real value.

Potential stack:

-   Next.js
-   React
-   TypeScript
-   Tailwind CSS v4
-   Motion
-   GSAP
-   @gsap/react
-   Lenis
-   Three.js when required
-   React Three Fiber when required
-   Drei when required
-   Lucide React
-   clsx
-   tailwind-merge

Do not install every library automatically if the current section does
not need it.

Use the smallest appropriate set of dependencies while maintaining the
project's motion-heavy visual direction.

------------------------------------------------------------------------

# 31. Dependency Version Policy

Always prefer the latest **stable** compatible release when installing a
package.

Before adding/updating major dependencies:

1.  Check the official documentation or package registry.
2.  Confirm compatibility with the current Next.js/React version.
3.  Use stable releases rather than experimental releases unless the
    user explicitly requests experimental functionality.
4.  Avoid unnecessary dependency churn once the project is stable.

Never blindly downgrade a package just to follow an old tutorial.

------------------------------------------------------------------------

# 32. Avoid Overengineering

Do not introduce:

-   Unnecessary state management
-   Unnecessary backend infrastructure
-   Unnecessary animation libraries
-   Unnecessary abstraction layers
-   Complex CMS architecture
-   Large UI libraries when a small component is sufficient

The project should remain maintainable.

------------------------------------------------------------------------

# 33. Design Fidelity

When the user provides an image, screenshot, reference, or design
instruction:

**Treat it as the source of truth for that section.**

Do not redesign it according to personal preference.

Match:

-   Spacing
-   Composition
-   Typography hierarchy
-   Color relationships
-   Borders
-   Grid
-   Illustration style
-   Animation intent
-   Responsive behavior

If an exact visual detail cannot be reproduced literally, create the
closest technically appropriate implementation while preserving the
design language.

------------------------------------------------------------------------

# 34. User-Provided Assets

When the user provides:

-   Drone illustrations
-   Technical diagrams
-   Logos
-   Images
-   SVGs
-   Videos
-   Fonts
-   Screenshots

Use them as design references or assets according to the user's
instructions.

Do not replace a supplied asset with a generic stock alternative unless
explicitly requested.

------------------------------------------------------------------------

# 35. Content

Do not invent important company claims.

For Mirach Aerospace-specific information:

-   Use content supplied by the user.
-   Use placeholders only when necessary.
-   Clearly mark placeholders.
-   Do not fabricate certifications, capabilities, clients, statistics,
    flight records, or engineering claims.

------------------------------------------------------------------------

# 36. Section Completion Rule

After completing the section requested by the user:

-   Do not continue designing the next section.
-   Do not add unsolicited features.
-   Do not restructure unrelated sections.
-   Do not automatically run browser inspection.
-   Do not automatically run the complete project test suite.
-   Briefly report what was implemented.
-   Wait for the user's next design instruction.

------------------------------------------------------------------------

# 37. Agent Decision Hierarchy

When making implementation decisions, follow this order:

1.  **User's current section instructions**
2.  **Provided screenshot/design reference**
3.  **Existing Mirach Aerospace design system**
4.  **This AGENTS.md**
5.  **Established project architecture**
6.  **Modern framework best practices**

The user's explicit current-section instruction takes priority over
generic design assumptions.

------------------------------------------------------------------------

# 38. Final Visual Goal

The finished Mirach Aerospace website should feel like:

> **A premium digital engineering environment for an aerospace company
> --- precise, technical, cinematic, modern, and highly intentional.**

It should combine:

**Aerospace engineering** + **Technical CAD illustration** + **Editorial
typography** + **Industrial design** + **Advanced motion** + **Modern
web technology**

without becoming visually cluttered.

------------------------------------------------------------------------

# 39. Non-Negotiables

-   Next.js App Router
-   TypeScript
-   Tailwind CSS v4+
-   Modern stable dependencies
-   Motion-driven interactions
-   GSAP available for complex motion
-   Lenis when smooth scrolling is required
-   Technical/CAD illustration language
-   Mirach Aerospace color system
-   Section-by-section development
-   User controls the design direction
-   No automatic browser inspection after every step
-   No automatic full checks after every step
-   Responsive implementation
-   Performance-conscious animation
-   Accessibility-conscious motion
-   No generic SaaS visual language
-   No invented company claims
-   Do not proceed to the next section without user instructions
