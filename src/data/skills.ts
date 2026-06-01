import type { LucideIcon } from "lucide-react";
import {
  CircuitBoard,
  LayoutTemplate,
  Server,
  Sparkles,
  Wrench,
} from "lucide-react";

export interface SkillEntry {
  name: string;
  weight: 1 | 2 | 3 | 4 | 5;
}

export interface SkillCategory {
  id: string;
  label: string;
  icon: LucideIcon;
  skills: SkillEntry[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    icon: LayoutTemplate,
    skills: [
      { name: "TypeScript", weight: 5 },
      { name: "React", weight: 5 },
      { name: "Next.js", weight: 4 },
      { name: "SCSS", weight: 4 },
      { name: "Tailwind CSS", weight: 5 },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: Server,
    skills: [
      { name: "Node.js", weight: 5 },
      { name: "Express", weight: 4 },
      { name: "JavaScript", weight: 5 },
      { name: "REST APIs", weight: 5 },
    ],
  },
  {
    id: "aiml",
    label: "AI / ML",
    icon: Sparkles,
    skills: [
      { name: "Python", weight: 5 },
      { name: "Jupyter Notebook", weight: 4 },
      { name: "OpenCV", weight: 3 },
      { name: "Chatbot development", weight: 4 },
    ],
  },
  {
    id: "hardware",
    label: "Hardware / Embedded",
    icon: CircuitBoard,
    skills: [
      { name: "Proteus simulation", weight: 3 },
      { name: "AVR / Arduino", weight: 4 },
      { name: "PCB design", weight: 3 },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    icon: Wrench,
    skills: [
      { name: "Git", weight: 5 },
      { name: "GitHub Actions", weight: 4 },
      { name: "VS Code", weight: 4 },
      { name: "Vercel", weight: 4 },
    ],
  },
];
