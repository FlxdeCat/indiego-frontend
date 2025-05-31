import { User } from "@/types/user"
import axios from "./axios-instance"

export const updateUser = async (user: Partial<User>) => {
  const response = await axios.put("/Users", user)
  return response.data
}

export const getDeveloperDownload = async () => {
  const response = await axios.get("/Users/download")
  return response.data
}