import { getAllGames } from "@/api/game-api"
import { AdminDataTable } from "@/components/admin/admin-data-table"
import { AdminNavbar } from "@/components/admin/admin-navbar"
import { Footer } from "@/components/footer"
import { LoadingIcon } from "@/components/loading-icon"
import { Game } from "@/types/game"
import { useEffect, useState } from "react"
import { toast } from "sonner"

function AdminHub() {

  const [loadingGames, setLoadingGames] = useState(false)
  const [games, setGames] = useState<Game[]>([])

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

  return (
    <div className="m-0 p-0 flex flex-col min-h-screen">
      <AdminNavbar />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">

            {loadingGames ? (
              <div className="flex flex-1 items-center justify-center">
                <LoadingIcon size={50} className="text-primary" />
              </div>
            ) : (
              <AdminDataTable data={games} />
            )}

          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AdminHub
