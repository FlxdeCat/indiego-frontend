import { ChangePasswordForm } from "@/components/change-password-form"
import { EditProfileForm } from "@/components/edit-profile-form"
import { Footer } from "@/components/footer"
import { GameTable } from "@/components/game-table"
import { Navbar } from "@/components/navbar"
import { User } from "lucide-react"

function Profile() {

  // const games: { title: string; image: string, genres: string[] }[] = []
  const games: { title: string; image: string, genres: string[] }[] = [
    { title: "Holocure", image: "holocure.png", genres: ["Action", "Comedy"] },
    { title: "Holocure", image: "holocure.png", genres: ["Action", "Comedy"] },
    { title: "Holocure", image: "holocure.png", genres: ["Action", "Comedy"] },
    { title: "Holocure", image: "holocure.png", genres: ["Action", "Comedy"] },
    { title: "Holocure", image: "holocure.png", genres: ["Action", "Comedy"] },
    { title: "Holocure", image: "holocure.png", genres: ["Action", "Comedy"] },
    { title: "Holocure", image: "holocure.png", genres: ["Action", "Comedy"] }
  ]

  return (
    <div className="m-0 p-0 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 mx-4 flex flex-col items-center">
        <div className="flex flex-row justify-between mt-8 border-b-2 px-4 py-8 w-full max-w-7xl">
          <div className="flex flex-row items-center space-x-12">
            <User className="rounded-md border-2" size={240}/>
            <div className="flex flex-col space-y-2">
              <div className="text-3xl font-bold">Username</div>
              <div className="text-2xl">Email</div>
              <div className="text-xl">DOB</div>
            </div>
          </div>
          <div className="flex flex-col space-y-2 items-end">
            <div><EditProfileForm /></div>
            <div><ChangePasswordForm /></div>
          </div>
        </div>
        <div className="w-full max-w-7xl">
          <h1 className="font-bold text-3xl p-4 mt-2">My Favorites</h1>
          <GameTable games={games}/>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Profile