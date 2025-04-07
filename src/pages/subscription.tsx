import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { SubscriptionCard, SubscriptionTier } from "@/components/subscription-card"

function Subscription() {

  const tiers: SubscriptionTier[] = [
    {
      title: "Basic",
      desc: "Perfect for casual supporters",
      details: [
        "Game recommendations for 7 days",
        "Based on popularity and high ratings",
        "Includes some randomized picks for variety"
      ],
      price: 2
    },
    {
      title: "Pro",
      desc: "For regular players & supporters",
      details: [
        "Game recommendations for 30 days",
        "More focus on top-rated indie games",
        "Less randomness for more consistent picks"
      ],
      price: 5
    },
    {
      title: "Premium",
      desc: "The ultimate supporter tier",
      details: [
        "Game recommendations for 90 days",
        "Weighted mix of top-rated & rising titles",
        "Occasional hidden gems surfaced smartly"
      ],
      price: 12
    }
  ]

  const auth = true // TEMP
  const curr_tier = "Basic" // TEMP

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
            {tiers.map((tier, index) => (<SubscriptionCard key={index} auth={auth} bought={auth && curr_tier === tier.title} tier={tier} />))}
          </div>
        </div>
      </main >
      <Footer />
    </div >
  )
}

export default Subscription
