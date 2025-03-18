import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

function Profile() {
  return (
    <div className="m-0 p-0 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 mx-16">
        profile
      </main>
      <Footer />
    </div>
  )
}

export default Profile