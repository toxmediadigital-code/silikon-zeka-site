import { supabase } from '@/lib/supabase'
import type { Haber } from '@/lib/supabase'
import Header from '@/components/Header'
import HaberKarti from '@/components/HaberKarti'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Silikon Zeka — Türkiye\'nin AI Haber Merkezi',
  description: 'Tüm dünyadan yapay zeka gelişmeleri. Türkçe, anlık, anlaşılır.',
}

export const revalidate = 300

async function getHaberler(): Promise<Haber[]> {
  const { data, error } = await supabase
    .from('haberler')
    .select('*')
    .order('tarih', { ascending: false })
    .limit(50)
  if (error) { console.error(error); return [] }
  return data || []
}

const katLabels: Record<string, string> = {
  all: 'Tümü', model: '🤖 Modeller', research: '🔬 Araştırma',
  industry: '💼 Sektör', policy: '⚖️ Politika',
  tool: '🛠️ Araçlar', safety: '🛡️ Güvenlik',
}

type Props = { searchParams: Promise<{ kat?: string }> }

export default async function AnaSayfa({ searchParams }: Props) {
  const params = await searchParams
  const haberler = await getHaberler()
  const aktifKat = params.kat || 'all'

  const filtrelenmis = aktifKat === 'all'
    ? haberler
    : haberler.filter(h => h.kategori === aktifKat)

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Header />
      <div style={{ maxWidth: 600, margin: '0 auto' }}>

        {/* Kategori filtresi */}
        <div style={{
          display: 'flex', gap: '0.25rem', overflowX: 'auto',
          padding: '0.75rem 1rem', borderBottom: '1px solid var(--border)',
          scrollbarWidth: 'none',
        }}>
          {Object.entries(katLabels).map(([key, lbl]) => (
            <a key={key} href={key === 'all' ? '/' : `/?kat=${key}`} style={{
              padding: '0.3rem 0.85rem', borderRadius: 20, whiteSpace: 'nowrap',
              fontSize: '0.72rem', fontWeight: 600,
              background: aktifKat === key ? 'var(--accent)' : 'transparent',
              color: aktifKat === key ? '#fff' : 'var(--muted)',
              border: `1px solid ${aktifKat === key ? 'var(--accent)' : 'var(--border)'}`,
            }}>{lbl}</a>
          ))}
        </div>

        {/* Feed */}
        {filtrelenmis.length === 0 ? (
          <div style={{ padding: '4rem 1rem', textAlign: 'center', color: 'var(--muted)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem', opacity: 0.3 }}>🧠</div>
            <div style={{ fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text)', opacity: 0.5 }}>
              Henüz haber yok
            </div>
            <div style={{ fontSize: '0.78rem', fontFamily: 'Space Mono' }}>
              Bot çalıştırıldığında haberler burada görünecek.
            </div>
          </div>
        ) : (
          filtrelenmis.map((haber, i) => (
            <HaberKarti key={haber.id} haber={haber} featured={i === 0 && aktifKat === 'all'} />
          ))
        )}

        <div style={{ padding: '2rem 1rem', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
          <div style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '0.3rem' }}>
            <span style={{ color: 'var(--accent)' }}>Silikon</span> Zeka
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--muted)', fontFamily: 'Space Mono', lineHeight: 1.8 }}>
            Türkiye&apos;nin Yapay Zeka Haber Merkezi · TOX Media yapımı
          </div>
        </div>
      </div>
    </div>
  )
}
