# Silikon Zeka — Web Sitesi

X.com tarzı AI haber sitesi. Next.js + Supabase + Vercel.

## Kurulum

```bash
npm install
npm run dev
```

## Vercel'e Deploy

1. GitHub'a push et:
```bash
git init
git add .
git commit -m "ilk commit"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADIN/silikon-zeka-site.git
git push -u origin main
```

2. vercel.com → "New Project" → GitHub reposunu seç

3. Environment Variables ekle:
   - `NEXT_PUBLIC_SUPABASE_URL` = https://ghbesfcpcdvhsarxsphb.supabase.co
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = sb_publishable_IYpvpWuA732vGFz0Qn7_BA_UYsoCnfp

4. Deploy!

## Domain Bağlama (silikonzeka.com)

Vercel → Settings → Domains → silikonzeka.com ekle
Domain sağlayıcında DNS: CNAME → cname.vercel-dns.com

## Özellikler

- ✅ X.com tarzı feed
- ✅ Her haberin kendi URL'si (/haber/[slug])
- ✅ SEO: meta tags, Open Graph, Twitter Card
- ✅ Google için JSON-LD structured data
- ✅ Otomatik sitemap.xml
- ✅ Kategori filtreleri
- ✅ İlgili haberler
- ✅ 5 dakikada bir otomatik yenileme (ISR)
