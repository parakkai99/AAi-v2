/**
 * P-PARAKKAI-001
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * IP Owner: ArchitectAny / Vijay Kumar K.
 * Status: ACTIVE
 * Version: v0.1.0
 */

export type BlogPostStatus = 'DRAFT' | 'REVIEW' | 'PUBLISHED' | 'ARCHIVED';

export interface ParakkaiBlogPost {
  postId: string;
  slug: string;
  title: string;
  tamilTitle?: string;
  summary: string;
  contentMarkdown: string;
  category: 'TEMPLE_LEGEND' | 'ARCHITECTURE' | 'FESTIVAL_GUIDE' | 'VILLAGE_HERITAGE' | 'SPIRITUAL_PRACTICE' | 'ENVIRONMENT';
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  featuredImage: string;
  publishedAt: string;
  readingTimeMinutes: number;
  tags: string[];
  status: BlogPostStatus;
  likesCount?: number;
}
