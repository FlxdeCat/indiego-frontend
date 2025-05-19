import { DevNavbar } from "@/components/dev/dev-navbar"
import { Footer } from "@/components/footer"
import { useParams } from "react-router"

function DeveloperGameForm() {

  const { id } = useParams()

  //cover
  //banners
  //title
  //desc
  //genres
  //external link
  //download file

  return (
    <div className="m-0 p-0 flex flex-col min-h-screen">
      <DevNavbar />
      <main className="flex-1 mx-4 flex flex-col items-center">
        <div className="flex flex-col lg:flex-row items-center gap-8 w-full max-w-7xl mt-4">
          <div className="flex-3 w-full min-w-0">
            banner carousel
          </div>
          <div className="flex-1 flex flex-col space-y-4 items-center">
            cover
            <div className="flex flex-col space-y-1 items-center lg:items-start">
              <h1 className="font-bold text-xl">title</h1>
              <h4 className="text-center lg:text-justify">desc</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                genre
              </div>
            </div>
          </div>
        </div>
        <div className="w-full max-w-7xl mt-8 border-y-2 py-8 px-4 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col items-center sm:flex-row sm:items-end gap-4">
            <div className="flex gap-4">
              external link
              file download
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default DeveloperGameForm
