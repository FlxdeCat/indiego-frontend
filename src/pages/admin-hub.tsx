import { AdminDataTable } from "@/components/admin/admin-data-table"
import { AdminNavbar } from "@/components/admin/admin-navbar"
import { Footer } from "@/components/footer"

function AdminHub() {

  // admin (set permissions)
  // subscription (refunds -> approve/reject)
  // news (delete)
  // games (delete)
  // reviews (delete)

  return (
    <div className="m-0 p-0 flex flex-col min-h-screen">
      <AdminNavbar />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">

            {/* <AdminDataTable data={data} /> */}

          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AdminHub
