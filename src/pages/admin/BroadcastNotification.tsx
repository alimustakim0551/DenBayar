import { useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { MainLayout } from '@/components/layout/MainLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { Radio, Loader2 } from 'lucide-react'

export default function BroadcastNotification() {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data, error } = await supabase.rpc('send_broadcast_notification', { notification_title: title, notification_message: message })
      if (error) throw error
      toast({ title: 'Broadcast Sent', description: `Notification sent to ${data} users.` })
      setTitle(''); setMessage('')
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <MainLayout>
      <Card className="max-w-md mx-auto glass border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <Radio className="h-5 w-5 text-white" />
            </div>
            Broadcast Notification
          </CardTitle>
          <CardDescription className="text-white/50">Send notification to all approved users</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-white/70">Title</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="text-white/70">Message</Label>
              <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} rows={4} required className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50" />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white border-0" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Send Broadcast
            </Button>
          </CardContent>
        </form>
      </Card>
    </MainLayout>
  )
}
