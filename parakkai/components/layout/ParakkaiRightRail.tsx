/**
 * P-PARAKKAI-003 — Parakkai Right Action Rail (Compact, Non-Scrolling, Light Sky-Blue)
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * IP Owner: ArchitectAny / Vijay Kumar K.
 * Status: ACTIVE
 * Version: v0.1.2
 * 
 * Contextual participation rail configured with temple seva actions, pooja bookings,
 * 6:30 AM miracle status, devotee community feedback, and official WhatsApp assistance.
 */

import React, { useState } from 'react';
import {
  Ticket,
  Sparkles,
  Clock,
  AlertCircle,
  Lightbulb,
  HeartHandshake,
  Store,
  ShoppingBag,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Zap,
  ExternalLink,
  Sun
} from 'lucide-react';
import { NavigationLinkItem } from '../../contracts/brand';
import { ParakkaiThemeDefinition } from '../../contracts/theme';
import { parakkaiService } from '../../services/parakkaiService';

interface ParakkaiRightRailProps {
  currentView: string;
  activeTheme: ParakkaiThemeDefinition;
  onNavigate: (view: string) => void;
  onOpenBookingModal?: () => void;
  onOpenConcernModal?: () => void;
  onOpenIdeaModal?: () => void;
}

export const ParakkaiRightRail: React.FC<ParakkaiRightRailProps> = ({
  currentView,
  activeTheme,
  onNavigate,
  onOpenBookingModal,
  onOpenConcernModal,
  onOpenIdeaModal
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navConfig = parakkaiService.getNavigationConfig();
  const rightItems = (navConfig && Array.isArray(navConfig.rightRailItems)) ? navConfig.rightRailItems : [];
  const siteConfig = parakkaiService.getSiteConfig();

  const getActionIcon = (name: string) => {
    switch (name) {
      case 'Ticket': return <Ticket className="w-3.5 h-3.5" />;
      case 'Sparkles': return <Sparkles className="w-3.5 h-3.5 text-amber-600" />;
      case 'Clock': return <Clock className="w-3.5 h-3.5 text-sky-600" />;
      case 'AlertCircle': return <AlertCircle className="w-3.5 h-3.5 text-rose-500" />;
      case 'Lightbulb': return <Lightbulb className="w-3.5 h-3.5 text-amber-500" />;
      case 'HeartHandshake': return <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" />;
      case 'Store': return <Store className="w-3.5 h-3.5 text-teal-600" />;
      case 'ShoppingBag': return <ShoppingBag className="w-3.5 h-3.5 text-indigo-600" />;
      case 'MessageCircle': return <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />;
      default: return <Zap className="w-3.5 h-3.5 text-amber-500" />;
    }
  };

  const handleActionClick = (item: NavigationLinkItem) => {
    if (!item) return;
    const itemId = item.id || '';
    if (item.isExternal && itemId === 'act-whatsapp') {
      window.open(`https://wa.me/${siteConfig.contact.whatsappNumber}?text=Vanakkam%20Parakkai%20Temple%20Seva`, '_blank');
      return;
    }

    if (itemId === 'act-book-darshan' || itemId === 'act-book-pooja') {
      if (onOpenBookingModal) {
        onOpenBookingModal();
        return;
      }
    }

    if (itemId === 'act-concern') {
      if (onOpenConcernModal) {
        onOpenConcernModal();
        return;
      }
    }

    if (itemId === 'act-idea' || itemId === 'act-feedback') {
      if (onOpenIdeaModal) {
        onOpenIdeaModal();
        return;
      }
    }

    onNavigate(item.targetView);
  };

  return (
    <aside
      id="parakkai-action-right-rail"
      className={`hidden 2xl:flex flex-col border rounded-2xl transition-all duration-200 select-none z-20 h-full overflow-hidden shrink-0 shadow-lg ${
        isCollapsed ? 'w-14' : 'w-56'
      }`}
      style={{
        backgroundColor: activeTheme.colors.surfaceElevated || '#03162b',
        borderColor: activeTheme.colors.borderSubtle || 'rgba(0, 227, 253, 0.2)'
      }}
    >
      {/* Rail Header with Toggle */}
      <div
        className="px-3 py-2 border-b flex items-center justify-between shrink-0 border-[#00e3fd]/20"
      >
        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-[#052b4f] transition-colors cursor-pointer"
          title={isCollapsed ? 'Expand Action Rail' : 'Collapse Action Rail'}
        >
          {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>

        {!isCollapsed && (
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-amber-300">
              ACTION DESK
            </span>
          </div>
        )}
      </div>

      {/* Action Items List - 9 contextual actions */}
      <div className="p-1.5 space-y-1 flex-1 overflow-hidden flex flex-col justify-between">
        <div className="space-y-0.5">
          {rightItems.slice(0, 9).map((item: NavigationLinkItem) => {
            const isSelected = currentView === item.targetView && !item.isExternal;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleActionClick(item)}
                className={`w-full px-2 py-1 rounded-xl text-left transition-all flex items-center gap-2 cursor-pointer group border text-xs ${
                  isSelected
                    ? 'border-amber-400/60 bg-amber-500/20 text-amber-200 font-semibold shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                    : 'border-transparent hover:border-[#00e3fd]/30 hover:bg-[#052b4f]/70 text-slate-300 hover:text-white'
                }`}
                title={item.label}
              >
                <div
                  className={`p-1 rounded-lg flex items-center justify-center transition-colors shrink-0 ${
                    (item.id || '').includes('book')
                      ? 'bg-amber-500/20 text-amber-300 group-hover:bg-amber-500 group-hover:text-black'
                      : item.id === 'act-whatsapp'
                      ? 'bg-emerald-500/20 text-emerald-300 group-hover:bg-emerald-500 group-hover:text-black'
                      : 'bg-[#020914] text-slate-400 group-hover:text-[#00e3fd]'
                  }`}
                >
                  {getActionIcon(item.iconName)}
                </div>

                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[11.5px] font-medium truncate group-hover:text-amber-300 transition-colors">
                        {item.label}
                      </span>
                      {item.isExternal ? (
                        <ExternalLink className="w-3 h-3 text-slate-400 shrink-0" />
                      ) : (
                        item.badge && (
                          <span className="text-[8.5px] px-1.5 py-0.2 rounded-full font-mono bg-amber-500/20 text-amber-300 font-bold border border-amber-400/30 shrink-0">
                            {item.badge}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Official WhatsApp Seva Quick CTA */}
        {!isCollapsed && (
          <div className="p-2 mt-1 rounded-xl border border-emerald-500/30 bg-[#020914]/90 text-left space-y-1 shrink-0">
            <div className="flex items-center justify-between text-[11px] font-bold text-emerald-300">
              <div className="flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Temple WhatsApp</span>
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <p className="text-[9px] text-slate-400 font-sans leading-snug">
              Direct Archana sankalpam & inquiries
            </p>
            <a
              href={`https://wa.me/${siteConfig.contact.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center py-1 px-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-medium transition-colors cursor-pointer shadow-sm"
            >
              Chat with Seva Desk
            </a>
          </div>
        )}
      </div>
    </aside>
  );
};
