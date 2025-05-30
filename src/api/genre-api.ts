import axios from "./axios-instance"

export const getGenres = async () => {
  const response = await axios.get("/Genres")
  return response.data
}

export const postGenre = async (data: { name: string }) => {
  const response = await axios.post("/Genres", data)
  return response.data
}