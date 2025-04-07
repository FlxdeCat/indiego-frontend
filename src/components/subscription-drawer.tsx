import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { SubscriptionTier } from "./subscription-card"
import { Separator } from "./ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "./ui/scroll-area"

export function SubscriptionDrawer({ tier }: { tier: SubscriptionTier }) {
  return (
    <Drawer>
      <DrawerTrigger className="text-white text-sm font-semibold bg-primary py-2 px-4 rounded-md outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] shadow-xs hover:bg-primary/90">
        Subscribe for ${tier.price}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-3xl">Subscribe to {tier.title} Package</DrawerTitle>
          <DrawerDescription className="text-lg">
            Unlock all features available in the {tier.title} plan with a single payment.
          </DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="h-full w-full">
          <div className="flex flex-col lg:flex-row justify-center items-center h-full gap-8 p-8 pb-16">
            <div className="w-md xl:w-lg space-y-4">
              <div className="flex justify-between">
                <span className="font-medium">Subscription</span>
                <span>{tier.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Price</span>
                <span>${tier.price}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${tier.price}</span>
              </div>
            </div>

            <Separator orientation="vertical" />

            <div className="w-md xl:w-lg space-y-4">
              <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input id="card-number" placeholder="1234 5678 9012 3456" />
              </div>

              <div className="flex gap-4">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="expiry">Expiry</Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms" className="text-sm leading-none">
                  I agree to the terms and conditions
                </Label>
              </div>

              <Button className="w-full">Confirm Payment</Button>
            </div>
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  )
}
