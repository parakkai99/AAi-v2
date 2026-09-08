/**
 * P-PARAKKAI-001
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * IP Owner: ArchitectAny / Vijay Kumar K.
 * Status: ACTIVE
 * Version: v0.1.0
 */

export type EventStatus = 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';

export interface ParakkaiEvent {
  eventId: string;
  title: string;
  tamilTitle?: string;
  description: string;
  category: 'FESTIVAL' | 'POOJA' | 'COMMUNITY' | 'DISCOURSE' | 'PROCESSION';
  isFestival: boolean;
  festivalName?: string;
  startDate: string;
  endDate?: string;
  startTime: string;
  endTime?: string;
  venue: string;
  location?: string;
  timing?: string;
  capacity?: number;
  maxCapacity?: number;
  bookedSeats?: number;
  bookingEnabled: boolean;
  requiresBooking?: boolean;
  bookingFeeINR: number;
  featured: boolean;
  image?: string;
  highlights: string[];
  contactPerson?: string;
  contactPhone?: string;
  status: EventStatus;
}

export interface EventBookingRecord {
  bookingId: string;
  eventId: string;
  eventTitle: string;
  devoteeName: string;
  devoteePhone: string;
  devoteeEmail?: string;
  attendeesCount: number;
  specialRequests?: string;
  bookingStatus: 'DRAFT' | 'RESERVED' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  referenceNumber: string;
  createdAt: string;
}
