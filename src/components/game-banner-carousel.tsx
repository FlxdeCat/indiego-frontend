import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

export function GameBannerCarousel({ banners }: { banners: string[] }) {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  )

  const [api, setApi] = React.useState<CarouselApi | null>(null)
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    if (!api) return

    setCurrent(api.selectedScrollSnap())

    const handleSelect = () => setCurrent(api.selectedScrollSnap())

    api.on("select", handleSelect)
    return () => {
      api.off("select", handleSelect)
    }
  }, [api])

  React.useEffect(() => {
      plugin.current = Autoplay({ delay: 5000, stopOnInteraction: false })
    }, [])

    React.useEffect(() => {
    if (!api) return

    setCurrent(api.selectedScrollSnap())

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap())

      document
        .getElementById(`game-banner-${api.selectedScrollSnap()}`)
        ?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
    }

    api.on("select", handleSelect)
    return () => {
      api.off("select", handleSelect)
    }
  }, [api])

  return (
    <div className="flex flex-col h-full w-full items-center gap-4">
      <div className="w-full max-w-7xl">
      <Carousel
        setApi={setApi}
        opts={{ align: "start", loop: true }}
        plugins={[plugin.current]}
        className="rounded-sm shadow-[0px_0px_8px_0px_var(--foreground)]"
      >
        <CarouselContent>
          {banners.map((image, index) => (
            <CarouselItem key={index}>
              <Card className="p-0 border-0">
                <CardContent className="rounded-sm p-0">
                  <img src={image} className="w-full object-cover aspect-[7/4]" />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      </div>

      <div className="w-full overflow-x-auto flex justify-center gap-2 pb-3">
        {banners.map((image, index) => (
          <button
            id={`game-banner-${index}`}
            key={index}
            onClick={() => { api?.scrollTo(index) }}
            className={`relative h-12 min-w-20 overflow-hidden rounded-sm transition-opacity outline-none ${
              index === current ? "opacity-100" : "opacity-50 hover:opacity-75"
            }`}
          >
            <img src={image} className="object-cover w-full h-full" />
            {index === current && (
              <div className="absolute inset-0 border-2 border-foreground rounded-sm" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
