/**
 * ArchitectAny AAi - Global Location Service & Provider Abstraction
 * Supports Normalized Location JSON, Indian Postal API, OpenStreetMap & Repository Sync
 */

import {
  NormalizedLocation,
  LocationResult,
  LocationProvider,
  MapProviderConfig,
  LocationFilterCriteria,
  MapMarkerData,
  DistanceRadiusOption,
  SUPPORTED_DISTANCE_RADII,
} from '../contracts/location';
import {
  locationRepository,
  calculateHaversineDistanceKm,
  CANONICAL_SERVICES,
} from '../repositories/locationRepository';

// Canonical Default Location (Coimbatore, Tamil Nadu, India)
export const DEFAULT_NORMALIZED_LOCATION: NormalizedLocation = {
  id: 'LOC-641001',
  input: '641001',
  displayName: 'Coimbatore, Tamil Nadu, India',
  country: 'IN',
  countryName: 'India',
  state: 'Tamil Nadu',
  stateCode: 'TN',
  district: 'Coimbatore',
  city: 'Coimbatore',
  area: 'RS Puram',
  pincode: '641001',
  latitude: 11.0168,
  longitude: 76.9558,
  source: 'default',
  accuracy: 'pincode',
  radiusKm: 25,
  timezone: 'Asia/Kolkata',
};

// Backward compatibility
export const DEFAULT_LOCATION = DEFAULT_NORMALIZED_LOCATION;

// Built-in Indian Postal & City Index for Instant Zero-Latency Resolution
export const POPULAR_INDIAN_LOCATIONS: NormalizedLocation[] = [
  {
    id: 'LOC-629601',
    input: '629601',
    country: 'IN',
    countryName: 'India',
    state: 'Tamil Nadu',
    stateCode: 'TN',
    district: 'Kanyakumari',
    city: 'Parakkai',
    area: 'Parakkai Post Office',
    pincode: '629601',
    latitude: 8.1485,
    longitude: 77.4474,
    displayName: 'Parakkai P.O., Kanyakumari, TN (629601)',
    source: 'pincode',
    accuracy: 'exact',
    radiusKm: 25,
    timezone: 'Asia/Kolkata',
  },
  {
    id: 'LOC-629001',
    input: '629001',
    country: 'IN',
    countryName: 'India',
    state: 'Tamil Nadu',
    stateCode: 'TN',
    district: 'Kanyakumari',
    city: 'Nagercoil',
    area: 'Nagercoil Head Post Office',
    pincode: '629001',
    latitude: 8.1833,
    longitude: 77.4119,
    displayName: 'Nagercoil H.O., Kanyakumari, TN (629001)',
    source: 'pincode',
    accuracy: 'exact',
    radiusKm: 25,
    timezone: 'Asia/Kolkata',
  },
  {
    id: 'LOC-629702',
    input: '629702',
    country: 'IN',
    countryName: 'India',
    state: 'Tamil Nadu',
    stateCode: 'TN',
    district: 'Kanyakumari',
    city: 'Kanyakumari',
    area: 'Kanyakumari Post Office',
    pincode: '629702',
    latitude: 8.0883,
    longitude: 77.5385,
    displayName: 'Kanyakumari P.O., Kanyakumari, TN (629702)',
    source: 'pincode',
    accuracy: 'exact',
    radiusKm: 25,
    timezone: 'Asia/Kolkata',
  },
  {
    id: 'LOC-627001',
    input: '627001',
    country: 'IN',
    countryName: 'India',
    state: 'Tamil Nadu',
    stateCode: 'TN',
    district: 'Tirunelveli',
    city: 'Tirunelveli',
    area: 'Tirunelveli Town / Junction',
    pincode: '627001',
    latitude: 8.7139,
    longitude: 77.7567,
    displayName: 'Tirunelveli, TN (627001)',
    source: 'pincode',
    accuracy: 'exact',
    radiusKm: 25,
    timezone: 'Asia/Kolkata',
  },
  {
    id: 'LOC-627811',
    input: '627811',
    country: 'IN',
    countryName: 'India',
    state: 'Tamil Nadu',
    stateCode: 'TN',
    district: 'Tenkasi',
    city: 'Tenkasi',
    area: 'Tenkasi Post Office',
    pincode: '627811',
    latitude: 8.9593,
    longitude: 77.3149,
    displayName: 'Tenkasi, TN (627811)',
    source: 'pincode',
    accuracy: 'exact',
    radiusKm: 25,
    timezone: 'Asia/Kolkata',
  },
  {
    id: 'LOC-625001',
    input: '625001',
    country: 'IN',
    countryName: 'India',
    state: 'Tamil Nadu',
    stateCode: 'TN',
    district: 'Madurai',
    city: 'Madurai',
    area: 'Madurai Central',
    pincode: '625001',
    latitude: 9.9252,
    longitude: 78.1198,
    displayName: 'Madurai, TN (625001)',
    source: 'pincode',
    accuracy: 'pincode',
    radiusKm: 25,
    timezone: 'Asia/Kolkata',
  },
  {
    id: 'LOC-641001',
    input: '641001',
    country: 'IN',
    countryName: 'India',
    state: 'Tamil Nadu',
    stateCode: 'TN',
    district: 'Coimbatore',
    city: 'Coimbatore',
    area: 'RS Puram',
    pincode: '641001',
    latitude: 11.0168,
    longitude: 76.9558,
    displayName: 'Coimbatore, TN (641001)',
    source: 'pincode',
    accuracy: 'pincode',
    radiusKm: 25,
    timezone: 'Asia/Kolkata',
  },
  {
    id: 'LOC-641012',
    input: '641012',
    country: 'IN',
    countryName: 'India',
    state: 'Tamil Nadu',
    stateCode: 'TN',
    district: 'Coimbatore',
    city: 'Coimbatore',
    area: 'Gandhipuram',
    pincode: '641012',
    latitude: 11.0183,
    longitude: 76.9699,
    displayName: 'Gandhipuram, Coimbatore (641012)',
    source: 'pincode',
    accuracy: 'locality',
    radiusKm: 25,
    timezone: 'Asia/Kolkata',
  },
  {
    id: 'LOC-641004',
    input: '641004',
    country: 'IN',
    countryName: 'India',
    state: 'Tamil Nadu',
    stateCode: 'TN',
    district: 'Coimbatore',
    city: 'Coimbatore',
    area: 'Peelamedu',
    pincode: '641004',
    latitude: 11.0264,
    longitude: 77.0125,
    displayName: 'Peelamedu, Coimbatore (641004)',
    source: 'pincode',
    accuracy: 'locality',
    radiusKm: 25,
    timezone: 'Asia/Kolkata',
  },
  {
    id: 'LOC-600001',
    input: '600001',
    country: 'IN',
    countryName: 'India',
    state: 'Tamil Nadu',
    stateCode: 'TN',
    district: 'Chennai',
    city: 'Chennai',
    area: 'George Town',
    pincode: '600001',
    latitude: 13.0827,
    longitude: 80.2707,
    displayName: 'Chennai, TN (600001)',
    source: 'pincode',
    accuracy: 'pincode',
    radiusKm: 25,
    timezone: 'Asia/Kolkata',
  },
  {
    id: 'LOC-600017',
    input: '600017',
    country: 'IN',
    countryName: 'India',
    state: 'Tamil Nadu',
    stateCode: 'TN',
    district: 'Chennai',
    city: 'Chennai',
    area: 'T. Nagar',
    pincode: '600017',
    latitude: 13.0418,
    longitude: 80.2341,
    displayName: 'T. Nagar, Chennai (600017)',
    source: 'pincode',
    accuracy: 'locality',
    radiusKm: 25,
    timezone: 'Asia/Kolkata',
  },
  {
    id: 'LOC-560001',
    input: '560001',
    country: 'IN',
    countryName: 'India',
    state: 'Karnataka',
    stateCode: 'KA',
    district: 'Bengaluru Urban',
    city: 'Bengaluru',
    area: 'MG Road / Central',
    pincode: '560001',
    latitude: 12.9716,
    longitude: 77.5946,
    displayName: 'Bengaluru, KA (560001)',
    source: 'pincode',
    accuracy: 'pincode',
    radiusKm: 25,
    timezone: 'Asia/Kolkata',
  },
  {
    id: 'LOC-560038',
    input: '560038',
    country: 'IN',
    countryName: 'India',
    state: 'Karnataka',
    stateCode: 'KA',
    district: 'Bengaluru Urban',
    city: 'Bengaluru',
    area: 'Indiranagar',
    pincode: '560038',
    latitude: 12.9784,
    longitude: 77.6408,
    displayName: 'Indiranagar, Bengaluru (560038)',
    source: 'pincode',
    accuracy: 'locality',
    radiusKm: 25,
    timezone: 'Asia/Kolkata',
  },
  {
    id: 'LOC-560066',
    input: '560066',
    country: 'IN',
    countryName: 'India',
    state: 'Karnataka',
    stateCode: 'KA',
    district: 'Bengaluru Urban',
    city: 'Bengaluru',
    area: 'Whitefield',
    pincode: '560066',
    latitude: 12.9698,
    longitude: 77.75,
    displayName: 'Whitefield, Bengaluru (560066)',
    source: 'pincode',
    accuracy: 'locality',
    radiusKm: 25,
    timezone: 'Asia/Kolkata',
  },
  {
    id: 'LOC-500001',
    input: '500001',
    country: 'IN',
    countryName: 'India',
    state: 'Telangana',
    stateCode: 'TG',
    district: 'Hyderabad',
    city: 'Hyderabad',
    area: 'Abids / Central',
    pincode: '500001',
    latitude: 17.3850,
    longitude: 78.4867,
    displayName: 'Hyderabad, TG (500001)',
    source: 'pincode',
    accuracy: 'pincode',
    radiusKm: 25,
    timezone: 'Asia/Kolkata',
  },
  {
    id: 'LOC-500081',
    input: '500081',
    country: 'IN',
    countryName: 'India',
    state: 'Telangana',
    stateCode: 'TG',
    district: 'Hyderabad',
    city: 'Hyderabad',
    area: 'Hitec City',
    pincode: '500081',
    latitude: 17.4435,
    longitude: 78.3772,
    displayName: 'Hitec City, Hyderabad (500081)',
    source: 'pincode',
    accuracy: 'locality',
    radiusKm: 25,
    timezone: 'Asia/Kolkata',
  },
  {
    id: 'LOC-400001',
    input: '400001',
    country: 'IN',
    countryName: 'India',
    state: 'Maharashtra',
    stateCode: 'MH',
    district: 'Mumbai City',
    city: 'Mumbai',
    area: 'Fort / South Mumbai',
    pincode: '400001',
    latitude: 18.9322,
    longitude: 72.8347,
    displayName: 'Mumbai, MH (400001)',
    source: 'pincode',
    accuracy: 'pincode',
    radiusKm: 25,
    timezone: 'Asia/Kolkata',
  },
  {
    id: 'LOC-400021',
    input: '400021',
    country: 'IN',
    countryName: 'India',
    state: 'Maharashtra',
    stateCode: 'MH',
    district: 'Mumbai City',
    city: 'Mumbai',
    area: 'Nariman Point',
    pincode: '400021',
    latitude: 18.9256,
    longitude: 72.8242,
    displayName: 'Nariman Point, Mumbai (400021)',
    source: 'pincode',
    accuracy: 'locality',
    radiusKm: 25,
    timezone: 'Asia/Kolkata',
  },
  {
    id: 'LOC-110001',
    input: '110001',
    country: 'IN',
    countryName: 'India',
    state: 'Delhi',
    stateCode: 'DL',
    district: 'New Delhi',
    city: 'New Delhi',
    area: 'Connaught Place',
    pincode: '110001',
    latitude: 28.6304,
    longitude: 77.2177,
    displayName: 'New Delhi, DL (110001)',
    source: 'pincode',
    accuracy: 'locality',
    radiusKm: 25,
    timezone: 'Asia/Kolkata',
  },
  {
    id: 'LOC-682001',
    input: '682001',
    country: 'IN',
    countryName: 'India',
    state: 'Kerala',
    stateCode: 'KL',
    district: 'Ernakulam',
    city: 'Kochi',
    area: 'Fort Kochi / Ernakulam',
    pincode: '682001',
    latitude: 9.9816,
    longitude: 76.2999,
    displayName: 'Kochi, KL (682001)',
    source: 'pincode',
    accuracy: 'pincode',
    radiusKm: 25,
    timezone: 'Asia/Kolkata',
  },
  {
    id: 'LOC-695001',
    input: '695001',
    country: 'IN',
    countryName: 'India',
    state: 'Kerala',
    stateCode: 'KL',
    district: 'Thiruvananthapuram',
    city: 'Thiruvananthapuram',
    area: 'Central / Secretariat',
    pincode: '695001',
    latitude: 8.5241,
    longitude: 76.9366,
    displayName: 'Thiruvananthapuram, KL (695001)',
    source: 'pincode',
    accuracy: 'pincode',
    radiusKm: 25,
    timezone: 'Asia/Kolkata',
  },
  {
    id: 'LOC-620001',
    input: '620001',
    country: 'IN',
    countryName: 'India',
    state: 'Tamil Nadu',
    stateCode: 'TN',
    district: 'Tiruchirappalli',
    city: 'Tiruchirappalli',
    area: 'Trichy Central',
    pincode: '620001',
    latitude: 10.7905,
    longitude: 78.7047,
    displayName: 'Tiruchirappalli, TN (620001)',
    source: 'pincode',
    accuracy: 'pincode',
    radiusKm: 25,
    timezone: 'Asia/Kolkata',
  },
];

export const SAMPLE_SERVICES = CANONICAL_SERVICES;

export interface LocationVerificationResult {
  verified: boolean;
  location?: NormalizedLocation;
  candidates: NormalizedLocation[];
  isWrongName?: boolean;
  errorMessage?: string;
}

/**
 * Live Indian Government Postal API & OpenStreetMap Provider Adapter
 */
export class LiveIndiaLocationProvider implements LocationProvider {
  async lookupIndiaPostOffice(name: string): Promise<NormalizedLocation[]> {
    const clean = name.trim();
    if (!clean) return [];

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const res = await fetch(
        `https://api.postalpincode.in/postoffice/${encodeURIComponent(clean)}`,
        { signal: controller.signal }
      );
      clearTimeout(timeoutId);

      if (res.ok) {
        const json = await res.json();
        if (
          Array.isArray(json) &&
          json[0]?.Status === 'Success' &&
          Array.isArray(json[0]?.PostOffice) &&
          json[0].PostOffice.length > 0
        ) {
          const list: NormalizedLocation[] = [];
          for (const po of json[0].PostOffice) {
            const poName = po.Name;
            const pincode = po.Pincode;
            const district = po.District || 'District';
            const state = po.State || 'Tamil Nadu';
            const block = po.Block;

            // Find coordinates if known in popular locations or approximate
            let lat = 0;
            let lng = 0;
            const match = POPULAR_INDIAN_LOCATIONS.find((l) => l.pincode === pincode || l.city.toLowerCase() === poName.toLowerCase());
            if (match) {
              lat = match.latitude;
              lng = match.longitude;
            }

            list.push({
              id: `LOC-${pincode}-${poName.replace(/\s+/g, '-').toLowerCase()}`,
              input: clean,
              displayName: `${poName} P.O., ${district}, ${state} (${pincode})`,
              country: 'IN',
              countryName: 'India',
              state,
              stateCode: state.slice(0, 2).toUpperCase(),
              district,
              city: poName,
              area: block && block !== poName ? `${poName} (${block})` : `${poName} Post Office`,
              pincode,
              latitude: lat,
              longitude: lng,
              source: 'pincode',
              accuracy: 'exact',
              radiusKm: 25,
              timezone: 'Asia/Kolkata',
            });
          }

          // If coordinates missing, geocode the first one via OSM
          if (list.length > 0 && list[0].latitude === 0) {
            try {
              const primary = list[0];
              const osmRes = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=in&q=${encodeURIComponent(
                  `${primary.city}, ${primary.district}, ${primary.state} ${primary.pincode}`,
                )}`,
              );
              if (osmRes.ok) {
                const osmData = await osmRes.json();
                if (osmData?.[0]) {
                  const latVal = Number(osmData[0].lat);
                  const lonVal = Number(osmData[0].lon);
                  list.forEach((item) => {
                    if (item.latitude === 0) {
                      item.latitude = latVal;
                      item.longitude = lonVal;
                    }
                  });
                }
              }
            } catch {
              // ignore
            }
          }

          return list;
        }
      }
    } catch {
      // ignore
    }
    return [];
  }

  async resolveLocation(query: string): Promise<NormalizedLocation | null> {
    const q = query.trim();
    if (!q) return null;

    if (/^\d{6}$/.test(q)) {
      return this.resolvePincode(q);
    }

    const results = await this.search(q);
    return results[0] || null;
  }

  async search(query: string): Promise<NormalizedLocation[]> {
    const q = query.trim();
    if (!q) return POPULAR_INDIAN_LOCATIONS;

    // 1. Check if 6-digit Indian Pincode
    if (/^\d{6}$/.test(q)) {
      const pinResults = await this.resolveAllPincodePostOffices(q);
      if (pinResults.length > 0) return pinResults;
      const single = await this.resolvePincode(q);
      if (single) return [single];
    }

    const lower = q.toLowerCase();

    // 2. Exact match in built-in verified Indian postal index (e.g. Parakkai -> 629601)
    const curatedMatches = POPULAR_INDIAN_LOCATIONS.filter(
      (loc) =>
        loc.city.toLowerCase() === lower ||
        loc.pincode === q ||
        loc.city.toLowerCase().startsWith(lower) ||
        loc.area?.toLowerCase().includes(lower) ||
        loc.displayName.toLowerCase().includes(lower),
    );

    // 3. Query India Post Office Directory API
    let postalMatches: NormalizedLocation[] = [];
    try {
      postalMatches = await this.lookupIndiaPostOffice(q);
    } catch {
      // ignore
    }

    // 4. OpenStreetMap Verified Geocoding Search with addressdetails
    let osmResults: NormalizedLocation[] = [];
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=6&countrycodes=in&q=${encodeURIComponent(
          q,
        )}`,
        {
          headers: { Accept: 'application/json' },
          signal: controller.signal,
        },
      );
      clearTimeout(timeoutId);

      if (res.ok) {
        const results = await res.json();
        if (Array.isArray(results) && results.length > 0) {
          osmResults = results.map((item: any, idx: number) => {
            const addr = item.address || {};
            const parts = item.display_name.split(',');
            
            // Extract the most specific local Post Office / Village / Suburb / Town / City name
            const postOfficeOrLocality =
              addr.post_office ||
              addr.village ||
              addr.suburb ||
              addr.neighbourhood ||
              addr.town ||
              addr.city ||
              parts[0]?.trim() ||
              q;

            const district =
              addr.state_district ||
              addr.county ||
              addr.district ||
              parts[1]?.trim() ||
              'District';

            const state = addr.state || parts[parts.length - 2]?.trim() || 'India';
            let pincode = addr.postcode ? addr.postcode.replace(/\D/g, '').slice(0, 6) : null;
            const lat = Number(item.lat);
            const lon = Number(item.lon);

            // Automatically resolve pincode if missing from OSM
            if (!pincode) {
              const directMatch = POPULAR_INDIAN_LOCATIONS.find(
                (l) =>
                  l.city.toLowerCase() === postOfficeOrLocality.toLowerCase() ||
                  l.city.toLowerCase() === q.toLowerCase(),
              );
              if (directMatch) {
                pincode = directMatch.pincode;
              } else if (postalMatches.length > 0 && postalMatches[0].pincode) {
                pincode = postalMatches[0].pincode;
              } else {
                let closest = POPULAR_INDIAN_LOCATIONS[0];
                let minDist = Infinity;
                for (const l of POPULAR_INDIAN_LOCATIONS) {
                  const d = calculateHaversineDistanceKm(lat, lon, l.latitude, l.longitude);
                  if (d < minDist) {
                    minDist = d;
                    closest = l;
                  }
                }
                if (minDist < 35) {
                  pincode = closest.pincode;
                }
              }
            }

            return {
              id: `LOC-MAP-${idx}-${item.place_id || Date.now()}`,
              input: q,
              displayName: item.display_name,
              country: 'IN',
              countryName: 'India',
              state,
              stateCode: state.slice(0, 2).toUpperCase(),
              district,
              city: postOfficeOrLocality,
              area: addr.suburb || addr.neighbourhood || postOfficeOrLocality,
              pincode,
              latitude: lat,
              longitude: lon,
              source: 'search' as const,
              accuracy: 'exact' as const,
              radiusKm: 25,
              timezone: 'Asia/Kolkata',
            };
          });
        }
      }
    } catch {
      // Fallback to local
    }

    // Combine prioritizing curated & verified postal records
    const combined: NormalizedLocation[] = [];
    const seenKeys = new Set<string>();

    for (const loc of [...curatedMatches, ...postalMatches, ...osmResults]) {
      const key = `${loc.city.toLowerCase()}-${loc.pincode || loc.latitude.toFixed(2)}`;
      if (!seenKeys.has(key)) {
        seenKeys.add(key);
        combined.push(loc);
      }
    }

    if (combined.length > 0) return combined;

    // 5. Fallback to offline verified index
    return POPULAR_INDIAN_LOCATIONS.filter(
      (loc) =>
        loc.pincode?.includes(lower) ||
        loc.city?.toLowerCase().includes(lower) ||
        loc.area?.toLowerCase().includes(lower) ||
        loc.district?.toLowerCase().includes(lower) ||
        loc.displayName?.toLowerCase().includes(lower),
    );
  }

  async verifyLocationByName(name: string): Promise<LocationVerificationResult> {
    const trimmed = name.trim();
    if (!trimmed) {
      return {
        verified: false,
        candidates: [],
        isWrongName: true,
        errorMessage: 'Please enter a location name or pincode.',
      };
    }

    // 1. Check if it's a pincode
    if (/^\d{6}$/.test(trimmed)) {
      const pinResult = await this.resolvePincode(trimmed);
      if (pinResult) {
        return {
          verified: true,
          location: pinResult,
          candidates: [pinResult],
        };
      }
    }

    // 2. Query verified search
    const candidates = await this.search(trimmed);
    if (candidates && candidates.length > 0) {
      return {
        verified: true,
        location: candidates[0],
        candidates,
      };
    }

    // 3. Unrecognized or wrong name
    return {
      verified: false,
      candidates: [],
      isWrongName: true,
      errorMessage: `Location "${trimmed}" could not be verified on the map. Please pinpoint on map.`,
    };
  }

  async reverseGeocode(latitude: number, longitude: number): Promise<NormalizedLocation | null> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&addressdetails=1&lat=${latitude}&lon=${longitude}`,
        {
          headers: { Accept: 'application/json' },
          signal: controller.signal,
        },
      );
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data && data.address) {
          const addr = data.address;
          const postOfficeOrLocality =
            addr.post_office ||
            addr.village ||
            addr.suburb ||
            addr.neighbourhood ||
            addr.town ||
            addr.city ||
            'Location';
          const area = addr.suburb || addr.neighbourhood || addr.road || postOfficeOrLocality;
          let pincode = addr.postcode?.replace(/\D/g, '').slice(0, 6) || null;
          const district = addr.state_district || addr.county || addr.district || 'District';
          const state = addr.state || 'India';

          // If pincode missing from OSM reverse geocode, resolve via nearest postal match
          if (!pincode) {
            const match = POPULAR_INDIAN_LOCATIONS.find(
              (l) =>
                l.city.toLowerCase() === postOfficeOrLocality.toLowerCase() ||
                (l.district?.toLowerCase() === district.toLowerCase() &&
                  calculateHaversineDistanceKm(latitude, longitude, l.latitude, l.longitude) < 25),
            );
            if (match) {
              pincode = match.pincode;
            } else {
              let closest = POPULAR_INDIAN_LOCATIONS[0];
              let minDist = Infinity;
              for (const l of POPULAR_INDIAN_LOCATIONS) {
                const d = calculateHaversineDistanceKm(latitude, longitude, l.latitude, l.longitude);
                if (d < minDist) {
                  minDist = d;
                  closest = l;
                }
              }
              if (minDist < 35) {
                pincode = closest.pincode;
              }
            }
          }

          return {
            id: `LOC-GPS-${pincode || `${latitude.toFixed(2)}-${longitude.toFixed(2)}`}`,
            input: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
            displayName: data.display_name || `${postOfficeOrLocality}, ${district}, ${state} ${pincode ? `(${pincode})` : ''}`,
            country: 'IN',
            countryName: 'India',
            state,
            stateCode: state.slice(0, 2).toUpperCase(),
            district,
            city: postOfficeOrLocality,
            area: area || null,
            pincode,
            latitude,
            longitude,
            source: 'gps',
            accuracy: 'exact',
            radiusKm: 25,
            timezone: 'Asia/Kolkata',
          };
        }
      }
    } catch {
      // Fallback
    }

    // Nearest known location
    let nearest = POPULAR_INDIAN_LOCATIONS[0];
    let minDist = Infinity;
    for (const loc of POPULAR_INDIAN_LOCATIONS) {
      const d = calculateHaversineDistanceKm(latitude, longitude, loc.latitude, loc.longitude);
      if (d < minDist) {
        minDist = d;
        nearest = loc;
      }
    }

    return {
      ...nearest,
      id: `LOC-NEAR-${latitude.toFixed(2)}-${longitude.toFixed(2)}`,
      input: `${latitude}, ${longitude}`,
      latitude,
      longitude,
      source: 'gps',
    };
  }

  async resolveAllPincodePostOffices(pincode: string): Promise<NormalizedLocation[]> {
    const cleanPin = pincode.replace(/\D/g, '').slice(0, 6);
    if (cleanPin.length !== 6) return [];

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const res = await fetch(`https://api.postalpincode.in/pincode/${cleanPin}`, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const json = await res.json();
        if (Array.isArray(json) && json[0]?.Status === 'Success' && json[0]?.PostOffice?.length > 0) {
          const list: NormalizedLocation[] = [];

          for (const po of json[0].PostOffice) {
            const postOfficeName = po.Name; // e.g. "Parakkai"
            const district = po.District || 'District';
            const state = po.State || 'State';
            const block = po.Block;

            list.push({
              id: `LOC-${cleanPin}-${postOfficeName.replace(/\s+/g, '-').toLowerCase()}`,
              input: cleanPin,
              displayName: `${postOfficeName} P.O., ${district}, ${state} (${cleanPin})`,
              country: 'IN',
              countryName: 'India',
              state,
              stateCode: state.slice(0, 2).toUpperCase(),
              district,
              city: postOfficeName,
              area: block && block !== postOfficeName ? `${postOfficeName} (${block})` : postOfficeName,
              pincode: cleanPin,
              latitude: 0,
              longitude: 0,
              source: 'pincode',
              accuracy: 'pincode',
              radiusKm: 25,
              timezone: 'Asia/Kolkata',
            });
          }

          // Geocode coordinates for first/primary post office
          try {
            const primary = list[0];
            const osmRes = await fetch(
              `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=in&q=${encodeURIComponent(
                `${primary.city}, ${primary.district}, ${primary.state} ${cleanPin}`,
              )}`,
            );
            if (osmRes.ok) {
              const osmData = await osmRes.json();
              if (osmData?.[0]) {
                const lat = Number(osmData[0].lat);
                const lng = Number(osmData[0].lon);
                list.forEach((item) => {
                  item.latitude = lat;
                  item.longitude = lng;
                });
              }
            }
          } catch {
            // Coordinate fallback
          }

          return list;
        }
      }
    } catch {
      // Fallback
    }

    return [];
  }

  async resolvePincode(pincode: string): Promise<NormalizedLocation | null> {
    const cleanPin = pincode.replace(/\D/g, '').slice(0, 6);
    if (cleanPin.length !== 6) return null;

    // Check popular locations first for zero-latency response
    const cached = POPULAR_INDIAN_LOCATIONS.find((l) => l.pincode === cleanPin);
    if (cached) return cached;

    // 1. Try Indian Postal API: api.postalpincode.in
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const res = await fetch(`https://api.postalpincode.in/pincode/${cleanPin}`, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const json = await res.json();
        if (Array.isArray(json) && json[0]?.Status === 'Success' && json[0]?.PostOffice?.length > 0) {
          const po = json[0].PostOffice[0];
          const postOfficeName = po.Name; // E.g. "Parakkai"
          const district = po.District || 'District'; // E.g. "Kanyakumari"
          const state = po.State || 'State'; // E.g. "Tamil Nadu"
          const block = po.Block; // E.g. "Agastheeswaram"

          // Crucial: Use Post Office location name as the primary city/place name
          const city = postOfficeName;
          const area = block && block !== postOfficeName ? `${postOfficeName} (${block})` : postOfficeName;

          // Resolve Coordinates
          let lat = 20.5937;
          let lng = 78.9629;

          try {
            const osmRes = await fetch(
              `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=in&q=${encodeURIComponent(
                `${postOfficeName}, ${district}, ${state} ${cleanPin}`,
              )}`,
            );
            if (osmRes.ok) {
              const osmData = await osmRes.json();
              if (osmData?.[0]) {
                lat = Number(osmData[0].lat);
                lng = Number(osmData[0].lon);
              }
            }
          } catch {
            // Coordinate fetch fallback
          }

          return {
            id: `LOC-${cleanPin}`,
            input: cleanPin,
            displayName: `${postOfficeName} P.O., ${district}, ${state} (${cleanPin})`,
            country: 'IN',
            countryName: 'India',
            state,
            stateCode: state.slice(0, 2).toUpperCase(),
            district,
            city,
            area,
            pincode: cleanPin,
            latitude: lat,
            longitude: lng,
            source: 'pincode',
            accuracy: 'exact',
            radiusKm: 25,
            timezone: 'Asia/Kolkata',
          };
        }
      }
    } catch {
      // Fallback
    }

    return {
      id: `LOC-${cleanPin}`,
      input: cleanPin,
      displayName: `Pincode ${cleanPin}, India`,
      country: 'IN',
      countryName: 'India',
      state: 'India',
      district: 'District',
      city: `Pincode ${cleanPin}`,
      area: null,
      pincode: cleanPin,
      latitude: 11.0168,
      longitude: 76.9558,
      source: 'pincode',
      accuracy: 'pincode',
      radiusKm: 25,
      timezone: 'Asia/Kolkata',
    };
  }

  async searchNearby(
    latitude: number,
    longitude: number,
    radiusKm: number,
    criteria: Partial<LocationFilterCriteria> = {},
  ): Promise<MapMarkerData[]> {
    return locationRepository.queryNearbyServices({
      location: {
        latitude,
        longitude,
        radiusKm,
      },
      ...criteria,
    });
  }

  async getCurrentLocation(): Promise<NormalizedLocation | null> {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      return DEFAULT_NORMALIZED_LOCATION;
    }

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          const resolved = await this.reverseGeocode(latitude, longitude);
          resolve(resolved || DEFAULT_NORMALIZED_LOCATION);
        },
        () => resolve(DEFAULT_NORMALIZED_LOCATION),
        { timeout: 5000, enableHighAccuracy: false },
      );
    });
  }

  getMapUrl(latitude: number, longitude: number, zoom: number = 13): string {
    return `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.08}%2C${
      latitude - 0.08
    }%2C${longitude + 0.08}%2C${latitude + 0.08}&layer=mapnik&marker=${latitude}%2C${longitude}`;
  }
}

const SESSION_LOCATION_KEY = 'architectany_session_location';
const SESSION_PROMPT_SEEN_KEY = 'architectany_location_prompt_seen';

/**
 * Global Location Service Singleton with Session Storage Persistence
 */
class LocationService {
  private provider: LocationProvider = new LiveIndiaLocationProvider();
  private currentLocation: NormalizedLocation = this.loadInitialLocation();
  private currentRadiusKm: number = this.currentLocation.radiusKm || 25;
  private mapConfig: MapProviderConfig = {
    provider: 'osm',
    enabled: true,
  };
  private listeners: Array<(loc: NormalizedLocation) => void> = [];

  private loadInitialLocation(): NormalizedLocation {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      try {
        const cached = window.sessionStorage.getItem(SESSION_LOCATION_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed && parsed.city) {
            return parsed;
          }
        }
      } catch (e) {
        console.warn('Could not read session location:', e);
      }
    }
    return DEFAULT_NORMALIZED_LOCATION;
  }

  isLocationSetInSession(): boolean {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      return Boolean(window.sessionStorage.getItem(SESSION_LOCATION_KEY));
    }
    return false;
  }

  hasPromptBeenDismissed(): boolean {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      return Boolean(window.sessionStorage.getItem(SESSION_PROMPT_SEEN_KEY));
    }
    return false;
  }

  markPromptDismissed(): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      try {
        window.sessionStorage.setItem(SESSION_PROMPT_SEEN_KEY, 'true');
      } catch (e) {
        // ignore
      }
    }
  }

  setProvider(provider: LocationProvider): void {
    this.provider = provider;
  }

  getProvider(): LocationProvider {
    return this.provider;
  }

  getLocation(): NormalizedLocation {
    return this.currentLocation;
  }

  getRadiusKm(): number {
    return this.currentRadiusKm;
  }

  setRadiusKm(radiusKm: number): void {
    this.currentRadiusKm = radiusKm;
    this.setLocation({ radiusKm });
  }

  getMapConfig(): MapProviderConfig {
    return this.mapConfig;
  }

  setMapConfig(config: Partial<MapProviderConfig>): void {
    this.mapConfig = { ...this.mapConfig, ...config };
  }

  setLocation(locationUpdate: Partial<NormalizedLocation>): void {
    const isNewPlace = Boolean(
      (locationUpdate.city && locationUpdate.city !== this.currentLocation.city) ||
      (locationUpdate.displayName && locationUpdate.displayName !== this.currentLocation.displayName) ||
      (locationUpdate.id && locationUpdate.id !== this.currentLocation.id) ||
      (locationUpdate.latitude !== undefined &&
        Math.abs((locationUpdate.latitude || 0) - (this.currentLocation.latitude || 0)) > 0.05)
    );

    let resolvedPincode = locationUpdate.pincode;

    // If changing to a new place and pincode was not explicitly provided:
    if (isNewPlace && (resolvedPincode === undefined || resolvedPincode === null)) {
      const searchTarget = (locationUpdate.city || locationUpdate.displayName || '').toLowerCase();
      const match = POPULAR_INDIAN_LOCATIONS.find(
        (l) =>
          l.city.toLowerCase() === searchTarget ||
          searchTarget.includes(l.city.toLowerCase()) ||
          l.displayName.toLowerCase().includes(searchTarget),
      );
      if (match) {
        resolvedPincode = match.pincode;
      } else if (locationUpdate.latitude && locationUpdate.longitude) {
        let closest = POPULAR_INDIAN_LOCATIONS[0];
        let minDist = Infinity;
        for (const l of POPULAR_INDIAN_LOCATIONS) {
          const d = calculateHaversineDistanceKm(
            locationUpdate.latitude,
            locationUpdate.longitude,
            l.latitude,
            l.longitude,
          );
          if (d < minDist) {
            minDist = d;
            closest = l;
          }
        }
        if (minDist < 35) {
          resolvedPincode = closest.pincode;
        } else {
          resolvedPincode = null;
        }
      } else {
        resolvedPincode = null;
      }
    } else if (resolvedPincode === undefined) {
      resolvedPincode = this.currentLocation.pincode;
    }

    this.currentLocation = {
      ...this.currentLocation,
      ...locationUpdate,
      pincode: resolvedPincode,
    };
    
    // Save to sessionStorage so it persists until session closes out
    if (typeof window !== 'undefined' && window.sessionStorage) {
      try {
        window.sessionStorage.setItem(
          SESSION_LOCATION_KEY,
          JSON.stringify(this.currentLocation),
        );
        window.sessionStorage.setItem(SESSION_PROMPT_SEEN_KEY, 'true');
      } catch (e) {
        console.warn('Could not save location to sessionStorage:', e);
      }
    }

    this.notify();
  }

  async resolveLocationInput(input: string): Promise<NormalizedLocation | null> {
    const res = await this.provider.resolveLocation(input);
    if (res) {
      this.setLocation(res);
    }
    return res;
  }

  async resolvePincode(pincode: string): Promise<NormalizedLocation | null> {
    const res = await this.provider.resolvePincode(pincode);
    if (res) {
      this.setLocation(res);
    }
    return res;
  }

  async resolveAllPincodePostOffices(pincode: string): Promise<NormalizedLocation[]> {
    if ('resolveAllPincodePostOffices' in this.provider) {
      return (this.provider as any).resolveAllPincodePostOffices(pincode);
    }
    const single = await this.provider.resolvePincode(pincode);
    return single ? [single] : [];
  }

  async verifyLocationByName(name: string): Promise<LocationVerificationResult> {
    if ('verifyLocationByName' in this.provider) {
      return (this.provider as any).verifyLocationByName(name);
    }
    const candidates = await this.provider.search(name);
    return {
      verified: candidates.length > 0,
      location: candidates[0],
      candidates,
      isWrongName: candidates.length === 0,
      errorMessage: candidates.length === 0 ? `Location "${name}" could not be verified on map.` : undefined,
    };
  }

  async requestCurrentLocation(): Promise<NormalizedLocation | null> {
    const loc = await this.provider.getCurrentLocation();
    if (loc) {
      this.setLocation(loc);
    }
    return loc;
  }

  async searchLocations(query: string): Promise<NormalizedLocation[]> {
    return this.provider.search(query);
  }

  async queryServices(criteria: Partial<LocationFilterCriteria> = {}): Promise<MapMarkerData[]> {
    const current = this.currentLocation;
    return locationRepository.queryNearbyServices({
      location: {
        latitude: current.latitude,
        longitude: current.longitude,
        radiusKm: criteria.location?.radiusKm || current.radiusKm || this.currentRadiusKm,
        pincode: current.pincode,
        city: current.city,
      },
      ...criteria,
    });
  }

  subscribe(listener: (loc: NormalizedLocation) => void): () => void {
    this.listeners.push(listener);
    listener(this.currentLocation);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l(this.currentLocation));
  }
}

export const locationService = new LocationService();
export { SUPPORTED_DISTANCE_RADII };

