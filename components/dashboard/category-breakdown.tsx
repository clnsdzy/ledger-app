'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { formatCurrency } from '@/lib/utils'

interface CategoryBreakdownProps {
  breakdown: Record<string, { income: number; expense: number }>
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316']

export function CategoryBreakdown({ breakdown }: CategoryBreakdownProps) {
  // Group by expense for pie chart
  const expenseData = Object.entries(breakdown)
    .map(([category, data]) => ({
      name: category,
      value: data.expense,
    }))
    .filter((item) => item.value > 0)

  const incomeData = Object.entries(breakdown)
    .map(([category, data]) => ({
      name: category,
      value: data.income,
    }))
    .filter((item) => item.value > 0)

  if (expenseData.length === 0 && incomeData.length === 0) {
    return (
      <div className="w-full h-96 flex items-center justify-center text-muted-foreground">
        No data available yet
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Expense Pie Chart */}
      <div className="space-y-4">
        <h3 className="font-semibold">Expenses by Category</h3>
        {expenseData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expenseData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {expenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-72 flex items-center justify-center text-muted-foreground">
            No expense data
          </div>
        )}
      </div>

      {/* Income Pie Chart */}
      <div className="space-y-4">
        <h3 className="font-semibold">Income by Category</h3>
        {incomeData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={incomeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {incomeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-72 flex items-center justify-center text-muted-foreground">
            No income data
          </div>
        )}
      </div>
    </div>
  )
}
