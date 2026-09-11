import React from "react";
import type { ReactNode } from "react";
import type { ExperienceLayout } from "../layout/LayoutRegistry";
import type { ExperienceDefinition } from "../contracts";

export interface ExperienceShellProps {
  layout: ExperienceLayout;
  definition: ExperienceDefinition;
  header?: ReactNode;
  leftRail?: ReactNode;
  main: ReactNode;
  rightRail?: ReactNode;
  footer?: ReactNode;
  utility?: ReactNode;
}

/**
 * Generic AAi experience frame.
 *
 * The shell owns only the semantic page regions and their runtime identity.
 * It deliberately does not own solution content, business logic, data access,
 * rail behavior implementation, or component rendering.
 *
 * The default DOM flow is intentionally equivalent to the existing AAi shell
 * so introducing the framework does not redesign the current experience.
 */
export function ExperienceShell({
  layout,
  definition,
  header,
  leftRail,
  main,
  rightRail,
  footer,
  utility,
}: ExperienceShellProps) {
  return (
    <div
      data-aai-experience-shell={definition.id}
      data-aai-experience-scope={definition.scope}
      data-aai-layout={layout.id}
      data-aai-navigation={layout.navigation}
      className="min-h-screen flex flex-col"
    >
      {header}

      <div
        data-aai-experience-body
        className="relative flex-1 min-w-0"
      >
        {leftRail}
        <div data-aai-experience-main className="min-w-0">
          {main}
        </div>
        {rightRail}
      </div>

      {footer}
      {utility}
    </div>
  );
}
