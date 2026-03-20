import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Wallet,
  LayoutDashboard,
  ArrowDownCircle,
  ArrowUpCircle,
  User,
  Bell,
  MessageSquare,
  Bot,
  LogOut,
  Users,
  FileText,
  Radio,
  ClipboardList,
  Home,
} from 'lucide-react'

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const { profile, isAdmin, signOut } = useAuth()
  const location = useLocation()

  const userNavItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/deposit', label: 'Deposit', icon: ArrowDownCircle },
    { path: '/withdraw', label: 'Withdraw', icon: ArrowUpCircle },
    { path: '/notifications', label: 'Notifications', icon: Bell },
    { path: '/messages', label: 'Messages', icon: MessageSquare },
    { path: '/chat', label: 'AI Assistant', icon: Bot },
  ]

  const adminNavItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/users', label: 'Users', icon: Users },
    { path: '/admin/transactions', label: 'Transactions', icon: FileText },
    { path: '/admin/broadcast', label: 'Broadcast', icon: Radio },
    { path: '/admin/ai-config', label: 'AI Config', icon: Bot },
    { path: '/admin/logs', label: 'Logs', icon: ClipboardList },
  ]

  const navItems = isAdmin ? adminNavItems : userNavItems

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="min-h-screen landing-gradient text-white">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="orb orb-purple w-[400px] h-[400px] -top-32 -right-32 opacity-20" />
        <div className="orb orb-orange w-[300px] h-[300px] bottom-20 -left-20 opacity-20" style={{ animationDelay: '3s' }} />
        <div className="grid-bg absolute inset-0 opacity-10" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 glass-nav">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link to={isAdmin ? '/admin' : '/dashboard'} className="flex items-center gap-2 group">
            <div className="relative">
              <Wallet className="h-7 w-7 text-amber-400 group-hover:text-amber-300 transition-colors" />
              <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl" />
            </div>
            <span className="text-xl font-bold gradient-text-gold">DenBayar</span>
            {isAdmin && (
              <span className="ml-2 text-xs bg-gradient-to-r from-purple-600 to-amber-500 text-white px-2 py-0.5 rounded-full">
                Admin
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Button
                  key={item.path}
                  variant="ghost"
                  size="sm"
                  asChild
                  className={`text-white/70 hover:text-white hover:bg-white/10 ${isActive ? 'bg-white/10 text-white' : ''}`}
                >
                  <Link to={item.path}>
                    <Icon className="h-4 w-4 mr-1" />
                    {item.label}
                  </Link>
                </Button>
              )
            })}
          </nav>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-white/10">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gradient-to-br from-purple-600 to-amber-500 text-white font-bold">
                    {profile?.name ? getInitials(profile.name) : 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 glass border-white/10 text-white" align="end">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">{profile?.name}</p>
                  <p className="text-xs text-white/50">{profile?.user_id}</p>
                </div>
              </div>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem asChild className="text-white/80 hover:text-white focus:text-white focus:bg-white/10">
                <Link to="/profile">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              {isAdmin && (
                <DropdownMenuItem asChild className="text-white/80 hover:text-white focus:text-white focus:bg-white/10">
                  <Link to="/dashboard">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    User View
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem onClick={signOut} className="text-red-400 hover:text-red-300 focus:text-red-300 focus:bg-red-500/10">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex overflow-x-auto px-4 pb-2 gap-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Button
                key={item.path}
                variant="ghost"
                size="sm"
                className={`shrink-0 text-white/70 hover:text-white hover:bg-white/10 ${isActive ? 'bg-white/10 text-white' : ''}`}
                asChild
              >
                <Link to={item.path}>
                  <Icon className="h-4 w-4 mr-1" />
                  {item.label}
                </Link>
              </Button>
            )
          })}
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 relative z-10">
        {children}
      </main>
    </div>
  )
}
