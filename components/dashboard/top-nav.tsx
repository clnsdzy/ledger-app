'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { Sidebar } from './sidebar'

export function TopNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="px-4 md:px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold lg:hidden">Ledger</h1>
          <div className="flex items-center gap-2 ml-auto">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile sidebar */}
      {isOpen && (
        <div className="fixed inset-0 top-16 z-30 bg-background lg:hidden">
          <div className="border-r border-border">
            <Sidebar />
          </div>
        </div>
      )}
    </>
  )
}
