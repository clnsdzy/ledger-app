'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export function SignOutButton() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignOut = async () => {
    setIsLoading(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  return (
    <Button
      onClick={handleSignOut}
      variant="outline"
      className="w-full justify-start gap-2"
      disabled={isLoading}
    >
      <LogOut className="w-4 h-4" />
      {isLoading ? 'Signing out...' : 'Sign Out'}
    </Button>
  )
}
