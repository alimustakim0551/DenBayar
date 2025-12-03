import { useAuth } from '@/contexts/AuthContext'
import { MainLayout } from '@/components/layout/MainLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDate, formatCurrency } from '@/lib/utils'
import { User, Phone, Calendar, Wallet, CreditCard } from 'lucide-react'

export default function Profile() {
  const { profile } = useAuth()

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
            <CardDescription>Your account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{profile?.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">User ID</p>
                <p className="font-mono font-medium">{profile?.user_id}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center gap-1"><Phone className="h-3 w-3" />Phone</p>
                <p className="font-medium">{profile?.phone}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center gap-1"><CreditCard className="h-3 w-3" />PhonePe UPI</p>
                <p className="font-medium">{profile?.phone_pe_upi}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" />Date of Birth</p>
                <p className="font-medium">{profile?.date_of_birth ? formatDate(profile.date_of_birth) : '-'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Member Since</p>
                <p className="font-medium">{profile?.created_at ? formatDate(profile.created_at) : '-'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center gap-1"><Wallet className="h-3 w-3" />Balance</p>
                <p className="font-medium text-green-600">{formatCurrency(profile?.balance ?? 0)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Status</p>
                <p className={`font-medium ${profile?.approved ? 'text-green-600' : 'text-amber-600'}`}>
                  {profile?.approved ? 'Approved' : 'Pending Approval'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
