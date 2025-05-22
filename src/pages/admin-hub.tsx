import { AdminDataTable } from "@/components/admin/admin-data-table"
import { AdminNavbar } from "@/components/admin/admin-navbar"
import { Footer } from "@/components/footer"

function AdminHub() {

  const games = [
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

  return (
    <div className="m-0 p-0 flex flex-col min-h-screen">
      <AdminNavbar />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">

            <AdminDataTable data={games} />

          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AdminHub
