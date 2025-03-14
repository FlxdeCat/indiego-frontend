import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function BannerCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  )

  const banners: { title: string, image: string }[] = [
    {
      title: "Holocure",
      image: "holocure-banner.png"
    },
    {
      title: "Holocure",
      image: "holocure-banner.png"
    },
    {
      title: "Holocure",
      image: "holocure-banner.png"
    }
  ]
  
  React.useEffect(() => {
    plugin.current = Autoplay({ delay: 5000, stopOnInteraction: false });
  }, []);

  return (
    <Carousel
      opts={{ align: "start", loop: true }}
      plugins={[plugin.current]}
      className="w-full max-w-5xl shadow-[0px_0px_15px_0px_var(--foreground)] rounded-xl"
      onMouseEnter={() => plugin.current.stop?.()}
      onMouseLeave={() => plugin.current.play?.()}
    >
      <CarouselContent>
        {banners.map((banner, index) => {
          return (
            <CarouselItem key={index}>
            <a href="/" className="p-0">
              <Card className="p-0 border-0">
                <CardContent
                  className="relative flex aspect-[2/1] items-end justify-end bg-cover bg-center rounded-xl group overflow-hidden"
                  style={{ backgroundImage: `url(${banner.image})` }}
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 scale-100 group-hover:scale-105"
                    style={{ backgroundImage: `url(${banner.image})` }}
                  />

                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent pt-16 pb-8 px-10 text-right rounded-xl 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                    <span className="text-white text-3xl font-semibold">{banner.title} {index+1}</span>
                  </div>
                </CardContent>
              </Card>
            </a>
          </CarouselItem>
          )
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
