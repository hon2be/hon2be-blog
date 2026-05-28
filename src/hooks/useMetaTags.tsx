/**
 * src/hooks/useMetaTags.ts
 *
 * Hook to dynamically update meta tags for each page/post.
 * Usage:
 *   useMetaTags({
 *     title: 'Post Title',
 *     description: 'Post excerpt...',
 *     url: 'https://...',
 *     type: 'article'
 *   })
 */

import { useEffect } from 'react'

interface MetaTagsConfig {
  title: string
  description: string
  url: string
  type?: 'website' | 'article' | 'blog'
  image?: string
  author?: string
  publishedDate?: string
  category?: string
}

export function useMetaTags(config: MetaTagsConfig) {
  useEffect(() => {
    // Update document title
    document.title = config.title

    // Update or create meta tags
    updateOrCreateMeta('name', 'description', config.description)
    updateOrCreateMeta('property', 'og:title', config.title)
    updateOrCreateMeta('property', 'og:description', config.description)
    updateOrCreateMeta('property', 'og:url', config.url)
    updateOrCreateMeta('property', 'og:type', config.type || 'website')

    if (config.image) {
      updateOrCreateMeta('property', 'og:image', config.image)
    }

    // Twitter Card
    updateOrCreateMeta('name', 'twitter:title', config.title)
    updateOrCreateMeta('name', 'twitter:description', config.description)
    if (config.image) {
      updateOrCreateMeta('name', 'twitter:image', config.image)
    }

    // Canonical URL
    updateOrCreateCanonical(config.url)

    // Article-specific metadata
    if (config.type === 'article' && config.publishedDate) {
      updateOrCreateMeta('property', 'article:published_time', config.publishedDate)
    }

    if (config.type === 'article' && config.category) {
      updateOrCreateMeta('property', 'article:section', config.category)
    }

    if (config.author) {
      updateOrCreateMeta('property', 'article:author', config.author)
    }
  }, [config])
}

function updateOrCreateMeta(attrType: 'name' | 'property', attrName: string, content: string) {
  let element = document.querySelector<HTMLMetaElement>(
    `meta[${attrType}="${attrName}"]`
  )

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attrType, attrName)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

function updateOrCreateCanonical(href: string) {
  let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')

  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }

  link.setAttribute('href', href)
}
