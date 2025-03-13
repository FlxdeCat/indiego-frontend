import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { User } from "lucide-react"

export function ProfilePopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <User />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-30 mr-4">
        <div className="grid gap-4">
          <div className="space-y-2 text-center">
            <h4 className="font-medium leading-none text-center">Username</h4>
          </div>
          <Button variant="destructive">Logout</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
