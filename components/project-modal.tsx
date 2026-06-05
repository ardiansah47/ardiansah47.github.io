"use client";

import { useEffect } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import type { Project } from "@/lib/content";

const EASE = [0.22, 0.61, 0.36, 1] as [number, number, number, number];

const backdrop: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3, ease: EASE } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: EASE } },
};

// minimal: a subtle scale + fade, no slide
const panel: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.28, ease: EASE } },
  exit: { opacity: 0, scale: 0.97, transition: { duration: 0.2, ease: EASE } },
};

// staggers the panel's content in after the panel settles
const content: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.12, staggerChildren: 0.07 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};

/**
 * Notion-style peek modal. Pass a project to open, `null` to close.
 * AnimatePresence drives the enter/leave; the panel scales in minimally and
 * its content reveals with a stagger.
 */
export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  // lock body scroll + close on Escape while open
  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="pm"
          className="fixed inset-0 z-[60]"
          initial="hidden"
          animate="show"
          exit="exit"
        >
          <motion.div
            variants={backdrop}
            onClick={onClose}
            className="absolute inset-0 bg-[color-mix(in_oklch,#000_58%,transparent)]"
          />
          <div
            onClick={onClose}
            className="absolute inset-0 overflow-y-auto flex justify-center pt-[46px] px-[22px] pb-[60px]"
          >
            <motion.div
              variants={panel}
              role="dialog"
              aria-modal="true"
              aria-labelledby="pmTitle"
              onClick={(e) => e.stopPropagation()}
              className="relative w-[min(860px,100%)] h-max m-auto bg-surface border border-line rounded-[18px] overflow-hidden shadow-[0_40px_90px_-28px_rgba(0,0,0,.55)]"
            >
              <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                className="absolute top-[18px] right-[18px] z-[4] w-[34px] h-[34px] rounded-[9px] border-0 cursor-pointer flex items-center justify-center text-white text-[17px] leading-none backdrop-blur-[6px] bg-[color-mix(in_oklch,#000_32%,transparent)] transition-[background-color,transform] duration-200 ease-[var(--ease)] hover:bg-[color-mix(in_oklch,#000_50%,transparent)] hover:scale-[1.06]"
              >
                ✕
              </button>
              <div
                className="h-[280px] w-full bg-surface-2 bg-cover bg-center max-[680px]:h-[200px]"
                style={{ backgroundImage: project.cover }}
              />
              <motion.div
                variants={content}
                className="px-14 pt-10 pb-[60px] relative max-[680px]:px-[26px] max-[680px]:pt-[34px] max-[680px]:pb-[44px]"
              >
                <motion.h2
                  variants={item}
                  id="pmTitle"
                  className="font-display font-bold text-[clamp(30px,5vw,46px)] tracking-[-1.4px] m-0 leading-[1.04]"
                >
                  {project.title}
                </motion.h2>
                <motion.div variants={item}>
                  <div className="flex items-center gap-[7px] font-mono text-xs tracking-[.6px] uppercase text-ink-3 mt-[34px] mb-[14px]">
                    <svg
                      className="w-[14px] h-[14px]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    >
                      <path d="M9 18l6-12" />
                      <path d="M6 8l-3.5 4L6 16" />
                      <path d="M18 8l3.5 4L18 16" />
                    </svg>{" "}
                    Tech Stack
                  </div>
                  <div className="flex flex-wrap gap-[9px]">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[12.5px] px-[13px] py-[7px] border border-line-2 rounded-lg bg-bg"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
                <motion.div variants={item}>
                  {project.body.map((para, i) => (
                    <p
                      key={i}
                      className="m-0 mb-[14px] last:mb-0 text-ink-2 text-[16.5px] leading-[1.65] max-w-[64ch]"
                      dangerouslySetInnerHTML={{ __html: para }}
                    />
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
