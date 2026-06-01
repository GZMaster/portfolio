import { cn } from "@/lib/utils";
import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface TypewriterTextProps {
  phrases: string[];
  className?: string;
  typingSpeedMs?: number;
  pauseBetweenMs?: number;
  deleteSpeedMs?: number;
}

export function TypewriterText(props: TypewriterTextProps) {
  const {
    phrases,
    className,
    typingSpeedMs = 52,
    pauseBetweenMs = 2200,
    deleteSpeedMs = 28,
  } = props;
  const shouldReduceMotion = useReducedMotion();
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    for (const t of timersRef.current) window.clearTimeout(t);
    timersRef.current = [];

    if (phrases.length === 0) {
      setDisplay("");
      return;
    }

    const full = phrases[phraseIndex % phrases.length] ?? "";

    if (shouldReduceMotion) {
      setDisplay(full);
      const id = window.setTimeout(() => {
        setPhraseIndex((i) => (i + 1) % phrases.length);
      }, pauseBetweenMs);
      timersRef.current.push(id);
      return () => window.clearTimeout(id);
    }

    let cancelled = false;
    let i = 0;

    function push(t: number) {
      timersRef.current.push(t);
    }

    function typeStep() {
      if (cancelled) return;
      if (i <= full.length) {
        setDisplay(full.slice(0, i));
        i += 1;
        push(window.setTimeout(typeStep, typingSpeedMs));
        return;
      }
      push(
        window.setTimeout(() => {
          deleteStep(full.length);
        }, pauseBetweenMs),
      );
    }

    function deleteStep(len: number) {
      if (cancelled) return;
      if (len > 0) {
        setDisplay(full.slice(0, len - 1));
        push(window.setTimeout(() => deleteStep(len - 1), deleteSpeedMs));
        return;
      }
      setPhraseIndex((p) => (p + 1) % phrases.length);
    }

    typeStep();

    return () => {
      cancelled = true;
      for (const t of timersRef.current) window.clearTimeout(t);
      timersRef.current = [];
    };
  }, [
    deleteSpeedMs,
    pauseBetweenMs,
    phraseIndex,
    phrases,
    shouldReduceMotion,
    typingSpeedMs,
  ]);

  return (
    <span
      className={cn(
        "font-mono text-ink-muted text-base md:text-lg min-h-[1.5em] inline-block",
        className,
      )}
      aria-live="polite"
    >
      {display}
      {!shouldReduceMotion && (
        <span className="inline-block w-0.5 h-[1.1em] ml-0.5 bg-brand-light/80 align-[-0.15em] animate-pulse" />
      )}
    </span>
  );
}
