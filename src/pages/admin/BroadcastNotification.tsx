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
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Radio className="h-5 w-5" />Broadcast Notification</CardTitle>
          <CardDescription>Send notification to all approved users</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label htmlFor="title">Title</Label><Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required /></div>
            <div className="space-y-2"><Label htmlFor="message">Message</Label><Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} rows={4} required /></div>
            <Button type="submit" className="w-full" disabled={loading}>{loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Send Broadcast</Button>
          </CardContent>
        </form>
      </Card>
    </MainLayout>
  )
}
