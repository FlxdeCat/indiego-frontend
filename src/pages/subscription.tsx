import { getCurrentSubscription, getSubscriptionTypes } from "@/api/subscription-api"
import { Footer } from "@/components/footer"
import { LoadingIcon } from "@/components/loading-icon"
import { Navbar } from "@/components/navbar"
import { SubscriptionCard } from "@/components/subscription-card"
import { useAuth } from "@/context/auth-context"
import { SubscriptionTier } from "@/types/subscription"
import { useEffect, useState } from "react"
import { toast } from "sonner"

function Subscription() {

  const [tiers, setTiers] = useState<SubscriptionTier[]>([])
  const [currTier, setCurrTier] = useState<string>("")
  const [loading, setLoading] = useState(false)

  const { isAuthenticated } = useAuth()

  async function getTiersAndCurrent() {
    setLoading(true)

    try {
      const subscriptionTierResponse = await getSubscriptionTypes()
      setTiers(subscriptionTierResponse)
      if (isAuthenticated) {
        const currentTierResponse = await getCurrentSubscription()
        if (currentTierResponse && currentTierResponse[0]) setCurrTier(currentTierResponse[0].subscriptionTypeId)
      }
    } catch (err: any) {
      console.log(err)
      toast.error(err.message || "Fetch subscription failed. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated !== undefined) {
      getTiersAndCurrent()
    }
  }, [isAuthenticated])

  return (
    <div className="m-0 p-0 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex flex-col h-full items-center justify-between flex-1 mx-11">
        <div className="flex flex-col items-center justify-center gap-8 mt-8 xl:mt-20 mb-8">
          <h1 className="text-4xl xl:text-5xl text-center font-bold">
            Subscribe to Support Indie Developers
          </h1>
          <div className="text-lg xl:text-xl text-center">
            Indiego is built for creators by creators. Your subscription helps keep the platform alive, supports independent developers, and unlocks exclusive recommendations for you.
          </div>
        </div>
        <div className="flex flex-grow items-center justify-center mb-4">
          <div className="flex flex-wrap justify-center gap-8">
            {loading ? (
              <LoadingIcon size={50} className="text-primary" />
            ) : (tiers.map((tier, index) => (<SubscriptionCard key={index} bought={isAuthenticated && currTier === tier.id} tier={tier} />)))}
          </div>
        </div>
      </main >
      <Footer />
    </div >
  )
}

export default Subscription
