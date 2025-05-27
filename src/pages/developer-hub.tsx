import { getDeveloper } from "@/api/developer-api"
import { ChartAreaInteractive } from "@/components/dev/chart-area-interactive"
import { DataTable } from "@/components/dev/data-table"
import { DevNavbar } from "@/components/dev/dev-navbar"
import { DevProfile } from "@/components/dev/dev-profile"
import { SectionCards } from "@/components/dev/section-cards"
import { Footer } from "@/components/footer"
import { LoadingIcon } from "@/components/loading-icon"
import { Developer } from "@/types/developer"
import { useEffect, useState } from "react"
import { toast } from "sonner"

function DeveloperHub() {

  const data = [
    {
      "id": 1,
      "cover": "holocure.png",
      "title": "Holocure",
      "developer": "Hololive",
      "genre": ["Action", "Comedy"],
      "rating": 4.5,
      "downloads": 15,
      "reviews": 0,
    },
    {
      "id": 2,
      "cover": "holocure.png",
      "title": "Holocure",
      "developer": "Hololive",
      "genre": ["Action"],
      "rating": 4.7,
      "downloads": 20,
      "reviews": 9,
    },
    {
      "id": 3,
      "cover": "holocure.png",
      "title": "Holocure",
      "developer": "Hololive",
      "genre": ["Action"],
      "rating": 3.9,
      "downloads": 13,
      "reviews": 3,
    },
  ]

  const [loading, setLoading] = useState(false)
  const [dev, setDev] = useState<Developer>({
    devName: "Hololive",
    fullName: "Hololive",
    country: "Indonesia",
    taxId: "1234-1234-1234"
  }) // TODO: Change to null

  async function getDevData() {
    setLoading(true)

    try {
      const developerResponse = await getDeveloper()
      setDev(developerResponse[0])
    } catch (err: any) {
      toast.error(err.message || "Fetch developer data failed. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getDevData()
  }, [])

  return (
    <div className="m-0 p-0 flex flex-col min-h-screen">
      <DevNavbar />
      <div className="flex flex-1 flex-col">
        {loading ? (
          <div className="flex flex-1 items-center justify-center">
            <LoadingIcon size={50} className="text-primary" />
          </div>
        ) : (
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <DevProfile dev={dev} />
              </div>

              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div >
        )}
      </div >
      <Footer />
    </div >
  )
}

export default DeveloperHub
