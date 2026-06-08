import { resume } from "@/data/resume";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { Building2, MapPin } from "lucide-react";

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const cardReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35 } },
};

export function Experience() {
  const shouldReduceMotion = useReducedMotion();
  const item = shouldReduceMotion ? cardReduced : cardVariants;

  return (
    <ScrollReveal
      id="experience"
      className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
    >
      <h2 className="section-heading">Experience</h2>
      <p className="text-ink-muted text-lg max-w-2xl mb-12 leading-relaxed">
        Selected roles from my résumé — focused on shipping production systems,
        APIs, and client-facing products.
      </p>

      <motion.div
        className="relative pl-6 sm:pl-8 border-l border-surface-border space-y-12"
        variants={listVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.12, once: true }}
      >
        <div
          className="pointer-events-none absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-brand via-brand-light/60 to-transparent"
          aria-hidden
        />

        {resume.experiences.map((job) => (
          <motion.article
            key={`${job.company}-${job.period}`}
            variants={item}
            className={cn(
              "card-portfolio p-6 sm:p-8 relative",
              "before:absolute before:-left-[1.35rem] sm:before:-left-[1.85rem] before:top-7",
              "before:size-3 before:rounded-full before:bg-brand before:ring-4 before:ring-surface",
            )}
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
              <div>
                <h3 className="text-xl font-semibold text-ink flex flex-wrap items-center gap-2">
                  <Building2
                    className="size-5 text-brand-light shrink-0"
                    aria-hidden
                  />
                  {job.company}
                </h3>
                <p className="text-brand-light font-medium mt-1">{job.role}</p>
                <p className="text-sm text-ink-muted flex flex-wrap items-center gap-1.5 mt-2">
                  <MapPin className="size-3.5 shrink-0" aria-hidden />
                  {job.location}
                  <span className="text-surface-border px-1" aria-hidden>
                    ·
                  </span>
                  <span className="font-mono text-xs tracking-wide">
                    {job.period}
                  </span>
                </p>
              </div>
            </div>
            <p className="mt-4 text-ink-muted leading-relaxed">{job.summary}</p>
            <ul className="mt-5 space-y-2.5 text-sm text-ink-muted leading-relaxed list-disc pl-5 marker:text-brand-light">
              {job.highlights.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </motion.article>
        ))}

        <motion.div
          variants={item}
          className="rounded-2xl border border-surface-border bg-surface-card/60 p-6 sm:p-8"
        >
          <h3 className="text-lg font-semibold text-ink mb-2">Education</h3>
          <p className="text-ink font-medium">
            {resume.education.degree}
            <span className="text-ink-muted font-normal">
              {" "}
              · {resume.education.institution}
            </span>
          </p>
          <p className="text-sm text-ink-muted mt-1">
            {resume.education.location} · {resume.education.dateLabel}
          </p>
          {resume.projectLinks.length > 0 ? (
            <div className="mt-6 pt-6 border-t border-surface-border">
              <p className="text-sm font-medium text-ink mb-3">Links</p>
              <ul className="flex flex-wrap gap-3">
                {resume.projectLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-brand-light hover:text-ink underline-offset-4 hover:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </motion.div>
      </motion.div>
    </ScrollReveal>
  );
}
