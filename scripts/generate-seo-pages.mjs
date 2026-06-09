import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist', 'public');
const indexPath = path.join(distDir, 'index.html');
const seoPagesPath = path.join(projectRoot, 'client', 'src', 'data', 'seoPages.json');

const SITE_URL = 'https://umrahtaxi.cab';
const SITE_NAME = 'Umrah Taxi';
const PHONE = '+966579693883';
const HERO_IMAGE = `${SITE_URL}/assets/vehicles/hero.webp`;
const AREAS = ['Jeddah', 'Makkah', 'Madinah', 'Taif'];

const homePage = {
  path: '/',
  title: 'Umrah Taxi Service in Saudi Arabia | Jeddah, Makkah & Madinah',
  description:
    'Book private Umrah taxi service in Saudi Arabia for Jeddah Airport to Makkah, Makkah to Madinah, airport transfers and Ziyarat tours. 24/7 WhatsApp booking.',
  h1: 'Private Umrah Taxi Service in Saudi Arabia',
  eyebrow: 'Umrah Taxi Service',
  intro:
    'Private taxi service for Jeddah Airport to Makkah, Makkah to Madinah, Madinah airport transfers, Ziyarat tours, families and pilgrim groups.',
  highlights: ['Jeddah Airport to Makkah', 'Makkah to Madinah', 'Makkah and Madinah Ziyarat', '24/7 WhatsApp booking'],
  sections: [
    {
      heading: 'Private Umrah transport for pilgrims',
      body: 'Book airport transfers, hotel-to-hotel travel and Ziyarat trips with clear vehicle options and WhatsApp confirmation.',
    },
  ],
  faqs: [
    {
      question: 'How do I book an Umrah taxi?',
      answer: 'Choose a route or vehicle, then book through WhatsApp with your pickup location, drop-off location, date, time, passengers and luggage count.',
    },
    {
      question: 'Do you provide Jeddah Airport to Makkah taxi service?',
      answer: 'Yes. Jeddah Airport to Makkah hotel transfer is one of the main routes, with private cars, vans, SUVs and group vehicles available.',
    },
    {
      question: 'Can families and groups book larger vehicles?',
      answer: 'Yes. Families can book Staria, H1, Hiace or GMC Yukon XL. Larger groups can book Coaster when available.',
    },
    {
      question: 'Can I see Umrah taxi prices before booking?',
      answer: 'Yes. Route and vehicle prices are shown on the site. Final fare should be confirmed on WhatsApp before travel.',
    },
  ],
};

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function hrefPath(pagePath = '/') {
  if (pagePath === '/') return '/';
  return pagePath.endsWith('/') ? pagePath : `${pagePath}/`;
}

function absoluteUrl(pagePath = '/') {
  return `${SITE_URL}${hrefPath(pagePath)}`;
}

function buildStructuredData(page) {
  const url = absoluteUrl(page.path);
  const graph = [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      logo: HERO_IMAGE,
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: PHONE,
          contactType: 'customer service',
          areaServed: 'SA',
          availableLanguage: ['English', 'Arabic', 'Urdu'],
        },
      ],
    },
    {
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/#business`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      telephone: PHONE,
      image: HERO_IMAGE,
      priceRange: 'SAR',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'SA',
      },
      areaServed: AREAS,
      description: homePage.description,
    },
    {
      '@type': 'TaxiService',
      '@id': `${SITE_URL}/#taxi-service`,
      name: 'Umrah Taxi Service in Saudi Arabia',
      provider: {
        '@id': `${SITE_URL}/#business`,
      },
      areaServed: AREAS,
      serviceType: [
        'Jeddah Airport to Makkah Taxi',
        'Makkah to Madinah Taxi',
        'Madinah Airport Transfer',
        'Makkah Ziyarat Taxi',
        'Madinah Ziyarat Taxi',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      publisher: {
        '@id': `${SITE_URL}/#organization`,
      },
      inLanguage: 'en',
    },
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: page.title,
      description: page.description,
      isPartOf: {
        '@id': `${SITE_URL}/#website`,
      },
      about: {
        '@id': `${SITE_URL}/#taxi-service`,
      },
      inLanguage: 'en',
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: HERO_IMAGE,
      },
    },
  ];

  if (page.path !== '/') {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${SITE_URL}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: page.h1,
          item: url,
        },
      ],
    });
  }

  if (page.faqs?.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: page.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

function stripManagedSeo(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>/i, '')
    .replace(/<meta\s+name=["'](?:description|robots|author|keywords|theme-color|twitter:card|twitter:title|twitter:description|twitter:image)["'][^>]*>\s*/gi, '')
    .replace(/<meta\s+property=["']og:(?:type|site_name|title|description|url|image|locale)["'][^>]*>\s*/gi, '')
    .replace(/<link\s+rel=["']canonical["'][^>]*>\s*/gi, '')
    .replace(/<script[^>]*id=["']structured-data["'][\s\S]*?<\/script>\s*/gi, '');
}

function buildSeoHeadBlock(page) {
  const url = absoluteUrl(page.path);
  const jsonLd = JSON.stringify(buildStructuredData(page));

  return `
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <meta name="author" content="${SITE_NAME}" />
    <meta name="theme-color" content="#1f6b57" />
    <link rel="canonical" href="${escapeHtml(url)}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta property="og:title" content="${escapeHtml(page.title)}" />
    <meta property="og:description" content="${escapeHtml(page.description)}" />
    <meta property="og:url" content="${escapeHtml(url)}" />
    <meta property="og:image" content="${HERO_IMAGE}" />
    <meta property="og:locale" content="en_US" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(page.title)}" />
    <meta name="twitter:description" content="${escapeHtml(page.description)}" />
    <meta name="twitter:image" content="${HERO_IMAGE}" />
    <script id="structured-data" type="application/ld+json">${jsonLd.replaceAll('<', '\\u003c')}</script>`;
}

function fallbackHtml(page, allPages) {
  const isHome = page.path === '/';
  const links = (isHome ? allPages.slice(0, 8) : allPages.filter((candidate) => candidate.path !== page.path).slice(0, 6))
    .map((candidate) => `<li><a href="${escapeHtml(hrefPath(candidate.path))}">${escapeHtml(candidate.h1)}</a></li>`)
    .join('');

  const highlights = (page.highlights ?? [])
    .map((highlight) => `<li>${escapeHtml(highlight)}</li>`)
    .join('');

  const sections = (page.sections ?? [])
    .map(
      (section) => `
        <section>
          <h2>${escapeHtml(section.heading)}</h2>
          <p>${escapeHtml(section.body)}</p>
        </section>`
    )
    .join('');

  const faqs = (page.faqs ?? [])
    .map(
      (faq) => `
        <details>
          <summary>${escapeHtml(faq.question)}</summary>
          <p>${escapeHtml(faq.answer)}</p>
        </details>`
    )
    .join('');

  return `
      <main class="seo-static-fallback" style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 48px 20px; max-width: 1080px; margin: 0 auto; line-height: 1.6; color: #1f2933;">
        <p style="text-transform: uppercase; letter-spacing: 0.12em; color: #987a20; font-weight: 700;">${escapeHtml(page.eyebrow)}</p>
        <h1 style="font-size: clamp(2rem, 5vw, 4rem); line-height: 1.05; margin: 0 0 16px;">${escapeHtml(page.h1)}</h1>
        <p style="font-size: 1.125rem; max-width: 760px; color: #52606d;">${escapeHtml(page.intro)}</p>
        ${highlights ? `<ul>${highlights}</ul>` : ''}
        ${sections}
        ${faqs ? `<section><h2>Frequently Asked Questions</h2>${faqs}</section>` : ''}
        <section>
          <h2>${isHome ? 'Popular Umrah Taxi Routes' : 'Related Umrah Taxi Routes'}</h2>
          <ul>${links}</ul>
        </section>
        <p><a href="https://wa.me/966579693883">Book on WhatsApp</a></p>
      </main>`;
}

function injectSeo(html, page, allPages) {
  const cleaned = stripManagedSeo(html);
  const withHead = cleaned.replace('</head>', `${buildSeoHeadBlock(page)}\n  </head>`);
  return withHead.replace('<div id="root"></div>', `<div id="root">${fallbackHtml(page, allPages)}</div>`);
}

function writeSitemap(pages) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = [homePage, ...pages];
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.flatMap((page) => {
      const priority = page.path === '/' ? '1.0' : page.path.includes('jeddah-airport-to-makkah') || page.path.includes('makkah-to-madinah') || page.path.includes('umrah-taxi-prices') ? '0.9' : '0.8';
      return [
        '  <url>',
        `    <loc>${absoluteUrl(page.path)}</loc>`,
        `    <lastmod>${today}</lastmod>`,
        '    <changefreq>weekly</changefreq>',
        `    <priority>${priority}</priority>`,
        '  </url>',
      ];
    }),
    '</urlset>',
  ].join('\n');

  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), `${xml}\n`, 'utf8');
}

function writeRobots() {
  fs.writeFileSync(
    path.join(distDir, 'robots.txt'),
    `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
    'utf8'
  );
}

function main() {
  if (!fs.existsSync(indexPath)) {
    throw new Error(`Build index.html not found at ${indexPath}`);
  }

  const baseHtml = fs.readFileSync(indexPath, 'utf8');
  const seoPages = readJson(seoPagesPath);
  const allPages = [homePage, ...seoPages];

  fs.writeFileSync(indexPath, injectSeo(baseHtml, homePage, seoPages), 'utf8');

  for (const page of seoPages) {
    const slug = page.path.replace(/^\/+/, '').replace(/\/+$/, '');
    const pageDir = path.join(distDir, slug);
    fs.mkdirSync(pageDir, { recursive: true });
    fs.writeFileSync(path.join(pageDir, 'index.html'), injectSeo(baseHtml, page, allPages), 'utf8');
  }

  writeSitemap(seoPages);
  writeRobots();
  console.log(`Generated ${seoPages.length} SEO landing page HTML files, sitemap.xml, and robots.txt.`);
}

main();
