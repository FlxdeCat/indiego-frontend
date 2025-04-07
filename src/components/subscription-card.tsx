import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "./ui/button"

export interface SubscriptionTier {
  title: string
  desc: string
  details: string[]
  price: number
}

interface SubscriptionCardProps {
  auth: boolean
  bought: boolean
  tier: SubscriptionTier
}

export function SubscriptionCard({ auth, bought, tier }: SubscriptionCardProps) {
  return (
    <Card className={`max-w-sm flex flex-col border-2 ${bought && "border-primary"}`}>
      <CardHeader>
        <CardTitle className="text-xl">{tier.title} <span className="text-base text-primary">{bought && "(Current Subscription)"}</span></CardTitle>
        <CardDescription>{tier.desc}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 mb-8">
        <ul className="list-disc list-inside space-y-1 text-base">
          {tier.details.map((detail, index) => (<li key={index}>{detail}</li>))}
        </ul>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 justify-around items-center">
        {auth ? bought ?
          <Button variant="destructive">Cancel Subscription</Button> :
          <Button className="text-white">Subscribe for ${tier.price}</Button> :
          <div className="cursor-not-allowed">
            <Button disabled className="text-white">Login to Subscribe for ${tier.price}</Button>
          </div>
        }
      </CardFooter>
    </Card>
  )
}
