'use client'

import { Entry } from '@/lib/db'
import { formatCurrency } from '@/lib/utils'

interface EntryFiltersProps {
  entries: Entry[]
}

export function EntryFilters({ entries }: EntryFiltersProps) {
  // Calculate stats
  const totalIncome = entries
    .filter((e) => e.type === 'income')
    .reduce((sum, e) => sum + e.amount, 0)

  const totalExpense = entries
    .filter((e) => e.type === 'expense')
    .reduce((sum, e) => sum + e.amount, 0)

  const balance = totalIncome - totalExpense

  // Get this month's data
  const now = new Date()
  const currentMonth = now.toISOString().slice(0, 7)
  const thisMonthEntries = entries.filter((e) => e.date.startsWith(currentMonth))

  const thisMonthIncome = thisMonthEntries
    .filter((e) => e.type === 'income')
    .reduce((sum, e) => sum + e.amount, 0)

  const thisMonthExpense = thisMonthEntries
    .filter((e) => e.type === 'expense')
    .reduce((sum, e) => sum + e.amount, 0)

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">Total Income</p>
        <p className="text-2xl font-bold text-green-600">{formatCurrency(totalIncome)}</p>
      </div>

      <div>
        <p className="text-sm text-muted-foreground">Total Expenses</p>
        <p className="text-2xl font-bold text-red-600">{formatCurrency(totalExpense)}</p>
      </div>

      <div className="border-t border-border pt-4">
        <p className="text-sm text-muted-foreground">This Month</p>
        <p className="text-xs text-muted-foreground mt-2">
          Income: <span className="font-semibold text-green-600">{formatCurrency(thisMonthIncome)}</span>
        </p>
        <p className="text-xs text-muted-foreground">
          Expenses: <span className="font-semibold text-red-600">{formatCurrency(thisMonthExpense)}</span>
        </p>
      </div>

      <div className="bg-accent/50 p-4 rounded-lg border border-border">
        <p className="text-sm text-muted-foreground">Total Balance</p>
        <p className={`text-3xl font-bold mt-2 ${balance >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
          {formatCurrency(balance)}
        </p>
      </div>
    </div>
  )
}
