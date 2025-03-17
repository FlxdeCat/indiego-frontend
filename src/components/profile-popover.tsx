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
      <PopoverContent className="w-50 mr-4">
        <div className="flex flex-col gap-4 items-center justify-center">
          <User size={90} />
          <h4 className="font-medium leading-none text-center">Username</h4>
          <Button className="w-full">Edit Profile</Button>
          <a className="w-full" href="/auth">
            <Button className="w-full" variant="destructive">Logout</Button>
          </a>
        </div>
      </PopoverContent>
    </Popover>
  )
}
