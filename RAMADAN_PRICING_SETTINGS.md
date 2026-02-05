/**
 * DEVELOPER SETTINGS - Ramadan Pricing Configuration
 * 
 * This file allows developers to customize when Ramadan pricing is applied
 * without touching the core logic. Simply update the values below and pricing
 * will adjust automatically throughout the app.
 * 
 * Location: client/src/utils/ramadanUtils.ts (look for RAMADAN_PRICING_CONFIG)
 */

// ============================================
// HOW TO CUSTOMIZE
// ============================================

/*
Step 1: Open client/src/utils/ramadanUtils.ts

Step 2: Find this section:

export const RAMADAN_PRICING_CONFIG = {
  RAMADAN_PRICING_START_DAY: 18,  // Start showing pricing from day 18
  RAMADAN_PRICING_END_DAY: 30,    // Show pricing until day 30 (end of month)
};

Step 3: Modify the numbers as needed:

EXAMPLES:
---------

// Show pricing entire Ramadan month (day 1-30):
{
  RAMADAN_PRICING_START_DAY: 1,
  RAMADAN_PRICING_END_DAY: 30,
}

// Show pricing only last 10 days of Ramadan (day 21-30):
{
  RAMADAN_PRICING_START_DAY: 21,
  RAMADAN_PRICING_END_DAY: 30,
}

// Show pricing first half of Ramadan (day 1-15):
{
  RAMADAN_PRICING_START_DAY: 1,
  RAMADAN_PRICING_END_DAY: 15,
}

// Show pricing middle of Ramadan (day 10-20):
{
  RAMADAN_PRICING_START_DAY: 10,
  RAMADAN_PRICING_END_DAY: 20,
}

Step 4: Save the file

Step 5: The app will automatically detect the new settings on page refresh
        (No restart required - cached data will be invalidated)
*/

// ============================================
// IMPORTANT NOTES
// ============================================

/*
1. DAYS ARE 1-INDEXED
   - Day 1 = First day of Ramadan
   - Day 15 = Middle of Ramadan 
   - Day 30 = Last possible day (Ramadan is 29-30 days)

2. START_DAY MUST BE <= END_DAY
   - ✓ START: 18, END: 30 (shows last 13 days)
   - ✗ START: 30, END: 18 (invalid - won't work)

3. CACHE CLEARING
   - When you change these values, the system automatically recalculates
   - Old bookings won't change (they're locked to their original date)
   - New bookings will use the new pricing period

4. AUTOMATIC OPERATION
   - No manual toggle needed
   - System checks booking date against Islamic calendar
   - Works across all component and pages automatically

5. FOR TESTING
   - To test Ramadan pricing:
     * Open DevTools > Console
     * Import and check: getRamadanPricingConfig()
     * Shows current START_DAY and END_DAY
     * Try selecting dates during pricing period (day 18+)
*/

// ============================================
// QUICK REFERENCE: Ramadan 2025
// ============================================

/*
Islamic Year: 1446 Hijri
Gregorian Dates: March 1 - March 30, 2025

If using default config (START_DAY: 18):
- Ramadan pricing starts: March 18, 2025
- Ramadan pricing ends: March 30, 2025
- Duration: 13 days

Test Cases:
- March 17, 2025: Standard pricing (day 17)
- March 18, 2025: Ramadan pricing starts (day 18)
- March 24, 2025: Ramadan pricing (day 24)
- March 30, 2025: Ramadan pricing (day 30)
- March 31, 2025: Standard pricing (after Ramadan)
*/

// ============================================
// API REFERENCE: How System Works
// ============================================

/*
FUNCTION: isDateInRamadanPricingPeriod(date)
- Returns TRUE if date falls within pricing period (day 18-30 by default)
- Returns FALSE if date is outside pricing period
- Called automatically when customer selects booking date

FUNCTION: getPricingTierForDate(date)
- Calls isDateInRamadanPricingPeriod internally
- Returns 'ramadan' or 'standard'
- Used by components to determine which prices to show

FUNCTION: getPriceForServiceOnDate(vehicleId, serviceId, date)
- Gets price based on date's pricing tier
- Returns ramadanPricing[vehicleId][serviceId] if during pricing period
- Returns standardPricing[vehicleId][serviceId] otherwise

HOOK: useIsDateRamadanPricingPeriod(date)
- React hook for components
- Manages loading state automatically
- Updates whenever date changes

HOOK: useRamadan()
- Access pricing config: useRamadan().pricingConfig
- Check API status: useRamadan().apiAvailable
*/

// ============================================
// TROUBLESHOOTING
// ============================================

/*
Q: Pricing not changing when I select day 18?
A: Check browser console for errors. Cache might be old.
   Force refresh: DevTools > Application > Local Storage > Delete 'ramadan_cache'

Q: Want to show Ramadan pricing for entire month?
A: Set RAMADAN_PRICING_START_DAY: 1 (keep END_DAY: 30)

Q: Custom date range not showing pricing?
A: Verify START_DAY < END_DAY and both are 1-30
   Clear cache and refresh page
   Check console: console.log(getRamadanPricingConfig())

Q: What if Islamic calendar changes?
A: Aladhan API handles this automatically
   Different regions might have different Ramadan start dates
   System uses universal astronomical calculation
*/
