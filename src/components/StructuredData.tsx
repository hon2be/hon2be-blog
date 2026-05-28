/**
 * src/components/StructuredData.tsx
 *
 * Injects JSON-LD structured data into document head.
 * Supports BlogPosting and Organization schemas.
 *
 * Usage:
 *   <StructuredData
 *     type="BlogPosting"
 *     data={{
 *       headline: "Post Title",
 *       description: "Post excerpt",
 *       datePublished: "2024-01-15",
 *       ...
 *     }}
 *   />
 */

import React, { useEffect } from 'react'

interface StructuredDataProps {
  type: 'BlogPosting' | 'Organization' | 'WebSite' | 'BreadcrumbList'
  data: Record<string, any>
}

export function StructuredData({ type, data }: StructuredDataProps) {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': type,
      ...data,
    }

    script.textContent = JSON.stringify(jsonLd)
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [type, JSON.stringify(data)])

  return null
}

/**
 * Helper: Create BlogPosting schema
 */
export function createBlogPostingSchema(post: {
  title: string
  excerpt: string
  date: string
  slug: string
  category?: string
}) {
  const dateISO = convertKoreanDateToISO(post.date)

  return {
    headline: post.title,
    description: post.excerpt,
    datePublished: dateISO,
    author: {
      '@type': 'Person',
      name: 'hon2be',
      url: 'https://hon2be.github.io/hon2be-blog/',
    },
    publisher: {
      '@type': 'Organization',
      name: 'DEV.LOG',
      logo: {
        '@type': 'ImageObject',
        url: 'https://hon2be.github.io/hon2be-blog/og-image.png',
        width: 1200,
        height: 630,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://hon2be.github.io/hon2be-blog/#/post/${post.slug}`,
    },
    ...(post.category && {
      articleSection: post.category,
    }),
  }
}

/**
 * Convert Korean date format "YYYY.MM.DD" to ISO "YYYY-MM-DD"
 */
function convertKoreanDateToISO(dateStr: string): string {
  return dateStr.replace(/\./g, '-')
}
