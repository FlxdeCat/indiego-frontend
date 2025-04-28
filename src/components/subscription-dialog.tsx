import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { SubscriptionTier } from "./subscription-card"
import { toast } from "sonner"

export function SubscriptionDialog({ tier }: { tier: SubscriptionTier }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Cancel Subscription</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure to cancel the {tier.title} Subscription?</AlertDialogTitle>
          <AlertDialogDescription>
            Your request will be reviewed by our administrators and processed within 2-3 business days. Approval or rejection will be determined in accordance with our Terms and Conditions.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => toast.info("Your request has been submitted", {
            description: "Please wait 2-3 business days for the result of your request.",
          })}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
