import { getCategoryBreakdown, getEntries } from '@/lib/db'
import { Card } from '@/components/ui/card'
import { CategoryBreakdown } from '@/components/dashboard/category-breakdown'
import { EntryFilters } from '@/components/dashboard/entry-filters'

export default async function ReportsPage() {
  const breakdown = await getCategoryBreakdown()
  const allEntries = await getEntries()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-muted-foreground mt-2">
          Analyze your spending and income patterns
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Breakdown */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h2 className="font-semibold mb-4">Category Breakdown</h2>
            <CategoryBreakdown breakdown={breakdown} />
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-6">
          <h2 className="font-semibold mb-4">Summary</h2>
          <EntryFilters entries={allEntries} />
        </Card>
      </div>
    </div>
  )
}
