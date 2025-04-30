import { useState } from "react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { NewDeveloper } from "./new-developer"

export function DevJoinMessage() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <Alert className="bg-primary flex flex-col gap-2 relative p-4 mt-4">
      <button
        className="absolute top-4 right-4 text-white hover:text-gray-300"
        onClick={() => setVisible(false)}
      >
        <X size={24} />
      </button>

      <AlertTitle className="text-white line-clamp-none pr-6 text-lg sm:text-xl md:text-2xl">
        Become a Game Developer and Earn Revenue!
      </AlertTitle>
      <AlertDescription className="text-white text-justify text-sm sm:text-base md:text-lg">
        Are you passionate about game development? Here's your chance to turn
        your creations into a source of income! Upload your games to our
        platform, and every time users play or click on your game, you'll earn
        revenue. It's time to showcase your talent, gain exposure, and start
        earning!
      </AlertDescription>

      <div className="flex justify-end w-full">
        <NewDeveloper button={
          <Button variant="ghost" className="font-bold text-white border-2 border-white hover:text-black dark:hover:bg-white">
            Become a Developer
          </Button>
        } />
      </div>
    </Alert>
  )
}
