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

  // Reliable scroll trigger that smoothly morphs to compact as user scrolls towards lower block
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const lowerBlock = document.getElementById("hero-lower-block");

          let shouldBeCompact = false;
          if (lowerBlock) {
            const rect = lowerBlock.getBoundingClientRect();
            shouldBeCompact = scrollY > 60 || rect.top <= 280;
            setIsDarkBg(rect.top <= 65);
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
  }, []);

  // Close dropdown menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  // When hovered on desktop in scrolled mode, expand back to full navbar
  const showCompact = isMobile || (isScrolled && !isHoverExpanded);

  return (
    <header className="fixed top-0 left-0 right-0 w-full pt-4 sm:pt-6 px-6 sm:px-10 lg:px-16 flex items-center justify-between z-50 pointer-events-none">
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
        onMouseLeave={() => {
          if (!isMobile) setIsHoverExpanded(false);
        }}
      >
        <motion.nav
          layout={hasMounted}
          transition={
            hasMounted
              ? { layout: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
              : { duration: 0 }
          }
          className="flex items-center bg-black py-1.5 px-1.5 shadow-none overflow-hidden rounded-md"
          aria-label="Main Navigation"
        >
          {/* Expanded Links Container (Desktop when at top or when hovered) */}
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

          {/* Hamburger Icon (When compact or mobile) */}
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
                if (!isMobile && isScrolled) {
                  setIsHoverExpanded(true);
                }
              }}
              onClick={() => {
                if (isMobile) {
                  setMenuOpen(!menuOpen);
                } else if (isScrolled) {
                  setIsHoverExpanded(!isHoverExpanded);
                }
              }}
              className="p-1.5 px-3 text-white hover:text-[#7DB7FF] transition-colors focus:outline-none flex items-center justify-center cursor-pointer rounded-[4px]"
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen || isHoverExpanded}
            >
              <div className="w-[19px] h-[14px] flex flex-col justify-between">
                <span className="w-full h-[1.75px] bg-white rounded-full block" />
                <span className="w-full h-[1.75px] bg-white rounded-full block" />
                <span className="w-full h-[1.75px] bg-white rounded-full block" />
              </div>
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

        {/* Dropdown Menu when hamburger is clicked in compact mode */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.96 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-full right-0 mt-2 bg-black border border-[#333132] rounded-md p-4 shadow-xl z-50 min-w-[200px]"
            >
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#333132]/60">
                <span className="text-[11px] font-mono uppercase text-[#7DB7FF] tracking-wider">Navigation</span>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="text-white/60 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X size={15} />
                </button>
              </div>
              <ul className="flex flex-col gap-1.5">
                <li>
                  <Link
                    href="#about"
                    onClick={() => setMenuOpen(false)}
                    className="block px-2.5 py-1.5 text-[14px] font-medium text-white hover:text-[#7DB7FF] hover:bg-white/5 rounded-lg transition-colors"
                  >
                    About us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#applications"
                    onClick={() => setMenuOpen(false)}
                    className="block px-2.5 py-1.5 text-[14px] font-medium text-white hover:text-[#7DB7FF] hover:bg-white/5 rounded-lg transition-colors"
                  >
                    Applications
                  </Link>
                </li>
                <li>
                  <Link
                    href="#products"
                    onClick={() => setMenuOpen(false)}
                    className="block px-2.5 py-1.5 text-[14px] font-medium text-white hover:text-[#7DB7FF] hover:bg-white/5 rounded-lg transition-colors"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="#why-choose-us"
                    onClick={() => setMenuOpen(false)}
                    className="block px-2.5 py-1.5 text-[14px] font-medium text-white hover:text-[#7DB7FF] hover:bg-white/5 rounded-lg transition-colors"
                  >
                    Why choose us
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
