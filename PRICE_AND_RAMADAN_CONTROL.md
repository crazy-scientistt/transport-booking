# Price and Ramadan Control

All normal pricing, Ramadan pricing, and the Ramadan popup notice are controlled from one file:

```txt
client/src/data/pricing.ts
```

## Turn Ramadan pricing on or off

Open `client/src/data/pricing.ts` and edit this value:

```ts
useRamadanPricing: false,
```

Use `false` for normal prices. Use `true` for Ramadan prices.

## Turn Ramadan notice on or off

In the same file, edit this value:

```ts
showRamadanNotice: false,
```

Use `false` to hide the notice. Use `true` to show the notice.

This is separate from pricing. You can show the notice while using normal prices, or use Ramadan prices while hiding the notice.

## Change Ramadan notice wording

In the same file, edit these lines:

```ts
ramadanNoticeTitle: 'Ramadan Notice:',
ramadanNoticeMessage: 'All prices are 30% higher fare from 18 to 30 Ramadan',
```

## Change normal prices

In the same file, edit the `standardPricing` section.

Example:

```ts
camry: {
  'jeddah-airport-makkah': 250,
}
```

Change the number only:

```ts
camry: {
  'jeddah-airport-makkah': 300,
}
```

## Change Ramadan prices

In the same file, edit the `ramadanPricing` section.

These prices are used only when:

```ts
useRamadanPricing: true,
```

## Vehicle IDs

```txt
camry
staria
h1
hiace
yukon
coaster
```

## After changing prices

Existing items already added to the browser cart may still show old prices because the cart stores the price at the time it is added.

While testing, clear browser localStorage key:

```txt
transport-booking-cart
```

Then rebuild and redeploy.
