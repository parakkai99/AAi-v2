import React, { ReactNode } from "react";

export function ArchitectAnyExperience({
  applicationId,
  theme = "light",
  layout = "header-main-footer",
  className = "",
  children
}: {
  applicationId: string;
  theme?: string;
  layout?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`aai-experience-root theme-${theme} layout-${layout} ${className}`}>
      {children}
    </div>
  );
}
