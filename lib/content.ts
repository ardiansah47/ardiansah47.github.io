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
    id: "website-builder",
    title: "Appliance.io Website Builder",
    cover: 'url("/projects/website-builder/1.webp")',
    desc: "Website builder with a reusable design system, layers and pages management, per-page SEO, and integrated auth, payments, and subscriptions.",
    tech: ["Nuxt.js", "Tailwind CSS", "TypeScript", "Vitest", "Storybook"],
    gallery: [
      "/projects/website-builder/1.webp",
      "/projects/website-builder/2.webp",
      "/projects/website-builder/3.webp",
      "/projects/website-builder/4.webp",
      "/projects/website-builder/5.webp",
      "/projects/website-builder/6.webp",
    ],
    body: [
      "I contributed to <b>Appliance.io's Website Builder</b> as both a <b>Product Engineer</b> and <b>Frontend Engineer</b>.",
      "<b>Product:</b> Worked ahead of development to turn UI/UX designs and product requirements into complete, buildable specs, sharpening the designs, breaking work into a clear task format, and resolving every open requirement before coding started. Focused scope on real business value, avoiding bloat and rework.",
      "<b>Frontend:</b> Helped the team build a reusable design-system UI that kept the product consistent and shippable. My main focus was implementing the <b>layers and pages management</b> with per-page SEO and the editing and properties panels, and ensuring the application felt smooth and consistent through <b>motion-v</b> animations. I also led key integrations, bringing in <b>authentication</b> and the <b>payment and subscription flow</b> with checkout verification, to help deliver a complete, production-ready product.",
    ],
  },
  {
    id: "adsinsight",
    title: "AdsInsight",
    cover: 'url("/projects/adsinsight/1.webp")',
    desc: "AI-driven analytics platform that helps marketers understand and optimize their Google Ads performance.",
    tech: ["Vue.js", "Pinia", "Express.js", "TypeScript", "MongoDB", "Google Ads API"],
    gallery: [
      "/projects/adsinsight/1.webp",
      "/projects/adsinsight/4.webp",
      "/projects/adsinsight/5.webp",
      "/projects/adsinsight/2.webp",
      "/projects/adsinsight/3.webp",
      "/projects/adsinsight/6.webp",
    ],
    body: [
      "AdsInsight is an <b>AI-driven analytics platform</b> designed to help marketers understand and optimize their Google Ads performance. It integrates Google Ads data with a custom AI agent, surfacing actionable insights, performance breakdowns, and strategic recommendations tailored to each campaign.",
      "As the <b>Full-Stack Developer</b> on the project, I worked across the backend and frontend:",
      "• Built the backend API with <b>Express.js, MongoDB, and TypeScript</b>, including Google Ads data integration and AI-assistant endpoints.<br>• Developed frontend features with <b>Vue.js, Tailwind CSS, and Pinia</b> for state management.<br>• Implemented the <b>AI chat interface</b> and the dashboards that display real-time Google Ads insights.<br>• Ensured smooth communication between the AI engine, backend services, and the frontend.",
    ],
  },
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
  {
    id: "appliance-pos",
    title: "Appliance.io Point of Sales",
    cover: 'url("/projects/appliance-pos/1.webp")',
    desc: "Point-of-sale platform for retailers to manage orders, schedule deliveries, and streamline operational workflows.",
    tech: ["Vue.js", "Nuxt.js", "Vuex"],
    gallery: [
      "/projects/appliance-pos/1.webp",
      "/projects/appliance-pos/2.webp",
      "/projects/appliance-pos/3.webp",
      "/projects/appliance-pos/4.webp",
      "/projects/appliance-pos/5.webp",
      "/projects/appliance-pos/6.webp",
      "/projects/appliance-pos/7.webp",
      "/projects/appliance-pos/8.webp",
    ],
    body: [
      "As a <b>Frontend Lead</b> at <b>Appliance.io</b>, I was responsible for maintaining and enhancing a legacy application built with <b>Vue.js 2 and Nuxt 2</b>. My role involved developing new features, improving existing functionality, and ensuring the long-term stability and performance of the codebase.",
      "<b>Appliance.io Point of Sale (POS)</b> is a platform designed for retailers to manage orders, schedule deliveries, and streamline various operational workflows. I worked closely with cross-functional teams to deliver new capabilities that improved both user experience and business efficiency.",
      "In addition to my technical responsibilities, I mentored frontend engineers, promoted engineering best practices, conducted code reviews, and provided technical guidance to help the team maintain a high standard of code quality.",
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

// icon = file in /public/icons/. A missing file just hides (text-only pill).
// invertOnDark flips near-black logos for dark theme.
export const skills: { name: string; icon?: string; invertOnDark?: boolean }[] = [
  { name: "Vue.js", icon: "vue.svg" },
  { name: "Nuxt.js", icon: "nuxt.svg" },
  { name: "React.js", icon: "react.svg" },
  { name: "Next.js", icon: "next.svg", invertOnDark: true },
  { name: "Qwik.js", icon: "qwik.svg" },
  { name: "JavaScript", icon: "javascript.svg" },
  { name: "TypeScript", icon: "typescript.svg" },
  { name: "Tailwind CSS", icon: "tailwindcss.svg" },
  { name: "Sass", icon: "sass.svg" },
  { name: "PostCSS", icon: "postcss.svg" },
  { name: "Vuex", icon: "vuex.svg" },
  { name: "Pinia", icon: "pinia.svg" },
  { name: "Zustand", icon: "zustand.svg" },
  { name: "Node.js", icon: "nodejs.svg" },
  { name: "Express.js", icon: "express.svg", invertOnDark: true },
  { name: "MongoDB", icon: "mongodb.svg" },
  { name: "Storybook", icon: "storybook.svg" },
  { name: "Jest", icon: "jest.svg" },
  { name: "Vitest", icon: "vitest.svg" },
  { name: "Playwright", icon: "playwright.svg" },
  { name: "Cypress", icon: "cypress.svg" },
  { name: "Sentry", icon: "sentry.svg" },
  { name: "Git", icon: "git.svg" },
];

// Look up a skill's icon by name, for reusing the badge elsewhere (e.g. project tech stack).
export const skillIcons: Record<string, { icon: string; invertOnDark?: boolean }> =
  Object.fromEntries(
    skills
      .filter((s) => s.icon)
      .map((s) => [s.name, { icon: s.icon!, invertOnDark: s.invertOnDark }]),
  );

// Tech-stack-only icons (not listed among skills).
skillIcons["UIkit"] = { icon: "uikit.svg", invertOnDark: true };

export const EMAIL = "ardiansahindra7@gmail.com";
