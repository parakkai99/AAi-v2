import React, { useState } from "react";
import {
  Clapperboard,
  Layers3,
  Sparkles,
  Info,
  MoreHorizontal,
  Play,
  RotateCcw,
  X,
} from "lucide-react";

type ActivityId = "animation" | "scenes" | "ai" | "info" | "more";
type AnimationAction = "flight" | "sway" | "radiate" | "reset";

interface SpatialActivityRailProps {
  onSceneSelect?: (sceneNumber: string) => void;
  onAnimationAction?: (action: AnimationAction) => void;
}

const activities: Array<{
  id: ActivityId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  { id: "animation", label: "Animation", icon: Clapperboard },
  { id: "scenes", label: "Scenes", icon: Layers3 },
  { id: "ai", label: "AI", icon: Sparkles },
  { id: "info", label: "Info", icon: Info },
  { id: "more", label: "More", icon: MoreHorizontal },
];

export default function SpatialActivityRail({
  onSceneSelect,
  onAnimationAction,
}: SpatialActivityRailProps) {
  const [active, setActive] = useState<ActivityId | null>(null);

  return (
    <aside
      aria-label="AAi activity rail"
      className="absolute right-2 top-1/2 z-[90] -translate-y-1/2"
    >
      <div className="flex flex-col items-center gap-1.5 rounded-2xl border p-1.5 shadow-2xl backdrop-blur-md" style={{ borderColor: "var(--aai-border)", backgroundColor: "var(--aai-surface)" }}>
        {activities.map(({ id, label, icon: Icon }) => {
          const selected = active === id;
          return (
            <button
              key={id}
              type="button"
              title={label}
              aria-label={label}
              aria-pressed={selected}
              onClick={() => setActive(selected ? null : id)}
              className={[
                "flex h-9 w-9 items-center justify-center rounded-xl border",
                "transition-all duration-200",
                selected
                  ? "border-cyan-300/70 bg-cyan-400/15 text-cyan-100 shadow-[0_0_16px_rgba(0,227,253,0.18)]"
                  : "border-transparent text-[var(--aai-text-muted)] hover:bg-[var(--aai-surface-alt)] hover:text-[var(--aai-text)]",
              ].join(" ")}
            >
              <Icon className="h-4 w-4" />
            </button>
          );
        })}
      </div>

      {active && (
        <div className="absolute right-12 top-1/2 w-64 -translate-y-1/2">
          <div className="rounded-2xl border p-4 shadow-2xl backdrop-blur-xl" style={{ color: "var(--aai-text)", borderColor: "var(--aai-border)", backgroundColor: "var(--aai-surface)" }}>
            <div className="mb-3 flex items-center justify-between">
              <div>
                <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-cyan-300/80">
                  AAi Activity
                </div>
                <div className="text-sm font-medium">
                  {activities.find((item) => item.id === active)?.label}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActive(null)}
                className="rounded-lg p-1" style={{ color: "var(--aai-text-muted)" }}
                aria-label="Close activity panel"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {active === "animation" && (
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => onAnimationAction?.("flight")}
                  className="flex w-full items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-left text-xs hover:bg-cyan-400/10"
                >
                  <Play className="h-3.5 w-3.5 text-cyan-300" />
                  Birds — FLIGHT
                </button>
                <button
                  type="button"
                  onClick={() => onAnimationAction?.("sway")}
                  className="flex w-full items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-left text-xs hover:bg-cyan-400/10"
                >
                  <Play className="h-3.5 w-3.5 text-amber-300" />
                  Peacock — SWAY
                </button>
                <button
                  type="button"
                  onClick={() => onAnimationAction?.("radiate")}
                  className="flex w-full items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-left text-xs hover:bg-cyan-400/10"
                >
                  <Play className="h-3.5 w-3.5 text-yellow-300" />
                  Sun — RADIATE
                </button>
                <button
                  type="button"
                  onClick={() => onAnimationAction?.("reset")}
                  className="flex w-full items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-left text-xs text-white/65 hover:bg-white/5 hover:text-white"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset animation
                </button>
              </div>
            )}

            {active === "scenes" && (
              <div className="space-y-2">
                {[
                  ["01", "Sakthi Vinayakar"],
                  ["02", "Sacred Tree"],
                  ["03", "Temple"],
                  ["04", "Teertham Lake"],
                ].map(([number, name]) => (
                  <button
                    key={number}
                    type="button"
                    onClick={() => onSceneSelect?.(number)}
                    className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs hover:bg-cyan-400/10"
                  >
                    <span>{name}</span>
                    <span className="font-mono text-[10px] text-cyan-300/80">
                      {number}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {active === "ai" && (
              <p className="text-xs leading-5 text-white/65">
                AI assistance for scene understanding, motion planning and solution activity.
              </p>
            )}

            {active === "info" && (
              <div className="space-y-2 text-xs text-white/65">
                <div>
                  <span className="text-cyan-300">Runtime:</span> AAi Animation Runtime
                </div>
                <div>
                  <span className="text-cyan-300">Mode:</span> Spatial Journey
                </div>
                <div>
                  <span className="text-cyan-300">Scene:</span> 01 / Sakthi Vinayakar
                </div>
              </div>
            )}

            {active === "more" && (
              <p className="text-xs leading-5 text-white/65">
                Additional solution activities can be surfaced here without changing the shared animation runtime.
              </p>
            )}
          </div>
        </div>
      )}
    </aside>
  );
}
