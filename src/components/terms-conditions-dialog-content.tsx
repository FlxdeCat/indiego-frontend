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
        <p>
          Indiego is a platform where users can browse and play games published by indie developers. By using Indiego, you agree to the following terms.
        </p>

        <h3 className="font-semibold mt-4">1. Age Requirement</h3>
        <p>
          You must be at least 13 years old to create an account. Users under 18 may require parental or guardian consent to access certain features.
        </p>

        <h3 className="font-semibold mt-4">2. Subscriptions</h3>
        <p>
          Users can purchase a subscription to receive a personalized recommendation bundle of games every week.
        </p>

        <h3 className="font-semibold mt-4">3. User Responsibilities</h3>
        <p>
          Users must comply with community guidelines, respect other users and developers, and refrain from abusive or inappropriate behavior.
        </p>

        <h3 className="font-semibold mt-4">4. Payment & Refunds</h3>
        <p>
          Payments are exclusively processed through PayPal. Subscriptions are refundable, subject to specific conditions and eligibility criteria.
        </p>

        <h3 className="font-semibold mt-4">5. Reviews and Feedback</h3>
        <p>
          Users may leave reviews and ratings on games. Feedback must be respectful, constructive, and free from offensive language or personal attacks.
        </p>

        <h3 className="font-semibold mt-4">6. Account Suspension & Termination</h3>
        <p>
          Indiego may suspend or delete accounts found to be in violation of these terms, including abuse, fraud, or distribution of prohibited content.
        </p>

        <h3 className="font-semibold mt-4">7. Content Access and Availability</h3>
        <p>
          Access to games, features, or services may change over time due to licensing, developer requests, or technical issues. Indiego is not responsible for lost access to removed content.
        </p>

        <h3 className="font-semibold mt-4">8. Privacy and Data</h3>
        <p>
          Your information is handled in accordance with our Privacy Policy. We do not sell personal data. Please ensure your email and profile information are accurate to receive important updates.
        </p>
      </ScrollArea>
    </>
  )
}
