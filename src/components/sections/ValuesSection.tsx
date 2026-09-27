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
    bgColor: "#413E40",
    borderColor: "border-[#625D60]/50",
    isLight: false,
    ctaText: "Partner with us",
    ctaHref: "#join-us",
  },
];

export function ValuesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      const mm = gsap.matchMedia();

      // Desktop Only (>= 768px): Pinned full-width card stacking
      mm.add("(min-width: 768px)", () => {
        if (!sectionRef.current) return;
        const cards = gsap.utils.toArray<HTMLDivElement>(
          ".value-card-item",
          sectionRef.current
        );
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
            invalidateOnRefresh: true,
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
          tl.to(
            currentCard,
            { yPercent: 0, ease: "none", duration: 1 },
            pos
          );

          // 2. Previous card glides up slightly with parallax (solid, 100% scale, 100% opacity)
          if (prevCard) {
            tl.to(
              prevCard,
              { yPercent: -14, ease: "none", duration: 1 },
              pos
            );
          }

          // 3. Current card's CAD diagram enters with differential lag
          if (currentDiagram) {
            tl.fromTo(
              currentDiagram,
              { y: 80 },
              { y: 0, ease: "none", duration: 1, immediateRender: false },
              pos
            );
          }

          // 4. Current card's title glides in with subtle differential
          if (currentTitle) {
            tl.fromTo(
              currentTitle,
              { y: 30 },
              { y: 0, ease: "none", duration: 1, immediateRender: false },
              pos
            );
          }

          // 5. Previous diagram continues drifting with parallax
          if (prevDiagram) {
            tl.to(
              prevDiagram,
              { y: -40, ease: "none", duration: 1 },
              pos
            );
          }
        }

        // Refresh triggers once all setups complete
        ScrollTrigger.refresh();
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="values"
      ref={sectionRef}
      className="relative w-full md:h-screen flex flex-col overflow-hidden bg-[#252324]"
    >
      {/* ========================================================================= */}
      {/* 1. STICKY LIGHT BLUE HEADER: "OUR VALUES" (CLEARS FIXED NAVBAR)           */}
      {/* ========================================================================= */}
      <div
        style={{ paddingTop: "92px" }}
        className="sticky top-0 z-40 w-full bg-[#F1F7FF] text-[#252324] border-b border-[#252324]/10 shrink-0 pb-4 sm:pb-4.5 lg:pb-5"
      >
        <div className="w-full max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-6">
          <div>
            <div className="flex items-center gap-2 text-[12px] sm:text-[12.5px] font-medium tracking-tight text-[#252324] mb-1">
              <span className="w-2 h-2 rounded-[2px] bg-[#252324] inline-block shrink-0" />
              <span>Core Philosophy & Engineering Standards</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-normal leading-[1.1] tracking-[-0.02em] text-[#252324]">
              Our Values
            </h2>
          </div>

          <div className="max-w-[560px]">
            <p className="text-xs sm:text-[13px] lg:text-[13.5px] text-[#252324]/80 leading-relaxed font-normal">
              The foundational aerospace engineering principles guiding our culture, precision execution, and sovereign innovation across all flight envelopes.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. CARD STACKING CONTAINER                                               */}
      {/* ========================================================================= */}
      <div className="relative w-full flex-1 min-h-0 overflow-hidden flex flex-col md:block">
        {VALUES_DATA.map((value) => (
          <div
            key={value.id}
            className="value-card-item w-full md:h-full md:absolute md:inset-0 md:will-change-transform"
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
