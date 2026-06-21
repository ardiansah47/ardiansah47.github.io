"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.22, 0.61, 0.36, 1] as [number, number, number, number];

/**
 * Highlighter mark: an amber stroke behind the text that sweeps in (scaleX)
 * the first time it scrolls into view. `email` uses the thinner stroke.
 */
export function Mark({
  children,
  email = false,
}: {
  children: ReactNode;
  email?: boolean;
}) {
  return (
    <span className="relative whitespace-nowrap px-1 text-ink">
      <motion.span
        aria-hidden
        className={`absolute inset-x-0 -z-[1] origin-left rounded-[2px_6px_3px_7px] bg-accent ${
          email ? "h-[.32em] bottom-[.06em]" : "h-[.52em] bottom-[.08em]"
        }`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASE }}
      />
      {children}
    </span>
  );
}
