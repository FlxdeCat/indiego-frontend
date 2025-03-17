import { LoginRegisterForm } from "@/components/login-register-form"
import { ModeToggle } from "@/components/mode-toggle"
import { LogoTypeAnimation } from "@/components/logo-type-animation"

function Auth() {
  return (
    <div className="flex min-h-screen">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <div className="grid grid-cols-2 w-full rounded-md">
        <div className="flex flex-col justify-center items-end p-24 pl-48">
          <div className="text-2xl">Welcome to</div>
          <a href="/" className="text-5xl mb-4 font-bold h-12">
            <LogoTypeAnimation />
          </a>
          <div className="text-right text-lg text-muted-foreground">
            <span className="underline text-primary">Indie</span>go is the ultimate platform for indie game lovers! Browse a growing library of indie games, play hidden gems, and share your reviews. Support independent developers and be part of a thriving indie gaming community.
          </div>
        </div>
        <div className="flex justify-center items-center bg-primary">
          <LoginRegisterForm />
        </div>
      </div>
    </div>
  )
}

export default Auth