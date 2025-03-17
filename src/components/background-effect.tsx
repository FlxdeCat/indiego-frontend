import { motion } from "framer-motion"

export function BackgroundEffect() {

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute bg-chart-1/25 blur-3xl rounded-full"
        style={{
          width: "30vw", height: "30vw",
          top: "2vh", left: "1vw",
        }}
        animate={{
          x: [0, "2vw", "-2vw", 0],
          y: [0, "1vh", "-1vh", 0],
          opacity: [1, 0.8, 1, 0.7, 1],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bg-chart-2/25 blur-3xl rounded-full"
        style={{
          width: "35vw", height: "35vw",
          top: "50vh", right: "1vw",
        }}
        animate={{
          x: [0, "-3vw", "3vw", 0],
          y: [0, "2vh", "-2vh", 0],
          opacity: [1, 0.6, 1, 0.9, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bg-chart-3/25 blur-3xl rounded-full"
        style={{
          width: "25vw", height: "25vw",
          bottom: "2vh", left: "28vw",
        }}
        animate={{
          x: [0, "4vw", "-4vw", 0],
          y: [0, "2vh", "-2vh", 0],
          opacity: [1, 0.85, 1, 0.75, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bg-chart-4/25 blur-3xl rounded-full"
        style={{
          width: "21vw", height: "21vw",
          top: "5vh", right: "20vw",
        }}
        animate={{
          x: [0, "3vw", "-3vw", 0],
          y: [0, "1vh", "-1vh", 0],
          opacity: [1, 0.7, 1, 0.9, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  )
}
