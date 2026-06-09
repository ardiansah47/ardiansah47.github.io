export type Project = {
  id: string;
  title: string;
  cover: string;
  desc: string;
  tech: string[];
  /** Modal media slides (image URLs or gradient strings). 2+ enables the
   *  carousel + lightbox; falls back to [cover] when absent. */
  gallery?: string[];
  body: string[];
};

export const projects: Project[] = [
  {
    id: "exchange-pos",
    title: "Exchange Point of Sales",
    cover: 'url("/projects/exchange-pos/1.webp")',
    desc: "Web-based point-of-sale and financial management platform for multi-branch currency-exchange businesses.",
    tech: ["Vue.js", "Pinia", "UIkit"],
    gallery: [
      "/projects/exchange-pos/1.webp",
      "/projects/exchange-pos/2.webp",
      "/projects/exchange-pos/3.webp",
      "/projects/exchange-pos/4.webp",
      "/projects/exchange-pos/5.webp",
      "/projects/exchange-pos/6.webp",
      "/projects/exchange-pos/7.webp",
    ],
    body: [
      "I contributed to the development of <b>Exchange POS</b>, a web-based point-of-sale and financial management platform designed for multi-branch businesses. The system manages currencies, exchange rates, financial accounts, roles, and operational workflows across organizations.",
      "My role focused on converting a full Figma design into a <b>production-ready frontend</b> built with Vue.js, Pinia, and UIkit, while integrating all available backend APIs.",
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
  {
    label: "Frameworks",
    items: ["Vue.js", "Nuxt.js", "React.js", "Next.js", "Qwik.js"],
  },
  { label: "Language", items: ["JavaScript", "TypeScript"] },
  { label: "Styling", items: ["Tailwind CSS", "Sass", "PostCSS", "BEM"] },
  { label: "State & Data", items: ["Vuex", "Pinia", "Zustand", "REST API"] },
  {
    label: "Tooling & QA",
    items: ["Storybook", "Vitest", "Playwright", "Cypress", "Sentry", "Git"],
  },
];

export const EMAIL = "ardiansahindra7@gmail.com";
