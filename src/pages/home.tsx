import { BackgroundEffect } from "@/components/background-effect"
import { BannerCarousel } from "@/components/banner-carousel"
import { GameCarousel } from "@/components/game-carousel"
import { Navbar } from "@/components/navbar"

function Home() {

  return (
    <>
      <Navbar />
      <BackgroundEffect />
      <div className="flex p-8 justify-center">
        <BannerCarousel />
      </div>
      <h1 className="font-bold text-3xl text-center">New Games</h1>
      <div className="flex p-8 justify-center">
        <GameCarousel />
      </div>
      <footer className="p-5 text-center">
        Footer
      </footer>
    </>
  )
}

export default Home
