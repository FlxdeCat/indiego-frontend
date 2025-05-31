import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { postReview } from "@/api/review-api"
import { LoadingIcon } from "./loading-icon"

const ReviewSchema = z.object({
  rating: z.number().min(1, "Please provide a rating").max(500, "Rating must be at most 500 characters long"),
  review: z.string().min(1, "Review must not be empty"),
})

export function AddReview({ id, name }: { id: string, name: string }) {
  const [rating, setRating] = useState(0)

  const { register, handleSubmit, setValue, clearErrors, formState: { errors } } = useForm<z.infer<typeof ReviewSchema>>({
    resolver: zodResolver(ReviewSchema),
    defaultValues: {
      rating: 0,
      review: ""
    }
  })

  const [loading, setLoading] = useState(false)

  async function onSubmit(data: z.infer<typeof ReviewSchema>) {
    setLoading(true)

    const formattedData = {
      text: data.review,
      rating: data.rating
    }

    try {
      await postReview(id, formattedData)
      window.location.reload()
    } catch (err: any) {
      toast.error(err.message || "Post failed. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row items-center gap-4 md:gap-10">
      <div className="flex flex-col items-center px-2 mb-2 md:mb-0">
        <h1 className="text-center font-semibold text-xl">Rate {name}</h1>
        <div className="flex gap-1 text-4xl cursor-pointer">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => {
                setRating(star)
                setValue("rating", star)
                clearErrors("rating")
              }}
              className="hover:text-muted-foreground"
            >
              {star <= rating ? "★" : "☆"}
            </span>
          ))}
        </div>
        {errors.rating && <p className="text-destructive text-sm">{errors.rating.message}</p>}
      </div>
      <div className="md:w-[1px] border-1 self-stretch" />
      <div className="flex flex-col w-full items-center md:items-start px-4">
        <Label className="text-xl mb-4 font-semibold" htmlFor="review">Review {name}</Label>
        <div className="flex flex-col gap-1 mb-2 w-full">
          <Textarea className={errors.review?.message ? "!border-red-500" : ""} placeholder="Write your review here..." id="review" {...register("review")} />
          {errors.review && <p className="text-destructive text-sm">{errors.review.message}</p>}
        </div>
        <div className="flex justify-between items-start w-full gap-2">
          <p className="text-sm text-muted-foreground">
            Please describe what you liked or disliked about this game and whether you recommend it to others.
          </p>
          <Button type="submit" className="mt-1" disabled={loading}>
            {loading && <LoadingIcon />}
            {loading ? "Posting..." : "Post"}
          </Button>
        </div>
      </div>
    </form>
  )
}