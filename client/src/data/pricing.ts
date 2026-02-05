/*
  PRICING DATA - Premium Transportation Services
  
  DYNAMIC RAMADAN PRICING:
  - Pricing is now automatically determined by booking date using Islamic calendar detection
  - No manual toggle needed - system is perpetual and automatic
  - Uses Aladhan API to detect Ramadan dates with intelligent caching
  - When a customer selects a date, the system checks if it falls within Ramadan
  - If during Ramadan → ramadanPricing is applied
  - If outside Ramadan → standardPricing is applied
  
  Both pricing structures are maintained below for the dynamic system.
  See: utils/ramadanUtils.ts and utils/dynamicPricingUtils.ts for implementation
*/

// ============================================
// VEHICLE TYPES
// ============================================
export interface Vehicle {
  id: string;
  name: string;
  nameAr: string;
  type: string;
  typeAr: string;
  capacity: number;
  description: string;
  descriptionAr: string;
  image: string;
  featured?: boolean;
}

export const vehicles: Vehicle[] = [
  {
    id: 'camry',
    name: 'Camry',
    nameAr: 'كامري',
    type: 'Sedan',
    typeAr: 'سيدان',
    capacity: 4,
    description: 'Comfortable sedan perfect for small families or couples. Smooth ride with premium comfort.',
    descriptionAr: 'سيارة سيدان مريحة مثالية للعائلات الصغيرة أو الأزواج. رحلة سلسة مع راحة فاخرة.',
    image: '/assets/vehicles/camry.jpg',
    featured: true,
  },
  {
    id: 'staria',
    name: 'Hyundai Staria',
    nameAr: 'هيونداي ستاريا',
    type: 'Van',
    typeAr: 'فان',
    capacity: 7,
    description: 'Modern luxury van with futuristic design. Spacious interior for family groups.',
    descriptionAr: 'فان فاخر حديث بتصميم مستقبلي. مساحة داخلية واسعة للمجموعات العائلية.',
    image: '/assets/vehicles/staria.jpg',
  },
  {
    id: 'h1',
    name: 'Hyundai H1',
    nameAr: 'هيونداي H1',
    type: 'Van',
    typeAr: 'فان',
    capacity: 10,
    description: 'Versatile passenger van ideal for medium-sized groups. Reliable and comfortable.',
    descriptionAr: 'فان ركاب متعدد الاستخدامات مثالي للمجموعات المتوسطة. موثوق ومريح.',
    image: '/assets/vehicles/h1.jpg',
    featured: true,
  },
  {
    id: 'hiace',
    name: 'Hiace',
    nameAr: 'هايس',
    type: 'Van',
    typeAr: 'فان',
    capacity: 12,
    description: 'Spacious commuter van perfect for larger groups. Excellent for pilgrim groups.',
    descriptionAr: 'فان ركاب واسع مثالي للمجموعات الكبيرة. ممتاز لمجموعات الحجاج.',
    image: '/assets/vehicles/hiace.jpg',
  },
  {
    id: 'yukon',
    name: 'GMC Yukon XL',
    nameAr: 'جي إم سي يوكن',
    type: 'SUV',
    typeAr: 'دفع رباعي',
    capacity: 7,
    description: 'Premium luxury SUV for VIP travel. Ultimate comfort and prestige.',
    descriptionAr: 'سيارة دفع رباعي فاخرة للسفر VIP. راحة ومكانة فائقة.',
    image: '/assets/vehicles/yukon.jpg',
    featured: true,
  },
  {
    id: 'coaster',
    name: 'Coaster',
    nameAr: 'كوستر',
    type: 'Bus',
    typeAr: 'باص',
    capacity: 24,
    description: 'Full-size bus for large pilgrim groups. Maximum capacity with comfort.',
    descriptionAr: 'باص كامل الحجم لمجموعات الحجاج الكبيرة. أقصى سعة مع الراحة.',
    image: '/assets/vehicles/coaster.jpg',
  },
];

// ============================================
// SERVICE CATEGORIES
// ============================================
export interface ServiceCategory {
  id: string;
  name: string;
  nameAr: string;
  icon: string;
}

export const serviceCategories: ServiceCategory[] = [
  { id: 'airport', name: 'Airport Transfers', nameAr: 'نقل المطار', icon: 'plane' },
  { id: 'intercity', name: 'Intercity Travel', nameAr: 'السفر بين المدن', icon: 'car' },
  { id: 'ziyarat', name: 'Ziyarat Tours', nameAr: 'جولات الزيارة', icon: 'mosque' },
  { id: 'train', name: 'Train Station', nameAr: 'محطة القطار', icon: 'train' },
  { id: 'meeqat', name: 'Meeqat Services', nameAr: 'خدمات الميقات', icon: 'map-pin' },
  { id: 'hourly', name: 'Hourly Rental', nameAr: 'إيجار بالساعة', icon: 'clock' },
];

// ============================================
// SERVICE DEFINITIONS
// ============================================
export interface Service {
  id: string;
  name: string;
  nameAr: string;
  category: string;
  popular?: boolean;
}

export const services: Service[] = [
  // Airport Transfers
  { id: 'jeddah-airport-makkah', name: 'Jeddah Airport to Makkah Hotel', nameAr: 'مطار جدة إلى فندق مكة', category: 'airport', popular: true },
  { id: 'jeddah-airport-jeddah', name: 'Jeddah Airport to Jeddah Hotel', nameAr: 'مطار جدة إلى فندق جدة', category: 'airport' },
  { id: 'jeddah-hotel-airport', name: 'Jeddah Hotel to Jeddah Airport', nameAr: 'فندق جدة إلى مطار جدة', category: 'airport' },
  { id: 'jeddah-airport-madina', name: 'Jeddah Airport to Madina Hotel', nameAr: 'مطار جدة إلى فندق المدينة', category: 'airport' },
  { id: 'madina-airport-hotel', name: 'Madina Airport to Madina Hotel', nameAr: 'مطار المدينة إلى فندق المدينة', category: 'airport' },
  { id: 'madina-hotel-airport', name: 'Madina Hotel to Madina Airport', nameAr: 'فندق المدينة إلى مطار المدينة', category: 'airport' },
  { id: 'makkah-hotel-jeddah-airport', name: 'Makkah Hotel to Jeddah Airport', nameAr: 'فندق مكة إلى مطار جدة', category: 'airport', popular: true },
  
  // Intercity Travel
  { id: 'makkah-madina', name: 'Makkah Hotel to Madina Hotel', nameAr: 'فندق مكة إلى فندق المدينة', category: 'intercity', popular: true },
  { id: 'madina-makkah', name: 'Madina Hotel to Makkah Hotel', nameAr: 'فندق المدينة إلى فندق مكة', category: 'intercity', popular: true },
  { id: 'jeddah-taif', name: 'Jeddah to Taif and Return', nameAr: 'جدة إلى الطائف والعودة', category: 'intercity' },
  { id: 'makkah-taif', name: 'Makkah to Taif and Return', nameAr: 'مكة إلى الطائف والعودة', category: 'intercity' },
  
  // Ziyarat Tours
  { id: 'makkah-ziyarat', name: 'Makkah Ziyarat', nameAr: 'زيارة مكة', category: 'ziyarat', popular: true },
  { id: 'madina-ziyarat', name: 'Madina Ziyarat', nameAr: 'زيارة المدينة', category: 'ziyarat', popular: true },
  { id: 'madina-ziyarat-wadiya', name: 'Madina Ziarat and Wadiya Jin', nameAr: 'زيارة المدينة ووادي الجن', category: 'ziyarat' },
  { id: 'jabal-khandamah', name: 'Jabal Khandamah', nameAr: 'جبل خندمة', category: 'ziyarat' },
  
  // Train Station
  { id: 'makkah-train-station', name: 'Makkah hotel to train station', nameAr: 'فندق مكة إلى محطة القطار', category: 'train' },
  { id: 'train-station-makkah', name: 'Makkah train station to Makkah Hotel', nameAr: 'محطة قطار مكة إلى فندق مكة', category: 'train' },
  { id: 'madina-train-hotel', name: 'Medina Train station to Medina hotel', nameAr: 'محطة قطار المدينة إلى فندق المدينة', category: 'train' },
  { id: 'madina-hotel-train', name: 'Medina Hotel to Medina train station', nameAr: 'فندق المدينة إلى محطة قطار المدينة', category: 'train' },
  
  // Meeqat Services
  { id: 'masjid-ayesha', name: 'Masjid Ayesha Meeqat', nameAr: 'ميقات مسجد عائشة', category: 'meeqat' },
  { id: 'masjid-jurana', name: 'Masjid Jurana Meeqat', nameAr: 'ميقات مسجد الجعرانة', category: 'meeqat' },
  
  // Hourly Rental
  { id: 'hourly', name: 'Per Hour Rate', nameAr: 'السعر بالساعة', category: 'hourly' },
];

// ============================================
// STANDARD PRICING (Regular Season)
// ============================================
export const standardPricing: Record<string, Record<string, number>> = {
  camry: {
    'jeddah-airport-makkah': 250,
    'jeddah-airport-jeddah': 250,
    'makkah-madina': 500,
    'jeddah-airport-madina': 550,
    'madina-airport-hotel': 150,
    'madina-hotel-airport': 120,
    'makkah-ziyarat': 250,
    'madina-ziyarat': 250,
    'jeddah-taif': 700,
    'makkah-taif': 550,
    'madina-makkah': 500,
    'makkah-hotel-jeddah-airport': 200,
    'masjid-ayesha': 150,
    'masjid-jurana': 150,
    'madina-ziyarat-wadiya': 300,
    'makkah-train-station': 120,
    'train-station-makkah': 150,
    'madina-train-hotel': 150,
    'madina-hotel-train': 120,
    'hourly': 100,
  },
  h1: {
    'jabal-khandamah': 170,
    'jeddah-airport-makkah': 350,
    'jeddah-hotel-airport': 200,
    'jeddah-airport-jeddah': 250,
    'makkah-madina': 600,
    'jeddah-airport-madina': 600,
    'madina-airport-hotel': 200,
    'madina-hotel-airport': 150,
    'makkah-ziyarat': 300,
    'madina-ziyarat': 300,
    'jeddah-taif': 800,
    'makkah-taif': 600,
    'hourly': 150,
    'madina-makkah': 600,
    'makkah-hotel-jeddah-airport': 300,
    'masjid-ayesha': 150,
    'masjid-jurana': 150,
    'madina-ziyarat-wadiya': 400,
    'makkah-train-station': 150,
    'train-station-makkah': 150,
    'madina-train-hotel': 150,
    'madina-hotel-train': 150,
  },
  staria: {
    'jeddah-airport-makkah': 350,
    'jeddah-hotel-airport': 200,
    'jeddah-airport-jeddah': 250,
    'makkah-madina': 600,
    'jeddah-airport-madina': 600,
    'madina-airport-hotel': 200,
    'madina-hotel-airport': 150,
    'makkah-ziyarat': 300,
    'madina-ziyarat': 300,
    'jeddah-taif': 800,
    'makkah-taif': 600,
    'hourly': 150,
    'madina-makkah': 600,
    'makkah-hotel-jeddah-airport': 300,
    'masjid-ayesha': 150,
    'masjid-jurana': 150,
    'madina-ziyarat-wadiya': 400,
    'makkah-train-station': 150,
    'train-station-makkah': 150,
    'madina-train-hotel': 150,
    'madina-hotel-train': 150,
  },
  hiace: {
    'jeddah-airport-makkah': 450,
    'jeddah-airport-jeddah': 300,
    'jeddah-hotel-airport': 300,
    'makkah-madina': 700,
    'jeddah-airport-madina': 800,
    'madina-airport-hotel': 350,
    'madina-hotel-airport': 300,
    'makkah-ziyarat': 400,
    'madina-ziyarat': 350,
    'jeddah-taif': 1500,
    'makkah-taif': 800,
    'hourly': 200,
    'madina-makkah': 700,
    'makkah-hotel-jeddah-airport': 400,
    'madina-ziyarat-wadiya': 500,
    'masjid-ayesha': 250,
    'masjid-jurana': 250,
    'makkah-train-station': 250,
    'train-station-makkah': 250,
    'madina-train-hotel': 250,
    'madina-hotel-train': 250,
  },
  yukon: {
    'jeddah-airport-makkah': 600,
    'jeddah-airport-jeddah': 400,
    'jeddah-hotel-airport': 300,
    'makkah-madina': 1200,
    'jeddah-airport-madina': 1200,
    'madina-airport-hotel': 400,
    'madina-hotel-airport': 300,
    'makkah-ziyarat': 500,
    'madina-ziyarat': 400,
    'jeddah-taif': 1500,
    'makkah-taif': 1000,
    'hourly': 200,
    'madina-makkah': 1200,
    'makkah-hotel-jeddah-airport': 500,
    'madina-ziyarat-wadiya': 600,
    'masjid-ayesha': 300,
    'masjid-jurana': 300,
    'makkah-train-station': 300,
    'train-station-makkah': 300,
    'madina-train-hotel': 300,
    'madina-hotel-train': 300,
  },
  coaster: {
    'jeddah-airport-makkah': 800,
    'jeddah-airport-jeddah': 500,
    'jeddah-hotel-airport': 400,
    'makkah-madina': 1200,
    'jeddah-airport-madina': 1200,
    'madina-airport-hotel': 500,
    'madina-hotel-airport': 500,
    'makkah-ziyarat': 600,
    'madina-ziyarat': 550,
    'jeddah-taif': 1800,
    'makkah-taif': 1200,
    'hourly': 300,
    'madina-makkah': 1200,
    'makkah-hotel-jeddah-airport': 700,
    'madina-ziyarat-wadiya': 650,
    'masjid-ayesha': 300,
    'masjid-jurana': 400,
    'makkah-train-station': 400,
    'train-station-makkah': 400,
    'madina-train-hotel': 400,
    'madina-hotel-train': 400,
  },
};

// ============================================
// RAMADAN PRICING (Seasonal - Higher rates)
// ============================================
export const ramadanPricing: Record<string, Record<string, number>> = {
  camry: {
    'jeddah-airport-makkah': 350,
    'jeddah-airport-jeddah': 350,
    'makkah-madina': 700,
    'jeddah-airport-madina': 750,
    'madina-airport-hotel': 200,
    'madina-hotel-airport': 170,
    'makkah-ziyarat': 350,
    'madina-ziyarat': 350,
    'jeddah-taif': 900,
    'makkah-taif': 750,
    'madina-makkah': 700,
    'makkah-hotel-jeddah-airport': 300,
    'masjid-ayesha': 200,
    'masjid-jurana': 200,
    'madina-ziyarat-wadiya': 400,
    'makkah-train-station': 170,
    'train-station-makkah': 200,
    'madina-train-hotel': 200,
    'madina-hotel-train': 170,
    'hourly': 150,
  },
  h1: {
    'jabal-khandamah': 250,
    'jeddah-airport-makkah': 500,
    'jeddah-hotel-airport': 300,
    'jeddah-airport-jeddah': 350,
    'makkah-madina': 850,
    'jeddah-airport-madina': 850,
    'madina-airport-hotel': 300,
    'madina-hotel-airport': 200,
    'makkah-ziyarat': 450,
    'madina-ziyarat': 450,
    'jeddah-taif': 1100,
    'makkah-taif': 850,
    'hourly': 200,
    'madina-makkah': 850,
    'makkah-hotel-jeddah-airport': 450,
    'masjid-ayesha': 200,
    'masjid-jurana': 200,
    'madina-ziyarat-wadiya': 550,
    'makkah-train-station': 200,
    'train-station-makkah': 200,
    'madina-train-hotel': 200,
    'madina-hotel-train': 200,
  },
  staria: {
    'jeddah-airport-makkah': 500,
    'jeddah-hotel-airport': 300,
    'jeddah-airport-jeddah': 350,
    'makkah-madina': 850,
    'jeddah-airport-madina': 850,
    'madina-airport-hotel': 300,
    'madina-hotel-airport': 200,
    'makkah-ziyarat': 450,
    'madina-ziyarat': 450,
    'jeddah-taif': 1100,
    'makkah-taif': 850,
    'hourly': 200,
    'madina-makkah': 850,
    'makkah-hotel-jeddah-airport': 450,
    'masjid-ayesha': 200,
    'masjid-jurana': 200,
    'madina-ziyarat-wadiya': 550,
    'makkah-train-station': 200,
    'train-station-makkah': 200,
    'madina-train-hotel': 200,
    'madina-hotel-train': 200,
  },
  hiace: {
    'jeddah-airport-makkah': 650,
    'jeddah-airport-jeddah': 450,
    'jeddah-hotel-airport': 450,
    'makkah-madina': 1000,
    'jeddah-airport-madina': 1100,
    'madina-airport-hotel': 500,
    'madina-hotel-airport': 450,
    'makkah-ziyarat': 550,
    'madina-ziyarat': 500,
    'jeddah-taif': 2000,
    'makkah-taif': 1100,
    'hourly': 300,
    'madina-makkah': 1000,
    'makkah-hotel-jeddah-airport': 550,
    'madina-ziyarat-wadiya': 700,
    'masjid-ayesha': 350,
    'masjid-jurana': 350,
    'makkah-train-station': 350,
    'train-station-makkah': 350,
    'madina-train-hotel': 350,
    'madina-hotel-train': 350,
  },
  yukon: {
    'jeddah-airport-makkah': 850,
    'jeddah-airport-jeddah': 550,
    'jeddah-hotel-airport': 450,
    'makkah-madina': 1600,
    'jeddah-airport-madina': 1600,
    'madina-airport-hotel': 550,
    'madina-hotel-airport': 450,
    'makkah-ziyarat': 700,
    'madina-ziyarat': 550,
    'jeddah-taif': 2000,
    'makkah-taif': 1400,
    'hourly': 300,
    'madina-makkah': 1600,
    'makkah-hotel-jeddah-airport': 700,
    'madina-ziyarat-wadiya': 850,
    'masjid-ayesha': 450,
    'masjid-jurana': 450,
    'makkah-train-station': 450,
    'train-station-makkah': 450,
    'madina-train-hotel': 450,
    'madina-hotel-train': 450,
  },
  coaster: {
    'jeddah-airport-makkah': 1100,
    'jeddah-airport-jeddah': 700,
    'jeddah-hotel-airport': 550,
    'makkah-madina': 1600,
    'jeddah-airport-madina': 1600,
    'madina-airport-hotel': 700,
    'madina-hotel-airport': 700,
    'makkah-ziyarat': 850,
    'madina-ziyarat': 750,
    'jeddah-taif': 2400,
    'makkah-taif': 1600,
    'hourly': 450,
    'madina-makkah': 1600,
    'makkah-hotel-jeddah-airport': 1000,
    'madina-ziyarat-wadiya': 900,
    'masjid-ayesha': 450,
    'masjid-jurana': 550,
    'makkah-train-station': 550,
    'train-station-makkah': 550,
    'madina-train-hotel': 550,
    'madina-hotel-train': 550,
  },
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * DEPRECATED: Use getPriceForServiceOnDate from utils/dynamicPricingUtils.ts instead
 * This function is kept for backward compatibility but uses standard pricing only
 */
export function getPrice(vehicleId: string, serviceId: string): number | null {
  // Always return standard pricing for backward compatibility
  // New code should use getPriceForServiceOnDate with date parameter
  return standardPricing[vehicleId]?.[serviceId] ?? null;
}

export function getVehicleById(id: string): Vehicle | undefined {
  return vehicles.find(v => v.id === id);
}

export function getServiceById(id: string): Service | undefined {
  return services.find(s => s.id === id);
}

export function getServicesByCategory(categoryId: string): Service[] {
  return services.filter(s => s.category === categoryId);
}

export function getAvailableServicesForVehicle(vehicleId: string): Service[] {
  // Use standard pricing to get available services
  // Actual pricing tier (standard vs ramadan) is determined by date in dynamicPricingUtils.ts
  const vehiclePricing = standardPricing[vehicleId];
  if (!vehiclePricing) return [];
  
  return services.filter(s => vehiclePricing[s.id] !== undefined);
}

export function formatPrice(price: number): string {
  return `${price.toLocaleString()} SAR`;
}

// Hero banner image
export const heroBannerImage = '/assets/vehicles/hero.jpg';
