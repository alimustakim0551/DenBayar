import { MainLayout } from '@/components/layout/MainLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageSquare } from 'lucide-react'

export default function Messages() {
  return (
    <MainLayout>
      <Card className="glass border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-white" />
            </div>
            Messages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white/40 text-center py-8">Message feature coming soon</p>
        </CardContent>
      </Card>
    </MainLayout>
  )
}
