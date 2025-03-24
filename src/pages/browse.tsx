import { BrowseGameSearch } from "@/components/browse-game-search"
import { BrowseSidebar } from "@/components/browse-sidebar"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

function Browse() {

  return (
    <div className="m-0 p-0 flex flex-col min-h-screen">
      <Navbar />
      <SidebarProvider className="min-h-[calc(100svh-60px)]">
        <BrowseSidebar />
        <SidebarInset className="flex flex-col">
          <div className="flex h-12 shrink-0 items-center gap-2 px-4 sticky top-[60px] bg-background z-20 shadow-sm shadow-muted-foreground">
            <SidebarTrigger className="-ml-2" />
            <Separator orientation="vertical" className="mr-2" />
            <BrowseGameSearch />
          </div>
          <div className="flex-1 p-4 pb-0">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
            </div>
          </div>
          <Footer />
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}

export default Browse
