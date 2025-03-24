import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { useParams } from "react-router"

function Game() {

  const { id } = useParams();

  return (
    <div className="m-0 p-0 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 mx-4 flex flex-col items-center">
        <div className="mt-8 px-4 py-8 w-full max-w-7xl">
          {id}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Game