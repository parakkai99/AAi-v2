import React, { useEffect, useState } from "react";
import { ApplicationContext, ApplicationDefinition } from "./ApplicationDefinition";
import { getApplicationDefinition } from "./ApplicationRegistry";
import { ExperienceRuntime } from "@/src/experience/ExperienceRuntime";
import {
  getSolutionExperienceDefinition,
  readLiveThemePreview,
  LIVE_THEME_PREVIEW_CHANNEL,
  type LiveThemePreview,
} from "@/src/services/solutionAdminService";

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
  const [livePreview, setLivePreview] = useState<LiveThemePreview | undefined>(() =>
    previewDraft ? readLiveThemePreview(applicationId) : undefined,
  );

  useEffect(() => {
    if (!previewDraft || typeof window === "undefined" || !("BroadcastChannel" in window)) return;

    const channel = new BroadcastChannel(LIVE_THEME_PREVIEW_CHANNEL);
    const handleMessage = (event: MessageEvent<LiveThemePreview>) => {
      if (event.data?.solutionId === applicationId) {
        setLivePreview(event.data);
      }
    };

    channel.addEventListener("message", handleMessage);
    return () => {
      channel.removeEventListener("message", handleMessage);
      channel.close();
    };
  }, [applicationId, previewDraft]);

  useEffect(() => {
    if (!previewDraft || typeof window === "undefined") return;

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== "aai-solution-theme-live-preview-v1" || !event.newValue) return;
      try {
        const next = JSON.parse(event.newValue) as LiveThemePreview;
        if (next?.solutionId === applicationId) setLivePreview(next);
      } catch {
        // Ignore malformed optional live-preview messages.
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [applicationId, previewDraft]);

  const effectiveThemeId = livePreview?.themeId ?? previewThemeId ?? baseDefinition.themeId;
  const effectiveThemeOverride = livePreview?.themeOverride ?? baseDefinition.themeOverride;

  const definition = {
    ...baseDefinition,
    themeId: effectiveThemeId,
    themeOverride: effectiveThemeOverride,
    layoutId: previewLayoutId ?? baseDefinition.layoutId,
  };

  return (
    <ExperienceRuntime
      applicationId={applicationId}
      scope="solution"
      definition={definition}
      defaultThemeId={effectiveThemeId ?? "aai-live"}
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
