import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Game } from "@/types/game"
import { useNavigate } from "react-router"

export function GameCarousel({ games }: { games: Game[] }) {
  const nav = useNavigate()

  return (
    <Carousel opts={{ align: "start" }} className="w-full">
      <CarouselContent>
        {games.map((game, index) => (
          <CarouselItem key={index} className={`sm:basis-1/2 md:basis-1/3 lg:basis-1/4`}>
            <Card onClick={() => nav(`/game/${game.id}`)} className="p-0 bg-transparent border-0 shadow-transparent transition-transform duration-300 hover:-translate-y-2 cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center p-4">
                <img loading="lazy" src={URL.createObjectURL(game.cover)} alt={game.name} className="w-full aspect-[4/5] object-cover rounded-md" />
                <span className="text-xl font-semibold mt-2 text-center">{game.name}</span>
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
