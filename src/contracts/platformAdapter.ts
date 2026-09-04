/**
 * Platform Adapters for Multivendor Marketplace Implementations
 * 
 * Establishes standard interfaces for:
 * - Shopify
 * - Zoho Commerce
 * - Magento / Adobe Commerce
 * - OpenCart
 */

export interface PlatformProduct {
  id: string;
  vendorId: string;
  title: string;
  price: number;
  inventory: number;
  status: 'active' | 'draft' | 'archived';
}

export interface PlatformVendor {
  id: string;
  name: string;
  email: string;
  commissionRate: number;
  serviceRadiusKm?: number;
  status: 'active' | 'pending' | 'suspended';
}

export interface IMarketplacePlatformAdapter {
  platformName: 'Shopify' | 'Zoho Commerce' | 'Magento / Adobe Commerce' | 'OpenCart';
  getPlatformCapabilities(): string[];
  getVendors(): Promise<PlatformVendor[]>;
  getProducts(vendorId?: string): Promise<PlatformProduct[]>;
  calculateCommission(orderAmount: number, vendorId: string): number;
}

export class MockPlatformAdapter implements IMarketplacePlatformAdapter {
  constructor(public platformName: 'Shopify' | 'Zoho Commerce' | 'Magento / Adobe Commerce' | 'OpenCart') {}

  getPlatformCapabilities(): string[] {
    return [
      'Multi-Seller Authentication & OAuth',
      'Unified Cart & Multi-vendor Split Checkout',
      'Automated Payout & Commission Ledger',
      'Real-time Inventory Synchronization',
      'Vendor KYC & Approval Gateway',
    ];
  }

  async getVendors(): Promise<PlatformVendor[]> {
    return [
      { id: 'VND-001', name: 'Coimbatore Grand Royal Palace Banquet', email: 'royal@events.cbe', commissionRate: 10, serviceRadiusKm: 50, status: 'active' },
      { id: 'VND-002', name: 'Kongu Traditional Feast Caterers', email: 'orders@kongufeast.in', commissionRate: 8, serviceRadiusKm: 40, status: 'active' },
      { id: 'VND-003', name: 'Studio Lens & Flash Cinematography', email: 'booking@lensflash.co', commissionRate: 12, serviceRadiusKm: 100, status: 'active' },
    ];
  }

  async getProducts(vendorId?: string): Promise<PlatformProduct[]> {
    const products: PlatformProduct[] = [
      { id: 'PRD-01', vendorId: 'VND-001', title: 'Grand Crystal Ballroom (1200 Pax)', price: 150000, inventory: 1, status: 'active' },
      { id: 'PRD-02', vendorId: 'VND-002', title: 'South Indian Wedding Buffet (Per Plate)', price: 450, inventory: 5000, status: 'active' },
      { id: 'PRD-03', vendorId: 'VND-003', title: '4K Cinematic Drone & Wedding Film Package', price: 65000, inventory: 10, status: 'active' },
    ];
    if (vendorId) return products.filter((p) => p.vendorId === vendorId);
    return products;
  }

  calculateCommission(orderAmount: number, vendorId: string): number {
    return orderAmount * 0.1; // Default 10%
  }
}
