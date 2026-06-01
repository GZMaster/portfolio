import { cn } from "@/lib/utils";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

interface StatCardProps {
  label: string;
  /** When set, numeric animation is skipped. */
  textValue?: string;
  /** Target number for count-up (ignored if textValue is set). */
  numericValue?: number;
  suffix?: string;
  className?: string;
}

export function StatCard(props: StatCardProps) {
  const { label, textValue, numericValue = 0, suffix = "", className } = props;
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.15, once: true });
  const shouldReduceMotion = useReducedMotion();
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (textValue !== undefined) return;
    if (!inView) return;
    if (shouldReduceMotion) {
      count.set(numericValue);
      return;
    }
    const controls = animate(count, numericValue, {
      duration: 1.65,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [count, inView, numericValue, shouldReduceMotion, textValue]);

  return (
    <motion.div
      ref={ref}
      className={cn(
        "card-portfolio p-6 flex flex-col gap-2 min-h-[120px]",
        className,
      )}
      style={{ willChange: inView ? "transform" : "auto" }}
    >
      <p className="text-sm text-ink-muted font-medium">{label}</p>
      <p className="text-3xl md:text-4xl font-semibold tracking-tight text-ink">
        {textValue !== undefined ? (
          textValue
        ) : (
          <>
            <motion.span>{rounded}</motion.span>
            {suffix}
          </>
        )}
      </p>
    </motion.div>
  );
}
