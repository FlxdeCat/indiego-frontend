import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"

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
      <main className="flex flex-col items-center flex-1 mx-16">
        <div className="flex flex-col items-center w-full max-w-5xl mt-4">
          <div className="text-2xl font-bold text-start w-full mb-6">Recent News</div>
          <div className="flex flex-col space-y-4 w-full">
            <div className="flex justify-between w-full gap-4">
              <img src="/holocure.png" alt="Holocure" className="max-w-[200px] aspect-[3/2] object-cover rounded-sm" />
              <div className="h-full w-full text-start flex flex-col gap-2">
                <div className="font-bold text-xl">title</div>
                <div className="text-sm text-muted-foreground">date</div>
                <div>news</div>
              </div>
              <Button>asd</Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default News
