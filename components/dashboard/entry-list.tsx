'use client'

import { Entry } from '@/lib/db'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

interface EntryListProps {
  entries: Entry[]
  type: 'income' | 'expense'
}

export function EntryList({ entries, type }: EntryListProps) {
  if (entries.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        No {type === 'income' ? 'income' : 'expense'} entries yet
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left font-medium p-3">Date</th>
            <th className="text-left font-medium p-3">Category</th>
            <th className="text-left font-medium p-3">Description</th>
            <th className="text-right font-medium p-3">Amount</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id} className="border-b border-border hover:bg-accent/50">
              <td className="p-3">{formatDate(entry.date)}</td>
              <td className="p-3">{entry.category}</td>
              <td className="p-3 text-muted-foreground">{entry.description || '-'}</td>
              <td className={`text-right p-3 font-semibold ${type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                {type === 'income' ? '+' : '-'}{formatCurrency(entry.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
