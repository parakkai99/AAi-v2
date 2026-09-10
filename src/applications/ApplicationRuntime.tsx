/**
 * AAi Application Runtime
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: APP-RUNTIME-003 — Application Runtime
 * Status: ACTIVE
 * Version: 1.0.0
 *
 * The runtime renders an application selected by identity.
 * It contains no domain-specific component names or business assumptions.
 */

import React from "react";
import {
  getApplicationDefinition,
  getDefaultApplicationDefinition,
} from "./ApplicationRegistry";

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

  const Experience = definition.component;

  return <Experience onExitToAAi={onExitToAAi} />;
};
