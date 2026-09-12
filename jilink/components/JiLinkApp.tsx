import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MapPin, Search, Plus, Edit, Trash2, X, Image as ImageIcon, 
  Map as MapIcon, Grid, List as ListIcon, Shield, LogOut, Check
} from "lucide-react";
import { CATEGORIES, INITIAL_ADS } from "../data/initialData";
import { JiLinkAd } from "../types";

export function JiLinkApp({ onExitToAAi, context }: { onExitToAAi?: () => void; context?: any }) {
  const [ads, setAds] = useState<JiLinkAd[]>(INITIAL_ADS);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"map" | "grid">("grid");
  
  // Auth state
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });

  // Admin state
  const [editingAd, setEditingAd] = useState<JiLinkAd | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const filteredAds = useMemo(() => {
    if (activeCategory === "all") return ads;
    return ads.filter(ad => ad.category === activeCategory);
  }, [ads, activeCategory]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username === "admin" && loginForm.password === "admin") {
      setIsAdmin(true);
      setShowLogin(false);
      setLoginForm({ username: "", password: "" });
    } else {
      alert("Invalid credentials. Try admin/admin");
    }
  };

  const handleSaveAd = (ad: JiLinkAd) => {
    if (ads.some(a => a.id === ad.id)) {
      setAds(ads.map(a => a.id === ad.id ? ad : a));
    } else {
      setAds([{ ...ad, id: `ad-${Date.now()}`, createdAt: new Date().toISOString() }, ...ads]);
    }
    setIsEditing(false);
    setEditingAd(null);
  };

  const handleDeleteAd = (id: string) => {
    if (confirm("Are you sure you want to delete this ad?")) {
      setAds(ads.filter(a => a.id !== id));
    }
  };

  return (
    <div className="flex flex-col w-full h-full min-h-[calc(100vh-74px)] bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 shadow-sm flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-md">
            Ji
          </div>
          <div>
            <h1 className="text-xl font-bold leading-tight">JiLink Network</h1>
            <p className="text-xs text-slate-500 font-medium">AAi-v2 Location Aware Protocol</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex bg-slate-100 p-1 rounded-lg">
            <button 
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md flex items-center gap-2 text-sm font-medium transition-colors ${viewMode === "grid" ? "bg-white shadow-sm text-blue-600" : "text-slate-600 hover:text-slate-900"}`}
            >
              <Grid className="w-4 h-4" /> Grid
            </button>
            <button 
              onClick={() => setViewMode("map")}
              className={`p-2 rounded-md flex items-center gap-2 text-sm font-medium transition-colors ${viewMode === "map" ? "bg-white shadow-sm text-blue-600" : "text-slate-600 hover:text-slate-900"}`}
            >
              <MapIcon className="w-4 h-4" /> Map
            </button>
          </div>

          {isAdmin ? (
            <div className="flex items-center gap-3">
              <button 
                onClick={() => { setEditingAd({ id: "", title: "", description: "", category: "real-estate", imageUrl: "", location: { lat: 0, lng: 0, address: "" }, price: "" } as any); setIsEditing(true); }}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
              >
                <Plus className="w-4 h-4" /> Post Ad
              </button>
              <button 
                onClick={() => setIsAdmin(false)}
                className="flex items-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2 rounded-lg font-medium transition-colors text-sm"
              >
                <LogOut className="w-4 h-4" /> Exit Admin
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              {onExitToAAi && (
                <button 
                  onClick={onExitToAAi}
                  className="flex items-center gap-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                >
                  Return to AAi Universe
                </button>
              )}
              <button 
                onClick={() => setShowLogin(true)}
                className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
              >
                <Shield className="w-4 h-4" /> Admin Login
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar (Categories & Filters) */}
        <div className="w-64 bg-white border-r border-slate-200 overflow-y-auto p-4 flex flex-col gap-6 shrink-0">
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Categories</h3>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => setActiveCategory("all")}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeCategory === "all" ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-100"}`}
              >
                <ListIcon className="w-4 h-4" /> All Listings
              </button>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeCategory === cat.id ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-100"}`}
                >
                  <Grid className="w-4 h-4" /> {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Location Context</h3>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Current Area</p>
                <p className="text-xs text-slate-500 mt-1">Showing results within 50km of simulated user location.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main View Area */}
        <div className="flex-1 overflow-y-auto bg-slate-50 p-6 relative">
          <AnimatePresence mode="wait">
            {viewMode === "grid" ? (
              <motion.div 
                key="grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredAds.map((ad, idx) => (
                  <AdCard key={ad.id} ad={ad} isAdmin={isAdmin} onEdit={() => { setEditingAd(ad); setIsEditing(true); }} onDelete={() => handleDeleteAd(ad.id)} index={idx} />
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="map"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="w-full h-full min-h-[500px] bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden relative flex items-center justify-center"
              >
                {/* Mock Map Background */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}></div>
                <div className="absolute inset-0 bg-blue-50/50"></div>
                
                {/* Map Pins */}
                {filteredAds.map((ad, i) => (
                  <motion.div 
                    key={ad.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="absolute"
                    style={{
                      // Mocking coordinates for visual map spread
                      left: `${30 + (i * 15 + (ad.location.lng % 10)) % 40}%`,
                      top: `${20 + (i * 25 + (ad.location.lat % 10)) % 60}%`,
                    }}
                  >
                    <div className="group relative flex flex-col items-center cursor-pointer">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white z-10 hover:scale-110 transition-transform">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div className="w-2 h-2 bg-blue-600/30 rounded-full mt-1 blur-[2px]"></div>
                      
                      {/* Map Tooltip */}
                      <div className="absolute bottom-full mb-3 w-48 bg-white rounded-xl shadow-xl border border-slate-100 p-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                        <img src={ad.imageUrl} alt={ad.title} className="w-full h-20 object-cover rounded-lg mb-2" />
                        <h4 className="text-sm font-bold truncate">{ad.title}</h4>
                        <p className="text-xs text-blue-600 font-bold mt-1">{ad.price}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                <div className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow-md border border-slate-200 text-xs font-medium text-slate-500">
                  AAi-v2 Spatial Map Engine
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {filteredAds.length === 0 && (
            <div className="w-full py-20 flex flex-col items-center justify-center text-slate-400">
              <Search className="w-12 h-12 mb-4 opacity-50" />
              <p className="text-lg font-medium">No listings found in this category.</p>
            </div>
          )}
        </div>
      </div>

      {/* Login Modal */}
      <AnimatePresence>
        {showLogin && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" /> Admin Login
                </h2>
                <button onClick={() => setShowLogin(false)} className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/50">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleLogin} className="p-6 flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Username (admin)</label>
                  <input 
                    type="text" 
                    value={loginForm.username}
                    onChange={e => setLoginForm({...loginForm, username: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Password (admin)</label>
                  <input 
                    type="password" 
                    value={loginForm.password}
                    onChange={e => setLoginForm({...loginForm, password: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <button type="submit" className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors">
                  Sign In
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit/Add Modal */}
      <AnimatePresence>
        {isEditing && editingAd && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white p-6 border-b border-slate-100 flex justify-between items-center z-10">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Edit className="w-5 h-5 text-blue-600" /> {editingAd.id ? "Edit Ad JSON" : "Create New Ad"}
                </h2>
                <button onClick={() => setIsEditing(false)} className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/50">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-5">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                    <input 
                      type="text" 
                      value={editingAd.title}
                      onChange={e => setEditingAd({...editingAd, title: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                    <textarea 
                      rows={3}
                      value={editingAd.description}
                      onChange={e => setEditingAd({...editingAd, description: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                    <select 
                      value={editingAd.category}
                      onChange={e => setEditingAd({...editingAd, category: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                    >
                      {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Price / Info</label>
                    <input 
                      type="text" 
                      value={editingAd.price || ""}
                      onChange={e => setEditingAd({...editingAd, price: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Image URL</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={editingAd.imageUrl}
                        onChange={e => setEditingAd({...editingAd, imageUrl: e.target.value})}
                        className="flex-1 px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="https://..."
                      />
                      {editingAd.imageUrl && (
                        <div className="w-10 h-10 rounded border border-slate-200 overflow-hidden shrink-0">
                          <img src={editingAd.imageUrl} alt="preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-span-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <h4 className="text-sm font-bold mb-3 flex items-center gap-2"><MapPin className="w-4 h-4 text-blue-600"/> Location Details</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <label className="block text-xs font-medium text-slate-500 mb-1">Address</label>
                        <input 
                          type="text" 
                          value={editingAd.location?.address || ""}
                          onChange={e => setEditingAd({...editingAd, location: {...editingAd.location, address: e.target.value}})}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">Latitude</label>
                        <input 
                          type="number" 
                          value={editingAd.location?.lat || 0}
                          onChange={e => setEditingAd({...editingAd, location: {...editingAd.location, lat: parseFloat(e.target.value)}})}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">Longitude</label>
                        <input 
                          type="number" 
                          value={editingAd.location?.lng || 0}
                          onChange={e => setEditingAd({...editingAd, location: {...editingAd.location, lng: parseFloat(e.target.value)}})}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* JSON view for debug/admin power users */}
                  <div className="col-span-2 mt-4">
                     <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Raw JSON Data payload</label>
                     <pre className="bg-slate-900 text-green-400 p-4 rounded-xl text-xs overflow-x-auto">
                       {JSON.stringify(editingAd, null, 2)}
                     </pre>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
                <button 
                  onClick={() => setIsEditing(false)}
                  className="px-5 py-2.5 rounded-lg font-medium text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handleSaveAd(editingAd)}
                  className="px-5 py-2.5 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md shadow-blue-500/20"
                >
                  <Check className="w-4 h-4" /> Save Configuration
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Sub-component for rendering ads
function AdCard({ ad, isAdmin, onEdit, onDelete, index }: { ad: JiLinkAd, isAdmin: boolean, onEdit: () => void, onDelete: () => void, index: number }) {
  const category = CATEGORIES.find(c => c.id === ad.category);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col"
    >
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <img 
          src={ad.imageUrl || "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&h=400&fit=crop"} 
          alt={ad.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          {category?.name || ad.category}
        </div>
        {isAdmin && (
          <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={onEdit} className="p-2 bg-white/90 hover:bg-white text-blue-600 rounded-full shadow-md backdrop-blur-sm">
              <Edit className="w-4 h-4" />
            </button>
            <button onClick={onDelete} className="p-2 bg-white/90 hover:bg-white text-red-600 rounded-full shadow-md backdrop-blur-sm">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="font-bold text-lg text-slate-900 leading-tight line-clamp-2">{ad.title}</h3>
          {ad.price && <span className="font-bold text-blue-600 whitespace-nowrap bg-blue-50 px-2 py-1 rounded-md text-sm">{ad.price}</span>}
        </div>
        <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-1">{ad.description}</p>
        
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate max-w-[150px]">{ad.location?.address || "Location unavailable"}</span>
          </div>
          <span className="text-xs text-slate-400">
            {new Date(ad.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
