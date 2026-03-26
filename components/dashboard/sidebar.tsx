'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  PieChart,
  User,
  LogOut,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

const menuItems = [
  {
    title: 'Overview',
    href: '/dashboard',
    icon: BarChart3,
  },
  {
    title: 'Income',
    href: '/dashboard/income',
    icon: TrendingUp,
  },
  {
    title: 'Expenses',
    href: '/dashboard/expenses',
    icon: TrendingDown,
  },
  {
    title: 'Reports',
    href: '/dashboard/reports',
    icon: PieChart,
  },
  {
    title: 'Profile',
    href: '/dashboard/profile',
    icon: User,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  return (
    <aside className="flex flex-col h-full p-6 gap-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Ledger</h1>
        <p className="text-sm text-muted-foreground">Financial Management</p>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? 'default' : 'ghost'}
                className="w-full justify-start gap-3"
              >
                <Icon className="w-5 h-5" />
                {item.title}
              </Button>
            </Link>
          )
        })}
      </nav>

      <Button
        variant="outline"
        className="w-full justify-start gap-3"
        onClick={handleSignOut}
      >
        <LogOut className="w-5 h-5" />
        Sign Out
      </Button>
    </aside>
  )
}
