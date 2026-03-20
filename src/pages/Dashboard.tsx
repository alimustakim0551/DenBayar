import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/contexts/AuthContext'
import { MainLayout } from '@/components/layout/MainLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Transaction } from '@/types'
import {
  Wallet,
  ArrowDownCircle,
  ArrowUpCircle,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
} from 'lucide-react'

export default function Dashboard() {
  const { profile, user } = useAuth()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [stats, setStats] = useState({
    totalDeposits: 0,
    totalWithdrawals: 0,
    pendingCount: 0,
  })

  useEffect(() => {
    if (!user?.id) return

    const fetchTransactions = async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10)

      if (!error && data) {
        setTransactions(data as Transaction[])
        const approved = data.filter(t => t.status === 'approved')
        const deposits = approved.filter(t => t.type === 'deposit').reduce((sum, t) => sum + Number(t.amount), 0)
        const withdrawals = approved.filter(t => t.type === 'withdraw').reduce((sum, t) => sum + Number(t.amount), 0)
        const pending = data.filter(t => t.status === 'pending').length
        setStats({ totalDeposits: deposits, totalWithdrawals: withdrawals, pendingCount: pending })
      }
    }

    fetchTransactions()

    const channel = supabase
      .channel('transactions-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'transactions', filter: `user_id=eq.${user.id}` }, () => fetchTransactions())
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [user?.id])

  const currentBalance = profile?.balance ?? 0
  const withdrawnAmount = profile?.withdrawal_repayment_due ?? 0

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>
      case 'rejected':
        return <Badge className="bg-red-500/10 text-red-400 border-red-500/20"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>
      default:
        return <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20"><Clock className="h-3 w-3 mr-1" />Pending</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownCircle className="h-4 w-4 text-emerald-400" />
      case 'withdraw':
        return <ArrowUpCircle className="h-4 w-4 text-red-400" />
      default:
        return <TrendingUp className="h-4 w-4 text-blue-400" />
    }
  }

  const statCards = [
    { title: 'Current Balance', icon: Wallet, value: formatCurrency(currentBalance), sub: 'Available balance', color: currentBalance < 0 ? 'text-red-400' : 'text-emerald-400' },
    { title: 'Withdrawn', icon: ArrowUpCircle, value: formatCurrency(withdrawnAmount), sub: 'Outstanding amount', color: withdrawnAmount > 0 ? 'text-red-400' : 'text-white' },
    { title: 'Total Deposits', icon: ArrowDownCircle, value: formatCurrency(stats.totalDeposits), sub: 'All time', color: 'text-emerald-400' },
    { title: 'Pending', icon: Clock, value: stats.pendingCount.toString(), sub: 'Transactions', color: 'text-amber-400' },
  ]

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Welcome, {profile?.name}</h1>
          <p className="text-white/50">User ID: {profile?.user_id}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map((s) => (
            <Card key={s.title} className="glass border-white/10">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-white/70">{s.title}</CardTitle>
                <s.icon className="h-4 w-4 text-white/40" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                <p className="text-xs text-white/40">{s.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
            <CardDescription className="text-white/50">Manage your funds</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4 flex-wrap">
            <Button asChild className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white border-0">
              <Link to="/deposit"><ArrowDownCircle className="mr-2 h-4 w-4" />Deposit</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-purple-600 to-violet-500 hover:from-purple-500 hover:to-violet-400 text-white border-0">
              <Link to="/withdraw"><ArrowUpCircle className="mr-2 h-4 w-4" />Withdraw</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Recent Transactions</CardTitle>
            <CardDescription className="text-white/50">Your latest activity</CardDescription>
          </CardHeader>
          <CardContent>
            {transactions.length === 0 ? (
              <p className="text-white/40 text-center py-8">No transactions yet</p>
            ) : (
              <div className="space-y-3">
                {transactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-4">
                      {getTypeIcon(tx.type)}
                      <div>
                        <p className="font-medium text-white capitalize">{tx.type}</p>
                        <p className="text-sm text-white/40">{formatDate(tx.created_at)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className={`font-bold ${tx.type === 'deposit' ? 'text-emerald-400' : 'text-red-400'}`}>
                        {tx.type === 'deposit' ? '+' : '-'}{formatCurrency(tx.amount)}
                      </p>
                      {getStatusBadge(tx.status)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
