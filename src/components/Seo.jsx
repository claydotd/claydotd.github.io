import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { pages, pageJsonLd, businessJsonLd, SITE_NAME, SITE_IMAGE, SITE_URL } from '../seo'

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function upsertJsonLd(id, data) {
  let el = document.getElementById(id)
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = id
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

export default function Seo() {
  const { pathname } = useLocation()
  const path = pathname.replace(/\/$/, '') || '/'
  const page = pages[path] || pages['/']
  const url = path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`

  useLayoutEffect(() => {
    document.title = page.title
    upsertMeta('name', 'description', page.description)
    upsertMeta('name', 'keywords', page.keywords)
    upsertLink('canonical', url)
    upsertMeta('property', 'og:title', page.title)
    upsertMeta('property', 'og:description', page.description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:site_name', SITE_NAME)
    upsertMeta('property', 'og:image', SITE_IMAGE)
    upsertMeta('property', 'og:locale', 'en_GB')
    upsertMeta('name', 'twitter:card', 'summary')
    upsertMeta('name', 'twitter:title', page.title)
    upsertMeta('name', 'twitter:description', page.description)
    upsertMeta('name', 'twitter:image', SITE_IMAGE)
    upsertJsonLd('business-schema', businessJsonLd)
    upsertJsonLd('webpage-schema', pageJsonLd(path))
  }, [path, page, url])

  return null
}
