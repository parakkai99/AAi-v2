/**
 * P-PARAKKAI-001
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * IP Owner: ArchitectAny / Vijay Kumar K.
 * Status: ACTIVE
 * Version: v0.1.0
 */

export interface TempleSanctumDetail {
  id: string;
  name: string;
  tamilName: string;
  deityTitle: string;
  deityDescription: string;
  presidingDeity?: string;
  tamilDeityName?: string;
  sacredMantra?: string;
  description?: string;
  facingDirection?: string;
  sthalaVriksham?: string;
  theertham?: string;
  consorts: string[];
  posture: 'Nindra' | 'Sayana' | 'Irundha';
  weapons: string[];
  historicalSignificance: string;
  morningSunlightStory: {
    time: string;
    description: string;
    tamilDescription: string;
    phenomenon: string;
  };
}

export interface TempleTimingSchedule {
  id: string;
  title: string;
  tamilTitle: string;
  timeSlot: string;
  timingSlot?: string;
  ritualName?: string;
  tamilRitualName?: string;
  devoteeParticipation?: string;
  description: string;
  isSpecialSunlightTime?: boolean;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'SPECIAL';
}

export interface PoojaOfferingItem {
  id: string;
  name: string;
  tamilName: string;
  description: string;
  category: 'ARCHANAI' | 'SEVAI' | 'ABHISHEKAM' | 'PRASADAM' | 'SPECIAL_POOJA';
  priceINR: number;
  currency: string;
  timing: string;
  timingSlot?: string;
  prasadamDescription?: string;
  availability: 'AVAILABLE' | 'FEW_SLOTS' | 'BOOKED_OUT' | 'SPECIAL_DAY_ONLY';
  bookingEnabled: boolean;
  instructions: string;
  deityTarget: string;
  image?: string;
  benefits?: string;
}

export interface PoojaBookingRecord {
  bookingId: string;
  offeringId: string;
  offeringName: string;
  devoteeName: string;
  devoteePhone: string;
  devoteeEmail?: string;
  devoteeGothram?: string;
  devoteeNakshatram?: string;
  preferredDate: string;
  preferredTimeSlot: string;
  sankalpamNotes?: string;
  amountINR: number;
  paymentStatus: 'PAYMENT_PENDING' | 'CONFIGURED_TEST' | 'GATEWAY_REQUIRED';
  bookingStatus: 'DRAFT' | 'RESERVED' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
  referenceNumber: string;
}

export interface CinematicJourneyStation {
  id: number;
  stationKey: string;
  number: string;
  title: string;
  subtitle: string;
  tamilTitle?: string;
  quote?: string;
  locationContext: string;
  description: string;
  spiritualMeaning: string;
  imageUrl?: string;
  soundCue?: string;
  details: string[];
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}
