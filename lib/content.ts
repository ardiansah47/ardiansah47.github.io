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
    id: "adsinsight",
    title: "AdsInsight",
    cover: 'url("/projects/adsinsight/1.webp")',
    desc: "AI-driven analytics platform that helps marketers understand and optimize their Google Ads performance.",
    tech: ["Vue.js", "Pinia", "Express.js", "MongoDB", "Google Ads API"],
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
    items: ["Storybook", "Jest", "Vitest", "Playwright", "Cypress", "Sentry", "Git"],
  },
];

export const EMAIL = "ardiansahindra7@gmail.com";
