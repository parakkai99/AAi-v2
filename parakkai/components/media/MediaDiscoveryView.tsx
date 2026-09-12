/**
 * P-PARAKKAI-001
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * IP Owner: ArchitectAny / Vijay Kumar K.
 * Status: ACTIVE
 * Version: v0.1.0
 */

import React, { useState } from 'react';
import {
  Play,
  Video,
  Sparkles,
  Clock,
  Eye,
  Tag,
  X,
  Radio,
  Volume2
} from 'lucide-react';
import { ParakkaiThemeDefinition } from '../../contracts/theme';
import { parakkaiService } from '../../services/parakkaiService';
import { ParakkaiMediaItem } from '../../contracts/media';

interface MediaDiscoveryViewProps {
  activeTheme: ParakkaiThemeDefinition;
}

export const MediaDiscoveryView: React.FC<MediaDiscoveryViewProps> = ({ activeTheme }) => {
  const mediaList = parakkaiService.getMedia();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeVideo, setActiveVideo] = useState<ParakkaiMediaItem | null>(null);

  const filteredMedia = selectedCategory === 'ALL'
    ? mediaList
    : mediaList.filter((m) => m.category === selectedCategory);

  const categories = [
    'ALL',
    'DARSHAN',
    'TEMPLE_HISTORY',
    'FESTIVAL',
    'DEVOTIONAL_MUSIC',
    'PARAKKAI_VILLAGE'
  ];

  return (
    <div id="parakkai-media-view" className="w-full space-y-10 py-4 animate-fadeIn">
      {/* Header Banner */}
      <section
        className="rounded-3xl border p-6 sm:p-10 shadow-2xl relative overflow-hidden"
        style={{
          backgroundColor: `${activeTheme.colors.surfaceElevated}`,
          borderColor: activeTheme.colors.borderGold
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5" />
                <span>Devotional Media & Darshan Archives</span>
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Truthful Broadcasts
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight" style={{ color: activeTheme.colors.textPrimary }}>
              Parakkai Media Discovery
            </h2>
            <p className="text-xs sm:text-sm font-sans leading-relaxed" style={{ color: activeTheme.colors.textSecondary }}>
              Experience the divine presence of Sri Madhusoodhana Perumal through consecrated morning darshan recordings, documentary heritage explorations, sacred sthotrams, and Panguni Therottam highlights.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className="px-3 py-1.5 rounded-xl text-xs font-mono transition-colors cursor-pointer border"
                style={{
                  backgroundColor: selectedCategory === cat ? activeTheme.colors.sacredGold : activeTheme.colors.surfaceElevated,
                  color: selectedCategory === cat ? '#000000' : activeTheme.colors.textSecondary,
                  borderColor: selectedCategory === cat ? activeTheme.colors.sacredGold : activeTheme.colors.borderSubtle,
                  fontWeight: selectedCategory === cat ? 'bold' : 'normal'
                }}
              >
                {cat.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Media Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMedia.map((item: ParakkaiMediaItem) => (
          <div
            key={item.mediaId}
            onClick={() => setActiveVideo(item)}
            className="rounded-2xl border overflow-hidden transition-all group hover:shadow-2xl cursor-pointer flex flex-col justify-between"
            style={{
              backgroundColor: activeTheme.colors.surfaceCard || activeTheme.colors.surfaceElevated,
              borderColor: activeTheme.colors.borderSubtle
            }}
          >
            <div>
              {/* Video Thumbnail Canvas */}
              <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
                <img
                  src={item.thumbnailUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-85"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                {/* Center Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-transform group-hover:scale-115"
                    style={{ backgroundColor: activeTheme.colors.sacredGold, color: '#000000' }}
                  >
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Duration Badge */}
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-black/80 text-white">
                  {item.durationMinutes} mins
                </span>

                {/* Truthful Broadcast Status Badge */}
                <div className="absolute top-2 left-2">
                  {item.liveStatus === 'LIVE_NOW' ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-red-600 text-white flex items-center gap-1 animate-pulse">
                      <Radio className="w-3 h-3" />
                      <span>LIVE</span>
                    </span>
                  ) : (
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border"
                      style={{
                        backgroundColor: `${activeTheme.colors.surfaceElevated}ee`,
                        color: activeTheme.colors.textGold,
                        borderColor: activeTheme.colors.borderGold
                      }}
                    >
                      Recorded Darshan
                    </span>
                  )}
                </div>
              </div>

              {/* Text Info */}
              <div className="p-5 space-y-2">
                <span
                  className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
                  style={{
                    backgroundColor: activeTheme.colors.surfaceElevated,
                    color: activeTheme.colors.textSecondary,
                    borderColor: activeTheme.colors.borderSubtle
                  }}
                >
                  {item.category.replace('_', ' ')}
                </span>

                <h3 className="text-sm font-serif font-bold transition-colors line-clamp-2" style={{ color: activeTheme.colors.textPrimary }}>
                  {item.title}
                </h3>

                {item.tamilTitle && (
                  <span className="text-xs font-sans block line-clamp-1" style={{ color: activeTheme.colors.textGold }}>
                    {item.tamilTitle}
                  </span>
                )}

                <p className="text-xs font-sans line-clamp-2 leading-relaxed" style={{ color: activeTheme.colors.textSecondary }}>
                  {item.description}
                </p>
              </div>
            </div>

            {/* Card Footer: Views & Speaker */}
            <div
              className="p-4 border-t flex items-center justify-between text-[11px] font-sans"
              style={{
                borderColor: activeTheme.colors.borderSubtle,
                color: activeTheme.colors.textSecondary
              }}
            >
              <span className="truncate max-w-[150px]">
                {item.authorOrSpeaker || 'Parakkai Trust'}
              </span>
              <div className="flex items-center gap-1 font-mono">
                <Eye className="w-3 h-3" style={{ color: activeTheme.colors.textSecondary }} />
                <span>{item.viewsCount} views</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Player Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="w-full max-w-3xl rounded-3xl border p-6 space-y-4 shadow-2xl"
            style={{
              backgroundColor: activeTheme.colors.surfaceElevated,
              borderColor: activeTheme.colors.borderGold
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b pb-3" style={{ borderColor: activeTheme.colors.borderSubtle }}>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase" style={{ color: activeTheme.colors.textGold }}>
                  {activeVideo.category.replace('_', ' ')} • {activeVideo.durationMinutes} mins
                </span>
                <h3 className="text-base font-serif font-bold mt-0.5" style={{ color: activeTheme.colors.textPrimary }}>
                  {activeVideo.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="p-1 rounded-lg cursor-pointer"
                style={{ color: activeTheme.colors.textSecondary }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Canvas Stage */}
            <div
              className="relative aspect-video w-full rounded-2xl border overflow-hidden flex flex-col items-center justify-center text-center p-8"
              style={{
                backgroundColor: activeTheme.colors.surfaceCard || activeTheme.colors.surfaceElevated,
                borderColor: activeTheme.colors.borderSubtle
              }}
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-3 border animate-pulse"
                style={{
                  backgroundColor: `${activeTheme.colors.sacredGold}20`,
                  borderColor: activeTheme.colors.borderGold,
                  color: activeTheme.colors.textGold
                }}
              >
                🪷
              </div>
              <h4 className="text-lg font-serif font-bold" style={{ color: activeTheme.colors.textPrimary }}>
                Devotional Stream Active
              </h4>
              <p className="text-xs font-sans max-w-md mt-1" style={{ color: activeTheme.colors.textSecondary }}>
                {activeVideo.description}
              </p>
              <div
                className="mt-4 px-4 py-1.5 rounded-full text-xs font-mono border"
                style={{
                  backgroundColor: activeTheme.colors.surfaceElevated,
                  borderColor: activeTheme.colors.borderGold,
                  color: activeTheme.colors.textGold
                }}
              >
                Playing: {activeVideo.sourceType} • {activeVideo.viewsCount} Devotees Joined
              </div>
            </div>

            <div className="text-xs font-sans flex items-center justify-between pt-1" style={{ color: activeTheme.colors.textSecondary }}>
              <span>Presented by {activeVideo.authorOrSpeaker || 'Parakkai Temple Trust'}</span>
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="px-4 py-1.5 rounded-xl text-xs font-serif font-bold cursor-pointer transition-colors"
                style={{
                  backgroundColor: activeTheme.colors.sacredGold,
                  color: '#000000'
                }}
              >
                Close Player
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
