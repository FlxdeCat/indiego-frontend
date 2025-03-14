import { ModeToggle } from "@/components/mode-toggle"
import { ProfilePopover } from "./profile-popover"
import { NavMenu } from "./nav-menu"

export function Navbar(){
  return (
  <>
    <nav className="p-4 flex justify-between">
      <div>
        <a href="/">
          <u className="font-bold text-primary">Indie</u>go
        </a>
      </div>
      <div>
        <NavMenu />
      </div>
      <div className="flex gap-4">
        <ModeToggle />
        <ProfilePopover />
      </div>
    </nav>
  </>
  )
}
