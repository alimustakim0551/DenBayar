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
        
        // Calculate stats
        const approved = data.filter(t => t.status === 'approved')
        const deposits = approved.filter(t => t.type === 'deposit').reduce((sum, t) => sum + Number(t.amount), 0)
        const withdrawals = approved.filter(t => t.type === 'withdraw').reduce((sum, t) => sum + Number(t.amount), 0)
        const pending = data.filter(t => t.status === 'pending').length
        
        setStats({
          totalDeposits: deposits,
          totalWithdrawals: withdrawals,
          pendingCount: pending,
        })
      }
    }

    fetchTransactions()

    // Real-time subscription
    const channel = supabase
      .channel('transactions-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'transactions', filter: `user_id=eq.${user.id}` },
        () => fetchTransactions()
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [user?.id])

  const currentBalance = profile?.balance ?? 0
  const withdrawnAmount = profile?.withdrawal_repayment_due ?? 0

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>
      case 'rejected':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>
      default:
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Pending</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownCircle className="h-4 w-4 text-green-600" />
      case 'withdraw':
        return <ArrowUpCircle className="h-4 w-4 text-red-600" />
      default:
        return <TrendingUp className="h-4 w-4 text-blue-600" />
    }
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Welcome */}
        <div>
          <h1 className="text-3xl font-bold">Welcome, {profile?.name}</h1>
          <p className="text-muted-foreground">User ID: {profile?.user_id}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${currentBalance < 0 ? 'text-destructive' : 'text-green-600'}`}>
                {formatCurrency(currentBalance)}
              </div>
              <p className="text-xs text-muted-foreground">Available balance</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Withdrawn</CardTitle>
              <ArrowUpCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${withdrawnAmount > 0 ? 'text-destructive' : ''}`}>
                {formatCurrency(withdrawnAmount)}
              </div>
              <p className="text-xs text-muted-foreground">Outstanding amount</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Deposits</CardTitle>
              <ArrowDownCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(stats.totalDeposits)}
              </div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingCount}</div>
              <p className="text-xs text-muted-foreground">Transactions</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your funds</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4 flex-wrap">
            <Button asChild>
              <Link to="/deposit">
                <ArrowDownCircle className="mr-2 h-4 w-4" />
                Deposit
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/withdraw">
                <ArrowUpCircle className="mr-2 h-4 w-4" />
                Withdraw
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest activity</CardDescription>
          </CardHeader>
          <CardContent>
            {transactions.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No transactions yet</p>
            ) : (
              <div className="space-y-4">
                {transactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      {getTypeIcon(tx.type)}
                      <div>
                        <p className="font-medium capitalize">{tx.type}</p>
                        <p className="text-sm text-muted-foreground">{formatDate(tx.created_at)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className={`font-bold ${tx.type === 'deposit' ? 'text-green-600' : 'text-red-600'}`}>
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
