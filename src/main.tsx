import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import { App } from './App'

// 포스트 본문 인라인 스타일
const postStyles = document.createElement('style')
postStyles.textContent = `
  [data-post] h2 {
    font-size: 16px !important;
    font-weight: bold !important;
    color: var(--accent-d) !important;
    letter-spacing: 1px !important;
    margin: 32px 0 12px !important;
    padding-bottom: 4px !important;
    border-bottom: 1.5px solid var(--border) !important;
  }
  [data-post] h3 {
    font-size: 14px !important;
    font-weight: bold !important;
    color: var(--accent) !important;
    letter-spacing: 1px !important;
    margin: 24px 0 8px !important;
  }
  [data-post] p {
    margin-bottom: 16px !important;
  }
  [data-post] ul, [data-post] ol {
    margin: 0 0 16px 20px !important;
  }
  [data-post] li {
    margin-bottom: 6px !important;
  }
  [data-post] pre {
    background: var(--accent-bg) !important;
    border: 1.5px solid var(--border) !important;
    border-left: 3px solid var(--accent) !important;
    padding: 16px !important;
    overflow-x: auto !important;
    margin-bottom: 16px !important;
    font-size: 12px !important;
    line-height: 1.6 !important;
  }
  [data-post] code {
    font-family: 'Mona', 'Courier New', monospace !important;
    font-size: 12px !important;
  }
  [data-post] p code, [data-post] li code {
    background: var(--accent-xl) !important;
    color: var(--accent-d) !important;
    padding: 1px 5px !important;
    font-size: 11px !important;
  }
  [data-post] strong {
    color: var(--accent-d) !important;
    font-weight: bold !important;
  }
`
document.head.appendChild(postStyles)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
