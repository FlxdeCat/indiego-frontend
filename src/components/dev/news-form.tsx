import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ReactNode } from "react"

interface News {
  title: string
  image: string
  news: string
}

export function NewsForm({ news, trigger }: { news?: News, trigger: ReactNode }) {
  return (
    <Dialog>
      {trigger}
      {/* <DropdownMenuItem
        onSelect={(e) => e.preventDefault()}
        asChild
        className="w-full"
      >
        <DialogTrigger>
          Edit
        </DialogTrigger>
      </DropdownMenuItem> */}
      <DialogContent className="sm:max-w-xl md:max-w-2xl max-h-[90vh] flex flex-col gap-2 justify-start">
        <DialogHeader>
          <DialogTitle>Add News</DialogTitle>
          <DialogDescription>fill form here</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <div className="font-bold text-2xl">title</div>
          image
          <div>
            {"a\nb\n\nc".split("\n").map((line, i) => (
              <p key={i} className="whitespace-pre-wrap">
                {line.trim() === "" ? <br /> : line}
              </p>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
