import { cn } from "@/lib/utils";
import type { SkillEntry } from "@/data/skills";

interface SkillBadgeProps {
  skill: SkillEntry;
  className?: string;
}

export function SkillBadge(props: SkillBadgeProps) {
  const { skill, className } = props;
  const widthPercent = (skill.weight / 5) * 100;

  return (
    <div
      className={cn(
        "rounded-full border border-surface-border bg-surface-card/80 px-4 py-2.5",
        "backdrop-blur-sm",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-ink">{skill.name}</span>
      </div>
      <div
        className="mt-2 h-1 rounded-full bg-surface-border overflow-hidden"
        aria-hidden
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand to-brand-light opacity-90"
          style={{ width: `${widthPercent}%` }}
        />
      </div>
    </div>
  );
}
