'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { addEntry } from '@/lib/db'

const incomeCategories = ['Salary', 'Freelance', 'Investments', 'Bonus', 'Other']
const expenseCategories = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Healthcare', 'Shopping', 'Other']

interface AddEntryFormProps {
  type: 'income' | 'expense'
}

export function AddEntryForm({ type }: AddEntryFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const categories = type === 'income' ? incomeCategories : expenseCategories

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      const amount = parseFloat(formData.get('amount') as string)
      const category = formData.get('category') as string
      const description = formData.get('description') as string
      const date = formData.get('date') as string

      if (!amount || amount <= 0) {
        throw new Error('Amount must be greater than 0')
      }

      if (!category) {
        throw new Error('Category is required')
      }

      if (!date) {
        throw new Error('Date is required')
      }

      await addEntry({
        type,
        amount,
        category,
        description: description || null,
        date,
      })

      ;(e.target as HTMLFormElement).reset()
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-destructive/10 text-destructive text-sm p-3 rounded">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          name="amount"
          type="number"
          step="0.01"
          placeholder="0.00"
          required
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <select
          id="category"
          name="category"
          className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
          required
          disabled={isLoading}
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          name="date"
          type="date"
          required
          disabled={isLoading}
          defaultValue={new Date().toISOString().split('T')[0]}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description (Optional)</Label>
        <Input
          id="description"
          name="description"
          type="text"
          placeholder="Add a note..."
          disabled={isLoading}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Adding...' : 'Add Entry'}
      </Button>
    </form>
  )
}
