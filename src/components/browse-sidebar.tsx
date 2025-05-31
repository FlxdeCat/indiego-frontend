import { useEffect, useState } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Search } from "lucide-react"
import { Checkbox } from "./ui/checkbox"
import { Genre } from "@/types/genre"
import { getGenres } from "@/api/genre-api"
import { toast } from "sonner"
import { LoadingIcon } from "./loading-icon"

interface BrowseSidebarProps {
  checkedGenres: Set<string>
  setCheckedGenres: React.Dispatch<React.SetStateAction<Set<string>>>
  genreSearch: string
  setGenreSearch: React.Dispatch<React.SetStateAction<string>>
}

export function BrowseSidebar({ checkedGenres, setCheckedGenres, genreSearch, setGenreSearch }: BrowseSidebarProps) {

  const [genres, setGenres] = useState<Genre[]>([])
  const [genreLoading, setGenreLoading] = useState(false)

  async function getAllGenres() {
    setGenreLoading(true)

    try {
      const genreResponse = await getGenres()
      setGenres(genreResponse)
    } catch (err: any) {
      toast.error(err.message || "Fetch genre failed. Please try again later.")
    } finally {
      setGenreLoading(false)
    }
  }

  useEffect(() => {
    getAllGenres()
  }, [])

  const filteredGenres = genres.filter((genre: Genre) =>
    genre.name.toLowerCase().includes(genreSearch.toLowerCase())
  )

  const toggleGenre = (genreId: string) => {
    setCheckedGenres((prev) => {
      const checked = new Set(prev)
      if (checked.has(genreId)) {
        checked.delete(genreId)
      } else {
        checked.add(genreId)
      }
      return checked
    })
  }

  return (
    <Sidebar className="top-[60px] !h-[calc(100svh-60px)] z-30 border-1">
      <SidebarHeader>
        <div className="font-bold text-2xl pt-2 px-1">Filter Games</div>
        <SidebarGroup className="px-0">
          <SidebarGroupContent className="relative">
            <SidebarInput
              id="search"
              placeholder="Search for genre"
              className="pl-8"
              value={genreSearch}
              onChange={(e) => setGenreSearch(e.target.value)}
              autoComplete="off"
            />
            <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {genreLoading ? (
                <div className="w-full flex justify-center items-center">
                  <LoadingIcon size={30} className="text-primary" />
                </div>
              ) : (
                filteredGenres.map((genre) => (
                  <label key={genre.id} htmlFor={genre.name} className="cursor-pointer">
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <div className="flex space-x-2">
                          <Checkbox
                            id={genre.name}
                            checked={checkedGenres.has(genre.id)}
                            onCheckedChange={() => toggleGenre(genre.id)}
                          />
                          <div>{genre.name}</div>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </label>
                ))
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}