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
import type { SpatialJourneyScene } from "./spatialJourneyConfig";

type ActivityId = "animation" | "scenes" | "ai" | "info" | "more";
type AnimationAction = "flight" | "sway" | "radiate" | "reset";

interface SpatialActivityRailProps {
  currentScene?: SpatialJourneyScene;
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
  currentScene,
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
                  ? "border-cyan-500 bg-cyan-500/15 text-[var(--aai-primary)]"
                  : "border-transparent text-[var(--aai-text-muted)] hover:bg-[var(--aai-surface-alt)] hover:text-[var(--aai-text)]",
              ].join(" ")}
              style={selected ? { borderColor: "var(--aai-primary)", color: "var(--aai-primary)" } : {}}
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
                <div className="text-[9px] font-mono uppercase tracking-[0.2em] font-semibold" style={{ color: "var(--aai-primary)" }}>
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
                  className="flex w-full items-center gap-2 rounded-xl border px-3 py-2 text-left text-xs transition-colors hover:bg-cyan-400/10"
                  style={{ borderColor: "var(--aai-border)", backgroundColor: "var(--aai-surface-alt)", color: "var(--aai-text)" }}
                >
                  <Play className="h-3.5 w-3.5 text-cyan-400" />
                  Birds — FLIGHT
                </button>
                <button
                  type="button"
                  onClick={() => onAnimationAction?.("sway")}
                  className="flex w-full items-center gap-2 rounded-xl border px-3 py-2 text-left text-xs transition-colors hover:bg-cyan-400/10"
                  style={{ borderColor: "var(--aai-border)", backgroundColor: "var(--aai-surface-alt)", color: "var(--aai-text)" }}
                >
                  <Play className="h-3.5 w-3.5 text-amber-400" />
                  Peacock — SWAY
                </button>
                <button
                  type="button"
                  onClick={() => onAnimationAction?.("radiate")}
                  className="flex w-full items-center gap-2 rounded-xl border px-3 py-2 text-left text-xs transition-colors hover:bg-cyan-400/10"
                  style={{ borderColor: "var(--aai-border)", backgroundColor: "var(--aai-surface-alt)", color: "var(--aai-text)" }}
                >
                  <Play className="h-3.5 w-3.5 text-yellow-400" />
                  Sun — RADIATE
                </button>
                <button
                  type="button"
                  onClick={() => onAnimationAction?.("reset")}
                  className="flex w-full items-center gap-2 rounded-xl border px-3 py-2 text-left text-xs transition-colors hover:bg-cyan-400/10"
                  style={{ borderColor: "var(--aai-border)", backgroundColor: "var(--aai-surface-alt)", color: "var(--aai-text-muted)" }}
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
                  ["03", "Toward the Lake"],
                  ["04", "Parakkai Lake"],
                ].map(([number, name]) => {
                  const isCurrent = currentScene ? String(currentScene.number).padStart(2, "0") === number : number === "01";
                  return (
                    <button
                      key={number}
                      type="button"
                      onClick={() => onSceneSelect?.(number)}
                      className={`flex w-full items-center justify-between rounded-xl border px-3 py-2 text-xs transition-colors hover:bg-cyan-400/10 cursor-pointer ${
                        isCurrent ? "border-cyan-400 bg-cyan-400/15 font-semibold" : ""
                      }`}
                      style={{
                        borderColor: isCurrent ? "var(--aai-primary)" : "var(--aai-border)",
                        backgroundColor: isCurrent ? "rgba(6, 182, 212, 0.15)" : "var(--aai-surface-alt)",
                        color: "var(--aai-text)"
                      }}
                    >
                      <span>{name}</span>
                      <span className="font-mono text-[10px] font-semibold" style={{ color: "var(--aai-primary)" }}>
                        {number}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {active === "ai" && (
              <p className="text-xs leading-5" style={{ color: "var(--aai-text-muted)" }}>
                AI assistance for scene understanding, motion planning and solution activity.
              </p>
            )}

            {active === "info" && (
              <div className="space-y-2 text-xs" style={{ color: "var(--aai-text-muted)" }}>
                <div>
                  <span className="font-medium" style={{ color: "var(--aai-primary)" }}>Runtime:</span> AAi Animation Runtime
                </div>
                <div>
                  <span className="font-medium" style={{ color: "var(--aai-primary)" }}>Mode:</span> Spatial Journey
                </div>
                <div>
                  <span className="font-medium" style={{ color: "var(--aai-primary)" }}>Scene:</span>{" "}
                  {currentScene ? `${String(currentScene.number).padStart(2, "0")} / ${currentScene.title}` : "01 / Sakthi Vinayakar"}
                </div>
                {currentScene?.subtitle && (
                  <div>
                    <span className="font-medium" style={{ color: "var(--aai-primary)" }}>Focus:</span> {currentScene.subtitle}
                  </div>
                )}
              </div>
            )}

            {active === "more" && (
              <p className="text-xs leading-5" style={{ color: "var(--aai-text-muted)" }}>
                Additional solution activities can be surfaced here without changing the shared animation runtime.
              </p>
            )}
          </div>
        </div>
      )}
    </aside>
  );
}
