/**
 * P-PARAKKAI-001
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * IP Owner: ArchitectAny / Vijay Kumar K.
 * Status: ACTIVE
 * Version: v0.1.0
 */

export interface SiteBrandConfig {
  name: string;
  displayName: string;
  tamilDisplayName: string;
  tagline: string;
  subTagline: string;
  logoUrl?: string;
  symbol: string;
  language: 'ta-IN' | 'en' | 'both';
  locationName: string;
  region: string;
  district: string;
  state: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  contact: {
    phone: string;
    whatsappNumber: string;
    email: string;
    officeHours: string;
    address: string;
  };
  socialLinks: {
    youtube?: string;
    whatsappChannel?: string;
    facebook?: string;
    instagram?: string;
  };
}

export interface NavigationLinkItem {
  id: string;
  label: string;
  tamilLabel?: string;
  iconName: string;
  targetView: string;
  badge?: string;
  description?: string;
  isExternal?: boolean;
  externalUrl?: string;
}

export interface NavigationRailConfig {
  headerLinks: NavigationLinkItem[];
  leftRailItems: NavigationLinkItem[];
  rightRailItems: NavigationLinkItem[];
  footerSections: {
    title: string;
    tamilTitle?: string;
    items: NavigationLinkItem[];
  }[];
}
