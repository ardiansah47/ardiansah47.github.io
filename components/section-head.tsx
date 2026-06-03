import type { ReactNode } from "react";

/** Numbered section heading: a mono index followed by a display title. */
export function SectionHead({
  num,
  children,
}: {
  num: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-baseline gap-[18px] mb-[54px]">
      <span className="font-mono text-[13px] text-accent-ink tracking-[1px]">
        {num}
      </span>
      <h2 className="font-display font-semibold text-[clamp(28px,4vw,40px)] tracking-[-1px] m-0">
        {children}
      </h2>
    </div>
  );
}
