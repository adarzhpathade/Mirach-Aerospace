"use client";

import { useEffect } from "react";

export function DynamicThemeColor() {
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;

    let themeMeta = document.querySelector('meta[name="theme-color"]');
    if (!themeMeta) {
      themeMeta = document.createElement("meta");
      themeMeta.setAttribute("name", "theme-color");
      document.head.appendChild(themeMeta);
    }

    const sections = [
      { id: "hero-top-block", color: "#F1F7FF" },
      { id: "hero-lower-block", color: "#252324" },
      { id: "about", color: "#F1F7FF" },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const match = sections.find((s) => s.id === entry.target.id);
            if (match && themeMeta) {
              themeMeta.setAttribute("content", match.color);
            }
          }
        });
      },
      {
        rootMargin: "-10px 0px -75% 0px",
        threshold: 0,
      }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
