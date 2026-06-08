export type Project = {
  id: string;
  title: string;
  cover: string;
  desc: string;
  tech: string[];
  year: string;
  /** Modal media slides (image URLs or gradient strings). 2+ enables the
   *  carousel + lightbox; falls back to [cover] when absent. The gradients
   *  below are placeholders — swap in real screenshots (e.g. /public paths). */
  gallery?: string[];
  body: string[];
};

export const projects: Project[] = [
  {
    id: "retailer-dashboard",
    title: "Retailer Dashboard",
    cover: "linear-gradient(135deg,#5b7ba6,#33506f)",
    desc: "Real-time analytics dashboard for appliance retailers — built for speed with virtualized tables and live data.",
    tech: ["Vue 3", "TypeScript", "Pinia"],
    year: "2025",
    gallery: [
      "linear-gradient(135deg,#5b7ba6,#33506f)",
      "linear-gradient(160deg,#3b5a7a,#22384d)",
      "linear-gradient(110deg,#6b8db8,#41618a)",
    ],
    body: [
      "A real-time analytics surface that lets appliance retailers track inventory, sales, and fulfilment at a glance. Built around <b>virtualized tables</b> that stay smooth even with tens of thousands of rows.",
      "Live data streams in over a websocket layer and is cached in Pinia, so the UI stays responsive while keeping every figure current. Performance budgets were a first-class constraint throughout.",
    ],
  },
  {
    id: "design-system",
    title: "Design System",
    cover: "linear-gradient(135deg,#caa15a,#856038)",
    desc: "A reusable component library and tokens powering every product surface, documented in Storybook.",
    tech: ["Vue", "Storybook", "Vitest"],
    year: "2024",
    gallery: [
      "linear-gradient(135deg,#caa15a,#856038)",
      "linear-gradient(160deg,#a8823f,#5f4426)",
      "linear-gradient(110deg,#d8b66f,#9a7440)",
    ],
    body: [
      "A from-scratch component library and design-token set that powers every product surface. Each component ships fully <b>accessible</b>, themeable, and documented in Storybook.",
      "Backed by a Vitest suite and visual regression checks, the system cut UI delivery time across teams and kept the products visually consistent as they scaled.",
    ],
  },
  {
    id: "checkout-flow",
    title: "Checkout Flow",
    cover: "linear-gradient(135deg,#9bab8a,#5e7354)",
    desc: "Accessible, multi-step checkout rebuilt from the ground up — cut drop-off and passed WCAG AA.",
    tech: ["Nuxt", "Tailwind", "REST API"],
    year: "2023",
    gallery: [
      "linear-gradient(135deg,#9bab8a,#5e7354)",
      "linear-gradient(160deg,#7d9068,#46583c)",
      "linear-gradient(110deg,#abbb98,#6c8260)",
    ],
    body: [
      "A multi-step checkout rebuilt from the ground up with accessibility as the baseline — full keyboard navigation, focus management, and screen-reader support, passing <b>WCAG AA</b>.",
      "Careful state handling and inline validation reduced friction at every step, measurably <b>cutting drop-off</b> through the funnel.",
    ],
  },
  {
    id: "marketing-site",
    title: "Marketing Site",
    cover: "linear-gradient(135deg,#c98f6a,#894f36)",
    desc: "High-performance marketing site with edge rendering and a 100 Lighthouse score across the board.",
    tech: ["Qwik.js", "PostCSS"],
    year: "2022",
    gallery: [
      "linear-gradient(135deg,#c98f6a,#894f36)",
      "linear-gradient(160deg,#a9714d,#67371f)",
      "linear-gradient(110deg,#d7a182,#9a5d3e)",
    ],
    body: [
      "A marketing site engineered for raw speed using Qwik's resumability and edge rendering — shipping almost no JavaScript on first load.",
      "The result was a <b>100 Lighthouse score</b> across performance, accessibility, best practices, and SEO, with content that loads instantly anywhere.",
    ],
  },
];

export type NavItem = { id: string; n: string; label: string };

export const navItems: NavItem[] = [
  { id: "about", n: "01", label: "About" },
  { id: "skills", n: "02", label: "Skills" },
  { id: "experience", n: "03", label: "Experience" },
  { id: "projects", n: "04", label: "Projects" },
  { id: "contact", n: "05", label: "Contact" },
];

export const skills: { label: string; items: string[] }[] = [
  { label: "Frameworks", items: ["Vue.js", "Nuxt.js", "React.js", "Next.js", "Qwik.js"] },
  { label: "Language", items: ["JavaScript", "TypeScript"] },
  { label: "Styling", items: ["Tailwind CSS", "Sass", "PostCSS", "BEM"] },
  { label: "State & Data", items: ["Vuex", "Pinia", "Zustand", "REST API"] },
  {
    label: "Tooling & QA",
    items: ["Storybook", "Vitest", "Playwright", "Cypress", "Sentry", "Git"],
  },
];

export const EMAIL = "ardiansahindra7@gmail.com";
