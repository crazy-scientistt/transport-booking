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

### Ramadan Pricing Toggle

To switch between regular and Ramadan pricing:

1. Open `client/src/data/pricing.ts`
2. Find the `USE_RAMADAN_PRICING` constant at the top of the file:

```typescript
// ============================================
// DEVELOPER TOGGLE - Change this for Ramadan
// ============================================
export const USE_RAMADAN_PRICING = false;  // Set to true for Ramadan season
```

3. Change `false` to `true` for Ramadan pricing
4. Rebuild and redeploy the application

### Updating Vehicle Images

Vehicle images are stored as URLs in `client/src/data/pricing.ts`. To update:

1. Upload new images to your preferred CDN or image hosting service
2. Update the `image` property for each vehicle in the `vehicles` array:

```typescript
{
  id: 'camry',
  name: 'Camry',
  // ... other properties
  image: 'https://your-cdn.com/new-camry-image.jpg',
}
```

### Updating Pricing

All pricing is centralized in `client/src/data/pricing.ts`:

- `standardPricing`: Regular season prices
- `ramadanPricing`: Ramadan season prices

Each pricing object is organized by vehicle ID, then by service ID:

```typescript
standardPricing: {
  camry: {
    'jeddah-airport-makkah': 250,
    'makkah-ziyarat': 250,
    // ... more services
  },
  // ... more vehicles
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
