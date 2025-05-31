import { SearchIcon } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

interface BrowseGameSearchProps {
  searchValue: string
  setSearchValue: React.Dispatch<React.SetStateAction<string>>
}

export function BrowseGameSearch({ searchValue, setSearchValue }: BrowseGameSearchProps) {
  return (
    <form className="flex items-center w-full space-x-2 rounded-lg py-2" onSubmit={(e) => e.preventDefault()}>
      <Button variant="ghost" size="icon" type="submit"><SearchIcon className="h-4 w-4" /></Button>
      <Input
        type="search"
        placeholder="Search for games"
        className="w-full border-1"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </form>
  )
}
