import React, { useState } from "react";
import { CalendarDays, Home, Map, MapPin, Menu, ShoppingBag, Users, Video, X } from "lucide-react";

const NAVIGATION = [
  { id: "home", label: "Home", icon: Home },
  { id: "today", label: "Today", icon: CalendarDays },
  { id: "events", label: "Events", icon: CalendarDays },
  { id: "media", label: "Media", icon: Video },
  { id: "stories", label: "Stories", icon: Video },
  { id: "community", label: "Community", icon: Users },
  { id: "nearby", label: "Nearby", icon: MapPin },
  { id: "marketplace", label: "Marketplace", icon: ShoppingBag },
  { id: "map", label: "Map", icon: Map },
] as const;

const CAPABILITY_COPY: Record<string, string> = {
  home: "NGLiving home and application entry experience.",
  today: "Daily information and activity experience.",
  events: "Discover and navigate NGLiving events.",
  media: "Explore NGLiving media and content.",
  stories: "Read NGLiving stories and articles.",
  community: "Participate in the NGLiving community.",
  nearby: "Discover nearby places and services.",
  marketplace: "Access NGLiving marketplace capabilities.",
  map: "Explore the NGLiving spatial and location experience.",
};

export function NGLivingApp() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const selectSection = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
  };

  const active = NAVIGATION.find((item) => item.id === activeSection) ?? NAVIGATION[0];
  const ActiveIcon = active.icon;

  return (
    <section className="min-h-[calc(100dvh-72px)] bg-[#020914] text-[#eaf7ff] flex flex-col">
      <header className="sticky top-0 z-30 border-b border-[#00dfff]/20 bg-[#020914]/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] uppercase tracking-[0.24em] text-[#00dfff] font-mono">ArchitectAny Application</div>
            <h1 className="text-lg font-bold">NGLiving</h1>
          </div>
          <button type="button" onClick={() => setMobileMenuOpen((open) => !open)} className="sm:hidden rounded-xl border border-[#00dfff]/30 bg-[#031526] p-2" aria-label="Open NGLiving navigation">
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <nav className={`${mobileMenuOpen ? "block" : "hidden"} sm:block border-t sm:border-t-0 border-[#00dfff]/10`} aria-label="NGLiving navigation">
          <div className="max-w-7xl mx-auto px-4 py-2 grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
            {NAVIGATION.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => selectSection(id)}
                className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition-colors ${activeSection === id ? "border-[#00e3fd]/60 bg-[#00dfff]/10 text-[#00e3fd]" : "border-white/10 bg-white/[0.03] text-[#a8c4d1] hover:border-[#00dfff]/30"}`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </nav>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 sm:py-12">
        <div className="rounded-3xl border border-[#00dfff]/20 bg-[#031323]/80 p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl border border-[#00dfff]/30 bg-[#00dfff]/10 flex items-center justify-center text-[#00dfff] shrink-0">
              <ActiveIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#00dfff]">NGLiving / {active.id}</div>
              <h2 className="mt-1 text-2xl sm:text-3xl font-bold">{active.label}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#9bb8c7]">{CAPABILITY_COPY[active.id]}</p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {NAVIGATION.slice(0, 3).map(({ id, label, icon: Icon }) => (
              <button key={id} type="button" onClick={() => selectSection(id)} className="rounded-2xl border border-white/10 bg-white/[0.025] p-4 text-left hover:border-[#00dfff]/30 transition-colors">
                <Icon className="w-5 h-5 text-[#00dfff]" />
                <div className="mt-3 font-semibold">{label}</div>
                <div className="mt-1 text-xs text-[#7899aa]">Open capability</div>
              </button>
            ))}
          </div>
        </div>
      </main>
    </section>
  );
}
