import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Wallet, Shield, Users, TrendingUp } from 'lucide-react'

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">DenBayar</span>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
          Your Trusted Fund Management
          <span className="text-primary block mt-2">Community</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Manage, save & grow your finances with DenBayar. Secure deposits, easy withdrawals, 
          and smart financial services powered by technology.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" asChild>
            <Link to="/signup">Get Started</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/login">Member Login</Link>
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose DenBayar?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Shield className="h-10 w-10 text-primary mb-2" />
              <CardTitle className="text-lg">Secure & Safe</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Your funds are protected with advanced security measures and admin oversight.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Wallet className="h-10 w-10 text-primary mb-2" />
              <CardTitle className="text-lg">Easy Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Simple deposit and withdrawal process with PhonePe UPI integration.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="h-10 w-10 text-primary mb-2" />
              <CardTitle className="text-lg">Community Driven</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Join a trusted community focused on mutual growth and financial wellness.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <TrendingUp className="h-10 w-10 text-primary mb-2" />
              <CardTitle className="text-lg">AI Assistant</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Get help anytime with our intelligent AI chatbot for all your queries.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 DenBayar. Created by Jahin Shahriar. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
