import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useNavigate } from "react-router"
import { Game } from "@/types/game"

export function BannerCarousel({ games }: { games: Game[] }) {
  const nav = useNavigate()

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  )

  const [api, setApi] = React.useState<CarouselApi | null>(null)
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
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

  return (
    <>
      <div className="flex flex-col h-full w-full items-center gap-4">
        <Carousel
          setApi={setApi}
          opts={{ align: "start", loop: true }}
          plugins={[plugin.current]}
          className="w-full max-w-5xl rounded-md bg-background"
        >
          <CarouselContent>
            {games.map((game, index) => (
              <CarouselItem key={index}>
                <Card onClick={() => nav(`/game/${game.id}`)} className="p-0 border-0 cursor-pointer">
                  <CardContent className="relative flex rounded-md aspect-[7/4] items-end justify-end bg-cover bg-center group overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 scale-100 group-hover:scale-105"
                      style={{ backgroundImage: `url(${URL.createObjectURL(game.banner)})` }}
                    />
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-dark-background/90 to-transparent pt-16 pb-8 px-10 text-right opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                      <span className="text-white text-3xl font-semibold">
                        {game.name}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="flex gap-2">
          {Array.from({ length: count }).map((_, index) => (
            <span
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${index === current ? "bg-foreground w-6" : "bg-muted-foreground w-2"
                }`}
            />
          ))}
        </div>
      </div>
    </>
  )
}
