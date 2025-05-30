import { convertDate } from "@/utils/utils"
import { ArrowDownNarrowWide, ArrowUpWideNarrow, Check, ChevronDown, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState, useMemo, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Review } from "@/types/review"
import { toast } from "sonner"
import { getGameReviews } from "@/api/review-api"
import { LoadingIcon } from "./loading-icon"

export function ReviewGame({ id }: { id: string }) {

  const [loading, setLoading] = useState(false)
  const [reviews, setReviews] = useState<Review[]>([])

  async function getGameReviewData() {
    setLoading(true)

    try {
      const reviewResponse = await getGameReviews({ gameId: id })
      setReviews(reviewResponse)
    } catch (err: any) {
      toast.error(err.message || "Fetch review data failed. Please try again later")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getGameReviewData()
  }, [])

  const sorters = ["Recent", "Rated"]

  const [open, setOpen] = useState(false)
  const [sort, setSort] = useState("Recent")
  const [ascending, setAscending] = useState(false)

  const sortedReviews = useMemo(() => {
    return [...reviews].sort((a, b) => {
      const a_date = Number(a.createdAt)
      const b_date = Number(b.createdAt)
      if (sort === "Recent") {
        if (a_date === b_date) return b.rating - a.rating
        return ascending ? a_date - b_date : b_date - a_date
      } else {
        if (a.rating === b.rating) return b_date - a_date
        return ascending ? a.rating - b.rating : b.rating - a.rating
      }
    })
  }, [reviews, sort, ascending])

  return (
    <div className="w-full max-w-7xl mt-4 mb-4 px-4 flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="gap-4">
          <h1 className="font-bold text-2xl">Reviews</h1>
        </div>
        <div className="flex gap-4 items-center">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="justify-between"
              >
                {sort}
                <ChevronDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[100px] p-0">
              <Command>
                <CommandList>
                  <CommandGroup>
                    {sorters.map((sorter, index) => (
                      <CommandItem
                        key={index}
                        value={sorter}
                        onSelect={(s) => {
                          setSort(s)
                          setOpen(false)
                        }}
                      >
                        {sorter}
                        <Check
                          className={cn(
                            "ml-auto",
                            sort === sorter ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <Button
            size="icon"
            variant="outline"
            onClick={() => setAscending(!ascending)}
          >
            {ascending ? <ArrowUpWideNarrow /> : <ArrowDownNarrowWide />}
          </Button>
        </div>
      </div>
      {loading ? (
        <div className="w-full flex justify-center">
          <LoadingIcon size={50} className="text-primary" />
        </div>
      ) : reviews.length == 0 ? (
        <div className="flex flex-col items-center text-center text-muted-foreground pt-4">
          There are no reviews yet.
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {sortedReviews.map((review, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 px-8 py-4 border-2 rounded-md"
            >
              <div className="flex flex-col items-start md:flex-row gap-2 md:gap-20">
                <div className="flex flex-col gap-2 items-start">
                  <div className="flex items-center gap-4">
                    <User size={44} />
                    <div className="flex flex-col items-start">
                      <h4 className="font-bold text-xl text-start">{review.username}</h4>
                      <h4 className="text-lg text-start">{review.rating} ★</h4>
                    </div>
                  </div>
                  <div>{convertDate(review.createdAt)}</div>
                </div>
                <div>
                  {review.text.split("\n").map((line: string, i: number) => (
                    <p key={i} className="whitespace-pre-wrap">
                      {line.trim() === "" ? <br /> : line}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
