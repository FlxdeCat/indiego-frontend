import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { convertDate, paginationNumbers } from "@/utils/utils"
import { useState } from "react"
import { Button } from "../ui/button"
import { Trash2, User } from "lucide-react"
import { DeleteReviewsDialog } from "./delete-reviews-dialog"
import { usePagination } from "@/hooks/use-pagination"
import { Review } from "@/types/review"

export function AdminReviews({ reviews }: { reviews: Review[] }) {

  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)
  const { paginatedItems: paginatedReviews, totalPages } = usePagination(reviews, currentPage, itemsPerPage)

  const [deleteIndex, setDeleteIndex] = useState<number | null>(null)

  return (
    <div className="flex flex-col items-center w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {paginatedReviews.map((review, index) => (
          <div key={index} className="relative m-0 p-0">
            <div
              key={index}
              className="flex flex-col gap-2 pl-8 pr-12 py-4 border-2 rounded-md"
            >
              <div className="flex flex-col xl:flex-row gap-2 xl:gap-20 items-start">
                <div className="flex flex-col gap-2 items-start">
                  <div className="flex items-center gap-4">
                    <User size={77} />
                    <div className="flex flex-col items-start">
                      <h4 className="font-bold text-xl text-start">{review.username}</h4>
                      <h4 className="font-bold text-lg text-start">{review.gameName}</h4>
                      <h4 className="text-lg text-start">{review.rating} ★</h4>
                    </div>
                  </div>
                  <div>{convertDate(review.createdAt)}</div>
                </div>
                <div className="text-start">
                  {review.text.split("\n").map((line: string, i: number) => (
                    <p key={i} className="whitespace-pre-wrap">
                      {line.trim() === "" ? <br /> : line}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center absolute top-2 right-2">
              <Button variant="destructive" onClick={() => {
                setDeleteIndex(index)
              }}><Trash2 /></Button>
            </div>
          </div>
        ))}
      </div>

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

      <DeleteReviewsDialog
        id={deleteIndex !== null ? reviews[deleteIndex].id : ""}
        open={deleteIndex !== null}
        username={deleteIndex !== null ? reviews[deleteIndex].username : ""}
        title={deleteIndex !== null ? reviews[deleteIndex].gameName : ""}
        onOpenChange={(open) => {
          if (!open) setDeleteIndex(null)
        }}
      />
    </div>
  )
}
