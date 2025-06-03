import { Developer } from "@/types/developer"
import axios from "./axios-instance"

export const becomeNewDeveloper = async (data: { devName: string, fullName: string, taxId: string, country: string }) => {
  const response = await axios.post("/Users/developer", data)
  return response.data
}

export const getDeveloper = async (data: { id: string }) => {
  const response = await axios.get("/Users/developer", {
    params: data
  })
  return response.data
}

export const updateDeveloper = async (developer: Partial<Developer>) => {
  const response = await axios.put("/Users/developer", developer)
  return response.data
}