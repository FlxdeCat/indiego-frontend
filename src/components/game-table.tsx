import {
  Table,
  TableBody,
  TableCaption,
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

  const maxGenres = 5

  return games.length === 0 ? (
    <div className="flex flex-col items-center text-center text-muted-foreground p-4">
      <img width={100} src="no-games.png" alt="No games" />
      You have no favorite games yet.
    </div>
    ) : (
    <Table>
      <TableCaption>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="/" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="/" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="/">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="/">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="/" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </TableCaption>
      <TableBody className="border-y-1">
        {games.map((game, index) => {
          const displayedGenres = game.genres.slice(0, maxGenres)
          const extraCount = game.genres.length - maxGenres

          return (
            <TableRow
              onClick={() => nav("/")}
              key={index}
              className="flex items-center justify-between cursor-pointer transition-all duration-200 p-2 hover:px-1"
            >
              <TableCell className="flex items-center space-x-4">
                <img
                  src={game.image}
                  alt={game.title}
                  className="max-w-[200px] aspect-[2/1] object-cover rounded-sm"
                />
                <div className="flex flex-col space-y-2">
                  <div className="font-bold text-2xl">{game.title}</div>
                  <div className="flex space-x-2 flex-wrap max-w-[300px]">
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
                  <DropdownMenuContent className="ml-48 -mt-4">
                    <DropdownMenuItem>Remove from My Favorites</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}