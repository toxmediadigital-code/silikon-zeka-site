'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{
        maxWidth: 600, margin: '0 auto',
        padding: '0 1rem',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', height: 56,
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'linear-gradient(135deg, #6c63ff, #00e5ff)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 900, fontSize: '0.8rem', color: '#fff',
          }}>SZ</div>
          <span style={{ fontWeight: 800, fontSize: '1.05rem', letterSpacing: '-0.02em' }}>
            <span style={{ color: 'var(--accent)' }}>Silikon</span> Zeka
          </span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.35rem',
            padding: '0.25rem 0.65rem', borderRadius: 20,
            background: 'rgba(255,77,109,0.1)', border: '1px solid rgba(255,77,109,0.25)',
          }}>
            <div style={{
              width: 5, height: 5, borderRadius: '50%',
              background: '#ff4d6d', animation: 'blink 1s step-end infinite',
            }} />
            <span style={{ fontFamily: 'Space Mono', fontSize: '0.55rem', color: '#ff4d6d', letterSpacing: '0.1em' }}>
              CANLI
            </span>
          </div>
          <a
            href="https://instagram.com/silikonzeka"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '0.3rem 0.8rem', borderRadius: 20,
              background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)',
              color: '#fff', fontSize: '0.72rem', fontWeight: 700,
            }}
          >
            Instagram
          </a>
        </div>
      </div>
      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:.15}}`}</style>
    </header>
  )
}
