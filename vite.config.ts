import path from "path"
import tailwindcss from "@tailwindcss/vite"
import tailwindScrollbar from "tailwind-scrollbar"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), tailwindScrollbar()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
