"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { Navbar } from "@/components/navbar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/button";
import { SectionHead } from "@/components/section-head";
import { ProjectCard } from "@/components/project-card";
import { ProjectModal } from "@/components/project-modal";
import { Mark } from "@/components/mark";
import { fadeUp, stagger, staggerDelayed, inView } from "@/components/motion";
import { projects, navItems, skills, EMAIL, type Project } from "@/lib/content";
import { WRAP, SECTION, PILL, CT_LINK, CT_LBL } from "@/lib/styles";

// per-section orb position [x, y] in viewport units
const orbPos: Record<string, [string, string]> = {
  top: ["58vw", "6vh"],
  about: ["-6vw", "24vh"],
  skills: ["62vw", "40vh"],
  experience: ["-10vw", "30vh"],
  projects: ["66vw", "12vh"],
  contact: ["4vw", "46vh"],
};

function Role({
  date,
  title,
  now,
  children,
}: {
  date: string;
  title: string;
  now?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[180px_1fr] gap-7 px-4 py-5 rounded-xl transition-colors duration-200 ease-[var(--ease)] hover:bg-surface max-[760px]:grid-cols-1 max-[760px]:gap-1.5 max-[760px]:px-0">
      <div className="font-mono text-xs tracking-[1.2px] uppercase text-ink-3 pt-1.5 whitespace-nowrap">
        {date}
      </div>
      <div>
        <div className="flex items-center gap-2.5 font-display text-xl font-semibold tracking-[-.2px]">
          {title}
          {now && (
            <span className="font-mono text-xs tracking-[1px] uppercase text-ink bg-accent rounded-md px-2 py-1">
              Now
            </span>
          )}
        </div>
        <div className="text-ink-2 mt-2 text-base leading-normal">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [active, setActive] = useState<Project | null>(null);

  // drift the background orb to follow the section in view
  useEffect(() => {
    const orb = document.getElementById("orb");
    const moveOrb = (id: string) => {
      const p = orbPos[id];
      if (!p || !orb) return;
      orb.style.setProperty("--ox", p[0]);
      orb.style.setProperty("--oy", p[1]);
    };
    moveOrb("top");

    const sectionIo = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && moveOrb(e.target.id)),
      { threshold: 0.4 },
    );
    navItems.forEach(({ id }) => {
      const s = document.getElementById(id);
      if (s) sectionIo.observe(s);
    });

    // hero owns the orb when scrolled to the very top
    const heroEl = document.getElementById("hero");
    const heroIo = new IntersectionObserver(
      (es) =>
        es.forEach(
          (e) =>
            e.isIntersecting && e.intersectionRatio > 0.5 && moveOrb("top"),
        ),
      { threshold: [0.5] },
    );
    if (heroEl) heroIo.observe(heroEl);

    return () => {
      sectionIo.disconnect();
      heroIo.disconnect();
    };
  }, []);

  return (
    <>
      <div
        id="orb"
        className="fixed z-0 pointer-events-none w-[48vw] max-w-[620px] aspect-square rounded-full left-0 top-0 opacity-50 blur-[72px] will-change-transform bg-[radial-gradient(circle_at_50%_50%,color-mix(in_oklch,var(--accent)_42%,transparent),transparent_68%)] [transform:translate3d(var(--ox,60vw),var(--oy,8vh),0)] transition-[transform,opacity] duration-[1300ms] ease-[var(--ease)] motion-reduce:transition-none dark:opacity-[.42] dark:blur-[86px] max-[760px]:w-[80vw] max-[760px]:blur-[56px] max-[760px]:opacity-40"
      />

      <Navbar items={navItems} right={<ThemeToggle />} />

      <main id="top">
        {/* HERO */}
        <section
          id="hero"
          className="py-24 border-b border-line max-[760px]:pt-20 max-[760px]:pb-16"
        >
          <motion.div className={WRAP} variants={stagger} {...inView}>
            <motion.div
              variants={fadeUp}
              className="font-mono text-xs tracking-[2px] uppercase text-ink-3 mb-7"
            >
              Hello, my name is
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="font-display font-bold text-[clamp(52px,9vw,108px)] leading-none tracking-[-3px] m-0"
            >
              Indra
              <br />
              Ardiansah
            </motion.h1>
            <motion.div
              variants={fadeUp}
              className="font-display font-medium text-[clamp(20px,3vw,30px)] tracking-[-.4px] mt-6 text-ink-2"
            >
              Sr. Frontend Engineer
            </motion.div>
            <motion.p
              variants={fadeUp}
              className="text-[clamp(20px,2.6vw,27px)] leading-snug font-light mt-8 max-w-[30ch]"
            >
              I build <Mark>accessible</Mark> interfaces and{" "}
              <Mark>user-centered</Mark>{" "}
              <span className="font-serif italic font-normal whitespace-nowrap">
                applications
              </span>
              .
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="flex gap-3.5 flex-wrap mt-11"
            >
              <Button href="#contact" variant="primary" icon="↗">
                Get in touch
              </Button>
              <Button
                href="/Indra-Ardiansah-Resume.pdf"
                download
                variant="ghost"
                icon="↓"
              >
                Download CV
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* ABOUT */}
        <section className={SECTION} id="about">
          <motion.div className={WRAP} variants={staggerDelayed} {...inView}>
            <motion.div variants={fadeUp}>
              <SectionHead num="01">About</SectionHead>
            </motion.div>
            <motion.div variants={stagger} className="grid grid-cols-1 gap-6">
              <motion.p
                variants={fadeUp}
                className="m-0 text-xl leading-relaxed text-ink-2"
              >
                I&apos;m a frontend engineer with <b>7+ years</b> of experience
                building <Mark>accessible</Mark>, high-performance web
                applications. I care about the small details that make an
                interface feel effortless, and I do my best work where
                thoughtful design meets <b>clean, scalable code</b>.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="m-0 text-xl leading-relaxed text-ink-2"
              >
                Currently, I&apos;m the{" "}
                <b>Product Engineering Lead at Appliance.io</b>, a SaaS platform
                for appliance retailers. I own features end-to-end, turning
                business requirements into clear, predictable work and aligning
                frontend direction with product strategy to keep our products
                fast, consistent, and accessible.
              </motion.p>
            </motion.div>
          </motion.div>
        </section>

        {/* SKILLS */}
        <section className={SECTION} id="skills">
          <motion.div className={WRAP} variants={staggerDelayed} {...inView}>
            <motion.div variants={fadeUp}>
              <SectionHead num="02">Skills</SectionHead>
            </motion.div>
            <motion.p
              variants={fadeUp}
              className="text-lg leading-relaxed text-ink-2 -mt-2 mb-8"
            >
              The tools I reach for most when building products, from the
              frameworks that shape the UI to the testing and tooling that keep
              it dependable. Always a few more in progress.
            </motion.p>
            <motion.div variants={stagger} className="flex flex-wrap gap-2.5">
              {skills.map((s) => (
                <motion.span
                  key={s.name}
                  variants={fadeUp}
                  className={`${PILL} inline-flex items-center gap-2`}
                >
                  {s.icon && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={`/icons/${s.icon}`}
                      alt={s.name}
                      aria-hidden
                      width={16}
                      height={16}
                      className={`h-4 w-4 ${s.invertOnDark ? "dark:invert" : ""}`}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  )}
                  {s.name}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* EXPERIENCE */}
        <section className={SECTION} id="experience">
          <motion.div className={WRAP} variants={staggerDelayed} {...inView}>
            <motion.div variants={fadeUp}>
              <SectionHead num="03">Experience</SectionHead>
            </motion.div>

            <motion.div variants={fadeUp} className="mb-12 last:mb-0">
              <div className="font-display text-2xl font-semibold tracking-[-.3px] pb-3 border-b border-line mb-2.5 flex justify-between items-baseline gap-3">
                Appliance.io{" "}
                <span className="font-mono text-xs text-ink-3 tracking-[.5px] font-normal">
                  Full-time · 7 yrs 7 mos
                </span>
              </div>
              <Role
                date="Mar 2026 – Present"
                title="Product Engineering Lead"
                now
              >
                Own features end-to-end, turning business requirements into
                clear user flows and resolving ambiguity before any code is
                written. Own the task breakdown through{" "}
                <b>user stories</b>, keeping work small, predictable, and
                development-ready with clear acceptance criteria. Lead
                product-facing technical discussions and communicate trade-offs.
              </Role>
              <Role date="Sep 2022 – Mar 2026" title="Frontend Lead">
                Led <b>3 frontend engineers</b> and owned the frontend
                architecture behind core platform features shared across
                products. Raised code quality and release stability through
                testing, ESLint, Prettier, and CI/CD, while mentoring the team
                and establishing development best practices. Drove the migration
                from <b>Vue 2 + Nuxt</b> to <b>Vue 3 + TypeScript + Vite</b>,
                improving build performance and developer experience by{" "}
                <Mark>50%</Mark>.
              </Role>
              <Role date="Dec 2018 – Aug 2024" title="Frontend Developer">
                Built responsive, user-friendly features for the core platform
                and a reusable design system that accelerated delivery by{" "}
                <Mark>40%</Mark>. Integrated RESTful APIs, improved mobile and
                cross-browser support, and worked with product, design, and
                backend to ship production-ready work, resolving bugs and
                technical issues to keep the experience stable.
              </Role>
            </motion.div>

            <motion.div variants={fadeUp} className="mb-12 last:mb-0">
              <div className="font-display text-2xl font-semibold tracking-[-.3px] pb-3 border-b border-line mb-2.5 flex justify-between items-baseline gap-3">
                Trys{" "}
                <span className="font-mono text-xs text-ink-3 tracking-[.5px] font-normal">
                  May 2017 – Nov 2018
                </span>
              </div>
              <Role date="2017 – 2018" title="Frontend Developer">
                Designed and built website UIs, focusing on visually appealing,
                user-friendly experiences that translated designs into clean,
                responsive interfaces.
              </Role>
            </motion.div>
          </motion.div>
        </section>

        {/* PROJECTS */}
        <section className={SECTION} id="projects">
          <motion.div className={WRAP} variants={staggerDelayed} {...inView}>
            <motion.div variants={fadeUp}>
              <SectionHead num="04">Projects</SectionHead>
            </motion.div>
            <motion.p
              variants={fadeUp}
              className="text-lg leading-relaxed text-ink-2 -mt-2 mb-8"
            >
              A selection of projects I&apos;ve worked on.
            </motion.p>
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} onOpen={setActive} />
            ))}
          </motion.div>
        </section>

        {/* CONTACT */}
        <section className="pt-24 pb-24" id="contact">
          <motion.div className={WRAP} variants={staggerDelayed} {...inView}>
            <motion.div variants={fadeUp}>
              <SectionHead num="05">Get in touch</SectionHead>
            </motion.div>
            <motion.p
              variants={fadeUp}
              className="text-xl leading-relaxed text-ink-2"
            >
              I&apos;m open to new roles and interesting projects. Have
              something in mind? Drop me a line, I&apos;ll get back to you
              soon.
            </motion.p>
            <motion.a
              variants={fadeUp}
              className="inline-block font-display font-bold text-[clamp(26px,4.2vw,44px)] tracking-[-1.4px] no-underline mt-7 leading-none text-ink"
              href={`mailto:${EMAIL}`}
            >
              <Mark email>{EMAIL}</Mark>
            </motion.a>
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap gap-x-8 gap-y-3.5 mt-12"
            >
              <a className={CT_LINK} href="https://www.linkedin.com/in/indraardiansah">
                <span className={CT_LBL}>LinkedIn</span> /in/indraardiansah ↗
              </a>
              <a className={CT_LINK} href="https://github.com/ardiansah47">
                <span className={CT_LBL}>GitHub</span> @ardiansah47 ↗
              </a>
              <a className={CT_LINK} href="#">
                <span className={CT_LBL}>CV</span> download PDF ↓
              </a>
            </motion.div>
          </motion.div>
        </section>

        <footer className="pt-9 pb-12">
          <div
            className={`${WRAP} flex justify-between flex-wrap gap-3.5 font-mono text-xs text-ink-3`}
          >
            <span>© 2026 Indra Ardiansah</span>
            <span>Designed &amp; built from scratch</span>
          </div>
        </footer>
      </main>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </>
  );
}
