import { useEffect } from 'react';
import { absoluteAssetUrl, absoluteUrl, homeSeo, SeoPage, siteConfig } from '@/data/seoPages';

type MetaKey = 'name' | 'property';

interface DocumentSeoInput {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  image?: string;
  faqs?: { question: string; answer: string }[];
  noIndex?: boolean;
}

function ensureMeta(keyType: MetaKey, key: string, content: string) {
  const selector = `meta[${keyType}="${key}"]`;
  let tag = document.head.querySelector<HTMLMetaElement>(selector);

  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(keyType, key);
    document.head.appendChild(tag);
  }

  tag.setAttribute('content', content);
}

function ensureCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }

  link.setAttribute('href', href);
}

function ensureStructuredData(id: string, data: unknown) {
  let script = document.head.querySelector<HTMLScriptElement>(`script#${id}`);

  if (!script) {
    script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(data);
}

function buildBaseGraph(url: string): Record<string, unknown>[] {
  return [
    {
      '@type': 'Organization',
      '@id': `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
      logo: absoluteAssetUrl('/assets/vehicles/hero.webp'),
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: siteConfig.phone,
          contactType: 'customer service',
          areaServed: 'SA',
          availableLanguage: ['English', 'Arabic', 'Urdu'],
        },
      ],
    },
    {
      '@type': 'LocalBusiness',
      '@id': `${siteConfig.url}/#business`,
      name: siteConfig.legalName,
      url: siteConfig.url,
      telephone: siteConfig.phone,
      image: absoluteAssetUrl('/assets/vehicles/hero.webp'),
      priceRange: 'SAR',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'SA',
      },
      areaServed: siteConfig.areaServed,
      description: homeSeo.description,
    },
    {
      '@type': 'TaxiService',
      '@id': `${siteConfig.url}/#taxi-service`,
      name: 'Umrah Taxi Service in Saudi Arabia',
      provider: {
        '@id': `${siteConfig.url}/#business`,
      },
      areaServed: siteConfig.areaServed,
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
      '@id': `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      publisher: {
        '@id': `${siteConfig.url}/#organization`,
      },
      inLanguage: 'en',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${siteConfig.url}/?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: homeSeo.title,
      description: homeSeo.description,
      isPartOf: {
        '@id': `${siteConfig.url}/#website`,
      },
      about: {
        '@id': `${siteConfig.url}/#taxi-service`,
      },
      inLanguage: 'en',
    },
  ];
}

function buildStructuredData(input: DocumentSeoInput) {
  const url = absoluteUrl(input.path);
  const graph = buildBaseGraph(url);

  graph[graph.length - 1] = {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: input.title,
    description: input.description,
    isPartOf: {
      '@id': `${siteConfig.url}/#website`,
    },
    about: {
      '@id': `${siteConfig.url}/#taxi-service`,
    },
    inLanguage: 'en',
  };

  if (input.path !== '/') {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: absoluteUrl('/'),
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: input.title.split('|')[0].trim(),
          item: url,
        },
      ],
    });
  }

  if (input.faqs?.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: input.faqs.map((faq) => ({
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

export function useDocumentSeo(input: DocumentSeoInput) {
  useEffect(() => {
    const url = absoluteUrl(input.path);
    const imageUrl = absoluteAssetUrl(input.image ?? siteConfig.defaultImage);

    document.title = input.title;

    ensureMeta('name', 'description', input.description);
    ensureMeta('name', 'robots', input.noIndex ? 'noindex, follow' : 'index, follow, max-image-preview:large');
    ensureMeta('name', 'theme-color', '#1f6b57');
    ensureMeta('property', 'og:type', input.type ?? 'website');
    ensureMeta('property', 'og:title', input.title);
    ensureMeta('property', 'og:description', input.description);
    ensureMeta('property', 'og:url', url);
    ensureMeta('property', 'og:site_name', siteConfig.name);
    ensureMeta('property', 'og:image', imageUrl);
    ensureMeta('property', 'og:locale', 'en_US');
    ensureMeta('name', 'twitter:card', 'summary_large_image');
    ensureMeta('name', 'twitter:title', input.title);
    ensureMeta('name', 'twitter:description', input.description);
    ensureMeta('name', 'twitter:image', imageUrl);
    ensureCanonical(url);
    ensureStructuredData('structured-data', buildStructuredData(input));
  }, [input.description, input.faqs, input.image, input.noIndex, input.path, input.title, input.type]);
}

export function pageToDocumentSeo(page: SeoPage): DocumentSeoInput {
  return {
    title: page.title,
    description: page.description,
    path: page.path,
    faqs: page.faqs,
    type: 'website',
  };
}
