/**
 * ArchitectAny AAi - Global Application Context
 * Provides Intent, Location, Language, User, and Auth state to all application screens
 */

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  IntentState,
  NormalizedLocation,
  LanguageContextState,
  SUPPORTED_LANGUAGES,
  AuthSession,
  User,
  UserRole,
  Permission,
  ApiConfig,
  DEFAULT_API_CONFIG,
  MapProviderConfig,
  LocationFilterCriteria,
  MapMarkerData,
  hasAdminAccess as hasAdminAccessContract,
} from '../types';
import { intentService } from '../services/intentService';
import {
  locationService,
  DEFAULT_NORMALIZED_LOCATION,
  LocationVerificationResult,
} from '../services/locationService';
import { authService } from '../services/authService';
import { t as translateKey, getTranslatedDomain } from '../services/translationService';

export type ThemeMode = 'dark' | 'light';

export interface ArchitectAnyContextValue {
  // Theme State
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;

  // Intent State
  intent: IntentState;
  setIntent: (intent: Partial<IntentState>) => void;
  clearIntent: () => void;

  // Global Location Intelligence State
  location: NormalizedLocation;
  radiusKm: number;
  setLocation: (location: Partial<NormalizedLocation>) => void;
  setRadiusKm: (radiusKm: number) => void;
  resolveLocation: (query: string) => Promise<NormalizedLocation | null>;
  resolvePincode: (pincode: string) => Promise<NormalizedLocation | null>;
  resolvePincodePostOffices: (pincode: string) => Promise<NormalizedLocation[]>;
  searchLocations: (query: string) => Promise<NormalizedLocation[]>;
  verifyLocation: (name: string) => Promise<LocationVerificationResult>;
  detectLocation: () => Promise<void>;
  queryServices: (criteria?: Partial<LocationFilterCriteria>) => Promise<MapMarkerData[]>;

  // Language State
  language: LanguageContextState;
  setLanguage: (lang: LanguageContextState) => void;
  supportedLanguages: LanguageContextState[];
  t: (key: string) => string;
  getDomainName: (domainId: string, fallback: string) => string;
  getDomainDesc: (domainId: string, fallback?: string) => string;

  // Auth & User State
  auth: AuthSession;
  user: User | null;
  role: UserRole | null;
  activeRole: UserRole | null;
  roles: UserRole[];
  permissions: Permission[];
  hasAdminAccess: boolean;
  hasPermission: (permission: Permission) => boolean;
  login: (userUpdate?: Partial<User>) => void;
  logout: () => void;
  setRole: (role: UserRole, customRoles?: UserRole[]) => void;
  setTestProfile: (config: { roles: UserRole[]; activeRole?: UserRole; permissions?: Permission[] }) => void;

  // Global Configs
  apiConfig: ApiConfig;
  mapConfig: MapProviderConfig;
  setMapConfig: (config: Partial<MapProviderConfig>) => void;
}

const ArchitectAnyContext = createContext<ArchitectAnyContextValue | null>(null);

export interface ArchitectAnyProviderProps {
  children: ReactNode;
  initialIntent?: Partial<IntentState>;
  initialLocation?: Partial<NormalizedLocation>;
  initialLanguage?: LanguageContextState;
}

export const ArchitectAnyProvider: React.FC<ArchitectAnyProviderProps> = ({
  children,
  initialIntent,
  initialLocation,
  initialLanguage,
}) => {
  // 0. Theme State (Default: dark)
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('aai_theme');
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'dark';
  });

  const handleSetTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('aai_theme', newTheme);
    }
  };

  const handleToggleTheme = () => {
    handleSetTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // 1. Intent State
  const [intent, setIntentState] = useState<IntentState>(() => ({
    ...intentService.getIntent(),
    ...initialIntent,
  }));

  // 2. Global Location State
  const [location, setLocationState] = useState<NormalizedLocation>(() => ({
    ...locationService.getLocation(),
    ...initialLocation,
  }));
  const [radiusKm, setRadiusKmState] = useState<number>(() => locationService.getRadiusKm());

  // 3. Language State (Default: en-IN)
  const [language, setLanguageState] = useState<LanguageContextState>(
    initialLanguage || SUPPORTED_LANGUAGES[0],
  );

  // 4. Auth & User State
  const [auth, setAuthState] = useState<AuthSession>(() => authService.getSession());

  // 5. Configs
  const [apiConfig] = useState<ApiConfig>(DEFAULT_API_CONFIG);
  const [mapConfig, setMapConfigState] = useState<MapProviderConfig>(() =>
    locationService.getMapConfig(),
  );

  // Subscriptions to services
  useEffect(() => {
    const unsubIntent = intentService.subscribe((newIntent) => {
      setIntentState(newIntent);
    });
    const unsubLocation = locationService.subscribe((newLoc) => {
      setLocationState(newLoc);
      setRadiusKmState(newLoc.radiusKm || 25);
    });
    const unsubAuth = authService.subscribe((newAuth) => {
      setAuthState(newAuth);
    });

    return () => {
      unsubIntent();
      unsubLocation();
      unsubAuth();
    };
  }, []);

  const handleSetIntent = (update: Partial<IntentState>) => {
    intentService.setIntent(update);
  };

  const handleClearIntent = () => {
    intentService.setIntent({
      query: '',
      rawQuery: '',
      domainId: null,
      subdomainId: null,
      capabilityId: null,
      solutionId: null,
      serviceId: null,
      providerId: null,
      category: null,
    });
  };

  const handleSetLocation = (update: Partial<NormalizedLocation>) => {
    locationService.setLocation(update);
  };

  const handleSetRadiusKm = (radius: number) => {
    locationService.setRadiusKm(radius);
    setRadiusKmState(radius);
  };

  const handleResolveLocation = async (query: string) => {
    return locationService.resolveLocationInput(query);
  };

  const handleResolvePincode = async (pincode: string) => {
    return locationService.resolvePincode(pincode);
  };

  const handleResolvePincodePostOffices = async (pincode: string) => {
    return locationService.resolveAllPincodePostOffices(pincode);
  };

  const handleSearchLocations = async (query: string) => {
    return locationService.searchLocations(query);
  };

  const handleVerifyLocation = async (name: string) => {
    return locationService.verifyLocationByName(name);
  };

  const handleDetectLocation = async () => {
    await locationService.requestCurrentLocation();
  };

  const handleQueryServices = async (criteria: Partial<LocationFilterCriteria> = {}) => {
    return locationService.queryServices(criteria);
  };

  const handleSetLanguage = (lang: LanguageContextState) => {
    setLanguageState(lang);
  };

  const handleSetMapConfig = (config: Partial<MapProviderConfig>) => {
    locationService.setMapConfig(config);
    setMapConfigState(locationService.getMapConfig());
  };

  const value: ArchitectAnyContextValue = {
    theme,
    setTheme: handleSetTheme,
    toggleTheme: handleToggleTheme,

    intent,
    setIntent: handleSetIntent,
    clearIntent: handleClearIntent,

    location,
    radiusKm,
    setLocation: handleSetLocation,
    setRadiusKm: handleSetRadiusKm,
    resolveLocation: handleResolveLocation,
    resolvePincode: handleResolvePincode,
    resolvePincodePostOffices: handleResolvePincodePostOffices,
    searchLocations: handleSearchLocations,
    verifyLocation: handleVerifyLocation,
    detectLocation: handleDetectLocation,
    queryServices: handleQueryServices,

    language,
    setLanguage: handleSetLanguage,
    supportedLanguages: SUPPORTED_LANGUAGES,
    t: (key: string) => translateKey(key, language.code),
    getDomainName: (domainId: string, fallback: string) =>
      getTranslatedDomain(domainId, fallback, undefined, language.code).name,
    getDomainDesc: (domainId: string, fallback?: string) =>
      getTranslatedDomain(domainId, fallback || '', fallback, language.code).description,

    auth,
    user: auth.user,
    role: auth.user?.activeRole || auth.user?.role || null,
    activeRole: auth.user?.activeRole || auth.user?.role || null,
    roles: auth.user?.roles || (auth.user?.role ? [auth.user.role] : []),
    permissions: auth.user?.permissions || [],
    hasAdminAccess: hasAdminAccessContract(auth.user, auth.state === 'authenticated'),
    hasPermission: (perm: Permission) => authService.hasPermission(perm),
    login: (u) => authService.login(u),
    logout: () => authService.logout(),
    setRole: (r, customRoles) => authService.setRole(r, customRoles),
    setTestProfile: (cfg) => authService.setTestProfile(cfg),

    apiConfig,
    mapConfig,
    setMapConfig: handleSetMapConfig,
  };

  return (
    <ArchitectAnyContext.Provider value={value}>
      {children}
    </ArchitectAnyContext.Provider>
  );
};

export function useArchitectAny(): ArchitectAnyContextValue {
  const context = useContext(ArchitectAnyContext);
  if (!context) {
    throw new Error('useArchitectAny must be used within an ArchitectAnyProvider');
  }
  return context;
}
