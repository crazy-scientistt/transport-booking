/**
 * Pricing Utility
 * Uses the single control file: client/src/data/pricing.ts
 *
 * Important:
 * - Ramadan pricing is now manual, not automatic by date.
 * - Change bookingPriceSettings.useRamadanPricing in pricing.ts.
 */

import { standardPricing, ramadanPricing, bookingPriceSettings } from '@/data/pricing';

/**
 * Get the active pricing tier.
 * @param _date Kept for compatibility; pricing is controlled manually from pricing.ts.
 * @returns 'ramadan' when enabled in pricing.ts, otherwise 'standard'
 */
export async function getPricingTierForDate(
  _date: Date
): Promise<'ramadan' | 'standard'> {
  return bookingPriceSettings.useRamadanPricing ? 'ramadan' : 'standard';
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
 * Get the active pricing tier for date ranges.
 * @param _dates Kept for compatibility; pricing is controlled manually from pricing.ts.
 * @returns 'ramadan' when enabled in pricing.ts, otherwise 'standard'
 */
export async function getPricingTierForDateRange(
  _dates: Date[]
): Promise<'ramadan' | 'standard'> {
  return bookingPriceSettings.useRamadanPricing ? 'ramadan' : 'standard';
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
