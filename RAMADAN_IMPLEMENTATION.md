# Dynamic Ramadan Pricing System - Implementation Guide

## Overview
This system replaces the manual `USE_RAMADAN_PRICING` toggle with an intelligent, date-driven Ramadan detection system that works automatically using the Aladhan API.

## Architecture

### 1. **Ramadan Detection Layer** (`utils/ramadanUtils.ts`)
- Queries Aladhan API for Hijri calendar data
- Converts Gregorian dates to Hijri years
- Implements smart caching in `localStorage` (30-day TTL)
- Handles API timeouts and failures gracefully

**Key Functions:**
- `isDateInRamadan(date)` - Check if specific date is in Ramadan
- `getRamadanDatesForYear(year)` - Get Ramadan period for a year
- `clearRamadanCache()` - Manual cache clear (for testing/updates)

### 2. **React Context** (`contexts/RamadanContext.tsx`)
- Provides app-wide access to Ramadan detection
- Manages loading and error states
- Includes hooks: `useRamadan()` and `useIsDateRamadan()`

**Features:**
- Fallback support if API unavailable
- Error handling and logging
- Automatic API availability check on mount

### 3. **Dynamic Pricing Utility** (`utils/dynamicPricingUtils.ts`)
- Determines pricing tier based on booking date
- Batch checking for date ranges
- Atomic pricing operations with Ramadan indicators

**Key Functions:**
- `getPriceForServiceOnDate(vehicleId, serviceId, date)` - Get price for specific date
- `getPricingTierForDate(date)` - Determine if Ramadan or standard
- `getPricedService()` - Get complete pricing info with indicator

### 4. **Original Data Layer** (`data/pricing.ts`)
- Maintains both `standardPricing` and `ramadanPricing` structures
- Removed `USE_RAMADAN_PRICING` manual toggle
- `getPrice()` now deprecated (backward compatibility only)

---

## Integration Steps

### Step 1: Wrap App with RamadanProvider
```tsx
// App.tsx
import { RamadanProvider } from "./contexts/RamadanContext";

function App() {
  return (
    <RamadanProvider fallbackToManual={false}>
      {/* Your app */}
    </RamadanProvider>
  );
}
```

### Step 2: Update Components to Use Dynamic Pricing

**Example: WelcomePopup.tsx**
```tsx
import { useIsDateRamadan } from '@/contexts/RamadanContext';
import { getPriceForServiceOnDate } from '@/utils/dynamicPricingUtils';

// Inside component:
const selectedDate = new Date(); // User's selected date
const { isRamadanDate, loading } = useIsDateRamadan(selectedDate);

// When calculating price:
const price = await getPriceForServiceOnDate(vehicleId, serviceId, selectedDate);

// Show indicator when Ramadan pricing:
{isRamadanDate && <div className="badge bg-gold">Ramadan Pricing</div>}
```

### Step 3: Handle Async Pricing

Since API calls are async, pricing calculations should happen in side effects:

```tsx
useEffect(() => {
  if (!selectedDate || !vehicleId || !serviceId) return;
  
  const fetchPrice = async () => {
    const price = await getPriceForServiceOnDate(vehicleId, serviceId, selectedDate);
    setPrice(price);
  };
  
  fetchPrice();
}, [selectedDate, vehicleId, serviceId]);
```

---

## Performance Optimization

### Caching Strategy
- **First check**: Queries `localStorage` cache
- **Cache hit**: Returns immediately (no API call)
- **Cache miss**: Fetches from Aladhan API (5s timeout)
- **Cache TTL**: 30 days
- **Fallback**: Returns standard pricing if API fails

### Expected Performance
- Cached queries: < 5ms
- API queries (first time): 200-500ms
- Subsequent queries: < 5ms

### Cache Structure
```json
{
  "ramadan_cache": {
    "periods": {
      "1446": { "startDate": "...", "endDate": "...", "year": 1446 }
    },
    "lastUpdated": 1707026400000
  }
}
```

---

## Testing Recommendations

### Unit Tests
```typescript
// Test Ramadan detection
test('Should detect Ramadan date correctly', async () => {
  const ramadanDate = new Date('2025-03-01'); // During Ramadan 1446
  const result = await isDateInRamadan(ramadanDate);
  expect(result).toBe(true);
});

// Test non-Ramadan date
test('Should return false for non-Ramadan date', async () => {
  const nonRamadanDate = new Date('2025-06-01');
  const result = await isDateInRamadan(nonRamadanDate);
  expect(result).toBe(false);
});
```

### Integration Tests
```typescript
// Test pricing application
test('Should apply Ramadan pricing during Ramadan', async () => {
  const ramadanDate = new Date('2025-03-01');
  const price = await getPriceForServiceOnDate('hiace', 'makkah-madina', ramadanDate);
  const standardPrice = standardPricing['hiace']['makkah-madina'];
  const ramadanPrice = ramadanPricing['hiace']['makkah-madina'];
  
  expect(price).toBe(ramadanPrice); // Should be Ramadan price, not standard
});
```

### Cache Tests
```typescript
test('Should use cached data on subsequent calls', async () => {
  const date = new Date('2025-03-01');
  
  // First call - API call
  await isDateInRamadan(date);
  const initialCache = window.localStorage.getItem('ramadan_cache');
  
  // Second call - should use cache
  await isDateInRamadan(date);
  const secondCache = window.localStorage.getItem('ramadan_cache');
  
  expect(initialCache).toEqual(secondCache);
});
```

---

## Error Handling

### API Failure Scenarios
1. **Timeout (> 5s)**: Falls back to standard pricing
2. **Network error**: Uses cached data if available
3. **Invalid JSON**: Logged and falls back to standard pricing
4. **Hijri year conversion error**: Uses standard pricing

### Logging
```typescript
// All errors are logged to console for debugging
console.error('Error fetching Ramadan dates:', error);
console.warn('Ramadan API unavailable, fallback enabled');
```

---

## Migration Checklist

- [ ] Wrap App with `<RamadanProvider>`
- [ ] Import `RamadanContext.tsx` and `ramadanUtils.ts`
- [ ] Update `WelcomePopup.tsx` to use `useIsDateRamadan()`
- [ ] Update `VehicleCard.tsx` pricing display
- [ ] Update checkout/confirmation flow
- [ ] Test with Ramadan dates
- [ ] Test with non-Ramadan dates
- [ ] Verify localStorage caching works
- [ ] Test API fallback scenarios
- [ ] Add unit tests for pricing logic
- [ ] Remove all references to `USE_RAMADAN_PRICING`

---

## API Reference: Aladhan

**Endpoint Used:**
```
https://api.aladhan.com/v1/hijriCalendar?month=9&year={hijriYear}
```

**Response Structure:**
```json
{
  "data": [
    {
      "gregorian": {
        "date": "2025-03-01",
        "month": { "number": 3 }
      }
    }
  ]
}
```

**Month 9** = Ramadan (Islamic calendar)

---

## Future Enhancements

1. **Multi-year caching**: Pre-cache next 2-3 years of Ramadan dates
2. **Regional variants**: Support different moon sighting calculations
3. **Other Islamic holidays**: Extend to Eid al-Fitr, Eid al-Adha pricing
4. **Analytics**: Track Ramadan booking patterns
5. **User notifications**: Email alerts for Ramadan pricing
6. **Date range optimization**: Detect Ramadan during multi-day bookings

---

## Troubleshooting

**Q: Pricing not updating on date change**
A: Ensure component is using `useIsDateRamadan()` hook and re-calculating price in useEffect when date changes.

**Q: API calls not caching**
A: Check localStorage is enabled. Use `clearRamadanCache()` to reset cache if stale.

**Q: Always showing standard pricing**
A: Check browser console for errors. Confirm API is accessible at `api.aladhan.com`.

**Q: Ramadan detection incorrect**
A: Verify date format is correct (Date object, not string). Aladhan uses Moon sighting, which may vary by region.

---

## Support & Maintenance

- **API Status**: Monitor Aladhan API health (usually 99.9% uptime)
- **Cache Resets**: Automatic every 30 days, or manual via `clearRamadanCache()`
- **Logging**: All errors logged to console with context
- **Debug**: Use `getRamadanCacheSummary()` to inspect cached data
