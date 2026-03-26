import { getEntries, getStats } from '@/lib/db'
import { formatCurrency } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { EntryList } from '@/components/dashboard/entry-list'
import { AddEntryForm } from '@/components/dashboard/add-entry-form'

export default async function ExpensesPage() {
  const entries = await getEntries({ type: 'expense' })
  const stats = await getStats()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Expenses</h1>
        <p className="text-muted-foreground mt-2">
          Track and manage your expenses
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Add Expense Form */}
        <Card className="p-6">
          <h2 className="font-semibold mb-4">Add Expense</h2>
          <AddEntryForm type="expense" />
        </Card>

        {/* Expense Stats */}
        <Card className="p-6 flex flex-col justify-center">
          <p className="text-sm text-muted-foreground">Total Expenses</p>
          <p className="text-4xl font-bold mt-2">{formatCurrency(stats.totalExpense)}</p>
          <p className="text-xs text-muted-foreground mt-4">
            {entries.length} transaction{entries.length !== 1 ? 's' : ''}
          </p>
        </Card>
      </div>

      {/* Expense List */}
      <Card className="p-6">
        <h2 className="font-semibold mb-4">Expense History</h2>
        <EntryList entries={entries} type="expense" />
      </Card>
    </div>
  )
}
