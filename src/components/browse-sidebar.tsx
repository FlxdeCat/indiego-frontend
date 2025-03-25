import { useState } from "react"
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

export function BrowseSidebar() {
  const genres = [
    "Action", "Adventure", "RPG", "Shooter", "Fighting", "Platformer", "Survival", "Horror", "Stealth", "Puzzle", "Simulation", "Strategy", "Turn-Based Strategy", "Real-Time Strategy", "Card Game", "MOBA", "Battle Royale", "MMORPG", "Sandbox", "Roguelike", "Visual Novel", "Rhythm", "Sports", "Racing", "Party", "Casual", "Idle", "Educational"
  ]

  const [genreSearch, setGenreSearch] = useState("")
  const [checkedGenres, setCheckedGenres] = useState(new Set())

  const filteredGenres = genres.filter((genre) =>
    genre.toLowerCase().includes(genreSearch.toLowerCase())
  )

  const toggleGenre = (genre: string) => {
    setCheckedGenres((prev) => {
      const checked = new Set(prev)
      if (checked.has(genre)) {
        checked.delete(genre)
      } else {
        checked.add(genre)
      }
      return checked
    })
  }

  return (
    <Sidebar className="top-[60px] !h-[calc(100svh-60px)] z-30 shadow-sm shadow-muted-foreground">
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
            />
            <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredGenres.map((genre) => (
                <label key={genre} htmlFor={genre} className="cursor-pointer">
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <div className="flex space-x-2">
                        <Checkbox
                          id={genre}
                          checked={checkedGenres.has(genre)}
                          onCheckedChange={() => toggleGenre(genre)}
                        />
                        <div>{genre}</div>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </label>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}