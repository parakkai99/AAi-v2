/**
 * P-PARAKKAI-001
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * IP Owner: ArchitectAny / Vijay Kumar K.
 * Status: ACTIVE
 * Version: v0.1.0
 */

import { HypermarketProduct } from '../contracts/marketplace';

export const DEFAULT_HYPERMARKET_PRODUCTS: HypermarketProduct[] = [
  {
    productId: 'prod-prasadam-box',
    name: 'Parakkai Temple Sacred Prasadam Blessing Kit',
    tamilName: 'பறக்கை திருக்கோவில் பிரசாதப் பெட்டகம்',
    description: 'Special consecrated devotional kit containing traditional sweet Laddu, pure cow ghee Panchamritam, temple Kumkum, Vibhuti, dry Thulasi theertham, and pocket Madhusoodhana Perumal photo with raksha thread.',
    category: 'TEMPLE_PRASADAM',
    priceINR: 250,
    originalPriceINR: 300,
    currency: 'INR',
    seller: {
      sellerId: 'sel-temple-trust',
      businessName: 'Parakkai Temple Prasadam Trust',
      isTempleTrustOrApproved: true,
      location: 'Temple Outer Prakaram Counter'
    },
    inStock: true,
    stockCount: 85,
    imageUrl: 'https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?auto=format&fit=crop&w=600&q=80',
    tags: ['Prasadam', 'Laddu', 'Kumkum', 'Devotion'],
    unit: '1 Gift Box (500g)',
    featured: true
  },
  {
    productId: 'prod-brass-deepam',
    name: 'Traditional Solid Brass Kuthu Vilakku (Pair 12-Inch)',
    tamilName: 'பாரம்பரிய பித்தளை குத்துவிளக்கு ஜோடி (12 அங்குலம்)',
    description: 'Exquisite hand-polished solid brass oil lamps featuring an auspicious five-wick petal cup and sacred Annam bird finial on top. Handcrafted by master artisans.',
    category: 'BRASS_LAMPS_AND_IDOLS',
    priceINR: 1450,
    originalPriceINR: 1800,
    currency: 'INR',
    seller: {
      sellerId: 'sel-krishna-pooja',
      businessName: 'Sri Krishna Pooja Samagri & Brass Works',
      isTempleTrustOrApproved: true,
      location: 'South Car Street'
    },
    inStock: true,
    stockCount: 22,
    imageUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80',
    tags: ['Kuthu Vilakku', 'Brass', 'Deepam', 'Pooja'],
    unit: 'Pair (2 Lamps, 1.8 kg)',
    featured: true
  },
  {
    productId: 'prod-nendran-chips',
    name: 'Farm-Fresh Nanjil Nendran Banana Chips in Pure Coconut Oil',
    tamilName: 'நாஞ்சில் நாட்டு நேந்திரம் சிப்ஸ் - தேங்காய் எண்ணெய்',
    description: 'Crisp golden banana chips thinly sliced from organically cultivated Nendran bananas and fried fresh in cold-pressed pure village coconut oil with light turmeric and rock salt.',
    category: 'ORGANIC_VILLAGE_PRODUCE',
    priceINR: 180,
    currency: 'INR',
    seller: {
      sellerId: 'sel-parakkai-farmers',
      businessName: 'Parakkai Organic Village Farmer Producer Group',
      isTempleTrustOrApproved: false,
      location: 'Parakkai Agri Co-operative'
    },
    inStock: true,
    stockCount: 140,
    imageUrl: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=600&q=80',
    tags: ['Banana Chips', 'Organic', 'Village Produce', 'Snack'],
    unit: '500g Fresh Pack',
    featured: true
  },
  {
    productId: 'prod-desi-ghee',
    name: 'Pure Desi Cow A2 Cultured Ghee (Vedic Bilona Method)',
    tamilName: 'நாட்டுப் பசு நெய் - பாரம்பரிய மத்து முறையில் உருக்கியது',
    description: 'Golden granular ghee crafted from free-grazing indigenous Tamil Nadu cows. Ideal for sacred lighting of temple lamps, daily pooja havan, and medicinal wellness.',
    category: 'POOJA_SAMAGRI',
    priceINR: 650,
    originalPriceINR: 750,
    currency: 'INR',
    seller: {
      sellerId: 'sel-goshaala',
      businessName: 'Parakkai Sri Krishna Goshaala Samithi',
      isTempleTrustOrApproved: true,
      location: 'Goshaala Road, Parakkai'
    },
    inStock: true,
    stockCount: 45,
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
    tags: ['Pure Ghee', 'Goshaala', 'Pooja Ghee', 'A2 Ghee'],
    unit: '500ml Glass Jar',
    featured: false
  },
  {
    productId: 'prod-palmyra-basket',
    name: 'Artisan Woven Natural Palmyra Palm Leaf Pooja Basket',
    tamilName: 'கைத்தறி பனை ஓலை பூஜை கூடை',
    description: 'Eco-friendly and durable pooja basket with lid, intricately handwoven by rural women artisans from natural palmyra fronds. Perfect for carrying flowers, fruits, and pooja articles.',
    category: 'PALMYRA_AND_COCONUT_CRAFTS',
    priceINR: 120,
    currency: 'INR',
    seller: {
      sellerId: 'sel-artisan-guild',
      businessName: 'Nanjil Palmyra Artisan Guild',
      isTempleTrustOrApproved: true,
      location: 'West Mada Street'
    },
    inStock: true,
    stockCount: 60,
    imageUrl: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=600&q=80',
    tags: ['Palmyra', 'Eco-friendly', 'Handicraft', 'Pooja Basket'],
    unit: '1 Basket',
    featured: false
  },
  {
    productId: 'prod-tulsi-mala',
    name: 'Natural Sacred Tulsi Wood Japa Mala (108+1 Knotted Beads)',
    tamilName: 'இயற்கை துளசி மணி ஜெப மாலை (108 மணிகள்)',
    description: 'Smooth sacred basil wood beads strung on strong cotton thread with knots between each bead and a Sumeru guru bead. Cleanses aura and aids devotional chanting.',
    category: 'DEVOTIONAL_BOOKS_AND_CDS',
    priceINR: 150,
    currency: 'INR',
    seller: {
      sellerId: 'sel-krishna-pooja',
      businessName: 'Sri Krishna Pooja Samagri',
      isTempleTrustOrApproved: true,
      location: 'South Car Street'
    },
    inStock: true,
    stockCount: 110,
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80',
    tags: ['Tulsi Mala', 'Japa Mala', 'Meditation', 'Chanting'],
    unit: '1 Mala (108 Beads)',
    featured: false
  }
];
