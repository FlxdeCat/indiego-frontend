import { useTheme } from "next-themes"
import { Toaster } from "./ui/sonner"

export function SonnerToaster() {

  const { theme } = useTheme()
  const validTheme = theme === "light" || theme === "dark" || theme === "system" ? theme : undefined

  return (
    <Toaster theme={validTheme} />
  )
}
