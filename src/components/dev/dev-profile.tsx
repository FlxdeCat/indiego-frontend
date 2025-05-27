import { EditDeveloperForm } from "./edit-dev-form";
import { Developer } from "@/types/developer";

export function DevProfile({ dev }: { dev: Developer }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4 px-4 w-full">
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-12">
        <div className="flex flex-col items-center sm:items-start gap-2">
          <div className="text-3xl font-bold">{dev.devName}</div>
          <div className="text-2xl">{dev.fullName}</div>
          <div className="text-xl">{dev.country}</div>
        </div>
      </div >
      <div className="flex flex-row md:flex-col gap-4 items-end justify-center md:justify-start">
        <div><EditDeveloperForm dev={dev} /></div>
      </div>
    </div>
  )
}
