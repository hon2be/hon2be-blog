/**
 * src/pages/PostDetail.tsx (Updated with SEO)
 *
 * Shows individual blog post with:
 * - Dynamic meta tags (Open Graph, Twitter Card)
 * - Canonical URL
 * - JSON-LD structured data
 */

import React, { useEffect, useRef } from 'react'
import hljs from 'highlight.js'
import 'highlight.js/styles/rose-pine-moon.min.css'
import { posts } from '../data/posts'
import { PixelButton } from '../components/PixelButton'
import { StructuredData, createBlogPostingSchema } from '../components/StructuredData'
import { useMetaTags } from '../hooks/useMetaTags'

interface PostDetailProps {
  slug: string
  onBack: () => void
}

const CATEGORY_COLORS: Record<string, string> = {
  REACT:      '#61dafb',
  TYPESCRIPT: '#3178c6',
  CSS:        '#f07098',
  DESIGN:     '#c04870',
  PIXEL:      '#7a1038',
}

export function PostDetail({ slug, onBack }: PostDetailProps) {
  const post = posts.find(p => p.slug === slug)
  const contentRef = useRef<HTMLDivElement>(null)

  // Syntax highlighting
  useEffect(() => {
    contentRef.current?.querySelectorAll('pre code').forEach(el => {
      hljs.highlightElement(el as HTMLElement)
    })
  }, [slug])

  // Update meta tags for this post
  useMetaTags(
    post ? {
      title: `${post.title} - 🌸 DEV.LOG`,
      description: post.excerpt,
      url: `https://hon2be.github.io/hon2be-blog/#/post/${post.slug}`,
      type: 'article',
      image: 'https://hon2be.github.io/hon2be-blog/og-image.png',
      author: 'hon2be',
      publishedDate: post.date.replace(/\./g, '-'),
      category: post.category,
    } : {
      title: '포스트를 찾을 수 없습니다 - 🌸 DEV.LOG',
      description: '요청한 포스트를 찾을 수 없습니다.',
      url: 'https://hon2be.github.io/hon2be-blog/',
    }
  )

  if (!post) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
      }}>
        <p style={{ fontSize: 14, color: 'var(--faint)', letterSpacing: '2px' }}>
          포스트를 찾을 수 없습니다.
        </p>
        <PixelButton onClick={onBack} icon="back">GO BACK</PixelButton>
      </div>
    )
  }

  const badgeColor = CATEGORY_COLORS[post.category] ?? 'var(--accent)'
  const structuredData = createBlogPostingSchema(post)

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      {/* JSON-LD Structured Data */}
      <StructuredData type="BlogPosting" data={structuredData} />

      {/* 포스트 헤더 */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(4px)',
        borderBottom: '1.5px solid var(--accent-l)',
        padding: '6px 24px',
      }}>
        <div style={{
          maxWidth: 920,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <PixelButton icon="back" variant="icon" title="뒤로" onClick={onBack} />
          <span style={{
            fontSize: 14,
            color: 'var(--accent)',
            letterSpacing: '3px',
            fontWeight: 'bold',
          }}>
            🌸 DEV.LOG
          </span>
        </div>
      </header>

      <main style={{
        maxWidth: 720,
        margin: '0 auto',
        padding: '48px 24px',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* 카테고리 배지 */}
        <div style={{ marginBottom: 16 }}>
          <span style={{
            display: 'inline-block',
            backgroundColor: badgeColor,
            color: 'white',
            fontSize: '10px',
            fontWeight: 'bold',
            letterSpacing: '1px',
            padding: '4px 10px',
            textTransform: 'uppercase',
            boxShadow: '2px 2px 0 rgba(0,0,0,0.2)',
          }}>
            {post.category}
          </span>
        </div>

        {/* 제목 */}
        <h1 style={{
          fontSize: 22,
          fontWeight: 'bold',
          lineHeight: 1.4,
          color: 'var(--text)',
          letterSpacing: '1px',
          marginBottom: 12,
        }}>
          {post.title}
        </h1>

        {/* 날짜 */}
        <time dateTime={post.date.replace(/\./g, '-')} style={{
          display: 'block',
          fontSize: 10,
          color: 'var(--faint)',
          letterSpacing: '2px',
          marginBottom: 32,
        }}>
          {post.date}
        </time>

        {/* 구분선 */}
        <div style={{
          height: 2,
          background: 'linear-gradient(90deg, var(--accent), var(--accent-l), transparent)',
          marginBottom: 40,
        }} />

        {/* 본문 */}
        <article
          ref={contentRef}
          data-post
          dangerouslySetInnerHTML={{ __html: post.content }}
          style={{
            fontSize: 13,
            lineHeight: 1.9,
            color: 'var(--text)',
          }}
        />

        {/* 하단 구분선 */}
        <div style={{
          height: 2,
          background: 'linear-gradient(90deg, transparent, var(--accent-l), var(--accent), transparent)',
          margin: '48px 0 32px',
        }} />

        {/* 하단 네비 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <PixelButton icon="back" onClick={onBack}>
            ALL POSTS
          </PixelButton>
          <span style={{
            fontSize: 10,
            color: 'var(--faint)',
            letterSpacing: '2px',
          }}>
            🌸 CHERRY.DEV
          </span>
        </div>
      </main>

      {/* 포스트 본문 스타일 */}
      <style>{`
        [data-post-content] h2,
        .post-content h2 {
          font-size: 16px;
          font-weight: bold;
          color: var(--accent-d);
          letter-spacing: 1px;
          margin: 32px 0 12px;
        }
      `}</style>
    </div>
  )
}
