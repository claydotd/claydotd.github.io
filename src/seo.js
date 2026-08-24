export const SITE_URL = 'https://analoguegonedigital.co.uk'
export const SITE_NAME = 'analogue gone digital'
export const SITE_IMAGE = `${SITE_URL}/favicon.png`

export const pages = {
  '/': {
    title: 'Web design, audio & photography in Leith, Scotland | analogue gone digital',
    description:
      'Affordable web design, audio production, and photography in Leith, Edinburgh. Clay Leslie helps musicians, artists, and creatives across Scotland build a unique digital presence.',
    keywords:
      'web design Edinburgh, web design Leith, web design Scotland, audio production Edinburgh, photography Edinburgh, film photography Scotland, podcast editing Edinburgh, affordable websites Scotland',
  },
  '/web-design': {
    title: 'Web design in Leith, Scotland | custom websites from £15/hr',
    description:
      'Custom website design in Leith and across Scotland. No cookies, no ads, no templates. Personal sites for artists and small businesses. From £15 per hour.',
    keywords:
      'web design Leith, web design Edinburgh, web designer Scotland, affordable websites Edinburgh, custom websites Scotland, Shopify developer Edinburgh',
  },
  '/audio': {
    title: 'Audio production in Leith, Scotland | recording, mixing & podcasts',
    description:
      'Audio production in Leith, Edinburgh: recording, mixing, mastering, and podcast editing. Warm, human-sounding production for musicians and creators across Scotland.',
    keywords:
      'audio production Edinburgh, recording studio Leith, mixing and mastering Scotland, podcast editing Edinburgh, music producer Leith',
  },
  '/photo': {
    title: 'Photography in Leith, Scotland | film & digital portraits, bands & events',
    description:
      'Film and digital photography in Leith, Edinburgh, and across Scotland. Band photos, portraits, events, and weddings at budget-friendly rates.',
    keywords:
      'photographer Leith, photographer Edinburgh, film photography Scotland, band photography Edinburgh, wedding photographer Leith, portrait photographer Scotland',
  },
}

export const businessJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LocalBusiness', 'ProfessionalService'],
      '@id': `${SITE_URL}/#business`,
      name: SITE_NAME,
      alternateName: 'Clay Leslie',
      description:
        'Audio production, website development, and photography based in Leith, Scotland. A one-stop shop for musicians, artists, and creatives.',
      url: `${SITE_URL}/`,
      email: 'hello@analoguegonedigital.co.uk',
      image: SITE_IMAGE,
      logo: SITE_IMAGE,
      priceRange: '£',
      currenciesAccepted: 'GBP',
      founder: {
        '@type': 'Person',
        name: 'Clay Leslie',
        jobTitle: 'Web designer, audio producer, and photographer',
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Leith',
        addressRegion: 'Scotland',
        addressCountry: 'GB',
      },
      areaServed: [
        { '@type': 'City', name: 'Leith' },
        { '@type': 'City', name: 'Edinburgh' },
        { '@type': 'AdministrativeArea', name: 'Scotland' },
        { '@type': 'Country', name: 'United Kingdom' },
      ],
      knowsAbout: [
        'web design',
        'website development',
        'audio production',
        'podcast editing',
        'photography',
        'film photography',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Web design',
              url: `${SITE_URL}/web-design`,
              areaServed: 'Scotland',
            },
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              price: '15',
              priceCurrency: 'GBP',
              unitText: 'HOUR',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Audio production',
              url: `${SITE_URL}/audio`,
              areaServed: 'Scotland',
            },
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              price: '20',
              priceCurrency: 'GBP',
              unitText: 'HOUR',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Photography',
              url: `${SITE_URL}/photo`,
              areaServed: 'Scotland',
            },
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              price: '25',
              priceCurrency: 'GBP',
              unitText: 'HOUR',
            },
          },
        ],
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      inLanguage: 'en-GB',
      publisher: { '@id': `${SITE_URL}/#business` },
    },
  ],
}

export function pageJsonLd(pathname) {
  const page = pages[pathname] || pages['/']
  const url = pathname === '/' ? `${SITE_URL}/` : `${SITE_URL}${pathname}`
  const crumbs = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${SITE_URL}/`,
    },
  ]

  if (pathname !== '/') {
    crumbs.push({
      '@type': 'ListItem',
      position: 2,
      name: page.title.split('|')[0].trim(),
      item: url,
    })
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: page.title,
    description: page.description,
    inLanguage: 'en-GB',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#business` },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: crumbs,
    },
  }
}
