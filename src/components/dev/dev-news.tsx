import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { convertDate, paginationNumbers } from "@/utils/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "../ui/button"
import { MoreVerticalIcon } from "lucide-react"
import { DeleteNewsDialog } from "./delete-news-dialog"
import { NewsForm } from "./news-form"
import { useState } from "react"
import { usePagination } from "@/hooks/use-pagination"
import { News } from "@/types/news"

export function DevNews({ newss }: { newss: News[] }) {

  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)
  const { paginatedItems: paginatedNews, totalPages } = usePagination(newss, currentPage, itemsPerPage)

  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null)
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null)

  return (
    <div className="flex flex-col items-center w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {paginatedNews.map((news, index) => (
          <div key={index} className="relative m-0 p-0">
            <Dialog>
              <DialogTrigger asChild>
                <div className="flex flex-col sm:flex-row justify-center items-center w-full hover:bg-muted/50 cursor-pointer border-2 rounded-md">
                  <div className="flex-2 lg:flex-1">
                    <img loading="lazy" src={URL.createObjectURL(news.image)} alt={news.devName} className="object-cover h-auto rounded-l-sm" />
                  </div>
                  <div className="flex-2 text-start flex flex-col gap-2 py-2 pl-8 pr-12 w-full">
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
                    <img loading="lazy" src={URL.createObjectURL(news.image)} alt={news.devName} className="aspect-[2/1] object-cover rounded-md" />
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

            <div className="flex justify-center absolute bottom-2 sm:top-2 right-2">
              <DropdownMenu
                open={openDropdownIndex === index}
                onOpenChange={(open) => {
                  setOpenDropdownIndex(open ? index : null)
                }}
              >
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex text-muted-foreground data-[state=open]:bg-muted"
                    size="icon"
                  >
                    <MoreVerticalIcon />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="mr-4 -mt-4">
                  <DropdownMenuItem asChild>
                    <button
                      className="w-full text-left"
                      onClick={() => {
                        setOpenDropdownIndex(null)
                        setTimeout(() => {
                          setEditingIndex(index)
                        }, 10)
                      }}
                    >
                      Edit
                    </button>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <button
                      className="w-full text-left"
                      onClick={() => {
                        setOpenDropdownIndex(null)
                        setTimeout(() => {
                          setDeleteIndex(index)
                        }, 10)
                      }}
                    >
                      Delete
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))
        }
      </div >

      <Pagination className="mt-6">
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

      <Dialog
        open={editingIndex !== null}
        onOpenChange={(open) => {
          if (!open) setEditingIndex(null)
        }}
      >
        {editingIndex !== null && (
          <NewsForm
            news={newss[editingIndex]}
            onSubmit={() => setEditingIndex(null)}
          />
        )}
      </Dialog>

      <DeleteNewsDialog
        id={deleteIndex !== null ? newss[deleteIndex].id : ""}
        open={deleteIndex !== null}
        title={deleteIndex !== null ? newss[deleteIndex].title : ""}
        onOpenChange={(open) => {
          if (!open) setDeleteIndex(null)
        }}
      />
    </div >
  )
}
