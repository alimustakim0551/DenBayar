import { useState } from 'react'
import { MainLayout } from '@/components/layout/MainLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Bot, Send, Loader2 } from 'lucide-react'
import { ChatMessage } from '@/types'

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    const userMsg: ChatMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)
    
    try {
      const resp = await fetch(`https://jtuisnshyhlymzigpkrx.supabase.co/functions/v1/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0dWlzbnNoeWhseW16aWdwa3J4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4ODY3NDEsImV4cCI6MjA2NDQ2Mjc0MX0.9eEpk453Ixgl69lyYp7l1lma0fTgP0O4M71aVnvXIEI` },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      })
      
      if (!resp.ok) throw new Error('AI service unavailable')
      
      const reader = resp.body?.getReader()
      const decoder = new TextDecoder()
      let assistantContent = ''
      
      setMessages(prev => [...prev, { role: 'assistant', content: '' }])
      
      while (reader) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n')
        for (const line of lines) {
          if (line.startsWith('data: ') && line !== 'data: [DONE]') {
            try {
              const json = JSON.parse(line.slice(6))
              const content = json.choices?.[0]?.delta?.content
              if (content) {
                assistantContent += content
                setMessages(prev => prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantContent } : m))
              }
            } catch {}
          }
        }
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, AI service is currently unavailable.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <MainLayout>
      <Card className="h-[calc(100vh-200px)] flex flex-col">
        <CardHeader><CardTitle className="flex items-center gap-2"><Bot className="h-5 w-5" />AI Assistant</CardTitle></CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.length === 0 && <p className="text-muted-foreground text-center">Start a conversation with AI</p>}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  <p className="whitespace-pre-wrap">{m.content}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input placeholder="Type your message..." value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && sendMessage()} disabled={loading} />
            <Button onClick={sendMessage} disabled={loading}>{loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}</Button>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  )
}
