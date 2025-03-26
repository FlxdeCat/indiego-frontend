import { Footer } from "@/components/footer"
import { GameBannerCarousel } from "@/components/game-banner-carousel"
import { Navbar } from "@/components/navbar"
import { Badge } from "@/components/ui/badge"
import { useParams } from "react-router"

function Game() {

  const { id } = useParams()

  const game = {
    title: "Holocure",
    desc: "Play as your favorite Vtubers from Hololive! Fight, explore, and clear your way through armies of fans and save them from their mind-control in this unofficial free fan-game.",
    image: "/holocure.png",
    banners: ["/holocure-banner.png", "/holocure-1.png", "/holocure-2.png", "/holocure-3.png", "/holocure-4.png", "/holocure-5.png"],
    dev: "Hololive",
    genres: ["Action", "Comedy"],
    stars: 4.3,
    release: 1742963482
  }

  const releaseDate = new Date(game.release * 1000)
  const releaseDateString = releaseDate.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })

  return (
    <div className="m-0 p-0 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 mx-4 flex flex-col items-center">
        <div className="flex flex-col lg:flex-row items-center gap-8 w-full max-w-7xl mt-4 border-b-2 pb-4">
          <div className="flex-3 w-full min-w-0">
            <GameBannerCarousel banners={game.banners} />
          </div>
          <div className="flex-1 flex flex-col space-y-4 items-center">
            <img src={game.image} alt={game.title} className="aspect-[4/5] object-cover rounded-sm shadow-[0px_0px_8px_0px_var(--foreground)] w-full max-w-76" />
            <div className="flex flex-col space-y-1 items-center lg:items-start">
              <h1 className="font-bold text-xl">{game.title} {id} ({game.stars} ★)</h1>
              <h4 className="font-bold">{game.dev}</h4>
              <h4 className="text-muted-foreground">{releaseDateString}</h4>
              <h4 className="text-center lg:text-justify">{game.desc}</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {game.genres.map((genre, index) => (
                  <Badge key={index} variant="secondary">
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Game