import { useAuth } from '@/contexts/AuthContext'
import { MainLayout } from '@/components/layout/MainLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDate, formatCurrency } from '@/lib/utils'
import { User, Phone, Calendar, Wallet, CreditCard } from 'lucide-react'

export default function Profile() {
  const { profile } = useAuth()

  const fields = [
    { label: 'Name', value: profile?.name, icon: null },
    { label: 'User ID', value: profile?.user_id, icon: null, mono: true },
    { label: 'Phone', value: profile?.phone, icon: Phone },
    { label: 'PhonePe UPI', value: profile?.phone_pe_upi, icon: CreditCard },
    { label: 'Date of Birth', value: profile?.date_of_birth ? formatDate(profile.date_of_birth) : '-', icon: Calendar },
    { label: 'Member Since', value: profile?.created_at ? formatDate(profile.created_at) : '-', icon: null },
    { label: 'Balance', value: formatCurrency(profile?.balance ?? 0), icon: Wallet, color: 'text-emerald-400' },
    { label: 'Status', value: profile?.approved ? 'Approved' : 'Pending Approval', icon: null, color: profile?.approved ? 'text-emerald-400' : 'text-amber-400' },
  ]

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-amber-500 flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              Profile Information
            </CardTitle>
            <CardDescription className="text-white/50">Your account details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {fields.map((f) => (
                <div key={f.label} className="space-y-1 p-3 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-sm text-white/40 flex items-center gap-1">
                    {f.icon && <f.icon className="h-3 w-3" />}
                    {f.label}
                  </p>
                  <p className={`font-medium ${f.color || 'text-white'} ${f.mono ? 'font-mono' : ''}`}>{f.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
