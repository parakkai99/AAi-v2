/**
 * P-PARAKKAI-001
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * IP Owner: ArchitectAny / Vijay Kumar K.
 * Status: ACTIVE
 * Version: v0.1.0
 */

import React, { useState } from 'react';
import { X, AlertCircle, CheckCircle2, Shield } from 'lucide-react';
import { ParakkaiThemeDefinition } from '../../contracts/theme';
import { parakkaiService } from '../../services/parakkaiService';
import { ConcernCategory } from '../../contracts/community';

interface ConcernReportModalProps {
  activeTheme: ParakkaiThemeDefinition;
  onClose: () => void;
  onSuccess?: () => void;
}

export const ConcernReportModal: React.FC<ConcernReportModalProps> = ({
  activeTheme,
  onClose,
  onSuccess
}) => {
  const currentUser = parakkaiService.getCurrentUser();
  const [category, setCategory] = useState<ConcernCategory>('CLEANLINESS');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [locationArea, setLocationArea] = useState('');
  const [submittedByName, setSubmittedByName] = useState(currentUser.name || '');
  const [submittedByPhone, setSubmittedByPhone] = useState(currentUser.phone || '');
  const [priority, setPriority] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('MEDIUM');

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !submittedByName.trim()) return;

    setSubmitting(true);
    try {
      parakkaiService.submitConcern({
        category,
        title,
        description,
        locationArea: locationArea || 'Parakkai Temple Sannadhi Premises',
        priority,
        submittedByName,
        submittedByPhone
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
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold" style={{ color: activeTheme.colors.textPrimary }}>
                Report Temple / Village Concern
              </h3>
              <p className="text-xs font-sans" style={{ color: activeTheme.colors.textSecondary }}>
                Cleanliness • Lighting • Water • Devotee Comfort
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
                Concern Registered
              </h4>
              <p className="text-xs font-sans max-w-sm mx-auto" style={{ color: activeTheme.colors.textSecondary }}>
                Thank you for helping preserve Parakkai Temple and village. Your concern has been queued for review by the temple trust volunteers.
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-mono" style={{ color: activeTheme.colors.textSecondary }}>Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ConcernCategory)}
                  className="w-full p-2.5 rounded-xl border text-xs focus:outline-none"
                  style={{
                    backgroundColor: activeTheme.colors.surfaceCard || activeTheme.colors.surfaceCanvas,
                    borderColor: activeTheme.colors.borderSubtle,
                    color: activeTheme.colors.textPrimary
                  }}
                >
                  <option value="CLEANLINESS">Cleanliness & Waste Disposal</option>
                  <option value="LIGHTING">Street Lighting & Lamps</option>
                  <option value="WATER">Drinking Water & Tank</option>
                  <option value="CROWD_MANAGEMENT">Crowd & Queue Movement</option>
                  <option value="ACCESSIBILITY">Elderly Accessibility</option>
                  <option value="NOISE">Noise & Audio</option>
                  <option value="OTHER">Other Community Issue</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono" style={{ color: activeTheme.colors.textSecondary }}>Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as 'LOW' | 'MEDIUM' | 'HIGH')}
                  className="w-full p-2.5 rounded-xl border text-xs focus:outline-none"
                  style={{
                    backgroundColor: activeTheme.colors.surfaceCard || activeTheme.colors.surfaceCanvas,
                    borderColor: activeTheme.colors.borderSubtle,
                    color: activeTheme.colors.textPrimary
                  }}
                >
                  <option value="LOW">Low (Routine maintenance)</option>
                  <option value="MEDIUM">Medium (Needs attention this week)</option>
                  <option value="HIGH">High (Immediate safety/hygiene)</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono" style={{ color: activeTheme.colors.textSecondary }}>Issue Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Brief summary of issue"
                className="w-full p-2.5 rounded-xl border text-xs focus:outline-none"
                style={{
                  backgroundColor: activeTheme.colors.surfaceCard || activeTheme.colors.surfaceCanvas,
                  borderColor: activeTheme.colors.borderSubtle,
                  color: activeTheme.colors.textPrimary
                }}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono" style={{ color: activeTheme.colors.textSecondary }}>Location Area</label>
              <input
                type="text"
                value={locationArea}
                onChange={(e) => setLocationArea(e.target.value)}
                placeholder="e.g. North Lake Bund, East Car Street, Outer Praharam"
                className="w-full p-2.5 rounded-xl border text-xs focus:outline-none"
                style={{
                  backgroundColor: activeTheme.colors.surfaceCard || activeTheme.colors.surfaceCanvas,
                  borderColor: activeTheme.colors.borderSubtle,
                  color: activeTheme.colors.textPrimary
                }}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono" style={{ color: activeTheme.colors.textSecondary }}>Detailed Description *</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={3}
                placeholder="Please describe the issue in detail..."
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
                <label className="text-xs font-mono" style={{ color: activeTheme.colors.textSecondary }}>Your Name *</label>
                <input
                  type="text"
                  value={submittedByName}
                  onChange={(e) => setSubmittedByName(e.target.value)}
                  required
                  placeholder="Devotee name"
                  className="w-full p-2.5 rounded-xl border text-xs focus:outline-none"
                  style={{
                    backgroundColor: activeTheme.colors.surfaceCard || activeTheme.colors.surfaceCanvas,
                    borderColor: activeTheme.colors.borderSubtle,
                    color: activeTheme.colors.textPrimary
                  }}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono" style={{ color: activeTheme.colors.textSecondary }}>Phone (for updates)</label>
                <input
                  type="tel"
                  value={submittedByPhone}
                  onChange={(e) => setSubmittedByPhone(e.target.value)}
                  placeholder="+91 94430 00000"
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
                {submitting ? 'Submitting...' : 'Register Concern with Temple Seva Desk'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
