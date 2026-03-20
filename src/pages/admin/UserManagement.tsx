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
      <Card className="glass border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <Users className="h-5 w-5 text-white" />
            </div>
            User Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {users.map(u => (
              <div key={u.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                <div>
                  <p className="font-medium text-white">{u.name}</p>
                  <p className="text-sm text-white/40">{u.user_id} • {u.phone}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={u.approved ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}>
                    {u.approved ? 'Approved' : 'Pending'}
                  </Badge>
                  {!u.approved && <Button size="sm" onClick={() => updateApproval(u.id, true)} className="bg-emerald-600 hover:bg-emerald-500 text-white border-0"><Check className="h-4 w-4" /></Button>}
                  {u.approved && <Button size="sm" onClick={() => updateApproval(u.id, false)} className="bg-red-600 hover:bg-red-500 text-white border-0"><X className="h-4 w-4" /></Button>}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  )
}
