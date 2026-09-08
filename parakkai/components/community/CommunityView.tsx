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
  Users,
  AlertCircle,
  Lightbulb,
  HeartHandshake,
  ThumbsUp,
  Plus,
  CheckCircle2,
  Clock,
  MapPin,
  Sparkles
} from 'lucide-react';
import { ParakkaiThemeDefinition } from '../../contracts/theme';
import { parakkaiService } from '../../services/parakkaiService';
import { TempleConcernRecord, CommunityIdeaRecord } from '../../contracts/community';
import { ConcernReportModal } from './ConcernReportModal';
import { IdeaSubmissionModal } from './IdeaSubmissionModal';

interface CommunityViewProps {
  activeTheme: ParakkaiThemeDefinition;
}

export const CommunityView: React.FC<CommunityViewProps> = ({ activeTheme }) => {
  const [activeTab, setActiveTab] = useState<'IDEAS' | 'CONCERNS' | 'VOLUNTEER'>('IDEAS');
  const [concerns, setConcerns] = useState<TempleConcernRecord[]>(() => parakkaiService.getConcerns());
  const [ideas, setIdeas] = useState<CommunityIdeaRecord[]>(() => parakkaiService.getIdeas());

  const [concernModalOpen, setConcernModalOpen] = useState(false);
  const [ideaModalOpen, setIdeaModalOpen] = useState(false);

  const refreshData = () => {
    setConcerns(parakkaiService.getConcerns());
    setIdeas(parakkaiService.getIdeas());
  };

  const handleVote = (ideaId: string) => {
    parakkaiService.voteIdea(ideaId);
    setIdeas([...parakkaiService.getIdeas()]);
  };

  return (
    <div id="parakkai-community-view" className="w-full space-y-10 py-4 animate-fadeIn">
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
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                <span>Grama Seva & Devotee Participation</span>
              </span>
              <span className="text-xs text-slate-400 font-mono">
                People | Culture | Together
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Parakkai Community & Eco-Preservation Hub
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              A transparent, community-driven civic platform for reporting temple maintenance concerns, voting on village green initiatives, and volunteering in holy sevas.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIdeaModalOpen(true)}
              className="px-4 py-2 rounded-xl text-xs font-serif font-bold bg-amber-500 hover:bg-amber-400 text-black transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Lightbulb className="w-4 h-4" />
              <span>Share an Idea</span>
            </button>

            <button
              type="button"
              onClick={() => setConcernModalOpen(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-medium text-rose-300 hover:text-white bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/60 flex items-center gap-1.5 cursor-pointer"
            >
              <AlertCircle className="w-4 h-4" />
              <span>Report Concern</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex items-center gap-3 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('IDEAS')}
            className={`px-4 py-2 rounded-xl text-xs font-serif font-bold transition-all flex items-center gap-2 cursor-pointer border ${
              activeTab === 'IDEAS'
                ? 'bg-amber-500/20 text-amber-300 border-amber-400'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            <span>Community Ideas ({ideas.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('CONCERNS')}
            className={`px-4 py-2 rounded-xl text-xs font-serif font-bold transition-all flex items-center gap-2 cursor-pointer border ${
              activeTab === 'CONCERNS'
                ? 'bg-rose-500/20 text-rose-300 border-rose-400'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <AlertCircle className="w-4 h-4" />
            <span>Temple & Village Concerns ({concerns.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('VOLUNTEER')}
            className={`px-4 py-2 rounded-xl text-xs font-serif font-bold transition-all flex items-center gap-2 cursor-pointer border ${
              activeTab === 'VOLUNTEER'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <HeartHandshake className="w-4 h-4" />
            <span>Volunteer Sevas</span>
          </button>
        </div>
      </section>

      {/* Tab 1: Community Ideas */}
      {activeTab === 'IDEAS' && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-serif font-bold text-white" style={{ color: activeTheme.colors.textGold }}>
              Active Proposals & Eco-Preservation Ideas
            </h3>
            <button
              type="button"
              onClick={() => setIdeaModalOpen(true)}
              className="text-xs text-amber-300 hover:text-amber-200 flex items-center gap-1 cursor-pointer font-medium"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Propose New</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {ideas.map((idea: CommunityIdeaRecord) => (
              <div
                key={idea.ideaId}
                className="rounded-2xl border p-5 flex flex-col justify-between transition-all hover:shadow-xl"
                style={{
                  backgroundColor: `${activeTheme.colors.surfaceElevated}`,
                  borderColor: activeTheme.colors.borderSubtle
                }}
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {idea.category.replace('_', ' ')}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {idea.status}
                    </span>
                  </div>

                  <h4 className="text-base font-serif font-bold text-white">
                    {idea.title}
                  </h4>

                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    {idea.description}
                  </p>

                  {idea.adminFeedback && (
                    <div className="p-3 rounded-xl bg-slate-950 border border-amber-500/30 text-xs text-amber-300/90 font-sans">
                      <strong className="text-amber-400 font-serif block">Temple Trust Review: </strong>
                      <span>{idea.adminFeedback}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-800 mt-4 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-sans">
                    By {idea.submittedByName}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleVote(idea.ideaId)}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-slate-900 hover:bg-slate-800 text-amber-300 border border-slate-700 hover:border-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{idea.votesCount} Votes</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tab 2: Temple & Village Concerns */}
      {activeTab === 'CONCERNS' && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-serif font-bold text-white" style={{ color: activeTheme.colors.textGold }}>
              Reported Concerns & Maintenance Trackers
            </h3>
            <button
              type="button"
              onClick={() => setConcernModalOpen(true)}
              className="text-xs text-rose-300 hover:text-rose-200 flex items-center gap-1 cursor-pointer font-medium"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Report Concern</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {concerns.map((c: TempleConcernRecord) => (
              <div
                key={c.concernId}
                className="rounded-2xl border p-5 flex flex-col justify-between transition-all hover:shadow-xl"
                style={{
                  backgroundColor: `${activeTheme.colors.surfaceElevated}`,
                  borderColor: activeTheme.colors.borderSubtle
                }}
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-900 text-slate-300 border border-slate-800">
                      {c.category}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                        c.status === 'RESOLVED'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : c.status === 'IN_REVIEW' || c.status === 'ACTION_REQUIRED'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                          : 'bg-sky-500/20 text-sky-300 border-sky-500/30'
                      }`}
                    >
                      {c.status}
                    </span>
                  </div>

                  <h4 className="text-base font-serif font-bold text-white">
                    {c.title}
                  </h4>

                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    {c.description}
                  </p>

                  <div className="text-[11px] text-slate-400 font-sans flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{c.locationArea}</span>
                  </div>

                  {c.adminNotes && (
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-sans">
                      <strong className="text-amber-400 font-serif block">Action Note: </strong>
                      <span>{c.adminNotes}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-800 mt-4 flex items-center justify-between text-[11px] text-slate-400 font-sans">
                  <span>Reported by {c.submittedByName}</span>
                  <span className="font-mono">{c.createdAt.split('T')[0]}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tab 3: Volunteer Sevas */}
      {activeTab === 'VOLUNTEER' && (
        <section className="space-y-4">
          <h3 className="text-lg font-serif font-bold text-white" style={{ color: activeTheme.colors.textGold }}>
            Holy Seva Opportunities
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center text-xl border border-amber-400">
                🍚
              </div>
              <h4 className="text-base font-serif font-bold text-white">
                Daily Annadhanam Seva
              </h4>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Assist in serving consecrated midday meals to pilgrims, cleaning banana leaves, and managing dining queues with devotion.
              </p>
              <div className="text-[11px] text-amber-300 font-mono">11:00 AM – 1:30 PM Daily</div>
            </div>

            <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-xl border border-emerald-400">
                🌸
              </div>
              <h4 className="text-base font-serif font-bold text-white">
                Thulasi & Flower Garland Seva
              </h4>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Join village elders in weaving fresh basil strands, pink lotuses, and jasmine malas for the daily morning Alankaram of Perumal.
              </p>
              <div className="text-[11px] text-emerald-300 font-mono">05:30 AM – 07:00 AM Daily</div>
            </div>

            <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-300 flex items-center justify-center text-xl border border-rose-400">
                🚩
              </div>
              <h4 className="text-base font-serif font-bold text-white">
                Festival Crowd & Chariot Seva
              </h4>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Support the pulling of the giant wooden Ther (Chariot), manage drinking water distribution points, and assist senior citizen pilgrims.
              </p>
              <div className="text-[11px] text-rose-300 font-mono">Panguni Brahmotsavam</div>
            </div>
          </div>
        </section>
      )}

      {/* Modals */}
      {concernModalOpen && (
        <ConcernReportModal
          activeTheme={activeTheme}
          onClose={() => setConcernModalOpen(false)}
          onSuccess={() => {
            refreshData();
          }}
        />
      )}

      {ideaModalOpen && (
        <IdeaSubmissionModal
          activeTheme={activeTheme}
          onClose={() => setIdeaModalOpen(false)}
          onSuccess={() => {
            refreshData();
          }}
        />
      )}
    </div>
  );
};
