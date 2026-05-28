/**
 * build-sitemap.js
 *
 * Generates sitemap.xml from posts data after build.
 * Run: node build-sitemap.js
 *
 * Place in project root. Add to package.json:
 *   "build": "tsc -b && vite build && node build-sitemap.js"
 */

import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

// Read posts from src/data/posts/
const postsDir = 'src/data/posts'
let postSlugs = []

try {
  const fs = require('fs')
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.json'))

  postSlugs = files.map(file => {
    const content = JSON.parse(readFileSync(join(postsDir, file), 'utf-8'))
    return content.slug || file.replace('.json', '')
  })
} catch (e) {
  console.warn('Could not read posts directory. Using empty sitemap.')
  postSlugs = []
}

const baseUrl = 'https://hon2be.github.io/hon2be-blog'

// Build sitemap entries
const sitemapEntries = [
  // Homepage - highest priority
  `  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`,

  // Posts - hash-based URLs
  ...postSlugs.map(slug => `  <url>
    <loc>${baseUrl}/#/post/${slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`),
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.join('\n')}
</urlset>`

// Write to dist/
try {
  writeFileSync('dist/sitemap.xml', sitemap)
  console.log(`✅ sitemap.xml generated (${postSlugs.length} posts + homepage)`)
} catch (e) {
  console.error('❌ Failed to write sitemap.xml:', e.message)
  process.exit(1)
}
