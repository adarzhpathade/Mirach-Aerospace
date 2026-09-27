"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import LetterSwapForward from "@/components/fancy/text/letter-swap-forward-anim";

export function Navbar() {
  const [hasMounted, setHasMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkBg, setIsDarkBg] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const [isHoverExpanded, setIsHoverExpanded] = useState(false);

  // Mark mounted after initial render so zero entrance animation plays
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Scroll compaction trigger on desktop only
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 768) {
      return;
    }

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.innerWidth < 768) {
            ticking = false;
            return;
          }

          const scrollY = window.scrollY;
          const lowerBlock = document.getElementById("hero-lower-block");

          let shouldBeCompact = false;
          if (lowerBlock) {
            const rect = lowerBlock.getBoundingClientRect();
            shouldBeCompact = scrollY > 60 || rect.top <= 280;
            setIsDarkBg(rect.top <= 65 && rect.bottom > 65);
          } else {
            shouldBeCompact = scrollY > 60;
            setIsDarkBg(scrollY > 300);
          }

          setIsScrolled((prev) => {
            if (!prev && shouldBeCompact) return true;
            if (prev && scrollY < 20) return false;
            return prev;
          });

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  // Close dropdown menu when clicking outside on desktop
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen && !isMobile) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen, isMobile]);

  // When hovered on desktop in scrolled mode, expand back to full navbar
  const showCompact = isScrolled && !isHoverExpanded;

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. MOBILE EXPANDING NAV (EXPANDS IN-PLACE TO BECOME MENU, NO SHADOW/DEPTH) */}
      {/* ========================================================================= */}
      <motion.div
        initial={false}
        animate={{
          height: menuOpen ? "calc(100dvh - 2rem)" : "54px",
        }}
        transition={{ duration: 0.46, ease: [0.16, 1, 0.3, 1] }}
        className="md:hidden fixed top-4 left-4 right-4 z-[100] bg-[#252324] border border-[#413E40]/70 rounded-md overflow-hidden flex flex-col justify-between shadow-none pointer-events-auto"
      >
        {/* Top Header Row (Always at the top of the pill/menu) */}
        <div className="h-[52px] min-h-[52px] px-4 flex items-center justify-between select-none">
          {/* Wordmark */}
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="font-bold tracking-tight text-xl text-white focus:outline-none"
            aria-label="Mirach"
          >
            Mirach
          </Link>

          {/* Toggle Button in Mirach Blue #7DB7FF: Switches between Hamburger and Close X */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-9 h-9 rounded-[4px] bg-[#7DB7FF] text-black flex items-center justify-center cursor-pointer active:scale-95 transition-transform focus:outline-none"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {menuOpen ? (
              <X size={18} strokeWidth={2} className="text-black" />
            ) : (
              <svg
                width="18"
                height="12"
                viewBox="0 0 18 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-black"
                aria-hidden="true"
              >
                <path
                  d="M1 1.5H17M1 6H17M1 10.5H17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Expanded Content (Links & Bottom CTA): In-place expansion */}
        <div
          className={`flex-1 flex flex-col justify-between px-6 pb-6 pt-2 overflow-y-auto transition-opacity duration-300 ${
            menuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Middle: Large Editorial Navigation Links */}
          <nav className="flex flex-col gap-5 sm:gap-6 my-auto py-4">
            {[
              { label: "About us", href: "#about" },
              { label: "Applications", href: "#applications" },
              { label: "Products", href: "#products" },
              { label: "Why choose us", href: "#why-choose-us" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-3xl sm:text-4xl font-normal text-white hover:text-[#7DB7FF] transition-colors tracking-tight block"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Bottom: Secondary Utility Links + Action Button */}
          <div className="flex flex-col gap-5 pt-3">
            {/* Utility Links */}
            <div className="flex flex-col gap-2 text-sm font-normal text-[#EDE8E4]/70">
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                LinkedIn
              </Link>
              <Link
                href="#terms"
                onClick={() => setMenuOpen(false)}
                className="hover:text-white transition-colors"
              >
                Terms &amp; Conditions
              </Link>
              <Link
                href="#privacy"
                onClick={() => setMenuOpen(false)}
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
            </div>

            {/* Action Button: Join us (matches Mirach design system) */}
            <Link
              href="#join-us"
              onClick={() => setMenuOpen(false)}
              className="group relative overflow-hidden w-full bg-[#7DB7FF] text-black font-medium text-base py-3.5 px-6 rounded-[5px] flex items-center justify-center active:scale-[0.98] transition-transform select-none shadow-none text-center"
            >
              <span className="block text-black">Join us</span>
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-white text-black font-medium text-base flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-[5px] pointer-events-none"
              >
                Join us
              </span>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* ========================================================================= */}
      {/* 3. DESKTOP HEADER (BREAKPOINT >= 768px)                                   */}
      {/* ========================================================================= */}
      <header className="hidden md:flex fixed top-0 left-0 right-0 w-full pt-4 sm:pt-6 px-6 sm:px-10 lg:px-16 items-center justify-between z-[100] pointer-events-none">
        {/* Brand Wordmark (left) */}
        <Link
          href="/"
          className={`pointer-events-auto font-bold tracking-tight text-2xl sm:text-3xl transition-colors duration-500 focus:outline-none ${
            isDarkBg ? "text-white" : "text-[#252324]"
          }`}
          aria-label="Mirach"
        >
          Mirach
        </Link>

        {/* Nav Container (right) */}
        <div
          ref={navRef}
          className="relative pointer-events-auto"
          onMouseLeave={() => setIsHoverExpanded(false)}
        >
          <motion.nav
            layout={hasMounted}
            transition={
              hasMounted
                ? { layout: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
                : { duration: 0 }
            }
            className="flex items-center bg-[#252324] border border-[#413E40]/60 py-1.5 px-1.5 shadow-lg overflow-hidden rounded-md"
            aria-label="Main Navigation"
          >
            {/* Expanded Links Container */}
            <motion.div
              layout={hasMounted}
              className="overflow-hidden flex items-center"
              initial={false}
              animate={{
                width: showCompact ? 0 : "auto",
                opacity: showCompact ? 0 : 1,
                marginRight: showCompact ? 0 : 24,
              }}
              transition={
                hasMounted
                  ? { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
                  : { duration: 0 }
              }
            >
              <ul className="flex items-center gap-7 lg:gap-8 pl-6 lg:pl-7 whitespace-nowrap">
                <li>
                  <Link
                    href="#about"
                    onClick={() => setIsHoverExpanded(false)}
                    className="text-[14.5px] font-medium text-white hover:text-white transition-colors duration-200 block py-0.5"
                  >
                    <LetterSwapForward label="About us" reverse={false} />
                  </Link>
                </li>
                <li>
                  <Link
                    href="#applications"
                    onClick={() => setIsHoverExpanded(false)}
                    className="text-[14.5px] font-medium text-white hover:text-white transition-colors duration-200 block py-0.5"
                  >
                    <LetterSwapForward label="Applications" reverse={false} />
                  </Link>
                </li>
                <li>
                  <Link
                    href="#products"
                    onClick={() => setIsHoverExpanded(false)}
                    className="text-[14.5px] font-medium text-white hover:text-white transition-colors duration-200 block py-0.5"
                  >
                    <LetterSwapForward label="Products" reverse={false} />
                  </Link>
                </li>
                <li>
                  <Link
                    href="#why-choose-us"
                    onClick={() => setIsHoverExpanded(false)}
                    className="text-[14.5px] font-medium text-white hover:text-white transition-colors duration-200 block py-0.5"
                  >
                    <LetterSwapForward label="Why choose us" reverse={false} />
                  </Link>
                </li>
              </ul>
            </motion.div>

            {/* Hamburger Icon (When compact on desktop) */}
            <motion.div
              layout={hasMounted}
              className="overflow-hidden flex items-center"
              initial={false}
              animate={{
                width: showCompact ? "auto" : 0,
                opacity: showCompact ? 1 : 0,
                marginRight: showCompact ? 10 : 0,
              }}
              transition={
                hasMounted
                  ? { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
                  : { duration: 0 }
              }
            >
              <button
                type="button"
                onMouseEnter={() => {
                  if (isScrolled) setIsHoverExpanded(true);
                }}
                onClick={() => {
                  if (isScrolled) setIsHoverExpanded(!isHoverExpanded);
                }}
                className="p-1.5 px-3 text-white hover:text-[#7DB7FF] transition-colors focus:outline-none flex items-center justify-center cursor-pointer rounded-[4px]"
                aria-label="Toggle navigation menu"
                aria-expanded={menuOpen || isHoverExpanded}
              >
                <svg
                  width="18"
                  height="12"
                  viewBox="0 0 18 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-current"
                  aria-hidden="true"
                >
                  <path
                    d="M1 1.5H17M1 6H17M1 10.5H17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </motion.div>

            {/* Action Button: Join us (with white slide-up rectangle on hover) */}
            <motion.div
              layout={hasMounted}
              transition={
                hasMounted
                  ? { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
                  : { duration: 0 }
              }
            >
              <Link
                href="#join-us"
                className="group relative overflow-hidden bg-[#7DB7FF] text-black font-medium text-[14.5px] px-5 py-2 rounded-[5px] active:scale-[0.98] transition-transform duration-150 whitespace-nowrap block select-none"
              >
                {/* Base text */}
                <span className="block text-black">
                  Join us
                </span>

                {/* White rectangle rising up from bottom on hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-white text-black font-medium text-[14.5px] flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-[5px] pointer-events-none"
                >
                  Join us
                </span>
              </Link>
            </motion.div>
          </motion.nav>
        </div>
      </header>
    </>
  );
}
