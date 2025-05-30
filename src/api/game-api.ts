import { Game } from "@/types/game"
import JSZip from "jszip"
import axios from "./axios-instance"

export const getAllGames = async () => {
  const gamesResponse = await axios.get("/Games")

  const games = gamesResponse.data

  const enhancedGames = await Promise.all(
    games.map(async (game: Game) => {
      const [imageRes, userRes] = await Promise.all([
        axios.get(`/Games/image/${game.id}`, { responseType: "blob" }),
        axios.get("/Users/developer", {
          params: { id: game.userId },
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
        game.genreIds.map((genreId) =>
          axios.get("/Genres", { params: { id: genreId } })
        )
      )

      const genres = genreResponses.map((res) => res.data[0]?.name).filter(Boolean)

      return {
        ...game,
        cover: imageFile,
        devName: userRes.data[0].devName,
        genres,
      }
    })
  )

  return enhancedGames
}

export const getSelfGames = async (data: { userId: string }) => {
  const gamesResponse = await axios.get("/Games", {
    params: data,
  })

  const games = gamesResponse.data

  const enhancedGames = await Promise.all(
    games.map(async (game: Game) => {
      const [imageRes, userRes] = await Promise.all([
        axios.get(`/Games/image/${game.id}`, { responseType: "blob" }),
        axios.get("/Users/developer", {
          params: { id: game.userId },
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
        game.genreIds.map((genreId) =>
          axios.get("/Genres", { params: { id: genreId } })
        )
      )

      const genres = genreResponses.map((res) => res.data[0]?.name).filter(Boolean)

      return {
        ...game,
        cover: imageFile,
        devName: userRes.data[0].devName,
        genres,
      }
    })
  )

  return enhancedGames
}

export const getGame = async (data: { id: string }) => {
  const gameResponse = await axios.get("/Games", {
    params: data,
  })

  const game: Game = gameResponse.data[0]

  const [imageRes, userRes, fileRes] = await Promise.all([
    axios.get(`/Games/image/${game.id}`, { responseType: "blob" }),
    axios.get("/Users/developer", {
      params: { id: game.userId },
    }),
    axios.get(`/Games/${game.id}`, { responseType: "blob" }),
  ])

  const zip = await JSZip.loadAsync(imageRes.data)
  const files = Object.values(zip.files).filter((file) => !file.dir)

  if (files.length === 0) throw new Error("ZIP is empty or corrupted")

  const coverFile = files[0]
  const coverContent = await coverFile.async("blob")
  const coverExtension = coverFile.name.split(".").pop() || "jpg"
  const coverMime = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
    gif: "image/gif",
  }[coverExtension.toLowerCase()] || "application/octet-stream"

  const cover = new File([coverContent], coverFile.name, {
    type: coverMime,
  })

  const bannerFiles = files.slice(1)

  const banners: File[] = await Promise.all(
    bannerFiles.map(async (file) => {
      const content = await file.async("blob")
      const ext = file.name.split(".").pop() || "jpg"
      const mime = {
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        png: "image/png",
        webp: "image/webp",
        gif: "image/gif",
      }[ext.toLowerCase()] || "application/octet-stream"

      return new File([content], file.name, { type: mime })
    })
  )

  const genreResponses = await Promise.all(
    game.genreIds.map((genreId) =>
      axios.get("/Genres", { params: { id: genreId } })
    )
  )
  const genres = genreResponses.map((res) => res.data[0]?.name).filter(Boolean)

  const contentType = fileRes.headers["content-type"] || "application/octet-stream"
  const extensionMap: Record<string, string> = {
    "application/zip": "zip",
    "application/x-rar-compressed": "rar",
    "application/x-7z-compressed": "7z",
    "application/vnd.android.package-archive": "apk",
    "application/x-msdownload": "exe",
  }
  const extension = extensionMap[contentType] || "bin"
  const gameFileName = `${game.name}.${extension}`
  const file = new File([fileRes.data], gameFileName, {
    type: contentType,
  })

  return {
    ...game,
    cover,
    banners,
    devName: userRes.data[0].devName,
    genres,
    file
  }
}

export const uploadGame = async (data: { name: string, description: string, genreIds: string[], link: string }, cover: File, banners: File[], file: File) => {
  const gameResponse = await axios.post("/Games", data)
  const game = gameResponse.data
  const gameId = game.id

  const gameFilesForm = new FormData()
  gameFilesForm.append("file", file)

  await axios.post(`/Games/upload/${gameId}`, gameFilesForm, {
    headers: { "Content-Type": "multipart/form-data" }
  })

  const allImages = [cover, ...banners]
  const imageForm = new FormData()
  allImages.forEach(img => {
    imageForm.append("files", img)
  })

  await axios.post(`/Games/image/upload/${gameId}`, imageForm, {
    headers: { "Content-Type": "multipart/form-data" }
  })

  return game
}

export const updateGame = async (id: string, data: { name: string, description: string, genreIds: string[], link: string }, cover: File, banners: File[], file: File) => {
  const gameResponse = await axios.put(`/Games/${id}`, data)
  const game = gameResponse.data
  const gameId = game.id

  const gameFilesForm = new FormData()
  gameFilesForm.append("file", file)

  await axios.post(`/Games/upload/${gameId}`, gameFilesForm, {
    headers: { "Content-Type": "multipart/form-data" }
  })

  const allImages = [cover, ...banners]
  const imageForm = new FormData()
  allImages.forEach(img => {
    imageForm.append("files", img)
  })

  await axios.post(`/Games/image/upload/${gameId}`, imageForm, {
    headers: { "Content-Type": "multipart/form-data" }
  })

  return game
}

export const deleteGames = async (gameId: string) => {
  const gameResponse = await axios.delete(`/Games/${gameId}`)
  return gameResponse.data
}
