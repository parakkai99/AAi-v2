/**
 * P-PARAKKAI-001
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * IP Owner: ArchitectAny / Vijay Kumar K.
 * Status: ACTIVE
 * Version: v0.1.0
 */

import { parakkaiStorage } from './parakkaiStorage';
import { SiteBrandConfig, NavigationRailConfig } from '../contracts/brand';
import { ParakkaiThemeConfig, ParakkaiThemeDefinition } from '../contracts/theme';
import {
  DEFAULT_TEMPLE_SANCTUM,
  DEFAULT_TEMPLE_SCHEDULES,
  DEFAULT_POOJA_OFFERINGS,
  DASAVATARAM_ITEMS
} from '../data/defaultTempleData';
import { DEFAULT_JOURNEY_STATIONS } from '../data/defaultJourneys';
import {
  TempleSanctumDetail,
  TempleTimingSchedule,
  PoojaOfferingItem,
  PoojaBookingRecord,
  CinematicJourneyStation
} from '../contracts/temple';
import { ParakkaiEvent, EventBookingRecord } from '../contracts/event';
import { ParakkaiMediaItem } from '../contracts/media';
import { ParakkaiBlogPost } from '../contracts/blog';
import { TempleConcernRecord, CommunityIdeaRecord } from '../contracts/community';
import { HyperlocalBusiness } from '../contracts/hyperlocal';
import { HypermarketProduct, HypermarketOrderRecord, CartItem } from '../contracts/marketplace';
import { ParakkaiUser, UserRole } from '../contracts/user';
import { ParakkaiAuditRecord } from '../contracts/audit';

export class ParakkaiService {
  // Config
  getSiteConfig(): SiteBrandConfig {
    return parakkaiStorage.getSiteConfig();
  }

  updateSiteConfig(config: SiteBrandConfig, userRole: string = 'TEMPLE_ADMIN'): void {
    parakkaiStorage.saveSiteConfig(config, userRole);
  }

  getNavigationConfig(): NavigationRailConfig {
    return parakkaiStorage.getNavigationConfig();
  }

  updateNavigationConfig(config: NavigationRailConfig, userRole: string = 'TEMPLE_ADMIN'): void {
    parakkaiStorage.saveNavigationConfig(config, userRole);
  }

  getThemeConfig(): ParakkaiThemeConfig {
    return parakkaiStorage.getThemeConfig();
  }

  getActiveTheme(): ParakkaiThemeDefinition {
    const config = this.getThemeConfig();
    const found = config.availableThemes.find((t) => t.id === config.activeThemeId);
    return found || config.availableThemes[0];
  }

  setActiveTheme(themeId: string, userRole: string = 'TEMPLE_ADMIN'): void {
    const config = this.getThemeConfig();
    config.activeThemeId = themeId;
    parakkaiStorage.saveThemeConfig(config, userRole);
  }

  // Temple & Journeys
  getTempleSanctum(): TempleSanctumDetail {
    return DEFAULT_TEMPLE_SANCTUM;
  }

  getTempleSchedules(): TempleTimingSchedule[] {
    return DEFAULT_TEMPLE_SCHEDULES;
  }

  getPoojaOfferings(): PoojaOfferingItem[] {
    return DEFAULT_POOJA_OFFERINGS;
  }

  getJourneyStations(): CinematicJourneyStation[] {
    return DEFAULT_JOURNEY_STATIONS;
  }

  getDasavataramList() {
    return DASAVATARAM_ITEMS;
  }

  // Sunlight Calculation (Daily 6:30 AM Miracle)
  getSunlightMiracleStatus(): {
    targetTime: string;
    isMiracleWindow: boolean;
    minutesUntilNextMiracle: number;
    description: string;
  } {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const totalMinutes = hours * 60 + minutes;
    const miracleStartMinutes = 6 * 60 + 25; // 6:25 AM
    const miracleEndMinutes = 6 * 60 + 40;   // 6:40 AM

    const isMiracleWindow = totalMinutes >= miracleStartMinutes && totalMinutes <= miracleEndMinutes;

    let minutesUntil = 0;
    if (totalMinutes < miracleStartMinutes) {
      minutesUntil = miracleStartMinutes - totalMinutes;
    } else if (totalMinutes > miracleEndMinutes) {
      minutesUntil = (24 * 60 - totalMinutes) + miracleStartMinutes;
    } else {
      minutesUntil = 0;
    }

    return {
      targetTime: '6:30 AM IST',
      isMiracleWindow,
      minutesUntilNextMiracle: minutesUntil,
      description: 'At 6:30 AM daily, dawn sunbeams bathe the Golden Kodimaram and touch the sacred lotus feet of Madhusoodhana Perumal.'
    };
  }

  // Bookings
  bookPooja(data: {
    offeringId: string;
    devoteeName: string;
    devoteePhone: string;
    devoteeEmail?: string;
    devoteeGothram?: string;
    devoteeNakshatram?: string;
    preferredDate: string;
    preferredTimeSlot: string;
    sankalpamNotes?: string;
  }): PoojaBookingRecord {
    const offerings = this.getPoojaOfferings();
    const offering = offerings.find((o) => o.id === data.offeringId) || offerings[0];
    const ref = `PKI-POOJA-${Date.now().toString(36).toUpperCase()}`;

    const record: PoojaBookingRecord = {
      bookingId: `pbk-${Date.now()}`,
      offeringId: offering.id,
      offeringName: offering.name,
      devoteeName: data.devoteeName,
      devoteePhone: data.devoteePhone,
      devoteeEmail: data.devoteeEmail,
      devoteeGothram: data.devoteeGothram,
      devoteeNakshatram: data.devoteeNakshatram,
      preferredDate: data.preferredDate,
      preferredTimeSlot: data.preferredTimeSlot,
      sankalpamNotes: data.sankalpamNotes,
      amountINR: offering.priceINR,
      paymentStatus: 'GATEWAY_REQUIRED',
      bookingStatus: 'RESERVED',
      createdAt: new Date().toISOString(),
      referenceNumber: ref
    };

    parakkaiStorage.addPoojaBooking(record);
    parakkaiStorage.logAudit('POOJA_SLOT_UPDATED', 'PoojaBookingRecord', record.bookingId, 'VISITOR', `Pooja reserved: ${offering.name} for ${data.devoteeName}`);
    return record;
  }

  getPoojaBookings(): PoojaBookingRecord[] {
    return parakkaiStorage.getPoojaBookings();
  }

  // Events
  getEvents(): ParakkaiEvent[] {
    return parakkaiStorage.getEvents();
  }

  bookEvent(eventId: string, devoteeName: string, devoteePhone: string, attendeesCount: number, email?: string): EventBookingRecord {
    const events = this.getEvents();
    const target = events.find((e) => e.eventId === eventId);
    const ref = `PKI-EVT-${Date.now().toString(36).toUpperCase()}`;

    const booking: EventBookingRecord = {
      bookingId: `ebk-${Date.now()}`,
      eventId,
      eventTitle: target ? target.title : 'Temple Event',
      devoteeName,
      devoteePhone,
      devoteeEmail: email,
      attendeesCount,
      bookingStatus: 'CONFIRMED',
      referenceNumber: ref,
      createdAt: new Date().toISOString()
    };

    if (target && target.bookedSeats !== undefined) {
      target.bookedSeats += attendeesCount;
      parakkaiStorage.saveEvents(events);
    }

    parakkaiStorage.addEventBooking(booking);
    parakkaiStorage.logAudit('BOOKING_STATUS_CHANGED', 'EventBookingRecord', booking.bookingId, 'VISITOR', `Event seats reserved for ${target?.title || eventId}`);
    return booking;
  }

  getEventBookings(): EventBookingRecord[] {
    return parakkaiStorage.getEventBookings();
  }

  // Media
  getMedia(): ParakkaiMediaItem[] {
    return parakkaiStorage.getMedia();
  }

  // Blog
  getBlogPosts(): ParakkaiBlogPost[] {
    return parakkaiStorage.getBlogPosts();
  }

  // Community
  getConcerns(): TempleConcernRecord[] {
    return parakkaiStorage.getConcerns();
  }

  submitConcern(data: Omit<TempleConcernRecord, 'concernId' | 'status' | 'createdAt' | 'updatedAt'>): TempleConcernRecord {
    const record: TempleConcernRecord = {
      ...data,
      concernId: `cn-${Date.now().toString(36)}`,
      status: 'SUBMITTED',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    parakkaiStorage.addConcern(record);
    parakkaiStorage.logAudit('CONCERN_STATUS_CHANGED', 'TempleConcernRecord', record.concernId, 'COMMUNITY', `New concern submitted: ${record.title}`);
    return record;
  }

  updateConcernStatus(concernId: string, status: TempleConcernRecord['status'], notes?: string): void {
    parakkaiStorage.updateConcernStatus(concernId, status, notes, this.getCurrentUser().role);
  }

  getIdeas(): CommunityIdeaRecord[] {
    return parakkaiStorage.getIdeas();
  }

  submitIdea(data: Omit<CommunityIdeaRecord, 'ideaId' | 'votesCount' | 'status' | 'createdAt'>): CommunityIdeaRecord {
    const record: CommunityIdeaRecord = {
      ...data,
      ideaId: `id-${Date.now().toString(36)}`,
      votesCount: 1,
      status: 'PROPOSED',
      createdAt: new Date().toISOString()
    };
    parakkaiStorage.addIdea(record);
    parakkaiStorage.logAudit('IDEA_STATUS_CHANGED', 'CommunityIdeaRecord', record.ideaId, 'COMMUNITY', `New community idea proposed: ${record.title}`);
    return record;
  }

  voteIdea(ideaId: string): void {
    parakkaiStorage.voteIdea(ideaId);
  }

  // Hyperlocal
  getHyperlocalBusinesses(): HyperlocalBusiness[] {
    return parakkaiStorage.getBusinesses();
  }

  // Marketplace
  getProducts(): HypermarketProduct[] {
    return parakkaiStorage.getProducts();
  }

  private cart: CartItem[] = [];

  getCart(): CartItem[] {
    return this.cart;
  }

  addToCart(product: HypermarketProduct, quantity: number = 1): CartItem[] {
    const existing = this.cart.find((item) => item.product.productId === product.productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.cart.push({ product, quantity });
    }
    return this.cart;
  }

  updateCartQuantity(productId: string, delta: number): CartItem[] {
    const existing = this.cart.find((item) => item.product.productId === productId);
    if (existing) {
      existing.quantity += delta;
      if (existing.quantity <= 0) {
        this.cart = this.cart.filter((item) => item.product.productId !== productId);
      }
    }
    return this.cart;
  }

  removeFromCart(productId: string): CartItem[] {
    this.cart = this.cart.filter((item) => item.product.productId !== productId);
    return this.cart;
  }

  clearCart(): void {
    this.cart = [];
  }

  createOrder(cartItems: CartItem[], customerName: string, customerPhone: string, deliveryAddress: string): HypermarketOrderRecord {
    const total = cartItems.reduce((sum, item) => sum + item.product.priceINR * item.quantity, 0);
    const order: HypermarketOrderRecord = {
      orderId: `ORD-${Date.now().toString(36).toUpperCase()}`,
      items: cartItems.map((ci) => ({
        productId: ci.product.productId,
        productName: ci.product.name,
        quantity: ci.quantity,
        unitPriceINR: ci.product.priceINR
      })),
      totalAmountINR: total,
      customerName,
      customerPhone,
      deliveryAddress,
      paymentMethod: 'PAY_AT_TEMPLE_COUNTER',
      orderStatus: 'SUBMITTED',
      createdAt: new Date().toISOString()
    };

    parakkaiStorage.addOrder(order);
    parakkaiStorage.logAudit('PRODUCT_UPDATED', 'HypermarketOrderRecord', order.orderId, 'CUSTOMER', `New order submitted for ₹${total}`);
    return order;
  }

  getOrders(): HypermarketOrderRecord[] {
    return parakkaiStorage.getOrders();
  }

  // User
  getCurrentUser(): ParakkaiUser {
    return parakkaiStorage.getCurrentUser();
  }

  switchUserRole(role: UserRole): ParakkaiUser {
    return parakkaiStorage.switchUserRole(role);
  }

  // Audit
  getAuditLogs(): ParakkaiAuditRecord[] {
    return parakkaiStorage.getAuditLogs();
  }
}

export const parakkaiService = new ParakkaiService();
