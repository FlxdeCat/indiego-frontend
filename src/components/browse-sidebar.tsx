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
    "Action",
    "Adventure",
    "RPG",
    "Shooter",
    "Fighting",
    "Platformer",
    "Survival",
    "Horror",
    "Stealth",
    "Puzzle",
    "Simulation",
    "Strategy",
    "Turn-Based Strategy",
    "Real-Time Strategy",
    "Card Game",
    "MOBA",
    "Battle Royale",
    "MMORPG",
    "Sandbox",
    "Roguelike",
    "Visual Novel",
    "Rhythm",
    "Sports",
    "Racing",
    "Party",
    "Casual",
    "Idle",
    "Educational"
  ]

  return (
    <Sidebar className="top-[60px] !h-[calc(100svh-60px)] z-30 shadow-sm shadow-muted-foreground">
      <SidebarHeader>
        <div className="font-bold text-2xl pt-2 px-1">
          Browse Games
        </div>
        <SidebarGroup className="px-0">
          <SidebarGroupContent className="relative">
            <SidebarInput
              id="search"
              placeholder="Search for genre"
              className="pl-8"
            />
            <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {genres.map((genre, index) => (
                <label key={index} htmlFor={genre}>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <div className="flex space-x-2">
                        <Checkbox id={genre} />
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
