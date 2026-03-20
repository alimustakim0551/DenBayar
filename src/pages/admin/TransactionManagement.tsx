import { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { MainLayout } from '@/components/layout/MainLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { formatCurrency, formatDateTime } from '@/lib/utils'
import { FileText, Check, X } from 'lucide-react'

export default function TransactionManagement() {
  const [transactions, setTransactions] = useState<any[]>([])
  const { toast } = useToast()

  const fetchTransactions = async () => {
    const { data } = await supabase.from('transactions').select('*, profiles(name, user_id)').order('created_at', { ascending: false })
    if (data) setTransactions(data)
  }

  useEffect(() => { fetchTransactions() }, [])

  const updateStatus = async (id: string, status: 'approved' | 'rejected') => {
    const { error } = await supabase.from('transactions').update({ status }).eq('id', id)
    if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return }
    toast({ title: `Transaction ${status}` })
    fetchTransactions()
  }

  const getStatusBadge = (status: string) => {
    if (status === 'approved') return <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">approved</Badge>
    if (status === 'rejected') return <Badge className="bg-red-500/10 text-red-400 border-red-500/20">rejected</Badge>
    return <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20">pending</Badge>
  }

  return (
    <MainLayout>
      <Card className="glass border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center">
              <FileText className="h-5 w-5 text-white" />
            </div>
            Transaction Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.map(tx => (
              <div key={tx.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                <div>
                  <p className="font-medium text-white">{tx.profiles?.name} - <span className="capitalize">{tx.type}</span></p>
                  <p className="text-sm text-white/40">{formatDateTime(tx.created_at)}</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className={`font-bold ${tx.type === 'deposit' ? 'text-emerald-400' : 'text-red-400'}`}>{formatCurrency(tx.amount)}</p>
                  {getStatusBadge(tx.status)}
                  {tx.status === 'pending' && (
                    <>
                      <Button size="sm" onClick={() => updateStatus(tx.id, 'approved')} className="bg-emerald-600 hover:bg-emerald-500 text-white border-0"><Check className="h-4 w-4" /></Button>
                      <Button size="sm" onClick={() => updateStatus(tx.id, 'rejected')} className="bg-red-600 hover:bg-red-500 text-white border-0"><X className="h-4 w-4" /></Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  )
}
