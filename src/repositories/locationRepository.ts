/**
 * ArchitectAny AAi - Global Location Repository Layer
 * Implementation for JSON-first storage with seamless future transition to API / PostgreSQL
 */

import {
  NormalizedLocation,
  LocationAwareService,
  MapMarkerData,
  LocationFilterCriteria,
  ILocationRepository,
  LocationMatchType,
} from '../contracts/location';

/**
 * Haversine formula to compute great-circle distance between two points in km
 */
export function calculateHaversineDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

/**
 * Determine match type between current location context and service location
 */
export function determineLocationMatchType(
  currentLoc: {
    latitude: number;
    longitude: number;
    pincode?: string | null;
    city?: string | null;
    area?: string | null;
    district?: string | null;
    state?: string | null;
  },
  service: LocationAwareService,
  distanceKm: number,
  radiusKm: number = 25,
): LocationMatchType {
  const sLoc = service.location;

  // 1. Exact Pincode
  if (currentLoc.pincode && sLoc.pincode && currentLoc.pincode === sLoc.pincode) {
    return 'exact_pincode';
  }

  // 2. Same Locality / Area
  if (
    currentLoc.area &&
    sLoc.area &&
    currentLoc.area.toLowerCase() === sLoc.area.toLowerCase()
  ) {
    return 'same_locality';
  }

  // 3. Same City
  if (
    currentLoc.city &&
    sLoc.city &&
    currentLoc.city.toLowerCase() === sLoc.city.toLowerCase()
  ) {
    return 'same_city';
  }

  // 4. Same District
  if (
    currentLoc.district &&
    sLoc.district &&
    currentLoc.district.toLowerCase() === sLoc.district.toLowerCase()
  ) {
    return 'same_district';
  }

  // 5. Within Requested Radius
  const maxAllowedRadius = sLoc.serviceRadiusKm || radiusKm;
  if (distanceKm <= maxAllowedRadius) {
    return 'within_radius';
  }

  // 6. Same State
  if (
    currentLoc.state &&
    sLoc.state &&
    currentLoc.state.toLowerCase() === sLoc.state.toLowerCase()
  ) {
    return 'same_state';
  }

  return 'outside_service_area';
}

/**
 * Canonical Sample Services Dataset with rich multi-domain coverage
 */
export const CANONICAL_SERVICES: LocationAwareService[] = [
  {
    id: 'SVC-001',
    name: 'Precision Polyhouse & Drip Irrigation Setup',
    providerId: 'PRV-001',
    providerName: 'Kovai Agri Automation Ltd',
    category: 'Precision Agriculture',
    description: 'Automated micro-climate controlled polyhouse, soil sensors and fertigation grid',
    domainId: 'D01',
    solutionIds: ['SOL-001', 'SOL-002'],
    locationMode: 'location-aware',
    location: {
      address: 'Agri Tech Corridor, Thondamuthur Road',
      area: 'Thondamuthur',
      city: 'Coimbatore',
      district: 'Coimbatore',
      state: 'Tamil Nadu',
      country: 'IN',
      pincode: '641109',
      latitude: 10.9985,
      longitude: 76.8421,
      serviceRadiusKm: 120,
    },
    serviceArea: {
      countries: ['IN'],
      states: ['TN', 'KL'],
      cities: ['Coimbatore', 'Tiruppur', 'Palakkad', 'Erode'],
      radiusKm: 120,
    },
    available: true,
    rating: 4.9,
    priceModel: 'Per Acre Turnkey Contract',
    contactPhone: '+91 98422 10101',
  },
  {
    id: 'SVC-002',
    name: 'Organic Banana & Crop Tissue Culture Lab',
    providerId: 'PRV-002',
    providerName: 'Kongu BioTech Nurseries',
    category: 'Biotechnology & Saplings',
    description: 'Certified pathogen-free tissue culture saplings, soil biome enrichment & yield insurance',
    domainId: 'D01',
    solutionIds: ['SOL-001', 'SOL-003'],
    locationMode: 'location-aware',
    location: {
      address: '74, D.B. Road, RS Puram',
      area: 'RS Puram',
      city: 'Coimbatore',
      district: 'Coimbatore',
      state: 'Tamil Nadu',
      country: 'IN',
      pincode: '641001',
      latitude: 11.0168,
      longitude: 76.9558,
      serviceRadiusKm: 80,
    },
    available: true,
    rating: 4.8,
    priceModel: 'Bulk Lot / Per Sapling',
    contactPhone: '+91 94433 20202',
  },
  {
    id: 'SVC-003',
    name: 'Apex AI Vector Knowledge & Compute Engine',
    providerId: 'PRV-003',
    providerName: 'Apex Cloud Systems',
    category: 'Cloud AI & Telemetry',
    description: 'Low-latency spatial embeddings, edge inference node and multi-agent pipeline hosting',
    domainId: 'D06',
    solutionIds: ['SOL-003', 'SOL-005', 'SOL-008'],
    locationMode: 'location-independent',
    location: {
      address: 'Cyber Tech Park, Whitefield',
      area: 'Whitefield',
      city: 'Bengaluru',
      district: 'Bengaluru Urban',
      state: 'Karnataka',
      country: 'IN',
      pincode: '560066',
      latitude: 12.9698,
      longitude: 77.75,
      serviceRadiusKm: 500,
    },
    available: true,
    rating: 5.0,
    priceModel: 'Usage-Based GPU Inference',
    contactPhone: '+91 80 4123 9000',
  },
  {
    id: 'SVC-004',
    name: 'Microgrid Smart Energy & Solar Storage Hub',
    providerId: 'PRV-004',
    providerName: 'Helios Grid Energy Corp',
    category: 'Renewable Energy & Battery Storage',
    description: 'Commercial rooftop solar microgrid with AI peak-shaving battery management',
    domainId: 'D02',
    solutionIds: ['SOL-002', 'SOL-004'],
    locationMode: 'location-aware',
    location: {
      address: 'SIDCO Industrial Estate, Kurichi',
      area: 'Kurichi',
      city: 'Coimbatore',
      district: 'Coimbatore',
      state: 'Tamil Nadu',
      country: 'IN',
      pincode: '641021',
      latitude: 10.9328,
      longitude: 76.9682,
      serviceRadiusKm: 150,
    },
    available: true,
    rating: 4.9,
    priceModel: 'PPA / Capital Installation',
    contactPhone: '+91 97890 33445',
  },
  {
    id: 'SVC-005',
    name: '15-Min EV Cold-Chain Hyperlocal Logistics',
    providerId: 'PRV-005',
    providerName: 'SwiftPulse Mobility Network',
    category: 'Hyperlocal Logistics',
    description: 'Zero-emission temperature-controlled intra-city last-mile distribution network',
    domainId: 'D03',
    solutionIds: ['SOL-001', 'SOL-004', 'SOL-007'],
    locationMode: 'location-aware',
    location: {
      address: '100 Feet Road, Indiranagar',
      area: 'Indiranagar',
      city: 'Bengaluru',
      district: 'Bengaluru Urban',
      state: 'Karnataka',
      country: 'IN',
      pincode: '560038',
      latitude: 12.9784,
      longitude: 77.6408,
      serviceRadiusKm: 35,
    },
    available: true,
    rating: 4.7,
    priceModel: 'Per Consignment / Route Contract',
    contactPhone: '+91 80 2520 7788',
  },
  {
    id: 'SVC-006',
    name: 'DGCA-Certified Drone Cadastral & Crop Survey',
    providerId: 'PRV-006',
    providerName: 'AeroGeo Spatial Intelligence',
    category: 'Geospatial & Cadastral Mapping',
    description: 'Sub-centimeter RTK-GNSS aerial boundary survey, 3D digital elevation and NDVI analysis',
    domainId: 'D01',
    solutionIds: ['SOL-001', 'SOL-005'],
    locationMode: 'location-aware',
    location: {
      address: 'Avinashi Road, Peelamedu',
      area: 'Peelamedu',
      city: 'Coimbatore',
      district: 'Coimbatore',
      state: 'Tamil Nadu',
      country: 'IN',
      pincode: '641004',
      latitude: 11.0264,
      longitude: 77.0125,
      serviceRadiusKm: 200,
    },
    available: true,
    rating: 4.9,
    priceModel: 'Per Hectare / Flight Mission',
    contactPhone: '+91 99524 66778',
  },
  {
    id: 'SVC-007',
    name: 'Omni-Channel FinTech Ledger & Escrow Settlement',
    providerId: 'PRV-007',
    providerName: 'RupeeFlow Treasury Networks',
    category: 'Financial Infrastructure',
    description: 'Automated split escrow payouts, UPI 2.0 mandate collection and GST e-invoicing node',
    domainId: 'D05',
    solutionIds: ['SOL-002', 'SOL-006'],
    locationMode: 'location-independent',
    location: {
      address: 'Maker Chambers, Nariman Point',
      area: 'Nariman Point',
      city: 'Mumbai',
      district: 'Mumbai City',
      state: 'Maharashtra',
      country: 'IN',
      pincode: '400021',
      latitude: 18.9256,
      longitude: 72.8242,
      serviceRadiusKm: 2000,
    },
    available: true,
    rating: 4.8,
    priceModel: '0.15% per Transaction',
    contactPhone: '+91 22 6655 4400',
  },
  {
    id: 'SVC-008',
    name: 'Smart Water Treatment & IoT Pumping Station',
    providerId: 'PRV-008',
    providerName: 'AquaPure Systems Coimbatore',
    category: 'Water Resource Management',
    description: 'Industrial reverse osmosis, greywater recovery, real-time TDS and flow metering',
    domainId: 'D04',
    solutionIds: ['SOL-001', 'SOL-003'],
    locationMode: 'location-aware',
    location: {
      address: 'Cross Cut Road, Gandhipuram',
      area: 'Gandhipuram',
      city: 'Coimbatore',
      district: 'Coimbatore',
      state: 'Tamil Nadu',
      country: 'IN',
      pincode: '641012',
      latitude: 11.0183,
      longitude: 76.9699,
      serviceRadiusKm: 60,
    },
    available: true,
    rating: 4.7,
    priceModel: 'AMC / Annual Service Package',
    contactPhone: '+91 98421 88990',
  },
  {
    id: 'SVC-009',
    name: 'Autonomous Cold Chain Hub & Pallet Warehousing',
    providerId: 'PRV-009',
    providerName: 'MetroLogistics Hubs Chennai',
    category: 'Warehousing & Cold Storage',
    description: '-20°C to +4°C multi-chamber pharmaceutical & perishable staging docks with RFID tracking',
    domainId: 'D03',
    solutionIds: ['SOL-004', 'SOL-007'],
    locationMode: 'location-aware',
    location: {
      address: 'Grand Southern Trunk Rd, Guindy',
      area: 'Guindy',
      city: 'Chennai',
      district: 'Chennai',
      state: 'Tamil Nadu',
      country: 'IN',
      pincode: '600032',
      latitude: 13.0067,
      longitude: 80.2023,
      serviceRadiusKm: 150,
    },
    available: true,
    rating: 4.8,
    priceModel: 'Per Pallet Day / Lease',
    contactPhone: '+91 44 2235 1100',
  },
];

/**
 * In-Memory & JSON Implementation of ILocationRepository
 */
export class JsonLocationRepository implements ILocationRepository {
  private services: LocationAwareService[] = [...CANONICAL_SERVICES];
  private userPreferences: Record<string, NormalizedLocation> = {};

  async resolveLocation(query: string): Promise<NormalizedLocation | null> {
    const q = query.trim().toLowerCase();
    if (!q) return null;

    // Check services locations or canonical index
    for (const srv of this.services) {
      const loc = srv.location;
      if (
        loc.pincode === q ||
        loc.city.toLowerCase() === q ||
        loc.area?.toLowerCase() === q ||
        loc.state.toLowerCase() === q
      ) {
        return {
          id: `LOC-${loc.pincode}`,
          input: query,
          displayName: `${loc.area ? loc.area + ', ' : ''}${loc.city}, ${loc.state}, India`,
          country: 'IN',
          countryName: 'India',
          state: loc.state,
          stateCode: loc.state.slice(0, 2).toUpperCase(),
          district: loc.district || loc.city,
          city: loc.city,
          area: loc.area || null,
          pincode: loc.pincode,
          latitude: loc.latitude,
          longitude: loc.longitude,
          source: 'pincode',
          accuracy: loc.area ? 'locality' : 'city',
          radiusKm: 25,
          timezone: 'Asia/Kolkata',
        };
      }
    }

    return null;
  }

  async resolvePincode(pincode: string): Promise<NormalizedLocation | null> {
    return this.resolveLocation(pincode);
  }

  async reverseGeocode(latitude: number, longitude: number): Promise<NormalizedLocation | null> {
    let nearestService: LocationAwareService | null = null;
    let minDist = Infinity;

    for (const srv of this.services) {
      const dist = calculateHaversineDistanceKm(
        latitude,
        longitude,
        srv.location.latitude,
        srv.location.longitude,
      );
      if (dist < minDist) {
        minDist = dist;
        nearestService = srv;
      }
    }

    if (nearestService) {
      const loc = nearestService.location;
      return {
        id: `LOC-GEO-${latitude.toFixed(2)}-${longitude.toFixed(2)}`,
        input: `${latitude}, ${longitude}`,
        displayName: `${loc.city}, ${loc.state}, India`,
        country: 'IN',
        countryName: 'India',
        state: loc.state,
        stateCode: loc.state.slice(0, 2).toUpperCase(),
        district: loc.district || loc.city,
        city: loc.city,
        area: loc.area || null,
        pincode: loc.pincode,
        latitude,
        longitude,
        source: 'gps',
        accuracy: 'exact',
        radiusKm: 25,
        timezone: 'Asia/Kolkata',
      };
    }

    return null;
  }

  async queryNearbyServices(criteria: LocationFilterCriteria): Promise<MapMarkerData[]> {
    const { location, domainId, solutionId, availableNow, category, searchQuery, sortBy } = criteria;
    const { latitude, longitude, radiusKm, pincode, city } = location;

    const filtered: MapMarkerData[] = [];

    for (const srv of this.services) {
      // 1. Domain Filter
      if (domainId && srv.domainId && srv.domainId !== domainId) {
        continue;
      }

      // 2. Solution Filter
      if (solutionId && srv.solutionIds && !srv.solutionIds.includes(solutionId)) {
        continue;
      }

      // 3. Availability Filter
      if (availableNow && !srv.available) {
        continue;
      }

      // 4. Category Filter
      if (
        category &&
        !srv.category.toLowerCase().includes(category.toLowerCase()) &&
        !srv.name.toLowerCase().includes(category.toLowerCase())
      ) {
        continue;
      }

      // 5. Keyword Search
      if (searchQuery) {
        const sq = searchQuery.toLowerCase();
        const matches =
          srv.name.toLowerCase().includes(sq) ||
          srv.category.toLowerCase().includes(sq) ||
          srv.description?.toLowerCase().includes(sq) ||
          srv.location.city.toLowerCase().includes(sq) ||
          srv.location.area?.toLowerCase().includes(sq) ||
          srv.location.pincode.includes(sq);

        if (!matches) continue;
      }

      // 6. Compute Distance
      const dist = calculateHaversineDistanceKm(
        latitude,
        longitude,
        srv.location.latitude,
        srv.location.longitude,
      );

      // 7. Match Type Determination
      const matchType = determineLocationMatchType(
        {
          latitude,
          longitude,
          pincode,
          city,
        },
        srv,
        dist,
        radiusKm,
      );

      // If location-aware service and out of radius, check if within radius or match criteria
      if (srv.locationMode !== 'location-independent') {
        const effectiveRadius = Math.max(radiusKm, srv.location.serviceRadiusKm || 25);
        if (dist > effectiveRadius && matchType === 'outside_service_area') {
          continue;
        }
      }

      filtered.push({
        id: srv.id,
        type: 'service',
        name: srv.name,
        latitude: srv.location.latitude,
        longitude: srv.location.longitude,
        distanceKm: dist,
        domainId: srv.domainId,
        solutionIds: srv.solutionIds,
        serviceId: srv.id,
        providerId: srv.providerId,
        category: srv.category,
        address: `${srv.location.address}, ${srv.location.city}`,
        pincode: srv.location.pincode,
        available: srv.available,
        rating: srv.rating,
        priceModel: srv.priceModel,
        matchType,
        rawService: srv,
      });
    }

    // 8. Sorting
    if (sortBy === 'rating') {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // Default: Sort by nearest distance
      filtered.sort((a, b) => a.distanceKm - b.distanceKm);
    }

    return filtered;
  }

  async getServiceById(id: string): Promise<LocationAwareService | null> {
    return this.services.find((s) => s.id === id) || null;
  }

  async getAllServices(): Promise<LocationAwareService[]> {
    return [...this.services];
  }

  async saveUserPreferredLocation(userId: string, loc: Partial<NormalizedLocation>): Promise<void> {
    if (this.userPreferences[userId]) {
      this.userPreferences[userId] = {
        ...this.userPreferences[userId],
        ...loc,
      } as NormalizedLocation;
    }
  }

  async getUserPreferredLocation(userId: string): Promise<NormalizedLocation | null> {
    return this.userPreferences[userId] || null;
  }
}

/**
 * PostgreSQL Location Repository Contract Ready for Production Database Transition
 */
export class PostgresLocationRepository implements ILocationRepository {
  /*
   * PostgreSQL Schema Migration Reference:
   *
   * CREATE TABLE locations (
   *   id VARCHAR(64) PRIMARY KEY,
   *   input VARCHAR(255) NOT NULL,
   *   display_name VARCHAR(255) NOT NULL,
   *   country VARCHAR(4) NOT NULL,
   *   state VARCHAR(100) NOT NULL,
   *   city VARCHAR(100) NOT NULL,
   *   district VARCHAR(100),
   *   area VARCHAR(100),
   *   pincode VARCHAR(10),
   *   latitude NUMERIC(9,6) NOT NULL,
   *   longitude NUMERIC(9,6) NOT NULL,
   *   source VARCHAR(32) NOT NULL,
   *   radius_km NUMERIC(6,2) DEFAULT 25.0
   * );
   *
   * CREATE TABLE providers (
   *   id VARCHAR(64) PRIMARY KEY,
   *   name VARCHAR(255) NOT NULL,
   *   contact_phone VARCHAR(50),
   *   contact_email VARCHAR(100),
   *   service_radius_km NUMERIC(6,2) DEFAULT 50.0
   * );
   *
   * CREATE TABLE services (
   *   id VARCHAR(64) PRIMARY KEY,
   *   name VARCHAR(255) NOT NULL,
   *   provider_id VARCHAR(64) REFERENCES providers(id),
   *   category VARCHAR(100) NOT NULL,
   *   domain_id VARCHAR(32),
   *   location_mode VARCHAR(32) DEFAULT 'location-aware',
   *   latitude NUMERIC(9,6) NOT NULL,
   *   longitude NUMERIC(9,6) NOT NULL,
   *   available BOOLEAN DEFAULT true,
   *   geom GEOGRAPHY(Point, 4326) -- PostGIS Spatial Index
   * );
   */

  private fallback = new JsonLocationRepository();

  async resolveLocation(query: string): Promise<NormalizedLocation | null> {
    // When connected to PostgreSQL API:
    // return fetch('/api/locations/resolve?q=' + encodeURIComponent(query)).then(r => r.json());
    return this.fallback.resolveLocation(query);
  }

  async resolvePincode(pincode: string): Promise<NormalizedLocation | null> {
    return this.fallback.resolvePincode(pincode);
  }

  async reverseGeocode(latitude: number, longitude: number): Promise<NormalizedLocation | null> {
    return this.fallback.reverseGeocode(latitude, longitude);
  }

  async queryNearbyServices(criteria: LocationFilterCriteria): Promise<MapMarkerData[]> {
    // In PostgreSQL / PostGIS:
    // SELECT *, ST_Distance(geom, ST_MakePoint(longitude, latitude)::geography) / 1000 AS distance_km
    // FROM services WHERE ST_DWithin(geom, ST_MakePoint(longitude, latitude)::geography, radiusKm * 1000)
    return this.fallback.queryNearbyServices(criteria);
  }

  async getServiceById(id: string): Promise<LocationAwareService | null> {
    return this.fallback.getServiceById(id);
  }

  async getAllServices(): Promise<LocationAwareService[]> {
    return this.fallback.getAllServices();
  }

  async saveUserPreferredLocation(userId: string, location: Partial<NormalizedLocation>): Promise<void> {
    return this.fallback.saveUserPreferredLocation(userId, location);
  }

  async getUserPreferredLocation(userId: string): Promise<NormalizedLocation | null> {
    return this.fallback.getUserPreferredLocation(userId);
  }
}

export const locationRepository: ILocationRepository = new JsonLocationRepository();
