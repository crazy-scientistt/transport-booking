# Ramadan Implementation

Ramadan behavior is controlled manually from:

```txt
client/src/data/pricing.ts
```

There is no automatic Ramadan API/date logic in the active booking flow.

The Ramadan notice and Ramadan pricing are separate:

- `showRamadanNotice` controls the popup notice.
- `useRamadanPricing` controls which prices are charged.
- `ramadanPriceMultiplier` controls the Ramadan increase.

Normal prices are stored in `standardPricing`.
Ramadan prices are generated from `standardPricing` so routes stay synced.
