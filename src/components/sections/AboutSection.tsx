"use client";

import React, { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColTopRef = useRef<HTMLDivElement>(null);
  const rightColTopRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Respect accessibility settings
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) return;

      const mm = gsap.matchMedia();

      // Desktop Only (>= 768px): Full multi-plane parallax synchronized with smooth scroll
      mm.add("(min-width: 768px)", () => {
        // 1. Subtle CAD technical watermark on a deep background plane
        if (watermarkRef.current && sectionRef.current) {
          gsap.fromTo(
            watermarkRef.current,
            { y: -30 },
            {
              y: 40,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
              },
            }
          );
        }

        // 2. Top-Left Column ("● How we work") - Steady anchor parallax plane
        if (leftColTopRef.current && sectionRef.current) {
          gsap.fromTo(
            leftColTopRef.current,
            { y: 25 },
            {
              y: -25,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            }
          );
        }

        // 3. Top-Right Column (Editorial statement & CTA) - Differential floating plane
        if (rightColTopRef.current && sectionRef.current) {
          gsap.fromTo(
            rightColTopRef.current,
            { y: 45 },
            {
              y: -40,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.4,
              },
            }
          );
        }

        // 4. Inner Horizontal Divider - Smooth expansion
        if (dividerRef.current && sectionRef.current) {
          gsap.fromTo(
            dividerRef.current,
            { scaleX: 0.95 },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                end: "top 30%",
                scrub: 1.0,
              },
            }
          );
        }

        // 5. Bottom-Left Column ("Vision")
        if (visionRef.current && sectionRef.current) {
          gsap.fromTo(
            visionRef.current,
            { y: 25 },
            {
              y: -25,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                end: "bottom top",
                scrub: 1.2,
              },
            }
          );
        }

        // 6. Bottom-Right Column ("Mission") - Trailing differential plane
        if (missionRef.current && sectionRef.current) {
          gsap.fromTo(
            missionRef.current,
            { y: 45 },
            {
              y: -40,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                end: "bottom top",
                scrub: 1.4,
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
      {/* Subtle CAD Coordinate Watermark for depth */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="hidden md:flex absolute top-10 right-8 lg:right-16 pointer-events-none select-none items-center gap-3 text-[11px] font-mono tracking-widest text-[#252324]/25 uppercase z-0 md:will-change-transform"
      >
        <span>[SYS.REF // 22.7196° N 75.8577° E]</span>
        <span>•</span>
        <span>MP-KA-AERO</span>
      </div>

      <div className="w-full max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-24 lg:py-28 relative z-10">
        {/* ========================================================================= */}
        {/* 1. TOP ROW: "HOW WE WORK" (LEFT) + EDITORIAL STATEMENT & BUTTON (RIGHT)    */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 xl:gap-28 items-start">
          {/* Left Column: "● How we work" */}
          <div ref={leftColTopRef} className="pt-1 select-none md:will-change-transform">
            <div className="flex items-center gap-2.5 text-[14.5px] sm:text-[15px] font-medium tracking-tight text-[#252324]">
              <span className="w-2.5 h-2.5 rounded-[2px] bg-[#252324] inline-block shrink-0" />
              <span>How we work</span>
            </div>
          </div>

          {/* Right Column: Editorial Paragraph + Action Button */}
          <div ref={rightColTopRef} className="flex flex-col md:will-change-transform">
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
        <div
          ref={dividerRef}
          className="w-full border-t border-[#252324]/12 my-14 sm:my-18 lg:my-20 origin-left md:will-change-transform"
        />

        {/* ========================================================================= */}
        {/* 3. BOTTOM ROW: VISION (LEFT) + MISSION (RIGHT) ALIGNED PERFECTLY TO GRID  */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 xl:gap-28">
          {/* Left Column: Vision (Aligned with "How we work" above) */}
          <div ref={visionRef} className="flex flex-col md:will-change-transform">
            <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-[#252324] mb-3">
              Vision
            </h3>
            <p className="text-base sm:text-[17px] text-[#383536] leading-[1.62] font-normal">
              To create sustainable transformation with reliable, accessible, and
              Made-in-India aerial systems with Artificial Intelligence inbuilt.
            </p>
          </div>

          {/* Right Column: Mission (Aligned with the statement and button above) */}
          <div ref={missionRef} className="flex flex-col md:will-change-transform">
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
