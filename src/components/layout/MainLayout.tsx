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
  Settings,
  Users,
  FileText,
  Radio,
  ClipboardList,
} from 'lucide-react'

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const { profile, isAdmin, signOut } = useAuth()
  const location = useLocation()

  const userNavItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/deposit', label: 'Deposit', icon: ArrowDownCircle },
    { path: '/withdraw', label: 'Withdraw', icon: ArrowUpCircle },
    { path: '/notifications', label: 'Notifications', icon: Bell },
    { path: '/messages', label: 'Messages', icon: MessageSquare },
    { path: '/chat', label: 'AI Assistant', icon: Bot },
  ]

  const adminNavItems = [
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link to={isAdmin ? '/admin' : '/dashboard'} className="flex items-center gap-2">
            <Wallet className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">DenBayar</span>
            {isAdmin && (
              <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">
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
                  variant={isActive ? "secondary" : "ghost"}
                  size="sm"
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

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {profile?.name ? getInitials(profile.name) : 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">{profile?.name}</p>
                  <p className="text-xs text-muted-foreground">{profile?.user_id}</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              {isAdmin && (
                <DropdownMenuItem asChild>
                  <Link to="/dashboard">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    User View
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={signOut} className="text-destructive">
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
                variant={isActive ? "secondary" : "ghost"}
                size="sm"
                className="shrink-0"
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
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  )
}
