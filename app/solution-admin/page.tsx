/**
 * AAi Solution Administration Route
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: SOLUTION-ADMIN-ROUTE-001
 * Status: ACTIVE
 * Version: 1.1.0
 *
 * The route is scoped to one registered solution. The client can return only
 * to that solution's application experience; AAi-Admin remains platform authority.
 */

'use client';

import React from 'react';
import type { SolutionAdminConfig } from '@/src/contracts/solutionAdmin';
import { SolutionAdmin } from '@/components/admin/SolutionAdmin';

export default function SolutionAdminPage({ solutionId }: { solutionId: string }) {
  return (
    <SolutionAdmin
      solutionId={solutionId}
      onPreviewSolution={(config: SolutionAdminConfig) => {
        const query = new URLSearchParams({ app: config.solutionId, preview: '1', theme: config.themeId, layout: config.layoutId });
        const previewUrl = new URL('/?' + query.toString(), window.location.origin).toString();
        const previewWindow = window.open(previewUrl, '_blank', 'noopener,noreferrer');
        previewWindow?.focus();
      }}
    />
  );
}
