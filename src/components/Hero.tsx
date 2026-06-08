import githubData from "@/data/github.json";
import { resume } from "@/data/resume";
import { TypewriterText } from "@/components/ui/TypewriterText";
import { cn } from "@/lib/utils";
import type { GitHubData } from "@/types/github";
import { track } from "@vercel/analytics";
import { motion, useReducedMotion } from "framer-motion";
import { Download, Github, Globe, Instagram, Linkedin } from "lucide-react";

const data = githubData as GitHubData;

const heroContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.08 },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

const heroItemReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

export function Hero() {
  const { profile } = data;
  const shouldReduceMotion = useReducedMotion();
  const displayName = resume.fullName;
  const heading = `Hi, I'm ${displayName}`;
  const itemVariants = shouldReduceMotion ? heroItemReduced : heroItem;

  function scrollToProjects() {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  }

  function scrollToExperience() {
    document
      .getElementById("experience")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <header className="relative min-h-[100dvh] flex flex-col items-center justify-center px-4 sm:px-6 pt-20 pb-16 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[min(90vw,520px)] h-[min(90vw,520px)] rounded-full bg-brand/25 blur-[120px] opacity-90" />
        <div className="absolute bottom-0 right-[-10%] w-[380px] h-[380px] rounded-full bg-brand-light/15 blur-[100px]" />
        <div className="absolute top-[15%] left-[-8%] w-[280px] h-[280px] rounded-full bg-brand/20 blur-[90px]" />
      </div>

      <motion.div
        className="max-w-4xl mx-auto flex flex-col items-center text-center gap-8"
        variants={heroContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="relative">
          <div
            className={cn(
              "rounded-full p-1 ring-2 ring-brand/40 shadow-[0_0_40px_-8px_var(--brand)]",
              "will-change-transform",
            )}
          >
            <img
              src={profile.avatar_url}
              alt={`${displayName} avatar`}
              width={112}
              height={112}
              decoding="async"
              loading="eager"
              className="rounded-full size-24 md:size-28 object-cover bg-surface-border"
            />
          </div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-ink"
        >
          {heading}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-ink-muted text-sm sm:text-base max-w-xl -mt-4"
        >
          Also building in public as{" "}
          <span className="text-ink font-mono">{resume.handle}</span> on GitHub.
        </motion.p>

        <motion.div variants={itemVariants} className="max-w-xl">
          <TypewriterText
            phrases={[
              "Full-Stack Developer",
              "AI Engineer",
              "Founder of RetroDevs",
              "Open Source Builder",
            ]}
          />
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-ink-muted max-w-2xl text-base md:text-lg leading-relaxed"
        >
          {resume.headline}
        </motion.p>

        {profile.bio ? (
          <motion.p
            variants={itemVariants}
            className="text-ink-muted/90 max-w-2xl text-sm md:text-base leading-relaxed border border-surface-border/80 rounded-2xl px-4 py-3 bg-surface-card/40"
          >
            <span className="text-ink-muted font-medium">GitHub bio: </span>
            {profile.bio}
          </motion.p>
        ) : null}

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 w-full"
        >
          <button
            type="button"
            onClick={scrollToProjects}
            className={cn(
              "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold",
              "bg-brand text-white hover:bg-brand-light transition-colors",
              "shadow-lg shadow-brand/25",
            )}
          >
            View My Work
          </button>
          <button
            type="button"
            onClick={scrollToExperience}
            className={cn(
              "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold",
              "border border-surface-border bg-surface-card/80 text-ink hover:border-brand-light/60",
              "transition-colors",
            )}
          >
            Experience
          </button>
          <a
            href="https://www.retrodevs.com"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold",
              "border border-surface-border bg-surface-card/80 text-ink hover:border-brand-light/60",
              "transition-colors",
            )}
          >
            Hire Me via RetroDevs
          </a>
          <a
            href={resume.publicResumePath}
            download={resume.downloadFileName}
            onClick={() => {
              track("resume_download", { location: "hero" });
            }}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold",
              "border border-brand/40 text-brand-light hover:bg-brand/15 transition-colors",
            )}
          >
            <Download className="size-4 shrink-0" aria-hidden />
            Download résumé
          </a>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-2"
        >
          <a
            href={resume.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-brand-light transition-colors"
            aria-label="Daniel on LinkedIn"
          >
            <Linkedin className="size-5" />
            LinkedIn
          </a>
          <a
            href={resume.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-brand-light transition-colors"
            aria-label="Daniel on Instagram"
          >
            <Instagram className="size-5" />
            Instagram
          </a>
          <a
            href="https://github.com/GZMaster"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-brand-light transition-colors"
            aria-label="GitHub profile"
          >
            <Github className="size-5" />
            GitHub
          </a>
          <a
            href="https://www.retrodevs.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-brand-light transition-colors"
            aria-label="RetroDevs website"
          >
            <Globe className="size-5" />
            RetroDevs
          </a>
        </motion.div>
      </motion.div>
    </header>
  );
}
