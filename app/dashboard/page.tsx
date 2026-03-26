import { getStats, getEntries } from '@/lib/db'
import { formatCurrency } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { RecentEntries } from '@/components/dashboard/recent-entries'
import { ChartOverview } from '@/components/dashboard/chart-overview'
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react'

export default async function DashboardPage() {
  const stats = await getStats()
  const entries = await getEntries()
  const recentEntries = entries.slice(0, 5)

  const cards = [
    {
      title: 'Total Income',
      value: formatCurrency(stats.totalIncome),
      icon: TrendingUp,
      color: 'text-green-600',
    },
    {
      title: 'Total Expenses',
      value: formatCurrency(stats.totalExpense),
      icon: TrendingDown,
      color: 'text-red-600',
    },
    {
      title: 'Balance',
      value: formatCurrency(stats.balance),
      icon: Wallet,
      color: stats.balance >= 0 ? 'text-blue-600' : 'text-orange-600',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back! Here&apos;s an overview of your finances.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <Card key={card.title} className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{card.title}</p>
                  <p className="text-2xl font-bold">{card.value}</p>
                </div>
                <Icon className={`w-8 h-8 ${card.color}`} />
              </div>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h2 className="font-semibold mb-4">Transactions Overview</h2>
            <ChartOverview entries={entries} />
          </Card>
        </div>

        {/* Recent Entries */}
        <Card className="p-6">
          <h2 className="font-semibold mb-4">Recent Transactions</h2>
          <RecentEntries entries={recentEntries} />
        </Card>
      </div>
    </div>
  )
}
