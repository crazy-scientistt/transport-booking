# Ramadan pricing and notice settings

The app is now set up so you control Ramadan pricing, Ramadan notice text, and all prices from one file:

`client/src/data/pricing.ts`

## Main controls

At the top of `client/src/data/pricing.ts`, edit this object:

```ts
export const bookingPriceSettings = {
  useRamadanPricing: false,
  showRamadanNotice: false,
  ramadanNoticeTitle: 'Ramadan Notice:',
  ramadanNoticeMessage: 'All prices are 30% higher fare from 18 to 30 Ramadan',
  currencyLabel: 'SAR',
};
```

## What to change

- `useRamadanPricing: true` uses the `ramadanPricing` list.
- `useRamadanPricing: false` uses the `standardPricing` list.
- `showRamadanNotice: true` shows the notice in the welcome popup.
- `showRamadanNotice: false` hides the notice.
- `ramadanNoticeTitle` changes the bold notice title.
- `ramadanNoticeMessage` changes the notice message.
- `currencyLabel` changes the label shown after prices.

Pricing and notice are separate. You can show the Ramadan notice while keeping normal prices, or use Ramadan prices while hiding the notice.

## Price lists

In the same file:

- `standardPricing` = normal prices for every vehicle.
- `ramadanPricing` = Ramadan prices for every vehicle.

Vehicle IDs used in the price lists:

- `camry`
- `h1`
- `staria`
- `hiace`
- `yukon`
- `coaster`

Service IDs are the keys inside each vehicle, for example:

```ts
'jeddah-airport-makkah': 250,
'makkah-madina': 450,
'hourly': 100,
```

To change a price, edit the number only.
