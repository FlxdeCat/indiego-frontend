export type Role = "Customer" | "Developer" | "Admin"

export interface User {
  id: string
  name: string
  email: string
  password: string
  role: Role
  birthDate: string
}