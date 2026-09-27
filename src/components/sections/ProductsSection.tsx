"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   Product Specifications & Details
   ───────────────────────────────────────────────────────────── */

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductItem {
  id: string;
  code: string;
  name: string;
  platformType: string;
  headline: string;
  description: string;
  specs: ProductSpec[];
  cadTag: string;
  refCode: string;
  diagramType: "tactical" | "high-altitude" | "heavy-lift";
}

const PRODUCTS: ProductItem[] = [
  {
    id: "uas-01",
    code: "UAS-01",
    name: "Valkyrie Tactical ISR",
    platformType: "Fixed-Wing Autonomous UAS",
    headline: "Long-endurance tactical ISR platform for disputed frontier reconnaissance",
    description:
      "Engineered for sovereign border surveillance and high-altitude Himalayan environments. Integrates autoclave-cured carbon composite structures with onboard edge neural inference for real-time target recognition in GPS-denied theatres.",
    cadTag: "SYS-01 // TACTICAL AIRFRAME",
    refCode: "REF. CAD-X84",
    diagramType: "tactical",
    specs: [
      { label: "Platform Type", value: "Fixed-Wing Autonomous UAS" },
      { label: "Flight Endurance", value: "14+ Hours Continuous" },
      { label: "Payload Capacity", value: "18.5 kg Multi-Spectral" },
      { label: "Operating Ceiling", value: "6,500 m AMSL" },
      { label: "Data Telemetry", value: "AES-256 Encrypted Mesh" },
    ],
  },
  {
    id: "uas-02",
    code: "UAS-02",
    name: "Straton High-Altitude",
    platformType: "Solar-Assisted Atmospheric Platform",
    headline: "Atmospheric sensing and critical energy corridor telemetry platform",
    description:
      "Autonomous long-range aerial system delivering high-fidelity thermal and multispectral intelligence over critical pipelines, renewable energy corridors, and disaster relief zones with redundant neural fail-safes.",
    cadTag: "SYS-02 // ENVIRONMENTAL SCANNER",
    refCode: "REF. CAD-S92",
    diagramType: "high-altitude",
    specs: [
      { label: "Platform Type", value: "Hybrid High-Altitude UAS" },
      { label: "Flight Endurance", value: "22 Hours Loiter" },
      { label: "Payload Capacity", value: "24.0 kg Modular Sensor" },
      { label: "Operating Ceiling", value: "7,800 m AMSL" },
      { label: "Data Telemetry", value: "Dual Satcom & Ground Array" },
    ],
  },
  {
    id: "uas-03",
    code: "UAS-03",
    name: "AeroCargo Logistics",
    platformType: "Tandem Heavy-Lift Logistics Carrier",
    headline: "Heavy-lift sovereign logistics system for remote high-altitude supply",
    description:
      "Rapid tactical logistics platform designed to transport critical payloads and medical supplies across challenging mountainous topography without requiring paved landing infrastructure.",
    cadTag: "SYS-03 // HEAVY LOGISTICS CARRIER",
    refCode: "REF. CAD-L11",
    diagramType: "heavy-lift",
    specs: [
      { label: "Platform Type", value: "Tandem Heavy-Lift VTOL" },
      { label: "Flight Endurance", value: "6.5 Hours Operational" },
      { label: "Payload Capacity", value: "45.0 kg Cargo Bay" },
      { label: "Operating Ceiling", value: "5,400 m AMSL" },
      { label: "Data Telemetry", value: "Autonomous Waypoint Return" },
    ],
  },
];

const AUTOPLAY_INTERVAL = 6000; // 6 seconds

/* ─────────────────────────────────────────────────────────────
   Main Products Section Component
   ───────────────────────────────────────────────────────────── */

export function ProductsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Auto-scroll interval with pause on hover/interaction
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PRODUCTS.length);
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(timer);
  }, [isPaused, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + PRODUCTS.length) % PRODUCTS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % PRODUCTS.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <section
      id="products"
      className="relative w-full bg-[#EDE8E4] text-[#252324] overflow-hidden py-20 sm:py-24 md:py-28 lg:py-32 border-t border-[#413E40]/10"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="w-full max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* ========================================================================= */}
        {/* 1. SECTION TOP HEADER: 2-LINE TITLE & NAVIGATION ARROW BUTTONS           */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 sm:gap-8 mb-10 sm:mb-12">
          {/* Left Column: Heading in exactly 2 lines */}
          <div className="flex-1 max-w-[1080px]">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-normal leading-[1.12] tracking-[-0.02em] text-[#252324]">
              Engineered for sovereign control,<br className="hidden sm:inline" /> endurance, and operational superiority.
            </h2>
          </div>

          {/* Right Column: Navigation Arrow Buttons [ ← ] [ → ] */}
          <div className="flex items-center gap-2 shrink-0 pb-1">
            <button
              type="button"
              onClick={handlePrev}
              className="group relative w-10 h-10 sm:w-11 sm:h-11 rounded-[5px] border border-[#413E40]/30 bg-white/70 hover:bg-[#252324] hover:border-[#252324] text-[#252324] hover:text-white transition-all duration-200 flex items-center justify-center cursor-pointer active:scale-95 select-none"
              aria-label="Previous product"
            >
              <ArrowLeft size={18} strokeWidth={2} className="transition-transform group-hover:-translate-x-0.5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="group relative w-10 h-10 sm:w-11 sm:h-11 rounded-[5px] border border-[#413E40]/30 bg-white/70 hover:bg-[#252324] hover:border-[#252324] text-[#252324] hover:text-white transition-all duration-200 flex items-center justify-center cursor-pointer active:scale-95 select-none"
              aria-label="Next product"
            >
              <ArrowRight size={18} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. WIDE CARDS SLIDING TRACK CONTAINER                                     */}
        {/* ========================================================================= */}
        <div
          className="relative w-full overflow-hidden rounded-[8px]"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <motion.div
            className="flex w-full"
            animate={{ x: `-${currentIndex * 100}%` }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            {PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="w-full shrink-0"
              >
                {/* ── Wide Card Container ── */}
                <div className="w-full bg-[#252324] text-white rounded-[8px] border border-[#413E40]/80 p-6 sm:p-8 md:p-10 lg:p-12 shadow-sm select-none">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    
                    {/* ── LEFT COLUMN: CAD Technical Blueprint Viewport ── */}
                    <div className="lg:col-span-5 w-full">
                      <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3.2] bg-[#1E1D1E] rounded-md border border-[#413E40]/70 overflow-hidden flex flex-col justify-between p-5 sm:p-6 shadow-inner">
                        {/* CAD Grid Lines Overlay */}
                        <div
                          className="absolute inset-0 pointer-events-none opacity-20"
                          style={{
                            backgroundImage:
                              "linear-gradient(to right, #625D60 1px, transparent 1px), linear-gradient(to bottom, #625D60 1px, transparent 1px)",
                            backgroundSize: "28px 28px",
                          }}
                        />

                        {/* Top Technical Header Tags */}
                        <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-[#7DB7FF]/90 select-none">
                          <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#7DB7FF] inline-block animate-pulse" />
                            <span>{product.cadTag}</span>
                          </div>
                          <span className="text-white/50">{product.refCode}</span>
                        </div>

                        {/* Center Aerospace CAD SVG Schematic Wireframe */}
                        <div className="relative z-10 my-auto flex flex-col items-center justify-center w-full h-full py-4">
                          <svg
                            viewBox="0 0 440 260"
                            className="w-full h-full max-h-[220px]"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            {/* Outer Coordinate Boundary Frame */}
                            <rect
                              x="36"
                              y="20"
                              width="368"
                              height="220"
                              fill="none"
                              stroke="rgba(255, 255, 255, 0.12)"
                              strokeWidth="0.9"
                            />

                            {/* 8 Bounding Box Handle / Node Circles */}
                            {[
                              [36, 20],
                              [220, 20],
                              [404, 20],
                              [36, 130],
                              [404, 130],
                              [36, 240],
                              [220, 240],
                              [404, 240],
                            ].map(([cx, cy], i) => (
                              <circle
                                key={i}
                                cx={cx}
                                cy={cy}
                                r="2.5"
                                fill="#252324"
                                stroke="rgba(255, 255, 255, 0.5)"
                                strokeWidth="1"
                              />
                            ))}

                            {/* Corner Measurement Guides */}
                            <path
                              d="M 46 30 L 40 30 L 40 36 M 394 30 L 400 30 L 400 36 M 46 230 L 40 230 L 40 224 M 394 230 L 400 230 L 400 224"
                              stroke="rgba(255, 255, 255, 0.25)"
                              strokeWidth="0.8"
                            />

                            {/* Specific Blueprint Graphics per Product */}
                            {product.diagramType === "tactical" && (
                              <g stroke="#E5C158" strokeWidth="1.2" opacity="0.95">
                                {/* Fixed-Wing Tactical Airframe Schematics */}
                                {/* Fuselage centerline */}
                                <line x1="220" y1="45" x2="220" y2="215" strokeDasharray="4 3" strokeWidth="0.9" opacity="0.6" />
                                {/* Main Delta Wing Profile */}
                                <path
                                  d="M 220 55 L 340 160 L 320 185 L 235 175 L 220 205 L 205 175 L 120 185 L 100 160 Z"
                                  fill="rgba(229, 193, 88, 0.05)"
                                  stroke="#E5C158"
                                  strokeWidth="1.4"
                                />
                                {/* Forward Canards */}
                                <path d="M 220 85 L 260 105 L 250 115 L 220 105 L 190 115 L 180 105 Z" fill="none" strokeWidth="1" />
                                {/* Optical Sensor Gimbal Target Ring */}
                                <circle cx="220" cy="70" r="14" fill="none" strokeDasharray="4 2" strokeWidth="1" />
                                <circle cx="220" cy="70" r="4" fill="#7DB7FF" stroke="none" />
                                <line x1="220" y1="50" x2="220" y2="90" strokeWidth="0.8" stroke="#7DB7FF" />
                                <line x1="200" y1="70" x2="240" y2="70" strokeWidth="0.8" stroke="#7DB7FF" />
                                {/* Wing Engine Pods */}
                                <rect x="160" y="145" width="14" height="32" rx="2" fill="none" stroke="#E5C158" strokeWidth="1" />
                                <rect x="266" y="145" width="14" height="32" rx="2" fill="none" stroke="#E5C158" strokeWidth="1" />
                              </g>
                            )}

                            {product.diagramType === "high-altitude" && (
                              <g stroke="#E5C158" strokeWidth="1.2" opacity="0.95">
                                {/* High-Altitude Ultra-Wide Wing Schematic */}
                                <line x1="220" y1="35" x2="220" y2="225" strokeDasharray="4 3" strokeWidth="0.8" opacity="0.5" />
                                {/* High Aspect Ratio Wing */}
                                <path
                                  d="M 60 120 L 220 105 L 380 120 L 380 135 L 220 130 L 60 135 Z"
                                  fill="rgba(229, 193, 88, 0.05)"
                                  stroke="#E5C158"
                                  strokeWidth="1.4"
                                />
                                {/* Solar Cell Segment Dividers */}
                                {[100, 140, 180, 260, 300, 340].map((x, i) => (
                                  <line key={i} x1={x} y1="112" x2={x} y2="132" strokeWidth="0.7" stroke="rgba(255, 255, 255, 0.4)" />
                                ))}
                                {/* Center Pod & Tail Booms */}
                                <rect x="205" y="85" width="30" height="90" rx="4" fill="none" stroke="#E5C158" strokeWidth="1.2" />
                                <circle cx="220" cy="115" r="8" fill="none" stroke="#7DB7FF" strokeWidth="1" />
                                <circle cx="220" cy="115" r="3" fill="#7DB7FF" />
                                {/* Dual Propeller Discs */}
                                <ellipse cx="150" cy="108" rx="18" ry="4" fill="none" strokeDasharray="3 2" strokeWidth="0.9" />
                                <ellipse cx="290" cy="108" rx="18" ry="4" fill="none" strokeDasharray="3 2" strokeWidth="0.9" />
                                {/* Telemetry Scanning Arc */}
                                <path d="M 170 170 Q 220 205 270 170" fill="none" stroke="#7DB7FF" strokeDasharray="4 2" strokeWidth="1" />
                              </g>
                            )}

                            {product.diagramType === "heavy-lift" && (
                              <g stroke="#E5C158" strokeWidth="1.2" opacity="0.95">
                                {/* Heavy-Lift VTOL Quad/Tandem Logistics Airframe */}
                                <line x1="220" y1="40" x2="220" y2="220" strokeDasharray="4 3" strokeWidth="0.8" opacity="0.5" />
                                {/* Central Cargo Container Box */}
                                <rect
                                  x="170"
                                  y="90"
                                  width="100"
                                  height="80"
                                  rx="2"
                                  fill="rgba(229, 193, 88, 0.08)"
                                  stroke="#E5C158"
                                  strokeWidth="1.5"
                                />
                                {/* Cargo Straps / Latches */}
                                <line x1="200" y1="90" x2="200" y2="170" strokeWidth="1" stroke="rgba(255,255,255,0.4)" />
                                <line x1="240" y1="90" x2="240" y2="170" strokeWidth="1" stroke="rgba(255,255,255,0.4)" />
                                <rect x="208" y="120" width="24" height="20" fill="none" stroke="#7DB7FF" strokeWidth="1" />
                                <circle cx="220" cy="130" r="3" fill="#7DB7FF" />
                                {/* 4 Reinforced Motor Spar Arms */}
                                <line x1="170" y1="100" x2="105" y2="55" strokeWidth="1.4" />
                                <line x1="270" y1="100" x2="335" y2="55" strokeWidth="1.4" />
                                <line x1="170" y1="160" x2="105" y2="205" strokeWidth="1.4" />
                                <line x1="270" y1="160" x2="335" y2="205" strokeWidth="1.4" />
                                {/* 4 Counter-Rotating Rotor Discs */}
                                <circle cx="105" cy="55" r="26" fill="none" strokeDasharray="5 3" strokeWidth="1" stroke="#E5C158" />
                                <circle cx="335" cy="55" r="26" fill="none" strokeDasharray="5 3" strokeWidth="1" stroke="#E5C158" />
                                <circle cx="105" cy="205" r="26" fill="none" strokeDasharray="5 3" strokeWidth="1" stroke="#E5C158" />
                                <circle cx="335" cy="205" r="26" fill="none" strokeDasharray="5 3" strokeWidth="1" stroke="#E5C158" />
                              </g>
                            )}

                            {/* Center Mirach Badge Overlay */}
                            <g transform="translate(195, 120)">
                              <rect x="-35" y="-12" width="70" height="24" rx="2" fill="#1E1D1E" stroke="#7DB7FF" strokeWidth="0.8" opacity="0.9" />
                              <text x="0" y="4" textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontWeight="bold" letterSpacing="0.08em">
                                MIRACH
                              </text>
                            </g>
                          </svg>
                        </div>

                        {/* Bottom Status & Datum Coordinate Footer */}
                        <div className="relative z-10 flex items-center justify-between text-[10.5px] font-mono text-white/50 pt-2 border-t border-white/10 select-none">
                          <span>SCALE: 1:20 // METRIC</span>
                          <span>STATUS: READINESS L4</span>
                        </div>
                      </div>
                    </div>

                    {/* ── RIGHT COLUMN: Product Specifications & Editorial Narrative ── */}
                    <div className="lg:col-span-7 flex flex-col justify-between">
                      <div>
                        {/* Top Badges */}
                        <div className="flex items-center gap-3 mb-2.5">
                          <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-[3px] bg-[#7DB7FF]/15 text-[#7DB7FF] border border-[#7DB7FF]/30">
                            [{product.code}]
                          </span>
                          <span className="text-xs font-mono uppercase tracking-wider text-white/60">
                            {product.platformType}
                          </span>
                        </div>

                        {/* Big Product Name & Display Headline */}
                        <h3 className="text-2xl sm:text-3xl lg:text-[38px] font-medium tracking-tight text-white leading-tight">
                          {product.name}
                        </h3>
                        <p className="text-sm sm:text-base lg:text-[17px] text-[#EDE8E4]/80 mt-2 font-normal leading-snug">
                          {product.headline}
                        </p>

                        {/* Hairline Divider */}
                        <div className="w-full h-[1px] bg-white/15 my-6 sm:my-7" />

                        {/* Specifications Grid & Narrative Split */}
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-8 items-start">
                          {/* Left Sub-column: Technical Specifications */}
                          <div className="sm:col-span-5 flex flex-col divide-y divide-white/10">
                            {product.specs.map((spec, i) => (
                              <div
                                key={i}
                                className="py-2.5 first:pt-0 last:pb-0 flex flex-col"
                              >
                                <span className="text-[11px] font-mono uppercase tracking-wider text-white/50">
                                  {spec.label}
                                </span>
                                <span className="text-[13.5px] font-medium text-white mt-0.5">
                                  {spec.value}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Right Sub-column: Narrative Paragraph & Dossier Button */}
                          <div className="sm:col-span-7 flex flex-col justify-between h-full">
                            <p className="text-[14px] sm:text-[14.5px] text-[#EDE8E4]/85 leading-[1.68] font-normal">
                              {product.description}
                            </p>

                            {/* Action Button (with signature slide-up panel on hover) */}
                            <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between gap-4">
                              <a
                                href="#join-us"
                                className="group relative overflow-hidden bg-[#7DB7FF] text-black font-medium text-[14px] px-5 py-2.5 rounded-[5px] active:scale-[0.98] transition-transform duration-150 whitespace-nowrap inline-flex items-center justify-center select-none cursor-pointer"
                              >
                                <span className="block text-black font-medium">
                                  Request platform dossier
                                </span>
                                <span
                                  aria-hidden="true"
                                  className="absolute inset-0 bg-white text-black font-medium text-[14px] flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-[5px] pointer-events-none"
                                >
                                  Request platform dossier
                                </span>
                              </a>

                              {/* Index counter: e.g. 01 / 03 */}
                              <span className="font-mono text-xs text-white/40 tracking-widest select-none">
                                0{currentIndex + 1} / 0{PRODUCTS.length}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
