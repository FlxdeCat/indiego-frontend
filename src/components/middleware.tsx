import { useAuth } from "@/context/auth-context"
import Loading from "@/pages/loading"
import { Role } from "@/types/user"
import { ReactNode } from "react"
import { Navigate, useLocation } from "react-router-dom"

type Props = {
  children: ReactNode
  allowedRoles?: (Role)[]
}

export const RedirectIfAuthenticated = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) return <Loading />

  if (isAuthenticated) return <Navigate to="/" replace />

  return <>{children}</>
}

export const RequireAuth = ({ children, allowedRoles }: Props) => {
  const { user, isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) return <Loading />

  if (!isAuthenticated) return <Navigate to="/auth" state={{ from: location }} replace />

  if (allowedRoles && (!user || !allowedRoles.includes(user.role))) return <Navigate to="/" replace />

  return <>{children}</>
}
