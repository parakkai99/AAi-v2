/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Context: AAi-V2.0.1 — Hyperlocal Objective → Outcome SVG
 *
 * Interactive SVG solution map. It is intentionally inline SVG so each
 * architecture node can be a real AAi interaction surface rather than a
 * bitmap hotspot.
 */

import React from "react";

export type HyperlocalMapNode =
  | "objective"
  | "capabilities"
  | "agents"
  | "services"
  | "providers"
  | "workflow"
  | "solution"
  | "outcome";

interface HyperlocalObjectiveOutcomeMapProps {
  activeNode?: HyperlocalMapNode;
  onSelectNode?: (node: HyperlocalMapNode) => void;
}

const NODES: Array<{
  id: HyperlocalMapNode;
  label: string;
  sublabel: string;
  x: number;
  y: number;
  tone: string;
}> = [
  { id: "objective", label: "OBJECTIVE", sublabel: "Human need", x: 110, y: 150, tone: "#00e3fd" },
  { id: "capabilities", label: "CAPABILITIES", sublabel: "What is needed", x: 270, y: 72, tone: "#2c9dff" },
  { id: "agents", label: "AGENTS", sublabel: "Reason & adapt", x: 270, y: 228, tone: "#9b6cff" },
  { id: "services", label: "SERVICES", sublabel: "Deterministic work", x: 450, y: 72, tone: "#19d38b" },
  { id: "providers", label: "PROVIDERS", sublabel: "Local businesses", x: 450, y: 228, tone: "#00dfff" },
  { id: "workflow", label: "WORKFLOW", sublabel: "Orchestrate", x: 630, y: 150, tone: "#ffc857" },
  { id: "solution", label: "SOLUTION", sublabel: "Composed plan", x: 790, y: 72, tone: "#b46cff" },
  { id: "outcome", label: "OUTCOME", sublabel: "Real-world result", x: 790, y: 228, tone: "#00e3fd" },
];

const EDGES: Array<[HyperlocalMapNode, HyperlocalMapNode]> = [
  ["objective", "capabilities"],
  ["objective", "agents"],
  ["capabilities", "services"],
  ["agents", "providers"],
  ["services", "workflow"],
  ["providers", "workflow"],
  ["workflow", "solution"],
  ["workflow", "outcome"],
];

export const HyperlocalObjectiveOutcomeMap: React.FC<
  HyperlocalObjectiveOutcomeMapProps
> = ({ activeNode, onSelectNode }) => {
  const point = (id: HyperlocalMapNode) => {
    const node = NODES.find((item) => item.id === id)!;
    return node;
  };

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-[#00dfff]/25 bg-[#020b16]/85 shadow-[0_0_50px_rgba(0,227,253,0.08)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(0,227,253,0.10),transparent_38%),radial-gradient(circle_at_35%_50%,rgba(44,157,255,0.08),transparent_35%)]" />
      <div className="relative px-4 pb-2 pt-3 sm:px-6 sm:pt-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#00e3fd]">
              Interactive Solution Map
            </div>
            <div className="mt-1 text-xs font-semibold text-[#dceefa] sm:text-sm">
              Objective → Outcome
            </div>
          </div>
          <div className="font-mono text-[8px] text-[#638ba0]">
            L5 • HYPERLOCAL
          </div>
        </div>

        <svg
          viewBox="0 0 900 300"
          className="mt-1 h-auto w-full"
          role="img"
          aria-label="Interactive Hyperlocal Objective to Outcome solution map"
        >
          <defs>
            <filter id="hyperlocalGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="hyperlocalLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00e3fd" stopOpacity=".18" />
              <stop offset="50%" stopColor="#2c9dff" stopOpacity=".75" />
              <stop offset="100%" stopColor="#00e3fd" stopOpacity=".18" />
            </linearGradient>
          </defs>

          <rect x="0" y="0" width="900" height="300" rx="22" fill="#020914" fillOpacity=".25" />

          {EDGES.map(([from, to]) => {
            const a = point(from);
            const b = point(to);
            return (
              <line
                key={`${from}-${to}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="url(#hyperlocalLine)"
                strokeWidth="2"
                strokeDasharray="6 7"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="-26"
                  dur="2.2s"
                  repeatCount="indefinite"
                />
              </line>
            );
          })}

          <path
            d="M110 150 C250 18 340 18 450 72 S650 128 790 72"
            fill="none"
            stroke="#00e3fd"
            strokeOpacity=".10"
            strokeWidth="1"
          />
          <path
            d="M110 150 C250 282 340 282 450 228 S650 172 790 228"
            fill="none"
            stroke="#2c9dff"
            strokeOpacity=".10"
            strokeWidth="1"
          />

          {NODES.map((node) => {
            const active = activeNode === node.id;
            return (
              <g
                key={node.id}
                role="button"
                tabIndex={0}
                aria-label={`${node.label}: ${node.sublabel}`}
                className="cursor-pointer outline-none"
                onClick={() => onSelectNode?.(node.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onSelectNode?.(node.id);
                  }
                }}
              >
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={active ? 29 : 25}
                  fill="#031526"
                  stroke={node.tone}
                  strokeOpacity={active ? ".95" : ".55"}
                  strokeWidth={active ? "2.5" : "1.5"}
                  filter={active ? "url(#hyperlocalGlow)" : undefined}
                />
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="5"
                  fill={node.tone}
                  opacity=".95"
                />
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="35"
                  fill="none"
                  stroke={node.tone}
                  strokeOpacity={active ? ".28" : ".10"}
                >
                  <animate
                    attributeName="r"
                    values="30;38;30"
                    dur="2.6s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values=".35;.08;.35"
                    dur="2.6s"
                    repeatCount="indefinite"
                  />
                </circle>
                <text
                  x={node.x}
                  y={node.y + 48}
                  textAnchor="middle"
                  fill="#eaf7ff"
                  fontSize="10"
                  fontWeight="700"
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                >
                  {node.label}
                </text>
                <text
                  x={node.x}
                  y={node.y + 61}
                  textAnchor="middle"
                  fill="#7398aa"
                  fontSize="7"
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                >
                  {node.sublabel}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
