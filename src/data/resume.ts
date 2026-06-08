/**
 * Structured résumé used across the portfolio. Keep in sync when you update
 * `public/daniel-ohiosumua-resume.pdf` (replace the file + adjust dates here).
 */
export interface ResumeExperience {
  company: string;
  location: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
}

export interface ResumeEducation {
  institution: string;
  location: string;
  degree: string;
  dateLabel: string;
}

export interface ResumeProjectLink {
  label: string;
  url: string;
}

export interface ResumeData {
  fullName: string;
  /** Public / GitHub handle — shown where code identity matters */
  handle: string;
  headline: string;
  summary: string;
  email: string;
  phone: string;
  location: string;
  experiences: ResumeExperience[];
  education: ResumeEducation;
  projectLinks: ResumeProjectLink[];
  /** Served from `/public` — clean URL for downloads */
  publicResumePath: string;
  downloadFileName: string;
  linkedinUrl: string;
  instagramUrl: string;
}

export const resume: ResumeData = {
  fullName: "Daniel Ohiosumua",
  handle: "GZMaster",
  headline:
    "Full-stack engineer shipping Next.js, Adonis.js, and React Native products — founder of RetroDevs.",
  summary:
    "I design and deliver scalable web and mobile platforms: multi-tenant SaaS, ERP/OMS, and integrations with a focus on performance, clear UX, and maintainable backends. Based in Lagos; working remotely with teams worldwide.",
  email: "retrodevstechnology@gmail.com",
  phone: "+2348052026709",
  location: "Lagos, Nigeria",
  experiences: [
    {
      company: "Golive",
      location: "Remote",
      role: "Full Stack Developer",
      period: "Feb 2024 — Present",
      summary:
        "Building and evolving customer-facing products with Next.js, Adonis.js, PostgreSQL, and React Native.",
      highlights: [
        "Design and ship responsive web apps with Next.js and strong UX collaboration.",
        "Own REST APIs and server-side logic on Adonis.js with efficient PostgreSQL access.",
        "Implement complex, org-specific features for multi-tenant workflows.",
        "Harden and scale production systems for reliability and a smooth end-user experience.",
        "Deliver mobile experiences with React Native aligned with the web product.",
        "Integrate third-party services and work closely with designers on polished UI.",
      ],
    },
    {
      company: "RetroDevs",
      location: "Mainland, Lagos",
      role: "Software Developer",
      period: "Jun 2022 — Present",
      summary:
        "Consultancy delivery across e-commerce, healthcare, and logistics — full-stack ownership from design to deployment.",
      highlights: [
        "Delivered 10+ client projects on time with consistent client satisfaction.",
        "Built a scalable e-commerce stack with React, Node.js, and MongoDB.",
        "Designed and shipped an order management system (Adonis.js, PostgreSQL, React + Vite).",
        "Led architecture for a multi-org ERP with microservices and clear domain boundaries.",
        "Applied responsive design and agile practices (Trello, Asana, Notion, JIRA).",
      ],
    },
  ],
  education: {
    institution: "University of Benin",
    location: "Benin City, Edo State",
    degree: "B.Eng., Computer Engineering",
    dateLabel: "Aug 2024",
  },
  projectLinks: [{ label: "RetroDevs", url: "https://www.retrodevs.com" }],
  publicResumePath: "/daniel-ohiosumua-resume.pdf",
  downloadFileName: "Daniel-Ohiosumua-Resume.pdf",
  linkedinUrl: "https://www.linkedin.com/in/daniel-ohiosumua-153473330/",
  instagramUrl: "https://www.instagram.com/gzmcyber000/",
};
