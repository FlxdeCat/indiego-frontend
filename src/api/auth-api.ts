import { User } from "@/types/user"
import axios from "./axios-instance"

export const registerApi = async (user: Partial<User>) => {
  const response = await axios.post("/Users", user)
  return response.data
}

export const loginApi = async (user: Partial<User>) => {
  const response = await axios.post("/Users/login", user)
  return response.data
}
