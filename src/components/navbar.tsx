import { useState, useEffect } from "react"
import { ModeToggle } from "@/components/mode-toggle"
import { ProfilePopover } from "./profile-popover"
import { NavMenu } from "./nav-menu"
import { Button } from "./ui/button"
import { Gamepad2 } from "lucide-react"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  const auth = true // TEMP
  const dev = false // TEMP

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 5)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`px-4 py-3 flex justify-between sticky top-0 z-10 bg-background transition-all duration-150 ${
        scrolled && "shadow-md shadow-muted-foreground"
      }`}
    >
      <div className="content-center">
        <a href="/" className="text-xl">
          <u className="font-bold text-primary">Indie</u>go
        </a>
      </div>
      <div>
        <NavMenu />
      </div>
      <div className="flex gap-4">
        <ModeToggle />
        {auth && (dev ? <Button variant="outline"><Gamepad2 />Developer Hub</Button> : <Button variant="outline">Become a Developer</Button>)}
        {auth ? <ProfilePopover /> : <a href="/auth"><Button variant="outline">Login | Register</Button></a>}
      </div>
    </nav>
  )
}
