import { useState, useEffect } from "react"
import { ModeToggle } from "@/components/mode-toggle"
import { useNavigate } from "react-router"
import { Button } from "../ui/button"
import { useAuth } from "@/context/auth-context"

export function AdminNavbar() {
  const [scrolled, setScrolled] = useState(false)

  const nav = useNavigate()
  const { logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 5)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`px-4 py-3 flex justify-between items-center sticky w-full top-0 z-10 bg-background transition-all duration-150 ${scrolled && "shadow-md shadow-muted-foreground"
        }`}
    >
      <div className="content-center">
        <a href="/" className="text-xl">
          <u onClick={() => nav("/")} className="font-bold text-primary">Indie</u>go
        </a>
      </div>
      <div className="flex gap-4">
        <ModeToggle />
        <Button variant="destructive" onClick={logout}>Logout</Button>
      </div>
    </nav>
  )
}
