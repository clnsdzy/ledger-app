'use client'

import { Entry } from '@/lib/db'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'

interface ChartOverviewProps {
  entries: Entry[]
}

export function ChartOverview({ entries }: ChartOverviewProps) {
  // Group entries by month
  const monthlyData: Record<string, { income: number; expense: number }> = {}

  entries.forEach((entry) => {
    const date = new Date(entry.date)
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`

    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = { income: 0, expense: 0 }
    }

    if (entry.type === 'income') {
      monthlyData[monthKey].income += entry.amount
    } else {
      monthlyData[monthKey].expense += entry.amount
    }
  })

  const chartData = Object.entries(monthlyData)
    .sort()
    .reverse()
    .slice(0, 6)
    .reverse()
    .map(([month, data]) => ({
      month: new Date(month + '-01').toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
      income: data.income,
      expense: data.expense,
    }))

  if (chartData.length === 0) {
    return (
      <div className="w-full h-72 flex items-center justify-center text-muted-foreground">
        No data available yet
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
        <XAxis dataKey="month" className="text-xs" />
        <YAxis className="text-xs" />
        <Tooltip contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }} />
        <Legend />
        <Bar dataKey="income" fill="#10b981" name="Income" />
        <Bar dataKey="expense" fill="#ef4444" name="Expense" />
      </BarChart>
    </ResponsiveContainer>
  )
}
