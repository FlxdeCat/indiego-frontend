import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { smoothScroll } from "@/utils/utils"
import { Plus, X } from "lucide-react"

interface DevGameBannerCarouselProps {
  banners: string[],
  onAddBanners?: (files: File[]) => void,
  onRemoveBanner?: (index: number) => void
}

export function DevGameBannerCarousel({ banners, onAddBanners, onRemoveBanner }: DevGameBannerCarouselProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  )

  const [api, setApi] = React.useState<CarouselApi | null>(null)
  const [current, setCurrent] = React.useState(0)

  const handleSelect = React.useCallback(() => {
    if (!api) return
    const newIndex = api.selectedScrollSnap()
    setCurrent(newIndex)

    const thumb = document.getElementById(`game-banner-${newIndex}`)
    const container = thumb?.parentElement?.parentElement

    if (thumb && container) {
      const containerRect = container.getBoundingClientRect()
      const thumbRect = thumb.getBoundingClientRect()

      const offset = thumbRect.left - containerRect.left - (containerRect.width / 2) + (thumbRect.width / 2)
      smoothScroll(container, container.scrollLeft + offset, 300)
    }
  }, [api])

  React.useEffect(() => {
    if (!api) return

    api.on("select", handleSelect)
    return () => { api.off("select", handleSelect) }
  }, [api, handleSelect])

  const getImageSrc = (img: string | File): string => {
    return (typeof img === "string") ? img : URL.createObjectURL(img)
  }

  return (
    <div className="flex flex-col h-full w-full items-center gap-4">
      <div className="w-full max-w-7xl">
        <Carousel
          setApi={setApi}
          opts={{ align: "start", loop: true }}
          plugins={[plugin.current]}
          className="rounded-md"
        >
          <CarouselContent>
            {onAddBanners && banners.length == 0 && (
              <label className="w-full aspect-[7/4] bg-muted/70 flex items-center justify-center rounded-md cursor-pointer hover:bg-muted">
                <Plus size={15} />
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || [])
                    if (files.length > 0) {
                      onAddBanners(files)
                    }
                  }}
                />
              </label>
            )}
            {banners.map((banner, index) => (
              <CarouselItem key={index}>
                <Card className="p-0 border-0">
                  <CardContent className="rounded-md p-0">
                    <img
                      src={getImageSrc(banner)}
                      className="w-full rounded-md object-cover aspect-[7/4]"
                      alt={`Game banner ${index + 1}`}
                      loading="lazy"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {banners.length > 0 &&
        <div className="w-full max-w-7xl px-2">
          <div
            className="overflow-x-auto pb-3"
            style={{ overscrollBehaviorX: 'contain' }}
          >
            <div className="flex gap-2 w-max mx-auto">
              {banners.map((banner, index) => (
                <div
                  id={`game-banner-${index}`}
                  key={index}
                  className={`relative h-12 min-w-20 overflow-hidden rounded-md transition-opacity outline-none ${index === current
                    ? "opacity-100"
                    : "opacity-50 hover:opacity-75 focus:opacity-75"
                    }`}
                >
                  <button
                    type="button"
                    onClick={() => api?.scrollTo(index)}
                    className="w-full h-full"
                  >
                    <img
                      src={getImageSrc(banner)}
                      className="object-cover w-full h-full pointer-events-none"
                      alt={`Thumbnail ${index + 1}`}
                      loading="lazy"
                    />
                  </button>
                  {index === current && (
                    <div className="absolute inset-0 border-2 border-foreground rounded-md pointer-events-none" />
                  )}
                  {onRemoveBanner && (
                    <button
                      type="button"
                      onClick={() => onRemoveBanner(index)}
                      className="absolute top-1 right-1 bg-black/70 rounded-md hover:bg-black"
                    >
                      <X size={15} />
                    </button>
                  )}
                </div>
              ))}

              {onAddBanners && (
                <label className="h-12 min-w-20 bg-muted/70 flex items-center justify-center rounded-md cursor-pointer hover:bg-muted">
                  <Plus size={15} />
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || [])
                      if (files.length > 0) {
                        onAddBanners(files)
                      }
                    }}
                  />
                </label>
              )}
            </div>
          </div>
        </div>
      }
    </div>
  )
}