# Testing Guide

## Test normal pricing

1. Open `client/src/data/pricing.ts`.
2. Set:

```ts
useRamadanPricing: false,
showRamadanNotice: false,
```

3. Run the app.
4. Select a vehicle and service.
5. Confirm that the displayed price matches the `standardPricing` section.

## Test Ramadan pricing

1. Open `client/src/data/pricing.ts`.
2. Set:

```ts
useRamadanPricing: true,
```

3. Run the app.
4. Select a vehicle and service.
5. Confirm that the displayed price matches the `ramadanPricing` section.

## Test Ramadan notice

To show the notice:

```ts
showRamadanNotice: true,
```

To hide the notice:

```ts
showRamadanNotice: false,
```

The notice setting does not control prices. Pricing is controlled only by `useRamadanPricing`.

## Test notice wording

Change:

```ts
ramadanNoticeTitle: 'Ramadan Notice:',
ramadanNoticeMessage: 'All prices are 30% higher fare from 18 to 30 Ramadan',
```

Refresh the app and open the welcome popup.

## Clear cart while testing

Old cart items keep the price from the moment they were added. Clear the browser localStorage key before retesting prices:

```txt
transport-booking-cart
```
