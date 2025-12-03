import { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/contexts/AuthContext'
import { MainLayout } from '@/components/layout/MainLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDateTime } from '@/lib/utils'
import { Notification } from '@/types'
import { Bell, CheckCircle } from 'lucide-react'

export default function Notifications() {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    if (!user?.id) return
    const fetchNotifications = async () => {
      const { data } = await supabase.from('notifications').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
      if (data) setNotifications(data as Notification[])
    }
    fetchNotifications()
  }, [user?.id])

  return (
    <MainLayout>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5" />Notifications</CardTitle></CardHeader>
        <CardContent>
          {notifications.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No notifications</p>
          ) : (
            <div className="space-y-3">
              {notifications.map((n) => (
                <div key={n.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">{n.title}</h4>
                    <span className="text-xs text-muted-foreground">{formatDateTime(n.created_at)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{n.message}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </MainLayout>
  )
}
