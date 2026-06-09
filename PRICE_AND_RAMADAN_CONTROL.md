# Price, Ramadan, Contact, and Popup Control

Edit one file:

```txt
client/src/data/pricing.ts
```

## Ramadan pricing on/off

At the top of `pricing.ts`:

```ts
useRamadanPricing: false,
```

- `false` = use normal prices from `standardPricing`
- `true` = use Ramadan prices

## Ramadan notice on/off

```ts
showRamadanNotice: false,
```

- `false` = hide the Ramadan notice
- `true` = show the Ramadan notice in the quick booking popup

## Ramadan notice wording

```ts
ramadanNoticeTitle: 'Ramadan Notice:',
ramadanNoticeMessage: 'All prices are 30% higher fare from 18 to 30 Ramadan',
```

## Ramadan price amount

Ramadan pricing now stays synced with normal pricing automatically.

```ts
ramadanPriceMultiplier: 1.3,
```

- `1.3` = 30% higher
- `1.2` = 20% higher
- `1.5` = 50% higher

For one-off Ramadan price exceptions, add them inside:

```ts
ramadanPricingOverrides
```

## Normal prices

Edit:

```ts
export const standardPricing
```

Example:

```ts
camry: {
  'jeddah-airport-makkah': 220,
}
```

## Contact number

Edit:

```ts
export const contactSettings = {
  phoneNumber: '+966579693883',
  whatsappNumber: '+966579693883',
};
```

This updates the header, footer, floating WhatsApp button, and checkout WhatsApp link.

## First-visit quick booking popup

```ts
showWelcomePopupOnFirstVisit: false,
```

- `false` = popup opens only when the customer clicks Book Now
- `true` = popup also opens automatically on first visit

## Important route mapping

- `jeddah-airport-makkah` = Jeddah Airport to Makkah Hotel
- `makkah-hotel-jeddah-airport` = Makkah Hotel to Jeddah Airport
- `jeddah-airport-madina` = Jeddah Airport to Madinah Hotel
- `madina-jeddah-airport` = Madinah Hotel to Jeddah Airport
- `coaster` = Coaster column from the shared rate card
