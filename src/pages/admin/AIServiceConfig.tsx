import { useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/contexts/AuthContext'
import { MainLayout } from '@/components/layout/MainLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { Bot, Loader2 } from 'lucide-react'

export default function AIServiceConfig() {
  const { user } = useAuth()
  const [apiKey, setApiKey] = useState('')
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!apiKey.trim()) return
    setLoading(true)
    try {
      const { error } = await supabase.rpc('update_openrouter_api_key', { new_api_key: apiKey, updater_id: user?.id })
      if (error) throw error
      toast({ title: 'API Key Updated', description: 'OpenRouter API key has been updated successfully.' })
      setApiKey('')
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
          <CardTitle className="flex items-center gap-2"><Bot className="h-5 w-5" />AI Service Config</CardTitle>
          <CardDescription>Configure OpenRouter API key for AI chatbot</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">OpenRouter API Key</Label>
              <Input id="apiKey" type="password" placeholder="sk-or-..." value={apiKey} onChange={(e) => setApiKey(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Apply Changes
            </Button>
          </CardContent>
        </form>
      </Card>
    </MainLayout>
  )
}
