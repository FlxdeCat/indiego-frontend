import { BannerCarousel } from "@/components/banner-carousel"
import { DevJoinMessage } from "@/components/dev-join-message"
import { Footer } from "@/components/footer"
import { GameCarousel } from "@/components/game-carousel"
import { GenreCarousel } from "@/components/genre-carousel"
import { Navbar } from "@/components/navbar"

function Home() {

  const auth = true // TEMP
  const dev = false // TEMP

  return (
    <div className="m-0 p-0 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex flex-col items-center flex-1 mx-16">
        <div className="flex mt-4 mb-4 justify-center w-full">
          <BannerCarousel />
        </div>
        {auth && !dev && <div className="mt-4 mb-4 flex justify-center">
          <div className="w-full max-w-5xl">
            <DevJoinMessage />
          </div>
        </div>}
        <div className="flex flex-col items-center gap-2 my-4 w-full max-w-5xl">
          <h1 className="font-bold text-3xl text-center">New Games</h1>
          <GameCarousel />
        </div>
        <div className="flex flex-col items-center gap-2 my-4 w-full max-w-5xl">
          <h1 className="font-bold text-3xl text-center">Top Genre</h1>
          <GenreCarousel />
        </div>
        <div className="flex flex-col items-center gap-2 my-4 w-full max-w-5xl">
          <h1 className="font-bold text-3xl text-center">Random Games</h1>
          <GameCarousel />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Home
