import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/contexts/AuthContext'
import { MainLayout } from '@/components/layout/MainLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { ArrowDownCircle, Loader2 } from 'lucide-react'

export default function Deposit() {
  const { user } = useAuth()
  const [amount, setAmount] = useState('')
  const [reason, setReason] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const depositAmount = parseFloat(amount)
    if (isNaN(depositAmount) || depositAmount <= 0) {
      toast({ title: "Invalid amount", description: "Please enter a valid deposit amount", variant: "destructive" })
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase.from('transactions').insert({
        user_id: user?.id, type: 'deposit', amount: depositAmount, reason: reason || null, status: 'pending',
      })
      if (error) throw error
      toast({ title: "Deposit request submitted", description: "Your deposit request has been submitted for admin approval." })
      navigate('/dashboard')
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to submit deposit request", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <MainLayout>
      <div className="max-w-md mx-auto">
        <Card className="glass border-white/10">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                <ArrowDownCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-white">Deposit Funds</CardTitle>
                <CardDescription className="text-white/50">Submit a deposit request. Admin will review and approve.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-white/70">Amount (₹)</Label>
                <Input id="amount" type="number" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} min="1" step="0.01" required className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason" className="text-white/70">Reason (Optional)</Label>
                <Textarea id="reason" placeholder="Add a note for this deposit" value={reason} onChange={(e) => setReason(e.target.value)} rows={3} className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50" />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white border-0" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit Deposit Request
              </Button>
            </CardContent>
          </form>
        </Card>
      </div>
    </MainLayout>
  )
}
