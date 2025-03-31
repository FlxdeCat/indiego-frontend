import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

function News() {

  // const news = [
  //   {
  //     title: "asd",
  //     content: "asdasd",
  //     date: 1742963482
  //   }
  // ]

  return (
    <div className="m-0 p-0 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex flex-col items-center flex-1">
        <div className="flex flex-col items-center w-full max-w-5xl mt-4">
          <div className="text-2xl font-bold text-start w-full">Recent News</div>

        </div>
      </main>
      <Footer />
    </div>
  )
}

export default News
