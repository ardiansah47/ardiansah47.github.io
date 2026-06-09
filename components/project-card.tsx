"use client";

import type { CSSProperties } from "react";
import { motion } from "motion/react";
import { fadeUp } from "@/components/motion";
import type { Project } from "@/lib/content";

/** A single project row that opens the peek modal when clicked. */
export function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (project: Project) => void;
}) {
  return (
    <motion.button
      variants={fadeUp}
      type="button"
      onClick={() => onOpen(project)}
      style={{ "--cov": project.cover } as CSSProperties}
      className="group/pj grid grid-cols-[150px_1fr] gap-7 items-center px-4 py-[26px] w-full text-left border-0 bg-transparent cursor-pointer relative transition-[background-color,transform] duration-200 ease-[var(--ease)] hover:bg-surface hover:rounded-[14px] max-[760px]:grid-cols-1 max-[760px]:gap-[14px] [&:not(:first-of-type)]:before:content-[''] [&:not(:first-of-type)]:before:absolute [&:not(:first-of-type)]:before:top-0 [&:not(:first-of-type)]:before:inset-x-0 [&:not(:first-of-type)]:before:h-px [&:not(:first-of-type)]:before:bg-line"
    >
      <div className="h-[94px] rounded-[9px] border border-line-2 overflow-hidden relative bg-cover bg-center shadow-[inset_0_0_0_1px_rgba(255,255,255,.06)] transition-transform duration-[250ms] ease-[var(--ease)] [background-image:var(--cov,var(--surface-2))] group-hover/pj:scale-[1.015] max-[760px]:h-[150px]" />
      <div>
        <div className="font-display text-[22px] font-semibold tracking-[-.4px] flex items-center gap-2.5">
          {project.title}
        </div>
        <div className="text-ink-2 mt-[7px] text-[16px] leading-[1.5] max-w-[56ch]">
          {project.desc}
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 font-mono text-[11px] text-ink-3 tracking-[.4px]">
          {project.tech.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
    </motion.button>
  );
}
