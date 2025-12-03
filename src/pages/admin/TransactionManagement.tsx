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

  return (
    <MainLayout>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5" />Transaction Management</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map(tx => (
              <div key={tx.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{tx.profiles?.name} - <span className="capitalize">{tx.type}</span></p>
                  <p className="text-sm text-muted-foreground">{formatDateTime(tx.created_at)}</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className={`font-bold ${tx.type === 'deposit' ? 'text-green-600' : 'text-red-600'}`}>{formatCurrency(tx.amount)}</p>
                  <Badge variant={tx.status === 'approved' ? 'default' : tx.status === 'rejected' ? 'destructive' : 'secondary'}>{tx.status}</Badge>
                  {tx.status === 'pending' && (
                    <>
                      <Button size="sm" onClick={() => updateStatus(tx.id, 'approved', tx)}><Check className="h-4 w-4" /></Button>
                      <Button size="sm" variant="destructive" onClick={() => updateStatus(tx.id, 'rejected', tx)}><X className="h-4 w-4" /></Button>
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
