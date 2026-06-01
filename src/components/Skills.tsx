import { skillCategories } from "@/data/skills";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SkillBadge } from "@/components/ui/SkillBadge";
import { motion, useReducedMotion } from "framer-motion";

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.06 },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

const rowReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35 } },
};

export function Skills() {
  const shouldReduceMotion = useReducedMotion();
  const item = shouldReduceMotion ? rowReduced : rowVariants;

  return (
    <ScrollReveal className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <h2 className="section-heading">Skills</h2>
      <div className="space-y-14">
        {skillCategories.map((category) => {
          const Icon = category.icon;
          return (
            <div key={category.id}>
              <div className="flex items-center gap-3 mb-5">
                <span className="inline-flex size-10 items-center justify-center rounded-lg border border-surface-border bg-surface-card text-brand-light">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="text-lg font-semibold text-ink tracking-tight">
                  {category.label}
                </h3>
              </div>
              <motion.ul
                className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
                variants={listVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.15, once: true }}
              >
                {category.skills.map((skill) => (
                  <motion.li key={skill.name} variants={item}>
                    <SkillBadge skill={skill} />
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          );
        })}
      </div>
    </ScrollReveal>
  );
}
