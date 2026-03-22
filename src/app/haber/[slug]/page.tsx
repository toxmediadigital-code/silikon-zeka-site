import { supabase } from '@/lib/supabase'
import type { Haber } from '@/lib/supabase'
import Header from '@/components/Header'
import HaberKarti from '@/components/HaberKarti'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const revalidate = 3600

async function getHaber(slug: string): Promise<Haber | null> {
  const { data } = await supabase
    .from('haberler')
    .select('*')
    .eq('slug', slug)
    .single()
  return data
}

async function getIlgiliHaberler(haber: Haber): Promise<Haber[]> {
  const { data } = await supabase
    .from('haberler')
    .select('*')
    .eq('kategori', haber.kategori)
    .neq('id', haber.id)
    .order('tarih', { ascending: false })
    .limit(4)
  return data || []
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const haber = await getHaber(slug)
  if (!haber) return { title: 'Haber bulunamadı — Silikon Zeka' }

  return {
    title: `${haber.baslik} — Silikon Zeka`,
    description: haber.ozet,
    openGraph: {
      title: haber.baslik,
      description: haber.ozet,
      type: 'article',
      publishedTime: haber.tarih,
      siteName: 'Silikon Zeka',
      locale: 'tr_TR',
    },
    twitter: {
      card: 'summary_large_image',
      title: haber.baslik,
      description: haber.ozet,
      site: '@silikonzeka',
    },
    alternates: {
      canonical: `https://silikonzeka.com/haber/${haber.slug}`,
    },
  }
}

const katMap: Record<string, { lbl: string; renk: string }> = {
  model:    { lbl: 'MODEL',      renk: '#6c63ff' },
  research: { lbl: 'ARAŞTIRMA',  renk: '#00e5ff' },
  industry: { lbl: 'SEKTÖR',     renk: '#f0c040' },
  policy:   { lbl: 'POLİTİKA',   renk: '#a78bfa' },
  tool:     { lbl: 'ARAÇ',       renk: '#34d399' },
  safety:   { lbl: 'GÜVENLİK',  renk: '#ff4d6d' },
  general:  { lbl: 'GENEL',      renk: '#71767b' },
}

const bolgeMap: Record<string, string> = {
  US:'🇺🇸', EU:'🇪🇺', CN:'🇨🇳', JP:'🇯🇵',
  KR:'🇰🇷', IN:'🇮🇳', UK:'🇬🇧', ME:'🌙', GLOBAL:'🌐'
}

function formatTarih(tarih: string) {
  return new Date(tarih).toLocaleDateString('tr-TR', {
    day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

export default async function HaberDetay({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const haber = await getHaber(slug)
  if (!haber) notFound()

  const ilgili = await getIlgiliHaberler(haber)
  const kat = katMap[haber.kategori] || katMap.general
  const bayrak = bolgeMap[haber.bolge] || '🌐'

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'NewsArticle',
            headline: haber.baslik,
            description: haber.ozet,
            datePublished: haber.tarih,
            dateModified: haber.tarih,
            publisher: {
              '@type': 'Organization',
              name: 'Silikon Zeka',
              url: 'https://silikonzeka.com',
            },
            url: `https://silikonzeka.com/haber/${haber.slug}`,
            inLanguage: 'tr',
          }),
        }}
      />

      <div style={{ maxWidth: 600, margin: '0 auto' }}>

        <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--border)' }}>
          <a href="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            fontSize: '0.82rem', color: 'var(--muted)',
          }}>
            ← Ana Sayfa
          </a>
        </div>

        <article style={{ padding: '1.5rem 1rem' }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span style={{
              fontSize: '0.6rem', fontFamily: 'Space Mono', fontWeight: 700,
              letterSpacing: '0.1em', padding: '0.15rem 0.5rem', borderRadius: 4,
              background: kat.renk + '1a', color: kat.renk, border: `1px solid ${kat.renk}33`,
            }}>{kat.lbl}</span>
            <span style={{ fontSize: '0.75rem' }}>{bayrak}</span>
            {haber.sirket && (
              <span style={{ fontSize: '0.65rem', color: 'var(--muted)', fontFamily: 'Space Mono' }}>
                🏢 {haber.sirket}
              </span>
            )}
          </div>

          <h1 style={{
            fontSize: '1.5rem', fontWeight: 800,
            lineHeight: 1.3, marginBottom: '0.75rem',
            letterSpacing: '-0.02em',
          }}>{haber.baslik}</h1>

          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            marginBottom: '1.25rem',
            fontSize: '0.72rem', color: 'var(--muted)', fontFamily: 'Space Mono',
          }}>
            <span>🕐 {formatTarih(haber.tarih)}</span>
            {haber.kaynak && <span>📰 {haber.kaynak}</span>}
          </div>

          <div style={{
            background: 'var(--surface2)',
            border: '1px solid var(--border)',
            borderLeft: `3px solid ${kat.renk}`,
            borderRadius: '0 8px 8px 0',
            padding: '1rem',
            marginBottom: '1.25rem',
            fontSize: '0.9rem', lineHeight: 1.65,
            color: 'var(--text)',
          }}>
            {haber.ozet}
          </div>

          {haber.icerik && (
            <div style={{
              fontSize: '0.88rem', lineHeight: 1.75,
              color: 'var(--text)', marginBottom: '1.5rem',
            }}>
              {haber.icerik.split('\n').map((p, i) => (
                p.trim() ? <p key={i} style={{ marginBottom: '0.75rem' }}>{p}</p> : null
              ))}
            </div>
          )}

          {haber.url && (
            
              href={haber.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.6rem 1.1rem', borderRadius: 8,
                border: '1px solid var(--border)',
                fontSize: '0.78rem', fontWeight: 600,
                color: 'var(--accent2)',
              }}
            >
              🔗 Orijinal Kaynağa Git →
            </a>
          )}

          <div style={{
            marginTop: '2rem', padding: '1rem',
            background: 'linear-gradient(135deg, rgba(108,99,255,0.08), rgba(0,229,255,0.05))',
            border: '1px solid rgba(108,99,255,0.2)',
            borderRadius: 12, textAlign: 'center',
          }}>
            <div style={{ fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.4rem' }}>
              <span style={{ color: 'var(--accent)' }}>Silikon</span> Zeka&apos;yı takip et
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
              Yapay zeka haberleri karmaşık. Biz sadeleştiriyoruz.<br />
              Tüm dünyadan en önemli AI gelişmeleri — Türkçe, anlaşılır, güncel.
            </p>
            
              href="https://instagram.com/silikonzeka"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                padding: '0.5rem 1.25rem', borderRadius: 20,
                background: 'linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)',
                color: '#fff', fontSize: '0.78rem', fontWeight: 700,
              }}
            >
              📱 Instagram&apos;da Takip Et — @silikonzeka
            </a>
          </div>
        </article>

        {ilgili.length > 0 && (
          <>
            <div style={{
              padding: '0.75rem 1rem',
              borderTop: '1px solid var(--border)',
              borderBottom: '1px solid var(--border)',
              fontSize: '0.7rem', fontFamily: 'Space Mono',
              color: 'var(--muted)', letterSpacing: '0.1em',
            }}>
              // İLGİLİ HABERLER
            </div>
            {ilgili.map(h => <HaberKarti key={h.id} haber={h} />)}
          </>
        )}

        <div style={{
          padding: '2rem 1rem',
          borderTop: '1px solid var(--border)',
          textAlign: 'center',
        }}>
          <div style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '0.3rem' }}>
            <span style={{ color: 'var(--accent)' }}>Silikon</span> Zeka
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--muted)', fontFamily: 'Space Mono', lineHeight: 1.8 }}>
            Türkiye&apos;nin Yapay Zeka Haber Merkezi<br />
            TOX Media yapımı
          </div>
        </div>
      </div>
    </div>
  )
}
