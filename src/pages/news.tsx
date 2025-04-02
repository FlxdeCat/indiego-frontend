import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { convertDate } from "@/utils/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

function News() {

  const newss = [
    {
      title: "Some Updates",
      dev: "Hololive",
      image: "holocure-banner.png",
      date: 1742963482,
      content:
        `A whole bunch of bug fixes and some minor balance adjustments!\n\nCharacter 1\n-Increased base SPD slightly.\n-Increased damage and chance of Skill 1 slightly.\n\nCharacter 3\n-Increased damage for Skill 2\n-Increased hitbox size for Summon at level 7`
    },
    {
      title: "Some Updates",
      dev: "Hololive",
      image: "holocure-banner.png",
      date: 1742963482,
      content:
        `A whole bunch of bug fixes and some minor balance adjustments!\n\nCharacter 1\n-Increased base SPD slightly.\n-Increased damage and chance of Skill 1 slightly.\n\nCharacter 3\n-Increased damage for Skill 2\n-Increased hitbox size for Summon at level 7.`
    },
    {
      title: "Some Updates",
      dev: "Hololive",
      image: "holocure-banner.png",
      date: 1742963482,
      content:
        `A whole bunch of bug fixes and some minor balance adjustments!\n\nCharacter 1\n-Increased base SPD slightly.\n-Increased damage and chance of Skill 1 slightly.\n\nCharacter 3\n-Increased damage for Skill 2\n-Increased hitbox size for Summon at level 7.`
    },
    {
      title: "Some Updates",
      dev: "Hololive",
      image: "holocure-banner.png",
      date: 1742963482,
      content:
        `A whole bunch of bug fixes and some minor balance adjustments!\n\nCharacter 1\n-Increased base SPD slightly.\n-Increased damage and chance of Skill 1 slightly.\n\nCharacter 3\n-Increased damage for Skill 2\n-Increased hitbox size for Summon at level 7.`
    },
  ]

  return (
    <div className="m-0 p-0 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex flex-col items-center flex-1 mx-16">
        <div className="flex flex-col space-y-4 items-center w-full max-w-5xl mt-4">
          <div className="text-3xl font-bold text-center w-full py-4 border-y-1">Recent News</div>
          <div className="flex flex-col space-y-8 w-full">
            {newss.map((news, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <div className="flex flex-col sm:flex-row justify-center items-center w-full hover:bg-accent cursor-pointer border-2 rounded-md">
                    <div className="flex-2 lg:flex-1">
                      <img src={news.image} alt="Holocure" className="object-cover h-auto rounded-l-sm" />
                    </div>
                    <div className="flex-2 text-start flex flex-col gap-2 py-2 px-8">
                      <div className="flex flex-col gap-1">
                        <div className="font-bold text-xl md:text-2xl line-clamp-1">{news.title}</div>
                        <div className="text-sm text-muted-foreground">{convertDate(news.date)}</div>
                      </div>
                      <div className="text-sm md:text-base line-clamp-3">
                        {news.content.split("\n").map((line, i) => (
                          <p key={i} className="whitespace-pre-wrap">
                            {line.trim() === "" ? <br /> : line}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-xl md:max-w-2xl max-h-[90vh] flex flex-col gap-2 justify-start">
                  <DialogHeader>
                    <DialogTitle>{news.dev}</DialogTitle>
                    <DialogDescription>{convertDate(news.date)}</DialogDescription>
                  </DialogHeader>
                  <ScrollArea className="flex-1 max-h-[90vh] overflow-auto pr-4">
                    <div className="flex flex-col space-y-4">
                      <div className="font-bold text-2xl">{news.title}</div>
                      <img src={news.image} alt="Holocure" className="aspect-[2/1] object-cover rounded-sm" />
                      <div>
                        {news.content.split("\n").map((line, i) => (
                          <p key={i} className="whitespace-pre-wrap">
                            {line.trim() === "" ? <br /> : line}
                          </p>
                        ))}
                      </div>
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            ))}
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
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default News
