import { getEntries, getStats } from '@/lib/db'
import { formatCurrency } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { EntryList } from '@/components/dashboard/entry-list'
import { AddEntryForm } from '@/components/dashboard/add-entry-form'

export default async function IncomePage() {
  const entries = await getEntries({ type: 'income' })
  const stats = await getStats()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Income</h1>
        <p className="text-muted-foreground mt-2">
          Track and manage your income sources
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Add Income Form */}
        <Card className="p-6">
          <h2 className="font-semibold mb-4">Add Income</h2>
          <AddEntryForm type="income" />
        </Card>

        {/* Income Stats */}
        <Card className="p-6 flex flex-col justify-center">
          <p className="text-sm text-muted-foreground">Total Income</p>
          <p className="text-4xl font-bold mt-2">{formatCurrency(stats.totalIncome)}</p>
          <p className="text-xs text-muted-foreground mt-4">
            {entries.length} transaction{entries.length !== 1 ? 's' : ''}
          </p>
        </Card>
      </div>

      {/* Income List */}
      <Card className="p-6">
        <h2 className="font-semibold mb-4">Income History</h2>
        <EntryList entries={entries} type="income" />
      </Card>
    </div>
  )
}
