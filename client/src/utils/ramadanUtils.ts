/**
 * Ramadan Date Detection Utility
 * Integrates with Aladhan API to detect Ramadan dates automatically
 * Implements caching to minimize API calls
 * 
 * PRICING PERIOD: Day 18 of Ramadan to end of Ramadan (customizable by dev)
 */

interface RamadanPeriod {
  startDate: Date;
  endDate: Date;
  year: number;
}

interface CachedRamadanData {
  periods: Record<number, RamadanPeriod>;
  lastUpdated: number;
}

const CACHE_KEY = 'ramadan_cache';
const CACHE_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 days
const ALADHAN_API_BASE = 'https://api.aladhan.com/v1';

/**
 * DEVELOPER CONFIG: Customize Ramadan pricing period
 * Change RAMADAN_PRICING_START_DAY to adjust when pricing begins (1-30)
 * Change RAMADAN_PRICING_END_DAY to adjust when pricing ends (1-30)
 */
export const RAMADAN_PRICING_CONFIG = {
  RAMADAN_PRICING_START_DAY: 18, // Show pricing from day 18 onwards (default)
  RAMADAN_PRICING_END_DAY: 30, // Show pricing until end of Ramadan (customizable)
};

/**
 * Fetch Ramadan dates for a specific Islamic year from Aladhan API
 * Aladhan provides prayer times and Islamic calendar data
 */
async function fetchRamadanDatesFromAPI(
  hijriYear: number
): Promise<RamadanPeriod | null> {
  try {
    // Get the first day of Ramadan (9th month)
    // Using getHijriCalendar endpoint to find Ramadan 1st
    const response = await fetch(
      `${ALADHAN_API_BASE}/hijriCalendar?month=9&year=${hijriYear}`,
      { signal: AbortSignal.timeout(5000) } // 5 second timeout
    );

    if (!response.ok) {
      console.warn(
        `Aladhan API returned status ${response.status} for Hijri year ${hijriYear}`
      );
      return null;
    }

    const data = await response.json();
    if (!data.data || data.data.length === 0) {
      console.warn(`No Ramadan data found for Hijri year ${hijriYear}`);
      return null;
    }

    // Ramadan is month 9, so get first and last day
    const ramadanDays = data.data;
    const firstDay = ramadanDays[0];
    const lastDay = ramadanDays[29]; // Ramadan is 29 or 30 days

    if (!firstDay || !lastDay) {
      console.warn(`Incomplete Ramadan data for Hijri year ${hijriYear}`);
      return null;
    }

    // Convert to gregorian dates
    const startDate = new Date(firstDay.gregorian.date);
    const endDate = new Date(lastDay.gregorian.date);

    return {
      startDate,
      endDate,
      year: hijriYear,
    };
  } catch (error) {
    console.error(`Error fetching Ramadan dates for Hijri year ${hijriYear}:`, error);
    return null;
  }
}

/**
 * Get cached Ramadan data or fetch from API if expired
 */
function getCachedRamadanData(): CachedRamadanData {
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    const data = JSON.parse(cached) as CachedRamadanData;
    const age = Date.now() - data.lastUpdated;
    if (age < CACHE_DURATION) {
      return data;
    }
  }
  return { periods: {}, lastUpdated: Date.now() };
}

/**
 * Save Ramadan data to cache
 */
function saveCacheData(data: CachedRamadanData): void {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to save Ramadan cache to localStorage:', error);
  }
}

/**
 * Convert Gregorian date to Hijri year
 * Simple approximation: Hijri year ≈ Gregorian year * 1.030684
 */
function gregorianToHijriYear(date: Date): number {
  return Math.floor((date.getFullYear() - 622) * 1.030684 + date.getMonth() / 12);
}

/**
 * Check if a given date falls within Ramadan
 * Fetches from API if not in cache, with automatic fallback
 */
export async function isDateInRamadan(date: Date): Promise<boolean> {
  try {
    const hijriYear = gregorianToHijriYear(date);
    let cache = getCachedRamadanData();

    // Check if we have cached data for this Hijri year
    if (!cache.periods[hijriYear]) {
      // Fetch from API
      const period = await fetchRamadanDatesFromAPI(hijriYear);
      if (period) {
        cache.periods[hijriYear] = period;
        cache.lastUpdated = Date.now();
        saveCacheData(cache);
      } else {
        console.warn(`Failed to fetch Ramadan dates for Hijri year ${hijriYear}`);
        return false;
      }
    }

    const period = cache.periods[hijriYear];
    if (!period) return false;

    return date >= period.startDate && date <= period.endDate;
  } catch (error) {
    console.error('Error checking if date is in Ramadan:', error);
    return false;
  }
}

/**
 * Get Ramadan start and end dates for a given Gregorian year
 * Returns null if data unavailable
 */
export async function getRamadanDatesForYear(
  year: number
): Promise<RamadanPeriod | null> {
  try {
    const testDate = new Date(year, 0, 1);
    const hijriYear = gregorianToHijriYear(testDate);
    let cache = getCachedRamadanData();

    if (!cache.periods[hijriYear]) {
      const period = await fetchRamadanDatesFromAPI(hijriYear);
      if (period) {
        cache.periods[hijriYear] = period;
        cache.lastUpdated = Date.now();
        saveCacheData(cache);
      }
    }

    return cache.periods[hijriYear] ?? null;
  } catch (error) {
    console.error(`Error getting Ramadan dates for year ${year}:`, error);
    return null;
  }
}

/**
 * Clear Ramadan cache (useful for testing or manual reset)
 */
export function clearRamadanCache(): void {
  try {
    localStorage.removeItem(CACHE_KEY);
  } catch (error) {
    console.warn('Failed to clear Ramadan cache:', error);
  }
}

/**
 * Get all Ramadan periods currently in cache
 */
export function getRamadanCacheSummary(): Record<number, RamadanPeriod> {
  const cache = getCachedRamadanData();
  return cache.periods;
}

/**
 * Check if a date falls within the RAMADAN PRICING PERIOD
 * (Day 18-30 by default, configurable via RAMADAN_PRICING_CONFIG)
 * 
 * This is different from isDateInRamadan() which checks the entire month
 * Use this for pricing decisions
 */
export async function isDateInRamadanPricingPeriod(date: Date): Promise<boolean> {
  try {
    const hijriYear = gregorianToHijriYear(date);
    let cache = getCachedRamadanData();

    // Get Ramadan period for this year
    if (!cache.periods[hijriYear]) {
      const period = await fetchRamadanDatesFromAPI(hijriYear);
      if (period) {
        cache.periods[hijriYear] = period;
        cache.lastUpdated = Date.now();
        saveCacheData(cache);
      } else {
        console.warn(`Failed to fetch Ramadan dates for Hijri year ${hijriYear}`);
        return false;
      }
    }

    const period = cache.periods[hijriYear];
    if (!period) return false;

    // Get the full Ramadan period
    const ramadanStart = period.startDate;
    const ramadanEnd = period.endDate;

    // Calculate pricing period start and end dates
    const pricingStartDay = RAMADAN_PRICING_CONFIG.RAMADAN_PRICING_START_DAY;
    const pricingEndDay = RAMADAN_PRICING_CONFIG.RAMADAN_PRICING_END_DAY;

    // Days into Ramadan (1-30)
    const daysIntoRamadan = Math.ceil(
      (date.getTime() - ramadanStart.getTime()) / (1000 * 60 * 60 * 24)
    ) + 1;

    // Check if date is within the pricing period range
    return (
      daysIntoRamadan >= pricingStartDay &&
      daysIntoRamadan <= pricingEndDay &&
      date >= ramadanStart &&
      date <= ramadanEnd
    );
  } catch (error) {
    console.error('Error checking if date is in Ramadan pricing period:', error);
    return false;
  }
}

/**
 * Get current Ramadan pricing configuration
 * Developers can read this to display to customers
 */
export function getRamadanPricingConfig() {
  return RAMADAN_PRICING_CONFIG;
}
