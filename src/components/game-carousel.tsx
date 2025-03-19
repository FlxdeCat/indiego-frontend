import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { useNavigate } from "react-router"

interface GameCarouselProps {
  visibleGames?: number
}

export function GameCarousel({ visibleGames = 4 }: GameCarouselProps) {
  const nav = useNavigate()

  const games: { title: string; image: string }[] = [
    { title: "Holocure", image: "holocure.png" },
    { title: "Holocure", image: "holocure.png" },
    { title: "Holocure", image: "holocure.png" },
    { title: "Holocure", image: "holocure.png" },
    { title: "Holocure", image: "holocure.png" },
    { title: "Holocure", image: "holocure.png" },
    { title: "Holocure", image: "holocure.png" }
  ]

  return (
    <Carousel opts={{ align: "start" }} className="w-full">
      <CarouselContent>
        {games.map((game, index) => (
          <CarouselItem key={index} className={`sm:basis-1/2 md:basis-1/3 lg:basis-1/${visibleGames}`}>
            <Card onClick={() => nav("/")} className="p-0 bg-transparent border-0 shadow-transparent transition-transform duration-300 hover:-translate-y-2 cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center p-4">
                <img src={game.image} alt={game.title} className="w-full aspect-[4/5] object-cover rounded-sm shadow-[0px_0px_8px_0px_var(--foreground)]" />
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
