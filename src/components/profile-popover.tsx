import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useAuth } from "@/context/auth-context"
import { User } from "lucide-react"
import { useNavigate } from "react-router"

export function ProfilePopover() {

  const nav = useNavigate()
  const { logout } = useAuth()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <User />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-50 mt-2 mr-4">
        <div className="flex flex-col gap-4 items-center justify-center">
          <User size={90} />
          <h4 className="font-medium leading-none text-center">Username</h4>
          <Button onClick={() => nav("/profile")} className="w-full text-white">My Profile</Button>
          <Button onClick={logout} className="w-full" variant="destructive">Logout</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
