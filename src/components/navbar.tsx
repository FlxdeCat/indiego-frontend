import { useState, useEffect } from "react"
import { ModeToggle } from "@/components/mode-toggle"
import { ProfilePopover } from "./profile-popover"
import { NavMenu } from "./nav-menu"
import { Button } from "./ui/button"
import { Gamepad2, MenuIcon, UserCog } from "lucide-react"
import { useNavigate } from "react-router"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { NewDeveloper } from "./new-developer"
import { useAuth } from "@/context/auth-context"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { user, isAuthenticated } = useAuth()

  const nav = useNavigate()

  const auth = isAuthenticated
  const dev = user?.role.includes("Developer") || false
  const admin = user?.role.includes("Admin") || false

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 5)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`px-4 py-3 gap-2 flex justify-between items-center sticky w-full top-0 z-10 bg-background transition-all duration-150 ${scrolled && "shadow-md shadow-muted-foreground"
        }`}
    >
      <div className="content-center">
        <a href="/" className="text-xl">
          <u onClick={() => nav("/")} className="font-bold text-primary">Indie</u>go
        </a>
      </div>
      <div className="hidden md:flex">
        <NavMenu />
      </div>
      <div className="flex gap-4">
        <ModeToggle />
        {auth && (dev ?
          <Button variant="outline" onClick={() => window.open("/developer", "_blank")}><Gamepad2 /><span className="hidden sm:flex">Developer Hub</span></Button> :
          <NewDeveloper button={<Button variant="outline"><Gamepad2 /><span className="hidden sm:flex">Become a Game Developer</span></Button>} />
        )}
        {auth && admin && <Button variant="outline" onClick={() => window.open("/admin", "_blank")}><UserCog /></Button>}
        {auth ? <ProfilePopover /> : <Button onClick={() => nav("/auth")} variant="outline">Login | Register</Button>}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <MenuIcon className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="md:hidden">
            <SheetHeader className="mt-4 px-6 py-2">
              <SheetTitle className="text-xl font-bold">Menu</SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
            <div className="-mt-4">
              <NavMenu variant="sidebar" />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
