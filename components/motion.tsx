import type { Variants } from "motion/react";

// signature easing shared with the rest of the UI
const EASE = [0.22, 0.61, 0.36, 1] as [number, number, number, number];

/** Item: fades up into place. Apply to anything that should reveal. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/** Container: reveals its motion children one after another. */
export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

/** Spread onto a top-level container to trigger `stagger` when it scrolls in. */
export const inView = {
  initial: "hidden" as const,
  whileInView: "show" as const,
  viewport: { once: true, amount: 0.2 },
};
