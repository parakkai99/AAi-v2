export type SpatialSceneKind =
  | "temple"
  | "nature"
  | "lake"
  | "mountain"
  | "deity"
  | "flow"
  | "darshan";

export interface SpatialJourneyScene {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  kind: SpatialSceneKind;

  /**
   * Website delivery asset.
   * WebP is the preferred browser delivery format.
   * Original/master JPG remains outside the runtime asset path.
   */
  image: string;

  /**
   * JPG fallback / master-derived delivery asset.
   */
  imageFallback: string;

  /**
   * Visual accent used by the existing spatial renderer.
   */
  accent: string;

  /**
   * Allows the journey engine to distinguish between
   * production-ready imagery and planned scenes.
   */
  assetStatus: "ready" | "planned";

  /**
   * Spatial composition hints.
   * These are descriptive rather than fixed pixel coordinates.
   */
  focalPoint?: string;

  /**
   * Scene-specific movement language.
   */
  motion?: "still" | "drift" | "flow" | "rise" | "open";

  /**
   * Scene-specific atmospheric language.
   */
  atmosphere?: "golden" | "mist" | "water" | "sacred" | "calm";

  /**
   * Semantic experience description.
   *
   * This is renderer/content metadata.
   * It is NOT intended to become dashboard/card content.
   */
  experience: string;
}

export const PARAKKAI_SPATIAL_JOURNEY: SpatialJourneyScene[] = [
  /*
   * SCENE 01
   * Sakthi Vinayakar
   */
  {
    id: "sakthi-vinayakar",
    number: 1,
    title: "Sakthi Vinayakar",
    subtitle: "The Beginning",
    kind: "temple",

    image: "/parakkai/spatial/vinayaka final.png",
    imageFallback: "/parakkai/spatial/sakthi-vinayakar.jpg",
    accent: "gold",

    assetStatus: "ready",

    focalPoint: "temple",
    motion: "still",
    atmosphere: "golden",

    experience:
      "The journey begins with a quiet morning blessing.",
  },

  /*
   * SCENE 02
   * Sacred Tree (Phase 2 - Active Production)
   */
  {
    id: "sacred-tree",
    number: 2,
    title: "Sacred Tree",
    subtitle: "Living Knowledge",
    kind: "nature",

    image: "/parakkai/spatial/sacred-tree.webp",
    imageFallback: "/parakkai/spatial/sacred-tree.jpg",
    accent: "green",

    assetStatus: "ready",

    focalPoint: "tree",
    motion: "drift",
    atmosphere: "sacred",

    experience:
      "The sacred landscape opens into living knowledge.",
  },

  /*
   * SCENE 03
   * Vinayakar → Lake
   *
   * Production image will be added later.
   */
  {
    id: "vinayakar-to-lake",
    number: 3,
    title: "Toward the Lake",
    subtitle: "Blessing Becomes Flow",
    kind: "flow",

    image: "/parakkai/spatial/1ST.png",
imageFallback: "/parakkai/spatial/scene-03-flow.svg",
accent: "gold",

assetStatus: "ready",

    focalPoint: "horizon",
    motion: "flow",
    atmosphere: "golden",

    experience:
      "A blessing begins to move through the landscape.",
  },

  /*
   * SCENE 04
   * Parakkai Lake
   */
  {
    id: "parakkai-lake",
    number: 4,
    title: "Parakkai Lake",
    subtitle: "Water, Life, Reflection",
    kind: "lake",

    image: "/parakkai/spatial/2ND.png",
    imageFallback: "/parakkai/spatial/parakkai-lake.webp",
    accent: "water",

    assetStatus: "ready",

    focalPoint: "water",
    motion: "drift",
    atmosphere: "water",

    experience:
      "Water, lotus, fish, birds and reflected light create a living pause.",
  },

  /*
   * SCENE 05
   * Maruthuva Malai
   *
   * Production image will be added later.
   */
  {
    id: "maruthuva-malai",
    number: 5,
    title: "Maruthuva Malai",
    subtitle: "The Sacred Mountain",
    kind: "mountain",

    image: "",
    imageFallback: "",
    accent: "mist",

    assetStatus: "planned",

    focalPoint: "mountain",
    motion: "rise",
    atmosphere: "mist",

    experience:
      "The landscape rises toward the sacred mountain.",
  },

  /*
   * SCENE 06
   * Shiva & Bhuvaneswari
   *
   * Production image will be added later.
   */
  {
    id: "shiva-bhuvaneswari",
    number: 6,
    title: "Shiva & Bhuvaneswari",
    subtitle: "Source of Knowledge",
    kind: "deity",

    image: "",
    imageFallback: "",
    accent: "sacred",

    assetStatus: "planned",

    focalPoint: "deity",
    motion: "still",
    atmosphere: "sacred",

    experience:
      "Stillness becomes the source of knowledge and grace.",
  },

  /*
   * SCENE 07
   * Ganga / Knowledge Flow
   *
   * Production image will be added later.
   */
  {
    id: "knowledge-flow",
    number: 7,
    title: "Ganga",
    subtitle: "Knowledge Becomes Flow",
    kind: "flow",

   image: "/parakkai/spatial/scene-07-ganga-flow.svg",
imageFallback: "/parakkai/spatial/scene-07-ganga-flow.svg",
accent: "water",

assetStatus: "ready",

    focalPoint: "water",
    motion: "flow",
    atmosphere: "mist",

    experience:
      "Knowledge moves like water from mountain toward the living world.",
  },

  /*
   * SCENE 08
   * Valaikuli Amman
   *
   * Production image will be added later.
   */
  {
    id: "valaikuli-amman",
    number: 8,
    title: "Valaikuli Amman",
    subtitle: "A Nearby Sacred Presence",
    kind: "deity",

    image: "",
    imageFallback: "",
    accent: "gold",

    assetStatus: "planned",

    focalPoint: "temple",
    motion: "drift",
    atmosphere: "golden",

    experience:
      "Another sacred presence appears within the surrounding landscape.",
  },

  /*
   * SCENE 09
   * Akkarai Mahadever
   *
   * Production image will be added later.
   */
  {
    id: "akkarai-mahadever",
    number: 9,
    title: "Akkarai Mahadever",
    subtitle: "Along the Sacred Landscape",
    kind: "deity",

    image: "",
    imageFallback: "",
    accent: "sacred",

    assetStatus: "planned",

    focalPoint: "temple",
    motion: "drift",
    atmosphere: "sacred",

    experience:
      "The journey continues through the network of nearby sacred places.",
  },

  /*
   * SCENE 10
   * Kanyakumari Bagavathi
   *
   * Supplied goddess image will be connected here
   * when the production asset is finalized.
   */
  {
    id: "kanyakumari-bagavathi",
    number: 10,
    title: "Kanyakumari Bagavathi",
    subtitle: "The Distant Sacred Direction",
    kind: "deity",

    image: "",
    imageFallback: "",
    accent: "gold",

    assetStatus: "planned",

    focalPoint: "deity",
    motion: "still",
    atmosphere: "golden",

    experience:
      "The journey turns toward the greater sacred geography of Kanyakumari.",
  },

  /*
   * SCENE 11
   * Madhusoodhana Temple
   *
   * Real temple entrance / Kodimaram image will be
   * connected when the production asset is finalized.
   */
  {
    id: "madhusoodhana-temple",
    number: 11,
    title: "Madhusoodhana Temple",
    subtitle: "The Destination Appears",
    kind: "temple",

    image: "",
    imageFallback: "",
    accent: "gold",

    assetStatus: "planned",

    focalPoint: "entrance",
    motion: "rise",
    atmosphere: "golden",

    experience:
      "The temple emerges as the destination of the journey.",
  },

  /*
   * SCENE 12
   * Golden Darshan
   *
   * Final alankaram / darshan asset will be connected
   * when the production composition is finalized.
   */
  {
    id: "golden-darshan",
    number: 12,
    title: "Madhusoodhana Darshan",
    subtitle: "The Journey Arrives",
    kind: "darshan",

    image: "",
    imageFallback: "",
    accent: "gold",

    assetStatus: "planned",

    focalPoint: "deity",
    motion: "open",
    atmosphere: "golden",

    experience:
      "The golden doors open and the journey resolves in darshan.",
  },
];

/**
 * Safely resolve a scene index.
 *
 * The journey loops continuously from Scene 12 → Scene 01.
 */
export const getSpatialScene = (
  index: number,
): SpatialJourneyScene => {
  const safeIndex =
    ((index % PARAKKAI_SPATIAL_JOURNEY.length) +
      PARAKKAI_SPATIAL_JOURNEY.length) %
    PARAKKAI_SPATIAL_JOURNEY.length;

  return PARAKKAI_SPATIAL_JOURNEY[safeIndex];
};

/**
 * Find a scene by its stable ID.
 */
export const getSpatialSceneIndex = (
  sceneId: string,
): number =>
  PARAKKAI_SPATIAL_JOURNEY.findIndex(
    (scene) => scene.id === sceneId,
  );

/**
 * Return total journey scene count.
 */
export const getSpatialSceneCount = (): number =>
  PARAKKAI_SPATIAL_JOURNEY.length;

/*
 * CONTRACT
 * ID: P1.8-SPATIAL-JOURNEY-CONFIG
 * NAME: Parakkai Spatial Journey Configuration
 * STATUS: ACTIVE
 * VERSION: 1.1.0
 *
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 *
 * Architecture:
 *
 *   Journey Configuration
 *          ↓
 *   Spatial Journey Engine
 *          ↓
 *   Spatial Scene Renderer
 *          ↓
 *   Atmospheric / Cinematic Layer
 *
 * Asset policy:
 *
 *   Master JPG
 *       ↓
 *   Optimized WebP
 *       ↓
 *   Browser delivery
 *
 * Production rule:
 *
 *   Do not invent missing photographic assets.
 *   Planned scenes remain structurally defined
 *   until their real production imagery is supplied.
 */