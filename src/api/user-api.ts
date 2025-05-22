import { User } from "@/types/user"
import axios from "./axios-instance"

export const getUsers = async (): Promise<User[]> => {
  const response = await axios.get("/Users")
  return response.data
}

export const getProfile = async (): Promise<User> => {
  const response = await axios.get("/Users/me")
  return response.data
}

export const createUser = async (user: Partial<User>) => {
  const response = await axios.post("/Users", user)
  return response.data
}
