# Ramadan Pricing Implementation

The active app now uses simple manual controls in one file:

`client/src/data/pricing.ts`

## Active behavior

The app reads these values:

```ts
export const bookingPriceSettings = {
  useRamadanPricing: false,
  showRamadanNotice: false,
  ramadanNoticeTitle: 'Ramadan Notice:',
  ramadanNoticeMessage: 'All prices are 30% higher fare from 18 to 30 Ramadan',
  currencyLabel: 'SAR',
};
```

## What each setting does

- `useRamadanPricing` controls the actual prices.
- `showRamadanNotice` controls only the welcome popup notice.
- `ramadanNoticeTitle` changes the bold notice title.
- `ramadanNoticeMessage` changes the notice message.
- `currencyLabel` changes the label shown after prices.

## Price lists

Normal prices are in:

```ts
export const standardPricing
```

Ramadan prices are in:

```ts
export const ramadanPricing
```

Both price lists are in `client/src/data/pricing.ts`.

## Removed active automatic Ramadan behavior

The app no longer wraps the UI with RamadanProvider in `client/src/App.tsx`, so the active booking flow does not depend on automatic Ramadan date detection. This avoids hidden behavior and keeps pricing controlled from one file.
