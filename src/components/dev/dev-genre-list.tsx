import { Genre } from "@/types/genre"

interface GenreListProps {
  genres: Genre[],
  selected: string[],
  onToggle: (genre: string) => void,
  search: string
}

export function GenreList({ genres, selected, onToggle, search }: GenreListProps) {
  const filtered = genres.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase())
  )

  if (filtered.length === 0) {
    return (
      <div className="text-muted-foreground text-sm col-span-2 text-center mt-2">
        No genres found
      </div>
    )
  }

  return (
    <>
      {filtered.map((genre) => {
        const isSelected = selected.includes(genre.id)
        return (
          <div
            key={genre.id}
            className={`
              p-2 rounded cursor-pointer text-center font-bold
              ${isSelected
                ? "bg-primary text-primary-foreground hover:bg-primary/80"
                : "bg-muted/50 hover:bg-muted"}
            `}
            onClick={() => onToggle(genre.id)}
          >
            {genre.name}
          </div>
        )
      })}
    </>
  )
}
