# Premium Transportation Services - Booking Website

A professional transportation booking website for Saudi Arabia-based services offering rides between major cities (Jeddah, Makkah, Madina) and religious sites (Ziyarat locations).

## Features

- **6 Vehicle Types**: Camry, Hyundai Staria, Hyundai H1, Hiace, GMC Yukon XL, and Coaster
- **Dynamic Pricing**: Prices update in real-time based on selected vehicle
- **Shopping Cart**: Add multiple services with individual date/time selection
- **WhatsApp Integration**: Direct booking via WhatsApp with pre-filled message
- **Welcome Popup**: Quick booking option for first-time visitors
- **Responsive Design**: Mobile-first approach, works on all devices
- **Ramadan Pricing**: Separate pricing structure with developer toggle

## Tech Stack

- React 19 + TypeScript
- Tailwind CSS 4
- shadcn/ui Components
- Framer Motion (animations)
- Wouter (routing)
- localStorage (cart persistence)

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The site will be available at `http://localhost:3000`

### Build for Production

```bash
pnpm build
pnpm start
```

## Configuration

All pricing and Ramadan controls are now centralized in one file:

`client/src/data/pricing.ts`

### Main Ramadan controls

At the top of `client/src/data/pricing.ts`, edit this object:

```typescript
export const bookingPriceSettings = {
  useRamadanPricing: false,
  showRamadanNotice: false,
  ramadanNoticeTitle: 'Ramadan Notice:',
  ramadanNoticeMessage: 'All prices are 30% higher fare from 18 to 30 Ramadan',
  currencyLabel: 'SAR',
};
```

Use it like this:

- `useRamadanPricing: true` = use the Ramadan price list.
- `useRamadanPricing: false` = use normal prices.
- `showRamadanNotice: true` = show the Ramadan notice in the welcome popup.
- `showRamadanNotice: false` = hide the Ramadan notice.
- Change `ramadanNoticeTitle` and `ramadanNoticeMessage` to change the wording.

Pricing and notice are separate. You can show the notice while using normal prices, or use Ramadan prices while hiding the notice.

### Updating normal and Ramadan prices

All vehicle prices are in the same file: `client/src/data/pricing.ts`.

- `standardPricing`: normal prices for every car.
- `ramadanPricing`: Ramadan prices for every car.

Each section is organized by vehicle ID, then service ID:

```typescript
export const standardPricing = {
  camry: {
    'jeddah-airport-makkah': 250,
    'makkah-ziyarat': 250,
  },
};
```

To change a price, edit the number only. Example:

```typescript
'jeddah-airport-makkah': 300,
```

### Updating Vehicle Images

Vehicle images are also stored in `client/src/data/pricing.ts`. To update:

1. Upload new images to your preferred CDN or image hosting service.
2. Update the `image` property for each vehicle in the `vehicles` array.

```typescript
{
  id: 'camry',
  name: 'Camry',
  image: 'https://your-cdn.com/new-camry-image.jpg',
}
```

### WhatsApp Number

To change the WhatsApp contact number, update it in these files:

- `client/src/components/WhatsAppConfirmation.tsx`
- `client/src/components/FloatingWhatsApp.tsx`
- `client/src/components/Footer.tsx`

```typescript
const WHATSAPP_NUMBER = '+966569713833';  // Update this number
```

## Project Structure

```
client/
├── src/
│   ├── components/       # React components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── VehicleCard.tsx
│   │   ├── VehicleFleet.tsx
│   │   ├── ServiceSelector.tsx
│   │   ├── CartDrawer.tsx
│   │   ├── WhatsAppConfirmation.tsx
│   │   ├── WelcomePopup.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── Footer.tsx
│   │   └── FloatingWhatsApp.tsx
│   ├── contexts/         # React contexts
│   │   └── CartContext.tsx
│   ├── data/             # Data and pricing
│   │   └── pricing.ts
│   ├── pages/            # Page components
│   │   └── Home.tsx
│   └── index.css         # Global styles
```

## Service Categories

1. **Airport Transfers**: Jeddah/Madina airport to hotels
2. **Intercity Travel**: Between Makkah, Madina, Jeddah, Taif
3. **Ziyarat Tours**: Religious site visits
4. **Train Station**: Hotel to train station transfers
5. **Meeqat Services**: Masjid Ayesha and Jurana
6. **Hourly Rental**: Per-hour vehicle rental

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - See LICENSE file for details.

## Support

For technical support or inquiries:
- WhatsApp: +966 569 713 833
