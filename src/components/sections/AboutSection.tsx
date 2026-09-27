"use client";

import React, { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Check prefers-reduced-motion
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) return;

      const mm = gsap.matchMedia();

      // Desktop: Smooth responsive scrub
      mm.add("(min-width: 768px)", () => {
        if (contentRef.current) {
          gsap.fromTo(
            contentRef.current,
            { opacity: 0.2, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                end: "top 35%",
                scrub: 0.8,
              },
            }
          );
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full bg-[#F1F7FF] text-[#252324] border-t border-[#252324]/10 overflow-hidden"
    >
      <div
        ref={contentRef}
        className="w-full max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-24 lg:py-28 md:will-change-transform"
      >
        {/* ========================================================================= */}
        {/* 1. TOP ROW: "HOW WE WORK" (LEFT) + EDITORIAL STATEMENT & BUTTON (RIGHT)    */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 xl:gap-28 items-start">
          {/* Left Column: "● How we work" */}
          <div className="pt-1 select-none">
            <div className="flex items-center gap-2.5 text-[14.5px] sm:text-[15px] font-medium tracking-tight text-[#252324]">
              <span className="w-2.5 h-2.5 rounded-[2px] bg-[#252324] inline-block shrink-0" />
              <span>How we work</span>
            </div>
          </div>

          {/* Right Column: Editorial Paragraph + Action Button */}
          <div className="flex flex-col">
            <p className="text-xl sm:text-2xl lg:text-[26px] xl:text-[28px] font-normal leading-[1.4] sm:leading-[1.44] tracking-[-0.015em] text-[#252324]">
              We’ve got your tactical aerospace platforms covered. Our team of
              engineers and experts have decades of experience. We help you avoid
              delays, tackle inefficiencies, and ensure a smooth, fast process
              from PO to delivery.
            </p>

            {/* Action Button: Dark base with blue slide-up rectangle effect on hover */}
            <div className="mt-8 sm:mt-10">
              <Link
                href="#capabilities"
                className="group relative overflow-hidden bg-[#252324] text-white font-medium text-[14.5px] sm:text-[15px] px-6 py-2.5 rounded-[5px] active:scale-[0.98] transition-transform duration-150 whitespace-nowrap inline-flex items-center justify-center select-none"
              >
                {/* Base text */}
                <span className="block text-white">
                  Explore capabilities
                </span>

                {/* Blue rectangle rising up from bottom on hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-[#7DB7FF] text-black font-medium text-[14.5px] sm:text-[15px] flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-[5px] pointer-events-none"
                >
                  Explore capabilities
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. INNER SECTION DIVIDER                                                  */}
        {/* ========================================================================= */}
        <div className="w-full border-t border-[#252324]/12 my-14 sm:my-18 lg:my-20" />

        {/* ========================================================================= */}
        {/* 3. BOTTOM ROW: VISION (LEFT) + MISSION (RIGHT) ALIGNED PERFECTLY TO GRID  */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 xl:gap-28">
          {/* Left Column: Vision (Aligned with "How we work" above) */}
          <div className="flex flex-col">
            <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-[#252324] mb-3">
              Vision
            </h3>
            <p className="text-base sm:text-[17px] text-[#383536] leading-[1.62] font-normal">
              To create sustainable transformation with reliable, accessible, and
              Made-in-India aerial systems with Artificial Intelligence inbuilt.
            </p>
          </div>

          {/* Right Column: Mission (Aligned with the statement and button above) */}
          <div className="flex flex-col">
            <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-[#252324] mb-3">
              Mission
            </h3>
            <p className="text-base sm:text-[17px] text-[#383536] leading-[1.62] font-normal">
              To engineer innovative, mission-ready drone solutions that deliver
              reliability where it matters through precision and actionable
              intelligence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
