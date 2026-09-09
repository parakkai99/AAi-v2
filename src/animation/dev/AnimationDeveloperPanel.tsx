"use client";

/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: P1.27 — Developer Animation Playground
 * Status: ACTIVE / DEVELOPMENT ONLY
 * Version: 1.0.0
 *
 * This panel is an internal construction tool. It drives the real Animation
 * Factory + Runtime; it is not a second animation engine and can be hidden
 * or excluded from production later.
 */

import { useEffect, useMemo, useState } from "react";
import type { AnimationObjectId } from "../objects/AnimationObject";
import type {
  MotionDefinition,
  MotionId,
  MotionParameters,
} from "../motion/MotionDefinition";
import type { AnimationRuntimeRequest } from "../runtime/AnimationRuntime";
import { AnimationRuntime } from "../runtime/AnimationRuntime";

interface AnimationDeveloperPanelProps {
  readonly runtime: AnimationRuntime;
  readonly objectId: AnimationObjectId;
  readonly targetIds?: readonly string[];
  readonly motionDefinitions: readonly MotionDefinition[];
  readonly initialMotionId?: MotionId;
  readonly initialTriggerId?: AnimationRuntimeRequest["triggerId"];
  readonly className?: string;
}

export function AnimationDeveloperPanel({
  runtime,
  objectId,
  targetIds,
  motionDefinitions,
  initialMotionId,
  initialTriggerId = "loop",
  className = "",
}: AnimationDeveloperPanelProps) {
  const firstMotion = initialMotionId ?? motionDefinitions[0]?.id;
  const [motionId, setMotionId] = useState<MotionId | undefined>(firstMotion);
  const [parameters, setParameters] = useState<MotionParameters>({});
  const [delayMs, setDelayMs] = useState(800);
  const [loop, setLoop] = useState(true);
  const [open, setOpen] = useState(true);

  const motion = useMemo(
    () => motionDefinitions.find((definition) => definition.id === motionId),
    [motionDefinitions, motionId],
  );

  useEffect(() => {
    if (!motion) {
      return;
    }

    const request: AnimationRuntimeRequest = {
      objectId,
      motionId: motion.id,
      triggerId: initialTriggerId,
      targetIds,
      motionParameters: parameters,
      triggerParameters:
        initialTriggerId === "loop"
          ? {
              count: loop ? 0 : 1,
              delayMs,
            }
          : {
              delayMs,
            },
    };

    runtime.stop(objectId);
    runtime.start(request);
  }, [
    runtime,
    objectId,
    targetIds,
    motion,
    parameters,
    delayMs,
    loop,
    initialTriggerId,
  ]);

  const setParameter = (name: string, value: number | string | boolean) => {
    setParameters((current) => ({ ...current, [name]: value }));
  };

  const renderParameter = (
    definition: MotionDefinition["parameters"][number],
  ) => {
    const value = parameters[definition.name] ?? motion?.defaults[definition.name];

    if (definition.type === "boolean") {
      return (
        <label key={definition.name} className="flex items-center justify-between gap-3 text-xs text-slate-200">
          <span>{definition.name}</span>
          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={(event) => setParameter(definition.name, event.target.checked)}
          />
        </label>
      );
    }

    if (definition.type === "string") {
      return (
        <label key={definition.name} className="grid gap-1 text-xs text-slate-200">
          <span>{definition.name}</span>
          <input
            className="rounded border border-slate-700 bg-slate-950 px-2 py-1 text-xs text-white"
            value={String(value ?? "")}
            onChange={(event) => setParameter(definition.name, event.target.value)}
          />
        </label>
      );
    }

    const numericValue = Number(value ?? 0);
    const step = definition.name.toLowerCase().includes("scale") ? 0.01 : 1;
    const min = definition.name.toLowerCase().includes("opacity") ? 0 : undefined;
    const max = definition.name.toLowerCase().includes("opacity") ? 1 : undefined;

    return (
      <label key={definition.name} className="grid gap-1 text-xs text-slate-200">
        <span className="flex items-center justify-between">
          <span>{definition.name}</span>
          <span className="font-mono text-[10px] text-cyan-300">{numericValue}</span>
        </span>
        <input
          type="range"
          min={min ?? -500}
          max={max ?? 500}
          step={step}
          value={numericValue}
          onChange={(event) => setParameter(definition.name, Number(event.target.value))}
        />
      </label>
    );
  };

  if (!motion) {
    return null;
  }

  return (
    <aside
      className={`pointer-events-auto w-[280px] max-w-[calc(100vw-24px)] rounded-xl border border-cyan-400/30 bg-slate-950/90 p-3 text-white shadow-2xl backdrop-blur ${className}`}
      aria-label="Animation developer controls"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-cyan-300">
            DEV / ANIMATION LAB
          </div>
          <div className="mt-0.5 text-xs text-slate-400">
            {objectId} · {runtime.getTargetCount(objectId)} target(s)
          </div>
        </div>
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="rounded border border-slate-700 px-2 py-1 text-[10px] text-slate-300 hover:border-cyan-400/50"
        >
          {open ? "Hide" : "Show"}
        </button>
      </div>

      {open ? (
        <div className="mt-3 grid gap-3">
          <label className="grid gap-1 text-xs text-slate-200">
            <span>Effect</span>
            <select
              className="rounded border border-slate-700 bg-slate-950 px-2 py-1 text-xs text-white"
              value={motion.id}
              onChange={(event) => {
                const nextMotionId = event.target.value as MotionId;
                const nextMotion = motionDefinitions.find(
                  (definition) => definition.id === nextMotionId,
                );
                setMotionId(nextMotionId);
                setParameters(nextMotion?.defaults ?? {});
              }}
            >
              {motionDefinitions.map((definition) => (
                <option key={definition.id} value={definition.id}>
                  {definition.name}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-1 text-xs text-slate-200">
            <span className="flex items-center justify-between">
              <span>Loop delay</span>
              <span className="font-mono text-[10px] text-cyan-300">{delayMs} ms</span>
            </span>
            <input
              type="range"
              min={0}
              max={5000}
              step={50}
              value={delayMs}
              onChange={(event) => setDelayMs(Number(event.target.value))}
            />
          </label>

          {motion.parameters.map(renderParameter)}

          <label className="flex items-center justify-between gap-3 text-xs text-slate-200">
            <span>Continuous loop</span>
            <input
              type="checkbox"
              checked={loop}
              onChange={(event) => setLoop(event.target.checked)}
            />
          </label>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => runtime.start({
                objectId,
                motionId: motion.id,
                triggerId: initialTriggerId,
                targetIds,
                motionParameters: parameters,
                triggerParameters:
                  initialTriggerId === "loop"
                    ? { count: loop ? 0 : 1, delayMs }
                    : { delayMs },
              })}
              className="rounded border border-cyan-400/40 bg-cyan-400/10 px-2 py-1.5 text-xs text-cyan-200 hover:bg-cyan-400/20"
            >
              Play
            </button>
            <button
              type="button"
              onClick={() => runtime.stop(objectId)}
              className="rounded border border-slate-700 px-2 py-1.5 text-xs text-slate-300 hover:border-rose-400/50"
            >
              Stop
            </button>
          </div>
        </div>
      ) : null}
    </aside>
  );
}
