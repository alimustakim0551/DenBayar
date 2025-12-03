import { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { MainLayout } from '@/components/layout/MainLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { Profile } from '@/types'
import { Users, Check, X } from 'lucide-react'

export default function UserManagement() {
  const [users, setUsers] = useState<Profile[]>([])
  const { toast } = useToast()

  const fetchUsers = async () => {
    const { data } = await supabase.from('profiles').select('*').order('created_at', { ascending: false })
    if (data) setUsers(data as Profile[])
  }

  useEffect(() => { fetchUsers() }, [])

  const updateApproval = async (id: string, approved: boolean) => {
    const { error } = await supabase.from('profiles').update({ approved }).eq('id', id)
    if (error) toast({ title: 'Error', description: error.message, variant: 'destructive' })
    else { toast({ title: approved ? 'User approved' : 'User rejected' }); fetchUsers() }
  }

  return (
    <MainLayout>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" />User Management</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map(u => (
              <div key={u.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{u.name}</p>
                  <p className="text-sm text-muted-foreground">{u.user_id} • {u.phone}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={u.approved ? 'default' : 'secondary'}>{u.approved ? 'Approved' : 'Pending'}</Badge>
                  {!u.approved && <Button size="sm" onClick={() => updateApproval(u.id, true)}><Check className="h-4 w-4" /></Button>}
                  {u.approved && <Button size="sm" variant="destructive" onClick={() => updateApproval(u.id, false)}><X className="h-4 w-4" /></Button>}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  )
}
