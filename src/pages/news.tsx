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
import { convertDate, paginationNumbers } from "@/utils/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { usePagination } from "@/hooks/use-pagination"
import { useEffect, useState } from "react"
import { getNews } from "@/api/news-api"
import { toast } from "sonner"
import { News as NewsType } from "@/types/news"
import { LoadingIcon } from "@/components/loading-icon"

function News() {

  const [loading, setLoading] = useState(false)
  const [newss, setNewss] = useState<NewsType[]>([])

  async function getAllNews() {
    setLoading(true)

    try {
      const subscriptionTierResponse = await getNews()
      setNewss(subscriptionTierResponse)
    } catch (err: any) {
      toast.error(err.message || "Fetch news failed. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllNews()
  }, [])

  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)
  const { paginatedItems: paginatedNews, totalPages } = usePagination(newss, currentPage, itemsPerPage)

  return (
    <div className="m-0 p-0 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex flex-col items-center flex-1 mx-16">
        <div className="flex flex-col space-y-4 items-center w-full max-w-5xl mt-4">
          <div className="text-3xl font-bold text-center w-full py-4 border-y-1">Recent News</div>
          {loading ? (
            <LoadingIcon size={50} className="text-primary" />
          ) : (
            paginatedNews.length === 0 ? (
              <div className="flex flex-col items-center text-center text-muted-foreground pt-2">
                There are no news yet.
              </div>
            ) : (
              <div className="flex flex-col space-y-8 w-full">
                {paginatedNews.map((news, index) => (
                  <Dialog key={index}>
                    <DialogTrigger asChild>
                      <div className="flex flex-col sm:flex-row justify-center items-center w-full hover:bg-muted/50 cursor-pointer border-2 rounded-md">
                        <div className="flex-2 lg:flex-1">
                          <img loading="lazy" src={URL.createObjectURL(news.image)} alt={news.title} className="object-cover h-auto rounded-l-sm" />
                        </div>
                        <div className="flex-2 text-start flex flex-col gap-2 py-2 px-8">
                          <div className="flex flex-col gap-1">
                            <div className="font-bold text-xl md:text-2xl line-clamp-1">{news.title}</div>
                            <div className="text-sm text-muted-foreground">{convertDate(news.createdAt)}</div>
                          </div>
                          <div className="text-sm md:text-base line-clamp-3">
                            {news.text.split("\n").map((line: string, i: number) => (
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
                        <DialogTitle>{news.devName}</DialogTitle>
                        <DialogDescription>{convertDate(news.createdAt)}</DialogDescription>
                      </DialogHeader>
                      <ScrollArea className="flex-1 max-h-[90vh] overflow-auto pr-4">
                        <div className="flex flex-col space-y-4">
                          <div className="font-bold text-2xl">{news.title}</div>
                          <img loading="lazy" src={URL.createObjectURL(news.image)} alt={news.title} className="aspect-[2/1] object-cover rounded-md" />
                          <div>
                            {news.text.split("\n").map((line: string, i: number) => (
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
            )
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
      </main>
      <Footer />
    </div>
  )
}

export default News
