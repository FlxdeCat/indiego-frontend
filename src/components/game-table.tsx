import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNavigate } from "react-router"
import { EllipsisVertical } from "lucide-react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { useState } from "react"
import { usePagination } from "@/hooks/use-pagination"
import { paginationNumbers } from "@/utils/utils"
import { Game } from "@/types/game"
import { unfavoriteGame } from "@/api/favorite-api"
import { toast } from "sonner"

interface GameTableProps {
  games: Game[]
}

export function GameTable({ games }: GameTableProps) {
  const nav = useNavigate()

  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)
  const { paginatedItems: paginatedGames, totalPages } = usePagination(games, currentPage, itemsPerPage)

  const maxGenres = 5

  async function onUnfavoriteGame(gameId: string) {
    try {
      await unfavoriteGame(gameId)
      window.location.reload()
    } catch (err: any) {
      toast.error(err.message || "Set unfavorite failed. Please try again later.")
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {games.length === 0 ? (
        <div className="flex flex-col items-center text-center text-muted-foreground p-2">
          You have no favorite games yet.
        </div>
      ) : (
        <Table>
          <TableBody className="border-y-1">
            {paginatedGames.map((game, index) => {
              const displayedGenres = game.genres.slice(0, maxGenres)
              const extraCount = game.genres.length - maxGenres

              return (
                <TableRow
                  onClick={() => nav(`/game/${game.id}`)}
                  key={index}
                  className="flex items-center justify-between cursor-pointer transition-all duration-200 p-2 hover:px-1"
                >
                  <TableCell className="h-full flex flex-col sm:flex-row items-center space-x-8 space-y-2 sm:space-y-0">
                    <img
                      loading="lazy"
                      src={URL.createObjectURL(game.cover)}
                      alt={game.name}
                      className="max-w-[200px] aspect-[2/1] object-cover rounded-md"
                    />
                    <div className="flex flex-col gap-1 w-full">
                      <div className="font-bold text-2xl">{game.name}</div>
                      <div className="font-semibold text-lg">{game.devName}</div>
                      <div className="flex gap-2 flex-wrap max-w-[300px] mt-1">
                        {displayedGenres.map((genre, index) => (
                          <Badge key={index} variant="secondary">
                            {genre}
                          </Badge>
                        ))}
                        {extraCount > 0 && <Badge variant="outline">+{extraCount} more</Badge>}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="flex items-center justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon"><EllipsisVertical /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="sm:ml-48 mr-4 -mt-4">
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation()
                          onUnfavoriteGame(game.id)
                        }}>Remove from My Favorites</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      )}

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
    </div>
  )
}