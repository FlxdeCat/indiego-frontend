export type Role = "user" | "developer" | "admin"

export interface User {
  id: string
  name: string
  email: string
  role: Role
}