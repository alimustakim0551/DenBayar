import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Wallet,
  Shield,
  Users,
  TrendingUp,
  ArrowDownCircle,
  ArrowUpCircle,
  Bot,
  Bell,
  MessageSquare,
  LayoutDashboard,
  UserCheck,
  FileText,
  Radio,
  Lock,
  Zap,
  Globe,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Star,
  Menu,
  X,
} from 'lucide-react'
import { useRef, useState } from 'react'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
}

const navLinks = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#services', label: 'Services' },
  { href: '#security', label: 'Security' },
  { href: '#admin', label: 'Admin' },
  { href: '#faq', label: 'FAQ' },
]

const features = [
  { icon: Shield, title: 'Bank-Grade Security', desc: 'Advanced encryption & admin oversight protect every transaction.', color: 'from-purple-500 to-violet-600' },
  { icon: Wallet, title: 'Easy Transactions', desc: 'Simple deposit & withdrawal with PhonePe UPI integration.', color: 'from-amber-500 to-orange-600' },
  { icon: Users, title: 'Community Driven', desc: 'Trusted community focused on mutual growth & financial wellness.', color: 'from-blue-500 to-indigo-600' },
  { icon: Bot, title: 'AI Assistant', desc: 'Intelligent chatbot for instant help, powered by advanced AI.', color: 'from-pink-500 to-rose-600' },
  { icon: TrendingUp, title: 'Smart Analytics', desc: 'Track your finances with real-time dashboards & insights.', color: 'from-emerald-500 to-teal-600' },
  { icon: Globe, title: 'Multilingual Support', desc: 'Full Bengali & English support for all users.', color: 'from-cyan-500 to-sky-600' },
]

const services = [
  { icon: ArrowDownCircle, title: 'Deposit Funds', desc: 'Submit deposit requests with proof. Admin verification ensures safety.' },
  { icon: ArrowUpCircle, title: 'Withdraw Funds', desc: 'Request withdrawals including overdraw with flexible repayment plans.' },
  { icon: LayoutDashboard, title: 'Dashboard', desc: 'Real-time balance, recent transactions, and quick action buttons.' },
  { icon: Bell, title: 'Notifications', desc: 'Instant alerts for deposits, withdrawals, approvals & broadcasts.' },
  { icon: MessageSquare, title: 'Messaging', desc: 'Direct communication with admin for support & queries.' },
  { icon: Bot, title: 'AI Chatbot', desc: 'Ask anything — from balance checks to general knowledge.' },
]

const adminFeatures = [
  { icon: UserCheck, title: 'User Management', desc: 'Approve, manage, and monitor all registered members.' },
  { icon: FileText, title: 'Transaction Control', desc: 'Review, approve or reject deposits & withdrawal requests.' },
  { icon: Radio, title: 'Broadcast System', desc: 'Send priority notifications to all members instantly.' },
  { icon: Bot, title: 'AI Configuration', desc: 'Manage OpenRouter API keys and AI service settings.' },
]

const steps = [
  { step: '01', title: 'Sign Up', desc: 'Create your account with basic details. Get a unique member ID.' },
  { step: '02', title: 'Get Approved', desc: 'Admin reviews and approves your membership.' },
  { step: '03', title: 'Start Transacting', desc: 'Deposit, withdraw, and manage your funds securely.' },
  { step: '04', title: 'Grow Together', desc: 'Access AI tools, analytics, and community support.' },
]

export default function Index() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100])
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div ref={containerRef} className="min-h-screen landing-gradient text-white overflow-x-hidden">
      {/* Floating Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="orb orb-purple w-[500px] h-[500px] -top-40 -left-40" />
        <div className="orb orb-orange w-[400px] h-[400px] top-1/3 -right-32" style={{ animationDelay: '2s' }} />
        <div className="orb orb-blue w-[350px] h-[350px] bottom-20 left-1/4" style={{ animationDelay: '4s' }} />
        <div className="orb orb-purple w-[300px] h-[300px] bottom-1/3 right-1/4" style={{ animationDelay: '6s' }} />
        <div className="grid-bg absolute inset-0 opacity-30" />
      </div>

      {/* ===== NAVIGATION ===== */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 glass-nav"
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Wallet className="h-8 w-8 text-amber-400 group-hover:text-amber-300 transition-colors" />
              <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl group-hover:bg-amber-400/30 transition-all" />
            </div>
            <span className="text-2xl font-bold gradient-text-gold">DenBayar</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-300 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-amber-500 group-hover:w-3/4 transition-all duration-300 rounded-full" />
              </motion.a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" asChild className="text-white/80 hover:text-white hover:bg-white/10 border border-white/10">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white border-0 shadow-lg shadow-purple-500/25">
              <Link to="/signup">
                <Sparkles className="h-4 w-4 mr-1" />
                Get Started
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-white/80 hover:text-white p-2">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-white/10"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                  {link.label}
                </a>
              ))}
              <div className="flex gap-2 pt-2 border-t border-white/10 mt-2">
                <Button variant="ghost" asChild className="flex-1 text-white/80 hover:text-white border border-white/10">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild className="flex-1 bg-gradient-to-r from-purple-600 to-amber-500 text-white border-0">
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.header>

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <motion.div style={{ y: heroY }} className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-amber-300">
              <Zap className="h-4 w-4" />
              Trusted Fund Management Platform
              <ChevronRight className="h-4 w-4" />
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6"
          >
            <span className="block text-white glow-text-purple">Your Trusted</span>
            <span className="block gradient-text text-6xl md:text-8xl lg:text-9xl">Fund Management</span>
            <span className="block gradient-text-gold">Community</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Manage, save & grow your finances with DenBayar. Secure deposits, easy withdrawals,
            AI-powered assistance & smart financial services — all in one platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button size="lg" asChild className="bg-gradient-to-r from-purple-600 via-violet-600 to-purple-700 hover:from-purple-500 hover:via-violet-500 hover:to-purple-600 text-white px-8 py-6 text-lg rounded-xl shadow-2xl shadow-purple-500/30 border-0 group">
              <Link to="/signup">
                Get Started Free
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl bg-transparent">
              <Link to="/login">
                Member Login
              </Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {[
              { value: '100+', label: 'Active Members' },
              { value: '₹10L+', label: 'Funds Managed' },
              { value: '24/7', label: 'AI Support' },
              { value: '99.9%', label: 'Uptime' },
            ].map((stat, i) => (
              <div key={i} className="glass rounded-2xl p-4">
                <div className="text-2xl md:text-3xl font-bold gradient-text-gold">{stat.value}</div>
                <div className="text-sm text-white/50 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Hero bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[hsl(260,60%,8%)] to-transparent" />
      </section>

      {/* ===== FEATURES ===== */}
      <section id="features" className="relative py-24 z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-16"
          >
            <motion.span variants={fadeUp} custom={0} className="inline-block px-4 py-1.5 rounded-full glass text-sm font-medium text-purple-300 mb-4">
              Why Choose DenBayar?
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Powerful Features</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-white/50 text-lg max-w-2xl mx-auto">
              Everything you need for secure fund management in one beautiful platform.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-container">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={scaleIn}
                custom={i}
                className="glass-card rounded-2xl p-8 card-3d shimmer"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 shadow-lg`}>
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white/50 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" className="relative py-24 z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-16"
          >
            <motion.span variants={fadeUp} custom={0} className="inline-block px-4 py-1.5 rounded-full glass text-sm font-medium text-amber-300 mb-4">
              Getting Started
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text-gold">How It Works</span>
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="relative"
              >
                <div className="glass-card rounded-2xl p-8 text-center h-full">
                  <div className="text-5xl font-black gradient-text opacity-40 mb-4">{step.step}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-white/50">{step.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ChevronRight className="h-6 w-6 text-purple-400/50" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section id="services" className="relative py-24 z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-16"
          >
            <motion.span variants={fadeUp} custom={0} className="inline-block px-4 py-1.5 rounded-full glass text-sm font-medium text-purple-300 mb-4">
              Our Services
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Everything You Need</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-white/50 text-lg max-w-2xl mx-auto">
              Complete suite of financial tools designed for simplicity and power.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="glass-card rounded-2xl p-8 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-amber-500/20 flex items-center justify-center mb-5 group-hover:from-purple-500/30 group-hover:to-amber-500/30 transition-all">
                  <service.icon className="h-6 w-6 text-purple-300 group-hover:text-amber-300 transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECURITY ===== */}
      <section id="security" className="relative py-24 z-10">
        <div className="container mx-auto px-4">
          <div className="glass rounded-3xl p-8 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-amber-500/10 rounded-full blur-[80px]" />

            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <motion.span variants={fadeUp} custom={0} className="inline-block px-4 py-1.5 rounded-full bg-green-500/10 text-sm font-medium text-green-400 mb-4 border border-green-500/20">
                  <Lock className="h-3 w-3 inline mr-1" /> Enterprise Security
                </motion.span>
                <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-4xl font-bold mb-6">
                  Your funds are <span className="gradient-text-gold">protected</span>
                </motion.h2>
                <motion.p variants={fadeUp} custom={2} className="text-white/50 leading-relaxed mb-8">
                  DenBayar uses advanced security measures including Row Level Security, admin-verified transactions, 
                  encrypted communications, and comprehensive audit logging.
                </motion.p>
                <motion.div variants={fadeUp} custom={3} className="space-y-3">
                  {['Admin-verified transactions', 'Row Level Security (RLS)', 'Encrypted communications', 'Complete audit logging'].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                        <Star className="h-3 w-3 text-green-400" />
                      </div>
                      <span className="text-white/70 text-sm">{item}</span>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex justify-center"
              >
                <div className="relative">
                  <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-purple-600/20 to-amber-500/20 flex items-center justify-center glow-purple">
                    <Shield className="h-32 w-32 text-purple-400/60" />
                  </div>
                  <div className="absolute -top-4 -right-4 glass rounded-xl p-3 glow-orange">
                    <Lock className="h-6 w-6 text-amber-400" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 glass rounded-xl p-3 glow-purple">
                    <Zap className="h-6 w-6 text-purple-400" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ADMIN ===== */}
      <section id="admin" className="relative py-24 z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-16"
          >
            <motion.span variants={fadeUp} custom={0} className="inline-block px-4 py-1.5 rounded-full glass text-sm font-medium text-amber-300 mb-4">
              Admin Panel
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text-gold">Powerful Admin Tools</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-white/50 text-lg max-w-2xl mx-auto">
              Complete control over users, transactions, and system configuration.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {adminFeatures.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={scaleIn}
                custom={i}
                className="glass-card rounded-2xl p-8 flex gap-5"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-600/20 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="h-6 w-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{feature.title}</h3>
                  <p className="text-white/45 text-sm">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative py-24 z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass rounded-3xl p-8 md:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-transparent to-amber-500/10" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Ready to <span className="gradient-text">Get Started?</span>
              </h2>
              <p className="text-white/50 text-lg max-w-xl mx-auto mb-8">
                Join DenBayar today and take control of your financial future with our trusted community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white px-8 py-6 text-lg rounded-xl shadow-2xl shadow-purple-500/25 border-0 group">
                  <Link to="/signup">
                    Create Free Account
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl bg-transparent">
                  <Link to="/login">Sign In</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="relative z-10 border-t border-white/5 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Wallet className="h-6 w-6 text-amber-400" />
                <span className="text-xl font-bold gradient-text-gold">DenBayar</span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed">
                Your trusted fund management community. Secure, transparent, and powered by technology.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <a key={link.href} href={link.href} className="block text-white/40 hover:text-white/70 text-sm transition-colors">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Account</h4>
              <div className="space-y-2">
                <Link to="/login" className="block text-white/40 hover:text-white/70 text-sm transition-colors">Login</Link>
                <Link to="/signup" className="block text-white/40 hover:text-white/70 text-sm transition-colors">Sign Up</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 text-center">
            <p className="text-white/30 text-sm">
              © {new Date().getFullYear()} DenBayar. Created by Jahin Shahriar. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
