/**
 * P-PARAKKAI-001
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * IP Owner: ArchitectAny / Vijay Kumar K.
 * Status: ACTIVE
 * Version: v0.1.0
 */

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Sun,
  Menu,
  X,
  Compass,
  ShoppingBag,
  User,
  Shield,
  Palette,
  Home,
  Calendar,
  Flame,
  PlaySquare,
  Store,
  Users,
  MapPin,
  Clock,
  ArrowRight
} from 'lucide-react';
import { SiteBrandConfig, NavigationLinkItem } from '../../contracts/brand';
import { ParakkaiThemeDefinition } from '../../contracts/theme';
import { ParakkaiUser } from '../../contracts/user';
import { parakkaiService } from '../../services/parakkaiService';

interface ParakkaiHeaderProps {
  siteConfig: SiteBrandConfig;
  activeTheme: ParakkaiThemeDefinition;
  currentUser: ParakkaiUser;
  currentView: string;
  cartCount: number;
  onNavigate: (view: string) => void;
  onOpenCart: () => void;
  onOpenAuth: () => void;
  onOpenThemeModal: () => void;
  onOpenAdmin: () => void;
  onReturnToUniverse?: () => void;
}

export const ParakkaiHeader: React.FC<ParakkaiHeaderProps> = ({
  siteConfig,
  activeTheme,
  currentUser,
  currentView,
  cartCount,
  onNavigate,
  onOpenCart,
  onOpenAuth,
  onOpenThemeModal,
  onOpenAdmin,
  onReturnToUniverse
}) => {
  const [currentTime, setCurrentTime] = useState('');
  const [sunlightStatus, setSunlightStatus] = useState(() => parakkaiService.getSunlightMiracleStatus());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })
      );
      setSunlightStatus(parakkaiService.getSunlightMiracleStatus());
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navConfig = parakkaiService.getNavigationConfig();
  const navLinks = (navConfig && Array.isArray(navConfig.headerLinks)) ? navConfig.headerLinks : [];

  const getNavIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home': return <Home className="w-4 h-4" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4" />;
      case 'Calendar': return <Calendar className="w-4 h-4" />;
      case 'Flame': return <Flame className="w-4 h-4" />;
      case 'PlaySquare': return <PlaySquare className="w-4 h-4" />;
      case 'Store': return <Store className="w-4 h-4" />;
      case 'ShoppingBag': return <ShoppingBag className="w-4 h-4" />;
      case 'Users': return <Users className="w-4 h-4" />;
      case 'MapPin': return <MapPin className="w-4 h-4" />;
      default: return <Compass className="w-4 h-4" />;
    }
  };

  return (
    <header
      id="parakkai-master-header"
      className="sticky top-0 z-50 w-full backdrop-blur-md transition-all duration-300 border-b shrink-0 shadow-xs"
      style={{
        backgroundColor: activeTheme.colors.surfaceElevated,
        borderColor: activeTheme.colors.borderSubtle
      }}
    >
      {/* Top Auspicious Inscription & 6:30 AM Miracle Ticker */}
      <div
        className="w-full px-4 py-0.5 sm:py-1 flex items-center justify-between text-[11px] font-sans border-b overflow-x-auto whitespace-nowrap"
        style={{
          backgroundColor: activeTheme.colors.surfaceCard,
          borderColor: activeTheme.colors.borderSubtle,
          color: activeTheme.colors.textSecondary
        }}
      >
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-semibold" style={{ color: activeTheme.colors.textGold }}>
            <span className="text-xs">🪷</span>
            <span>அருள்மிகு ஸ்ரீதேவி பூதேவி சமேத மதுசூதன பெருமாள் திருக்கோவில் — பறக்கை</span>
          </span>
          <span className="hidden md:inline opacity-30">|</span>
          <span className="hidden md:inline font-medium" style={{ color: activeTheme.colors.textSecondary }}>
            Kanyakumari District • Sannadhi Street • Tamil Nadu
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          {/* 6:30 AM Sunlight Indicator */}
          <div
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium border ${
              sunlightStatus.isMiracleWindow
                ? 'bg-amber-100 text-amber-900 border-amber-400 animate-pulse font-bold'
                : 'bg-sky-50 text-sky-800 border-sky-200'
            }`}
          >
            <Sun className={`w-3 h-3 ${sunlightStatus.isMiracleWindow ? 'text-amber-500 animate-spin-slow' : 'text-amber-500'}`} />
            {sunlightStatus.isMiracleWindow ? (
              <span>ACTIVE: 6:30 AM Sunlight at Lotus Feet!</span>
            ) : (
              <span>6:30 AM Sunlight: in {Math.floor(sunlightStatus.minutesUntilNextMiracle / 60)}h {sunlightStatus.minutesUntilNextMiracle % 60}m</span>
            )}
          </div>

          {/* Real-time Clock */}
          <div className="hidden sm:flex items-center gap-1 font-mono text-[10.5px]" style={{ color: activeTheme.colors.textSecondary }}>
            <Clock className="w-3 h-3 text-slate-400" />
            <span>{currentTime || '06:30:00 AM'}</span>
          </div>

          {/* Jump to AAi Universe Button */}
          {onReturnToUniverse && (
            <button
              type="button"
              onClick={onReturnToUniverse}
              className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#03162b] hover:bg-[#052b4f] text-[#00e3fd] border border-[#00e3fd]/30 transition-colors flex items-center gap-1 cursor-pointer"
              title="Return to AAi Solution Universe"
            >
              <Compass className="w-3 h-3 text-[#00e3fd]" />
              <span>AAi Universe</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Navigation Bar (Compact h-13 sm:h-14) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-13 sm:h-14 flex items-center justify-between gap-4">
        {/* Brand & Identity */}
        <div
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          {/* Sacred Temple Lotus Emblem */}
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center font-serif text-lg shadow-sm transition-transform group-hover:scale-105 border" style={{ backgroundColor: activeTheme.colors.surfaceCard, borderColor: activeTheme.colors.borderGold, color: activeTheme.colors.textGold }}
          >
            🪷
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span
                className="text-base sm:text-lg font-bold tracking-tight font-serif transition-colors" style={{ color: activeTheme.colors.textGold }}
              >
                {siteConfig.name}
              </span>
              <span
                className="text-[10px] px-2 py-0.2 rounded-full font-semibold hidden sm:inline border" style={{ backgroundColor: activeTheme.colors.surfaceCard, color: activeTheme.colors.primarySkyBlue, borderColor: activeTheme.colors.borderSubtle }}
              >
                Living Temple
              </span>
            </div>
            <span
              className="text-[10.5px] truncate max-w-[200px] sm:max-w-[340px] font-sans" style={{ color: activeTheme.colors.textSecondary }}
            >
              {siteConfig.displayName}
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link: NavigationLinkItem) => {
            const isActive = currentView === link.targetView;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => onNavigate(link.targetView)}
                className={`relative px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer border ${isActive ? "font-bold" : ""}`} style={isActive ? { color: activeTheme.colors.textPrimary, backgroundColor: activeTheme.colors.surfaceCard, borderColor: activeTheme.colors.borderSubtle } : { color: activeTheme.colors.textSecondary }}
              >
                {getNavIcon(link.iconName)}
                <span>{link.label}</span>
                {link.badge && (
                  <span
                    className="ml-0.5 text-[8.5px] px-1.5 py-0.2 rounded-full font-bold uppercase tracking-wider border" style={{ backgroundColor: activeTheme.colors.surfaceCard, color: activeTheme.colors.textGold, borderColor: activeTheme.colors.borderGold }}
                  >
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions & Utilities */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Theme Quick Switcher */}
          <button
            type="button"
            onClick={onOpenThemeModal}
            className="p-1.5 rounded-lg transition-colors border cursor-pointer" style={{ color: activeTheme.colors.textSecondary, borderColor: activeTheme.colors.borderSubtle, backgroundColor: activeTheme.colors.surfaceCanvas }}
            title={`Active Theme: ${activeTheme.name}`}
            aria-label="Change Theme"
          >
            <Palette className="w-4 h-4" />
          </button>

          {/* Hypermarket Cart */}
          <button
            type="button"
            onClick={onOpenCart}
            className="relative p-1.5 rounded-lg transition-colors border cursor-pointer" style={{ color: activeTheme.colors.textSecondary, backgroundColor: activeTheme.colors.surfaceCanvas, borderColor: activeTheme.colors.borderSubtle }}
            title="Open Parakkai Hypermarket Cart"
            aria-label="View Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-black bg-amber-400 shadow font-bold"
              >
                {cartCount}
              </span>
            )}
          </button>

          {/* Admin Portal Quick Access */}
          <button
            type="button"
            onClick={onOpenAdmin}
            className="px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all border cursor-pointer" style={{ color: activeTheme.colors.textSecondary, backgroundColor: activeTheme.colors.surfaceCard, borderColor: activeTheme.colors.borderSubtle }} title="Open Parakkai Admin Control Console"
          >
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Admin</span>
          </button>

          {/* User Account / Role Badge */}
          <button
            type="button"
            onClick={onOpenAuth}
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 transition-all border cursor-pointer" style={{ color: activeTheme.colors.textPrimary, backgroundColor: activeTheme.colors.surfaceCard, borderColor: activeTheme.colors.borderSubtle }}
            title={`Logged in as ${currentUser.name} (${currentUser.role})`}
          >
            <User className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden md:inline font-mono text-[11px] max-w-[90px] truncate">
              {currentUser.role}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg transition-colors cursor-pointer" style={{ color: activeTheme.colors.textSecondary }}
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden border-t px-4 py-4 space-y-2 animate-fadeIn"
          style={{
            backgroundColor: activeTheme.colors.surfaceElevated,
            borderColor: activeTheme.colors.borderSubtle
          }}
        >
          <div className="grid grid-cols-2 gap-2 mb-3">
            {navLinks.map((link: NavigationLinkItem) => (
              <button
                key={link.id}
                type="button"
                onClick={() => {
                  onNavigate(link.targetView);
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-lg text-xs font-medium flex items-center gap-2 text-left border ${
                  currentView === link.targetView
                    ? 'bg-sky-900/40 text-amber-300 border-amber-500/40 font-bold'
                    : 'bg-slate-900/50 text-slate-300 border-slate-800'
                }`}
              >
                {getNavIcon(link.iconName)}
                <div className="flex flex-col">
                  <span>{link.label}</span>
                  {link.tamilLabel && <span className="text-[10px] opacity-70 font-sans">{link.tamilLabel}</span>}
                </div>
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="text-xs text-amber-300 flex items-center gap-1.5 font-medium"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Console</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onOpenThemeModal();
                setMobileMenuOpen(false);
              }}
              className="text-xs text-sky-300 flex items-center gap-1.5 font-medium"
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Switch Theme</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
