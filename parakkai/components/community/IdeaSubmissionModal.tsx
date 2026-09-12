/**
 * P-PARAKKAI-001
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * IP Owner: ArchitectAny / Vijay Kumar K.
 * Status: ACTIVE
 * Version: v0.1.0
 */

import React, { useState } from 'react';
import { X, Lightbulb, CheckCircle2, Sparkles } from 'lucide-react';
import { ParakkaiThemeDefinition } from '../../contracts/theme';
import { parakkaiService } from '../../services/parakkaiService';

interface IdeaSubmissionModalProps {
  activeTheme: ParakkaiThemeDefinition;
  onClose: () => void;
  onSuccess?: () => void;
}

export const IdeaSubmissionModal: React.FC<IdeaSubmissionModalProps> = ({
  activeTheme,
  onClose,
  onSuccess
}) => {
  const currentUser = parakkaiService.getCurrentUser();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'VILLAGE_GREENERY' | 'PILGRIM_COMFORT' | 'CULTURAL_HERITAGE' | 'YOUTH_EDUCATION' | 'LAKE_REVIVAL' | 'COMMERCE_SUPPORT'>('LAKE_REVIVAL');
  const [submittedByName, setSubmittedByName] = useState(currentUser.name || '');
  const [submittedByContact, setSubmittedByContact] = useState(currentUser.email || currentUser.phone || '');

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !submittedByName.trim()) return;

    setSubmitting(true);
    try {
      parakkaiService.submitIdea({
        title,
        description,
        category,
        submittedByName,
        submittedByContact
      });
      setSubmitted(true);
      if (onSuccess) onSuccess();
    } catch {
      // Handle error
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg my-8 rounded-3xl border shadow-2xl p-6 sm:p-8 space-y-6 overflow-hidden max-h-[90vh] overflow-y-auto"
        style={{
          backgroundColor: activeTheme.colors.surfaceElevated,
          borderColor: activeTheme.colors.borderGold,
          color: activeTheme.colors.textPrimary
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b pb-4" style={{ borderColor: activeTheme.colors.borderSubtle }}>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl border"
              style={{
                backgroundColor: `${activeTheme.colors.sacredGold}20`,
                borderColor: activeTheme.colors.borderGold,
                color: activeTheme.colors.textGold
              }}
            >
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold" style={{ color: activeTheme.colors.textPrimary }}>
                Share a Village / Temple Idea
              </h3>
              <p className="text-xs font-sans" style={{ color: activeTheme.colors.textSecondary }}>
                A Greener Parakkai • Lake Revival • Community Seva
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg cursor-pointer"
            style={{ color: activeTheme.colors.textSecondary }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="space-y-4 text-center py-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full mx-auto bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center text-3xl">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-serif font-bold" style={{ color: activeTheme.colors.textPrimary }}>
                Idea Proposed Successfully!
              </h4>
              <p className="text-xs font-sans max-w-sm mx-auto" style={{ color: activeTheme.colors.textSecondary }}>
                Your proposal is now visible to all Parakkai devotees and villagers. Community members can vote and the Grama Sabha can review it.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-serif font-bold cursor-pointer shadow-xs"
              style={{
                backgroundColor: activeTheme.colors.sacredGold,
                color: '#000000'
              }}
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-mono" style={{ color: activeTheme.colors.textSecondary }}>Idea Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border text-xs focus:outline-none"
                style={{
                  backgroundColor: activeTheme.colors.surfaceCard || activeTheme.colors.surfaceCanvas,
                  borderColor: activeTheme.colors.borderSubtle,
                  color: activeTheme.colors.textPrimary
                }}
              >
                <option value="LAKE_REVIVAL">Lake Revival & Water Preservation</option>
                <option value="VILLAGE_GREENERY">Village Greenery (Native Trees / Groves)</option>
                <option value="CULTURAL_HERITAGE">Ancient Cultural Heritage & Epigraphy</option>
                <option value="PILGRIM_COMFORT">Pilgrim Comfort (Shade, Seating, Water)</option>
                <option value="YOUTH_EDUCATION">Youth & Spiritual Education</option>
                <option value="COMMERCE_SUPPORT">Temple Artisan & Local Commerce Support</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono" style={{ color: activeTheme.colors.textSecondary }}>Idea Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="e.g. Native shade trees along western car street"
                className="w-full p-2.5 rounded-xl border text-xs focus:outline-none"
                style={{
                  backgroundColor: activeTheme.colors.surfaceCard || activeTheme.colors.surfaceCanvas,
                  borderColor: activeTheme.colors.borderSubtle,
                  color: activeTheme.colors.textPrimary
                }}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono" style={{ color: activeTheme.colors.textSecondary }}>Proposal Description *</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
                placeholder="Explain the idea, how it benefits the temple/village, and how volunteers can participate..."
                className="w-full p-2.5 rounded-xl border text-xs focus:outline-none"
                style={{
                  backgroundColor: activeTheme.colors.surfaceCard || activeTheme.colors.surfaceCanvas,
                  borderColor: activeTheme.colors.borderSubtle,
                  color: activeTheme.colors.textPrimary
                }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-mono" style={{ color: activeTheme.colors.textSecondary }}>Proposer Name *</label>
                <input
                  type="text"
                  value={submittedByName}
                  onChange={(e) => setSubmittedByName(e.target.value)}
                  required
                  placeholder="Your Name"
                  className="w-full p-2.5 rounded-xl border text-xs focus:outline-none"
                  style={{
                    backgroundColor: activeTheme.colors.surfaceCard || activeTheme.colors.surfaceCanvas,
                    borderColor: activeTheme.colors.borderSubtle,
                    color: activeTheme.colors.textPrimary
                  }}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono" style={{ color: activeTheme.colors.textSecondary }}>Contact / Email</label>
                <input
                  type="text"
                  value={submittedByContact}
                  onChange={(e) => setSubmittedByContact(e.target.value)}
                  placeholder="Email or WhatsApp"
                  className="w-full p-2.5 rounded-xl border text-xs focus:outline-none"
                  style={{
                    backgroundColor: activeTheme.colors.surfaceCard || activeTheme.colors.surfaceCanvas,
                    borderColor: activeTheme.colors.borderSubtle,
                    color: activeTheme.colors.textPrimary
                  }}
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-serif font-bold transition-colors cursor-pointer disabled:opacity-50 shadow-xs"
                style={{
                  backgroundColor: activeTheme.colors.sacredGold,
                  color: '#000000'
                }}
              >
                {submitting ? 'Publishing...' : 'Propose Community Idea'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
