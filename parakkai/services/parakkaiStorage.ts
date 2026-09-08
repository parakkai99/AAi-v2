/**
 * P-PARAKKAI-001
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * IP Owner: ArchitectAny / Vijay Kumar K.
 * Status: ACTIVE
 * Version: v0.1.0
 */

import { SiteBrandConfig, NavigationRailConfig } from '../contracts/brand';
import { ParakkaiThemeConfig } from '../contracts/theme';
import { PoojaBookingRecord } from '../contracts/temple';
import { EventBookingRecord, ParakkaiEvent } from '../contracts/event';
import { TempleConcernRecord, CommunityIdeaRecord } from '../contracts/community';
import { HypermarketOrderRecord, HypermarketProduct } from '../contracts/marketplace';
import { ParakkaiUser, UserRole } from '../contracts/user';
import { ParakkaiAuditRecord, AuditActionType } from '../contracts/audit';
import { ParakkaiMediaItem } from '../contracts/media';
import { ParakkaiBlogPost } from '../contracts/blog';
import { HyperlocalBusiness } from '../contracts/hyperlocal';

// Defaults
import siteConfigJson from '../config/siteConfig.json';
import navigationConfigJson from '../config/navigationConfig.json';
import themeConfigJson from '../config/themeConfig.json';
import { DEFAULT_PARAKKAI_EVENTS } from '../data/defaultEvents';
import { DEFAULT_PARAKKAI_MEDIA } from '../data/defaultMedia';
import { DEFAULT_HYPERLOCAL_BUSINESSES } from '../data/defaultHyperlocal';
import { DEFAULT_HYPERMARKET_PRODUCTS } from '../data/defaultProducts';
import { DEFAULT_BLOG_POSTS } from '../data/defaultBlog';

const STORAGE_PREFIX = 'aai_parakkai_v1_';

export class ParakkaiStorageAdapter {
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  private getItem<T>(key: string, fallback: T): T {
    if (!this.isBrowser()) return fallback;
    try {
      const data = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.warn(`[ParakkaiStorage] Failed to read ${key}:`, e);
      return fallback;
    }
  }

  private setItem<T>(key: string, value: T): void {
    if (!this.isBrowser()) return;
    try {
      localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value));
    } catch (e) {
      console.warn(`[ParakkaiStorage] Failed to save ${key}:`, e);
    }
  }

  // Site Configuration
  getSiteConfig(): SiteBrandConfig {
    return this.getItem<SiteBrandConfig>('site_config', siteConfigJson as unknown as SiteBrandConfig);
  }

  saveSiteConfig(config: SiteBrandConfig, performedBy: string = 'TEMPLE_ADMIN'): void {
    this.setItem('site_config', config);
    this.logAudit('BRAND_UPDATED', 'SiteBrandConfig', 'parakkai', performedBy, 'Updated temple site branding');
  }

  // Navigation Configuration
  getNavigationConfig(): NavigationRailConfig {
    const defaultConf = navigationConfigJson as unknown as NavigationRailConfig;
    const stored = this.getItem<NavigationRailConfig>('nav_config', defaultConf);
    if (
      !stored ||
      !Array.isArray(stored.headerLinks) ||
      !Array.isArray(stored.rightRailItems) ||
      !Array.isArray(stored.leftRailItems)
    ) {
      return defaultConf;
    }
    return stored;
  }

  saveNavigationConfig(config: NavigationRailConfig, performedBy: string = 'TEMPLE_ADMIN'): void {
    this.setItem('nav_config', config);
    this.logAudit('NAVIGATION_UPDATED', 'NavigationRailConfig', 'rails', performedBy, 'Updated navigation links');
  }

  // Theme Configuration
  getThemeConfig(): ParakkaiThemeConfig {
    const defaultConf = themeConfigJson as unknown as ParakkaiThemeConfig;
    const stored = this.getItem<ParakkaiThemeConfig>('theme_config_v2', defaultConf);
    if (!stored || !stored.availableThemes || !stored.availableThemes.some(t => t.id === stored.activeThemeId)) {
      return defaultConf;
    }
    // Per P-PARAKKAI-004 contract: freeze visual direction to dark ArchitectAny theme
    if (stored.activeThemeId === 'parakkai-sky') {
      stored.activeThemeId = 'parakkai-twilight-deepam';
    }
    return stored;
  }

  saveThemeConfig(config: ParakkaiThemeConfig, performedBy: string = 'TEMPLE_ADMIN'): void {
    this.setItem('theme_config_v2', config);
    this.logAudit('THEME_CHANGED', 'ParakkaiThemeConfig', config.activeThemeId, performedBy, `Theme set to ${config.activeThemeId}`);
  }

  // Events
  getEvents(): ParakkaiEvent[] {
    return this.getItem<ParakkaiEvent[]>('events', DEFAULT_PARAKKAI_EVENTS);
  }

  saveEvents(events: ParakkaiEvent[], performedBy: string = 'TEMPLE_ADMIN'): void {
    this.setItem('events', events);
    this.logAudit('EVENT_UPDATED', 'ParakkaiEvent', 'list', performedBy, 'Updated temple festival and events roster');
  }

  // Media
  getMedia(): ParakkaiMediaItem[] {
    return this.getItem<ParakkaiMediaItem[]>('media', DEFAULT_PARAKKAI_MEDIA);
  }

  saveMedia(items: ParakkaiMediaItem[]): void {
    this.setItem('media', items);
  }

  // Blog
  getBlogPosts(): ParakkaiBlogPost[] {
    return this.getItem<ParakkaiBlogPost[]>('blogs', DEFAULT_BLOG_POSTS);
  }

  saveBlogPosts(posts: ParakkaiBlogPost[], performedBy: string = 'EDITOR'): void {
    this.setItem('blogs', posts);
    this.logAudit('BLOG_POST_PUBLISHED', 'ParakkaiBlogPost', 'list', performedBy, 'Updated temple blogs');
  }

  // Hyperlocal Businesses
  getBusinesses(): HyperlocalBusiness[] {
    return this.getItem<HyperlocalBusiness[]>('businesses', DEFAULT_HYPERLOCAL_BUSINESSES);
  }

  saveBusinesses(list: HyperlocalBusiness[], performedBy: string = 'ADMIN'): void {
    this.setItem('businesses', list);
    this.logAudit('BUSINESS_VERIFIED', 'HyperlocalBusiness', 'list', performedBy, 'Updated hyperlocal business directory');
  }

  // Hypermarket Products
  getProducts(): HypermarketProduct[] {
    return this.getItem<HypermarketProduct[]>('products', DEFAULT_HYPERMARKET_PRODUCTS);
  }

  saveProducts(list: HypermarketProduct[], performedBy: string = 'ADMIN'): void {
    this.setItem('products', list);
    this.logAudit('PRODUCT_UPDATED', 'HypermarketProduct', 'list', performedBy, 'Updated hypermarket catalog');
  }

  // Pooja Bookings
  getPoojaBookings(): PoojaBookingRecord[] {
    return this.getItem<PoojaBookingRecord[]>('pooja_bookings', []);
  }

  addPoojaBooking(booking: PoojaBookingRecord): void {
    const list = this.getPoojaBookings();
    list.unshift(booking);
    this.setItem('pooja_bookings', list);
  }

  // Event Bookings
  getEventBookings(): EventBookingRecord[] {
    return this.getItem<EventBookingRecord[]>('event_bookings', []);
  }

  addEventBooking(booking: EventBookingRecord): void {
    const list = this.getEventBookings();
    list.unshift(booking);
    this.setItem('event_bookings', list);
  }

  // Concerns
  getConcerns(): TempleConcernRecord[] {
    const defaultConcerns: TempleConcernRecord[] = [
      {
        concernId: 'cn-101',
        category: 'LIGHTING',
        title: 'Dim lamp post near North Lake Bund path',
        description: 'The solar street light on the lake pathway flicker around 7:30 PM. Needs bulb replacement for evening devotees walking to temple.',
        locationArea: 'North Lake Bund & Ratha Veethi Corner',
        priority: 'MEDIUM',
        submittedByName: 'M. Senthil Nathan',
        submittedByPhone: '+91 94431 88200',
        status: 'ACKNOWLEDGED',
        adminNotes: 'Assigned to Village Panchayat Electrical Volunteer team for Tuesday check.',
        createdAt: '2026-09-05T14:30:00Z',
        updatedAt: '2026-09-06T09:00:00Z'
      }
    ];
    return this.getItem<TempleConcernRecord[]>('concerns', defaultConcerns);
  }

  saveConcerns(concerns: TempleConcernRecord[]): void {
    this.setItem('concerns', concerns);
  }

  addConcern(concern: TempleConcernRecord): void {
    const list = this.getConcerns();
    list.unshift(concern);
    this.saveConcerns(list);
  }

  updateConcernStatus(concernId: string, status: TempleConcernRecord['status'], notes?: string, adminRole: string = 'TEMPLE_ADMIN'): void {
    const list = this.getConcerns();
    const target = list.find((c) => c.concernId === concernId);
    if (target) {
      target.status = status;
      if (notes) target.adminNotes = notes;
      target.updatedAt = new Date().toISOString();
      this.saveConcerns(list);
      this.logAudit('CONCERN_STATUS_CHANGED', 'TempleConcernRecord', concernId, adminRole, `Concern status updated to ${status}`);
    }
  }

  // Community Ideas
  getIdeas(): CommunityIdeaRecord[] {
    const defaultIdeas: CommunityIdeaRecord[] = [
      {
        ideaId: 'id-201',
        title: 'Native Heritage Tree Grove around Parakkai Lake',
        description: 'Plant 200 indigenous Magizham, Punnai, and Arasa maram saplings along the western lake bund with drip irrigation to protect biodiversity.',
        category: 'LAKE_REVIVAL',
        submittedByName: 'K. Meenakshi Sundaram',
        submittedByContact: '+91 98420 33144',
        votesCount: 48,
        status: 'ACCEPTED',
        adminFeedback: 'Approved by Temple Trust and Village Council for monsoon planting drive.',
        createdAt: '2026-08-28T11:00:00Z'
      },
      {
        ideaId: 'id-202',
        title: 'Audio Guide QR Codes along the 7 Devotional Stations',
        description: 'Install discreet wooden plaques with QR codes at each of the 7 stations from Arasamotu Vinayakar to Golden Kodimaram so pilgrims can listen to Tamil/English sthala purana on their mobile phones.',
        category: 'PILGRIM_COMFORT',
        submittedByName: 'Vijay Kumar K.',
        submittedByContact: 'vijaya.k.kumar@gmail.com',
        votesCount: 89,
        status: 'PROPOSED',
        createdAt: '2026-09-02T16:00:00Z'
      }
    ];
    return this.getItem<CommunityIdeaRecord[]>('ideas', defaultIdeas);
  }

  saveIdeas(ideas: CommunityIdeaRecord[]): void {
    this.setItem('ideas', ideas);
  }

  addIdea(idea: CommunityIdeaRecord): void {
    const list = this.getIdeas();
    list.unshift(idea);
    this.saveIdeas(list);
  }

  voteIdea(ideaId: string): void {
    const list = this.getIdeas();
    const item = list.find((i) => i.ideaId === ideaId);
    if (item) {
      item.votesCount += 1;
      this.saveIdeas(list);
    }
  }

  // Hypermarket Orders
  getOrders(): HypermarketOrderRecord[] {
    return this.getItem<HypermarketOrderRecord[]>('orders', []);
  }

  addOrder(order: HypermarketOrderRecord): void {
    const list = this.getOrders();
    list.unshift(order);
    this.setItem('orders', list);
  }

  // Active User Profile & Auth
  getCurrentUser(): ParakkaiUser {
    const defaultUser: ParakkaiUser = {
      userId: 'usr-parakkai-devotee',
      name: 'Vijay Kumar K. (Architect)',
      email: 'vijaya.k.kumar@gmail.com',
      phone: '+91 94430 00000',
      role: 'SUPER_ADMIN',
      nativeVillage: 'Parakkai',
      isParakkaiResident: true,
      avatarUrl: '/assets/vijay-profile-sm.jpg',
      savedItemIds: ['pooja-sahasranamam', 'evt-panguni-utsavam'],
      joinedAt: '2026-01-01T00:00:00Z'
    };
    return this.getItem<ParakkaiUser>('current_user', defaultUser);
  }

  setCurrentUser(user: ParakkaiUser): void {
    this.setItem('current_user', user);
  }

  switchUserRole(newRole: UserRole): ParakkaiUser {
    const user = this.getCurrentUser();
    user.role = newRole;
    this.setCurrentUser(user);
    this.logAudit('USER_ROLE_CHANGED', 'ParakkaiUser', user.userId, 'SYSTEM', `Role switched to ${newRole}`);
    return user;
  }

  // Audit Logs
  getAuditLogs(): ParakkaiAuditRecord[] {
    const defaultLogs: ParakkaiAuditRecord[] = [
      {
        auditId: 'aud-001',
        action: 'SYSTEM_CONFIG_UPDATED',
        entityType: 'System',
        entityId: 'P-PARAKKAI-001',
        performedByUserId: 'vijaya.k.kumar@gmail.com',
        performedByRole: 'SUPER_ADMIN',
        summary: 'P-PARAKKAI-001 framework initialized for Arulmigu Madhusoodhana Perumal Temple',
        timestamp: '2026-09-07T10:00:00Z'
      }
    ];
    return this.getItem<ParakkaiAuditRecord[]>('audit_logs', defaultLogs);
  }

  logAudit(action: AuditActionType, entityType: string, entityId: string, performedByRole: string, summary: string): void {
    const logs = this.getAuditLogs();
    const newLog: ParakkaiAuditRecord = {
      auditId: `aud-${Date.now().toString(36)}`,
      action,
      entityType,
      entityId,
      performedByUserId: this.getCurrentUser().email,
      performedByRole,
      summary,
      timestamp: new Date().toISOString()
    };
    logs.unshift(newLog);
    if (logs.length > 200) logs.pop();
    this.setItem('audit_logs', logs);
  }
}

export const parakkaiStorage = new ParakkaiStorageAdapter();
