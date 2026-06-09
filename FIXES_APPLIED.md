# Fixes Applied

## Pricing and routes

- Updated normal pricing from the shared rate card and follow-up corrections.
- Added `madina-jeddah-airport` for Madinah Hotel to Jeddah Airport.
- Synced service routes with pricing keys. Routes explicitly marked '-' in the rate card are hidden for that vehicle.
- Added central route mapping comments inside `client/src/data/pricing.ts`.

## Ramadan controls

- Ramadan pricing and Ramadan notice are controlled separately.
- Ramadan prices now auto-sync from normal pricing using `ramadanPriceMultiplier`.
- Route-specific Ramadan overrides can still be added in the same file.

## Speed improvements

- Lazy-loaded booking modals and drawers.
- Removed `framer-motion` usage from the main page render path.
- Converted vehicle images from large JPG files to smaller WebP files.
- Preloaded the hero WebP image.
- Added lazy loading and async decoding for vehicle images.
- Disabled the auto welcome popup by default.
- Removed the broken analytics script from `index.html`.
- Disabled Manus/debug Vite plugins in production builds.
- Reduced Google Font weights.
- Added long cache headers for static assets in `netlify.toml`.

## UI and functionality fixes

- Fixed inconsistent WhatsApp numbers by centralizing contact settings.
- Fixed header colors on top of the hero image.
- Fixed mobile header branding.
- Fixed date picker logic so today's date is selectable.
- Fixed date storage to avoid timezone date shifts.
- Fixed service selector markup issues.
- Updated labels to use Madinah consistently in the main route list.
