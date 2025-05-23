import { User } from "@/types/user"
import axios from "./axios-instance"

export const updateUser = async (user: Partial<User>) => {
  const response = await axios.put("/Users", user)
  return response.data
}
