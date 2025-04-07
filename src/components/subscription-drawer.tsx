import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { SubscriptionTier } from "./subscription-card"

export function SubscriptionDrawer({ tier }: { tier: SubscriptionTier }) {
  return (
    <Drawer>
      <DrawerTrigger className="text-white text-sm font-semibold bg-primary py-2 px-4 rounded-md outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] shadow-xs hover:bg-primary/90">
        Subscribe for ${tier.price}
      </DrawerTrigger>
      <DrawerContent className="h-[50vh]">
        <DrawerHeader>
          <DrawerTitle className="text-3xl">Subscribe to {tier.title} Package</DrawerTitle>
          <DrawerDescription className="text-lg">Make sure to read the Terms & Conditons before purchasing.</DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  )
}