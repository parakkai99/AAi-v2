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

            <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight" style={{ color: activeTheme.colors.textPrimary }}>
              Parakkai Community & Eco-Preservation Hub
            </h2>
            <p className="text-xs sm:text-sm font-sans leading-relaxed" style={{ color: activeTheme.colors.textSecondary }}>
              A transparent, community-driven civic platform for reporting temple maintenance concerns, voting on village green initiatives, and volunteering in holy sevas.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIdeaModalOpen(true)}
              className="px-4 py-2 rounded-xl text-xs font-serif font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
              style={{
                backgroundColor: activeTheme.colors.sacredGold,
                color: '#000000'
              }}
            >
              <Lightbulb className="w-4 h-4" />
              <span>Share an Idea</span>
            </button>

            <button
              type="button"
              onClick={() => setConcernModalOpen(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-medium border flex items-center gap-1.5 cursor-pointer transition-colors"
              style={{
                backgroundColor: activeTheme.colors.surfaceElevated,
                borderColor: activeTheme.colors.borderSubtle,
                color: activeTheme.colors.textPrimary
              }}
            >
              <AlertCircle className="w-4 h-4" style={{ color: activeTheme.colors.primarySkyBlue }} />
              <span>Report Concern</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mt-8 pt-6 border-t flex items-center gap-3 overflow-x-auto" style={{ borderColor: activeTheme.colors.borderSubtle }}>
          <button
            type="button"
            onClick={() => setActiveTab('IDEAS')}
            className="px-4 py-2 rounded-xl text-xs font-serif font-bold transition-all flex items-center gap-2 cursor-pointer border"
            style={{
              backgroundColor: activeTab === 'IDEAS' ? activeTheme.colors.sacredGold : activeTheme.colors.surfaceElevated,
              color: activeTab === 'IDEAS' ? '#000000' : activeTheme.colors.textSecondary,
              borderColor: activeTab === 'IDEAS' ? activeTheme.colors.sacredGold : activeTheme.colors.borderSubtle
            }}
          >
            <Lightbulb className="w-4 h-4" />
            <span>Community Ideas ({ideas.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('CONCERNS')}
            className="px-4 py-2 rounded-xl text-xs font-serif font-bold transition-all flex items-center gap-2 cursor-pointer border"
            style={{
              backgroundColor: activeTab === 'CONCERNS' ? activeTheme.colors.sacredGold : activeTheme.colors.surfaceElevated,
              color: activeTab === 'CONCERNS' ? '#000000' : activeTheme.colors.textSecondary,
              borderColor: activeTab === 'CONCERNS' ? activeTheme.colors.sacredGold : activeTheme.colors.borderSubtle
            }}
          >
            <AlertCircle className="w-4 h-4" />
            <span>Temple & Village Concerns ({concerns.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('VOLUNTEER')}
            className="px-4 py-2 rounded-xl text-xs font-serif font-bold transition-all flex items-center gap-2 cursor-pointer border"
            style={{
              backgroundColor: activeTab === 'VOLUNTEER' ? activeTheme.colors.sacredGold : activeTheme.colors.surfaceElevated,
              color: activeTab === 'VOLUNTEER' ? '#000000' : activeTheme.colors.textSecondary,
              borderColor: activeTab === 'VOLUNTEER' ? activeTheme.colors.sacredGold : activeTheme.colors.borderSubtle
            }}
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
            <h3 className="text-lg font-serif font-bold" style={{ color: activeTheme.colors.textGold }}>
              Active Proposals & Eco-Preservation Ideas
            </h3>
            <button
              type="button"
              onClick={() => setIdeaModalOpen(true)}
              className="text-xs flex items-center gap-1 cursor-pointer font-medium"
              style={{ color: activeTheme.colors.textGold }}
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
                  backgroundColor: activeTheme.colors.surfaceCard || activeTheme.colors.surfaceElevated,
                  borderColor: activeTheme.colors.borderSubtle
                }}
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border"
                      style={{
                        backgroundColor: `${activeTheme.colors.primarySkyBlue}20`,
                        color: activeTheme.colors.primarySkyBlue,
                        borderColor: `${activeTheme.colors.primarySkyBlue}40`
                      }}
                    >
                      {idea.category.replace('_', ' ')}
                    </span>
                    <span className="text-[10px] font-mono" style={{ color: activeTheme.colors.textSecondary }}>
                      {idea.status}
                    </span>
                  </div>

                  <h4 className="text-base font-serif font-bold" style={{ color: activeTheme.colors.textPrimary }}>
                    {idea.title}
                  </h4>

                  <p className="text-xs font-sans leading-relaxed" style={{ color: activeTheme.colors.textSecondary }}>
                    {idea.description}
                  </p>

                  {idea.adminFeedback && (
                    <div
                      className="p-3 rounded-xl border text-xs font-sans"
                      style={{
                        backgroundColor: activeTheme.colors.surfaceElevated,
                        borderColor: activeTheme.colors.borderGold,
                        color: activeTheme.colors.textSecondary
                      }}
                    >
                      <strong className="font-serif block" style={{ color: activeTheme.colors.textGold }}>Temple Trust Review: </strong>
                      <span>{idea.adminFeedback}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t mt-4 flex items-center justify-between" style={{ borderColor: activeTheme.colors.borderSubtle }}>
                  <span className="text-[11px] font-sans" style={{ color: activeTheme.colors.textSecondary }}>
                    By {idea.submittedByName}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleVote(idea.ideaId)}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    style={{
                      backgroundColor: `${activeTheme.colors.sacredGold}20`,
                      borderColor: activeTheme.colors.borderGold,
                      color: activeTheme.colors.textPrimary
                    }}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" style={{ color: activeTheme.colors.sacredGold }} />
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
            <h3 className="text-lg font-serif font-bold" style={{ color: activeTheme.colors.textGold }}>
              Reported Concerns & Maintenance Trackers
            </h3>
            <button
              type="button"
              onClick={() => setConcernModalOpen(true)}
              className="text-xs flex items-center gap-1 cursor-pointer font-medium"
              style={{ color: activeTheme.colors.textGold }}
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
                  backgroundColor: activeTheme.colors.surfaceCard || activeTheme.colors.surfaceElevated,
                  borderColor: activeTheme.colors.borderSubtle
                }}
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border"
                      style={{
                        backgroundColor: activeTheme.colors.surfaceElevated,
                        color: activeTheme.colors.textSecondary,
                        borderColor: activeTheme.colors.borderSubtle
                      }}
                    >
                      {c.category}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border"
                      style={{
                        backgroundColor: `${activeTheme.colors.sacredGold}20`,
                        color: activeTheme.colors.textGold,
                        borderColor: activeTheme.colors.borderGold
                      }}
                    >
                      {c.status}
                    </span>
                  </div>

                  <h4 className="text-base font-serif font-bold" style={{ color: activeTheme.colors.textPrimary }}>
                    {c.title}
                  </h4>

                  <p className="text-xs font-sans leading-relaxed" style={{ color: activeTheme.colors.textSecondary }}>
                    {c.description}
                  </p>

                  <div className="text-[11px] font-sans flex items-center gap-1.5" style={{ color: activeTheme.colors.textSecondary }}>
                    <MapPin className="w-3.5 h-3.5" style={{ color: activeTheme.colors.sacredGold }} />
                    <span>{c.locationArea}</span>
                  </div>

                  {c.adminNotes && (
                    <div
                      className="p-3 rounded-xl border text-xs font-sans"
                      style={{
                        backgroundColor: activeTheme.colors.surfaceElevated,
                        borderColor: activeTheme.colors.borderSubtle,
                        color: activeTheme.colors.textSecondary
                      }}
                    >
                      <strong className="font-serif block" style={{ color: activeTheme.colors.textGold }}>Action Note: </strong>
                      <span>{c.adminNotes}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t mt-4 flex items-center justify-between text-[11px] font-sans" style={{ borderColor: activeTheme.colors.borderSubtle, color: activeTheme.colors.textSecondary }}>
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
          <h3 className="text-lg font-serif font-bold" style={{ color: activeTheme.colors.textGold }}>
            Holy Seva Opportunities
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div
              className="p-5 rounded-2xl border space-y-3"
              style={{
                backgroundColor: activeTheme.colors.surfaceCard || activeTheme.colors.surfaceElevated,
                borderColor: activeTheme.colors.borderSubtle
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl border"
                style={{
                  backgroundColor: `${activeTheme.colors.sacredGold}20`,
                  borderColor: activeTheme.colors.borderGold
                }}
              >
                🍚
              </div>
              <h4 className="text-base font-serif font-bold" style={{ color: activeTheme.colors.textPrimary }}>
                Daily Annadhanam Seva
              </h4>
              <p className="text-xs font-sans leading-relaxed" style={{ color: activeTheme.colors.textSecondary }}>
                Assist in serving consecrated midday meals to pilgrims, cleaning banana leaves, and managing dining queues with devotion.
              </p>
              <div className="text-[11px] font-mono font-bold" style={{ color: activeTheme.colors.textGold }}>11:00 AM – 1:30 PM Daily</div>
            </div>

            <div
              className="p-5 rounded-2xl border space-y-3"
              style={{
                backgroundColor: activeTheme.colors.surfaceCard || activeTheme.colors.surfaceElevated,
                borderColor: activeTheme.colors.borderSubtle
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl border"
                style={{
                  backgroundColor: `${activeTheme.colors.primarySkyBlue}20`,
                  borderColor: `${activeTheme.colors.primarySkyBlue}40`
                }}
              >
                🌸
              </div>
              <h4 className="text-base font-serif font-bold" style={{ color: activeTheme.colors.textPrimary }}>
                Thulasi & Flower Garland Seva
              </h4>
              <p className="text-xs font-sans leading-relaxed" style={{ color: activeTheme.colors.textSecondary }}>
                Join village elders in weaving fresh basil strands, pink lotuses, and jasmine malas for the daily morning Alankaram of Perumal.
              </p>
              <div className="text-[11px] font-mono font-bold" style={{ color: activeTheme.colors.primarySkyBlue }}>05:30 AM – 07:00 AM Daily</div>
            </div>

            <div
              className="p-5 rounded-2xl border space-y-3"
              style={{
                backgroundColor: activeTheme.colors.surfaceCard || activeTheme.colors.surfaceElevated,
                borderColor: activeTheme.colors.borderSubtle
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl border"
                style={{
                  backgroundColor: `${activeTheme.colors.sacredGold}20`,
                  borderColor: activeTheme.colors.borderGold
                }}
              >
                🚩
              </div>
              <h4 className="text-base font-serif font-bold" style={{ color: activeTheme.colors.textPrimary }}>
                Festival Crowd & Chariot Seva
              </h4>
              <p className="text-xs font-sans leading-relaxed" style={{ color: activeTheme.colors.textSecondary }}>
                Support the pulling of the giant wooden Ther (Chariot), manage drinking water distribution points, and assist senior citizen pilgrims.
              </p>
              <div className="text-[11px] font-mono font-bold" style={{ color: activeTheme.colors.textGold }}>Panguni Brahmotsavam</div>
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
