import { createClient } from '@/lib/supabase/server'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { SignOutButton } from '@/components/dashboard/sign-out-button'

export default async function ProfilePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account settings
        </p>
      </div>

      <Card className="p-6 max-w-md">
        <div className="space-y-6">
          <div>
            <label className="text-sm text-muted-foreground">Email Address</label>
            <p className="text-lg font-medium mt-2">{user?.email}</p>
          </div>

          <div>
            <label className="text-sm text-muted-foreground">Account Status</label>
            <p className="text-lg font-medium mt-2">
              {user?.email_confirmed_at ? 'Active' : 'Pending Confirmation'}
            </p>
          </div>

          <div className="border-t border-border pt-6">
            <p className="text-sm text-muted-foreground mb-4">
              Last signed in: {user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString() : 'N/A'}
            </p>
            <SignOutButton />
          </div>
        </div>
      </Card>
    </div>
  )
}
