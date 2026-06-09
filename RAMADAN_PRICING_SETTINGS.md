# Ramadan Pricing Settings

Edit this file:

```txt
client/src/data/pricing.ts
```

Controls:

```ts
bookingPriceSettings.useRamadanPricing
bookingPriceSettings.showRamadanNotice
bookingPriceSettings.ramadanNoticeTitle
bookingPriceSettings.ramadanNoticeMessage
bookingPriceSettings.ramadanPriceMultiplier
```

Ramadan pricing is now generated automatically from `standardPricing` using `ramadanPriceMultiplier`.

Default:

```ts
ramadanPriceMultiplier: 1.3
```

That means Ramadan prices are 30% higher than normal prices.

Use `ramadanPricingOverrides` only when one specific Ramadan price must be different from the automatic calculation.
