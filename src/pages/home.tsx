import { getAllGames } from "@/api/game-api"
import { BannerCarousel } from "@/components/banner-carousel"
import { DevJoinMessage } from "@/components/dev-join-message"
import { Footer } from "@/components/footer"
import { GameCarousel } from "@/components/game-carousel"
import { LoadingIcon } from "@/components/loading-icon"
import { Navbar } from "@/components/navbar"
import { useAuth } from "@/context/auth-context"
import { Game } from "@/types/game"
import { useEffect, useState } from "react"
import { toast } from "sonner"

function Home() {

  const { user, isAuthenticated } = useAuth()

  const auth = isAuthenticated
  const dev = isAuthenticated && user?.role.includes("Developer") || false

  const [loadingGames, setLoadingGames] = useState(false)
  const [loadingFilter, setLoadingFilter] = useState(false)
  const [games, setGames] = useState<Game[]>([])
  const [newGames, setNewGames] = useState<Game[]>([])
  const [randomGames, setRandomGames] = useState<Game[]>([])
  const [recommendedGames, setRecommendedGames] = useState<Game[]>([])
  const [randomCarouselGames, setRandomCarouselGames] = useState<Game[]>([])

  async function getAllGamesData() {
    setLoadingGames(true)
    try {
      const gamesResponse = await getAllGames()
      setGames(gamesResponse)
    } catch (err: any) {
      toast.error(err.message || "Fetch game data failed. Please try again later.")
    } finally {
      setLoadingGames(false)
    }
  }

  useEffect(() => {
    getAllGamesData()
  }, [])

  function getRandomGames(games: Game[], count: number) {
    const shuffled = [...games].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

  useEffect(() => {
    if (games.length === 0) return

    setLoadingFilter(true)

    const timer = setTimeout(() => {
      setRandomCarouselGames(getRandomGames(games, 5))
      setNewGames(games.slice(0, 10))
      setRandomGames(getRandomGames(games, 10))
      setRecommendedGames(getRandomGames(games, 10))
      setLoadingFilter(false)
    }, 200)

    return () => clearTimeout(timer)
  }, [games])

  return (
    <div className="m-0 p-0 flex flex-col min-h-screen">
      <Navbar />
      {loadingGames ? (
        <div className="flex flex-1 items-center justify-center">
          <LoadingIcon size={50} className="text-primary" />
        </div>
      ) : games.length == 0 ? (
        <main className="flex flex-col items-center flex-1 mx-16 pt-4 text-muted-foreground">
          There are no games yet.
        </main>
      ) : (
        <main className="flex flex-col items-center flex-1 mx-16">
          <div className="flex mt-4 mb-4 justify-center w-full">
            {loadingFilter ? (
              <div className="aspect-[7/3] flex flex-1 items-center justify-center">
                <LoadingIcon size={30} className="text-primary" />
              </div>
            ) : (
              <BannerCarousel games={randomCarouselGames} />
            )}
          </div>
          {auth && !dev && <div className="mt-4 mb-4 flex justify-center">
            <div className="w-full max-w-5xl">
              <DevJoinMessage />
            </div>
          </div>}
          {auth && user?.isSubscribed && <div className="flex flex-col items-center gap-2 my-4 w-full max-w-5xl">
            <h1 className="font-bold text-3xl text-center">Recommended Games</h1>
            {loadingFilter ? (
              <div className="flex flex-1 items-center justify-center mt-4">
                <LoadingIcon size={30} className="text-primary" />
              </div>
            ) : (
              <GameCarousel games={recommendedGames} />
            )}
          </div>}
          <div className="flex flex-col items-center gap-2 my-4 w-full max-w-5xl">
            <h1 className="font-bold text-3xl text-center">New Games</h1>
            {loadingFilter ? (
              <div className="flex flex-1 items-center justify-center mt-4">
                <LoadingIcon size={30} className="text-primary" />
              </div>
            ) : (
              <GameCarousel games={newGames} />
            )}
          </div>
          <div className="flex flex-col items-center gap-2 my-4 w-full max-w-5xl">
            <h1 className="font-bold text-3xl text-center">Random Games</h1>
            {loadingFilter ? (
              <div className="flex flex-1 items-center justify-center mt-4">
                <LoadingIcon size={30} className="text-primary" />
              </div>
            ) : (
              <GameCarousel games={randomGames} />
            )}
          </div>
        </main>
      )}
      <Footer />
    </div>
  )
}

export default Home
