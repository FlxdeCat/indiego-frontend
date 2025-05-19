import { DevNavbar } from "@/components/dev/dev-navbar"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams } from "react-router"
import * as z from "zod"
import { useEffect, useState } from "react"

const genreList = ["Action", "Adventure", "Comedy", "Horror", "RPG", "Shooter", "Strategy"]

const gameSchema = z.object({
  title: z.string().min(1),
  desc: z.string().min(1),
  cover: z.instanceof(File),
  banners: z.array(z.instanceof(File)).min(1),
  genres: z.array(z.string()).min(1),
  externalLink: z.string().url(),
  file: z.instanceof(File),
})

type GameFormData = z.infer<typeof gameSchema>

function DeveloperGameForm() {
  const { id } = useParams()
  const isEdit = !!id
  const [coverPreview, setCoverPreview] = useState<string>()
  const [bannersPreview, setBannersPreview] = useState<string[]>([])
  const [genreDialogOpen, setGenreDialogOpen] = useState(false)

  const form = useForm<GameFormData>({
    resolver: zodResolver(gameSchema),
    defaultValues: {
      title: "",
      desc: "",
      cover: undefined as any,
      banners: [],
      genres: [],
      externalLink: "",
      file: undefined as any,
    },
  })

  const { register, handleSubmit, setValue, watch } = form

  const watchCover = watch("cover")
  const watchBanners = watch("banners")

  useEffect(() => {
    if (watchCover instanceof File) {
      setCoverPreview(URL.createObjectURL(watchCover))
    }
  }, [watchCover])

  useEffect(() => {
    if (Array.isArray(watchBanners) && watchBanners.every(f => f instanceof File)) {
      setBannersPreview(watchBanners.map(file => URL.createObjectURL(file)))
    }
  }, [watchBanners])

  const onSubmit = (data: GameFormData) => {
    console.log("Submitted:", data)
  }

  return (
    <div className="m-0 p-0 flex flex-col min-h-screen">
      <DevNavbar />
      <main className="flex-1 mx-4 flex flex-col items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center w-full max-w-7xl"
        >
          <div className="flex flex-col lg:flex-row items-center gap-8 w-full mt-4">
            <div className="flex-3 w-full min-w-0">
              <div className="grid grid-cols-2 gap-2">
                {bannersPreview.map((src, idx) => (
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
                      setValue("banners", files as any)
                    }}
                  />
                </label>
              </div>
            </div>

            <div className="flex-1 flex flex-col space-y-4 items-center">
              <label className="w-full">
                {coverPreview ? (
                  <img
                    src={coverPreview}
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
                  {...register("cover")}
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) setValue("cover", file)
                  }}
                />
              </label>

              <div className="flex flex-col space-y-1 items-center lg:items-start w-full">
                <Input placeholder="Title" {...register("title")} />
                <Textarea placeholder="Description" {...register("desc")} />

                <Dialog open={genreDialogOpen} onOpenChange={setGenreDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">Select Genres</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-sm max-h-[80vh] overflow-y-auto">
                    <div className="space-y-2">
                      {genreList.map((genre) => (
                        <div key={genre} className="flex items-center gap-2">
                          <Checkbox
                            checked={form.getValues("genres").includes(genre)}
                            onCheckedChange={(checked) => {
                              const current = form.getValues("genres")
                              const updated = checked ? [...current, genre] : current.filter(g => g !== genre)
                              setValue("genres", updated)
                            }}
                          />
                          <label>{genre}</label>
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
                <div className="flex flex-wrap gap-2 mt-2">
                  {watch("genres").map((genre, index) => (
                    <Badge key={index} variant="secondary">{genre}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full max-w-7xl mt-8 border-y-2 py-8 px-4 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col items-center sm:flex-row sm:items-end gap-4 w-full">
              <Input placeholder="External Link" {...register("externalLink")} />
              <Input
                type="file"
                accept=".zip,.rar,.7z,.exe,.apk"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) setValue("file", file)
                }}
              />
              <Button type="submit">{isEdit ? "Update Game" : "Add Game"}</Button>
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  )
}

export default DeveloperGameForm
