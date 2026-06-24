"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { skillIcons, type Project } from "@/lib/content";

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

// gradient strings render as a background; everything else as an image url
function slideStyle(src: string): CSSProperties {
  return src.includes("gradient(")
    ? { background: src }
    : { backgroundImage: `url("${src}")` };
}

const ROUND_BTN =
  "flex items-center justify-center rounded-full text-white leading-none backdrop-blur-[6px] bg-[color-mix(in_oklch,#000_38%,transparent)] transition-[background-color,transform] duration-200 ease-[var(--ease)] hover:bg-[color-mix(in_oklch,#000_55%,transparent)] hover:scale-[1.06] cursor-pointer";

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-[45%] h-[45%]"
      aria-hidden
    >
      <path d={dir === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
    </svg>
  );
}

/** Banner: a horizontal slider of image cards (several visible at once). Each
 *  card opens the lightbox at its index. */
function Banner({
  slides,
  onOpen,
}: {
  slides: string[];
  onOpen: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollable, setScrollable] = useState(false);

  // distance between two cards (card width + gap), measured from the DOM
  const step = () => {
    const el = ref.current;
    if (!el) return 1;
    const cards = el.querySelectorAll<HTMLElement>("[data-card]");
    if (cards.length < 2) return cards[0]?.offsetWidth ?? el.clientWidth;
    return cards[1].offsetLeft - cards[0].offsetLeft;
  };

  const page = (dir: number) =>
    ref.current?.scrollBy({ left: dir * step(), behavior: "smooth" });

  // only show arrows when the cards actually overflow
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() =>
      setScrollable(el.scrollWidth > el.clientWidth + 4),
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, [slides.length]);

  return (
    <div className="relative h-72 w-full overflow-hidden max-[680px]:h-56">
      <div
        ref={ref}
        className="flex h-full items-center gap-4 overflow-x-auto scroll-px-6 px-6 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-[680px]:gap-3 max-[680px]:px-4 max-[680px]:scroll-px-4"
      >
        {slides.map((s, idx) => (
          <button
            data-card
            key={idx}
            type="button"
            onClick={() => onOpen(idx)}
            aria-label={`Open image ${idx + 1} of ${slides.length}`}
            className="snap-start aspect-[16/10] w-[42%] flex-none cursor-zoom-in overflow-hidden rounded-xl border border-line-2 bg-cover bg-center shadow-[0_10px_28px_-12px_rgba(0,0,0,.3)] transition-transform duration-200 hover:scale-[1.02] max-[680px]:w-[80%]"
            style={slideStyle(s)}
          />
        ))}
      </div>

      {scrollable && (
        <>
          <button
            type="button"
            aria-label="Previous"
            onClick={() => page(-1)}
            className={`${ROUND_BTN} absolute left-3 top-1/2 -translate-y-1/2 z-[3] w-9 h-9`}
          >
            <Chevron dir="left" />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => page(1)}
            className={`${ROUND_BTN} absolute right-3 top-1/2 -translate-y-1/2 z-[3] w-9 h-9`}
          >
            <Chevron dir="right" />
          </button>
        </>
      )}
    </div>
  );
}

/** Fullscreen image viewer. Controlled via `index`; the modal owns keyboard. */
function Lightbox({
  slides,
  index,
  onChange,
  onClose,
}: {
  slides: string[];
  index: number;
  onChange: (i: number) => void;
  onClose: () => void;
}) {
  const many = slides.length > 1;
  const src = slides[index];
  const isGradient = src.includes("gradient(");

  return (
    <motion.div
      key="lb"
      className="fixed inset-0 z-[70] flex items-center justify-center p-6 max-[680px]:p-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: EASE }}
    >
      <div className="absolute inset-0 bg-black/85" onClick={onClose} />

      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className={`${ROUND_BTN} absolute top-5 right-5 z-[3] w-10 h-10 text-lg`}
      >
        ✕
      </button>

      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.985 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-[2]"
      >
        {isGradient ? (
          <div
            className="w-[min(92vw,1100px)] aspect-[16/10] rounded-xl shadow-2xl"
            style={{ background: src }}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt=""
            className="max-w-[92vw] max-h-[86vh] rounded-xl object-contain shadow-2xl"
          />
        )}
      </motion.div>

      {many && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={() =>
              onChange((index - 1 + slides.length) % slides.length)
            }
            className={`${ROUND_BTN} absolute left-4 top-1/2 -translate-y-1/2 z-[3] w-11 h-11`}
          >
            <Chevron dir="left" />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => onChange((index + 1) % slides.length)}
            className={`${ROUND_BTN} absolute right-4 top-1/2 -translate-y-1/2 z-[3] w-11 h-11`}
          >
            <Chevron dir="right" />
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[3] font-mono text-xs tracking-[1px] text-white/70">
            {index + 1} / {slides.length}
          </div>
        </>
      )}
    </motion.div>
  );
}

/**
 * Notion-style peek modal. Pass a project to open, `null` to close.
 * The banner is a carousel; clicking a slide opens a fullscreen lightbox.
 */
export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const [lb, setLb] = useState<number | null>(null);

  const slides = project
    ? project.gallery?.length
      ? project.gallery
      : [project.cover]
    : [];

  // reset the lightbox whenever the project changes (open/close/switch)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLb(null);
  }, [project]);

  // lock body scroll while the modal is open
  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  // keyboard: Escape closes the lightbox first (then the modal); arrows page
  // the lightbox when it's open
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lb !== null) setLb(null);
        else onClose();
      } else if (lb !== null && e.key === "ArrowLeft") {
        setLb((lb - 1 + slides.length) % slides.length);
      } else if (lb !== null && e.key === "ArrowRight") {
        setLb((lb + 1) % slides.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, lb, onClose, slides.length]);

  return (
    <>
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
              className="absolute inset-0 overflow-y-auto flex justify-center pt-12 px-6 pb-16"
            >
              <motion.div
                variants={panel}
                role="dialog"
                aria-modal="true"
                aria-labelledby="pmTitle"
                onClick={(e) => e.stopPropagation()}
                className="relative w-[min(860px,100%)] h-max m-auto bg-surface border border-line rounded-2xl overflow-hidden shadow-[0_40px_90px_-28px_rgba(0,0,0,.55)]"
              >
                <button
                  type="button"
                  aria-label="Close"
                  onClick={onClose}
                  className="absolute top-5 right-5 z-[4] w-9 h-9 rounded-lg border-0 cursor-pointer flex items-center justify-center text-white text-lg leading-none backdrop-blur-[6px] bg-[color-mix(in_oklch,#000_32%,transparent)] transition-[background-color,transform] duration-200 ease-[var(--ease)] hover:bg-[color-mix(in_oklch,#000_50%,transparent)] hover:scale-[1.06]"
                >
                  ✕
                </button>

                <Banner key={project.id} slides={slides} onOpen={setLb} />

                <motion.div
                  variants={content}
                  className="px-14 pt-10 pb-16 relative max-[680px]:px-7 max-[680px]:pt-9 max-[680px]:pb-11"
                >
                  <motion.h2
                    variants={item}
                    id="pmTitle"
                    className="font-display font-bold text-[clamp(30px,5vw,46px)] tracking-[-1.4px] m-0 leading-none"
                  >
                    {project.title}
                  </motion.h2>
                  <motion.div variants={item}>
                    <div className="flex items-center gap-2 font-mono text-xs tracking-[.6px] uppercase text-ink-3 mt-9 mb-3.5">
                      <svg
                        className="w-3.5 h-3.5"
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
                    <div className="flex flex-wrap gap-2.5 mb-3">
                      {project.tech.map((t) => {
                        const ic = skillIcons[t];
                        return (
                          <span
                            key={t}
                            className="inline-flex items-center gap-2 font-mono text-xs px-3.5 py-2 border border-line-2 rounded-lg bg-bg"
                          >
                            {ic && (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={`/icons/${ic.icon}`}
                                alt=""
                                aria-hidden
                                width={16}
                                height={16}
                                className={`h-4 w-4 ${ic.invertOnDark ? "dark:invert" : ""}`}
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                }}
                              />
                            )}
                            {t}
                          </span>
                        );
                      })}
                    </div>
                  </motion.div>
                  <motion.div variants={item}>
                    {project.body.map((para, idx) => (
                      <p
                        key={idx}
                        className="m-0 mb-3.5 last:mb-0 text-ink-2 text-base leading-relaxed"
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

      <AnimatePresence>
        {project && lb !== null && (
          <Lightbox
            slides={slides}
            index={lb}
            onChange={setLb}
            onClose={() => setLb(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
