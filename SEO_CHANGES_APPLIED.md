# SEO Changes Applied

This project was updated to improve SEO for www.umrahtaxi.cab while keeping the existing visual design and booking flow intact.

## Main SEO Improvements

- Updated the homepage SEO title, description, robots, canonical, Open Graph and Twitter metadata.
- Added LocalBusiness, Organization, TaxiService, WebSite, WebPage, Breadcrumb and FAQ structured data.
- Added route-specific SEO landing pages for high-intent Umrah taxi searches.
- Added internal links from the homepage and footer to important route pages.
- Added crawlable homepage SEO content for popular routes, FAQ, family bookings, group bookings and price pages.
- Added a build-time SEO generator that creates static HTML files for route pages after the Vite build.
- Added `sitemap.xml`, `robots.txt` and `site.webmanifest`.
- Added canonical URL handling with trailing-slash route URLs.
- Updated image alt text and visible page copy for important route keywords.
- Kept the existing theme, layout style, colors, booking modals, cart flow and WhatsApp flow.

## New SEO Pages

- `/jeddah-airport-to-makkah-taxi/`
- `/makkah-to-madinah-taxi/`
- `/madinah-to-makkah-taxi/`
- `/makkah-to-jeddah-airport-taxi/`
- `/jeddah-airport-to-madinah-taxi/`
- `/madinah-airport-to-hotel-taxi/`
- `/makkah-ziyarat-taxi/`
- `/madinah-ziyarat-taxi/`
- `/taif-ziyarat-taxi/`
- `/umrah-taxi-prices/`
- `/private-umrah-taxi-for-family/`
- `/hiace-coaster-group-taxi-umrah/`

## Important Files Changed or Added

- `client/index.html`
- `client/src/App.tsx`
- `client/src/pages/Home.tsx`
- `client/src/pages/SeoRoutePage.tsx`
- `client/src/pages/NotFound.tsx`
- `client/src/components/SeoContentSection.tsx`
- `client/src/components/Header.tsx`
- `client/src/components/Footer.tsx`
- `client/src/components/Hero.tsx`
- `client/src/components/VehicleFleet.tsx`
- `client/src/components/ServicesSection.tsx`
- `client/src/components/AboutSection.tsx`
- `client/src/components/VehicleCard.tsx`
- `client/src/components/ServiceSelector.tsx`
- `client/src/data/seoPages.ts`
- `client/src/data/seoPages.json`
- `client/src/lib/seo.ts`
- `client/public/sitemap.xml`
- `client/public/robots.txt`
- `client/public/site.webmanifest`
- `scripts/generate-seo-pages.mjs`
- `package.json`
- `netlify.toml`

## Deploy Notes

Run locally or in Netlify:

```bash
pnpm install
pnpm run build
```

The build script runs:

```bash
vite build && node scripts/generate-seo-pages.mjs && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist
```

After deployment, submit this sitemap in Google Search Console:

```text
https://www.umrahtaxi.cab/sitemap.xml
```

## Ranking Note

These changes make the site more SEO-ready, but they do not guarantee top ranking by themselves. To compete for top positions, the business still needs Google Business Profile optimization, real reviews, travel/Umrah backlinks, local citations and ongoing content updates.
