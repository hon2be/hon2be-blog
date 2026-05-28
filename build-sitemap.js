/**
 * build-sitemap.js
 *
 * Generates sitemap.xml from posts data after build.
 * Run: node build-sitemap.js
 *
 * Place in project root. Add to package.json:
 *   "build": "tsc -b && vite build && node build-sitemap.js"
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Read posts from src/data/posts/
const postsDir = join(__dirname, 'src/data/posts')
let postSlugs = []

try {
  const files = readdirSync(postsDir).filter(f => f.endsWith('.json'))
  console.log(`📁 Found ${files.length} post files`)

  postSlugs = files.map(file => {
    try {
      const content = JSON.parse(readFileSync(join(postsDir, file), 'utf-8'))
      return content.slug || file.replace('.json', '')
    } catch (e) {
      console.warn(`⚠️  Failed to parse ${file}:`, e.message)
      return null
    }
  }).filter(Boolean)

  console.log(`✅ Extracted ${postSlugs.length} post slugs:`, postSlugs)
} catch (e) {
  console.error('❌ Could not read posts directory:', e.message)
  console.log('📍 Tried path:', postsDir)
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
  writeFileSync(join(__dirname, 'dist/sitemap.xml'), sitemap)
  console.log(`\n✅ sitemap.xml generated successfully!`)
  console.log(`   📊 Total URLs: ${postSlugs.length} posts + 1 homepage`)
  console.log(`   📍 Location: dist/sitemap.xml`)
} catch (e) {
  console.error('❌ Failed to write sitemap.xml:', e.message)
  process.exit(1)
}
