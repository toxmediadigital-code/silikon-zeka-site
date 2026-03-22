import Link from 'next/link'
import type { Haber } from '@/lib/supabase'

const katMap: Record<string, { cls: string; lbl: string }> = {
  model:    { cls: '#6c63ff', lbl: 'MODEL' },
  research: { cls: '#00e5ff', lbl: 'ARAŞTIRMA' },
  industry: { cls: '#f0c040', lbl: 'SEKTÖR' },
  policy:   { cls: '#a78bfa', lbl: 'POLİTİKA' },
  tool:     { cls: '#34d399', lbl: 'ARAÇ' },
  safety:   { cls: '#ff4d6d', lbl: 'GÜVENLİK' },
  general:  { cls: '#71767b', lbl: 'GENEL' },
}

const bolgeMap: Record<string, string> = {
  US:'🇺🇸', EU:'🇪🇺', CN:'🇨🇳', JP:'🇯🇵',
  KR:'🇰🇷', IN:'🇮🇳', UK:'🇬🇧', ME:'🌙', GLOBAL:'🌐'
}

function zaman(tarih: string) {
  const diff = Date.now() - new Date(tarih).getTime()
  const dk = Math.floor(diff / 60000)
  if (dk < 60)   return `${dk}dk`
  if (dk < 1440) return `${Math.floor(dk/60)}s`
  return `${Math.floor(dk/1440)}g`
}

export default function HaberKarti({ haber, featured }: { haber: Haber; featured?: boolean }) {
  const kat = katMap[haber.kategori] || katMap.general
  const bayrak = bolgeMap[haber.bolge] || '🌐'

  return (
    <Link href={`/haber/${haber.slug}`}>
      <article style={{
        padding: '1rem 1rem',
        borderBottom: '1px solid var(--border)',
        cursor: 'pointer',
        transition: 'background 0.15s',
        background: featured ? 'rgba(108,99,255,0.04)' : 'transparent',
      }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
        onMouseLeave={e => (e.currentTarget.style.background = featured ? 'rgba(108,99,255,0.04)' : 'transparent')}
      >
        {/* Üst satır: kategori + bölge + zaman */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.45rem', flexWrap: 'wrap' }}>
          <span style={{
            fontSize: '0.6rem', fontFamily: 'Space Mono', fontWeight: 700,
            letterSpacing: '0.1em', padding: '0.15rem 0.45rem', borderRadius: 4,
            background: kat.cls + '1a', color: kat.cls, border: `1px solid ${kat.cls}33`,
          }}>{kat.lbl}</span>

          <span style={{ fontSize: '0.7rem' }}>{bayrak}</span>

          {haber.sirket && (
            <span style={{ fontSize: '0.62rem', color: 'var(--muted)', fontFamily: 'Space Mono' }}>
              {haber.sirket}
            </span>
          )}

          <span style={{ marginLeft: 'auto', fontSize: '0.68rem', color: 'var(--muted)', fontFamily: 'Space Mono' }}>
            {zaman(haber.tarih)}
          </span>
        </div>

        {/* Başlık */}
        <h2 style={{
          fontSize: featured ? '1.05rem' : '0.95rem',
          fontWeight: 700, lineHeight: 1.38,
          marginBottom: '0.45rem',
          color: 'var(--text)',
        }}>{haber.baslik}</h2>

        {/* Özet */}
        <p style={{
          fontSize: '0.82rem', color: 'var(--muted)',
          lineHeight: 1.6, marginBottom: '0.6rem',
          display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>{haber.ozet}</p>

        {/* Alt satır: kaynak + önem */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.65rem', color: 'var(--muted)', fontFamily: 'Space Mono' }}>
            {haber.kaynak}
          </span>
          <div style={{ display: 'flex', gap: 3 }}>
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} style={{
                width: 12, height: 3, borderRadius: 2,
                background: i < haber.onem
                  ? haber.onem >= 4 ? '#6c63ff' : haber.onem >= 3 ? '#00e5ff' : '#71767b'
                  : 'var(--border)',
              }} />
            ))}
          </div>
        </div>
      </article>
    </Link>
  )
}
