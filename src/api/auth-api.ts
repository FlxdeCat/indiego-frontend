import axios from "./axios-instance"

export const registerApi = async (data: { name: string, email: string, password: string, birthDate: string }) => {
  const response = await axios.post("/Users", data)
  return response.data
}

export const loginApi = async (data: { email: string, password: string }) => {
  const response = await axios.post("/Users/login", data)
  return response.data
}
