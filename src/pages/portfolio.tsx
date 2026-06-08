import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { RetroDevs } from "@/components/RetroDevs";
import { Skills } from "@/components/Skills";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export default function PortfolioPage() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="portfolio-shell"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: shouldReduceMotion ? 0.2 : 0.45,
          ease: "easeOut",
        }}
        className="portfolio-bg min-h-screen font-sans"
      >
        <Hero />
        <main>
          <About />
          <Experience />
          <Skills />
          <Projects />
          <RetroDevs />
          <Contact />
        </main>
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
}
