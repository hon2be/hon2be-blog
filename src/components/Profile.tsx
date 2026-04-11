import { useState } from 'react'
import { PixelButton } from './PixelButton'

export function Profile() {
  const [followed, setFollowed] = useState(false)

  const skills = ['React', 'TypeScript', 'CSS', 'Design', 'Pixel Art']

  return (
    <article
      style={{
        backgroundColor: 'var(--surface)',
        border: '1.5px solid var(--border)',
        padding: '32px',
        boxShadow: '3px 3px 0 var(--border)',
        marginBottom: '32px',
        transition: 'box-shadow 0.15s, transform 0.15s',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget
        el.style.boxShadow = '4px 4px 0 var(--border-d)'
        el.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget
        el.style.boxShadow = '3px 3px 0 var(--border)'
        el.style.transform = 'translateY(0)'
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
        flexWrap: 'wrap',
        gap: 16,
      }}>
        {/* 아바타 + 정보 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* 아바타 */}
          <div style={{
            width: 64,
            height: 64,
            backgroundColor: 'var(--accent-xl)',
            border: '1.5px solid var(--border-d)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 32,
            boxShadow: '2px 2px 0 var(--border)',
            flexShrink: 0,
          }}>
            👩‍💻
          </div>
          <div>
            <h2 style={{
              fontSize: 18,
              fontWeight: 'bold',
              letterSpacing: '2px',
              marginBottom: 4,
            }}>
              CHERRY.DEV
            </h2>
            <p style={{
              fontSize: 11,
              color: 'var(--accent)',
              letterSpacing: '2px',
              fontWeight: 'bold',
            }}>
              DEVELOPER
            </p>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <PixelButton
            variant="primary"
            onClick={() => setFollowed(f => !f)}
            icon={followed ? 'check' : undefined}
          >
            {followed ? 'FOLLOWING' : 'FOLLOW'}
          </PixelButton>
          <PixelButton icon="question" variant="icon" title="소개" />
        </div>
      </div>

      {/* 소개 */}
      <p style={{
        fontSize: 12,
        lineHeight: 1.7,
        color: 'var(--text)',
        marginBottom: 16,
        maxWidth: 520,
      }}>
        픽셀 아트와 벚꽃을 좋아하는 프론트엔드 개발자입니다. React, TypeScript, CSS를 주로 쓰고, 디자인 시스템과 UI 엔지니어링에 관심이 많습니다.
      </p>

      {/* 스킬 태그 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {skills.map(skill => (
          <span
            key={skill}
            style={{
              backgroundColor: 'var(--accent-xl)',
              border: '1px solid var(--accent-l)',
              color: 'var(--accent-d)',
              fontSize: '10px',
              letterSpacing: '1px',
              fontWeight: 'bold',
              padding: '3px 8px',
              textTransform: 'uppercase',
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </article>
  )
}
