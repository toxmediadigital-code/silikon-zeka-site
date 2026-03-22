import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{
      background: 'var(--bg)', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', gap: '1rem', textAlign: 'center', padding: '2rem',
    }}>
      <div style={{ fontSize: '3rem', opacity: 0.3 }}>🔍</div>
      <h1 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Haber bulunamadı</h1>
      <p style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>
        Bu haber silinmiş ya da hiç var olmamış olabilir.
      </p>
      <Link href="/" style={{
        padding: '0.5rem 1.25rem', borderRadius: 20,
        background: 'var(--accent)', color: '#fff',
        fontSize: '0.82rem', fontWeight: 700,
      }}>
        Ana Sayfaya Dön
      </Link>
    </div>
  )
}
