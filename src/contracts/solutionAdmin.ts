/**
 * AAi Solution Administration Contract
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: SOLUTION-ADMIN-001 — Per-Solution Control Plane
 * Status: ACTIVE
 * Version: 1.0.0
 */

export type SolutionPublishState = 'draft' | 'ready' | 'published' | 'suspended';

export interface SolutionAdminConfig {
  solutionId: string;
  themeId: string;
  layoutId: string;
  navigationMode: string;
  contentJson: string;
  aiPrompt: string;
  assetManifest: string;
  publishState: SolutionPublishState;
  version: number;
  updatedAt: string;
}
