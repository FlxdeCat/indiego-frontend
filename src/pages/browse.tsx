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

function Browse() {
  const nav = useNavigate()

  const games = Array.from({ length: 30 }, (_) => ({
    title: "Holocure",
    image: "holocure.png",
    dev: "Hololive",
    genres: ["Action", "Comedy"]
  }))

  const maxGenres = 1

  return (
    <div className="m-0 p-0 flex flex-col min-h-screen">
      <Navbar />
      <SidebarProvider className="min-h-[calc(100svh-60px)]">
        <BrowseSidebar />
        <SidebarInset className="flex flex-col">
          <div className="flex h-12 shrink-0 items-center gap-2 px-4 sticky top-[60px] bg-background z-20 shadow-sm shadow-muted-foreground">
            <SidebarTrigger className="-ml-2 p-4" />
            <Separator orientation="vertical" />
            <BrowseGameSearch />
          </div>
          <div className="flex-1 p-4 pb-0">
            <div className="grid auto-rows-min space-x-2 space-y-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7">
              {games.map((game, index) => {
                const displayedGenres = game.genres.slice(0, maxGenres)
                const extraCount = game.genres.length - maxGenres

                return (
                  <Card onClick={() => nav(`/game/${index + 1}`)} key={index} className="p-0 bg-transparent border-0 shadow-transparent transition-transform duration-300 hover:-translate-y-2 cursor-pointer">
                    <CardContent className="flex flex-col justify-center p-2">
                      <img src={game.image} alt={game.title} className="w-full aspect-[4/5] object-cover rounded-sm shadow-[0px_0px_8px_0px_var(--foreground)]" />
                      <div className="text-xl font-semibold mt-2 text-start line-clamp-1">{game.title} {index + 1}</div>
                      <div className="text-md text-start line-clamp-1">{game.dev}</div>
                      <div className="flex space-x-2">
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
          </div>
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
          <Footer />
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}

export default Browse
