"use client";

import React from "react";
import Link from "next/link";

export interface ValueCardProps {
  title: string;
  tagline: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
  diagramType?: "guidance" | "resistor" | "diode" | "network";
  bgColor?: string;
  borderColor?: string;
  isLight?: boolean;
  className?: string;
}

export function ValueCard({
  title = "Quality first",
  tagline = "Aerospace precision.\nZero compromise.",
  description = "Refuse to settle for less. Prioritize details, critical analysis, and excellence, delivering results that consistently meet the highest aerospace standards.",
  ctaText = "Partner with us",
  ctaHref = "#join-us",
  diagramType = "resistor",
  bgColor = "#413E40",
  borderColor = "border-[#625D60]/50",
  isLight = false,
  className = "",
}: ValueCardProps) {
  const goldColor = isLight ? "#B8860B" : "#E5C158";
  const gridStroke = isLight ? "rgba(37, 35, 36, 0.08)" : "rgba(255, 255, 255, 0.065)";
  const boundaryStroke = isLight ? "rgba(37, 35, 36, 0.18)" : "rgba(255, 255, 255, 0.12)";
  const nodeStroke = isLight ? "rgba(37, 35, 36, 0.45)" : "rgba(255, 255, 255, 0.4)";
  const nodeFill = isLight ? "#EDE8E4" : bgColor;

  return (
    <div
      style={{ backgroundColor: bgColor }}
      className={`w-full h-full min-h-[560px] sm:min-h-[620px] md:min-h-0 flex flex-col justify-between border-t ${borderColor} relative select-none ${
        isLight ? "text-[#252324]" : "text-[#EDE8E4]"
      } ${className}`}
    >
      {/* ========================================================================= */}
      {/* 1. UPPER SECTION: TITLE & SUBTEXT (LEFT) + CAD BLUEPRINT BOX (RIGHT)      */}
      {/* ========================================================================= */}
      <div className="w-full max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-16 pt-8 sm:pt-10 md:pt-10 lg:pt-12 pb-6 sm:pb-7 md:pb-6 flex-1 flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-8 md:gap-10 lg:gap-14">
        {/* Left Column: Display Title and Grouped Tagline */}
        <div className="flex-1 flex flex-col justify-center max-w-[720px]">
          <div>
            <h2
              className={`card-title md:will-change-transform text-3xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[60px] font-normal tracking-[-0.03em] leading-[1.08] ${
                isLight ? "text-[#252324]" : "text-white"
              }`}
            >
              {title}
            </h2>
          </div>

          <div className="mt-4 sm:mt-5 md:mt-6">
            <p
              className={`card-tagline md:will-change-transform text-sm sm:text-base lg:text-[16.5px] font-normal leading-relaxed tracking-[-0.01em] whitespace-pre-line ${
                isLight ? "text-[#383536]" : "text-[#EDE8E4]/80"
              }`}
            >
              {tagline}
            </p>
          </div>
        </div>

        {/* Right Column: CAD Engineering Diagram with Grid & Gold Linework */}
        <div
          className={`cad-diagram-box md:will-change-transform w-full md:w-[380px] lg:w-[440px] xl:w-[480px] h-[195px] sm:h-[215px] md:h-[220px] lg:h-[240px] rounded-[4px] relative overflow-hidden flex items-center justify-center shrink-0 border ${
            isLight
              ? "bg-[#DFD9D4]/60 border-[#252324]/15"
              : "bg-[#1E1D1E]/40 border-[#625D60]/40"
          }`}
        >
          <svg
            viewBox="0 0 440 260"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background CAD Grid */}
            <defs>
              <pattern
                id={`cad-grid-${diagramType}-${isLight ? "light" : "dark"}`}
                width="24"
                height="24"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 24 0 L 0 0 0 24"
                  fill="none"
                  stroke={gridStroke}
                  strokeWidth="0.8"
                />
              </pattern>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill={`url(#cad-grid-${diagramType}-${isLight ? "light" : "dark"})`}
            />

            {/* Outer Coordinate Boundary Frame */}
            <rect
              x="36"
              y="26"
              width="368"
              height="208"
              fill="none"
              stroke={boundaryStroke}
              strokeWidth="0.9"
            />

            {/* 8 Bounding Box Handle / Node Circles */}
            {[
              [36, 26],
              [220, 26],
              [404, 26],
              [36, 130],
              [404, 130],
              [36, 234],
              [220, 234],
              [404, 234],
            ].map(([cx, cy], i) => (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r="2"
                fill={nodeFill}
                stroke={nodeStroke}
                strokeWidth="1"
              />
            ))}

            {/* ========================================================================= */}
            {/* 1. LEADERSHIP FOCUSED: TACTICAL DRONE WITH EO/IR TARGET ACQUISITION GIMBAL */}
            {/* ========================================================================= */}
            {diagramType === "guidance" && (
              <g>
                {/* Airframe Centerline & Coordinate Guides */}
                <line x1="220" y1="28" x2="220" y2="232" stroke={boundaryStroke} strokeDasharray="4 3" strokeWidth="0.8" />
                <line x1="50" y1="80" x2="390" y2="80" stroke={boundaryStroke} strokeDasharray="4 3" strokeWidth="0.6" />

                {/* Tactical Delta Wing UAV Airframe */}
                <path
                  d="M 220 50 L 330 152 L 305 172 L 245 162 L 220 198 L 195 162 L 135 172 L 110 152 Z"
                  fill="rgba(229, 193, 88, 0.05)"
                  stroke={goldColor}
                  strokeWidth="1.3"
                  strokeLinejoin="round"
                />

                {/* Elevon Control Surfaces */}
                <line x1="140" y1="166" x2="190" y2="158" stroke={goldColor} strokeWidth="1" strokeDasharray="3 2" />
                <line x1="250" y1="158" x2="300" y2="166" stroke={goldColor} strokeWidth="1" strokeDasharray="3 2" />

                {/* Forward Canards */}
                <path d="M 220 90 L 255 110 L 245 118 L 220 110 L 195 118 L 185 110 Z" fill="none" stroke={goldColor} strokeWidth="1" />

                {/* Pitot Tube at Nose Tip */}
                <line x1="220" y1="50" x2="220" y2="34" stroke={goldColor} strokeWidth="1.2" />
                <circle cx="220" cy="34" r="2" fill="#7DB7FF" />

                {/* Forward Radar Scan Waves */}
                <path d="M 175 42 Q 220 28 265 42" fill="none" stroke="#7DB7FF" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.8" />
                <path d="M 160 56 Q 220 40 280 56" fill="none" stroke="#7DB7FF" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.5" />

                {/* Optical Sensor Gimbal Turret at Nose */}
                <circle cx="220" cy="78" r="15" fill={nodeFill} stroke={goldColor} strokeWidth="1.2" />
                <circle cx="220" cy="78" r="26" fill="none" stroke={goldColor} strokeWidth="0.8" strokeDasharray="4 2" />
                <circle cx="220" cy="78" r="3.5" fill="#7DB7FF" />
                {/* Crosshairs */}
                <line x1="220" y1="60" x2="220" y2="96" stroke="#7DB7FF" strokeWidth="0.9" />
                <line x1="202" y1="78" x2="238" y2="78" stroke="#7DB7FF" strokeWidth="0.9" />

                {/* Corner Targeting Brackets around Gimbal */}
                <path d="M 198 62 L 194 62 L 194 66" fill="none" stroke={goldColor} strokeWidth="1" />
                <path d="M 242 62 L 246 62 L 246 66" fill="none" stroke={goldColor} strokeWidth="1" />
                <path d="M 198 94 L 194 94 L 194 90" fill="none" stroke={goldColor} strokeWidth="1" />
                <path d="M 242 94 L 246 94 L 246 90" fill="none" stroke={goldColor} strokeWidth="1" />

                {/* Technical Metadata Annotations */}
                <text x="50" y="46" fill="#7DB7FF" fontSize="8.5" fontFamily="monospace" letterSpacing="0.08em">
                  EO/IR GIMBAL // AZ: 042°
                </text>
                <text x="50" y="222" fill="rgba(255,255,255,0.45)" fontSize="8" fontFamily="monospace">
                  FOV: 45° // ELEV: -14°
                </text>
                <text x="312" y="222" fill="rgba(255,255,255,0.45)" fontSize="8" fontFamily="monospace">
                  SPAN: 2400mm
                </text>
              </g>
            )}

            {/* ========================================================================= */}
            {/* 2. QUALITY FIRST: PRECISION BRUSHLESS MOTOR & CARBON ROTOR ASSEMBLY        */}
            {/* ========================================================================= */}
            {diagramType === "resistor" && (
              <g>
                {/* Horizontal & Vertical Centerlines */}
                <line x1="45" y1="130" x2="395" y2="130" stroke={boundaryStroke} strokeDasharray="4 3" strokeWidth="0.8" />
                <line x1="220" y1="30" x2="220" y2="230" stroke={boundaryStroke} strokeDasharray="4 3" strokeWidth="0.8" />

                {/* Dimension Line above Propeller */}
                <line x1="75" y1="84" x2="365" y2="84" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
                <line x1="75" y1="78" x2="75" y2="90" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
                <line x1="365" y1="78" x2="365" y2="90" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
                <text x="220" y="80" textAnchor="middle" fill="#7DB7FF" fontSize="8" fontFamily="monospace">
                  Ø 18.5" x 6.5 CARBON ROTOR
                </text>

                {/* Aerodynamic Carbon Fiber Propeller Blade Profile */}
                <path
                  d="M 75 130 C 125 106, 315 106, 365 130 C 315 154, 125 154, 75 130 Z"
                  fill="rgba(229, 193, 88, 0.05)"
                  stroke={goldColor}
                  strokeWidth="1.3"
                />
                {/* Airfoil Camber Chord Line */}
                <path d="M 85 130 Q 220 120 355 130" fill="none" stroke={goldColor} strokeWidth="0.9" strokeDasharray="4 2" />

                {/* Central CNC Brushless Outrunner Motor Assembly */}
                <circle cx="220" cy="130" r="36" fill={nodeFill} stroke={goldColor} strokeWidth="1.3" />
                <circle cx="220" cy="130" r="28" fill="none" stroke={goldColor} strokeWidth="0.8" strokeDasharray="4 2" />

                {/* 12 Stator Tooth Radial Indicators */}
                {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => {
                  const rad = (deg * Math.PI) / 180;
                  const x1 = 220 + 22 * Math.cos(rad);
                  const y1 = 130 + 22 * Math.sin(rad);
                  const x2 = 220 + 28 * Math.cos(rad);
                  const y2 = 130 + 28 * Math.sin(rad);
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={goldColor} strokeWidth="0.9" />;
                })}

                {/* Central Shaft & Bearing Race */}
                <circle cx="220" cy="130" r="10" fill={nodeFill} stroke={goldColor} strokeWidth="1" />
                <circle cx="220" cy="130" r="3.5" fill="#7DB7FF" />

                {/* 4 Motor Mounting Holes with Crosshairs */}
                {[
                  [204, 114],
                  [236, 114],
                  [204, 146],
                  [236, 146],
                ].map(([bx, by], i) => (
                  <g key={i}>
                    <circle cx={bx} cy={by} r="2.5" fill="none" stroke="#7DB7FF" strokeWidth="0.8" />
                    <line x1={bx - 4} y1={by} x2={bx + 4} y2={by} stroke="#7DB7FF" strokeWidth="0.6" />
                    <line x1={bx} y1={by - 4} x2={bx} y2={by + 4} stroke="#7DB7FF" strokeWidth="0.6" />
                  </g>
                ))}

                {/* Lower Carbon Motor Arm Bracket */}
                <line x1="212" y1="166" x2="212" y2="215" stroke={goldColor} strokeWidth="1.2" />
                <line x1="228" y1="166" x2="228" y2="215" stroke={goldColor} strokeWidth="1.2" />
                <line x1="206" y1="215" x2="234" y2="215" stroke={goldColor} strokeWidth="1" />

                {/* Technical Quality Metadata Annotations */}
                <text x="50" y="46" fill="#7DB7FF" fontSize="8.5" fontFamily="monospace" letterSpacing="0.08em">
                  MOTOR SPEC: BRUSHLESS 480KV
                </text>
                <text x="50" y="222" fill="rgba(255,255,255,0.45)" fontSize="8" fontFamily="monospace">
                  TOLERANCE: ±0.012mm // BALANCED
                </text>
                <text x="310" y="222" fill="rgba(255,255,255,0.45)" fontSize="8" fontFamily="monospace">
                  MAX RPM: 6,800
                </text>
              </g>
            )}

            {/* ========================================================================= */}
            {/* 3. GROWTH & DEVELOPMENT: HIGH-ALTITUDE AUTONOMOUS AIRFRAME & AVIONICS     */}
            {/* ========================================================================= */}
            {diagramType === "diode" && (
              <g>
                {/* Construction Grid Centerlines */}
                <line x1="220" y1="28" x2="220" y2="232" stroke={boundaryStroke} strokeDasharray="4 3" strokeWidth="0.8" />
                <line x1="45" y1="130" x2="395" y2="130" stroke={boundaryStroke} strokeDasharray="4 3" strokeWidth="0.8" />

                {/* Dimension Line over Wing Assembly */}
                <line x1="75" y1="75" x2="365" y2="75" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
                <line x1="75" y1="70" x2="75" y2="80" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
                <line x1="365" y1="70" x2="365" y2="80" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
                <text x="220" y="70" textAnchor="middle" fill="#7DB7FF" fontSize="8" fontFamily="monospace">
                  WINGSPAN: 3,400mm // CARBON COMPOSITE MONOCOQUE
                </text>

                {/* Main High-Altitude Tactical Airframe Outline */}
                {/* Center Fuselage Body */}
                <path
                  d="M 220 52 C 228 70, 234 100, 234 140 C 234 175, 226 205, 220 215 C 214 205, 206 175, 206 140 C 206 100, 212 70, 220 52 Z"
                  fill="rgba(229, 193, 88, 0.08)"
                  stroke={goldColor}
                  strokeWidth="1.3"
                />

                {/* High-Aspect Swept Wings */}
                <path
                  d="M 234 118 L 365 130 L 365 142 L 234 150 Z"
                  fill="rgba(229, 193, 88, 0.05)"
                  stroke={goldColor}
                  strokeWidth="1.2"
                />
                <path
                  d="M 206 118 L 75 130 L 75 142 L 206 150 Z"
                  fill="rgba(229, 193, 88, 0.05)"
                  stroke={goldColor}
                  strokeWidth="1.2"
                />

                {/* Winglet Vertical Stabilizers at Tips */}
                <path d="M 365 124 L 372 118 L 372 144 L 365 142 Z" fill={nodeFill} stroke={goldColor} strokeWidth="1.1" />
                <path d="M 75 124 L 68 118 L 68 144 L 75 142 Z" fill={nodeFill} stroke={goldColor} strokeWidth="1.1" />

                {/* Internal Wing Structural Ribs (CAD Stations) */}
                {[105, 135, 165, 195, 245, 275, 305, 335].map((x, i) => (
                  <line
                    key={i}
                    x1={x}
                    y1={x > 220 ? 118 + ((x - 234) * 12) / 131 : 118 + ((206 - x) * 12) / 131}
                    x2={x}
                    y2={x > 220 ? 150 - ((x - 234) * 8) / 131 : 150 - ((206 - x) * 8) / 131}
                    stroke={goldColor}
                    strokeWidth="0.75"
                    strokeDasharray="2 1.5"
                    opacity="0.8"
                  />
                ))}

                {/* Main Carbon Spar Line running through wings */}
                <line x1="75" y1="134" x2="365" y2="134" stroke={goldColor} strokeWidth="1.2" opacity="0.9" />

                {/* Dual Nacelle Engine Pods */}
                <rect x="175" y="125" width="14" height="42" rx="2" fill={nodeFill} stroke={goldColor} strokeWidth="1.1" />
                <rect x="251" y="125" width="14" height="42" rx="2" fill={nodeFill} stroke={goldColor} strokeWidth="1.1" />
                {/* Propeller Rotation Arc Discs */}
                <ellipse cx="182" cy="168" rx="14" ry="4" fill="none" stroke="#7DB7FF" strokeWidth="0.8" strokeDasharray="3 2" />
                <ellipse cx="258" cy="168" rx="14" ry="4" fill="none" stroke="#7DB7FF" strokeWidth="0.8" strokeDasharray="3 2" />

                {/* Central Neural Avionics Core Processor (Growth & Capability) */}
                <rect x="210" y="112" width="20" height="26" rx="2" fill="#1E1D1E" stroke="#7DB7FF" strokeWidth="1.2" />
                <circle cx="220" cy="125" r="4" fill="#7DB7FF" />
                {/* Micro-bus data traces radiating to wings */}
                <path d="M 210 120 L 195 120 L 185 130" fill="none" stroke="#7DB7FF" strokeWidth="0.8" />
                <path d="M 230 120 L 245 120 L 255 130" fill="none" stroke="#7DB7FF" strokeWidth="0.8" />
                <path d="M 220 138 L 220 155 L 210 165" fill="none" stroke="#7DB7FF" strokeWidth="0.8" />

                {/* V-Tail Stabilizers at Aft */}
                <line x1="220" y1="205" x2="242" y2="225" stroke={goldColor} strokeWidth="1.2" />
                <line x1="220" y1="205" x2="198" y2="225" stroke={goldColor} strokeWidth="1.2" />
                <line x1="242" y1="225" x2="248" y2="222" stroke={goldColor} strokeWidth="1" />
                <line x1="198" y1="225" x2="192" y2="222" stroke={goldColor} strokeWidth="1" />

                {/* Nose Optical Sensor Gimbal Sphere */}
                <circle cx="220" cy="58" r="5" fill="#7DB7FF" stroke={goldColor} strokeWidth="1" />

                {/* Dynamic Parabolic Flight Envelope Progression Arc */}
                <path
                  d="M 60 190 Q 150 175, 220 100 T 380 40"
                  fill="none"
                  stroke="#7DB7FF"
                  strokeWidth="1.4"
                  strokeDasharray="4 3"
                />
                <circle cx="220" cy="100" r="3" fill="#7DB7FF" />
                <circle cx="380" cy="40" r="3.5" fill="#7DB7FF" />
                <path d="M 370 41 L 380 40 L 378 50" fill="none" stroke="#7DB7FF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />

                {/* Technical Callout Annotations */}
                <text x="50" y="46" fill="#7DB7FF" fontSize="8.5" fontFamily="monospace" letterSpacing="0.08em">
                  ENVELOPE EXPANSION // FLIGHT TEST L4
                </text>
                <text x="50" y="222" fill="rgba(255,255,255,0.45)" fontSize="8" fontFamily="monospace">
                  AUTONOMOUS CEILING: 16,000m
                </text>
                <text x="270" y="222" fill="rgba(255,255,255,0.45)" fontSize="8" fontFamily="monospace">
                  EDGE NEURAL: NPU TENSOR
                </text>
              </g>
            )}

            {/* ========================================================================= */}
            {/* 4. TRUST & TEAMWORK: MULTI-UAV SWARM FORMATION & DATALINK MESH             */}
            {/* ========================================================================= */}
            {diagramType === "network" && (
              <g>
                {/* Construction Grid Centerlines */}
                <line x1="220" y1="30" x2="220" y2="230" stroke={boundaryStroke} strokeDasharray="4 3" strokeWidth="0.8" />
                <line x1="50" y1="130" x2="390" y2="130" stroke={boundaryStroke} strokeDasharray="4 3" strokeWidth="0.8" />

                {/* Encrypted Swarm Mesh Datalink Lines connecting 3 UAVs */}
                <line x1="220" y1="75" x2="140" y2="155" stroke="#7DB7FF" strokeWidth="1.2" strokeDasharray="5 3" />
                <line x1="220" y1="75" x2="300" y2="155" stroke="#7DB7FF" strokeWidth="1.2" strokeDasharray="5 3" />
                <line x1="140" y1="155" x2="300" y2="155" stroke="#7DB7FF" strokeWidth="1.2" strokeDasharray="5 3" />

                {/* Swarm Centroid Coordinates Node */}
                <circle cx="220" cy="130" r="18" fill="none" stroke="rgba(255,255,255,0.15)" strokeDasharray="3 2" />
                <polygon points="220,123 227,130 220,137 213,130" fill="none" stroke={goldColor} strokeWidth="1.2" />
                <circle cx="220" cy="130" r="2.5" fill="#7DB7FF" />
                <text x="220" y="146" textAnchor="middle" fill="#7DB7FF" fontSize="7" fontFamily="monospace">CENTROID</text>

                {/* Ranging Labels along Datalinks */}
                <text x="170" y="110" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="monospace">45m</text>
                <text x="260" y="110" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="monospace">45m</text>
                <text x="220" y="165" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="monospace">45m MESH</text>

                {/* 1. LEAD TACTICAL UAV (Top Center) */}
                <g transform="translate(220, 75)">
                  <path
                    d="M 0 -22 L 32 14 L 22 20 L 6 16 L 0 28 L -6 16 L -22 20 L -32 14 Z"
                    fill="rgba(229, 193, 88, 0.08)"
                    stroke={goldColor}
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />
                  <circle cx="0" cy="0" r="2.5" fill="#7DB7FF" />
                  <line x1="0" y1="-22" x2="0" y2="-32" stroke="#7DB7FF" strokeWidth="0.9" strokeDasharray="2 2" />
                </g>

                {/* 2. LEFT WINGMAN UAV */}
                <g transform="translate(140, 155)">
                  <path
                    d="M 0 -18 L 26 12 L 18 16 L 5 13 L 0 22 L -5 13 L -18 16 L -26 12 Z"
                    fill="rgba(229, 193, 88, 0.08)"
                    stroke={goldColor}
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />
                  <circle cx="0" cy="0" r="2.5" fill="#7DB7FF" />
                </g>

                {/* 3. RIGHT WINGMAN UAV */}
                <g transform="translate(300, 155)">
                  <path
                    d="M 0 -18 L 26 12 L 18 16 L 5 13 L 0 22 L -5 13 L -18 16 L -26 12 Z"
                    fill="rgba(229, 193, 88, 0.08)"
                    stroke={goldColor}
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />
                  <circle cx="0" cy="0" r="2.5" fill="#7DB7FF" />
                </g>

                {/* Technical Teamwork / Swarm Annotations */}
                <text x="50" y="46" fill="#7DB7FF" fontSize="8.5" fontFamily="monospace" letterSpacing="0.08em">
                  SWARM FORMATION // 3x NODES
                </text>
                <text x="50" y="222" fill="rgba(255,255,255,0.45)" fontSize="8" fontFamily="monospace">
                  SYNC: 100% // AES-256 MESH
                </text>
                <text x="290" y="222" fill="rgba(255,255,255,0.45)" fontSize="8" fontFamily="monospace">
                  BEARING: 014° TRUE
                </text>
              </g>
            )}

            {/* Subtle engineering corner marks */}
            <path
              d="M 46 36 L 40 36 L 40 42 M 394 36 L 400 36 L 400 42 M 46 224 L 40 224 L 40 218 M 394 224 L 400 224 L 400 218"
              stroke={boundaryStroke}
              strokeWidth="0.8"
            />
          </svg>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. BOTTOM ROW: DESCRIPTION (LEFT) + CTA LINK (RIGHT)                     */}
      {/* ========================================================================= */}
      <div
        className={`w-full border-t ${
          isLight ? "border-[#252324]/15" : "border-[#625D60]/40"
        }`}
      >
        <div className="w-full max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-16 py-5 sm:py-5.5 md:py-5 lg:py-5.5 flex flex-col md:flex-row md:items-center justify-between gap-3.5 sm:gap-4 md:gap-6">
          {/* Left Column: Description Paragraph */}
          <div className="flex-1 max-w-2xl pr-4">
            <p
              className={`text-sm sm:text-[14.5px] lg:text-[15px] font-normal leading-[1.65] tracking-[-0.01em] ${
                isLight ? "text-[#252324]/90" : "text-[#EDE8E4]/90"
              }`}
            >
              {description}
            </p>
          </div>

          {/* Right Column: CTA link with vertical separator */}
          <div
            className={`md:border-l md:pl-8 lg:pl-12 flex items-center shrink-0 ${
              isLight ? "md:border-[#252324]/15" : "md:border-[#625D60]/40"
            }`}
          >
            <Link
              href={ctaHref}
              className={`group relative inline-block text-sm sm:text-[14.5px] lg:text-[15px] font-medium pb-1 transition-colors duration-200 ${
                isLight ? "text-[#252324]" : "text-[#EDE8E4]"
              }`}
            >
              <span
                className={`transition-colors duration-200 ${
                  isLight ? "group-hover:text-black" : "group-hover:text-white"
                }`}
              >
                {ctaText}
              </span>
              {/* Sliding Underline Highlight */}
              <span
                className={`absolute left-0 bottom-0 w-full h-[1.5px] overflow-hidden ${
                  isLight ? "bg-[#252324]/25" : "bg-[#EDE8E4]/30"
                }`}
              >
                <span className="absolute inset-0 bg-[#7DB7FF] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
