import React from "react";
import { ApplicationDefinition, ApplicationContext } from "./ApplicationDefinition";
import { getApplicationDefinition } from "./ApplicationRegistry";

export function ApplicationRuntime({
  applicationId,
  context,
  ...props
}: {
  applicationId: string;
  context?: ApplicationContext;
  [key: string]: any;
}) {
  const appDef = getApplicationDefinition(applicationId);
  if (!appDef) return <div>Application not found: {applicationId}</div>;

  const App = appDef.component as any;
  return <App context={context || {}} {...props} />;
}
