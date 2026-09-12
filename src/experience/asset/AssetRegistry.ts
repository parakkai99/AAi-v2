/**
 * AAi Experience Asset Registry
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: EXPERIENCE-ASSET-002
 * Status: ACTIVE
 * Version: 1.0.0
 *
 * Central catalog indexing existing Parakkai and AAi assets across Universe,
 * Domain, Subdomain, and Solution scopes.
 */

import { ExperienceAsset, ExperienceAssetCollection, ExperienceAssetType, ExperienceAssetScope } from './AssetDefinition';

export const experienceAssets: readonly ExperienceAsset[] = [
  // AAi Universe & Architect Assets
  {
    id: 'aai-brand-logo',
    name: 'ArchitectAny Primary Brand Logo',
    type: 'image',
    scope: 'universe',
    url: '/assets/architectany-logo.jpg',
    thumbnailUrl: '/assets/architectany-logo-sm.jpg',
    format: 'jpg',
    dimensions: { width: 1200, height: 630, aspectRatio: '16:9' },
    tags: ['brand', 'logo', 'universe', 'architectany'],
    description: 'Master logo identity for ArchitectAny platform and universe.',
    author: 'ArchitectAny / Vijay Kumar K.',
    altText: 'ArchitectAny Master Brand Logo'
  },
  {
    id: 'aai-architect-profile',
    name: 'Chief Architect Profile Portrait',
    type: 'image',
    scope: 'universe',
    url: '/assets/vijay-profile.jpg',
    thumbnailUrl: '/assets/vijay-profile-sm.jpg',
    format: 'jpg',
    dimensions: { width: 800, height: 800, aspectRatio: '1:1' },
    tags: ['author', 'portrait', 'architect', 'profile'],
    description: 'Portrait photo of Vijay Kumar K., Founder & Chief Architect.',
    author: 'ArchitectAny',
    altText: 'Vijay Kumar K. - Chief Architect'
  },

  // Parakkai Living Temple — Deities & Sacred Sanctum (Spatial & High-Res)
  {
    id: 'parakkai-deity-perumal',
    name: 'Sri Madhusoodhana Perumal Moolavar',
    type: 'spatial',
    scope: 'solution',
    url: '/parakkai/spatial/perumal.png',
    format: 'png',
    dimensions: { width: 1024, height: 1024, aspectRatio: '1:1' },
    tags: ['deity', 'sanctum', 'perumal', 'moolavar', 'sacred', 'parakkai'],
    description: 'High-definition sacred rendering of Sri Madhusoodhana Perumal presiding deity.',
    author: 'Parakkai Living Temple Trust',
    altText: 'Sri Madhusoodhana Perumal Presiding Deity'
  },
  {
    id: 'parakkai-deity-vinayakar',
    name: 'Sri Sakthi Vinayakar Sanctum',
    type: 'spatial',
    scope: 'solution',
    url: '/parakkai/spatial/vinayaka final.png',
    thumbnailUrl: '/parakkai/spatial/sakthi-vinayakar.webp',
    format: 'png',
    dimensions: { width: 1024, height: 1024, aspectRatio: '1:1' },
    tags: ['deity', 'vinayakar', 'sanctum', 'ganesha', 'sacred'],
    description: 'Sacred rendering of Sri Sakthi Vinayakar at temple entrance.',
    author: 'Parakkai Living Temple Trust',
    altText: 'Sri Sakthi Vinayakar Sanctum Rendering'
  },
  {
    id: 'parakkai-spatial-1st',
    name: 'Parakkai Temple Rajagopuram Facade 1ST',
    type: 'spatial',
    scope: 'solution',
    url: '/parakkai/spatial/1ST.png',
    format: 'png',
    dimensions: { width: 1920, height: 1080, aspectRatio: '16:9' },
    tags: ['gopuram', 'facade', 'architecture', 'spatial', '3d'],
    description: 'Primary architectural elevation layer of the temple facade.',
    author: 'ArchitectAny Spatial Studio',
    altText: 'Parakkai Temple Rajagopuram Elevation Layer 1'
  },
  {
    id: 'parakkai-spatial-2nd',
    name: 'Parakkai Temple Rajagopuram Facade 2ND',
    type: 'spatial',
    scope: 'solution',
    url: '/parakkai/spatial/2ND.png',
    format: 'png',
    dimensions: { width: 1920, height: 1080, aspectRatio: '16:9' },
    tags: ['gopuram', 'facade', 'architecture', 'spatial', '3d', 'depth'],
    description: 'Secondary depth layer of the temple facade for multi-plane parallax.',
    author: 'ArchitectAny Spatial Studio',
    altText: 'Parakkai Temple Rajagopuram Elevation Layer 2'
  },

  // Parakkai Sacred Environment & Nature
  {
    id: 'parakkai-sacred-tree',
    name: 'Sthala Vriksham Sacred Tree',
    type: 'image',
    scope: 'solution',
    url: '/parakkai/spatial/sacred-tree.webp',
    thumbnailUrl: '/parakkai/spatial/sacred-tree.jpg',
    format: 'webp',
    dimensions: { width: 1280, height: 720, aspectRatio: '16:9' },
    tags: ['nature', 'sacred-tree', 'sthala-vriksham', 'parakkai'],
    description: 'Ancient Sthala Vriksham tree at Parakkai temple campus.',
    author: 'Parakkai Living Temple Trust',
    altText: 'Sthala Vriksham Sacred Tree'
  },
  {
    id: 'parakkai-lake-theertham',
    name: 'Parakkai Lotus Theertham Sacred Lake',
    type: 'image',
    scope: 'solution',
    url: '/parakkai/spatial/parakkai-lake.webp',
    thumbnailUrl: '/parakkai/spatial/parakkai-lake1.jpg',
    format: 'webp',
    dimensions: { width: 1280, height: 720, aspectRatio: '16:9' },
    tags: ['theertham', 'lake', 'wetland', 'birds', 'sacred-water', 'nature'],
    description: 'Protected sacred lake and water bird sanctuary of Parakkai.',
    author: 'Parakkai Living Temple Trust',
    altText: 'Parakkai Lotus Theertham Sacred Lake'
  },

  // Dynamic Flow & Sacred Vector Graphics
  {
    id: 'parakkai-scene-flow',
    name: 'Sacred Energy Flow Vector Graphic',
    type: 'illustration',
    scope: 'solution',
    url: '/parakkai/spatial/scene-03-flow.svg',
    format: 'svg',
    tags: ['vector', 'flow', 'energy', 'animation', 'sacred'],
    description: 'Curated SVG path for animating the divine energy stream across temple sanctum.',
    author: 'ArchitectAny Spatial Studio',
    altText: 'Sacred Energy Flow Vector'
  },
  {
    id: 'parakkai-ganga-flow',
    name: 'Ganga Holy Water Descent Flow Vector',
    type: 'illustration',
    scope: 'solution',
    url: '/parakkai/spatial/scene-07-ganga-flow.svg',
    format: 'svg',
    tags: ['vector', 'ganga', 'theertham', 'water', 'flow'],
    description: 'Vector flow mapping sacred water circulation from lake to sanctum abhishekam.',
    author: 'ArchitectAny Spatial Studio',
    altText: 'Ganga Holy Water Descent Flow Vector'
  }
];

export const experienceAssetCollections: readonly ExperienceAssetCollection[] = [
  {
    id: 'col-aai-universe',
    name: 'AAi Universe Core Assets',
    description: 'Master branding, portraits, and platform-wide assets.',
    scope: 'universe',
    assetIds: ['aai-brand-logo', 'aai-architect-profile']
  },
  {
    id: 'col-parakkai-sanctum',
    name: 'Parakkai Sacred Sanctum & Deities',
    description: 'High-definition 3D and spatial representations of sacred deities.',
    scope: 'solution',
    assetIds: ['parakkai-deity-perumal', 'parakkai-deity-vinayakar', 'parakkai-spatial-1st', 'parakkai-spatial-2nd']
  },
  {
    id: 'col-parakkai-nature',
    name: 'Parakkai Nature & Theertham',
    description: 'Ecological and sacred nature assets of Parakkai wetland sanctuary.',
    scope: 'solution',
    assetIds: ['parakkai-sacred-tree', 'parakkai-lake-theertham', 'parakkai-scene-flow', 'parakkai-ganga-flow']
  }
];

export function getAsset(id: string): ExperienceAsset | undefined {
  return experienceAssets.find((a) => a.id === id);
}

export function getAssetsByType(type: ExperienceAssetType): ExperienceAsset[] {
  return experienceAssets.filter((a) => a.type === type);
}

export function getAssetsByScope(scope: ExperienceAssetScope): ExperienceAsset[] {
  return experienceAssets.filter((a) => a.scope === scope);
}

export function getAssetsByTag(tag: string): ExperienceAsset[] {
  return experienceAssets.filter((a) => a.tags.includes(tag.toLowerCase()));
}

export function getAllAssets(): readonly ExperienceAsset[] {
  return experienceAssets;
}

export function getAllAssetCollections(): readonly ExperienceAssetCollection[] {
  return experienceAssetCollections;
}

export function getAssetCollection(id: string): ExperienceAssetCollection | undefined {
  return experienceAssetCollections.find((c) => c.id === id);
}
