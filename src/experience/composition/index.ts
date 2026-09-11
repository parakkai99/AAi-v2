/**
 * AAi Experience Composition Public Surface
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: EXPERIENCE-COMPOSITION-001
 * Status: ACTIVE
 */

export type {
  ExperienceAnimationReference,
  ExperienceBlockDefinition,
  ExperienceBlockKind,
  ExperienceComponentReference,
  ExperienceCompositionDefinition,
  ExperienceContentReference,
  ExperienceMediaKind,
  ExperienceMediaReference,
  ExperienceRegionArea,
  ExperienceRegionDefinition,
  ExperienceTransitionReference,
} from "./ExperienceCompositionDefinition";

export { resolveExperienceComposition } from "./ExperienceCompositionResolver";
