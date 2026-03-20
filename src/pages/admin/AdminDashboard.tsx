import { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { MainLayout } from '@/components/layout/MainLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, FileText, Wallet, Clock } from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, pending: 0, deposits: 0, withdrawals: 0 })

  useEffect(() => {
    const fetchStats = async () => {
      const [{ count: users }, { count: pending }, { data: txs }] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('transactions').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('transactions').select('type, amount').eq('status', 'approved'),
      ])
      const deposits = txs?.filter(t => t.type === 'deposit').reduce((s, t) => s + Number(t.amount), 0) || 0
      const withdrawals = txs?.filter(t => t.type === 'withdraw').reduce((s, t) => s + Number(t.amount), 0) || 0
      setStats({ users: users || 0, pending: pending || 0, deposits, withdrawals })
    }
    fetchStats()
  }, [])

  const cards = [
    { title: 'Total Users', icon: Users, value: stats.users, color: 'text-white' },
    { title: 'Pending', icon: Clock, value: stats.pending, color: 'text-amber-400' },
    { title: 'Total Deposits', icon: Wallet, value: `₹${stats.deposits}`, color: 'text-emerald-400' },
    { title: 'Total Withdrawals', icon: FileText, value: `₹${stats.withdrawals}`, color: 'text-red-400' },
  ]

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6 text-white">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Card key={c.title} className="glass border-white/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-white/70">{c.title}</CardTitle>
              <c.icon className="h-4 w-4 text-white/40" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${c.color}`}>{c.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </MainLayout>
  )
}
