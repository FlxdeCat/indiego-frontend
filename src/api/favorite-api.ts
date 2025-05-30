import { Game } from "@/types/game"
import axios from "./axios-instance"
import JSZip from "jszip"

export const getFavorites = async () => {
  const response = await axios.get("/Games/favorites/")

  const favorites = response.data

  const enhancedFavorites = await Promise.all(
    favorites.map(async (favorite: Game) => {
      const [imageRes, userRes] = await Promise.all([
        axios.get(`/Games/image/${favorite.id}`, { responseType: "blob" }),
        axios.get("/Users/developer", {
          params: { id: favorite.userId },
        })
      ])

      const zip = await JSZip.loadAsync(imageRes.data)
      const files = Object.values(zip.files)
      const firstFile = files[0]

      if (!firstFile) throw new Error("ZIP is empty or corrupted")

      const extension = firstFile.name.split(".").pop() || "jpg"
      const mimeType = {
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        png: "image/png",
        webp: "image/webp",
        gif: "image/gif",
      }[extension.toLowerCase()] || "application/octet-stream"

      const fileContent = await firstFile.async("blob")
      const imageFile = new File([fileContent], firstFile.name, {
        type: mimeType,
      })

      const genreResponses = await Promise.all(
        favorite.genreIds.map((genreId) =>
          axios.get("/Genres", { params: { id: genreId } })
        )
      )

      const genres = genreResponses.map((res) => res.data[0]?.name).filter(Boolean)

      return {
        ...favorite,
        cover: imageFile,
        devName: userRes.data[0].devName,
        genres,
      }
    })
  )

  return enhancedFavorites
}

export const favoriteGame = async (gameId: string) => {
  const response = await axios.post(`/Games/favorite/${gameId}`)
  return response.data
}

export const unfavoriteGame = async (gameId: string) => {
  const response = await axios.post(`/Games/unfavorite/${gameId}`)
  return response.data
}