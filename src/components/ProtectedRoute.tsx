import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Loader2 } from 'lucide-react'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading, profile } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Check if user is approved (except for profile page)
  if (profile && !profile.approved && location.pathname !== '/profile') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-foreground mb-4">Account Pending Approval</h1>
          <p className="text-muted-foreground mb-4">
            Your account is awaiting admin approval. Please check back later.
          </p>
          <p className="text-sm text-muted-foreground">
            User ID: {profile.user_id}
          </p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
