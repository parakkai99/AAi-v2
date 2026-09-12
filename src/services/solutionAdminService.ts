import type { ExperienceDefinition } from '@/src/experience';
import type { SolutionAdminConfig } from '@/src/contracts/solutionAdmin';

const key = (solutionId: string) => 'aai-solution-admin:' + solutionId;

const defaults = (solutionId: string): SolutionAdminConfig => ({
  solutionId,
  themeId: 'aai-live',
  layoutId: 'aai-live-full',
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

/**
 * Live runtime reads only a published solution configuration.
 *
 * Draft configuration remains available to Solution Admin / preview flows
 * and cannot silently change the public experience.
 */
export function getPublishedSolutionAdminConfig(solutionId: string): SolutionAdminConfig {
  const config = getSolutionAdminConfig(solutionId);
  return config.publishState === 'published' ? config : defaults(solutionId);
}

/**
 * Converts solution-owned administration state into the generic AAi
 * Experience Definition contract.
 *
 * The definition contains references and presentation choices only.
 * It does not contain business content, provider credentials or React code.
 */
export function getSolutionExperienceDefinition(
  solutionId: string,
  options: { includeDraft?: boolean } = {},
): ExperienceDefinition {
  const config = options.includeDraft
    ? getSolutionAdminConfig(solutionId)
    : getPublishedSolutionAdminConfig(solutionId);

  return {
    id: solutionId,
    scope: 'solution',
    version: String(config.version),
    identity: {
      displayName: solutionId,
    },
    themeId: config.themeId,
    layoutId: config.layoutId,
    navigation: {
      leftRail: {
        profileRef: 'solution-default',
        expandOn: 'hover',
        collapsed: true,
      },
      rightRail: {
        profileRef: 'solution-intelligence-default',
        expandOn: 'hover',
        collapsed: true,
      },
      topNavigation: {
        profileRef: 'universal-top-shell',
        expandOn: 'click',
        collapsed: false,
      },
    },
    search: {
      intentProfileRef: 'universal-intent',
      enabled: true,
      placeholder: 'What do you want to create, find, analyse or shape?',
    },
    appStack: {
      modelStackRef: 'universal-solution-models',
      enabled: true,
    },
    infrastructure: {
      authProfileRef: 'solution-default-auth',
      dataProfileRef: 'solution-default-data',
      storeProfileRef: 'solution-default-store',
      assetLibraryRef: 'solution-default-assets',
      integrationProfileRef: 'solution-default-integrations',
    },
    metadata: {
      publishState: config.publishState,
      navigationMode: config.navigationMode,
    },
  };
}

export function saveSolutionAdminConfig(config: SolutionAdminConfig): SolutionAdminConfig {
  const next = { ...config, updatedAt: new Date().toISOString() };

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(key(config.solutionId), JSON.stringify(next));
    window.localStorage.setItem('aai-experience-theme:' + config.solutionId, config.themeId);
    window.localStorage.setItem('aai-experience-layout:' + config.solutionId, config.layoutId);
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
