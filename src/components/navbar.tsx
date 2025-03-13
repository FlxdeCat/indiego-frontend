
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { ProfilePopover } from "./profile-popover"

function Navbar(){

return (
<>
  <div className="p-4 flex justify-between">
    <Button>Click</Button>
    <div className="flex gap-4">
      <ModeToggle />
      <ProfilePopover />
    </div>
  </div>
</>
)
}

export default Navbar