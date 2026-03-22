import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Haber = {
  id: string
  baslik: string
  ozet: string
  icerik: string | null
  kaynak: string
  url: string
  kategori: string
  bolge: string
  sirket: string
  onem: number
  slug: string
  tarih: string
  created_at: string
}
