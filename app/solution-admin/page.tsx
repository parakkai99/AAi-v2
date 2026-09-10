/**
 * AAi Solution Administration Route
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: SOLUTION-ADMIN-ROUTE-001
 * Status: ACTIVE
 * Version: 1.0.0
 */

import React from 'react';
import { SolutionAdmin } from '@/components/admin/SolutionAdmin';

export default function SolutionAdminPage({ solutionId }: { solutionId: string }) {
  return <SolutionAdmin solutionId={solutionId} />;
}
