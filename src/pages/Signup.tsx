import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '@/integrations/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { Wallet, Loader2, Shield, Sparkles, Eye, EyeOff } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    phonePeUPI: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const calculateAge = (dateOfBirth: string): number => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) age--
    return age
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast({ title: "Password mismatch", description: "Passwords do not match", variant: "destructive" })
      return
    }

    if (formData.password.length < 6) {
      toast({ title: "Weak password", description: "Password must be at least 6 characters", variant: "destructive" })
      return
    }

    setLoading(true)

    try {
      const age = calculateAge(formData.dateOfBirth)
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            name: formData.name,
            phone: formData.phone,
            phonePeUPI: formData.phonePeUPI,
            dateOfBirth: formData.dateOfBirth,
            age: age.toString(),
          }
        }
      })

      if (error) throw error

      toast({
        title: "Registration successful!",
        description: "Please check your email to verify your account. After verification, your account will be reviewed by admin.",
      })
      navigate('/login')
    } catch (error: any) {
      toast({ title: "Registration failed", description: error.message || "Something went wrong", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const fields = [
    { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Your full name' },
    { id: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
    { id: 'phone', label: 'Phone Number', type: 'tel', placeholder: '10-digit phone number' },
    { id: 'phonePeUPI', label: 'PhonePe UPI ID', type: 'text', placeholder: 'yourname@ybl' },
    { id: 'dateOfBirth', label: 'Date of Birth', type: 'date', placeholder: '' },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center landing-gradient p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="orb orb-purple w-[500px] h-[500px] -top-40 -right-40" />
        <div className="orb orb-orange w-[350px] h-[350px] bottom-10 -left-20" style={{ animationDelay: '3s' }} />
        <div className="orb orb-blue w-[300px] h-[300px] top-1/3 right-1/4" style={{ animationDelay: '5s' }} />
        <div className="grid-bg absolute inset-0 opacity-20" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="glass border-white/10 shadow-2xl shadow-purple-500/10 backdrop-blur-xl">
          <CardHeader className="text-center pb-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="flex justify-center mb-4"
            >
              <Link to="/" className="flex items-center gap-2 group">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                    <Wallet className="h-7 w-7 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-amber-400/20 rounded-2xl blur-xl" />
                </div>
                <span className="text-2xl font-bold gradient-text-gold">DenBayar</span>
              </Link>
            </motion.div>
            <CardTitle className="text-2xl text-white">Create Account</CardTitle>
            <CardDescription className="text-white/50">Join the DenBayar community today</CardDescription>
          </CardHeader>
          <form onSubmit={handleSignup}>
            <CardContent className="space-y-3">
              {fields.map((field, i) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="space-y-1.5"
                >
                  <Label htmlFor={field.id} className="text-white/70 text-sm">{field.label}</Label>
                  <Input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={(formData as any)[field.id]}
                    onChange={handleChange}
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50 focus:ring-purple-500/20 h-10"
                  />
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-1.5"
              >
                <Label htmlFor="password" className="text-white/70 text-sm">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min 6 characters"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50 focus:ring-purple-500/20 h-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.65 }}
                className="space-y-1.5"
              >
                <Label htmlFor="confirmPassword" className="text-white/70 text-sm">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50 focus:ring-purple-500/20 h-10"
                />
              </motion.div>

              {/* Security badge */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex items-center gap-2 text-xs text-emerald-400/70 bg-emerald-500/5 rounded-lg px-3 py-2 border border-emerald-500/10"
              >
                <Shield className="h-3 w-3" />
                <span>Your data is protected with military-grade encryption</span>
              </motion.div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 }}
                className="w-full"
              >
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white border-0 shadow-lg shadow-purple-500/25 h-11"
                  disabled={loading}
                >
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                  Create Account
                </Button>
              </motion.div>
              <p className="text-sm text-white/40 text-center">
                Already have an account?{' '}
                <Link to="/login" className="text-purple-400 hover:text-purple-300 transition-colors hover:underline">
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  )
}
