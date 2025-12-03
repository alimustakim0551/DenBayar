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

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm">Total Users</CardTitle><Users className="h-4 w-4" /></CardHeader><CardContent><div className="text-2xl font-bold">{stats.users}</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm">Pending</CardTitle><Clock className="h-4 w-4" /></CardHeader><CardContent><div className="text-2xl font-bold">{stats.pending}</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm">Total Deposits</CardTitle><Wallet className="h-4 w-4" /></CardHeader><CardContent><div className="text-2xl font-bold text-green-600">₹{stats.deposits}</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm">Total Withdrawals</CardTitle><FileText className="h-4 w-4" /></CardHeader><CardContent><div className="text-2xl font-bold text-red-600">₹{stats.withdrawals}</div></CardContent></Card>
      </div>
    </MainLayout>
  )
}
