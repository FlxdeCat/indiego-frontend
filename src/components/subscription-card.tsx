import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "./ui/button"
import { SubscriptionDrawer } from "./subscription-drawer"
import { SubscriptionTier } from "@/types/subscription"
import { useAuth } from "@/context/auth-context"
import { formatIDRCurrency } from "@/utils/utils"

interface SubscriptionCardProps {
  bought: boolean
  tier: SubscriptionTier
}

export function SubscriptionCard({ bought, tier }: SubscriptionCardProps) {

  const { isAuthenticated } = useAuth()

  return (
    <Card className={`max-w-sm flex flex-col border-2 ${bought && "border-primary"}`}>
      <CardHeader>
        <CardTitle className="text-2xl">{tier.name} <span className="text-lg text-primary">{bought && "(Current Subscription)"}</span></CardTitle>
        <CardDescription className="text-base">{tier.shortDescription}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 mb-8">
        <ul className="list-disc list-inside space-y-1 text-base">
          {tier.description.split("\n").map((detail, index) => (<li key={index}>{detail}</li>))}
        </ul>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 justify-around items-center">
        {isAuthenticated ? bought ?
          <div className="cursor-not-allowed">
            <Button disabled className="text-white">Subscribe for {formatIDRCurrency(tier.price)}</Button>
          </div> :
          <SubscriptionDrawer tier={tier} /> :
          <div className="cursor-not-allowed">
            <Button disabled className="text-white">Login to Subscribe for {formatIDRCurrency(tier.price)}</Button>
          </div>
        }
      </CardFooter>
    </Card>
  )
}
