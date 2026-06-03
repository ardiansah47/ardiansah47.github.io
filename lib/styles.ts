// Shared Tailwind class recipes used across the page and design-system components.
// Keeping them here avoids repeating long arbitrary-value strings in the markup.

export const WRAP =
  "max-w-[var(--maxw)] mx-auto px-8 relative z-[2] max-[760px]:px-[22px]";

export const SECTION = "py-[90px] border-b border-line";

export const PILL =
  "font-mono text-[13.5px] px-[15px] py-[9px] border border-line-2 rounded-[30px] bg-surface cursor-default transition-all duration-200 ease-[var(--ease)] hover:border-ink hover:-translate-y-0.5";

// highlighter mark — a static amber stroke (animate later with motion.dev)
const MK_BASE =
  "relative whitespace-nowrap px-[3px] text-ink before:content-[''] before:absolute before:inset-x-0 before:-z-[1] before:bg-accent before:rounded-[2px_6px_3px_7px] before:origin-left";
export const MK = `${MK_BASE} before:h-[.52em] before:bottom-[.08em]`;
export const MK_EMAIL = `${MK_BASE} before:h-[.32em] before:bottom-[.06em]`;

export const CT_LINK =
  "group font-mono text-[13px] no-underline text-ink inline-flex items-center gap-2 pb-[3px] border-b-[1.5px] border-line-2 transition-all duration-200 ease-[var(--ease)] hover:border-ink";
export const CT_LBL = "text-ink-3 transition-colors group-hover:text-accent-ink";
