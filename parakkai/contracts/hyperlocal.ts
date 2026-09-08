/**
 * P-PARAKKAI-001
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * IP Owner: ArchitectAny / Vijay Kumar K.
 * Status: ACTIVE
 * Version: v0.1.0
 */

export type HyperlocalCategory =
  | 'FOOD_AND_DINING'
  | 'FLOWERS_AND_GARLANDS'
  | 'POOJA_ITEMS'
  | 'ACCOMMODATION'
  | 'TRANSPORT_AUTO_TAXI'
  | 'HANDICRAFTS_ART'
  | 'PHOTOGRAPHY_GUIDE'
  | 'MEDICAL_HEALTH'
  | 'DAILY_SERVICES'
  | 'CATERING';

export interface HyperlocalBusiness {
  businessId: string;
  name: string;
  tamilName?: string;
  category: HyperlocalCategory;
  description: string;
  address: string;
  distanceFromTempleMeters: number;
  phone: string;
  whatsappNumber: string;
  openingHours: string;
  priceRange: '₹' | '₹₹' | '₹₹₹';
  rating: number;
  reviewsCount: number;
  verified: boolean;
  featured: boolean;
  imageUrl: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  servicesOffered: string[];
  status: 'ACTIVE' | 'TEMPORARILY_CLOSED' | 'VERIFICATION_PENDING';
}
