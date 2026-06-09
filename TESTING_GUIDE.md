# Testing Guide

## Price test

1. Open the site.
2. Click `Book Now` or select a vehicle from the fleet.
3. Choose a route.
4. Confirm that the displayed price matches `standardPricing` in:

```txt
client/src/data/pricing.ts
```

## Ramadan pricing test

1. Set this in `client/src/data/pricing.ts`:

```ts
useRamadanPricing: true,
```

2. Open the site again.
3. Check the same route.
4. The price should be normal price × `ramadanPriceMultiplier` unless overridden in `ramadanPricingOverrides`.

## Ramadan notice test

1. Set:

```ts
showRamadanNotice: true,
```

2. Open the quick booking popup.
3. Confirm that the notice title/message match:

```ts
ramadanNoticeTitle
ramadanNoticeMessage
```

## Contact number test

Change `contactSettings` in `pricing.ts`, then check:

- Header phone link
- Footer phone/WhatsApp link
- Floating WhatsApp button
- Checkout WhatsApp modal
