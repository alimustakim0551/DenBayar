import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, TrendingUp, Zap } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            DenBayar
          </h1>
          <p className="text-2xl md:text-3xl text-foreground font-medium">
            Premium Financial Services & Fund Management
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Smart digital finance platform for secure savings, fund management, and AI-powered financial assistance
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link to="/register">
              <Button size="lg" className="text-lg px-8">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Login
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-24">
          <div className="bg-card border border-border rounded-lg p-8 space-y-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-card-foreground">Secure & Safe</h3>
            <p className="text-muted-foreground">
              Bank-level security with encrypted transactions and protected user data
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-8 space-y-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-card-foreground">Smart Management</h3>
            <p className="text-muted-foreground">
              AI-powered insights and intelligent fund management for better returns
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-8 space-y-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-card-foreground">Fast Transactions</h3>
            <p className="text-muted-foreground">
              Quick deposits and withdrawals with instant notifications
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-border text-center text-muted-foreground">
          <p>© 2025 DenBayar. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Created by Jahin Shahriar - Your Trusted Fund Management Community
          </p>
        </div>
      </div>
    </div>
  );
}
