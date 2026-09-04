import React, { useState, useRef, useEffect } from 'react';
import {
  ShieldCheck,
  LogOut,
  LogIn,
  UserCheck,
  Key,
  ChevronDown,
  Layers,
  Sparkles,
  Shield,
  ArrowRight,
  Sliders,
} from 'lucide-react';
import { useArchitectAny } from '@/src/context/ArchitectAnyContext';
import { UserRole } from '@/src/contracts/user';

export interface UserMenuProps {
  className?: string;
}

// Role testing configuration presets matching requirement rules
interface RolePreset {
  id: string;
  label: string;
  role: UserRole;
  roles: UserRole[];
  adminExpected: boolean;
}

const ROLE_PRESETS: RolePreset[] = [
  {
    id: 'CHIEF_ARCHITECT',
    label: 'CHIEF_ARCHITECT',
    role: 'CHIEF_ARCHITECT',
    roles: ['DEVELOPER', 'ADMIN', 'CHIEF_ARCHITECT'],
    adminExpected: true,
  },
  {
    id: 'ADMIN',
    label: 'ADMIN',
    role: 'ADMIN',
    roles: ['ADMIN'],
    adminExpected: true,
  },
  {
    id: 'DEVELOPER_AND_ADMIN',
    label: 'DEVELOPER + ADMIN',
    role: 'ADMIN',
    roles: ['DEVELOPER', 'ADMIN'],
    adminExpected: true,
  },
  {
    id: 'DEVELOPER',
    label: 'DEVELOPER',
    role: 'DEVELOPER',
    roles: ['DEVELOPER'],
    adminExpected: false,
  },
  {
    id: 'ARCHITECT',
    label: 'ARCHITECT',
    role: 'ARCHITECT',
    roles: ['ARCHITECT'],
    adminExpected: false,
  },
  {
    id: 'SOLUTION_BUILDER',
    label: 'SOLUTION_BUILDER',
    role: 'SOLUTION_BUILDER',
    roles: ['SOLUTION_BUILDER'],
    adminExpected: false,
  },
  {
    id: 'PROVIDER',
    label: 'PROVIDER',
    role: 'PROVIDER',
    roles: ['PROVIDER'],
    adminExpected: false,
  },
  {
    id: 'SELLER',
    label: 'SELLER',
    role: 'SELLER',
    roles: ['SELLER'],
    adminExpected: false,
  },
  {
    id: 'CLIENT',
    label: 'CLIENT',
    role: 'CLIENT',
    roles: ['CLIENT'],
    adminExpected: false,
  },
  {
    id: 'CUSTOMER',
    label: 'CUSTOMER',
    role: 'CUSTOMER',
    roles: ['CUSTOMER'],
    adminExpected: false,
  },
  {
    id: 'VIEWER',
    label: 'VIEWER',
    role: 'VIEWER',
    roles: ['VIEWER'],
    adminExpected: false,
  },
];

export const UserMenu: React.FC<UserMenuProps> = ({ className = '' }) => {
  const { auth, user, role, roles, permissions, hasAdminAccess, login, logout, setTestProfile } =
    useArchitectAny();
  const [isOpen, setIsOpen] = useState(false);
  const [routeNotice, setRouteNotice] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isAuthenticated = auth.state === 'authenticated' && Boolean(user);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Determine current preset key
  const currentPresetId = (() => {
    if (roles?.includes('DEVELOPER') && roles?.includes('ADMIN') && roles.length === 2) {
      return 'DEVELOPER_AND_ADMIN';
    }
    return role || 'CHIEF_ARCHITECT';
  })();

  const handleRolePresetChange = (presetId: string) => {
    const preset = ROLE_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setTestProfile({
        roles: preset.roles,
        activeRole: preset.role,
      });
    }
  };

  const handleAdminNavigate = () => {
    try {
      window.history.pushState(null, '', '/admin');
    } catch {
      // ignore
    }
    setRouteNotice('Navigating to /admin (Route Contract)');
    setTimeout(() => {
      setRouteNotice(null);
    }, 2500);
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* User Header Capsule */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 pl-2 border-l border-[#00dfff]/25 cursor-pointer group select-none focus:outline-none"
        title={user?.displayName ? `${user.displayName} — ${role || 'User'}` : 'User Profile'}
      >
        {/* Name and Role text (Desktop only) */}
        <div className="hidden lg:flex flex-col items-end text-right">
          <span className="font-sans text-xs font-bold text-[#eaf7ff] group-hover:text-[#00e3fd] transition-colors leading-tight">
            {user?.displayName || 'Vijay Kumar K'}
          </span>
          <span className="font-mono text-[9px] text-[#00dfff] uppercase tracking-wider leading-tight flex items-center gap-1 font-semibold">
            <ShieldCheck className="w-2.5 h-2.5" />
            {role === 'CHIEF_ARCHITECT'
              ? 'Chief Architect'
              : roles?.includes('DEVELOPER') && roles?.includes('ADMIN')
              ? 'Dev + Admin'
              : role || 'Architect'}
          </span>
        </div>

        {/* Avatar Ring & Online Status Dot */}
        <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#021827] p-0.5 border border-[#00e3fd]/50 ring-2 ring-[#00e3fd]/30 shadow-[0_0_15px_rgba(0,227,253,0.35)] group-hover:ring-[#00e3fd] transition-all overflow-hidden shrink-0">
          <img
            alt={user?.displayName || 'Vijay Kumar K'}
            className="w-full h-full object-cover rounded-full"
            src={user?.avatar || '/assets/vijay-profile-sm.jpg'}
            referrerPolicy="no-referrer"
          />
          <span
            className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ring-[#020914] ${
              isAuthenticated ? 'bg-[#00e3fd]' : 'bg-[#eab308]'
            }`}
          />
        </div>
      </button>

      {/* User Identity & Session Menu Popover */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 sm:w-88 bg-[#021222]/95 border border-[#00dfff]/40 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_35px_rgba(0,227,253,0.2)] backdrop-blur-2xl z-50 p-4 animate-in fade-in slide-in-from-top-2 duration-150">
          {/* User Bio Header */}
          <div className="flex items-center gap-3 pb-3 border-b border-[#00dfff]/20">
            <img
              src={user?.avatar || '/assets/vijay-profile-sm.jpg'}
              alt={user?.displayName || 'User'}
              className="w-12 h-12 rounded-xl object-cover border border-[#00dfff]/40 shadow-md"
            />
            <div className="flex flex-col min-w-0">
              <strong className="text-[#eaf7ff] text-sm font-bold truncate">
                {user?.displayName || 'Vijay Kumar K'}
              </strong>
              <span className="text-[#00dfff] text-[10.5px] font-mono uppercase font-semibold">
                {user?.title || 'Chief Architect & Inventor'}
              </span>
              <span className="text-[#6e9bb3] text-[10px] font-mono">
                ID: {user?.id || 'USR-000001'} · {user?.timezone || 'Asia/Kolkata'}
              </span>
            </div>
          </div>

          {/* Session Attributes & RBAC Role Switcher */}
          <div className="py-2.5 space-y-2 text-xs text-[#82a5bb] font-mono border-b border-[#00dfff]/20">
            <div className="flex justify-between items-center">
              <span>Auth State:</span>
              <span className="text-[#00dfff] font-bold uppercase text-[11px] px-1.5 py-0.5 rounded bg-[#00dfff]/10 border border-[#00dfff]/20">
                {auth.state}
              </span>
            </div>

            <div className="flex justify-between items-center gap-2">
              <span className="shrink-0">Active Role:</span>
              <select
                value={currentPresetId}
                onChange={(e) => handleRolePresetChange(e.target.value)}
                className="bg-[#010d18] border border-[#00dfff]/30 rounded-lg px-2 py-1 text-xs text-[#00e3fd] font-bold focus:outline-none max-w-[170px]"
              >
                {ROLE_PRESETS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-between items-center">
              <span>Permissions:</span>
              <span className="text-[#dff7ff] font-bold">
                {permissions.length} granted{' '}
                {permissions.includes('admin.access') && (
                  <span className="text-[#00e3fd] text-[10px] bg-[#00e3fd]/10 px-1 py-0.5 rounded border border-[#00e3fd]/25 ml-1">
                    admin.access
                  </span>
                )}
              </span>
            </div>
          </div>

          {/* Role-Based Admin Launcher Section */}
          {isAuthenticated && hasAdminAccess && (
            <div className="py-2.5 border-b border-[#00dfff]/20">
              <button
                type="button"
                onClick={handleAdminNavigate}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-gradient-to-r from-[#00dfff]/15 via-[#0077b6]/20 to-[#00dfff]/10 hover:from-[#00dfff]/25 hover:to-[#0077b6]/35 border border-[#00dfff]/40 hover:border-[#00e3fd] text-[#00e3fd] text-xs font-mono font-bold transition-all shadow-[0_0_12px_rgba(0,227,253,0.15)] group cursor-pointer"
                title="Launch Admin Console (/admin)"
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#00e3fd] group-hover:scale-110 transition-transform" />
                  <span className="tracking-wide">Admin Console</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#00dfff]/20 text-[#eaf7ff] uppercase tracking-wider font-semibold border border-[#00dfff]/30">
                    /admin
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#00dfff] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            </div>
          )}

          {/* Route Notification Toast (Route Contract) */}
          {routeNotice && (
            <div className="my-2 p-2 rounded-lg bg-[#00dfff]/15 border border-[#00dfff]/40 text-[#00e3fd] font-mono text-[11px] text-center animate-in fade-in">
              {routeNotice}
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-3 flex gap-2">
            {isAuthenticated ? (
              <button
                type="button"
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-mono font-bold transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  login();
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#00dfff]/15 hover:bg-[#00dfff]/25 text-[#00e3fd] border border-[#00dfff]/40 text-xs font-mono font-bold transition-all cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

