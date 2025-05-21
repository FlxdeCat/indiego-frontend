import { ChartAreaInteractive } from "@/components/dev/chart-area-interactive"
import { DataTable } from "@/components/dev/data-table"
import { DevNavbar } from "@/components/dev/dev-navbar"
import { DevProfile } from "@/components/dev/dev-profile"
import { SectionCards } from "@/components/dev/section-cards"
import { Footer } from "@/components/footer"

function DeveloperHub() {

  const data = [
    {
      "id": 1,
      "cover": "holocure.png",
      "title": "Holocure",
      "genre": ["Action", "Comedy"],
      "rating": 4.5,
      "downloads": 15,
      "reviews": 0,
    },
    {
      "id": 2,
      "cover": "holocure.png",
      "title": "Holocure",
      "genre": ["Action"],
      "rating": 4.7,
      "downloads": 20,
      "reviews": 9,
    },
    {
      "id": 3,
      "cover": "holocure.png",
      "title": "Holocure",
      "genre": ["Action"],
      "rating": 3.9,
      "downloads": 13,
      "reviews": 3,
    },
  ]

  return (
    <div className="m-0 p-0 flex flex-col min-h-screen">
      <DevNavbar />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-6">
              <DevProfile />
            </div>

            <SectionCards />
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
            <DataTable data={data} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default DeveloperHub
