import { AddReview } from "@/components/add-review"
import { Footer } from "@/components/footer"
import { GameBannerCarousel } from "@/components/game-banner-carousel"
import { Navbar } from "@/components/navbar"
import { ReviewGame } from "@/components/review-game"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { convertDate } from "@/utils/utils"
import { Download, ExternalLink, Star } from "lucide-react"
import { useState } from "react"
import { useParams } from "react-router"

function Game() {

  const auth = true //TEMP
  const external = true //TEMP
  const sub = true //TEMP
  const [favorite, setFavorite] = useState(false) //TEMP

  const { id } = useParams()

  const game = {
    title: "Holocure",
    desc: "Play as your favorite Vtubers from Hololive! Fight, explore, and clear your way through armies of fans and save them from their mind-control in this unofficial free fan-game.",
    image: "/holocure.png",
    banners: ["/holocure-banner.png", "/holocure-1.png", "/holocure-2.png", "/holocure-3.png", "/holocure-4.png", "/holocure-5.png"],
    dev: "Hololive",
    genres: ["Action", "Comedy"],
    stars: 4.3,
    release: "1742963482"
  }

  const reviews = [
    {
      username: "Username 1",
      review: "Very good game!",
      stars: 4,
      date: "1742963480"
    },
    {
      username: "Username 2",
      review: "Very nice game!",
      stars: 5,
      date: "1742963481"
    },
    {
      username: "Username 3",
      review: "Good game!",
      stars: 4,
      date: "1742963482"
    }
  ]

  return (
    <div className="m-0 p-0 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 mx-4 flex flex-col items-center">
        <div className="flex flex-col lg:flex-row items-center gap-8 w-full max-w-7xl mt-4">
          <div className="flex-3 w-full min-w-0">
            <GameBannerCarousel banners={game.banners} />
          </div>
          <div className="flex-1 flex flex-col space-y-4 items-center">
            <img src={game.image} alt={game.title} className="aspect-[4/5] object-cover rounded-md w-full max-w-76" />
            <div className="flex flex-col space-y-1 items-center lg:items-start">
              <h1 className="font-bold text-xl">{game.title} {id} ({game.stars} ★)</h1>
              <h4 className="font-bold">{game.dev}</h4>
              <h4 className="text-muted-foreground">{convertDate(game.release)}</h4>
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
        <div className="w-full max-w-7xl mt-8 border-y-2 py-8 px-4 flex flex-col md:flex-row gap-4 items-center justify-between">
          <h1 className="text-3xl font-bold">Play {game.title} {id}</h1>
          <div className="flex flex-col items-center sm:flex-row sm:items-end gap-4">
            <div className="flex gap-4">
              {external ?
                <Button variant="outline" size="icon"><ExternalLink /></Button> :
                <div className="cursor-not-allowed">
                  <Button variant="outline" disabled><ExternalLink /></Button>
                </div>
              }
              {auth ?
                sub ?
                  <Button><Download />Download</Button> :
                  <div className="cursor-not-allowed">
                    <Button disabled><Download />Subscribe to Download</Button>
                  </div> :
                <div className="cursor-not-allowed">
                  <Button disabled><Download />Login to Download</Button>
                </div>
              }
            </div>
            {auth && (favorite ?
              <Button variant="secondary" onClick={() => setFavorite(false)}><Star className="fill-black dark:fill-white" />Remove from My Favorites</Button> :
              <Button variant="outline" onClick={() => setFavorite(true)}><Star />Save to My Favorites</Button>
            )}
          </div>
        </div>
        {auth && <div className="w-full max-w-7xl gap-2 p-4 border-b-2">
          <AddReview id={id!} />
        </div>}
        <ReviewGame reviews={reviews} />
      </main>
      <Footer />
    </div>
  )
}

export default Game