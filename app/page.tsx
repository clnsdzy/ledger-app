import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function Home() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-background/80 px-4">
      <div className="max-w-2xl w-full space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-balance">
            Ledger
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            Take control of your finances with real-time insights
          </p>
        </div>

        <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
          Track your income and expenses, visualize spending patterns, and make informed financial decisions with our modern ledger application.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Link href="/auth/login">
            <Button size="lg" variant="default">
              Sign In
            </Button>
          </Link>
          <Link href="/auth/sign-up">
            <Button size="lg" variant="outline">
              Create Account
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
          <div className="p-6 rounded-lg border border-border bg-card">
            <h3 className="font-semibold mb-2">Track Everything</h3>
            <p className="text-sm text-muted-foreground">
              Record every income and expense with categories and descriptions
            </p>
          </div>
          <div className="p-6 rounded-lg border border-border bg-card">
            <h3 className="font-semibold mb-2">Visual Reports</h3>
            <p className="text-sm text-muted-foreground">
              See your spending patterns with beautiful charts and graphs
            </p>
          </div>
          <div className="p-6 rounded-lg border border-border bg-card">
            <h3 className="font-semibold mb-2">Smart Insights</h3>
            <p className="text-sm text-muted-foreground">
              Get actionable insights to improve your financial health
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
