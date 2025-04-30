import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import { ScrollArea } from "./ui/scroll-area"

export function TermsConditionsDeveloperDialogueContent() {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Developer Terms & Conditions</DialogTitle>
        <DialogDescription>
          Indiego's Terms & Conditions for Game Developers
        </DialogDescription>
      </DialogHeader>
      <ScrollArea className="h-[400px] rounded-md border p-4">
        <h2 className="text-lg font-bold">Welcome, Developers</h2>
        <p>
          Indiego allows independent developers to publish their games and connect
          with a growing community of players.
        </p>

        <h3 className="font-semibold mt-4">1. Eligibility</h3>
        <p>
          You must be at least 18 years old to register as a developer on Indiego.
          All submitted information must be accurate and up to date.
        </p>

        <h3 className="font-semibold mt-4">2. Game Content Guidelines</h3>
        <p>
          Developers are strictly prohibited from uploading any content that is:
          illegal, pornographic, hateful, or violates any third-party rights. All
          games must comply with international digital content laws and platform
          standards.
        </p>

        <h3 className="font-semibold mt-4">3. Developer Responsibilities</h3>
        <p>
          Developers are responsible for the quality, integrity, and legality of
          their uploaded games and any associated news or updates. Any violations
          may result in suspension or permanent removal from the platform.
        </p>

        <h3 className="font-semibold mt-4">4. Payment and Earnings</h3>
        <p>
          Developers may earn revenue from their games. Payouts are made via PayPal
          only. To receive payments, you must provide all required and accurate information.
          Payment calculations, revenue splits, and further details can be requested directly
          from the admin team.
        </p>

        <h3 className="font-semibold mt-4">5. Account Verification</h3>
        <p>
          All developer accounts must be verified. Indiego reserves the right to
          reject or suspend accounts with suspicious or invalid credentials.
        </p>

        <h3 className="font-semibold mt-4">6. Updates and Announcements</h3>
        <p>
          Developers are encouraged to post news and updates responsibly. Spam,
          false advertising, or misleading content is not allowed.
        </p>
      </ScrollArea>
    </>

  )
}
