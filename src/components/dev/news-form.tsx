import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"

interface News {
  title: string
  image: string
  content: string
}

const NewsFormSchema = z.object({
  title: z.string().min(1, "Title must not be empty"),
  image: z.string().min(1, "An image must be provided"),
  content: z.string().min(1, "Content must not be empty"),
})

export function NewsForm({ news, onSubmit }: { news?: News, onSubmit?: () => void }) {

  const newsForm = useForm<z.infer<typeof NewsFormSchema>>({
    resolver: zodResolver(NewsFormSchema),
    defaultValues: {
      title: news?.title || "",
      image: news?.image || "",
      content: news?.content || ""
    }
  })

  const [imageUrl, setImageUrl] = useState<string | null>(news?.image || null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      newsForm.setValue("image", url, { shouldValidate: true })
      setImageUrl(url)
    }
  }

  function onNewsFormSubmit(data: z.infer<typeof NewsFormSchema>) {
    console.log(JSON.stringify(data, null, 2))
    onSubmit?.()
  }

  return (
    <DialogContent className="sm:max-w-xl md:max-w-2xl max-h-[95vh] flex flex-col gap-2 justify-start overflow-auto">
      <DialogHeader>
        <DialogTitle>{news ? "Edit News" : "Add News"}</DialogTitle>
        <DialogDescription>{news ? "Please update the form to edit news." : "Please fill out the form to add news."}</DialogDescription>
      </DialogHeader>
      <Form {...newsForm}>
        <form onSubmit={newsForm.handleSubmit(onNewsFormSubmit)} className="space-y-4 flex flex-col mt-2">
          <FormField
            control={newsForm.control}
            name="image"
            render={() => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input type="file" accept="image/*" onChange={handleFileChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {imageUrl &&
            <img src={imageUrl} alt="Image" className="aspect-[2/1] object-cover rounded-md" />
          }
          <FormField
            control={newsForm.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={newsForm.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea {...field} className="overflow-auto max-h-44" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-1">Submit</Button>
        </form>
      </Form>
    </DialogContent>
  )
}
