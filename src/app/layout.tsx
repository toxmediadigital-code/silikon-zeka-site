import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Silikon Zeka — Türkiye\'nin AI Haber Merkezi',
  description: 'Tüm dünyadan yapay zeka gelişmeleri. Türkçe, anlık, anlaşılır.',
  keywords: 'yapay zeka, AI haberleri, yapay zeka Türkiye, AI gelişmeleri, makine öğrenmesi',
  openGraph: {
    siteName: 'Silikon Zeka',
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@silikonzeka',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  )
}
