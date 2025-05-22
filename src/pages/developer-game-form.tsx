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
import { genres } from "../schemas/temp"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Plus, Search } from "lucide-react"
import { GenreList } from "@/components/dev/dev-genre-list"
import { DevGameBannerCarousel } from "@/components/dev/dev-game-banner-carousel"

const GameFormSchema = z.object({
  title: z.string().min(1, "Title must not be empty"),
  desc: z.string().min(1, "Description must not be empty"),
  cover: z.instanceof(File, { message: "Cover image must be provided" }),
  banners: z
    .array(z.instanceof(File, { message: "Each banner must be an image" }))
    .min(1, "At least one banner image must be provided"),
  genres: z.array(z.string()).min(1, "Genre must not be empty"),
  external: z.string().url("Invalid URL").or(z.literal("")),
  file: z.instanceof(File, { message: "Downloadable file must be provided" }),
})

function DeveloperGameForm() {
  const { id } = useParams()
  const [coverUrl, setCoverUrl] = useState<string>()
  const [genreDialogOpen, setGenreDialogOpen] = useState(false)

  // TEMP
  let game = undefined
  if (id) {
    game = {
      title: "Holocure",
      desc: "Play as your favorite Vtubers from Hololive! Fight, explore, and clear your way through armies of fans and save them from their mind-control in this unofficial free fan-game.",
      genres: ["Action", "Comedy"],
    }
  }

  const gameForm = useForm<z.infer<typeof GameFormSchema>>({
    resolver: zodResolver(GameFormSchema),
    defaultValues: {
      title: game?.title ?? "",
      desc: game?.desc ?? "",
      cover: undefined as any,
      banners: [],
      genres: game?.genres ?? [],
      external: "",
      file: undefined as any,
    },
  })

  const watchCover = gameForm.watch("cover")

  useEffect(() => {
    if (watchCover instanceof File) {
      setCoverUrl(URL.createObjectURL(watchCover))
    }
  }, [watchCover])

  const [genreSearch, setGenreSearch] = useState("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) gameForm.setValue("file", file, { shouldValidate: true })
  }

  const onGameFormSubmit = (data: z.infer<typeof GameFormSchema>) => {
    console.log(data)
  }

  return (
    <div className="m-0 p-0 flex flex-col min-h-screen">
      <DevNavbar />
      <main className="flex-1 mx-4 flex flex-col items-center">
        <div className="w-full max-w-7xl">
          <h1 className="text-center lg:text-left text-2xl font-bold">Add Game</h1>
        </div>
        <Form {...gameForm}>
          <form onSubmit={gameForm.handleSubmit(onGameFormSubmit)} className="flex flex-col gap-4 items-center w-full max-w-7xl mb-4">
            <div className="flex flex-col lg:flex-row items-center gap-8 w-full mt-4">
              <div className="flex-3 w-full min-w-0">
                <FormField
                  control={gameForm.control}
                  name="banners"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="w-full overflow-x-auto">
                          <DevGameBannerCarousel
                            banners={field.value.map((file: File) =>
                              URL.createObjectURL(file)
                            )}
                            onAddBanners={(newFiles) => {
                              field.onChange([...field.value, ...newFiles])
                            }}
                            onRemoveBanner={(index) => {
                              const updated = [...field.value]
                              updated.splice(index, 1)
                              field.onChange(updated)
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex-1 flex flex-col space-y-4 items-center">
                <FormField
                  control={gameForm.control}
                  name="cover"
                  render={() => (
                    <FormItem className="w-full flex flex-col justify-center">
                      <FormControl>
                        <label className="w-full relative cursor-pointer max-w-76">
                          {coverUrl ? (
                            <>
                              <img src={coverUrl} className="aspect-[4/5] object-cover rounded-md w-full max-w-76" alt="Cover" />
                              <div className="absolute inset-0 bg-black/0 rounded-md flex items-center justify-center opacity-0 hover:opacity-100 hover:bg-black/70">
                                <Plus />
                              </div>
                            </>
                          ) : (
                            <div className="bg-muted/70 aspect-[4/5] flex items-center justify-center rounded-md w-full max-w-76 cursor-pointer hover:bg-muted">
                              <Plus />
                            </div>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              gameForm.setValue("cover", file as any, { shouldValidate: true })
                            }}
                          />
                        </label>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                  <div className="flex flex-col gap-2 w-full">
                    <Dialog open={genreDialogOpen} onOpenChange={setGenreDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className={`w-full ${gameForm.formState.errors.genres && "!border-red-500"}`}>Genres</Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-sm max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Select Genres</DialogTitle>
                          <DialogDescription>Filter and choose genres to describe your game.</DialogDescription>
                        </DialogHeader>
                        <div className="relative">
                          <Input
                            id="search"
                            placeholder="Search for genre"
                            className="pl-8"
                            value={genreSearch}
                            autoComplete="off"
                            onChange={(e) => setGenreSearch(e.target.value)}
                          />
                          <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-100" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <GenreList
                            genres={genres}
                            selected={gameForm.watch("genres")}
                            search={genreSearch}
                            onToggle={(genre) => {
                              const current = gameForm.getValues("genres")
                              const updated = current.includes(genre)
                                ? current.filter((g) => g !== genre)
                                : [...current, genre]
                              gameForm.setValue("genres", updated, { shouldValidate: true })
                            }}
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                    <div>
                      <FormField
                        control={gameForm.control}
                        name="genres"
                        render={() => (
                          <FormItem className="w-full">
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex flex-wrap gap-2 mt-2">
                        {gameForm.watch("genres").map((genre, index) => (
                          <Badge key={index} variant="secondary">{genre}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col items-start justify-center sm:flex-row gap-4">
                <FormField
                  control={gameForm.control}
                  name="external"
                  render={({ field }) => (
                    <FormItem className="flex-1 w-full">
                      <FormLabel>External Link (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Link to your game page (e.g. Steam or Itch.io)" {...field} />
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
    </div >
  )
}

export default DeveloperGameForm
