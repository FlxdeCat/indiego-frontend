import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const ReviewSchema = z.object({
  rating: z.number().min(1, "Please provide a rating"),
  review: z.string().min(1, "Review must not be empty"),
})

export function AddReview({ id }: { id: string }) {
  const [rating, setRating] = useState(0)

  const { register, handleSubmit, setValue, clearErrors, formState: { errors } } = useForm<z.infer<typeof ReviewSchema>>({
    resolver: zodResolver(ReviewSchema),
    defaultValues: {
      rating: 0,
      review: ""
    }
  })

  function onSubmit(data: z.infer<typeof ReviewSchema>) {
    console.log(JSON.stringify(data, null, 2))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row items-center gap-4 sm:gap-10">
      <div className="flex flex-1 flex-col items-center">
        <h1 className="text-start font-semibold text-lg">Rate Holocure {id}</h1>
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
      <div className="sm:w-[1px] border-1 self-stretch" />
      <div className="flex flex-4 flex-col w-full gap-2">
        <Label className="text-lg" htmlFor="review">Review Holocure {id}</Label>
        <div className="flex flex-col gap-1">
          <Textarea placeholder="Write your review here..." id="review" {...register("review")} />
          {errors.review && <p className="text-destructive text-sm">{errors.review.message}</p>}
        </div>
        <div className="flex justify-between items-start gap-2">
          <p className="text-sm text-muted-foreground">
            Please describe what you liked or disliked about this game and whether you recommend it to others.
          </p>
          <Button type="submit" className="mt-1">Submit</Button>
        </div>
      </div>
    </form>
  )
}