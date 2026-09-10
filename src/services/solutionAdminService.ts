import type { SolutionAdminConfig } from '@/src/contracts/solutionAdmin';

const key = (solutionId: string) => `aai-solution-admin:${solutionId}`;

const defaults = (solutionId: string): SolutionAdminConfig => ({
  solutionId,
  themeId: 'midnight-dark',
  layoutId: 'drilldown-4',
  navigationMode: 'configured',
  contentJson: '{\n  "version": 1,\n  "content": {}\n}',
  aiPrompt: 'Describe the intended content, tone, audience and outcome for this solution.',
  assetManifest: '{\n  "assets": []\n}',
  publishState: 'draft',
  version: 1,
  updatedAt: new Date().toISOString(),
});

export function getSolutionAdminConfig(solutionId: string): SolutionAdminConfig {
  if (typeof window === 'undefined') return defaults(solutionId);
  const stored = window.localStorage.getItem(key(solutionId));
  if (!stored) return defaults(solutionId);
  try {
    return { ...defaults(solutionId), ...JSON.parse(stored), solutionId };
  } catch {
    return defaults(solutionId);
  }
}

export function saveSolutionAdminConfig(config: SolutionAdminConfig): SolutionAdminConfig {
  const next = { ...config, updatedAt: new Date().toISOString() };
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(key(config.solutionId), JSON.stringify(next));
    window.localStorage.setItem(`aai-experience-theme:${config.solutionId}`, config.themeId);
    window.localStorage.setItem(`aai-experience-layout:${config.solutionId}`, config.layoutId);
  }
  return next;
}

export function publishSolution(solutionId: string): SolutionAdminConfig {
  const current = getSolutionAdminConfig(solutionId);
  return saveSolutionAdminConfig({
    ...current,
    publishState: 'published',
    version: current.version + 1,
  });
}
