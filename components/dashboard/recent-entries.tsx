'use client'

import { Entry } from '@/lib/db'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

interface RecentEntriesProps {
  entries: Entry[]
}

export function RecentEntries({ entries }: RecentEntriesProps) {
  if (entries.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        No transactions yet
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <div key={entry.id} className="flex items-start justify-between border-b border-border pb-4 last:border-0">
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <p className="font-medium text-sm">{entry.category}</p>
              <Badge variant={entry.type === 'income' ? 'default' : 'secondary'}>
                {entry.type}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">{formatDate(entry.date)}</p>
          </div>
          <p className={`font-semibold text-sm ${entry.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
            {entry.type === 'income' ? '+' : '-'}{formatCurrency(entry.amount)}
          </p>
        </div>
      ))}
    </div>
  )
}
