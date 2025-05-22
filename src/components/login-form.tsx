import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { loginApi } from "@/api/auth-api"
import { toast } from "sonner"
import { LoadingIcon } from "./loading-icon"
import { useAuth } from "@/context/auth-context"

const LoginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password must be filled"),
})

export function LoginForm() {

  const { login } = useAuth()

  const [loading, setLoading] = useState(false)

  const loginForm = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  async function onLoginSubmit(data: z.infer<typeof LoginFormSchema>) {
    setLoading(true)

    try {
      const response = await loginApi(data)
      login(response.token)
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Please enter your credentials to access your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...loginForm}>
          <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4 flex flex-col">
            <FormField
              control={loginForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-1" disabled={loading}>
              {loading && <LoadingIcon />} Login
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}