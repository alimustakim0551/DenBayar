import { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { MainLayout } from '@/components/layout/MainLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDateTime } from '@/lib/utils'
import { ClipboardList } from 'lucide-react'

export default function AdminLogs() {
  const [logs, setLogs] = useState<any[]>([])

  useEffect(() => {
    const fetchLogs = async () => {
      const { data } = await supabase.from('admin_logs').select('*').order('created_at', { ascending: false }).limit(50)
      if (data) setLogs(data)
    }
    fetchLogs()
  }, [])

  return (
    <MainLayout>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><ClipboardList className="h-5 w-5" />Admin Logs</CardTitle></CardHeader>
        <CardContent>
          {logs.length === 0 ? <p className="text-muted-foreground text-center py-8">No logs yet</p> : (
            <div className="space-y-3">
              {logs.map(log => (
                <div key={log.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between"><p className="font-medium">{log.action}</p><span className="text-xs text-muted-foreground">{formatDateTime(log.created_at)}</span></div>
                  {log.details && <pre className="text-xs text-muted-foreground mt-2 overflow-x-auto">{JSON.stringify(log.details, null, 2)}</pre>}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </MainLayout>
  )
}
