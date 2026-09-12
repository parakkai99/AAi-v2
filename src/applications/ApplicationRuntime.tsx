import React from "react";
import { ApplicationContext, ApplicationDefinition } from "./ApplicationDefinition";
import { getApplicationDefinition } from "./ApplicationRegistry";
import { ExperienceRuntime } from "@/src/experience/ExperienceRuntime";

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

  const definition = {
    id: applicationId,
    scope: "solution" as const,
    themeId: previewThemeId,
    layoutId: previewLayoutId,
  };

  return (
    <ExperienceRuntime
      applicationId={applicationId}
      scope="solution"
      definition={definition}
      defaultThemeId={previewThemeId ?? "aai-live"}
      defaultLayoutId={previewLayoutId ?? "aai-live"}
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
