import { DevNavbar } from "@/components/dev/dev-navbar"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams } from "react-router"
import * as z from "zod"
import { useEffect, useState } from "react"
import { genres } from "../schema/temp"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const GameFormSchema = z.object({
  title: z.string().min(1, "Title must not be empty"),
  desc: z.string().min(1, "Description must not be empty"),
  cover: z.instanceof(File),
  banners: z.array(z.instanceof(File)).min(1, "At least one banner image must be provided"),
  genres: z.array(z.string()).min(1, "Genre must not be empty"),
  external: z.string().url("Invalid URL"),
  file: z.instanceof(File),
})

function DeveloperGameForm() {
  const { id } = useParams()
  const [coverUrl, setCoverUrl] = useState<string>()
  const [bannersUrl, setBannersUrl] = useState<string[]>([])
  const [genreDialogOpen, setGenreDialogOpen] = useState(false)

  const gameForm = useForm<z.infer<typeof GameFormSchema>>({
    resolver: zodResolver(GameFormSchema),
    defaultValues: {
      title: "",
      desc: "",
      cover: undefined as any,
      banners: [],
      genres: [],
      external: "",
      file: undefined as any,
    },
  })

  const watchCover = gameForm.watch("cover")
  const watchBanners = gameForm.watch("banners")

  useEffect(() => {
    if (watchCover instanceof File) {
      setCoverUrl(URL.createObjectURL(watchCover))
    }
  }, [watchCover])

  useEffect(() => {
    if (Array.isArray(watchBanners) && watchBanners.every(f => f instanceof File)) {
      setBannersUrl(watchBanners.map(file => URL.createObjectURL(file)))
    }
  }, [watchBanners])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) gameForm.setValue("file", file)
  }

  const onGameFormSubmit = (data: z.infer<typeof GameFormSchema>) => {
    console.log(JSON.stringify(data, null, 2))
  }

  return (
    <div className="m-0 p-0 flex flex-col min-h-screen">
      <DevNavbar />
      <main className="flex-1 mx-4 flex flex-col items-center">
        <div className="w-full max-w-7xl">
          <h1 className="text-center lg:text-left text-2xl font-bold">Add Game</h1>
        </div>
        <Form {...gameForm}>
          <form onSubmit={gameForm.handleSubmit(onGameFormSubmit)} className="flex flex-col gap-4 items-center w-full max-w-7xl">
            <div className="flex flex-col lg:flex-row items-center gap-8 w-full mt-4">
              <div className="flex-3 w-full min-w-0">
                <div className="grid grid-cols-2 gap-2">
                  {bannersUrl.map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      alt={`Banner ${idx + 1}`}
                      className="aspect-[7/4] object-cover rounded-md"
                    />
                  ))}
                  <label className="bg-gray-200 aspect-[7/4] flex items-center justify-center rounded-md cursor-pointer">
                    +
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        const files = Array.from(e.target.files || [])
                        gameForm.setValue("banners", files as any)
                      }}
                    />
                  </label>
                </div>
              </div>

              <div className="flex-1 flex flex-col space-y-4 items-center">
                <label className="w-full">
                  {coverUrl ? (
                    <img
                      src={coverUrl}
                      className="aspect-[4/5] object-cover rounded-md w-full max-w-76"
                      alt="Cover"
                    />
                  ) : (
                    <div className="bg-gray-200 aspect-[4/5] flex items-center justify-center rounded-md w-full max-w-76">
                      +
                    </div>
                  )}
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    {...gameForm.register("cover")}
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) gameForm.setValue("cover", file)
                    }}
                  />
                </label>

                <div className="flex flex-col gap-4 items-center lg:items-start w-full">
                  <FormField
                    control={gameForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input placeholder="Title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={gameForm.control}
                    name="desc"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Textarea placeholder="Description" {...field} className="overflow-auto max-h-44" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Dialog open={genreDialogOpen} onOpenChange={setGenreDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">Genres</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-sm max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Select Genres</DialogTitle>
                        <DialogDescription>Filter and choose genres to describe your game.</DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {genres.map((genre) => {
                          const isSelected = gameForm.getValues("genres").includes(genre)
                          return (
                            <div
                              key={genre}
                              className={`
                                p-2 rounded cursor-pointer text-center font-bold
                                ${isSelected ? 'bg-primary text-primary-foreground hover:bg-primary/80' : 'bg-muted/50 hover:bg-muted'}
                              `}
                              onClick={() => {
                                const current = gameForm.getValues("genres")
                                const updated = isSelected
                                  ? current.filter(g => g !== genre)
                                  : [...current, genre]
                                gameForm.setValue("genres", updated)
                              }}
                            >
                              {genre}
                            </div>
                          )
                        })}
                      </div>
                    </DialogContent>
                  </Dialog>
                  <div className="flex flex-wrap gap-2">
                    {gameForm.watch("genres").map((genre, index) => (
                      <Badge key={index} variant="secondary">{genre}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col items-center justify-center sm:flex-row gap-4">
                <FormField
                  control={gameForm.control}
                  name="external"
                  render={({ field }) => (
                    <FormItem className="flex-1 w-full">
                      <FormLabel>External Link</FormLabel>
                      <FormControl>
                        <Input placeholder="External Link" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={gameForm.control}
                  name="file"
                  render={() => (
                    <FormItem className="flex-1 w-full">
                      <FormLabel>Downloadable File</FormLabel>
                      <FormControl>
                        <Input type="file" accept=".zip,.rar,.7z,.exe,.apk" onChange={handleFileChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full">Submit</Button>
            </div>
          </form>
        </Form>
      </main>
      <Footer />
    </div>
  )
}

export default DeveloperGameForm
