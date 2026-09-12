/**
 * AAi Application Runtime
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: APP-RUNTIME-005 — Application Runtime + Experience Runtime
 * Status: ACTIVE
 * Version: 1.2.0
 *
 * Resolves a registered solution definition, then applies the generic
 * Experience Runtime to that solution. Business UI remains application-owned.
 */

import React, { useMemo } from 'react';
import {
  getApplicationDefinition,
  getDefaultApplicationDefinition,
} from './ApplicationRegistry';
import { ExperienceRuntime } from '@/src/experience/ExperienceRuntime';
import { getSolutionExperienceDefinition } from '@/src/services/solutionAdminService';

export interface ApplicationRuntimeProps {
  applicationId?: string;
  onExitToAAi?: () => void;
  previewDraft?: boolean;
  previewThemeId?: string;
  previewLayoutId?: string;
}

export const ApplicationRuntime: React.FC<ApplicationRuntimeProps> = ({
  applicationId,
  onExitToAAi,
  previewDraft = false,
  previewThemeId,
  previewLayoutId,
}) => {
  const definition = applicationId
    ? getApplicationDefinition(applicationId) ?? getDefaultApplicationDefinition()
    : getDefaultApplicationDefinition();

  const resolvedApplicationId = definition.id;
  const Experience = definition.component;

  const experienceDefinition = useMemo(() => {
    const base = getSolutionExperienceDefinition(resolvedApplicationId, {
      includeDraft: previewDraft,
    });

    return {
      ...base,
      themeId: previewThemeId ?? base.themeId,
      layoutId: previewLayoutId ?? base.layoutId,
    };
  }, [resolvedApplicationId, previewDraft, previewThemeId, previewLayoutId]);

  return (
    <ExperienceRuntime
      applicationId={resolvedApplicationId}
      scope="solution"
      definition={experienceDefinition}
      defaultThemeId={previewThemeId ?? 'aai-live'}
      defaultLayoutId={previewLayoutId ?? 'aai-live'}
    >
      <Experience onExitToAAi={onExitToAAi} />
    </ExperienceRuntime>
  );
};
