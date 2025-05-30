import { Review } from "@/types/review"
import axios from "./axios-instance"

export const getAllReviews = async () => {
  const response = await axios.get("/Reviews")

  const reviews = response.data

  const enhancedReviews = await Promise.all(
    reviews.map(async (review: Review) => {
      const [userRes, gameRes] = await Promise.all([
        axios.get("/Users", {
          params: { id: review.userId },
        }),
        axios.get("/Games", {
          params: { id: review.gameId },
        })
      ])

      return {
        ...review,
        username: userRes.data[0].name,
        gameName: gameRes.data[0].name
      }
    })
  )

  return enhancedReviews
}

export const getGameReviews = async (data: { gameId: string }) => {
  const response = await axios.get("/Reviews", {
    params: data,
  })

  const reviews = response.data

  const enhancedReviews = await Promise.all(
    reviews.map(async (review: Review) => {
      const userRes = await axios.get("/Users", {
        params: { id: review.userId },
      })

      return {
        ...review,
        username: userRes.data[0].name,
      }
    })
  )

  return enhancedReviews
}

export const postReview = async (gameId: string, data: { text: string, rating: number }) => {
  const response = await axios.post(`/Reviews/${gameId}`, data)
  return response.data
}

export const deleteReview = async (reviewId: string) => {
  const response = await axios.delete(`/Reviews/${reviewId}`)
  return response.data
}