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
  '/how-i-work': {
    title: 'How I work | analogue gone digital, Leith',
    description:
      'How Clay Leslie approaches web design, audio production, and photography projects in Leith, Edinburgh, and across Scotland.',
    keywords:
      'how analogue gone digital works, web design process Edinburgh, audio production process Leith, photography process Scotland',
  },
  '/contact': {
    title: 'Contact | web design, audio & photography in Leith, Scotland',
    description:
      'Get in touch about web design, audio production, or photography in Leith, Edinburgh, and across Scotland. Fill in the enquiry form or email hello@analoguegonedigital.co.uk.',
    keywords:
      'contact web designer Edinburgh, hire audio producer Leith, book photographer Edinburgh, web design enquiry Scotland',
  },
  '/about': {
    title: 'About Clay Leslie | analogue gone digital, Leith',
    description:
      'Clay Leslie is a website developer, audio producer, and photographer based in Leith, Edinburgh, working with musicians, artists, and creatives across Scotland.',
    keywords:
      'Clay Leslie, web developer Leith, audio producer Edinburgh, photographer Scotland, about analogue gone digital',
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
              url: `${SITE_URL}/how-i-work`,
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
              url: `${SITE_URL}/how-i-work`,
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
              url: `${SITE_URL}/how-i-work`,
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
