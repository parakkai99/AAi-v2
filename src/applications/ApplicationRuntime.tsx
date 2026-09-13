import React from "react";
import { ApplicationContext, ApplicationDefinition } from "./ApplicationDefinition";
import { getApplicationDefinition } from "./ApplicationRegistry";
import { ExperienceRuntime } from "@/src/experience/ExperienceRuntime";
import { getSolutionExperienceDefinition } from "@/src/services/solutionAdminService";

export function ApplicationRuntime({
  applicationId,
  context,
  previewDraft = false,
  previewThemeId,
  previewLayoutId,
  ...props
}: {
  applicationId: string;
  context?: ApplicationContext;
  previewDraft?: boolean;
  previewThemeId?: string;
  previewLayoutId?: string;
  [key: string]: any;
}) {
  const appDef: ApplicationDefinition | undefined =
    getApplicationDefinition(applicationId);

  if (!appDef) {
    return <div>Application not found: {applicationId}</div>;
  }

  const App = appDef.component;
  const baseDefinition = getSolutionExperienceDefinition(applicationId);

  const definition = {
    ...baseDefinition,
    themeId: previewThemeId ?? baseDefinition.themeId,
    layoutId: previewLayoutId ?? baseDefinition.layoutId,
  };

  return (
    <ExperienceRuntime
      applicationId={applicationId}
      scope="solution"
      definition={definition}
      defaultThemeId={previewThemeId ?? baseDefinition.themeId ?? "aai-live"}
      defaultLayoutId={previewLayoutId ?? baseDefinition.layoutId ?? "aai-live"}
    >
      <App
        context={{
          ...(context ?? {}),
          previewDraft,
          previewThemeId,
          previewLayoutId,
        }}
        {...props}
      />
    </ExperienceRuntime>
  );
}
