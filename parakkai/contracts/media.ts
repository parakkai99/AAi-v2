/**
 * P-PARAKKAI-001
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * IP Owner: ArchitectAny / Vijay Kumar K.
 * Status: ACTIVE
 * Version: v0.1.0
 */

export type MediaCategory =
  | 'LIVE_DARSHAN'
  | 'DARSHAN'
  | 'POOJA'
  | 'BHAJAN'
  | 'DEVOTIONAL_MUSIC'
  | 'FESTIVAL'
  | 'TEMPLE_HISTORY'
  | 'PARAKKAI_VILLAGE'
  | 'STORIES'
  | 'INTERVIEWS'
  | 'ANNOUNCEMENTS';

export type LiveBroadcastState = 'NOT_CONFIGURED' | 'RECORDED_ONLY' | 'UPCOMING_LIVE' | 'LIVE_STREAMING' | 'LIVE_NOW';

export interface ParakkaiMediaItem {
  mediaId: string;
  title: string;
  tamilTitle?: string;
  description: string;
  thumbnailUrl: string;
  sourceType: 'YOUTUBE' | 'LOCAL_VIDEO' | 'AUDIO_SLOKA' | 'LIVESTREAM_FEED';
  youtubeId?: string;
  videoUrl?: string;
  audioUrl?: string;
  category: MediaCategory;
  durationMinutes: number;
  publishedAt: string;
  liveStatus: LiveBroadcastState;
  viewsCount: number;
  tags: string[];
  featured: boolean;
  authorOrSpeaker?: string;
  status: 'AVAILABLE' | 'RESTRICTED' | 'ARCHIVED';
}
