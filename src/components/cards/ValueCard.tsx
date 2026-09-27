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
      className={`w-full md:h-full md:min-h-screen flex flex-col justify-between border-t ${borderColor} relative select-none ${
        isLight ? "text-[#252324]" : "text-[#EDE8E4]"
      } ${className}`}
    >
      {/* ========================================================================= */}
      {/* 1. UPPER SECTION: TITLE & SUBTEXT (LEFT) + CAD BLUEPRINT BOX (RIGHT)      */}
      {/* ========================================================================= */}
      <div className="w-full max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-16 pt-8 sm:pt-14 md:pt-16 lg:pt-24 pb-6 sm:pb-8 md:pb-10 lg:pb-14 flex-1 flex flex-col md:flex-row md:items-start justify-between gap-6 sm:gap-8 md:gap-10 lg:gap-16">
        {/* Left Column: Display Title and Bottom-aligned Tagline */}
        <div className="flex-1 flex flex-col justify-between self-stretch md:min-h-[220px] lg:min-h-[280px]">
          <div>
            <h2
              className={`card-title md:will-change-transform text-3xl sm:text-5xl md:text-6xl lg:text-[76px] xl:text-[88px] font-normal tracking-[-0.035em] leading-[1.08] sm:leading-[1.03] ${
                isLight ? "text-[#252324]" : "text-[#EDE8E4]"
              }`}
            >
              {title}
            </h2>
          </div>

          <div className="mt-6 sm:mt-10 md:mt-14 lg:mt-20">
            <p
              className={`card-tagline md:will-change-transform text-[13.5px] sm:text-base lg:text-[17px] font-normal leading-relaxed tracking-[-0.01em] whitespace-pre-line ${
                isLight ? "text-[#383536]" : "text-[#EDE8E4]/80"
              }`}
            >
              {tagline}
            </p>
          </div>
        </div>

        {/* Right Column: CAD Engineering Diagram with Grid & Gold Linework */}
        <div
          className={`cad-diagram-box md:will-change-transform w-full md:w-[420px] lg:w-[480px] xl:w-[520px] h-[190px] sm:h-[230px] md:h-[260px] lg:h-[300px] rounded-[4px] relative overflow-hidden flex items-center justify-center shrink-0 border ${
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

            {/* Inner Blueprint Housing Frame */}
            {/* Solid top half */}
            <path
              d="M 90 130 L 90 70 L 350 70 L 350 130"
              stroke={goldColor}
              strokeWidth="1"
              opacity="0.85"
            />
            {/* Dashed bottom half */}
            <path
              d="M 90 130 L 90 190 L 350 190 L 350 130"
              stroke={goldColor}
              strokeWidth="1"
              strokeDasharray="4 4"
              opacity="0.85"
            />

            {/* Left & Right Terminal Connection Points */}
            <circle
              cx="90"
              cy="130"
              r="3.5"
              fill={nodeFill}
              stroke={goldColor}
              strokeWidth="1.2"
            />
            <circle
              cx="350"
              cy="130"
              r="3.5"
              fill={nodeFill}
              stroke={goldColor}
              strokeWidth="1.2"
            />

            {/* 1. GUIDANCE / TARGET SENSOR (Leadership focused) */}
            {diagramType === "guidance" && (
              <g stroke={goldColor} strokeWidth="1.2" opacity="0.95">
                <line x1="93.5" y1="130" x2="185" y2="130" />
                <line x1="255" y1="130" x2="346.5" y2="130" />
                <circle cx="220" cy="130" r="30" fill="none" strokeDasharray="6 3" strokeWidth="1" />
                <circle cx="220" cy="130" r="16" fill="none" strokeWidth="1.2" />
                <circle cx="220" cy="130" r="3.5" fill={goldColor} />
                <line x1="220" y1="92" x2="220" y2="168" strokeWidth="1" />
                <line x1="182" y1="130" x2="258" y2="130" strokeWidth="1" />
                <path d="M 195 105 L 190 105 L 190 110" fill="none" strokeWidth="1" />
                <path d="M 245 105 L 250 105 L 250 110" fill="none" strokeWidth="1" />
                <path d="M 195 155 L 190 155 L 190 150" fill="none" strokeWidth="1" />
                <path d="M 245 155 L 250 155 L 250 150" fill="none" strokeWidth="1" />
              </g>
            )}

            {/* 2. RESISTOR / CIRCUIT (Quality first) */}
            {diagramType === "resistor" && (
              <g stroke={goldColor} strokeWidth="1.2" opacity="0.95">
                <line x1="93.5" y1="130" x2="160" y2="130" />
                <path
                  d="M 160 130 L 168 122 L 182 138 L 196 122 L 210 138 L 224 122 L 238 138 L 252 122 L 266 138 L 274 130 L 280 130"
                  fill="none"
                  strokeLinejoin="round"
                />
                <line x1="280" y1="130" x2="346.5" y2="130" />
              </g>
            )}

            {/* 3. DIODE / AMPLIFIER (Growth and skill development) */}
            {diagramType === "diode" && (
              <g stroke={goldColor} strokeWidth="1.2" opacity="0.95">
                <line x1="93.5" y1="130" x2="195" y2="130" />
                <polygon
                  points="195,116 195,144 225,130"
                  fill="none"
                  stroke={goldColor}
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
                <line x1="225" y1="114" x2="225" y2="146" strokeWidth="1.2" />
                <line x1="225" y1="130" x2="346.5" y2="130" />
                <path
                  d="M 145 170 Q 220 170 250 148 T 295 100"
                  fill="none"
                  stroke={goldColor}
                  strokeWidth="1"
                  strokeDasharray="3 3"
                  opacity="0.8"
                />
                <path d="M 288 100 L 295 100 L 295 107" fill="none" strokeWidth="1" opacity="0.8" />
              </g>
            )}

            {/* 4. NETWORK / DUAL-BUS BRIDGE (Trust and teamwork) */}
            {diagramType === "network" && (
              <g stroke={goldColor} strokeWidth="1.2" opacity="0.95">
                <line x1="93.5" y1="116" x2="346.5" y2="116" />
                <line x1="93.5" y1="144" x2="346.5" y2="144" />
                <line x1="165" y1="116" x2="165" y2="144" strokeWidth="1.2" />
                <line x1="275" y1="116" x2="275" y2="144" strokeWidth="1.2" />
                <circle cx="165" cy="116" r="3" fill={goldColor} />
                <circle cx="165" cy="144" r="3" fill={goldColor} />
                <circle cx="275" cy="116" r="3" fill={goldColor} />
                <circle cx="275" cy="144" r="3" fill={goldColor} />
                <polygon
                  points="220,118 232,130 220,142 208,130"
                  fill="none"
                  stroke={goldColor}
                  strokeWidth="1.2"
                />
                <circle cx="220" cy="130" r="2.5" fill={goldColor} />
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
        <div className="w-full max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-16 py-5 sm:py-6 md:py-8 lg:py-10 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
          {/* Left Column: Description Paragraph */}
          <div className="flex-1 max-w-2xl pr-4">
            <p
              className={`text-sm sm:text-base lg:text-[17px] font-normal leading-[1.6] tracking-[-0.01em] ${
                isLight ? "text-[#252324]/90" : "text-[#EDE8E4]/90"
              }`}
            >
              {description}
            </p>
          </div>

          {/* Right Column: CTA link with vertical separator */}
          <div
            className={`md:border-l md:pl-10 lg:pl-14 flex items-center shrink-0 ${
              isLight ? "md:border-[#252324]/15" : "md:border-[#625D60]/40"
            }`}
          >
            <Link
              href={ctaHref}
              className={`group relative inline-block text-sm sm:text-base font-medium pb-1 transition-colors duration-200 ${
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
