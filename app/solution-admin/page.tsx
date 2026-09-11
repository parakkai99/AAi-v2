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

import React from 'react';
import { SolutionAdmin } from '@/components/admin/SolutionAdmin';

export default function SolutionAdminPage({ solutionId }: { solutionId: string }) {
  return (
    <SolutionAdmin
      solutionId={solutionId}
      onPreviewSolution={() => {
        window.location.assign(`/?app=${encodeURIComponent(solutionId)}&preview=1`);
      }}
    />
  );
}
