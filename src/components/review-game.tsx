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
import { useState, useMemo } from "react"
import { cn } from "@/lib/utils"

interface Review {
  username: string
  review: string
  stars: number
  date: number
}

interface ReviewGameProps {
  reviews: Review[]
}

export function ReviewGame({ reviews }: ReviewGameProps) {

  const sorters = ["Recent", "Rated"]

  const [open, setOpen] = useState(false)
  const [sort, setSort] = useState("Recent")
  const [ascending, setAscending] = useState(false)

  const sortedReviews = useMemo(() => {
    return [...reviews].sort((a, b) => {
      if (sort === "Recent") {
        if (a.date === b.date) return b.stars - a.stars
        return ascending ? a.date - b.date : b.date - a.date
      } else {
        if (a.stars === b.stars) return b.date - a.date
        return ascending ? a.stars - b.stars : b.stars - a.stars
      }
    })
  }, [reviews, sort, ascending])

  return (
    <div className="w-full max-w-7xl mt-4 mb-4 px-4 flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
        <div className="flex gap-4 items-center">
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
      {sortedReviews.map((review, index) => (
        <div
          key={index}
          className="flex flex-col gap-2 p-4 border-1 border-foreground rounded-sm bg-muted"
        >
          <div className="flex flex-col md:flex-row gap-2 md:gap-20">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <User size={44} />
                <div className="flex flex-col">
                  <h4 className="font-bold text-xl">{review.username}</h4>
                  <h4 className="text-lg">{review.stars} ★</h4>
                </div>
              </div>
              <div>{convertDate(review.date)}</div>
            </div>
            <div className="p-0.5">{review.review}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
