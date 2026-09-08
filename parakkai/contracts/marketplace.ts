/**
 * P-PARAKKAI-001
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * IP Owner: ArchitectAny / Vijay Kumar K.
 * Status: ACTIVE
 * Version: v0.1.0
 */

export type ProductCategory =
  | 'TEMPLE_PRASADAM'
  | 'BRASS_LAMPS_AND_IDOLS'
  | 'POOJA_SAMAGRI'
  | 'ORGANIC_VILLAGE_PRODUCE'
  | 'PALMYRA_AND_COCONUT_CRAFTS'
  | 'DEVOTIONAL_BOOKS_AND_CDS'
  | 'TRADITIONAL_WEAVES';

export interface HypermarketProduct {
  productId: string;
  name: string;
  tamilName?: string;
  description: string;
  category: ProductCategory;
  priceINR: number;
  originalPriceINR?: number;
  currency: string;
  seller: {
    sellerId: string;
    businessName: string;
    isTempleTrustOrApproved: boolean;
    location: string;
  };
  inStock: boolean;
  stockCount: number;
  imageUrl: string;
  tags: string[];
  unit: string;
  featured: boolean;
}

export interface CartItem {
  product: HypermarketProduct;
  quantity: number;
}

export interface HypermarketOrderRecord {
  orderId: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    unitPriceINR: number;
  }[];
  totalAmountINR: number;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  paymentMethod: 'PAY_AT_TEMPLE_COUNTER' | 'UPI_QR_COLLECTION' | 'GATEWAY_PENDING';
  orderStatus: 'SUBMITTED' | 'PREPARING' | 'READY_FOR_PICKUP' | 'OUT_FOR_DELIVERY' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
}
