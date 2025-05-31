import { BrowseGameSearch } from "@/components/browse-game-search"
import { BrowseSidebar } from "@/components/browse-sidebar"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { useNavigate } from "react-router"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { usePagination } from "@/hooks/use-pagination"
import { paginationNumbers } from "@/utils/utils"
import { Game } from "@/types/game"
import { getAllGames } from "@/api/game-api"
import { toast } from "sonner"
import { LoadingIcon } from "@/components/loading-icon"

function Browse() {
  const nav = useNavigate()

  const [loadingGames, setLoadingGames] = useState(false)
  const [games, setGames] = useState<Game[]>([])

  const [valueSearch, setValueSearch] = useState("")
  const [genreSearch, setGenreSearch] = useState("")
  const [checkedGenres, setCheckedGenres] = useState<Set<string>>(new Set())

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

  const [filteredGames, setFilteredGames] = useState<Game[]>([])

  useEffect(() => {
    setLoadingGames(true)

    const timeout = setTimeout(() => {
      const filtered = games.filter((game) => {
        const matchesSearch = game.name.toLowerCase().includes(valueSearch.toLowerCase())
        const matchesGenres = checkedGenres.size === 0 || game.genreIds.some((genre) => checkedGenres.has(genre))
        return matchesSearch && matchesGenres
      })

      setFilteredGames(filtered)
      setLoadingGames(false)
    }, 200)

    return () => clearTimeout(timeout)
  }, [games, valueSearch, checkedGenres])

  const itemsPerPage = 21
  const [currentPage, setCurrentPage] = useState(1)
  const { paginatedItems: paginatedGames, totalPages } = usePagination(filteredGames, currentPage, itemsPerPage)

  const maxGenres = 1

  return (
    <div className="m-0 p-0 flex flex-col min-h-screen">
      <Navbar />
      <SidebarProvider className="min-h-[calc(100svh-60px)]">
        <BrowseSidebar checkedGenres={checkedGenres} setCheckedGenres={setCheckedGenres} genreSearch={genreSearch} setGenreSearch={setGenreSearch} />
        <SidebarInset className="flex flex-col">
          <div className="flex h-12 shrink-0 items-center gap-2 px-4 sticky top-[60px] bg-background border-y-1 z-1">
            <SidebarTrigger className="-ml-2 p-4" />
            <Separator orientation="vertical" />
            <BrowseGameSearch searchValue={valueSearch} setSearchValue={setValueSearch} />
          </div>
          <div className="flex-1 p-4 pb-0">
            {loadingGames ? (
              <div className="flex flex-1 items-center justify-center">
                <LoadingIcon size={50} className="text-primary" />
              </div>
            ) : (
              paginatedGames.length == 0 ? (
                <div className="flex flex-col items-center text-center text-muted-foreground pt-4">
                  No games found.
                </div>
              ) : (
                <div className="grid auto-rows-min space-x-2 space-y-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7">
                  {paginatedGames.map((game, index) => {
                    const displayedGenres = game.genres.slice(0, maxGenres)
                    const extraCount = game.genres.length - maxGenres
                    return (
                      <Card onClick={() => nav(`/game/${game.id}`)} key={index} className="p-0 bg-transparent border-0 shadow-transparent transition-transform duration-300 hover:-translate-y-2 cursor-pointer" >
                        <CardContent className="flex flex-col justify-center p-2">
                          <img loading="lazy" src={URL.createObjectURL(game.cover)} alt={game.name} className="w-full aspect-[4/5] object-cover rounded-md" />
                          <div className="text-xl font-semibold text-start mt-2 line-clamp-1">{game.name}</div>
                          <div className="text-base text-start line-clamp-1">{game.devName}</div>
                          <div className="flex mt-2 space-x-2">
                            {displayedGenres.map((genre, index) => (
                              <Badge key={index} variant="secondary">
                                {genre}
                              </Badge>
                            ))}
                            {extraCount > 0 && <Badge variant="outline">+{extraCount} more</Badge>}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              )
            )}
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  aria-disabled={currentPage <= 1}
                  className={
                    currentPage <= 1 ? "pointer-events-none opacity-50 select-none" : "cursor-pointer"
                  }
                  onClick={() => setCurrentPage(currentPage - 1)}
                />
              </PaginationItem>

              {paginationNumbers(totalPages, currentPage).map((page, i) => (
                <PaginationItem key={i}>
                  {page === "..." ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      className="cursor-pointer"
                      isActive={page === currentPage}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  aria-disabled={currentPage >= totalPages}
                  className={
                    currentPage >= totalPages ? "pointer-events-none opacity-50 select-none" : "cursor-pointer"
                  }
                  onClick={() => setCurrentPage(currentPage + 1)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <Footer />
        </SidebarInset>
      </SidebarProvider>
    </div >
  )
}

export default Browse
