import React, { useState, useMemo } from 'react';
import {
  Image,
  Layers,
  Film,
  Music,
  FileText,
  Compass,
  Search,
  Filter,
  ExternalLink,
  Eye,
  Code,
  Tag,
  Check
} from 'lucide-react';
import {
  experienceAssets,
  experienceAssetCollections,
  ExperienceAsset,
  ExperienceAssetType,
  ExperienceAssetScope
} from '@/src/experience/asset';

interface AssetExplorerProps {
  manifestJson: string;
  onChangeManifest: (value: string) => void;
  onSave: () => void;
}

export const AssetExplorer: React.FC<AssetExplorerProps> = ({
  manifestJson,
  onChangeManifest,
  onSave,
}) => {
  const [viewMode, setViewMode] = useState<'catalog' | 'json'>('catalog');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedScope, setSelectedScope] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<ExperienceAsset | null>(experienceAssets[0] ?? null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredAssets = useMemo(() => {
    return experienceAssets.filter((asset) => {
      if (selectedType !== 'ALL' && asset.type !== selectedType) return false;
      if (selectedScope !== 'ALL' && asset.scope !== selectedScope) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = asset.name.toLowerCase().includes(q);
        const matchesDesc = asset.description?.toLowerCase().includes(q) ?? false;
        const matchesTags = asset.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesTags) return false;
      }
      return true;
    });
  }, [selectedType, selectedScope, searchQuery]);

  const copyRef = (id: string) => {
    navigator.clipboard?.writeText?.(id);
    setCopiedId(id);
    window.setTimeout(() => setCopiedId(null), 2000);
  };

  const getTypeIcon = (type: ExperienceAssetType) => {
    switch (type) {
      case 'spatial':
        return <Layers className="w-4 h-4 text-cyan-300" />;
      case 'image':
        return <Image className="w-4 h-4 text-emerald-300" />;
      case 'illustration':
        return <Compass className="w-4 h-4 text-amber-300" />;
      case 'video':
        return <Film className="w-4 h-4 text-rose-300" />;
      case 'audio':
        return <Music className="w-4 h-4 text-purple-300" />;
      default:
        return <FileText className="w-4 h-4 text-slate-300" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Header & View Toggle */}
      <section className="rounded-2xl border border-white/10 bg-[#061525]/90 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase font-mono tracking-[0.25em] text-cyan-300">
            EXPERIENCE ASSET PLATFORM
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mt-1 text-white flex items-center gap-2.5">
            <span>Asset Explorer &amp; Catalog</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 font-mono">
              {experienceAssets.length} indexed
            </span>
          </h2>
          <p className="text-xs text-[#82a5bb] mt-1">
            Browse, inspect, and link digital, spatial, brand, and media assets across all architectural scopes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex rounded-xl border border-white/10 bg-[#020914] p-1">
            <button
              type="button"
              onClick={() => setViewMode('catalog')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'catalog'
                  ? 'bg-cyan-400 text-[#00131f] font-bold shadow-sm'
                  : 'text-[#82a5bb] hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Catalog</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('json')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'json'
                  ? 'bg-cyan-400 text-[#00131f] font-bold shadow-sm'
                  : 'text-[#82a5bb] hover:text-white'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Manifest JSON</span>
            </button>
          </div>
        </div>
      </section>

      {viewMode === 'json' ? (
        <section className="rounded-2xl border border-white/10 bg-[#061525]/90 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-cyan-300">Solution Asset Manifest (JSON)</span>
            <button
              type="button"
              onClick={onSave}
              className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-cyan-400 text-[#00131f] hover:bg-cyan-300 cursor-pointer"
            >
              Save Manifest
            </button>
          </div>
          <textarea
            value={manifestJson}
            onChange={(e) => onChangeManifest(e.target.value)}
            rows={16}
            className="w-full rounded-xl border border-white/10 bg-[#020914] p-4 font-mono text-xs text-cyan-100 outline-none focus:border-cyan-400"
            placeholder="Enter asset manifest JSON..."
          />
        </section>
      ) : (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-[#6e91a6] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search assets by name or tag..."
                className="w-full rounded-xl border border-white/10 bg-[#061525]/80 pl-9 pr-3 py-2 text-xs text-white placeholder-[#6e91a6] outline-none focus:border-cyan-400"
              />
            </div>

            {/* Type Filter */}
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#061525]/80 px-3 py-1.5">
              <span className="text-[10px] font-mono text-[#6e91a6] uppercase tracking-wider">Type:</span>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-transparent text-xs text-white outline-none flex-1 cursor-pointer"
              >
                <option value="ALL" className="bg-[#061525]">All Types</option>
                <option value="spatial" className="bg-[#061525]">Spatial / 3D</option>
                <option value="image" className="bg-[#061525]">Image</option>
                <option value="illustration" className="bg-[#061525]">Illustration / SVG</option>
                <option value="video" className="bg-[#061525]">Video</option>
                <option value="audio" className="bg-[#061525]">Audio</option>
              </select>
            </div>

            {/* Scope Filter */}
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#061525]/80 px-3 py-1.5">
              <span className="text-[10px] font-mono text-[#6e91a6] uppercase tracking-wider">Scope:</span>
              <select
                value={selectedScope}
                onChange={(e) => setSelectedScope(e.target.value)}
                className="bg-transparent text-xs text-white outline-none flex-1 cursor-pointer"
              >
                <option value="ALL" className="bg-[#061525]">All Scopes</option>
                <option value="universe" className="bg-[#061525]">Universe</option>
                <option value="domain" className="bg-[#061525]">Domain</option>
                <option value="solution" className="bg-[#061525]">Solution</option>
              </select>
            </div>
          </div>

          {/* Collections Overview Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-[10px] font-mono text-[#6e91a6] uppercase shrink-0">Collections:</span>
            {experienceAssetCollections.map((col) => (
              <button
                key={col.id}
                type="button"
                onClick={() => setSearchQuery(col.name.split(' ')[0])}
                className="px-2.5 py-1 rounded-lg border border-white/10 bg-[#061525]/60 hover:border-cyan-400/30 text-[#82a5bb] hover:text-white shrink-0 font-mono text-[11px] cursor-pointer"
              >
                {col.name} ({col.assetIds.length})
              </button>
            ))}
          </div>

          {/* Master Content: Asset Grid & Preview Inspector */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5 items-start">
            {/* Asset Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredAssets.length === 0 ? (
                <div className="col-span-full rounded-2xl border border-dashed border-white/10 p-8 text-center text-xs text-[#6e91a6]">
                  No assets found matching the selected filters.
                </div>
              ) : (
                filteredAssets.map((asset) => {
                  const isSelected = selectedAsset?.id === asset.id;
                  return (
                    <div
                      key={asset.id}
                      onClick={() => setSelectedAsset(asset)}
                      className={`rounded-2xl border p-3.5 transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                        isSelected
                          ? 'border-cyan-400 bg-cyan-400/10 shadow-[0_0_20px_rgba(0,227,253,0.12)]'
                          : 'border-white/10 bg-[#061525]/80 hover:border-white/20 hover:bg-[#061525]'
                      }`}
                    >
                      <div>
                        {/* Thumbnail / Preview Stage */}
                        <div className="w-full h-32 rounded-xl border border-white/10 bg-[#020914] overflow-hidden flex items-center justify-center relative group">
                          {asset.type === 'image' || asset.type === 'spatial' || asset.type === 'illustration' ? (
                            <img
                              src={asset.thumbnailUrl || asset.url}
                              alt={asset.altText || asset.name}
                              className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform"
                            />
                          ) : (
                            <div className="flex flex-col items-center gap-2 text-[#6e91a6]">
                              {getTypeIcon(asset.type)}
                              <span className="text-[10px] font-mono">{asset.format?.toUpperCase()}</span>
                            </div>
                          )}
                          <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md text-[9px] font-mono font-bold uppercase bg-black/60 backdrop-blur-sm text-cyan-300 border border-white/10">
                            {asset.type}
                          </span>
                        </div>

                        {/* Details */}
                        <div className="mt-3">
                          <h4 className="text-sm font-semibold text-white truncate" title={asset.name}>
                            {asset.name}
                          </h4>
                          <p className="text-[11px] text-[#82a5bb] line-clamp-2 mt-1 leading-relaxed">
                            {asset.description || 'No description provided.'}
                          </p>
                        </div>
                      </div>

                      {/* Footer & Meta */}
                      <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-[#6e91a6]">
                        <span className="capitalize">{asset.scope} scope</span>
                        {asset.dimensions && (
                          <span>{asset.dimensions.width}x{asset.dimensions.height}</span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Inspector Panel */}
            <aside className="rounded-2xl border border-white/10 bg-[#061525]/90 p-5 space-y-4 lg:sticky lg:top-4">
              {selectedAsset ? (
                <>
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-mono tracking-wider text-cyan-300">
                        Asset Inspector
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-mono border border-cyan-400/20 text-cyan-200">
                        {selectedAsset.scope}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white mt-1">
                      {selectedAsset.name}
                    </h3>
                  </div>

                  {/* Preview Container */}
                  <div className="w-full h-44 rounded-xl border border-white/10 bg-[#020914] overflow-hidden flex items-center justify-center p-3 relative">
                    {selectedAsset.type === 'image' || selectedAsset.type === 'spatial' || selectedAsset.type === 'illustration' ? (
                      <img
                        src={selectedAsset.url}
                        alt={selectedAsset.altText || selectedAsset.name}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-cyan-300">
                        {getTypeIcon(selectedAsset.type)}
                        <span className="text-xs font-mono">{selectedAsset.format?.toUpperCase()} Media</span>
                      </div>
                    )}
                  </div>

                  {/* Key Properties */}
                  <div className="space-y-2 border-t border-white/5 pt-3 text-xs">
                    <div className="flex items-center justify-between py-1 border-b border-white/5">
                      <span className="text-[#6e91a6]">Identifier:</span>
                      <button
                        type="button"
                        onClick={() => copyRef(selectedAsset.id)}
                        className="font-mono text-cyan-300 hover:underline flex items-center gap-1 cursor-pointer"
                        title="Click to copy asset identifier"
                      >
                        {copiedId === selectedAsset.id ? <Check className="w-3 h-3 text-emerald-400" /> : null}
                        <span>{selectedAsset.id}</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between py-1 border-b border-white/5">
                      <span className="text-[#6e91a6]">Asset URL:</span>
                      <a
                        href={selectedAsset.url}
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono text-cyan-300 hover:underline flex items-center gap-1 truncate max-w-[180px]"
                      >
                        <span className="truncate">{selectedAsset.url}</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    </div>

                    {selectedAsset.dimensions && (
                      <div className="flex items-center justify-between py-1 border-b border-white/5">
                        <span className="text-[#6e91a6]">Dimensions:</span>
                        <span className="font-mono text-[#cfeaf5]">
                          {selectedAsset.dimensions.width} × {selectedAsset.dimensions.height} ({selectedAsset.dimensions.aspectRatio})
                        </span>
                      </div>
                    )}

                    {selectedAsset.format && (
                      <div className="flex items-center justify-between py-1 border-b border-white/5">
                        <span className="text-[#6e91a6]">Format:</span>
                        <span className="font-mono text-[#cfeaf5] uppercase">{selectedAsset.format}</span>
                      </div>
                    )}

                    {selectedAsset.author && (
                      <div className="flex items-center justify-between py-1 border-b border-white/5">
                        <span className="text-[#6e91a6]">Author / Source:</span>
                        <span className="text-[#cfeaf5] truncate max-w-[180px]">{selectedAsset.author}</span>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="pt-2">
                    <div className="text-[10px] font-mono text-[#6e91a6] uppercase mb-1.5 flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      <span>Semantic Tags</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedAsset.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/5 border border-white/10 text-[#cfeaf5]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-xs text-[#6e91a6]">
                  Select an asset to view detailed inspection metadata.
                </div>
              )}
            </aside>
          </div>
        </div>
      )}
    </div>
  );
};
