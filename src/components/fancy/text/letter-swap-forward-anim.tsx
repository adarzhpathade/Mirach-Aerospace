"use client";

import React, { useState } from "react";
import { AnimationOptions, motion, stagger, useAnimate } from "motion/react";

interface TextProps {
  label: string;
  reverse?: boolean;
  transition?: AnimationOptions;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | number;
  className?: string;
  onClick?: () => void;
}

const LetterSwapForward = ({
  label,
  reverse = false,
  transition = {
    type: "spring",
    stiffness: 300,
    damping: 25,
  },
  staggerDuration = 0.02,
  staggerFrom = "first",
  className = "",
  onClick,
  ...props
}: TextProps) => {
  const [scope, animate] = useAnimate();
  const [blocked, setBlocked] = useState(false);

  const hoverStart = () => {
    if (blocked) return;

    setBlocked(true);

    const mergeTransition = (baseTransition: AnimationOptions) => ({
      ...baseTransition,
      delay: stagger(staggerDuration, {
        from: staggerFrom,
      }),
    });

    animate(
      ".letter",
      { y: reverse ? "100%" : "-100%" },
      mergeTransition(transition)
    ).then(() => {
      animate(
        ".letter",
        {
          y: 0,
        },
        {
          duration: 0,
        }
      ).then(() => {
        setBlocked(false);
      });
    });

    animate(
      ".letter-secondary",
      {
        top: "0%",
      },
      mergeTransition(transition)
    ).then(() => {
      animate(
        ".letter-secondary",
        {
          top: reverse ? "-100%" : "100%",
        },
        {
          duration: 0,
        }
      );
    });
  };

  return (
    <span
      className={`inline-flex justify-center items-center relative overflow-hidden cursor-pointer select-none leading-none ${className}`}
      onMouseEnter={hoverStart}
      onClick={onClick}
      ref={scope}
      {...props}
    >
      <span className="sr-only">{label}</span>

      {label.split("").map((letter: string, i: number) => {
        return (
          <span
            className="whitespace-pre relative inline-flex"
            key={i}
            aria-hidden={true}
          >
            <motion.span className="relative letter" style={{ top: 0 }}>
              {letter}
            </motion.span>
            <motion.span
              className="absolute letter-secondary"
              style={{ top: reverse ? "-100%" : "100%" }}
            >
              {letter}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
};

export default LetterSwapForward;
