// ============================================================
// MAIN FILE FOR RAMADAN SETTINGS, NOTICE TEXT, CONTACT, ROUTES,
// VEHICLES, AND ALL PRICES
// ============================================================
// Edit this file when you want to change pricing or Ramadan behavior.
//
// Most common changes:
// - Ramadan pricing ON/OFF: bookingPriceSettings.useRamadanPricing
// - Ramadan notice ON/OFF: bookingPriceSettings.showRamadanNotice
// - Ramadan notice wording: bookingPriceSettings.ramadanNoticeTitle/message
// - Ramadan price increase: bookingPriceSettings.ramadanPriceMultiplier
// - Normal prices: standardPricing section below
// - Contact number: contactSettings.whatsappNumber / contactSettings.phoneNumber
//
// Important: pricing and notice are separate.
// You can show the Ramadan notice while using normal prices, or use Ramadan
// prices while hiding the notice.
// ============================================================
export const bookingPriceSettings: {
  useRamadanPricing: boolean;
  showRamadanNotice: boolean;
  ramadanNoticeTitle: string;
  ramadanNoticeMessage: string;
  ramadanPriceMultiplier: number;
  currencyLabel: string;
  showWelcomePopupOnFirstVisit: boolean;
  welcomePopupDelayMs: number;
} = {
  // true  = use Ramadan prices
  // false = use normal prices
  useRamadanPricing: false,

  // true  = show the Ramadan notice in the welcome popup
  // false = hide the Ramadan notice from the welcome popup
  showRamadanNotice: false,

  // Change these two lines to change the popup notice wording.
  ramadanNoticeTitle: 'Ramadan Notice:',
  ramadanNoticeMessage: 'All prices are 30% higher fare from 18 to 30 Ramadan',

  // Ramadan prices are generated from standardPricing using this multiplier.
  // 1.3 means 30% higher. Change to 1.2 for 20% higher, etc.
  ramadanPriceMultiplier: 1.3,

  // Change this only if you want another currency label in the UI.
  currencyLabel: 'SAR',

  // Auto popup hurts loading and conversion on many sites.
  // Set true if you still want the quick booking popup to open on first visit.
  showWelcomePopupOnFirstVisit: false,
  welcomePopupDelayMs: 1500,
};

// Contact details used across header, footer, floating WhatsApp, and booking checkout.
// Keep these synced here instead of editing multiple components.
export const contactSettings = {
  phoneNumber: '+966579693883',
  whatsappNumber: '+966579693883',
  floatingWhatsAppMessage: 'Hello, I would like to inquire about your transportation services.',
};

// Backwards-compatible export for any old code/imports.
export const USE_RAMADAN_PRICING = bookingPriceSettings.useRamadanPricing;

export type PricingTable = Record<string, Record<string, number>>;

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
    image: '/assets/vehicles/camry.webp',
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
    image: '/assets/vehicles/staria.webp',
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
    image: '/assets/vehicles/h1.webp',
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
    image: '/assets/vehicles/hiace.webp',
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
    image: '/assets/vehicles/yukon.webp',
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
    image: '/assets/vehicles/coaster.webp',
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
  { id: 'jeddah-airport-madina', name: 'Jeddah Airport to Madinah Hotel', nameAr: 'مطار جدة إلى فندق المدينة', category: 'airport', popular: true },
  { id: 'madina-jeddah-airport', name: 'Madinah Hotel to Jeddah Airport', nameAr: 'فندق المدينة إلى مطار جدة', category: 'airport' },
  { id: 'madina-airport-hotel', name: 'Madinah Airport to Madinah Hotel', nameAr: 'مطار المدينة إلى فندق المدينة', category: 'airport' },
  { id: 'madina-hotel-airport', name: 'Madinah Hotel to Madinah Airport', nameAr: 'فندق المدينة إلى مطار المدينة', category: 'airport' },
  { id: 'makkah-hotel-jeddah-airport', name: 'Makkah Hotel to Jeddah Airport', nameAr: 'فندق مكة إلى مطار جدة', category: 'airport', popular: true },

  // Intercity Travel
  { id: 'makkah-madina', name: 'Makkah Hotel to Madinah Hotel', nameAr: 'فندق مكة إلى فندق المدينة', category: 'intercity', popular: true },
  { id: 'madina-makkah', name: 'Madinah Hotel to Makkah Hotel', nameAr: 'فندق المدينة إلى فندق مكة', category: 'intercity', popular: true },
  { id: 'jeddah-taif', name: 'Jeddah to Taif and Return', nameAr: 'جدة إلى الطائف والعودة', category: 'intercity' },
  { id: 'makkah-taif', name: 'Makkah to Taif Ziyarat and Return', nameAr: 'مكة إلى الطائف زيارة والعودة', category: 'intercity' },

  // Ziyarat Tours
  { id: 'makkah-ziyarat', name: 'Makkah Ziyarat - 3 Hours', nameAr: 'زيارة مكة - ٣ ساعات', category: 'ziyarat', popular: true },
  { id: 'madina-ziyarat', name: 'Madinah Ziyarat - 3 Hours', nameAr: 'زيارة المدينة - ٣ ساعات', category: 'ziyarat', popular: true },
  { id: 'madina-ziyarat-wadiya', name: 'Madinah Ziyarat and Wadiya Jin', nameAr: 'زيارة المدينة ووادي الجن', category: 'ziyarat' },
  { id: 'jabal-khandamah', name: 'Jabal Khandamah', nameAr: 'جبل خندمة', category: 'ziyarat' },

  // Train Station
  { id: 'makkah-train-station', name: 'Makkah Hotel to Train Station', nameAr: 'فندق مكة إلى محطة القطار', category: 'train' },
  { id: 'train-station-makkah', name: 'Train Station to Makkah Hotel', nameAr: 'محطة القطار إلى فندق مكة', category: 'train' },
  { id: 'madina-train-hotel', name: 'Madinah Train Station to Madinah Hotel', nameAr: 'محطة قطار المدينة إلى فندق المدينة', category: 'train' },
  { id: 'madina-hotel-train', name: 'Madinah Hotel to Madinah Train Station', nameAr: 'فندق المدينة إلى محطة قطار المدينة', category: 'train' },

  // Meeqat Services
  { id: 'masjid-ayesha', name: 'Masjid Ayesha Meeqat', nameAr: 'ميقات مسجد عائشة', category: 'meeqat' },
  { id: 'masjid-jurana', name: 'Masjid Jurana Meeqat', nameAr: 'ميقات مسجد الجعرانة', category: 'meeqat' },

  // Hourly Rental
  { id: 'hourly', name: 'Per Hour Rate', nameAr: 'السعر بالساعة', category: 'hourly' },
];

// ============================================================
// STANDARD PRICING - NORMAL PRICES
// ============================================================
// Change these numbers to update the normal price for each vehicle.
// Route mapping used from the shared rate card:
// - Jeddah Airport To Makkah = jeddah-airport-makkah
// - Makkah To Jeddah = makkah-hotel-jeddah-airport
// - Jeddah Airport To Madinah = jeddah-airport-madina
// - Madinah To Jeddah Airport = madina-jeddah-airport
// - COASTER column = coaster vehicle
export const standardPricing: PricingTable = {
  camry: {
    'jabal-khandamah': 150,
    'jeddah-airport-makkah': 220,
    'jeddah-airport-jeddah': 150,
    'makkah-madina': 375,
    'jeddah-airport-madina': 400,
    'madina-jeddah-airport': 400,
    'madina-airport-hotel': 140,
    'madina-hotel-airport': 120,
    'makkah-ziyarat': 200,
    'madina-ziyarat': 200,
    'jeddah-taif': 700,
    'makkah-taif': 400,
    'madina-makkah': 375,
    'makkah-hotel-jeddah-airport': 190,
    'masjid-ayesha': 100,
    'masjid-jurana': 150,
    'madina-ziyarat-wadiya': 300,
    'makkah-train-station': 100,
    'train-station-makkah': 100,
    'madina-train-hotel': 150,
    'madina-hotel-train': 120,
    'jeddah-hotel-airport': 150,
    'hourly': 100,
  },
  h1: {
    'jabal-khandamah': 170,
    'jeddah-airport-makkah': 250,
    'jeddah-hotel-airport': 200,
    'jeddah-airport-jeddah': 200,
    'makkah-madina': 400,
    'jeddah-airport-madina': 450,
    'madina-jeddah-airport': 450,
    'madina-airport-hotel': 200,
    'madina-hotel-airport': 150,
    'makkah-ziyarat': 230,
    'madina-ziyarat': 230,
    'jeddah-taif': 800,
    'makkah-taif': 500,
    'hourly': 150,
    'madina-makkah': 400,
    'makkah-hotel-jeddah-airport': 220,
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
    'jeddah-airport-makkah': 250,
    'jeddah-hotel-airport': 200,
    'jeddah-airport-jeddah': 200,
    'makkah-madina': 400,
    'jeddah-airport-madina': 450,
    'madina-jeddah-airport': 450,
    'madina-airport-hotel': 200,
    'madina-hotel-airport': 150,
    'makkah-ziyarat': 230,
    'madina-ziyarat': 230,
    'jeddah-taif': 800,
    'makkah-taif': 500,
    'hourly': 150,
    'madina-makkah': 400,
    'makkah-hotel-jeddah-airport': 220,
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
    'jeddah-airport-makkah': 350,
    'jeddah-airport-jeddah': 300,
    'jeddah-hotel-airport': 300,
    'makkah-madina': 600,
    'jeddah-airport-madina': 600,
    'madina-jeddah-airport': 600,
    'madina-airport-hotel': 275,
    'madina-hotel-airport': 220,
    'makkah-ziyarat': 320,
    'madina-ziyarat': 320,
    'jeddah-taif': 1500,
    'makkah-taif': 600,
    'hourly': 200,
    'madina-makkah': 600,
    'makkah-hotel-jeddah-airport': 300,
    'madina-ziyarat-wadiya': 500,
    'masjid-ayesha': 200,
    'masjid-jurana': 250,
    'makkah-train-station': 170,
    'train-station-makkah': 170,
    'madina-train-hotel': 250,
    'madina-hotel-train': 250,
  },
  yukon: {
    'jabal-khandamah': 250,
    'jeddah-airport-makkah': 420,
    'jeddah-airport-jeddah': 300,
    'jeddah-hotel-airport': 250,
    'makkah-madina': 920,
    'jeddah-airport-madina': 920,
    'madina-jeddah-airport': 920,
    'madina-airport-hotel': 320,
    'madina-hotel-airport': 270,
    'makkah-ziyarat': 420,
    'madina-ziyarat': 420,
    'jeddah-taif': 1200,
    'makkah-taif': 700,
    'hourly': 200,
    'madina-makkah': 920,
    'makkah-hotel-jeddah-airport': 370,
    'madina-ziyarat-wadiya': 600,
    'masjid-ayesha': 200,
    'masjid-jurana': 300,
    'makkah-train-station': 200,
    'train-station-makkah': 200,
    'madina-train-hotel': 300,
    'madina-hotel-train': 300,
  },
  coaster: {
    'jabal-khandamah': 300,
    'jeddah-airport-makkah': 525,
    'jeddah-airport-jeddah': 500,
    'jeddah-hotel-airport': 400,
    'makkah-madina': 750,
    'jeddah-airport-madina': 750,
    'madina-jeddah-airport': 750,
    'makkah-ziyarat': 350,
    'madina-ziyarat': 350,
    'jeddah-taif': 1800,
    'makkah-taif': 700,
    'hourly': 300,
    'madina-makkah': 750,
    'makkah-hotel-jeddah-airport': 500,
    'madina-ziyarat-wadiya': 650,
    'masjid-ayesha': 250,
    'masjid-jurana': 400,
    'makkah-train-station': 250,
    'train-station-makkah': 250,
    'madina-train-hotel': 400,
    'madina-hotel-train': 400,
  },
};

// ============================================================
// RAMADAN PRICING - SEASONAL PRICES
// ============================================================
// Ramadan prices are auto-generated from standardPricing so every route stays
// synced. By default, prices are 30% higher because ramadanPriceMultiplier is 1.3.
//
// For a custom Ramadan price, add only the exceptions below.
// Example:
// export const ramadanPricingOverrides = {
//   camry: {
//     'jeddah-airport-makkah': 300,
//   },
// };
export const ramadanPricingOverrides: Partial<Record<string, Record<string, number>>> = {};

function createRamadanPricing(
  normalPricing: PricingTable,
  multiplier: number,
  overrides: Partial<Record<string, Record<string, number>>>
): PricingTable {
  const generatedPricing: PricingTable = {};

  Object.entries(normalPricing).forEach(([vehicleId, servicePrices]) => {
    generatedPricing[vehicleId] = {};
    Object.entries(servicePrices).forEach(([serviceId, price]) => {
      generatedPricing[vehicleId][serviceId] = Math.round(price * multiplier);
    });
  });

  Object.entries(overrides).forEach(([vehicleId, serviceOverrides]) => {
    generatedPricing[vehicleId] = {
      ...(generatedPricing[vehicleId] ?? {}),
      ...(serviceOverrides ?? {}),
    };
  });

  return generatedPricing;
}

export const ramadanPricing: PricingTable = createRamadanPricing(
  standardPricing,
  bookingPriceSettings.ramadanPriceMultiplier,
  ramadanPricingOverrides
);

// ============================================
// HELPER FUNCTIONS
// ============================================
export function getPrice(vehicleId: string, serviceId: string): number | null {
  const pricing = bookingPriceSettings.useRamadanPricing ? ramadanPricing : standardPricing;
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
  const pricing = bookingPriceSettings.useRamadanPricing ? ramadanPricing : standardPricing;
  const vehiclePricing = pricing[vehicleId];
  if (!vehiclePricing) return [];

  return services.filter(s => vehiclePricing[s.id] !== undefined);
}

export function formatPrice(price: number): string {
  return `${price.toLocaleString()} ${bookingPriceSettings.currencyLabel}`;
}

export function digitsOnlyPhoneNumber(phoneNumber: string): string {
  return phoneNumber.replace(/[^0-9]/g, '');
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${digitsOnlyPhoneNumber(contactSettings.whatsappNumber)}?text=${encodeURIComponent(message)}`;
}

// Hero banner image
export const heroBannerImage = '/assets/vehicles/hero.webp';
