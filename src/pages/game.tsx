import { favoriteGame, unfavoriteGame } from "@/api/favorite-api"
import { getGame } from "@/api/game-api"
import { getCurrentSubscription } from "@/api/subscription-api"
import { AddReview } from "@/components/add-review"
import { Footer } from "@/components/footer"
import { GameBannerCarousel } from "@/components/game-banner-carousel"
import { LoadingIcon } from "@/components/loading-icon"
import { Navbar } from "@/components/navbar"
import { ReviewGame } from "@/components/review-game"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"
import { Game as GameType } from "@/types/game"
import { convertDate } from "@/utils/utils"
import { Download, ExternalLink, Star } from "lucide-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { toast } from "sonner"

function Game() {

  const [subLoading, setSubLoading] = useState(false)
  const [sub, setSub] = useState(false)
  const { isAuthenticated, user } = useAuth()

  async function getTiersAndCurrent() {
    setSubLoading(true)

    try {
      if (isAuthenticated) {
        const currentTierResponse = await getCurrentSubscription()
        if (currentTierResponse && currentTierResponse[0]) setSub(true)
      }
    } catch (err: any) {
      toast.error(err.message || "Fetch subscription failed. Please try again later.")
    } finally {
      setSubLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated !== undefined) {
      getTiersAndCurrent()
    }
  }, [isAuthenticated])

  const auth = isAuthenticated
  const [favorite, setFavorite] = useState(false)

  const { id } = useParams()
  const [game, setGame] = useState<GameType>()
  const [gameLoading, setGameLoading] = useState(false)

  async function getGameData() {
    if (!id) return
    setGameLoading(true)

    try {
      const gameResponse = await getGame({ id })
      setGame(gameResponse)
    } catch (err: any) {
      toast.error(err.message || "Fetch game data failed. Please try again later.")
    } finally {
      setGameLoading(false)
    }
  }

  useEffect(() => {
    getGameData()
  }, [])

  useEffect(() => {
    if (!id) return
    if (user) setFavorite(user?.favorites.includes(id))
  }, [user])

  function downloadGame() {
    if (!(game?.file)) return
    const url = URL.createObjectURL(game.file)
    const a = document.createElement("a")
    a.href = url
    a.download = game.file.name
    a.click()
    URL.revokeObjectURL(url)
  }

  const [favoriteLoading, setFavoriteLoading] = useState(false)

  async function onFavoriteGame() {
    setFavoriteLoading(true)

    try {
      if (!id) return
      await favoriteGame(id)
      toast.success(`${game?.name} has been added to your favorites.`)
      setFavorite(true)
    } catch (err: any) {
      toast.error(err.message || "Set favorite failed. Please try again later.")
    } finally {
      setFavoriteLoading(false)
    }
  }

  async function onUnfavoriteGame() {
    setFavoriteLoading(true)

    try {
      if (!id) return
      await unfavoriteGame(id)
      toast.success(`${game?.name} has been removed from your favorites.`)
      setFavorite(false)
    } catch (err: any) {
      toast.error(err.message || "Set unfavorite failed. Please try again later.")
    } finally {
      setFavoriteLoading(false)
    }
  }

  return (
    <div className="m-0 p-0 flex flex-col min-h-screen">
      <Navbar />
      {subLoading || gameLoading ? (
        <main className="flex-1 mx-4 flex flex-col items-center justify-center">
          <LoadingIcon size={50} className="text-primary" />
        </main>
      ) : (
        <main className="flex-1 mx-4 flex flex-col items-center">
          <div className="flex flex-col lg:flex-row items-start gap-8 w-full max-w-7xl mt-4">
            <div className="flex-3 w-full min-w-0">
              <GameBannerCarousel banners={game?.banners ?? []} />
            </div>
            <div className="w-full flex-1 flex flex-col space-y-4 items-center">
              <img loading="lazy" src={game?.cover ? URL.createObjectURL(game.cover) : undefined} alt={game?.name} className="aspect-[4/5] object-cover rounded-md w-full max-w-76" />
              <div className="w-full flex flex-col space-y-1 items-center lg:items-start">
                <h1 className="w-full font-bold text-xl">{game?.name} ({game?.rating} ★)</h1>
                <h4 className="w-full font-bold">{game?.devName}</h4>
                <h4 className="w-full text-muted-foreground">{game?.createdAt ? convertDate(game.createdAt) : ""}</h4>
                <h4 className="w-full text-center lg:text-justify">
                  {game?.description.split("\n").map((line: string, i: number) => (
                    <p key={i} className="whitespace-pre-wrap">
                      {line.trim() === "" ? <br /> : line}
                    </p>
                  ))}
                </h4>
                <div className="w-full flex flex-wrap gap-2 mt-2">
                  {game?.genres.map((genre, index) => (
                    <Badge key={index} variant="secondary">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full max-w-7xl mt-8 border-y-2 py-8 px-4 flex flex-col md:flex-row gap-4 items-center justify-between">
            <h1 className="text-3xl font-bold">Play {game?.name}</h1>
            <div className="flex flex-col items-center sm:flex-row sm:items-end gap-4">
              <div className="flex gap-4">
                {game?.link ?
                  <Button variant="outline" size="icon" onClick={() => {
                    window.open(game.link, '_blank', 'noopener, noreferrer')
                  }}><ExternalLink /></Button> :
                  <div className="cursor-not-allowed">
                    <Button variant="outline" disabled><ExternalLink /></Button>
                  </div>
                }
                {auth ?
                  sub ?
                    <Button onClick={downloadGame}><Download />Download</Button> :
                    <div className="cursor-not-allowed">
                      <Button disabled><Download />Subscribe to Download</Button>
                    </div> :
                  <div className="cursor-not-allowed">
                    <Button disabled><Download />Login to Download</Button>
                  </div>
                }
              </div>
              {auth && (favorite ?
                (<Button variant="secondary" onClick={onUnfavoriteGame} disabled={favoriteLoading}>
                  {favoriteLoading ? <LoadingIcon /> : <Star className="fill-black dark:fill-white" />}
                  Remove from My Favorites
                </Button>) :
                (<Button variant="outline" onClick={onFavoriteGame} disabled={favoriteLoading}>
                  {favoriteLoading ? <LoadingIcon /> : <Star />}
                  Save to My Favorites
                </Button>)
              )}
            </div>
          </div>
          {auth && <div className="w-full max-w-7xl gap-2 p-4 border-b-2">
            <AddReview id={id!} name={game?.name ?? ""} />
          </div>}
          <ReviewGame id={id!} />
        </main>
      )}
      <Footer />
    </div>
  )
}

export default Game