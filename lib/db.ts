import { createClient } from '@/lib/supabase/server'

export interface Entry {
  id: string
  user_id: string
  type: 'income' | 'expense'
  category: string
  amount: number
  description: string | null
  date: string
  created_at: string
  updated_at: string
}

export async function getEntries(filters?: {
  type?: 'income' | 'expense'
  startDate?: string
  endDate?: string
}) {
  const supabase = await createClient()

  let query = supabase.from('entries').select('*').order('date', { ascending: false })

  if (filters?.type) {
    query = query.eq('type', filters.type)
  }

  if (filters?.startDate) {
    query = query.gte('date', filters.startDate)
  }

  if (filters?.endDate) {
    query = query.lte('date', filters.endDate)
  }

  const { data, error } = await query

  if (error) throw error
  return data as Entry[]
}

export async function addEntry(entry: Omit<Entry, 'id' | 'user_id' | 'created_at' | 'updated_at'>) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) throw new Error('User not authenticated')

  const { data, error } = await supabase
    .from('entries')
    .insert([
      {
        ...entry,
        user_id: user.id,
      },
    ])
    .select()

  if (error) throw error
  return data?.[0] as Entry
}

export async function updateEntry(id: string, updates: Partial<Omit<Entry, 'id' | 'user_id' | 'created_at' | 'updated_at'>>) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('entries')
    .update(updates)
    .eq('id', id)
    .select()

  if (error) throw error
  return data?.[0] as Entry
}

export async function deleteEntry(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from('entries').delete().eq('id', id)

  if (error) throw error
}

export async function getStats() {
  const supabase = await createClient()

  const { data: entries, error } = await supabase
    .from('entries')
    .select('type, amount')
    .order('date', { ascending: false })

  if (error) throw error

  const typedEntries = entries as { type: string; amount: number }[]
  const totalIncome = typedEntries
    .filter((e) => e.type === 'income')
    .reduce((sum, e) => sum + e.amount, 0)

  const totalExpense = typedEntries
    .filter((e) => e.type === 'expense')
    .reduce((sum, e) => sum + e.amount, 0)

  return {
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense,
  }
}

export async function getCategoryBreakdown() {
  const supabase = await createClient()

  const { data: entries, error } = await supabase
    .from('entries')
    .select('type, category, amount')

  if (error) throw error

  const typedEntries = entries as { type: string; category: string; amount: number }[]
  const breakdown: Record<string, { income: number; expense: number }> = {}

  typedEntries.forEach((entry) => {
    if (!breakdown[entry.category]) {
      breakdown[entry.category] = { income: 0, expense: 0 }
    }
    breakdown[entry.category][entry.type as 'income' | 'expense'] += entry.amount
  })

  return breakdown
}
