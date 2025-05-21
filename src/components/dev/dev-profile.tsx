import { DeleteDeveloperDialog } from "./delete-dev-dialog";
import { EditDeveloperForm } from "./edit-dev-form";

export interface Developer {
  name: string
  full_name: string
  tax_id: string
  country: string
}

export function DevProfile() {

  // TEMP
  const dev = {
    name: "Hololive",
    full_name: "Hololive",
    country: "Indonesia",
    tax_id: "1234-1234-1234"
  }

  return (
    <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4 px-4 w-full">
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-12">
        <div className="flex flex-col items-center sm:items-start gap-2">
          <div className="text-3xl font-bold">{dev.name}</div>
          <div className="text-2xl">{dev.full_name}</div>
          <div className="text-xl">{dev.country}</div>
        </div>
      </div>
      <div className="flex flex-row md:flex-col gap-4 items-end justify-center md:justify-start">
        <div><EditDeveloperForm dev={dev} /></div>
        <div><DeleteDeveloperDialog dev={dev} /></div>
      </div>
    </div >
  )
}
