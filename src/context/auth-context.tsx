import {
  createContext,
  useContext,
  useEffect,
  ReactNode,
} from "react"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { User } from "@/types/user"
import axios from "@/api/axios-instance"

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    isLoading,
    isError,
    refetch,
  } = useQuery<User, Error>({
    queryKey: ["me"],
    queryFn: async () => {
      const token = localStorage.getItem("access_token")
      if (!token) {
        throw new Error("No access token found")
      }
      const res = await axios.get("/Users/me")
      const { token: newToken, user } = res.data

      if (newToken) {
        localStorage.setItem("access_token", newToken)
      }

      return user
    },
    enabled: !!localStorage.getItem("access_token"),
    staleTime: 1000 * 60 * 5,
    retry: false,
    onError: (error: Error) => {
      console.error("Auth query error:", error)
      localStorage.removeItem("access_token")
    },
  } as UseQueryOptions<User, Error, User>)

  useEffect(() => {
    const token = localStorage.getItem("access_token")
    if (token) {
      refetch()
    }
  }, [])

  const login = (token: string) => {
    localStorage.setItem("access_token", token)
    refetch()
  }

  const logout = () => {
    localStorage.removeItem("access_token")
    window.location.href = "/auth"
  }

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        isAuthenticated: !!user && !isError,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
