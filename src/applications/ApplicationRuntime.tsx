/**
 * AAi Application Runtime
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: APP-RUNTIME-005 — Application Runtime + Experience Runtime
 * Status: ACTIVE
 * Version: 1.1.1
 *
 * The runtime renders an application selected by identity and wraps it with
 * the reusable Experience Runtime. Theme/layout remain framework capability;
 * application content and business identity remain application-owned.
 */

import React from 'react';
import {
  getApplicationDefinition,
  getDefaultApplicationDefinition,
} from './ApplicationRegistry';
import { ExperienceRuntime } from '@/src/experience/ExperienceRuntime';

export interface ApplicationRuntimeProps {
  applicationId?: string;
  onExitToAAi?: () => void;
}

export const ApplicationRuntime: React.FC<ApplicationRuntimeProps> = ({
  applicationId,
  onExitToAAi,
}) => {
  const definition = applicationId
    ? getApplicationDefinition(applicationId) ?? getDefaultApplicationDefinition()
    : getDefaultApplicationDefinition();
  const resolvedApplicationId = definition.id;
  const Experience = definition.component;

  return (
    <ExperienceRuntime applicationId={resolvedApplicationId}>
      <Experience onExitToAAi={onExitToAAi} />
    </ExperienceRuntime>
  );
};
