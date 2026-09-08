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
  BookOpen,
  Sparkles,
  Clock,
  Heart,
  ArrowRight,
  X,
  Share2,
  Tag
} from 'lucide-react';
import { ParakkaiThemeDefinition } from '../../contracts/theme';
import { parakkaiService } from '../../services/parakkaiService';
import { ParakkaiBlogPost } from '../../contracts/blog';

interface BlogStoriesViewProps {
  activeTheme: ParakkaiThemeDefinition;
}

export const BlogStoriesView: React.FC<BlogStoriesViewProps> = ({ activeTheme }) => {
  const posts = parakkaiService.getBlogPosts();
  const [activePost, setActivePost] = useState<ParakkaiBlogPost | null>(null);

  return (
    <div id="parakkai-blog-stories" className="w-full space-y-10 py-4 animate-fadeIn">
      {/* Header Banner */}
      <section
        className="rounded-3xl border p-6 sm:p-10 shadow-2xl relative overflow-hidden"
        style={{
          backgroundColor: `${activeTheme.colors.surfaceElevated}`,
          borderColor: activeTheme.colors.borderGold
        }}
      >
        <div className="space-y-2 max-w-2xl relative z-10">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Sthala Purana & Architectural Heritage</span>
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Research & Stories
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Sacred Chronicles of Parakkai
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
            Discover the eternal legends of Lord Indra's redemption, astronomical secrets of the dawn sunlight miracle, and spiritual wisdom passed down through generations of temple custodians.
          </p>
        </div>
      </section>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post: ParakkaiBlogPost) => (
          <article
            key={post.postId}
            onClick={() => setActivePost(post)}
            className="rounded-2xl border overflow-hidden transition-all group hover:shadow-2xl hover:border-amber-400/60 cursor-pointer flex flex-col justify-between"
            style={{
              backgroundColor: `${activeTheme.colors.surfaceElevated}`,
              borderColor: activeTheme.colors.borderSubtle
            }}
          >
            <div>
              <div className="aspect-video w-full overflow-hidden bg-slate-950 relative">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-85"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-black/80 text-amber-300">
                  {post.category.replace('_', ' ')}
                </span>
              </div>

              <div className="p-5 space-y-2">
                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                  <span>{post.publishedAt}</span>
                  <span>•</span>
                  <span>{post.readingTimeMinutes} min read</span>
                </div>

                <h3 className="text-base font-serif font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                  {post.title}
                </h3>

                {post.tamilTitle && (
                  <span className="text-xs text-amber-300/80 font-sans block line-clamp-1">
                    {post.tamilTitle}
                  </span>
                )}

                <p className="text-xs text-slate-300 font-sans line-clamp-3 leading-relaxed">
                  {post.summary}
                </p>
              </div>
            </div>

            <div className="p-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-sans">
              <span>{post.author.name}</span>
              <span className="text-amber-400 font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1">
                <span>Read Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Reader Modal */}
      {activePost && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setActivePost(null)}
        >
          <div
            className="w-full max-w-2xl max-h-[85vh] rounded-3xl border p-6 sm:p-8 space-y-6 shadow-2xl bg-slate-950 border-amber-500/40 text-white overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">
                  {activePost.category.replace('_', ' ')} • {activePost.readingTimeMinutes} min read
                </span>
                <h3 className="text-xl font-serif font-bold text-white">
                  {activePost.title}
                </h3>
                {activePost.tamilTitle && (
                  <p className="text-xs text-amber-300 font-sans">{activePost.tamilTitle}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setActivePost(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-slate-300 font-sans leading-relaxed whitespace-pre-line space-y-3">
              {activePost.contentMarkdown}
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-sans">
              <div>
                <strong>Author: </strong>
                <span>{activePost.author.name} ({activePost.author.role})</span>
              </div>
              <button
                type="button"
                onClick={() => setActivePost(null)}
                className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs cursor-pointer"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
