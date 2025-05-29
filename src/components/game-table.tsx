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

interface Game {
  title: string
  image: string
  genres: string[]
}

interface GameTableProps {
  games: Game[]
}

export function GameTable({ games }: GameTableProps) {
  const nav = useNavigate()

  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)
  const { paginatedItems: paginatedGames, totalPages } = usePagination(games, currentPage, itemsPerPage)

  const maxGenres = 5

  return (
    <div className="flex flex-col gap-4">
      {games.length === 0 ? (
        <div className="flex flex-col items-center text-center text-muted-foreground p-4">
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
                  onClick={() => nav(`/game/${index + 1}`)}
                  key={index}
                  className="flex items-center justify-between cursor-pointer transition-all duration-200 p-2 hover:px-1"
                >
                  <TableCell className="flex flex-col sm:flex-row items-center space-x-8 space-y-2">
                    <img
                      src={game.image}
                      alt={game.title}
                      className="max-w-[200px] aspect-[2/1] object-cover rounded-md"
                    />
                    <div className="flex flex-col space-y-2 w-full">
                      <div className="font-bold text-2xl">{game.title}</div>
                      <div className="flex gap-2 flex-wrap max-w-[300px]">
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
                          nav("/profile")
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