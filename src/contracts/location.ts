/**
 * ArchitectAny AAi - Global Location Contracts & Provider Abstraction
 * Authoritative schemas for Normalized Location, Match Determination, Distance Filters & Map Sync
 */

export type LocationSource =
  | 'geocoder'
  | 'pincode'
  | 'gps'
  | 'manual'
  | 'default'
  | 'search'
  | 'user_preference';

export type LocationAccuracy =
  | 'exact'
  | 'pincode'
  | 'locality'
  | 'city'
  | 'district'
  | 'state'
  | 'country'
  | 'approximate';

export type LocationMatchType =
  | 'exact_pincode'
  | 'same_locality'
  | 'same_city'
  | 'same_district'
  | 'same_state'
  | 'within_radius'
  | 'outside_service_area';

/**
 * 1. Normalized Location JSON Structure
 * Reusable, serializable structured location entity
 */
export interface NormalizedLocation {
  id: string; // e.g. "LOC-000001"
  input: string; // e.g. "560001", "Bengaluru", "RS Puram"
  displayName: string; // e.g. "Bengaluru, Karnataka, India"
  country: string; // ISO-2 "IN"
  countryName: string; // "India"
  state: string; // "Karnataka"
  stateCode?: string; // "KA", "TN", "MH", etc.
  district: string | null; // "Bengaluru Urban"
  city: string; // "Bengaluru"
  area: string | null; // "Whitefield", "RS Puram", etc.
  pincode: string | null; // "560001"
  latitude: number; // 12.9716
  longitude: number; // 77.5946
  source: LocationSource;
  accuracy: LocationAccuracy;
  radiusKm: number; // e.g. 25
  timezone: string; // "Asia/Kolkata"
}

// Backward compatibility alias
export interface LocationContextState extends Partial<NormalizedLocation> {
  countryCode?: string;
}

export interface LocationResult extends NormalizedLocation {}

/**
 * 2. Location-Aware Service / Provider Declaration Model
 */
export interface ServiceLocationPoint {
  address: string;
  area?: string;
  city: string;
  district?: string;
  state: string;
  country: string;
  pincode: string;
  latitude: number;
  longitude: number;
  serviceRadiusKm?: number;
}

export interface ServiceLocationArea {
  countries: string[];
  states: string[];
  cities: string[];
  pincodes?: string[];
  radiusKm: number;
}

export interface LocationAwareService {
  id: string;
  name: string;
  providerId: string;
  providerName?: string;
  category: string;
  description?: string;
  location: ServiceLocationPoint;
  serviceArea?: ServiceLocationArea;
  locationMode?: 'location-aware' | 'location-independent';
  domainId?: string;
  solutionIds?: string[];
  capabilityIds?: string[];
  available: boolean;
  rating?: number;
  priceModel?: string;
  contactPhone?: string;
  contactEmail?: string;
}

/**
 * 3. Distance & Radius Configuration
 */
export type DistanceRadiusOption = 5 | 10 | 25 | 50 | 100;

export const SUPPORTED_DISTANCE_RADII: { label: string; value: number }[] = [
  { label: 'Within 5 km', value: 5 },
  { label: 'Within 10 km', value: 10 },
  { label: 'Within 25 km', value: 25 },
  { label: 'Within 50 km', value: 50 },
  { label: 'Within 100 km', value: 100 },
];

/**
 * 4. Filter Model
 * Reusable filter structure consumed by both List and Map simultaneously
 */
export interface LocationFilterCriteria {
  location: {
    latitude: number;
    longitude: number;
    radiusKm: number;
    pincode?: string | null;
    city?: string | null;
  };
  domainId?: string | null;
  subdomainId?: string | null;
  capabilityId?: string | null;
  solutionId?: string | null;
  providerId?: string | null;
  availableNow?: boolean;
  category?: string | null;
  searchQuery?: string;
  sortBy?: 'distance' | 'rating' | 'name' | 'relevance';
}

// Backward compatibility alias
export interface LocationFilter {
  countryCode?: string;
  stateCode?: string;
  district?: string;
  city?: string;
  area?: string;
  pincode?: string;
  radiusKm?: number;
  latitude?: number;
  longitude?: number;
  category?: string;
  availableOnly?: boolean;
  domainId?: string;
  solutionId?: string;
}

/**
 * 5. Map Marker Data Contract
 * Single unified result structure shared by Map and Table
 */
export interface MapMarkerData {
  id: string; // e.g. "PROV-001" or "SVC-001"
  type: 'provider' | 'service' | 'facility' | 'solution';
  name: string;
  latitude: number;
  longitude: number;
  distanceKm: number;
  domainId?: string;
  solutionIds?: string[];
  serviceId?: string;
  providerId?: string;
  category?: string;
  address?: string;
  pincode?: string;
  available: boolean;
  rating?: number;
  priceModel?: string;
  matchType: LocationMatchType;
  rawService?: LocationAwareService;
}

/**
 * 6. Location Provider & Map Provider Abstraction
 */
export interface LocationProvider {
  resolveLocation(query: string): Promise<NormalizedLocation | null>;
  resolvePincode(pincode: string): Promise<NormalizedLocation | null>;
  reverseGeocode(latitude: number, longitude: number): Promise<NormalizedLocation | null>;
  searchNearby(
    latitude: number,
    longitude: number,
    radiusKm: number,
    criteria?: Partial<LocationFilterCriteria>,
  ): Promise<MapMarkerData[]>;
  search(query: string): Promise<NormalizedLocation[]>;
  getCurrentLocation(): Promise<NormalizedLocation | null>;
  getMapUrl(latitude: number, longitude: number, zoom?: number): string;
}

export type SupportedMapProvider = 'osm' | 'standard' | 'vector' | 'satellite' | 'custom';

export interface MapProviderConfig {
  provider: SupportedMapProvider;
  enabled: boolean;
  apiBaseUrl?: string;
  searchEndpoint?: string;
  reverseGeocodeEndpoint?: string;
  mapEndpoint?: string;
  apiKeyEnv?: string;
}

/**
 * 7. Future PostgreSQL / Repository Abstraction Interface
 * Enables seamless transition: JSON -> Repository -> API -> PostgreSQL
 */
export interface ILocationRepository {
  resolveLocation(query: string): Promise<NormalizedLocation | null>;
  resolvePincode(pincode: string): Promise<NormalizedLocation | null>;
  reverseGeocode(latitude: number, longitude: number): Promise<NormalizedLocation | null>;
  queryNearbyServices(criteria: LocationFilterCriteria): Promise<MapMarkerData[]>;
  getServiceById(id: string): Promise<LocationAwareService | null>;
  getAllServices(): Promise<LocationAwareService[]>;
  saveUserPreferredLocation(userId: string, location: Partial<NormalizedLocation>): Promise<void>;
  getUserPreferredLocation(userId: string): Promise<NormalizedLocation | null>;
}

