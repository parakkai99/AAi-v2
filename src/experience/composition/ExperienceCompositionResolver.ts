import type {
  ExperienceBlockDefinition,
  ExperienceCompositionDefinition,
  ExperienceRegionDefinition,
} from "./ExperienceCompositionDefinition";

/**
 * Resolves a layered Experience composition from parent to child.
 *
 * The resolver is deliberately pure:
 * - no React
 * - no DOM
 * - no persistence
 * - no component imports
 * - no animation execution
 *
 * Child regions replace parent regions with the same region id.
 * New child regions are appended.
 *
 * Inside a region, a child block with the same id replaces the parent block.
 * New blocks are appended. Explicit order is preserved where supplied.
 */
export function resolveExperienceComposition(
  chain: readonly ExperienceCompositionDefinition[],
): ExperienceCompositionDefinition {
  if (chain.length === 0) {
    throw new Error("Experience composition chain cannot be empty.");
  }

  const regions = new Map<string, ExperienceRegionDefinition>();

  for (const composition of chain) {
    for (const region of composition.regions) {
      const existingRegion = regions.get(region.id);

      if (!existingRegion) {
        regions.set(region.id, region);
        continue;
      }

      regions.set(region.id, mergeRegion(existingRegion, region));
    }
  }

  const finalComposition = chain[chain.length - 1];

  return {
    ...finalComposition,
    regions: Array.from(regions.values()).sort(compareOrder),
  };
}

function mergeRegion(
  parent: ExperienceRegionDefinition,
  child: ExperienceRegionDefinition,
): ExperienceRegionDefinition {
  const blocks = new Map<string, ExperienceBlockDefinition>();

  for (const block of parent.blocks) {
    blocks.set(block.id, block);
  }

  for (const block of child.blocks) {
    blocks.set(block.id, block);
  }

  return {
    ...parent,
    ...child,
    blocks: Array.from(blocks.values()).sort(compareOrder),
  };
}

function compareOrder(
  left: { readonly order?: number },
  right: { readonly order?: number },
): number {
  return (left.order ?? Number.MAX_SAFE_INTEGER) -
    (right.order ?? Number.MAX_SAFE_INTEGER);
}
