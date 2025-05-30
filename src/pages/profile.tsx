import { getFavorites } from "@/api/favorite-api"
import { ChangePasswordForm } from "@/components/change-password-form"
import { EditProfileForm } from "@/components/edit-profile-form"
import { Footer } from "@/components/footer"
import { GameTable } from "@/components/game-table"
import { LoadingIcon } from "@/components/loading-icon"
import { Navbar } from "@/components/navbar"
import { useAuth } from "@/context/auth-context"
import { Game } from "@/types/game"
import { convertDate } from "@/utils/utils"
import { User } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"
// import { Camera } from "lucide-react"

function Profile() {

  const { user } = useAuth()
  const [favoriteLoading, setFavoriteLoading] = useState(false)
  const [favorites, setFavorites] = useState<Game[]>([])

  async function getGameFavoritesData() {
    setFavoriteLoading(true)

    try {
      const favoriteResponse = await getFavorites()
      setFavorites(favoriteResponse)
    } catch (err: any) {
      toast.error(err.message || "Fetch favorites failed. Please try again later.")
    } finally {
      setFavoriteLoading(false)
    }
  }

  useEffect(() => {
    getGameFavoritesData()
  }, [])

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  // const handleOverlayClick = () => {
  //   fileInputRef.current?.click()
  // }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setImageUrl(url)
    }
  }

  return (
    <div className="m-0 p-0 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 mx-4 flex flex-col items-center">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4 mt-8 border-b-2 px-4 py-8 w-full max-w-7xl">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-12">
            <div className="relative group w-[240px] h-[240px]">
              {imageUrl ? (
                <img loading="lazy" src={imageUrl} alt="Profile" className="w-full h-full object-cover rounded-md border-2" />
              ) : (
                <User className="w-full h-full rounded-md border-2" />
              )}
              {/* <div onClick={handleOverlayClick} className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer rounded-md transition">
                <Camera className="text-white w-12 h-12" />
              </div> */}
              <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
            </div>
            <div className="flex flex-col items-center sm:items-start gap-2">
              <div className="text-3xl font-bold">{user?.name}</div>
              <div className="text-2xl">{user?.email}</div>
              <div className="text-xl">{convertDate(user?.birthDate || "")}</div>
            </div>
          </div>
          <div className="flex flex-row md:flex-col gap-4 items-end justify-center md:justify-start">
            <div><EditProfileForm /></div>
            <div><ChangePasswordForm /></div>
          </div>
        </div>
        <div className="w-full max-w-7xl">
          <h1 className="font-bold text-3xl p-4 mt-2">My Favorites</h1>
          {favoriteLoading ? (
            <div className="w-full flex justify-center">
              <LoadingIcon size={50} className="text-primary" />
            </div>
          ) : (
            <GameTable games={favorites} />
          )}
        </div>
      </main >
      <Footer />
    </div >
  )
}

export default Profile