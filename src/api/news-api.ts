import { News } from "@/types/news"
import axios from "./axios-instance"

export const postNews = async (data: { title: string, text: string }, image: File) => {
  const postResponse = await axios.post("/Posts", data)
  const postId = postResponse.data?.id
  if (!postId) {
    throw new Error("Post ID not returned")
  }

  const formData = new FormData()
  formData.append("file", image)
  await axios.post(`/Posts/upload/${postId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  return postResponse.data
}

export const updateNews = async (postId: string, data: { title: string, text: string }, image: File) => {
  const postResponse = await axios.put(`/Posts/${postId}`, data)

  const formData = new FormData()
  formData.append("file", image)
  await axios.post(`/Posts/upload/${postId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  return postResponse.data
}

export const deleteNews = async (postId: string) => {
  const postResponse = await axios.delete(`/Posts/${postId}`)
  return postResponse.data
}

export const getNews = async () => {
  const postsResponse = await axios.get("/Posts")

  const posts = postsResponse.data

  const enhancedPosts = await Promise.all(
    posts.map(async (post: News) => {
      const [imageRes, userRes] = await Promise.all([
        axios.get(`/Posts/image/${post.id}`, { responseType: "blob" }),
        axios.get("/Users/developer", {
          params: { id: post.userId },
        })
      ])

      const mimeType = imageRes.headers["content-type"]
      const extension = mimeType?.split("/")[1] || "jpg"

      const imageFile = new File([imageRes.data], `image.${extension}`, {
        type: mimeType,
      })

      return {
        ...post,
        image: imageFile,
        devName: userRes.data[0].devName,
      }
    })
  )

  return enhancedPosts
}

export const getSelfNews = async (data: { userId: string }) => {
  const postsResponse = await axios.get("/Posts", {
    params: data,
  })

  const posts = postsResponse.data

  const enhancedPosts = await Promise.all(
    posts.map(async (post: News) => {
      const [imageRes, userRes] = await Promise.all([
        axios.get(`/Posts/image/${post.id}`, { responseType: "blob" }),
        axios.get("/Users/developer", {
          params: { id: post.userId },
        })
      ])

      const mimeType = imageRes.headers["content-type"]
      const extension = mimeType?.split("/")[1] || "jpg"

      const imageFile = new File([imageRes.data], `image.${extension}`, {
        type: mimeType,
      })

      return {
        ...post,
        image: imageFile,
        devName: userRes.data[0].devName,
      }
    })
  )

  return enhancedPosts
}