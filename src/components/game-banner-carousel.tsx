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

export function GameBannerCarousel({ banners }: { banners: string[] }) {
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
            {banners.map((image, index) => (
              <CarouselItem key={index}>
                <Card className="p-0 border-0">
                  <CardContent className="rounded-md p-0">
                    <img
                      src={image}
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

      <div className="w-full max-w-7xl px-2">
        <div
          className="overflow-x-auto pb-3"
          style={{ overscrollBehaviorX: 'contain' }}
        >
          <div className="flex gap-2 w-max mx-auto">
            {banners.map((image, index) => (
              <button
                id={`game-banner-${index}`}
                key={index}
                tabIndex={0}
                onClick={() => api?.scrollTo(index)}
                className={`relative h-12 min-w-20 overflow-hidden rounded-md transition-opacity outline-none ${index === current ? "opacity-100" : "opacity-50 hover:opacity-75 focus:opacity-75"
                  }`}
                aria-label={`View banner ${index + 1}`}
              >
                <img
                  src={image}
                  className="object-cover w-full h-full"
                  alt={`Thumbnail ${index + 1}`}
                  loading="lazy"
                />
                {index === current && (
                  <div className="absolute inset-0 border-2 border-foreground rounded-md" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}