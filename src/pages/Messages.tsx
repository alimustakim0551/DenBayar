import { MainLayout } from '@/components/layout/MainLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageSquare } from 'lucide-react'

export default function Messages() {
  return (
    <MainLayout>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><MessageSquare className="h-5 w-5" />Messages</CardTitle></CardHeader>
        <CardContent><p className="text-muted-foreground text-center py-8">Message feature coming soon</p></CardContent>
      </Card>
    </MainLayout>
  )
}
