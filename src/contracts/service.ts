/**
 * ArchitectAny AAi - Service, Provider & Map Marker Contracts
 */

export interface ServiceLocationData {
  serviceId: string;
  providerId: string;
  name: string;
  category: string;
  description?: string;
  location: {
    address: string;
    area?: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    latitude: number;
    longitude: number;
  };
  availability: boolean;
  rating?: number;
  priceModel?: string;
}

export interface MapMarker {
  id: string;
  type: 'service' | 'provider' | 'facility' | 'solution';
  name: string;
  latitude: number;
  longitude: number;
  serviceId?: string;
  providerId?: string;
  category?: string;
  address?: string;
  pincode?: string;
}

export interface ServiceSelectionState {
  selectedServiceId: string | null;
  selectedProviderId: string | null;
}
