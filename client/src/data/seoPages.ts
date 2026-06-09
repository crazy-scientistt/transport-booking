import seoPagesJson from './seoPages.json';

export interface SeoFaq {
  question: string;
  answer: string;
}

export interface SeoContentSection {
  heading: string;
  body: string;
}

export interface SeoPage {
  path: string;
  serviceIds: string[];
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  intro: string;
  highlights: string[];
  sections: SeoContentSection[];
  faqs: SeoFaq[];
  relatedPaths: string[];
}

export const siteConfig = {
  name: 'Umrah Taxi',
  legalName: 'Umrah Taxi',
  url: 'https://www.umrahtaxi.cab',
  defaultImage: '/assets/vehicles/hero.webp',
  phone: '+966579693883',
  areaServed: ['Jeddah', 'Makkah', 'Madinah', 'Taif'],
  sameAs: [] as string[],
};

export const homeSeo = {
  title: 'Umrah Taxi Service in Saudi Arabia | Jeddah, Makkah & Madinah',
  description:
    'Book private Umrah taxi service in Saudi Arabia for Jeddah Airport to Makkah, Makkah to Madinah, airport transfers and Ziyarat tours. 24/7 WhatsApp booking.',
  h1: 'Private Umrah Taxi Service in Saudi Arabia',
  path: '/',
};

export const homeFaqs: SeoFaq[] = [
  {
    question: 'How do I book an Umrah taxi?',
    answer:
      'Choose a route or vehicle, then book through WhatsApp with your pickup location, drop-off location, date, time, passengers and luggage count.',
  },
  {
    question: 'Do you provide Jeddah Airport to Makkah taxi service?',
    answer:
      'Yes. Jeddah Airport to Makkah hotel transfer is one of the main routes, with private cars, vans, SUVs and group vehicles available.',
  },
  {
    question: 'Can families and groups book larger vehicles?',
    answer:
      'Yes. Families can book Staria, H1, Hiace or GMC Yukon XL. Larger groups can book Coaster when available.',
  },
  {
    question: 'Can I see Umrah taxi prices before booking?',
    answer:
      'Yes. Route and vehicle prices are shown on the site. Final fare should be confirmed on WhatsApp before travel.',
  },
];

export const seoPages = seoPagesJson as SeoPage[];

export function normalizePath(pathname: string): string {
  const path = pathname.split('?')[0].split('#')[0] || '/';
  if (path === '/') return '/';
  return path.endsWith('/') ? path.slice(0, -1) : path;
}

export function absoluteUrl(path = '/'): string {
  return `${siteConfig.url}${routeHref(path)}`;
}

export function routeHref(pathname: string): string {
  const normalizedPath = normalizePath(pathname);
  return normalizedPath === '/' ? '/' : `${normalizedPath}/`;
}

export function absoluteAssetUrl(path: string): string {
  if (path.startsWith('http')) return path;
  return `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`;
}

export function getSeoPageByPath(pathname: string): SeoPage | undefined {
  const normalizedPath = normalizePath(pathname);
  return seoPages.find((page) => normalizePath(page.path) === normalizedPath);
}

export function getRelatedSeoPages(page: SeoPage): SeoPage[] {
  return page.relatedPaths
    .map((path) => getSeoPageByPath(path))
    .filter((relatedPage): relatedPage is SeoPage => Boolean(relatedPage));
}

export function getFeaturedSeoPages(limit = 6): SeoPage[] {
  const preferredPaths = [
    '/jeddah-airport-to-makkah-taxi',
    '/makkah-to-madinah-taxi',
    '/madinah-to-makkah-taxi',
    '/makkah-to-jeddah-airport-taxi',
    '/makkah-ziyarat-taxi',
    '/madinah-ziyarat-taxi',
  ];

  return preferredPaths
    .map((path) => getSeoPageByPath(path))
    .filter((page): page is SeoPage => Boolean(page))
    .slice(0, limit);
}
