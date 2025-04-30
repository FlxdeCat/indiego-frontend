import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import { ScrollArea } from "./ui/scroll-area"

export function TermsConditionsDialogueContent() {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Terms & Conditions</DialogTitle>
        <DialogDescription>
          Indiego's Terms & Conditions
        </DialogDescription>
      </DialogHeader>
      <ScrollArea className="h-[400px] rounded-md border p-4">
        <h2 className="text-lg font-bold">Welcome to Indiego</h2>
        <p>Indiego is a platform where users can browse and play games published by indie developers.</p>
        <h3 className="font-semibold mt-4">1. Age Requirement</h3>
        <p>You must be at least 13 years old to create an account.</p>
        <h3 className="font-semibold mt-4">2. Subscriptions</h3>
        <p>Users can purchase a subscription to receive a personalized recommendation bundle of games every week.</p>
        <h3 className="font-semibold mt-4">3. User Responsibilities</h3>
        <p>Users must comply with community guidelines and respect the developers.</p>
        <h3 className="font-semibold mt-4">4. Payment & Refunds</h3>
        <p>Payments are exclusively processed through PayPal. Subscriptions are refundable, subject to certain conditions and eligibility criteria.</p>
      </ScrollArea>
    </>
  )
}
