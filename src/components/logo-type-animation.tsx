import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const fullWord = "Indiego"
const indiePart = "Indie"

export function LogoTypeAnimation() {
  const [text, setText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [phase, setPhase] = useState("indie")
  const speed = isDeleting ? 100 : 200
  const cycleDelay = 2000
  const delay = 100

  useEffect(() => {
    const targetWord = phase === "indie" ? indiePart : fullWord
    const timeout = setTimeout(() => {
      setText((prev) =>
        isDeleting
          ? targetWord.substring(0, prev.length - 1)
          : targetWord.substring(0, prev.length + 1)
      )

      if (!isDeleting && text === targetWord) {
        if (phase === "indie") {
          setTimeout(() => setPhase("full"), delay)
        } else {
          setTimeout(() => setIsDeleting(true), cycleDelay)
        }
      } else if (isDeleting && text === "") {
        setIsDeleting(false)
        setPhase("indie")
      }
    }, speed)
    return () => clearTimeout(timeout)
  }, [text, isDeleting, phase])

  return (
    <motion.span className="inline-block">
      <span className="underline text-primary">{text.substring(0, indiePart.length)}</span>
      {text.length > indiePart.length && text.substring(indiePart.length)}
    </motion.span>
  )
}