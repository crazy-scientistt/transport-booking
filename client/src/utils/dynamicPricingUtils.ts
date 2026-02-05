/**
 * Dynamic Pricing Utility
 * Determines pricing based on date (Ramadan detection)
 * Replaces manual USE_RAMADAN_PRICING toggle
 * 
 * PRICING APPLIED: Day 18 to end of Ramadan (configurable in ramadanUtils.ts)
 */

import { isDateInRamadanPricingPeriod } from './ramadanUtils';
import { standardPricing, ramadanPricing } from '@/data/pricing';

/**
 * Get the appropriate pricing tier for a given date
 * @param date The booking date to check
 * @returns 'ramadan' if during Ramadan pricing period (day 18+), 'standard' otherwise
 */
export async function getPricingTierForDate(
  date: Date
): Promise<'ramadan' | 'standard'> {
  try {
    const inRamadanPricingPeriod = await isDateInRamadanPricingPeriod(date);
    return inRamadanPricingPeriod ? 'ramadan' : 'standard';
  } catch (error) {
    console.error('Error determining pricing tier:', error);
    // Fallback to standard pricing if detection fails
    return 'standard';
  }
}

/**
 * Get the full pricing object for a vehicle on a specific date
 * @param vehicleId The vehicle ID
 * @param date The booking date
 * @returns Pricing object for that vehicle on that date
 */
export async function getPricingForVehicleOnDate(
  vehicleId: string,
  date: Date
): Promise<Record<string, number> | null> {
  try {
    const tier = await getPricingTierForDate(date);
    const pricing = tier === 'ramadan' ? ramadanPricing : standardPricing;
    return pricing[vehicleId] ?? null;
  } catch (error) {
    console.error('Error getting pricing for vehicle on date:', error);
    return standardPricing[vehicleId] ?? null;
  }
}

/**
 * Get price for a specific service on a specific date
 * @param vehicleId The vehicle ID
 * @param serviceId The service ID
 * @param date The booking date
 * @returns The price for that service on that date
 */
export async function getPriceForServiceOnDate(
  vehicleId: string,
  serviceId: string,
  date: Date
): Promise<number | null> {
  try {
    const servicePricing = await getPricingForVehicleOnDate(vehicleId, date);
    return servicePricing ? servicePricing[serviceId] ?? null : null;
  } catch (error) {
    console.error('Error getting service price:', error);
    return null;
  }
}

/**
 * Batch check multiple dates to determine pricing
 * Useful for multi-day bookings
 * @param dates Array of dates to check
 * @returns 'ramadan' if any date is during Ramadan pricing period, 'standard' otherwise
 */
export async function getPricingTierForDateRange(
  dates: Date[]
): Promise<'ramadan' | 'standard'> {
  try {
    for (const date of dates) {
      const inRamadanPricingPeriod = await isDateInRamadanPricingPeriod(date);
      if (inRamadanPricingPeriod) {
        return 'ramadan';
      }
    }
    return 'standard';
  } catch (error) {
    console.error('Error determining pricing tier for date range:', error);
    return 'standard';
  }
}

/**
 * Helper: Format pricing output with detected tier
 */
export interface PricedService {
  vehicleId: string;
  serviceId: string;
  date: Date;
  price: number;
  pricingTier: 'ramadan' | 'standard';
  ramadanIndicator: boolean;
}

export async function getPricedService(
  vehicleId: string,
  serviceId: string,
  date: Date
): Promise<PricedService | null> {
  try {
    const price = await getPriceForServiceOnDate(vehicleId, serviceId, date);
    if (!price) return null;

    const pricingTier = await getPricingTierForDate(date);
    const ramadanIndicator = pricingTier === 'ramadan';

    return {
      vehicleId,
      serviceId,
      date,
      price,
      pricingTier,
      ramadanIndicator,
    };
  } catch (error) {
    console.error('Error getting priced service:', error);
    return null;
  }
}
