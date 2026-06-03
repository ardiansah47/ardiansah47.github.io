"use client";

import { useCallback, useEffect, useState } from "react";
import type { Project } from "@/lib/content";

/**
 * Notion-style peek modal. Driven by the `project` prop: pass a project to
 * open, `null` to close. Owns its own enter/leave transition, body-scroll
 * lock, and Escape handling; calls `onClose` once the leave animation ends.
 */
export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const [shown, setShown] = useState(false);

  // animate out, then let the parent unmount us by clearing the project
  const close = useCallback(() => {
    setShown(false);
    window.setTimeout(onClose, 300);
  }, [onClose]);

  useEffect(() => {
    if (!project) return;

    document.body.style.overflow = "hidden";
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setShown(true));
    });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      setShown(false);
    };
  }, [project, close]);

  return (
    <div
      className={`fixed inset-0 z-[60] ${project ? "" : "hidden"}`}
      aria-hidden={!project}
    >
      <div
        onClick={close}
        className={`absolute inset-0 bg-[color-mix(in_oklch,#000_58%,transparent)] transition-opacity duration-300 ease-[var(--ease)] ${
          shown ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        onClick={close}
        className="absolute inset-0 overflow-y-auto flex justify-center pt-[46px] px-[22px] pb-[60px]"
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="pmTitle"
          onClick={(e) => e.stopPropagation()}
          className={`relative w-[min(860px,100%)] h-max m-auto bg-surface border border-line rounded-[18px] overflow-hidden shadow-[0_40px_90px_-28px_rgba(0,0,0,.55)] transition-[opacity,transform] duration-[260ms] ease-[var(--ease)] ${
            shown
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-[10px] scale-[.99]"
          }`}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={close}
            className="absolute top-[18px] right-[18px] z-[4] w-[34px] h-[34px] rounded-[9px] border-0 cursor-pointer flex items-center justify-center text-white text-[17px] leading-none backdrop-blur-[6px] bg-[color-mix(in_oklch,#000_32%,transparent)] transition-[background-color,transform] duration-200 ease-[var(--ease)] hover:bg-[color-mix(in_oklch,#000_50%,transparent)] hover:scale-[1.06]"
          >
            ✕
          </button>
          <div
            className="h-[280px] w-full bg-surface-2 bg-cover bg-center max-[680px]:h-[200px]"
            style={{ backgroundImage: project?.cover }}
          />
          <div className="px-14 pt-10 pb-[60px] relative max-[680px]:px-[26px] max-[680px]:pt-[34px] max-[680px]:pb-[44px]">
            <h2
              id="pmTitle"
              className="font-display font-bold text-[clamp(30px,5vw,46px)] tracking-[-1.4px] m-0 leading-[1.04]"
            >
              {project?.title}
            </h2>
            <div>
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
                {project?.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[12.5px] px-[13px] py-[7px] border border-line-2 rounded-lg bg-bg"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div>
              {project?.body.map((para, i) => (
                <p
                  key={i}
                  className="m-0 mb-[14px] last:mb-0 text-ink-2 text-[16.5px] leading-[1.65] max-w-[64ch]"
                  dangerouslySetInnerHTML={{ __html: para }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
