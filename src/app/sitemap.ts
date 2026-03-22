import { supabase } from '@/lib/supabase'

export default async function sitemap() {
  const { data: haberler } = await supabase
    .from('haberler')
    .select('slug, tarih')
    .order('tarih', { ascending: false })
    .limit(1000)

  const haberUrls = (haberler || []).map(h => ({
    url: `https://silikonzeka.com/haber/${h.slug}`,
    lastModified: new Date(h.tarih),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: 'https://silikonzeka.com',
      lastModified: new Date(),
      changeFrequency: 'hourly' as const,
      priority: 1,
    },
    ...haberUrls,
  ]
}
