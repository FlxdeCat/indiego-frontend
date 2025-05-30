import { getDeveloper } from "@/api/developer-api"
import { getSelfGames } from "@/api/game-api"
import { ChartAreaInteractive } from "@/components/dev/chart-area-interactive"
import { DataTable } from "@/components/dev/data-table"
import { DevNavbar } from "@/components/dev/dev-navbar"
import { DevProfile } from "@/components/dev/dev-profile"
import { SectionCards } from "@/components/dev/section-cards"
import { Footer } from "@/components/footer"
import { LoadingIcon } from "@/components/loading-icon"
import { useAuth } from "@/context/auth-context"
import { Developer } from "@/types/developer"
import { Game } from "@/types/game"
import { useEffect, useState } from "react"
import { toast } from "sonner"

function DeveloperHub() {

  const [loadingDev, setLoadingDev] = useState(false)
  const [dev, setDev] = useState<Developer>({
    devName: "",
    fullName: "",
    country: "",
    taxId: ""
  })

  async function getDevData() {
    setLoadingDev(true)

    try {
      const developerResponse = await getDeveloper()
      setDev(developerResponse[0])
    } catch (err: any) {
      toast.error(err.message || "Fetch developer data failed. Please try again later.")
    } finally {
      setLoadingDev(false)
    }
  }

  const [loadingGames, setLoadingGames] = useState(false)
  const [games, setGames] = useState<Game[]>([])
  const { user } = useAuth()

  async function getGamesData() {
    setLoadingGames(true)
    try {
      const gamesResponse = await getSelfGames({ userId: user!.id })
      setGames(gamesResponse)
    } catch (err: any) {
      toast.error(err.message || "Fetch game data failed. Please try again later.")
    } finally {
      setLoadingGames(false)
    }
  }

  useEffect(() => {
    getDevData()
    getGamesData()
  }, [])

  return (
    <div className="m-0 p-0 flex flex-col min-h-screen">
      <DevNavbar />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            {loadingDev ? (
              <div className="flex flex-1 items-center justify-center">
                <LoadingIcon size={50} className="text-primary" />
              </div>
            ) : (
              <div className="px-4 lg:px-6">
                <DevProfile dev={dev} />
              </div>
            )}

            <SectionCards />
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>

            {loadingGames ? (
              <div className="flex flex-1 items-center justify-center">
                <LoadingIcon size={50} className="text-primary" />
              </div>
            ) : (
              <DataTable data={games} />
            )}
          </div>
        </div >
      </div >
      <Footer />
    </div >
  )
}

export default DeveloperHub
