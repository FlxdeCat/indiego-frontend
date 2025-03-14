import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function GameCarousel() {
  const games: { title: string; image: string }[] = [
    {
      title: "Holocure",
      image: "holocure.png",
    },
    {
      title: "Holocure",
      image: "holocure.png",
    },
    {
      title: "Holocure",
      image: "holocure.png",
    },
    {
      title: "Holocure",
      image: "holocure.png",
    },
    {
      title: "Holocure",
      image: "holocure.png",
    },
    {
      title: "Holocure",
      image: "holocure.png",
    },
    {
      title: "Holocure",
      image: "holocure.png",
    },
  ]

  return (
    <Carousel opts={{ align: "start" }} className="w-full max-w-5xl">
      <CarouselContent>
        {games.map((game, index) => (
          <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
            <Card className="p-0 bg-transparent border-0 shadow-transparent">
              <CardContent className="flex flex-col items-center justify-center p-4">
                <img src={game.image} alt={game.title} className="w-full aspect-[4/5] object-cover rounded-lg shadow-[0px_0px_10px_0px_var(--foreground)]" />
                <span className="text-xl font-semibold mt-2 text-center">{game.title} {index + 1}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
