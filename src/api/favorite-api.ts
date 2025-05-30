import axios from "./axios-instance"

export const getFavorites = async () => {
  const response = await axios.get("/Games/favorite/")
  return response.data
}

export const favoriteGame = async (gameId: string) => {
  const response = await axios.post(`/Games/favorite/${gameId}`)
  return response.data
}

export const unfavoriteGame = async (gameId: string) => {
  const response = await axios.post(`/Games/unfavorite/${gameId}`)
  return response.data
}