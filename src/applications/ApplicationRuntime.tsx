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
}

export const ApplicationRuntime: React.FC<ApplicationRuntimeProps> = ({
  applicationId,
  onExitToAAi,
  previewDraft = false,
}) => {
  const definition = applicationId
    ? getApplicationDefinition(applicationId) ?? getDefaultApplicationDefinition()
    : getDefaultApplicationDefinition();

  const resolvedApplicationId = definition.id;
  const Experience = definition.component;

  const experienceDefinition = useMemo(
    () => getSolutionExperienceDefinition(resolvedApplicationId, { includeDraft: previewDraft }),
    [resolvedApplicationId, previewDraft],
  );

  return (
    <ExperienceRuntime
      applicationId={resolvedApplicationId}
      scope="solution"
      definition={experienceDefinition}
    >
      <Experience onExitToAAi={onExitToAAi} />
    </ExperienceRuntime>
  );
};
