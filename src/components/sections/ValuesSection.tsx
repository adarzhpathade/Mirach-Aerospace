"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ValueCard } from "@/components/cards/ValueCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// 4 Values mapped to the 4 approved card/surface colors in AGENTS.md:
// #413E40, #625D60, #252324, #EDE8E4
const VALUES_DATA = [
  {
    id: "leadership",
    title: "Leadership focused",
    tagline: "Own the outcome.\nDecisive execution.",
    description:
      "Own outcomes, act decisively and solve problems proactively to prevent mistakes and lead the team to excellence.",
    diagramType: "guidance" as const,
    bgColor: "#413E40",
    borderColor: "border-[#625D60]/50",
    isLight: false,
    ctaText: "Partner with us",
    ctaHref: "#join-us",
  },
  {
    id: "quality",
    title: "Quality first",
    tagline: "Aerospace precision.\nZero compromise.",
    description:
      "Refuse to settle for less. Prioritize details, critical analysis, and excellence, delivering results that consistently meet the highest aerospace standards.",
    diagramType: "resistor" as const,
    bgColor: "#625D60",
    borderColor: "border-[#413E40]/70",
    isLight: false,
    ctaText: "Partner with us",
    ctaHref: "#join-us",
  },
  {
    id: "growth",
    title: "Growth and skill development",
    tagline: "Continuous learning.\nDeep capability.",
    description:
      "Foster continuous learning and upskilling. Reward initiative and dedication to drive personal development and aerospace innovation.",
    diagramType: "diode" as const,
    bgColor: "#252324",
    borderColor: "border-[#625D60]/40",
    isLight: false,
    ctaText: "Partner with us",
    ctaHref: "#join-us",
  },
  {
    id: "trust",
    title: "Trust and teamwork",
    tagline: "Unified accountability.\nShared flight.",
    description:
      "Build trust through clear communication, collaboration, and accountability. Share knowledge and follow through to grow together.",
    diagramType: "network" as const,
    bgColor: "#EDE8E4",
    borderColor: "border-[#252324]/15",
    isLight: true,
    ctaText: "Partner with us",
    ctaHref: "#join-us",
  },
];

export function ValuesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      const mm = gsap.matchMedia();

      // Desktop Only (>= 768px): Pinned full-width card stacking
      mm.add("(min-width: 768px)", () => {
        const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
        if (cards.length < 2) return;

        // Set initial stacking context and positions
        cards.forEach((card, i) => {
          gsap.set(card, {
            zIndex: (i + 1) * 10,
            yPercent: i === 0 ? 0 : 100,
          });
        });

        // Stacking timeline tied to screen pin
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${(cards.length - 1) * 120}%`,
            pin: true,
            scrub: 1.2,
            anticipatePin: 1,
          },
        });

        // Loop through subsequent cards and apply multi-plane parallax
        for (let i = 1; i < cards.length; i++) {
          const currentCard = cards[i];
          const prevCard = cards[i - 1];

          const currentDiagram = currentCard.querySelector(".cad-diagram-box");
          const currentTitle = currentCard.querySelector(".card-title");
          const prevDiagram = prevCard?.querySelector(".cad-diagram-box");

          const pos = (i - 1) * 1.2;

          // 1. Current card slides up over previous card
          tl.fromTo(
            currentCard,
            { yPercent: 100 },
            { yPercent: 0, ease: "none", duration: 1 },
            pos
          );

          // 2. Previous card glides up slightly with parallax (solid, 100% scale, 100% opacity)
          if (prevCard) {
            tl.to(
              prevCard,
              { yPercent: -18, ease: "none", duration: 1 },
              pos
            );
          }

          // 3. Current card's CAD diagram enters with differential lag
          if (currentDiagram) {
            tl.fromTo(
              currentDiagram,
              { y: 80 },
              { y: 0, ease: "none", duration: 1 },
              pos
            );
          }

          // 4. Current card's title glides in with subtle differential
          if (currentTitle) {
            tl.fromTo(
              currentTitle,
              { y: 30 },
              { y: 0, ease: "none", duration: 1 },
              pos
            );
          }

          // 5. Previous diagram continues drifting with parallax
          if (prevDiagram) {
            tl.to(
              prevDiagram,
              { y: -50, ease: "none", duration: 1 },
              pos
            );
          }
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="values"
      ref={sectionRef}
      className="relative w-full md:h-screen overflow-hidden"
    >
      {/* On desktop: Full-width absolute overlapping cards pinned to viewport */}
      {/* On mobile: Flowing full-width panels */}
      <div className="relative w-full h-full flex flex-col md:block">
        {VALUES_DATA.map((value, idx) => (
          <div
            key={value.id}
            ref={(el) => {
              cardRefs.current[idx] = el;
            }}
            className="w-full md:h-full md:min-h-screen md:absolute md:inset-0 md:will-change-transform"
          >
            <ValueCard
              title={value.title}
              tagline={value.tagline}
              description={value.description}
              ctaText={value.ctaText}
              ctaHref={value.ctaHref}
              diagramType={value.diagramType}
              bgColor={value.bgColor}
              borderColor={value.borderColor}
              isLight={value.isLight}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
