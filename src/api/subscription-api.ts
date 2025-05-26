import axios from "./axios-instance"

export const getSubscriptionTypes = async () => {
  const response = await axios.get("/Subscriptions")
  return response.data
}

export const getCurrentSubscription = async () => {
  const response = await axios.get("/Subscriptions/me")
  return response.data
}

export const buySubscription = async (data: { subscriptionTypeId: string }) => {
  const response = await axios.post("/Subscriptions", data)
  return response.data
}