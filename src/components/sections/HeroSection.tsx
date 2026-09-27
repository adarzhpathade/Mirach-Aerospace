"use client";

import React, { useRef } from "react";
import Image from "next/image";
import LetterSwapForward from "@/components/fancy/text/letter-swap-forward-anim";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const topBlockRef = useRef<HTMLDivElement>(null);
  const topContentRef = useRef<HTMLDivElement>(null);
  const lowerBlockRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const droneContainerRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Respect accessibility settings
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      const mm = gsap.matchMedia();

      // Desktop Only (>= 768px): Full multi-plane parallax synchronized with smooth scroll
      mm.add("(min-width: 768px)", () => {
        // 1. Top Editorial Block Parallax: Gentle lift and fade as user scrolls
        if (topContentRef.current && topBlockRef.current) {
          gsap.to(topContentRef.current, {
            y: -45,
            opacity: 0.72,
            ease: "none",
            scrollTrigger: {
              trigger: topBlockRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1.2,
            },
          });
        }

        // 2. CAD Background Grid Parallax (moves on a distinct depth plane)
        if (gridRef.current && lowerBlockRef.current) {
          gsap.fromTo(
            gridRef.current,
            { y: -30 },
            {
              y: 35,
              ease: "none",
              scrollTrigger: {
                trigger: lowerBlockRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
              },
            }
          );
        }

        // 3. Drone CAD Model Parallax (Subtle vertical translation centered at Y=0)
        if (droneContainerRef.current && lowerBlockRef.current) {
          gsap.fromTo(
            droneContainerRef.current,
            { y: 20 },
            {
              y: -20,
              ease: "none",
              scrollTrigger: {
                trigger: lowerBlockRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            }
          );
        }

        // 4. Bottom-Left Stack Parallax
        if (featuresRef.current && lowerBlockRef.current) {
          gsap.fromTo(
            featuresRef.current,
            { y: 20 },
            {
              y: -18,
              ease: "none",
              scrollTrigger: {
                trigger: lowerBlockRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            }
          );
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative w-full flex flex-col min-h-screen overflow-hidden">
      {/* ========================================================================= */}
      {/* 1. TOP BLOCK: LIGHT BLUE AEROSPACE EDITORIAL INTRO                        */}
      {/* (Mirach Light Blue #F1F7FF replacing the light yellow in the reference)  */}
      {/* ========================================================================= */}
      <div
        id="hero-top-block"
        ref={topBlockRef}
        className="w-full bg-[#F1F7FF] text-[#252324] flex flex-col justify-end min-h-[60svh] sm:min-h-[60vh] md:min-h-[500px] lg:min-h-[540px] xl:min-h-[58vh] border-b border-[#252324]/10 relative z-10"
      >
        {/* Hero Content: Two-Column Editorial Layout positioned at bottom */}
        <div
          ref={topContentRef}
          className="w-full max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-16 pt-24 sm:pt-36 lg:pt-40 pb-6 sm:pb-8 lg:pb-10 md:will-change-transform"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 lg:gap-12 w-full">
            {/* Left Column: Display Headline (Mirach Brand Tagline) */}
            <div className="flex-1 max-w-3xl">
              <h1 className="text-[36px] min-[390px]:text-[42px] sm:text-5xl md:text-6xl lg:text-[66px] font-normal tracking-[-0.03em] text-[#252324] leading-[1.08] sm:leading-[1.06]">
                Airborne innovation with precision.
              </h1>
            </div>

            {/* Right Column: Mission Statement & Company Role */}
            <div className="w-full md:w-[420px] lg:w-[480px] xl:w-[520px] pb-1">
              <p className="text-base sm:text-[17px] lg:text-[18.5px] font-normal text-[#383536] leading-[1.5]">
                Mission-ready Unmanned Aerial Systems with onboard Artificial Intelligence.
                Mirach Aerospace is your design-build partner engineering purpose-built tactical
                and logistic UAV platforms from idea to execution.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. BOTTOM BLOCK: DARK CAD BLUEPRINT TECHNICAL CONTAINER                   */}
      {/* (#252324 background with CAD linework using Hero Drone Side.png)          */}
      {/* ========================================================================= */}
      <div
        id="hero-lower-block"
        ref={lowerBlockRef}
        className="w-full bg-[#252324] text-[#EDE8E4] relative flex-1 flex flex-col justify-between overflow-hidden min-h-[700px] sm:min-h-[620px] lg:min-h-[580px] xl:min-h-[66vh] border-t border-[#413E40]/40"
      >
        {/* Subtle CAD Engineering Background Grid with parallax */}
        <div
          ref={gridRef}
          className="absolute inset-0 pointer-events-none opacity-25 md:will-change-transform"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(125, 183, 255, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(125, 183, 255, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Center-Right CAD Schematic Graphic: Hero Drone Side.png perfectly centered in Y-axis with respect to the gray box */}
        <div className="absolute right-0 sm:right-2 lg:right-6 top-[39%] sm:top-1/2 -translate-y-1/2 w-full lg:w-[70%] xl:w-[66%] h-[260px] sm:h-[400px] lg:h-[480px] flex items-center justify-center sm:justify-end pointer-events-none select-none z-10">
          <div
            ref={droneContainerRef}
            className="relative w-full h-full max-w-[940px] flex items-center justify-center md:will-change-transform"
          >
            {/* Drone CAD Image with high fidelity rendering */}
            <Image
              src="/images/Hero Drone Side.png"
              alt="Mirach Aerospace Drone Blueprint Technical CAD View"
              width={1536}
              height={1024}
              priority
              className="w-full h-auto max-h-full object-contain filter md:drop-shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
            />
          </div>
        </div>

        {/* Inner Content Grid */}
        <div className="w-full max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-16 py-8 sm:py-12 relative z-20 flex flex-col justify-between h-full flex-1 pointer-events-none">
          {/* Top Left Label: Matches "Your control panel design and build partners" in reference */}
          <div className="pt-2 sm:pt-4 pointer-events-auto">
            <p className="text-base sm:text-lg font-normal text-[#EDE8E4]/90 tracking-[-0.01em] leading-snug max-w-xs">
              Your autonomous UAS
              <br />
              design and build partners
            </p>
          </div>

          {/* Bottom Left Stack: Matches the 4-item feature list with divider lines and Letter Swap hover effect */}
          <div
            ref={featuresRef}
            className="pt-10 sm:pt-14 pb-2 relative z-20 w-full max-w-[320px] md:will-change-transform pointer-events-auto"
          >
            <div className="flex flex-col">
              {/* Item 1 */}
              <div className="border-t border-[#413E40]/80 py-2.5 sm:py-3 group cursor-pointer">
                <span className="text-[14.5px] sm:text-base font-normal text-[#EDE8E4] group-hover:text-white transition-colors block">
                  <LetterSwapForward
                    label="PO to shipped in 4 weeks"
                    reverse={false}
                    className="justify-start text-left"
                  />
                </span>
              </div>

              {/* Item 2 */}
              <div className="border-t border-[#413E40]/80 py-2.5 sm:py-3 group cursor-pointer">
                <span className="text-[14.5px] sm:text-base font-normal text-[#EDE8E4] group-hover:text-white transition-colors block">
                  <LetterSwapForward
                    label="Fast, intuitive quotes"
                    reverse={false}
                    className="justify-start text-left"
                  />
                </span>
              </div>

              {/* Item 3 */}
              <div className="border-t border-[#413E40]/80 py-2.5 sm:py-3 group cursor-pointer">
                <span className="text-[14.5px] sm:text-base font-normal text-[#EDE8E4] group-hover:text-white transition-colors block">
                  <LetterSwapForward
                    label="UL 508A listed by default"
                    reverse={false}
                    className="justify-start text-left"
                  />
                </span>
              </div>

              {/* Item 4 */}
              <div className="border-t border-[#413E40]/80 py-2.5 sm:py-3 group cursor-pointer">
                <span className="text-[14.5px] sm:text-base font-normal text-[#EDE8E4] group-hover:text-white transition-colors block">
                  <LetterSwapForward
                    label="Automated build process"
                    reverse={false}
                    className="justify-start text-left"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom subtle edge divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#413E40]/50 to-transparent" />
      </div>
    </section>
  );
}

