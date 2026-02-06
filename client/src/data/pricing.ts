// ============================================
// DEVELOPER TOGGLE - Change this for Ramadan
// ============================================
export const USE_RAMADAN_PRICING = false; // flase for standard

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
  // Regular pricing
camry: {
  'jabal-khandamah': 150,
  'jeddah-airport-makkah': 250,
  'jeddah-airport-jeddah': 150,
  'makkah-madina': 450,
  'jeddah-airport-madina': 500,
  'madina-airport-hotel': 150,
  'madina-hotel-airport': 120,
  'makkah-ziyarat': 250,
  'madina-ziyarat': 250,
  'jeddah-taif': 700,
  'makkah-taif': 500,
  'madina-makkah': 500,
  'makkah-hotel-jeddah-airport': 200,
  'masjid-ayesha': 150,
  'masjid-jurana': 150,
  'madina-ziyarat-wadiya': 300,
  'makkah-train-station': 120,
  'train-station-makkah': 150,
  'madina-train-hotel': 150,
  'madina-hotel-train': 120,
  'jeddah-hotel-airport': 150,
  'hourly': 100,
},
h1: {
  'jabal-khandamah': 170,
  'jeddah-airport-makkah': 350,
  'jeddah-hotel-airport': 200,
  'jeddah-airport-jeddah': 200,
  'makkah-madina': 550,
  'jeddah-airport-madina': 600,
  'madina-airport-hotel': 200,
  'madina-hotel-airport': 150,
  'makkah-ziyarat': 300,
  'madina-ziyarat': 300,
  'jeddah-taif': 800,
  'makkah-taif': 600,
  'hourly': 150,
  'madina-makkah': 550,
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
  'jabal-khandamah': 170,
  'jeddah-airport-makkah': 350,
  'jeddah-hotel-airport': 200,
  'jeddah-airport-jeddah': 200,
  'makkah-madina': 550,
  'jeddah-airport-madina': 600,
  'madina-airport-hotel': 200,
  'madina-hotel-airport': 150,
  'makkah-ziyarat': 300,
  'madina-ziyarat': 300,
  'jeddah-taif': 800,
  'makkah-taif': 600,
  'hourly': 150,
  'madina-makkah': 550,
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
  'jabal-khandamah': 200,
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
  'jabal-khandamah': 250,
  'jeddah-airport-makkah': 500,
  'jeddah-airport-jeddah': 300,
  'jeddah-hotel-airport': 250,
  'makkah-madina': 1200,
  'jeddah-airport-madina': 1200,
  'madina-airport-hotel': 300,
  'madina-hotel-airport': 300,
  'makkah-ziyarat': 500,
  'madina-ziyarat': 400,
  'jeddah-taif': 1200,
  'makkah-taif': 900,
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
    'jabal-khandamah': 300,
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
// RAMADAN PRICING (Seasonal - 30% Higher)
// ============================================
export const ramadanPricing: Record<string, Record<string, number>> = {
 // ============================================
// RAMADAN PRICING (Seasonal - 30% Higher)
// ============================================
export const ramadanPricing: Record<string, Record<string, number>> = {
  camry: {
    'jabal-khandamah': 195,
    'jeddah-airport-makkah': 325,
    'jeddah-airport-jeddah': 195,
    'makkah-madina': 585,
    'jeddah-airport-madina': 650,
    'madina-airport-hotel': 195,
    'madina-hotel-airport': 156,
    'makkah-ziyarat': 325,
    'madina-ziyarat': 325,
    'jeddah-taif': 910,
    'makkah-taif': 650,
    'madina-makkah': 650,
    'makkah-hotel-jeddah-airport': 260,
    'masjid-ayesha': 195,
    'masjid-jurana': 195,
    'madina-ziyarat-wadiya': 390,
    'makkah-train-station': 156,
    'train-station-makkah': 195,
    'madina-train-hotel': 195,
    'madina-hotel-train': 156,
    'jeddah-hotel-airport': 195,
    'hourly': 130,
  },
  h1: {
    'jabal-khandamah': 221,
    'jeddah-airport-makkah': 455,
    'jeddah-hotel-airport': 260,
    'jeddah-airport-jeddah': 260,
    'makkah-madina': 715,
    'jeddah-airport-madina': 780,
    'madina-airport-hotel': 260,
    'madina-hotel-airport': 195,
    'makkah-ziyarat': 390,
    'madina-ziyarat': 390,
    'jeddah-taif': 1040,
    'makkah-taif': 780,
    'hourly': 195,
    'madina-makkah': 715,
    'makkah-hotel-jeddah-airport': 390,
    'masjid-ayesha': 195,
    'masjid-jurana': 195,
    'madina-ziyarat-wadiya': 520,
    'makkah-train-station': 195,
    'train-station-makkah': 195,
    'madina-train-hotel': 195,
    'madina-hotel-train': 195,
  },
  staria: {
    'jabal-khandamah': 221,
    'jeddah-airport-makkah': 455,
    'jeddah-hotel-airport': 260,
    'jeddah-airport-jeddah': 260,
    'makkah-madina': 715,
    'jeddah-airport-madina': 780,
    'madina-airport-hotel': 260,
    'madina-hotel-airport': 195,
    'makkah-ziyarat': 390,
    'madina-ziyarat': 390,
    'jeddah-taif': 1040,
    'makkah-taif': 780,
    'hourly': 195,
    'madina-makkah': 715,
    'makkah-hotel-jeddah-airport': 390,
    'masjid-ayesha': 195,
    'masjid-jurana': 195,
    'madina-ziyarat-wadiya': 520,
    'makkah-train-station': 195,
    'train-station-makkah': 195,
    'madina-train-hotel': 195,
    'madina-hotel-train': 195,
  },
  hiace: {
    'jabal-khandamah': 260,
    'jeddah-airport-makkah': 585,
    'jeddah-airport-jeddah': 390,
    'jeddah-hotel-airport': 390,
    'makkah-madina': 910,
    'jeddah-airport-madina': 1040,
    'madina-airport-hotel': 455,
    'madina-hotel-airport': 390,
    'makkah-ziyarat': 520,
    'madina-ziyarat': 455,
    'jeddah-taif': 1950,
    'makkah-taif': 1040,
    'hourly': 260,
    'madina-makkah': 910,
    'makkah-hotel-jeddah-airport': 520,
    'madina-ziyarat-wadiya': 650,
    'masjid-ayesha': 325,
    'masjid-jurana': 325,
    'makkah-train-station': 325,
    'train-station-makkah': 325,
    'madina-train-hotel': 325,
    'madina-hotel-train': 325,
  },
  yukon: {
    'jabal-khandamah': 325,
    'jeddah-airport-makkah': 650,
    'jeddah-airport-jeddah': 390,
    'jeddah-hotel-airport': 325,
    'makkah-madina': 1560,
    'jeddah-airport-madina': 1560,
    'madina-airport-hotel': 390,
    'madina-hotel-airport': 390,
    'makkah-ziyarat': 650,
    'madina-ziyarat': 520,
    'jeddah-taif': 1560,
    'makkah-taif': 1170,
    'hourly': 260,
    'madina-makkah': 1560,
    'makkah-hotel-jeddah-airport': 650,
    'madina-ziyarat-wadiya': 780,
    'masjid-ayesha': 390,
    'masjid-jurana': 390,
    'makkah-train-station': 390,
    'train-station-makkah': 390,
    'madina-train-hotel': 390,
    'madina-hotel-train': 390,
  },
  coaster: {
    'jabal-khandamah': 390,
    'jeddah-airport-makkah': 1040,
    'jeddah-airport-jeddah': 650,
    'jeddah-hotel-airport': 520,
    'makkah-madina': 1560,
    'jeddah-airport-madina': 1560,
    'madina-airport-hotel': 650,
    'madina-hotel-airport': 650,
    'makkah-ziyarat': 780,
    'madina-ziyarat': 715,
    'jeddah-taif': 2340,
    'makkah-taif': 1560,
    'hourly': 390,
    'madina-makkah': 1560,
    'makkah-hotel-jeddah-airport': 910,
    'madina-ziyarat-wadiya': 845,
    'masjid-ayesha': 390,
    'masjid-jurana': 520,
    'makkah-train-station': 520,
    'train-station-makkah': 520,
    'madina-train-hotel': 520,
    'madina-hotel-train': 520,
  },

};

// ============================================
// HELPER FUNCTIONS
// ============================================
export function getPrice(vehicleId: string, serviceId: string): number | null {
  const pricing = USE_RAMADAN_PRICING ? ramadanPricing : standardPricing;
  return pricing[vehicleId]?.[serviceId] ?? null;
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
  const pricing = USE_RAMADAN_PRICING ? ramadanPricing : standardPricing;
  const vehiclePricing = pricing[vehicleId];
  if (!vehiclePricing) return [];
  
  return services.filter(s => vehiclePricing[s.id] !== undefined);
}

export function formatPrice(price: number): string {
  return `${price.toLocaleString()} SAR`;
}

// Hero banner image
export const heroBannerImage = '/assets/vehicles/hero.jpg';
