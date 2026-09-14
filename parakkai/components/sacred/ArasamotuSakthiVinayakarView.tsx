import React from "react";
import { ExternalLink, MapPin, PlayCircle, Radio, Sparkles, Youtube } from "lucide-react";
import { ParakkaiThemeDefinition } from "../../contracts/theme";

interface ArasamotuSakthiVinayakarViewProps {
  activeTheme: ParakkaiThemeDefinition;
}

const channelId =
  (import.meta as ImportMeta & { env?: Record<string, string> }).env
    ?.VITE_PARAKKAI_VINAYAKAR_YOUTUBE_CHANNEL_ID || "";

const liveSearchUrl =
  "https://www.youtube.com/results?search_query=Arasamotu+Sakthi+Vinayakar+Parakkai+live";

const liveEmbedUrl = channelId
  ? `https://www.youtube.com/embed/live_stream?channel=${encodeURIComponent(channelId)}&autoplay=0&rel=0&modestbranding=1`
  : "";

export const ArasamotuSakthiVinayakarView: React.FC<ArasamotuSakthiVinayakarViewProps> = ({
  activeTheme,
}) => {
  return (
    <div id="parakkai-sakthi-vinayakar" className="w-full space-y-8 py-4 animate-fadeIn pb-12">
      <section
        className="rounded-3xl border p-6 sm:p-10 relative overflow-hidden"
        style={{
          backgroundColor: activeTheme.colors.surfaceElevated,
          borderColor: activeTheme.colors.borderGold,
        }}
      >
        <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full blur-3xl bg-amber-400/10 pointer-events-none" />
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-mono font-bold uppercase tracking-widest"
            style={{
              color: activeTheme.colors.textGold,
              borderColor: activeTheme.colors.borderGold,
              backgroundColor: `${activeTheme.colors.sacredGold}14`,
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sakthi Vinayakar • Arasamotu</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight" style={{ color: activeTheme.colors.textPrimary }}>
            Arasamotu Sakthi Vinayakar
          </h1>

          <p className="text-sm sm:text-base leading-relaxed max-w-3xl" style={{ color: activeTheme.colors.textSecondary }}>
            A dedicated Parakkai sacred-station experience for devotees, with live devotional media,
            shrine information, directions and a direct path back into the wider Parakkai pilgrimage circuit.
          </p>

          <div className="flex flex-wrap gap-2.5 pt-2">
            <a
              href={liveSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-serif font-bold"
              style={{ backgroundColor: activeTheme.colors.sacredGold, color: "#000" }}
            >
              <Youtube className="w-4 h-4" />
              Find Live on YouTube
            </a>
            <a
              href="https://maps.google.com/?q=Arasamotu+Sakthi+Vinayakar+Parakkai+Kanyakumari"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-medium"
              style={{
                color: activeTheme.colors.textSecondary,
                borderColor: activeTheme.colors.borderSubtle,
                backgroundColor: activeTheme.colors.surfaceCard,
              }}
            >
              <MapPin className="w-4 h-4" />
              Open Shrine Map
            </a>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.8fr)] gap-6 items-start">
        <div
          className="rounded-3xl border overflow-hidden"
          style={{
            backgroundColor: activeTheme.colors.surfaceCanvas,
            borderColor: activeTheme.colors.borderGold,
          }}
        >
          <div
            className="px-4 py-3 border-b flex items-center justify-between gap-3"
            style={{ borderColor: activeTheme.colors.borderSubtle }}
          >
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-red-400" />
              <div>
                <div className="text-xs font-bold uppercase tracking-wider" style={{ color: activeTheme.colors.textPrimary }}>
                  Live YouTube Darshan
                </div>
                <div className="text-[10px] font-mono" style={{ color: activeTheme.colors.textSecondary }}>
                  Live source is configuration-driven; no credentials are required in the browser.
                </div>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-red-300">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              LIVE
            </span>
          </div>

          <div className="aspect-video w-full bg-black">
            {liveEmbedUrl ? (
              <iframe
                src={liveEmbedUrl}
                title="Arasamotu Sakthi Vinayakar Live YouTube Darshan"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-8">
                <PlayCircle className="w-12 h-12 text-red-400 mb-4" />
                <h2 className="text-lg font-serif font-bold text-white">Live channel not yet configured</h2>
                <p className="mt-2 max-w-md text-xs text-slate-400">
                  The page is fully wired for a YouTube live channel. Set
                  <code className="mx-1 text-slate-200">VITE_PARAKKAI_VINAYAKAR_YOUTUBE_CHANNEL_ID</code>
                  to the shrine's YouTube channel ID to activate the embedded live player.
                </p>
                <a
                  href={liveSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-red-500"
                >
                  <Youtube className="w-4 h-4" />
                  Search YouTube Live
                </a>
              </div>
            )}
          </div>
        </div>

        <aside
          className="rounded-3xl border p-5 space-y-5"
          style={{
            backgroundColor: activeTheme.colors.surfaceElevated,
            borderColor: activeTheme.colors.borderGold,
          }}
        >
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest" style={{ color: activeTheme.colors.textGold }}>
              Sacred Station
            </div>
            <h2 className="mt-1 text-xl font-serif font-bold" style={{ color: activeTheme.colors.textPrimary }}>
              அரசமூட்டு சக்தி விநாயகர்
            </h2>
          </div>

          <div className="space-y-3 text-xs leading-relaxed" style={{ color: activeTheme.colors.textSecondary }}>
            <p>
              The Parakkai circuit presents this shrine as an auspicious first-prayer station associated
              with the sacred peepal-tree setting.
            </p>
            <p>
              Use the live media panel for devotional viewing, the map action for navigation, and the
              surrounding Parakkai experiences for temple, lake and pilgrimage discovery.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <InfoTile label="Station" value="S-06" theme={activeTheme} />
            <InfoTile label="Circuit" value="Parakkai" theme={activeTheme} />
            <InfoTile label="Category" value="Sacred Shrine" theme={activeTheme} />
            <InfoTile label="Live" value={channelId ? "Configured" : "Pending"} theme={activeTheme} />
          </div>
        </aside>
      </section>

      <section
        className="rounded-3xl border p-5 sm:p-6"
        style={{
          backgroundColor: activeTheme.colors.surfaceCanvas,
          borderColor: activeTheme.colors.borderSubtle,
        }}
      >
        <div className="flex items-center gap-2">
          <ExternalLink className="w-4 h-4" style={{ color: activeTheme.colors.textGold }} />
          <h3 className="font-serif font-bold" style={{ color: activeTheme.colors.textPrimary }}>
            Full Station Experience
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
          {[
            ["Live Darshan", "YouTube live player and fallback discovery"],
            ["Sacred Map", "Open the shrine in Google Maps / GPS"],
            ["Parakkai Circuit", "Return to Temple, Lake and 7-station experiences"],
          ].map(([title, detail]) => (
            <div
              key={title}
              className="rounded-2xl border p-4"
              style={{ backgroundColor: activeTheme.colors.surfaceCard, borderColor: activeTheme.colors.borderSubtle }}
            >
              <div className="text-sm font-semibold" style={{ color: activeTheme.colors.textPrimary }}>{title}</div>
              <div className="mt-1 text-xs" style={{ color: activeTheme.colors.textSecondary }}>{detail}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

function InfoTile({ label, value, theme }: { label: string; value: string; theme: ParakkaiThemeDefinition }) {
  return (
    <div
      className="rounded-xl border p-3"
      style={{ backgroundColor: theme.colors.surfaceCard, borderColor: theme.colors.borderSubtle }}
    >
      <div className="text-[9px] font-mono uppercase" style={{ color: theme.colors.textSecondary }}>{label}</div>
      <div className="mt-1 text-xs font-bold" style={{ color: theme.colors.textGold }}>{value}</div>
    </div>
  );
}
