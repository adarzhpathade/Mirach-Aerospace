"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/* ─────────────────────────────────────────────────────────────
   6 Strategic Domains — Technical Content & CAD Node Types
   ───────────────────────────────────────────────────────────── */

interface DomainCard {
  number: string;
  domainName: string;
  headline: string;
  description: string;
}

const DOMAIN_CARDS: DomainCard[] = [
  {
    number: "01",
    domainName: "Defence & Security",
    headline: "Tactical ISR & autonomous border protection",
    description:
      "Mission-ready platforms engineered for sovereign border reconnaissance, loiter munition deployment, and autonomous swarming operations in contested theatres.",
  },
  {
    number: "02",
    domainName: "Research & Development",
    headline: "Neural flight autonomy & rapid prototyping",
    description:
      "Deep-tech lab pushing the envelope in autonomous guidance algorithms, onboard edge neural networks, and aerodynamic airframe validation through wind tunnel trials.",
  },
  {
    number: "03",
    domainName: "Composite Manufacturing",
    headline: "Aerospace-grade lightweight carbon airframes",
    description:
      "End-to-end composite airframe fabrication combining high-tensile carbon fiber layup, CNC precision tooling, and autoclave curing for demanding structural envelopes.",
  },
  {
    number: "04",
    domainName: "Industrial & Commercial",
    headline: "Critical infrastructure monitoring & inspection",
    description:
      "Automated inspection UAS delivering high-resolution visual and thermal intelligence to safeguard wind farms, oil and gas pipelines, and remote energy corridors.",
  },
  {
    number: "05",
    domainName: "Environmental & Scientific",
    headline: "Atmospheric sensing, forestry & disaster relief",
    description:
      "Autonomous long-endurance platforms carrying multispectral and LiDAR payloads for forestry preservation, atmospheric telemetry, and rapid emergency disaster mapping.",
  },
  {
    number: "06",
    domainName: "Mission-Specific",
    headline: "Bespoke aerial platforms for custom envelopes",
    description:
      "From high-altitude Himalayan logistics to rapid medical delivery, every custom UAS platform is engineered to match unique operator specifications and flight regimes.",
  },
];

/* ─────────────────────────────────────────────────────────────
   Main Applications Section — Pinned Horizontal Scroll Deck
   ───────────────────────────────────────────────────────────── */

export function ApplicationsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToCard = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cards = Array.from(
      container.querySelectorAll<HTMLElement>(".app-card-item")
    );
    if (cards.length === 0) return;

    const containerCenter = container.scrollLeft + container.clientWidth / 2;

    // Find card whose center is closest to current container viewport center
    let closestIndex = 0;
    let minDiff = Infinity;

    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const diff = Math.abs(cardCenter - containerCenter);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = index;
      }
    });

    let targetIndex = closestIndex;
    if (direction === "right") {
      const currentCardCenter =
        cards[closestIndex].offsetLeft + cards[closestIndex].offsetWidth / 2;
      if (containerCenter < currentCardCenter - 10) {
        targetIndex = closestIndex;
      } else {
        targetIndex = Math.min(closestIndex + 1, cards.length - 1);
      }
    } else {
      const currentCardCenter =
        cards[closestIndex].offsetLeft + cards[closestIndex].offsetWidth / 2;
      if (containerCenter > currentCardCenter + 10) {
        targetIndex = closestIndex;
      } else {
        targetIndex = Math.max(closestIndex - 1, 0);
      }
    }

    const targetCard = cards[targetIndex];
    if (!targetCard) return;

    const targetScrollLeft =
      targetCard.offsetLeft - (container.clientWidth - targetCard.offsetWidth) / 2;

    container.scrollTo({
      left: Math.max(0, targetScrollLeft),
      behavior: "smooth",
    });
  };

  const handleNavigate = (direction: "left" | "right") => {
    // 1. Mobile (< 768px): Use native container scrollTo with viewport centering
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      scrollToCard(direction);
      return;
    }

    // 2. Desktop (>= 768px): Advance ScrollTrigger timeline smoothly
    const st = ScrollTrigger.getById("applications-scroll");
    const track = trackRef.current;
    if (!st || !track) {
      scrollToCard(direction);
      return;
    }

    const cards = Array.from(
      track.querySelectorAll<HTMLElement>(".app-card-item")
    );
    if (cards.length === 0) return;

    const scrollDist = track.scrollWidth - window.innerWidth + 120;
    if (scrollDist <= 0) return;

    const baseOffset = cards[0].offsetLeft;
    // Current horizontal travel of cards track (0 to scrollDist)
    const currentTravel = st.progress * scrollDist;

    // Find card closest to current position
    let closestIndex = 0;
    let minDiff = Infinity;

    cards.forEach((card, idx) => {
      const cardTravel = card.offsetLeft - baseOffset;
      const diff = Math.abs(cardTravel - currentTravel);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = idx;
      }
    });

    let targetIndex = closestIndex;
    if (direction === "right") {
      const currentCardTravel = cards[closestIndex].offsetLeft - baseOffset;
      if (currentTravel < currentCardTravel - 20) {
        targetIndex = closestIndex;
      } else {
        targetIndex = Math.min(closestIndex + 1, cards.length - 1);
      }
    } else {
      const currentCardTravel = cards[closestIndex].offsetLeft - baseOffset;
      if (currentTravel > currentCardTravel + 20) {
        targetIndex = closestIndex;
      } else {
        targetIndex = Math.max(closestIndex - 1, 0);
      }
    }

    const targetTravel = cards[targetIndex].offsetLeft - baseOffset;
    const targetProgress = Math.max(0, Math.min(1, targetTravel / scrollDist));
    const targetScrollY = st.start + targetProgress * (st.end - st.start);

    const lenis = (window as unknown as { __lenis?: { scrollTo: (y: number, opts?: object) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(targetScrollY, { duration: 1.0 });
    } else {
      window.scrollTo({
        top: targetScrollY,
        behavior: "smooth",
      });
    }
  };

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      const mm = gsap.matchMedia();

      // Desktop Only (>= 768px): Pinned Horizontal Scroll
      mm.add("(min-width: 768px)", () => {
        const track = trackRef.current;
        const section = sectionRef.current;
        if (!track || !section) return;

        // Calculate exact horizontal travel distance
        const getScrollDistance = () => track.scrollWidth - window.innerWidth + 120;

        const tl = gsap.timeline({
          scrollTrigger: {
            id: "applications-scroll",
            trigger: section,
            start: "top top",
            end: () => `+=${getScrollDistance() * 1.15}`,
            pin: true,
            scrub: 1.1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Horizontal glide across all cards
        tl.to(track, {
          x: () => -getScrollDistance(),
          ease: "none",
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="applications"
      ref={sectionRef}
      className="relative w-full bg-[#F1F7FF] text-[#252324] overflow-hidden"
    >
      {/* Container: 100vh on desktop for clean pinning; comfortable clearance from top navbar */}
      <div className="relative w-full min-h-screen flex flex-col justify-between pt-28 sm:pt-28 md:pt-28 lg:pt-32 pb-6 sm:pb-8 md:pb-8 lg:pb-10">
        {/* ========================================================================= */}
        {/* 1. SECTION TOP HEADER (PINNED WITH CONTAINER)                            */}
        {/* ========================================================================= */}
        <div
          className="w-full max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-16 shrink-0 mb-3 sm:mb-4"
        >
          {/* Section Indicator */}
          <div className="flex items-center gap-2 text-[13.5px] sm:text-[14px] font-medium tracking-tight text-[#252324] mb-2 sm:mb-2.5">
            <span className="w-2 h-2 rounded-[2px] bg-[#252324] inline-block shrink-0" />
            <span>Applications & Strategic Domains</span>
          </div>

          {/* Display Headline + Desktop Navigation Buttons (Lower/Bottom-aligned) */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="text-2xl sm:text-3xl md:text-[38px] lg:text-[42px] font-normal leading-[1.12] tracking-[-0.02em] text-[#252324] max-w-[860px]">
              Bringing designed and Made‑in‑India drone intelligence to every domain.
            </h2>

            {/* Desktop Navigation Buttons — Lower aligned on the right side */}
            <div className="hidden md:flex items-center gap-2.5 shrink-0 pb-1">
              <button
                onClick={() => handleNavigate("left")}
                aria-label="Previous card"
                className="group relative overflow-hidden w-10 h-10 lg:w-11 lg:h-11 flex items-center justify-center rounded-[5px] bg-[#252324] text-white border border-[#413E40]/60 active:scale-95 transition-transform duration-150 cursor-pointer select-none"
              >
                {/* Base chevron */}
                <span className="flex items-center justify-center text-white">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M10 4L6 8L10 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>

                {/* White rectangle rising up from bottom on hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-white text-[#252324] flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-[5px] pointer-events-none"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M10 4L6 8L10 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
              <button
                onClick={() => handleNavigate("right")}
                aria-label="Next card"
                className="group relative overflow-hidden w-10 h-10 lg:w-11 lg:h-11 flex items-center justify-center rounded-[5px] bg-[#252324] text-white border border-[#413E40]/60 active:scale-95 transition-transform duration-150 cursor-pointer select-none"
              >
                {/* Base chevron */}
                <span className="flex items-center justify-center text-white">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M6 4L10 8L6 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>

                {/* White rectangle rising up from bottom on hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-white text-[#252324] flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-[5px] pointer-events-none"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M6 4L10 8L6 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. HORIZONTAL SCROLL CARDS TRACK                                          */}
        {/* ========================================================================= */}
        <div
          ref={scrollContainerRef}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          className="relative w-full my-auto py-2 overflow-x-auto md:overflow-hidden no-scrollbar snap-x snap-mandatory md:snap-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:h-0"
        >
          <div
            ref={trackRef}
            className="flex items-stretch gap-5 sm:gap-6 lg:gap-7 px-[calc(50vw-140px)] sm:px-[calc(50vw-165px)] md:px-12 lg:px-16 w-max md:will-change-transform"
          >
            {DOMAIN_CARDS.map((card) => (
              <div
                key={card.number}
                className="app-card-item snap-center md:snap-align-none group relative w-[280px] sm:w-[320px] md:w-[340px] lg:w-[360px] min-h-[375px] sm:min-h-[390px] md:min-h-[400px] lg:min-h-[410px] bg-[#413E40] text-[#EDE8E4] rounded-md border border-[#625D60]/50 flex flex-col justify-between p-6 sm:p-7 lg:p-8 shrink-0 transition-all duration-300 hover:border-[#7DB7FF]/40"
              >
                {/* ── TOP SECTION: Large Bold Number ── */}
                <div>
                  <div className="mb-4 sm:mb-5 lg:mb-6">
                    <span className="text-3xl sm:text-4xl lg:text-[42px] font-light tracking-tight text-white">
                      {card.number}
                    </span>
                  </div>

                  {/* Main Headline */}
                  <h3 className="text-lg sm:text-xl lg:text-[23px] font-medium leading-[1.25] tracking-[-0.015em] text-white">
                    {card.headline}
                  </h3>
                </div>

                {/* ── MIDDLE: SIMPLE DIVIDER LINE ONLY (No SVGs) ── */}
                <div className="w-full h-[1px] bg-[#625D60]/40 my-4 sm:my-5 lg:my-6" />

                {/* ── BOTTOM SECTION: Description ── */}
                <div>
                  <p className="text-[13.5px] sm:text-[14px] lg:text-[14.5px] text-[#EDE8E4]/85 leading-[1.62] font-normal">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}

            {/* Terminal End Card — Call to Action */}
            <div className="app-card-item snap-center md:snap-align-none relative w-[260px] sm:w-[290px] md:w-[310px] lg:w-[330px] min-h-[375px] sm:min-h-[390px] md:min-h-[400px] lg:min-h-[410px] bg-[#413E40] text-[#EDE8E4] rounded-md border border-[#625D60]/60 flex flex-col justify-between p-6 sm:p-7 lg:p-8 shrink-0">
              <div>
                <span className="text-[11px] font-mono tracking-widest text-[#7DB7FF] uppercase">
                  [NEXT STEPS]
                </span>
                <h3 className="text-lg sm:text-xl lg:text-[23px] font-medium leading-[1.25] tracking-tight text-white mt-4 mb-3">
                  Need custom drone intelligence for your domain?
                </h3>
                <p className="text-xs sm:text-[13px] lg:text-[14px] text-[#EDE8E4]/75 leading-relaxed font-normal">
                  Our aerospace engineering team develops tailored airframes,
                  onboard AI, and mission payloads.
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-5 border-t border-[#625D60]/50">
                <a
                  href="#join-us"
                  className="group relative overflow-hidden bg-[#7DB7FF] text-[#252324] font-medium text-[14.5px] px-5 py-3 rounded-[5px] active:scale-[0.98] transition-transform duration-150 whitespace-nowrap inline-flex items-center justify-center select-none w-full"
                >
                  <span className="block font-medium">Partner with us</span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-white text-[#252324] font-medium text-[14.5px] flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-[5px] pointer-events-none"
                  >
                    Partner with us
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. MOBILE CONTROLS (ARROWS < AND >)                                       */}
        {/* ========================================================================= */}
        <div className="w-full max-w-[1520px] mx-auto px-6 sm:px-10 shrink-0 md:hidden flex items-center justify-end gap-2.5 pt-3">
          <button
            onClick={() => handleNavigate("left")}
            aria-label="Previous card"
            className="group relative overflow-hidden w-10 h-10 flex items-center justify-center rounded-[5px] bg-[#252324] text-white border border-[#413E40]/60 active:scale-95 transition-transform duration-150 select-none cursor-pointer"
          >
            {/* Base chevron */}
            <span className="flex items-center justify-center text-white">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M10 4L6 8L10 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            {/* White rectangle rising up from bottom on hover */}
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-white text-[#252324] flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-[5px] pointer-events-none"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M10 4L6 8L10 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
          <button
            onClick={() => handleNavigate("right")}
            aria-label="Next card"
            className="group relative overflow-hidden w-10 h-10 flex items-center justify-center rounded-[5px] bg-[#252324] text-white border border-[#413E40]/60 active:scale-95 transition-transform duration-150 select-none cursor-pointer"
          >
            {/* Base chevron */}
            <span className="flex items-center justify-center text-white">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 4L10 8L6 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            {/* White rectangle rising up from bottom on hover */}
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-white text-[#252324] flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-[5px] pointer-events-none"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 4L10 8L6 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
