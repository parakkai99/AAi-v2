import type {
  ExperienceBehaviorSurfaceDefinition,
  ExperienceDefinition,
  ExperienceInfrastructureDefinition,
  ExperienceNavigationBehaviorDefinition,
} from "../contracts";

/**
 * Resolves a layered Universe → Domain → Subdomain → Solution definition.
 *
 * This is a pure architectural resolver. It does not read storage, render
 * React, execute navigation, or contact external services.
 *
 * The most-specific definition wins for a scalar property. Nested experience
 * objects are merged so a solution can override only one behavior/context
 * capability without duplicating the parent definition.
 */
export function resolveExperienceDefinition(
  chain: readonly ExperienceDefinition[],
): ExperienceDefinition {
  if (chain.length === 0) {
    throw new Error("Experience definition chain cannot be empty.");
  }

  return chain.reduce((resolved, current) =>
    mergeExperienceDefinition(resolved, current),
  );
}

function mergeExperienceDefinition(
  parent: ExperienceDefinition,
  child: ExperienceDefinition,
): ExperienceDefinition {
  return {
    ...parent,
    ...child,
    identity: mergeObject(parent.identity, child.identity),
    context: mergeObject(parent.context, child.context),
    search: mergeObject(parent.search, child.search),
    appStack: mergeObject(parent.appStack, child.appStack),
    navigation: mergeNavigation(parent.navigation, child.navigation),
    infrastructure: mergeInfrastructure(
      parent.infrastructure,
      child.infrastructure,
    ),
    metadata: mergeObject(parent.metadata, child.metadata),
  };
}

function mergeNavigation(
  parent?: ExperienceNavigationBehaviorDefinition,
  child?: ExperienceNavigationBehaviorDefinition,
): ExperienceNavigationBehaviorDefinition | undefined {
  if (!parent && !child) return undefined;

  return {
    ...parent,
    ...child,
    leftRail: mergeObject(parent?.leftRail, child?.leftRail),
    rightRail: mergeObject(parent?.rightRail, child?.rightRail),
    topNavigation: mergeObject(parent?.topNavigation, child?.topNavigation),
  };
}

function mergeInfrastructure(
  parent?: ExperienceInfrastructureDefinition,
  child?: ExperienceInfrastructureDefinition,
): ExperienceInfrastructureDefinition | undefined {
  if (!parent && !child) return undefined;
  return {
    ...parent,
    ...child,
  };
}

function mergeObject<T extends object>(
  parent?: T,
  child?: T,
): T | undefined {
  if (!parent && !child) return undefined;
  return {
    ...parent,
    ...child,
  } as T;
}
