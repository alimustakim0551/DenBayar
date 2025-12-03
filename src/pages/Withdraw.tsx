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
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { formatCurrency } from '@/lib/utils'
import { ArrowUpCircle, Loader2, AlertTriangle } from 'lucide-react'

export default function Withdraw() {
  const { user, profile } = useAuth()
  const [amount, setAmount] = useState('')
  const [reason, setReason] = useState('')
  const [isOverdraw, setIsOverdraw] = useState(false)
  const [repaymentDuration, setRepaymentDuration] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  const currentBalance = profile?.balance ?? 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const withdrawAmount = parseFloat(amount)
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid withdrawal amount",
        variant: "destructive",
      })
      return
    }

    if (!isOverdraw && withdrawAmount > currentBalance) {
      toast({
        title: "Insufficient balance",
        description: "You don't have enough balance. Enable overdraw if you need more.",
        variant: "destructive",
      })
      return
    }

    if (isOverdraw && !repaymentDuration) {
      toast({
        title: "Select repayment duration",
        description: "Please select a repayment duration for overdraw",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const overdrawAmount = isOverdraw && withdrawAmount > currentBalance 
        ? withdrawAmount - currentBalance 
        : null

      const { error } = await supabase
        .from('transactions')
        .insert({
          user_id: user?.id,
          type: 'withdraw',
          amount: withdrawAmount,
          reason: reason || null,
          status: 'pending',
          is_overdraw: isOverdraw,
          overdraw_amount: overdrawAmount,
          repayment_duration: isOverdraw ? repaymentDuration : null,
        })

      if (error) throw error

      toast({
        title: "Withdrawal request submitted",
        description: "Your withdrawal request has been submitted for admin approval.",
      })
      navigate('/dashboard')
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit withdrawal request",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <MainLayout>
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <ArrowUpCircle className="h-6 w-6 text-red-600" />
              <CardTitle>Withdraw Funds</CardTitle>
            </div>
            <CardDescription>
              Submit a withdrawal request. Current balance: {formatCurrency(currentBalance)}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="1"
                  step="0.01"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Reason (Optional)</Label>
                <Textarea
                  id="reason"
                  placeholder="Why do you need this withdrawal?"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
                <div className="space-y-0.5">
                  <Label htmlFor="overdraw">Enable Overdraw</Label>
                  <p className="text-sm text-muted-foreground">
                    Withdraw more than your balance
                  </p>
                </div>
                <Switch
                  id="overdraw"
                  checked={isOverdraw}
                  onCheckedChange={setIsOverdraw}
                />
              </div>

              {isOverdraw && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-amber-600">
                    <AlertTriangle className="h-4 w-4" />
                    <Label>Repayment Duration</Label>
                  </div>
                  <Select value={repaymentDuration} onValueChange={setRepaymentDuration}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1_month">1 Month</SelectItem>
                      <SelectItem value="3_months">3 Months</SelectItem>
                      <SelectItem value="6_months">6 Months</SelectItem>
                      <SelectItem value="12_months">12 Months</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    You'll need to repay the overdraw amount within this period.
                  </p>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit Withdrawal Request
              </Button>
            </CardContent>
          </form>
        </Card>
      </div>
    </MainLayout>
  )
}
